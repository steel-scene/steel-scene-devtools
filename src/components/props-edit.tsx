import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { List } from 'immutable'
import { classes, style } from 'typestyle'
import { percent, px, scale } from 'csx'
import { colors, fonts } from '../styles'
import { focusById, guid } from '../utils'
import { ContentEditable } from './index'

const componentClass = style({
  padding: '6px 8px',
  position: 'relative',
  backgroundColor: colors.background.toHexString(),
  borderBottomColor: colors.borderLighter.toHexString(),
  borderBottomStyle: 'solid',
  borderBottomWidth: 1
})

const sectionClass = style({
  fontFamily: fonts.bodyFamily,
  fontSize: fonts.bodySize, 
  color: colors.primary.toHexString()
})

const tableClass = style({ 
  fontFamily: fonts.codeFamily,
  fontSize: fonts.codeSize,
  fontWeight: 'bold',
  padding: '0 8px 0 18px',
  width: percent(100)  
})

const propertyClass = style({
  padding: '1px 0',
  height: px(14)
})

const middleAlign = style({
  verticalAlign: 'middle'
})

const propertyEditorNameClass = style({ 
  $nest: {
    input: {
      color: colors.info.toHexString(),
      fontWeight: 'bold'
    }
  }
})

const clingyClass = style({ 
  position: 'relative',
  left: -4
})

const propertyEditorClass = style({ 
  display: 'inline-block',
  minWidth: px(10),
  padding: '1px 0 1px 0',
  $nest: {
    '&:focus': {
      backgroundColor: 'white'
    }
  }
})

const propertyAddClass = style({
  cursor: 'pointer'
}) 

const removeClass = style({
  cursor: 'pointer',
  fontFamily: fonts.codeFamily,
  fontSize: px(16),
  fontWeight: 'bold',
  padding: '3px 8px',
  position: 'absolute',
  right: 0,
  top: 0,
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

@Component
export class PropsEdit extends Vue {
  private key = guid() 
  @Prop() properties
  @Prop() isDeleteable: boolean 
  @Prop() isSectionNameEditable: boolean 
  @Prop() sectionName: string
  
  onAddProperty() {  
    const properties = this.properties.push({
      key: guid(),
      name: '',
      value: ''
    })
    
    this.updateProperties(properties)
  } 
  
  onBack(index: number) {
    const name = this.properties.get(index)
    if (!name.name) {
      const properties = this.properties.remove(index)
      this.updateProperties(properties)
    } 
  }
 
  onNameUpdate(index: number, name: string) {
    const sanitizedName = (name || '').trim()
    
    let properties: List<Property>
    if (!name) { 
      properties = this.properties.remove(index)
    } else {
      properties = this.properties.update(index, s => Object.assign(s, { name: sanitizedName }))
    } 
   
    this.updateProperties(properties)
  } 
  onUpdateSectionName(value: string) { 
    this.$emit('nameUpdate', value) 
  } 
  onValueUpdate(value: string, index: number) {
    const properties = this.properties.update(index, s => Object.assign(s, { value }))
    this.updateProperties(properties)
  } 
  updateProperties(properties: List<Property>) {
    this.$emit('propertyUpdate', properties) 
  } 
  render() {
    const nameTabKeys = [':'];
    const valueTabKeys = [';'];
    const items = this.properties
      .map((p: Property, index: number) =>
        <div key={p.key} class={propertyClass}>
          <div class={classes(propertyEditorClass, middleAlign, propertyEditorNameClass)}>
            <ContentEditable
              tabKeys={nameTabKeys}
              uniqueId={p.key}
              value={p.name}
              autoFocus={!p.name}
              onBack={() => this.onBack(index)}
              onBlur={() => this.onBack(index)}
              onChange={(name) => this.onNameUpdate(index, name)} />
          </div>
          <div class={classes(propertyEditorClass, middleAlign, clingyClass)}>
            <span class={middleAlign}>:</span> <ContentEditable
              tabKeys={valueTabKeys}
              value={p.value}
              onNextNotFound={this.onAddProperty}
              onChange={(value) => this.onValueUpdate(value, index)} />
            <span class={classes(clingyClass, middleAlign)}>;</span>
          </div>
        </div>
      )
      .toArray()
    
    const sectionTemplate = this.isSectionNameEditable
      ? <ContentEditable 
        placeholder='(new state)'
        uniqueId={this.key}  
        value={this.sectionName}
        onNextNotFound={this.onAddProperty}
        class={sectionClass}
        onChange={this.onUpdateSectionName}
        />
      : <span>{this.sectionName || '(empty)'}</span>
    
    const actionButton = this.isDeleteable
      ? <span class={removeClass} onClick={() => this.$emit('delete', this.sectionName)}>&times;</span>
      : undefined
    
    return <div class={componentClass}>
      <div class={sectionClass}> 
        {actionButton}
        <span>{sectionTemplate} {'{'}</span>
      </div>  
      <div class={tableClass}>
        {items}
      </div>
      <div class={propertyAddClass} onClick={this.onAddProperty}> {'}'}</div>
    </div>
  }
}

export interface Property {
  key: string
  name: string
  value: string 
}
