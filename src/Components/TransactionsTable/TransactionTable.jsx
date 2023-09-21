import { useDispatch } from 'react-redux'
import { selectOneTransaction, selectSeveralTransactions } from '../../store/store'
import { formatAmount, formatDate, formatPurchaseType, convertToGbp } from '../../service/service'
import { useState } from 'react'

function TransactionsTable({ transactionsList }) {
  // Hard coded this unseen variable to be able to reproduce mock given but could be retrieve as props or from store with redux to addap with the real number of unseen transaction at any time
  const unseen = 3

  // Store with redux which rows has been selected either by finding index of first selected row and current row when using shift key or simply by finding current id when only one is selected
  const dispatch = useDispatch()

  let firstSelectedRowId = null

  function handleSelectedRow(event, transactionId) {
    const { shiftKey } = event

    if (shiftKey) {
      if (firstSelectedRowId === null) {
        firstSelectedRowId = transactionId
      } else {
        const currentIndex = sortedTransactions.findIndex((transaction) => transaction.id === transactionId)
        const firstSelectedIndex = sortedTransactions.findIndex((transaction) => transaction.id === firstSelectedRowId)

        if (currentIndex !== -1 && firstSelectedIndex !== -1) {
          const startIndex = Math.min(currentIndex, firstSelectedIndex)
          const endIndex = Math.max(currentIndex, firstSelectedIndex)
          const selectedTransactions = sortedTransactions.slice(startIndex, endIndex + 1)

          const selectedTransactionIds = selectedTransactions.map((transaction) => transaction.id)

          dispatch(selectSeveralTransactions(selectedTransactionIds))
        }
      }
    } else {
      console.log(transactionId)
      dispatch(selectOneTransaction(transactionId))
      firstSelectedRowId = null
    }
  }

  //manage sorting by implementing ascending, descending and no-order sorting, also storing which columns is currently sorted
  const [sortedTransactions, setSortedTransactions] = useState([...transactionsList])
  const [sort, setSort] = useState('no')
  const [currentSort, setCurrentSort] = useState('no')

  const sorting = (sortType, key) => {
    let sorted
    if (sortType === 'up') {
      if (key === 'amount') {
        sorted = [...transactionsList].sort((a, b) => parseFloat(a[key] - parseFloat(b[key])))
      } else if (key === 'attachements') {
        sorted = [...transactionsList].sort((a, b) => a[key].length - b[key].length)
      } else {
        sorted = [...transactionsList].sort((a, b) => a[key].localeCompare(b[key]))
      }
    } else if (sortType === 'down') {
      if (key === 'amount') {
        sorted = [...transactionsList].sort((a, b) => parseFloat(b[key] - parseFloat(a[key])))
      } else if (key === 'attachements') {
        sorted = [...transactionsList].sort((a, b) => b[key].length - a[key].length)
      } else {
        sorted = [...transactionsList].sort((a, b) => b[key].localeCompare(a[key]))
      }
    }
    setSortedTransactions(sorted)
    setSort(sortType)
  }

  const sortTable = (key) => {
    if (currentSort !== key) {
      sorting('up', key)
      setCurrentSort(key)
      setSort('up')
    } else {
      if (sort === 'no') {
        sorting('up', key)
      } else if (sort === 'up') {
        sorting('down', key)
      } else {
        setSort('no')
        setSortedTransactions([...transactionsList])
      }
    }
  }
  
  const tableHeader = [
    {properties: 'created_at', label:'DD-MM-YYYY'},
    {properties: 'counterparty_name', label:'Counterparty Name'},
    {properties: 'operation_type', label:'Payment Type'},
    {properties: 'amount', label:'Amount'},
    {properties: 'attachements', label:<i className="fa-solid fa-paperclip link"></i>},
]

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            {tableHeader.map((item)=>{
              return (
                <th onClick={() => sortTable(item.properties)} key={`${item.properties}`}>
                <div className="tableHeader">
                <p>{item.label}</p>
                {currentSort === item.properties ? sort === 'no' ? null : sort === 'down' ? <span className="down">&#9660;</span> : <span className="up">&#9650;</span> : null}
              </div>
              </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transactions, index) => (
            <tr key={transactions.id} value={transactions.id} className={index < unseen ? 'unseenRow' : null} onClick={(event) => handleSelectedRow(event, transactions.id)}>
              <td>{formatDate(transactions.created_at)}</td>
              <td>{transactions.counterparty_name}</td>
              <td>{formatPurchaseType(transactions.operation_type)}</td>
              <td className="amount">
                <div className="curencies">
                  <p className="initial">
                    {`${formatAmount(transactions.amount)} ${transactions.currency}`}
                    {transactions.debit === 'true' ? <span className="down">&#9660;</span> : <span className="up">&#9650;</span>}
                  </p>
                  <p className="converted">{transactions.debit === 'true' ? `${formatAmount(convertToGbp(transactions.amount))} GBP` : null}</p>
                </div>
              </td>
              <td>
                {transactions.attachements.length !== 0 ? (
                  <>
                    <a className="attachmentLink" href={transactions.attachements[0].url}>
                      <i className="fa-solid fa-paperclip link"></i>
                      <span className="attachmentNumber">{transactions.attachements.length}</span>
                    </a>{' '}
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable
