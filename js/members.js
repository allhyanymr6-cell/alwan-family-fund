// Members Management Module

let membersList = [];

// Initialize Members Page
document.addEventListener('DOMContentLoaded', function() {
    loadMembers();
    
    const memberSearch = document.getElementById('memberSearch');
    if (memberSearch) {
        memberSearch.addEventListener('input', debounce(searchMembers, 300));
    }
});

// Load Members
async function loadMembers() {
    try {
        if (typeof db !== 'undefined') {
            const snapshot = await db.collection('members')
                .where('status', '==', 'active')
                .get();
            
            membersList = [];
            snapshot.forEach(doc => {
                membersList.push({ id: doc.id, ...doc.data() });
            });
            
            displayMembers(membersList);
        }
    } catch (error) {
        console.error('Error loading members:', error);
        showNotification('خطأ في تحميل الأعضاء', 'error');
    }
}

// Display Members
function displayMembers(members) {
    const container = document.getElementById('membersGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (members.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>لا توجد بيانات للعرض</p></div>';
        return;
    }
    
    members.forEach(member => {
        const card = createMemberCard(member);
        container.appendChild(card);
    });
}

// Create Member Card
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    const statusClass = `status-${member.status}`;
    const statusText = getStatusText(member.status);
    const initials = getInitials(member.name);
    
    card.innerHTML = `
        <div class="member-header">
            <div class="member-avatar">${initials}</div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.email}</p>
                <span class="member-status ${statusClass}">${statusText}</span>
            </div>
        </div>
        
        <div class="member-details">
            <div class="detail-item">
                <i class="fas fa-id-card"></i>
                <span>${member.idNumber}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-phone"></i>
                <span>${member.phone}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-calendar"></i>
                <span>انجم ع يوم: ${formatDate(member.joinDate)}</span>
            </div>
        </div>
        
        <div class="member-actions">
            <button class="btn btn-primary" onclick="editMember('${member.id}')">
                <i class="fas fa-edit"></i> تعديل
            </button>
            <button class="btn btn-danger" onclick="deleteMember('${member.id}')">
                <i class="fas fa-trash"></i> حذف
            </button>
        </div>
    `;
    
    return card;
}

// Get Status Text
function getStatusText(status) {
    const statuses = {
        'active': 'نشط',
        'inactive': 'غير نشط',
        'suspended': 'موقوف'
    };
    return statuses[status] || status;
}

// Search Members
function searchMembers(e) {
    const query = e.target.value.toLowerCase();
    
    const filtered = membersList.filter(member => 
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.phone.includes(query)
    );
    
    displayMembers(filtered);
}

// Show Add Member Form
function showAddMemberForm() {
    alert('سيتم إضافة نموذج إضافة عضو قريباً');
}

// Edit Member
function editMember(memberId) {
    alert(`Edit member: ${memberId}`);
}

// Delete Member
function deleteMember(memberId) {
    if (confirm('هل أنت متأكد من حذف العضو؟')) {
        alert(`Delete member: ${memberId}`);
    }
}