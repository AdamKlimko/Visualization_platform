<template>
<div>

    <b-container>
    <b-card class="my-3 shadow">
      <h2 slot="header">Nastavenia</h2>
      <!-- Notification settings -->
      <b-row>
        <b-col>
          <h4>Nastavenia notifikácií</h4>
          <b-row class="my-4">
            <b-col>              
              <b-button v-b-toggle.collapse-1 variant="light" >E-mail <span class="material-icons">arrow_drop_down</span> </b-button>
              <b-collapse id="collapse-1" class="mt-2">                           
                <div class="p-5 mx-5">      
                  <b-row>
                    <div class="my-3 mx-3" v-if="notifSettings.email">
                      <h5>Email je aktivovaný <span class="material-icons">done</span></h5>
                      <b-button @click="updateEmail(0)" size="sm" variant="danger">Deaktivovať</b-button>                                
                    </div>
                    <div class="my-3 mx-3" v-else>
                      <h5>Email nie je aktivovaný</h5>
                    </div>
                  </b-row>
                  <b-form-group v-if="notifSettings.email" label="Zmeniť e-mail" label-for="inputPw"></b-form-group>
                  <b-form-group v-else label="Pridať e-mail" label-for="inputPw"></b-form-group>
                  <b-form-input id="email" v-model="inputEmail" type="email" placeholder="email" required></b-form-input><br>
                  <b-button @click="updateEmail(inputEmail)" class="w-100" variant="light">Uložiť</b-button>                                
                </div>
              </b-collapse>
            </b-col>
          </b-row>
          <b-row class="my-4">
            <b-col>
              <b-button v-b-toggle.collapse-2 variant="light">Telegram <span class="material-icons">arrow_drop_down</span> </b-button>
              <b-collapse id="collapse-2" class="mt-2">    
                <div class="p-5 mx-5">
                  <b-row>
                    <div class="my-3 mx-3" v-if="notifSettings.telegram_id">
                      <h5>Telegram je aktivovaný <span class="material-icons">done</span></h5>
                      <b-button @click="removeTelegram()" size="sm" variant="danger">Deaktivovať</b-button>                                
                    </div>
                    <div class="my-3 mx-3" v-else>
                      <h5>Telegram nie je aktivovaný</h5>
                      <b-button @click="loadData()" size="sm" variant="light">Obnoviť</b-button> 
                    </div>
                  </b-row>
                  <h6>Telegram aktivujete nasledovne</h6>
                  <p>Otvorte si aplikáciu Telegram na vašom smartfóne alebo na webe a vyhľadajte používateľa 
                    <b>"smartcare_sk_bot"</b>. Odoslaním správy, obsahujúcej váš telegram kód = <b>{{notifSettings.telegram_key}}</b> 
                    na tohto Telegram používateľa aktivujete notifikácie cez aplikáciu Telegram.</p>                                                 
                  <p>Link na Telegram web nájdete <a href="https://web.telegram.org/">tu</a></p>
                </div>                            
              </b-collapse>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr>     
        <!-- Selected clients settings -->
      <b-row>
        <b-col>
          <h4>Nastavenia klientov</h4>
        </b-col>
      </b-row>    
      <b-row class="m-md-4">        
        <b-col>          
          <h5>Všetci klienti:</h5>
          <div class="client-picker overflow-auto">            
            <b-list-group v-if="allClients.length">
              <b-list-group-item v-for="(client,index) in allClients" :key="index">
                {{client.name}} 
                <b-button v-if="!selectedClients.some(selectedClient => selectedClient.id === client.id)" 
                  @click="addClient(client)" class="float-right" variant="dark" size="sm" pill> <span class="material-icons">add</span> </b-button>                                  
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col>
          <h5>Monitorovaní klienti:</h5>
          <div class="client-picker overflow-auto">
            <b-list-group v-if="allClients.length">
              <b-list-group-item v-for="(client,index) in selectedClients" :key="index">
                 {{client.name}}
                 <b-button @click="removeClient(client.id)" class="float-right" variant="danger" size="sm" pill> <span class="material-icons">remove</span> </b-button>   
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
        notifSettings: {},
        inputEmail: null,
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
      this.$db.getAllClients();
      this.$db.getSelectedClients(this.userdata.id)
      this.$db.getNotificationSettings(this.userdata.id)
    },
    addClient: function(client) {
      this.$db.insertClientToUser(client,this.userdata.id)
      this.loadData();
    },
    removeClient: function(id) {
      this.$db.removeClientFromUser(id,this.userdata.id)
      this.loadData();
    },
    updateEmail: function(email) {
      this.$db.updateUserEmail(this.userdata.id,email)
      this.loadData();
    },
    removeTelegram() {
      this.$db.setNullTelegram(this.userdata.id)
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
            case "notification settings":
                component.notifSettings = msg.payload[0]; 
                component.inputEmail = component.notifSettings.email                   
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