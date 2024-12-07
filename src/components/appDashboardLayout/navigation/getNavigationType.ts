import { NavigationType } from '@/components/appDashboardLayout/navigation/types.ts'

export const getNavigationType = (pathname: string): NavigationType | null => {
  const parts = pathname.split('/')
  const page = parts[2]

  if (Object.values(NavigationType).includes(page as NavigationType)) {
    return page as NavigationType
  }

  return null
}
