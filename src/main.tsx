import Vue from 'vue' 
import { cssReset } from './styles'
import { store } from './data'
import { MainPanel } from './components'
import { AppState, DomState } from './types'
import './styles/document'

const rootId = 'ssdevtools-root'

// prepare dom
const toolsRoot = document.createElement('div')
toolsRoot.id = rootId
document.body.appendChild(toolsRoot) 

const vueRoot = document.createElement('div')
toolsRoot.appendChild(vueRoot)

// do a reset based on a top level id
// to avoid clashing with styles on the actual page
cssReset(rootId)

// bootstrap application
new Vue({   
  data() {
    return { ... store.getState() }
  },
  el: vueRoot,
  mounted() {
    store.subscribe(() => {
      const newState = store.getState()
      for (const name in newState) {
        this.$data[name] = newState[name]
      } 
    })
  },
  render(h) {  
    return h(MainPanel, {
      props: this.$data
    })
  }
})