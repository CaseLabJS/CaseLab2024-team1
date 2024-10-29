import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {testContractors} from "@/stories/autocomplete/autocomplete.stories.tsx";
import {useFormContext} from "react-hook-form";
import {CustomAutocomplete} from "@/components/autocomplete/autocomplete.tsx";

interface DocumentOptionsProps {
  sx?: object
  fileIndex?: number
}

export const DocumentOptions = (props: DocumentOptionsProps) => {
  const {sx, fileIndex} = props;
  const {register} = useFormContext()

  return (
    <Box sx={sx}>
      <Typography variant="body2" sx={{ minWidth: '8rem' }}>
        Отправить
      </Typography>
      <CustomAutocomplete
        options={testContractors}
        label="Введите название или ИНН контрагента"
        id="contractor-id"
        displayFields={['name', 'inn']}
        sx={{ flex: 7 }}
        noOptionsText="Нет организаций в списке ваших контрагентов. Найдите и пригласите их, чтобы отправлять документы"
        fileIndex={fileIndex}
        {...register(fileIndex !== undefined ? `items.${fileIndex}.recipient` : `items.recipient`)}
      />
    </Box>
  )
}