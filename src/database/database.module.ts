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
      inject: [AppConfigsService],
      useFactory: async (appConfigService: AppConfigsService) => {
        return {
          ssl: true,
          extra: {
            ssl: { rejectUnauthorized: false },
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          url: appConfigService.DATABASE_URL,
        };
      },
    }),

    TypeOrmModule.forFeature([...entities]),
    TypeOrmExModule.forCustomRepository([...repositories]),
  ],
})
export class DatabaseModule {}
