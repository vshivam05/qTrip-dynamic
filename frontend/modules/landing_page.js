import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();   // function calling to get cities array

  
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }

  //   console.log("From init()");
  // console.log(config.backendEndpoint + "/cities");
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    const cities = await response.json();
    console.log(cities);
    return cities;
  } catch (err) {
    return null;
  }


}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let myDiv = document.createElement("div");
  myDiv.setAttribute("class", "col-lg-3 col-md-6 col-sm-6 mb-4"); // made a div with following class and breakpoints

  let main = document.getElementById("data");

  myDiv.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
  <img class="card-img" src=${image} />
  <div class="tile-text text-center">
    <h5>${city}</h5>
    <p>${description}</p>
  </div>
  </div>
  </a>
  `;

main.append(myDiv);



}


//  for reference only 
/* <div class="container">
<div class="content text-white">
  <div class="row" id="data">
        
  </div>
</div>
</div> */

export { init, fetchCities, addCityToDOM };
