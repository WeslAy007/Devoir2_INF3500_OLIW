fetch(
  'https://api.restcountries.com/v3.1/all',
  { headers: { 'Authorization': 'Bearer rc_live_50c43f06b93445bc9ea8c914cbdbc47a' } }
)
  .then(function (response) { return response.json(); })
  .then(function (data) { console.log(data); })
  .catch(function (error) { console.error('Error fetching countries:', error); });