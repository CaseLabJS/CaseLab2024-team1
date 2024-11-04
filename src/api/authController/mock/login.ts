import type { AuthorizationModel } from '../types'

const loginData: AuthorizationModel = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlkIjoxLCJhIjpbIkFETUlOIl0sImV4cCI6MTczMDAxMzgzN30.tJR-67nbKJr8itzMCoTxgl7jtTLj6q3rtQl5vqk10W8=',
}

export default Promise.resolve(() => loginData)
