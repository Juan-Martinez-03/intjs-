const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function crearTarjetasProductosInicio(productos) {
  productos.forEach((producto) => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "tarjeta-producto";
    nuevoProducto.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Producto ${producto.id}">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`;
    contenedorTarjetas.appendChild(nuevoProducto);
    nuevoProducto
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => agregarAlCarrito(producto));
  });
}
crearTarjetasProductosInicio(productosLimpieza);
