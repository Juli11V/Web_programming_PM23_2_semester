const mod = require('customod');

// Додавання потяга
let tr1 = mod.add_Train("Tr_first", "Lviv - Kyiv");
let tr2= mod.add_Train("Tr_second", "Kyiv - Lviv");
let tr3 = mod.add_Train("Tr_third", "Kharkiv - Kyiv");
let tr4 = mod.add_Train("Tr_fourth", "Kyiv - Kharkiv");
let tr5 = mod.add_Train("Tr_fifth", "Kharkiv - Odessa");

// Список потягів
mod.get_Trains_List();

// Видалення потяга
console.log("Видалення потяга: Tr_third");
mod.remove_Train(tr3.name, tr3.direction);

// Список потягів
mod.get_Trains_List();

// Зміна потяга
console.log("Зміна потяга: Tr_first");
mod.edit_Train (tr1.name, tr1.direction, "Tr_new", "Kharkiv - Lviv");

// Список потягів
mod.get_Trains_List();

// Пошук потягів
let temp1 = mod.find_Train ("Tr_fifth", "Kharkiv - Odessa");
console.log(`Пошук потяга Tr_fifth -> Kharkiv - Odessa : ${temp1 !== -1 ? "знайдено" : "не знайдено"}`);
let temp2 = mod.find_Train("Tr_six", "Kyiv - Kharkiv");
console.log(`Пошук потяга Tr_six -> Kyiv - Kharkiv : ${temp2 !== -1 ? "знайдено" : "не знайдено"}`);
////////////////////////////////////////////////////////////////////////////////////

// Додавання пасажира
mod.add_Passenger("Катерина Василівна", 12300);
mod.add_Passenger("Анна Петрівна", 45600);
mod.add_Passenger("Олег Борисович", 159400);
mod.add_Passenger("Оксана Михалівна", 78900);


// Список усіх пасажирів
mod.get_Passenger_List ();

// Видалення пасажирів
console.log("Видалення пасажира: Олег Борисович ");
mod.remove_Passenger("Олег Борисович", 159400);

// Список  усіх пасажирів
mod.get_Passenger_List();


// Пошук пасажирів
let pas1 = mod.find_Passenger ("Оксана Михалівна", 78900);
console.log(`Пошук пасажира - Оксана Михалівна id-78900 : ${pas1 !== -1 ? "знайдено" : "не знайдено"}`);
let pas2 = mod.find_Passenger("Андрій Іванович", 380900);
console.log(`Пошук пасажира - Андрій Іванович id-380900 : ${pas2 !== -1 ? "знайдено" : "не знайдено"}`);

// Заміна пасажира
console.log("\nЗаміна пасажира: Катерина Василівна на Юлія Василівна");
mod.edit_Passenger ("Катерина Василівна", 12300, "Юлія Василівна", 89234);

// Список  усіх пасажирів
mod.get_Passenger_List();

/////////////////////////////////////////////////////////////////////////////////////

mod.get_Trains_List();

//Покупка пасажиром квитка на потяг

mod.byeTicket("Катя", 100, "Tr_fourth", "Kyiv - Kharkiv", 1);
mod.byeTicket("Діма", 200, "Tr_fourth", "Kyiv - Kharkiv", 3);
mod.byeTicket("Настя", 100, "Tr_fifth", "Kharkiv - Odessa", 1);
mod.byeTicket("Володя", 100, "Tr_fifth", "Kharkiv - Odessa", 2);
mod.byeTicket("Іра", 200, "Tr_fifth", "Kharkiv - Odessa", 3);
mod.byeTicket("Даша", 200, "Tr_fifth", "Kharkiv - Odessa", 4);


// Вивід пасажирів поїздів
console.log("\nПасажири потягу Tr_fourth : ")
mod.get_sold_ticket_list("Tr_fourth", "Kyiv - Kharkiv");
console.log();
console.log("Пасажири потягу Tr_fifth : ")
mod.get_sold_ticket_list("Tr_fifth", "Kharkiv - Odessa");

//Заміна одного квитка на інший
console.log(`Заміна квитка для Володі з потяга Tr_fifth на Tr_fourth ...`)
mod.edit_Ticket ("Володя", 100, "Tr_fifth", "Kharkiv - Odessa", 2, "Tr_fourth", "Kyiv - Kharkiv", 3)

console.log("\nПасажири потягу Tr_fourth : ")
mod.get_sold_ticket_list("Tr_fourth", "Kyiv - Kharkiv");
console.log();
console.log("Пасажири потягу Tr_fifth : ")
mod.get_sold_ticket_list("Tr_fifth", "Kharkiv - Odessa");


//Скасування квитка покупця
console.log(`Видалення квитка : покупець Настя | потяг Tr_fifth | напрям Kharkiv - Odessa | місце 1 \n`);
mod.remove_bye_Ticket ("Настя", 100, "Tr_fifth", "Kharkiv - Odessa", 1);

console.log("\nПасажири потягу Tr_fourth : ")
mod.get_sold_ticket_list("Tr_fourth", "Kyiv - Kharkiv");
console.log();
console.log("Пасажири потягу Tr_fifth : ")
mod.get_sold_ticket_list("Tr_fifth", "Kharkiv - Odessa");

// Пошук потягу у якому купили найбільше і найменше квитків
mod.search_min_max_count_of_sold_list();

console.log("\n\t\t\t End coding!")




