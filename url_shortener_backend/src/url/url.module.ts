import { Module } from '@nestjs/common';
import { ShortUrlRedirectController } from './controllers/short.url.redirect.controller';
import { UrlShortenerController } from './controllers/url.shortener.controller';
import { UrlService } from './url.service';
import { UrlRepo } from './repo/url.repo.interface';
import { UrlRepository } from './repo/url.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './url.entity';
import { ConfigModule } from '@nestjs/config';
//import { KeyvCacheableMemory } from 'cacheable';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UrlEntity]),
  ],
  controllers: [UrlShortenerController, ShortUrlRedirectController],
  providers: [
    {
      provide: UrlRepo,
      useClass: UrlRepository,
    },
    UrlService,
  ],
})
export class UrlModule {}
