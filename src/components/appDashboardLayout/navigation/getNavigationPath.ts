export const getNavigationPath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
