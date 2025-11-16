document.addEventListener('DOMContentLoaded', function() {
    // Sample data
    let applications = [
        {
            id: 1,
            tanggal: '2023-06-15',
            type_business: 'New Business',
            id_marketing: '1',
            segment: 'Corporate',
            request_type: 'Bank',
            request_name: 'John Doe',
            uraian: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl',
            ex_polis: 'EX123456',
            'no-request': 'REQ789',
            no_polis: 'POL456',
            status: 'Realisasi',
            keterangan: 'Semua dokumen sudah lengkap dan telah diverifikasi',
            created_at: '2023-06-15 10:30:00',
            updated_at: '2023-06-15 14:45:00'
        },
        {
            id: 2,
            tanggal: '2023-06-16',
            type_business: 'Endorsment',
            id_marketing: '2',
            segment: 'Retail',
            request_type: 'General Retail',
            request_name: 'Jane Smith',
            uraian: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            ex_polis: 'EX234567',
            'no-request': 'REQ790',
            no_polis: 'POL567',
            status: 'Pending',
            keterangan: 'Menunggu persetujuan dari manajemen',
            created_at: '2023-06-16 09:15:00',
            updated_at: '2023-06-16 11:20:00'
        },
        {
            id: 3,
            tanggal: '2023-06-17',
            type_business: 'Renewal',
            id_marketing: '3',
            segment: 'Corporate',
            request_type: 'Broker',
            request_name: 'Robert Johnson',
            uraian: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
            ex_polis: 'EX345678',
            'no-request': 'REQ791',
            no_polis: 'POL678',
            status: 'Batal',
            keterangan: 'Permintaan dibatalkan oleh klien',
            created_at: '2023-06-17 13:45:00',
            updated_at: '2023-06-17 16:30:00'
        },
        {
            id: 4,
            tanggal: '2023-06-18',
            type_business: 'New Business',
            id_marketing: '4',
            segment: 'Retail',
            request_type: 'Agent',
            request_name: 'Emily Wilson',
            uraian: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            ex_polis: 'EX456789',
            'no-request': 'REQ792',
            no_polis: 'POL789',
            status: 'Realisasi',
            keterangan: 'Proses selesai, polis telah diterbitkan',
            created_at: '2023-06-18 08:00:00',
            updated_at: '2023-06-18 12:15:00'
        },
        {
            id: 5,
            tanggal: '2023-06-19',
            type_business: 'Endorsment',
            id_marketing: '1',
            segment: 'Corporate',
            request_type: 'Leasing',
            request_name: 'Michael Brown',
            uraian: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
            ex_polis: 'EX567890',
            'no-request': 'REQ793',
            no_polis: 'POL890',
            status: 'Pending',
            keterangan: 'Dokumen tambahan sedang diproses',
            created_at: '2023-06-19 11:30:00',
            updated_at: '2023-06-19 15:45:00'
        },
        {
            id: 6,
            tanggal: '2023-06-20',
            type_business: 'Renewal',
            id_marketing: '2',
            segment: 'Retail',
            request_type: 'Bank',
            request_name: 'Sarah Davis',
            uraian: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos',
            ex_polis: 'EX678901',
            'no-request': 'REQ794',
            no_polis: 'POL901',
            status: 'Realisasi',
            keterangan: 'Pembayaran telah dikonfirmasi',
            created_at: '2023-06-20 10:00:00',
            updated_at: '2023-06-20 14:30:00'
        },
        {
            id: 7,
            tanggal: '2023-06-21',
            type_business: 'New Business',
            id_marketing: '3',
            segment: 'Corporate',
            request_type: 'General Corporate',
            request_name: 'David Miller',
            uraian: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti',
            ex_polis: 'EX789012',
            'no-request': 'REQ795',
            no_polis: 'POL012',
            status: 'Pending',
            keterangan: 'Menunggu verifikasi data dari klien',
            created_at: '2023-06-21 09:15:00',
            updated_at: '2023-06-21 13:20:00'
        },
        {
            id: 8,
            tanggal: '2023-06-22',
            type_business: 'Endorsment',
            id_marketing: '4',
            segment: 'Retail',
            request_type: 'Broker',
            request_name: 'Lisa Anderson',
            uraian: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio',
            ex_polis: 'EX890123',
            'no-request': 'REQ796',
            no_polis: 'POL123',
            status: 'Batal',
            keterangan: 'Klien tidak melanjutkan proses',
            created_at: '2023-06-22 14:00:00',
            updated_at: '2023-06-22 17:30:00'
        },
        {
            id: 9,
            tanggal: '2023-06-23',
            type_business: 'Renewal',
            id_marketing: '1',
            segment: 'Corporate',
            request_type: 'Agent',
            request_name: 'James Taylor',
            uraian: 'Cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga',
            ex_polis: 'EX901234',
            'no-request': 'REQ797',
            no_polis: 'POL234',
            status: 'Realisasi',
            keterangan: 'Polis diperpanjang untuk satu tahun',
            created_at: '2023-06-23 08:30:00',
            updated_at: '2023-06-23 12:45:00'
        },
        {
            id: 10,
            tanggal: '2023-06-24',
            type_business: 'New Business',
            id_marketing: '2',
            segment: 'Retail',
            request_type: 'Leasing',
            request_name: 'Jennifer Thomas',
            uraian: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio',
            ex_polis: 'EX012345',
            'no-request': 'REQ798',
            no_polis: 'POL345',
            status: 'Pending',
            keterangan: 'Proses verifikasi sedang berlangsung',
            created_at: '2023-06-24 11:00:00',
            updated_at: '2023-06-24 15:15:00'
        },
        {
            id: 11,
            tanggal: '2023-06-25',
            type_business: 'Endorsment',
            id_marketing: '3',
            segment: 'Corporate',
            request_type: 'Bank',
            request_name: 'William Jackson',
            uraian: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae',
            ex_polis: 'EX123456',
            'no-request': 'REQ799',
            no_polis: 'POL456',
            status: 'Realisasi',
            keterangan: 'Perubahan data telah disetujui',
            created_at: '2023-06-25 10:30:00',
            updated_at: '2023-06-25 14:45:00'
        },
        {
            id: 12,
            tanggal: '2023-06-26',
            type_business: 'Renewal',
            id_marketing: '4',
            segment: 'Retail',
            request_type: 'General Retail',
            request_name: 'Patricia White',
            uraian: 'Sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus',
            ex_polis: 'EX234567',
            'no-request': 'REQ800',
            no_polis: 'POL567',
            status: 'Batal',
            keterangan: 'Permintaan renewal dibatalkan karena keterlambatan pembayaran',
            created_at: '2023-06-26 09:45:00',
            updated_at: '2023-06-26 13:30:00'
        }
    ];

    // Current page and items per page
    let currentPage = 1;
    const itemsPerPage = 10;
    let filteredApplications = [...applications];

    // DOM Elements
    const tableBody = document.getElementById('table-body');
    const pagination = document.getElementById('pagination');
    const searchAllInput = document.getElementById('search-all');
    const toggleAdvancedSearchBtn = document.getElementById('toggle-advanced-search');
    const advancedSearchSection = document.getElementById('advanced-search');
    const applyFilterBtn = document.getElementById('apply-filter');
    const resetFilterBtn = document.getElementById('reset-filter');
    const addBtn = document.getElementById('btn-add');
    const cetakBtn = document.getElementById('btn-cetak');
    const formModal = new bootstrap.Modal(document.getElementById('formModal'));
    const viewModal = new bootstrap.Modal(document.getElementById('viewModal'));
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    const applicationForm = document.getElementById('application-form');
    const saveFormBtn = document.getElementById('save-form');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const formModalLabel = document.getElementById('formModalLabel');
    const viewContent = document.getElementById('view-content');

    // Initialize
    renderTable();
    updateStats();
    setupEventListeners();

    // Setup event listeners
    function setupEventListeners() {
        // Search functionality
        searchAllInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filteredApplications = applications.filter(app => {
                return Object.values(app).some(value => 
                    value.toString().toLowerCase().includes(searchTerm)
                );
            });
            currentPage = 1;
            renderTable();
        });

        // Toggle advanced search
        toggleAdvancedSearchBtn.addEventListener('click', function() {
            if (advancedSearchSection.style.display === 'none') {
                advancedSearchSection.style.display = 'block';
                this.innerHTML = '<i class="bi bi-funnel-fill me-1"></i> Sembunyikan Pencarian Lanjutan';
            } else {
                advancedSearchSection.style.display = 'none';
                this.innerHTML = '<i class="bi bi-funnel me-1"></i> Pencarian Lanjutan';
            }
        });

        // Apply filter
        applyFilterBtn.addEventListener('click', function() {
            const dateFrom = document.getElementById('date-from').value;
            const dateTo = document.getElementById('date-to').value;
            const statusFilter = document.getElementById('status-filter').value;
            const marketingFilter = document.getElementById('marketing-filter').value;
            const requestorFilter = document.getElementById('requestor-filter').value.toLowerCase();

            filteredApplications = applications.filter(app => {
                let match = true;

                if (dateFrom && app.tanggal < dateFrom) match = false;
                if (dateTo && app.tanggal > dateTo) match = false;
                if (statusFilter && app.status !== statusFilter) match = false;
                if (marketingFilter && app.id_marketing !== marketingFilter) match = false;
                if (requestorFilter && !app.request_name.toLowerCase().includes(requestorFilter)) match = false;

                return match;
            });

            currentPage = 1;
            renderTable();
        });

        // Reset filter
        resetFilterBtn.addEventListener('click', function() {
            document.getElementById('date-from').value = '';
            document.getElementById('date-to').value = '';
            document.getElementById('status-filter').value = '';
            document.getElementById('marketing-filter').value = '';
            document.getElementById('requestor-filter').value = '';
            
            filteredApplications = [...applications];
            currentPage = 1;
            renderTable();
        });

        // Add button
        addBtn.addEventListener('click', function() {
            formModalLabel.textContent = 'Tambah Aplikasi';
            applicationForm.reset();
            document.getElementById('id').value = '';
            document.getElementById('tanggal').value = new Date().toISOString().split('T')[0];
            document.getElementById('created_at').value = new Date().toISOString().slice(0, 19).replace('T', ' ');
            document.getElementById('updated_at').value = new Date().toISOString().slice(0, 19).replace('T', ' ');
            formModal.show();
        });

        // Print button
        cetakBtn.addEventListener('click', function() {
            window.print();
        });

        // Save form
        saveFormBtn.addEventListener('click', function() {
            if (applicationForm.checkValidity()) {
                const formData = new FormData(applicationForm);
                const id = formData.get('id');
                
                if (id) {
                    // Edit existing application
                    const index = applications.findIndex(app => app.id == id);
                    if (index !== -1) {
                        applications[index] = {
                            ...applications[index],
                            type_business: formData.get('type_business'),
                            id_marketing: formData.get('id_marketing'),
                            segment: formData.get('segment'),
                            request_type: formData.get('request_type'),
                            request_name: formData.get('request_name'),
                            uraian: formData.get('uraian'),
                            ex_polis: formData.get('ex_polis'),
                            'no-request': formData.get('no-request'),
                            no_polis: formData.get('no_polis'),
                            status: formData.get('status'),
                            keterangan: formData.get('keterangan'),
                            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                        };
                    }
                } else {
                    // Add new application
                    const newId = Math.max(...applications.map(app => app.id)) + 1;
                    const newApplication = {
                        id: newId,
                        tanggal: formData.get('tanggal'),
                        type_business: formData.get('type_business'),
                        id_marketing: formData.get('id_marketing'),
                        segment: formData.get('segment'),
                        request_type: formData.get('request_type'),
                        request_name: formData.get('request_name'),
                        uraian: formData.get('uraian'),
                        ex_polis: formData.get('ex_polis'),
                        'no-request': formData.get('no-request'),
                        no_polis: formData.get('no_polis'),
                        status: formData.get('status'),
                        keterangan: formData.get('keterangan'),
                        created_at: formData.get('created_at'),
                        updated_at: formData.get('updated_at')
                    };
                    applications.push(newApplication);
                }
                
                filteredApplications = [...applications];
                renderTable();
                updateStats();
                formModal.hide();
            } else {
                applicationForm.reportValidity();
            }
        });

        // Confirm delete
        confirmDeleteBtn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            applications = applications.filter(app => app.id != id);
            filteredApplications = [...applications];
            renderTable();
            updateStats();
            deleteModal.hide();
        });
    }

    // Render table
    function renderTable() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

        tableBody.innerHTML = '';
        
        if (paginatedApplications.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="13" class="text-center">Tidak ada data yang tersedia</td>';
            tableBody.appendChild(row);
        } else {
            paginatedApplications.forEach(app => {
                const row = document.createElement('tr');
                
                // Create status badge class
                let statusClass = '';
                if (app.status === 'Realisasi') statusClass = 'status-realisasi';
                else if (app.status === 'Pending') statusClass = 'status-pending';
                else if (app.status === 'Batal') statusClass = 'status-batal';
                
                row.innerHTML = `
                    <td>
                        <button class="action-btn view" data-id="${app.id}" data-action="view">
                            <i class="bi bi-eye"></i> View
                        </button>
                        <button class="action-btn edit" data-id="${app.id}" data-action="edit">
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button class="action-btn delete" data-id="${app.id}" data-action="delete">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </td>
                    <td>${app.tanggal}</td>
                    <td>${app.type_business}</td>
                    <td>Marketing ${app.id_marketing}</td>
                    <td>${app.segment}</td>
                    <td>${app.request_type}</td>
                    <td>${app.request_name}</td>
                    <td>${app.uraian.substring(0, 30)}${app.uraian.length > 30 ? '...' : ''}</td>
                    <td>${app.ex_polis}</td>
                    <td>${app['no-request']}</td>
                    <td>${app.no_polis}</td>
                    <td><span class="status-badge ${statusClass}">${app.status}</span></td>
                    <td>${app.keterangan.substring(0, 30)}${app.keterangan.length > 30 ? '...' : ''}</td>
                `;
                
                tableBody.appendChild(row);
            });
            
            // Add event listeners to action buttons
            document.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const action = this.getAttribute('data-action');
                    
                    if (action === 'view') {
                        viewApplication(id);
                    } else if (action === 'edit') {
                        editApplication(id);
                    } else if (action === 'delete') {
                        deleteApplication(id);
                    }
                });
            });
        }
        
        // Update pagination
        renderPagination();
        updateShowingInfo();
    }

    // Render pagination
    function renderPagination() {
        const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
        pagination.innerHTML = '';
        
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
        prevLi.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });
        pagination.appendChild(prevLi);
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                renderTable();
            });
            pagination.appendChild(li);
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
        nextLi.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });
        pagination.appendChild(nextLi);
    }

    // Update showing info
    function updateShowingInfo() {
        const startIndex = (currentPage - 1) * itemsPerPage + 1;
        const endIndex = Math.min(currentPage * itemsPerPage, filteredApplications.length);
        
        document.getElementById('showing-start').textContent = filteredApplications.length > 0 ? startIndex : 0;
        document.getElementById('showing-end').textContent = endIndex;
        document.getElementById('total-records').textContent = filteredApplications.length;
    }

    // Update stats
    function updateStats() {
        const realisasiCount = applications.filter(app => app.status === 'Realisasi').length;
        const pendingCount = applications.filter(app => app.status === 'Pending').length;
        const batalCount = applications.filter(app => app.status === 'Batal').length;
        
        document.getElementById('realisasi-count').textContent = realisasiCount;
        document.getElementById('pending-count').textContent = pendingCount;
        document.getElementById('batal-count').textContent = batalCount;
    }

    // View application
    function viewApplication(id) {
        const app = applications.find(a => a.id == id);
        if (app) {
            let statusClass = '';
            if (app.status === 'Realisasi') statusClass = 'status-realisasi';
            else if (app.status === 'Pending') statusClass = 'status-pending';
            else if (app.status === 'Batal') statusClass = 'status-batal';
            
            viewContent.innerHTML = `
                <div class="row">
                    <div class="col-md-6 view-item">
                        <div class="view-label">ID</div>
                        <div class="view-value">${app.id}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Tanggal</div>
                        <div class="view-value">${app.tanggal}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Type Business</div>
                        <div class="view-value">${app.type_business}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Marketing</div>
                        <div class="view-value">Marketing ${app.id_marketing}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Segment</div>
                        <div class="view-value">${app.segment}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Request Type</div>
                        <div class="view-value">${app.request_type}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Request Name</div>
                        <div class="view-value">${app.request_name}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Status</div>
                        <div class="view-value"><span class="status-badge ${statusClass}">${app.status}</span></div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Ex Polis</div>
                        <div class="view-value">${app.ex_polis}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">No Request</div>
                        <div class="view-value">${app['no-request']}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">No Polis</div>
                        <div class="view-value">${app.no_polis}</div>
                    </div>
                    <div class="col-md-12 view-item">
                        <div class="view-label">Uraian</div>
                        <div class="view-value">${app.uraian}</div>
                    </div>
                    <div class="col-md-12 view-item">
                        <div class="view-label">Keterangan</div>
                        <div class="view-value">${app.keterangan}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Created At</div>
                        <div class="view-value">${app.created_at}</div>
                    </div>
                    <div class="col-md-6 view-item">
                        <div class="view-label">Updated At</div>
                        <div class="view-value">${app.updated_at}</div>
                    </div>
                </div>
            `;
            viewModal.show();
        }
    }

    // Edit application
    function editApplication(id) {
        const app = applications.find(a => a.id == id);
        if (app) {
            formModalLabel.textContent = 'Edit Aplikasi';
            
            // Fill form with application data
            document.getElementById('id').value = app.id;
            document.getElementById('tanggal').value = app.tanggal;
            document.getElementById('type_business').value = app.type_business;
            document.getElementById('id_marketing').value = app.id_marketing;
            document.getElementById('segment').value = app.segment;
            document.getElementById('request_type').value = app.request_type;
            document.getElementById('request_name').value = app.request_name;
            document.getElementById('uraian').value = app.uraian;
            document.getElementById('ex_polis').value = app.ex_polis;
            document.getElementById('no-request').value = app['no-request'];
            document.getElementById('no_polis').value = app.no_polis;
            document.getElementById('status').value = app.status;
            document.getElementById('keterangan').value = app.keterangan;
            document.getElementById('created_at').value = app.created_at;
            document.getElementById('updated_at').value = new Date().toISOString().slice(0, 19).replace('T', ' ');
            
            formModal.show();
        }
    }

    // Delete application
    function deleteApplication(id) {
        confirmDeleteBtn.setAttribute('data-id', id);
        deleteModal.show();
    }
});
