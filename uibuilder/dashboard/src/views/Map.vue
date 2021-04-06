<template>
  <div class="h-100">
    <Googlemap></Googlemap>
  </div>  
</template>


<script>
const Googlemap = httpVueLoader('components/GoogleMap.vue');

module.exports = {
  components: {
    Googlemap
  },

  data: function() {
    return {
      
    };
  },
};
</script>


<style scoped>

</style>