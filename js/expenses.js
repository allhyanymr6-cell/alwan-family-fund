// Expenses Management

let expensesList = [];

// Initialize Expenses
document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    
    const expenseSearch = document.getElementById('expenseSearch');
    if (expenseSearch) {
        expenseSearch.addEventListener('input', debounce(searchExpenses, 300));
    }
});

// Load Expenses
async function loadExpenses() {
    try {
        if (typeof db !== 'undefined') {
            const snapshot = await db.collection('expenses')
                .orderBy('date', 'desc')
                .get();
            
            expensesList = [];
            snapshot.forEach(doc => {
                expensesList.push({ id: doc.id, ...doc.data() });
            });
            
            displayExpenses(expensesList);
            updateExpenseStats();
        }
    } catch (error) {
        console.error('Error loading expenses:', error);
        showNotification('خطأ في تحميل المصروفات', 'error');
    }
}

// Display Expenses
function displayExpenses(expenses) {
    const tbody = document.getElementById('expensesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (expenses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: var(--spacing-lg);"لا توجد بيانات</td></tr>';
        return;
    }
    
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${expense.description}</td>
            <td><span class="expense-category">${expense.category}</span></td>
            <td>${formatCurrency(expense.amount)}</td>
            <td>${formatDate(expense.date)}</td>
            <td>${expense.notes || '-'}</td>
            <td>
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="editExpense('${expense.id}')"تعديل</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Update Expense Statistics
function updateExpenseStats() {
    const totalAmount = expensesList.reduce((sum, e) => sum + (e.amount || 0), 0);
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const monthlyAmount = expensesList
        .filter(e => {
            const expenseDate = new Date(e.date);
            return expenseDate.getFullYear() === currentYear && 
                   (expenseDate.getMonth() + 1) === currentMonth;
        })
        .reduce((sum, e) => sum + (e.amount || 0), 0);
    
    const totalEl = document.getElementById('totalExpensesAmount');
    if (totalEl) totalEl.textContent = formatCurrency(totalAmount);
    
    const monthlyEl = document.getElementById('monthlyExpenses');
    if (monthlyEl) monthlyEl.textContent = formatCurrency(monthlyAmount);
}

// Search Expenses
function searchExpenses(e) {
    const query = e.target.value.toLowerCase();
    
    const filtered = expensesList.filter(expense => 
        expense.description.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query)
    );
    
    displayExpenses(filtered);
}

// Show Add Expense Form
function showAddExpenseForm() {
    alert('سيتم إضافة نموذج إضافة مصروف قريباً');
}

// Edit Expense
function editExpense(expenseId) {
    alert(`Edit expense: ${expenseId}`);
}