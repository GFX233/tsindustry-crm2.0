import React from "react";
import type { Data } from "../utils/types/types";

export const DataContext = React.createContext<Data>({user: null, orders: [], customers: [], todos: []});