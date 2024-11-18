import { Card as CardType } from './types'
import { Paper, Typography, List, ListItem } from '@mui/material'

const Card = (props: CardType) => {
  const { cardHeader, headerImportant, cardContent, cardListItems } = props
  const cardHeaderColor = headerImportant ? 'success' : 'primary'
  return (
    <Paper
      sx={{
        width: {
          xs: 350,
          md: 350,
          lg: 400,
        },
        maxWidth: 400,
        minHeight: 100,
        m: 1,
        p: 2,
      }}
      elevation={6}
    >
      <Typography
        color={cardHeaderColor}
        sx={{
          fontWeight: 'bold',
          fontSize: {
            xs: '1.2rem',
            lg: '1.5rem',
          },
        }}
      >
        {cardHeader}
      </Typography>
      <Typography variant="h6">{cardContent}</Typography>
      {cardListItems && (
        <List dense={true} sx={{ fontSize: 20 }}>
          {cardListItems.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}

export default Card
