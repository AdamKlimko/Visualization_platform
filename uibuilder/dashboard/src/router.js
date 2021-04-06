const Settings = httpVueLoader('./views/Settings.vue');
const Map = httpVueLoader('./views/Map.vue');
const Client = httpVueLoader('./views/Client.vue');
const Navbar = httpVueLoader('./components/Navbar.vue');

export default {
    routes: [        
        {
            path: '/',
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
            path: '/settings',
            name: 'Settings',
            components: {
                default: Settings,
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