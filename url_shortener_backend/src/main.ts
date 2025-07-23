import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './app.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const appLogger = new AppLogger();
  appLogger.setAppName(
    configService.get<string>('App.appName') || 'Url Shortener',
  );
  app.useLogger(appLogger);
  const port = configService.get<number>('App.port') || 3000;
  console.log(
    '!=========== \n' +
      configService.get<string>('Db.host') +
      ', \n' +
      configService.get<number>('Db.port') +
      ', \n' +
      configService.get<string>('Db.username') +
      ', \n' +
      configService.get<string>('Db.password') +
      ', \n' +
      configService.get<string>('Db.database') +
      ', \n' +
      configService.get<string>('Db.entities') +
      ', \n' +
      configService.get<boolean>('Db.sync') +
      ', \n',
  );
  await app.listen(port);
}
void bootstrap();
