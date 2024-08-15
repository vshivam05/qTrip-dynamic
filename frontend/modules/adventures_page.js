import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);

  // console.log(params)
  const city = params.get("city");

  // console.log(city);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try {
    const response = await fetch(
      config.backendEndpoint + "/adventures/?city=" + city
    );

    // console.log(response);
    const myResponse = await response.json();
    console.log(myResponse);
    return myResponse;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  let size = adventures.length;
  for (let i = 0; i < size; i++) {
    let div_main = document.createElement("div");

    div_main.setAttribute("class", "col-12 col-sm-6 col-md-6 col-lg-3 mb-3");

    let a = document.createElement("a");
    a.href = `detail/?adventure=${adventures[i].id}`;
    a.setAttribute("id", `${adventures[i].id}`);

    // div1 creation
    let div1 = document.createElement("div");
    div1.setAttribute("class", "card activity-card");

    //created crad image
    let image = document.createElement("img");
    image.src = adventures[i].image;

    //created category banner
    let category = document.createElement("div");
    category.setAttribute("class", "category-banner");
    category.innerHTML = adventures[i].category;

    //created div2
    let div2 = document.createElement("div");
    div2.setAttribute("class", "card-body col-md-12 mt-2");

    //created div3
    let div3 = document.createElement("div");
    div3.setAttribute("class", "d-flex justify-content-between");

    //created p1 and p2
    let p1 = document.createElement("p");
    p1.innerHTML = adventures[i].name;

    let p2 = document.createElement("p");
    p2.innerHTML = "₹" + adventures[i].costPerHead;

    //created div4
    let div4 = document.createElement("div");
    div4.setAttribute("class", "d-flex justify-content-between");

    //created p3 and p4
    let p3 = document.createElement("p");
    p3.innerHTML = "Duration";

    let p4 = document.createElement("p");
    p4.innerHTML = adventures[i].duration + " Hours";

    //adding elements to their parents
    div4.append(p3);
    div4.append(p4);
    div3.append(p1);
    div3.append(p2);
    div2.append(div3);
    div2.append(div4);
    div1.append(image);
    div1.append(category);
    div1.append(div2);
    a.append(div1);
    div_main.append(a);
    document.getElementById("data").append(div_main);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  console.log(list);
  console.log(low);
  console.log(high);

  let filteredlist = list.filter(function (adv) {
    if (high >= adv.duration && low <= adv.duration) {
      return true;
    } else {
      return false;
    }
  });
  console.log(filteredlist);

  return filteredlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredlist = list.filter(function (adv) {
    if (categoryList.includes(adv.category)) {
      return true;
    } else {
      return false;
    }
  });
  return filteredlist;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  let filteredlist = [];
  let arr = filters["duration"].split("-");
  
  // eg arr has 6 10

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // if (filters["category"].length > 0 && filters["duration"].length > 0) {
  //   filteredlist = filterByCategory(list, filters.category);
  //   filteredlist = filterByDuration(
  //     filteredlist,
  //     parseInt(arr[0]),
  //     parseInt(arr[1])
  //   );
  // } else if (filters["category"].length > 0) {
  //   filteredlist = filterByCategory(list, filters.category);
  // } else if (filters["duration"].length > 0) {
  //   filteredlist = filterByDuration(list, parseInt(arr[0]), parseInt(arr[1]));
  // } else {
  //   //when filters array is empty means no filter applied
  //   return list;
  // }
  // Place holder for functionality to work in the Stubs
  // return filteredlist;
  if(filters.category.length) {
    list = filterByCategory(list, filters.category)
  }

  if(filters.duration !== "") {
    list = filterByDuration(list, parseInt(arr[0]), parseInt(arr[1]))
  }

  return list
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs

  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  // selected categories ki ke new list generate ki...
  console.log(filters);
  let categoryList = filters["category"];
  let li = [];
  for (let i = 0; i < categoryList.length; i++) {
    // console.log(categoryList[i]);
    li.push(categoryList[i]);
  }
  console.log(li); // print arr of category list
  for (let i = 0; i < li.length; i++) {
    console.log(li[i]); // print element of arrays
    var div = document.createElement("div");
    div.setAttribute("class", "category-filter");
    div.innerText = li[i];
    document.getElementById("category-list").append(div);
  }

  var persist_duration_choice = document.getElementById("duration-select");
  persist_duration_choice.value = filters.duration;
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
