import { Modes } from './types'

export const modesMap: Record<Modes, string> = {
  [Modes.Signature]: 'Запросить подпись',
  [Modes.Vote]: 'Создать голосование',
}
