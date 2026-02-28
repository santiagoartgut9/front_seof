import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== USERS ====================
export const userService = {
  register: (username, email, password, fullName) =>
    api.post('/users/register', { username, email, password, fullName }),
  
  login: (username, password) =>
    api.post('/users/login', { username, password }),
  
  getAllUsers: () =>
    api.get('/users'),
  
  getUserById: (id) =>
    api.get(`/users/${id}`),
};

// ==================== PRODUCTS ====================
export const productService = {
  createProduct: (name, description, price, stock, category) =>
    api.post('/products', { name, description, price, stock, category }),
  
  getAllProducts: () =>
    api.get('/products'),
  
  getProductById: (id) =>
    api.get(`/products/${id}`),
  
  getByCategory: (category) =>
    api.get(`/products/category/${category}`),
  
  updateStock: (id, stock) =>
    api.put(`/products/${id}/stock?stock=${stock}`),
  
  updatePrice: (id, price) =>
    api.put(`/products/${id}/price?price=${price}`),
};

// ==================== CART ====================
export const cartService = {
  addToCart: (userId, productId, quantity) =>
    api.post('/cart/add', { userId, productId, quantity }),
  
  getCart: (userId) =>
    api.get(`/cart/${userId}`),
  
  removeFromCart: (userId, productId) =>
    api.delete(`/cart/${userId}/item/${productId}`),
  
  clearCart: (userId) =>
    api.delete(`/cart/${userId}`),
};

// ==================== ORDERS ====================
export const orderService = {
  createOrder: (userId) =>
    api.post('/orders', { userId }),
  
  getOrderById: (id) =>
    api.get(`/orders/${id}`),
  
  getUserOrders: (userId) =>
    api.get(`/orders/user/${userId}`),
  
  getAllOrders: () =>
    api.get('/orders'),
};

export default api;
