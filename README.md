# RS School REST service in docker

## Как запустить приложение:

1. Убедиться, что установлен и работает docker.

2. Запустить из командной строки (из директории с файлом docker-compose.yml)

```sh
docker compose up
```
3. При необходимости перезапустите приложение следующим образом: (в node 14 не всегда получается корректно запуститься, если файлы БД еще не созданы. Судя по всему, это проблема версии именно node 14+) (скорее всего, это не понадобится, так как реализован reconnect, но всё может быть)
```sh
docker compose restart
```
После появления файлов для БД проблема исчезает.

**Особенности**: для корректной работы с БД под Windows, убедитесь, пожалуйста, что Docker Desktop работает на основе движка WSL 2. Только в этом случае файлы БД будут корректно мэпиться на файлы в Windows. Иначе нормально запустить Postgres в докере не получится.

![Docker Desktop Settings](https://content.screencast.com/users/OlgaKuksa/folders/Capture/media/ee2c85b7-c4f1-4872-95f0-1846d7dca89b/LWR_Recording.png)


## Миграции

Исходный файл миграции находится в папке **src/migrations**. Он запускается в коде после подключения к БД через **connection.runMigrations()** (файл database/index.ts)

- Для того чтобы сгенерировать файлы миграции

```sh
npm run db:generate
или
yarn db:generate
```

- Для того чтобы запустить файлы миграции

```sh
npm run db:setup
или
yarn db:setup
```

- Для того чтобы откатить миграции

```sh
npm run db:revert
 или
 yarn db:revert
```
