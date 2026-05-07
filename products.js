/* ===================================================
   Products Page — JavaScript
   Filter, Sort, Cart Toast
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Cart Toast ── */
  const toast = document.getElementById('cart-toast');

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const name = card.querySelector('.product-name').textContent;
      document.querySelector('.toast-msg').textContent = `"${name}" added to cart!`;
      showToast();
      btn.textContent = '✓ Added';
      btn.style.background = 'var(--gradient-green)';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 2000);
    });
  });

  /* ── Filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.product-card');
  const noResults  = document.getElementById('no-results');

  function applyFilter(filter) {
    let visible = 0;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });
    noResults.style.display = visible === 0 ? 'flex' : 'none';
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  /* ── Sort ── */
  const sortSelect = document.getElementById('sort-select');
  const grid       = document.getElementById('products-grid');

  sortSelect.addEventListener('change', () => {
    const val   = sortSelect.value;
    const items = [...grid.querySelectorAll('.product-card')];

    items.sort((a, b) => {
      if (val === 'price-asc')  return +a.dataset.price - +b.dataset.price;
      if (val === 'price-desc') return +b.dataset.price - +a.dataset.price;
      return 0; // featured — original order
    });

    items.forEach(item => grid.appendChild(item));
  });

});
