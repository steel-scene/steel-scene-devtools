import * as Vue from 'vue';
import * as components from './components';
import { registerComponents } from './config';
import { App } from './app';

// setup general layout styles
import './styles/layout';

// register component options as VueComponents
registerComponents(components as any);

// bootstrap application
new Vue(App);
