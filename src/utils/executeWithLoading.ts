import { runInAction } from 'mobx'

interface Context {
  loading: boolean
  error: string | null
}

export async function executeWithLoading<T>(
  context: Context,
  action: () => Promise<T>
): Promise<T | void> {
  runInAction(() => {
    context.loading = true
    context.error = null
  })

  try {
    const result = await action()
    return result
  } catch (err) {
    runInAction(() => {
      context.error = err instanceof Error ? err.message : String(err)
    })
  } finally {
    runInAction(() => {
      context.loading = false
    })
  }
}
