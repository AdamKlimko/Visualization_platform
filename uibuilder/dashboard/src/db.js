// SQL queries to be sent to back-end
export default {
    // USER ------------------------------------------------------------------------------------------------------------
    insertClientToUser: function (client,user_id) {
        uibuilder.sendCtrl( {
            "topic": "add client",
            "payload": `INSERT INTO selected_clients (client_id, user_id) VALUES ('${client.id}','${user_id}');`           
        } )             
    },
    removeClientFromUser: function(client_id,user_id) {
        uibuilder.sendCtrl( {
            "topic": "remove client",
            "payload": `DELETE FROM selected_clients WHERE client_id = ${client_id} AND user_id = ${user_id};`
        } )
    },
    getNotificationSettings: function(user_id) {
        uibuilder.sendCtrl( {
            "topic": "notification settings", 
            "payload": `SELECT * FROM notification_settings where user_id = ${user_id};`   
        } )
    },
    updateUserEmail: function(user_id,email) {
        if(email === 0) {
            uibuilder.sendCtrl( {
                "topic": "update user email",
                "payload": `UPDATE notification_settings SET email = NULL WHERE user_id = ${user_id}`
            } )
        }
        else{
            uibuilder.sendCtrl( {
                "topic": "update user email",
                "payload": `UPDATE notification_settings SET email = '${email}' WHERE user_id = ${user_id}`
            } )
        }        
    },    
    setNullTelegram: function(user_id) {
        uibuilder.sendCtrl( {
            "topic": "remove telegram",
            "payload": `UPDATE notification_settings SET telegram_id = NULL WHERE user_id = ${user_id}`
        } )
    },    

    // CLIENTS ------------------------------------------------------------------------------------------------------------
    getAllClients: function () {
        uibuilder.sendCtrl( {
            "topic": "all clients",
            "payload": "SELECT * FROM all_clients;"   
        } )
    },
    getSelectedClients: function (user_id) {
        uibuilder.sendCtrl( {
            "topic": "selected clients",          
            "payload": `SELECT client_id as id, ac.name, ac.lat, ac.lon FROM selected_clients as sc left join all_clients as ac on sc.client_id = ac.id where user_id = ${user_id};`
        } )
    },
    getClient: function(client_id){
        uibuilder.sendCtrl( {
            "topic": "load client",
            "payload": "SELECT id,name,time,temperature,humidity,pressure,resistance,bed,blood,fall FROM all_clients AS ac JOIN client_data AS cd ON ac.id=cd.client_id WHERE cd.time >= DATE(NOW()) - INTERVAL 7 DAY AND ac.id = " + client_id + " ORDER BY time DESC;"
        } )
    },
    getClientInfo: function(client_id){
        uibuilder.sendCtrl( {
            "topic": "client info",
            "payload": "SELECT * FROM client_info WHERE client_id = " + client_id + ";"
        } )
    },
    updateClientInfo: function(client_id, info) {
        uibuilder.sendCtrl( {
            "topic": "update client info",
            "payload": `UPDATE client_info SET diagnosis = '${info.diagnosis}', 
            description = '${info.description}', address = '${info.address}', 
            max_temp = ${info.max_temp != '' ? info.max_temp : null}, min_temp = ${info.min_temp != '' ? info.min_temp : null}, 
            max_hum = ${info.max_hum != '' ? info.max_hum : null}, min_hum = ${info.min_hum != '' ? info.min_hum : null}, 
            max_pres = ${info.max_pres != '' ? info.max_pres : null}, min_pres = ${info.min_pres != '' ? info.min_pres : null}, 
            max_blood = ${info.max_blood != '' ? info.max_blood : null}, min_blood = ${info.min_blood != '' ? info.min_blood : null},
            max_qua = ${info.max_qua != '' ? info.max_qua : null} WHERE client_id = ${client_id}`
        } )
    },

    // NOTIFICATIONS -----------------------------------------------------------------------------------------------------
    getNotifications: function(user_id) {
        uibuilder.sendCtrl( {
            "topic": "notifications", 
            "payload": `SELECT * FROM notification where user_id = ${user_id};`   
        } )
    },
    deleteNotification: function(id) {
        uibuilder.sendCtrl( {
            "topic": "remove notification",
            "payload": `DELETE FROM notification WHERE id = ${id};`
        } )
    },    

    // MARKERS ------------------------------------------------------------------------------------------------------------
    getMarkers: function(user_id) {
        uibuilder.sendCtrl( {
            "topic": "markers", 
            "payload": `SELECT sc.client_id as id, name, lat, lon, temperature, humidity, pressure, resistance, bed, blood from (SELECT client_id,user_id,ac.name,ac.lat,ac.lon from selected_clients as sct left join all_clients as ac on sct.client_id = ac.id) as sc 
            join (select cd.client_id, temperature, humidity, pressure, resistance, bed, blood, cd.time from client_data as cd 
            join (select client_id, MAX(time) as time from client_data group by client_id) as cdt on cd.time = cdt.time AND cd.client_id = cdt.client_id) as sct on sc.client_id = sct.client_id where sc.user_id = ${user_id};`   
        } )
    },                    
}