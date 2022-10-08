import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../context/TransactionContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  const summary = transactions.reduce(
    (subtotal, transaction) => {
      if (transaction.type === 'income') {
        subtotal.income += transaction.price
        subtotal.total += transaction.price
      } else {
        subtotal.outcome += transaction.price
        subtotal.total -= transaction.price
      }
      return subtotal
    },
    { income: 0, outcome: 0, total: 0 },
  )
  return summary
}
