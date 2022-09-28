// Declaracion de la clase constructora Jean, con el atributo id para identificar cada producto y el atributo cart para sumar cantidades anadidas al carrito. 

class Jean {
    constructor (id,categoria, titulo, descripcion, precio,cart,img) {
        this.id = id
        this.categoria = categoria
        this.titulo = titulo
        this.descripcion = descripcion
        this.precio = precio
        this.cart = cart
        this.img = img
    }
}

window.localStorage.removeItem("nombreUsuarioStorage")

// Declaracion de variables 

const productos = [];
let carrito = [];
let totalCompra = 0;
let itemsCarrito = 0;


// Se agrega mensaje de bienvenida 


(async () => {
    let {value: nombreUsuario} = await Swal.fire ({
        title: "Bienvendio!",
        text: "Ingresa tu nombre:",
        input: "text",
        width: "30%",
        padding: "2rem",
        confirmButtonText: "Ingresar",
        confirmButtonColor:"rgb(158, 137, 255)",
        customClass: {
            confirmButton: "swal-button",
            input: "swal-input",
            title: "swal-title",
            popup: "swal-popup"
        }
    })
    if (nombreUsuario) {
        localStorage.setItem('nombreUsuarioStorage', JSON.stringify(nombreUsuario))
        Swal.fire ({
            title: `${nombreUsuario}`, 
            text: "Tenemos variedad de productos para ti",
            confirmButtonText: "Gracias",
            confirmButtonColor:"rgb(158, 137, 255)",
            customClass: {
                confirmButton: "Gracias",
                input: "swal-input",
                title: "swal-title",
                popup: "swal-popup"
            }
        })
    } else {
        nombreUsuario = "Invitado"
        localStorage.setItem('nombreUsuarioStorage', JSON.stringify(nombreUsuario))
        Swal.fire ({
            title: `${nombreUsuario}`, 
            text: "Tenemos variedad de productos para ti",
            confirmButtonText: "Gracias",
            confirmButtonColor:"rgb(158, 137, 255)",
            customClass: {
                confirmButton: "swal-button",
                input: "swal-input",
                title: "swal-title",
                popup: "swal-popup"
            }
        })
    }
})()




window.localStorage.removeItem("carritoStorage")
window.localStorage.removeItem("totalCompraStorage")

// Creacion de objetos y envio de objetos a el arreglo de productos. 

const jeanSlimfit = new Jean (1,"jeans","Jean Slimfit","Jean elastico slimfit color azul",100,1,"./assets/slimfit.webp"); 
const jeanRegularfit = new Jean (2,"jeans","Jean Regularfit","Jean resistente regularfit negro",120,1,"./assets/regularfit.webp");
const jeanWidefit = new Jean (3,"jeans","Jean Widefit","Jean comodo widefit color azul",150,1,"./assets/widefit.webp");

productos.push(jeanSlimfit, jeanRegularfit, jeanWidefit)

const copyProductos = [...productos]; // Sugar Syntax Spread Operator (se realiza una copia del array productos para evitar modificar los productos originales de  la "base de datos")

// Creacion de contenedores principales 

const cardConntenedor = document.getElementById("card-contenedor")
const facturaConntenedor = document.getElementById("factura-contenedor")
const cartConntenerdor = document.getElementById("cart")

// se crean un algoritmo para mostrar los productos y un event listener con click sobre el boton agregar. 

copyProductos.forEach((producto) => {
    let {id,titulo, descripcion, precio,img} = producto // Sugar Syntax Desestructuracion 
    const mostrarProductos = document.createElement("div")
    mostrarProductos.classList.add("card")
    mostrarProductos.innerHTML = `
    <img class="card__img" src="${img}" alt="" />
    <h3 class="card__titulo">${titulo}</h3>
    <p class="card__descripcion">${descripcion}</p>
    <p class="card__precio">$ ${precio}</p>
    <button id="${id}" class="card__btn">Agregar</button>
    `
    cardConntenedor.appendChild(mostrarProductos)

    const agregar = document.getElementById(id)
    agregar.addEventListener("click", () => {
    agregarCarrito(id)
    })
})

// se crea una funcion para mostrat el contador de productos en el carrito. 

const actualizarCarrito = () => {
    cart.innerHTML = ""
        const span = document.createElement("span")
        span.classList.add("counter")
        span.innerHTML = `${itemsCarrito}`
        cart.appendChild(span)
    }

// se crea una funcion para agregar los productos al carrito y evitar duplicados. 

const agregarCarrito = (productoId) => {
    let productoSeleccionado = copyProductos.find((p) => p.id === productoId)
    if (carrito.find((p)=> p.id === productoSeleccionado.id)){
        productoSeleccionado.cart++ // Sugar Syntax Optimizacion ++
        totalCompra = totalCompra + productoSeleccionado.precio
        itemsCarrito= carrito.reduce((acumulator, actual) => {
            return acumulator + actual.cart;
        }, 0)
        // se envian los productos del carrito y el valor total de compra al storage para poder utilizarlos en la pagina del checkout
        localStorage.setItem('carritoStorage', JSON.stringify(carrito))
        localStorage.setItem('totalCompraStorage', JSON.stringify(totalCompra))
        actualizarCarrito()
         // Se agrega notificacion al agregar producto
        Swal.fire({
        text: 'Agregaste un producto al carrito',
        timer: 1000,
        showConfirmButton:false,
        icon: 'success',
        position: "top-end",
        customClass: {
            popup: "swal-popup"
        }
        })
    } else {
        carrito.push(productoSeleccionado)
        totalCompra = totalCompra + productoSeleccionado.precio
        itemsCarrito= carrito.reduce((acumulator, actual) => {
            return acumulator + actual.cart;
        }, 0)
        // se envian los productos del carrito y el valor total de compra al storage para poder utilizarlos en la pagina del checkout
        localStorage.setItem('carritoStorage', JSON.stringify(carrito))
        localStorage.setItem('totalCompraStorage', JSON.stringify(totalCompra))
        actualizarCarrito( )
        // Se agrega notificacion al agregar producto
        Swal.fire({
            text: 'Agregaste un producto al carrito',
            timer: 1000,
            showConfirmButton:false,
            icon: 'success',
            position: "top-end",
            customClass: {
                popup: "swal-popup"
            }
        })
    }

    console.log(itemsCarrito)
}

// se agrega un event listener para cuando den click en el carrito este los lleve a la pagina de checkout. 

const checkOut = document.getElementById("check-out")

checkOut.addEventListener("click", () => {
    const nombreUsuario = JSON.parse(window.localStorage.getItem("nombreUsuarioStorage"))

    // Se agrega mensaje para indicar que el carrito esta vacio o de gratitud si el carrito esta lleno

    if (carrito.length === 0) {
        Swal.fire ({
            title: `${nombreUsuario}`,
            text: "Tu carrito esta vacio",
            icon: "error",
            confirmButtonText: "Continuar",
            confirmButtonColor:"rgb(158, 137, 255)",
            customClass: {
                confirmButton: "swal-button",
                input: "swal-input",
                title: "swal-title",
                popup: "swal-popup"
            }
        })
    } else {
        Swal.fire ({
            title: `${nombreUsuario}`,
            text: "💖Gracias por tu compra💖",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor:"rgb(158, 137, 255)",
            customClass: {
                confirmButton: "swal-button",
                input: "swal-input",
                title: "swal-title",
                popup: "swal-popup"
            }
        }).then((result) => {
            if (result.isConfirmed) {
              window.location.assign("checkout.html")
            }
        })
    }
})
