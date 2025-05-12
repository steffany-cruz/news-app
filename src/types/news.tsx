export interface INews {
  title: string;
  description: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source?: {
    id: string | null;
    name: string;
  };
}

export interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
}
