<template>
<div>     
    <b-navbar class="shadow-sm py-0" toggleable="lg" type="dark" variant="dark">

        <b-navbar-brand class="py-0"> <span class="material-icons cross">local_hospital</span> <b class="white">Smartcare</b></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <!-- Left aligned nav items -->
            <b-navbar-nav>
                <b-nav-item v-b-toggle.sidebar href="#"> <a href="#" class="px-2">Klienti</a> </b-nav-item>
                <b-nav-item> <router-link to="/" class="px-2">Mapa</router-link> </b-nav-item>                
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-if="newNotifs" v-b-toggle.sidebar-right> 
                    <span class="material-icons">notifications</span>                
                </b-nav-item> 
                <b-nav-item-dropdown menu-class="shadow" right>
                    <template #button-content>
                        <span class="material-icons">more_horiz</span>
                    </template>
                    <b-dropdown-item> <a href="#">Prihlásený: {{userdata.username}}</a> </b-dropdown-item>
                    <div class="dropdown-divider"></div>
                    <b-dropdown-item> <router-link to="/settings"><span class="material-icons">settings</span> Nastavenia</router-link> </b-dropdown-item>            
                    <b-dropdown-item> <router-link to="/about"><span class="material-icons">info</span> O projekte</router-link> </b-dropdown-item>
                    <b-dropdown-item @click="doLogoff"> <a href="#"><span class="material-icons">logout</span> Odhlásiť</a> </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>

        <!-- Left sidebar -->
        <b-sidebar id="sidebar" title="Klienti" shadow>
            <div class="w-100">
                <div class="sidebar-item" v-for="(client,index) in clients" :key="index">

                <router-link :to="'/client/' + client.id" class="px-3 py-3 d-block my-padding sidebar-a">
                    {{ client.name }}
                </router-link>
                
                </div>
            </div>
        </b-sidebar>

        <!-- Right sidebar -->
        <b-sidebar id="sidebar-right" title="Upozornenia" right shadow>
            <div class="px-3 py-2">                    
                <b-alert v-for="(notif,index) in notifications" :key="index" dismissible fade show :variant="notifType(notif.importance)">
                    <button @click="removeNotification(notif.id, index)" type="button" aria-label="Close" class="close">×</button>
                    <small><b class="d-block">{{getTime(notif.time)}}</b></small>
                    <p class="m-0">{{notif.message}}</p>
                </b-alert>
            </div>
        </b-sidebar>
            
    </b-navbar>
</div>  
</template>


<script>
module.exports = {
    data: function() {
        return {
            clients: [],
            notifications: []
        }
    },

    props: {
        userdata: {
            id: '',
            username: ''
        }
    },

    watch: {
        userdata: function() {
            if(this.userdata.id != '') {
                this.loadData()                
            }
        }
    },

    created: function() {
        if(this.userdata.id != '') {
                this.loadData()                
            }
    },

    computed: {
        newNotifs: function() {
            return this.notifications.length == 0 ? false : true
        }
    },

    methods: {
        loadData: function() {
            this.$db.getSelectedClients(this.userdata.id)          
            this.$db.getNotifications(this.userdata.id)
        },
        doLogoff: function() {
            uibuilder.logoff()
        },
        removeNotification(id, index) {
            this.notifications.splice(index,1)
            this.$db.deleteNotification(id)
        },
        notifType: function(importance) {
            if (importance === 1) {
                return "danger"
            }
            else {
                return "warning"
            }
        },
        getTime: function(timestamp) {
            let myDate = new Date(timestamp);                        
            let [month, date, year]    = myDate.toLocaleDateString("en-US").split("/")
            let [hour, minute, second] = myDate.toLocaleTimeString("en-US").split(/:| /)
            return `${hour}:${minute} - ${date}.${month}.${year}`
        }
    },

    mounted: function() {
        let component = this;
        uibuilder.onChange('msg', function(msg){
            // console.log(msg);
            switch(msg.topic){
                case "selected clients":
                    component.clients = msg.payload;
                    break;
                case "notifications":
                    component.notifications = msg.payload;                    
                    break;
                case "new notifications":
                    component.loadData()
                    break;
            }
        })
    }
}
</script>


<style scoped>
.nav-item{    
    color: #ddd;
    line-height: 2rem;
}

.nav-item:hover{
    color: #fff;
    background: #2d3236;
}

a{    
    color: #ddd;
    line-height: 2rem;
}

a::after{
    content: none !important;
}

.sidebar-a{
    color: rgb(27, 27, 27);
    text-transform: capitalize;
}

.sidebar-a:hover{
    color: #000;
}

.sidebar-item:hover{
    background: #eee;
}

.sidebar-item:active{
    background: rgba(255, 122, 122, 0.562);
}

.dropdown-item a{
    color: rgb(27, 27, 27);
    padding: 1rem;
}

.dropdown-item a:hover{
    color: #000;
}

.dropdown-item:active{
    background: rgba(255, 122, 122, 0.562);
}

.alert-danger {
    background-color: #ffd6d6;
    border-color: #ff5555;
}

.alert-warning {
    background-color: #fffadb;
    border-color: #ffeb77;
}

.cross{
    color: #cf3b3b;
    font-size: 1.2rem;
    line-height: 1.4rem;
}

@media (max-width: 768px) {
    .navbar .navbar-collapse {
        text-align: center;
    }
}
</style>