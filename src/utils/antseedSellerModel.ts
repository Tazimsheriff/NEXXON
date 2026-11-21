import { Product, MockUser } from '@/data/mockData';
import { translateTextAsync } from '@/utils/translator';

export interface AntseedSellerReply {
  replyText: string;
  originalText: string;
  sourceLang: string;
  model: string;
}

/**
 * Antseed Intelligent Seller Response Engine
 * Simulates a verified merchant AI assistant tailored to product specs, pricing, and buyer intent.
 */
export async function generateAntseedSellerReply(
  buyerMessage: string,
  seller: MockUser,
  product?: Product | null,
  targetLanguage: string = 'en'
): Promise<AntseedSellerReply> {
  const query = (buyerMessage || '').toLowerCase().trim();
  const title = product?.title || 'this item';
  const price = product?.price || 199;
  const condition = product?.condition || 'Like New';

  let rawReply = '';

  // 1. Price negotiation & discounts
  if (
    query.includes('discount') ||
    query.includes('best price') ||
    query.includes('offer') ||
    query.includes('$') ||
    query.includes('cheaper') ||
    query.includes('negotiable')
  ) {
    const discounted = (price * 0.94).toFixed(2);
    if (seller.id === 'user_seller_1') {
      rawReply = `Hello! Thanks for your offer on the ${title}. Since it's in ${condition} condition and high in demand, our listed price is already very competitive. However, for a direct purchase today, I can do $${discounted} with complimentary express shipping!`;
    } else {
      rawReply = `Hi there! We appreciate your interest in the ${title}. We can offer an instant courtesy discount down to $${discounted} including our full warranty. Would you like us to reserve this unit for you?`;
    }
  }
  // 2. Availability & Stock
  else if (
    query.includes('available') ||
    query.includes('in stock') ||
    query.includes('have any') ||
    query.includes('still have')
  ) {
    rawReply = `Yes, the ${title} is currently in stock in ${condition} condition at our fulfillment hub! All units undergo a multi-point quality check before dispatch. We can ship it out the same day if ordered before 3 PM.`;
  }
  // 3. Shipping & Delivery
  else if (
    query.includes('delivery') ||
    query.includes('ship') ||
    query.includes('arrive') ||
    query.includes('track') ||
    query.includes('when')
  ) {
    rawReply = `We process all orders within 24 hours via FedEx / DHL Express with tracking provided immediately upon dispatch. Typical delivery time is 2-4 business days, and every package is fully insured with signature confirmation.`;
  }
  // 4. Specs, warranty & accessories
  else if (
    query.includes('box') ||
    query.includes('warranty') ||
    query.includes('cable') ||
    query.includes('include') ||
    query.includes('spec') ||
    query.includes('mac') ||
    query.includes('windows')
  ) {
    if (product?.category === 'Electronics' || product?.category === 'Audio') {
      rawReply = `Great question! The ${title} comes with all original factory accessories, braided USB cables, documentation, and is covered under our 30-day merchant replacement guarantee. Both Mac and Windows operating systems are fully supported natively.`;
    } else {
      rawReply = `The ${title} is complete with its manufacturer hardware, setup guide, and our verified seller certificate. It has been tested and certified for immediate setup.`;
    }
  }
  // 5. Default contextual greeting & assistance
  else {
    rawReply = `Hi! Thanks for reaching out regarding the ${title} ($${price.toFixed(
      2
    )}). I'm here to help with any questions about specifications, availability, or immediate dispatch. Feel free to ask!`;
  }

  // Translate to buyer's preferred language if not English
  let finalTranslated = rawReply;
  if (targetLanguage && targetLanguage !== 'en') {
    try {
      finalTranslated = await translateTextAsync(rawReply, targetLanguage, 'en');
    } catch (err) {
      finalTranslated = rawReply;
    }
  }

  return {
    replyText: finalTranslated,
    originalText: rawReply,
    sourceLang: 'en',
    model: 'antseed-v2.4-seller',
  };
}
