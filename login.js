let userInput = document.getElementById("user")
let claveInput = document.getElementById("clave")

const usuarios = 
[
    {id: 1, nombre: 'Pedro', usuario: 'pperez', contraseña: 1890},
    {id: 2, nombre: 'Juan', usuario: 'jlopez', contraseña: 2920},
    {id: 3, imagen: 'Diego', usuario: 'ddiaz', contraseña: 1040}
]
//Subiendo los usuarios al localStorage
usuariosstr = JSON.stringify(usuarios)
localStorage.setItem("usuarios", usuariosstr)
//Accediendo a los datos del localStorage
let datosStorage = localStorage.getItem("usuarios")
//datosStorage.forEach((usuario, indice) => go(usuario, indice))
let objStorage = JSON.parse(datosStorage)

function go(){
        if (document.form.password.value =='CLAVE' && document.form.login.value == 'USUARIO'){
            location.replace = "index.html" 
        } 
        else{ 
            console.log('else')
            //alert("Porfavor ingrese, nombre de usuario y contraseña correctos.")
            window.location.href = 'login.html'
        }
}
 