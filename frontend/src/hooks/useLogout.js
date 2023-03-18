import { useAuthContext } from "./useAuthContext"
import { useAssignmentsContext } from "./useAssignmentsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: assignmentsDispatch } = useAssignmentsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        assignmentsDispatch({type: 'SET_ASSIGNMENTS', payload: null})
    }

    return {logout}
}