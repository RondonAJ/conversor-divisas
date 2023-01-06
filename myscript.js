// Proyecto final

const tbody = document.querySelector("tbody")
const botonesAdd = document.querySelectorAll("button.btn.btn-outline-primary")

const divisas = []

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

//Cargar las divisas en la tabla HTML

const cargarDivisas = (array)=> {
    let tablaHTML = ""
        if (array.length > 0) {
            array.forEach((divisas) => tablaHTML += armarTablaHTML(divisas))
        } else {
            tablaHTML = "<h2>Error al cargar productos.</h2>"
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

function buscarDivisa(id) {
    let resultado = divisas.find(divisas => divisas.id === parseInt(id))
        return resultado
}

function calcularMonto() {

    conversion = montoIngresado/precioDivisa;
    document.getElementById(inputTotal).style.background = '#415EDE'
    document.getElementById(inputTotal).value = "$"+conversion.toFixed(2)
}
