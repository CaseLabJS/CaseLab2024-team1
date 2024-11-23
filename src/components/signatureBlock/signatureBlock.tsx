import { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNotifications } from '@toolpad/core/useNotifications'
import documentsSignService from '@/stores/DocumentsSignService/DocumentsSignService'
import { DocumentWithSignature } from '@/stores/DocumentsSignService/types'
import { SignatureViewProps } from './types'
import { SignByReviewer } from './signByReviewer'
import { SignByAuthor } from './signByAuthor'
import { Loader } from '@/components/loader/loader'

export const SignatureBlock: FC<SignatureViewProps> = observer(
  ({ documentId }) => {
    const [document, setDocument] = useState<DocumentWithSignature | null>(null)
    const { loading, error, getDocumentById } = documentsSignService
    const notifications = useNotifications()

    useEffect(() => {
      const loadDocument = async () => {
        if (documentId) {
          const fetchedDocument = await getDocumentById(documentId)
          setDocument(fetchedDocument)
        }
      }

      void loadDocument()
    }, [documentId, getDocumentById])

    useEffect(() => {
      if (error) {
        notifications.show(error.message, {
          severity: 'error',
          autoHideDuration: 2000,
        })
      }
    }, [error, notifications])

    if (loading) return <Loader />

    if (!document) return null

    return (
      <>
        {!document.isUserAuthor && <SignByReviewer document={document} />}
        {document.isUserAuthor && <SignByAuthor document={document} />}

        {/*false && (
          <Box>
            <Button onClick={() => void document.sign()}>sign</Button>
            <Button onClick={() => void document.sendSignRequest(censors)}>
              send
            </Button>
            <Button onClick={() => void document.startVote()}>send</Button>
            <Button onClick={() => void document.cancelVote(censors)}>
              send
            </Button>
            <Typography>{document.status}</Typography>
            <Typography>{JSON.stringify(document.censors)}</Typography>
            <Button
              onClick={() =>
                document.addCensor({
                  email: 'email',
                  id: 1,
                  name: 'name',
                  roles: [],
                  surname: 'surname',
                })
              }
            >
              add censor
            </Button>
          </Box>
        )*/}
      </>
    )
  }
)
