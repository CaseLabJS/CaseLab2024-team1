import { CreateDocumentForm } from '@/components/createDocumentForm/createDocumentForm.tsx'
import { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { mockDocumentTypes } from '@/stories/selectField/testData/testData.ts'

const meta = {
  title: 'Components/CreateDocumentForm',
  component: CreateDocumentForm,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/document-types']}>
        <ThemeProvider>
          <CssBaseline />
          <Routes>
            <Route path="/document-types" element={<Story />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CreateDocumentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:6006/api/document-types', () => {
          return HttpResponse.json(mockDocumentTypes)
        }),
      ],
    },
  },
}
