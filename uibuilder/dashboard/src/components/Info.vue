<template>
<div class="my-3">
    <b-button class="m-4" v-if="edit" @click="save()" size="sm" variant="light"><span class="material-icons">save</span> Uložiť</b-button>
    <b-button class="m-4" v-else @click="toggleEdit()" size="sm" variant="light"><span class="material-icons">edit</span> Upraviť</b-button>
    <b-row class="px-md-5">        
        <div class="col-md-6">
            <b-row>
                <div class="col-md-6">
                    <h6>Adresa: </h6>
                    <b-form-input v-if="edit" id="address" v-model="clientinfo.address" type="text" placeholder="adresa" required></b-form-input>
                    <p v-else>{{clientinfo.address ? clientinfo.address : "Nezadané"}}</p>
                </div>
            </b-row>
            <b-row>
                <div class="col-md-6">
                    <h6>Diagnóza: </h6>
                    <b-form-input v-if="edit" id="diagnosis" v-model="clientinfo.diagnosis" type="text" placeholder="diagnóza" required></b-form-input>
                    <p v-else>{{clientinfo.diagnosis ? clientinfo.diagnosis : "Nezadané"}}</p>
                </div>
            </b-row>
            </div>
            <div class="col-md-6">
                <h6>Popis: </h6>
                <b-form-textarea v-if="edit" id="description" v-model="clientinfo.description" type="textarea" placeholder="popis" required></b-form-textarea>
                <p v-else>{{clientinfo.description ? clientinfo.description : "Nezadané"}}</p>
            </div>            
    </b-row>  
    <hr>
    <b-row class="px-md-5">
        <div class="col-md-6">
            <h6>Maximálna teplota: </h6>
            <b-form-input v-if="edit" id="max_temp" v-model="clientinfo.max_temp" type="number" required></b-form-input>
            <p v-else>{{clientinfo.max_temp ? clientinfo.max_temp + " °C" : "Nebolo zadané"}}</p>            
        </div>
        <div class="col-md-6">
            <h6>Minimálna teplota: </h6>
            <b-form-input v-if="edit" id="min_temp" v-model="clientinfo.min_temp" type="number" required></b-form-input>
            <p v-else>{{clientinfo.min_temp ? clientinfo.min_temp + " °C" : "Nebolo zadané"}}</p>
        </div>
    </b-row>
    <b-row class="px-md-5">
        <div class="col-md-6">
            <h6>Maximálna vlhkosť vzduchu: </h6>
            <b-form-input v-if="edit" id="max_hum" v-model="clientinfo.max_hum" type="number" required></b-form-input>
            <p v-else>{{clientinfo.max_hum ? clientinfo.max_hum + " %" : "Nebolo zadané"}}</p>            
        </div>
        <div class="col-md-6">
            <h6>Minimálna vlhkosť vzduchu: </h6>
            <b-form-input v-if="edit" id="min_hum" v-model="clientinfo.min_hum" type="number" required></b-form-input>
            <p v-else>{{clientinfo.min_hum ? clientinfo.min_hum + " %" : "Nebolo zadané"}}</p>
        </div>
    </b-row> 
    <b-row class="px-md-5">
        <div class="col-md-6">
            <h6>Maximálny tlak vzduchu: </h6>
            <b-form-input v-if="edit" id="max_pres" v-model="clientinfo.max_pres" type="number" required></b-form-input>
            <p v-else>{{clientinfo.max_pres ? clientinfo.max_pres + " hPa" : "Nebolo zadané"}}</p>            
        </div>
        <div class="col-md-6">
            <h6>Minimálny tlak vzduchu: </h6>
            <b-form-input v-if="edit" id="min_pres" v-model="clientinfo.min_pres" type="number" required></b-form-input>
            <p v-else>{{clientinfo.max_pres ? clientinfo.min_pres + " hPa" : "Nebolo zadané"}}</p>
        </div>
    </b-row> 
    <b-row class="px-md-5">
        <div class="col-md-6">
            <h6>Maximálny krvný tep: </h6>
            <b-form-input v-if="edit" id="max_blood" v-model="clientinfo.max_blood" type="number" required></b-form-input>
            <p v-else>{{clientinfo.max_blood ? clientinfo.max_blood + " bpm" : "Nebolo zadané"}}</p>            
        </div>
        <div class="col-md-6">
            <h6>Minimálny krvný tep: </h6>
            <b-form-input v-if="edit" id="min_blood" v-model="clientinfo.min_blood" type="number" required></b-form-input>
            <p v-else>{{clientinfo.max_blood ? clientinfo.min_blood + " bpm" : "Nebolo zadané"}}</p>
        </div>
    </b-row>     
    <b-row class="px-md-5">        
        <div class="col-md-6">
            <h6>Minimálna kvalita vzduchu: </h6>
            <b-form-input v-if="edit" id="max_qua" v-model="clientinfo.max_qua" type="number" required></b-form-input>
            <p v-else>{{clientinfo.max_qua ? clientinfo.max_qua + " AQI" : "Nebolo zadané"}}</p>
        </div>
    </b-row>          
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