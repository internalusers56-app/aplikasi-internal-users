document.addEventListener('DOMContentLoaded', function() {
    // Sample data
    const sampleData = [
        {
            IDPengiriman: 1,
            NoSuratKirim: "KRM-2023-001",
            id_marketing: 1,
            NamaNasabah: "PT. Sejahtera Bersama",
            AlamatNasabah: "Jl. Sudirman No. 123, Jakarta Pusat",
            InformasiPengiriman: "Dokumen polis asuransi kantor pusat",
            Tanggal_Kirim: "2023-06-20",
            Jasa_Ekspedisi: "JNE",
            No_Resi: "JNE001234567890",
            Status_Pengiriman: "Terkirim",
            Tgl_Diterima_Nasabah: "2023-06-22",
            nama_penerima: "Bagian HRD",
            created_at: "2023-06-20 09:00:00",
            updated_at: "2023-06-22 14:30:00"
        },
        {
            IDPengiriman: 2,
            NoSuratKirim: "KRM-2023-002",
            id_marketing: 2,
            NamaNasabah: "Budi Santoso",
            AlamatNasabah: "Jl. Gatot Subroto No. 456, Jakarta Selatan",
            InformasiPengiriman: "Polis asuransi kendaraan",
            Tanggal_Kirim: "2023-06-21",
            Jasa_Ekspedisi: "TIKI",
            No_Resi: "TIKI098765432100",
            Status_Pengiriman: "Dalam Perjalanan",
            Tgl_Diterima_Nasabah: "",
            nama_penerima: "",
            created_at: "2023-06-21 10:30:00",
            updated_at: "2023-06-21 10:30:00"
        },
        {
            IDPengiriman: 3,
            NoSuratKirim: "KRM-2023-003",
            id_marketing: 3,
            NamaNasabah: "Siti Nurhaliza",
            AlamatNasabah: "Jl. Thamrin No. 789, Jakarta Pusat",
            InformasiPengiriman: "Polis asuransi kesehatan",
            Tanggal_Kirim: "2023-06-19",
            Jasa_Ekspedisi: "SiCepat",
            No_Resi: "SC001122334455",
            Status_Pengiriman: "Dikirim",
            Tgl_Diterima_Nasabah: "",
            nama_penerima: "",
            created_at: "2023-06-19 13:45:00",
            updated_at: "2023-06-19 13:45:00"
        }
    ];
    
    // Add more sample data to reach 100 records
    for (let i = 4; i <= 100; i++) {
        const randomStatus = ["Dikirim", "Dalam Perjalanan", "Terkirim"][Math.floor(Math.random() * 3)];
        const randomEkspedisi = ["JNE", "TIKI", "SiCepat", "J&T", "AnterAja", "Wahana", "Ninja Xpress"][Math.floor(Math.random() * 7)];
        const randomMarketing = Math.floor(Math.random() * 4) + 1;
        
        const tglKirim = new Date(2023, 5, Math.floor(Math.random() * 30) + 1);
        const tglDiterima = randomStatus === "Terkirim" ? new Date(tglKirim.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000) : null;
        
        sampleData.push({
            IDPengiriman: i,
            NoSuratKirim: `KRM-2023-${i < 10 ? '00' + i : i < 100 ? '0' + i : i}`,
            id_marketing: randomMarketing,
            NamaNasabah: `Nasabah ${i}`,
            AlamatNasabah: `Alamat Nasabah ${i}, Jakarta`,
            InformasiPengiriman: `Informasi pengiriman untuk pengiriman ${i}`,
            Tanggal_Kirim: tglKirim.toISOString().slice(0, 10),
            Jasa_Ekspedisi: randomEkspedisi,
            No_Resi: `${randomEkspedisi.substring(0, 2).toUpperCase()}${1000000000 + i}`,
            Status_Pengiriman: randomStatus,
            Tgl_Diterima_Nasabah: tglDiterima ? tglDiterima.toISOString().slice(0, 10) : "",
            nama_penerima: randomStatus === "Terkirim" ? `Penerima ${i}` : "",
            created_at: tglKirim.toISOString().slice(0, 19).replace('T', ' '),
            updated_at: tglDiterima ? tglDiterima.toISOString().slice(0, 19).replace('T', ' ') : tglKirim.toISOString().slice(0, 19).replace('T', ' ')
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
    const pengirimanForm = document.getElementById('pengirimanForm');
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
        const nasabahFilter = document.getElementById('nasabahFilter').value.toLowerCase();
        
        filteredData = sampleData.filter(item => {
            let matchDate = true;
            let matchStatus = !statusFilter || item.Status_Pengiriman === statusFilter;
            let matchMarketing = !marketingFilter || item.id_marketing == marketingFilter;
            let matchNasabah = !nasabahFilter || item.NamaNasabah.toLowerCase().includes(nasabahFilter);
            
            if (dateFrom && dateTo) {
                const itemDate = new Date(item.Tanggal_Kirim);
                const fromDate = new Date(dateFrom);
                const toDate = new Date(dateTo);
                matchDate = itemDate >= fromDate && itemDate <= toDate;
            }
            
            return matchDate && matchStatus && matchMarketing && matchNasabah;
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
        document.getElementById('nasabahFilter').value = '';
        
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
        document.getElementById('modalTitle').textContent = 'Tambah Data Pengiriman Baru';
        pengirimanForm.reset();
        
        // Set current datetime for created_at and updated_at
        const now = new Date();
        const formattedDateTime = now.toISOString().slice(0, 16);
        document.getElementById('created_at').value = formattedDateTime.replace('T', ' ');
        document.getElementById('updated_at').value = formattedDateTime.replace('T', ' ');
        
        // Set default date for Tanggal_Kirim
        document.getElementById('Tanggal_Kirim').value = now.toISOString().slice(0, 10);
        
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
            const index = filteredData.findIndex(item => item.IDPengiriman === deleteId);
            if (index !== -1) {
                filteredData.splice(index, 1);
                
                const originalIndex = sampleData.findIndex(item => item.IDPengiriman === deleteId);
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
    pengirimanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(pengirimanForm);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        if (data.IDPengiriman) {
            const index = filteredData.findIndex(item => item.IDPengiriman == data.IDPengiriman);
            if (index !== -1) {
                const now = new Date();
                data.updated_at = now.toISOString().slice(0, 19).replace('T', ' ');
                
                filteredData[index] = { ...filteredData[index], ...data };
                
                const originalIndex = sampleData.findIndex(item => item.IDPengiriman == data.IDPengiriman);
                if (originalIndex !== -1) {
                    sampleData[originalIndex] = { ...sampleData[originalIndex], ...data };
                }
            }
        } else {
            const newId = Math.max(...sampleData.map(item => item.IDPengiriman)) + 1;
            data.IDPengiriman = newId;
            
            const now = new Date();
            data.created_at = now.toISOString().slice(0, 19).replace('T', ' ');
            data.updated_at = data.created_at;
            
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
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = Math.min(startIndex + recordsPerPage, filteredData.length);
        const displayData = filteredData.slice(startIndex, endIndex);
        
        tableBody.innerHTML = '';
        
        displayData.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'table-row-hover';
            
            let statusClass = '';
            if (item.Status_Pengiriman === 'Dikirim') {
                statusClass = 'status-dikirim';
            } else if (item.Status_Pengiriman === 'Dalam Perjalanan') {
                statusClass = 'status-dalam-perjalanan';
            } else if (item.Status_Pengiriman === 'Terkirim') {
                statusClass = 'status-terkirim';
            }
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="action-btn view-btn" onclick="viewRecord(${item.IDPengiriman})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editRecord(${item.IDPengiriman})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteRecord(${item.IDPengiriman})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.IDPengiriman}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.NoSuratKirim}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.id_marketing}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-truncate">${item.NamaNasabah}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-truncate">${item.AlamatNasabah}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.Tanggal_Kirim}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.Jasa_Ekspedisi}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.No_Resi}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="status-badge ${statusClass}">${item.Status_Pengiriman}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.Tgl_Diterima_Nasabah || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-truncate">${item.nama_penerima || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.updated_at}</td>
            `;
            
            tableBody.appendChild(row);
        });
        
        startRecord.textContent = filteredData.length > 0 ? startIndex + 1 : 0;
        endRecord.textContent = endIndex;
        totalRecords.textContent = filteredData.length;
        
        renderPagination(totalPages);
    }
    
    // Render pagination
    function renderPagination(totalPages) {
        pageNumbers.innerHTML = '';
        
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
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
        
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
        document.getElementById('prevPageMobile').disabled = currentPage === 1;
        document.getElementById('nextPageMobile').disabled = currentPage === totalPages || totalPages === 0;
    }
    
    // View record
    window.viewRecord = function(id) {
        const item = filteredData.find(item => item.IDPengiriman === id);
        if (!item) return;
        
        let statusClass = '';
        if (item.Status_Pengiriman === 'Dikirim') {
            statusClass = 'status-dikirim';
        } else if (item.Status_Pengiriman === 'Dalam Perjalanan') {
            statusClass = 'status-dalam-perjalanan';
        } else if (item.Status_Pengiriman === 'Terkirim') {
            statusClass = 'status-terkirim';
        }
        
        viewContent.innerHTML = `
            <table class="min-w-full divide-y divide-gray-200">
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">ID Pengiriman</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.IDPengiriman}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No Surat Kirim</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.NoSuratKirim}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ID Marketing</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.id_marketing}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Nama Nasabah</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.NamaNasabah}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Alamat Nasabah</td><td class="px-6 py-4 text-sm text-gray-900">${item.AlamatNasabah}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Informasi Pengiriman</td><td class="px-6 py-4 text-sm text-gray-900">${item.InformasiPengiriman}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tanggal Kirim</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.Tanggal_Kirim}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jasa Ekspedisi</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.Jasa_Ekspedisi}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">No Resi</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.No_Resi}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Status Pengiriman</td><td class="px-6 py-4 whitespace-nowrap text-sm"><span class="status-badge ${statusClass}">${item.Status_Pengiriman}</span></td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tanggal Diterima</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.Tgl_Diterima_Nasabah || '-'}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Nama Penerima</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.nama_penerima || '-'}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Created At</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.created_at}</td></tr>
                    <tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Updated At</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.updated_at}</td></tr>
                </tbody>
            </table>
        `;
        
        viewModal.classList.remove('hidden');
    };
    
    // Edit record
    window.editRecord = function(id) {
        const item = filteredData.find(item => item.IDPengiriman === id);
        if (!item) return;
        
        document.getElementById('modalTitle').textContent = 'Edit Data Pengiriman';
        
        document.getElementById('IDPengiriman').value = item.IDPengiriman;
        document.getElementById('NoSuratKirim').value = item.NoSuratKirim;
        document.getElementById('id_marketing').value = item.id_marketing;
        document.getElementById('NamaNasabah').value = item.NamaNasabah;
        document.getElementById('AlamatNasabah').value = item.AlamatNasabah;
        document.getElementById('InformasiPengiriman').value = item.InformasiPengiriman;
        document.getElementById('Tanggal_Kirim').value = item.Tanggal_Kirim;
        document.getElementById('Jasa_Ekspedisi').value = item.Jasa_Ekspedisi;
        document.getElementById('No_Resi').value = item.No_Resi;
        document.getElementById('Status_Pengiriman').value = item.Status_Pengiriman;
        document.getElementById('Tgl_Diterima_Nasabah').value = item.Tgl_Diterima_Nasabah;
        document.getElementById('nama_penerima').value = item.nama_penerima;
        document.getElementById('created_at').value = item.created_at;
        document.getElementById('updated_at').value = item.updated_at;
        
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
