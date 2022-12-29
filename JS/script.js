const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("compras")) || []

productos.forEach((product) => {
    let content = document.createElement("div")
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class = "precio">$${product.precio}</p>
    `;
    
    shopContent.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "comprar"
    comprar.className = "comprar"

    content.append(comprar)

    comprar.addEventListener("click", () => {

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
        if (repeat === true) {
            carrito.map((prod) => {
                if (prod.id === product.id) {
                    prod.cantidad++
                }
            })
        } else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            })
        }
        console.log(carrito)
        console.log(carrito.length)
        carritoCounter()
        saveLocal()
    })
}) 

const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class = "modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader)

    const  modalbutton = document.createElement("h1")
    modalbutton.innerText = "X"
    modalbutton.className = "modal-header-button"

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })

    modalHeader.append(modalbutton)

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="delete-product">❌</span>
        `; 

        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--    
            }
            saveLocal()
            pintarCarrito()
        })

        let sumar = carritoContent.querySelector(".sumar")

        sumar.addEventListener("click", () => {
            product.cantidad++
            saveLocal()
            pintarCarrito()
        })

        let eliminar = carritoContent.querySelector(".delete-product")

        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id)
        })

/*         let eliminar = document.createElement("span")
        eliminar.innerText = "❌"
        eliminar.className = "delete-product"
        carritoContent.append(eliminar)

        eliminar.addEventListener("click", eliminarProducto) */
    })

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    const totalComprado = document.createElement("div")
    totalComprado.className = "Total-content"
    totalComprado.innerHTML = `Total a pagar: $${total}`
    modalContainer.append(totalComprado)
}

verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id)
    console.log(foundId)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })

    carritoCounter()
    saveLocal()
    pintarCarrito()
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLegth", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}

carritoCounter()

const saveLocal = () => {
    localStorage.setItem("compras", JSON.stringify(carrito))
}
