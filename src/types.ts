export const enum DocumentMode {
  view,
  inspect,
  search,
  edit
}

export interface DomState {
  documentMode?: DocumentMode
  selector?: string
  searchText?: string 
}

export interface AppState {
  dom: DomState
}

export interface Action {
  type: string,
  data?: { [key: string]: string }
} 
