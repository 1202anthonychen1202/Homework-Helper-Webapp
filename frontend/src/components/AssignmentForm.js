import { useState } from "react"
import { useAssignmentsContext } from "../hooks/useAssignmentsContext";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useAuthContext } from "../hooks/useAuthContext";


const AssignmentForm = () => {
    const { dispatch } = useAssignmentsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [schoolClass, setSchoolClass] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
        }

        const assignment = {title, schoolClass, date};

        const response = await fetch('/api/assignments', {
            method: 'POST',
            body: JSON.stringify(assignment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setSchoolClass('')
            setDate('')
            setError(null)
            setEmptyFields([])
            console.log('new assignment added')
            dispatch({type: 'CREATE_ASSIGNMENT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Assignment</h3>
            <label>Assignment:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Class:</label>
            <input 
                type="text"
                onChange={(e) => setSchoolClass(e.target.value)}
                value={schoolClass}
                className={emptyFields.includes('schoolClass') ? 'error' : ''}
            />

            <label>Due Date:</label>
            <DatePicker
                selected={date}
                onChange={(e) => setDate(e)}
                minDate={new Date()}
                value={date}
                className={emptyFields.includes('date') ? 'error' : ''}
            />

            <button>Add Assignment</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AssignmentForm