import { SummaryCard, SummaryContainer } from './styles'
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { defaultTheme } from '../../styles/themes/default'
import { useContext } from 'react'
import { TransactionContext } from '../../context/TransactionContext'

export function Summary() {
  const { transactions } = useContext(TransactionContext)

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

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={defaultTheme['green-300']} />
        </header>

        <strong>{summary.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={defaultTheme['red-300']} />
        </header>

        <strong>{summary.outcome}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={defaultTheme['green-300']} />
        </header>

        <strong>{summary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
