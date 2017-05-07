import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { style } from 'typestyle' 
import { store, documentSelect } from '../data'
import { animations, colors, fonts, shadows } from '../styles'

const componentClass = style({  
  backgroundColor: colors.background.toHexString(),
  boxShadow: shadows.level1,
  color: colors.primary.toHexString(),
  cursor: 'pointer',
  fontFamily: fonts.codeFamily,
  fontSize: fonts.codeSize,
  margin: 7,
  padding: '4px 8px',
  $nest: {
    '&:hover': {
      backgroundColor: colors.highlight.toHexString(),
      boxShadow: shadows.level2
    },
    '&&:active': {
      backgroundColor: colors.touchdown.toHexString(),
      boxShadow: shadows.level1
    }
  }
})

const animatedClass = style({
  animationName: animations.fadeIn,
  animationDuration: '450ms',
  animationFillMode: 'both',
  animationTimingFunction: 'ease-out'
})

@Component
export class TargetSearchItem extends Vue {
  @Prop() isAnimated: boolean; 
  @Prop() selector: string;
  
  selected() {  
    store.dispatch(documentSelect(this.selector))
  } 
  render(h, ctx) {
    const containerClasses = [componentClass];
    if (this.isAnimated) {
      containerClasses.push(animatedClass)
    }
    
    return (
      <div onClick={this.selected} class={containerClasses.join(' ')}>
        {this.selector}
      </div>
    )  
  }
}
