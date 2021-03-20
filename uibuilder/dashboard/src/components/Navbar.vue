<template>
<div>
    <b-navbar class="gradient-bg" toggleable="lg" type="light" variant="warning">
            <b-navbar-nav>

                <b-nav-item>
                    <router-link to="/">Domov</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/map">Mapa</router-link>
                </b-nav-item>

                <b-nav-item-dropdown text="Klienti" right>
                    
                    <b-dropdown-item v-for="(client,index) in clients" :key="index" type="dark" variant="warning" >

                        <router-link @click.native="loadData(index+1)" :to="'/client/' + client.id" class="w-100 d-block my-padding">
                            {{ client.name }}
                        </router-link>
                        
                    </b-dropdown-item>
                    
                </b-nav-item-dropdown>

            </b-navbar-nav>            
        </b-navbar>
</div>  
</template>



<script>
module.exports = {
    props: [
        'clients' 
    ],
    data: function() {
        return {  
        
        }        
    },
    computed: {
        
    },
    methods: { 
        loadData: function(id) {
            console.log("LODA DATA for client:" + id);
            uibuilder.send( {
                "topic": "loadClient",
                "query": "SELECT * FROM client_" + id + " ORDER BY time DESC LIMIT 200"
            } )
    }, 

    doEvent: uibuilder.eventSend,
    },
    mounted: function() {

    }
}
</script>



<style scoped>

</style>