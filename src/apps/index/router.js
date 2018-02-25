import Vue from 'vue';
import Router from "vue-router";
import Page1 from './components/pages';

Vue.use(Router);

export default new Router({
    routers: [
        {
            path: '/',
            name: 'page1',
            components: Page1
        }
    ]
})