import Vue from 'vue'
import Component from 'vue-class-component' 
import { Prop, Watch } from 'vue-property-decorator'
import { style } from 'typestyle'
import { percent, scale } from 'csx'
import { colors, fonts } from '../styles'
import { documentSearch, store } from '../data'
import { findSelectors } from '../utils'
import { TargetSearchItem } from './index'

const componentClass = style({
  height: '100%'
})

const searchBoxWrapperClass = style({
  position: 'relative',
  height: 37,
  boxShadow: 'unset'
})

const searchButtonClass = style({ 
  backgroundColor: colors.background.toHexString(),
  cursor: 'pointer', 
  position: 'absolute',  
  padding: '1px 9px 1px 9px',
  right: 0, 
  top: 0
})

const searchButtonIconClass = style({  
  fontFamily: fonts.codeFamily,
  fontSize: 25,  
  transitionProperty: 'transform',
  transitionDuration: '300ms', 
  transform: 'none',
  $nest: {
    '&:hover': {
      color: colors.danger.toHexString(),
      transform: scale(1.3)
    }
  }
})

const searchBoxClass = style({
  borderBottom: `solid thin ${colors.border}`, 
  borderTop: `none`, 
  borderRight: `none`, 
  borderLeft: `none`, 
  fontFamily: fonts.bodyFamily,
  fontSize: fonts.bodySize,
  padding: `8px 6px`, 
  width: percent(100),
  $nest: {
    '&::placeholder': {
      color: colors.textPlaceholder.toHexString(),
      fontStyle: 'italic'
    }
  }
})
const scrollPaneClass = style({
  overflowX: 'hidden',
  overflowY: 'auto',
  maxHeight: 'calc(100% - 50px)'
})

@Component
export class TargetSearch extends Vue {   
  @Prop() searchText
  
  searchResults: string[] = []
  
  @Watch('searchText')
  onSearchTextUpdate(newValue: string, oldValue: string) {
    this.searchResults = findSelectors(newValue)
  } 
  mounted() {
    const searchBox = this.$el.querySelector('[type="search"]') as HTMLInputElement;
    searchBox.focus();
  }
  
  focusSearchBox() {
    const searchBox = document.querySelector('.' + searchBoxClass) as HTMLElement
    searchBox.focus()
  }
  
  updateSearchResults(searchText: string) { 
    store.dispatch(documentSearch(searchText)) 
  }
  
  onSearchIconClicked() { 
    if (this.searchText) {
     this.updateSearchResults('')
    }
    this.focusSearchBox()
  }
  onSearchTextChanged(event: Event) { 
    const element = event.currentTarget as HTMLInputElement;
    this.updateSearchResults(element.value)
  } 
  render(h) {
    const results = this.searchResults
      .map((selector, index) => <TargetSearchItem
        isAnimated={index < 50}   
        key={selector}
        selector={selector} />
      ) 
    
    return <div class={componentClass}>
      <div class={searchBoxWrapperClass}>
        <div onClick={this.onSearchIconClicked} class={searchButtonClass}>
          <div class={searchButtonIconClass}>{'\u00D7'}</div>
        </div>  
        <input type="search"
          autofocus  
          class={searchBoxClass}
          value={this.searchText}
          placeholder="Search for elements" 
          onInput={this.onSearchTextChanged} />
      </div>
      <div class={scrollPaneClass}>
        {results}
      </div>
    </div>
  }
}
