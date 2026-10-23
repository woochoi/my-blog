const track = document.getElementById('slides');
const slides = [...track.children];
const dots = document.getElementById('dots');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `${i + 1}번 카드`);
  dot.addEventListener('click', () => go(i));
  dots.appendChild(dot);
});

function go(i) {
  i = Math.max(0, Math.min(slides.length - 1, i));
  current = i;
  track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
}

function update() {
  const width = slides[0].offsetWidth + 16;
  current = Math.round(track.scrollLeft / width);
  [...dots.children].forEach((d, i) => d.classList.toggle('active', i === current));
  prev.disabled = current === 0;
  next.disabled = current === slides.length - 1;
}

prev.addEventListener('click', () => go(current - 1));
next.addEventListener('click', () => go(current + 1));
track.addEventListener('scroll', () => requestAnimationFrame(update));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') go(current - 1);
  if (e.key === 'ArrowRight') go(current + 1);
});
update();
