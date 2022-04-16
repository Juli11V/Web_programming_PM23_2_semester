// ...............................................................................................
// Підключення модулів ...........................................................................

// Підключаємо express - веб фреймворк
const express = require("express");

// Підключаємо path - модуль для роботи із шляхами
const path = require("path");

// ...............................................................................................
// Створення необхідних змінних ..................................................................

// Доступ до функцій модуля express
const exp = express();

// Порт доступу до локального сервера
const PORT = process.env.PORT || 8080;

// Шлях до директорії проекту
const dir_proj = path.join(__dirname, "/../../");

// Шлях до директорії фронтенду
const dir_front = __dirname;

// Шлях до директорії view-елементів
const dir_views = path.join(dir_front, "/views");

// ...............................................................................................

// Встановлюємо директорію для віддачі статичного контенту
// У нашому випадку це буде директорія проекту
exp.use(express.static(dir_proj));

// Задаємо шаблонізатор, який буде використовуватися для відображення веб-сторінок
exp.set("view engine", "ejs");

// Задаємо шлях до view-елементів
exp.set("views", dir_views);

// ...............................................................................................
// Налаштовуємо маршрутизацію

// ... для головної сторінки
exp.get(["/", "/index"], function (request, response) {
    response.render("pages/index", { title: "Головна сторінка", page_id: "0" })
});

// ... для сторінки "Потяги"
exp.get("/trains", function (request, response) {
    response.render("pages/trains", { title: "Потяги",page_id: "1" })
});

// ... для сторінки "Пасажири"
exp.get("/passengers", function (request, response) {
    response.render("pages/passengers", { title: "Пасажири",page_id: "2" })
});

// ... для сторінки "Квитки"
exp.get("/tickets", function (request, response) {
    response.render("pages/tickets", { title: "Квитки",page_id: "3" })
});

// ... для сторінки "Продані квитки"
exp.get("/ticketsSold", function (request, response) {
    response.render("pages/ticketsSold", { title: "Продані квитки",page_id: "4" })
});

// ... для сторінки 404 - "Сторінку не знайдено"
exp.use(function (request, response) {
    response.status(404);
    response.render("pages/404", { title: "Error 404",
        page_id: "-1",
        path: request.path });
});
// ...............................................................................................

// Запускаємо локальний сервер
exp.listen(PORT);

// Виводимо інформаційне повідомлення
console.log(`Server is started on ${PORT} port`);
console.log(`Url: http://localhost:${PORT}`);