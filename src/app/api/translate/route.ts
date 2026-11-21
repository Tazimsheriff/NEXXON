import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { translateTextSync } from '@/utils/translator';

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang, sourceLang = 'auto' } = await req.json();

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'Missing required fields: text and targetLang' },
        { status: 400 }
      );
    }

    if (targetLang === 'en' && sourceLang === 'en') {
      return NextResponse.json({
        translated: text,
        sourceLang: 'en',
        targetLang: 'en',
        cached: true,
      });
    }

    // 1. Check in-memory hash cache / database cache if available
    const hash = crypto
      .createHash('sha256')
      .update(`${sourceLang}:${targetLang}:${text.trim().toLowerCase()}`)
      .digest('hex');

    if (process.env.DATABASE_URL) {
      try {
        const cached = await prisma.cachedTranslation.findUnique({
          where: { sourceHash: hash },
        });

        if (cached) {
          return NextResponse.json({
            translated: cached.translated,
            sourceLang: cached.sourceLang,
            targetLang: cached.targetLang,
            cached: true,
          });
        }
      } catch (dbErr) {
        // Continue if DB is offline
      }
    }

    // 2. Query real-time translation service
    let translated = '';
    let detectedSource = sourceLang;

    try {
      const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text
      )}`;
      const res = await fetch(gtxUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const data = await res.json();
        // format: [[["Translated text", "Original text", ...], ...], null, "detected_lang"]
        if (Array.isArray(data) && Array.isArray(data[0])) {
          translated = data[0].map((item: any) => item[0]).join('');
          detectedSource = data[2] || sourceLang;
        }
      }
    } catch (apiErr) {
      console.warn('[Translate API request timed out or failed, using dictionary fallback]', apiErr);
    }

    // 3. Fallback to dictionary translation if online translation failed
    if (!translated) {
      translated = translateTextSync(text, targetLang);
    }

    // 4. Save to database cache asynchronously if DB is configured
    if (process.env.DATABASE_URL && translated) {
      prisma.cachedTranslation
        .upsert({
          where: { sourceHash: hash },
          update: { translated },
          create: {
            sourceHash: hash,
            sourceLang: detectedSource,
            targetLang,
            sourceText: text,
            translated,
          },
        })
        .catch((e) => console.warn('[Translate Cache Write Error]', e));
    }

    return NextResponse.json({
      translated,
      sourceLang: detectedSource,
      targetLang,
      cached: false,
    });
  } catch (error: any) {
    console.error('Translation route error:', error);
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    );
  }
}
