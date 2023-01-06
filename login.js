let userInput = document.getElementById("user")
let claveInput = document.getElementById("clave")
let claveIncorrecta = document.getElementById("clave-incorrecta")

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

    for (var indice in objStorage) {
        if(objStorage[indice].usuario == document.form.login.value && objStorage[indice].contraseña == document.form.password.value)
        {
            location.href = 'index.html'
        } 
        else{ 
            document.getElementById('clave-mal').value = "Clave incorrecta"
        }
    }
}

 