//productos
const productos = [
            {
                id: 1,
                nombre: "VESTIDO BATA PLISADO AMARILLO",
                precio: 6990.00,
                imagen: "Vestido1.png"
            },
            {
                id: 2,
                nombre: "VESTIDO BATA PLISADO AZUL",
                precio: 6990.00,
                imagen: "Vestido2.png"
            },
            {
                id: 3,
                nombre: "VESTIDO PASTELONES ENCONTRADOS ESCOTE",
                precio: 5990.00,
                imagen: "Vestido3.png"
            },
            {
                id: 4,
                nombre: "VESTIDO BATA PLISADO CHAMPAGNE",
                precio: 6990.00,
                imagen: "Vestido4.png"
            },
            {
                id: 5,
                nombre: "VESTIDO BATA PLISADO VERDE",
                precio: 6990.00,
                imagen: "Vestido5.png"
            },
            {
                id: 6,
                nombre: "VESTIDO CRUCERO VERDE",
                precio: 6990.00,
                imagen: "Vestido6.png"
            }
        ];

        let carrito = [];

        //mostrar producto
        function mostrarProductos() {
            const contenedor = document.getElementById("productos");

            productos.forEach(producto => {
                contenedor.innerHTML += `
                    <div class="col-md-2 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${producto.imagen}" 
                                 class="card-img-top"
                                 style="height:400px; object-fit:cover;"
                                 alt="${producto.nombre}">

                            <div class="card-body text-center">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">$${producto.precio.toFixed(2)}</p>

                                <input type="number"
                                       id="cantidad-${producto.id}"
                                       class="form-control mb-2"
                                       value="1"
                                       min="1">

                                <button class="btn btn-primary w-100"
                                        onclick="agregarCarrito(${producto.id})">
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        //agregar carrito
        function agregarCarrito(id) {
            const producto = productos.find(p => p.id === id);
            const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);

            if (cantidad <= 0 || isNaN(cantidad)) {
                alert("Ingresa una cantidad válida");
                return;
            }

            const productoEnCarrito = carrito.find(item => item.id === id);

            if (productoEnCarrito) {
                productoEnCarrito.cantidad += cantidad;
            } else {
                carrito.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: cantidad
                });
            }

            mostrarCarrito();
        }
    
        //mostrar el carrito
        function mostrarCarrito() {
            const lista = document.getElementById("carrito");
            const totalHTML = document.getElementById("total");

            lista.innerHTML = "";
            let total = 0;

            carrito.forEach((item, i) => {
                const subtotal = item.precio * item.cantidad;
                total += subtotal;

                lista.innerHTML += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${item.nombre}</strong><br>
                        Cantidad: ${item.cantidad}
                    </div>

                    <div>
                    $${subtotal.toFixed(2)}

                        <button class="btn btn-danger btn-sm ms-2"onclick="eliminarDelCarrito(${i})">
                            X
                        </button>
                    </div>
                </li>
                `;
            });
        totalHTML.innerText = total.toFixed(2);

        }

        //vaciar carrito
        function vaciarCarrito() {
            carrito = [];
            mostrarCarrito();
        }

        mostrarProductos();
        
        //eliminar de carrito
        function eliminarDelCarrito(index) {

            if (index >= 0 && index < carrito.length) {
                carrito.splice(index, 1);
                actualizarCarrito();
            }
        }

        //actualizar el carrito
        function actualizarCarrito() {

            const lista = document.getElementById("carrito");

            lista.innerHTML = "";

            let total = 0;

            carrito.forEach((item, i) => {

                total += item.precio;

                lista.innerHTML += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">

                        ${item.nombre} - $${item.precio}

                        <button class="btn btn-danger btn-sm"
                            onclick="eliminarDelCarrito(${i})">
                            X
                        </button>

                    </li>
                `;

            });

            document.getElementById("total").innerText = total;

        }
