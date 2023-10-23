import { createContext, useContext, useState } from 'react';

export const GloabalContext = createContext();

export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);

	return (
		<GloabalContext.Provider value={(MenuOpen, setMenuOpen)}>{children}</GloabalContext.Provider>
	);
}

export function useGlobalData() {
	const GloabalContext = useContext(GloabalContext);
	return GloabalContext;
}
