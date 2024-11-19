import { makeAutoObservable, runInAction } from 'mobx'

import { UserCredentials } from '@/types/sharedTypes'

import { SerializedError } from '@/api/core/serializedError'
import { userControllerApi } from '@/api/userController'

import { executeWithLoading } from '@/utils/executeWithLoading'

import UserStore from '../UserStore'

class UsersListStore {
  users: InstanceType<typeof UserStore>[] = []
  loading: boolean = false
  error: SerializedError | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get loadingOnChildren() {
    return this.users.find((user) => user.loading) || false
  }

  async fetchUsers(params?: {
    showOnlyAlive?: boolean
    page?: number
    size?: number
    ascending?: boolean
  }) {
    const fetchedUsers = await executeWithLoading(this, async () =>
      userControllerApi.getUsers(params)
    )

    if (fetchedUsers) {
      runInAction(() => {
        this.users = fetchedUsers.map((userData) => new UserStore(userData))
      })
    }
  }

  async getUserById(userId: number) {
    return await executeWithLoading(this, async () =>
      userControllerApi.getUserById(userId)
    )
  }

  async createUser(user: UserCredentials) {
    const createdUser = await executeWithLoading(this, () =>
      userControllerApi.createUser(user)
    )

    if (createdUser) {
      runInAction(() => {
        this.users = [...this.users, new UserStore(createdUser)]
      })
    }
  }

  async deleteUser(userId: number) {
    await executeWithLoading(this, () => userControllerApi.deleteUser(userId))

    runInAction(() => {
      this.users = this.users.filter(
        (currentUser) => currentUser.userData.id !== userId
      )
    })
  }
}

const usersListStore = new UsersListStore()
export default usersListStore
