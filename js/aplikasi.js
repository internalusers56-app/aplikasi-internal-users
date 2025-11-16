document.addEventListener('DOMContentLoaded', function() {
    // Sample data
    const sampleData = [
        {
            id: 1,
            tanggal: "2023-06-20",
            type_business: "New Business",
            id_marketing: 1,
            segment: "Corporate",
            request_type: "Bank",
            request_name: "PT. Sejahtera Bersama",
            uraian: "Aplikasi asuransi untuk kantor pusat dan cabang",
            ex_polis: "POL-2022-001",
            no_request: "REQ-2023-001",
            no_polis: "POL-2023-001",
            status: "Realisasi",
            keterangan: "Disetujui dengan catatan",
            created_at: "2023-06-20 09:00:00",
            updated_at: "2023-06-22 14:30:00"
        },
        {
            id: 2,
            tanggal: "2023-06-21",
            type_business: "Endorsment",
            id_marketing: 2,
            segment: "Retail",
            request_type: "Agent",
            request_name: "Budi Santoso",
            uraian: "Perubahan alamat tertanggung",
            ex_polis: "POL-2023-015",
            no_request: "REQ-2023-002",
            no_polis: "POL-2023-015",
            status: "Pending",
            keterangan: "Menunggu dokumen lengkap",
            created_at: "2023-06-21 10:30:00",
            updated_at: "2023-06-21 10:30:00"
        },
        {
            id: 3,
            tanggal: "2023-06-19",
            type_business: "Renewal",
            id_marketing: 3,
            segment: "Corporate",
            request_type: "Broker",
            request_name: "PT. Maju Jaya",
            uraian: "Perpanjangan polis asuransi kendaraan",
            ex_polis: "POL-2022-045",
            no_request: "REQ-2023-003",
            no_polis: "",
            status: "Batal",
            keterangan: "Permintaan dibatalkan oleh klien",
            created_at: "2023-06-19 13:45:00",
            updated_at: "2023-06-20 09:15:00"
        },
        {
            id: 4,
            tanggal: "2023-06-18",
            type_business: "New Business",
            id_marketing: 4,
            segment: "Retail",
            request_type: "General Retail",
            request_name: "Siti Nurhaliza",
            uraian: "Asuransi kesehatan individu",
            ex_polis: "",
            no_request: "REQ-2023-004",
            no_polis: "POL-2023-020",
            status: "Realisasi",
            keterangan: "Polis sudah terbit",
            created_at: "2023-06-18 11:20:00",
            updated_at: "2023-06-21 16:45:00"
        },
        {
            id: 5,
            tanggal: "2023-06-17",
            type_business: "New Business",
            id_marketing: 1,
            segment: "Corporate",
            request_type: "Leasing",
            request_name: "PT. Finance Indonesia",
            uraian: "Asuransi kredit untuk nasabah leasing",
            ex_polis: "",
            no_request: "REQ-2023-005",
            no_polis: "POL-2023-025",
            status: "Pending",
            keterangan: "Menunggu persetujuan komite",
            created_at: "2023-06-17 14:30:00",
            updated_at: "2023-06-22 10:00:00"
        }
    ];
    
    // Add more sample data to reach 100 records
    for (let i = 6; i <= 100; i++) {
        const randomIndex = Math.floor(Math.random() * 5);
        const randomStatus = ["Realisasi", "Pending", "Batal"][Math.floor(Math.random() * 3)];
        const randomType = ["New Business", "Endorsment", "Renewal"][Math.floor(Math.random() * 3)];
        const randomSegment = ["Corporate", "Retail"][Math.floor(Math.random() * 2)];
        const randomRequestType = ["Bank", "General Corporate", "Broker", "Agent", "General Retail", "Leasing"][Math.floor(Math.random() * 6)];
        const randomMarketing = Math.floor(Math.random() * 4) + 1;
        
        sampleData.push({
            id: i,
            tanggal: `2023-06-${i < 10 ? '0' + i : i}`,
            type_business: randomType,
            id_marketing: randomMarketing,
            segment: randomSegment,
            request_type: randomRequestType,
            request_name: `Requestor ${i}`,
            uraian: `Uraian untuk aplikasi ${i}`,
            ex_polis: i % 3 === 0 ? `POL-2022-${100 + i}` : "",
            no_request: `REQ-2023-${i < 10 ? '00' + i : i < 100 ? '0' + i : i}`,
            no_polis: randomStatus === "Realisasi" ? `POL-2023-${100 + i}` : "",
            status: randomStatus,
            keterangan: `Keterangan untuk aplikasi ${i}`,
            created_at: `2023-06-${i < 10 ? '0' + i : i} ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:00`,
            updated_at: `2023-06-${i < 10 ? '0' + i : i} ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:00`
        });
    }
    
    // Variables
    let currentPage = 1;
    const recordsPerPage = 10;
    let filteredData = [...sampleData];
    let deleteId = null;
    
    // DOM Elements
    const tableBody = document.getElementById('tableBody');
    const pageNumbers = document.getElementById('pageNumbers');
    const startRecord = document.getElementById('startRecord');
    const endRecord = document.getElementById('endRecord');
    const totalRecords = document.getElementById('totalRecords');
    const formModal = document.getElementById('formModal');
    const viewModal = document.getElementById('viewModal');
    const deleteModal = document.getElementById('deleteModal');
    const applicationForm = document.getElementById('applicationForm');
    const advancedSearch = document.getElementById('advancedSearch');
    const toggleIcon = document.getElementById('toggleIcon');
    const viewContent = document.getElementById('viewContent');
    
    // Toggle advanced search
    document.getElementById('toggleAdvancedSearch').addEventListener('click', function() {
        advancedSearch.classList.toggle('hidden');
        toggleIcon.classList.toggle('rotate-180');
    });
    
    // Apply filter
    document.getElementById('applyFilter').addEventListener('click', function() {
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const marketingFilter = document.getElementById('marketingFilter').value;
        const requestorFilter = document.getElementById('requestorFilter').value.toLowerCase();
        
        filteredData = sampleData.filter(item => {
            let matchDate = true;
            let matchStatus = !statusFilter || item.status === statusFilter;
            let matchMarketing = !marketingFilter || item.id_marketing == marketingFilter;
            let matchRequestor = !requestorFilter || item.request_name.toLowerCase().includes(requestorFilter);
            
            if (dateFrom && dateTo) {
                const itemDate = new Date(item.tanggal);
                const fromDate = new Date(dateFrom);
                const toDate = new Date(dateTo);
                matchDate = itemDate >= fromDate && itemDate <= toDate;
            }
            
            return matchDate && matchStatus && matchMarketing && matchRequestor;
        });
        
        currentPage = 1;
        renderTable();
    });
    
    // Reset filter
    document.getElementById('resetFilter').addEventListener('click', function() {
        document.getElementById('dateFrom').value = '';
        document.getElementById('dateTo').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('marketingFilter').value = '';
        document.getElementById('requestorFilter').value = '';
        
        filteredData = [...sampleData];
        currentPage = 1;
        renderTable();
    });
    
    // Search all
    document.getElementById('searchAll').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm) {
            filteredData = sampleData.filter(item => {
                return Object.values(item).some(val => 
                    String(val).toLowerCase().includes(searchTerm)
                );
            });
        } else {
            filteredData = [...sampleData];
        }
        
        currentPage = 1;
        renderTable();
    });
    
    // Add button
    document.getElementById('addBtn').addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Tambah Aplikasi Baru';
        applicationForm.reset();
        
        // Set current datetime for created_at
        const now = new Date();
        const formattedDateTime = now.toISOString().slice(0, 16);
        document.getElementById('created_at').value = formattedDateTime;
        document.getElementById('updated_at').value = formattedDateTime;
        
        formModal.classList.remove('hidden');
    });
    
    // Close modal
    document.getElementById('closeModal').addEventListener('click', function() {
        formModal.classList.add('hidden');
    });
    
    document.getElementById('cancelBtn').addEventListener('click', function() {
        formModal.classList.add('hidden');
    });
    
    // Close view modal
    document.getElementById('closeViewModal').addEventListener('click', function() {
        viewModal.classList.add('hidden');
    });
    
    document.getElementById('closeViewBtn').addEventListener('click', function() {
        viewModal.classList.add('hidden');
    });
    
    // Delete modal
    document.getElementById('cancelDelete').addEventListener('click', function() {
        deleteModal.classList.add('hidden');
        deleteId = null;
    });
    
    document.getElementById('confirmDelete').addEventListener('click', function() {
        if (deleteId) {
            // Find and remove the item
            const index = filteredData.findIndex(item => item.id === deleteId);
            if (index !== -1) {
                filteredData.splice(index, 1);
                
                // Also remove from original data
                const originalIndex = sampleData.findIndex(item => item.id === deleteId);
                if (originalIndex !== -1) {
                    sampleData.splice(originalIndex, 1);
                }
                
                renderTable();
            }
            
            deleteModal.classList.add('hidden');
            deleteId = null;
        }
    });
    
    // Form submit
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(applicationForm);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // If id exists, update existing record
        if (data.id) {
            const index = filteredData.findIndex(item => item.id == data.id);
            if (index !== -1) {
                // Update timestamp
                const now = new Date();
                data.updated_at = now.toISOString().slice(0, 16).replace('T', ' ');
                
                filteredData[index] = { ...filteredData[index], ...data };
                
                // Also update in original data
                const originalIndex = sampleData.findIndex(item => item.id == data.id);
                if (originalIndex !== -1) {
                    sampleData[originalIndex] = { ...sampleData[originalIndex], ...data };
                }
            }
        } else {
            // Add new record
            const newId = Math.max(...sampleData.map(item => item.id)) + 1;
            data.id = newId;
            data.tanggal = new Date().toISOString().slice(0, 10);
            
            // Add to both arrays
            sampleData.push(data);
            filteredData.push(data);
        }
        
        formModal.classList.add('hidden');
        renderTable();
    });
    
    // Print button
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
    });
    
    // Render table
    function renderTable() {
        // Calculate pagination
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = Math.min(startIndex + recordsPerPage, filteredData.length);
        const displayData = filteredData.slice(startIndex, endIndex);
        
        // Clear table
        tableBody.innerHTML = '';
        
        // Add rows
        displayData.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'table-row-hover';
            
            // Status badge class
            let statusClass = '';
            if (item.status === 'Pending') {
                statusClass = 'status-pending';
            } else if (item.status === 'Realisasi') {
                statusClass = 'status-realisasi';
            } else if (item.status === 'Batal') {
                statusClass = 'status-batal';
            }
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="action-btn view-btn" onclick="viewRecord(${item.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editRecord(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteRecord(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.tanggal}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.type_business}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.id_marketing}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.segment}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.request_type}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-truncate">${item.request_name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-truncate">${item.uraian}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.ex_polis}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.no_request}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.no_polis}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="status-badge ${statusClass}">${item.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-truncate">${item.keterangan}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.created_at}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.updated_at}</td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Update pagination info
        startRecord.textContent = filteredData.length > 0 ? startIndex + 1 : 0;
        endRecord.textContent = endIndex;
        totalRecords.textContent = filteredData.length;
        
        // Render pagination buttons
        renderPagination(totalPages);
    }
    
    // Render pagination
    function renderPagination(totalPages) {
        pageNumbers.innerHTML = '';
        
        // Calculate page range to display
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageButton.textContent = i;
            pageButton.addEventListener('click', function() {
                currentPage = i;
                renderTable();
            });
            pageNumbers.appendChild(pageButton);
        }
        
        // Previous/Next buttons
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
        document.getElementById('prevPageMobile').disabled = currentPage === 1;
        document.getElementById('nextPageMobile').disabled = currentPage === totalPages || totalPages === 0;
    }
    
    // View record
    window.viewRecord = function(id) {
        const item = filteredData.find(item => item.id === id);
        if (!item) return;
        
        // Status badge class
        let statusClass = '';
        if (item.status === 'Pending') {
            statusClass = 'status-pending';
        } else if (item.status === 'Realisasi') {
            statusClass = 'status-realisasi';
        } else if (item.status === 'Batal') {
            statusClass = 'status-batal';
        }
        
        viewContent.innerHTML = `
            <table class="min-w-full divide-y divide-gray-200">
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">ID</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.id}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tanggal</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.tanggal}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Type Business</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.type_business}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ID Marketing</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.id_marketing}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Segment</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.segment}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Request Type</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.request_type}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Request Name</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.request_name}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Uraian</td>
                        <td class="px-6 py-4 text-sm text-gray-900">${item.uraian}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Ex Polis</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.ex_polis}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No Request</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.no_request}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No Polis</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.no_polis}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Status</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                            <span class="status-badge ${statusClass}">${item.status}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Keterangan</td>
                        <td class="px-6 py-4 text-sm text-gray-900">${item.keterangan}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Created At</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.created_at}</td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Updated At</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.updated_at}</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        viewModal.classList.remove('hidden');
    };
    
    // Edit record
    window.editRecord = function(id) {
        const item = filteredData.find(item => item.id === id);
        if (!item) return;
        
        document.getElementById('modalTitle').textContent = 'Edit Aplikasi';
        
        // Fill form with data
        document.getElementById('id').value = item.id;
        document.getElementById('tanggal').value = item.tanggal;
        document.getElementById('type_business').value = item.type_business;
        document.getElementById('id_marketing').value = item.id_marketing;
        document.getElementById('segment').value = item.segment;
        document.getElementById('request_type').value = item.request_type;
        document.getElementById('request_name').value = item.request_name;
        document.getElementById('uraian').value = item.uraian;
        document.getElementById('ex_polis').value = item.ex_polis;
        document.getElementById('no_request').value = item.no_request;
        document.getElementById('no_polis').value = item.no_polis;
        document.getElementById('status').value = item.status;
        document.getElementById('keterangan').value = item.keterangan;
        document.getElementById('created_at').value = item.created_at.replace(' ', 'T');
        document.getElementById('updated_at').value = item.updated_at.replace(' ', 'T');
        
        formModal.classList.remove('hidden');
    };
    
    // Delete record
    window.deleteRecord = function(id) {
        deleteId = id;
        deleteModal.classList.remove('hidden');
    };
    
    // Pagination buttons
    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });
    
    document.getElementById('prevPageMobile').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });
    
    document.getElementById('nextPageMobile').addEventListener('click', function() {
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });
    
    // Initial render
    renderTable();
});
