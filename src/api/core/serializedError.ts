export class SerializedError extends Error {
  status?: number
  constructor({ status, message }: { status?: number; message?: string }) {
    super(message)
    this.status = status
    this.name = 'SerializedError'

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SerializedError)
    }
  }
}
