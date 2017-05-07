import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { classes, style } from 'typestyle' 
import { percent, viewHeight } from 'csx' 
import { AppState, DocumentMode, DomState } from '../types';
import { colors, fonts, shadows } from '../styles'
import { documentDeselect, documentInspect, documentSearch, documentSelect, store } from '../data';
import { TargetEdit, TargetSearch } from './index'  

const componentClass = style({ 
  backgroundColor: colors.panelBackground.toString(), 
  bottom: 0,    
  boxShadow: shadows.level3,
  color: colors.text.toHexString(),
  height: [percent(100), viewHeight(100)],
  minWidth: 300,  
  maxWidth: 300,  
  width: percent(100),  
  overflow: 'hidden',  
  position: 'fixed',
  right: 0, 
  top: 0
}) 

const tabHeight = 26

const scenePanelHeading = style({
  backgroundColor: colors.headerBackground.toString(),  
  borderBottom: `solid thin ${colors.border.toString()}`,
  height: tabHeight,
  position: 'relative',
  fontFamily: fonts.headerFamily,
  fontSize: fonts.headerSize,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 3  
})

const activeComponentClass = style({
  height: `calc(100% - ${tabHeight}px)`
})

const selectedColors = {
  fill: colors.inspector,
  stroke: colors.inspector
}

const toolClass = style({
  cursor: 'pointer',
  display: 'inline-block',
  margin: '0 2px', 
  padding: '6px 4px',
  transitionProperty: 'color',
  transitionDuration: '300ms', 
  $nest: {
    '&:hover': selectedColors
  }
})

const selectedToolClass = classes(toolClass, style(selectedColors))

const onTargetEditorClosed = () => store.dispatch(documentDeselect())  
const onInspect = () => store.dispatch(documentInspect())
const onSearch = () => store.dispatch(documentSearch(''))

@Component
export class MainPanel extends Vue { 
  @Prop() dom: DomState;
  render(h) {
    let activeComponent
    if (this.dom.documentMode === DocumentMode.search) {
      activeComponent = <TargetSearch searchText={this.dom.searchText} />
    } else if (this.dom.selector) {
      activeComponent = <TargetEdit onClose={onTargetEditorClosed} selector={this.dom.selector!} />
    } else {
      activeComponent = <div>(select an element)</div>
    }
  
    const inspectorClass = this.dom.documentMode === DocumentMode.inspect ? selectedToolClass : toolClass
    const searchClass = this.dom.documentMode === DocumentMode.search ? selectedToolClass : toolClass
    
    // todo: original art. these are placeholder icons
    /* https://iconmonstr.com/selection-17/ */
    /* https://iconmonstr.com/magnifier-4/ */
    return <div class={componentClass}>
      <div class={scenePanelHeading}>
        <div onClick={onInspect} class={inspectorClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path d="M18.764 17.385l2.66 5.423-2.441 1.192-2.675-5.474-3.308 2.863v-12.389l10 7.675-4.236.71zm2.236-7.385h2v-4h-2v4zm0 2.619l2 1.535v-2.154h-2v.619zm-10 8.77v-1.389h-4v2h4v-.611zm-8-3.389h-2v4h4v-2h-2v-2zm-2-14h2v-2h2v-2h-4v4zm2 8h-2v4h2v-4zm8-12h-4v2h4v-2zm6 0h-4v2h4v-2zm4 4h2v-4h-4v2h2v2zm-18 2h-2v4h2v-4z" />
          </svg>
        </div>
        <div class={searchClass} onClick={onSearch}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
          </svg>
        </div>
      </div>
      <div class={activeComponentClass}>
        {activeComponent}
      </div>
    </div>
  }
}
