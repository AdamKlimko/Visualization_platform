<template>
<div>     
    <b-navbar class="shadow-sm" toggleable="lg" type="dark" variant="dark">

        <b-navbar-brand class="white"><b>Smartcare</b></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <!-- Left aligned nav items -->
            <b-navbar-nav>
                <b-nav-item v-b-toggle.sidebar href="#"> <a href="#">Klienti</a> </b-nav-item>
                <b-nav-item> <router-link to="/">Mapa</router-link> </b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-b-toggle.sidebar-right> 
                    <span class="material-icons">notifications</span>
                </b-nav-item> 
                <b-nav-item-dropdown menu-class="shadow" right>
                    <template #button-content>
                        <span class="material-icons">more_horiz</span>
                    </template>
                    <b-dropdown-item class="px-2 py-1"> <a href="#">Prihlásený: {{userdata.username}}</a> </b-dropdown-item>
                    <div class="dropdown-divider"></div>
                    <b-dropdown-item class="px-2 py-1"> <router-link to="/settings"><span class="material-icons">settings</span> Nastavenia</router-link> </b-dropdown-item>            
                    <b-dropdown-item class="px-2 py-1" @click="doLogoff"> <a href="#"><span class="material-icons">logout</span> Odhlásiť</a> </b-dropdown-item>
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
                <b-alert show dismissible variant="warning">Teplota u <b>gasens1</b> je nezvyčajne <b>nízka</b></b-alert>
                <b-alert show dismissible variant="danger">Vlhosť vzduchu u <b>gasens3</b> je nebezpečne <b>vysoká!</b></b-alert>
            </div>
        </b-sidebar>
    
    </b-navbar>
</div>  
</template>


<script>
module.exports = {
    data: function() {
        return {
            clients: []
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
        this.loadData();                
    },

    methods: {
        loadData: function() {
            this.$db.getSelectedClients(this.userdata.id)          
        },
        doLogoff: function() {
          uibuilder.logoff()
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
            }
        })
    }
}
</script>


<style scoped>
a{    
    color: #ddd;
}

a:hover{
    color: #fff;
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

.dropdown-item a{
    color: rgb(27, 27, 27);
}

.dropdown-item a:hover{
    color: #000;
}
</style>