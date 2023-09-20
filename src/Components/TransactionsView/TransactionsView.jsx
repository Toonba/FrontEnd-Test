import { useEffect, useState } from 'react'
import '../../styles/transactionsView.css'
import { Data } from '../../Data/Data'
import TransactionsTable from '../TransactionsTable/TransactionTable'
import { useDispatch } from 'react-redux'
import {addTransactionData} from '../../store/store'

function TransactionsView() {
  const [data, setData] = useState(null)
  const dispatch =useDispatch()

  // I tried to retrieve the data using the code found on https:\/\/paymiuminterviews.docs.apiary.io/#reference/0/transaction-collection/list-all-transactions but I obtain status 0 + an error "has been blocked by CORS Policy : No 'Access-Control-Allow-Origin' header is present on the requested resource.
  
  // useEffect(() => {
  //   var request = new XMLHttpRequest()

  //   request.open('GET', 'http://polls.apiblueprint.org/transactions')

  //   request.onreadystatechange = function () {
  //     if (this.readyState === 4) {
  //       console.log('Status:', this.status)
  //       console.log('Headers:', this.getAllResponseHeaders())
  //       console.log('Body:', this.responseText)
  //     }
  //   }

  //   request.send()
  // }, [])
  
  //fetching data from  http://private-3f9656-paymiuminterviews.apiary-mock.com/transactions (or from http://polls.apiblueprint.org/transactions as mentionned in the doc) give the same error as the request above : Access to fetch at 'http://polls.apiblueprint.org/transactions' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  //To solve this I created a mock of transactions at '../../Data/Data' and I updated data with this mock when catching error on fetch

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://polls.apiblueprint.org/transactions');

        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }

        const responseData = await response.json();
        console.log(responseData)
        setData(responseData);
      } catch (error) {
        setData(Data[0].transactions)
        console.error('Une erreur s\'est produite :', error);
      }
    }
    fetchData();

  }, []);

if (data !== null){
  dispatch(addTransactionData(data))
  return (
    <section className="transactionsView">
      <header></header>
      <TransactionsTable transactionsList={data} />
    </section>
  )}
}

export default TransactionsView
