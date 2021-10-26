window.addEventListener('DOMContentLoaded', () => {
    fetchData();

});

const $cards = document.getElementById('allCards')
const $items = document.getElementById('items');
const $card = document.getElementById('card') //parent element
const $templateCard = document.getElementById('templateCard').content
const $fragment = document.createDocumentFragment();
//const $title = document.getElementsByTagName('h4')
//const $description = document.getElementsByTagName('h5')
let salesCart = {}


//TOMO LOS DATOS DE LA BASE DE DATOS

const fetchData = async () => {
   try{
    const response = await fetch('/scripts/api.json');
    const data = await response.json()
  
    createCards(data)

   }
   catch (error) {
console.log(error);
   }
};

const createCards = data => {
   // console.log(data);
data.forEach(element => {
$templateCard.querySelector('h5').textContent = element.title
$templateCard.querySelector('h4').textContent = element.description
$templateCard.querySelector('p').textContent = element.price
$templateCard.querySelector('img').setAttribute('src',element.img)
$templateCard.querySelector('.btnBuy').dataset.id = element.id
const clone = $templateCard.cloneNode(true)
$fragment.appendChild(clone)
/*    
let createTitle = document.createElement('h4');
createTitle.textContent = element.title
$items.appendChild(createTitle)
let createDescription = document.createElement('h5');
createDescription.textContent = element.description
$items.appendChild(createDescription)
let createPrice = document.createElement('p');
createPrice.textContent = '$' + element.price;
$items.appendChild(createPrice);

let createImage = document.createElement('img')
createImage.setAttribute('src', element.img);
$items.appendChild(createImage)
*/
})
$cards.appendChild($fragment)
}

$cards.addEventListener('click', e => {
    addSalescart(e);
})


const addSalescart = e => {
//console.log(e.target); // identifico los elementos del DOM que clickeo
//console.log(e.target.parentElement); //identifico el parent del elemento q clickeo en el DOM
//console.log(e.target.classList.contains('btnBuy')); me devuelve true or false
const btnBuy = e.target.classList.contains('btnBuy')
if(btnBuy === true) {
    setSalescart(e.target.parentElement);
}
e.stopPropagation(); //interrumpo el evento para no extenderlo en el padre

}


const setSalescart = object => {
    const product = {
        id: object.querySelector('.btnBuy').dataset.id,
        title: object.querySelector('h5').textContent,
        price:object.querySelector('p').textContent,
        qty: 1
    }
//console.log(product.id);
//console.log(product);
if(salesCart.hasOwnProperty(product.id)) {
    product.qty = salesCart[product.id].qty +1
}

salesCart[product.id] = {...product}

}