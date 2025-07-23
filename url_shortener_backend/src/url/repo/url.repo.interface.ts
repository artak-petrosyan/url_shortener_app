import { Repo } from 'src/common/repo/repo.interface';
import { UrlEntity } from '../url.entity';

export const UrlRepo = Symbol('UrlRepo');

export interface UrlRepo extends Repo<UrlEntity> {
  findOriginalUrl(originalUrl: string): Promise<UrlEntity | null>;
  findShortUrl(shortUrl: string): Promise<UrlEntity | null>;
}
