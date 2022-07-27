 export const getTotal = (data: object[], item: string) => {
  const totalReduce = data.reduce((total: number, current: object) => {
    return total += parseInt(current[item])
  }, 0)
  return totalReduce
}