import React, { useEffect, useState } from "react";
import { DataContext } from "./dataContext";
import firebase from "firebase/compat/app";
import Login from "../pages/login";
import { auth } from "../utils/firebase/firebase";
import { getOrders, getCustomers } from "../utils/firebase/firebase-db";
import type { Order, Customer, Data } from "../utils/types/types";

interface LayoutProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<LayoutProps> = ({
  children,
}) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  console.log(customers);
  const data: Data = { user, customers, orders };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getData = async () => {
      const orders = await getOrders();
      const customers = await getCustomers();
      setOrders(orders)
      setCustomers(customers)
    }
    getData()
  }, [])

  return (
    <DataContext.Provider value={data}>
      {user !== null ? children : <Login />}
    </DataContext.Provider>
  );
};

export async function getServerSideProps() {
  const orders = await getOrders();
  const customers = await getCustomers();

  return { props: { customers, orders } };
}

export default DataProvider
