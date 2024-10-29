import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {forwardRef, Ref, useCallback, useState} from "react";
import {Attribute} from "@/types/sharedTypes.ts";

interface DynamicFormFieldProps {
  attr: Attribute;
}

export const DynamicFormField = forwardRef((props: DynamicFormFieldProps, ref: Ref<HTMLInputElement>) => {
  const {attr,
    ...otherProps
  } = props;
  const [visible, setVisible] = useState(attr.required)

  const handleShowField = useCallback(() => {
    setVisible(prev => !prev);
  }, [])

  return (
    <FormControl
      key={attr.id}
      fullWidth
      id="formControlOptional"
      sx={{
        '& .MuiFormControl-root': {
          flex: 0.5,
        },
        '& .MuiInputBase-input': {
          padding: '.5rem',
        },
      }}
      required={attr.required}
    >
      <Typography variant="body2" sx={{ minWidth: '8rem' }}>
        {attr.name}
      </Typography>
      {!attr.required && !visible && (
        <Button
          onClick={() => handleShowField()}
          variant="text"
          sx={{
            '&.MuiButtonBase-root': {
              fontSize: 'small',
            },
          }}
        >
          Заполнить
        </Button>
      )}
      {visible && (
        <TextField
          fullWidth
          required={attr.required}
          ref={ref}
          {...otherProps}
        />
      )}
    </FormControl>
  )
})