import { ChangeEvent, useState } from 'react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Meta, StoryObj } from '@storybook/react'
import { testDocumentsType } from '@/stories/selectField/testData/testData.ts'
import {SelectField} from "@/components/selectField/selectField.tsx";

export const agreement = [
  {
    id: 343453,
    text: 'На согласование',
  },
  {
    id: 4341299,
    text: 'На подпись',
  },
]

const meta = {
  title: 'Components/SelectField',
  component: SelectField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    options: testDocumentsType,
    value: testDocumentsType[0].name,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      console.log(event.target.value),
    fullWidth: true,
    getOptionLabel: (option) => option.name,
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
  ],
} satisfies Meta<typeof SelectField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState(
      testDocumentsType[0].name
    )

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setSelectedValue(value)
      console.log('Выбранное значение:', value)
    }

    return (
      <SelectField
        options={testDocumentsType}
        value={selectedValue}
        onChange={handleChange}
        label="Выберите тип документа"
        fullWidth
        getOptionLabel={(option) => option.name}
        sx={{}}
      />
    )
  },
}

export const NoOptions: Story = {
  args: {
    options: [],
    value: '',
    sx: {},
  },
}

export const AgreementSelect: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState(agreement[0].text)

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setSelectedValue(value)
      console.log('Выбранное значение:', value)
    }

    return (
      <SelectField
        options={agreement}
        value={selectedValue}
        onChange={handleChange}
        label="Выберите статус"
        fullWidth
        getOptionLabel={(option) => option.text}
        sx={{}}
      />
    )
  },
}
