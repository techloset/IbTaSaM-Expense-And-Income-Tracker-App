import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {db} from '../config/firebase';
import auth from '@react-native-firebase/auth';

// Define the interface for a transaction object
interface Transaction {
  id: string; // Include the document ID as a property
  // Define other properties of the transaction object here
}

// Action
export const fetchTransactions = createAsyncThunk<Transaction[]>(
  'transactions/fetchTransactions',
  async () => {
    const userEmail: string = auth().currentUser?.email || '';

    try {
      const incomeSnapshot = await db
        .collection('Users')
        .doc(userEmail)
        .collection('UsersTransation')
        .get();

      // Map each document to a transaction object with the document ID included
      const transactionData = incomeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Combine income and expense data into one array
      const allTransactions = [...transactionData];

      return allTransactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error; // Propagate the error to be caught by the rejected case
    }
  },
);

// Create the transaction slice
export const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [] as Transaction[],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Export actions and reducer
export const {} = transactionSlice.actions;

export default transactionSlice.reducer;
