import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api/axios";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const CART_API = "/cart";

const normalizeCartItems = (payload) => {
  if (!payload) return [];

  if (Array.isArray(payload)) return payload;

  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.cartItems)) return payload.cartItems;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.data?.items)) return payload.data.items;
  if (Array.isArray(payload.data?.cartItems)) return payload.data.cartItems;

  if (payload.items && typeof payload.items === "object") return [payload.items];
  if (payload.cartItems && typeof payload.cartItems === "object") return [payload.cartItems];

  return [];
};

// ================= GET CART =================
export const getCart = createAsyncThunk(
  "cart/getCart",
  async () => {
    const { data } = await api.get("/cart");

    return normalizeCartItems(data);
  }
);

// ================= ADD CART =================
export const addCart = createAsyncThunk(
  "cart/addCart",
  async (product, { rejectWithValue }) => {
    try {
      const productId = product._id || product.id;

      const { data } = await api.post("/cart/add", {
        productid: productId,
      });

      return normalizeCartItems(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);// ================= INCREASE =================
export const increase = createAsyncThunk(
  "cart/increase",
  async (productId) => {
    const { data } = await api.put(
      `/cart/increase/${productId}`
    );

    return normalizeCartItems(data);
  }
);

// ================= DECREASE =================
export const decrease = createAsyncThunk(
  "cart/decrease",
  async (productId) => {
    const { data } = await api.put(
      `/cart/decrease/${productId}`
    );

    return normalizeCartItems(data);
  }
);

// ================= REMOVE =================
export const remove = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    const { data } = await api.delete(
      `/cart/remove/${productId}`
    );

    return normalizeCartItems(data);
  }
);

// ================= SLICE =================
const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })

      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD
      .addCase(addCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })

      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // INCREASE
      .addCase(increase.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })

      .addCase(increase.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // DECREASE
      .addCase(decrease.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })

      .addCase(decrease.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // REMOVE
      .addCase(remove.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })

      .addCase(remove.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;