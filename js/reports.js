// Reports Module

let reportCharts = {};

// Initialize Reports
document.addEventListener('DOMContentLoaded', function() {
    loadReportsData();
    setupReportTabs();
});

// Setup Report Tabs
function setupReportTabs() {
    const reportTabs = document.querySelectorAll('.report-tab');
    reportTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchReportTab(tabName);
        });
    });
}

// Switch Report Tab
function switchReportTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.report-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.report-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const content = document.getElementById(`${tabName}-tab`);
    if (content) {
        content.classList.add('active');
    }
    
    // Mark button as active
    event.target.classList.add('active');
    
    // Initialize chart if needed
    if (tabName === 'subscriptions') {
        initSubscriptionsChart();
    } else if (tabName === 'loans') {
        initLoansChart();
    } else if (tabName === 'members') {
        initMembersChart();
    }
}

// Load Reports Data
async function loadReportsData() {
    try {
        if (typeof db !== 'undefined') {
            // Load statistics
            const statsSnapshot = await db.collection('statistics').doc('current').get();
            if (statsSnapshot.exists) {
                updateFinancialReport(statsSnapshot.data());
            }
        }
    } catch (error) {
        console.error('Error loading reports:', error);
    }
}

// Update Financial Report
function updateFinancialReport(data) {
    const totalRevenue = data.totalSubscriptions || 0;
    const totalExpenses = data.totalExpenses || 0;
    const netBalance = totalRevenue - totalExpenses;
    
    const revenueEl = document.getElementById('reportTotalRevenue');
    const expensesEl = document.getElementById('reportTotalExpenses');
    const balanceEl = document.getElementById('reportNetBalance');
    
    if (revenueEl) revenueEl.textContent = formatCurrency(totalRevenue);
    if (expensesEl) expensesEl.textContent = formatCurrency(totalExpenses);
    if (balanceEl) balanceEl.textContent = formatCurrency(netBalance);
    
    // Initialize financial chart
    initFinancialChart(totalRevenue, totalExpenses, netBalance);
}

// Initialize Financial Chart
function initFinancialChart(revenue, expenses, balance) {
    const ctx = document.getElementById('financialChart');
    if (!ctx) return;
    
    if (reportCharts.financial) {
        reportCharts.financial.destroy();
    }
    
    reportCharts.financial = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['الإيرادات', 'المصروفات', 'الرصيد'],
            datasets: [{
                label: 'المبلغ',
                data: [revenue, expenses, balance],
                backgroundColor: ['#51CF66', '#FF6B6B', '#D4AF37'],
                borderColor: ['#51CF66', '#FF6B6B', '#D4AF37'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    });
}

// Initialize Subscriptions Chart
function initSubscriptionsChart() {
    const ctx = document.getElementById('subscriptionsReportChart');
    if (!ctx) return;
    
    if (reportCharts.subscriptions) {
        reportCharts.subscriptions.destroy();
    }
    
    reportCharts.subscriptions = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'الاشتراكات الشهرية',
                data: [12000, 15000, 14000, 18000, 20000, 22000],
                borderColor: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// Initialize Loans Chart
function initLoansChart() {
    const ctx = document.getElementById('loansReportChart');
    if (!ctx) return;
    
    if (reportCharts.loans) {
        reportCharts.loans.destroy();
    }
    
    reportCharts.loans = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['معتمد', 'قيد المراجعة', 'مرفوض'],
            datasets: [{
                data: [8, 5, 2],
                backgroundColor: ['#51CF66', '#FFD43B', '#FF6B6B']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize Members Chart
function initMembersChart() {
    const ctx = document.getElementById('membersReportChart');
    if (!ctx) return;
    
    if (reportCharts.members) {
        reportCharts.members.destroy();
    }
    
    reportCharts.members = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['أعضاء نشطاء', 'أعضاء غير نشطاء', 'أعضاء موقوفة'],
            datasets: [{
                label: 'عدد الأعضاء',
                data: [45, 15, 5],
                backgroundColor: '#D4AF37',
                borderColor: '#0F172A',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Export Report as PDF
function exportReportPDF() {
    alert('سيتم إضافة وظيفة التصدير PDF قريباً');
}

// Export Report as Excel
function exportReportExcel() {
    alert('سيتم إضافة وظيفة التصدير Excel قريباً');
}