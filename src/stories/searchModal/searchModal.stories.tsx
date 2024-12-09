import CssBaseline from '@mui/material/CssBaseline'
import { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from '@/theme/theme-provider/theme-provider.tsx'
import { SearchModal } from '@/components/search/searchModal/searchModal.tsx'
import { testDocumentVersions } from '@/stories/autocomplete/testData/testData.ts'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Components/SearchModal',
  component: SearchModal,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SearchModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    openModal: true,
    onCloseModal: () => {},
    options: testDocumentVersions,
    searchHistory: testDocumentVersions.slice(0, 2),
    displayFields: ['title', 'description'],
    onValueAdd: (value) => console.log(value),
  },
}
