/* jshint browser: true, esversion: 5, asi: true */
/*globals Vue, uibuilder */
// @ts-nocheck
/*
  Copyright (c) 2021 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
'use strict'

// Helper files
import router from './router.js';
import db from './db.js'

// Global scope - instance properties
Vue.prototype.$db = db;

// Import Google Maps Components
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCEyhwu0PNrzwAqoSpxIpiq5L6eK-UZY9Y', //api key 
    },
    installComponents: false,
  });
Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('google-marker', VueGoogleMaps.Marker);
Vue.component('google-cluster', VueGoogleMaps.Cluster);
Vue.component('google-info-window', VueGoogleMaps.InfoWindow);

// The Vue instance
const app = new Vue({
    el: '#app',

    data() { return {
        userdata: {          
            id: '',
            username: ''
        },

        isLoggedOn  : false,
        inputId     : '',
        inputPw     : '',        
    }}, 

    created: function() {        
        uibuilder.start(this) // Single param passing vue app to allow Vue extensions to be used.
        this.$router.push('/'); // Redirect to homepage after login   
    }, 

    methods: {    
      doLogon: function() {          
          uibuilder.logon( {
              'id': this.inputId,
              'password': this.inputPw,
          } )          
      }      
    },

    mounted: function(){      
      var app = this       
      // If user is logged on/off 
      uibuilder.onChange('isAuthorised', function(isAuthorised){
          // console.info('[indexjs:uibuilder.onChange:isAuthorised] isAuthorised changed. User logged on?:', isAuthorised)
          app.isLoggedOn = isAuthorised;                            
      })
      
      // Fetch user data from "authorised" msg
      uibuilder.onChange('msg', function(msg){
        switch(msg.topic){
            case "authorised" :                                                                
              app.userdata = msg._auth.authData           
              console.log(app.userdata) 
              break;                       
        }
      })
  },
    router: new VueRouter(router),
}) 