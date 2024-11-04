import { Meta, StoryObj } from '@storybook/react'
import { DocumentForm } from '@/components/createDocumentForm/documentForm/documentForm.tsx'
import { testFiles } from '@/stories/createDocumentForm/testData/testData.ts'
import { within, userEvent, expect } from '@storybook/test'
import { decorators } from '@/stories/preview.tsx'

const meta = {
  title: 'Components/DocumentForm',
  component: DocumentForm,
  tags: ['autodocs'],
  decorators: decorators,
} satisfies Meta<typeof DocumentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    file: testFiles[0],
    isChecked: false,
    onRequestSignatureChange: (checked) => console.log(checked),
    fileIndex: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByTestId('checkbox-control')

    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
}
