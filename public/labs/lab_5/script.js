// function mapInit() {
//   // follow the Leaflet Getting Started tutorial here
//   return map;
// }

// async function dataHandler(mapObjectFromFunction) {
//   // use your assignment 1 data handling code here
//   // and target mapObjectFromFunction to attach markers
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN
// }


// window.onload = windowActions;

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
  console.log('window loaded');
  const form = document.querySelector('.userform');
  const search = document.querySelector('#search');
  const suggestions = document.querySelector('.suggestions');

  const request = await fetch('/api')
  const data = await request.json();

  search.addEventListener('input', (event) => {
      console.log('input', event.target.value)
      const display = data.filter((record) => {
          return record.city.toUpperCase().includes(event.target.value.toUpperCase()) || record.zip.includes(event.target.value);
      });

      display.forEach(restaurant => {
          const newItem = document.createElement('li');
          newItem.classList.add('list-item');
          newItem.innerHTML = `
          <h2> ${restaurant.name} </h2>
          <address>
              ${restaurant.category}
              ${restaurant.address_line_1}
              ${restaurant.city}
              ${restaurant.zip}
          </address>
          `;
          
          suggestions.append(newItem);
      });
  })
};

window.onload = windowActions;

