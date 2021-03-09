<template>
<div>
    <p>Client Page</p>
    <br>
    <p>Client: {{ route.params.id }}</p>
</div>  
</template>

<script>
module.exports = {
  
  data() {
    return {
      greeting: "Hello"
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