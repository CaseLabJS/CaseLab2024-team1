import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import {
  DocumentType,
  AttributeStore,
} from '@/components/documentType/documentType'
import attributeListStore from '@/stores/AttributeListStore' // Импортируем атрибуты из хранилища

export interface EditTypeProps {
  type: DocumentType
}

interface EditDocumentTypeFormProps extends EditTypeProps {
  open: boolean
  onClose: () => void
  onSave: (updatedType: DocumentType) => Promise<void>
}

const EditDocumentTypeForm: React.FC<EditDocumentTypeFormProps> = (props) => {
  const { open, onClose, type, onSave } = props

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
    watch,
  } = useForm<DocumentType>({
    defaultValues: type,
    mode: 'onChange',
  })

  const [attributes, setAttributes] = useState<AttributeType[]>([])
  const [defaultValues, setDefaultValues] = useState<DocumentType>(type)

  useEffect(() => {
    const fetchAttributes = async () => {
      const attrs = await attributeListStore.getAttributesliststore()
      setAttributes(attrs)
    }

    fetchAttributes()
    reset(type)
  }, [type, reset])

  // Отслеживание изменений в полях
  const watchedFields = watch()

  const onSubmit: SubmitHandler<DocumentType> = async (data) => {
    // Сравнение с начальными значениями
    if (JSON.stringify(data) !== JSON.stringify(defaultValues)) {
      await onSave(data)
      setDefaultValues(data)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать тип документа</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}
        >
          <TextField
            margin="dense"
            label="ID"
            type="number"
            fullWidth
            variant="outlined"
            {...register('id', { required: 'ID требуется' })}
            error={!!errors.id}
            helperText={errors.id?.message}
          />
          <TextField
            margin="dense"
            label="Название"
            type="text"
            fullWidth
            variant="outlined"
            {...register('name', { required: 'Название требуется' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="dense"
            label="Обязательный"
            type="checkbox"
            {...register('required')}
            onChange={(e) =>
              setValue('required', (e.target as HTMLInputElement).checked)
            }
          />
          <TextField
            margin="dense"
            label="ID атрибутов"
            type="text"
            fullWidth
            variant="outlined"
            {...register('attributeIds')}
            error={!!errors.attributeIds}
            helperText={errors.attributeIds?.message}
            onChange={(e) =>
              setValue(
                'attributeIds',
                e.target.value.split(',').map((id) => Number(id.trim()))
              )
            }
          />
          <Typography variant="caption" color="textSecondary">
            Введите ID атрибутов, разделенные запятыми.
          </Typography>

          <Box>
            <Typography variant="subtitle1">Доступные атрибуты:</Typography>
            {attributes.map((attr) => (
              <Box key={attr.id}>
                <input
                  type="checkbox"
                  {...register('attributeIds')}
                  value={attr.id}
                  checked={watchedFields.attributeIds?.includes(attr.id)}
                  onChange={(e) => {
                    const currentIds = watchedFields.attributeIds || []
                    if (e.target.checked) {
                      setValue('attributeIds', [...currentIds, attr.id])
                    } else {
                      setValue(
                        'attributeIds',
                        currentIds.filter((id) => id !== attr.id)
                      )
                    }
                  }}
                />
                <label>{attr.name}</label>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button type="submit" variant="contained" disabled={!isValid}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDocumentTypeForm
