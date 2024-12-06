import { Outlet, useParams } from 'react-router-dom'
import { DocumentsJournal } from '@/components/documentsJournal'

export const JournalPage = () => {
  const { journal } = useParams()

  return (
    <>
      <DocumentsJournal type={journal ?? 'all'} />
      <Outlet />
    </>
  )
}
