import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { VkMessageProcessor } from './vk-message.processor';
import { VkMessageService } from './vk-message.service';
import { VkMessageController } from './vk-message.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'messages',
    }),
  ],
  providers: [VkMessageProcessor, VkMessageService],
  controllers: [VkMessageController],
})
export class VkMessageModule {}
