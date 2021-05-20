<template>
<div class="my-3">
    <b-button class="m-4" v-if="edit" @click="save()" size="sm" variant="light"><span class="material-icons">save</span> Uložiť</b-button>
    <b-button class="m-4" v-else @click="toggleEdit()" size="sm" variant="light"><span class="material-icons">edit</span> Upraviť</b-button>
    <div v-if="edit">
        <b-row class="px-5">        
        <div class="col-md-6">
            <b-row>
                <div class="col-md-6">
                    <h6>Adresa: </h6>
                    <b-form-input id="address" v-model="clientinfo.address" type="text" placeholder="adresa" required></b-form-input>
                </div>
            </b-row>
            <b-row>
                <div class="col-md-6">
                    <h6>Diagnóza: </h6>
                    <b-form-input id="diagnosis" v-model="clientinfo.diagnosis" type="text" placeholder="diagnóza" required></b-form-input>
                </div>
            </b-row>
            </div>
            <div class="col-md-6">
                <h6>Popis: </h6>
                <b-form-textarea id="description" v-model="clientinfo.description" type="textarea" placeholder="popis" required></b-form-textarea>
            </div>
        </b-row>   
    </div> 
    <div v-else>
        <b-row class="px-5">        
        <div class="col-md-6">
            <b-row>
                <div class="col-md-6">
                    <h6>Adresa: </h6>
                    <p>{{clientinfo.address}}</p>
                </div>
            </b-row>
            <b-row>
                <div class="col-md-6">
                    <h6>Diagnóza: </h6>
                    <p>{{clientinfo.diagnosis}}</p>
                </div>
            </b-row>
            </div>
            <div class="col-md-6">
                <h6>Popis: </h6>
                <p>{{clientinfo.description}}</p>
            </div>
        </b-row>   
    </div>  
    <hr>
</div>  
</template>

<script>
module.exports = {
  data: function() {
    return{
        edit: false
    }  
  },

  props: {
    clientinfo: {}
  },

  methods: {
      save: function() {
          this.edit = false
          this.$db.updateClientInfo(this.$route.params.clientId, this.clientinfo)
      },
      toggleEdit: function() {
          this.edit = true
      },
  }
}
</script>

<style scoped>

</style>