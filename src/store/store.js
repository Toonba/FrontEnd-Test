import { configureStore} from '@reduxjs/toolkit';
import { produce } from 'immer';

const initialState = {
  transactionsSelected: [],
  transactionsData :[]
}

const SELECT_ONE_TRANSACTION = 'selectOneTransaction'
const SELECT_SEVERAL_TRANSACTIONS = 'selectSeveralTransactions'
const ADD_TRANSACTION_DATA = 'addTransactionData'

export const selectOneTransaction = (transactionDetails) =>({type : SELECT_ONE_TRANSACTION, payload : transactionDetails})
export const selectSeveralTransactions = (transactionsIds) =>({type : SELECT_SEVERAL_TRANSACTIONS, payload: transactionsIds})
export const addTransactionData = (transactionData) => ({type:ADD_TRANSACTION_DATA, payload: transactionData})

const reducer = (state = initialState, action) =>{
  return produce(state, (draft) =>{
    switch (action.type){
      case ADD_TRANSACTION_DATA:
        draft.transactionsData=action.payload
        break
      case SELECT_ONE_TRANSACTION:
        draft.transactionsSelected = [action.payload];
        break
        case SELECT_SEVERAL_TRANSACTIONS:
          draft.transactionsSelected = action.payload;
          break;
      default:
        return state
    }
  })
}

const store = configureStore({reducer:reducer})

export default store