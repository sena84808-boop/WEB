/* ============================================
   CEKIDOT MART — Main JavaScript
   ============================================ */

'use strict';

// ── State ────────────────────────────────────
const state = {
  theme: localStorage.getItem('cm-theme') || 'light',
  wishlist: JSON.parse(localStorage.getItem('cm-wishlist') || '[]'),
  mobileMenuOpen: false,
  products: [],
  filterCategory: 'all',
  filterCondition: 'all',
  filterSort: 'newest',
  dashPanel: 'overview',
};

// ── Product Data ──────────────────────────────
const PRODUCTS = [
  { id:1, name:'MacBook Pro M3 14" Space Black', price:24500000, seller:'TechStore ID', rating:4.9, reviews:128, condition:'Baru', category:'elektronik', location:'Jakarta Selatan', img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', badge:'hot' },
  { id:2, name:'iPhone 15 Pro Max 256GB Natural Titanium', price:18900000, seller:'Apple Center', rating:4.8, reviews:94, condition:'Baru', category:'elektronik', location:'Bandung', img:'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop', badge:'new' },
  { id:3, name:'Nike Air Jordan 1 Retro High OG', price:3200000, seller:'SneakerHeadJKT', rating:4.7, reviews:56, condition:'Baru', category:'fashion', location:'Jakarta Pusat', img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', badge:'new' },
  { id:4, name:'PlayStation 5 Digital Edition Bundle', price:8500000, seller:'GamingZone99', rating:4.6, reviews:73, condition:'Baru', category:'gaming', location:'Surabaya', img:'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop', badge:'hot' },
  { id:5, name:'Honda Vario 160 2023 Low KM', price:22000000, seller:'AutoDealer Prima', rating:4.5, reviews:31, condition:'Bekas', category:'kendaraan', location:'Bekasi', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', badge:'used' },
  { id:6, name:'Kursi Gaming RESPAWN 900 Full Recline', price:2800000, seller:'FurnitureMall', rating:4.4, reviews:44, condition:'Baru', category:'furniture', location:'Depok', img:'https://images.unsplash.com/photo-1616627985067-55ea1b5cf016?w=400&h=300&fit=crop', badge:'new' },
  { id:7, name:'Samsung Galaxy Tab S9 Ultra 12GB', price:16500000, seller:'GadgetPlus', rating:4.7, reviews:62, condition:'Baru', category:'elektronik', location:'Tangerang', img:'https://images.unsplash.com/photo-1590739000027-286c2688ee57?w=400&h=300&fit=crop', badge:'new' },
  { id:8, name:'Mechanical Keyboard Keychron K8 Pro', price:1850000, seller:'TechGear_ID', rating:4.8, reviews:89, condition:'Baru', category:'elektronik', location:'Jakarta Barat', img:'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop', badge:'' },
];

const CATEGORIES = [
  { id:'elektronik', name:'Elektronik', icon:'📱', count:2847 },
  { id:'fashion', name:'Fashion', icon:'👕', count:5613 },
  { id:'gaming', name:'Gaming', icon:'🎮', count:1205 },
  { id:'kendaraan', name:'Kendaraan', icon:'🏍️', count:892 },
  { id:'furniture', name:'Furniture', icon:'🛋️', count:1438 },
  { id:'random', name:'Random Stuff', icon:'📦', count:3192 },
];

const TESTIMONIALS = [
  { name:'Rizky Pratama', role:'Penjual Aktif · Jakarta', text:'Cekidot Mart benar-benar ubah cara gue jualan online. Dalam 3 hari barang langsung laku! Interface-nya bersih dan mudah banget dipake.', rating:5, initial:'R' },
  { name:'Sita Dewi', role:'Pembeli · Surabaya', text:'Produknya lengkap, penjual responsif, dan sistemnya aman. Udah belanja 10x lebih dan selalu puas. Ini marketplace terbaik!', rating:5, initial:'S' },
  { name:'Daffa Ramadhan', role:'Gamer · Bandung', text:'Dapet PS5 dengan harga yang jauh lebih murah dibanding tempat lain. Kondisi barang persis seperti foto. Highly recommended!', rating:5, initial:'D' },
];

const FAQS = [
  { q:'Bagaimana cara menjual barang di Cekidot Mart?', a:'Mudah banget! Klik tombol "Jual Barang", isi form dengan foto, nama, deskripsi, dan harga barang kamu. Barang langsung tampil di marketplace dalam hitungan menit.' },
  { q:'Apakah transaksi di Cekidot Mart aman?', a:'100% aman! Kami menggunakan sistem escrow otomatis. Dana dari pembeli ditahan dulu oleh sistem, baru diteruskan ke penjual setelah barang diterima.' },
  { q:'Berapa biaya listing produk?', a:'Gratis! Tidak ada biaya untuk memposting barang. Kami hanya mengambil komisi kecil 2% dari setiap transaksi yang berhasil.' },
  { q:'Apa saja metode pembayaran yang tersedia?', a:'Kami mendukung transfer bank, e-wallet (GoPay, OVO, Dana, ShopeePay), virtual account, kartu kredit/debit, dan QRIS.' },
  { q:'Bagaimana jika barang yang diterima tidak sesuai?', a:'Kami punya sistem perlindungan pembeli. Kamu punya 3 hari setelah barang diterima untuk melaporkan jika ada masalah. Uang akan dikembalikan penuh.' },
];

// ── DOM Helpers ────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

// ── Theme ─────────────────────────────────────
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('cm-theme', t);
  const btn = $('#theme-toggle');
  if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(state.theme);
}

// ── Page Loader ────────────────────────────────
function initLoader() {
  const loader = $('#page-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 700);
  }, 1800);
}

// ── Navbar ────────────────────────────────────
function initNavbar() {
  const nav = $('#navbar');
  const ham = $('#hamburger');
  const mobileMenu = $('#mobile-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  ham?.addEventListener('click', () => {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    mobileMenu?.classList.toggle('open', state.mobileMenuOpen);
    ham.classList.toggle('open', state.mobileMenuOpen);
  });

  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (state.mobileMenuOpen) {
        state.mobileMenuOpen = false;
        mobileMenu?.classList.remove('open');
        ham?.classList.remove('open');
      }
    });
  });

  // Active nav on scroll
  const sections = $$('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$('.nav-link').forEach(l => l.classList.remove('active'));
        $$(`[href="#${e.target.id}"]`).forEach(l => l.classList.add('active'));
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => observer.observe(s));
}

// ── Render Categories ─────────────────────────
function renderCategories() {
  const grid = $('#categories-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-card reveal" data-cat="${c.id}" onclick="filterByCategory('${c.id}')">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count.toLocaleString()} barang</div>
    </div>
  `).join('');
}

// ── Render Products ───────────────────────────
function renderProducts(products = PRODUCTS) {
  const grid = $('#products-grid');
  if (!grid) return;

  // Show skeletons first
  grid.innerHTML = Array(4).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton sk-img"></div>
      <div class="sk-content">
        <div class="skeleton sk-line w60"></div>
        <div class="skeleton sk-line w80"></div>
        <div class="skeleton sk-line w40"></div>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    grid.innerHTML = products.map(p => productCard(p)).join('');
    initWishlistButtons();
    initLazyImages();
  }, 800);
}

function productCard(p) {
  const isWished = state.wishlist.includes(p.id);
  const badge = p.badge ? `<div class="product-badge badge-${p.badge}">${p.badge === 'hot' ? '🔥 Hot' : p.badge === 'new' ? '✨ Baru' : '📦 Bekas'}</div>` : '';
  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
  const initials = p.seller.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return `
    <div class="product-card reveal" data-id="${p.id}">
      <div class="product-img-wrap">
        <img data-src="${p.img}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3C/svg%3E" alt="${p.name}" loading="lazy">
        ${badge}
        <button class="product-wish ${isWished ? 'active' : ''}" data-id="${p.id}" onclick="toggleWish(${p.id}, this)" title="Tambah ke wishlist">
          ${isWished ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <div class="product-seller">
          <div class="seller-avatar">${initials}</div>
          <span>${p.seller}</span>
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span>${p.rating} · ${p.reviews} ulasan</span>
        </div>
        <div class="product-location">📍 ${p.location}</div>
        <div class="product-footer">
          <div class="product-price">Rp ${formatPrice(p.price)}</div>
          <button class="btn-chat" onclick="showToast('💬 Membuka chat dengan ${p.seller}...', 'success')">
            💬 Chat
          </button>
        </div>
      </div>
    </div>
  `;
}

function formatPrice(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + ' jt';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'rb';
  return n.toString();
}

// ── Wishlist ──────────────────────────────────
function toggleWish(id, btn) {
  const idx = state.wishlist.indexOf(id);
  if (idx === -1) {
    state.wishlist.push(id);
    btn.innerHTML = '❤️';
    btn.classList.add('active');
    showToast('❤️ Ditambahkan ke wishlist!', 'success');
  } else {
    state.wishlist.splice(idx, 1);
    btn.innerHTML = '🤍';
    btn.classList.remove('active');
    showToast('Dihapus dari wishlist', 'error');
  }
  localStorage.setItem('cm-wishlist', JSON.stringify(state.wishlist));
}

function initWishlistButtons() {
  $$('.product-wish').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    if (state.wishlist.includes(id)) {
      btn.innerHTML = '❤️';
      btn.classList.add('active');
    }
  });
}

// ── Lazy Loading ──────────────────────────────
function initLazyImages() {
  const imgs = $$('img[data-src]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    imgs.forEach(img => io.observe(img));
  } else {
    imgs.forEach(img => { img.src = img.dataset.src; });
  }
}

// ── Scroll Reveal ─────────────────────────────
function initScrollReveal() {
  const items = $$('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(item => io.observe(item));
}

// ── Filter ────────────────────────────────────
function filterByCategory(cat) {
  state.filterCategory = cat === state.filterCategory ? 'all' : cat;
  $$('.filter-chip[data-filter="category"]').forEach(c => {
    c.classList.toggle('active', c.dataset.value === state.filterCategory);
  });
  applyFilters();
  // Smooth scroll to products
  const section = document.getElementById('products-section');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function applyFilters() {
  let filtered = [...PRODUCTS];

  if (state.filterCategory !== 'all')
    filtered = filtered.filter(p => p.category === state.filterCategory);
  if (state.filterCondition !== 'all')
    filtered = filtered.filter(p => p.condition === state.filterCondition);

  switch (state.filterSort) {
    case 'price-low': filtered.sort((a,b) => a.price - b.price); break;
    case 'price-high': filtered.sort((a,b) => b.price - a.price); break;
    case 'rating': filtered.sort((a,b) => b.rating - a.rating); break;
    default: break;
  }

  renderProducts(filtered);
}

function initFilters() {
  $$('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const filterType = chip.dataset.filter;
      const value = chip.dataset.value;
      $$(`.filter-chip[data-filter="${filterType}"]`).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state[`filter${filterType.charAt(0).toUpperCase()}${filterType.slice(1)}`] = value;
      applyFilters();
    });
  });

  const sortSelect = $('#sort-select');
  sortSelect?.addEventListener('change', e => {
    state.filterSort = e.target.value;
    applyFilters();
  });
}

// ── Search ────────────────────────────────────
function initSearch() {
  const form = $('#search-form');
  const input = $('#search-input');
  const tagBtns = $$('.search-tag');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    doSearch(input?.value || '');
  });

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.textContent.trim();
      if (input) input.value = q;
      doSearch(q);
    });
  });
}

function doSearch(q) {
  if (!q.trim()) { renderProducts(PRODUCTS); return; }
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase()) ||
    p.seller.toLowerCase().includes(q.toLowerCase())
  );
  renderProducts(results);
  showToast(`🔍 Ditemukan ${results.length} produk untuk "${q}"`, 'success');
  const section = document.getElementById('products-section');
  section?.scrollIntoView({ behavior: 'smooth' });
}

// ── Sell Form ─────────────────────────────────
function initSellForm() {
  const form = $('#sell-form');
  const uploadZone = $('#upload-zone');
  const fileInput = $('#file-input');
  const previews = $('#upload-previews');

  if (!form) return;

  // Drag and drop
  uploadZone?.addEventListener('click', () => fileInput?.click());
  uploadZone?.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('dragover'); });
  uploadZone?.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
  uploadZone?.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  fileInput?.addEventListener('change', e => handleFiles(e.target.files));

  function handleFiles(files) {
    [...files].slice(0, 4).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const div = el('div', 'upload-preview');
        div.innerHTML = `<img src="${ev.target.result}"><div class="upload-preview-remove" onclick="this.parentElement.remove()">×</div>`;
        previews?.appendChild(div);
      };
      reader.readAsDataURL(file);
    });
  }

  // Price formatter
  const priceInput = $('#price-input');
  priceInput?.addEventListener('input', e => {
    const raw = e.target.value.replace(/\D/g, '');
    e.target.value = raw ? parseInt(raw).toLocaleString('id-ID') : '';
  });

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#product-name')?.value;
    const price = $('#price-input')?.value;

    if (!name || !price) {
      showToast('❌ Mohon lengkapi semua field wajib', 'error');
      return;
    }

    const btn = form.querySelector('.btn-submit');
    btn.textContent = '⏳ Memproses...';
    btn.disabled = true;

    setTimeout(() => {
      showToast(`✅ "${name}" berhasil diposting!`, 'success');
      form.reset();
      if (previews) previews.innerHTML = '';
      btn.textContent = '🚀 Posting Sekarang';
      btn.disabled = false;
    }, 1600);
  });
}

// ── FAQ ───────────────────────────────────────
function renderFAQ() {
  const container = $('#faq-container');
  if (!container) return;
  container.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-question" onclick="toggleFAQ(${i})">
        <span>${f.q}</span>
        <div class="faq-chevron">▾</div>
      </button>
      <div class="faq-answer">${f.a}</div>
    </div>
  `).join('');
}

function toggleFAQ(i) {
  const item = $(`#faq-${i}`);
  const isOpen = item.classList.contains('open');
  $$('.faq-item').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Testimonials ──────────────────────────────
function renderTestimonials() {
  const grid = $('#testi-grid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testi-card reveal">
      <div class="testi-stars">${'★'.repeat(t.rating)}</div>
      <div class="testi-text">"${t.text}"</div>
      <div class="testi-author">
        <div class="testi-avatar">${t.initial}</div>
        <div class="testi-author-info">
          <strong>${t.name}</strong>
          <span>${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Dashboard ─────────────────────────────────
function openDashboard() {
  const modal = $('#dashboard-modal');
  modal?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDashboard() {
  const modal = $('#dashboard-modal');
  modal?.classList.remove('open');
  document.body.style.overflow = '';
}

function switchDashPanel(panel) {
  state.dashPanel = panel;
  $$('.dash-link').forEach(l => l.classList.toggle('active', l.dataset.panel === panel));
  $$('.dash-panel').forEach(p => p.classList.toggle('active', p.id === `dash-${panel}`));
}

// ── Counter Animation ─────────────────────────
function animateCounter(el, target, prefix = '', suffix = '') {
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.floor(ease * target).toLocaleString('id-ID') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = $$('[data-counter]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        animateCounter(el, parseInt(el.dataset.counter), el.dataset.prefix || '', el.dataset.suffix || '');
        io.unobserve(el);
      }
    });
  });
  counters.forEach(c => io.observe(c));
}

// ── Toast ─────────────────────────────────────
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = el('div', `toast toast-${type}`);
  toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span><span class="toast-msg">${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Smooth Scroll ─────────────────────────────
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Global Exports ─────────────────────────────
window.toggleWish = toggleWish;
window.toggleFAQ = toggleFAQ;
window.openDashboard = openDashboard;
window.closeDashboard = closeDashboard;
window.switchDashPanel = switchDashPanel;
window.showToast = showToast;
window.filterByCategory = filterByCategory;
window.toggleTheme = toggleTheme;

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  initLoader();
  initNavbar();
  renderCategories();
  renderProducts();
  renderTestimonials();
  renderFAQ();
  initFilters();
  initSearch();
  initSellForm();
  initSmoothScroll();
  initCounters();
  setTimeout(initScrollReveal, 100);

  // Close modal on overlay click
  $('#dashboard-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDashboard();
  });
});
