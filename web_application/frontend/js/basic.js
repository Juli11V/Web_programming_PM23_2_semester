// Необхідні змінні
let search = "";
let divider = `<li><hr class="dropdown-divider"></li>`;

// Створення нового елемента
async function create_element() {

    let target = location.pathname.substring(1);
    target = target.substring(0, target.length - 1);

    if (target === "ticketsSold") {


        modal_delete_ticketsSold();
        return;
    }

    switch (target) {

        case "train": $("#train_title").text("Додавання нового поїзда");
            $("#train_yes").text("Додати");
            break;
        case "passenger":   $("#passenger_title").text("Додавання нового пасажира");
            $("#passenger_yes").text("Додати");
            prepare_trains_for_dropdown(target);
            break;
        case "ticket":  $("#ticket_title").text("Додавання нового квитка");
            $("#ticket_yes").text("Додати");
            prepare_trains_for_dropdown(target);
            break;

    }

    $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(true)`);
    $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Редагування існуючого елемента
async function edit_element (element) {

    let item;
    let target = location.pathname.substring(1);
    target = target.substring(0, target.length - 1);

    let id = parseInt($(element).closest("tr").children().first().text());

    $(`#${target}_title`).text("Редагувати дані");
    $(`#${target}_yes`).text("Оновити дані");

    switch (target) {

        case "train": item = get_train_by_id(id);
            $("#train_name").val(item.name);
            $("#train_address").val(item.address);
            break;
        case "passenger":   item = get_passenger_by_id(id);
            $("#passenger_number").val(item.number);
            $("#passenger_name").val(item.name);
            $("#passenger_train").text(item.train);
            prepare_trains_for_dropdown(target);
            break;
        case "ticket":  item = get_ticket_by_id(id);
            $("#ticket_place").val(item.place);
            $("#ticket_vagon").val(item.vagon);
            $("#ticket_passenger").text(item.passenger);
            $("#ticket_train").text(item.train);
            prepare_trains_for_dropdown(target);
            prepare_passengers_for_dropdown(element);
            break;

    }

    $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(false, ${id})`);
    $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Пошук існуючого елемента
function find_element (element) {

    let search = $(element).val();
    let target = location.pathname.substring(1);
    let search_list = [];

    switch (target) {

        case "trains":      search_list = find_trains(search);      break;
        case "passengers":        search_list = find_passengers(search);        break;
        case "tickets":       search_list = find_tickets(search);       break;
        case "ticketsSold": search_list = find_tickets(search, true); break;

    }

    display_data(search_list);

}

// ...............................................................................................

// Видалення існуючого елемента
function delete_element (item) {

    let button;
    let message;
    let target = location.pathname.substring(1);
    let id = parseInt($(item).closest("tr").children().first().text());

    switch (target) {

        case "trains":
            message = "Видалити інформацію про поїзд?";
            button = "Видалити";
            break;

        case "passengers":
            message = "Видалити інформацію про пасажира?";
            button = "Видалити";
            break;

        case "tickets":
            message = "Скасувати вибір квитка?";
            button = "Скасувати";
            break;

        case "ticketsSold":
            message = "Повернути куплений квиток?";
            button = "Повернути";
            break;

    }

    modal_confirm_create("Повідомлення",
        `${message}?`,
        `${button}`,
        "Відміна",
        "delete", id);

    $(`#modal_confirm`).modal('show');

}

// ...............................................................................................

// Відобразити дані у таблиці
function display_data (search_list) {

    let data;
    let additional_attr = "";
    let target = location.pathname.substring(1);

    switch (target) {

        case "trains":      data = get_trains_list();
            break;
        case "passengers":        data = get_passengers_list();
            break;
        case "tickets":       data = get_tickets_list();
            additional_attr = "false, ";
            break;
        case "ticketsSold": data = get_tickets_list(true);
            additional_attr = "true, ";
            break;
    }

    // Якщо поле пошуку не порожнє - відображаємо результат
    if (search_list) { data = search_list; }

    // Очищення таблиць
    clear_table(data.length === 0);

    // Відображення загальної кількості елементів
    $("#total_count").text(`Загальна кількість: ${data.length}`);

    // Для виписаних та невиписаниї пацієнтів таблиці однакові
    if (target === "ticketsSold") { target = "tickets"; }

    // Відобразити дані конкретної таблиці
    eval(`display_${target}_data(${additional_attr}data)`);

}

// ...............................................................................................

// Відобразити інформацію про всі поїзди
function display_trains_data (data) {

    for (let element of data) {

        let block =
            `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td>${element.address}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

        $("#table").append(block);

    }
}

// Відобразити інформацію про всіх пасажирів
function display_passengers_data (data) {

    for (let element of data) {

        let block =
            `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td class="fit"> <span class="m-2">${element.number}</span> </td>
         <td>${element.train}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

        $("#table").append(block);

    }
}

// Відобразити інформацію про всі квитки
function display_tickets_data (is_cured, data) {

    for (let element of data) {

        let block =
            `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.place}</td>
         <td class="fit"> <span class="m-2">${element.vagon}</span> </td>
         <td>${element.passenger}</td>
         <td>${element.train}</td>
         <td>${get_icon_code(is_cured)}</td>
      </tr>`;

        $("#table").append(block);

    }
}

// ...............................................................................................

// Вибрана позитивна відповідь у модальному вікні
function modal_confirm() {

    let page = location.pathname.substring(1);

    let target = $("#modal_confirm").attr("target");
    let src = $("#modal_confirm").attr("src");

    switch (target) {

        // Видалення даних
        case "delete":
            let id = parseInt(src);
            page = page.substr(0, page.length - 1);
            eval(`remove_${page}(${id})`);
            display_data();
            save_data();
            break;


        // Видалення всієї інформації про куплені квитки
        case "delete_ticketsSold":
            ticketsSold_list = [];
            display_data();
            save_data();
            break;

    }
}

// Задання елементів модального вікна підтвердження
function modal_confirm_create (title, message, yes, no, target, src) {

    $(`#modal_confirm_title`).text(title);
    $(`#modal_confirm_message`).text(message);
    $(`#modal_confirm_yes`).text(yes);
    $(`#modal_confirm_no`).text(no);
    $("#modal_confirm").attr("target", target);
    $("#modal_confirm").attr("src", src);

}

// ...............................................................................................

// Додавання нового поїзда або редагування існуючого
function modal_update_trains (added_new, id) {

    let name    = $("#train_name").val();
    let address = $("#train_address").val();

    if (added_new) { add_train(name, address);      }
    else           { edit_train(id, name, address); }

    display_data();
    clear_input();
    save_data();

}

// Додавання нового пасажира або редагування існуючого
function modal_update_passengers (added_new, id) {

    let name     = $("#passenger_name").val();
    let number     = $("#passenger_number").val();
    let train = $("#passenger_train").text();

    train = train === "Оберіть  поїзд" ? "Не вибрано" : train;

    if (added_new) { add_passenger(name, number, train);      }
    else           { edit_passenger(id, name, number, train); }

    display_data();
    clear_input();
    save_data();

}

// Додавання нового квитка або редагування існуючого
function modal_update_tickets (added_new, id) {

    let place    = $("#ticket_place").val();
    let vagon      = $("#ticket_vagon").val();
    let passenger   = $("#ticket_passenger").text();
    let train = $("#ticket_train").text();

    passenger   = passenger  === "Оберіть  пасажира"  ? "Не вибрано"  : passenger;
    train = train === "Оберіть поїзд" ? "Не вибрано" : train;

    if (added_new) { add_ticket(place, vagon, passenger, train);      }
    else           { edit_ticket(id, place, vagon, passenger, train); }

    display_data();
    clear_input();
    save_data();

}

// ...............................................................................................

// Підтвердження видалення проданих квитків
function modal_delete_ticketsSold() {

    modal_confirm_create("Видалення даних",
        "Видалити всю інформацію щодо проданих квитків?",
        "Видалити",
        "Відміна",
        "delete_soldTickets");

    $(`#modal_confirm`).modal('show');

}

// ...............................................................................................


// Вибір потяга у випадаючому списку
function set_train (element) {

    let train = $(element).text();
    let target = location.pathname.substring(1);

    train = train === ". . ." ? "Оберіть поїзд" : train;

    if (target === "passengers") { $("#passenger_train").text(train);  }
    else                      { $("#ticket_train").text(train);
        prepare_passengers_for_dropdown();        }

}

// Вибір пасажира у випадаючому списку
function set_passenger (element) {

    let passenger = $(element).text();
    let target = location.pathname.substring(1);

    passenger = passenger === ". . ." ? "Оберіть поїзд" : passenger;

    if (target === "ticket") { $("#ticket_passenger").text(passenger);  }
    else                      { $("#ticket_train").text(passenger);
        prepare_passengers_for_dropdown();        }



}

// ...............................................................................................

// Підгуємо список доступних потягів у випадаючому меню
function prepare_trains_for_dropdown (target) {

    let list = $(`#${target}_trains_list`);

    // Отримуємо інформацію про усі лікарні
    get_data("trains").then((result) => {

        if (result.length != 0) {

            list.find("li:not(:first)").remove();
            list.append(divider);

            for (let item of result) {
                list.append(`<li><span class="dropdown-item" ` +
                    `onclick="set_train(this)">${item.name}</span></li>`);
            }
        }

    });
}

// Підготуємо список існуючих пасажирів у випадаючому меню
function prepare_passengers_for_dropdown() {

    $("#ticket_passenger").text("Оберіть пасажира");

    let list = $("#ticket_passengers_list");
    let passenger = $("#ticket_passenger").text();
    let divider_is_added = false;

    // Отримуємо інформацію про всіх пасажирів
    get_data("passengers").then((result) => {

        if (result.length != 0) {

            list.find("li:not(:first)").remove();

            for (let item of result) {

                if (item.passenger === passenger) {

                    if (!divider_is_added) { list.append(divider);
                        divider_is_added = true; }

                    list.append(`<li><span class="dropdown-item" ` +
                        `onclick="set_passenger(this)">${item.name}</span></li>`);
                }
            }
        }

    });
}
// ...............................................................................................

// Видалення усіх даних з таблиці
// Додавання інформаційного повідомлення, якщо таблиця пуста
function clear_table (table_is_empty) {

    let target = location.pathname.substring(1);
    let span = (target === "trains") ? 4 :
        (target === "passengers") ? 5 : 6;

    $("#table tbody").empty();

    let block =
        `<tr class="text-center text-secondary" id="table_empty">
      <td colspan="${span}"> <span class="mx-5 fs-4">Не знайдено інформації</span> </td>
   </tr>`;

    if (table_is_empty) { $("#table tbody").append(block); }
    else                { $("#table_empty").remove();      }

}

// Очищення полів вводу
function clear_input() {

    let target = location.pathname.substring(1);

    switch (target) {

        case "trains": $("#train_name").val("");
            $("#train_address").val("");
            break;
        case "passengers":   $("#passenger_name").val("");
            $("#passenger_number").val("");
            $("#passenger_train").text("Виберіть поїзд");
            $("#passenger_trains_list").find("li:not(:first)").remove();
            break;
        case "tickets":  $("#ticket_place").val("");
            $("#ticket_vagon").val("");
            $("#ticket_passenger").text("Оберіть пасажира");
            $("#ticket_train").text("Виберіть поїзд");
            $(`#ticket_passengers_list`).find("li:not(:first)").remove();
            $(`#ticket_trains_list`).find("li:not(:first)").remove();
            break;
    }
}

// ...............................................................................................

// Метод повертає html код елементів керування таблицею
function get_icon_code (only_delete) {

    // Іконка редагування елемента
    const icon_edit =
        `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-pencil-square btn-control mx-1" viewBox="0 0 16 16" onclick="edit_element(this)">
     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
     <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
   </svg>`;

    // Іконка видалення елемента
    const icon_delete =
        `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-trash btn-control mx-1" viewBox="0 0 16 16" onclick="delete_element(this)">
     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
   </svg>`;

    // Блок з іконками
    const icons =
        `<span class="d-flex mx-2">
      ${!only_delete ? icon_edit : ""}${icon_delete}
   </span>`;

    return icons;

}

// ...............................................................................................

// Обмеження вводу для поля "номер"
function set_number (element) {

    let value = $(element).val();
    value = value.substring(0, 10);

    $(element).val(value);

}

// Метод дозволяє реалізувати затримку
function delay (time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

// ...............................................................................................

// Очищення даних після закриття модальних вікон
$(document).on("hidden.bs.modal", () => { clear_input(); });

// Виконання коду після завантаження сторінки
jQuery(async () => {

    await load_data();
    display_data();

});