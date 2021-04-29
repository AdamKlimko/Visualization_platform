<template>
  <div class="h-100">
    <Googlemap :userdata="userdata"></Googlemap>
  </div>  
</template>


<script>
const Googlemap = httpVueLoader('components/GoogleMap.vue');

module.exports = {
  components: {
    Googlemap
  },

  props: {
    userdata: {
        id: '',
        username: ''
    }
  },

  data: function() {
    return {
      
    };
  },
};
</script>


<style scoped>

</style>