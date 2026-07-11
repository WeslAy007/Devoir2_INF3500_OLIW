
  fetch(
  'https://api.restcountries.com/countries/v5?q=canada',
  { headers: { 'Authorization': 'Bearer rc_live_61192c8f8c6d4bb69f716668bf5558ef' } }
)
  .then(function (response) { return response.json(); })
  .then(function (data) { console.log(data); });