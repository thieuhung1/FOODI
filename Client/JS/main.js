// Client/JS/main.js - Cart Logic + Utils (Clean version - Fixed 'các' garbage)

// Food data (hardcoded, using existing images)
const foods = [
    { id: 1, name: 'Phở Bò', price: 65000, img: '../ASSETS/Images/phở bò.jpeg' },
    { id: 2, name: 'Bánh Mì', price: 25000, img: '../ASSETS/Images/bánh mì.jpg' },
    { id: 3, name: 'Bánh Xèo', price: 45000, img: '../ASSETS/Images/bánh xèo.jpg' },
    { id: 4, name: 'Gỏi Cuốn', price: 30000, img: '../ASSETS/Images/Gỏi cuốn.webp' },
    { id: 5, name: 'Mì Quảng', price: 55000, img: '../ASSETS/Images/mì quảng.jpg' },
    { id: 6, name: 'Chả Cuốn', price: 35000, img: '../ASSETS/Images/chả cuốn.jpg' }
];

// Cart (localStorage)
let cart = JSON.parse(localStorage.getItem('foodi_cart')) || [];

// Load components dynamically
async function loadComponent(path, targetId) {
    try {
        const response = await fetch(path);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.getElementById(targetId).innerHTML = doc.body.innerHTML;
    } catch (e) {
        console.error('Component load failed:', path);
        document.getElementById(targetId).innerHTML = '<p>Error loading component</p>';
    }
}

// ===== HÀM GIẢI THÍCH =====
// 1. updateCartBadge(): Cập nhật số lượng badge giỏ hàng từ cart array
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
    }
}

// 2. addToCart(id): Thêm món vào cart, loading spinner, shake feedback, lưu localStorage
function addToCart(id) {
    const food = foods.find(f => f.id === id);
    if (!food) return;

    const existing = cart.find(item => item.id === id);
    const btn = event?.target?.closest('.add-to-cart-btn');
    if (btn) {
        btn.classList.add('loading');
        btn.disabled = true;
    }

    setTimeout(() => {
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...food, quantity: 1 });
        }
        localStorage.setItem('foodi_cart', JSON.stringify(cart));
        updateCartBadge();
        if (btn) {
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.textContent = 'Đã thêm!';
            setTimeout(() => btn.textContent = 'Thêm vào giỏ', 1500);
            btn.style.animation = 'shake 0.5s ease';
        }
    }, 800);
}

// 3. removeFromCart(id): Xóa món khỏi cart, re-render
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('foodi_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

// 4. updateQuantity(id, delta): +/- số lượng, remove if <=0
function updateQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
        localStorage.setItem('foodi_cart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
    }
}

// 5. getTotal(): Tính tổng tiền cart
function getTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// 6. renderCart(): Render table cart từ array (gọi khi thay đổi)
function renderCart() {
    const container = document.getElementById('cartItems');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p>Giỏ hàng trống</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>
                <div class="qty-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </td>
            <td>${item.price.toLocaleString()} VNĐ</td>
            <td>${(item.price * item.quantity).toLocaleString()} VNĐ</td>
            <td><button class="delete-btn" onclick="removeFromCart(${item.id})">Xóa</button></td>
        </tr>
    `).join('');

    const totalEl = document.getElementById('totalAmount');
    if (totalEl) totalEl.textContent = getTotal().toLocaleString() + ' VNĐ';
}

// Helper: build food card từ template (dùng chung cho renderFoods & filterAndRender)
function buildFoodCard(food, template) {
    const card = template.cloneNode(true);
    card.querySelector('.food-img').src = food.img;
    card.querySelector('.food-name').textContent = food.name;
    card.querySelector('.food-price').textContent = food.price.toLocaleString() + ' VNĐ';

    const qtyDisplay = card.querySelector('.qty-display');
    qtyDisplay.textContent = cart.find(item => item.id === food.id)?.quantity || 0;
    card.dataset.foodId = food.id;

    card.querySelectorAll('.qty-btn').forEach(btn => {
        btn.onclick = () => {
            const delta = btn.dataset.action === '+' ? 1 : -1;
            updateQuantity(food.id, delta);
            // Cập nhật tất cả qty-display cho food này
            document.querySelectorAll('.food-card').forEach(c => {
                if (c.dataset.foodId == food.id) {
                    c.querySelector('.qty-display').textContent =
                        cart.find(item => item.id === food.id)?.quantity || 0;
                }
            });
        };
    });

    card.querySelector('.add-to-cart-btn').onclick = () => addToCart(food.id);
    card.classList.remove('template');
    card.style.display = 'block';
    return card;
}

// 7. renderFoods(): Clone template tạo food cards từ foods array
function renderFoods() {
    const container = document.getElementById('foodGrid');
    if (!container) return;
    const template = document.querySelector('.food-card.template');
    foods.forEach(food => container.appendChild(buildFoodCard(food, template)));
}

// 8. handleCheckout(): Validate form, confetti success, clear cart
function handleCheckout() {
    const name = document.getElementById('name')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const address = document.getElementById('address')?.value || '';
    const payment = document.getElementById('payment')?.value || '';

    if (!name || !phone || !address || !payment || cart.length === 0) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Confetti
    for (let i = 0; i < 50; i++) {
        const conf = document.createElement('div');
        conf.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            width: 10px;
            height: 10px;
            background: hsl(${Math.random()*360}, 70%, 60%);
            animation: confetti 3s linear forwards;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 3000);
    }

    setTimeout(() => {
        alert(`🎉 Đặt hàng thành công!\nTên: ${name}\nTổng: ${getTotal().toLocaleString()} VNĐ\nPhương thức: ${payment === 'cod' ? 'COD' : 'Chuyển khoản'}`);
        cart = [];
        localStorage.setItem('foodi_cart', JSON.stringify(cart));
        updateCartBadge();
        window.location.href = './index.html';
    }, 500);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    
    const headerTarget = document.getElementById('header-placeholder');
    if (headerTarget) loadComponent('components/header.html', 'header-placeholder');
    

    
    // Stagger + ripple
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('fadeInUp');
            }
        });
    });
    
if (document.getElementById('foodGrid')) {
        renderFoods();
        
        // Search & Filter
        const searchInput = document.getElementById('searchInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        function filterAndRender() {
            let filteredFoods = [...foods];
            
            // Search
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                filteredFoods = filteredFoods.filter(food => food.name.toLowerCase().includes(searchTerm));
            }
            
            // Filter
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            if (activeFilter === 'popular') {
                filteredFoods.sort((a, b) => b.price - a.price); // Mock popular as expensive
            } else if (activeFilter === 'cheap') {
                filteredFoods.sort((a, b) => a.price - b.price);
            }
            
            const container = document.getElementById('foodGrid');
            container.innerHTML = '';
            const template = document.querySelector('.food-card.template');
            filteredFoods.forEach(food => container.appendChild(buildFoodCard(food, template)));
            
            document.querySelectorAll('.food-card').forEach(card => observer.observe(card));
        }
        
        searchInput.addEventListener('input', filterAndRender);
        filterBtns.forEach(btn => {
            btn.onclick = () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterAndRender();
            };
        });
    }
    if (document.getElementById('cartItems')) renderCart();
    
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) cartIcon.onclick = () => window.location.href = 'cart.html';
    
    document.querySelectorAll('.checkout-btn, #confirmBtn').forEach(btn => btn.onclick = handleCheckout);
    
    // Ripple buttons
    document.querySelectorAll('.add-to-cart-btn, .checkout-btn, .confirm-btn, .btn-login').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
            `;
            this.style.position = 'relative';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Global functions
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.renderCart = renderCart;

