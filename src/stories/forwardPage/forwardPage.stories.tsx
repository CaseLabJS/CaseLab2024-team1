import CssBaseline from '@mui/material/CssBaseline'
import { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ForwardPage } from '@/pages/forwardPage'
import { http, HttpResponse } from 'msw'
import { generateMockDocuments } from '@/stories/forwardPage/testData.ts'

const meta = {
  title: 'Components/ForwardPage',
  component: ForwardPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/documents']}>
        <ThemeProvider>
          <CssBaseline />
          <Routes>
            <Route path="/documents" element={<Story />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ForwardPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`http://localhost:6006/api/documents?page=0&size=5`, () => {
          const documents = generateMockDocuments(5)
          return HttpResponse.json(documents)
        }),
        http.get('http://localhost:6006/api/documents/countDocuments', () => {
          return HttpResponse.json(5)
        }),
      ],
    },
  },
}
