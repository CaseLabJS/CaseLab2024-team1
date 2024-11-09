import { Roles, User, UserCredentials } from '@/types/sharedTypes'
import { BaseApi } from '../core/baseApi'
import { privateApi } from '../core/private.api'
import { UserFields } from './types'
import { QueryParams } from '../core/types'

const SERVICE_URL = '/users'
class UserControllerApi extends BaseApi {
  getUserById = (id: number, queryParams?: QueryParams) =>
    this.createRequest<User>({
      request: () =>
        privateApi.get(
          `${SERVICE_URL}/${id}`,
          queryParams ? { queryParams } : {}
        ),
      mock: () => import('./mock/user'),
    })

  createUser = (user: UserCredentials) =>
    this.createRequest<User>({
      request: () => privateApi.post(SERVICE_URL, user),
      mock: () => Promise.resolve(() => user),
    })

  updateUser = (user: UserCredentials) =>
    this.createRequest<User>({
      request: () => privateApi.put(`${SERVICE_URL}/${user.id}`, user),
      mock: () => Promise.resolve(() => user),
    })

  patchUser = (id: number, userFields: UserFields) =>
    this.createRequest<User>({
      request: () => privateApi.patch(`${SERVICE_URL}/${id}`, userFields),
      mock: async () => {
        const user = await this.getUserById(2)
        return () => ({ ...user, ...userFields })
      },
    })

  deleteUser = (id: number) =>
    this.createRequest<never>({
      request: () => privateApi.delete(`${SERVICE_URL}/${id}`),
    })

  addUserRole = (id: number, roleName: Roles) =>
    this.createRequest<User>({
      request: () =>
        privateApi.put(`${SERVICE_URL}/${id}/role`, { name: roleName }),
      mock: async () => {
        const user = await this.getUserById(2)
        user.roles.push({ id: user.roles.length, name: roleName })
        return () => user
      },
    })

  removeUserRole = (id: number, roleName: Roles) =>
    this.createRequest<User>({
      request: () =>
        privateApi.delete(`${SERVICE_URL}/${id}/role`, {
          data: { name: roleName },
        }),
      mock: async () => {
        const user = await this.getUserById(2)
        user.roles = user.roles.filter((role) => role.name !== roleName)
        return () => user
      },
    })

  getUsers = (queryParams?: QueryParams) =>
    this.createRequest<User[]>({
      request: () =>
        privateApi.get(`${SERVICE_URL}`, queryParams && { queryParams }),
      mock: async () => {
        const user = await this.getUserById(2)
        return () => [user]
      },
    })

  recover = (id: number) =>
    this.createRequest<never>({
      request: () => privateApi.patch(`${SERVICE_URL}/${id}/recover`),
    })
}

export const userControllerApi = new UserControllerApi()
