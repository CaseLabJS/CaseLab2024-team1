import { ChangeEvent, useState } from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { testDocumentsType } from '@/stories/selectField/testData/testData.ts'
import { SelectField } from '@/components/selectField/selectField.tsx'
import { decorators } from '@/stories/preview.tsx'
import { DocumentType } from '@/types/sharedTypes.ts'

export const Agreement = [
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
  decorators: decorators,
} satisfies Meta<typeof SelectField<DocumentType>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: StoryFn<typeof SelectField> = () => {
  const [selectedValue, setSelectedValue] = useState(testDocumentsType[0].name)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
}

export const NoOptions: Story = {
  args: {
    options: [],
    value: '',
    sx: {},
  },
}

export const AgreementSelect: StoryFn<typeof SelectField> = () => {
  const [selectedValue, setSelectedValue] = useState(Agreement[0].text)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value
    setSelectedValue(value)
    console.log('Выбранное значение:', value)
  }

  return (
    <SelectField
      options={Agreement}
      value={selectedValue}
      onChange={handleChange}
      label="Выберите статус"
      fullWidth
      getOptionLabel={(option) => option.text}
      sx={{}}
    />
  )
}
