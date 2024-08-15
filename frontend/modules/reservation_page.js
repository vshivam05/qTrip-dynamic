import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

 try{

  const data = await fetch(config.backendEndpoint+ "/reservations/");
  // console.log( await data.json());

  return await data.json();
 }catch{
return null;
 }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */


 //------Conditionally render the no-reservation-banner or reservation-table-parent based on----------
    // whether the input reservations is empty or not.

    if(reservations.length===0){
      document.getElementById("reservation-table-parent").style.display="none";
      document.getElementById("no-reservation-banner").style.display="block";

    }
    else{
      document.getElementById("no-reservation-banner").style.display="none";
      document.getElementById("reservation-table-parent").style.display="block";

    }





  // Get the reservation table body element

  // Loop through each reservation
  reservations.forEach(reservation => {
      // Create a new row
      const Row = document.createElement("tr");

      console.log(reservation);
      // Format the date and booking time using the "en-IN" locale
      const date = new Date(reservation.date);

      let final_short_date=date.toLocaleDateString("en-IN");

      // console.log(final_short_date);



      //---------------------- to get booking date-----------------
      let date_time=new Date(reservation.time);
      const formattedBookingTime = date_time.toLocaleTimeString("en-IN");

         //for date part----actually after this part: curr_time, no need to do this formating in parts
      let day=date_time.getDate();
      let month=date_time.toLocaleString('default', { month: 'long' }); //getMonth():	Get month as a number (0-11) , but here we are taking fullname
      let year=date_time.getFullYear(); 

      //for time part, directly poora hi formate kr diya(date + time)
      let curr_time=date_time.toLocaleString('en-IN',{day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
      let final_curr_date=curr_time.replace(" at",",");
      // For en-IN: "4 November 2020, 9:32:31 pm",and en-US: "November 4, 2020, 9:32:31 PM".
    
       // For en-IN: "4 November 2020, 9:32:31 pm",and en-US: "November 4, 2020, 9:32:31 PM".

      // date_time.toLocaleString('en-IN',{day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });=21 September 2023 at 3:03:02 pm
      //but if we add replace(" at",",") then= 21 September 2023, 3:04:17 pm

      // console.log(curr_time);
      // now in our workspace, date_time.toLocaleString()=21/09/2023, 18:53:03 and after split(" ")= [ '9/21/2023,', '2:21:21']
      

      Row.innerHTML=`
      
      <td>${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${final_short_date}</td>
      <td>${reservation.price}</td>
      <td>${final_curr_date}</td>
      <td id=${reservation.id}> 
      <a href="../detail/?adventure=${reservation.adventure}">
      <button class="reservation-visit-button">Visit Adventure</button>
      </a>
      </td>

      <!--for href of above <a> see the url of reservations page and adv_details page -->
      
      `;

      let myTable= document.getElementById("reservation-table");
    myTable.append(Row);



  });





}

export { fetchReservations, addReservationToTable };
