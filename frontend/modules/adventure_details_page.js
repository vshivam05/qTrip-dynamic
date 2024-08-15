import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  const urlParams = new URLSearchParams(search);
  const adv_id = urlParams.get('adventure');
 // console.log("adv id: "+adv_id);
 return adv_id;

 // Place holder for functionality to work in the Stubs
  return null;
}



//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
try{
  const data= await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
  // console.log(await data.json());
  return await data.json();
}catch{

  return null;
}


  // Place holder for functionality to work in the Stubs
}


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM


console.log(adventure);

document.getElementById("adventure-name").append(adventure.name);
document.getElementById("adventure-subtitle").append(adventure.subtitle);
  

for(let i=0; i<adventure.images.length; i++)
{
  let div = document.createElement("div");
  let img = document.createElement("img");

  img.setAttribute("class","activity-card-image");
  img.src = adventure.images[i];

  div.append(img);
  document.getElementById("photo-gallery").append(div);


}

document.getElementById("adventure-content").append(adventure.content);

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <div class="carousel-indicators">
  
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="slide 3"></button>
  </div>
  <div class="carousel-inner"  id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `

  
  images.map((img,index)=>{
    var inside_carousel=document.getElementById("carousel-inner");
    var img_container=document.createElement("div");
    img_container.className=`carousel-item ${index===0?"active":""}`;

    var img_display=document.createElement("img");
    // img_display.innerHTML=`<img src="${img}" class="activity-card-image pb-3" alt="...">`; wrong for setting img src
    img_display.src = img; // Set the src attribute directly
    img_display.className = "activity-card-image pb-3"; // Set the class attribute

    img_container.append(img_display);
    inside_carousel.append(img_container);
   
    
  });

}




//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if(adventure["available"]){
    // Hide the reservation-panel-sold-out panel
    document.getElementById("reservation-panel-sold-out").style.display="none";
    // Show the reservation-panel-available panel
    document.getElementById("reservation-panel-available").style.display="block";
    //Update the appropriate element to show the cost per head using the costPerHead field of the input adventure.
    document.getElementById("reservation-person-cost").innerHTML=adventure["costPerHead"]; //or adventure.costPerHead
 }else{
   // show the reservation-panel-sold-out panel
  document.getElementById("reservation-panel-sold-out").style.display="block";
  // dont Show the reservation-panel-available panel
  document.getElementById("reservation-panel-available").style.display="none";
 }


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

   // Here, person denotes no of poeples want to take part in adv [event.taregt.value on input element]
  //  console.log("total log "+adventure.costPerHead);

  console.log("total log "+adventure.costPerHead);
  var total= persons*adventure["costPerHead"]; //adventure.costPerHead is'nt passing the test.

  document.getElementById("reservation-cost").innerHTML=total; 


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // name, date, person, adventure

  console.log("form data 80660");

  const Form=document.getElementById("myForm");

    Form.addEventListener("submit",async(e)=>{
      e.preventDefault();
    console.log("form data 888");
    console.log(Form.elements["date"].value); //convert this string date to date obj taki usse date/month/year etc extract ho ske
    

    const data={

      // name : document.getElementById("id_of_input").value; //this is also right
      name:Form.elements["name"].value,
      date:new Date(Form.elements["date"].value),
      person:Form.elements["person"].value,
      adventure:adventure["id"]
   }
   console.log(data);
   try{
     //const url=`${config.backendEndpoint}/reservations/new`; //also right
     const url=config.backendEndpoint+"/reservations/new";

     const res=await fetch(url,{
       method:"POST",
      headers: {'Content-Type': 'application/json'},
       body:JSON.stringify(data)
     });
    alert("success");
    window.location.reload(); //The window object represents an open window in a browser and The reload() method does the same as the reload button in your browser.
//The location object contains information about the current URL.The location object is a property of the window object.

   }
   catch(error){
     console.log(error);
     alert("failed");

   }

   //------------------------------------picked from mdn web docs (my impleentation)--------------------------
  //  async function postData(url = "", data = {}) {
  //   // Default options are marked with *
  //   const response = await fetch(url, {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: "follow", // manual, *follow, error
  //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify(data), // body data type must match "Content-Type" header
  //   });
  //   return response.json(); // parses JSON response into native JavaScript objects
  // }
  
  // const url=config.backendEndpoint+`/reservations/new`;
  // postData(url, data).then((data1) => {
  //   console.log("data sent successfully");
  //   console.log(data1); // JSON data parsed by `data.json()` call
  // });
});


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
 // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }
    else{
      document.getElementById("reserved-banner").style.display="none";
    }
}

// id="reservation-panel-available"
export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
