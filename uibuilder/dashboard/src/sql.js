export default {    
    markers : "select id, name, lat, lon, temperature, humidity, pressure, resistance from selected_clients as sc join (select cd.client_id, temperature, humidity, pressure, resistance, cd.time from client_data as cd join (select client_id, MAX(time) as time from client_data group by client_id) as cdt on cd.time = cdt.time) as sct on sc.client_id = sct.client_id where sc.user_id = ;",
    all_clients: "SELECT * FROM all_clients;",
    selected_clients: "SELECT * FROM selected_clients;",
}

