import * as Vue from 'vue';
import { minimize, unsuffix } from '../shared/utils';
import { fixRenderFunction } from './rendering';

export const registerComponents = (components: { [key: string]: Vue.ComponentOptions<any> }) => {
    const componentSuffix: string = 'Component';
    const componentRegex: RegExp = /^(.+)Component$/;

    for (const key in components) {
        // skip non-components
        if (!key.match(componentRegex)) {
            continue;
        }
        // register MyGreatComponent as my-great
        const componentName = minimize(unsuffix(key, componentSuffix));
        const options = components[key];

        // modify component options        
        fixRenderFunction(options);
        
        Vue.component(componentName, options);
    }
}
