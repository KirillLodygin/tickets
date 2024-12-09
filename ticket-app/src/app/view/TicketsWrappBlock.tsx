import React from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getNewTicketArr } from '../redux/reducers/tickets'
import { ReferenceBlock } from './ReferenceBlock'
import { TicketBlock } from './TicketBlock'

export const TicketsWrappBlock = () => {
  const dispatch = useAppDispatch()

  const currency = useAppSelector((state) => state.tickets.currency)
  const stops = useAppSelector((state) => state.tickets.stops)
  const currentStops = useAppSelector((state) => state.tickets.stops)
    .filter((stop) => stop.isChecked)
    .map((stop) => stop.checkNum)
  const ticketsArr = useAppSelector((state) => state.tickets.ticketsArr).filter((ticket) => {
    return currentStops.length ? currentStops.includes(ticket.stops) : ticket
  }).sort((a, b) => (a.price - b.price))

  useEffect(() => {
    dispatch(getNewTicketArr())
  }, [])

  return (
    <div>
      <div className="earth mb-10"/>
      <div className="flex gap-x-10">
        <div className="w-1/4 shadow-md p-6 bg-white text-black p-10 max-h-[500px] min-w-[350px]">
          <ReferenceBlock stops={stops} />
        </div>
        <div className="w-3/4 text-center text-white">
          {ticketsArr.map((ticket, index) => (
            <TicketBlock key={`${ticket.origin}_${ticket.destination}_${index}`} ticket={ticket} currency={currency} />
          ))}
        </div>
      </div>
    </div>
  )
}
