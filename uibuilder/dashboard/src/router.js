// const HeaderMenu = httpVueLoader('./components/HeaderMenu.vue');
const Home = httpVueLoader('./views/Home.vue');
const About = httpVueLoader('./views/About.vue');
const Client = httpVueLoader('./views/Client.vue');

export default {
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                default: Home
            },
        },
        {
            path: '/about',
            name: 'about',
            components: {
                default: About
            },
        },
        {
            path: '/client',
            name: 'client',
            components: {
                default: Client
            },
        },
    ],
};