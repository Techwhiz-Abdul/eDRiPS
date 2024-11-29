const nav = document.getElementById('navbar');
const cancel = document.getElementById('cancel');
const  bar = document.getElementById('bar');
const link = document.querySelector('#navbar li');

    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });


    if (bar) {
        bar.addEventListener('click', ()=>{
            nav.classList.add('active');
        });
        
    } 
    if (cancel) {
        cancel.addEventListener('click', ()=>{
            nav.classList.remove('active');
        });
    }



//Global cart array stored inn localstorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//Function to update the cart count in the menu bar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 9) {
        cartCountElement.textContent = '9+';
    } else{
        cartCountElement.textContent = totalItems;
    }
    
}

//Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const product = this.closest('.box');
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);
        ///

        const existingItems = cart.find(item => item.id === id);
        if (existingItems) {
            existingItems.quantity += 1;
        } else{
            cart.push({id, name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();


    });
});

//Render cart (Cart page)
if (document.body.classList.contains('cart-page')) {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalPriceElement = document.getElementById('total-price');

    function renderCart() {
        cartTableBody.innerHTML = '';

        if (cart.length === 0) {
            cartTableBody.innerHTML = '<tr><td colspan="5">Your cart is empty!</td></tr>';
            totalPriceElement.textContent = 'Total: $0';
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.name}</td> 
            <td>$${item.price}</td>
            <td>
            <button class="decrement" data-index="${index}">-</button>
            <span> ${item.quantity}</span>
            <button class="increment" data-index="${index}">+</button>
            </td>
            <td>$${itemTotal}</td>  
            <td><button data-index="${index}" class="remove-item" >Remove</button></td> 
            `;
            cartTableBody.appendChild(row);
        });

 
        totalPriceElement.textContent = `Total: $${total}`;
        updateCartCount();
    }

     ///////////  
     
    document.querySelector('#cart-table tbody').addEventListener('click', (event) => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains('increment')) {
            cart[index].quantity += 1;
        } else if (event.target.classList.contains('decrement')) {
            if (cart[index].quantity > 1 ) {
                cart[index].quantity -= 1;
            } else{ 
                alert('Quantity cannot be less than 1');
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    });
        
        //Remove Item from cart
         cartTableBody.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-item')) {
                const index = event.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }

         });
        renderCart();
     }
    

//initialize the cart count on page
updateCartCount();


