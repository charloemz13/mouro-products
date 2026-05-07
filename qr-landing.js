/* ===================================================
   QR Landing Page — JavaScript
   Copy promo code, toast notification
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Copy Promo Code ── */
  const copyBtn  = document.getElementById('copy-btn');
  const promoCode = document.getElementById('promo-code');
  const toast    = document.getElementById('copy-toast');

  function showToast(msg) {
    document.querySelector('#copy-toast .toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  if (copyBtn && promoCode) {
    copyBtn.addEventListener('click', () => {
      const code = promoCode.textContent.trim();

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code).then(() => {
          showToast('Code copied to clipboard!');
          copyBtn.textContent = '✓ Copied!';
          copyBtn.style.background = 'var(--gradient-green)';
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.style.background = '';
          }, 2000);
        });
      } else {
        /* Fallback for non-secure contexts (e.g. file://) */
        const el = document.createElement('textarea');
        el.value = code;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast('Code copied!');
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
      }
    });
  }

  /* ── Animate link cards on scroll (Intersection Observer) ── */
  const linkCards = document.querySelectorAll('.link-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${i * 0.07}s`;
          entry.target.classList.add('card-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    linkCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(card);
    });
  }

});

/* ── Inject card-visible style ── */
const style = document.createElement('style');
style.textContent = `.card-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
