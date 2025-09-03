export default interface Article {
  name: string;
  slug: string;
  lastUpdated: string;
  description: string;
  shortDescription: string;
  tags: string[];
  image?: string;
}
