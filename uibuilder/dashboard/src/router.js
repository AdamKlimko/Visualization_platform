// const HeaderMenu = httpVueLoader('./components/HeaderMenu.vue');
const Home = httpVueLoader('./views/Home.vue');
const Map = httpVueLoader('./views/Map.vue');
const Client = httpVueLoader('./views/Client.vue');
const Navbar = httpVueLoader('./components/Navbar.vue');

export default {
    routes: [
        {
            path: '/',
            name: 'Home',
            components: {
                default: Home,
                navbar: Navbar
            },
            props: {
                defalut: true,
                navbar: true
            }
        },
        {
            path: '/map',
            name: 'Map',
            components: {
                default: Map,
                navbar: Navbar
            },
            props: {
                defalut: true,
                navbar: true
            }
        },
        {
            path: '/client/:clientId',
            name: 'Client',
            components: {
                default: Client,
                navbar: Navbar
            },
            props: {
                defalut: true,
                navbar: true
            }
        },
    ],
};