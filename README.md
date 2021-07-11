# RS School REST service in docker

## Как запустить приложение:

1. Убедиться, что установлен и работает docker.

2. Запустить из командной строки (из директории с файлом docker-compose.yml)

```sh
docker compose up
```
3. При необходимости **запустить тесты со своей машины**, пожалуйста, установите зависимости с помощью одной из команд:
```sh
npm i
или
yarn
```
node_modules для запуска приложения установлены локально в докере. Для того чтобы сработали модули, запускающие тесты, их нужно поставить на самой машине

**Особенности**: для корректной работы с БД под Windows, убедитесь, пожалуйста, что Docker Desktop работает на основе движка WSL 2. Только в этом случае файлы БД будут корректно мэпиться на файлы в Windows. Иначе нормально запустить Postgres в докере не получится.

![Docker Desktop Settings](https://content.screencast.com/users/OlgaKuksa/folders/Capture/media/ee2c85b7-c4f1-4872-95f0-1846d7dca89b/LWR_Recording.png)

4. Запускать сервер можно и локально, без докера, предварительно изменив .env файл:
POSTGRES_HOST=localhost,
а также выставить соответстующие локальной БД параметры POSTGRES_PORT, POSTGRES_USER,
POSTGRES_PASSWORD, POSTGRES_DB


## Миграции

Исходный файл миграции находится в папке **database/migrations**. Он запускается в коде после подключения к БД через **connection.runMigrations()** (файл src/app.module.ts)

Команды для генерации и отката миграции можно найти в package.json.

## Сравнение производительности Express и Fastify

Для сравнения производительности использовался инструмент Artillery, который действовал по сценарию:
- получить всех пользователей
- создать пользователя
- обновить данные этого пользователя
- получить этого пользователя
- удалить пользователя
- ещё раз запросить этого пользователя и получить 404 ошибку.

```sh
Параметры: duration: 20, arrivalRate: 50, maxVusers: 100. Подробнее - [конфиг](artillery/artillery.config.yml)
```
Краткое сравнение результатов (запуск в докере на Windows 10/WSL2):

Framework name | Scenarios Launched | Median | Max Response Time (ms) | p95 response time (ms) | Mean response (sec)
--- | --- | --- | --- |--- |---
Express | 204 | 2 | 7231 | 5609 | 46.05
Fastify | 208 | 2 | 7066 | 5638 | 45.22

Более подробные отчёты можно найти здесь:
[express in docker report](https://someqa.github.io/rs-nodejs-express/artillery/docker-reports/express-report.html)
[fastify in docker report](https://someqa.github.io/rs-nodejs-express/artillery/docker-reports/fastify-report.html)
[express on machine report](https://someqa.github.io/rs-nodejs-express/artillery/machine-reports/express-report.html)
[fastify on machine report](https://someqa.github.io/rs-nodejs-express/artillery/machine-reports/fastify-report.html)

В общем и целом результаты получились сопоставимые. Fastify смог обработать больше запросов, но время отклика чуть-чуть лучше у Express. По всей видимости, для выбора инструмента имеет смысл прописать более сложный профиль нагрузки в конфиге artillery, постараться сделать его максимально приближенным к реальным условиям - и исходя из результатов выбирать фрэймворк, который будет работать под капотом NestJS.

