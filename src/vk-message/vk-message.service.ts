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
    const chunkSize = 100; // Размер чанка всегда 100

    for (let i = 0; i < totalUsers; i += chunkSize) {
      const chunk = user_ids.slice(i, i + chunkSize);
      await this.messageQueue.add({
        user_ids: chunk,
        message: dto.message,
        attachment: dto.attachment,
      });
    }
  }

  async getUsersIds(): Promise<string> {
    // return '649424790,471261080,15967790';
    const ids = '649424790,471261080,15967790';

    // Разделяем строку на отдельные ID
    const idList = ids.split(',');

    // Создаем новый массив с 50 экземплярами каждого ID
    const expandedList = [];
    idList.forEach((id) => {
      for (let i = 0; i < 50; i++) {
        expandedList.push(id);
      }
    });

    // Объединяем массив обратно в строку, разделенную запятыми
    return expandedList.join(',');
  }
}
