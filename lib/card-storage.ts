import { supabase } from './supabase';

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

export async function saveCard(card: CardData): Promise<boolean> {
  const { error } = await supabase.from('greeting_cards').insert({
    card_id: card.cardId,
    image: card.image,
    image_width: card.imageWidth ?? 0,
    image_height: card.imageHeight ?? 0,
    name_position_x: card.namePosition.x,
    name_position_y: card.namePosition.y,
    font_family: card.fontFamily,
    font_size: card.fontSize,
    text_color: card.textColor,
    rtl: card.rtl,
    custom_font_data: card.customFontData ?? null,
    custom_font_name: card.customFontName ?? null,
  });

  if (error) {
    console.error('Failed to save card:', error);
    return false;
  }
  return true;
}

export async function loadCard(cardId: string): Promise<CardData | null> {
  const { data, error } = await supabase
    .from('greeting_cards')
    .select('*')
    .eq('card_id', cardId)
    .maybeSingle();

  if (error || !data) return null;

  return {
    cardId: data.card_id,
    image: data.image,
    imageWidth: data.image_width,
    imageHeight: data.image_height,
    namePosition: { x: data.name_position_x, y: data.name_position_y },
    fontFamily: data.font_family,
    fontSize: data.font_size,
    textColor: data.text_color,
    rtl: data.rtl,
    customFontData: data.custom_font_data ?? undefined,
    customFontName: data.custom_font_name ?? undefined,
  };
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
