import React, { FC } from 'react'

interface Props {
  currency: 'RUB' | 'USD' | 'EUR'
}

export const CurrencySymbol: FC<Props> = ({ currency }) => {
  const symbols = {
    USD: '\u0024',
    EUR: '\u20AC',
    RUB: '\u20BD',
  }

  return <span>{symbols[currency]}</span>
}
