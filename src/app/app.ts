import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 1. Interfaz del Producto (con 'stock' opcional para evitar errores)
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating?: number;
  stock?: number; // <--- ESTO ES IMPORTANTE PARA EL BOTÓN "AGOTADO"
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {

  // --- DATOS DE PRODUCTOS ---
  products: Product[] = [
    {
      id: 1,
      name: 'Auriculares Sony XM5',
      category: 'Audio',
      price: 349.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
      description: 'Cancelación de ruido líder en la industria.',
      rating: 5,
      stock: 10
    },
    {
      id: 2,
      name: 'Apple Watch Ultra',
      category: 'Wearables',
      price: 799.00,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=500&q=80',
      description: 'El reloj deportivo definitivo para aventura.',
      rating: 4.8,
      stock: 5
    },
    {
      id: 3,
      name: 'Cámara Fujifilm X-T5',
      category: 'Fotografía',
      price: 1699.00,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80',
      description: 'Fotografía pura en cuerpo clásico.',
      rating: 4.9,
      stock: 3
    },
    {
      id: 4,
      name: 'PlayStation 5',
      category: 'Gaming',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500&q=80',
      description: 'Juega sin límites con carga ultrarrápida.',
      rating: 5,
      stock: 0 // <--- ESTE ESTÁ AGOTADO (STOCK 0)
    },
    {
      id: 5,
      name: 'Altavoz Marshall Stanmore',
      category: 'Audio',
      price: 379.00,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80',
      description: 'Sonido legendario con diseño retro icónico.',
      rating: 4.7,
      stock: 8
    },
    {
      id: 6,
      name: 'Drone DJI Mini 3 Pro',
      category: 'Fotografía',
      price: 759.00,
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80',
      description: 'Captura el mundo desde las alturas en 4K.',
      rating: 4.6,
      stock: 12
    },
    {
      id: 7,
      name: 'Nintendo Switch OLED',
      category: 'Gaming',
      price: 349.00,
      image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=500&q=80',
      description: 'Pantalla vibrante de 7 pulgadas para jugar donde sea.',
      rating: 4.8,
      stock: 20
    },
    {
      id: 8,
      name: 'Samsung Galaxy Watch 6',
      category: 'Wearables',
      price: 299.00,
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80',
      description: 'Tu entrenador personal de salud en la muñeca.',
      rating: 4.3,
      stock: 15
    },
    {
      id: 9,
      name: 'Xbox Series X',
      category: 'Gaming',
      price: 499.00,
      image: 'https://images.unsplash.com/photo-1621259182902-381524806e4f?auto=format&fit=crop&w=500&q=80',
      description: 'La Xbox más rápida y potente de la historia.',
      rating: 4.9,
      stock: 4
    },
    {
      id: 10,
      name: 'GoPro Hero 11 Black',
      category: 'Fotografía',
      price: 449.99,
      image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=500&q=80',
      description: 'Cámara de acción impermeable y resistente.',
      rating: 4.5,
      stock: 7
    }
  ];

  // --- VARIABLES DE ESTADO ---
  cart: Product[] = [];
  wishlist: number[] = [];
  compareList: Product[] = [];

  isCartOpen: boolean = false;
  isCheckoutOpen: boolean = false;
  showCompareModal: boolean = false;

  showNotification = false;
  showSuccessModal = false;
  lastAddedProduct: string = '';
  private notificationTimeout: any;

  selectedCategory: string = 'Todas';
  searchTerm: string = '';
  sortOrder: string = 'default';

  selectedProduct: Product | null = null;

  checkoutData = {
    name: '', email: '', address: '', city: '', cardNumber: ''
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCartFromStorage();
  }

  // --- GETTERS ---
  get totalCartPrice(): number {
    return this.cart.reduce((acc, product) => acc + product.price, 0);
  }

  get filteredProducts(): Product[] {
    let filtered = this.products;

    // Filtro Categoría
    if (this.selectedCategory !== 'Todas') {
      filtered = this.products.filter(p => p.category === this.selectedCategory);
    }

    // Filtro Buscador
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    // Ordenar
    if (this.sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }

  // --- FUNCIONES ---

  // *** AQUÍ ESTÁ LA SOLUCIÓN AL ERROR ***
  // Esta es la función que busca el botón "Ver Catálogo"
  scrollToProducts() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector('.product-grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  addToCart(product: Product) {
    this.cart.push(product);
    this.saveCartToStorage();
    this.lastAddedProduct = product.name;
    this.showNotification = true;
    if (this.notificationTimeout) clearTimeout(this.notificationTimeout);
    this.notificationTimeout = setTimeout(() => { this.showNotification = false; }, 3000);
  }

  removeProduct(index: number) {
    this.cart.splice(index, 1);
    this.saveCartToStorage();
  }

  toggleCart() { this.isCartOpen = !this.isCartOpen; }
  setCategory(category: string) { this.selectedCategory = category; }

  // Detalles
  openDetails(product: Product) { this.selectedProduct = product; }
  closeDetails() { this.selectedProduct = null; }

  // Checkout
  openCheckout() { this.isCartOpen = false; this.isCheckoutOpen = true; }
  closeCheckout() { this.isCheckoutOpen = false; }

  submitOrder() {
    if(!this.checkoutData.name || !this.checkoutData.address) {
      alert("Por favor rellena los datos de envío");
      return;
    }
    this.isCheckoutOpen = false;
    this.showSuccessModal = true;
    this.cart = [];
    this.saveCartToStorage();
    this.checkoutData = { name: '', email: '', address: '', city: '', cardNumber: '' };
    setTimeout(() => { this.showSuccessModal = false; }, 4000);
  }

  // Wishlist
  toggleWishlist(productId: number) {
    const index = this.wishlist.indexOf(productId);
    if (index === -1) this.wishlist.push(productId);
    else this.wishlist.splice(index, 1);
  }
  isInWishlist(productId: number): boolean { return this.wishlist.includes(productId); }

  // Comparador
  toggleCompare(product: Product) {
    const index = this.compareList.findIndex(p => p.id === product.id);
    if (index !== -1) { this.compareList.splice(index, 1); return; }
    if (this.compareList.length >= 2) { alert("Solo puedes comparar 2 productos."); return; }
    if (this.compareList.length > 0 && product.category !== this.compareList[0].category) {
      alert(`Solo puedes comparar productos de la misma categoría.`); return;
    }
    this.compareList.push(product);
  }
  isInCompare(product: Product): boolean { return this.compareList.some(p => p.id === product.id); }
  clearCompare() { this.compareList = []; this.showCompareModal = false; }

  // Estrellas
  getStars(rating: number = 0): number[] {
    const score = rating || 4.5;
    return Array(5).fill(0).map((_, i) => i < Math.round(score) ? 1 : 0);
  }

  // Storage
  saveCartToStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('myCart', JSON.stringify(this.cart));
    }
  }

  loadCartFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('myCart');
      if (savedCart) this.cart = JSON.parse(savedCart);
    }
  }
}
