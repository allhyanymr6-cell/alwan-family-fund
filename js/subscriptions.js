// Subscriptions Management

let subscriptionsList = [];

// Initialize Subscriptions
document.addEventListener('DOMContentLoaded', function() {
    loadSubscriptions();
    
    const statusFilter = document.getElementById('statusFilter');
    const monthFilter = document.getElementById('monthFilter');
    
    if (statusFilter) statusFilter.addEventListener('change', filterSubscriptions);
    if (monthFilter) monthFilter.addEventListener('change', filterSubscriptions);
});

// Load Subscriptions
async function loadSubscriptions() {
    try {
        if (typeof db !== 'undefined') {
            const snapshot = await db.collection('subscriptions')
                .orderBy('date', 'desc')
                .get();
            
            subscriptionsList = [];
            snapshot.forEach(doc => {
                subscriptionsList.push({ id: doc.id, ...doc.data() });
            });
            
            displaySubscriptions(subscriptionsList);
        }
    } catch (error) {
        console.error('Error loading subscriptions:', error);
        showNotification('خطأ في تحميل الاشتراكات', 'error');
    }
}

// Display Subscriptions
function displaySubscriptions(subscriptions) {
    const tbody = document.getElementById('subscriptionsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (subscriptions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: var(--spacing-lg);"لا توجد بيانات</td></tr>';
        return;
    }
    
    subscriptions.forEach(subscription => {
        const row = document.createElement('tr');
        const statusClass = `status-${subscription.status}`;
        const statusText = getSubscriptionStatusText(subscription.status);
        
        row.innerHTML = `
            <td>${subscription.memberName}</td>
            <td>${subscription.month}</td>
            <td>${formatCurrency(subscription.amount)}</td>
            <td>${formatDate(subscription.date)}</td>
            <td><span class="subscription-status ${statusClass}">${statusText}</span></td>
            <td>
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="editSubscription('${subscription.id}')">تعديل</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Get Subscription Status Text
function getSubscriptionStatusText(status) {
    const statuses = {
        'paid': 'مدفوع',
        'pending': 'قيد الانتظار',
        'overdue': 'متأخر'
    };
    return statuses[status] || status;
}

// Filter Subscriptions
function filterSubscriptions() {
    const statusFilter = document.getElementById('statusFilter').value;
    const monthFilter = document.getElementById('monthFilter').value;
    
    const filtered = subscriptionsList.filter(subscription => {
        const statusMatch = !statusFilter || subscription.status === statusFilter;
        const monthMatch = !monthFilter || subscription.month === monthFilter;
        return statusMatch && monthMatch;
    });
    
    displaySubscriptions(filtered);
}

// Show Add Subscription Form
function showAddSubscriptionForm() {
    alert('سيتم إضافة نموذج إضافة اشتراك قريباً');
}

// Edit Subscription
function editSubscription(subscriptionId) {
    alert(`Edit subscription: ${subscriptionId}`);
}