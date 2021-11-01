window.addEventListener("DOMContentLoaded", () => {
  fetchData();

  $cards.addEventListener("click", (e) => {
    addProduct(e);
  });

  $items.addEventListener("click", (e) => {
    btnAumentarDisminuir(e);
  });
});

const $cards = document.getElementById("allCards");
const $items = document.getElementById("items");
const $card = document.getElementById("card"); //parent element
const $templateCard = document.getElementById("templateCard").content;
const $fragment = document.createDocumentFragment();
//const $title = document.getElementsByTagName('h4')
//const $description = document.getElementsByTagName('h5')
let salesCart = {};
const $templateSalescart = document.getElementById("templateSalescart").content;
const $templateFooter = document.getElementById("templateFooter").content;
const $footer = document.getElementById("footer");

//TOMO LOS DATOS DE LA "BASE DE DATOS(JSON)"

const fetchData = async () => {
  try {
    const response = await fetch("/scripts/api.json");
    const data = await response.json();

    createCards(data);
  } catch (error) {
    console.log(error);
  }
};

const createCards = (data) => {
  // console.log(data);
  data.forEach((element) => {
    $templateCard.querySelector("h5").textContent = element.title;
    $templateCard.querySelector("h4").textContent = element.description;
    $templateCard.querySelector("p").textContent = element.price;
    $templateCard.querySelector("img").setAttribute("src", element.img);
    $templateCard.querySelector(".btnBuy").dataset.id = element.id;
    const clone = $templateCard.cloneNode(true);
    $fragment.appendChild(clone);
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
  });
  $cards.appendChild($fragment);
};

const addProduct = (e) => {
  //console.log(e.target); // identifico los elementos del DOM que clickeo
  //console.log(e.target.parentElement); //identifico el parent del elemento q clickeo en el DOM
  //console.log(e.target.classList.contains('btnBuy')); me devuelve true or false
  const btnBuy = e.target.classList.contains("btnBuy");
  console.log(btnBuy);
  if (btnBuy === true) {
    setSalescart(e.target.parentElement);
  }
  e.stopPropagation(); //interrumpo el evento para no extenderlo en el padre
};

const setSalescart = (object) => {
  const product = {
    id: object.querySelector(".btnBuy").dataset.id,
    title: object.querySelector("h5").textContent,
    price: object.querySelector("p").textContent,
    qty: 1,
  };
  //console.log(product.id);
  //console.log(product);
  if (salesCart.hasOwnProperty(product.id)) {
    product.qty = salesCart[product.id].qty + 1; //sumo los elementos cada vez que clickeo en el mismo
  }

  salesCart[product.id] = { ...product }; //agrego los elementos al carrito, pusheo los products al cart

  //console.log(salesCart);
  addSalescart();
};

const addSalescart = () => {
  $items.innerText = "";
  Object.values(salesCart).forEach((product) => {
    $templateSalescart.querySelector("#idTable").textContent = "";
    $templateSalescart.querySelector("#productTable").textContent =
      product.title;
    $templateSalescart.querySelector("#qtyTable").textContent = product.qty;
    $templateSalescart.querySelector("#totalTable").textContent =
      product.qty * product.price;

    $templateSalescart.querySelector('#totalTableUSD').textContent = (product.price*changeUSD)*product.qty
    $templateSalescart.querySelector(".btnPlus").dataset.id = product.id;

    $templateSalescart.querySelector(".btnMinus").dataset.id = product.id;

    const clone = $templateSalescart.cloneNode(true);
    $fragment.appendChild(clone);
  });

  $items.appendChild($fragment);
  setFooter();
  
};



const setFooter = () => {
  $footer.innerText = "";
  if (Object.keys(salesCart).length === 0) {
    $footer.innerText =
      '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>';
    return;
  }

  const totalQty = Object.values(salesCart).reduce(
    (acc, { qty }) => acc + qty,
    0
  );
  const totalPrice = Object.values(salesCart).reduce(
    (acc, { qty, price }) => acc + qty * price,
    0
  );
  $templateFooter.querySelector("#totalQty").textContent = totalQty;

  $templateFooter.querySelector("#totalPrice").textContent = totalPrice;

  const clone = $templateFooter.cloneNode(true);
  $fragment.appendChild(clone);
  $footer.appendChild($fragment);

  const boton = document.querySelector("#salescartEmpty");

  boton.addEventListener("click", () => {
    salesCart = {};

    addSalescart();
    $footer.innerText = "";
  });
};

const btnAumentarDisminuir = (e) => {
  //console.log(e.target);
  const buttonPlus = e.target.classList.contains("btnPlus");
  if (buttonPlus === true) {
    const add = salesCart[e.target.dataset.id];
    add.qty++;
    salesCart[e.target.dataset.id] = { ...add };
    addSalescart();
  }

  const buttonMinus = e.target.classList.contains("btnMinus");
  if (buttonMinus === true) {
    //console.log(e.target.dataset.id);
    const sub = salesCart[e.target.dataset.id];
    sub.qty--;
    salesCart[e.target.dataset.id] = { ...sub };
    addSalescart();
  }
};
