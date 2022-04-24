// Необхідні змінні
let last_ticket_id = 0;
let tickets_list = new Array();
let ticketsSold_list = new Array();

// Клас - квиток
class Ticket {

    // Конструктор класу
    constructor (place, vagon, passenger, train, id) {
    
        this.id = id;
        this.place = place;
        this.vagon= vagon;
        this.passenger = passenger;
        this.train = train;
        
        if (place === "" ||
            typeof place     === 'undefined') { this.place     = "Не знайдено";    }
        if (vagon === "" ||
            typeof vagon    === 'undefined') { this.vagon    = "Неіснуючий вагон"; }
        if (passenger === "" ||
            typeof passenger   === 'undefined') { this.passenger   = "Неіснуючий пасажир";     }
        if (train === "" ||
            typeof train === 'undefined') { this.train = "Неіснуючий потяг";    }
            
        if (id === "" ||
        typeof id       === 'undefined') { this.id       = ++last_ticket_id;   }
    
    }
}

// ...............................................................................................

// Додавання нового квитка
function add_ticket (place, vagon, passenger, train, id) {

    let ticket = new Ticket(place, vagon, passenger, train, id);
    tickets_list.push(ticket);

    return ticket;

}

// Додавання  проданого квитка
function add_ticketsSold (place, vagon, passenger, train, id) {

    let ticket = new Ticket(place, vagon, passenger, train, id);
    ticketsSold_list.push(ticket);

    return ticket;

}

// Видалити квиток з колекції
function remove_ticket (id) {

    for (let z = 0; z < tickets_list.length; z++) {

        let ticket = tickets_list[z];
        if (ticket.id === id) { ticketsSold_list.push(ticket);
            tickets_list.splice(z, 1);
                                 return 1; }

    }

    return -1;

}

// Видалити проданий квиток з колекції
function remove_ticketsSold (id) {

    for (let z = 0; z < ticketsSold_list.length; z++) {

        let ticket = ticketsSold_list[z];
        if (ticket.id === id) { ticketsSold_list.splice(z, 1);
                                 return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх квитків
function get_tickets_list (cured) {

    if (cured) { return ticketsSold_list; }
    else       { return tickets_list; }

}

// Задаємо список усіх квитків
function set_tickets_list (data, cured) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {

        if (cured) {
            add_ticketsSold(element.place,
                              element.vagon,
                              element.passenger,
                              element.train,
                              element.id);
        }

        else {
            add_ticket(element.place,
                        element.vagon,
                        element.passenger,
                        element.train,
                        element.id);
        }
    }
}

// Повертає квиток по його id
function get_ticket_by_id (id, cured) {

    let list = cured ? ticketsSold_list : tickets_list;

    for (let z = 0; z < list.length; z++) {

        let ticket = tickets_list[z];
        if (ticket.id === id) { return ticket; }

    }

    return -1;

}

// ...............................................................................................
function find_tickets (search, cured) {

    let result = [];
    let list = cured ? ticketsSold_list : tickets_list;

    search = search.toLowerCase();

    for (let ticket of list) {

        let attributes = [ ticket.place,
                           ticket.passenger,
                           ticket.train ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(ticket);
                                                       break;
            }
        }
    }

    return result;

}
// Редагувати квиток в колекції
function edit_ticket (id, new_place, new_vagon, new_passenger, new_train) {

    for (let z = 0; z < tickets_list.length; z++) {

        let ticket= tickets_list[z];

        if (ticket.id === id) { ticket.place = new_place;
                                 ticket.vagon = new_vagon;
                                 ticket.passenger = new_passenger;
                                 ticket.train = new_train;
                                 return 1; }

    }

    return -1;

}

// ...............................................................................................



// ...............................................................................................

// Вивести в консоль список квитків
function print_tickets_list (cured) {

    let type = cured ? "проданих " : "";
    let list = cured ? ticketsSold_list : tickets_list;

    console.log("\n" + "Список усіх " + type + "квитків:");

    for (let z = 0; z < list.length; z++) {

        let item = list[z];
        console.log("\t" + "Місце : " + item.place);
        console.log("\t" + "Вагон: "    + item.vagon);
        console.log("\t" + "Пасажир: "           + item.passenger);
        console.log("\t" + "Потяг: "         + item.train);
        console.log("\t" + "ID: "              + item.id);

    }
}