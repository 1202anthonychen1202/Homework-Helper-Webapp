import { useAssignmentsContext } from "../hooks/useAssignmentsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const AssignmentDetails = ({ assignment }) => {
    const { dispatch } = useAssignmentsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/assignments/' + assignment._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ASSIGNMENT', payload: json})
        }
    }

    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };

    return (
        <div className="assignment-details">
            <h4>{assignment.title}</h4>
            <p><strong>Class: </strong>{assignment.schoolClass}</p>
            <p><strong>Due Date: </strong>{new Date(assignment.date).toLocaleDateString('en-US', options)}</p>
            <p>{formatDistanceToNow(new Date(assignment.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>check</span>
        </div>
    )
}

export default AssignmentDetails