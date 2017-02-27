import { flex, forms } from '../styles';
import { px } from 'csx';
import { classes, style } from 'typestyle';

const componentClass = style({
    $nest: {
        button: {
            padding: px(7),
            verticalAlign: 'middle',
            cursor: 'pointer'
        }
    }
});

export const AddressBarComponent = {
    data() {
        return { }
    },
    render(h) {
        return (
            <div class={classes(flex.containerFull, componentClass)}>
                <div>
                    <button>&lt;</button>                
                    <button>&gt;</button>
                </div>
                <div class={flex.itemFill}>
                    <input class={forms.textField} placeholder="Enter Address" />    
                </div>
                <div>
                    <button>GO</button>
                </div>
            </div>
        );
    }
};
