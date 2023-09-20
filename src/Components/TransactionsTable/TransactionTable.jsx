function TransactionsTable({ transactionsList }) {

  
  // Hard coded here but could be retrieve as props or from store with redux to addap with the real number of unseen transaction at any time
  const unseen = 3 
  
  const formatDate = (dateIso) => {
    const date = new Date(dateIso)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }

  const formatPurchaseType = (intialPurchaseType) => {
    return intialPurchaseType.charAt(0).toUpperCase() + intialPurchaseType.slice(1).toLowerCase()
  }
  
  const formatAmount = (initialAmount) => {
    const amountNumber = parseFloat(initialAmount)
    if (amountNumber < 0){
      return `- ${Math.abs(amountNumber).toLocaleString('fr-FR')}`
    } else {
      return `+ ${Math.abs(amountNumber).toLocaleString('fr-FR')}`
    }
  }
  

  const convertToGbp = (priceEur) => {
    return (priceEur * 0.86).toFixed(2)
  }

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>DD-MM-YYYY</th>
            <th>Counterparty Name</th>
            <th>Payment Type</th>
            <th>Amount</th>
            <th><i className="fa-solid fa-paperclip link"></i></th>
          </tr>
        </thead>
        <tbody>
          {transactionsList.map((transactions, index) => (
            <tr key={transactions.id} value={transactions.id} className={index < unseen ? "unseenRow" : null}>
              <td>{formatDate(transactions.created_at)}</td>
              <td>{transactions.counterparty_name}</td>
              <td>{formatPurchaseType(transactions.operation_type)}</td>
              <td className="amount">
                <div className="curencies">
                  <p className="initial">{`${formatAmount(transactions.amount)} ${transactions.currency}`}
                  {transactions.debit === 'true' ? <span className="down">&#9660;</span> : <span className="up">&#9650;</span>}</p>
                  <p className="converted">{transactions.debit === 'true' ? `${formatAmount(convertToGbp(transactions.amount))} GBP` : null}</p>
                </div>
              </td>
              <td>{transactions.attachements.length !== 0 ? (<><a className='attachmentLink' href={transactions.attachements[0].url}><i className="fa-solid fa-paperclip link"></i><span className='attachmentNumber'>{transactions.attachements.length}</span></a> </>) : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable
