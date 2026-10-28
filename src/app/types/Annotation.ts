export interface ImageAnnotation {
  id: string;
  style?: "marker" | "label";
  x: number;
  y: number;
  arrowCoord?: {
    x: number;
    y: number;
  };
  title: string;
  description?: string;
  metadata?: Record<string, string>;
}
