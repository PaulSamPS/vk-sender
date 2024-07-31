<p align="center">
  <a href="https://dev.vk.com/ru/method/messages.send" target="blank"><img src="https://sun9-18.userapi.com/impg/iC6W98AzQ-raA_l_sQrpqA8qr3cQBW07ILz4Wg/3TAHuh2cWjA.jpg?size=1552x858&quality=96&sign=f98b5d87595009befc29b32414907ffe&type=album" width="600" alt="Vk Logo" /></a>
</p>

## Описание

Отправка сообщений подписчикам.

## Установка

```bash
# Установка зависимостей
$ yarn install

# Разворачивание докер контейнера redis
$ docker-compose up -d
```

## Запуск

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# запуск в контейнере Docker
$ docker-compose up -d --build
```

## Тесты

```bash
# e2e tests
$ yarn run test:e2e
```
