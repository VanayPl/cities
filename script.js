const cities = [
    { name: "Київ", image: "https://static.ukrinform.com/photos/2021_08/thumb_files/630_360_1630176848-103.jpg" },
    { name: "Львів", image: "https://ukr-prokat.com/wp-content/uploads/2020/07/lviv.jpg" },
    { name: "Одеса", image: "https://aws-travel-guide.s3.eu-west-1.amazonaws.com/default_image_size/603fbe7b33f8d_%D0%BE%D0%B4%D0%B5%D1%81%D0%B0.jpg" },
    { name: "Харків", image: "https://sho.org.ua/wp-content/uploads/2023/04/harkiv.webp" },
    { name: "Дніпро", image: "https://etnosvit.com/wp-content/uploads/2019/03/dnepr.jpg" },
    { name: "Чернівці", image: "https://promin.cv.ua/uploads/posts/2017-10/1507709750_1442180581_68423_800x600_chernovcy.jpg" },
    { name: "Вінниця", image: "https://andy-travel.com.ua/sites/default/files/1656966271596.jpg" },
    { name: "Запоріжжя", image: "https://aws-travel-guide.s3.eu-west-1.amazonaws.com/default_image_size/60794d730da99_%D0%97%D0%B0%D0%BF%D0%BE%D1%80%D1%96%D0%B6%D0%B6%D1%8F.jpg" },
    { name: "Івано-Франківськ", image: "https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamdPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--86f901a06a2c1919b7944e4045b219ba0ba7f92d/%D1%80%D0%B0%D1%82%D1%83%D1%88%D0%B0%20%D1%84%D1%80%D0%B0%D0%BD%D0%BA%D1%96%D0%B2%D1%81%D1%8C%D0%BA%20%D1%89%D0%BE%20%D0%BF%D0%BE%D0%B4%D0%B8%D0%B2%D0%B8%D1%82%D0%B8%D1%81%D1%8C.jpeg" }
];

let correctCityId = '';
let remainingCities = [...cities];
let mistakes = 0;
const maxMistakes = 3;

function startGame() {
    document.getElementById("result").textContent = "";
    mistakes = 0;
    remainingCities = [...cities];
    
    // Починаємо з першого міста
    nextCity();
}

function nextCity() {
    if (remainingCities.length === 0) {
        document.getElementById("result").textContent = "Вітаємо! Ти вгадав всі міста!";
        return;
    }

    // Вибираємо випадкове місто з тих, що залишились
    const randomCityIndex = Math.floor(Math.random() * remainingCities.length);
    const randomCity = remainingCities[randomCityIndex];
    document.getElementById("random-city").textContent = `Вгадай місто: ${randomCity.name}`;

    // Перемішуємо всі міста
    const shuffledCities = cities.sort(() => Math.random() - 0.5);

    // Додаємо зображення міст до елементів
    shuffledCities.forEach((city, index) => {
        const cityDiv = document.getElementById(`city-${index + 1}`);
        cityDiv.style.backgroundImage = `url(${city.image})`;

        if (city.name === randomCity.name) {
            correctCityId = `city-${index + 1}`;
        }
    });

    // Видаляємо це місто з масиву, щоб більше не повторювалось
    remainingCities.splice(randomCityIndex, 1);
}

function checkCity(selectedCityId) {
    if (selectedCityId === correctCityId) {
        document.getElementById("result").textContent = "Правильно! Ти вгадав місто.";
        nextCity();
    } else {
        mistakes++;
        document.getElementById("result").textContent = `Неправильно! У тебе залишилося ${maxMistakes - mistakes} помилки.`;
        if (mistakes >= maxMistakes) {
            document.getElementById("result").textContent = "Гра закінчена! Ти зробив 3 помилки.";
            disableClicks();
        }
    }
}

function disableClicks() {
    const cityDivs = document.querySelectorAll('.city');
    cityDivs.forEach(cityDiv => {
        cityDiv.onclick = null;
    });
}

// Почати гру при завантаженні сторінки
window.onload = startGame;