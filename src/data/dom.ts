import { Action, DomState, DocumentMode } from '../types'
import { merge, selectorForElement } from '../utils'

const INSPECT = 'DOCUMENT_INSPECT'
const DESELECT = 'DOCUMENT_DESELECT'
const SELECT = 'DOCUMENT_SELECT'
const SEARCH = 'DOCUMENT_SEARCH' 

const initialState = {
  documentMode: DocumentMode.view,
  selector: ''
}

export const documentInspect = () => ({
  type: INSPECT
})

export const documentDeselect = () => ({
  type: DESELECT
})

export const documentSearch = (searchText: string) => ({
  type: SEARCH,
  data: {
    searchText,
    documentMode: DocumentMode.search
  }
})

export const documentSelect = (element: HTMLElement | string) => ({
  type: SELECT,
  data: {
    documentMode: DocumentMode.edit,
    selector: element instanceof Element
      ? selectorForElement(element)
      : element
  }
})

export function dom(state: DomState = initialState, action: Action) {

  switch (action.type) {
    case INSPECT:
      return merge(state, {
        documentMode: DocumentMode.inspect
      }) 
    case SEARCH:
      return merge(state, {
        documentMode: DocumentMode.search,
        searchText: action.data!.searchText
      }) 
    case SELECT:
      return merge(state, {
        documentMode: DocumentMode.edit,
        selector: action.data!.selector
      }) 
    case DESELECT:
      return merge(state, {
        documentMode: DocumentMode.view,
        selector: ''
      }) 
    default:
      return state
  }
 
}
