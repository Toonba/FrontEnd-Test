import '../../styles/sidePanel.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import TransactionDetails from '../TransactionDetails/TransactionDetails'
import { useEffect, useState } from 'react'

function SidePanel() {
  const selectedTransactions = useSelector((state) => state.transactionsSelected)
  const transactionsData = useSelector((state) => state.transactionsData)
  const [currentTransaction, setCurrentTransaction] = useState(null)

  useEffect(() => {
    if (selectedTransactions.length === 1) setCurrentTransaction(transactionsData.filter((item) => item.id === selectedTransactions[0])[0])
  }, [selectedTransactions])

  if (currentTransaction !== null) {
    return (
      <section className="sidePanel">
        <header></header>
        <div className="seeDetails">{selectedTransactions.length !== 0 ? selectedTransactions.length === 1 ? <TransactionDetails transaction={currentTransaction} /> : <p>You have selectionned transactions : {selectedTransactions.join(', ')} </p> : <p>Click on one or several transactions to see details</p>}</div>
      </section>
    )
  } else {
    return (
      <section className="sidePanel">
        <header></header>
        <div className="seeDetails">
          <p>Click on one or several transactions to see details</p>
        </div>
      </section>
    )
  }
}

export default SidePanel
