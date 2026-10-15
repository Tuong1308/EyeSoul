import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/** Shared by main.ts and the HTTP tests so both run the same app. */
export function configureApp(app: INestApplication) {
  app.enableCors({ origin: app.get(ConfigService).getOrThrow<string>('WEB_ORIGIN') });
}
