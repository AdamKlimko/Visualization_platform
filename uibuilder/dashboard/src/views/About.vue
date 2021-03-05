<template>
<div>
    <p>About Page</p>
    <br>
    <p>{{ greeting }} World!</p>
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