import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VkMessageModule } from './vk-message/vk-message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VkMessageModule,
  ],
})
export class AppModule {}
