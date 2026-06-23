// Utility Functions

// Toggle Password Visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const icon = event.target.closest('button').querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Show Notification
function showNotification(message, type = 'info') {
  const container = document.getElementById('messageContainer') || createMessageContainer();
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
    <button class="close-btn" onclick="this.parentElement.remove()">&times;</button>
  `;
  
  container.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Create Message Container
function createMessageContainer() {
  const container = document.createElement('div');
  container.id = 'messageContainer';
  container.className = 'message-container';
  document.body.appendChild(container);
  return container;
}

// Format Currency
function formatCurrency(amount, currency = 'SR') {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Format Date
function formatDate(date, format = 'DD/MM/YYYY') {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  switch(format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    default:
      return `${day}/${month}/${year}`;
  }
}

// Generate Unique ID
function generateUniqueId() {
  return 'ID_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Validate Email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate Phone
function validatePhone(phone) {
  const re = /^[0-9]{9,15}$/;
  return re.test(phone.replace(/\s/g, '').replace(/[-()]/g, ''));
}

// Validate ID Number
function validateIdNumber(id) {
  const re = /^[0-9]{9,10}$/;
  return re.test(id);
}

// Calculate Installments
function calculateInstallments(loanAmount, numberOfMonths, interestRate = 0) {
  const monthlyInterestRate = interestRate / 100 / 12;
  const monthlyPayment = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths))) / 
                         (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
  return Math.round(monthlyPayment * 100) / 100;
}

// Get Initials from Name
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

// Debounce Function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Local Storage Helpers
const StorageHelper = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear()
};