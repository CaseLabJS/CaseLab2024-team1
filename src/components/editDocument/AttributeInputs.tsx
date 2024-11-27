import { Box, Typography, TextField } from '@mui/material'
import { AttributeInputsProps } from './types'

const AttributeInputs = (props: AttributeInputsProps) => {
  const { fields, register, defaultDocumentValues, attrValues, attributes } =
    props
  return (
    <>
      {fields.map((field, index) => {
        const requiredAttr = attributes.find(
          (attr) => field.attributeName === attr.name
        )?.required
        const helperText = requiredAttr
          ? 'Поле обязательно для заполнения'
          : 'Поле можно оставить пустым'
        return (
          <Box
            key={field.id}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              my: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ height: 20 }}>
              {field.attributeName}
            </Typography>
            <TextField
              sx={{
                '& .MuiInputBase-root': {
                  p: 1,
                  fontSize: '.8rem',
                  overflowY: 'auto',
                },
              }}
              variant="outlined"
              fullWidth
              color={
                defaultDocumentValues.values[index].value !==
                attrValues[index].value
                  ? 'success'
                  : 'primary'
              }
              focused={
                defaultDocumentValues.values[index].value !==
                attrValues[index].value
              }
              placeholder={helperText}
              {...register(`values.${index}.value`, {
                required: requiredAttr,
              })}
              error={requiredAttr && !attrValues[index].value}
            />
          </Box>
        )
      })}
    </>
  )
}

export default AttributeInputs
