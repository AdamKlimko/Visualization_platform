<template>
<div>
<b-container>

  <Loading v-if="!loaded"></Loading>

  <b-card v-if="loaded" class="my-3 shadow">
      <h2 slot="header">
        <b-button pill v-b-toggle.collapse variant="light" ><span class="material-icons">account_circle</span> 
        </b-button> 
        {{ client.name }}
        <b-button class="float-right" pill @click="loadData()" variant="dark" ><span class="material-icons">refresh</span> 
        </b-button> 
      </h2>      
      <b-collapse id="collapse" class="mt-2">   
        <Info :clientinfo="clientInfo"></Info>
      </b-collapse>
      <b-row> 
          <b-col class="m-5">
            <Gauge :value="client.temperature" :type="Type.TEMP"></Gauge>
          </b-col>
          <b-col class="m-5">
            <Gauge :value="client.humidity" :type="Type.HUM"></Gauge>
          </b-col>
          <b-col class="m-5">
            <Gauge :value="client.resistance" :type="Type.QUA"></Gauge>
          </b-col>
          <b-col class="m-5">
            <Gauge :value="client.blood" :type="Type.BLOOD"></Gauge>
          </b-col>          
      </b-row>

      <hr class="my-5"> 

      <div class="mx-md-3">
      <b-row class="d-flex">
        
        <b-button-group size="sm">
          <b-button @click="changeSelectedData(Type.TEMP); changeSelectedInterval(interval)"  variant="light" size="sm">Teplota</b-button>                    
          <b-button @click="changeSelectedData(Type.HUM); changeSelectedInterval(interval)" variant="light" size="sm">Vlhosť vzduchu</b-button>   
          <b-button @click="changeSelectedData(Type.PRES); changeSelectedInterval(interval)" variant="light" size="sm">Tlak vzduchu</b-button>   
          <b-button @click="changeSelectedData(Type.QUA); changeSelectedInterval(interval)" variant="light" size="sm">Kvalita vzduchu</b-button>             
        </b-button-group>

        <b-button-group size="sm" class="ml-3">
          <b-button @click="changeSelectedData(Type.BED); changeSelectedInterval(interval)" variant="light" size="sm">Posteľ</b-button>
          <b-button @click="changeSelectedData(Type.BLOOD); changeSelectedInterval(interval)"  variant="light" size="sm">Krvný tlak</b-button>                              
        </b-button-group>

        <b-button-group class="ml-auto mx-1" size="sm">
            <b-button @click="changeSelectedData(graph); changeSelectedInterval(1)" variant="light" size="sm">1 Deň</b-button>   
            <b-button @click="changeSelectedData(graph); changeSelectedInterval(3)" variant="light" size="sm">3 Dni</b-button>   
            <b-button @click="changeSelectedData(graph); changeSelectedInterval(7)" variant="light" size="sm">7 Dní</b-button>                   
        </b-button-group>
      </b-row>
      
      <h4 class="my-3 text-center"> {{graph}} {{graphMessage}} <small>({{graphUnit}})</small> </h4>
      <line-chart class="line-chart my-4" :data="viewedData" :colors="['#D95252']" :min="minMax.min" :max="minMax.max"></line-chart>  
      </div>    
  </b-card>

</b-container>
</div>  
</template>


<script>
const Loading = httpVueLoader('components/Loading.vue');
const Gauge = httpVueLoader('components/Gauge.vue');
const Info = httpVueLoader('components/Info.vue');

const Type = {
    TEMP: "Teplota",
    HUM: "Vlhosť vzduchu",
    PRES: "Tlak vzduchu",
    QUA: "Kvalita vzduchu",
    BED: "Obsadenosť postele",
    BLOOD: "Krvný tlak",
};

module.exports = {
  
  components: {
    Loading,
    Gauge,
    Info
  },

  data: function() {
    return{
      Type,
      loaded : false,
      graph : Type.TEMP,
      interval : 1,
      selectedData : null,
      viewedData : null,
      minMax : {min:0, max:50},
      clientInfo: null,
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
          bed_arr: [],
          blood_arr: [],
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
    },
    graphUnit: function() {
      switch (this.graph) {
        case Type.TEMP : return "°C"; 
        case Type.HUM : return "%"; 
        case Type.PRES : return "hPa"; 
        case Type.QUA : return "AQI"; 
        case Type.BED : return "leží/neleží"; 
        case Type.BLOOD : return "mm Hg";
      }
    }
  },

  watch: {
    client: function(){
      this.loaded = this.client.name === "default" ? false : true;         
    }
  },

  methods: {
    changeSelectedData: function(name) {
      this.graph = name;
      switch (name){
          case Type.TEMP :
            this.selectedData = this.client.temperature_arr;
            this.minMax = {min:0, max:50}
            break;
          case Type.HUM :
            this.selectedData = this.client.humidity_arr;
            this.minMax = {min:0, max:100}
            break;
          case Type.PRES :
            this.selectedData = this.client.pressure_arr;
            this.minMax = {min:950, max:1050}
            break;
          case Type.QUA :
            this.selectedData = this.client.resistance_arr;
            this.minMax = {min:0, max:500}
            break;
          case Type.BED :
            this.selectedData = this.client.bed_arr;
            this.minMax = {min:0, max:1}
            break;
          case Type.BLOOD :
            this.selectedData = this.client.blood_arr;
            this.minMax = {min:80, max:130}
            break;
      };      
    },

    changeSelectedInterval: function(interval) {
      this.interval = interval;
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
      
    loadData: function() {
      this.$db.getClient(this.$route.params.clientId)
      this.$db.getClientInfo(this.$route.params.clientId)
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
              if(!component.viewedData) {
                component.selectedData = msg.payload.temperature_arr;
                component.viewedData = component.graphInterval1;
              }              
              component.client = msg.payload; 
              break;         
            case "client info" :                                                  
              component.clientInfo = msg.payload[0];              
              break;
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