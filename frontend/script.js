// Load esemény + form + 3 input mező (szöveges) + gomb
// Minden input mezőre input esemény menjen rá --> console.logolja ki az értékét az input mezőnek

async function loadEvent() {
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML("beforeend", `
    <form>
    <input type="text" id="input1" class="input" name="input1"/>
    <input type="text" id="input2" class="input" name="input2"/>
    <input type="text" id="input3" class="input" name="input3"/>
    <select name="animals" id="animals">
    <option value="both">Both</option>
    <option value="cats">Cats</option>
    <option value="dogs">Dogs</option>
    </select>
    <button>Click</button>
    </form>
    `);
    const formElement = rootElement.querySelector("form");
    
    const inputs = document.querySelectorAll(".input");
    /* for (const input of inputs) {
        input.addEventListener("input", function (event) {
            console.log(event.target.value);
        })
    } */

    Array.from(inputs).map(function (input) {
        input.addEventListener("input", function (event) {
            console.log(event.target.value);
        })
    })

    formElement.querySelector("select").addEventListener("input", function (event) {
        console.log(event.target.value);
    })

    formElement.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log(event.target);
    })

    const apiKey = "MQDFPbyygp3ONA3J2zcHkIqLbdYEJcU0ss2MDhqH";
    const requestedDate = "2022-02-22"

    const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${requestedDate}`);
    const apodJSON = await apod.json();

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${requestedDate}`)
        .then(function (apodResponse) {
            console.log(apodResponse);
            apodResponse.json().then(function (apodResponseJSON) {
                console.log(apodResponseJSON.explanation); 
            })
        })
}

window.addEventListener("load", loadEvent);