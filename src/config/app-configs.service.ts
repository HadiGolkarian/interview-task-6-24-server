import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from './interfaces/db.config';

@Injectable()
export class AppConfigsService {
  get DatabaseConfig(): DatabaseConfig {
    return {
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || 'username',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'db',
    };
  }

  get appConfig(): {
    port: number;
  } {
    return {
      port: Number(process.env.PORT) || 8080,
    };
  }
}
