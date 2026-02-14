async function limpiar() {
    document.getElementById('estado');

    const respuesta = await fetch(`http://localhost:4000/api/productoss`);
    const datos = await respuesta.json();

    cargarProductos(datos);
    document.getElementById("estado").innerText = "";
}

async function busqueda() {
    const termino = document.getElementById('buscarProducto').value;

    if(!termino){
        alert("Escribe algo para buscar")
        return;
    }

    document.getElementById('estado').innerText = "Buscando...";

    const respuesta = await fetch(`http://localhost:4000/api/productoss/search?q=${termino}`);

    if(!respuesta.ok){
        const error = await respuesta.json();
        document.getElementById('estado').innerText = error.mensaje || "Error en el servidor";
        document.getElementById('tabla').innerHTML = "";
    }

    const datos = await respuesta.json();

    if(datos.length === 0){
        document.getElementById('estado').innerText = `No encontramos productos que coincidan con ${termino}`;
        document.getElementById('tabla').innerHTML = "";
        return;
    }

    cargarProductos(datos);
    document.getElementById('estado').innerText = "";
}

function cargarProductos(productos){
    const tablaProd = document.getElementById('tabla');
    tablaProd.innerHTML = "";
    
    productos.forEach(p => {
        tablaProd.innerHTML = tablaProd.innerHTML + `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.descripcion}</td>
                <td>${p.categoria}</td>
                <td>${p.precio}</td>
                <td>${p.stock}</td>
            <tr>
        `;
    });
}