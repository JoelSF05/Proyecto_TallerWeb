// 1. Desplegables de preguntas frecuentes
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los botones de preguntas
  const botones = document.querySelectorAll(".pregunta");

  // Recorre cada botón y le asigna un evento de clic
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const respuesta = boton.nextElementSibling; // La respuesta está justo después del botón
      const estaAbierta = respuesta.classList.contains("abierta");

      // Cierra todas las respuestas abiertas
      document.querySelectorAll(".respuesta").forEach(r => r.classList.remove("abierta"));
      document.querySelectorAll(".pregunta").forEach(b => b.setAttribute("aria-expanded", "false"));

      // Si la respuesta estaba cerrada, la abre
      if (!estaAbierta) {
        respuesta.classList.add("abierta");
        boton.setAttribute("aria-expanded", "true"); // Accesibilidad: indica que está expandida
      }
    });
  });
});

// 2. Validación de formulario de reclamos
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-reclamo");
  if (!formulario) return; // Si no existe el formulario, no hace nada

  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el envío real del formulario

    // Obtiene y limpia los valores de los campos
    const nombre = formulario.nombre.value.trim();
    const correo = formulario.correo.value.trim();
    const motivo = formulario.motivo.value.trim();
    const tipo = formulario.tipo.value;

    // Valida que todos los campos estén completos
    if (!nombre || !correo || !motivo || !tipo) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Simulación de envío exitoso
    alert("¡Gracias por tu reclamo " + nombre + "! Lo atenderemos a la brevedad.");
    formulario.reset(); // Limpia el formulario
  });
});

// 3. Animaciones (para cuadros de Sobre Nosotros)
document.addEventListener("DOMContentLoaded", () => {
  const cuadros = document.querySelectorAll(".cuadro");

  cuadros.forEach((cuadro, i) => {
    // Estado inicial: invisibles y ligeramente reducidos
    cuadro.style.opacity = 0;
    cuadro.style.transform = "scale(0.95)";
    cuadro.style.transition = `all 0.5s ease ${i * 0.2}s`; // Delay progresivo

    // Después de un pequeño tiempo, se muestran con animación
    setTimeout(() => {
      cuadro.style.opacity = 1;
      cuadro.style.transform = "scale(1)";
    }, 100);
  });
});

// 4. Menú móvil (hamburguesa)
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuMovil = document.querySelector(".menu-movil");

  if (menuToggle && menuMovil) {
    menuToggle.addEventListener("click", () => {
      const activo = menuMovil.classList.toggle("activo");
      menuToggle.setAttribute("aria-expanded", activo ? "true" : "false");
      menuMovil.setAttribute("aria-hidden", activo ? "false" : "true");
    });
  }
});

// 5. Carrito de compras 
document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".agregar"); // Botones de agregar
  const listaCarrito = document.getElementById("lista-carrito"); // UL donde se listan productos
  const totalSpan = document.getElementById("total"); // Span que muestra el total
  const checkoutBtn = document.getElementById("checkout"); // Botón de finalizar compra

  let carrito = []; // Array para guardar productos

  // Evento para cada botón de "Agregar al carrito"
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
      const producto = boton.closest(".productoCarrito"); // Encuentra el contenedor del producto
      const nombre = producto.dataset.nombre; // Obtiene nombre del dataset
      const precio = parseFloat(producto.dataset.precio); // Obtiene precio del dataset

      carrito.push({ nombre, precio }); // Agrega producto al array
      renderCarrito(); // Actualiza la vista del carrito
    });
  });

  // Función para renderizar el carrito en pantalla
  function renderCarrito() {
    listaCarrito.innerHTML = ""; // Limpia lista
    let total = 0;

    carrito.forEach((item, index) => {
      total += item.precio; // Suma precios
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.nombre} - S/ ${item.precio.toFixed(2)}
        <button class="eliminar" data-index="${index}">❌</button>
      `;
      listaCarrito.appendChild(li);
    });

    totalSpan.textContent = total.toFixed(2); // Actualiza total

    // Botones de eliminar producto
    document.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        carrito.splice(index, 1); // Elimina producto del array
        renderCarrito(); // Vuelve a renderizar
      });
    });
  }

  // Evento para finalizar compra
  checkoutBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
    } else {
      alert("Gracias por tu compra!! Total: S/ " + totalSpan.textContent);
      carrito = []; // Vacía el carrito
      renderCarrito(); // Limpia la vista
    }
  });
});

