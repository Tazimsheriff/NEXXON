export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

// Rich fallback phrases dictionary
const PHRASE_DICTIONARY: Record<string, Record<string, string>> = {
  'hello alex! thanks for checking out our keychron q1 pro. all units are currently in stock with red linear switches.': {
    es: '¡Hola Alex! Gracias por consultar sobre nuestro Keychron Q1 Pro. Todas las unidades están disponibles con interruptores lineales rojos.',
    fr: 'Bonjour Alex ! Merci de vous intéresser à notre Keychron Q1 Pro. Toutes les unités sont en stock avec des commutateurs linéaires rouges.',
    de: 'Hallo Alex! Vielen Dank für dein Interesse am Keychron Q1 Pro. Alle Einheiten sind mit roten linearen Schaltern auf Lager.',
    ja: 'こんにちはアレックス！Keychron Q1 Proをご覧いただきありがとうございます。全ユニットが赤軸リニアスイッチで在庫あります。',
    zh: '你好 Alex！感谢关注我们的 Keychron Q1 Pro。目前所有现货均配备红轴线性开关。',
    ar: 'مرحباً أليكس! شكراً لاهتمامك بـ Keychron Q1 Pro. جميع الوحدات متوفرة حالياً بمفاتيح خطية حمراء.',
    hi: 'नमस्ते एलेक्स! हमारे Keychron Q1 Pro को देखने के लिए धन्यवाद। सभी इकाइयाँ वर्तमान में रेड लीनियर स्विच के साथ स्टॉक में हैं।',
  },
  'awesome! does it come with mac and windows keycaps in the box?': {
    es: '¡Genial! ¿Viene con teclas para Mac y Windows en la caja?',
    fr: 'Génial ! Est-ce qu\'il est livré avec des touches Mac et Windows dans la boîte ?',
    de: 'Klasse! Sind sowohl Mac- als auch Windows-Tastenkappen im Lieferumfang enthalten?',
    ja: '素晴らしい！ボックスにはMacとWindows両方のキーキャップが付属していますか？',
    zh: '太棒了！盒子里有附带 Mac 和 Windows 的替换键帽吗？',
    ar: 'رائع! هل تأتي أغطية مفاتيح Mac و Windows في الصندوق؟',
    hi: 'शानदार! क्या बॉक्स में Mac और Windows कीकैप शामिल हैं?',
  },
  'yes! it includes both macos and windows keycaps, plus a switch puller and braided type-c cable.': {
    es: '¡Sí! Incluye teclas para macOS y Windows, además de un extractor de interruptores y cable trenzado Tipo-C.',
    fr: 'Oui ! Il comprend les touches macOS et Windows, ainsi qu\'un extracteur de commutateurs et un câble tressé Type-C.',
    de: 'Ja! Es enthält sowohl macOS- als auch Windows-Tastenkappen, einen Schalterabzieher und ein geflochtenes Typ-C-Kabel.',
    ja: 'はい！macOSとWindowsの両方のキーキャップ、スイッチプーラー、編組Type-Cケーブルが付属しています。',
    zh: '是的！附带 macOS 和 Windows 两套键帽，以及拔轴器和编织 Type-C 连接线。',
    ar: 'نعم! يتضمن أغطية مفاتيح macOS و Windows، بالإضافة إلى أداة سحب المفاتيح وسلك Type-C مجدول.',
    hi: 'हाँ! इसमें macOS और Windows दोनों कीकैप, साथ ही एक स्विच पुलर और ब्रेडेड टाइप-सी केबल शामिल हैं।',
  },
  'hi there! we offer free white-glove delivery on the herman miller embody chair.': {
    es: '¡Hola! Ofrecemos entrega de guante blanco gratuita para la silla Herman Miller Embody.',
    fr: 'Bonjour ! Nous offrons la livraison spéciale gratuite pour la chaise Herman Miller Embody.',
    de: 'Hallo! Wir bieten kostenlose Premium-Lieferung für den Herman Miller Embody Stuhl.',
    ja: 'こんにちは！Herman Miller Embodyチェアは無料の設置配送サービスをご利用いただけます。',
    zh: '您好！我们对赫曼米勒 (Herman Miller) Embody 人体工学椅提供免费送货上门安装服务。',
    ar: 'مرحباً! نقدم خدمة توصيل وتركيب مجانية لكرسي Herman Miller Embody.',
    hi: 'नमस्ते! हम हरमन मिलर एम्बॉडी चेयर पर मुफ्त वाइट-ग्लव डिलीवरी प्रदान करते हैं।',
  },
  'welcome to nexxon support! how can we assist you with your marketplace order today?': {
    es: '¡Bienvenido a Soporte Nexxon! ¿Cómo podemos ayudarte con tu pedido del mercado hoy?',
    fr: 'Bienvenue sur l\'assistance Nexxon ! Comment pouvons-nous vous aider aujourd\'hui ?',
    de: 'Willkommen beim Nexxon Support! Wie können wir Ihnen heute bei Ihrer Marketplace-Bestellung helfen?',
    ja: 'Nexxonサポートへようこそ！本日のご注文に関するご用件をお聞かせください。',
    zh: '欢迎联系 Nexxon 客服！请问今天有什么可以为您效劳的吗？',
    ar: 'مرحباً بك في دعم Nexxon! كيف يمكننا مساعدتك في طلبك اليوم؟',
    hi: 'नेक्सॉन सपोर्ट में आपका स्वागत है! आज हम आपके ऑर्डर में आपकी क्या मदद कर सकते हैं?',
  },
  'is this item still available?': {
    es: '¿Este artículo sigue disponible?',
    fr: 'Cet article est-il toujours disponible ?',
    de: 'Ist dieser Artikel noch verfügbar?',
    ja: 'この商品はまだ購入可能ですか？',
    zh: '请问这件商品还有现货吗？',
    ar: 'هل هذا العنصر لا يزال متاحاً؟',
    hi: 'क्या यह वस्तु अभी भी उपलब्ध है?',
  },
  'what is the estimated delivery time?': {
    es: '¿Cuál es el tiempo estimado de entrega?',
    fr: 'Quel est le délai de livraison estimé ?',
    de: 'Wie hoch ist die voraussichtliche Lieferzeit?',
    ja: '配達予定日はいつ頃になりますか？',
    zh: '预计什么时候可以送达？',
    ar: 'ما هو الوقت المتوقع للتسليم؟',
    hi: 'अनुमानित डिलीवरी का समय क्या है?',
  },
};

export function detectLanguage(text: string): string {
  if (!text) return 'en';
  if (/[¿¡áéíóúñ]/i.test(text)) return 'es';
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja';
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  if (/[äöüßÄÖÜ]/.test(text)) return 'de';
  if (/[àâçéèêëîïôûùüÿñæœ]/i.test(text)) return 'fr';
  return 'en';
}

/**
 * Fast synchronous dictionary translation
 */
export function translateTextSync(text: string, targetLang: string): string {
  if (!text || targetLang === 'en') {
    const normalized = text.toLowerCase().trim();
    for (const [enKey, trans] of Object.entries(PHRASE_DICTIONARY)) {
      if (enKey === normalized) return text;
      for (const [, val] of Object.entries(trans)) {
        if (val.toLowerCase() === normalized) {
          return enKey.charAt(0).toUpperCase() + enKey.slice(1);
        }
      }
    }
    return text;
  }

  const normalized = text.toLowerCase().trim();
  const directMatch = PHRASE_DICTIONARY[normalized]?.[targetLang];
  if (directMatch) return directMatch;

  return text;
}

/**
 * Real-time translation with API route and in-memory caching
 */
const clientCache = new Map<string, string>();

export async function translateTextAsync(
  text: string,
  targetLang: string,
  sourceLang: string = 'auto'
): Promise<string> {
  if (!text || targetLang === sourceLang) return text;

  const cacheKey = `${sourceLang}:${targetLang}:${text.trim().toLowerCase()}`;
  if (clientCache.has(cacheKey)) {
    return clientCache.get(cacheKey)!;
  }

  // Check sync dictionary first for immediate return
  const dictMatch = translateTextSync(text, targetLang);
  if (dictMatch !== text) {
    clientCache.set(cacheKey, dictMatch);
    return dictMatch;
  }

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang, sourceLang }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.translated) {
        clientCache.set(cacheKey, data.translated);
        return data.translated;
      }
    }
  } catch (err) {
    console.warn('[translateTextAsync error]', err);
  }

  return text;
}

export const translateText = translateTextSync;
