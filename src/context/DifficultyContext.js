import { createContext, useContext, useState } from "react";

export const DifficultyContext = createContext();
export const SetDifficultyContext = createContext();

export const DifficultyProvider = ({children}) => {
    const [difficulty, setDifficulty] = useState('0');

    return(
        <DifficultyContext.Provider value={difficulty}>
            <SetDifficultyContext.Provider value={setDifficulty}>
                {children}
            </SetDifficultyContext.Provider>
        </DifficultyContext.Provider>
    )
};

export const useDifficulty = () => useContext(DifficultyContext);
export const useSetDifficulty = () => useContext(SetDifficultyContext);
