/* globals module */
/**
 * Copyright (c) 2020 Julian Knight (Totally Information)
 * https://it.knightnet.org.uk
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
/**
 * Template security functions for uibuilder.
 * Only used if the node.useSecurity flag is set.
 * Please replace with your own code.
 * 
 * You MUST export the following functions:
 *   - userValidate - based on an id, lookup the user data to see if the user is valid.
 *                    MUST return a boolean or object of type userValidation.
 *                    Called from the server's logon process. (uiblib.js::logon)
 *      
 * 
 * Each function MUST at least return true/false. See each function for more details.
 *
 * NOTES & WARNINGS:
 *   1) IF there is an error in this JavaScript, it is very likely that Node-RED will terminate.
 *   2) You can use different security.js files for different instances of uibuilder.
 *      Simply, place a securiy.js file in the instances root folder (e.g ~/.node-red/uibuilder/<url>/security.js)
 *      Note, however, that this means that the security.js file can be edited using the admin Editor.
 *      You have to restart Node-RED to pick up the new file.
 */
'use strict'

/**
 * Standard msg._auth object exchanged in msg's between front-end and server
 * typedef {import('../../index').MsgAuth} MsgAuth
 */ 
/**
 * Validated user object returned by the userValidate function
 * typedef {import('./security').userValidation} userValidation 
 */

// const TYPEDEFS = require('../../typedefs.js')

/**
 * typedef {TYPEDEFS.MsgAuth} MsgAuth
 * typedef {TYPEDEFS.userValidation} userValidation
 * typedef {TYPEDEFS.userMetadata} userMetadata
 */

const fs = require('fs');
const bcrypt = require('bcrypt');

module.exports = {
    /** Validate user against your own user data.
     * The minimum input data is _auth.id which must represent a unique ID.
     * Called from the logon function (uiblib.js::logon) which is triggered by a uibuilder control msg from the client of type 'logon'.
     * May also be called to revalidate users at any time.
     * @param {MsgAuth} _auth Required. 
     * @return {boolean|userValidation} Either true/false or Object of type userValidation
     */
    userValidate: function(_auth) {
        // fast login for testing reasons
        if ( _auth.id === 'test') {
            console.log(`[uibuilder:security.js] User id ${_auth.id} has been validated`)
	        console.log(_auth)
            return {
                userValidated: true,
                id: "test",
           	    jwt: '',
                username: "test",
                authData: {
                    id: 2,
                    username: "test"
                }
            }        
        }

        // core functionality

        // console.log(`[uibuilder:security.js] userValidate Security from ${__filename} used. Replace this template with your own code. _auth:`, _auth)
        const string = fs.readFileSync('/home/opc/.node-red/projects/Visualization_platform/uibuilder/.config/users.json');
	    const json = JSON.parse(string);	    
                
        for(let i = 0; i < json.length; i++) {            
            let el = json[i];

            if( ( _auth.id == el.username ) && ( bcrypt.compareSync(_auth.password, el.password) ) ) {
                // console.log(`[uibuilder:security.js] User id ${_auth.id} has been validated`)                
                return {
                    userValidated: true,
                    id: el.username,
                    jwt: '',
                    authData: {
                        id: el.id,
                        username: el.username
                    }
                }                                 
            }
        }
        
        return {
            userValidated: false,
            authData: {
                message: `Login failed, User id ${_auth.id} not recognised.`
            }
        }        
    }
}