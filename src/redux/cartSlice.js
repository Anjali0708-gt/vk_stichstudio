import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/cart";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

// Add to database
export const addCart = createAsyncThunk(
  "cart/addCart",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/add`, {
        productId: product._id,
        quantity: 1,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add cart"
      );
    }
  }
);

// Get cart from database
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get cart"
      );
    }
  }
);
// Increase quantity
export const increase = createAsyncThunk(
  "cart/increase",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API}/increase/${productId}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to increase quantity"
      );
    }
  }
);

// Decrease quantity
export const decrease = createAsyncThunk(
  "cart/decrease",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API}/decrease/${productId}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decrease quantity"
      );
    }
  }
);

// Remove product
export const remove = createAsyncThunk(
  "cart/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API}/remove/${productId}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove product"
      );
    }
  }
);
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

      // Add cart
      .addCase(addCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cartItems = action.payload.items;
      })

      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Increase
.addCase(increase.fulfilled, (state, action) => {
  state.loading = false;
  state.cartItems = action.payload.items;
})

// Decrease
.addCase(decrease.fulfilled, (state, action) => {
  state.loading = false;
  state.cartItems = action.payload.items;
})

// Remove
.addCase(remove.fulfilled, (state, action) => {
  state.loading = false;
  state.cartItems = action.payload.items;
})

      // Get cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cartItems = action.payload.items;
      })

      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;