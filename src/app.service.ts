import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { FormData } from 'formdata-node';
import { VkDto } from './vk.dto';

type SendMessageTypes = {
  // Проверка сообщений на уникальность - 0 нет проверки, другое положительное число есть
  random_id: number;
  // Строка id пользователей, max 100
  peer_ids: string;
  // Текст сообщения
  message: string;
  // Id группы
  group_id: bigint | number;
  // Токен доступа группы
  access_token: string;
  // Версия которая указанна в настройках, лонг пулл версия
  v: number;
};

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async sendMessage(
    dto: VkDto,
    user_ids: string,
  ): Promise<{ message: string }> {
    const url = 'https://api.vk.com/method/messages.send';

    const data = new FormData();
    data.append('access_token', this.configService.get('TOKEN'));
    data.append('random_id', 0);
    data.append('peer_ids', user_ids);
    data.append('message', dto.message);
    data.append('group_id', this.configService.get('GROUP_ID'));
    data.append('v', this.configService.get('API_VERSION'));
    data.append('attachment', dto.attachment);

    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      return { message: 'Сообщения отправлены' };
    } catch (e) {
      throw new HttpException('Ошибка отправки', HttpStatus.BAD_REQUEST);
    }
  }

  async getUsersIds(): Promise<string> {
    return '649424790,471261080';
  }
}
