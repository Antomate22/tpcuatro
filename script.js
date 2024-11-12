// Cargar el archivo JSON con los datos de los restaurantes
fetch('restaurantes.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    // Función para separar los restaurantes por categorías
    function separarPorCategorias(data) {
      const categorias = {
        "café": [],
        "bakery": [],
        "italian": [],
        "vegetarian": [],
        "dietetica": []
      };

      // Separar los restaurantes por categoría
      data.restaurantes.forEach(restaurante => {
        restaurante.categorias.forEach(categoria => {
          if (categorias[categoria]) {
            categorias[categoria].push(restaurante);
          }
        });
      });

      return categorias;
    }

    // Función para mostrar los restaurantes de una categoría seleccionada
    function mostrarRestaurantes(categorias, categoriaSeleccionada) {
      const contenedorRestaurantes = document.getElementById('list-group-restaurant');
      contenedorRestaurantes.innerHTML = ''; // Limpiar el contenedor

      // Obtener los restaurantes de la categoría seleccionada
      const restaurantes = categorias[categoriaSeleccionada.toLowerCase()];

      let groupDiv = null;  // Variable para agrupar los restaurantes en bloques de 5
      let contador = 0;     // Contador para saber cuándo agregar un nuevo grupo

      restaurantes.forEach((restaurante, index) => {
        // Si es el primer restaurante o después de cada 5, crear un nuevo grupo
        if (contador % 5 === 0) {
          // Crear un nuevo div con la clase "group-restaurant"
          groupDiv = document.createElement('div');
          groupDiv.classList.add('group-restaurant');
          contenedorRestaurantes.appendChild(groupDiv);
        }

        // Crear un div para cada restaurante
        const restauranteDiv = document.createElement('div');
        restauranteDiv.classList.add('restaurant');

        const img = document.createElement('img');
        img.src = restaurante.imagen;
        img.classList.add('image');
        restauranteDiv.appendChild(img);

        const title = document.createElement('div');
        title.classList.add('title-res');
        title.textContent = restaurante.nombre;
        restauranteDiv.appendChild(title);

        const footer = document.createElement('div');
        footer.classList.add('footer');
        
        const city = document.createElement('p');
        city.textContent = restaurante.ubicacion;
        footer.appendChild(city);

        const rating = document.createElement('div');
        rating.classList.add('start-calification');
        rating.textContent = `♣ 4.5 (478)`;
        footer.appendChild(rating);

        restauranteDiv.appendChild(footer);

        // Agregar el restaurante al grupo correspondiente
        groupDiv.appendChild(restauranteDiv);

        // Incrementar el contador
        contador++;
      });
    }

    // Obtener las categorías de los restaurantes
    const categorias = separarPorCategorias(data);

    // Función para manejar el clic en los botones de categoría
    document.querySelectorAll('.categorias .btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Desactivar la clase activa del botón anterior
        document.querySelector('.categorias .btn.active').classList.remove('active');
        // Activar el nuevo botón
        e.target.classList.add('active');
        
        // Mostrar los restaurantes de la categoría seleccionada
        mostrarRestaurantes(categorias, e.target.value);
      });
    });

    // Mostrar la categoría por defecto (Café) al cargar la página
    mostrarRestaurantes(categorias, 'café');
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));
