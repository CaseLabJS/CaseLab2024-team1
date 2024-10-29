import { Meta, StoryObj } from '@storybook/react'
import { StyledSwitch } from '@/components/styled/switch.tsx'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ChangeEvent } from 'react'

const meta = {
  title: 'Components/StyledSwitch',
  component: StyledSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    checked: false,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      console.log(event.target.checked),
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof StyledSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: true,
    onChange: (event) => console.log(event.target.checked),
    sx: {},
  },
}

export const NoChecked: Story = {
  args: {
    checked: false,
    onChange: (event) => console.log(event.target.checked),
    sx: {},
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
    sx: { pointerEvents: 'none', opacity: 0.5 },
  },
}
