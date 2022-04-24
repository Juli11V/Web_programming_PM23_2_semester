// Необхідні змінні
let last_train_id = 0;
let trains_list = new Array();

// Клас - потяг
class Train {

    constructor (name, address, id) {
    
        this.id = id;
        this.name = name;
        this.address = address;
        
        if (id === "" ||
            typeof id      === 'undefined') { this.id      = ++last_train_id; }
        if (name === "" ||
            typeof name    === 'undefined') { this.name    = "Не знайдено потяга"; }
        if (address === "" ||
            typeof address === 'undefined') { this.address = "Не знайдено";   }
   
    }
}

// ...............................................................................................

// Додавання нового потяга
function add_train (name, address, id) {

    let train = new Train(name, address, id);
    trains_list.push(train);

    return train;

}

// Видалення потягів з колекції
function remove_train (id) {

    for (let z = 0; z < trains_list.length; z++) {

        let train = trains_list[z];
        if (train.id === id) { trains_list.splice(z, 1);
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх потягів
function get_trains_list()
    { return trains_list; }

// Задаємо список усіх потягів
function set_trains_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_train(element.name,
                     element.address,
                     element.id);
    }
}

// Повертає  потяг по її id
function get_train_by_id (id) {

    for (let z = 0; z < trains_list.length; z++) {

        let train = trains_list[z];
        if (train.id === id) { return train; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати потяг в колекції
function edit_train (id, new_name, new_address) {

    for (let z = 0; z < trains_list.length; z++) {

        let train = trains_list[z];

        if (train.id === id) { train.name = new_name;
            train.address = new_address;
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти потяг в колекції
function find_trains (search) {

    let result = [];
    search = search.toLowerCase();

    for (let train of trains_list) {

        let attributes = [ train.name,
            train.address ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(train);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список потягів
function print_trains_list() {

    console.log("\n" + "Список усіх потягів:");

    for (let z = 0; z < trains_list.length; z++) {

        let train = trains_list[z];
        console.log("\t" + "Назва потяга: "  + train.name);
        console.log("\t" + "Маршрут потяга: " + train.address);
        console.log("\t" + "ID: "             + train.id);

    }
}