import React, { FC } from 'react'
import { ticketType } from '../types/projectTypes'
import { getCheckboxLabel } from '../utils/utils'
import { CurrencySymbol } from './CurrencySymbol'

interface Props {
  ticket: ticketType
  currency: 'RUB' | 'USD' | 'EUR'
}

const months = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек']
const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

const formatDate = (dateString: string) => {
  const parts = dateString.split('.').map(Number)

  const year = parts[2] + 2000
  const monthIndex = parts[1] - 1
  const day = parts[0]

  const date = new Date(year, monthIndex, day)

  const monthName = months[date.getMonth()]
  const weekDay = weekDays[date.getDay()]

  return `${day} ${monthName} ${year} ${weekDay}`
}

export const TicketBlock: FC<Props> = ({ ticket, currency }) => {
  const getPrice = () => {
    switch (currency) {
      case 'RUB':
        return new Intl.NumberFormat('ru-RU').format(ticket.price)
      case 'USD':
        return ticket.priceUSD ? new Intl.NumberFormat('ru-RU').format(ticket.priceUSD) : ''
      default:
        return ticket.priceEUR ? new Intl.NumberFormat('ru-RU').format(ticket.priceEUR) : ''
    }
  }
  return (
    <div className="flex shadow-md mb-5 min-w-[1100px]">
      <div className="w-1/3 p-6 bg-white text-black p-10 flex flex-col items-center justify-center border-gray-400 border-r">
        <div className="bg-company-logo"></div>
        <div className="bg-orange-500 text-white text-sm rounded-md mt-5 w-40 h-16 pt-3">
          Купить
          <br />
          {`за ${getPrice()} `} <CurrencySymbol currency={currency} />
        </div>
      </div>
      <div className="w-2/3 p-6 text-center bg-white text-black py-10 px-20">
        <div className="flex justify-center">
          <div className="w-1/3">
            <div className="text-6xl font-thin text-left mb-2">{ticket.departure_time}</div>
            <div className="text-base tracking-tighter font-semibold text-left text-gray-700 mb-2">
              {`${ticket.origin}, ${ticket.origin_name}`}
            </div>
            <div className="text-sm font-thin text-left text-gray-700 mb-5">{formatDate(ticket.departure_date)}</div>
          </div>
          <div className="w-1/3 pt-2 h-12 border-gray-400 border-b text-sm font-thin text-center text-gray-700 plane">
            {getCheckboxLabel(ticket.stops)}
          </div>
          <div className="w-1/3">
            <div className="text-6xl font-thin text-right mb-2">{ticket.arrival_time}</div>
            <div className="text-base tracking-tighter font-semibold text-right text-gray-700 mb-2">
              {`${ticket.destination}, ${ticket.destination_name}`}
            </div>
            <div className="text-sm font-thin text-right text-gray-700">{formatDate(ticket.arrival_date)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
