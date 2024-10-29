import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {agreement} from "@/stories/selectField/selectField.stories.tsx";
import {Controller, useFormContext} from "react-hook-form";
import {SelectField} from "@/components/selectField/selectField.tsx";


export const ActionButtons = () => {
  const {  control } = useFormContext()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Box>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Подписать и отправить
          </Button>
        </Box>
        <Box>
          <Controller
            name="status"
            control={control}
            render={({ field }) => {
              return (
                <SelectField
                  options={agreement}
                  fullWidth
                  getOptionLabel={(option) => option.text}
                  {...field}
                />
              )
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Box>
          <Button color="primary" fullWidth variant="text">
            Сохранить в черновиках
          </Button>
        </Box>
        <Box>
          <Button color="primary" fullWidth variant="text">
            Отменить
          </Button>
        </Box>
      </Box>
    </Box>
  )
}