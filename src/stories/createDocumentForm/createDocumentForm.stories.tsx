import { CreateDocumentForm } from '@/components/createDocumentForm/createDocumentForm.tsx'
import { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Components/CreateDocumentForm',
  component: CreateDocumentForm,
  tags: ['autodocs'],
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
} satisfies Meta<typeof CreateDocumentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
