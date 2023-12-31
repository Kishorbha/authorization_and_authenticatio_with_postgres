import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from './modules/main.module';
import { User } from './modules/users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Config from './config';
import { TransformPipe } from './pipes/data-transform.pipe';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: Config,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('typeorm.host'),
        port: configService.get<number>('typeorm.port'),
        username: configService.get<string>('typeorm.username'),
        password: configService.get<string>('typeorm.password'),
        database: configService.get<string>('typeorm.database'),
        entities: [User],
        synchronize: configService.get<boolean>('typeorm.synchronize'),
      }),
      inject: [ConfigService],
    }),
    MainModule,
  ],
  providers: [{ provide: APP_PIPE, useClass: TransformPipe }],
})
export class AppModule {}
