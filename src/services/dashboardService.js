// ============================================================
// Dashboard Service — Mock Backend
// ============================================================
// This is the SINGLE FILE you replace when connecting a real API.
//
// Every function:
//   1. Returns a Promise (like a real HTTP call)
//   2. Uses a simulated network delay
//   3. Has the exact same signature & return shape your real API should match
//
// To migrate:
//   import axios from 'axios';
//   const API = axios.create({ baseURL: 'https://your-api.com/api' });
//   Then replace each function body with:  const { data } = await API.get('/endpoint'); return data;
// ============================================================

const DELAY = 400; // Simulated network delay (ms)

// ---------- MOCK DATA ----------

const MOCK_STATS = {
  totalOrders: 284,
  pendingOrders: 42,
  inProgressOrders: 38,
  completedOrders: 196,
  cancelledOrders: 8,
  revenue: 847500,
  totalCustomers: 156,
  completedToday: 7,
  monthlyGrowth: 12.5,
  revenueGrowth: 8.3,
  customerGrowth: 15.2,
  orderGrowth: 6.8,
};

const MOCK_REVENUE_CHART = [
  { month: 'Jan', revenue: 98000 },
  { month: 'Feb', revenue: 112000 },
  { month: 'Mar', revenue: 135000 },
  { month: 'Apr', revenue: 128000 },
  { month: 'May', revenue: 156000 },
  { month: 'Jun', revenue: 147500 },
];

const MOCK_ORDERS = [
  {
    id: 'ORD-1001',
    customer: 'Priya Sharma',
    customerEmail: 'priya@example.com',
    type: 'Bridal Lehenga',
    category: 'Traditional',
    status: 'In Progress',
    price: 45000,
    date: '2026-06-15',
    dueDate: '2026-07-10',
    measurements: { bust: 34, waist: 28, hip: 36, length: 42 },
    notes: 'Heavy zardozi on bodice, red raw silk fabric',
  },
  {
    id: 'ORD-1002',
    customer: 'Rahul Verma',
    customerEmail: 'rahul@example.com',
    type: 'Three-Piece Suit',
    category: 'Men',
    status: 'Pending',
    price: 18999,
    date: '2026-06-14',
    dueDate: '2026-06-28',
    measurements: { chest: 40, waist: 34, shoulder: 18, sleeve: 25 },
    notes: 'Navy blue Italian wool, slim fit',
  },
  {
    id: 'ORD-1003',
    customer: 'Neha Gupta',
    customerEmail: 'neha@example.com',
    type: 'Alteration — Blouse',
    category: 'Alteration',
    status: 'Completed',
    price: 1200,
    date: '2026-06-13',
    dueDate: '2026-06-15',
    measurements: { bust: 32, waist: 26 },
    notes: 'Take in sides by 1 inch',
  },
  {
    id: 'ORD-1004',
    customer: 'Amit Patel',
    customerEmail: 'amit@example.com',
    type: 'Wedding Sherwani',
    category: 'Traditional',
    status: 'In Progress',
    price: 28999,
    date: '2026-06-12',
    dueDate: '2026-07-05',
    measurements: { chest: 42, waist: 36, shoulder: 19, length: 44 },
    notes: 'Gold zardozi on ivory silk',
  },
  {
    id: 'ORD-1005',
    customer: 'Sonia Mehta',
    customerEmail: 'sonia@example.com',
    type: 'Corporate Jumpsuit',
    category: 'Women',
    status: 'Pending',
    price: 7999,
    date: '2026-06-11',
    dueDate: '2026-06-25',
    measurements: { bust: 36, waist: 30, hip: 38, length: 56 },
    notes: 'Black crepe fabric, mock collar',
  },
  {
    id: 'ORD-1006',
    customer: 'Vikram Singh',
    customerEmail: 'vikram@example.com',
    type: 'Velvet Blazer',
    category: 'Men',
    status: 'Completed',
    price: 12500,
    date: '2026-06-10',
    dueDate: '2026-06-17',
    measurements: { chest: 38, waist: 32, shoulder: 17.5, sleeve: 24 },
    notes: 'Deep burgundy velvet, satin lapels',
  },
  {
    id: 'ORD-1007',
    customer: 'Anita Desai',
    customerEmail: 'anita@example.com',
    type: 'Designer Saree Blouse',
    category: 'Women',
    status: 'Completed',
    price: 3500,
    date: '2026-06-09',
    dueDate: '2026-06-14',
    measurements: { bust: 34, waist: 28 },
    notes: 'Backless design with dori, matching border',
  },
  {
    id: 'ORD-1008',
    customer: 'Rajesh Kumar',
    customerEmail: 'rajesh@example.com',
    type: 'Formal Shirt (x3)',
    category: 'Men',
    status: 'In Progress',
    price: 5400,
    date: '2026-06-08',
    dueDate: '2026-06-22',
    measurements: { neck: 16, chest: 40, shoulder: 18, sleeve: 25 },
    notes: 'White, light blue, pink — cotton blend',
  },
  {
    id: 'ORD-1009',
    customer: 'Meera Joshi',
    customerEmail: 'meera@example.com',
    type: 'Alteration — Lehenga',
    category: 'Alteration',
    status: 'Cancelled',
    price: 2000,
    date: '2026-06-07',
    dueDate: '2026-06-12',
    measurements: { waist: 27, hip: 35 },
    notes: 'Customer cancelled — fabric issue',
  },
  {
    id: 'ORD-1010',
    customer: 'Karan Malhotra',
    customerEmail: 'karan@example.com',
    type: 'Tuxedo',
    category: 'Men',
    status: 'Pending',
    price: 22000,
    date: '2026-06-06',
    dueDate: '2026-07-01',
    measurements: { chest: 44, waist: 38, shoulder: 20, sleeve: 26 },
    notes: 'Black wool, peak lapel, satin trim',
  },
  {
    id: 'ORD-1011',
    customer: 'Pooja Reddy',
    customerEmail: 'pooja@example.com',
    type: 'Anarkali Suit',
    category: 'Traditional',
    status: 'Completed',
    price: 15000,
    date: '2026-06-05',
    dueDate: '2026-06-16',
    measurements: { bust: 35, waist: 29, hip: 37, length: 52 },
    notes: 'Emerald green georgette, floor length',
  },
  {
    id: 'ORD-1012',
    customer: 'Deepak Nair',
    customerEmail: 'deepak@example.com',
    type: 'Nehru Jacket',
    category: 'Traditional',
    status: 'Pending',
    price: 8500,
    date: '2026-06-04',
    dueDate: '2026-06-20',
    measurements: { chest: 39, waist: 33, shoulder: 17 },
    notes: 'Mustard raw silk with minimal embroidery',
  },
];

const MOCK_CUSTOMERS = [
  {
    id: 'C-001',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    totalOrders: 5,
    totalSpent: 125000,
    lastOrder: '2026-06-15',
    joinedDate: '2025-03-10',
    status: 'Active',
  },
  {
    id: 'C-002',
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    phone: '+91 98765 43211',
    totalOrders: 3,
    totalSpent: 52000,
    lastOrder: '2026-06-14',
    joinedDate: '2025-06-22',
    status: 'Active',
  },
  {
    id: 'C-003',
    name: 'Neha Gupta',
    email: 'neha@example.com',
    phone: '+91 98765 43212',
    totalOrders: 2,
    totalSpent: 8500,
    lastOrder: '2026-06-13',
    joinedDate: '2026-01-15',
    status: 'Active',
  },
  {
    id: 'C-004',
    name: 'Amit Patel',
    email: 'amit@example.com',
    phone: '+91 98765 43213',
    totalOrders: 4,
    totalSpent: 89000,
    lastOrder: '2026-06-12',
    joinedDate: '2025-08-05',
    status: 'Active',
  },
  {
    id: 'C-005',
    name: 'Sonia Mehta',
    email: 'sonia@example.com',
    phone: '+91 98765 43214',
    totalOrders: 1,
    totalSpent: 7999,
    lastOrder: '2026-06-11',
    joinedDate: '2026-05-28',
    status: 'New',
  },
  {
    id: 'C-006',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    phone: '+91 98765 43215',
    totalOrders: 6,
    totalSpent: 142000,
    lastOrder: '2026-06-10',
    joinedDate: '2024-11-20',
    status: 'VIP',
  },
  {
    id: 'C-007',
    name: 'Anita Desai',
    email: 'anita@example.com',
    phone: '+91 98765 43216',
    totalOrders: 3,
    totalSpent: 28500,
    lastOrder: '2026-06-09',
    joinedDate: '2025-09-14',
    status: 'Active',
  },
  {
    id: 'C-008',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 98765 43217',
    totalOrders: 8,
    totalSpent: 196000,
    lastOrder: '2026-06-08',
    joinedDate: '2024-07-03',
    status: 'VIP',
  },
  {
    id: 'C-009',
    name: 'Meera Joshi',
    email: 'meera@example.com',
    phone: '+91 98765 43218',
    totalOrders: 1,
    totalSpent: 2000,
    lastOrder: '2026-06-07',
    joinedDate: '2026-06-01',
    status: 'Inactive',
  },
  {
    id: 'C-010',
    name: 'Karan Malhotra',
    email: 'karan@example.com',
    phone: '+91 98765 43219',
    totalOrders: 2,
    totalSpent: 45000,
    lastOrder: '2026-06-06',
    joinedDate: '2026-02-17',
    status: 'Active',
  },
];

const MOCK_APPOINTMENTS = [
  {
    id: 'APT-001',
    customer: 'Priya Sharma',
    service: 'Bridal Consultation',
    date: '2026-06-18',
    time: '10:00 AM',
    status: 'Confirmed',
    phone: '+91 98765 43210',
    notes: 'Wants to discuss lehenga customization options',
  },
  {
    id: 'APT-002',
    customer: 'Rahul Verma',
    service: 'Suit Measurement',
    date: '2026-06-18',
    time: '11:30 AM',
    status: 'Confirmed',
    phone: '+91 98765 43211',
    notes: 'First-time fitting for wedding suit',
  },
  {
    id: 'APT-003',
    customer: 'Sonia Mehta',
    service: 'Jumpsuit Fitting',
    date: '2026-06-18',
    time: '02:00 PM',
    status: 'Pending',
    phone: '+91 98765 43214',
    notes: 'Trial fitting — first draft',
  },
  {
    id: 'APT-004',
    customer: 'Karan Malhotra',
    service: 'Tuxedo Consultation',
    date: '2026-06-19',
    time: '10:00 AM',
    status: 'Confirmed',
    phone: '+91 98765 43219',
    notes: 'Fabric selection for tuxedo',
  },
  {
    id: 'APT-005',
    customer: 'Deepak Nair',
    service: 'Nehru Jacket Fitting',
    date: '2026-06-19',
    time: '12:00 PM',
    status: 'Pending',
    phone: '+91 98765 43220',
    notes: 'Trial fitting — check embroidery placement',
  },
  {
    id: 'APT-006',
    customer: 'Pooja Reddy',
    service: 'Anarkali Pickup',
    date: '2026-06-19',
    time: '03:30 PM',
    status: 'Confirmed',
    phone: '+91 98765 43221',
    notes: 'Final delivery and pickup',
  },
  {
    id: 'APT-007',
    customer: 'Vikram Singh',
    service: 'Blazer Alteration Check',
    date: '2026-06-20',
    time: '11:00 AM',
    status: 'Completed',
    phone: '+91 98765 43215',
    notes: 'Post-alteration fit check',
  },
  {
    id: 'APT-008',
    customer: 'Anita Desai',
    service: 'Blouse Pickup',
    date: '2026-06-20',
    time: '04:00 PM',
    status: 'Cancelled',
    phone: '+91 98765 43216',
    notes: 'Customer rescheduled to next week',
  },
];

const MOCK_PRODUCTS = [
  {
    id: 'P-001',
    name: 'Classic Three-Piece Suit',
    category: 'Men',
    price: 18999,
    stock: 12,
    sold: 45,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=100&h=100&fit=crop',
  },
  {
    id: 'P-002',
    name: 'Bridal Lehenga',
    category: 'Traditional',
    price: 45000,
    stock: 3,
    sold: 18,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop',
  },
  {
    id: 'P-003',
    name: 'Velvet Blazer',
    category: 'Men',
    price: 12500,
    stock: 8,
    sold: 31,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=100&h=100&fit=crop',
  },
  {
    id: 'P-004',
    name: 'Wedding Gown',
    category: 'Women',
    price: 38000,
    stock: 2,
    sold: 14,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=100&h=100&fit=crop',
  },
  {
    id: 'P-005',
    name: 'Sherwani with Zardozi',
    category: 'Traditional',
    price: 28999,
    stock: 5,
    sold: 22,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1597983073492-bc24018b47f8?w=100&h=100&fit=crop',
  },
  {
    id: 'P-006',
    name: 'Corporate Jumpsuit',
    category: 'Women',
    price: 7999,
    stock: 15,
    sold: 28,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=100&h=100&fit=crop',
  },
  {
    id: 'P-007',
    name: 'Nehru Jacket',
    category: 'Traditional',
    price: 8500,
    stock: 0,
    sold: 35,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=100&h=100&fit=crop',
  },
  {
    id: 'P-008',
    name: 'Anarkali Suit',
    category: 'Traditional',
    price: 15000,
    stock: 6,
    sold: 19,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop',
  },
];

// ---------- SERVICE FUNCTIONS ----------
// Each function mirrors a real API endpoint.
// When migrating: replace Promise bodies with axios/fetch calls.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  // GET /api/dashboard/stats
  getDashboardStats: async () => {
    await delay(DELAY);
    return { ...MOCK_STATS };
  },

  // GET /api/dashboard/revenue-chart
  getRevenueChart: async () => {
    await delay(DELAY);
    return [...MOCK_REVENUE_CHART];
  },

  // GET /api/dashboard/orders-by-status
  getOrdersByStatus: async () => {
    await delay(DELAY);
    return {
      pending: MOCK_STATS.pendingOrders,
      inProgress: MOCK_STATS.inProgressOrders,
      completed: MOCK_STATS.completedOrders,
      cancelled: MOCK_STATS.cancelledOrders,
    };
  },

  // GET /api/orders?limit=N
  getRecentOrders: async (limit = 5) => {
    await delay(DELAY);
    return MOCK_ORDERS.slice(0, limit).map((o) => ({ ...o }));
  },

  // GET /api/orders?status=X&search=Y
  getAllOrders: async (filters = {}) => {
    await delay(DELAY);
    let filtered = [...MOCK_ORDERS];

    if (filters.status && filters.status !== 'All') {
      filtered = filtered.filter((o) => o.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.customer.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q) ||
          o.type.toLowerCase().includes(q)
      );
    }

    return filtered.map((o) => ({ ...o }));
  },

  // PATCH /api/orders/:id/status
  updateOrderStatus: async (orderId, newStatus) => {
    await delay(DELAY);
    const order = MOCK_ORDERS.find((o) => o.id === orderId);
    if (order) {
      order.status = newStatus;
      return { success: true, order: { ...order } };
    }
    return { success: false, message: 'Order not found' };
  },

  // GET /api/customers?search=Y
  getCustomers: async (search = '') => {
    await delay(DELAY);
    let filtered = [...MOCK_CUSTOMERS];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)
      );
    }
    return filtered.map((c) => ({ ...c }));
  },

  // GET /api/appointments
  getAppointments: async () => {
    await delay(DELAY);
    return MOCK_APPOINTMENTS.map((a) => ({ ...a }));
  },

  // PATCH /api/appointments/:id/status
  updateAppointmentStatus: async (appointmentId, newStatus) => {
    await delay(DELAY);
    const apt = MOCK_APPOINTMENTS.find((a) => a.id === appointmentId);
    if (apt) {
      apt.status = newStatus;
      return { success: true, appointment: { ...apt } };
    }
    return { success: false, message: 'Appointment not found' };
  },

  // GET /api/products
  getProducts: async () => {
    await delay(DELAY);
    return MOCK_PRODUCTS.map((p) => ({ ...p }));
  },
};
