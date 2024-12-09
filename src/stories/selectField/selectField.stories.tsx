import { ChangeEvent, useState } from 'react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { mockDocumentTypes } from '@/stories/selectField/testData/testData.ts'
import { SelectField } from '@/components/selectField/selectField.tsx'
import { DocumentType } from '@/types/sharedTypes.ts'

const meta = {
  title: 'Components/SelectField',
  component: SelectField,
  parameters: {
    layout: 'centered',
  },
  args: {
    options: mockDocumentTypes,
    value: mockDocumentTypes[0].name,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      console.log(event.target.value),
    getOptionLabel: (option) => option.name,
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      )
    },
  ],
} satisfies Meta<typeof SelectField<DocumentType>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: StoryFn<typeof SelectField> = () => {
  const [selectedValue, setSelectedValue] = useState(mockDocumentTypes[0].name)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value
    setSelectedValue(value)
    console.log('Выбранное значение:', value)
  }

  return (
    <SelectField
      options={mockDocumentTypes}
      value={selectedValue}
      onChange={handleChange}
      label="Выберите тип документа"
      getOptionLabel={(option) => option.name}
      sx={{}}
    />
  )
}

export const NoOptions: Story = {
  args: {
    options: [],
    value: '',
    sx: {},
  },
}
