import React, { createContext, useContext, useState } from 'react';

const EsgConfigContext = createContext();

export const EsgConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({
        autoEmissionCalculation: true,
        evidenceRequirement: true,
        badgeAutoAward: true,
        weights: {
            environmental: 40,
            social: 30,
            governance: 30
        }
    });

    return (
        <EsgConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </EsgConfigContext.Provider>
    );
};

export const useEsgConfig = () => useContext(EsgConfigContext);
