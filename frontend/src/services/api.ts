import { io, Socket } from 'socket.io-client';

// Backend response typings (minimal fields used by the frontend)
interface BackendMenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string | null;
  available?: boolean;
}

interface BackendOrderItem {
  _id?: string;
  menuItem?: { name?: string; price?: number; category?: string };
  quantity: number;
  status?: string;
  notes?: string | null;
}

interface BackendOrder {
  _id: string;
  customer_name?: string;
  customer_phone?: string;
  status?: string;
  total?: number;
  createdAt?: string;
  tableNumber?: number;
  items?: BackendOrderItem[];
  table?: { tableNumber?: number };
}

interface BackendTable {
  _id: string;
  tableNumber: number;
  status?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'https://tabletime-h51q.onrender.com/api';
const SOCKET_URL = import.meta.env.VITE_WS_URL ?? 'https://tabletime-h51q.onrender.com';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async login(username: string, password: string, role: string) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, role }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async logout() {
    this.clearToken();
  }

  // Menu Items
  async getMenuItems() {
    const items = (await this.request('/menu-items')) as BackendMenuItem[];
    // Transform MongoDB _id to id for frontend
    return items.map((item) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image_url: item.image_url,
      available: item.available
    }));
  }

  async getAvailableMenuItems() {
    const items = (await this.request('/menu-items?available=true')) as BackendMenuItem[];
    // Transform MongoDB _id to id for frontend
    return items.map((item) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image_url: item.image_url,
      available: item.available
    }));
  }

  // Tables
  async getTableByNumber(tableNumber: number) {
    const table = (await this.request(`/tables/${tableNumber}`)) as BackendTable;
    // Transform backend response to match frontend expectations
    return {
      id: table._id,
      table_number: table.tableNumber,
      status: table.status
    };
  }

  // Orders
  async createOrder(orderData: {
    table_id: string;
    table_number: number;
    customer_name: string;
    customer_phone: string;
    total_amount: number;
    items: Array<{ menu_item_id: string; quantity: number }>;
  }) {
    // Transform frontend data to match backend expectations
    const backendOrderData = {
      tableNumber: orderData.table_number,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      total: orderData.total_amount,
      items: orderData.items.map(item => ({
        menuItem: item.menu_item_id,
        quantity: item.quantity
      }))
    };
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(backendOrderData),
    });
  }

  async getOrders(filters?: { status?: string; table_id?: string }) {
    const params = new URLSearchParams(filters as Record<string, string>);
    const orders = (await this.request(`/orders?${params}`)) as BackendOrder[];
    
    // Transform MongoDB response to match frontend expectations
    return orders.map((order) => ({
      id: order._id,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      status: order.status,
      total_amount: order.total || 0,
      created_at: order.createdAt,
      tables: {
        table_number: order.tableNumber || order.table?.tableNumber || 0
      },
      order_items: (order.items || []).map((item: BackendOrderItem | undefined, index: number) => ({
        id: item._id || `${order._id}-item-${index}`,
        quantity: item.quantity,
        status: item.status || 'pending',
        notes: item.notes || null,
        menu_items: {
          name: item.menuItem?.name || 'Unknown',
          price: item.menuItem?.price || 0,
          category: item.menuItem?.category || 'Uncategorized'
        }
      }))
    }));
  }

  async getOrdersByTable(tableId: string) {
    const orders = (await this.request(`/orders?table_id=${tableId}`)) as BackendOrder[];
    
    // Transform MongoDB response to match frontend expectations
    return orders.map((order) => ({
      id: order._id,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      status: order.status,
      total_amount: order.total || 0,
      created_at: order.createdAt,
      tables: {
        table_number: order.tableNumber || order.table?.tableNumber || 0
      },
      order_items: (order.items || []).map((item: BackendOrderItem | undefined, index: number) => ({
        id: item._id || `${order._id}-item-${index}`,
        quantity: item.quantity,
        status: item.status || 'pending',
        notes: item.notes || null,
        menu_items: {
          name: item.menuItem?.name || 'Unknown',
          price: item.menuItem?.price || 0,
          category: item.menuItem?.category || 'Uncategorized'
        }
      }))
    }));
  }

  async getOrdersByTableNumber(tableNumber: number) {
    const orders = (await this.request(`/orders/table/${tableNumber}`)) as BackendOrder[];
    
    // Transform MongoDB response to match frontend expectations
    return orders.map((order) => ({
      id: order._id,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      status: order.status,
      total_amount: order.total || 0,
      created_at: order.createdAt,
      tables: {
        table_number: order.tableNumber || 0
      },
      order_items: (order.items || []).map((item: BackendOrderItem | undefined, index: number) => ({
        id: item._id || `${order._id}-item-${index}`,
        quantity: item.quantity,
        status: item.status || 'pending',
        notes: item.notes || null,
        menu_items: {
          name: item.menuItem?.name || 'Unknown',
          price: item.menuItem?.price || 0,
          category: item.menuItem?.category || 'Uncategorized'
        }
      }))
    }));
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Order Items - update item status within an order
  async updateOrderItemStatus(itemId: string, status: string, orderId?: string) {
    // itemId format might be "orderId-item-index" or we need orderId separately
    // For embedded items, we need both orderId and itemId
    if (orderId) {
      return this.request(`/orders/${orderId}/items/${itemId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    }
    // Fallback for legacy format
    return this.request(`/order-items/${itemId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // WebSocket for real-time updates (socket.io)
  createWebSocket(): Socket {
    return io(SOCKET_URL, {
      transports: ['websocket'],
      path: '/socket.io'
    });
  }
}

export const apiClient = new ApiClient();
