export interface CardData {
  cardId: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  namePosition: { x: number; y: number };
  fontFamily: string;
  fontSize: number;
  textColor: string;
  rtl: boolean;
  customFontData?: string;
  customFontName?: string;
}

export interface FontOption {
  name: string;
  rtl: boolean;
}

export const FONT_OPTIONS: FontOption[] = [
  { name: 'Inter', rtl: false },
  { name: 'Georgia', rtl: false },
  { name: 'Arial', rtl: false },
  { name: 'Times New Roman', rtl: false },
  { name: 'Verdana', rtl: false },
  { name: 'Trebuchet MS', rtl: false },
  { name: 'Cairo', rtl: true },
  { name: 'Tajawal', rtl: true },
  { name: 'Amiri', rtl: true },
  { name: 'Noto Kufi Arabic', rtl: true },
  { name: 'Readex Pro', rtl: true },
];

const STORAGE_KEY = 'greeting-cards';

function getAllCards(): Record<string, CardData> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCard(card: CardData): void {
  const cards = getAllCards();
  cards[card.cardId] = card;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function loadCard(cardId: string): CardData | null {
  const cards = getAllCards();
  return cards[cardId] ?? null;
}

export async function registerCustomFont(name: string, dataUrl: string): Promise<void> {
  const font = new FontFace(name, `url(${dataUrl})`);
  const loaded = await font.load();
  document.fonts.add(loaded);
}

export function generateCardId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
