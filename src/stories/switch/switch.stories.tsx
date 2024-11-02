import { Meta, StoryObj } from '@storybook/react'
import { StyledSwitch } from '@/components/styled/switch.tsx'
import { ChangeEvent } from 'react'
import {decorators} from "@/stories/preview.tsx";

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
  decorators: decorators,
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
