export type TokenContent = {
  expiresIn: string;
  issuer?: string = 'rss.com';
  subject?: string = 'rss';
};
