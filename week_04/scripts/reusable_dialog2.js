import { temples } from '../data/temples.js'
//console.log(temples)

import { url } from '../data/temples.js'
//console.log(url)

//Grab a reference to the division where we display the items 
const showHere = document.querySelector("#showHere");
//Ger a reference to the HTML dialog element
const myDialog = document.querySelector("#mydialog");
const myTitle = document.querySelector("#mydialog h2");
const myInfo = document.querySelector("#mydialog p");
const myClose = document.querySelector("#mydialog button");
myClose.addEventListener('click', () => myDialog.close());

//Loop through the array of json items
function displayItems(data) {
    console.log(data);

    data.forEach(x => {
        console.log(x);
        const photo = document.createElement('img');
        photo.src = `${url}${x.path}`;
        photo.alt = x.name;

        photo.addEventListener('click', () => showStuff(x));

        showHere.appendChild(photo);

    });
}

function showStuff(x) {
    myTitle.innerHTML = x.name;
    myDialog.showModal();

}

displayItems(temples);
