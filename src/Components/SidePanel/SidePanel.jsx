import '../../styles/sidePanel.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import TransactionDetails from '../TransactionDetails/TransactionDetails'
import { useEffect, useState } from 'react'

function SidePanel() {
  const selectedTransactions = useSelector((state) => state.transactionsSelected)
  const transactionsData = useSelector((state) => state.transactionsData)
  const [currentTransaction, setCurrentTransaction] = useState(null)

  useEffect(() => {
    if (selectedTransactions.length === 1) {
      setCurrentTransaction(transactionsData.filter((item) => item.id === selectedTransactions[0])[0])
    }
  }, [selectedTransactions])

  return (
    <section className="sidePanel">
      <header></header>
      <div className="seeDetails">{currentTransaction !== null ? selectedTransactions.length === 1 ? <TransactionDetails transaction={currentTransaction} /> : <p>You have selected transactions: {selectedTransactions.join(', ')}</p> : <p>Click on one or several transactions to see details</p>}</div>
    </section>
  )
}

export default SidePanel
