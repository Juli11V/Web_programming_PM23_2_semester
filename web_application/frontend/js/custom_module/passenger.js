// Необхідні змінні
let last_passenger_id = 0;
let passengers_list = new Array();

// Клас - пасажир
class Passenger{

    constructor (name, number, train , id) {
    
        this.id = id;
        this.name = name;
        this.number= number;
      
        this.train = train;
        
      
       
        if (name === "" ||
            typeof name     === 'undefined') { this.name     = "Невідомий пасажир"; }
        if (number === "" ||
            typeof number     === 'undefined') { this.number      = "Не знайдено";  }
        if (train === "" ||
            typeof train === 'undefined') { this.train= "Не знайдено";  }
        if (id === "" ||
            typeof id       === 'undefined') { this.id       = ++last_passenger_id;  }
    
    }
}

// ...............................................................................................

// Додавання нового пасажира
function add_passenger (name, number, train, id) {

    let passenger = new Passenger(name, number,train, id);
    passengers_list.push(passenger);

    return passenger;

}

// Видалити пасажира з колекції
function remove_passenger (id) {

    for (let z = 0; z < passengers_list.length; z++) {

        let passenger =  passengers_list[z];
        if ( passenger.id === id) {  passengers_list.splice(z, 1);
                                return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх пасажирів
function get_passengers_list()
    { return  passengers_list; }

// Задаємо список усіх пасажирів
function set_passengers_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_passenger(element.name,
                   element.number,
                   element.train,
                   element.id);
    }
}

// Повертає пасажира по його id
function get_passenger_by_id (id) {

    for (let z = 0; z <  passengers_list.length; z++) {

        let  passenger =  passengers_list[z];
        if ( passenger.id === id) { return  passenger; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати пасажира в колекції
function edit_passenger (id, new_name, new_number, new_train) {

    for (let z = 0; z <  passengers_list.length; z++) {

        let  passenger =  passengers_list[z];

        if ( passenger.id === id) {  passenger.number = new_number;
            passenger.name = new_name;
            passenger.train= new_train;
                                return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти пасажира в колекції
function find_passengers (search) {

    let result = [];
    search = search.toLowerCase();

    for (let  passenger of  passengers_list) {

        let attributes = [  passenger.name,
            passenger.train ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push( passenger);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список пасажирів
function print_passengers_list() {

    console.log("\n" + "Список усіх пасажирів:");

    for (let z = 0; z <  passengers_list.length; z++) {

        let  passenger =  passengers_list[z];
        console.log("\t" + "П.І.Б. пасажира: " +  passenger.name);
        console.log("\t" + "Номер пасажира: "    +  passenger.number);
        console.log("\t" + "Назва поїзда: "       +  passenger.train);
        console.log("\t" + "ID пасажира: "            +  passenger.id);

    }
}