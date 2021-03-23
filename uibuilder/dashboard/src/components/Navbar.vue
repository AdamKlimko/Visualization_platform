<template>
<div>
    <b-navbar class="gradient-bg" toggleable="lg" type="light" variant="warning">
            <b-navbar-nav>

                <b-button v-b-toggle.sidebar variant="light">Klienti</b-button>
                    <b-sidebar id="sidebar" title="Klienti" shadow>
                    <div class="px-3 py-2">
                        <b-dropdown-item v-for="(client,index) in clients" :key="index" type="dark" variant="warning" >

                        <router-link :to="'/client/' + client.id" class="w-100 d-block my-padding">
                            {{ client.name }}
                        </router-link>
                        
                        </b-dropdown-item>
                    </div>
                </b-sidebar>

                <b-nav-item>
                    <router-link to="/">Mapa</router-link>
                </b-nav-item>  
                              
                <b-nav-item>
                    <router-link to="/settings">Nastavenia</router-link>
                </b-nav-item>                
                
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

</style>