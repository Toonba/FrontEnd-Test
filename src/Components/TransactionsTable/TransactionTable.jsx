import { useDispatch, useSelector } from 'react-redux'
import { selectOneTransaction, selectSeveralTransactions } from '../../store/store'
import {formatAmount, formatDate, formatPurchaseType, convertToGbp} from '../../service/service'

function TransactionsTable({ transactionsList }) {
  const dispatch = useDispatch()

  function handleSelectedRow(event, transactionId) {
    const { shiftKey } = event

    if (shiftKey) {
      dispatch(selectSeveralTransactions(transactionId))
    } else {
      dispatch(selectOneTransaction(transactionId))
    }
  }

  // Hard coded this unseen variable to be able to reproduce mock given but could be retrieve as props or from store with redux to addap with the real number of unseen transaction at any time
  const unseen = 3


  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>DD-MM-YYYY</th>
            <th>Counterparty Name</th>
            <th>Payment Type</th>
            <th>Amount</th>
            <th>
              <i className="fa-solid fa-paperclip link"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactionsList.map((transactions, index) => (
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
