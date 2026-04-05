
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

  const routeButtons = [...document.querySelectorAll('[data-route-target]')];
  const routeTitle = document.querySelector('[data-route-title]');
  const routeDesc = document.querySelector('[data-route-desc]');
  const routeImg = document.querySelector('[data-route-img]');
  const routeList = document.querySelector('[data-route-list]');
  const routeData = {
    elara: {
      title: 'Elara Route // Archive Breach',
      desc: 'Follow the information-control layer of Ferropolis: restricted code, impossible green radiance, purge-or-preserve choice, and the public release of the forbidden image.',
      img: 'assets/images/digital-choice.jpg',
      points: ['Routine sanitisation inside the Iron Guard Archives.', 'Discovery of organic code and evidence of lost ecological memory.', 'Decision point: erase the truth or preserve the Digital Seed.', 'Broadcast event that awakens the city visually and ideologically.']
    },
    jax: {
      title: 'Jax Route // Deep Survey',
      desc: 'Trace the city from below through vibration, structural anomalies and illegal sensory equipment until physical proof emerges from the bedrock.',
      img: 'assets/images/echoes-proof.jpg',
      points: ['Sub-Level exploration using modified audio implants.', 'Detection of the dense organic thump beneath generator blocks.', 'High-risk extraction of splinter evidence under guard pressure.', 'Amber sap confirms buried life beneath the official machine-city narrative.']
    },
    convergence: {
      title: 'Convergence Route // Public Truth',
      desc: 'Merge the top-layer informational breakthrough with the undercity’s material evidence to understand the full scope of Ferropolis.',
      img: 'assets/images/digital-awakened.jpg',
      points: ['Elara turns private knowledge into public knowledge.', 'Jax proves the doctrine is structurally false.', 'The regime loses narrative control once the people see and know enough.', 'The setting shifts from hidden truth to unstable public awakening.']
    }
  };
  const setRoute = key => {
    const data = routeData[key];
    if (!data || !routeTitle || !routeDesc || !routeImg || !routeList) return;
    routeTitle.textContent = data.title;
    routeDesc.textContent = data.desc;
    routeImg.src = data.img;
    routeList.innerHTML = data.points.map(item => `<div>${item}</div>`).join('');
    routeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.routeTarget === key));
  };
  routeButtons.forEach(btn => btn.addEventListener('click', () => setRoute(btn.dataset.routeTarget)));
  if (routeButtons.length) setRoute(routeButtons[0].dataset.routeTarget);

  const mapButtons = [...document.querySelectorAll('[data-map-key]')];
  const mapTitle = document.querySelector('[data-map-title]');
  const mapDesc = document.querySelector('[data-map-desc]');
  const mapData = {
    archives: { title: 'Iron Guard Archives', desc: 'Primary information-control zone. All unstable or illegal memory is filtered here before it can spread through the population.' },
    broadcast: { title: 'Central Broadcast Node', desc: 'The symbolic conversion point where restricted knowledge becomes visible public information.' },
    deep: { title: 'Deep Layers', desc: 'Industrial undercity network marked by machinery, surveillance and operational risk. Jax operates here.' },
    bedrock: { title: 'Titan-Tree Foundation', desc: 'Buried organic structure beneath the city. This layer proves Ferropolis depends on living remnants from the old world.' }
  };
  const setMap = key => {
    const data = mapData[key];
    if (!data || !mapTitle || !mapDesc) return;
    mapTitle.textContent = data.title;
    mapDesc.textContent = data.desc;
    mapButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.mapKey === key));
  };
  mapButtons.forEach(btn => btn.addEventListener('click', () => setMap(btn.dataset.mapKey)));
  if (mapButtons.length) setMap('archives');

  const quiz = document.querySelector('[data-quiz]');
  if (quiz) {
    const answerState = {};
    quiz.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.dataset.q;
        answerState[q] = btn.dataset.value;
        quiz.querySelectorAll(`.choice-btn[data-q="${q}"]`).forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    const submit = quiz.querySelector('[data-quiz-submit]');
    const reset = quiz.querySelector('[data-quiz-reset]');
    const result = quiz.querySelector('[data-quiz-result]');
    const key = { q1: 'b', q2: 'c', q3: 'a' };
    submit?.addEventListener('click', () => {
      const total = Object.keys(key).length;
      let score = 0;
      Object.entries(key).forEach(([q, v]) => { if (answerState[q] === v) score += 1; });
      let message = '';
      if (score === total) message = 'Clearance granted. You have a complete operational grasp of the current Ferropolis briefing.';
      else if (score >= 2) message = 'Partial clearance. Core setting recognition is stable, but one or more data points still require review.';
      else message = 'Briefing incomplete. Review the route simulation and world map before proceeding.';
      result.innerHTML = `<strong>Score // ${score} / ${total}</strong><br>${message}`;
    });
    reset?.addEventListener('click', () => {
      Object.keys(answerState).forEach(k => delete answerState[k]);
      quiz.querySelectorAll('.choice-btn').forEach(el => el.classList.remove('active'));
      if (result) result.textContent = 'Select one answer per question, then run the terminal check.';
    });
  }
});
