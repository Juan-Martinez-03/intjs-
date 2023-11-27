const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("productoslimpieza"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevaLimpieza = document.createElement("div");
      nuevaLimpieza.classList = "tarjeta-producto";
      nuevaLimpieza.innerHTML = `
        <img src="./img/productos/${producto.id}.jpg" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <span>$${producto.precio}</span>
        <div>
          <button>-</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button>+</button>
        </div>
      `;
      contenedorTarjetas.appendChild(nuevaLimpieza);
      nuevaLimpieza
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          const cantidadElement =
            e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = restarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        });
      nuevaLimpieza
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement =
            e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("productoslimpieza"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio.toFixed(2);
  if (precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("productoslimpieza"));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido", !productos);
}
