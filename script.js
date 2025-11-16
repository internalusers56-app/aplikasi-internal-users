document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('sidebar-collapsed');
        
        if (sidebar.classList.contains('sidebar-collapsed')) {
            mainContent.style.marginLeft = '70px';
        } else {
            mainContent.style.marginLeft = '256px';
        }
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // User dropdown
    const userDropdownToggle = document.getElementById('userDropdownToggle');
    const userDropdown = document.getElementById('userDropdown');
    
    userDropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        userDropdown.classList.remove('show');
    });
    
    // Menu navigation
    const menuItems = document.querySelectorAll('.sidebar-item');
    const contentPages = document.querySelectorAll('.content-page');
    const pageTitle = document.getElementById('pageTitle');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all menu items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Get the page ID from data attribute
            const pageId = this.getAttribute('data-page');
            
            // Hide all content pages
            contentPages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show the selected content page
            const selectedPage = document.getElementById(pageId);
            if (selectedPage) {
                selectedPage.classList.add('active');
                
                // Update page title
                const menuText = this.querySelector('.menu-text').textContent;
                pageTitle.textContent = menuText;
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
            }
        });
    });
    
    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth <= 768) {
            mainContent.style.marginLeft = '0';
        } else if (!sidebar.classList.contains('sidebar-collapsed')) {
            mainContent.style.marginLeft = '256px';
        } else {
            mainContent.style.marginLeft = '70px';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load
});
