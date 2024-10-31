import { makeAutoObservable, runInAction } from 'mobx'

import { Role, User, UserCredentials } from '@/types/sharedTypes'

import { userControllerApi } from '@/api/userController'

class UserStore {
  users: User[] = []

  constructor() {
    makeAutoObservable(this)
  }

  private updateUserAtUsers(updatedUser: User) {
    this.users = this.users.map((currentUser) =>
      currentUser.id === updatedUser.id ? updatedUser : currentUser
    )
  }

  async fetchUsers() {
    const users = await userControllerApi.getUsers()
    console.log(users)
    runInAction(() => {
      this.users = [...users]
    })
  }

  async getUserById(userId: number) {
    return await userControllerApi.getUserById(userId)
  }

  async createUser(user: UserCredentials) {
    const createdUser = await userControllerApi.createUser(user)

    runInAction(() => {
      this.users = [...this.users, createdUser]
    })
  }

  async updateUser(user: UserCredentials) {
    const updatedUser = await userControllerApi.updateUser(user)

    runInAction(() => this.updateUserAtUsers(updatedUser))
  }

  async deleteUser(userId: number) {
    await userControllerApi.deleteUser(userId)

    runInAction(() => {
      this.users = this.users.filter((currentUser) => currentUser.id !== userId)
    })
  }

  async patchUser(userId: number, fields: Partial<UserCredentials>) {
    const patchedUser = await userControllerApi.patchUser(userId, fields)

    runInAction(() => this.updateUserAtUsers(patchedUser))
  }

  async addUserRole(userId: number, role: Role) {
    const userWithUpdatedRole = await userControllerApi.addUserRole(
      userId,
      role.name
    )

    runInAction(() => this.updateUserAtUsers(userWithUpdatedRole))
  }

  async removeUserRole(userId: number, role: Role) {
    const userWithRemovedRole = await userControllerApi.removeUserRole(
      userId,
      role.name
    )

    runInAction(() => this.updateUserAtUsers(userWithRemovedRole))
  }
}

const userStore = new UserStore()
export default userStore
