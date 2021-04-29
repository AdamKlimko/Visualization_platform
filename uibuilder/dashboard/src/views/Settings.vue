<template>
<div>

    <b-container>

    <b-card class="my-3 shadow">
      <h2 slot="header">Nastavenia</h2>

      <b-row class="m-md-5">
        <b-col>
          <h4>Všetci klienti:</h4>
          <div class="client-picker overflow-auto">            
            <b-list-group v-if="allClients.length">
              <b-list-group-item v-for="(client,index) in allClients" :key="index">
                 {{client.name}} 

                  <b-button v-if="!selectedClients.some(selectedClient => selectedClient.id === client.id)" 
                    @click="addClient(client)" class="float-right" variant="dark" size="sm"> <span class="material-icons">add</span> </b-button>                  
                
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
                 <b-button @click="removeClient(client.id)" class="float-right" variant="dark" size="sm"> <span class="material-icons">remove</span> </b-button>   
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
        allClients: [],
        selectedClients: [],
      }
  },

  props: {
    userdata: {
        id: '',
        username: ''
    }
  },

  created: function() {
    this.loadData();    
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
      this.$db.getAllClients();                       //TODO zmenit vsetky sql prikazy na funkcie
      this.$db.getSelectedClients(this.userdata.id)
    },
    addClient: function(client) {
      this.$db.insertClientToUser(client,this.userdata.id)
      this.loadData();
    },
    removeClient: function(id) {
      this.$db.removeClientFromUser(id,this.userdata.id)
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