import React from "react";
import type { Order } from "../pages/index"

export const DataContext = React.createContext<Order[] | []>([])