console.log('serving public js files');

const weatherForm = document.getElementById('weather-form');
const addressInput = document.getElementById('address-input');
const loadingNote = document.querySelector('.loading-note');
const forecastInfo = document.querySelector('.forecast-info');


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  loadingNote.textContent = "Loading...";
  forecastInfo.textContent = "";

  //sanitize address
  const address = addressInput.value.replace(/[^\w\s]/gi, '!');

  if(address.length > 0){
    fetch(`http://localhost:3000/weather?address=${address}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          loadingNote.textContent = "";
          forecastInfo.textContent = data.error;
        } else {
          loadingNote.textContent = "";
          console.log(data);
          forecastInfo.innerHTML = `
          Location: ${data.location}. <br>
          Forecast: ${data.forecast}.
        `;
        }
      })
  }
  else{
    loadingNote.textContent = "Please provide a valid location";

  }
  })
  
  