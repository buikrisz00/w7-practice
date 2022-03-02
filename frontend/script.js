function Country(name, short, population, flag, continent) {
    this.name = name;
    this.short = short;
    this.population = population;
    this.flag = flag;
    this.continent = continent;
}

//Components
const header = (logo) => {
    return `
    <header>
        <a id="logo">${logo}</a>
        <button></button>
    </header>
    `
}

const countryCard = (name, short, population, flag, continent) => {
    return `
        <div class="countryCard">
            <h2>${name}</h2>
            <h3>${short}</h2>
            <h4>${population}</h2>
            <h5>${continent}</h2>
            <img>${flag}</img>
        </div>
    `;
}

const countryCards = (countries, callCountryCard) => {
    let toReturn = "";
    for (const country of countries) {
        toReturn += callCountryCard(country.name.common, country.cca3, country.population, country.flags.svg, country.continents[0]);
    }
    return toReturn;
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
    rootElement.insertAdjacentHTML("beforeend", header("Countries"));
    rootElement.insertAdjacentHTML("beforeend", countryCards(countries, countryCard));
}

window.addEventListener("load", loadEvent);