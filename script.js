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
    sidebar.classList.add('mobile-open');
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
    // On mobile, sidebar toggle opens/closes the sidebar
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
  
  // Toggle submenu visibility
  submenuAdmin.classList.toggle('hidden', !isOpen);
  
  // Rotate chevron icon
  chevronAdmin.classList.toggle('rotate-90', isOpen);
  
  // Update ARIA attributes
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
  // Remove active class from all menu items
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Get current hash
  const hash = window.location.hash || '#/dashboard';
  
  // Find corresponding menu item and add active class
  const menuItem = document.querySelector(`a[href="${hash}"]`);
  if (menuItem) {
    menuItem.classList.add('active');
  }
  
  // If it's an admin submenu, also highlight the parent
  if (hash.includes('/admin/')) {
    menuAdminToggle.classList.add('active');
  }
}

// Render route based on hash
function renderRoute() {
  const key = window.location.hash || '#/dashboard';
  const route = routes[key] || routes['#/dashboard'];
  
  // Update content
  contentTitle.textContent = route.title;
  contentDesc.textContent = route.desc;
  
  // Update header title
  document.getElementById('header-title').textContent = route.title;
  
  // Set active menu
  setActiveMenu();
  
  // Close mobile sidebar after navigation
  if (window.innerWidth < 1024) {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  }
}

// Handle window resize
function handleResize() {
  if (window.innerWidth >= 1024) {
    // On desktop, ensure sidebar is visible
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
    
    // Set initial sidebar state
    const isCollapsed = sidebar.getAttribute('data-state') === 'collapsed';
    setSidebarCollapsed(isCollapsed);
  } else {
    // On mobile, ensure main content has no margin
    mainContent.classList.remove('sidebar-expanded', 'sidebar-collapsed');
  }
}

// Notification badge demo
const btnNotif = document.getElementById('btn-notif');
const notifBadge = document.getElementById('notif-badge');
btnNotif.addEventListener('click', () => {
  const val = parseInt(notifBadge.textContent || '0', 10);
  notifBadge.textContent = String(val + 1);
  
  // Add animation effect
  notifBadge.classList.add('badge-pulse');
  setTimeout(() => {
    notifBadge.classList.remove('badge-pulse');
  }, 1000);
});

// Logout functionality
document.getElementById('menu-logout').addEventListener('click', () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    // Simulate logout process
    console.log('Logging out...');
    // In a real app, you would redirect to logout endpoint or clear tokens
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

// Prevent default behavior for admin toggle button
menuAdminToggle.addEventListener('click', (e) => {
  e.preventDefault();
});
