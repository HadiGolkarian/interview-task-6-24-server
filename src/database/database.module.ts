import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigsModule } from 'src/config/app-configs.module';
import { AppConfigsService } from 'src/config/app-configs.service';
import { entities } from './entities';
import { repositories } from './repositories';
import { TypeOrmExModule } from './typeorm/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigsModule],
      useFactory: (appConfigService: AppConfigsService) => {
        const { host, port, database, username, password } =
          appConfigService.DatabaseConfig;

        return {
          type: 'postgres',
          host: host,
          port: +port,
          username: username,
          password: password,
          database: database,
          synchronize: true,
          logging: false,
          autoLoadEntities: true,
        };
      },
      inject: [AppConfigsService],
    }),
    TypeOrmModule.forFeature([...entities]),
    TypeOrmExModule.forCustomRepository([...repositories]),
  ],
})
export class DatabaseModule {}
