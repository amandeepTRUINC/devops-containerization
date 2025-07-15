export interface TodoFormPropTypes {
  addUpdateItemToList: Function,
  currentItem: TodoItem
}

export interface TodoItem {
  _id?: string,
  description: string,
  isCompleted: boolean
  // For legacy/local use:
  id?: number,
  item?: string
}