import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomepageModule } from './homepage/homepage.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ validate: requireEnv('DATABASE_URL', 'WEB_ORIGIN') }), PrismaModule, HomepageModule],
})
export class AppModule {}

function requireEnv(...names: string[]) {
  return (env: Record<string, unknown>) => {
    const missing = names.filter((name) => !env[name]);
    if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`);
    return env;
  };
}
