'use strict';

var Vue = require('vue');
var csx = require('csx');
var typestyle = require('typestyle');

var flex;
(function (flex) {
    flex.containerFull = typestyle.style({
        display: 'flex',
        width: csx.percent(100),
        justifyContent: 'space-around',
        $nest: {
            '> *': {
                flexShrink: 0,
                marginLeft: csx.px(10),
                marginRight: csx.px(10),
            }
        }
    });
    flex.itemFill = typestyle.style({
        flexGrow: 1,
        flexBasis: 'auto'
    });
    flex.vertical = typestyle.style({
        flexDirection: 'column'
    });
})(flex || (flex = {}));
//# sourceMappingURL=flex.js.map

var forms;
(function (forms) {
    forms.textField = typestyle.style({
        width: csx.percent(100),
        padding: csx.px(5)
    });
})(forms || (forms = {}));
//# sourceMappingURL=forms.js.map

const componentClass = typestyle.style({
    $nest: {
        button: {
            padding: csx.px(7),
            verticalAlign: 'middle',
            cursor: 'pointer'
        }
    }
});
const AddressBarComponent = {
    data() {
        return {};
    },
    render(h) {
        return (h("div", { class: typestyle.classes(flex.containerFull, componentClass) },
            h("div", null,
                h("button", null, "<"),
                h("button", null, ">")),
            h("div", { class: flex.itemFill },
                h("input", { class: forms.textField, placeholder: "Enter Address" })),
            h("div", null,
                h("button", null, "GO"))));
    }
};
//# sourceMappingURL=address-bar.js.map

const componentClass$1 = typestyle.style({
    $nest: {
        iframe: {
            width: csx.percent(100),
            height: csx.px(400)
        }
    }
});
const ViewPortComponent = {
    data() {
        return {};
    },
    render(h) {
        return (h("div", { class: componentClass$1 },
            h("iframe", null)));
    }
};



var components = Object.freeze({
	AddressBarComponent: AddressBarComponent,
	ViewPortComponent: ViewPortComponent
});

const arraySlice = Array.prototype.slice;
const arrayCopy = (list, start, end) => {
    return arraySlice.call(list, start, end);
};
//# sourceMappingURL=lists.js.map

const minimize = (input) => {
    if (!input || input.length < 1) {
        return input;
    }
    return input[0].toLowerCase() + input.substr(1, input.length - 1);
};
const unsuffix = (input, suffix) => {
    const lastIndexOfSuffix = input.lastIndexOf(suffix);
    if (lastIndexOfSuffix === -1) {
        return input;
    }
    return input.substr(0, lastIndexOfSuffix);
};
//# sourceMappingURL=strings.js.map

const fixRenderFunction = (options) => {
    if (options.render) {
        const orender = options.render;
        options.render = function (h) {
            const self = this;
            const f = function (tagName, attr) {
                return h.apply(self, [tagName, attr, arrayCopy(arguments, 2)]);
            };
            return orender.call(self, f);
        };
    }
};
//# sourceMappingURL=rendering.js.map

const registerComponents = (components) => {
    const componentSuffix = 'Component';
    const componentRegex = /^(.+)Component$/;
    for (const key in components) {
        if (!key.match(componentRegex)) {
            continue;
        }
        const componentName = minimize(unsuffix(key, componentSuffix));
        const options = components[key];
        fixRenderFunction(options);
        Vue.component(componentName, options);
    }
};
//# sourceMappingURL=config.js.map

const appClass = typestyle.style({
    height: csx.viewHeight(100)
});
const App = {
    el: '#app',
    data: {},
    render(h) {
        return (h("div", { class: typestyle.classes(flex.containerFull, flex.vertical, appClass) },
            h("address-bar", null),
            h("div", { class: flex.itemFill },
                h("view-port", null))));
    }
};
fixRenderFunction(App);
//# sourceMappingURL=app.js.map

typestyle.fontFace({
    fontFamily: csx.quote('Hind'),
    fontStyle: "normal",
    fontWeight: 400,
    src: "local('Hind'), local('Hind-Regular'), url(https://fonts.gstatic.com/s/hind/v6/PweUV6zQOwbea1HTWD9UxRTbgVql8nDJpwnrE27mub0.woff2) format('woff2')",
    unicodeRange: "U+02BC, U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200B-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB"
}, {
    fontFamily: csx.quote('Hind'),
    fontStyle: "normal",
    fontWeight: 400,
    src: "local('Hind'), local('Hind-Regular'), url(https://fonts.gstatic.com/s/hind/v6/_nGZcTICJK7Og5TmI2ZPqxTbgVql8nDJpwnrE27mub0.woff2) format('woff2')",
    unicodeRange: "U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF"
}, {
    fontFamily: csx.quote('Hind'),
    fontStyle: "normal",
    fontWeight: 400,
    src: "local('Hind'), local('Hind-Regular'), url(https://fonts.gstatic.com/s/hind/v6/Pmrg92KFJKj-hq44c2dqpvesZW2xOQ-xsNqO47m55DA.woff2) format('woff2')",
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215"
});
typestyle.cssRule('html, body', {
    width: csx.percent(100),
    height: csx.percent(100),
    fontFamily: 'Hind'
});
//# sourceMappingURL=layout.js.map

registerComponents(components);
new Vue(App);
//# sourceMappingURL=index.js.map
