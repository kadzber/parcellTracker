 url1 = ""
  


async function fetchDataFromApis() {
    let idPaczki = document.getElementById("numb").value;

//TO DO:

// Schować api key bo kurwa wstyd
const url1 = `https://api-shipx-pl.easypack24.net/v1/tracking/${idPaczki}` ;

  const response1 = await fetch(url1);

  if (!response1.ok ) {
    throw new Error("Unable to fetch data from api");
  }

  const data1 = await response1.json();

  let output = "";

  for (let i = 0; i < data1.tracking_details.length; i++) {
    output += data1.tracking_details[i].status + '<br>';

  }

  const streetData = data1.custom_attributes.target_machine_detail.address.line1
  const postalData = data1.custom_attributes.target_machine_detail.address.line2
  const split1 = postalData.split(" ");
  const split2 = streetData.split(" ");

  const postal = split1[0]

  const city = split1[1]

  const street = split2[0]
  const streetNumb = split2[1]

  const url2 = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(postal + ' ' + city + ' ' + street + ' ' + streetNumb)}&format=json&apiKey=9e29d50c24db47aab7db561e45a6aa65`;


    const response2 = await fetch(url2);
  if (!response2.ok) throw new Error("Unable to fetch data from Geoapify API");
  const data2 = await response2.json();

  console.log(postal, city, street, streetNumb)


  const lat = data2.results[0].lat;
  const lon = data2.results[0].lon;

  document.getElementById("output").innerHTML = output;

  const center = { lat: lat, lng: lon };
  const map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 14,
  });

  const marker = new google.maps.Marker({
    position: center,
    map: map,
    title: "My location"
  });
}


window.onload = fetchDataFromApis;
