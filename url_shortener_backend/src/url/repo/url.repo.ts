import { FindOptionsWhere, Repository } from 'typeorm';
import { UrlEntity } from '../url.entity';
import { UrlRepo } from './url.repo.interface';
import { BaseRepostitory } from 'src/common/repo/base.repo';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlRepository
  extends BaseRepostitory<UrlEntity>
  implements UrlRepo
{
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {
    super(urlRepository);
  }
  async findOriginalUrl(originalUrl: string): Promise<UrlEntity | null> {
    return await this.repo.findOneBy({
      original: originalUrl,
    } as FindOptionsWhere<UrlEntity>);
  }
  async findShortUrl(shortUrl: string): Promise<UrlEntity | null> {
    return await this.repo.findOneBy({
      short: shortUrl,
    } as FindOptionsWhere<UrlEntity>);
  }
}
