import { formatAmount, formatDate } from '../../service/service'

function TransactionDetails({ transaction }) {
  return (
    <div className="transactionDetails">
      <p>
        Transaction date:
        <span>{formatDate(transaction.created_at)}</span>
      </p>
      <p>
        Transaction to:
        <span>{transaction.counterparty_name}</span>
      </p>
      <p>
        Transaction type:
        <span>{transaction.debit === false ? 'Credit' : 'Debit'}</span>
      </p>
      <p>
        Transaction Amount:
        <span>{`${formatAmount(transaction.amount)} ${transaction.currency}`}</span>
      </p>
      <p>
        Operation Type:
        <span>{transaction.operation_type}</span>
      </p>
      <p>
        Attachement linked:
        <span>
          {transaction.attachements.map((item, index) => {
            return <a href={item.url} key={`${item.url}-${index}`}>{` Attachement${index + 1}`}</a>
          })}
        </span>
      </p>
    </div>
  )
}

export default TransactionDetails
