import Vue from 'vue';
import Router from "vue-router";
import Page1 from './components/pages';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'page1',
            component: Page1
        }
    ]
})