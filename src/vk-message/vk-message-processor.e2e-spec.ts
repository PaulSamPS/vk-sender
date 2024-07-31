import MockAdapter from 'axios-mock-adapter';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { VkMessageProcessor } from './vk-message.processor';
import { Job } from 'bull';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

describe('VkMessageProcessor (e2e)', () => {
  let app: INestApplication;
  let vkMessageProcessor: VkMessageProcessor;
  let mockAxios: MockAdapter;

  const configService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'TOKEN':
          return 'test-token';
        case 'GROUP_ID':
          return 'test-group-id';
        case 'API_VERSION':
          return '5.131';
        default:
          return null;
      }
    }),
  };

  const job: Job = {
    data: {
      user_ids: '123,456',
      message: 'Test message',
      attachment: ['https://vk.com/?z=photo123_456'],
    },
  } as Job;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        VkMessageProcessor,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    vkMessageProcessor =
      moduleFixture.get<VkMessageProcessor>(VkMessageProcessor);
    mockAxios = new MockAdapter(axios);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should send a message successfully', async () => {
    mockAxios.onPost('https://api.vk.com/method/messages.send').reply(200, {
      response: 'Сообщение отправлено',
    });

    const response = await vkMessageProcessor.sendMessage(job);

    expect(response).toEqual({ message: 'Сообщение отправлено' });
  });

  it('should throw an error when the request fails', async () => {
    mockAxios.onPost('https://api.vk.com/method/messages.send').reply(400, {
      error: 'Bad Request',
    });

    await expect(vkMessageProcessor.sendMessage(job)).rejects.toThrow(
      new HttpException(
        'Ошибка отправки, Error: Request failed with status code 400',
        HttpStatus.BAD_REQUEST,
      ),
    );
  });
});
