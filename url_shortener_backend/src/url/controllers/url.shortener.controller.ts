import { Body, Controller, Post } from '@nestjs/common';
import { UrlService } from '../url.service';
import { UrlShortenDto } from '../dto/url.shorten.dto';

@Controller('shorten')
export class UrlShortenerController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body() url: UrlShortenDto) {
    const shortUrl = await this.urlService.shortenUrl(url.originalUrl);
    console.log('%s >>>> %s', url.originalUrl, shortUrl);
    return { shortUrl };
  }
}
