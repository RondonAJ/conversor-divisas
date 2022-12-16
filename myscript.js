// Proyecto final

const tbody = document.querySelector("tbody")
const botonesAdd = document.querySelectorAll("button.btn.btn-outline-primary")
const btnVerCarrito = document.querySelector("button#verCarrito")

//Guardar y Recuperar el Divisa con LocalStorage + JSON
const divisaPapelera = []
const guardarDivisa = ()=> (divisaPapelera.length > 0) && localStorage.setItem("DivisaStorage", JSON.stringify(divisaPapelera))
const recuperarDivisa = ()=> JSON.parse(localStorage.getItem("DivisaStorage")) || []
divisaPapelera.push(...recuperarDivisa())
const divisas = []

//const URL = 'https://api.exchangerate-api.com/v4/latest/usd'
const URL = 'divisas.json'

fetch(URL)
   .then(response => response.json() )
   .then(data => divisas.push(...data) )
   .then(() => cargarDivisas(divisas))
   .then(() => activarClickBotonesAdd())
   .catch(error => container.innerHTML = retornoError())

// Armar tabla HTML Dinámica
const armarTablaHTML = (divisas) => {
    return `<tr>
                <td> ${divisas.codigo_iso} </td>
                <td> ${divisas.nombre} </td>
                <td> ${divisas.precio} </td>
                <td>
                    <input type="number" id="ingresar-${divisas.id}" class="input-group-text"></input>
                </td>
                <td>
                    <button class="btn btn-outline-primary" id="${divisas.id}"> Calcular </button>
                </td>
                <td>
                    <input type="text" name="" id="total-${divisas.id}" class="input-total">
                </td>
            </tr>`
}

//Cargar los productos en la tabla HTML

const cargarDivisas = (array)=> {
    let tablaHTML = ""
        if (array.length > 0) {
            array.forEach((divisas) => tablaHTML += armarTablaHTML(divisas))
        } else {
            tablaHTML = "<h2 class='error-prendas'>Error al cargar productos.</h2>"
        }
        tbody.innerHTML = tablaHTML
}
//Activar el evento CLICK por cada botón dinámico generado
const activarClickBotonesAdd = ()=> {
          botonesAdd.forEach(btn => {
            btn.addEventListener("click", (e)=> {
                let resultado = buscarDivisa(e.target.id)
                console.log(resultado)
                precioDivisa = resultado.precio
                inputLlenado = 'ingresar-'+e.target.id
                inputTotal = 'total-'+e.target.id
                montoIngresado = document.getElementById(inputLlenado).value;
                calcularMonto(precioDivisa)
            })
          })
}

function buscarDivisa(id) {
    let resultado = divisas.find(divisas => divisas.id === parseInt(id))
        return resultado
}

function calcularMonto() {

    conversion = montoIngresado/precioDivisa;
    inputTotal.style.background = '#415EDE'
    document.getElementById(inputTotal).value = "$"+conversion.toFixed(2)
    divisaPapelera.push(conversion.toFixed(2))
    guardarDivisa()
}

function verCarrito() {
    if (divisaPapelera.length > 0) {
        alert(`El costo total es de $ ${divisaPapelera.precio}`)
    } else {
        alert("El carrito está vacío!")
    }
}

btnVerCarrito.addEventListener("click", verCarrito)
