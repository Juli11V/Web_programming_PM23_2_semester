// Необхідні константи
const use_db = is_db_used();
const server_port = get_server_port();
const server_url = `http://localhost:${server_port}`;

// Перевірка, чи використовувати базу даних
// Якщо ні, то буде використовуватися localStorage
function is_db_used()
   { return $("head").attr("use_db"); }

// Метод повертає порт, який використовується для запуску сервера
function get_server_port()
   { return $("head").attr("server_port"); }

// ...............................................................................................

// Отримання даних із сервера
async function server_GET (req) {

   try {
      
   const res = await fetch(server_url + req,
                           { method: "GET",
                             headers: { "Accept": "application/json" } });

   if (res.ok) { return res.json(); }
   else { throw new Error(); }

   }

   catch (error) {
      
      if (error instanceof TypeError) {

         modal_confirm_create(
            "Помилка",
            "Не вдалося підключитися до сервера за адресою: " + server_url,
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }

      else {

         modal_confirm_create(
            "Помилка",
            "Не вдалося отримати інформацію з бази даних!",
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }
   }
}

// Оновлення даних на сервері
async function server_PUT (req, array) {

   try {
   
   let collection;

   switch (req) {
      case "/set_trains":      collection = 1; break;
      case "/set_passengers":        collection = 2; break;
      case "/set_tickets":       collection = 3; break;
      case "/set_ticketsSold": collection = 4; break;
      case "/set_identificators": collection = 5; break;
   }
   
   const res = await fetch(server_url + req,
                           { method: "PUT",
                             headers: { "Accept": "application/json",
                                        "Content-Type": "application/json" },
                             body: JSON.stringify({ array: array,
                                                    collection: collection }) }
                             );
   
   if (res.ok) { return res.json(); }
   else { throw new Error(); }
   
   }

   catch (error) {
      
      if (error instanceof TypeError) {

         modal_confirm_create(
            "Помилка",
            "Не вдалося підключитися до сервера за адресою: " + server_url,
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }

      else {

         modal_confirm_create(
            "Помилка",
            "Не вдалося оновити інформацію у базі даних",
            "Зрозуміло",
            "Відміна"
         );

         $(`#modal_confirm`).modal('show');
         console.log(error);

      }
   }
}

// ...............................................................................................

// Зберігання даних
function save_data() {

   if (use_db === "true") { save_data_in_data_base();     }
   else                   { save_data_in_local_storage(); }

}

// Зберігання даних у localStorage
function save_data_in_local_storage() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "trains":
         localStorage.setItem('trains', JSON.stringify(get_trains_list()));
         break;

      case "passengers":
         localStorage.setItem('passengers', JSON.stringify(get_passengers_list()));
         break;

      case "tickets":
         localStorage.setItem('tickets', JSON.stringify(get_tickets_list()));
         localStorage.setItem('ticketsSold', JSON.stringify(get_ticketsSold_list(true)));
         break;

      case "ticketsSold":

         localStorage.setItem('ticketsSold', JSON.stringify(get_ticketsSold_list(true)));
         break;

   }

   let identificators = [{ "name":"last_train_id","value":last_train_id },
                         { "name":"last_passenger_id",  "value":last_passenger_id   },
                         { "place":"last_ticket_id", "value":last_ticket_id  }];

   localStorage.setItem('identificators', JSON.stringify(identificators));

}

// Зберігання даних у базу даних
function save_data_in_data_base() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "trains":
         server_PUT("/set_trains", get_trains_list());
         break;

      case "passengers":
         server_PUT("/set_passengers", get_passengers_list());
         break;

      case "tickets":
         server_PUT("/set_tickets", get_tickets_list());
         server_PUT("/set_ticketsSold", get_ticketsSold_list(true));
         break;

      case "ticketsSold":
         server_PUT("/set_ticketsSold", get_tickets_list(true));
         break;

   }

   let identificators = [{ "name":"last_train_id","value":last_train_id },
   { "name":"last_passenger_id",  "value":last_passenger_id   },
   { "place":"last_ticket_id", "value":last_ticket_id  }];

   server_PUT("/set_identificators", identificators);

}

// ...............................................................................................

// Завантаження даних
async function load_data() {

   if (use_db === "true") { await load_data_from_data_base();     }
   else                   { await load_data_from_local_storage(); }

}

// Завантаження даних з localStorage
async function load_data_from_local_storage() {

   let item;
   let target = location.pathname.substring(1);

   switch (target) {

      case "trains":
         item = JSON.parse(localStorage.getItem("trains"));
         set_trains_list(item ? item : []);
         break;

      case "passengers":
         item = JSON.parse(localStorage.getItem("passengers"));
         set_passengers_list(item ? item : []);
         break;

      case "tickets":
         item = JSON.parse(localStorage.getItem("tickets"));
         set_tickets_list(item ? item : []);
         item = JSON.parse(localStorage.getItem("ticketsSold"));
         set_tickets_list(item ? item : [], true);
         break;

      case "ticketsSold":
         item = JSON.parse(localStorage.getItem("ticketsSold"));
         set_tickets_list(item ? item : [], true);
         break;

   }

   let identificators = JSON.parse(localStorage.getItem("identificators"));
   if (!identificators) { identificators = []; }

   for (let item of identificators) { 
      if (item.name === "last_train_id") { last_train_id = item.value; }
      if (item.name === "last_passenger_id")   { last_passenger_id   = item.value; }
      if (item.place === "last_ticket_id")  { last_ticket_id  = item.value; }
   }
}

// Завантаження даних з бази даних
async function load_data_from_data_base() {

   let target = location.pathname.substring(1);

   switch (target) {

      case "trains":
         await server_GET("/get_trains").then((res) =>
            { set_trains_list(res); });
         break;

      case "passengers":
         await server_GET("/get_passengers").then((res) =>
            { set_passengers_list(res); });
         break;

      case "tickets":
         await server_GET("/get_tickets").then((res) =>
            { set_tickets_list(res); });
         await server_GET("/get_ticketsSold").then((res) =>
            { set_tickets_list(res, true); });
         break;

      case "ticketsSold":
         await server_GET("/get_tickets").then((res) =>
            { set_tickets_list(res); });
         await server_GET("/get_ticketsSold").then((res) =>
            { set_ticketsSold_list(res, true); });
         break;

   }

   await server_GET("/get_last_train_id").then((res) =>
      { if (res && res.length > 0) { last_train_id = res[0].value; }});

   await server_GET("/get_last_passenger_id").then((res) =>
      { if (res && res.length > 0) { last_passenger_id = res[0].value; }});

   await server_GET("/get_last_ticket_id").then((res) =>
      { if (res && res.length > 0) { last_ticket_id = res[0].value; }});

}

// Отримання даних
async function get_data (data) {

   if (use_db === "true") { return await get_data_from_data_base(data);     }
   else                   { return await get_data_from_local_storage(data); }

}

// Отримання даних з localStorage
async function get_data_from_local_storage (data) {
   
   try           { return JSON.parse(localStorage.getItem(data)); }
   catch (error) { return [];                                     }

}


// Отримання даних з бази даних
async function get_data_from_data_base (data) {

   try           { return await server_GET(`/get_${data}`); }
   catch (error) { return [];                               }

}