import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Meta, StoryObj } from '@storybook/react'
import { DocumentPage } from '@/pages/documentPage'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { http, HttpResponse } from 'msw'
import { mockDocument } from '@/stories/documentPage/mockDocument.ts'
import { mockSignature, mockVote } from '@/stories/documentPage/mockSign.ts'

const meta = {
  title: 'Components/DocumentPage',
  component: DocumentPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/documents/1']}>
        <ThemeProvider>
          <CssBaseline />
          <Routes>
            <Route path="/documents/:id" element={<Story />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof DocumentPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:6006/api/documents/1', () => {
          return HttpResponse.json(mockDocument)
        }),
        http.get('http://localhost:6006/api/documents/1/transitions', () => {
          return HttpResponse.json(['DELETED'])
        }),
        http.get('http://localhost:6006/api/sign', () => {
          return HttpResponse.json(mockSignature)
        }),
        http.get('http://localhost:6006/api/sign/voting', () => {
          return HttpResponse.json(mockVote)
        }),
      ],
    },
  },
}
