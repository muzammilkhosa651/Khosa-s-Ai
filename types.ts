export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export type AspectRatio = '1:1' | '16:9' | '9:16' | '3:4' | '4:3';

export type ArtStyle = 
  | 'none'
  | 'cinematic' 
  | 'anime' 
  | 'cyberpunk' 
  | 'photorealistic' 
  | 'oil painting' 
  | 'sketch' 
  | '3d render';

export interface GenerationConfig {
  prompt: string;
  aspectRatio?: AspectRatio;
  style?: ArtStyle;
  image?: string; // Base64 string
}
