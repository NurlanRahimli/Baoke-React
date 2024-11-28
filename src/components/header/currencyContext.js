import React, { createContext, useState } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD"); // Default currency
  const conversionRate = 0.95; // Conversion rate: 1 USD = 0.95 EUR

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, conversionRate }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
