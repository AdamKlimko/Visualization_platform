<template>
    <google-map 
    :center="coordinates" 
    :zoom="12"
    :maxZoom:="20"
    :options="options" 
    class="map">

      <google-marker :position="coordinates"></google-marker>

      <google-cluster>

      <google-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
      <div class="p-1 mb-1">
        <h5>{{infoContent.name}}</h5>      
        <p>Teplota: {{infoContent.temperature}} °C</p>
        <p>Vlhosť vzduchu: {{infoContent.humidity}} %</p>
        <p>Tlak: {{infoContent.pressure}} hPa</p>
        <p>Kvalita vzduchu: {{infoContent.resistance}} AQI</p>
        <router-link :to="'/client/' + infoContent.id">Prejsť na</router-link>        
      </div>
      </google-info-window>

        <google-marker  v-for="(m, i) in markers" :key="i"        
        :position="{lat: m.lat, lng: m.lon}"
        :clickable="true"                
        @click="toggleInfoWindow(m,i)">
        </google-marker>

      </google-cluster>

    </google-map>
</template>

<script>
module.exports = {
  data: function() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      },
      markers: null,
      options: {
        mapTypeControl: false,        
      },
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
            pixelOffset: {
              width: 0,
              height: -35
            }
      }
    };
  },

  created: function() {    
    this.getMarkers();
    this.$getLocation({})
        .then(coordinates => {
        this.coordinates = coordinates;
        })
        .catch(error => alert(error));
  },

  methods: {
    getMarkers: function() {
        uibuilder.send( {
            "topic": "markers", 
            "payload": this.$sql['markers']   
        } )
    },

    toggleInfoWindow: function(marker, idx) {
        console.log(marker.name);
        this.infoWindowPos = {lat: marker.lat, lng: marker.lon};
        this.infoContent = marker;    

        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
    }        
  },

  mounted: function() {
    let component = this;

    uibuilder.onChange('msg', function(msg){
        switch(msg.topic){
            case "markers" :                                                  
                component.markers = msg.payload;                                     
        }
    })
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}

p{
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 0.4rem;  
}

a{
  color: #ff5555;
  font-size: 0.9rem;
  line-height: 0.4rem;
}

a:hover{
  color: #ff8989;
}
</style>

