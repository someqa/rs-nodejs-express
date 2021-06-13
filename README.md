# RS School REST service in docker

## Как запустить приложение:

1) Убедиться, что установлен и работает docker.

2) Запустить из командной строки

**docker network create rsnet**

(для создания user defined bridge)

3) Запустить из комнадной строки (из директории с файлом docker-compose.yml)

**docker compose up**

## Info
Ссылки на запушленые images в dockerhub:
1) [Postgres](https://hub.docker.com/r/someqa/rspostgres/)
2) [NodeApp](https://hub.docker.com/r/someqa/rsnode/)
В docker-compose не прописывала использование этих имэджей, если нужно, вместо строки
build: .
image: someqa/rsnode

## Testing
Моменты по тестированию в рамках требований кросс-чека:
1) контейнер действительно перезапускается при ошибке, но из CLI это не всегда видно. Самый простой способ проверить - через пару секунд после выброшенной ошибки попробовать пройти по адресу в браузере
https://localhost:4000
2) логи и файлы БД отмэплены на физическое место. Логи пишутся норм, а вот с Postgres под Windows не всегда отрабатывает корректно. Это известное issue в репозитории postgres, если запустить из WSL или в линуксе, должно сработать. 


