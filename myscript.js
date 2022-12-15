// Tercera entrega

const tbody = document.querySelector("tbody")

//Guardar y Recuperar el Divisa con LocalStorage + JSON
const divisaPapelera = []
const guardarDivisa = ()=> (divisaPapelera.length > 0) && localStorage.setItem("DivisaStorage", JSON.stringify(divisaPapelera))
const recuperarDivisa = ()=> JSON.parse(localStorage.getItem("DivisaStorage")) || []
divisaPapelera.push(...recuperarDivisa())
const divisasApi = []

const URL = 'https://api.exchangerate-api.com/v4/latest/usd'

fetch(URL)
   .then(response => response.json() )
   .then(data => { 
       const tasa = data.rates
       divisasApi.push(tasa)
       //console.log(tasa)

    } );
    console.log(divisasApi)
// Armar tabla HTML Dinámica
const armarTablaHTML = (divisas) => {
    return `<tr>
                <td> ${divisas.imagen} </td>
                <td> ${divisas.tipo} </td>
                <td> ${divisas.precio} </td>
                <td>
                    <input type="number" id="ingresar-${divisas.codigo}" class="input-group-text"></input>
                </td>
                <td>
                    <button class="btn btn-outline-primary" id="${divisas.codigo}"> Calcular </button>
                </td>
                <td>
                    <input type="text" name="" id="total-${divisas.codigo}" class="input-total">
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
    const botonesAdd = document.querySelectorAll("button.btn.btn-outline-primary")
          botonesAdd.forEach(btn => {
            btn.addEventListener("click", (e)=> {
                let resultado = buscarDivisa(e.target.id)
                precioDivisa = resultado.precio
                inputLlenado = 'ingresar-'+e.target.id
                inputTotal = 'total-'+e.target.id
                montoIngresado = document.getElementById(inputLlenado).value;
                calcularMonto(precioDivisa)
            })
          })
}

cargarDivisas(divisas)
activarClickBotonesAdd()


function buscarDivisa(codigo) {
    let resultado = divisas.find(divisas => divisas.codigo === parseInt(codigo))
        return resultado
}

function calcularMonto() {

    conversion = montoIngresado/precioDivisa;
    document.getElementById(inputTotal).style.background = '#415EDE'
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

const btnVerCarrito = document.querySelector("button#verCarrito")
btnVerCarrito.addEventListener("click", verCarrito)
