import { CreateDocumentForm } from '@/components/createDocumentForm/createDocumentForm.tsx'
import { Meta, StoryObj } from '@storybook/react'
import {testFiles} from "@/stories/createDocumentForm/testData/testData.ts";
import {decorators} from "@/stories/preview.tsx";

const meta = {
  title: 'Components/CreateDocumentForm',
  component: CreateDocumentForm,
  tags: ['autodocs'],
  decorators: decorators,
} satisfies Meta<typeof CreateDocumentForm>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    files: testFiles
  },
}
