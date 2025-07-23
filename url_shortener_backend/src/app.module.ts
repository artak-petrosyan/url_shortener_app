import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurations } from './config/configurations';
import { UrlModule } from './url/url.module';
import { validate } from './config/validation';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './url/url.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true, // Make ConfigModule available globally
      load: configurations,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('Db.host'),
        port: configService.get<number>('Db.port'),
        username: configService.get<string>('Db.username'),
        password: configService.get<string>('Db.password'),
        database: configService.get<string>('Db.database'),
        entities: [UrlEntity], //configService.get<string[]>('Db.entities'),
        synchronize: configService.get<boolean>('Db.sync'),
      }),
      inject: [ConfigService],
    }),
    UrlModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
