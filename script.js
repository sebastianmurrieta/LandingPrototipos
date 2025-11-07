// Animación al hacer scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -100px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Lógica del quiz
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');
const submitQuiz = document.getElementById('submitQuiz');

let answers = {};

document.querySelectorAll('.btn-option').forEach(button => {
  button.addEventListener('click', () => {
    const question = button.closest('.question');
    const allOptions = question.querySelectorAll('.btn-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    button.classList.add('selected');
    const questionNumber = question.querySelector('.question-number').textContent;
    answers[questionNumber] = button.dataset.value;
  });
});

submitQuiz.addEventListener('click', () => {
  const total = document.querySelectorAll('.question').length;
  const answered = Object.keys(answers).length;

  if (answered < total) {
    alert('⚠️ Por favor responde todas las preguntas antes de continuar.');
    return;
  }

  const yesCount = Object.values(answers).filter(v => v === 'yes').length;
  const score = (yesCount / total) * 100;

  quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });

  if (score > 50) {
    quizResult.className = 'result danger';
    quizResult.innerHTML = `
          <div style="font-size: 3em; margin-bottom: 15px;">🔴</div>
          <div style="font-size: 1.5em; margin-bottom: 15px;">Tu nivel de riesgo es ALTO</div>
          <div style="font-size: 2em; font-weight: 800; margin-bottom: 20px;">${score.toFixed(0)}%</div>
          <p style="font-size: 1.1em; font-weight: 500; margin-bottom: 25px;">Necesitas reforzar urgentemente tu seguridad digital para proteger tu información.</p>
          <a href="#mision" class="btn cta-btn" style="display: inline-block;">💙 Quiero el Curso de Ciberseguridad</a>
        `;
  } else {
    quizResult.className = 'result success';
    quizResult.innerHTML = `
          <div style="font-size: 3em; margin-bottom: 15px;">🟢</div>
          <div style="font-size: 1.5em; margin-bottom: 15px;">¡Excelente! Tu nivel de seguridad es bueno</div>
          <div style="font-size: 2em; font-weight: 800; margin-bottom: 20px;">${score.toFixed(0)}%</div>
          <p style="font-size: 1.1em; font-weight: 500;">Sigue practicando buenos hábitos digitales y mantente actualizado sobre nuevas amenazas.</p>
        `;
  }
});

// Smooth scroll para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
