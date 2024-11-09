import { Dropzone } from '@/components/dropzone/dropzone.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'

const meta = {
  title: 'Components/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onFilesAccepted: (files) => console.log(files),
  },
}
