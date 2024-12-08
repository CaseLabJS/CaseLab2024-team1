import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import documentsSignService from '@/stores/DocumentsSignService'
import { SignatureBlockProps } from './types'
import { SignByReviewer } from './signByReviewer'
import { SignByAuthor } from './signByAuthor'
import { Loader } from '@/components/loader/loader'
import { withDocument } from '@/hoc/withDocument'

export const SignatureBlockRaw: FC<SignatureBlockProps> = ({ document }) => {
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

export const SignatureBlock = withDocument(observer(SignatureBlockRaw))
