import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { TestContractors } from '@/stories/autocomplete/autocomplete.stories.tsx'
import { CustomAutocomplete } from '@/components/autocomplete/autocomplete.tsx'
import { forwardRef, Ref } from 'react'

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

        <CustomAutocomplete
          ref={ref}
          options={TestContractors}
          label="Введите название или ИНН контрагента"
          id="contractor-id"
          displayFields={['name', 'inn']}
          sx={{ flex: 7 }}
          noOptionsText="Нет организаций в списке ваших контрагентов. Найдите и пригласите их, чтобы отправлять документы"
          errorMessage={errorMessage}
          {...otherProps}
        />
      </Box>
    )
  }
)

DocumentOptions.displayName = 'DocumentOptions'
