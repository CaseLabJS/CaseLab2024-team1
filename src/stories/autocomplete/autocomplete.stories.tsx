import { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import {CustomAutocomplete} from "@/components/autocomplete/autocomplete.tsx";

export const testContractors = [
  { id: 1, name: 'Контрагент А', inn: '1234567890' },
  { id: 2, name: 'Контрагент Б', inn: '0987654321' },
  { id: 3, name: 'Контрагент В', inn: '1112223334' },
  { id: 4, name: 'Контрагент Г', inn: '4445556667' },
  { id: 5, name: 'Контрагент Д', inn: '7778889990' },
]

const meta = {
  title: 'Components/Autocomplete',
  component: CustomAutocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    options: testContractors,
    label: 'Введите название или ИНН контрагента',
    id: 'contractor-id',
    displayFields: ['name', 'inn'],
    noOptionsText: 'Нет организаций в списке ваших контрагентов.',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof CustomAutocomplete>

export default meta
type Story = StoryObj<typeof meta>

export const Disabled: Story = {
  args: {
    options: testContractors,
    label: 'Введите название или ИНН контрагента',
    id: 'contractor-id-disabled',
    displayFields: ['name', 'inn'],
    noOptionsText: 'Нет организаций в списке ваших контрагентов.',
    sx: { opacity: 0.5, minWidth: '25rem' },
  },
  decorators: [
    (Story) => (
      <div style={{ pointerEvents: 'none' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithPredefinedValue: Story = {
  args: {
    options: testContractors,
    label: 'Введите название или ИНН контрагента',
    id: 'contractor-id-predefined',
    displayFields: ['name', 'inn'],
    noOptionsText: 'Нет организаций в списке ваших контрагентов.',
    defaultValue: testContractors[0],
  },
}

export const NoOptions: Story = {
  args: {
    options: [],
    label: 'Введите название или ИНН контрагента',
    id: 'contractor-id-no-options',
    displayFields: ['name', 'inn'],
    noOptionsText: 'Нет доступных вариантов.',
  },
}