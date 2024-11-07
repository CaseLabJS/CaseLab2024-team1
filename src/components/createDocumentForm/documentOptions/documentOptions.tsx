import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Autocomplete } from '@/components/autocomplete/autocomplete.tsx'
import { forwardRef, Ref } from 'react'
import { testContractors } from '@/stories/autocomplete/testData/testData.ts'

interface DocumentOptionsProps {
  sx?: object
  errorMessage?: string
}

export const DocumentOptions = forwardRef(
  (props: DocumentOptionsProps, ref: Ref<HTMLInputElement>) => {
    const { sx, errorMessage, ...otherProps } = props

    return (
      <Box sx={sx}>
        <Typography
          variant="body2"
          sx={{ minWidth: { xs: '2rem', sm: '4rem', md: '6rem' } }}
        >
          Отправить
        </Typography>

        <Autocomplete
          ref={ref}
          options={testContractors}
          label="Введите название или ИНН контрагента"
          id="contractor-id"
          displayFields={['name', 'inn']}
          noOptionsText="Нет организаций в списке ваших контрагентов. Найдите и пригласите их, чтобы отправлять документы"
          errorMessage={errorMessage}
          {...otherProps}
        />
      </Box>
    )
  }
)

DocumentOptions.displayName = 'DocumentOptions'
