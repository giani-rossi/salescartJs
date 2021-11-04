
$('#btnIngresar').click(function (){


const nombre = $('#nombre').val();
console.log(nombre);
localStorage.setItem('nombre',nombre);
const email = $('#email').val();
localStorage.setItem('email',email);

let value = localStorage.getItem('nombre')
console.log(value);

})


