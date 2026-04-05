
document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('section[id]')];
  const links = [...document.querySelectorAll('[data-nav]')];
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = '';
    sections.forEach(sec => { if (sec.offsetTop <= y) current = sec.id; });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
  };
  if (sections.length && links.length) {
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }
  const top = document.querySelector('.backtop');
  if (top) top.addEventListener('click', e => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); });
});
