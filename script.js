// Manage Users
const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');
const stockForm = document.getElementById('stock-form');
const stockList = document.getElementById('stock-list');
const orderForm = document.getElementById('order-form');
const orderList = document.getElementById('order-list');

// Utility functions
function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Manage Users
if (userForm) {
    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();

        if (username && email) {
            const users = getLocalStorage('users');
            users.push({ username, email });
            setLocalStorage('users', users);
            displayUsers();
        } else {
            alert('Please fill in both fields.');
        }
    });

    function displayUsers() {
        const users = getLocalStorage('users');
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = `${user.username} (${user.email})`;

            // Create Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', function () {
                deleteUser(index);
            });

            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    }

    function deleteUser(userIndex) {
        const users = getLocalStorage('users') || [];
        users.splice(userIndex, 1);
        setLocalStorage('users', users);
        displayUsers();
    }

    displayUsers();
}

// Manage Stocks
if (stockForm) {
    stockForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = document.getElementById('item-name').value.trim();
        const quantity = document.getElementById('quantity').value.trim();

        if (itemName && quantity) {
            const stocks = getLocalStorage('stocks');
            stocks.push({ itemName, quantity });
            setLocalStorage('stocks', stocks);
            displayStocks();
        } else {
            alert('Please fill in both fields.');
        }
    });

    function displayStocks() {
        const stocks = getLocalStorage('stocks');
        stockList.innerHTML = '';
        stocks.forEach((stock, index) => {
            const li = document.createElement('li');
            li.textContent = `${stock.itemName}: ${stock.quantity}`;
            stockList.appendChild(li);
        });
    }
    displayStocks();
}

// Manage Orders
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = document.getElementById('order-item').value.trim();
        const quantity = document.getElementById('order-quantity').value.trim();

        if (itemName && quantity) {
            const orders = getLocalStorage('orders');
            orders.push({ itemName, quantity });
            setLocalStorage('orders', orders);
            displayOrders();
        } else {
            alert('Please fill in both fields.');
        }
    });

    function displayOrders() {
        const orders = getLocalStorage('orders');
        orderList.innerHTML = '';
        orders.forEach((order, index) => {
            const li = document.createElement('li');
            li.textContent = `Order: ${order.itemName} - ${order.quantity}`;
            orderList.appendChild(li);
        });
    }
    displayOrders();
}

// Report Page
if (document.getElementById('report-users')) {
    function displayReport() {
        // Display users
        const users = getLocalStorage('users');
        const userReport = document.getElementById('report-users');
        userReport.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.username} - ${user.email}`;
            userReport.appendChild(li);
        });

        // Display stocks
        const stocks = getLocalStorage('stocks');
        const stockReport = document.getElementById('report-stocks');
        stockReport.innerHTML = '';
        stocks.forEach(stock => {
            const li = document.createElement('li');
            li.textContent = `${stock.itemName}: ${stock.quantity}`;
            stockReport.appendChild(li);
        });

        // Display orders
        const orders = getLocalStorage('orders');
        const orderReport = document.getElementById('report-orders');
        orderReport.innerHTML = '';
        orders.forEach(order => {
            const li = document.createElement('li');
            li.textContent = `Order: ${order.itemName} - ${order.quantity}`;
            orderReport.appendChild(li);
        });
    }

    displayReport();
}

// Stock search functionality
if (document.getElementById('stock-search')) {
    document.getElementById('stock-search').addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        const stocks = getLocalStorage('stocks');
        const filteredStocks = stocks.filter(stock =>
            stock.itemName.toLowerCase().includes(searchValue)
        );
        displayFilteredStocks(filteredStocks);
    });

    function displayFilteredStocks(stocks) {
        stockList.innerHTML = '';
        stocks.forEach(stock => {
            const li = document.createElement('li');
            li.textContent = `${stock.itemName}: ${stock.quantity}`;
            stockList.appendChild(li);
        });
    }
}

// Payment Page
if (document.getElementById('payment-orders')) {
    function displayPaymentOrders() {
        const orders = getLocalStorage('orders');
        const paymentOrders = document.getElementById('payment-orders');
        paymentOrders.innerHTML = '';
        orders.forEach((order, index) => {
            const li = document.createElement('li');
            li.textContent = `Order: ${order.itemName} - ${order.quantity}`;
            const payButton = document.createElement('button');
            payButton.textContent = 'Mark as Paid';
            payButton.addEventListener('click', function () {
                orders.splice(index, 1); // Remove the order after payment
                setLocalStorage('orders', orders);
                displayPaymentOrders();
            });
            li.appendChild(payButton);
            paymentOrders.appendChild(li);
        });
    }

    displayPaymentOrders();
}
