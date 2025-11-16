// DOM Elements
const app = document.getElementById('app');
const sidebar = document.getElementById('app-sidebar');
const overlay = document.getElementById('app-overlay');
const btnSidebarToggle = document.getElementById('btn-sidebar-toggle');
const btnMobileMenu = document.getElementById('btn-mobile-menu');
const mainContent = document.getElementById('main-content');

const menuAdminToggle = document.getElementById('menu-admin-toggle');
const submenuAdmin = document.getElementById('submenu-admin');
const chevronAdmin = document.getElementById('chevron-admin');

// Initialize app
function initApp() {
  // Set initial sidebar state based on screen size
  if (window.innerWidth >= 1024) {
    setSidebarCollapsed(false);
  } else {
    setSidebarCollapsed(true);
  }
  
  // Set active menu based on current hash
  setActiveMenu();
}

// Toggle sidebar (desktop)
function setSidebarCollapsed(collapsed) {
  if (collapsed) {
    sidebar.classList.add('sidebar-collapsed', 'collapsed');
    sidebar.classList.remove('sidebar-expanded');
    sidebar.setAttribute('data-state', 'collapsed');
    btnSidebarToggle.setAttribute('aria-expanded', 'false');
    
    if (window.innerWidth >= 1024) {
      mainContent.classList.add('sidebar-collapsed');
      mainContent.classList.remove('sidebar-expanded');
    }
  } else {
    sidebar.classList.remove('sidebar-collapsed', 'collapsed');
    sidebar.classList.add('sidebar-expanded');
    sidebar.setAttribute('data-state', 'expanded');
    btnSidebarToggle.setAttribute('aria-expanded', 'true');
    
    if (window.innerWidth >= 1024) {
      mainContent.classList.add('sidebar-expanded');
      mainContent.classList.remove('sidebar-collapsed');
    }
  }
}

// Toggle sidebar on desktop
btnSidebarToggle.addEventListener('click', () => {
  if (window.innerWidth >= 1024) {
    const isCollapsed = sidebar.getAttribute('data-state') === 'collapsed';
    setSidebarCollapsed(!isCollapsed);
  } else {
    toggleMobileSidebar();
  }
});

// Toggle sidebar on mobile
btnMobileMenu.addEventListener('click', () => {
  toggleMobileSidebar();
});

// Toggle mobile sidebar
function toggleMobileSidebar() {
  sidebar.classList.toggle('mobile-open');
  overlay.classList.toggle('active');
  document.body.classList.toggle('overflow-hidden');
}

// Close mobile sidebar when overlay is clicked
overlay.addEventListener('click', () => {
  sidebar.classList.remove('mobile-open');
  overlay.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
});

// Dropdown toggle for Administrasi menu
menuAdminToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = submenuAdmin.classList.contains('hidden');
  
  submenuAdmin.classList.toggle('hidden', !isOpen);
  chevronAdmin.classList.toggle('rotate-90', isOpen);
  menuAdminToggle.setAttribute('aria-expanded', isOpen.toString());
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!menuAdminToggle.contains(e.target) && !submenuAdmin.contains(e.target)) {
    submenuAdmin.classList.add('hidden');
    chevronAdmin.classList.remove('rotate-90');
    menuAdminToggle.setAttribute('aria-expanded', 'false');
  }
});

// SPA routing
const routes = {
  '#/dashboard': { 
    title: 'Dashboard', 
    desc: 'Ringkasan aktivitas terbaru dan metrik utama.' 
  },
  '#/todolist': { 
    title: 'Todolist', 
    desc: 'Kelola tugas harian, prioritas, dan progres.' 
  },
  '#/marketing-plan': { 
    title: 'Marketing Plan', 
    desc: 'Rencana pemasaran, target, dan timeline.' 
  },
  '#/register-aplikasi': { 
    title: 'Register Aplikasi', 
    desc: 'Pendaftaran aplikasi baru dan pengelolaan.' 
  },
  '#/pengiriman-polis': { 
    title: 'Pengiriman Polis', 
    desc: 'Status pengiriman polis dan tracking.' 
  },
  '#/register-klaim': { 
    title: 'Register Klaim', 
    desc: 'Pencatatan klaim dan proses verifikasi.' 
  },
  '#/admin/users': { 
    title: 'Pengaturan Users', 
    desc: 'Manajemen akun pengguna dan status.' 
  },
  '#/admin/roles': { 
    title: 'Pengaturan Roles', 
    desc: 'Definisi peran dan hak akses.' 
  },
  '#/admin/menus': { 
    title: 'Pengaturan Menus', 
    desc: 'Struktur menu dan visibilitas.' 
  },
  '#/admin/marketing': { 
    title: 'Pengaturan Marketing', 
    desc: 'Konfigurasi kanal dan materi promosi.' 
  },
  '#/profile': { 
    title: 'Profile', 
    desc: 'Informasi akun dan preferensi.' 
  }
};

const contentTitle = document.getElementById('content-title');
const contentDesc = document.getElementById('content-description');

// Set active menu based on current route
function setActiveMenu() {
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const hash = window.location.hash || '#/dashboard';
  const menuItem = document.querySelector(`a[href="${hash}"]`);
  
  if (menuItem) {
    menuItem.classList.add('active');
  }
  
  if (hash.includes('/admin/')) {
    menuAdminToggle.classList.add('active');
  }
}

// Render route based on hash
function renderRoute() {
  const key = window.location.hash || '#/dashboard';
  const route = routes[key] || routes['#/dashboard'];
  
  contentTitle.textContent = route.title;
  contentDesc.textContent = route.desc;
  document.getElementById('header-title').textContent = route.title;
  
  setActiveMenu();
  
  if (window.innerWidth < 1024) {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  }
}

// Handle window resize
function handleResize() {
  if (window.innerWidth >= 1024) {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
    
    const isCollapsed = sidebar.getAttribute('data-state') === 'collapsed';
    setSidebarCollapsed(isCollapsed);
  } else {
    mainContent.classList.remove('sidebar-expanded', 'sidebar-collapsed');
  }
}

// Notification badge demo
const btnNotif = document.getElementById('btn-notif');
const notifBadge = document.getElementById('notif-badge');
btnNotif.addEventListener('click', () => {
  const val = parseInt(notifBadge.textContent || '0', 10);
  notifBadge.textContent = String(val + 1);
  
  notifBadge.classList.add('badge-pulse');
  setTimeout(() => {
    notifBadge.classList.remove('badge-pulse');
  }, 1000);
});

// Logout functionality
document.getElementById('menu-logout').addEventListener('click', () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    alert('Anda telah berhasil logout. Implementasi sesungguhnya akan membersihkan sesi dan mengarahkan ke halaman login.');
  }
});

// Event listeners
window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', () => {
  initApp();
  renderRoute();
});
window.addEventListener('resize', handleResize);

menuAdminToggle.addEventListener('click', (e) => {
  e.preventDefault();
});
