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
      image: 'https://m.media-amazon.com/images/I/61CLCiCNtaL._AC_UF894,1000_QL80_.jpg',
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
    },
    {
      id: 11,
      name: 'Apple AirPods Max',
      category: 'Audio',
      price: 579.00,
      image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=500&q=80',
      description: 'Audio de alta fidelidad con diseño premium.',
      rating: 4.7,
      stock: 5
    },
    {
      id: 12,
      name: 'Micrófono Blue Yeti',
      category: 'Audio',
      price: 139.99,
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=500&q=80',
      description: 'El micrófono USB número 1 del mundo para streaming.',
      rating: 4.6,
      stock: 15
    },
    {
      id: 13,
      name: 'Tocadiscos Audio-Technica',
      category: 'Audio',
      price: 249.00,
      image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=500&q=80',
      description: 'Disfruta de tus vinilos con sonido analógico puro.',
      rating: 4.8,
      stock: 2
    },
    {
      id: 14,
      name: 'Altavoz JBL Flip 6',
      category: 'Audio',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80',
      description: 'Resistente al agua y polvo, sonido potente.',
      rating: 4.5,
      stock: 25
    },
    {
      id: 15,
      name: 'Barra de Sonido Bose',
      category: 'Audio',
      price: 499.00,
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=500&q=80',
      description: 'Mejora tu TV con sonido Dolby Atmos envolvente.',
      rating: 4.4,
      stock: 0 // AGOTADO
    },

    // GAMING
    {
      id: 16,
      name: 'Teclado Mecánico RGB',
      category: 'Gaming',
      price: 119.50,
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=80',
      description: 'Switches azules clicky para máxima precisión.',
      rating: 4.7,
      stock: 10
    },
    {
      id: 17,
      name: 'Ratón Logitech G Pro',
      category: 'Gaming',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=80',
      description: 'Ultraligero y diseñado para eSports.',
      rating: 4.9,
      stock: 18
    },
    {
      id: 18,
      name: 'Steam Deck 512GB',
      category: 'Gaming',
      price: 649.00,
      image: 'https://m.media-amazon.com/images/I/51q-NHeNaRL.jpg',
      description: 'Toda tu biblioteca de Steam en la palma de tu mano.',
      rating: 4.8,
      stock: 0 // AGOTADO
    },
    {
      id: 19,
      name: 'Monitor Curvo 144Hz',
      category: 'Gaming',
      price: 299.00,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80',
      description: 'Inmersión total con pantalla curva y respuesta rápida.',
      rating: 4.5,
      stock: 6
    },
    {
      id: 20,
      name: 'Silla Gaming Razer',
      category: 'Gaming',
      price: 399.00,
      image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_146315328/fee_786_587_png',
      description: 'Ergonomía superior para largas sesiones de juego.',
      rating: 4.3,
      stock: 4
    },
    {
      id: 21,
      name: 'Cámara Polaroid Now',
      category: 'Fotografía',
      price: 119.00,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80',
      description: 'Fotografía instantánea con estilo retro.',
      rating: 4.6,
      stock: 12
    },
    {
      id: 22,
      name: 'Objetivo Canon 50mm',
      category: 'Fotografía',
      price: 159.00,
      image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=500&q=80',
      description: 'El rey del bokeh, perfecto para retratos.',
      rating: 4.9,
      stock: 8
    },
    {
      id: 23,
      name: 'Estabilizador Gimbal',
      category: 'Fotografía',
      price: 249.00,
      image: 'https://img.tvcmall.com/dynamic/uploads/details/740x740_682300161A-1.webp',
      description: 'Vídeos cinematográficos fluidos con tu móvil.',
      rating: 4.4,
      stock: 10
    },
    {
      id: 24,
      name: 'Cámara Sony Alpha 7 IV',
      category: 'Fotografía',
      price: 2699.00,
      image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=500&q=80',
      description: 'La cámara híbrida definitiva para foto y vídeo.',
      rating: 5,
      stock: 0 // AGOTADO
    },
    {
      id: 25,
      name: 'Aro de Luz LED',
      category: 'Fotografía',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=500&q=80',
      description: 'Iluminación perfecta para tus streamings y vlogs.',
      rating: 4.2,
      stock: 50
    },

    // WEARABLES
    {
      id: 26,
      name: 'Garmin Fenix 7',
      category: 'Wearables',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=500&q=80',
      description: 'Reloj multideporte solar para condiciones extremas.',
      rating: 4.9,
      stock: 3
    },
    {
      id: 27,
      name: 'Xiaomi Smart Band 8',
      category: 'Wearables',
      price: 45.00,
      image: 'https://m.media-amazon.com/images/I/516RXculzhL.jpg',
      description: 'Monitor de actividad económico y fiable.',
      rating: 4.5,
      stock: 100
    },
    {
      id: 28,
      name: 'Gafas VR Meta Quest 3',
      category: 'Wearables',
      price: 549.00,
      image: 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202310/02/00198950000103____26__1200x1200.jpg',
      description: 'Realidad mixta sin cables de última generación.',
      rating: 4.8,
      stock: 7
    },
    {
      id: 29,
      name: 'Fitbit Charge 6',
      category: 'Wearables',
      price: 159.95,
      image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_164342227?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402',
      description: 'Salud y fitness avanzado con GPS integrado.',
      rating: 4.4,
      stock: 14
    },
    {
      id: 30,
      name: 'Anillo Inteligente Oura',
      category: 'Wearables',
      price: 299.00,
      image: 'https://dam.elcorteingles.es/producto/www-001089060301085-00.jpg?impolicy=Resize&width=640&height=640',
      description: 'Monitorización del sueño discreta y elegante.',
      rating: 4.6,
      stock: 0 // AGOTADO
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
