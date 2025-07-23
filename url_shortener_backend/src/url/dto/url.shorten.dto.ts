import { IsUrl } from 'class-validator';

export class UrlShortenDto {
  @IsUrl()
  originalUrl: string;
}
