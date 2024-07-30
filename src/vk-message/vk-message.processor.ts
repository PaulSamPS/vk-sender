import { Process, Processor } from '@nestjs/bull';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VkMessageDto } from './vk-message.dto';
import { FormData } from 'formdata-node';
import axios from 'axios';
import { Job } from 'bull';

@Processor('messages')
@Injectable()
export class VkMessageProcessor {
  constructor(private readonly configService: ConfigService) {}

  @Process()
  async sendMessage(job: Job<VkMessageDto>): Promise<{ message: string }> {
    const url = 'https://api.vk.com/method/messages.send';

    const data = new FormData();
    data.append('access_token', this.configService.get('TOKEN'));
    data.append('random_id', 0);
    data.append('peer_ids', job.data.user_ids);
    data.append('message', job.data.message);
    data.append('group_id', this.configService.get('GROUP_ID'));
    data.append('v', this.configService.get('API_VERSION'));
    data.append('attachment', job.data.attachment);

    try {
      await axios.post(url, data);
      return { message: 'Сообщение отправлено' };
    } catch (e) {
      throw new HttpException(`Ошибка отправки, ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
