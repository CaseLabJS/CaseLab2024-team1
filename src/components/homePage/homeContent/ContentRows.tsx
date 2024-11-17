import { Box, Typography } from '@mui/material'
import Card from './Card'
import { rowsContent } from './contentConfig'

const ContentRows = () => {
  return (
    <>
      {rowsContent.map((row, index) => (
        <Box key={index}>
          {row.contentRowHeader && (
            <Box sx={{ my: 5 }}>
              <Typography
                sx={{
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
                }}
              >
                {row.contentRowHeader}
              </Typography>
            </Box>
          )}
          <Box
            key={index}
            sx={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {row.cards.map((card, index) => (
              <Card
                key={index}
                cardHeader={card.cardHeader}
                headerImportant={card.headerImportant}
                cardContent={card.cardContent}
                cardListItems={card.cardListItems}
              />
            ))}
          </Box>
        </Box>
      ))}
    </>
  )
}

export default ContentRows
