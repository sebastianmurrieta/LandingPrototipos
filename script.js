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

  if (score >= 60) {
    quizResult.className = 'result danger';
    quizResult.innerHTML = `
      <div style="font-size: 3em; margin-bottom: 15px;">🔴</div>
      <div style="font-size: 1.5em; margin-bottom: 15px;">¡ALERTA! Tu nivel de riesgo es CRÍTICO</div>
      <div style="font-size: 2em; font-weight: 800; margin-bottom: 20px;">${score.toFixed(0)}% de riesgo</div>
      <p style="font-size: 1.1em; font-weight: 500; margin-bottom: 25px;">Tus contraseñas están en peligro inminente. Es urgente que tomes acción AHORA para proteger tus cuentas.</p>
      <a href="#solucion" class="btn" style="display: inline-block; text-decoration: none;">🛡️ Ver cómo protegerme YA</a>
    `;
  } else if (score >= 40) {
    quizResult.className = 'result danger';
    quizResult.innerHTML = `
      <div style="font-size: 3em; margin-bottom: 15px;">🟠</div>
      <div style="font-size: 1.5em; margin-bottom: 15px;">Tu nivel de riesgo es ALTO</div>
      <div style="font-size: 2em; font-weight: 800; margin-bottom: 20px;">${score.toFixed(0)}% de riesgo</div>
      <p style="font-size: 1.1em; font-weight: 500; margin-bottom: 25px;">Tienes vulnerabilidades importantes. Te recomendamos mejorar tu seguridad digital cuanto antes.</p>
      <a href="#solucion" class="btn" style="display: inline-block; text-decoration: none;">🛡️ Ver cómo protegerme</a>
    `;
  } else if (score > 0) {
    quizResult.className = 'result success';
    quizResult.innerHTML = `
      <div style="font-size: 3em; margin-bottom: 15px;">🟡</div>
      <div style="font-size: 1.5em; margin-bottom: 15px;">Nivel de seguridad: MODERADO</div>
      <div style="font-size: 2em; font-weight: 800; margin-bottom: 20px;">${score.toFixed(0)}% de riesgo</div>
      <p style="font-size: 1.1em; font-weight: 500; margin-bottom: 25px;">Vas bien, pero aún hay espacio para mejorar. Refuerza algunos aspectos de tu seguridad.</p>
      <a href="#ia" class="btn" style="display: inline-block; text-decoration: none;">🤖 Generar contraseña segura</a>
    `;
  } else {
    quizResult.className = 'result success';
    quizResult.innerHTML = `
      <div style="font-size: 3em; margin-bottom: 15px;">🟢</div>
      <div style="font-size: 1.5em; margin-bottom: 15px;">¡EXCELENTE! Tu seguridad es ÓPTIMA</div>
      <div style="font-size: 2em; font-weight: 800; margin-bottom: 20px;">0% de riesgo</div>
      <p style="font-size: 1.1em; font-weight: 500;">¡Felicidades! Tienes excelentes prácticas de seguridad. Sigue así y mantente actualizado sobre nuevas amenazas.</p>
    `;
  }
});

// Generador de contraseñas con IA
const genBtn = document.getElementById('genBtn');
const generatedPassword = document.getElementById('generatedPassword');

genBtn.addEventListener('click', () => {
  genBtn.textContent = '⚙️ Generando...';
  genBtn.disabled = true;
  
  // Simulación de generación de contraseña
  setTimeout(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    generatedPassword.value = password;
    genBtn.textContent = '⚙️ Generar Contraseña';
    genBtn.disabled = false;
    
    // Añadir efecto visual
    generatedPassword.style.animation = 'none';
    setTimeout(() => {
      generatedPassword.style.animation = 'fadeInUp 0.5s ease-out';
    }, 10);
  }, 800);
});

// Copiar contraseña al hacer clic en el input
generatedPassword.addEventListener('click', () => {
  if (generatedPassword.value) {
    generatedPassword.select();
    document.execCommand('copy');
    
    // Mostrar feedback visual
    const originalPlaceholder = generatedPassword.placeholder;
    generatedPassword.placeholder = '✅ ¡Copiado!';
    setTimeout(() => {
      generatedPassword.placeholder = originalPlaceholder;
    }, 2000);
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

// Animación del navbar al hacer scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.padding = '15px 0';
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.padding = '20px 0';
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});