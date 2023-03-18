import { createContext, useReducer } from 'react'

export const AssignmentsContext = createContext()

export const assignmentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ASSIGNMENTS':
            return {
                assignments: action.payload
            }
        case 'CREATE_ASSIGNMENT':
            return {
                assignments: [action.payload, ...state.assignments]
            }
        case 'DELETE_ASSIGNMENT':
            return {
                assignments: state.assignments.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const AssignmentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(assignmentsReducer, {
        assignments: null
    })

    return (
        <AssignmentsContext.Provider value={{...state, dispatch}}>
            { children }
        </AssignmentsContext.Provider>
    )
}