<template>
<div>
    <p>Lat: {{coordinates.lat}}, Lon: {{coordinates.lng}}</p>
</div>  
</template>

<script>
module.exports = {
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      }
    };
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>