// get Data

function Month(name, id, nth, days) {
    this.name = name;
    this.id = id;
    this.nth = nth;
    this.days = days;
}

const months = [
    new Month("January", "jan", 1, 31),
    new Month("February", "feb", 2, 28),
    new Month("March", "mar", 3, 31),
    new Month("April", "apr", 4, 30),
    new Month("May", "may", 5, 31),
    new Month("June", "jun", 6, 30),
    new Month("July", "jul", 7, 31),
    new Month("August", "aug", 8, 31),
    new Month("September", "sep", 9, 30),
    new Month("October", "oct", 10, 31),
    new Month("November", "nov", 11, 30),
    new Month("December", "dec", 12, 31)
];

// prepare Data

// components = HTML elements we would like to add to the document later

const monthSection = (id, h1, days) => {
    return `
        <section id="${id}">
            <h1>${h1}</h1>
            <div class="days">${days}</div>
        </section>
    `;
}

const dayCard = (year, month, day) => {
    return `
        <div class="card">
            <time>${year}</time>
            <time>${month}</time>
            <time>${day}</time>
            <button class="card-btn">Get day name</button>
        </div>
    `;
}

const dayCards = (month, callDayCard) => {
    let toReturn = "";
    for (let i = 1; i <= month.days; i++) {
        toReturn += callDayCard(2022, month.nth, i);
    }

    return toReturn;
}

// render = add the components to the document

const loadEvent = _ => {
    const rootElement = document.getElementById("root");
    let htmlContent = "";

    for (const month of months) {
        htmlContent += monthSection(month.id, month.name, dayCards(month, dayCard));
    }

    rootElement.insertAdjacentHTML("beforeend", htmlContent);

    // ClickEvent
    function clickEvent(event) {
        if (event.target.classList.contains("card-btn")) {
            event.target.innerHTML = "This button was clicked";
        }
    }
    document.addEventListener("click", clickEvent);
}

window.addEventListener("load", loadEvent);