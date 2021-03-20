<template>
<div>
    <p>Client Page</p>
    <br>
    <p>Client: {{ $route.params.clientId }}</p>

<b-container>
    <b-card class="my-3">

        <h2 slot="header">Chart test</h2>
        <b-button @click="changeGraphData(0,'Temperature')">Temperature</b-button>                    
        <b-button @click="changeGraphData(1,'Humidity')">Humidity</b-button>   
        <b-button @click="changeGraphData(2,'Pressure')">Pressure</b-button>   
        <b-button @click="changeGraphData(3,'Resistance')">Resistance</b-button>   
        <b-card class=" m-1 my-3" :header="currentGraph" border-variant="warning" header-bg-variant="warning" header-text-variant="black" align="center" >
            <line-chart :data="currentViewedData" :colors="['#eb3349']"></line-chart>
        </b-card>                
        
    </b-card>
</b-container>
</div>  
</template>



<script>
module.exports = {
  data: function() {
    return{
    clientId: this.$route.params.clientId,
    currentGraph : "Temperature",
    currentData : null,
    currentViewedData : null,
    client: {
      "id": "",
      "name": "",
      "temperature": 0,
      "resistance": 0,
      "humidity": 0,
      "pressure": 0,    
      "chartData1d": [],
      "chartData3d": [],
      "chartData7d": [],
      "alerts" : []
    }
    }
  },

  created: function() {
    this.loadData();
  },

  computed: {
    
  },

  methods: {
    changeGraphData: function(index, name) {
              this.currentGraph = name;
              this.currentViewedData = this.currentData[index];
    },
      
    loadData: function() {
      uibuilder.send( {
          "topic": "loadClient",
          "query": "SELECT * FROM client_" + this.$route.params.clientId + " ORDER BY time DESC LIMIT 200"
      } )
    }, 

    doEvent: uibuilder.eventSend,
  },

  mounted: function() {

    let component = this;

    uibuilder.onChange('msg', function(msg){
        // console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)

        switch(msg.topic){
            case "client_object" :                                                  
                component.currentData = msg.payload;
                component.currentViewedData = msg.payload[0];
        }

    })
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>