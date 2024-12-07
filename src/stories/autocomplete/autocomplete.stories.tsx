import { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Autocomplete } from '@/components/autocomplete/autocomplete.tsx'
import { testDocumentVersions } from '@/stories/autocomplete/testData/testData.ts'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    options: testDocumentVersions,
    placeholder: 'Поиск по документам',
    id: 'contractor-id',
    displayFields: ['title', 'description'],
    noOptionsText: 'Документы не найдены',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Autocomplete<(typeof testDocumentVersions)[number]>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sx: { minWidth: '20rem' },
  },
}

export const NoOptions: Story = {
  args: {
    options: [],
    placeholder: 'Поиск',
    id: 'contractor-id-no-options',
    noOptionsText: 'Нет доступных документов',
    sx: { minWidth: '20rem' },
  },
}
