import { AssignmentsContext } from "../context/AssignmentContext";
import { useContext } from "react";

export const useAssignmentsContext = () => {
    const context = useContext(AssignmentsContext)

    if (!context) {
        throw Error('useAssignmentContext must be used inside a AssignmentsContextProvider')
    }

    return context
}