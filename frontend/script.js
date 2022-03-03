// Load esemény + form + 3 input mező (szöveges) + gomb
// Minden input mezőre input esemény menjen rá --> console.logolja ki az értékét az input mezőnek

function loadEvent() {
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
}

window.addEventListener("load", loadEvent);