import { places } from "../data/places.mjs";
//console.log(places);

const showHere = document.querySelector("#cards-places");

function displayItems(places) {
    places.forEach(x => {
        //build the card element
        const thecard = document.createElement("div");
        //build the photo element
        const thephoto = document.createElement("img");
        thephoto.src = `images/${x.photoUrl}`;
        thephoto.alt = x.name;
        thecard.appendChild(thephoto);
        //build the title element
        const thetitle = document.createElement("h2");
        thetitle.innerText = x.name;;
        thecard.appendChild(thetitle);
        //build the address element
        const theaddress = document.createElement("address");
        theaddress.innerText = x.address;
        thecard.appendChild(theaddress);
        //build the description element
        const thedesc = document.createElement("p");
        thedesc.innerText = x.description;
        thecard.appendChild(thedesc);

        //<button class="learn-more" id="npBtn">Learn More</button>
        const thebutton = document.createElement("button");
        thebutton.id = x.id;
        thebutton.className = "learn-more";
        thebutton.innerText = "Learn More";
        thecard.appendChild(thebutton);

        showHere.appendChild(thecard);

    }); //end loop

} //end function

//start displaying all items in the JSON file
displayItems(places);

