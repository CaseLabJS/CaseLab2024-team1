import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import {StyledSwitch} from "@/components/styled/switch.tsx";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import {ChangeEvent} from "react";
import {useTheme} from "@mui/material";

interface FormControlProps {
  isChecked: boolean
  handleChangeChecked: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FormControl = (props: FormControlProps) => {
  const {isChecked, handleChangeChecked} = props;
  const theme = useTheme();

  return (
    <Box
      className="formControl"
      sx={{
        '& .MuiInputBase-root': {
          display: 'none',
        },
      }}
    >
      <FormControlLabel
        sx={{ margin: 0, gap: '0.5rem' }}
        control={
          <StyledSwitch
            sx={{ m: 1 }}
            checked={isChecked}
            onChange={handleChangeChecked}
          />
        }
        label="Объединить все документы в единый пакет"
      />
      <InputLabel
        htmlFor="fileInput"
        sx={{ color: theme.palette.primary.main, cursor: "pointer"}}
      >
        Загрузить ещё
      </InputLabel>
      <Input type="file" id="fileInput" />
    </Box>
  )
}