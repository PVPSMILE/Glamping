calculatePrice()
getBookingDates()

function getValueOfDate() {
    document.getElementById('popup-book-date').textContent = document.getElementById('book-date').value;
}
function copyCardNumber() {
    const cardNumber = document.getElementById('card-number').textContent;

    navigator.clipboard.writeText(cardNumber)
}
var phoneInput = document.querySelector('.phone')
phoneInput.addEventListener('keydown', function(event) {
   if( !(event.key == 'ArrowLeft' ||  event.key == 'ArrowRight' ||  event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
    var mask = '+380 (11) 111-11-11'; 
 
    if (/[0-9+\ -()]/.test(event.key)) {    
        var currentString = this.value;
        var currentLength = currentString.length;
        if (/[0-9]/.test(event.key)) {
            if (mask[currentLength] == '1') {
                this.value = currentString + event.key;
            } else {
                for (var i=currentLength; i<mask.length; i++) {
                if (mask[i] == '1') {
                    this.value = currentString + event.key;
                    break;
                }
                currentString += mask[i];
                }
            }
        }
    } 
});

function getBookingDates(){
    fetch('https://loungespace.site/api/getBookings')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const disabledDates = data.data.map(booking => ({
                    from: booking.date_from,
                    to: booking.date_to
                }));
                flatpickr("#book-date", {
                    locale: {
                        firstDayOfWeek: 1,
                        weekdays: {
                            shorthand: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                            longhand: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'],
                        },
                        months: {
                            shorthand: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
                            longhand: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
                        },
                        rangeSeparator: " — "
                    },
                    mode: 'range',
                    minDate: "today",
                    dateFormat: "Y-m-d",
                    disable: disabledDates,
                });
            } else {
                console.error('Ошибка получения данных');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function countPeople() {
    const basePrice = 0;
    const additionalPricePerPerson = 1000;
    let peopleCountElement = document.getElementById("people").value;

    if (peopleCountElement <= 2) {
        return basePrice;
    }
    if (peopleCountElement > 4){
        peopleCountElement = 4;
    }
    const totalPrice = basePrice + (peopleCountElement - 2) * additionalPricePerPerson;
    return totalPrice;
}

function getNights() {
    const val = (document.getElementById("book-date").value || "").trim();
    if (!val) return 1;

    const [sFrom, sToRaw] = val.split(" — ").map(s => s && s.trim());
    if (!sFrom) return 1;
    if (!sToRaw) return 1; // выбрана только стартовая дата → 1 ночь

    // парсим как UTC (без DST)
    const toUTC = (s) => {
        const [y, m, d] = s.split("-").map(Number);
        return Date.UTC(y, m - 1, d);
    };

    let from = toUTC(sFrom);
    let to   = toUTC(sToRaw);

    // на всякий: если даты перепутаны — меняем местами
    if (to < from) [from, to] = [to, from];

    const days = Math.floor((to - from) / 86400000);
    return days + 1; // включительно
}


function calculatePrice() {
    const basePerNight = 4000;            // базовая цена за ночь
    const peopleSurcharge = countPeople(); // надбавка за ночь
    const holidaySurcharge = checkIsHoliday(); // надбавка за ночь (число)
    const nights = getNights();

    let perNight = basePerNight + peopleSurcharge + holidaySurcharge;
    let total = perNight * nights;

    // если нужна разовая доплата за животных — раскомментируй:
    // if (checkAnimals()) total += 300;

    const elPrice = document.getElementById("price");
    elPrice.textContent = total.toLocaleString('uk-UA') + " грн.";
    const elPerNight = document.getElementById("nights-count");
    elPerNight.textContent = ("Ночей: ") + nights;
    console.log(`Цена за ночь: ${perNight.toLocaleString('uk-UA')} грн.`);
    console.log(`ночь: ${nights} грн.`);
}

const checkbox = document.getElementById('accept_terms');
const button = document.getElementById('submitBtn');

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            button.classList.remove('disabled');
            button.classList.add('active');
        } else {
            button.classList.add('disabled');
            button.classList.remove('active');
        }
});

let popupBg = document.querySelector('.popup_bg');
let popup = document.querySelector('.popup');
let openPopupButtons = document.querySelectorAll('.open-popup');
let closePopupButton = document.querySelector('.close-popup');

function popup_activate (){
    getValueOfDate();
    popupBg.classList.add('active');
    popup.classList.add('active');
}
function popup_deactivate (){
    popupBg.classList.remove('active');
    popup.classList.remove('active');
    location.reload();
}
function validateForm() {
    let firstName = document.getElementById("first-name").value;
    let surname = document.getElementById("surname").value;
    let phone = document.getElementById("phone").value;
    let dates = document.getElementById("book-date").value;
    let [dateFrom, dateTo] = dates.split(" — ");
    // let animals = document.getElementById("animals").value && document.getElementById("animals").value === "2"
    let animals = false
    let peopleCount = document.getElementById("people").value
    let comment = document.getElementById("client-comment").value
    let price = document.getElementById("price").textContent.replace(/\D/gi, '')
    if (firstName === "" || surname === "" || phone === "" || dates === "") {
      console.log("Пожалуйста, заполните все поля формы.");
      return false;
    } else {
        let data = {
            firstName: firstName,
            surname: surname,
            phone: phone,
            dateFrom: dateFrom,
            dateTo: dateTo,
            touristCount: peopleCount,
            animals: animals,
            comment: comment,
            price: price,
        };

        fetch('https://loungespace.site/api/booking', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json(); // Обработка ответа как JSON
            })
            .then(data => {
                if (data.success) {
                    popup_activate();
                } else {
                    alert(`Сталась помилка: ${data.error_msg}`);
                }
            })
            .catch(() => {
                alert('Сталась помилка під час виконання запиту. Будь-ласка, перевірте правильність заповненних даних та спробуйте ще раз');
            });
      return true;
    }
}

function parseLocalDate(value) {
    if (!value) return new Date();
    const [y, m, d] = value.split('-').map(Number); // "YYYY-MM-DD" из flatpickr
    return new Date(y, m - 1, d); // локальная дата без UTC-сдвигов
}

function inMonthDayWindow(date, start, end) {
    // start/end = [month, day], напр. [12,25]..[1,10]
    const md = (date.getMonth() + 1) * 100 + date.getDate();
    const s  = start[0] * 100 + start[1];
    const e  = end[0]   * 100 + end[1];
    return (s <= e) ? (md >= s && md <= e) : (md >= s || md <= e); // поддержка окна через Новый год
}

function checkIsHoliday() {
    const val = (document.getElementById("book-date").value || "").trim();
    if (!val) return 0;

    const [sFrom, sToRaw] = val.split(" — ").map(s => s && s.trim());
    if (!sFrom) return 0;
    const sTo = sToRaw || sFrom;

    // UTC-даты
    const toUTCDate = (s) => {
        const [y, m, d] = s.split("-").map(Number);
        return new Date(Date.UTC(y, m - 1, d));
    };

    let from = toUTCDate(sFrom);
    let to   = toUTCDate(sTo);
    if (to < from) [from, to] = [to, from];

    let totalExtra = 0;

    // перебор дней включительно
    for (let d = new Date(from); d <= to; d.setUTCDate(d.getUTCDate() + 1)) {
        // Новогоднее окно 25.12–10.01 любого года
        if (inMonthDayWindowUTC(d, [12, 25], [1, 10])) {
            totalExtra += 2000;
            continue;
        }

        const dow = d.getUTCDay(); // 0-вс..6-сб
        if (dow === 5 || dow === 6 || dow === 0) {
            totalExtra += 500; // пт/сб/вс
        }
    }

    return totalExtra;
}

// Вариант month-day окна в UTC (если у тебя не было готового):
function inMonthDayWindowUTC(dateUTC, startMD, endMD) {
    // startMD/endMD = [месяц, день]
    const m = dateUTC.getUTCMonth() + 1;
    const d = dateUTC.getUTCDate();
    const md = m * 100 + d;

    const s = startMD[0] * 100 + startMD[1];
    const e = endMD[0]   * 100 + endMD[1];

    // окно может «переламывать» год (декабрь → январь)
    if (s <= e) return md >= s && md <= e;
    return md >= s || md <= e;
}

// function checkAnimals(){
//     let selectElement = document.getElementById("animals");
//     let selectedValue = selectElement.value;

//     let withAnimals
//     if (selectedValue === "1" ) {
//         withAnimals = false
//     } else {
//         withAnimals = true
//     }

//     return withAnimals
// }

document.getElementById('book-date').addEventListener('change', function() {
    calculatePrice()
});

document.getElementById('people').addEventListener('change', function() {
    calculatePrice()
});

window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
        const u = new URL(window.location.href);
        u.searchParams.set('bf', Date.now());
        window.location.replace(u.toString());
    }
});