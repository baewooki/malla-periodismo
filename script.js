const data = {
  "1er semestre": [
    { nombre: "Prensa Escrita I: Noticias", creditos: 6 },
    { nombre: "Comunicación y Realidad", creditos: 5 },
    { nombre: "Redacción General", creditos: 5 },
    { nombre: "Argumentación y Pensamiento Crítico", creditos: 5 },
    { nombre: "Historia Contemporánea", creditos: 4 },
    { nombre: "Inglés General I", creditos: 5 },
    { nombre: "Actualidad I", creditos: 1 }
  ],
  "2do semestre": [
    { nombre: "Redacción Periodística", creditos: 6 },
    { nombre: "Digital I: Medios Online", creditos: 5 },
    { nombre: "Paradigmas de la Comunicación", creditos: 5 },
    { nombre: "Historia del Periodismo Chileno", creditos: 4 },
    { nombre: "Ideas Contemporáneas", creditos: 5 },
    { nombre: "Inglés General II", creditos: 5 },
    { nombre: "Actualidad II", creditos: 1 }
  ],
  // Agrega aquí el resto de los semestres igual que arriba...
};

const requisitos = {
  "Redacción Periodística": ["Prensa Escrita I: Noticias"],
  "Inglés General II": ["Inglés General I"],
  "Caja de Herramientas del Periodista": ["Prensa Escrita I: Noticias"],
  "Inglés General III": ["Inglés General II"],
  "Redacción Digital I": ["Prensa Escrita I: Noticias", "Redacción General"],
  "Investigación en Comunicación Social II": ["Investigación en Comunicación Social I"],
  "Chile en el Siglo XX": ["Chile entre Siglos"],
  "Actualidad IV": ["Actualidad I"],
  "Prensa Escrita II: Crónicas y Perfiles": ["Redacción General", "Redacción Periodística"],
  "Audiovisual III: Noticias": ["Audiovisual II: Lenguaje y Guion"],
  "Taller de Actualidad Económica": ["Introducción a la Economía"],
  "Electivo I": ["Redacción Periodística", "Paradigmas de la Comunicación"],
  "Ética y Legislación Periodística": ["50 créditos"],
  "Actualidad V": ["Actualidad II"],
  "Taller de Reportajes Interpretativos": ["Redacción Periodística"],
  "Periodismo Radial": ["Redacción Periodística"],
  "Instituciones y Procesos Políticos": ["Chile en el Siglo XX"],
  "Digital III: Periodismo de Datos y Visualización": ["Caja de Herramientas del Periodista"],
  "Actualidad VI": ["Actualidad II"],
  "Periodismo de Investigación": ["Taller de Reportajes Interpretativos", "Digital III: Periodismo de Datos y Visualización"],
  "Audiencias y Opinión Pública": ["Investigación en Comunicación Social II"],
  "Audiovisual IV: Reportaje y Producción": ["Audiovisual III: Noticias"],
  "Podcast y Crónicas radiales": ["Periodismo Radial"],
  "Taller de Reporteo de Actualidad": ["Chile en el Siglo XX"],
  "Actualidad VII": ["Actualidad IV"],
  "Práctica I": ["181 créditos"],
  "Electivo II": ["Redacción Periodística", "Paradigmas de la Comunicación"],
  "Gestión de Crisis": ["Comunicación Organizacional"],
  "Audiovisual V: Documental Audiovisual": ["Audiovisual II: Lenguaje y Guion"],
  "Redacción Digital II": ["Redacción Digital I"],
  "Electivo III": ["Redacción Periodística", "Paradigmas de la Comunicación"],
  "Actualidad VIII": ["Actualidad III"],
  "Proyecto de Título": ["255 créditos", "Práctica I"],
  "Electivo IV": ["Redacción Periodística", "Paradigmas de la Comunicación"],
  "Gestión de Medios": ["155 créditos"],
  "Práctica II": ["212 créditos", "Redacción Digital II"]
};

const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

const container = document.getElementById("malla");
const creditosSpan = document.getElementById("creditos-aprobados");

function calcularCreditos() {
  let total = 0;
  for (const [semestre, ramos] of Object.entries(data)) {
    ramos.forEach(({ nombre, creditos }) => {
      if (estado[nombre]) total += creditos;
    });
  }
  creditosSpan.textContent = total;
}

for (const [semestre, ramos] of Object.entries(data)) {
  const box = document.createElement("div");
  box.className = "semestre";

  const title = document.createElement("h2");
  title.textContent = semestre;
  box.appendChild(title);

  ramos.forEach(({ nombre, creditos }) => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.textContent = nombre;
    div.dataset.nombre = nombre;
    div.dataset.creditos = creditos;

    if (estado[nombre]) div.classList.add("aprobado");

    box.appendChild(div);
  });

  container.appendChild(box);
}

function actualizarBloqueos() {
  document.querySelectorAll(".ramo").forEach(div => {
    const nombre = div.dataset.nombre;
    const prer = requisitos[nombre];

    if (prer) {
      const bloqueado = prer.some(p => !estado[p]);
      if (bloqueado) div.classList.add("bloqueado");
      else div.classList.remove("bloqueado");
    }
  });
}

document.querySelectorAll(".ramo").forEach(div => {
  div.addEventListener("click", () => {
    if (div.classList.contains("bloqueado")) return;

    const nombre = div.dataset.nombre;
    div.classList.toggle("aprobado");
    estado[nombre] = div.classList.contains("aprobado");

    localStorage.setItem("estadoRamos", JSON.stringify(estado));
    actualizarBloqueos();
    calcularCreditos();
  });
});

actualizarBloqueos();
calcularCreditos();
