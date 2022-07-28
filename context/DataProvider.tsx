import React, { useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import { getOrders, getCustomers } from "../utils/firebase/firebase-db"
import type { Order } from "../pages/index"

interface LayoutProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<LayoutProps> = ({ children }) => {
  const [data, setData] = useState<Order[] | []>([])
  
  useEffect(() => {
    const getData = async () => {
        const customersData = await getCustomers()
        const orderData = await getOrders()
        orderData.map(order => order.partCount = parseInt(order.partCount))
        console.log(orderData)
        setData({orders: orderData, customers: customersData})
    }
}, [])

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};