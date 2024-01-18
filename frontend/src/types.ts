export type IQuote = {
  text: string
  author: string
  private: boolean
  creator: string
}

export type ICreator = {
  id: string
  name: string
  premium?: boolean
}

export type IStatusMessage = {
  id: number
  text: string
}
