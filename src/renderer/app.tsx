import * as Vue from 'vue';
import { viewHeight } from 'csx';
import { classes, style } from 'typestyle';
import { fixRenderFunction } from './rendering';
import { flex } from './styles';

const appClass = style({
    height: viewHeight(100)
});

export const App: Vue.ComponentOptions<any> = {
    el: '#app',
    data: {},
    render(h) {
        return (<div class={classes(flex.containerFull, flex.vertical, appClass)}> 
            <address-bar></address-bar>
            <div class={flex.itemFill}>
                <view-port></view-port>
            </div>
        </div>);
    }
};

// override render function
fixRenderFunction(App);