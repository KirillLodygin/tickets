import axios from 'axios'
import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import tickets from '../../../assets/tickets.json'
import type { ticketType, stopsType } from '../../types/projectTypes'

interface TicketsState {
  ticketsArr: Array<ticketType>
  currency: 'RUB' | 'USD' | 'EUR'
  stops: Array<stopsType>
}

const initialState: TicketsState = {
  ticketsArr: [],
  currency: 'RUB',
  stops: [],
}

// Асинхронный action creator для получения новых билетов
export const getNewTicketArr = createAsyncThunk('tickets/getNewTicketArr', async () => {
  // Здесь можно сделать запрос к API или любую другую асинхронную операцию
  // Получаем коэффициенты отношения RUB к USD и RUB к EUR
  // По идее адрес запроса нужно вынести в отдельную константу. Но у нас всего один запрос, и я решил папку api_consts
  // для адресов не создавать.
  const response = await axios.get('https://www.cbr-xml-daily.ru/latest.js')
  let rates: any = ''
  if (response.data && response.data.rates) {
    rates = response.data.rates
  }
  // Здесь должен быть асинхронный запрос для получения массива билетов, но мы получаем его из json
  const ticketsArr = JSON.parse(JSON.stringify(tickets.tickets))
  // Добавляем поля с ценами на билеты в валюте
  ticketsArr.forEach((ticket: ticketType) => {
    ticket.priceUSD = Math.round(ticket.price * rates.USD * 100) / 100
    ticket.priceEUR = Math.round(ticket.price * rates.EUR * 100) / 100
  })

  return ticketsArr
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    getCurrency(state, action: PayloadAction<'RUB' | 'USD' | 'EUR'>) {
      state.currency = action.payload
    },
    getStopsState(state, action: PayloadAction<Array<stopsType>>) {
      state.stops = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNewTicketArr.pending, (state) => {
      // Логика при начале загрузки (например, показать индикатор загрузки)
    })
    builder.addCase(getNewTicketArr.fulfilled, (state, action) => {
      state.ticketsArr = action.payload
      state.stops = Array.from(new Set(state.ticketsArr.map((ticket) => ticket.stops)))
        .sort((a, b) => a - b)
        .map((num) => ({
          checkNum: num,
          isChecked: false,
        }))
      // Дополнительная логика после успешной загрузки
      // Например, отключить индикатор загрузки
    })
    builder.addCase(getNewTicketArr.rejected, (state, action) => {
      // Логика при ошибке загрузки (например, показать сообщение об ошибке)
      console.error(action.error.message)
    })
  },
})

export const { getStopsState, getCurrency } = ticketsSlice.actions

export default ticketsSlice.reducer
