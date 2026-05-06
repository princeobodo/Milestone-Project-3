/* script.js
  quiz scheme 
*/

document.addEventListener('DOMContentLoaded', function () {
  // set footer year
  const year = new Date().getFullYear();
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = year;

  document.querySelectorAll('.nav-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      const nav = btn.nextElementSibling && btn.nextElementSibling.classList.contains('main-nav') ? btn.nextElementSibling : document.querySelector('.main-nav');
      if (!nav) return;
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', !!isOpen);
    });
  });

  // Quiz logic: simple grading 
  const quizForm = document.getElementById('quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', function(e){
      e.preventDefault();
      // Grade answers (simple sample answers)
      let score = 0, total = 3;
      // Q1: fleur-de-lis -> value 'a'
      const q1 = quizForm.querySelector('input[name="q1"]:checked');
      if (q1 && q1.value === 'a') score++;
      // Q2: luxury artisan brand -> 'b'
      const q2 = quizForm.querySelector('input[name="q2"]:checked');
      if (q2 && q2.value === 'b') score++;
      // Q3: checkboxes: 'a' and 'c' should be checked, 'b' not
      const q3Checked = Array.from(quizForm.querySelectorAll('input[name="q3"]:checked')).map(i => i.value);
      if (q3Checked.includes('a') && q3Checked.includes('c') && !q3Checked.includes('b')) score++;

      const result = document.getElementById('quiz-result');
      if (result) {
        result.innerHTML = `<strong>Score: ${score} / ${total}</strong><p>${score === total ? 'Perfect!' : 'Review the Key Concepts page for the answers.'}</p>`;
      }
    });

    // Clear quiz
    const clearBtn = document.getElementById('clear-quiz');
    if (clearBtn) {
      clearBtn.addEventListener('click', function(){
        quizForm.reset();
        const result = document.getElementById('quiz-result');
        if (result) result.textContent = '';
      });
    }
  }
});
