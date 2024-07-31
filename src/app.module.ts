import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VkMessageModule } from './vk-message/vk-message.module';
import { BullModule } from '@nestjs/bull';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        port: +process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
      },
    }),
    VkMessageModule,
  ],
})
export class AppModule {}
