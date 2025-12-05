// main.js - ملف JavaScript الرئيسي لـ Naser Stream - الإصدار 3.5

// =========== تهيئة التطبيق ===========
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    loadVideos();
    updateStats();
    checkUserStatus();
    initAIAssistant();
    updateCharCount();
    checkAdminAccess();
    loadAdminData();
});

// =========== تهيئة التطبيق ===========
function initApp() {
    console.log('🚀 Naser Stream الإصدار 3.5 متاح الآن!');
    
    // إعداد العناصر التفاعلية
    document.getElementById('loginBtn').addEventListener('click', function() {
        openModal('loginModal');
    });
    
    document.getElementById('aiCloseBtn').addEventListener('click', function() {
        toggleAIAssistant();
    });
    
    document.getElementById('menuToggle').addEventListener('click', function() {
        toggleSidebar();
    });
    
    // إضافة تأثيرات للفيديوهات
    initVideoEffects();
    
    // تحميل التفضيلات المحفوظة
    loadPreferences();
    
    // إعداد حدث السحب والإفلات
    setupDragAndDrop();
    
    // تحديث تلقائي للإحصائيات
    setInterval(updateLiveStats, 30000);
}

// =========== بيانات الفيديوهات ===========
let videosData = JSON.parse(localStorage.getItem('naserStreamVideos')) || [
    {
        id: 1,
        title: "تعلم JavaScript من الصفر للإحتراف",
        category: "تعليمي",
        views: 25000,
        likes: 1500,
        comments: 320,
        duration: "15:30",
        uploadDate: "قبل 3 أيام",
        thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "دورة كاملة لتعلم JavaScript مع مشاريع عملية",
        tags: ["برمجة", "ويب", "JS", "تطوير"],
        author: "أحمد البرمجة",
        authorId: 1,
        isPremium: false,
        is360: false,
        isVR: false,
        uploadTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 2,
        title: "أفضل 10 ألعاب 2024",
        category: "ألعاب",
        views: 120000,
        likes: 8500,
        comments: 1250,
        duration: "22:45",
        uploadDate: "قبل أسبوع",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "تعرف على أفضل الألعاب لهذا العام",
        tags: ["ألعاب", "تكنولوجيا", "ترفيه"],
        author: "محمد الألعاب",
        authorId: 2,
        isPremium: false,
        is360: false,
        isVR: true,
        uploadTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 3,
        title: "تحدي الأكل في 10 دقائق",
        category: "ترفيهي",
        views: 350000,
        likes: 25000,
        comments: 3800,
        duration: "12:20",
        uploadDate: "قبل يومين",
        thumbnail: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "تحدي ممتع مع الأصدقاء",
        tags: ["تحدي", "أكل", "ترفيه"],
        author: "قناة التحديات",
        authorId: 3,
        isPremium: false,
        is360: true,
        isVR: false,
        uploadTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 4,
        title: "كورس تطوير تطبيقات الهاتف",
        category: "تعليمي",
        views: 45000,
        likes: 3200,
        comments: 580,
        duration: "45:10",
        uploadDate: "قبل شهر",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "تعلم تطوير تطبيقات الهاتف خطوة بخطوة",
        tags: ["تطبيقات", "موبايل", "برمجة"],
        author: "مدرسة البرمجة",
        authorId: 4,
        isPremium: true,
        is360: false,
        isVR: false,
        uploadTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 5,
        title: "أغاني 2024 الأكثر شهرة",
        category: "موسيقى",
        views: 890000,
        likes: 65000,
        comments: 9200,
        duration: "18:40",
        uploadDate: "قبل 5 أيام",
        thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "أفضل الأغاني العربية والعالمية",
        tags: ["موسيقى", "أغاني", "فن"],
        author: "الموسيقى اليوم",
        authorId: 5,
        isPremium: false,
        is360: false,
        isVR: false,
        uploadTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 6,
        title: "تكنولوجيا الذكاء الاصطناعي 2024",
        category: "تكنولوجيا",
        views: 78000,
        likes: 5400,
        comments: 890,
        duration: "28:15",
        uploadDate: "قبل أسبوعين",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "أحدث تطورات الذكاء الاصطناعي",
        tags: ["AI", "ذكاء اصطناعي", "تكنولوجيا"],
        author: "تكنو فوريو",
        authorId: 6,
        isPremium: false,
        is360: false,
        isVR: true,
        uploadTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    }
];

// =========== إدارة الفيديوهات ===========
function loadVideos() {
    const videosGrid = document.getElementById('videosGrid');
    const recommendedGrid = document.getElementById('recommendedGrid');
    
    if (!videosGrid) return;
    
    videosGrid.innerHTML = '';
    recommendedGrid.innerHTML = '';
    
    // عشوائية الفيديوهات للتوصيات
    const shuffledVideos = [...videosData].sort(() => Math.random() - 0.5);
    
    // تحميل الفيديوهات الرئيسية
    videosData.forEach(video => {
        videosGrid.appendChild(createVideoCard(video));
    });
    
    // تحميل الفيديوهات الموصى بها
    shuffledVideos.slice(0, 3).forEach(video => {
        recommendedGrid.appendChild(createVideoCard(video));
    });
    
    // حفظ الفيديوهات في localStorage
    localStorage.setItem('naserStreamVideos', JSON.stringify(videosData));
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card-3d';
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
            <div class="video-overlay">
                <div class="video-duration">${video.duration}</div>
                ${video.isPremium ? '<div class="video-premium"><i class="fas fa-crown"></i></div>' : ''}
                ${video.is360 ? '<div class="video-360"><i class="fas fa-vr-cardboard"></i> 360°</div>' : ''}
                ${video.isVR ? '<div class="video-vr"><i class="fas fa-vr-cardboard"></i> VR</div>' : ''}
                <button class="play-btn" onclick="playVideo(${video.id})">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
        <div class="video-info">
            <div class="video-meta">
                <div class="video-author">
                    <div class="author-avatar">${video.author.charAt(0)}</div>
                    <span>${video.author}</span>
                </div>
                <button class="video-menu-btn" onclick="showVideoMenu(event, ${video.id})">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
            <h3 class="video-title">${video.title}</h3>
            <div class="video-stats">
                <span><i class="fas fa-eye"></i> ${formatNumber(video.views)}</span>
                <span><i class="fas fa-heart"></i> ${formatNumber(video.likes)}</span>
                <span><i class="fas fa-comment"></i> ${formatNumber(video.comments)}</span>
            </div>
            <div class="video-category">${video.category}</div>
            <div class="video-actions">
                <button class="action-btn like-btn" onclick="likeVideo(${video.id})">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn save-btn" onclick="saveVideo(${video.id})">
                    <i class="fas fa-bookmark"></i>
                </button>
                <button class="action-btn share-btn" onclick="shareVideo(${video.id})">
                    <i class="fas fa-share"></i>
                </button>
                <button class="action-btn vr-btn" onclick="playVideoInVR(${video.id})" ${!video.isVR && !video.is360 ? 'disabled' : ''}>
                    <i class="fas fa-vr-cardboard"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'م';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'ك';
    return num.toString();
}

// =========== إدارة المستخدمين ===========
let currentUser = null;
const ADMIN_USERNAME = "naser";
const ADMIN_PASSWORD = "naser123";
const ADMIN_SECRET_CODE = "naseradmin2024";

function checkUserStatus() {
    const userData = localStorage.getItem('naserStreamUser');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userAvatar = document.getElementById('userAvatar');
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    
    if (userData) {
        currentUser = JSON.parse(userData);
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        
        // تحديث الصورة الرمزية
        const avatarText = currentUser.name ? currentUser.name.charAt(0) : '?';
        userAvatar.querySelector('.avatar-text').textContent = avatarText;
        if (sidebarAvatar) sidebarAvatar.textContent = avatarText;
        
        // تحديث الاسم في القائمة الجانبية
        document.getElementById('sidebarUserName').textContent = currentUser.name || 'مستخدم';
        document.getElementById('dropdownName').textContent = currentUser.name || 'مستخدم';
        
        // تحديث الدور
        const role = currentUser.isPremium ? 'مستخدم متميز' : 'مستخدم عادي';
        document.getElementById('sidebarUserRole').textContent = role;
        document.getElementById('dropdownRole').textContent = role;
    } else {
        currentUser = null;
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        userAvatar.querySelector('.avatar-text').textContent = '?';
        if (sidebarAvatar) sidebarAvatar.textContent = '?';
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showNotification('يرجى ملء جميع الحقول', 'error');
        return;
    }
    
    // التحقق من المسؤول
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const adminUser = {
            id: 0,
            name: "Naser",
            username: ADMIN_USERNAME,
            email: "admin@naserstream.com",
            isPremium: true,
            isAdmin: true,
            joinDate: new Date().toISOString(),
            views: 0,
            likes: 0,
            videos: []
        };
        
        localStorage.setItem('naserStreamUser', JSON.stringify(adminUser));
        currentUser = adminUser;
        
        showNotification('مرحباً بك يا مسؤول!', 'success');
        closeModal('loginModal');
        checkUserStatus();
        checkAdminAccess();
        updateStats();
        return;
    }
    
    // التحقق من المستخدمين العاديين
    const users = JSON.parse(localStorage.getItem('naserStreamUsers') || '[]');
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
    
    if (user) {
        // حفظ بيانات المستخدم
        localStorage.setItem('naserStreamUser', JSON.stringify(user));
        currentUser = user;
        
        showNotification('تم تسجيل الدخول بنجاح!', 'success');
        closeModal('loginModal');
        checkUserStatus();
        updateStats();
    } else {
        showNotification('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const code = document.getElementById('adminCode').value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD && code === ADMIN_SECRET_CODE) {
        const adminUser = {
            id: 0,
            name: "Naser",
            username: ADMIN_USERNAME,
            email: "admin@naserstream.com",
            isPremium: true,
            isAdmin: true,
            joinDate: new Date().toISOString(),
            views: 0,
            likes: 0,
            videos: []
        };
        
        localStorage.setItem('naserStreamUser', JSON.stringify(adminUser));
        currentUser = adminUser;
        
        showNotification('تم تفعيل وضع المسؤول بنجاح!', 'success');
        closeModal('adminLoginModal');
        checkUserStatus();
        checkAdminAccess();
        updateStats();
        navigateTo('admin');
    } else {
        showNotification('بيانات الدخول غير صحيحة', 'error');
    }
}

function checkAdminAccess() {
    const adminElements = document.querySelectorAll('.admin-only');
    const adminSection = document.getElementById('admin');
    
    if (currentUser && currentUser.username === ADMIN_USERNAME) {
        adminElements.forEach(el => el.style.display = 'flex');
        if (adminSection) adminSection.style.display = 'block';
    } else {
        adminElements.forEach(el => el.style.display = 'none');
        if (adminSection) adminSection.style.display = 'none';
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // التحقق من صحة البيانات
    if (!name || !username || !email || !password || !confirmPassword) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('كلمات المرور غير متطابقة', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
    }
    
    // التحقق من وجود المستخدم مسبقاً
    const users = JSON.parse(localStorage.getItem('naserStreamUsers') || '[]');
    
    if (users.some(u => u.username === username)) {
        showNotification('اسم المستخدم موجود مسبقاً', 'error');
        return;
    }
    
    if (users.some(u => u.email === email)) {
        showNotification('البريد الإلكتروني موجود مسبقاً', 'error');
        return;
    }
    
    // إنشاء المستخدم الجديد
    const newUser = {
        id: Date.now(),
        name: name,
        username: username,
        email: email,
        password: password,
        isPremium: false,
        isAdmin: false,
        joinDate: new Date().toISOString(),
        views: 0,
        likes: 0,
        videos: []
    };
    
    users.push(newUser);
    localStorage.setItem('naserStreamUsers', JSON.stringify(users));
    localStorage.setItem('naserStreamUser', JSON.stringify(newUser));
    
    showNotification('تم إنشاء الحساب بنجاح!', 'success');
    closeModal('registerModal');
    checkUserStatus();
    updateStats();
}

function logout() {
    localStorage.removeItem('naserStreamUser');
    currentUser = null;
    showNotification('تم تسجيل الخروج', 'info');
    checkUserStatus();
    checkAdminAccess();
    updateStats();
}

// =========== رفع الفيديوهات ===========
function setupDragAndDrop() {
    const uploadZone = document.getElementById('uploadZone');
    
    uploadZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    uploadZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });
    
    uploadZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelection(files[0]);
        }
    });
}

function handleFileSelection(file) {
    if (!file) return;
    
    // التحقق من حجم الفيديو
    if (file.size > 2 * 1024 * 1024 * 1024) { // 2GB
        showNotification('حجم الفيديو كبير جداً (الحد الأقصى 2GB)', 'error');
        return;
    }
    
    // التحقق من صيغة الفيديو
    const validFormats = ['mp4', 'avi', 'mov', 'mkv'];
    const extension = file.name.split('.').pop().toLowerCase();
    
    if (!validFormats.includes(extension)) {
        showNotification('صيغة الفيديو غير مدعومة', 'error');
        return;
    }
    
    // تحديث واجهة الرفع
    const uploadZone = document.getElementById('uploadZone');
    const uploadProgressContainer = document.getElementById('uploadProgressContainer');
    
    uploadZone.classList.add('file-selected');
    uploadProgressContainer.style.display = 'block';
    
    // محاكاة عملية الرفع
    simulateUpload(file);
}

function simulateUpload(file) {
    let progress = 0;
    const progressFill = document.getElementById('uploadProgressFill');
    const progressText = document.getElementById('progressText');
    
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // إنشاء فيديو جديد
            createNewVideo(file);
            showNotification('تم رفع الفيديو بنجاح!', 'success');
        }
    }, 200);
}

function createNewVideo(file) {
    const title = document.getElementById('videoTitle').value || file.name.replace(/\.[^/.]+$/, "");
    const category = document.getElementById('videoCategory').value || 'عام';
    const description = document.getElementById('videoDesc').value || "لا يوجد وصف";
    const privacy = document.querySelector('input[name="privacy"]:checked').value;
    
    const newVideo = {
        id: videosData.length + 1,
        title: title,
        category: category,
        views: 0,
        likes: 0,
        comments: 0,
        duration: Math.floor(Math.random() * 30) + ":" + Math.floor(Math.random() * 60).toString().padStart(2, '0'),
        uploadDate: "الآن",
        thumbnail: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: description,
        tags: getTags(),
        author: currentUser ? currentUser.name : "مستخدم",
        authorId: currentUser ? currentUser.id : 0,
        isPremium: privacy === 'premium',
        is360: category === '360',
        isVR: category === 'vr',
        uploadTime: new Date().toISOString(),
        privacy: privacy
    };
    
    videosData.unshift(newVideo);
    localStorage.setItem('naserStreamVideos', JSON.stringify(videosData));
    loadVideos();
    updateStats();
    resetUploadForm();
}

function getTags() {
    const tags = [];
    document.querySelectorAll('.tag').forEach(tag => {
        const tagText = tag.textContent.replace('×', '').trim();
        if (tagText) tags.push(tagText);
    });
    return tags;
}

function aiGenerateDescription() {
    const title = document.getElementById('videoTitle').value;
    const category = document.getElementById('videoCategory').value;
    
    const descriptions = {
        "تعليمي": `تعلم ${title} من الصفر للإحتراف. هذا الفيديو يحتوي على شرح مفصل وشامل مع أمثلة عملية.`,
        "ترفيهي": `استمتع معنا في ${title}. فيديو ترفيهي ممتع مع الكثير من المرح والتشويق.`,
        "رياضي": `تابع ${title} معنا. فيديو رياضي مميز يحتوي على أهم الأحداث والمباريات.`,
        "تكنولوجيا": `${title} - اكتشف أحدث التطورات التكنولوجية في هذا المجال.`,
        "أفلام": `شاهد ${title} - فيلم ممتع مليء بالإثارة والتشويق.`,
        "موسيقى": `استمع إلى ${title} - أجمل الأغاني والموسيقى المميزة.`,
        "ألعاب": `جرب ${title} - تعرف على أفضل الألعاب وأحدث الإصدارات.`
    };
    
    const randomDesc = descriptions[category] || `فيديو رائع عن ${title}. شاهد واستمتع بأفضل المحتويات.`;
    document.getElementById('videoDesc').value = randomDesc;
    updateCharCount();
    showNotification('تم توليد وصف بالفيديو باستخدام الذكاء الاصطناعي', 'success');
}

function aiGenerateTags() {
    const category = document.getElementById('videoCategory').value;
    const title = document.getElementById('videoTitle').value.toLowerCase();
    
    const categoryTags = {
        "تعليمي": ["تعليم", "تعلم", "دورة", "شرح", "مهارات"],
        "ترفيهي": ["ترفيه", "تسلية", "مرح", "ضحك", "كوميديا"],
        "رياضي": ["رياضة", "مباراة", "منافسة", "لياقة", "تدريب"],
        "تكنولوجيا": ["تكنولوجيا", "تقنية", "جديد", "ابتكار", "مستقبل"],
        "أفلام": ["أفلام", "سينما", "دراما", "أكشن", "مشاهدة"],
        "موسيقى": ["موسيقى", "أغاني", "فن", "غناء", "إيقاع"],
        "ألعاب": ["ألعاب", "جيمز", "تحدي", "منافسة", "متعة"]
    };
    
    const baseTags = categoryTags[category] || ["فيديو", "محتوى", "جديد", "مميز"];
    
    // إضافة كلمات من العنوان
    const titleWords = title.split(' ').filter(word => word.length > 2);
    baseTags.push(...titleWords.slice(0, 3));
    
    // إضافة الوسوم
    baseTags.slice(0, 5).forEach(tag => {
        addTag(tag);
    });
    
    showNotification('تم توليد الوسوم باستخدام الذكاء الاصطناعي', 'success');
}

function addTag(tagText) {
    if (!tagText) {
        tagText = document.getElementById('tagInput').value.trim();
        if (!tagText) return;
        document.getElementById('tagInput').value = '';
    }
    
    const tagsContainer = document.getElementById('tagsContainer');
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `
        ${tagText}
        <span class="tag-remove" onclick="this.parentElement.remove()">×</span>
    `;
    tagsContainer.appendChild(tag);
}

function resetUploadForm() {
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoCategory').value = '';
    document.getElementById('videoDesc').value = '';
    document.getElementById('tagInput').value = '';
    document.getElementById('tagsContainer').innerHTML = '';
    document.getElementById('thumbnailPreview').innerHTML = '<i class="fas fa-image"></i><p>انقر لاختيار صورة</p>';
    document.getElementById('uploadProgressContainer').style.display = 'none';
    document.getElementById('uploadZone').classList.remove('file-selected');
    updateCharCount();
}

// =========== المساعد الذكي ===========
function toggleAIAssistant() {
    const aiAssistant = document.getElementById('aiAssistant');
    aiAssistant.classList.toggle('active');
}

function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // إضافة رسالة المستخدم
    addAIMessage(message, 'user');
    
    // مسح حقل الإدخال
    input.value = '';
    
    // محاكاة استجابة الذكاء الاصطناعي
    setTimeout(() => {
        const responses = [
            "شكراً على سؤالك! يمكنني مساعدتك في العثور على الفيديوهات المناسبة.",
            "هل تريد مشاهدة فيديوهات في فئة معينة؟",
            "يمكنني اقتراح فيديوهات بناءً على اهتماماتك السابقة.",
            "هل تحتاج مساعدة في رفع فيديو جديد؟",
            "لقد وجدت عدة فيديوهات قد تهمك. هل تريد أن أعرضها لك؟"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addAIMessage(randomResponse, 'ai');
    }, 1000);
}

function addAIMessage(message, sender) {
    const messagesContainer = document.getElementById('aiMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender}`;
    
    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="ai-avatar-small">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <div class="message-time">الآن</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="user-avatar-small">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <div class="message-time">الآن</div>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function aiSuggestVideos() {
    addAIMessage("أبحث عن فيديوهات مقترحة لك...", 'ai');
    
    setTimeout(() => {
        const randomVideos = [...videosData].sort(() => Math.random() - 0.5).slice(0, 3);
        let response = "إليك بعض الفيديوهات المقترحة:\n";
        
        randomVideos.forEach(video => {
            response += `• ${video.title} (${video.category})\n`;
        });
        
        addAIMessage(response, 'ai');
    }, 1500);
}

function aiHelpUpload() {
    addAIMessage("سأساعدك في رفع فيديو جديد...", 'ai');
    
    setTimeout(() => {
        const tips = [
            "1. اختر عنواناً جذاباً يصف المحتوى",
            "2. أضف وصفاً تفصيلياً للفيديو",
            "3. اختر التصنيف المناسب",
            "4. أضف وسوم تساعد في البحث",
            "5. اختر صورة مصغرة واضحة"
        ];
        
        const response = tips.join('\n');
        addAIMessage(response, 'ai');
    }, 1500);
}

function aiTechnicalSupport() {
    addAIMessage("سأساعدك في حل المشكلات التقنية...", 'ai');
    
    setTimeout(() => {
        const solutions = [
            "• تأكد من اتصال الإنترنت",
            "• جرب تحديث الصفحة",
            "• امسح ذاكرة التخزين المؤقت",
            "• جرب متصفحاً آخر",
            "• اتصل بالدعم الفني إذا استمرت المشكلة"
        ];
        
        const response = solutions.join('\n');
        addAIMessage(response, 'ai');
    }, 1500);
}

// =========== وضع VR ===========
function toggleVRMode() {
    const vrOverlay = document.getElementById('vrOverlay');
    vrOverlay.classList.toggle('active');
    
    if (vrOverlay.classList.contains('active')) {
        showNotification('تم تفعيل وضع الواقع الافتراضي', 'success');
    } else {
        showNotification('تم إغلاق وضع الواقع الافتراضي', 'info');
    }
}

function exitVRMode() {
    document.getElementById('vrOverlay').classList.remove('active');
    const video = document.getElementById('vrVideoPlayer');
    if (video) {
        video.pause();
    }
}

function adjustVRZoom(amount) {
    const video = document.getElementById('vrVideoPlayer');
    if (video) {
        video.style.transform = `scale(${1 + amount})`;
        showNotification(`تم ${amount > 0 ? 'تكبير' : 'تصغير'} الفيديو`, 'info');
    }
}

function toggleVRQuality() {
    const video = document.getElementById('vrVideoPlayer');
    if (video) {
        if (video.src.includes('low')) {
            video.src = video.src.replace('low', 'high');
            showNotification('تم تغيير الجودة إلى عالية', 'success');
        } else {
            video.src = video.src.replace('high', 'low');
            showNotification('تم تغيير الجودة إلى منخفضة', 'info');
        }
    }
}

function toggleVRMovement() {
    showNotification('تم تبديل وضع التحكم بالحركة', 'info');
}

function playVideoInVR(videoId) {
    const video = videosData.find(v => v.id === videoId);
    if (video && (video.isVR || video.is360)) {
        toggleVRMode();
        
        // تعيين مصدر الفيديو للعرض في وضع VR
        const vrVideo = document.getElementById('vrVideoPlayer');
        if (vrVideo) {
            vrVideo.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
            vrVideo.play();
        }
        
        showNotification('جاري تشغيل الفيديو في وضع الواقع الافتراضي', 'success');
    } else {
        showNotification('هذا الفيديو لا يدعم الواقع الافتراضي', 'error');
    }
}

// =========== التنقل ===========
function navigateTo(sectionId) {
    // إزالة النشاط من جميع الروابط
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // إضافة النشاط للرابط الحالي
    document.querySelectorAll(`[href="#${sectionId}"]`).forEach(el => el.classList.add('active'));
    document.querySelectorAll(`[onclick*="${sectionId}"]`).forEach(el => el.classList.add('active'));
    
    // التمرير للقسم المطلوب
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    
    // تحديث العنوان
    document.title = `NaserStream - ${getSectionTitle(sectionId)}`;
}

function getSectionTitle(sectionId) {
    const titles = {
        'home': 'الرئيسية',
        'videos': 'الفيديوهات',
        'upload': 'رفع فيديو',
        'live': 'البث المباشر',
        'playlists': 'قوائم التشغيل',
        'community': 'المجتمع',
        'admin': 'لوحة التحكم'
    };
    return titles[sectionId] || 'NaserStream';
}

// =========== القائمة الجانبية ===========
function toggleSidebar() {
    document.getElementById('sidebarMenu').classList.toggle('active');
}

// =========== النوافذ المنبثقة ===========
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showLogin() {
    closeModal('registerModal');
    openModal('loginModal');
}

function showRegister() {
    closeModal('loginModal');
    openModal('registerModal');
}

function openAdminLogin() {
    openModal('adminLoginModal');
}

// =========== الإشعارات ===========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// =========== إدارة المستخدم ===========
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenuDropdown');
    userMenu.classList.toggle('show');
}

function hideUserMenu() {
    document.getElementById('userMenuDropdown').classList.remove('show');
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('userMenuDropdown');
    const userAvatar = document.getElementById('userAvatar');
    
    if (userMenu.classList.contains('show') && !userMenu.contains(event.target) && !userAvatar.contains(event.target)) {
        userMenu.classList.remove('show');
    }
});

// =========== الإحصائيات ===========
function updateStats() {
    const users = JSON.parse(localStorage.getItem('naserStreamUsers') || '[]');
    
    document.getElementById('totalUsersCount').textContent = users.length;
    document.getElementById('totalVideosCount').textContent = videosData.length;
    
    let totalViews = 0;
    let totalComments = 0;
    let totalLikes = 0;
    
    videosData.forEach(video => {
        totalViews += video.views;
        totalComments += video.comments;
        totalLikes += video.likes;
    });
    
    document.getElementById('totalViewsCount').textContent = formatNumber(totalViews);
    document.getElementById('totalCommentsCount').textContent = formatNumber(totalComments);
    
    // تحديث إحصائيات المستخدم
    if (currentUser) {
        document.getElementById('sidebarViews').textContent = formatNumber(currentUser.views || 0);
        document.getElementById('sidebarLikes').textContent = formatNumber(currentUser.likes || 0);
    }
    
    // تحديث إحصائيات لوحة التحكم
    if (currentUser && currentUser.username === ADMIN_USERNAME) {
        updateAdminStats(users, totalViews, totalLikes);
    }
}

function updateLiveStats() {
    // زيادة عشوائية في المشاهدات لمحاكاة النشاط الحي
    videosData.forEach(video => {
        if (Math.random() > 0.7) {
            video.views += Math.floor(Math.random() * 100);
            video.likes += Math.floor(Math.random() * 10);
            video.comments += Math.floor(Math.random() * 5);
        }
    });
    
    localStorage.setItem('naserStreamVideos', JSON.stringify(videosData));
    updateStats();
}

function updateAdminStats(users, totalViews, totalLikes) {
    document.getElementById('adminUserCount').textContent = users.length;
    document.getElementById('adminVideoCount').textContent = videosData.length;
    document.getElementById('adminViewsCount').textContent = formatNumber(totalViews);
    document.getElementById('adminReportsCount').textContent = '0';
    
    document.getElementById('totalUsersAdmin').textContent = users.length;
    document.getElementById('premiumUsers').textContent = users.filter(u => u.isPremium).length;
    document.getElementById('totalVideosAdmin').textContent = videosData.length;
    document.getElementById('premiumVideos').textContent = videosData.filter(v => v.isPremium).length;
    document.getElementById('totalViewsAdmin').textContent = formatNumber(totalViews);
    document.getElementById('totalLikesAdmin').textContent = formatNumber(totalLikes);
}

// =========== البحث ===========
function searchVideos() {
    const searchTerm = document.getElementById('videoSearch').value.toLowerCase();
    
    if (!searchTerm.trim()) {
        loadVideos();
        return;
    }
    
    const filteredVideos = videosData.filter(video => 
        video.title.toLowerCase().includes(searchTerm) ||
        video.description.toLowerCase().includes(searchTerm) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        video.category.toLowerCase().includes(searchTerm)
    );
    
    displaySearchResults(filteredVideos);
}

function displaySearchResults(videos) {
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = '';
    
    if (videos.length === 0) {
        videosGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لا توجد نتائج</h3>
                <p>جرب استخدام كلمات بحث مختلفة</p>
            </div>
        `;
        return;
    }
    
    videos.forEach(video => {
        videosGrid.appendChild(createVideoCard(video));
    });
}

// =========== الفلاتر ===========
function filterVideos() {
    const category = document.getElementById('categoryFilter').value;
    const sort = document.getElementById('sortFilter').value;
    
    let filteredVideos = [...videosData];
    
    // التصفية حسب التصنيف
    if (category !== 'all') {
        filteredVideos = filteredVideos.filter(video => video.category === category);
    }
    
    // الترتيب
    switch(sort) {
        case 'newest':
            filteredVideos.sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));
            break;
        case 'popular':
            filteredVideos.sort((a, b) => b.likes - a.likes);
            break;
        case 'views':
            filteredVideos.sort((a, b) => b.views - a.views);
            break;
        case 'trending':
            // الترتيب حسب الإتجاه (المشاهدات + الإعجابات)
            filteredVideos.sort((a, b) => (b.views + b.likes * 10) - (a.views + a.likes * 10));
            break;
        case 'ai':
            // الترتيب حسب الذكاء الاصطناعي (عشوائي مع مرجحة للفيديوهات الجيدة)
            filteredVideos.sort(() => Math.random() - 0.5);
            filteredVideos.sort((a, b) => (b.views * 0.3 + b.likes * 0.5 + b.comments * 0.2) - (a.views * 0.3 + a.likes * 0.5 + a.comments * 0.2));
            break;
    }
    
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = '';
    
    filteredVideos.forEach(video => {
        videosGrid.appendChild(createVideoCard(video));
    });
}

// =========== تفاعلات الفيديو ===========
function likeVideo(videoId) {
    const video = videosData.find(v => v.id === videoId);
    if (video) {
        video.likes++;
        localStorage.setItem('naserStreamVideos', JSON.stringify(videosData));
        loadVideos();
        updateStats();
        showNotification('تم إبداء الإعجاب بالفيديو', 'success');
    }
}

function saveVideo(videoId) {
    const badge = document.getElementById('watchLaterBadge');
    const currentCount = parseInt(badge.textContent);
    badge.textContent = currentCount + 1;
    
    // حفظ الفيديو في قائمة المشاهدة لاحقاً
    const watchLater = JSON.parse(localStorage.getItem('naserStreamWatchLater') || '[]');
    if (!watchLater.includes(videoId)) {
        watchLater.push(videoId);
        localStorage.setItem('naserStreamWatchLater', JSON.stringify(watchLater));
    }
    
    showNotification('تم حفظ الفيديو في قائمة المشاهدة لاحقاً', 'success');
}

function shareVideo(videoId) {
    const video = videosData.find(v => v.id === videoId);
    if (video) {
        const shareUrl = `${window.location.origin}?video=${videoId}`;
        
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: video.description,
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(shareUrl);
            showNotification('تم نسخ رابط الفيديو', 'success');
        }
    }
}

// =========== التأثيرات البصرية ===========
function initVideoEffects() {
    const videoCards = document.querySelectorAll('.video-card-3d');
    
    videoCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// =========== التبديل بين السمتين ===========
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark');
    body.classList.toggle('light');
    
    const theme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('naserStreamTheme', theme);
    showNotification(`تم التبديل إلى الوضع ${theme === 'dark' ? 'الداكن' : 'الفاتح'}`, 'success');
}

function loadPreferences() {
    const savedTheme = localStorage.getItem('naserStreamTheme') || 'dark';
    document.body.className = savedTheme;
}

// =========== عد الأحرف ===========
function updateCharCount() {
    const titleLength = document.getElementById('videoTitle').value.length;
    const descLength = document.getElementById('videoDesc').value.length;
    
    document.getElementById('titleChars').textContent = titleLength;
    document.getElementById('descChars').textContent = descLength;
}

// =========== تحقق المستخدم للتنقل ===========
function checkUserAndNavigate(section) {
    if (!currentUser && section === 'upload') {
        showNotification('يجب تسجيل الدخول لرفع فيديو', 'error');
        openModal('loginModal');
    } else {
        navigateTo(section);
    }
}

// =========== وظائف مساعدة ===========
function playVideo(videoId) {
    const video = videosData.find(v => v.id === videoId);
    if (video) {
        // زيادة عدد المشاهدات
        video.views++;
        localStorage.setItem('naserStreamVideos', JSON.stringify(videosData));
        updateStats();
        
        // إنشاء مشغل فيديو
        const playerHTML = `
            <div class="video-player-modal">
                <div class="player-header">
                    <h3>${video.title}</h3>
                    <button onclick="closeVideoPlayer()">&times;</button>
                </div>
                <div class="player-content">
                    <video controls autoplay style="width:100%;height:60vh">
                        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                    </video>
                    <div class="video-details">
                        <h4>${video.title}</h4>
                        <p>${video.description}</p>
                        <div class="video-meta">
                            <span><i class="fas fa-eye"></i> ${formatNumber(video.views)}</span>
                            <span><i class="fas fa-heart"></i> ${formatNumber(video.likes)}</span>
                            <span><i class="fas fa-comment"></i> ${formatNumber(video.comments)}</span>
                        </div>
                        <div class="player-actions">
                            <button class="player-action-btn like-btn" onclick="likeVideo(${video.id}); closeVideoPlayer(); playVideo(${video.id})">
                                <i class="fas fa-heart"></i> أعجبني
                            </button>
                            <button class="player-action-btn share-btn" onclick="shareVideo(${video.id})">
                                <i class="fas fa-share"></i> مشاركة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const playerDiv = document.createElement('div');
        playerDiv.className = 'modal video-player active';
        playerDiv.id = 'videoPlayer';
        playerDiv.innerHTML = playerHTML;
        document.body.appendChild(playerDiv);
    }
}

function closeVideoPlayer() {
    const player = document.getElementById('videoPlayer');
    if (player) {
        player.remove();
    }
}

function showVideoMenu(event, videoId) {
    event.stopPropagation();
    
    const menuItems = [
        { text: 'إضافة إلى قائمة التشغيل', icon: 'fas fa-list' },
        { text: 'حفظ في المشاهدة لاحقاً', icon: 'fas fa-clock' },
        { text: 'إبلاغ', icon: 'fas fa-flag' },
        { text: 'حجب القناة', icon: 'fas fa-ban' }
    ];
    
    // إنشاء قائمة منبثقة
    const menuDiv = document.createElement('div');
    menuDiv.className = 'video-menu-popup';
    menuDiv.style.cssText = `
        position: absolute;
        background: rgba(26, 26, 46, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 10px;
        min-width: 200px;
        z-index: 1000;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    menuItems.forEach(item => {
        const button = document.createElement('button');
        button.className = 'video-menu-item';
        button.innerHTML = `<i class="${item.icon}"></i> ${item.text}`;
        button.style.cssText = `
            display: block;
            width: 100%;
            padding: 10px;
            text-align: right;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            border-radius: 5px;
        `;
        button.onmouseenter = () => button.style.background = 'rgba(255,255,255,0.1)';
        button.onmouseleave = () => button.style.background = 'none';
        button.onclick = () => {
            showNotification(`تم ${item.text}`, 'info');
            menuDiv.remove();
        };
        menuDiv.appendChild(button);
    });
    
    const rect = event.target.getBoundingClientRect();
    menuDiv.style.top = `${rect.bottom}px`;
    menuDiv.style.left = `${rect.left - 200}px`;
    
    document.body.appendChild(menuDiv);
    
    // إغلاق القائمة عند النقر خارجها
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menuDiv.contains(e.target) && e.target !== event.target) {
                menuDiv.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}

function loadMoreVideos() {
    showNotification('جاري تحميل المزيد من الفيديوهات...', 'info');
    
    setTimeout(() => {
        // إضافة فيديوهات جديدة
        const newVideos = [
            {
                id: videosData.length + 1,
                title: "تعلم تصميم الويب الحديث",
                category: "تعليمي",
                views: Math.floor(Math.random() * 50000),
                likes: Math.floor(Math.random() * 3000),
                comments: Math.floor(Math.random() * 500),
                duration: "25:10",
                uploadDate: "قبل ساعة",
                thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "تعلم أحدث تقنيات تصميم الويب",
                tags: ["تصميم", "ويب", "UI/UX"],
                author: "مصمم ويب",
                authorId: 7,
                isPremium: false,
                is360: false,
                isVR: false,
                uploadTime: new Date().toISOString()
            },
            {
                id: videosData.length + 2,
                title: "رياضة الصباح للحفاظ على الصحة",
                category: "رياضي",
                views: Math.floor(Math.random() * 80000),
                likes: Math.floor(Math.random() * 5000),
                comments: Math.floor(Math.random() * 800),
                duration: "18:30",
                uploadDate: "قبل 3 ساعات",
                thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                description: "تمارين صباحية للحفاظ على الصحة والنشاط",
                tags: ["رياضة", "صحة", "تمارين"],
                author: "مدرب اللياقة",
                authorId: 8,
                isPremium: false,
                is360: false,
                isVR: false,
                uploadTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
            }
        ];
        
        videosData.push(...newVideos);
        localStorage.setItem('naserStreamVideos', JSON.stringify(videosData));
        loadVideos();
        showNotification('تم تحميل 2 فيديوهات جديدة', 'success');
    }, 1500);
}

// =========== إدارة المحتوى المتميز ===========
function openPremiumModal() {
    showNotification('جاري فتح صفحة العضوية المتميزة...', 'info');
    
    const premiumContent = `
        <div class="modal" style="display: flex">
            <div class="modal-content" style="max-width: 600px">
                <span class="close-modal" onclick="closeModal('premiumModal')">&times;</span>
                <div class="modal-header">
                    <h2><i class="fas fa-crown"></i> العضوية المتميزة</h2>
                    <p>استمتع بمزايا حصرية مع NaserStream Premium</p>
                </div>
                <div class="premium-features">
                    <div class="premium-feature">
                        <i class="fas fa-ad"></i>
                        <div>
                            <h4>مشاهدة بدون إعلانات</h4>
                            <p>استمتع بمشاهدة فيديوهاتك المفضلة بدون أي إعلانات مزعجة</p>
                        </div>
                    </div>
                    <div class="premium-feature">
                        <i class="fas fa-download"></i>
                        <div>
                            <h4>تحميل الفيديوهات</h4>
                            <p>قم بتحميل الفيديوهات لمشاهدتها بدون اتصال بالإنترنت</p>
                        </div>
                    </div>
                    <div class="premium-feature">
                        <i class="fas fa-play-circle"></i>
                        <div>
                            <h4>محتوى حصري</h4>
                            <p>وصول إلى مكتبة فيديوهات متميزة وحصرية</p>
                        </div>
                    </div>
                </div>
                <div class="premium-pricing">
                    <div class="price-plan">
                        <h3>شهري</h3>
                        <div class="price">$9.99</div>
                        <button class="modal-btn" onclick="subscribePremium('monthly')">
                            اشترك الآن
                        </button>
                    </div>
                    <div class="price-plan recommended">
                        <h3>سنوي</h3>
                        <div class="price">$99.99</div>
                        <small>وفر 16%</small>
                        <button class="modal-btn" onclick="subscribePremium('yearly')">
                            اشترك الآن
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = premiumContent;
    modalDiv.id = 'premiumModal';
    document.body.appendChild(modalDiv);
}

function subscribePremium(plan) {
    if (currentUser) {
        currentUser.isPremium = true;
        localStorage.setItem('naserStreamUser', JSON.stringify(currentUser));
        
        const users = JSON.parse(localStorage.getItem('naserStreamUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].isPremium = true;
            localStorage.setItem('naserStreamUsers', JSON.stringify(users));
        }
        
        showNotification(`تم تفعيل العضوية المتميزة ${plan === 'monthly' ? 'الشهرية' : 'السنوية'} بنجاح!`, 'success');
        checkUserStatus();
        
        const modal = document.getElementById('premiumModal');
        if (modal) modal.remove();
    } else {
        showNotification('يجب تسجيل الدخول أولاً', 'error');
        openModal('loginModal');
    }
}

// =========== البحث الصوتي ===========
function startVoiceRecognition() {
    showNotification('البحث الصوتي قيد التطوير', 'info');
    // يمكن تفعيل هذه الميزة في المستقبل
    /*
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'ar-SA';
        recognition.interimResults = false;
        
        recognition.onstart = function() {
            showNotification('جاري الاستماع... تحدث الآن', 'info');
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('aiInput').value = transcript;
            showNotification(`تم التعرف على: ${transcript}`, 'success');
            sendAIMessage();
        };
        
        recognition.onerror = function(event) {
            showNotification('حدث خطأ في التعرف الصوتي', 'error');
        };
        
        recognition.start();
    } else {
        showNotification('المتصفح لا يدعم التعرف الصوتي', 'error');
    }
    */
}

// إغلاق النوافذ المنبثقة عند النقر خارجها
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// =========== ميزات المسؤول ===========
function loadAdminData() {
    if (!currentUser || currentUser.username !== ADMIN_USERNAME) return;
    
    loadRecentUsers();
    loadRecentVideos();
}

function loadRecentUsers() {
    const users = JSON.parse(localStorage.getItem('naserStreamUsers') || '[]');
    const table = document.getElementById('recentUsersTable');
    
    if (!table) return;
    
    table.innerHTML = '';
    
    // عرض آخر 5 مستخدمين
    users.slice(-5).reverse().forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${new Date(user.joinDate).toLocaleDateString('ar-SA')}</td>
            <td>${user.isPremium ? '<span style="color: #FFD700">متميز</span>' : 'عادي'}</td>
            <td>
                <button class="btn-small" onclick="editUser(${user.id})">تعديل</button>
                <button class="btn-small btn-danger" onclick="deleteUser(${user.id})">حذف</button>
            </td>
        `;
        table.appendChild(row);
    });
}

function loadRecentVideos() {
    const table = document.getElementById('recentVideosTable');
    
    if (!table) return;
    
    table.innerHTML = '';
    
    // عرض آخر 5 فيديوهات
    videosData.slice(0, 5).forEach((video, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${video.title.substring(0, 30)}${video.title.length > 30 ? '...' : ''}</td>
            <td>${formatNumber(video.views)}</td>
            <td>${formatNumber(video.likes)}</td>
            <td>${video.category}</td>
            <td>
                <button class="btn-small" onclick="editVideo(${video.id})">تعديل</button>
                <button class="btn-small btn-danger" onclick="deleteVideo(${video.id})">حذف</button>
            </td>
        `;
        table.appendChild(row);
    });
}

function showAllUsers() {
    const users = JSON.parse(localStorage.getItem('naserStreamUsers') || '[]');
    
    let userList = "المستخدمون:\n";
    users.forEach(user => {
        userList += `- ${user.username} (${user.email}) ${user.isPremium ? '👑' : ''}\n`;
    });
    
    alert(userList);
}

function showAllVideos() {
    let videoList = "الفيديوهات:\n";
    videosData.forEach(video => {
        videoList += `- ${video.title} (${video.views} مشاهدة)\n`;
    });
    
    alert(videoList);
}

function showAnalytics() {
    const totalViews = videosData.reduce((sum, video) => sum + video.views, 0);
    const totalLikes = videosData.reduce((sum, video) => sum + video.likes, 0);
    const totalComments = videosData.reduce((sum, video) => sum + video.comments, 0);
    
    const analytics = `
        📊 إحصائيات النظام:
        
        إجمالي المشاهدات: ${formatNumber(totalViews)}
        إجمالي الإعجابات: ${formatNumber(totalLikes)}
        إجمالي التعليقات: ${formatNumber(totalComments)}
        عدد الفيديوهات: ${videosData.length}
        متوسط المشاهدات: ${formatNumber(Math.round(totalViews / videosData.length))}
        
        التصنيفات الأكثر مشاهدة:
        ${getTopCategories()}
    `;
    
    alert(analytics);
}

function getTopCategories() {
    const categories = {};
    videosData.forEach(video => {
        categories[video.category] = (categories[video.category] || 0) + video.views;
    });
    
    const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 3).map(([cat, views]) => `  • ${cat}: ${formatNumber(views)} مشاهدة`).join('\n');
}

function showReports() {
    alert("لا توجد بلاغات حالياً");
}

function addNewUser() {
    showNotification('فتح نموذج إضافة مستخدم جديد', 'info');
    showRegister();
}

function addNewVideo() {
    navigateTo('upload');
    showNotification('يمكنك إضافة فيديو جديد من هنا', 'info');
}

function exportData() {
    const data = {
        users: JSON.parse(localStorage.getItem('naserStreamUsers') || '[]'),
        videos: videosData,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `naserstream-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('تم تصدير البيانات بنجاح', 'success');
}

function openSystemSettings() {
    const settings = `
        ⚙️ إعدادات النظام:
        
        1. جودة الفيديو الافتراضية: عالية
        2. التحميل التلقائي: مفعل
        3. الإشعارات: مفعلة
        4. الوضع الداكن: ${document.body.classList.contains('dark') ? 'مفعل' : 'غير مفعل'}
        5. التحديث التلقائي: مفعل
        6. النسخ الاحتياطي: يومياً
    `;
    
    alert(settings);
}

function backupSystem() {
    exportData();
}

function editUser(userId) {
    showNotification('ميزة تعديل المستخدم قيد التطوير', 'info');
}

function deleteUser(userId) {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        let users = JSON.parse(localStorage.getItem('naserStreamUsers') || '[]');
        users = users.filter(user => user.id !== userId);
        localStorage.setItem('naserStreamUsers', JSON.stringify(users));
        loadRecentUsers();
        updateStats();
        showNotification('تم حذف المستخدم بنجاح', 'success');
    }
}

function editVideo(videoId) {
    showNotification('ميزة تعديل الفيديو قيد التطوير', 'info');
}

function deleteVideo(videoId) {
    if (confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
        videosData = videosData.filter(video => video.id !== videoId);
        localStorage.setItem('naserStreamVideos', JSON.stringify(videosData));
        loadVideos();
        loadRecentVideos();
        updateStats();
        showNotification('تم حذف الفيديو بنجاح', 'success');
    }
}

// =========== ميزات الذكاء الاصطناعي المتقدمة ===========
function aiSuggestMoreVideos() {
    showNotification('جاري تحليل اهتماماتك واقتراح فيديوهات جديدة...', 'info');
    
    setTimeout(() => {
        // إضافة فيديوهات مقترحة بناءً على اهتمامات المستخدم
        const suggestedVideos = videosData
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
        
        const videosGrid = document.getElementById('videosGrid');
        suggestedVideos.forEach(video => {
            videosGrid.appendChild(createVideoCard(video));
        });
        
        showNotification('تم إضافة فيديوهات مقترحة بناءً على اهتماماتك', 'success');
    }, 2000);
}

function aiOptimizeAndUpload() {
    showNotification('جاري تحليل وتحسين الفيديو باستخدام الذكاء الاصطناعي...', 'info');
    
    // محاكاة تحليل الذكاء الاصطناعي
    setTimeout(() => {
        // تحسين العنوان
        const title = document.getElementById('videoTitle').value;
        if (title && title.length < 30) {
            document.getElementById('videoTitle').value = title + " | شرح مفصل وشامل";
        }
        
        aiGenerateDescription();
        aiGenerateTags();
        
        showNotification('تم تحسين الفيديو باستخدام الذكاء الاصطناعي. جاري الرفع الآن...', 'success');
        
        // محاكاة الرفع بعد التحسين
        setTimeout(() => {
            handleUpload();
        }, 1500);
    }, 2000);
}

function handleUpload() {
    // التحقق من الحقول المطلوبة
    const title = document.getElementById('videoTitle').value;
    const category = document.getElementById('videoCategory').value;
    
    if (!title || !category) {
        showNotification('يرجى تعبئة العنوان والتصنيف', 'error');
        return;
    }
    
    if (!currentUser) {
        showNotification('يجب تسجيل الدخول لرفع فيديو', 'error');
        openModal('loginModal');
        return;
    }
    
    showNotification('جاري رفع الفيديو...', 'info');
    // محاكاة رفع الفيديو
    const file = {
        name: title + '.mp4',
        size: 1024 * 1024 * 100 // 100MB
    };
    handleFileSelection(file);
}

function scheduleUpload() {
    showNotification('ميزة جدولة النشر قيد التطوير', 'info');
}

function applyAISuggestion(suggestion) {
    switch(suggestion) {
        case 'تحسين العنوان':
            const title = document.getElementById('videoTitle').value;
            if (title) {
                document.getElementById('videoTitle').value = `🔥 ${title} | أفضل شرح`;
                updateCharCount();
            }
            break;
        case 'تحسين الوصف':
            aiGenerateDescription();
            break;
        case 'وسوم شائعة':
            aiGenerateTags();
            break;
    }
    showNotification(`تم تطبيق: ${suggestion}`, 'success');
}

function aiGenerateThumbnail() {
    showNotification('جاري توليد صورة مصغرة باستخدام الذكاء الاصطناعي...', 'info');
    
    setTimeout(() => {
        const thumbnailPreview = document.getElementById('thumbnailPreview');
        thumbnailPreview.innerHTML = `
            <img src="https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="صورة مصغرة">
            <p>تم توليد الصورة باستخدام الذكاء الاصطناعي</p>
        `;
        showNotification('تم توليد صورة مصغرة باستخدام الذكاء الاصطناعي', 'success');
    }, 1500);
}

function handleThumbnailSelection(file) {
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) { // 10MB
        showNotification('حجم الصورة كبير جداً (الحد الأقصى 10MB)', 'error');
        return;
    }
    
    const validFormats = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.name.split('.').pop().toLowerCase();
    
    if (!validFormats.includes(extension)) {
        showNotification('صيغة الصورة غير مدعومة', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const thumbnailPreview = document.getElementById('thumbnailPreview');
        thumbnailPreview.innerHTML = `
            <img src="${e.target.result}" alt="صورة مصغرة">
            <p>${file.name}</p>
        `;
    };
    reader.readAsDataURL(file);
    showNotification('تم تحميل الصورة المصغرة', 'success');
}

// =========== تحديث الرسوم المتحركة ===========
function animateStats() {
    const stats = [
        { element: 'totalUsersCount', target: parseInt(document.getElementById('totalUsersCount').textContent) },
        { element: 'totalVideosCount', target: videosData.length },
        { element: 'totalViewsCount', target: videosData.reduce((sum, video) => sum + video.views, 0) },
        { element: 'totalCommentsCount', target: videosData.reduce((sum, video) => sum + video.comments, 0) }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.element);
        if (element && stat.target > 0) {
            let current = 0;
            const increment = stat.target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                    current = stat.target;
                    clearInterval(timer);
                }
                element.textContent = formatNumber(Math.round(current));
            }, 20);
        }
    });
}

// تحديث الإحصائيات مع الرسوم المتحركة عند التحميل
setTimeout(animateStats, 500);

// =========== التوجيه والدعم ===========
function openSupport() {
    showNotification('جاري فتح صفحة الدعم...', 'info');
    
    const supportInfo = `
        📞 دعم NaserStream:
        
        للتواصل مع الدعم الفني:
        - البريد الإلكتروني: support@naserstream.com
        - الهاتف: 1234567890
        - ساعات العمل: 9 صباحاً - 5 مساءً
        
        للمساعدة الفورية:
        1. تحقق من اتصال الإنترنت
        2. جرب تحديث الصفحة
        3. امسح ذاكرة التخزين المؤقت
        4. استخدم المساعد الذكي
    `;
    
    alert(supportInfo);
}

function showNotificationsPanel() {
    showNotification('لا توجد إشعارات جديدة', 'info');
}

function toggleChat() {
    showNotification('الدردشة قيد التطوير', 'info');
}

function openSearch() {
    document.getElementById('videoSearch').focus();
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

function checkPasswordStrength() {
    const password = document.getElementById('registerPassword').value;
    const strengthBar = document.querySelector('#passwordStrength .strength-bar');
    const strengthText = document.querySelector('#passwordStrength .strength-text');
    
    let strength = 0;
    let color = '#ff4757';
    let text = 'ضعيف';
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength >= 4) {
        color = '#00ff88';
        text = 'قوي';
    } else if (strength >= 2) {
        color = '#ff9500';
        text = 'متوسط';
    }
    
    strengthBar.style.background = `linear-gradient(90deg, ${color} ${strength * 20}%, rgba(255,255,255,0.1) ${strength * 20}%)`;
    strengthText.textContent = text;
    strengthText.style.color = color;
}

// =========== وظائف إضافية ===========
function loginWithGoogle() {
    showNotification('جاري الاتصال بحساب جوجل...', 'info');
    setTimeout(() => {
        showNotification('تسجيل الدخول بجوجل قيد التطوير', 'info');
    }, 1000);
}

function loginWithFacebook() {
    showNotification('جاري الاتصال بحساب فيسبوك...', 'info');
    setTimeout(() => {
        showNotification('تسجيل الدخول بفيسبوك قيد التطوير', 'info');
    }, 1000);
}

function showForgotPassword() {
    showNotification('ميزة استعادة كلمة المرور قيد التطوير', 'info');
}

function showTerms() {
    const terms = `
        📜 شروط وأحكام NaserStream:
        
        1. يجب أن يكون عمرك 13 عاماً على الأقل
        2. المحتوى المسيء محظور
        3. احترم حقوق النشر
        4. لا تنشر محتوى غير قانوني
        5. نحتفظ بحق إزالة أي محتوى
    `;
    alert(terms);
}

function openSettings() {
    showNotification('صفحة الإعدادات قيد التطوير', 'info');
}

function openPremiumModal() {
    const premiumModal = `
        <div class="modal" style="display: flex">
            <div class="modal-content">
                <span class="close-modal" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
                <div class="modal-header">
                    <h2><i class="fas fa-crown"></i> ترقية الحساب</h2>
                    <p>استمتع بمزايا حصرية مع NaserStream Premium</p>
                </div>
                <div class="premium-features">
                    <div class="premium-feature">
                        <i class="fas fa-ad"></i>
                        <span>مشاهدة بدون إعلانات</span>
                    </div>
                    <div class="premium-feature">
                        <i class="fas fa-download"></i>
                        <span>تحميل الفيديوهات</span>
                    </div>
                    <div class="premium-feature">
                        <i class="fas fa-play-circle"></i>
                        <span>محتوى حصري</span>
                    </div>
                </div>
                <button class="modal-btn" onclick="subscribeToPremium()">
                    <i class="fas fa-crown"></i>
                    اشترك الآن بـ $9.99/شهر
                </button>
            </div>
        </div>
    `;
    
    const div = document.createElement('div');
    div.innerHTML = premiumModal;
    document.body.appendChild(div);
}

function subscribeToPremium() {
    if (currentUser) {
        currentUser.isPremium = true;
        localStorage.setItem('naserStreamUser', JSON.stringify(currentUser));
        showNotification('تم تفعيل العضوية المتميزة بنجاح!', 'success');
        checkUserStatus();
    } else {
        showNotification('يجب تسجيل الدخول أولاً', 'error');
        openModal('loginModal');
    }
}  



