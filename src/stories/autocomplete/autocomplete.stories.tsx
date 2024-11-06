import { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Autocomplete } from '@/components/autocomplete/autocomplete.tsx'
import { testContractors } from '@/stories/autocomplete/testData/testData.ts'

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
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
} satisfies Meta<typeof Autocomplete<(typeof testContractors)[number]>>

export default meta
type Story = StoryObj<typeof meta>

export const Disabled: Story = {
  args: {
    options: testContractors,
    label: 'Введите название или ИНН контрагента',
    id: 'contractor-id-disabled',
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
    noOptionsText: 'Нет организаций в списке ваших контрагентов.',
    defaultValue: testContractors[0],
  },
}

export const NoOptions: Story = {
  args: {
    options: [],
    label: 'Введите название или ИНН контрагента',
    id: 'contractor-id-no-options',
    noOptionsText: 'Нет доступных вариантов.',
  },
}
