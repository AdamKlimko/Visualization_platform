<template>
<div>
    
<b-container>

  <Loading v-if="!loaded"></Loading>

  <b-card v-if="loaded" class="my-3" >
      <h2 slot="header">{{ client.name }}</h2>

      <b-row> 
          <b-col class="m-5">
            <h5 class="text-center">Teplota</h5>
            <vue-svg-gauge :min="0" :max="45" :value="client.temperature" :separator-step="0"
            :gauge-color="[{ offset: 0, color: '#ffe659'}, { offset: 100, color: '#eb3349'}]"></vue-svg-gauge>
            <h4 class="text-center align-bottom">{{client.temperature}} °C</h4>
          </b-col>
          <b-col class="m-5">
            <h5 class="text-center">Vlhosť vzduchu</h5>
            <vue-svg-gauge :min="0" :max="100" :value="client.humidity" :separator-step="0"  
            :gauge-color="[{ offset: 0, color: '#ffe659'}, { offset: 100, color: '#eb3349'}]"></vue-svg-gauge>
            <h4 class="text-center align-bottom"> {{client.humidity}} %</h4>
          </b-col>
          <b-col class="m-5">
            <h5 class="text-center">Tlak</h5>
            <vue-svg-gauge :min="980" :max="1030" :value="client.pressure" :separator-step="0"  
            :gauge-color="[{ offset: 0, color: '#ffe659'}, { offset: 100, color: '#eb3349'}]"></vue-svg-gauge>
            <h4 class="text-center align-bottom"> {{client.pressure}} hPa</h4>
          </b-col>
          <b-col class="m-5">
            <h5 class="text-center">VOC Odpor</h5>
            <vue-svg-gauge :min="250" :max="350" :value="client.resistance" :separator-step="0"  
            :gauge-color="[{ offset: 0, color: '#ffe659'}, { offset: 100, color: '#eb3349'}]"></vue-svg-gauge>
            <h4 class="text-center align-bottom">{{client.resistance}} kOhm</h4>
          </b-col>
      </b-row>

      <hr class="my-5"> 

      <b-row class="d-flex">
        
          <b-button @click="changeGraphData('Temperature')" class="mx-1 ml-3" size="sm">Teplota</b-button>                    
          <b-button @click="changeGraphData('Humidity')" class="mx-1" size="sm">Vlhosť vzduchu</b-button>   
          <b-button @click="changeGraphData('Pressure')" class="mx-1" size="sm">Tlak</b-button>   
          <b-button @click="changeGraphData('Resistance')" class="mx-1" size="sm">VOC Odpor</b-button>   
       
          <b-button class="ml-auto mx-1" size="sm">1 Deň</b-button>   
          <b-button class="mx-1" size="sm">3 Dni</b-button>   
          <b-button class="mx-1 mr-5" size="sm">7 Dní</b-button>   
        
      </b-row>
      
      <h4 class="my-3"> {{currentGraph}} </h4>
      <line-chart class="line-chart my-4" :data="currentViewedData" :colors="['#eb3349']"></line-chart>      
  </b-card>

</b-container>

</div>  
</template>


<script>
const Loading = httpVueLoader('components/Loading.vue');

module.exports = {
  
  components: {
    Loading
  },

  data: function() {
    return{
      loaded : false,
      currentGraph : "Temperature",
      currentGraphData : null,
      currentViewedData : null,
      client : 
        {
          id: "default",
          name: "default",
          temperature: 0,
          humidity: 0,
          pressure: 0,    
          resistance: 0,
          temperature_arr: [],
          humidity_arr: [],
          pressure_arr: [],    
          resistance_arr: [],
          alerts: [],
        },
      }
  },

  created: function() {
    this.loadData();
  },

  computed: {
  
  },

  watch: {
    client: function(){
      this.loaded = this.client.name === "default" ? false : true;         
    }
  },

  methods: {
    changeGraphData: function(name) {
      this.currentGraph = name;
      switch (name){
          case 'Temperature' :
            this.currentViewedData = this.client.temperature_arr;
            break;
          case 'Humidity' :
            this.currentViewedData = this.client.humidity_arr;
            break;
          case 'Pressure' :
            this.currentViewedData = this.client.pressure_arr;
            break;
          case 'Resistance' :
            this.currentViewedData = this.client.resistance_arr;
            break;
      }
    },
      
    loadData: function() {
      uibuilder.send( {
          "topic": "load client",
          "payload": "SELECT id,name,time,temperature,humidity,pressure,resistance FROM selected_clients AS sc JOIN client_data AS cd ON sc.id=cd.client_id WHERE sc.id = " + this.$route.params.clientId + " ORDER BY time DESC;"
      } )
    }, 

    doEvent: uibuilder.eventSend,
  },

  mounted: function() {

    let component = this;

    uibuilder.onChange('msg', function(msg){
        // console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg);

        switch(msg.topic){
            case "client object" :                                                  
                component.client = msg.payload; 
                component.currentViewedData = msg.payload.temperature_arr;
                           
        }

    })
  }
};
</script>


<style scoped>
  .line-chart {
    margin: auto;
    max-width: 90%;
    max-height: 15rem;
  }
</style>