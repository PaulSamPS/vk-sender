import { Body, Controller, Post } from '@nestjs/common';
import { VkMessageDto } from './vk-message.dto';
import { VkMessageService } from './vk-message.service';

@Controller('vk-message')
export class VkMessageController {
  constructor(private readonly vkMessageService: VkMessageService) {}

  @Post('send-message')
  async getHello(@Body() dto: VkMessageDto) {
    const user_ids = await this.vkMessageService.getUsersIds();
    return await this.vkMessageService.sendMessages({
      message: dto.message,
      attachment: dto.attachment,
      user_ids,
    });
  }
}
