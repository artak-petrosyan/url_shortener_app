import { Controller, Get, HttpStatus, Param, Redirect } from '@nestjs/common';
import { UrlService } from '../url.service';

@Controller()
export class ShortUrlRedirectController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':short')
  @Redirect()
  async redirect(@Param('short') short: string) {
    const originalUrl = await this.urlService.getOriginalUrl(short);
    return { url: originalUrl, statusCode: HttpStatus.PERMANENT_REDIRECT };
  }
}
