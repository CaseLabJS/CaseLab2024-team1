export interface ContentRow {
  contentRowHeader: ContentHeader
  cards: Card[]
}

export interface Card {
  cardHeader: string
  headerImportant: boolean
  cardContent: string
  cardListItems: CardListItems
}

export type ContentHeader = string | null
export type CardListItems = string[] | null
