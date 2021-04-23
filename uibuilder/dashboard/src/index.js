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

import router from './router.js';
import sql from './sql.js';
import type from './type.js';

Vue.prototype.$sql = sql;
Vue.prototype.$type = type;

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCEyhwu0PNrzwAqoSpxIpiq5L6eK-UZY9Y',
    },
    installComponents: false,
  });
Vue.component('google-map', VueGoogleMaps.Map);
Vue.component('google-marker', VueGoogleMaps.Marker);
Vue.component('google-cluster', VueGoogleMaps.Cluster);
Vue.component('google-info-window', VueGoogleMaps.InfoWindow);


const app = new Vue({
    el: '#app',

    data() { return {

        feVersion   : '',
        socketConnectedState : false,
        serverTimeOffset     : '',

        isLoggedOn  : false,
        userId      : null,
        userPw      : null,
        inputId     : '',

        clients     : [],
    }}, 

    created: function() {
        // Example of retrieving data from uibuilder
        this.feVersion = uibuilder.get('version')

        /** **REQUIRED** Start uibuilder comms with Node-RED @since v2.0.0-dev3
         * Pass the namespace and ioPath variables if hosting page is not in the instance root folder
         * e.g. If you get continual `uibuilderfe:ioSetup: SOCKET CONNECT ERROR` error messages.
         * e.g. uibuilder.start('/uib', '/uibuilder/vendor/socket.io') // change to use your paths/names
         * @param {Object=|string=} namespace Optional. Object containing ref to vueApp, Object containing settings, or String IO Namespace override. changes self.ioNamespace from the default.
         * @param {string=} ioPath Optional. changes self.ioPath from the default
         * @param {Object=} vueApp Optional. Reference to the VueJS instance. Used for Vue extensions.
         */
        uibuilder.start(this) // Single param passing vue app to allow Vue extensions to be used.
    }, 

    // mounted: function() {
    //     
    // }, 

    router: new VueRouter(router),
}) 