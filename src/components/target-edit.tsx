import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { List } from 'immutable'
import { style } from 'typestyle' 
import { colors, fonts, shadows } from '../styles'
import { PropsEdit, Property } from './index'

const addStateClass = style({
  boxShadow: shadows.level1,
  color: colors.success.toHexString(),
  cursor: 'pointer',  
  padding: 4,
  position: 'absolute',
  margin: 4,
  right: 2,
  top: 0,
  $nest: {
    '&:hover': { 
      boxShadow: shadows.level2
    },
    '&&:active': { 
      boxShadow: shadows.level1
    }
  }
})

const headingClass = style({
  backgroundColor: colors.background.toHexString(),
  padding: 9,
  position: 'relative'
})

const titleClass = style({
  color: colors.primary.toHexString(),
  fontFamily: fonts.codeFamily,
  fontSize: fonts.codeSize,
  fontWeight: 'bold'
})

@Component
export class TargetEdit extends Vue { 
  @Prop() onClose?: () => void
  @Prop() selector: string
  
  targetProperties: List<Property>
  states: List<TargetState>
  
  data() {
    return {
      targetProperties: List<Property>(),
      states: List<TargetState>()
    }
  }

  onAddStateClicked() {
    const lastState = this.states.last()
    const lastKey = lastState ? lastState.key : 0
    
    this.states = this.states.push({
      key: lastKey + 1,
      selector: '',
      properties: List<Property>()
    })
  } 
  onDeleteTargetState(index: number, name: string) {
    this.states = this.states.remove(index)
  }
  onTargetProperties(properties: List<Property>) {
    this.targetProperties = properties; 
  } 
  onStatePropertyUpdate(index: number, properties: List<Property>) {
    this.states = this.states.update(index, s => Object.assign(s, { properties }))
  }
  onStateSelectorUpdate(index: number, name: string) {
    this.states = this.states.update(index, s => Object.assign(s, { selector: name }))
  }
  render(h) {
    const states = this.states
      .map((s: TargetState, i: number) => 
        <PropsEdit
          key={s.key}  
          sectionName={s.selector}
          isDeleteable={true}
          isSectionNameEditable={true}
          onDelete={(name) => this.onDeleteTargetState(i, name)}
          onPropertyUpdate={(properties) => this.onStatePropertyUpdate(i, properties)}
          onNameUpdate={(name) => this.onStateSelectorUpdate(i, name)}        
          properties={s.properties}        
        />
      )
      .toArray()
    
    return <div>
      <div class={headingClass}>
        <div class={titleClass}>{this.selector}</div>
        <div class={addStateClass} onClick={this.onAddStateClicked}>+ state</div>             
      </div>
      <PropsEdit
        sectionName={'inherited'}
        isSectionNameEditable={false}
        isDeleteable={false}
        onPropertyUpdate={this.onTargetProperties} 
        properties={this.targetProperties} />
      {states}
    </div>
  }
}

export interface TargetState {
  key: number
  selector: string
  properties: List<Property>
}
