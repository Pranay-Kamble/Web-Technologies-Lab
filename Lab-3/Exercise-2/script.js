const products = [
  { id: 1, name: "Wireless Headphones", price: 150, category: "electronics", stock: 20 },
  { id: 2, name: "Gaming Mouse", price: 45, category: "electronics", stock: 15 },
  { id: 3, name: "Cotton T-Shirt", price: 25, category: "fashion", stock: 50 },
  { id: 4, name: "Denim Jeans", price: 600, category: "fashion", stock: 30 },
  { id: 5, name: "Organic Coffee", price: 15, category: "grocery", stock: 100 },
  { id: 6, name: "Almond Bar", price: 5, category: "grocery", stock: 200 }
];

const cart = [];
let appliedCoupon = "";

function renderProducts() {
    const container = document.getElementById('product-viewer');
    let html = "<h3>Product Catalog</h3><div class='product-grid'>";
    
    products.forEach(prod => {
        html += `
        <div class="product-card">
            <h4>${prod.name}</h4>
            <p>Price: ₹ ${prod.price}</p>
            <p><small>${prod.category}</small></p>
            <button onclick="addToCart(${prod.id})">Add to Cart</button>
        </div>`;
    });
    
    html += "</div>";
    container.innerHTML = html;
}

function renderCart() {
    const container = document.getElementById('cart-viewer');
    
    if (cart.length === 0) {
        container.innerHTML = "<h3>Your Cart is Empty</h3>";
        return;
    }

    let html = "<h3>Shopping Cart</h3><div>";
    
    cart.forEach(item => {
        html += `
        <div class="cart-item">
            <span>${item.name} ($${item.price})</span>
            <div>
                <strong>Qty: ${item.quantity} </strong>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
            </div>
        </div>`;
    });

    html += "</div>";
    container.innerHTML = html;
}

function renderBill() {
    const container = document.getElementById('bill-viewer');
    let total = 0;
    let savings = 0;
    
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        
        if (item.quantity >= 5) {
            let discount = itemTotal * 0.10;
            savings += discount;
        }

        if (item.category === 'fashion') {
             let discount = 5 * item.quantity;
             savings += discount;
        }

        total += itemTotal;
    });

    const currentHour = new Date().getHours();
    if (currentHour >= 18 && currentHour <= 21) {
        if(total > 0) savings += 10;
    }

    if (appliedCoupon === "SAVE20") {
        let discount = total * 0.20;
        savings += discount;
    }

    let finalAmount = total - savings;
    if (finalAmount < 0) finalAmount = 0;

    container.innerHTML = `
        <div>
            <h3>Bill Summary</h3>
            <p>Subtotal: Rs. ${total.toFixed(2)}</p>
            <p>Discounts: -₹${savings.toFixed(2)}</p>
            <h4>Final Total: ₹${finalAmount.toFixed(2)}</h4>
            <hr/>
            <input type="text" id="coupon-input" placeholder="SAVE20" value="${appliedCoupon}">
            <button onclick="applyCoupon()">Apply Coupon</button>
        </div>
    `;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    refreshUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
        }
    }
    refreshUI();
}

function applyCoupon() {
    const input = document.getElementById('coupon-input').value;
    const cleanCode = input.trim().toUpperCase();

    if (cleanCode === "SAVE20") {
        appliedCoupon = cleanCode;
        alert("Coupon Applied!");
    } else {
        appliedCoupon = "";
        alert("Invalid Code");
    }
    refreshUI();
}

function refreshUI() {
    renderCart();
    renderBill();
}

renderProducts();
refreshUI();