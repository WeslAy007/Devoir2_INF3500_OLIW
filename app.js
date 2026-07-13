// Sélection des éléments HTML
const form = document.getElementById("country-form");
const input = document.getElementById("country-input");
const API_KEY = "rc_live_61192c8f8c6d4bb69f716668bf5558ef";

const loading = document.getElementById("loading");
const apiMessage = document.getElementById("api-message");
const errorMessage = document.getElementById("country-error");

const card = document.getElementById("country-card");

const flagImg = document.getElementById("flag-img");
const countryName = document.getElementById("country-name");
const countryCapital = document.getElementById("country-capital");
const countryPopulation = document.getElementById("country-population");
const countryRegion = document.getElementById("country-region");
const countryCurrency = document.getElementById("country-currency");
const countryLanguages = document.getElementById("country-languages");

// Événement du formulaire
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const country = input.value.trim();

    if (country === "") {
        showInputError("Veuillez entrer un nom de pays.");
        return;
    }

    hideInputError();
    searchCountry(country);
});

// Recherche du pays
async function searchCountry(country) {

    loading.hidden = false;
    apiMessage.hidden = true;
    card.hidden = true;

    try {

        const response = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`
        );

        if (!response.ok) {
            throw new Error("Pays introuvable.");
        }

        const data = await response.json();

        displayCountry(data[0]);

    } catch (error) {

        apiMessage.hidden = false;
        apiMessage.textContent = error.message;

    } finally {

        loading.hidden = true;

    }

}

// Affichage des informations
function displayCountry(country) {

    flagImg.src = country.flags.svg;
    flagImg.alt = `Drapeau de ${country.name.common}`;

    countryName.textContent = country.name.official;

    countryCapital.textContent =
        country.capital ? country.capital[0] : "Non disponible";

    countryPopulation.textContent =
        country.population.toLocaleString("fr-FR");

    countryRegion.textContent =
        `${country.region} ${country.subregion ? "- " + country.subregion : ""}`;

    // Monnaie
    if (country.currencies) {
        const currencies = Object.values(country.currencies)
            .map(currency => `${currency.name} (${currency.symbol || ""})`)
            .join(", ");

        countryCurrency.textContent = currencies;
    } else {
        countryCurrency.textContent = "Non disponible";
    }

    // Langues
    if (country.languages) {
        countryLanguages.textContent =
            Object.values(country.languages).join(", ");
    } else {
        countryLanguages.textContent = "Non disponible";
    }

    card.hidden = false;
}

// Message d'erreur
function showInputError(message) {

    errorMessage.hidden = false;
    errorMessage.textContent = message;

}

function hideInputError() {

    errorMessage.hidden = true;
    errorMessage.textContent = "";

}