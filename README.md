# TechDoc

Система электронного документооборота.
Проект разработан в рамках CaseLab JavaScript 2024.

## Содержание

- [Технологии](#технологии)
- [Начало работы](#начало-работы)

## Технологии

- [React](https://www.react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [mobx](https://mobx.js.org/)
- [Material UI](https://mui.com/)

## Разработка

### Требования

Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v22.10+.

### Установка зависимостей

Для установки зависимостей, выполните команду:

```sh
npm install
```

### Конфигурация

В корневой папке проекта создадим файл .env.development, содержащий переменные окружения.

```sh
touch .env.development
```

Содержимое файла должно выглядеть так:

```sh
VITE_API_URL=https://backend.domain
```

где вместо `https://backend.domain` нужно вставить ссылку на бекэнд. Ссылку можно получить у участников проекта по запросу.

### Настройка доступа через VPN

Для получения доступа к бэкенду требуется установить [WireGuard](https://www.wireguard.com/install/). Далее нужно запросить конфиг у [CaseLab](https://github.com/CaseLabJS).
Запускаем WireGuard c использованием полученного конфига.

### Запуск Development сервера

Чтобы запустить сервер для разработки, выполните команду:

```sh
npm run dev
```

<details>

<summary>Креды для входа в приложение</summary>

```
email:admin
password:admin
```

</details>

### Запуск Development сервера c mock api

Чтобы запустить сервер для разработки c c mock api, выполните команду:

```sh
npm run dev:mock
```

### Создание билда

Чтобы выполнить production сборку, выполните команду:

```sh
npm run build
```

### storybook

Для запуска сервера storybook выполните команду:

```sh
npm run storybook
```
