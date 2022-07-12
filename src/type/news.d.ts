export interface NewsAddress {
  copyright: { categoryAdress: string };
}

export interface NewsRss {
  copyright: string;
  category: string;
  title: string;
  link: string;
  description_summary: string | null;
  description: string;
  created: Date | null;
  published: Date | null;
  enclosures: {
    url?: string;
    type?: string;
    height?: string | number;
    width?: string | number;
    length?: string | number;
    'media:credit'?: string;
    'media:description'?: string;
    'media:title'?: string;
  };
  media?: {
    thumbnail?: {
      url?: string;
      medium?: string;
      'media:credit'?: string;
      'media:description'?: string;
      'media:title'?: string;
      type?: string;
      height?: string | number;
      width?: string | number;
    };
  };
}
