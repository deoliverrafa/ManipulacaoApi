const checkTimeButton = document.querySelector('.checkTime');
const boxData = document.querySelector('.box');
const hourValue = document.querySelector('.hourValue');
const climateValue = document.querySelector('.climateValue');
const tempValue = document.querySelector('.tempValue');
const umidadeValue = document.querySelector('.umidadeValue');
const stateValue = document.querySelector('.stateValue');
const cityValue = document.querySelector('.cityValue');
const countryValue = document.querySelector('.countryValue');

let query = '';
let geoLocation = null;
let dataInterval;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    geoLocation = [latitude, longitude];

    query = `${geoLocation[0]},${geoLocation[1]}`;

  }, function (error) {
    console.error('Erro ao obter a geolocalização:', error);
  });
} else {
  alert("Geolocalização não é suportada neste navegador.");
}

function atualizarData() {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  let data = today.toLocaleTimeString();

  hourValue.innerHTML = data; 

  dataInterval = setInterval(() => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let data = today.toLocaleTimeString();
    hourValue.innerHTML = data;
  }, 1000);
}

checkTimeButton.addEventListener('click', async () => {
  checkTimeButton.classList.add('active');
  checkTimeButton.innerHTML = 'Verificar Novamente';
  boxData.classList.add('active');

  const api = `https://api.weatherapi.com/v1/current.json?key=7a609d1f8bc74d57942113350231309&q=${query}`;

  async function getData() {
    try {
      const response = await fetch(api);

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      alert('Verifique se permitiu a Localização');
      throw new Error('Erro ao obter dados');
    }
  }

  const response = await getData();

  cityValue.innerHTML = response.location.name;
  stateValue.innerHTML = response.location.region;
  countryValue.innerHTML = response.location.country;
  climateValue.innerHTML = response.current.condition.text;
  tempValue.innerHTML = `${response.current.feelslike_c}°C`;
  umidadeValue.innerHTML = `${response.current.humidity}%`;

  atualizarData();
});
