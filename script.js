// 1. Récupération des éléments HTML
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// 2. Écoute du clic sur le bouton Rechercher
searchBtn.addEventListener('click', () => {
    const countryName = searchInput.value.trim();
    if (countryName !== "") {
        searchCountry(countryName);
    } else {
        alert("Veuillez entrer le nom d'un pays.");
    }
});

// 3. Fonction de recherche sur l'API (Version v5 avec votre Token d'autorisation)
function searchCountry(name) {
    // Remplacer "canada" par la variable dynamique ${name}
    fetch(`https://api.restcountries.com/countries/v5?q=${encodeURIComponent(name)}`, {
        headers: {
            'Authorization': 'Bearer rc_live_61192c8f8c6d4bb69f716668bf5558ef'
        }
    })
    .then(function (response) {
        if (!response.ok) {
          throw new Error("Pays introuvable ou erreur d'autorisation");
        }
        return response.json();
      })
    .then(data => {
        console.log(data); // Affiche les données reçues dans la console
        
        // C'est ici qu'on pourra ajouter le code pour afficher les infos sur la page
    })
    .catch(error => {
        console.error(error);
        alert("Erreur : Impossible de récupérer les données de ce pays.");
    });
}
fetch(
  'https://api.restcountries.com/countries/v5?q=canada',
  { headers: { 'Authorization': 'Bearer rc_live_61192c8f8c6d4bb69f716668bf5558ef' } }
)
  .then(function (response) { return response.json(); })
  .then(function (data) { console.log(data); });