import { HttpException, HttpStatus } from '@nestjs/common';

export const extractVkResourceId = (urls: string[]) => {
  return urls.map((urlString) => {
    try {
      const url = new URL(urlString);
      const query = url.searchParams.get('z');
      const resourceTypes = [
        'photo',
        'video',
        'audio',
        'doc',
        'wall',
        'market',
        'poll',
        'question',
      ];

      if (query) {
        for (const type of resourceTypes) {
          const regex = new RegExp(`${type}(-?\\d+_\\d+)`);
          const match = query.match(regex);
          if (match) {
            return `${type}${match[1]}`;
          }
        }
      }

      return `В URL не найден подходящий тип ресурса ${urlString}`;
    } catch (error) {
      throw new HttpException(
        `Некорректный url ${urlString}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  });
};
