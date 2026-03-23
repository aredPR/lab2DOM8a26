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

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playBtn = document.querySelector("#playBtn");

//Variables para el estado  de la aplicación
let currentIndex = 0;
let likes = {};

let autoPlayId = null;
let isPlaying = false;
const AUTO_TIME = 2000;

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
  updateCounter();
  //Actualizar el estado de las miniaturas
  updateActiveThumb();
  //Actualizar el estado del botón de "Me gusta"
  updateLikeBtn();
}

// Actualizar el botón de reproducción
function updatePlayButton(){
  playBtn.textContent = isPlaying ? "⏸️" : "▶️";
  playBtn.dataset.state = isPlaying ? "stop" : "play";
}

function updateCounter(){
  counter.textContent = `${currentIndex + 1} / ${data.length}`;
}

function updateActiveThumb(){
  document.querySelectorAll(".thumb").forEach( (thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
  });
}

function updateLikeBtn(){
  const currentItem = data[currentIndex];
  const isLiked = likes[currentItem.id] === true;

  // Cambiar el texto del botón y su estado visual
  likeBtn.textContent = isLiked ? "❤️" : "🤍";
  likeBtn.classList.toggle("on", isLiked);
  likeBtn.setAttribute("aria-pressed",isLiked);
}

// Cambiar de imagen automaticamnte
function changeSlide( newIndex ){
  heroImg.classList.add("fade-out");
  setTimeout(() => {
    currentIndex = newIndex;
    renderHero( currentIndex );
    heroImg.classList.remove("fade-out");
  },350)
}

function nextSlide(){
  const newIndex = (currentIndex + 1) % data.length;
  changeSlide(newIndex);
}

function prevSlide(){
  const newIndex = (currentIndex - 1 + data.length) % data.length;
  changeSlide(newIndex);
}

function startAutoPlay(){
  autoPlayId = setInterval( () => {
    nextSlide();
  }, AUTO_TIME );
  
  isPlaying = true;
  updatePlayButton();
}

function stopAutoPlay(){
  clearInterval(autoPlayId);
  autoPlayId = null;
  isPlaying = false;
  updatePlayButton();
}

function toggleAutoPlay(){
  if(isPlaying){
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

// Evento para manejar el cic en el boton de "Me gusta"
likeBtn.addEventListener("click", () => {
  const currentItem = data[currentIndex];
  // Cambiar de true a false
  likes[currentItem.id] = !likes[currentItem.id];
  updateLikeBtn();
});

// Evento para manejar el clic en las miniaturas
thumbs.addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if (!thumb) return;//si no se hizo clic en una miniatura, salir

  const newindex = Number(thumb.dataset.index);
  if (newindex === currentIndex) return;//si se hizo clic en la miniatura activa, salir
  changeSlide(newindex);

  //Obtener el índice de la miniatura desde el atributo data-index
  //currentIndex = Number(thumb.dataset.index);

  //Actualizar el visor principal con la imagen, título y descripción correspondientes
  //renderHero(currentIndex);
});

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
playBtn.addEventListener("click", toggleAutoPlay);  

// Eventos para manejar el teclado
document.addEventListener("keydown", (e) => {
  if(e.key === "ArrowRight"){
    nextSlide();
  } else if (e.key === "ArrowLeft"){
    prevSlide();
  } else if (e.key === " "){
    e.preventDefault();
    toggleAutoPlay();
  } });

renderThumbs();
renderHero(currentIndex);