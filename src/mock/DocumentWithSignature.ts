export class DocumentWithSignature {
  isUserAuthor = true
  isSignedByAuthor = true
  isSignedByUser = true

  sign = (isSigned: boolean) => {
    return isSigned
  }
  sendSignRequest = (censors: unknown) => {
    return censors
  }
  startVote = (props: unknown) => {
    return props
  }
}
