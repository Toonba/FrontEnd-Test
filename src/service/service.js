export const formatDate = (dateIso) => {
  const date = new Date(dateIso)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

export const formatPurchaseType = (intialPurchaseType) => {
  return intialPurchaseType.charAt(0).toUpperCase() + intialPurchaseType.slice(1).toLowerCase()
}

export const formatAmount = (initialAmount) => {
  const amountNumber = parseFloat(initialAmount)
  if (amountNumber < 0) {
    return `- ${Math.abs(amountNumber).toLocaleString('fr-FR')}`
  } else {
    return `+ ${Math.abs(amountNumber).toLocaleString('fr-FR')}`
  }
}

export const convertToGbp = (priceEur) => {
  return (priceEur * 0.86).toFixed(2)
}