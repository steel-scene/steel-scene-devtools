import * as Vue from 'vue';
import { arrayCopy } from '../shared/utils';

/** This attempts to bridge the gap between React and Vue render() */
export const fixRenderFunction = (options: Vue.ComponentOptions<any>) => {
    if (options.render) {
        const orender = options.render;
        options.render = function(h) {
            const self = this;
            const f = function (tagName: string, attr: {}) {
                return h.apply(self, [tagName, attr, arrayCopy(arguments, 2)]);
            }
            return orender.call(self, f);
        }
    }
}
