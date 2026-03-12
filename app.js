const data = [
  { id: "p01", title: "Aurora", desc: "Luz suave y cielo polar", src: "https://picsum.photos/id/1018/1200/675" },
  { id: "p02", title: "Montaña", desc: "Rocas y niebla", src: "https://picsum.photos/id/1015/1200/675" },
  { id: "p03", title: "Ciudad", desc: "Atardecer urbano", src: "https://picsum.photos/id/1011/1200/675" },
  { id: "p04", title: "Bosque", desc: "Verde profundo", src: "https://picsum.photos/id/1020/1200/675" },
  { id: "p05", title: "Mar", desc: "Horizonte y calma", src: "https://picsum.photos/id/1016/1200/675" },
  { id: "p06", title: "Ruta", desc: "Camino en perspectiva", src: "https://picsum.photos/id/1005/1200/675" }
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

renderThumbs();