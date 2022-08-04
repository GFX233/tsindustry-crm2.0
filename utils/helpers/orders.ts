 import type { Order } from "../types/types"
 

 export const getTotal = (data: Order[], item: keyof Order): number => {
  const totalReduce = data.reduce((total: number, current: Order) => {
      return total += parseInt(current[item]) 
  }, 0)
  return totalReduce
}
