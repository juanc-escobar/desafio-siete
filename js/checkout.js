// se selecciona elementos del dom para visualizacion, y se traen del storage el total compra y los productos del carrito.

const facturaConntenedor = document.getElementById("factura-contenedor")
let carrito = JSON.parse(window.localStorage.getItem("carritoStorage"))
let totalCompra = JSON.parse(window.localStorage.getItem("totalCompraStorage"))


// se crea una funcion para mostrar los productos seleccionados totales 

const reciboCompra = () => {
    facturaConntenedor.innerHTML = ""
    const articulosCarrito = document.createElement("h2")
    articulosCarrito.classList.add("titulos-seccion")
    articulosCarrito.innerHTML = `Articulos Seleccionados`
    facturaConntenedor.appendChild(articulosCarrito)
    carrito.forEach((producto) => {
        let {titulo, precio,img,cart} = producto // Sugar Syntax Desestructuracion 
        const div = document.createElement("div")
        div.classList.add("factura")
        div.innerHTML = `
        <img src="${img}" alt="producto" class="factura__img">
        <h3 class="factura-titulo">${titulo}</h3>
        <p id="contador" class="factura__cantidad">Cantidad: ${cart}</p>
        <p class="factura__precio">Valor Unidad: $ ${precio}</p>
            `
        facturaConntenedor.appendChild(div)
    })
    
    // se calcula y muestra el total de la compra. 
    
    let impuestos = totalCompra * 0.19
    let envio = Math.floor(Math.random()*20)
    let granTotal = totalCompra + impuestos + envio
    const divtotal = document.createElement("div")
    divtotal.classList.add("total")
    divtotal.innerHTML = `
    <section class="total">
    <h2 class="titulos-seccion"> Total Compra </h2>
    <p class="txt-center padd-min"> Compra total: $ ${totalCompra} USD </p>
    <p class="txt-center padd-min"> Impuestos: $ ${impuestos} USD </p>
    <p class="txt-center padd-min"> Envio: $ ${envio} USD </p>
    <p class="txt-center padd-min bold"> Total a Pagar: $ ${granTotal} USD </p>
    </section>
    `
    facturaConntenedor.appendChild(divtotal)
}

reciboCompra();
