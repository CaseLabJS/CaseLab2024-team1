import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import documentsSignService from '@/mock/DocumentsSignService'
import { SignatureBlockProps } from './types'
import { SignByReviewer } from './signByReviewer'
import { SignByAuthor } from './signByAuthor'
import { Loader } from '@/components/loader/loader'

export const SignatureBlock: FC<SignatureBlockProps> = observer(
  ({ document }) => {
    const { loading } = documentsSignService

    if (loading) return <Loader />

    if (!document) return null

    return (
      <>
        {document.isUserAuthor ? (
          <SignByAuthor document={document} />
        ) : (
          <SignByReviewer document={document} />
        )}
      </>
    )
  }
)
