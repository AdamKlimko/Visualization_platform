<template>
<div>

    <b-container>

    <b-card class="my-3">
      <h2 slot="header">Nastavenia</h2>

      <b-row class="m-md-5">
        <b-col>
          <h4>Všetci klienti:</h4>
          <div class="client-picker overflow-auto">            
            <b-list-group v-if="allClients.length">
              <b-list-group-item v-for="(client,index) in allClients" :key="index">
                 {{client.name}} 

                  <b-button v-if="!selectedClients.some(selectedClient => selectedClient.id === client.id)" 
                    @click="addClient(client)" class="float-right" variant="dark" size="sm"> + </b-button>                  
                
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col>
          <h4>Monitorovaní klienti:</h4>
          <div class="client-picker overflow-auto">
            <b-list-group v-if="allClients.length">
              <b-list-group-item v-for="(client,index) in selectedClients" :key="index">
                 {{client.name}}
                 <b-button @click="removeClient(client.id)" class="float-right" variant="dark" size="sm"> - </b-button>   
                 </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
      </b-row>

    </b-card>

    </b-container>
</div>  
</template>

<script>

module.exports = {
  
  data: function() {
    return{
        loaded: false,
        allClients: [],
        selectedClients: [],
      }
  },

  created: function() {
    this.loadData();
  },

  watch: {
    allClients: function() {
      if(this.allClients.length > 0) {
        this.loaded = true;
      }
    }
  },

  methods: {
    isSelected: function(client) {
      selectedClients.forEach(selectedClient => {
        if(selectedClient.id == client.id) {
          return true;
        }
      });
      return false;
    },
    loadData: function() {
      uibuilder.send( {
          "topic": "all clients",          
      } )
      uibuilder.send( {
          "topic": "selected clients",          
      } )
    },
    addClient: function(client) {
      uibuilder.send( {
          "topic": "add client",
          "payload": `INSERT INTO selected_clients (id, name, lat, lon) VALUES ('${client.id}', '${client.name}', '${client.lat}', '${client.lon}');`           
      } )
      this.loadData();
    },
    removeClient: function(id) {
      uibuilder.send( {
          "topic": "remove client",
          "payload": "DELETE FROM selected_clients WHERE id = " + id + ";"          
      } )
      this.loadData();
    }  

  },

  mounted: function() {

    let component = this;

    uibuilder.onChange('msg', function(msg){
        // console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg);

        switch(msg.topic){
                case "all clients":
                    component.allClients = msg.payload;          
                    break;
                case "selected clients":
                    component.selectedClients = msg.payload;                    
                    break;
            }
    })
  }
};
</script>

<style scoped>
.client-picker {
  height: 25rem;
  border: 1px solid #333;
  border-radius: 5px;
}
</style>