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

const app = new Vue({
    el: '#app',

    data() { return {

        startMsg    : 'Vue has started, waiting for messages',
        feVersion   : '',
        socketConnectedState : false,
        serverTimeOffset     : '[unknown]',

        msgRecvd    : null,
        msgCtrl     : null,

        isLoggedOn  : false,
        userId      : null,
        userPw      : null,
        inputId     : '',

        clients     : []

    }}, 

    computed: {
        
    }, 

    methods: {
        

    }, 

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

        //console.log(this)

    }, 

    mounted: function() {

        let app = this;

        uibuilder.onChange('msg', function(msg){
            // console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)
            app.msgRecvd = msg;

            switch(msg.topic){
                case "clients":
                    app.clients = msg.payload;
                    break;
            }

        })

        uibuilder.onChange('ctrlMsg', function(msg){
            // console.info('[indexjs:uibuilder.onChange:ctrlMsg] CONTROL msg received from Node-RED server:', msg)
            app.msgCtrl = msg;

        })

    }, 

    router: new VueRouter(router),
}) 