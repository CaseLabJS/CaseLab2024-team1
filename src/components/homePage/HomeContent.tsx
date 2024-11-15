import { Typography, Box, Paper, List, ListItem } from '@mui/material'

const HomeContent: React.FC = () => {
  const importantTextStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: {
      xs: '1.5rem',
      lg: '2rem',
    },
    lineHeight: {
      xs: '30px',
    },
    p: 0,
  }
  const cardStyle = {
    width: {
      xs: 350,
      md: 350,
      lg: 400,
    },
    maxWidth: 400,
    minHeight: 100,
    m: 1,
    p: 2,
  }
  const cardHeaderStyle = {
    fontWeight: 'bold',
    fontSize: {
      xs: '1.2rem',
      lg: '1.5rem',
    },
  }
  const rowContainerStyle = {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
  return (
    <Box
      sx={{
        maxWidth: { xs: 400, md: 800, lg: 1400 },
        minWidth: { xs: 400, md: 800, lg: 1400 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 5 }}>
        <Typography sx={importantTextStyle} color="primary">
          TechDoc
        </Typography>
        <Typography sx={importantTextStyle}>
          система электронного документооборота
        </Typography>
      </Box>
      <Paper sx={cardStyle} elevation={6}>
        <Typography color="success" sx={cardHeaderStyle}>
          Преимущества системы ЭДО
        </Typography>
        <Typography variant="h6">
          Обменивайтесь бухгалтерскими отчетами, актами, накладными и прочими
          документами. Без бумаги. Без лишних затрат. Быстро и просто.
        </Typography>
      </Paper>
      <Box sx={{ my: 5 }}>
        <Typography sx={importantTextStyle}>Почему TechDoc?</Typography>
      </Box>
      <Box sx={rowContainerStyle}>
        <Paper elevation={6} sx={cardStyle}>
          <Typography color="primary" sx={cardHeaderStyle}>
            UI / UX
          </Typography>
          <Typography variant="h6">
            Простой и понятный пользовательский интерфейс. Современные
            технологии. Производительность.
          </Typography>
        </Paper>
        <Paper elevation={6} sx={cardStyle}>
          <Typography color="primary" sx={cardHeaderStyle}>
            Прозрачность
          </Typography>
          <Typography variant="h6">
            Понятное и простое управление приложением со стороны администратора.
            Никаких секретов и ограничений.
          </Typography>
        </Paper>
        <Paper elevation={6} sx={cardStyle}>
          <Typography color="primary" sx={cardHeaderStyle}>
            Бизнес
          </Typography>
          <Typography variant="h6">
            Ваш бизнес в безопасности. Документы не потеряются, не порвутся, их
            никто не сожжет. Рукописи горят. База данных - нет.
          </Typography>
        </Paper>
      </Box>
      <Box sx={{ my: 5 }}>
        <Typography sx={importantTextStyle}>Возможности TechDoc</Typography>
      </Box>
      <Box sx={rowContainerStyle}>
        <Paper elevation={6} sx={cardStyle}>
          <Typography color="primary" sx={cardHeaderStyle}>
            Сотрудники
          </Typography>
          <Typography variant="h6">
            Удобная работа с аккаунтами сотрудников:
          </Typography>
          <List dense={true} sx={{ fontSize: 20 }}>
            <ListItem>создание / обновление пользователя</ListItem>
            <ListItem>частиное обновление данных пользователя</ListItem>
            <ListItem>удаление / восстановление пользователя</ListItem>
            <ListItem>
              добавление / удаление структурных ролей пользователя
            </ListItem>
          </List>
        </Paper>
        <Paper elevation={6} sx={cardStyle}>
          <Typography color="primary" sx={cardHeaderStyle}>
            Документы
          </Typography>
          <Typography variant="h6">
            Ваши документы под полным контролем:
          </Typography>
          <List dense={true} sx={{ fontSize: 20 }}>
            <ListItem>создание / удаление / восстановление документа</ListItem>
            <ListItem>
              обновление / частичное обновление версии документа
            </ListItem>
            <ListItem>добавление комментария</ListItem>
          </List>
        </Paper>
        <Paper elevation={6} sx={cardStyle}>
          <Typography color="primary" sx={cardHeaderStyle}>
            Атрибуты документов
          </Typography>
          <Typography variant="h6">
            Широкий спектр возможностей для управления атрибутами документов, в
            том числе:
          </Typography>
          <List dense={true} sx={{ fontSize: 20 }}>
            <ListItem>создание / удаление / восстановление</ListItem>
            <ListItem>обновление / частичное обновление</ListItem>
          </List>
        </Paper>
        <Paper elevation={6} sx={cardStyle}>
          <Typography color="primary" sx={cardHeaderStyle}>
            Типы документов
          </Typography>
          <Typography variant="h6">
            Гибкое управление типами документов:
          </Typography>
          <List dense={true} sx={{ fontSize: 20 }}>
            <ListItem>создание / обновление</ListItem>
            <ListItem>удаление / восстановление</ListItem>
          </List>
        </Paper>
        <Paper elevation={6} sx={cardStyle}>
          <Typography color="primary" sx={cardHeaderStyle}>
            Подписи
          </Typography>
          <Typography variant="h6">
            Возможности работы с электронными подписями:
          </Typography>
          <List dense={true} sx={{ fontSize: 20 }}>
            <ListItem>подписание / отправка документа на подписание</ListItem>
            <ListItem>голосование / отмена голосования по документу</ListItem>
          </List>
        </Paper>
      </Box>
      <Box sx={{ my: 5 }}>
        <Typography sx={importantTextStyle}>
          Все это и многое другое вы найдете в TechDoc.
        </Typography>
        <Typography sx={importantTextStyle}>
          Присоединяйтесь, с TechDoc ваши документы в надежных руках!
        </Typography>
      </Box>
    </Box>
  )
}

export default HomeContent
