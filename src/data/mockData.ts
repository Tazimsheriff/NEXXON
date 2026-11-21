export interface MockUser {
  id: string;
  name: string;
  role: 'buyer' | 'seller' | 'support';
  avatar: string;
  email: string;
  badge?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalRetailPrice?: number;
  category: string;
  description: string;
  image: string;
  sellerId: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  condition: 'New' | 'Like New' | 'Open Box' | 'Refurbished' | 'Archival / Excellent' | 'Good Patina' | 'Fair Distressed';
  conditionScore?: number;
  era?: string;
  provenance?: string;
  flawDisclosure?: string;
  measurements?: {
    chest?: string;
    length?: string;
    shoulders?: string;
    sleeve?: string;
  };
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'user_buyer_1',
    name: 'Alex Rivera',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    email: 'alex.buyer@nexxon.market',
    badge: 'Verified Buyer',
  },
  {
    id: 'user_seller_1',
    name: 'Sara Studio (Audio & Mech)',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    email: 'sara@studiocraft.example',
    badge: 'Top Rated Seller',
  },
  {
    id: 'user_seller_2',
    name: 'TechCraft Workspace',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    email: 'contact@techcraftgear.example',
    badge: 'Pro Merchant',
  },
  {
    id: 'user_support_agent',
    name: 'Emma (Nexxon Support)',
    role: 'support',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    email: 'support-agent-emma@nexxon.market',
    badge: 'Official Support',
  },
  {
    id: 'user_seller_3',
    name: 'Kura Archive (Tokyo)',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    email: 'kura@archive-tokyo.example',
    badge: 'Master Archivist',
  },
  {
    id: 'user_seller_4',
    name: 'Rust & Relic (Detroit/Berlin)',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    email: 'relic@detroitworkwear.example',
    badge: 'Heritage Curator',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: 'Keychron Q1 Pro Custom Wireless Mechanical Keyboard',
    price: 199.0,
    category: 'Electronics',
    description:
      '75% layout QMK/VIA wireless custom mechanical keyboard, fully CNC-machined aluminum body, hot-swappable red switches, double-gasket design.',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_1',
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    condition: 'New',
  },
  {
    id: 'prod_2',
    title: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    price: 349.99,
    category: 'Audio',
    description:
      'Industry-leading dual-processor active noise cancellation, 30-hour battery life, crystal clear hands-free calling with 8 microphones.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_1',
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    condition: 'Like New',
  },
  {
    id: 'prod_3',
    title: 'Herman Miller Embody Ergonomic Office Chair',
    price: 1245.0,
    category: 'Furniture',
    description:
      'Engineered with ergonomics specialists to promote natural alignment and healthy circulation during long working sessions. Fully adjustable arms.',
    image:
      'https://images.unsplash.com/photo-1580481077195-c3a821a5060f?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_2',
    rating: 5.0,
    reviewCount: 19,
    inStock: true,
    condition: 'Refurbished',
  },
  {
    id: 'prod_4',
    title: 'Dell UltraSharp 32" 4K UHD USB-C Hub Monitor (U3223QE)',
    price: 689.0,
    category: 'Displays',
    description:
      'IPS Black technology with 2000:1 contrast ratio, 98% DCI-P3 color reproduction, integrated 90W USB-C hub, RJ45 Ethernet, and KVM switch.',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_2',
    rating: 4.7,
    reviewCount: 42,
    inStock: true,
    condition: 'New',
  },
  {
    id: 'prod_5',
    title: 'Fujifilm X-T5 Mirrorless Digital Camera (Silver Body)',
    price: 1699.0,
    category: 'Photography',
    description:
      '40.2MP X-Trans CMOS 5 HR sensor, 5-axis 7-stop in-body image stabilization, 6.2K/30p 10-bit internal recording, classic tactile dial control.',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_1',
    rating: 4.9,
    reviewCount: 57,
    inStock: true,
    condition: 'Open Box',
  },
  {
    id: 'prod_6',
    title: 'Solid American Walnut Minimalist Desk Organizer Shelf',
    price: 89.0,
    category: 'Workspace',
    description:
      'Handcrafted sustainably harvested walnut with natural oil finish. Hidden cable routing, brass accents, and felt-lined phone tray.',
    image:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_2',
    rating: 4.8,
    reviewCount: 81,
    inStock: true,
    condition: 'New',
    conditionScore: 10.0,
    provenance: 'Handmade in Vermont studio, sealed in original artisan box with care oil.',
    flawDisclosure: 'Brand new deadstock. Zero imperfections.',
  },
  {
    id: 'prod_7',
    title: '1994 Helmut Lang Military Nylon Flight Parka (AW94)',
    price: 1250.0,
    originalRetailPrice: 980.0,
    category: 'Vintage Fashion',
    description:
      'Archival Italian military flight parka in weathered dark olive nylon canvas. Features internal carrying harness straps, heavy Raccagni zips, and corduroy storm collar.',
    image:
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_3',
    rating: 5.0,
    reviewCount: 29,
    inStock: true,
    condition: 'Archival / Excellent',
    conditionScore: 9.2,
    era: '1990s Minimalist Archive',
    provenance: 'Sourced from private Antwerp collector. Physical weave and zipper alloy verified.',
    flawDisclosure: 'Gentle patina on collar corduroy; original zips fully functional; microscopic 2mm cuff abrasion.',
    measurements: {
      chest: '58 cm (22.8")',
      length: '96 cm (37.7")',
      shoulders: '49 cm (19.3")',
      sleeve: '66 cm (26.0")',
    },
  },
  {
    id: 'prod_8',
    title: '1989 Carhartt Detroit Duck Canvas Jacket (Blanket Lined)',
    price: 380.0,
    originalRetailPrice: 160.0,
    category: 'Workwear',
    description:
      'Original union-made Detroit heavy 12oz duck canvas with striped blanket lining. Naturally sun-faded tobacco patina with solid brass Talon chest zipper.',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_4',
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    condition: 'Good Patina',
    conditionScore: 8.2,
    era: '1980s American Workwear',
    provenance: 'Curated from Michigan estate, washed and conditioned with organic canvas wax.',
    flawDisclosure: 'Honest sun fade on shoulders and minor cuff distress. Zero structural tears.',
    measurements: {
      chest: '61 cm (24.0")',
      length: '67 cm (26.4")',
      shoulders: '52 cm (20.5")',
      sleeve: '63 cm (24.8")',
    },
  },
  {
    id: 'prod_9',
    title: '1999 Prada Sport Technical Red-Tab Gore-Tex Parka',
    price: 620.0,
    originalRetailPrice: 850.0,
    category: 'Vintage Fashion',
    description:
      'Iconic Linea Rossa red tab nylon jacket with sealed taped seams, packable hood, and dual-direction matte zips in pristine museum-grade preservation.',
    image:
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_3',
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    condition: 'Like New',
    conditionScore: 9.8,
    era: 'Late 90s Italian Techwear',
    provenance: 'Preserved in Tokyo dry storage since 2002. Red latex tab 100% intact.',
    flawDisclosure: 'Deadstock condition with minimal storage creasing. No delamination.',
    measurements: {
      chest: '56 cm (22.0")',
      length: '74 cm (29.1")',
      shoulders: '48 cm (18.9")',
      sleeve: '65 cm (25.6")',
    },
  },
  {
    id: 'prod_10',
    title: '1996 Raf Simons Ribbed Virgin Wool High-Neck Knit',
    price: 840.0,
    originalRetailPrice: 620.0,
    category: 'Vintage Fashion',
    description:
      'Early Antwerp collection chunky ribbed heavy virgin wool sweater with elongated cuffs, dropped shoulder seam, and original black woven label.',
    image:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_3',
    rating: 5.0,
    reviewCount: 18,
    inStock: true,
    condition: 'Archival / Excellent',
    conditionScore: 9.4,
    era: '1990s Belgian Avant-Garde',
    provenance: 'Archived by Milan stylist gallery, zero moth holes or fiber damage.',
    flawDisclosure: 'Extremely light pilling under inner forearm, typical of hand-spun raw wool.',
    measurements: {
      chest: '54 cm (21.2")',
      length: '68 cm (26.7")',
      shoulders: '50 cm (19.6")',
      sleeve: '67 cm (26.4")',
    },
  },
  {
    id: 'prod_11',
    title: '1997 Levi\'s 501 Selvedge Big E Japanese Distressed Denim',
    price: 290.0,
    originalRetailPrice: 195.0,
    category: 'Workwear',
    description:
      'Vintage shuttle-loomed Kuroki redline selvedge denim, natural indigo fading, authentic whiskering, and chain-stitched hem.',
    image:
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    sellerId: 'user_seller_4',
    rating: 4.8,
    reviewCount: 47,
    inStock: true,
    condition: 'Fair Distressed',
    conditionScore: 7.2,
    era: '1990s Japanese Reproduction',
    provenance: 'Worn authentically by a craftsman in Osaka for 5 years.',
    flawDisclosure: 'Natural distressing at left knee and pocket hem. Reinforced with sashiko stitching.',
    measurements: {
      chest: 'Waist: 32" (81 cm)',
      length: 'Inseam: 31" (79 cm)',
    },
  },
];

export function getUserById(id: string): MockUser | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}
