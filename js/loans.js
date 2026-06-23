// Loans Management

let loansList = [];

// Initialize Loans
document.addEventListener('DOMContentLoaded', function() {
    loadLoans();
    
    const loanSearch = document.getElementById('loanSearch');
    if (loanSearch) {
        loanSearch.addEventListener('input', debounce(searchLoans, 300));
    }
});

// Load Loans
async function loadLoans() {
    try {
        if (typeof db !== 'undefined') {
            const snapshot = await db.collection('loans')
                .orderBy('createdAt', 'desc')
                .get();
            
            loansList = [];
            snapshot.forEach(doc => {
                loansList.push({ id: doc.id, ...doc.data() });
            });
            
            displayLoans(loansList);
            updateLoanStats();
        }
    } catch (error) {
        console.error('Error loading loans:', error);
        showNotification('خطأ في تحميل القروض', 'error');
    }
}

// Display Loans
function displayLoans(loans) {
    const tbody = document.getElementById('loansTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (loans.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: var(--spacing-lg);"لا توجد بيانات</td></tr>';
        return;
    }
    
    loans.forEach(loan => {
        const row = document.createElement('tr');
        const statusClass = `status-${loan.status}`;
        const statusText = getLoanStatusText(loan.status);
        
        row.innerHTML = `
            <td>${loan.memberName}</td>
            <td>${formatCurrency(loan.amount)}</td>
            <td>${loan.numberOfInstallments}</td>
            <td>${formatCurrency(loan.monthlyPayment)}</td>
            <td>${formatDate(loan.createdAt)}</td>
            <td><span class="loan-status ${statusClass}">${statusText}</span></td>
            <td>
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="viewLoanDetails('${loan.id}')"تفاصيل</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Get Loan Status Text
function getLoanStatusText(status) {
    const statuses = {
        'pending': 'قيد مراجعة',
        'approved': 'معتمد',
        'rejected': 'مرفوض',
        'completed': 'مكتمل'
    };
    return statuses[status] || status;
}

// Update Loan Statistics
function updateLoanStats() {
    const activeLoans = loansList.filter(l => l.status !== 'completed' && l.status !== 'rejected');
    const totalAmount = loansList.reduce((sum, l) => sum + (l.amount || 0), 0);
    const totalPaid = loansList.reduce((sum, l) => sum + (l.amountPaid || 0), 0);
    
    const activeLoansEl = document.getElementById('totalActiveLoans');
    if (activeLoansEl) activeLoansEl.textContent = activeLoans.length;
    
    const totalAmountEl = document.getElementById('totalLoanAmount');
    if (totalAmountEl) totalAmountEl.textContent = formatCurrency(totalAmount);
    
    const totalPaidEl = document.getElementById('totalLoanPaid');
    if (totalPaidEl) totalPaidEl.textContent = formatCurrency(totalPaid);
}

// Search Loans
function searchLoans(e) {
    const query = e.target.value.toLowerCase();
    
    const filtered = loansList.filter(loan => 
        loan.memberName.toLowerCase().includes(query) ||
        (loan.id && loan.id.includes(query))
    );
    
    displayLoans(filtered);
}

// Show Add Loan Form
function showAddLoanForm() {
    alert('سيتم إضافة نموذج طلب قرض قريباً');
}

// View Loan Details
function viewLoanDetails(loanId) {
    alert(`View loan details: ${loanId}`);
}