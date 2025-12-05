// Naso Stream 3D Effects
class NasoEffects {
    constructor() {
        this.init();
        this.createFloatingHearts();
    }

    init() {
        this.initMouseEffects();
        this.initLiveStreamEffects();
        this.initChatAnimations();
    }

    initMouseEffects() {
        document.addEventListener('mousemove', (e) => {
            // Custom cursor
            const cursor = document.querySelector('.custom-cursor');
            const ring = document.querySelector('.cursor-ring');
            
            if (cursor) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }
            
            if (ring) {
                ring.style.left = e.clientX + 'px';
                ring.style.top = e.clientY + 'px';
            }

            // 3D parallax effect
            this.applyParallax(e);
        });
    }

    applyParallax(e) {
        const elements = document.querySelectorAll('[data-depth]');
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        elements.forEach(el => {
            const depth = parseFloat(el.getAttribute('data-depth'));
            const x = (e.clientX - centerX) * depth * 0.01;
            const y = (e.clientY - centerY) * depth * 0.01;
            
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }

    initLiveStreamEffects() {
        // Live stream heartbeat effect
        const liveBadges = document.querySelectorAll('.live-badge');
        liveBadges.forEach(badge => {
            setInterval(() => {
                badge.style.transform = badge.style.transform === 'scale(1.1)' ? 
                    'scale(1)' : 'scale(1.1)';
            }, 1000);
        });

        // Create floating chat messages
        this.createFloatingChats();
    }

    createFloatingChats() {
        const messages = [
            "🔥 هذا البث رائع!",
            "❤️ أحب هذا المحتوى",
            "🎁 شكراً على البث",
            "👍 ممتاز جداً",
            "🚀 استمر يا بطل"
        ];

        setInterval(() => {
            this.createChatBubble(messages[Math.floor(Math.random() * messages.length)]);
        }, 3000);
    }

    createChatBubble(message) {
        const bubble = document.createElement('div');
        bubble.className = 'floating-chat';
        bubble.innerHTML = `<div class="chat-bubble">${message}</div>`;
        
        // Random position
        bubble.style.left = Math.random() * 80 + 10 + '%';
        bubble.style.top = Math.random() * 80 + 10 + '%';
        
        document.querySelector('.hero-visual').appendChild(bubble);
        
        // Remove after animation
        setTimeout(() => {
            bubble.remove();
        }, 5000);
    }

    createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            
            document.body.appendChild(heart);
            
            // Animate heart
            const animation = heart.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-100vh) scale(0)', opacity: 0 }
            ], {
                duration: 3000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            animation.onfinish = () => heart.remove();
        }, 1000);
    }

    initChatAnimations() {
        // Chat message animations
        document.addEventListener('DOMContentLoaded', () => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && chatInput.value.trim()) {
                        this.sendChatMessage(chatInput.value);
                        chatInput.value = '';
                    }
                });
            }
        });
    }

    sendChatMessage(message) {
        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <strong>أنت:</strong> ${message}
            </div>
        `;
        
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Add animation
        messageElement.animate([
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 300 });
    }
}

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
    window.nasoEffects = new NasoEffects();
});  