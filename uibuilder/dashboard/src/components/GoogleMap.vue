<template>
    <google-map 
    :center="coordinates" 
    :zoom="12"
    :options="options" 
    class="map">

    <google-marker :position="coordinates"></google-marker>

    <google-cluster>  
        <google-marker v-for="(m, index) in markers"        
          :position="{lat: m.lat, lng: m.lon}"
          :clickable="true"
          @click="center=m.position"
          :key="index"
          ></google-marker>
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
  /* border: 1px solid #eb3349;  */
}
</style>