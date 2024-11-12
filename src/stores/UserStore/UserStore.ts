import { makeAutoObservable, runInAction } from 'mobx'

import { Role, User, UserCredentials } from '@/types/sharedTypes'

import { userControllerApi } from '@/api/userController'

import { SerializedError } from '@/api/core/serializedError'
import { executeWithLoading } from '@/utils/executeWithLoading'

class UserStore {
  userData: User
  loading: boolean = false
  error: SerializedError | null = null

  constructor(user: User) {
    makeAutoObservable(this)

    this.userData = user
  }

  async updateUser(user: UserCredentials) {
    const updatedUser = await executeWithLoading(this, () =>
      userControllerApi.updateUser(user)
    )

    if (updatedUser) {
      runInAction(() => {
        this.userData = updatedUser
      })
    }
  }

  async patchUser(fields: Partial<UserCredentials>) {
    const patchedUser = await executeWithLoading(this, () =>
      userControllerApi.patchUser(this.userData.id, fields)
    )

    if (patchedUser) {
      runInAction(() => {
        this.userData = patchedUser
      })
    }
  }

  async addUserRole(role: Role) {
    const userWithUpdatedRole = await executeWithLoading(this, () =>
      userControllerApi.addUserRole(this.userData.id, role.name)
    )

    if (userWithUpdatedRole) {
      runInAction(() => {
        this.userData = userWithUpdatedRole
      })
    }
  }

  async removeUserRole(role: Role) {
    const userWithRemovedRole = await executeWithLoading(this, () =>
      userControllerApi.removeUserRole(this.userData.id, role.name)
    )

    if (userWithRemovedRole) {
      runInAction(() => {
        this.userData = userWithRemovedRole
      })
    }
  }
}

export default UserStore
