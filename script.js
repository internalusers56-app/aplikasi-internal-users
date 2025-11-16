const app = document.getElementById('app');
const sidebar = document.getElementById('app-sidebar');
const overlay = document.getElementById('app-overlay');
const btnSidebarToggle = document.getElementById('btn-sidebar-toggle');
const btnMobileMenu = document.getElementById('btn-mobile-menu');

const menuAdminToggle = document.getElementById('menu-admin-toggle');
const submenuAdmin = document.getElementById('submenu-admin');
const chevronAdmin = document.getElementById('chevron-admin');

// Toggle sidebar (desktop)
function setSidebarCollapsed(collapsed) {
  if (collapsed) {
    sidebar.classList.add('sidebar-collapsed', 'collapsed');
    sidebar.classList.remove('sidebar-expanded');
    sidebar.setAttribute('data-state', 'collapsed');
    btnSidebarToggle.setAttribute('aria-expanded', 'false');
  } else {
    sidebar.classList.remove('sidebar-collapsed', 'collapsed');
    sidebar.classList.add('sidebar-expanded');
    sidebar.setAttribute('data-state', 'expanded');
    btnSidebarToggle.setAttribute('aria-expanded', 'true');
  }
}

btnSidebarToggle.addEventListener('click', () => {
  const isCollapsed = sidebar.getAttribute('data-state') === 'collapsed';
  setSidebarCollapsed(!isCollapsed);
});

// Toggle sidebar (mobile)
btnMobileMenu.addEventListener('click', () => {
  app.classList.toggle('overlay-show');
  setSidebarCollapsed(false);
});

overlay.addEventListener('click', () => {
  app.classList.remove('overlay-show');
});

// Dropdown toggle
menuAdminToggle.addEventListener('click', () => {
  const open = menuAdminToggle.getAttribute('data-open') === 'true';
  menuAdminToggle.setAttribute('data-open', (!open).toString());
  menuAdminToggle.setAttribute('aria-expanded', (!open).toString());
  submenuAdmin.classList.toggle('hidden', open);
  chevronAdmin.classList.toggle('rotate-0', open);
  chevronAdmin.classList.toggle('rotate-90', !open);
});

// SPA routing
const routes = {
  '#/dashboard': { title: 'Dashboard', desc: 'Ringkasan aktivitas terbaru dan metrik utama.' },
  '#/todolist': { title: 'Todolist', desc: 'Kelola tugas harian, prioritas, dan progres.' },
  '#/marketing-plan': { title: 'Marketing Plan', desc: 'Rencana pemasaran, target, dan timeline.' },
  '#/register-aplikasi': { title: 'Register Aplikasi', desc: 'Pendaftaran aplikasi baru dan pengelolaan.' },
  '#/pengiriman-polis': { title: 'Pengiriman Polis', desc: 'Status pengiriman polis dan tracking.' },
  '#/register-klaim': { title: 'Register Klaim', desc: 'Pencatatan klaim dan proses verifikasi.' },
  '#/admin/users': { title: 'Pengaturan Users', desc: 'Manajemen akun pengguna dan status.' },
  '#/admin/roles': { title: 'Pengaturan Roles', desc: 'Definisi peran dan hak akses.' },
  '#/admin/menus': { title: 'Pengaturan Menus', desc: 'Struktur menu dan visibilitas.' },
  '#/admin/marketing': { title: 'Pengaturan Marketing', desc: 'Konfigurasi kanal dan materi promosi.' },
  '#/profile': { title: 'Profile', desc: 'Informasi akun dan preferensi.' }
};

const contentTitle = document.getElementById('content-title');
const contentDesc = document.getElementById('content-description');

function renderRoute() {
  const key = window.location.hash || '#/dashboard';
  const route = routes[key] || routes['#/dashboard'];
  contentTitle.textContent = route.title;
  contentDesc.textContent = route.desc;
  document.getElementById('header-title').textContent = route.title;
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', renderRoute);

// Notification badge demo
const btnNotif = document.getElementById('btn-notif');
const notifBadge = document.getElementById('notif-badge');
btnNotif.addEventListener('click', () => {
  const val = parseInt(notifBadge.textContent || '0', 10);
  notifBadge.textContent = String(val + 1);
});

// Logout demo
document.getElementById('menu-logout').addEventListener('click', () => {
  alert('Log out clicked — implement auth signout here.');
});
