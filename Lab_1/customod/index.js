// TRAIN/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Клас - потяг
class Train {

    constructor (name,direction) {

        this.name = name;
        this.direction = direction;
        this.train_place = [1,2,3,4];
        this.tickets_list = [];
        this.sold_tickets_list = [];


        if (typeof name === 'undefined')    { this.name = "Невідомий потяг"; }
        if (typeof direction === 'undefined') { this.direction= "Невідомий напрям"; }

    }

}


// Список усіх потягів
let trains_list = [];

// Додавання нового потяга в колекцію
function add_Train (name, direction) {

    let train = new Train(name, direction);
    trains_list.push(train);
   for ( let i = 0; i < train.train_place.length; i++){
       create_Ticket(name,direction,train.train_place[i])
    }

    return train;
}


// Редагувати потяг в колекції
function edit_Train (name, direction, new_name, new_direction) {
    remove_Train (name, direction);
    add_Train (new_name, new_direction)
    return 1;

}

// Видалити потяг з колекції
function remove_Train (name, direction) {

    for (let n = 0; n < trains_list.length; n++) {

        let train = trains_list[n];

        if (train.name === name &&
            train.direction === direction) {

            for (let i of train.sold_tickets_list) {
                remove_bye_Ticket (i.passenger.name, i.passenger.id, i.ticket.name_train, i.ticket.direction_train, i.ticket.num_place);
            }
            trains_list.splice(n, 1);
            return 1;
        }

    }

    return -1;

}

// Знайти потяг в колекції
function find_Train (name, direction) {

    for (let train of trains_list) {

        if (name === train.name &&
            direction === train.direction) {
            return train;
        }
    }
      return -1;
}



// Отримати список потягів
function get_Trains_List() {

    console.log("\n" + "Список усіх потягів:" + "\n" );

    for (let n = 0; n < trains_list.length; n++) {

        let train = trains_list[n];
        console.log(` Назва потяга: ${train.name} \n Напрямок: ${train.direction} \n Квитки/місця:`);
        for (let k of train.tickets_list) {
            output_info_ticket(k);
        }
        console.log("\n")
    }

    console.log();

    return trains_list;

}

exports.add_Train       = add_Train;
exports.find_Train      = find_Train;
exports.edit_Train      = edit_Train;
exports.remove_Train    = remove_Train;
exports.get_Trains_List = get_Trains_List;

//PASSENGER/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Клас - пасажир
class Passenger {

    // Конструктор класу
    constructor (name, id) {

        this.name = name;
        this.id = id;

        if (typeof name === 'undefined') { this.name = "Невідомий пасажир"; }
        if (typeof id === 'undefined') { this.id = "Невідомий пасажир"; }

    }

}

let passenger_list = [];

// Додавання нового пасажира
function add_Passenger (name,id) {

    let passenger = new Passenger(name, id);
    passenger_list.push(passenger);

    return passenger;

}

// Редагування пасажира в колекції
function edit_Passenger (name, id, new_name, new_id) {

    let passenger = find_Passenger (name, id);

    if (passenger === -1) { return -1; }

    let n = passenger_list.indexOf(passenger);

    passenger_list[n].name = new_name;
    passenger_list[n].id = new_id;

    return true;

}

// Видалення пасажира в колекції
function remove_Passenger (name, id) {

    for (let n = 0; n < passenger_list.length; n++) {

        let passenger = passenger_list[n];

        if (passenger.name === name &&
            passenger.id === id) {
            passenger_list.splice(n, 1);
            return 1;
        }
    }
    return -1;
}

// Пошук одного пасажира в колекції
function find_Passenger (name, id) {
    for (let passenger of passenger_list) {

        if (name === passenger.name &&
             id === passenger.id) {
             return passenger;
       }
   }
    return -1;
}

// Отримати список пасажирів
function get_Passenger_List () {

    console.log("\n" + `Список усіх пасажирів :`);

    for (let n = 0; n < passenger_list.length; n++) {

        let passenger = passenger_list[n];
        console.log(`\tІм'я пасажира: ${passenger.name}, id: ${passenger.id}`);

    }

    console.log();

    return passenger_list;

}

exports.add_Passenger      = add_Passenger;
exports.edit_Passenger      = edit_Passenger;
exports.remove_Passenger    = remove_Passenger;
exports.find_Passenger     = find_Passenger;
exports.get_Passenger_List = get_Passenger_List;

//Ticket/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Клас - квиток
class Ticket {

    constructor (name_train,direction_train, num_place, is_sold) {
        this.name_train = name_train;
        this.direction_train = direction_train;
        this.num_place = num_place;
        this.is_sold = is_sold;


        if (typeof num_place === 'undefined') { this.num_place = `Квиток з таким місцем ${num_place} не знайдено `; }
        if (typeof name_train === 'undefined') { this.name_train =`Квиток з таким потягом ${name_train} не знайдено `; }
        if (typeof direction_train === 'undefined') { this.direction_train =`Квиток з таким маршрутом  ${direction_train} не знайдено `; }
    }
}

// Перевірка чи дані коректні і повернення сформованого квитка
function create_Ticket(name_train,direction_train, num_place ){
    let train = find_Train(name_train, direction_train);
    let ticket = new Ticket(name_train, direction_train, num_place, false);

            if(train != -1){
                train.tickets_list.push(ticket);
                    return 1;
                }else {
                    console.log(" Потяг не знайдено! Квиток не сформовано!");
                    return -1;
                }
}




// Покупка пасажиром квитка на потяг

function byeTicket(name_customer,id_customer, name_train, direction_train, num_place) {
    let passenger = new Passenger(name_customer, id_customer);

    if(passenger === find_Passenger(name_customer, id_customer)){

    } else{
       add_Passenger(name_customer, id_customer);
    }

    let ticket = new Ticket(name_train,direction_train, num_place,false);
    let train = find_Train(name_train,direction_train);

    for( let i = 0; i < train.tickets_list.length; i++){

        if( ticket.name_train ===  train.tickets_list[i].name_train &&
            ticket.direction_train ===  train.tickets_list[i].direction_train &&
            ticket.is_sold ===  train.tickets_list[i].is_sold ){

            train.tickets_list[i].is_sold = true;
            train.sold_tickets_list.push(new sold_Ticket(passenger, train.tickets_list[i]));
            console.log("Успішна покупка квитка!");
            return 1;
        }
    }
}



// Пошук проданого квитка в списку квитків потяга
function is_exist_sold_Ticket (train,sold_ticket){

     let tmp = train.sold_tickets_list;
    for( let i = 0; i < tmp.length; i++){
        if( sold_ticket.ticket.name_train === tmp[i].ticket.name_train &&
            sold_ticket.ticket.direction_train === tmp[i].ticket.direction_train &&
            sold_ticket.ticket.num_place === tmp[i].ticket.num_place &&
            sold_ticket.ticket.is_sold === tmp[i].ticket.is_sold
        ){ return 1;}
    }
        console.log(" Вибачте, але квитка для поїзду неіснує !");
        return -1;
}

// Скасувати покупку квитка пасажира
function remove_bye_Ticket (name_passenger, id_passenger, name_train, direction_train, num_place) {
    let train = find_Train(name_train, direction_train);
    let passenger = find_Passenger(name_passenger, id_passenger);
    let ticket = new Ticket(name_train, direction_train, num_place, true);
    let sold_ticket = new sold_Ticket(passenger, ticket);

    if(is_exist_sold_Ticket(train,sold_ticket)){
       remove_ticket_from_sold_ticket_list_And_tickets_list(train,sold_ticket);
        return true;
    } return false;

}


//Зміна квитка із одного потяга на інший
function edit_Ticket (name_passenger, id_passenger, name_train, direction_train, num_place, new_name_train, new_direction_train, new_num_place) {
    if(remove_bye_Ticket(name_passenger, id_passenger, name_train, direction_train, num_place) ){
        if(byeTicket(name_passenger,id_passenger, new_name_train, new_direction_train, new_num_place) ) {
            console.log("Успішний зміна квитка!");
            return 1;
        } else {return  -1}
    }else {
        console.log("Помилка, неможливо змінити квиток!")
        return -1;
    }
}


function output_info_ticket(ticket) {
    console.log(`Квиток: \n |потяг ${ticket.name_train} | напрям  ${ticket.direction_train} | місце ${ticket.num_place}| is_sold ${ticket.is_sold}| `)
    return 1;
}
function output_info_passenger (passenger) {
     console.log(` |${passenger.name} | id - ${passenger.id} |`);
    return 1;
}


exports.create_Ticket = create_Ticket;
exports.is_exist_sold_Ticket = is_exist_sold_Ticket;
exports.remove_bye_Ticket = remove_bye_Ticket;
exports.edit_Ticket = edit_Ticket;
exports.byeTicket = byeTicket;
exports.output_info_ticket = output_info_ticket;
exports.output_info_passenger = output_info_passenger;


//SoldTicket/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Класс продані квитки
class sold_Ticket{

    constructor (passenger, ticket) {
        this.passenger = passenger;
        this.ticket = ticket;
    }

}

// Вивід усіх проданих квитків і їх власників
function get_sold_ticket_list(train_name, train_direction) {
    let train = find_Train(train_name, train_direction);
    for (let n = 0; n < train.sold_tickets_list.length; n++) {

        let tmp = train.sold_tickets_list[n];
        output_info_ticket(tmp.ticket);
        output_info_passenger(tmp.passenger);

    }
    console.log();
    return train.sold_tickets_list;
}

// Видалення купленого квитка із бази даних
function remove_ticket_from_sold_ticket_list_And_tickets_list(train, sold_ticket) {
    let temp = -1;
    for (let n = 0; n < train.tickets_list.length; n++) {
        if (sold_ticket.ticket.name_train === train.tickets_list[n].name_train &&
            sold_ticket.ticket.direction_train === train.tickets_list[n].direction_train &&
            sold_ticket.ticket.num_place === train.tickets_list[n].num_place &&
            sold_ticket.ticket.is_sold === train.tickets_list[n].is_sold) {
            temp = n;
        }
    }
    for (let i = 0; i < train.sold_tickets_list.length; i++) {

        if (sold_ticket.ticket.name_train === train.sold_tickets_list[i].ticket.name_train &&
            sold_ticket.ticket.direction_train === train.sold_tickets_list[i].ticket.direction_train &&
            sold_ticket.ticket.num_place === train.sold_tickets_list[i].ticket.num_place &&
            sold_ticket.ticket.is_sold === train.sold_tickets_list[i].ticket.is_sold) {

            remove_Passenger(sold_ticket.passenger.name, sold_ticket.passenger.id);
            train.sold_tickets_list.splice(i, 1)
            console.log("Видалено куплений квиток");
        }
    }
    if(temp !== -1){
         train.tickets_list[temp].is_sold = false;
         console.log("Квиток/місце знову вільне!");
         return 1;
    }
    console.log("Помилка, не видалено куплений квиток!");
        return -1;

}


// Пошук потяга на який продали найб. та найм. квитків
function search_min_max_count_of_sold_list(){
    let min_count , max_count;
    min_count = max_count = trains_list[0].sold_tickets_list.length ;

    for (let i = 1; i < trains_list.length; i++){
        let train = trains_list[i];
        if( min_count > train.sold_tickets_list.length){
            min_count = train.sold_tickets_list.length;
        } else {
            if(max_count < train.sold_tickets_list.length){
                max_count = train.sold_tickets_list.length;
            }
        }
    }
    for (let j = 0; j <  trains_list.length; j++){
        if( trains_list[j].sold_tickets_list.length == min_count){
            console.log(`Потяг (${trains_list[j].name}) у напрямку (${trains_list[j].direction}) має найменше куплених білетів - ${min_count}.`)
        } else {
            if( trains_list[j].sold_tickets_list.length == max_count){
                console.log(`Потяг (${trains_list[j].name}) у напрямку (${trains_list[j].direction}) має найбільше куплених білетів - ${max_count}.`)
            }
        }
    }
    return 1;
}


exports.search_min_max_count_of_sold_list = search_min_max_count_of_sold_list;
exports.get_sold_ticket_list = get_sold_ticket_list;
exports.remove_ticket_from_sold_ticket_list_And_tickets_list = remove_ticket_from_sold_ticket_list_And_tickets_list;

////////////////////////////////////////////////////////////////////////////////
