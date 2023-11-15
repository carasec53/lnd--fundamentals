document.getElementById("searchBtn").addEventListener("click", function () {
    event.preventDefault();
    var carInputValue = document.getElementById("carInput").value;
    var searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(carInputValue);
    window.open(searchUrl, "_blank");
});

document.getElementById("submitBtn").addEventListener("click", function () {
    var car = document.getElementById("carInputForm").value;
    var model = document.getElementById("modelInputForm").value;
    var engine = document.getElementById("engineInputForm").value;
    var hp = document.getElementById("hpInputForm").value;

    createNewCard(car, model, engine, hp);

    document.getElementById("carForm").reset();
});

function createNewCard(car, model, engine, hp) {
    var newCardHTML = `
        <div class="card">
            <h2>${car}</h2>
            <ul class="infos">
                <li class="infos" style="font-weight: bold; color:#0ab9ba">Car: </li><li>${car}</li>
                <li class="infos" style="font-weight: bold; color:#0ab9ba">Model: </li><li>${model}</li>
                <li class="infos" style="font-weight: bold; color:#0ab9ba">Engine: </li><li>${engine}</li>
                <li class="infos" style="font-weight: bold; color:#0ab9ba">Horse Power: </li><li>${hp}</li>
            </ul>
        </div>
    `;

    document.getElementById("favcar").insertAdjacentHTML('beforeend', newCardHTML);
}
