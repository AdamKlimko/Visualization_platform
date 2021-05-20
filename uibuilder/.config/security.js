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
 *
 * 
 * 
 * Basic template edited by Adam Klimko for the project
 * (final bachelor's thesis) Visualisation platform for monitoring elderly
 * 
 * */
'use strict'

const bcrypt = require('bcrypt');
var MySql = require('sync-mysql');
 
var connection = new MySql({
    host: 'localhost',
    user: "root",
    password: "sqe9VG$#h7hkfX",
    database: "visualisation_p"
});

module.exports = {
    
    /** Validate user against your own user data.
     * The minimum input data is _auth.id which must represent a unique ID.
     * Called from the logon function (uiblib.js::logon) which is triggered by a uibuilder control msg from the client of type 'logon'.
     * May also be called to revalidate users at any time.
     * @param {MsgAuth} _auth Required. 
     * @return {boolean|userValidation} Either true/false or Object of type userValidation
     */
    userValidate: function(_auth) {        
        // fast login for testing purposes
        if ( _auth.id === 'test') {
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
        const result = connection.query('SELECT * FROM user WHERE username = ?',[_auth.id]);

        console.log(result)

        if(result.length) {
            const user = result[0]
            console.log(user)

            if( ( _auth.id == user.username ) && ( bcrypt.compareSync(_auth.password, user.password) ) ) {
                // console.log(`[uibuilder:security.js] User id ${_auth.id} has been validated`)                
                return {
                    userValidated: true,
                    id: user.username,
                    jwt: '',
                    authData: {
                        id: user.id,
                        username: user.username
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