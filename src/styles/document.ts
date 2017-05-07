import { createTypeStyle } from 'typestyle'
import { getAncestors, tail } from '../utils'
import { colors } from './index'
import { DocumentMode } from '../types' 
import { documentSelect, store } from '../data'

// define what can be inspected
// ids and classnames are our best bet right now
const rootSelector = 'body>*:not(#ssdevtools-root)'
const inspectables = ['[class]', '[id]'];
const inspectorSelector = inspectables
  .map(s => rootSelector + ' ' + s + ':hover')
  .join(',')

// initialize a secondary instance of typestyle so we can clear
// all styles each time we modify global styles
const inspectStyleElement = document.createElement('style')
document.head.appendChild(inspectStyleElement)
const ts = createTypeStyle(inspectStyleElement)

const handleDocumentClick = (evt: Event) => {
  const element = evt.target as Element

  // skip processing if the click was on the devtools themselves
  const ancestors = getAncestors(element) as HTMLElement[]
  const appRoot = document.getElementById('ssdevtools-root') as HTMLElement
  
  // ignore document clicks if appRoot is part of its chain
  if (ancestors.indexOf(appRoot) !== -1) {
    return
  }
    
  // ignore document clicks if not in inspect mode
  if (store.getState().dom.documentMode !== DocumentMode.inspect) {
    return
  }

  const closestIdElement = tail(ancestors, s => !!(s.id || s.classList.length) && s.tagName !== 'BODY')

  // if a suitable element can't be found in the chain ignore click
  if (!closestIdElement) {
    return
  }
  
  // handle click and set element as selected
  evt.preventDefault()
  store.dispatch(documentSelect(closestIdElement!))
}

const renderDynamicStyles = () => {
  const state = store.getState()
  const selectedSelector = state.dom.selector
  const documentMode = state.dom.documentMode

  // clear styles
  ts.reinit()

  // style selected element
  if (selectedSelector) {
    ts.cssRule(selectedSelector, {
      outlineColor: colors.inspector,
      outlineStyle: 'dashed',
      outlineWidth: 3,
      outlineOffset: 6
    })
  }

  // handle document mode styles
  switch (documentMode) {
    case DocumentMode.inspect:
      ts.cssRule(inspectorSelector, {
        cursor: colors.inspector,
        outlineStyle: 'solid',
        outlineWidth: 3,
        outlineColor: colors.inspector,
        outlineOffset: 6
      })
      return
  }
}

// wire up special logic for the document inspector
document.addEventListener('click', handleDocumentClick)

// rerender on state change
store.subscribe(renderDynamicStyles)

// render styles for first time
renderDynamicStyles()