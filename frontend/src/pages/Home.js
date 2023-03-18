import { useEffect } from "react";
import { useAssignmentsContext } from "../hooks/useAssignmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import AssignmentDetails from '../components/AssignmentDetails'
import AssignmentForm from '../components/AssignmentForm'


const Home = () => {
    const {assignments, dispatch} = useAssignmentsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await fetch('/api/assignments', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ASSIGNMENTS', payload: json})
            }
        }

        if (user) {
            fetchAssignments()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="assignments">
                {assignments && assignments
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((assignment) => (
                    <AssignmentDetails key={assignment._id} assignment={assignment} />
                ))}
            </div>
            <AssignmentForm />
        </div>
    )
}

export default Home