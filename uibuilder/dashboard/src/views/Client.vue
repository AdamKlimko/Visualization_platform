<template>
<div>
<b-container>

  <Loading v-if="!loaded"></Loading>

  <b-card v-if="loaded" class="my-3 shadow">
      <h2 slot="header">{{ client.name }}</h2>

      <b-row> 
          <b-col class="m-5">
            <Gauge :value="client.temperature" :type="Type.TEMP"></Gauge>
          </b-col>
          <b-col class="m-5">
            <Gauge :value="client.humidity" :type="Type.HUM"></Gauge>
          </b-col>
          <b-col class="m-5">
            <Gauge :value="client.pressure" :type="Type.PRES"></Gauge>
          </b-col>
          <b-col class="m-5">
            <Gauge :value="client.resistance" :type="Type.QUA"></Gauge>
          </b-col>
      </b-row>

      <hr class="my-5"> 

      <div class="mx-3">
      <b-row class="d-flex">
        
          <b-button @click="changeSelectedData(Type.TEMP, interval)" class="mx-1 ml-3" variant="dark" size="sm">Teplota</b-button>                    
          <b-button @click="changeSelectedData(Type.HUM, interval)" class="mx-1" variant="dark" size="sm">Vlhosť vzduchu</b-button>   
          <b-button @click="changeSelectedData(Type.PRES, interval)" class="mx-1" variant="dark" size="sm">Tlak</b-button>   
          <b-button @click="changeSelectedData(Type.QUA, interval)" class="mx-1" variant="dark" size="sm">Kvalita vzduchu</b-button>   
       
          <b-button @click="changeSelectedData(graph,1)" class="ml-auto mx-1" variant="dark" size="sm">1 Deň</b-button>   
          <b-button @click="changeSelectedData(graph,3)" class="mx-1" variant="dark" size="sm">3 Dni</b-button>   
          <b-button @click="changeSelectedData(graph,7)" class="mx-1 mr-5" variant="dark" size="sm">7 Dní</b-button>   
        
      </b-row>
      
      <h4 class="my-3 text-center"> {{graph}} {{graphMessage}} </h4>
      <line-chart class="line-chart my-4" :data="viewedData" :colors="['#D95252']"></line-chart>  
      </div>    
  </b-card>

</b-container>
</div>  
</template>


<script>
const Loading = httpVueLoader('components/Loading.vue');
const Gauge = httpVueLoader('components/Gauge.vue');

const Type = {
    TEMP: "Teplota",
    HUM: "Vlhosť vzduchu",
    PRES: "Tlak",
    QUA: "Kvalita vzduchu"
};

module.exports = {
  
  components: {
    Loading,
    Gauge
  },

  data: function() {
    return{
      Type,
      loaded : false,
      graph : Type.TEMP,
      interval : 1,
      selectedData : null,
      viewedData : null,
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
    graphInterval1: function() {
      return this.cropData(1);
    },
    graphInterval3: function() {
      return this.cropData(3);
    },
    graphInterval7: function() {
      if (this.selectedData) { return this.selectedData; }
      else return null;
    },
    graphMessage: function() {
      switch (this.interval) {
        case 1 : return "za 1 deň"; 
        case 3 : return "za 3 dni";             
        case 7 : return "za 7 dní"; 
      }
    }
  },

  watch: {
    client: function(){
      this.loaded = this.client.name === "default" ? false : true;         
    }
  },

  methods: {
    changeSelectedData: function(name, interval) {
      this.graph = name;
      this.interval = interval;
      switch (name){
          case Type.TEMP :
            this.selectedData = this.client.temperature_arr;
            break;
          case Type.HUM :
            this.selectedData = this.client.humidity_arr;
            break;
          case Type.PRES :
            this.selectedData = this.client.pressure_arr;
            break;
          case Type.QUA :
            this.selectedData = this.client.resistance_arr;
            break;
      };
      switch (interval) {
        case 1 :
          this.viewedData = this.graphInterval1;
          break;
        case 3 :
          this.viewedData = this.graphInterval3;
          break;
        case 7 :
          this.viewedData = this.graphInterval7;
          break;
      };
    },

    changeSelectedInterval: function(interval) {
      
    },
      
    loadData: function() {
      this.$db.getClient(this.$route.params.clientId)
    },

    cropData: function(days) {
      if(this.selectedData) {
        let array = [];
        let d = new Date();       
        d.setDate(d.getDate()-days);

        this.selectedData.forEach(el => {
          timestamp = Date.parse(el[0]);
          if(timestamp >= d) {
            array.push( [el[0], el[1]] );
          }
        });
        
        return array;
      }
    },

    doEvent: uibuilder.eventSend,
  },

  mounted: function() {

    let component = this;

    uibuilder.onChange('msg', function(msg){
        switch(msg.topic){
            case "client object" :                                                  
                component.client = msg.payload; 
                component.selectedData = msg.payload.temperature_arr;
                component.viewedData = component.graphInterval1;                           
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