 import type { Order } from "../types/types"
 

 export const getTotal = (data: Order[], item: keyof Order): number => {
  const totalReduce = data.reduce((total: number, current: Order) => {
      return total += parseInt(current[item]) 
  }, 0)
  return totalReduce
}

const handleSort = (
  what: object[],
  withWhat: keyof object,
  ascending: boolean
): object[] => {
  const sorted = what.slice().sort((a, b) => {
    if (ascending) {
      if (a[withWhat] < b[withWhat]) {
        return -1;
      } else if (a[withWhat] > b[withWhat]) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (a[withWhat] < b[withWhat]) {
        return 1;
      } else if (a[withWhat] > b[withWhat]) {
        return -1;
      } else {
        return 0;
      }
    }
  });
  return (sorted);
};