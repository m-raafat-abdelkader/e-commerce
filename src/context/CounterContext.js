import { createContext, useState } from "react";

export let CounterContext = createContext()
export default function CounterContextProvider(props){
    const [counter, setCounter] = useState(0)
    function changeCounter(){
        setCounter(Math.random())  
    }
    

    return <CounterContext.Provider value = {{counter,changeCounter}}>
        {props.children}
    </CounterContext.Provider>
} 
