const MAP_URL = 'https://www.google.com/maps/d/viewer?mid=16uVyZXdb4Ya-8d4OKJWY3ZB1r-RY_CI&usp=sharing';

const places = [
  { name: 'Puente Colgante', category: 'Atractivo', icon: '🌉', text: 'Punto turístico reconocido y referencia principal para visitantes.' },
  { name: 'Río Piraí', category: 'Atractivo', icon: '🌊', text: 'Atractivo natural de la comunidad y parte del paisaje local.' },
  { name: 'Mirador La Angostura', category: 'Atractivo', icon: '🥾', text: 'Lugar recomendado para observar el entorno y tomar fotografías.' },
  { name: 'El Mirador de La Angostura', category: 'Atractivo', icon: '🔭', text: 'Punto de vista panorámico incluido en el recorrido turístico.' },
  { name: 'Plaza La Angostura', category: 'Atractivo', icon: '🌳', text: 'Punto de encuentro, descanso y orientación para iniciar el recorrido.' },
  { name: 'El Chorrito', category: 'Atractivo', icon: '💧', text: 'Sitio natural mencionado como parte de los lugares para promocionar.' },
  { name: 'Virgen de Copacabana', category: 'Cultura', icon: '⛪', text: 'Referencia religiosa y cultural de la comunidad.' },
  { name: 'Capilla Virgen de Copacabana', category: 'Cultura', icon: '⛪', text: 'Espacio religioso integrado en el mapa turístico.' },
  { name: 'Iglesia Adventista del Séptimo Día', category: 'Cultura', icon: '⛪', text: 'Punto comunitario registrado dentro del croquis digital.' },
  { name: 'Iglesia Asamblea de Dios Bolivia', category: 'Cultura', icon: '⛪', text: 'Referencia religiosa y social dentro de La Angostura.' },
  { name: 'U.E. Alberto Rivera Tapia', category: 'Cultura', icon: '🏫', text: 'Unidad educativa impulsora del proyecto “Turismo en La Angostura”.' },
  { name: 'Cancha La Antena', category: 'Deporte', icon: '⚽', text: 'Espacio deportivo y punto de referencia de la zona.' },
  { name: 'Cancha de Fútbol', category: 'Deporte', icon: '⚽', text: 'Área recreativa marcada en las referencias del mapa.' },
  { name: 'Centro de Salud La Angostura', category: 'Servicio', icon: '🏥', text: 'Servicio importante para visitantes y habitantes.' },
  { name: 'Farmacia Angostura', category: 'Servicio', icon: '💊', text: 'Servicio de apoyo para necesidades básicas durante la visita.' },
  { name: 'Retén de La Angostura', category: 'Servicio', icon: '🛡️', text: 'Punto de referencia y apoyo local.' },
  { name: 'Alcaldía de Angostura', category: 'Servicio', icon: '🏛️', text: 'Referencia institucional de la comunidad.' },
  { name: 'Taller Frenos Forte', category: 'Servicio', icon: '🔧', text: 'Servicio mecánico local incluido en el croquis.' },
  { name: 'Hotel La Capital del Cielo', category: 'Hospedaje', icon: '🏨', text: 'Opción de alojamiento para visitantes.' },
  { name: 'Alojamiento Piray', category: 'Hospedaje', icon: '🛏️', text: 'Hospedaje local registrado en el mapa.' },
  { name: 'Residencial JR', category: 'Hospedaje', icon: '🏩', text: 'Referencia de alojamiento visible en el área urbana.' },
  { name: 'El Chaco de Doña Antonia', category: 'Comida', icon: '🍽️', text: 'Referencia local para visitantes en la zona.' },
  { name: 'Pitahaya Angostura', category: 'Comida', icon: '🍴', text: 'Punto de referencia local mostrado en las capturas del mapa.' },
  { name: 'Hacienda Osinaga', category: 'Atractivo', icon: '🌄', text: 'Punto agregado al mapa para ampliar el recorrido.' },
  { name: 'Mirador NELORE - Bikers Racing', category: 'Atractivo', icon: '📷', text: 'Punto fotográfico y de referencia turística registrado.' }
];

const filters = ['Todos', ...new Set(places.map(place => place.category))];
let activeFilter = 'Todos';

const placesGrid = document.getElementById('placesGrid');
const filtersWrap = document.getElementById('filters');
const searchInput = document.getElementById('searchInput');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const themeBtn = document.getElementById('themeBtn');
const toTop = document.getElementById('toTop');
const copyMapBtn = document.getElementById('copyMapBtn');

function googleSearchLink(name) {
  const query = `${name} La Angostura El Torno Santa Cruz Bolivia`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function renderFilters() {
  filtersWrap.innerHTML = filters.map(filter => `<button class="filter-btn ${filter === activeFilter ? 'active' : ''}" type="button" data-filter="${filter}">${filter}</button>`).join('');
}

function renderPlaces() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = places.filter(place => {
    const matchesFilter = activeFilter === 'Todos' || place.category === activeFilter;
    const matchesSearch = `${place.name} ${place.category} ${place.text}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  placesGrid.innerHTML = filtered.length ? filtered.map(place => `
    <article class="place-card reveal visible">
      <div class="place-top">
        <span class="place-icon" aria-hidden="true">${place.icon}</span>
        <div>
          <span class="badge">${place.category}</span>
          <h3>${place.name}</h3>
        </div>
      </div>
      <p>${place.text}</p>
      <a href="${googleSearchLink(place.name)}" target="_blank" rel="noopener">Buscar ubicación ↗</a>
    </article>
  `).join('') : '<p class="empty">No se encontraron lugares con ese filtro.</p>';
}

filtersWrap.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderFilters();
  renderPlaces();
});

searchInput.addEventListener('input', renderPlaces);

menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.addEventListener('click', event => {
  if (event.target.tagName === 'A') mainNav.classList.remove('open');
});

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('angostura-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

if (localStorage.getItem('angostura-theme') === 'dark') document.body.classList.add('dark');

window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 650);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

copyMapBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(MAP_URL);
    copyMapBtn.textContent = 'Enlace copiado';
    setTimeout(() => copyMapBtn.textContent = 'Copiar enlace del mapa', 1800);
  } catch {
    window.open(MAP_URL, '_blank', 'noopener');
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const gallery = document.getElementById('gallery');
gallery.addEventListener('click', event => {
  const img = event.target.closest('img');
  if (!img) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:99;display:grid;place-items:center;padding:1rem;cursor:zoom-out;';
  overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="max-height:92vh;max-width:96vw;border-radius:22px;background:white;">`;
  overlay.addEventListener('click', () => overlay.remove());
  document.body.appendChild(overlay);
});

renderFilters();
renderPlaces();
