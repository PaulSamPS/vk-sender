import { Body, Controller, Get, Post } from '@nestjs/common';
import { VkMessageDto } from './vk-message.dto';
import { extractVkResourceId } from './extract-vk-resource-id';
import { VkMessageService } from './vk-message.service';

const urls = [
  'https://vk.com/photos?z=photo471261080_457242826%2Fphoto_feed471261080',
  'https://vk.com/photos?z=photo471261080_457242825%2Fphoto_feed471261080',
  'https://vk.com/photos?z=photo471261080_457240045%2Fphoto_feed471261080',
  'https://vk.com/video?z=video-86538677_456241043%2Fpl_cat_trends',
];

@Controller('vk-message')
export class VkMessageController {
  constructor(private readonly vkMessageService: VkMessageService) {}
  // 15967790,
  @Post('send-message')
  async getHello(@Body() dto: VkMessageDto) {
    const user_ids = await this.vkMessageService.getUsersIds();
    return await this.vkMessageService.sendMessages({
      message: dto.message,
      attachment: dto.attachment,
      user_ids,
    });
  }

  @Get()
  getUrls() {
    const stringUrls = extractVkResourceId(urls);
    console.log(stringUrls);
  }
}
