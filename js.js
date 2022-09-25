let date = new Date()

let month = document.querySelector(".month");
let days = document.querySelector(".days");

// let thisYear = date.getFullYear();
// let thisMonth = date.getMonth()
let thisYear = 2023;
let thisMonth = 0;

go();
function go(newDays = days) {
    let firstDay = 1; // первый день месяца
    let lastDay = getLastDayOfMonth(thisYear, thisMonth); // последний день месяца

    let limit = 0; // чтобы в неделе было максимум 7 дней
    let rememberDay = firstDay;   // в цикле помнить день
    let nulldaysStart = 0;         // пустые дни в начале каленьдаря
    let stop = false;               // чтобы остановить цикл, когда дойдёт до последнего дня месяца

    for(let i = 1; i <=6; i++) {
        let week = renderWeek()  // элемент div с классом week
        for(let j = rememberDay; j <= lastDay; j++) {
            if(limit < 7) {
                if(nulldaysStart < get_Start_First_Day_OfMonth(thisYear, thisMonth)) {
                    for(let k = 0; k < get_Start_First_Day_OfMonth(thisYear, thisMonth); k++) {
                        week.appendChild(renderDay(null))
                        limit++; 
                        nulldaysStart++;
                    }
                }

                if(j == lastDay) { // в последнем дне 
                    week.appendChild(renderDay(j))
                    if(7 - limit+1 != 7) {      // рисуем пустые после последнего
                        for(let c = 1; c < 7 - limit; c++) {
                            week.appendChild(renderDay(null))
                        }
                    }
                    stop = true;
                } else {
                    week.appendChild(renderDay(j))
                    limit++; 
                }
            } else {
                limit = 0;
                rememberDay = j;
                break;
            }
        }
        newDays.appendChild(week)
        if(stop) {
            break;
        }
    }
    month.appendChild(newDays)

}
//нарисовать день
function renderDay(j) {
    let day = document.createElement("div");
    day.classList.add("day")
    day.innerHTML = j;
    return day;
}
// нарисовать неделю
function renderWeek() {
    let week = document.createElement("div");
    week.classList.add("week");
    return week;
}
// возвращает последний день месяца
function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}
// возвращает день недели первого дня месяца
function get_Start_First_Day_OfMonth(year, month) {
    let date = new Date(year, month, 1) 
    return date.getDay()
}

// buttons
let monthMinus = document.querySelector(".monthMinus");
let monthPlus = document.querySelector(".monthPlus");

monthMinus.addEventListener("click", function() {
    if(thisMonth == 0) {
        thisMonth = 11;
        thisYear--;
    } else {
        thisMonth--;
    }
    go(newTable())
})
monthPlus.addEventListener("click", function() {
    if(thisMonth == 11) {
        thisMonth = 0;
        thisYear++;
    } else {
        thisMonth++;
    }
    go(newTable())
})
// обновляет каленьдар
function newTable() {
    let days = document.querySelector(".days");
    month.removeChild(days)
    let newDays = document.createElement("div");
    newDays.classList.add("days")
    month.appendChild(newDays)
    return newDays
}


