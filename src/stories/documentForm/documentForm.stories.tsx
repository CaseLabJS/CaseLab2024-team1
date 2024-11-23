import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Meta, StoryObj } from '@storybook/react'
import { DocumentForm } from '@/components/createDocumentForm/documentForm/documentForm.tsx'
import { testFiles } from '@/stories/createDocumentForm/testData/testData.ts'
import { FormProvider, useForm } from 'react-hook-form'

const meta = {
  title: 'Components/DocumentForm',
  component: DocumentForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          items: [
            { documentType: '', requestSignature: false, attributes: [] },
          ],
        },
      })
      return (
        <ThemeProvider>
          <CssBaseline />
          <FormProvider {...methods}>
            <Story />
          </FormProvider>
        </ThemeProvider>
      )
    },
  ],
} satisfies Meta<typeof DocumentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    file: testFiles[0],
    fileIndex: 0,
    onRemoveDocument: () => {},
    single: true,
    addFile: () => {},
  },
}
