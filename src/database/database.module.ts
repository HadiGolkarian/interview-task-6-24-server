import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { parse } from 'pg-connection-string';
import { entities } from './entities';
import { repositories } from './repositories';
import { TypeOrmExModule } from './typeorm/typeorm-ex.module';


const parsed = parse(process.env.DATABASE_URL);
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: parsed.host,
        port: parseInt(parsed.port, 10),
        username: parsed.user,
        password: parsed.password,
        database: parsed.database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    TypeOrmModule.forFeature([...entities]),
    TypeOrmExModule.forCustomRepository([...repositories]),
  ],
})
export class DatabaseModule {}
