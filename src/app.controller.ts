import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { VkDto } from './vk.dto';
import { extractResourceId } from './extract-resource-id';

const urls = [
  'https://vk.com/photos?z=photo471261080_457242826%2Fphoto_feed471261080',
  'https://vk.com/photos?z=photo471261080_457242825%2Fphoto_feed471261080',
  'https://vk.com/photos?z=photo471261080_457240045%2Fphoto_feed471261080',
  'https://vk.com/video?z=video-86538677_456241043%2Fpl_cat_trends',
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 15967790,
  @Post('send-message')
  async getHello(@Body() dto: VkDto) {
    const user_ids = await this.appService.getUsersIds();
    return await this.appService.sendMessage(dto, user_ids);
  }

  @Get()
  getUrls() {
    const stringUrls = extractResourceId(urls);
    console.log(stringUrls);
  }
}
