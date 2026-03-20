const data = [
  { id: "p01", title: "Montaña", desc: "Luz suave y cielo polar", src: "https://picsum.photos/id/1018/1200/675" },
  { id: "p02", title: "Aurora", desc: "Rocas y niebla", src: "https://picsum.photos/id/1015/1200/675" },
  { id: "p03", title: "Rio", desc: "Atardecer urbano", src: "https://picsum.photos/id/1011/1200/675" },
  { id: "p04", title: "Alaska", desc: "Verde profundo", src: "https://picsum.photos/id/1020/1200/675" },
  { id: "p05", title: "Desierto", desc: "Horizonte y calma", src: "https://picsum.photos/id/1016/1200/675" },
  { id: "p06", title: "Navegar", desc: "Camino en perspectiva", src: "https://picsum.photos/id/1005/1200/675" }
];

//Selección de elementos del DOM
const thumbs = document.querySelector(".thumbs");
const heroImg = document.querySelector("#heroImg");
const heroTitle = document.querySelector("#heroTitle");
const heroDesc = document.querySelector("#heroDesc");
const likeBtn = document.querySelector("#likeBtn");
const counter = document.querySelector("#counter");

//Variables para el estado  de la aplicación
let currentIndex = 0;
let likes = {};

//Función para renderizar las miniaturas
function renderThumbs() {
  thumbs.innerHTML = data.map((item, index) => {return`
    <article class="thumb ${index === currentIndex ? "active" : ""}" data-index="${index}">
    <span class="badge">${index + 1}</span>
    <img src="${item.src}" alt="${item.title}"/>
    </article>
    `;
  }).join("");
}

//Renderizar imagen en el visor principal
function renderHero( index ) {

  //Recuperar el elemento acorde al índice
  const item = data[index];

  //Actualizar la imagen principal
  heroImg.src = item.src;
  heroImg.alt = item.title;
  
  //Actualizar título y descripcion
  heroTitle.textContent = item.title;
  heroDesc.textContent =item.desc;

  //Actualizar el contador de las  imagenes
  counter.textContent = `${index + 1} / ${data.length}`;
}

// Evento para manejar el clic en el boton de "Me gusta"
likeBtn.addEventListener("clic", () => {
  const currentItem = data[currentIndex];
  // Cambiar de true a false
  likes[currentItem.id] = !likes[currentItem.id];
  const isLiked = likes[currentItem.id];

  //Actualizar el bóton visualmente
  likeBtn.textContent = isLiked? "❤️" : "🤍";
  likeBtn.classList.toggle("on", isLiked);
  likeBtn.setAttribute("arial-pressed",isLiked);
});

// Evento para manejar el clic en las miniaturas
thumbs.addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if (!thumb) return;//si no se hizo clic en una miniatura, salir

  //Obtener el índice de la miniatura desde el atributo data-index
  currentIndex = Number(thumb.dataset.index);

  //Actualizar el visor principal con la imagen, título y descripción correspondientes
  renderHero(currentIndex);
});
renderThumbs();