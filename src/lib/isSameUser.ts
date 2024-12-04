export const isSameUser = <
  T1 extends { id: number },
  T2 extends { id: number },
>(
  user1: T1,
  user2: T2
): boolean => user1.id === user2.id
