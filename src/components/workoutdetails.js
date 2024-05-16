import { FaRegTrashAlt } from "react-icons/fa";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDeatils = ({workout}) => {
    const { dispatch } = useWorkoutContext()
    const { user } = useAuthContext();

    const handleDelete = async () =>{
        if(!user){return}
       const response = await fetch('http://localhost:4000/api/workouts/'+workout._id, {
        method: 'DELETE',
        headers: {
            'authorization': `bearer ${user.token}` 
        }
       })
       const json = await response.json()

       if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
       }
    }

    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleDelete}><FaRegTrashAlt /></span>
        </div>
     );
}
 
export default WorkoutDeatils;