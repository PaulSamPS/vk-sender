import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { VkMessageDto } from './vk-message.dto';

@Injectable()
export class VkMessageService {
  constructor(@InjectQueue('messages') private messageQueue: Queue) {}

  async sendMessages(dto: VkMessageDto) {
    const user_ids = dto.user_ids.split(',');
    const totalUsers = user_ids.length;
    const chunkSize = 100;

    for (let i = 0; i < totalUsers; i += chunkSize) {
      const chunk = user_ids.slice(i, i + chunkSize);
      console.log('work2');
      await this.messageQueue.add({
        user_ids: chunk.toString(),
        message: dto.message,
        attachment: dto.attachment,
      });
    }
  }

  // TODO заменить на актуальные данные
  async getUsersIds(): Promise<string> {
    const ids = '649424790,471261080,15967790';

    const idList = ids.split(',');

    const expandedList = [];
    idList.forEach((id) => {
      for (let i = 0; i < 50; i++) {
        expandedList.push(id);
      }
    });

    return expandedList.join(',');
  }
}
