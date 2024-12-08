import React, { FC } from 'react'
import { useState } from 'react'
import { useAppDispatch } from '../hooks'
import { getCurrency, getStopsState } from '../redux/reducers/tickets'
import type { stopsType } from '../types/projectTypes'
import { getCheckboxLabel } from '../utils/utils'

interface Props {
  stops: Array<stopsType>
}

type currencyButton = {
  label: 'RUB' | 'USD' | 'EUR'
  isPressed: boolean
}

const initButtons: Array<currencyButton> = [
  {
    label: 'RUB',
    isPressed: true,
  },
  {
    label: 'USD',
    isPressed: false,
  },
  {
    label: 'EUR',
    isPressed: false,
  },
]

export const ReferenceBlock: FC<Props> = ({ stops }) => {
  const [currencyButtons, setCurrencyButtons] = useState(initButtons)
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useAppDispatch()

  const pressBtn = (label: 'RUB' | 'USD' | 'EUR') => {
    const buttons = currencyButtons.map((button) => {
      button.isPressed = button.label === label
      return button
    })
    setCurrencyButtons(buttons)
    dispatch(getCurrency(label))
  }

  const handleChange = () => {
    setIsChecked(!isChecked)
    const newStops = stops.map((item) => ({
      checkNum: item.checkNum,
      isChecked: !isChecked,
    }))
    dispatch(getStopsState(newStops))
  }

  const handleCheckChange = (num: number) => {
    const newStops = JSON.parse(JSON.stringify(stops))
    const index = newStops.findIndex((item: stopsType) => item.checkNum === num)
    newStops[index].isChecked = !newStops[index].isChecked
    const areAllTrue = newStops.every((item: stopsType) => item.isChecked)
    setIsChecked(areAllTrue)

    dispatch(getStopsState(newStops))
  }

  const chooseOnly = (num: number) => {
    const newStops = stops.map((item: stopsType) => ({
      checkNum: item.checkNum,
      isChecked: item.checkNum === num,
    }))
    dispatch(getStopsState(newStops))
    setIsChecked(false)
  }

  return (
    <div className="flex flex-col justify-start">
      <h3 className="w-full mb-5 font-bold">Валюта</h3>
      <div className="flex shadow-md mb-10 h-20 rounded-lg overflow-hidden border border-gray-400">
        {currencyButtons.map((button) => (
          <div
            key={button.label}
            className={`${button.isPressed ? 'bg-blue-600 text-white' : 'bg-white-500 text-blue-600'}
            font-bold text-sm w-1/3 flex items-center justify-center border-box border 
            hover:text-blue-700 hover:bg-blue-100 hover:border-blue-600 transition-all duration-300 box-border`}
            onClick={() => pressBtn(button.label)}
          >
            {button.label}
          </div>
        ))}
      </div>
      <h3 className="w-full mb-5 font-bold">Количество пересадок</h3>
      <div className="flex flex-col justify-start">
        <div className="flex p-2 items-center relative group hover:bg-blue-200">
          <input
            id="checkbox"
            type="checkbox"
            className={`${
              isChecked
                ? 'border-gray-400 rounded-md focus:ring-blue-500'
                : 'focus:border-blue-500 checked:bg-sky-100 checked:border-blue-500'
            } 
                w-6 h-6 border-2`}
            checked={isChecked}
            onChange={handleChange}
          />
          <label htmlFor="checkbox" className="ml-5">
            Все
          </label>
        </div>
        {stops.map((item) => (
          <div key={`checkbox_${item.checkNum}`} className="flex p-2 items-center relative group hover:bg-blue-200">
            <input
              id={`checkbox_${item.checkNum}`}
              type="checkbox"
              className={`${
                item.isChecked
                  ? 'border-gray-400 rounded-md focus:ring-blue-500'
                  : 'focus:border-blue-500 checked:bg-sky-100 checked:border-blue-500'
              } 
                w-6 h-6 border-2`}
              checked={item.isChecked}
              onChange={() => handleCheckChange(item.checkNum)}
            />
            <label htmlFor={`checkbox_${item.checkNum}`} className="ml-5">
              {item.isChecked}
              {getCheckboxLabel(item.checkNum)}
            </label>
            <p
              className="absolute right-5 text-transparent group-hover:text-blue-600
                          cursor-default group-hover:cursor-pointer transition-colors duration-300"
              onClick={() => chooseOnly(item.checkNum)}
            >
              ТОЛЬКО
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
