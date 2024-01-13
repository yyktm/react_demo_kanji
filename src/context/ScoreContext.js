import { createContext, useContext, useState } from "react";

export const ScoreContext = createContext();
export const setScoreContext = createContext();

export const ScoreProvider = ({children}) => {
    const [score, setScore] = useState(0);

    return(
        <ScoreContext.Provider value={score}>
            <setScoreContext.Provider value={setScore}>
                {children}
            </setScoreContext.Provider>
        </ScoreContext.Provider>
    )
};

export const useScore = () => useContext(ScoreContext);
export const useSetScore = () => useContext(setScoreContext);