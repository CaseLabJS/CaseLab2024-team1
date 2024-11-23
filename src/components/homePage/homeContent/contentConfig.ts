import { ContentRow } from './types'

export const rowsContent: ContentRow[] = [
  {
    contentRowHeader: 'TechDoc - система электронного документооборота',
    cards: [
      {
        cardHeader: 'Преимущества системы ЭДО',
        headerImportant: true,
        cardContent:
          'Обменивайтесь бухгалтерскими отчетами, актами, накладными и прочими документами. Без бумаги. Без лишних затрат. Быстро и просто.',
        cardListItems: null,
      },
    ],
  },
  {
    contentRowHeader: 'Почему TechDoc?',
    cards: [
      {
        cardHeader: 'UI / UX',
        headerImportant: false,
        cardContent:
          'Простой и понятный пользовательский интерфейс. Современные технологии. Производительность.',
        cardListItems: null,
      },
      {
        cardHeader: 'Прозрачность',
        headerImportant: false,
        cardContent:
          'Понятное и простое управление приложением со стороны администратора. Никаких секретов и ограничений.',
        cardListItems: null,
      },
      {
        cardHeader: 'Бизнес',
        headerImportant: false,
        cardContent:
          'Ваш бизнес в безопасности. Документы не потеряются, не порвутся, их никто не сожжет. Рукописи горят. База данных - нет.',
        cardListItems: null,
      },
    ],
  },
  {
    contentRowHeader: 'Возможности TechDoc',
    cards: [
      {
        cardHeader: 'Сотрудники',
        headerImportant: false,
        cardContent: 'Удобная работа с аккаунтами сотрудников:',
        cardListItems: [
          'создание / обновление пользователя',
          'частиное обновление данных пользователя',
          'удаление / восстановление пользователя',
          'добавление / удаление структурных ролей пользователя',
        ],
      },
      {
        cardHeader: 'Документы',
        headerImportant: false,
        cardContent: 'Ваши документы под полным контролем:',
        cardListItems: [
          'создание / удаление / восстановление документа',
          'обновление / частичное обновление версии документа',
          'добавление комментария',
        ],
      },
      {
        cardHeader: 'Атрибуты документов',
        headerImportant: false,
        cardContent:
          'Широкий спектр возможностей для управления атрибутами документов, в том числе:',
        cardListItems: [
          'создание / удаление / восстановление',
          'обновление / частичное обновление',
        ],
      },
      {
        cardHeader: 'Типы документов',
        headerImportant: false,
        cardContent: 'Гибкое управление типами документов:',
        cardListItems: ['создание / обновление', 'удаление / восстановление'],
      },
      {
        cardHeader: 'Подписи',
        headerImportant: false,
        cardContent: 'Возможности работы с электронными подписями:',
        cardListItems: [
          'подписание / отправка документа на подписание',
          'голосование / отмена голосования по документу',
        ],
      },
    ],
  },
]
