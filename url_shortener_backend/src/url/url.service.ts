import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UrlRepo } from './repo/url.repo.interface';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UrlEntity } from './url.entity';

@Injectable()
export class UrlService {
  private readonly logger = new Logger(UrlService.name);
  readonly baseURL: string;
  readonly shortUrlLength: number;
  readonly MAX_ATTEMPTS = 10;

  constructor(
    private configService: ConfigService,
    @Inject(UrlRepo) private urlRepo: UrlRepo,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.baseURL = configService.get<string>('App.baseUrl')!;
    this.shortUrlLength = configService.get<number>('App.shortUrlLength')!;
  }

  public async shortenUrl(originalUrl: string) {
    //this.logger.debug(`shorten :${originalUrl}`);
    //check if the originalUrl exists in DB
    let url = await this.urlRepo.findOriginalUrl(originalUrl);

    //return if exists
    if (url) {
      this.logger.debug(`URL exists! short :${url.short}`);
      return `${this.baseURL}/${url.short}`;
    }
    let attempts = 0;
    while (attempts < this.MAX_ATTEMPTS) {
      const short = nanoid(this.shortUrlLength);
      this.logger.debug(`Generated short ${short}`);
      try {
        url = this.urlRepo.create({ original: originalUrl, short });
        url = await this.urlRepo.save(url);
        return `${this.baseURL}/${url.short}`;
      } catch {
        attempts++;
      }
    }
    this.logger.error('Failed to shorten Url. Attempts:', attempts);
    throw new UnprocessableEntityException('Unable to shorten Url. Attempts:');
  }

  public async getOriginalUrl(short: string) {
    if (short.length != this.shortUrlLength)
      throw new BadRequestException('Invalig URL slug');
    this.logger.debug('Find short:' + short);
    const url = await this.getCachedUrl(short);
    if (url) {
      //this.logger.debug('Original :%s', url.original);
      return url.original;
    } else {
      throw new NotFoundException(`Short url:${short} not found`);
    }
  }

  private async getCachedUrl(urlCode: string): Promise<UrlEntity | null> {
    const cachedUrl = await this.cacheManager.get<UrlEntity>(urlCode);
    if (cachedUrl) {
      this.logger.debug('Url is cached for code :' + urlCode);
      return cachedUrl;
    }
    this.logger.debug('Loading Url for code :%' +  urlCode);
    const url = await this.urlRepo.findShortUrl(urlCode);

    await this.cacheManager.set(urlCode, url, 0);
    return url;
  }
}
