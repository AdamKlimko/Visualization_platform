<template>
<div>
    <b-navbar class="gradient-bg" toggleable="lg" type="light">
        <b-navbar-nav>

            <b-button v-b-toggle.sidebar variant="light">Klienti</b-button>
                <b-sidebar id="sidebar" title="Klienti" shadow>
                <div class="px-3 py-2">
                    <b-dropdown-item v-for="(client,index) in clients" :key="index" type="dark" variant="warning" >

                    <router-link :to="'/client/' + client.id" class="w-100 d-block my-padding sidebar-a">
                        {{ client.name }}
                    </router-link>
                    
                    </b-dropdown-item>
                </div>
            </b-sidebar>

            <b-nav-item class="ml-2">
                <router-link to="/">Mapa</router-link>
            </b-nav-item>  
                            
            <b-nav-item>
                <router-link to="/settings">Nastavenia</router-link>
            </b-nav-item> 

            <b-button v-b-toggle.sidebar-right variant="warning">Upozornenia</b-button>
            <b-sidebar id="sidebar-right" title="Upozornenia" right shadow>
            <div class="px-3 py-2">
                <b-alert show dismissible variant="warning">Teplota u <b>gasens1</b> je nezvyčajne <b>nízka</b></b-alert>
                <b-alert show dismissible variant="danger">Vlhosť vzduchu u <b>gasens3</b> je nebezpečne <b>vysoká!</b></b-alert>
            </div>
            </b-sidebar>
            
            
        </b-navbar-nav>            
    </b-navbar>
</div>  
</template>


<script>
module.exports = {
    props: [
        'clients' 
    ],
}
</script>


<style scoped>
a{    
    color: #fff;
}

a:hover{
    color: #ddd;
}

.sidebar-a{
    color: rgb(27, 27, 27);
}

.sidebar-a:hover{
    color: #000;
}
</style>