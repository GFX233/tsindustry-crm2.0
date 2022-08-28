import { useState, useContext } from "react";
import { NextPage } from "next";
import { DataContext } from "../context/dataContext";
import LineChart from "../components/dashboard/lineChart";
import DoughnutChart from "../components/dashboard/doughnutChart";
import type { Order } from "../utils/types/types";
import Input from "../components/input";
import Head from "next/head";
import Card from "../components/card";

const Dashboard: NextPage = () => {
  const data = useContext(DataContext);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 7));

  const getFilteredOrders = (from: number, to: number) => {
    const orders = data.orders.filter(
      (order) =>
        parseInt(order.date.substring(from, to)) ===
        parseInt(date.substring(from, to))
    );
    return orders;
  };

  const getLastMonthOrders = () => {
    const orders = data.orders.filter(
      (order) =>
        parseInt(order.date.substring(5, 7)) ===
        parseInt(date.substring(5, 7)) - 1
    );
    return orders;
  };

  const getTotal = (data: Order[]) => {
    const total = data.reduce((total, current) => {
      return (total += parseInt(current.price));
    }, 0);
    return total / 1000;
  };

  const thisMonthTotal = getTotal(getFilteredOrders(5, 7)).toFixed(1);
  const lastMonthTotal = getTotal(getLastMonthOrders()).toFixed(1);
  const thisYearTotal = getTotal(getFilteredOrders(0, 4)).toFixed(2);

  const getPartsTotal = (data: Order[]) => {
    const total = data.reduce((total, current) => {
      return (total += parseInt(current.partCount));
    }, 0);
    return total;
  };

  interface MoneyOnCustomer {
    customer: number;
  }

  const getMoneyOnCustomer = () => {
    const orders: Order[] = getFilteredOrders(5, 7);
    const reducedOrders: MoneyOnCustomer[] = orders.reduce(
      (accumulator: MoneyOnCustomer, item: Order) => {
        accumulator[item.customer as keyof MoneyOnCustomer] =
          (parseInt(accumulator[item.customer as keyof Accu]) || 0) +
          parseInt(item.price);
        return accumulator;
      },
      []
    );
    return reducedOrders;
  };

  const getMoneyOnCustomer2 = (data: Order[]) => {
    let customers: { customer: number }[] = [];
    data.forEach((item) => {
      customers = [];
    });
  };

  const getMonthlyPerformance = () => {
    const orders: Order[] = getFilteredOrders(5, 7);
    const reducedOrders = orders.reduce((accumulator, item) => {
      accumulator[parseInt(item.date.substring(8, 10))] =
        (accumulator[parseInt(item.date.substring(8, 10))] || 0) +
        parseInt(item.price);
      return accumulator;
    }, {});
    const values = Object.values(reducedOrders);
    const keys = Object.keys(reducedOrders);
    let total = 0;
    let monthly = {};
    keys.forEach((key, idx) => {
      const value = values[idx] + total;
      monthly = { ...monthly, [key]: value };
      total += values[idx];
    });
    return monthly;
  };

  return (
    <>
      <Head>
        <title>DASHBOARD: TS INDUSTRY SYSTEMS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="p-4 gap-4 flex flex-col max-w-3xl mx-auto">
        <Input
          name="Datum:"
          type="month"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex flex-row justify-center gap-4">
          <div className="flex flex-col">
          <Card
            placeholder="This Month Total"
            text={String(
              parseInt(thisMonthTotal) > 1000
                ? `${(parseInt(thisMonthTotal) / 1000).toFixed(2)} M`
                : `${thisMonthTotal} K`
            )}
          />
          <Card
            placeholder="Previous Month"
            text={String(
              parseInt(lastMonthTotal) > 1000
                ? `${(parseInt(lastMonthTotal) / 1000).toFixed(2)} M`
                : `${lastMonthTotal} K`
            )}
          />
          <Card
            placeholder="Part this month"
            text={String(getPartsTotal(getFilteredOrders(5, 7)))}
          />
          </div>
          <DoughnutChart ordersData={getMoneyOnCustomer()} />
          <div className="flex flex-col">
          <Card
            placeholder="This Year Total"
            text={String(
              parseInt(thisYearTotal) > 1000
                ? `${(parseInt(thisYearTotal) / 1000).toFixed(2)} M`
                : `${thisYearTotal} K`
            )}
          />
          <Card
            placeholder="Celkem dílů tento rok"
            text={String(getPartsTotal(getFilteredOrders(0, 4)))}
          />
          </div>
          </div>
          <div className="flex flex-col justify-center p-8 gap-4">
            
            <LineChart orderData={getMonthlyPerformance()} />
          </div>
      </div>
    </>
  );
};

export default Dashboard;
