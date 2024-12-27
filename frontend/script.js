// Get product data from backend API
fetch('/api/products')
    .then(response => response.json())
    .then(data => {
        // Generate product cards dynamically
        const productGrid = document.querySelector('.product-grid');
        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart" data-product-id="${product._id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
    });

// Add event listener to add-to-cart buttons
document.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = event.target.dataset.productId;
        // Send request to backend API to add product to cart
        fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }
});

