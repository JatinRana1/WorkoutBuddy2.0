import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const { user } = useAuthContext();
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState(0);
    const [reps, setReps] = useState(0);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){return}
        const workout = {title, load, reps}
        const response = await fetch('http://localhost:4000/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                'authorization': `bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setError(null)
            setEmptyFields([])
            setTitle('')
            setLoad(0)
            setReps(0)
            console.log('New Workout Added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return ( 
        <div className="workout-form">
            <form onSubmit={handleSubmit}>
                <legend>Add a New Workout</legend>

                <label htmlFor="title">Title: </label>
                <input 
                type="text" 
                id="title" 
                value={title} 
                onChange={(e)=>{setTitle(e.target.value)}}
                className={emptyFields.includes('title')?'error':''}
                />

                <label htmlFor="load">load(kg): </label>
                <input 
                type="number" 
                id="load" 
                min={0} 
                value={load} 
                onChange={(e)=>{setLoad(e.target.value)}}
                />

                <label htmlFor="reps">reps: </label>
                <input 
                type="number" 
                id="reps" 
                min={0} 
                value={reps} 
                onChange={(e)=>{setReps(e.target.value)}}
                className={emptyFields.includes('reps')?'error':''}
                />
                <button>Add Workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
     );
}
 
export default WorkoutForm;