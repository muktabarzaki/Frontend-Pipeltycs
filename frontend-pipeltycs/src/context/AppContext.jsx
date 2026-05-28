import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [currency, setCurrency] = useState('usd');
    const [language, setLanguage] = useState('en');

    const formatCurrency = (amount) => {
        if (currency === 'idr') return 'Rp ' + Number(amount).toLocaleString('id-ID');
        if (currency === 'eur') return '€ ' + Number(amount).toLocaleString('de-DE');
        return '$ ' + Number(amount).toLocaleString('en-US');
    };

    const t = (en, id) => language === 'id' ? id : en;

    return (
        <AppContext.Provider value={{ currency, setCurrency, language, setLanguage, formatCurrency, t }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}