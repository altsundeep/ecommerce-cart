import { createContext, useReducer } from 'react'

const GlobalContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload]
        case 'REMOVE':
            return [...action.payload]
        case 'INC':
            return [...action.payload]
        case 'DEC':
            return [...action.payload]
        default:
            return state
    }
}

// eslint-disable-next-line react/prop-types
const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>
}

export { GlobalContext, StateProvider }
