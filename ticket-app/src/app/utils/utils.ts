export const getCheckboxLabel = (stops: number) => {
  switch (stops) {
    case 0:
      return 'Без пересадок'
    case 1:
      return `${stops} пересадка`
    default:
      return `${stops} пересадки`
  }
}