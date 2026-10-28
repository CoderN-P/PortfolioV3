import type { ImageAnnotation } from "./Annotation";

export default interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
  location: string;
  date: string;
  description: string;
  annotations?: ImageAnnotation[];
}
