function Country(name, short, population, flag, continent) {
    this.name = name;
    this.short = short;
    this.population = population;
    this.flag = flag;
    this.continent = continent;
}

//Components
const header = (logo, button) => {
    return `
    <header>
        <a id="logo">${logo}</a>
        ${button()}
    </header>
    `
}

const createMenu = (continents) => {
    let menuItems = "";
    for (const continent of continents) {
        menuItems += `<div>${continent}</div>`
    }

    return `
    <div class="menu">${menuItems}</div>
    `
}

const countryCard = (name, short, population, flag, continent) => `
        <div class="countryCard">
            <h2>${name}</h2>
            <h3>${short}</h2>
            <h4>${population}</h2>
            <h5>${continent}</h2>
            <img src="${flag}"></img>
        </div>
    `

const countryCards = (countries, callCountryCard) => countries.map(country => `${callCountryCard(country.name, country.short, country.population, country.flag, country.continent)}`)

const menuButton = _ => {
    return `
    <button id="menuBtn">
        <svg width="40" height="40">
            <rect width="20" height="2"/>
            <rect width="20" height="2"/>
            <rect width="20" height="2"/>
        </svg>
    </button>
    `
}

const loadEvent = async _ => {
    //Get Data
    const countryRes = await fetch("https://restcountries.com/v3.1/all");
    const countryArr = await countryRes.json();
    
    //Process Data
    let countries = countryArr.map(function (country) {
        return new Country(country.name.common, country.cca3, country.population, country.flags.svg, country.continents[0]);
    })

    let continents = [];
    for (const country of countries) {
        let isDuplicate = false;
        for (let i = 0; i <= continents.length; i++) {
            if (country.continent === continents[i]) {
                isDuplicate = true;
            }            
        }
        if (!isDuplicate) {
            continents.push(country.continent);
        }
    }

    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML("beforeend", header("Countries", menuButton));
    rootElement.insertAdjacentHTML("beforeend", `<div class="container">${countryCards(countries, countryCard).join("")}</div>`);
    rootElement.insertAdjacentHTML("beforeend", createMenu(continents))

    const menuBtn = document.getElementById("menuBtn");
    const menuDiv = document.querySelector(".menu");
    const containerDiv = document.querySelector(".container");
    menuBtn.addEventListener("click", (event) => {
        event.target.classList.toggle("clicked");
        menuDiv.classList.toggle("show");
    })

    // Filter countries
    const filterCountries = function (filteredCountries) {
        containerDiv.innerHTML = `
        ${countryCards(filteredCountries, countryCard).join("")}
        `
    }
    let filteredCountries = [];
    for (const menuItems of menuDiv.childNodes) {
        menuItems.addEventListener("click", function (event) {
            filteredCountries = [];
            for (const country of countries) {
                if (country.continent === event.target.innerHTML) {
                    filteredCountries.push(country);
                }
            }
            filterCountries(filteredCountries);
        })
    }
}

window.addEventListener("load", loadEvent);