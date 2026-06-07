// ===== APP STATE =====
const appState = {
    currentUser: {
        id: null,
        name: 'Guest',
        email: null,
        department: null
    },
    currentQuestion: 0,
    answers: {},
    quizActive: false,
    startTime: null,
    endTime: null,
    allAttempts: [],
    attemptId: null,
    verificationFile: null,
    verificationPreview: null,
    verificationText: '',
    verificationOcrText: '',
    verificationOcrStatus: '',
    verificationReadPromise: Promise.resolve()
};

// ===== PROFESSIONAL QUIZ DATA WITH PHISHING IMAGES =====
const quizQuestions = [
    {
        id: 1,
        category: "Phishing Detection",
        question: "Which of these email addresses looks suspicious and could indicate a phishing attempt?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%23f5f5f5' width='500' height='300'/%3E%3Crect fill='white' x='10' y='10' width='480' height='280'/%3E%3Ctext x='20' y='35' font-family='Arial' font-size='13' fill='%23666'%3EFrom: security@paypa1.com%3C/text%3E%3Crect fill='%23fff3cd' x='15' y='30' width='470' height='25' rx='3' fill-opacity='0.3'/%3E%3Ctext x='20' y='70' font-family='Arial' font-size='13' fill='%23333'%3ESubject: URGENT: Verify Your PayPal Account Now!%3C/text%3E%3Ctext x='20' y='95' font-family='Arial' font-size='12' fill='%23666'%3EDear Valued Customer,%3C/text%3E%3Ctext x='20' y='115' font-family='Arial' font-size='12' fill='%23666'%3EYour account will be closed if you don't verify immediately.%3C/text%3E%3Ctext x='20' y='135' font-family='Arial' font-size='12' fill='%23666'%3EClick here: www.paypa1-confirm.xyz/verify%3C/text%3E%3Crect fill='%23d9534f' x='20' y='150' width='120' height='35' rx='3'/%3E%3Ctext x='35' y='173' font-family='Arial' font-size='12' fill='white'%3EVerify Now!%3C/text%3E%3C/svg%3E",
        options: [
            "security@paypal.com",
            "security@paypa1.com (with number 1 instead of letter l)",
            "support@paypal-security.com",
            "noreply@paypal.com"
        ],
        correctAnswer: 1,
        explanation: "The email address 'security@paypa1.com' uses a number 1 instead of the letter 'l', making it look similar to the legitimate PayPal domain. This is a common phishing tactic called 'typosquatting'. The image shows this suspicious email with red flags like urgency, poor grammar, and suspicious links."
    },
    {
        id: 2,
        category: "Phishing Detection",
        question: "Look at the email screenshot. What are the red flags indicating this is a phishing email?",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%23fff3cd' width='500' height='300'/%3E%3Crect fill='white' x='10' y='10' width='480' height='280'/%3E%3Ctext x='20' y='35' font-family='Arial' font-weight='bold' font-size='12' fill='%23d9534f'%3E⚠ SUSPICIOUS SENDER%3C/text%3E%3Ctext x='20' y='55' font-family='Arial' font-size='13' fill='%23333'%3EFrom: admin@bankofamerica.xyz%3C/text%3E%3Ctext x='20' y='75' font-family='Arial' font-size='13' fill='%23333'%3ESubject: Your account has been locked!!!%3C/text%3E%3Ctext x='20' y='100' font-family='Arial' font-size='12' fill='%23666'%3EDear Customer,%3C/text%3E%3Ctext x='20' y='120' font-family='Arial' font-size='12' fill='%23666'%3EYour Bank of America account has suspicious activity.%3C/text%3E%3Ctext x='20' y='140' font-family='Arial' font-size='12' fill='%23666'%3EConfirm your identity: click link below%3C/text%3E%3Ctext x='20' y='160' font-family='Arial' font-size='11' fill='%230066cc'%3Ehttp://bankofamerica-secure-confirm.ru/login%3C/text%3E%3Crect fill='%23d9534f' x='20' y='175' width='150' height='35' rx='3'/%3E%3Ctext x='35' y='198' font-family='Arial' font-size='12' fill='white'%3EConfirm Identity Now%3C/text%3E%3C/svg%3E",
        options: [
            "Only the sender domain (.xyz instead of .com)",
            "Multiple red flags: Wrong domain (.xyz not official), suspicious URL with .ru, urgency, generic greeting, spelling issues",
            "The subject line has too many exclamation marks",
            "The email asks for confirmation"
        ],
        correctAnswer: 1,
        explanation: "This phishing email has multiple red flags: the .xyz domain (not official), a suspicious link with .ru domain, urgency ('locked!!!'), generic 'Dear Customer' greeting, and asks to confirm identity through a link. Real banks never ask to confirm identity via email links."
    },
    {
        id: 3,
        category: "Password Security",
        question: "Which password is the strongest and most secure?",
        options: [
            "Password123",
            "MyDog2024",
            "K7$xM2@pQvL9#wN4",
            "admin123456"
        ],
        correctAnswer: 2,
        explanation: "The password 'K7$xM2@pQvL9#wN4' is strongest because it has 16 characters, includes uppercase, lowercase, numbers, and special characters. Avoid dictionary words, personal information, or predictable patterns."
    },
    {
        id: 4,
        category: "Malware Awareness",
        question: "You receive a USB drive from an unknown sender. What should you do?",
        options: [
            "Plug it in immediately to see what's inside",
            "Give it to a friend to test",
            "Report it to your IT department and don't plug it in",
            "Delete it from your desk"
        ],
        correctAnswer: 2,
        explanation: "Unknown USB drives can contain malware that automatically infects your computer. Always report suspicious physical media to your IT department without plugging it in first."
    },
    {
        id: 5,
        category: "Social Engineering",
        question: "A caller claims to be from IT support and asks for your password. What should you do?",
        options: [
            "Provide your password to verify your identity",
            "Give partial information as a compromise",
            "Hang up and call your IT department directly using a known phone number",
            "Ask them to email you their credentials first"
        ],
        correctAnswer: 2,
        explanation: "Legitimate IT staff will never ask for your password. Hang up immediately and contact IT using an official number from your company directory. This is a common social engineering attack."
    },
    {
        id: 6,
        category: "Data Protection",
        question: "What should you do with sensitive company documents when leaving your desk?",
        options: [
            "Leave them on your desk - it's secure",
            "Lock them in a drawer or take them with you",
            "Email them to your personal account for backup",
            "Share with team members for easy access"
        ],
        correctAnswer: 1,
        explanation: "Always secure sensitive documents by locking them or taking them with you. Never leave confidential information visible on your desk where others can see it."
    },
    {
        id: 7,
        category: "Network Security",
        question: "Is it safe to use public WiFi for online banking?",
        options: [
            "Yes, it's completely safe",
            "Only if you use incognito mode",
            "No, use a VPN or cellular data instead",
            "Only if the network requires a password"
        ],
        correctAnswer: 2,
        explanation: "Public WiFi is insecure. Hackers can intercept your traffic. Always use a VPN when on public networks, or avoid sensitive transactions entirely on public WiFi."
    },
    {
        id: 8,
        category: "Email Security",
        question: "Before clicking a link in an email, what should you do?",
        options: [
            "Click immediately to save time",
            "Hover over the link to see the actual URL",
            "Copy and paste the URL into the address bar",
            "Ask a coworker if they trust the sender"
        ],
        correctAnswer: 1,
        explanation: "Always hover over links to see the actual URL. Phishing emails often disguise malicious URLs to look legitimate. Never click links in suspicious emails - go directly to the official website instead."
    },
    {
        id: 9,
        category: "Two-Factor Authentication",
        question: "What is the main benefit of enabling two-factor authentication (2FA)?",
        options: [
            "It makes your password longer",
            "It slows down your login process",
            "Even if your password is stolen, attackers can't access your account without the second factor",
            "It requires you to change your password weekly"
        ],
        correctAnswer: 2,
        explanation: "2FA adds a second verification layer. Even if your password is compromised, attackers need your phone or authentication app. This significantly reduces the risk of unauthorized access."
    },
    {
        id: 10,
        category: "Backup & Recovery",
        question: "How often should important data be backed up?",
        options: [
            "Once a year is sufficient",
            "Only when you remember to",
            "Regularly and automatically (daily or weekly)",
            "Never, it's not necessary"
        ],
        correctAnswer: 2,
        explanation: "Regular automated backups protect against ransomware, hardware failure, and accidental deletion. Implement an automated backup schedule and regularly verify that backups work correctly."
    },
    {
        id: 11,
        category: "Software Updates",
        question: "Why are software security updates important?",
        options: [
            "They only improve user interface",
            "They patch known vulnerabilities that attackers exploit",
            "They're optional and can be ignored",
            "They only fix cosmetic issues"
        ],
        correctAnswer: 1,
        explanation: "Security updates fix vulnerabilities that attackers actively exploit. Keep your OS, applications, and plugins updated. Enable automatic updates whenever possible."
    },
    {
        id: 12,
        category: "Mobile Security",
        question: "What's critical for securing your mobile device?",
        options: [
            "Never use a lock screen",
            "Use a strong PIN/biometric lock and download apps only from official stores",
            "Jailbreaking increases security",
            "Mobile devices cannot be hacked"
        ],
        correctAnswer: 1,
        explanation: "Use a strong PIN or biometric lock, download only from official app stores, keep your OS updated, and be cautious with app permissions. Mobile devices are increasingly targeted by attackers."
    },
    {
        id: 13,
        category: "Phishing Detection",
        question: "You receive an email asking you to 'confirm your account' with a link. What's the safest action?",
        options: [
            "Click the link immediately",
            "Visit the official website directly without clicking the email link",
            "Reply to the email asking for more information",
            "Forward it to your IT department but click the link first"
        ],
        correctAnswer: 1,
        explanation: "Never click links in unsolicited emails. Go directly to the official website or call using a verified phone number. This is one of the most effective ways to avoid phishing attacks."
    },
    {
        id: 14,
        category: "Social Media Security",
        question: "What should you be cautious about on social media?",
        options: [
            "Nothing - social media is completely safe",
            "Sharing personal info, clicking suspicious links, accepting friend requests from strangers",
            "Using your real name",
            "Posting about your vacation plans"
        ],
        correctAnswer: 1,
        explanation: "Don't share sensitive information, be cautious of phishing links, verify friend requests, and limit location sharing. Cybercriminals use social media for reconnaissance and targeted attacks."
    },
    {
        id: 15,
        category: "Incident Response",
        question: "If you suspect a security breach, what's the first step?",
        options: [
            "Try to fix it yourself",
            "Post about it on social media",
            "Report it to your IT department immediately",
            "Wait and see if anything happens"
        ],
        correctAnswer: 2,
        explanation: "Report security incidents immediately to your IT/security team. Don't attempt fixes yourself, as this could destroy evidence or worsen the situation."
    },
    {
        id: 16,
        category: "Data Protection",
        question: "How should you properly dispose of devices containing sensitive data?",
        options: [
            "Throw them in the trash",
            "Delete all files and recycle normally",
            "Use certified data destruction or secure wiping tools",
            "Donate to charity without cleaning"
        ],
        correctAnswer: 2,
        explanation: "Use certified e-waste recyclers or secure wiping tools that prevent data recovery. Simply deleting files isn't sufficient - data can be recovered from drives."
    },
    {
        id: 17,
        category: "Network Security",
        question: "What should you check when connecting to a public WiFi network?",
        options: [
            "Nothing, just connect",
            "The network name and use a VPN",
            "Only if it's password protected",
            "Ask the coffee shop attendant first"
        ],
        correctAnswer: 1,
        explanation: "Verify the network name with staff, use a VPN if connecting, and avoid banking/sensitive transactions. Even password-protected public WiFi can be compromised by other users on the network."
    },
    {
        id: 18,
        category: "Password Security",
        question: "Where should you store your passwords?",
        options: [
            "In a spreadsheet on your desktop",
            "On a sticky note on your monitor",
            "In a reputable password manager like Bitwarden or 1Password",
            "In a text file on your computer"
        ],
        correctAnswer: 2,
        explanation: "Use reputable password managers that encrypt passwords securely and generate strong passwords. Never write passwords down or store them in unencrypted files."
    },
    {
        id: 19,
        category: "Malware Awareness",
        question: "Which of these indicates your computer might be infected with malware?",
        options: [
            "Slow performance, unexpected pop-ups, and unfamiliar programs",
            "Your computer is working normally",
            "Only if you see a virus warning",
            "None of these"
        ],
        correctAnswer: 0,
        explanation: "Warning signs include slow performance, unexpected pop-ups, new browser toolbars, and unfamiliar programs. If you notice these, run a malware scan with updated antivirus software."
    },
    {
        id: 20,
        category: "Security Awareness",
        question: "What's the most important aspect of cybersecurity?",
        options: [
            "Having expensive security tools",
            "Human awareness and following security practices",
            "Blaming others when breaches happen",
            "Assuming your company's IT has everything covered"
        ],
        correctAnswer: 1,
        explanation: "Human awareness is critical - most breaches involve human error. Follow security policies, think before clicking, report suspicious activity, and stay informed about threats."
    }
];

// ===== API ENDPOINTS =====
const API_URL = `${window.location.origin}/api`;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadUserProfile();
});

function initializeApp() {
    appState.attemptId = generateUniqueId();
    updateStaticStats();
    console.log('App initialized');
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            switchPage(page);
        });
    });

    // User button
    document.getElementById('user-btn').addEventListener('click', () => {
        document.getElementById('user-modal').classList.add('active');
    });

    // User modal
    document.getElementById('user-modal').addEventListener('click', (e) => {
        if (e.target.id === 'user-modal' || e.target.classList.contains('modal-close')) {
            document.getElementById('user-modal').classList.remove('active');
        }
    });

    // Profile form
    document.getElementById('profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveUserProfile();
    });

    // Learning categories
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            document.querySelectorAll('.lesson-panel').forEach(p => p.classList.remove('active'));
            document.getElementById('lesson-' + category).classList.add('active');
        });
    });

    // Quiz controls
    document.getElementById('quiz-next').addEventListener('click', nextQuestion);
    document.getElementById('quiz-prev').addEventListener('click', previousQuestion);

    setupVerificationLab();
}

// ===== PAGE NAVIGATION =====
function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page + '-page').classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    window.scrollTo(0, 0);

    if (page === 'quiz') {
        initializeQuiz();
    } else if (page === 'dashboard') {
        loadDashboard();
    } else if (page === 'leaderboard') {
        loadLeaderboard();
    }
}

// ===== PHISHING VERIFICATION LAB =====
function setupVerificationLab() {
    const fileInput = document.getElementById('verification-file');
    const browseBtn = document.getElementById('verification-browse');
    const dropzone = document.getElementById('verification-dropzone');
    const analyzeBtn = document.getElementById('verification-analyze');
    const resetBtn = document.getElementById('verification-reset');

    if (!fileInput || !browseBtn || !dropzone || !analyzeBtn || !resetBtn) return;

    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => handleVerificationFile(fileInput.files[0]));
    analyzeBtn.addEventListener('click', analyzeVerificationMaterial);
    resetBtn.addEventListener('click', resetVerificationLab);

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.remove('dragover');
        });
    });

    dropzone.addEventListener('drop', (event) => {
        handleVerificationFile(event.dataTransfer.files[0]);
    });
}

function handleVerificationFile(file) {
    if (!file) return;

    appState.verificationFile = file;
    appState.verificationPreview = null;
    appState.verificationText = '';
    appState.verificationOcrText = '';
    appState.verificationOcrStatus = '';

    const dropzone = document.getElementById('verification-dropzone');
    dropzone.querySelector('h2').textContent = file.name;
    dropzone.querySelector('p').textContent = `${formatFileSize(file.size)} • ${file.type || 'Unknown file type'}`;

    let previewPromise = Promise.resolve();
    if (file.type.startsWith('image/')) {
        previewPromise = new Promise(resolve => {
            const imageReader = new FileReader();
            imageReader.onload = () => {
                appState.verificationPreview = imageReader.result;
                resolve();
            };
            imageReader.onerror = resolve;
            imageReader.readAsDataURL(file);
        });
    }

    const textPromise = new Promise(resolve => {
        const textReader = new FileReader();
        textReader.onload = () => {
            appState.verificationText = extractReadableText(textReader.result);
            resolve();
        };
        textReader.onerror = resolve;
        textReader.readAsArrayBuffer(file);
    });

    appState.verificationReadPromise = Promise.all([previewPromise, textPromise]);
}

async function analyzeVerificationMaterial() {
    const notes = document.getElementById('verification-notes').value.trim();
    const file = appState.verificationFile;

    if (!file && !notes) {
        renderVerificationMessage('Add a file or paste message details first.');
        return;
    }

    const analyzeBtn = document.getElementById('verification-analyze');
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing';

    try {
        await appState.verificationReadPromise;

        if (file?.type.startsWith('image/') && appState.verificationPreview) {
            renderVerificationMessage('Reading screenshot text with OCR. This can take a few seconds.');
            await runScreenshotOcr();
        }

        const content = [
            file ? file.name : '',
            file ? file.type : '',
            appState.verificationText,
            appState.verificationOcrText,
            notes
        ].join('\n');

        const result = evaluatePhishingRisk(file, content, notes);
        renderVerificationResult(result);
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-magnifying-glass-chart"></i> Analyze';
    }
}

async function runScreenshotOcr() {
    if (!window.Tesseract) {
        appState.verificationOcrStatus = 'OCR library could not load. Screenshot text was not readable automatically.';
        return;
    }

    try {
        appState.verificationOcrStatus = 'OCR completed.';
        const result = await Tesseract.recognize(appState.verificationPreview, 'eng');
        appState.verificationOcrText = result?.data?.text?.trim() || '';
        if (!appState.verificationOcrText) {
            appState.verificationOcrStatus = 'OCR completed but no readable screenshot text was found.';
        }
    } catch (error) {
        appState.verificationOcrStatus = 'OCR failed. Screenshot text was not readable automatically.';
        appState.verificationOcrText = '';
    }
}

function evaluatePhishingRisk(file, content, notes) {
    const text = content.toLowerCase();
    const signals = [];
    const links = extractUrls(content);
    const isImage = Boolean(file?.type.startsWith('image/'));
    const hasOcrText = appState.verificationOcrText.length > 12;
    let score = 0;

    const addSignal = (severity, title, detail) => {
        const weights = { low: 8, medium: 18, high: 30 };
        score += weights[severity] || 8;
        signals.push({ severity, title, detail });
    };

    if (file) {
        const extension = getFileExtension(file.name);
        const riskyExtensions = ['exe', 'scr', 'bat', 'cmd', 'js', 'jse', 'vbs', 'wsf', 'ps1', 'msi', 'apk', 'jar', 'lnk', 'iso'];
        const documentExtensions = ['doc', 'docm', 'xls', 'xlsm', 'ppt', 'pptm', 'pdf', 'html', 'htm', 'eml', 'url'];

        if (riskyExtensions.includes(extension)) {
            addSignal('high', 'Risky attachment type', `.${extension} files can execute code or install malware.`);
        } else if (documentExtensions.includes(extension)) {
            addSignal('medium', 'Attachment needs caution', `.${extension} files are commonly abused in phishing campaigns.`);
        }

        if (/\.(pdf|docx?|xlsx?|pptx?)\.(exe|scr|js|vbs|bat|cmd)$/i.test(file.name)) {
            addSignal('high', 'Double extension detected', 'The filename appears to hide an executable behind a document-like name.');
        }

        if (isImage && hasOcrText) {
            addSignal('low', 'Screenshot text extracted', 'OCR found readable text in the uploaded image and included it in this analysis.');
        } else if (isImage && !notes) {
            addSignal('medium', 'Screenshot text not readable', 'The image could not be read automatically. Treat unknown screenshots as suspicious until the sender and link are verified.');
        }
    }

    const urgentPatterns = [
        'urgent', 'immediately', 'verify now', 'account locked', 'suspended', 'final warning',
        'limited time', 'act now', 'security alert', 'unauthorized login', 'payment failed',
        'unusual activity', 'restricted', 'blocked', 'expired', 'last chance', '24 hours',
        'confirm now', 'action required', 'your account will be closed'
    ];
    const foundUrgency = urgentPatterns.filter(term => text.includes(term));
    if (foundUrgency.length) {
        addSignal('medium', 'Urgency or pressure language', `Found: ${foundUrgency.slice(0, 4).join(', ')}.`);
    }

    const credentialPatterns = [
        'password', 'login', 'sign in', 'verify your account', 'confirm your identity',
        'update billing', 'bank account', 'credit card', 'otp', 'one time password',
        'reset your password', 'enter your details', 'authenticate', 're-activate',
        'recover account', 'billing information', 'card number'
    ];
    const foundCredentials = credentialPatterns.filter(term => text.includes(term));
    if (foundCredentials.length) {
        addSignal('high', 'Credential or payment request', `The content asks for sensitive account, login, OTP, or payment information.`);
    }

    if (/dear (customer|user|member|valued customer)/i.test(content)) {
        addSignal('low', 'Generic greeting', 'Generic greetings are common in broad phishing messages.');
    }

    if (/(click here|tap here|open attachment|download|scan qr|verify|view document|claim|unlock|restore access)/i.test(content)) {
        addSignal('medium', 'Suspicious action request', 'The message pushes the user to click, download, verify, claim, or restore access.');
    }

    if (/(gift card|prize|winner|lottery|refund|invoice|payment|wire transfer|crypto|bitcoin|airdrop)/i.test(content)) {
        addSignal('medium', 'Financial or reward lure', 'Money, reward, invoice, refund, or crypto language is often used to pressure victims.');
    }

    if (/(qr code|scan qr|scan the code)/i.test(content)) {
        addSignal('high', 'QR-code phishing risk', 'QR codes can hide malicious links and bypass normal link preview checks.');
    }

    if (/(from:|sender:|reply-to:)/i.test(content) && /(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)/i.test(content) && mentionedKnownOrganization(text)) {
        addSignal('medium', 'Brand message from personal email', 'A business or service message appears to come from a free personal email provider.');
    }

    links.forEach(link => {
        const urlSignal = inspectUrl(link);
        if (urlSignal) {
            addSignal(urlSignal.severity, urlSignal.title, urlSignal.detail);
        }
    });

    const brandTerms = ['paypal', 'microsoft', 'google', 'apple', 'amazon', 'bank', 'netflix', 'instagram', 'facebook', 'whatsapp', 'dhl', 'fedex'];
    const mentionedBrands = brandTerms.filter(brand => text.includes(brand));
    if (mentionedBrands.length && links.some(link => isBrandMismatch(link, mentionedBrands))) {
        addSignal('high', 'Possible brand impersonation', 'A known brand is mentioned, but at least one link does not appear to match that brand domain.');
    }

    if (/http:\/\/(?!localhost)/i.test(content)) {
        addSignal('medium', 'Insecure HTTP link', 'Sensitive login or payment pages should use HTTPS.');
    }

    if (isImage && !hasOcrText && !notes) {
        score = Math.max(score, 40);
    }

    if (!signals.length) {
        signals.push({
            severity: 'low',
            title: 'No obvious phishing indicators found',
            detail: 'No high-risk signals were detected from the available text and metadata.'
        });
    }

    score = Math.min(100, score);

    let verdict = 'Likely Safe';
    let summary = 'No major phishing indicators were detected, but still verify the sender through official channels.';
    let color = 'var(--success)';

    if (score >= 65) {
        verdict = 'High Phishing Risk';
        summary = 'Treat this as suspicious. Do not click links, open attachments, or provide credentials.';
        color = 'var(--danger)';
    } else if (score >= 35) {
        verdict = isImage && !hasOcrText && !notes ? 'Needs Manual Review' : 'Suspicious';
        summary = 'Several warning signs were found. Verify independently before taking action.';
        color = 'var(--warning)';
    }

    return {
        file,
        verdict,
        summary,
        score,
        color,
        signals,
        links,
        ocrText: appState.verificationOcrText,
        ocrStatus: appState.verificationOcrStatus,
        actions: buildVerificationActions(score, file, links)
    };
}

function inspectUrl(rawUrl) {
    try {
        const normalized = rawUrl.match(/^https?:\/\//i) ? rawUrl : `https://${rawUrl}`;
        const url = new URL(normalized);
        const host = url.hostname.toLowerCase();
        const suspiciousTlds = ['zip', 'mov', 'top', 'xyz', 'click', 'work', 'support', 'country', 'ru', 'cn', 'tk'];

        if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
            return { severity: 'high', title: 'IP address link', detail: `${rawUrl} uses an IP address instead of a trusted domain.` };
        }

        if (host.includes('@')) {
            return { severity: 'high', title: 'Deceptive URL format', detail: `${rawUrl} contains an @ symbol, which can hide the real destination.` };
        }

        const parts = host.split('.');
        const tld = parts[parts.length - 1];
        if (suspiciousTlds.includes(tld)) {
            return { severity: 'medium', title: 'Suspicious top-level domain', detail: `${host} uses .${tld}, which is often abused in phishing links.` };
        }

        if (host.length > 45 || (host.match(/-/g) || []).length >= 3) {
            return { severity: 'medium', title: 'Unusual domain shape', detail: `${host} is unusually long or heavily hyphenated.` };
        }

        if (/(paypa1|micros0ft|g00gle|arnazon|faceb00k|app1e)/i.test(host)) {
            return { severity: 'high', title: 'Lookalike domain', detail: `${host} appears to imitate a trusted brand with similar-looking characters.` };
        }

        if (/(secure|verify|login|account|support|billing|update).*(paypal|microsoft|google|apple|amazon|bank)|(paypal|microsoft|google|apple|amazon|bank).*(secure|verify|login|account|support|billing|update)/i.test(host) && !isKnownOfficialDomain(host)) {
            return { severity: 'high', title: 'Brand-themed suspicious domain', detail: `${host} combines a trusted brand with login, billing, support, or verification words.` };
        }
    } catch (error) {
        return { severity: 'medium', title: 'Malformed link', detail: `${rawUrl} could not be parsed as a normal URL.` };
    }

    return null;
}

function isBrandMismatch(rawUrl, brands) {
    try {
        const normalized = rawUrl.match(/^https?:\/\//i) ? rawUrl : `https://${rawUrl}`;
        const host = new URL(normalized).hostname.toLowerCase();
        return brands.some(brand => {
            if (brand === 'bank') return host.includes('bank') && !host.endsWith('.com');
            return !host.includes(brand) && rawUrl.toLowerCase().includes(brand);
        });
    } catch (error) {
        return false;
    }
}

function mentionedKnownOrganization(text) {
    return /(paypal|microsoft|google|apple|amazon|netflix|instagram|facebook|whatsapp|bank|dhl|fedex|ups|irs|tax|government)/i.test(text);
}

function isKnownOfficialDomain(host) {
    const officialDomains = [
        'paypal.com',
        'microsoft.com',
        'live.com',
        'office.com',
        'google.com',
        'apple.com',
        'amazon.com',
        'netflix.com',
        'instagram.com',
        'facebook.com',
        'whatsapp.com',
        'dhl.com',
        'fedex.com',
        'ups.com'
    ];

    return officialDomains.some(domain => host === domain || host.endsWith(`.${domain}`));
}

function buildVerificationActions(score, file, links) {
    const actions = [];

    if (score >= 65) {
        actions.push('Do not click links, scan QR codes, open attachments, or reply.');
        actions.push('Report it to your IT/security team or mark it as phishing in your email client.');
    } else if (score >= 35) {
        actions.push('Verify the sender through a known phone number, official website, or trusted channel.');
        actions.push('Open the official website manually instead of using links from the message.');
    } else {
        actions.push('Still confirm unexpected requests through an official channel before sharing sensitive data.');
    }

    if (file && file.type.startsWith('image/')) {
        actions.push('For screenshot analysis, paste the visible sender address and URL text for a stronger result.');
    }

    if (links.length) {
        actions.push('Hover or inspect links carefully and compare the domain with the official organization domain.');
    }

    return actions;
}

function renderVerificationResult(result) {
    const results = document.getElementById('verification-results');
    const file = result.file;
    const imagePreview = result.file?.type.startsWith('image/') && appState.verificationPreview
        ? `<img src="${appState.verificationPreview}" class="preview-image" alt="Uploaded image preview">`
        : '';

    results.style.setProperty('--risk-color', result.color);
    results.style.setProperty('--risk-angle', `${(result.score / 100) * 360}deg`);
    results.innerHTML = `
        <div class="verdict-header">
            <div class="risk-meter"><span>${result.score}%</span></div>
            <div class="verdict-title">
                <h2>${result.verdict}</h2>
                <p>${result.summary}</p>
            </div>
        </div>
        ${file ? `
            <div class="file-summary">
                <div class="file-summary-item"><span>File name</span><strong>${escapeHtml(file.name)}</strong></div>
                <div class="file-summary-item"><span>Type</span><strong>${escapeHtml(file.type || 'Unknown')}</strong></div>
                <div class="file-summary-item"><span>Size</span><strong>${formatFileSize(file.size)}</strong></div>
            </div>
            ${imagePreview}
        ` : ''}
        <div class="signal-section">
            <h3>Detected Evidence</h3>
            <ul class="signal-list">
                ${result.signals.map(signal => `
                    <li style="--signal-color: ${getSignalColor(signal.severity)}">
                        <strong>${escapeHtml(signal.title)}</strong>
                        <small>${escapeHtml(signal.detail)}</small>
                    </li>
                `).join('')}
            </ul>
        </div>
        ${result.links.length ? `
            <div class="signal-section">
                <h3>Extracted Links</h3>
                <div class="extracted-links">
                    ${result.links.slice(0, 8).map(link => `<span class="extracted-link">${escapeHtml(link)}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        ${result.ocrText ? `
            <div class="signal-section">
                <h3>Text Read From Screenshot</h3>
                <div class="extracted-text">${escapeHtml(result.ocrText.slice(0, 1200))}</div>
            </div>
        ` : result.ocrStatus ? `
            <div class="signal-section">
                <h3>Screenshot OCR</h3>
                <div class="extracted-text">${escapeHtml(result.ocrStatus)}</div>
            </div>
        ` : ''}
        <div class="signal-section">
            <h3>Recommended Next Steps</h3>
            <ul class="action-list">
                ${result.actions.map(action => `<li>${escapeHtml(action)}</li>`).join('')}
            </ul>
        </div>
    `;
}

function renderVerificationMessage(message) {
    document.getElementById('verification-results').innerHTML = `
        <div class="verification-empty">
            <i class="fas fa-circle-info"></i>
            <h2>More details needed</h2>
            <p>${escapeHtml(message)}</p>
        </div>
    `;
}

function resetVerificationLab() {
    appState.verificationFile = null;
    appState.verificationPreview = null;
    appState.verificationText = '';
    appState.verificationOcrText = '';
    appState.verificationOcrStatus = '';
    document.getElementById('verification-file').value = '';
    document.getElementById('verification-notes').value = '';
    document.getElementById('verification-dropzone').querySelector('h2').textContent = 'Upload Suspicious Material';
    document.getElementById('verification-dropzone').querySelector('p').textContent = 'Drag and drop a file here, or choose a file from your computer.';
    document.getElementById('verification-results').innerHTML = `
        <div class="verification-empty">
            <i class="fas fa-shield-halved"></i>
            <h2>No file analyzed yet</h2>
            <p>Your verdict, risk score, evidence, and next steps will appear here.</p>
        </div>
    `;
}

// ===== USER MANAGEMENT =====
function loadUserProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        const profile = JSON.parse(saved);
        appState.currentUser = { ...appState.currentUser, ...profile };
        document.getElementById('user-name').textContent = profile.name || 'Guest';
    }
}

function saveUserProfile() {
    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;
    const dept = document.getElementById('student-dept').value;

    appState.currentUser = { 
        id: appState.currentUser.id || generateUniqueId(),
        name: name,
        email: email,
        department: dept
    };

    localStorage.setItem('userProfile', JSON.stringify(appState.currentUser));
    document.getElementById('user-name').textContent = name;
    document.getElementById('user-modal').classList.remove('active');

    // Save to backend
    saveUserToBackend();
}

async function saveUserToBackend() {
    try {
        await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appState.currentUser)
        });
    } catch (error) {
        console.log('Backend not available, using local storage');
    }
}

// ===== QUIZ FUNCTIONALITY =====
function initializeQuiz() {
    appState.currentQuestion = 0;
    appState.answers = {};
    appState.quizActive = true;
    appState.startTime = Date.now();
    appState.endTime = null;

    displayQuestion(0);
    updateProgressBar();
}

function displayQuestion(index) {
    const container = document.getElementById('quiz-questions-container');
    const q = quizQuestions[index];

    if (!q) return;

    container.innerHTML = `
        <div class="quiz-question">
            <h3>${q.question}</h3>
            ${q.image ? `<img src="${q.image}" class="question-image" alt="Question image">` : ''}
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <label class="quiz-option">
                        <input type="radio" name="answer" value="${i}" ${appState.answers[q.id] === i ? 'checked' : ''}>
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    // Add change listeners
    container.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.answers[q.id] = parseInt(e.target.value);
            e.target.closest('.quiz-option').classList.add('selected');
            updateProgressBar();
        });
    });

    // Update progress
    document.getElementById('current-q').textContent = index + 1;
    updateProgressBar();
    updateQuizButtons();
}

function updateProgressBar() {
    const progress = ((appState.currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('quiz-progress').style.width = progress + '%';
}

function nextQuestion() {
    if (appState.currentQuestion < quizQuestions.length - 1) {
        appState.currentQuestion++;
        displayQuestion(appState.currentQuestion);
    } else {
        submitQuiz();
    }
}

function previousQuestion() {
    if (appState.currentQuestion > 0) {
        appState.currentQuestion--;
        displayQuestion(appState.currentQuestion);
    }
}

function updateQuizButtons() {
    document.getElementById('quiz-prev').disabled = appState.currentQuestion === 0;
    
    const nextBtn = document.getElementById('quiz-next');
    if (appState.currentQuestion === quizQuestions.length - 1) {
        nextBtn.textContent = 'Submit Quiz';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

function submitQuiz() {
    appState.endTime = Date.now();
    calculateResults();
}

function calculateResults() {
    let correctCount = 0;
    const categoryScores = {};

    quizQuestions.forEach(q => {
        const userAnswer = appState.answers[q.id];
        
        if (!categoryScores[q.category]) {
            categoryScores[q.category] = { correct: 0, total: 0 };
        }
        
        categoryScores[q.category].total++;
        
        if (userAnswer === q.correctAnswer) {
            correctCount++;
            categoryScores[q.category].correct++;
        }
    });

    const percentage = Math.round((correctCount / quizQuestions.length) * 100);
    const timeTaken = Math.floor((appState.endTime - appState.startTime) / 1000);

    // Prepare attempt data
    const attemptData = {
        attemptId: appState.attemptId,
        userId: appState.currentUser.id,
        userName: appState.currentUser.name,
        score: percentage,
        correctAnswers: correctCount,
        totalQuestions: quizQuestions.length,
        timeTaken: formatTime(timeTaken),
        timestamp: new Date().toISOString(),
        answers: appState.answers,
        categoryScores: categoryScores
    };

    // Save attempt
    saveAttempt(attemptData);

    // Display results
    displayResults(attemptData);
}

function displayResults(attempt) {
    // Set score
    const scorePercent = (attempt.score / 100) * 360;
    document.documentElement.style.setProperty('--score-percent', scorePercent + 'deg');
    document.getElementById('results-score').textContent = attempt.score + '%';

    // Set title and message
    const title = document.getElementById('results-title');
    const message = document.getElementById('results-message');

    if (attempt.score >= 90) {
        title.textContent = '🏆 Excellent!';
        message.textContent = 'Outstanding cybersecurity knowledge!';
    } else if (attempt.score >= 75) {
        title.textContent = '✓ Great Job!';
        message.textContent = 'You demonstrated solid cybersecurity awareness';
    } else if (attempt.score >= 60) {
        title.textContent = 'Good Effort!';
        message.textContent = 'You have decent knowledge. Review the weak areas.';
    } else {
        title.textContent = 'Keep Learning';
        message.textContent = 'Focus on improving your cybersecurity awareness.';
    }

    // Set stats
    document.getElementById('results-correct').textContent = attempt.correctAnswers + '/' + attempt.totalQuestions;
    document.getElementById('results-time').textContent = attempt.timeTaken;
    document.getElementById('results-accuracy').textContent = attempt.score + '%';

    // Display category breakdown
    const breakdown = document.getElementById('results-category-breakdown');
    breakdown.innerHTML = Object.entries(attempt.categoryScores).map(([cat, scores]) => {
        const percent = Math.round((scores.correct / scores.total) * 100);
        return `
            <div class="chart-bar">
                <div class="chart-label">${cat}</div>
                <div class="chart-fill">
                    <div class="chart-progress" style="width: ${percent}%">${scores.correct}/${scores.total}</div>
                </div>
            </div>
        `;
    }).join('');

    // Display recommendations
    const recList = document.getElementById('results-recommendations-list');
    const weakAreas = Object.entries(attempt.categoryScores)
        .filter(([_, scores]) => (scores.correct / scores.total) < 0.7)
        .map(([cat, _]) => cat);

    if (weakAreas.length === 0) {
        recList.innerHTML = '<p style="color: var(--success);">Excellent! Continue maintaining your cybersecurity practices.</p>';
    } else {
        recList.innerHTML = weakAreas.map(cat => `
            <div style="padding: 0.75rem; background: rgba(0, 102, 255, 0.1); border-left: 3px solid var(--primary); margin-bottom: 0.75rem; border-radius: 4px;">
                <strong>${cat}</strong><br>
                <small>Review lessons in this category to improve your knowledge</small>
            </div>
        `).join('');
    }

    switchPage('results');
}

function saveAttempt(attempt) {
    // Save to local storage
    let attempts = JSON.parse(localStorage.getItem('quizAttempts')) || [];
    attempts.unshift(attempt);
    attempts = attempts.slice(0, 20); // Keep last 20
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));

    appState.allAttempts = attempts;

    // Save to backend
    saveAttemptToBackend(attempt);
}

async function saveAttemptToBackend(attempt) {
    try {
        await fetch(`${API_URL}/attempts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attempt)
        });
        console.log('Attempt saved to backend');
    } catch (error) {
        console.log('Backend not available');
    }
}

// ===== DASHBOARD =====
function loadDashboard() {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts')) || [];
    
    if (attempts.length === 0) {
        document.getElementById('dashboard-score').textContent = '0%';
        document.getElementById('score-label').textContent = 'Not Started';
        document.getElementById('attempts-count').textContent = '0';
        return;
    }

    // Calculate stats
    const scores = attempts.map(a => a.score);
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const lastScore = scores[0];
    const certificates = scores.filter(s => s >= 75).length;

    // Set score circle
    const scorePercent = (avgScore / 100) * 360;
    document.documentElement.style.setProperty('--score-percent', scorePercent + 'deg');
    document.getElementById('dashboard-score').textContent = avgScore + '%';
    document.getElementById('score-label').textContent = avgScore >= 75 ? 'Excellent' : avgScore >= 60 ? 'Good' : 'Improving';
    document.getElementById('attempts-count').textContent = attempts.length;
    document.getElementById('certificates-count').textContent = certificates;

    // Category performance
    const categoryStats = {};
    attempts.forEach(attempt => {
        Object.entries(attempt.categoryScores || {}).forEach(([cat, scores]) => {
            if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 };
            categoryStats[cat].correct += scores.correct;
            categoryStats[cat].total += scores.total;
        });
    });

    const catChart = document.getElementById('category-performance');
    catChart.innerHTML = Object.entries(categoryStats).map(([cat, stats]) => {
        const percent = Math.round((stats.correct / stats.total) * 100);
        return `
            <div class="chart-bar">
                <div class="chart-label">${cat}</div>
                <div class="chart-fill">
                    <div class="chart-progress" style="width: ${percent}%">${percent}%</div>
                </div>
            </div>
        `;
    }).join('');

    // Recent attempts
    const attemptsTable = document.getElementById('recent-attempts');
    attemptsTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Correct</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                ${attempts.slice(0, 5).map(a => `
                    <tr>
                        <td>${new Date(a.timestamp).toLocaleDateString()}</td>
                        <td><strong>${a.score}%</strong></td>
                        <td>${a.correctAnswers}/${a.totalQuestions}</td>
                        <td>${a.timeTaken}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ===== LEADERBOARD =====
function loadLeaderboard() {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts')) || [];
    
    // Group by user and get best score
    const userScores = {};
    attempts.forEach(attempt => {
        const userId = attempt.userId || 'Guest';
        if (!userScores[userId]) {
            userScores[userId] = {
                name: attempt.userName || 'Anonymous',
                score: 0,
                attempts: 0,
                dept: attempt.department || 'N/A'
            };
        }
        userScores[userId].attempts++;
        userScores[userId].score = Math.max(userScores[userId].score, attempt.score);
    });

    // Sort by score
    const sorted = Object.entries(userScores)
        .sort((a, b) => b[1].score - a[1].score)
        .slice(0, 20);

    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = sorted.map((entry, index) => {
        const [_, user] = entry;
        const certs = Math.floor(user.attempts / 2);
        return `
            <tr>
                <td>#${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.dept}</td>
                <td><strong>${user.score}%</strong></td>
                <td>${user.attempts}</td>
                <td>${certs}</td>
            </tr>
        `;
    }).join('');
}

// ===== UTILITIES =====
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function generateUniqueId() {
    return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function updateStaticStats() {
    const statStudents = document.getElementById('stat-students');
    const statQuestions = document.getElementById('stat-questions');
    
    if (statStudents) {
        const attempts = JSON.parse(localStorage.getItem('quizAttempts')) || [];
        const uniqueUsers = new Set(attempts.map(a => a.userId)).size;
        statStudents.textContent = (5000 + uniqueUsers) + '+';
    }
}

function extractReadableText(buffer) {
    try {
        const decoded = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
        return decoded
            .replace(/[^\x09\x0A\x0D\x20-\x7E]+/g, ' ')
            .replace(/\s+/g, ' ')
            .slice(0, 250000);
    } catch (error) {
        return '';
    }
}

function extractUrls(text) {
    const matches = text.match(/\b((https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s"'<>]*)?)/gi) || [];
    return [...new Set(matches.map(url => url.replace(/[),.;]+$/, '')))];
}

function getFileExtension(filename) {
    const parts = filename.toLowerCase().split('.');
    return parts.length > 1 ? parts.pop() : '';
}

function formatFileSize(bytes) {
    if (!Number.isFinite(bytes) || bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const size = bytes / Math.pow(1024, index);
    return `${size.toFixed(size >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function getSignalColor(severity) {
    if (severity === 'high') return 'var(--danger)';
    if (severity === 'medium') return 'var(--warning)';
    return 'var(--primary)';
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function downloadCertificate() {
    const name = appState.currentUser.name || 'Student';
    const score = document.getElementById('results-score').textContent;
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const cert = `
╔══════════════════════════════════════════════════════════╗
║                 CERTIFICATE OF COMPLETION                ║
╚══════════════════════════════════════════════════════════╝

This is to certify that

    ${name}

has successfully completed the

    CyberGuard Academy Cybersecurity Awareness Training

with a score of

    ${score}%

Date: ${date}

This certificate acknowledges the completion of professional
cybersecurity awareness training in accordance with industry
standards for information security education.

────────────────────────────────────────────────────────────
CyberGuard Academy | www.cyberguardacademy.com
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cert));
    element.setAttribute('download', `Certificate-${name}-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function printCertificate() {
    window.print();
}

function shareResults() {
    const score = document.getElementById('results-score').textContent;
    const text = `I scored ${score}% on the CyberGuard Academy Cybersecurity Awareness Assessment! Test your cybersecurity knowledge. #CyberSecurity #Training`;
    
    if (navigator.share) {
        navigator.share({
            title: 'CyberGuard Academy Results',
            text: text,
            url: window.location.href
        });
    } else {
        alert('Results to share:\n' + text);
    }
}

// Initialize stats
console.log('Professional CyberGuard Academy loaded');
