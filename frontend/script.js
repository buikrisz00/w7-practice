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
            // Clicked background color change

            // Create empty array for siblings
            let siblings = [];
            // Set first sibling of the menu div
            let sibling = event.target.parentNode.firstChild;
            // Collect all child items of menu divs into the siblings array
            for (let i = 0; i < event.target.parentNode.childElementCount; i++) {
                siblings.push(sibling);
                sibling = sibling.nextSibling;
            }
            // Iterate through the siblings array and remove the clickedDiv class from all
            for (const sib of siblings) {
                sib.classList.remove("clickedDiv");
            }
            // Add clickedDiv class to the clicked item for background color change
            event.target.classList.add("clickedDiv");

            // Country filtering

            // Empty the filteredCountries array
            filteredCountries = [];
            // Iterate through the countries array and filter for clicked continent
            for (const country of countries) {
                if (country.continent === event.target.innerHTML) {
                    filteredCountries.push(country);
                }
            }
            // Call filterCountries method with new filteredCountries array
            filterCountries(filteredCountries);
        })
    }
}

window.addEventListener("load", loadEvent);