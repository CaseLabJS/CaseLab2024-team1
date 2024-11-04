import { Dropzone } from '@/components/dropzone/dropzone.tsx'
import { Meta, StoryObj } from '@storybook/react'
import { decorators } from '@/stories/preview.tsx'

const meta = {
  title: 'Components/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  decorators: decorators,
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onFilesAccepted: (files) => console.log(files),
  },
}
