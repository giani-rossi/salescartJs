
$('#btnIngresar').click(function (){


const nombre = $('#nombre').val();
console.log(nombre);
localStorage.setItem('nombre',nombre);
const email = $('#email').val();
localStorage.setItem('email',email);

})




const value = localStorage.getItem('nombre')
const value_email = localStorage.getItem('email')
console.log(value);


let info = []
info.push(value)
info.push(value_email)
console.log(info);

