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

const countryCard = (name, short, population, flag, continent) => `
        <div class="countryCard">
            <h2>${name}</h2>
            <h3>${short}</h2>
            <h4>${population}</h2>
            <h5>${continent}</h2>
            <img src="${flag}"></img>
        </div>
    `

/* 
const countryCard = (name, short, population, flag, continent) => {
    return `
        <div class="countryCard">
            <h2>${name}</h2>
            <h3>${short}</h2>
            <h4>${population}</h2>
            <h5>${continent}</h2>
            <img src="${flag}"></img>
        </div>
    `;
} */

const countryCards = (countries, callCountryCard) => countries.map(country => `${callCountryCard(country.name, country.short, country.population, country.flag, country.continent)}`)

/* const countryCards = (countries, callCountryCard) => {
    let toReturn = "";
    countries.map(function (country) {
        toReturn += callCountryCard(country.name, country.short, country.population, country.flag, country.continent);
    })
    return toReturn;
} */

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
    console.log(countries);

    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML("beforeend", header("Countries", menuButton));
    rootElement.insertAdjacentHTML("beforeend", countryCards(countries, countryCard).join(""));

    const menuBtn = document.getElementById("menuBtn");
    menuBtn.addEventListener("click", (event) => {
        event.target.classList.toggle("clicked");
    })
}

window.addEventListener("load", loadEvent);