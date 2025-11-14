document.addEventListener('DOMContentLoaded', () => {

    const btnGuardar   = document.getElementById('btnGuardar');
    const btnLimpiar   = document.getElementById('btnLimpiar');
    const btnBuscar    = document.getElementById('btnBuscar');
    const btnVerTodos  = document.getElementById('btnVerTodos');
    const btnEliminar  = document.getElementById('btnEliminar');
    const frm          = document.getElementById('frmProducto');

    // Guardar / Modificar
    btnGuardar.addEventListener('click', async () => {
        const id = document.getElementById('id').value;
        const accion = id ? "Modificar" : "Guardar";
        await ejecutarAccion(accion);
    });

    // Buscar (por nombre o código)
    btnBuscar.addEventListener('click', async () => {
        await ejecutarAccion("Buscar");
    });

    // Ver todos
    btnVerTodos.addEventListener('click', async () => {
        await ejecutarAccion("Listar");
    });

    // Eliminar (solo cuando se está editando)
    btnEliminar.addEventListener('click', async () => {
        await ejecutarAccion("Eliminar");
    });

    // Limpiar formulario
    btnLimpiar.addEventListener('click', () => {
        frm.reset();
        document.getElementById('id').value = "";
        btnGuardar.textContent = "Registrar";
        btnEliminar.style.display = "none";
    });

    // Listar al cargar
    ejecutarAccion("Listar");
});


// -------------------------------------------------------------
//  FUNCIÓN PRINCIPAL QUE USA SWITCH PARA TODAS LAS ACCIONES (async)
// -------------------------------------------------------------
async function ejecutarAccion(accion) {

    let formData = new FormData();

    switch (accion) {

        case "Guardar":
            if (!validarFormularioCliente()) return;
            formData = obtenerDatosFormulario();
            formData.append("Accion", "Guardar");
            await enviarPeticion(formData);
        break;

        case "Modificar":
            if (!validarFormularioCliente()) return;
            formData = obtenerDatosFormulario();
            formData.append("Accion", "Modificar");
            await enviarPeticion(formData);
        break;

        case "Buscar":
            const texto = document.getElementById("txtBuscar").value.trim();
            if (texto === "") {
                Swal.fire("Aviso", "Ingrese un nombre o código para buscar", "info");
                return;
            }
            formData.append("Accion", "Buscar");
            formData.append("texto", texto);
            await enviarPeticion(formData);
        break;

        case "Listar":
            formData.append("Accion", "Listar");
            await enviarPeticion(formData);
        break;

        case "Eliminar":
            const id = document.getElementById("id").value;
            if (!id) {
                Swal.fire("Aviso", "Seleccione un producto para eliminar (debe estar en modo edición).", "info");
                return;
            }
            const confirmacion = await Swal.fire({
                title: "¿Eliminar producto?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });
            if (confirmacion.isConfirmed) {
                const fd = new FormData();
                fd.append("Accion", "Eliminar");
                fd.append("id", id);
                await enviarPeticion(fd);
            }
        break;

        default:
            console.error("Acción no reconocida:", accion);
        break;
    }
}


// -------------------------------------------------------------
//  VALIDACIÓN DEL FORMULARIO EN EL CLIENTE
// -------------------------------------------------------------
function validarFormularioCliente() {

    const codigo   = document.getElementById("codigo").value.trim();
    const producto = document.getElementById("producto").value.trim();
    const precio   = document.getElementById("precio").value.trim();
    const cantidad = document.getElementById("cantidad").value.trim();

    let errores = [];

    if (codigo === "") errores.push("Debe ingresar un código.");
    if (producto === "") errores.push("Debe ingresar el nombre del producto.");
    if (precio === "" || isNaN(precio) || parseFloat(precio) <= 0)
        errores.push("El precio debe ser un número mayor a 0.");
    if (cantidad === "" || isNaN(cantidad) || parseInt(cantidad) < 0)
        errores.push("La cantidad debe ser un número mayor o igual a 0.");

    if (errores.length > 0) {
        Swal.fire({
            title: "Errores en el formulario",
            html: errores.join("<br>"),
            icon: "error"
        });
        return false;
    }

    return true;
}


// -------------------------------------------------------------
//  OBTENER DATOS DEL FORMULARIO
// -------------------------------------------------------------
function obtenerDatosFormulario() {
    const frm = document.getElementById("frmProducto");
    return new FormData(frm);
}


// -------------------------------------------------------------
//  ENVIAR PETICIÓN AL SERVIDOR (async/await + try/catch)
// -------------------------------------------------------------
async function enviarPeticion(formData) {

    const accion = formData.get("Accion");

    try {
        const response = await fetch("registrar.php", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }

        const data = await response.json();

        if (!data.success) {
            let msg = data.message || "Error en el servidor";
            if (data.errors) {
                msg += "<br>" + Object.values(data.errors).join("<br>");
            }
            await Swal.fire({ title: "Error", html: msg, icon: "error" });
            return;
        }

        // Manejo de cada acción según la respuesta
        switch (accion) {

            case "Guardar":
            case "Modificar":
                await Swal.fire("Éxito", data.message, "success");
                document.getElementById("frmProducto").reset();
                document.getElementById("id").value = "";
                document.getElementById("btnGuardar").textContent = "Registrar";
                document.getElementById("btnEliminar").style.display = "none";
                await ejecutarAccion("Listar");
            break;

            case "Eliminar":
                await Swal.fire("Eliminado", data.message, "success");
                document.getElementById("frmProducto").reset();
                document.getElementById("id").value = "";
                document.getElementById("btnGuardar").textContent = "Registrar";
                document.getElementById("btnEliminar").style.display = "none";
                await ejecutarAccion("Listar");
            break;

            case "Listar":
            case "Buscar":
                const lista = Array.isArray(data.data) ? data.data : [];
                renderProductos(lista);

                if (accion === "Buscar" && lista.length === 0) {
                    await Swal.fire("Sin resultados", "No se encontraron productos", "info");
                }
            break;
        }

    } catch (error) {
        await Swal.fire("Error", "Se produjo un error en la solicitud: " + error, "error");
        console.error(error);
    }
}


// -------------------------------------------------------------
//  RENDERIZA LA TABLA
// -------------------------------------------------------------
function renderProductos(lista) {

    const tbody = document.getElementById("tbodyProductos");
    tbody.innerHTML = "";

    let contador = 1; // ← número secuencial mostrado al usuario

    lista.forEach(prod => {
        const tr = document.createElement('tr');

        const nombreEscapado = String(prod.producto).replace(/'/g, "\\'");

        tr.innerHTML = `
            <td>${contador}</td>
            <td>${prod.codigo}</td>
            <td>${prod.producto}</td>
            <td>${prod.precio}</td>
            <td>${prod.cantidad}</td>
            <td>
                <button class="btn btn-sm btn-warning"
                    onclick="editarProducto(${prod.id}, '${prod.codigo}', '${nombreEscapado}', ${prod.precio}, ${prod.cantidad})">
                    Editar
                </button>
            </td>
        `;
        tbody.appendChild(tr);

        contador++; // ← aumentar contador
    });
}


/* function renderProductos(lista) {

    const tbody = document.getElementById("tbodyProductos");
    tbody.innerHTML = "";

    lista.forEach(prod => {
        const tr = document.createElement('tr');

        // Escape sencillo de comillas simples en el nombre
        const nombreEscapado = String(prod.producto).replace(/'/g, "\\'");

        tr.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.codigo}</td>
            <td>${prod.producto}</td>
            <td>${prod.precio}</td>
            <td>${prod.cantidad}</td>
            <td>
                <button class="btn btn-sm btn-warning"
                    onclick="editarProducto(${prod.id}, '${prod.codigo}', '${nombreEscapado}', ${prod.precio}, ${prod.cantidad})">
                    Editar
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
} */


// -------------------------------------------------------------
//  CARGAR DATOS PARA EDICIÓN
// -------------------------------------------------------------
function editarProducto(id, codigo, producto, precio, cantidad) {

    document.getElementById("id").value       = id;
    document.getElementById("codigo").value   = codigo;
    document.getElementById("producto").value = producto;
    document.getElementById("precio").value   = precio;
    document.getElementById("cantidad").value = cantidad;

    document.getElementById("btnGuardar").textContent = "Actualizar";
    document.getElementById("btnEliminar").style.display = "inline-block";
}
