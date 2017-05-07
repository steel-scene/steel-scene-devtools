import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { classes, style } from 'typestyle'
import { em, px } from 'csx'
import { colors, fonts } from '../styles'
import { focusNext } from '../utils'

const inputStyles = style({
    border: 'none',
    display: 'inline',
    fontFamily: fonts.codeFamily,
    fontSize: fonts.codeSize,
    height: em(1), 
    padding: `2px 0`,
    $nest: {
        '&:focus,&:active': {
            backgroundColor: colors.background.toHexString(),
            borderStyle: 'dashed',
            borderWidth: 'thin',
            borderColor: colors.border.toHexString(),
            outline: 'none'
        }
    }
});

@Component
export class ContentEditable extends Vue {
    @Prop() uniqueId: string
    @Prop() placeholder?: string
    @Prop() tabKeys?: string[] 
    @Prop() value: string   
    @Prop() autoFocus: boolean
    
    private width = 1
    emitChange(evt: Event) { 
        const element = evt.target as HTMLInputElement
        this.$emit('change', element.value) 
    }
    created() {
        this.recalculateWidth()
    }
    updated() {
        this.recalculateWidth()
    }
    mounted() {
        if (this.autoFocus) {
            (this.$el as HTMLInputElement).focus()
        }
    }

    onKeydown(evt: KeyboardEvent) {
        const element = evt.target as HTMLInputElement
        this.recalculateWidth()
        if (evt.key === 'Backspace' && !this.value) {
            evt.preventDefault()
            element.blur()
            
            focusNext(element, -1, undefined)
            this.$emit('back')
        } else if (evt.key === 'Tab') {
            evt.preventDefault()
            element.blur()
            
            const offset = evt.shiftKey ? -1 : 1
            focusNext(element, offset, (foundNext) => {
                if (!evt.shiftKey && !foundNext) {
                    this.$emit('nextNotFound')
                }
            })
        } else if (['Enter'].indexOf(evt.key) !== -1 || (this.tabKeys && this.tabKeys.indexOf(evt.key) !== -1)) {
            evt.preventDefault()
            element.blur()
            focusNext(element, 1, (foundNext) => {
                if (!foundNext) {
                    this.$emit('nextNotFound')
                }
            })
        } 
    }
    recalculateWidth() {
        this.width = Math.max(15, Math.round(7.6 * ((this.value && this.value.length) || 0)))
    }
    render(h) {
        return <input    
                style={`width:${this.width}px`}    
                autofocus    
                data-id={this.uniqueId}
                placeholder={this.placeholder || ''}
                class={inputStyles} 
                onInput={this.emitChange}  
                onBlur={() => this.$emit('blur')}
                onKeydown={this.onKeydown} 
                value={this.value} />
    }
}