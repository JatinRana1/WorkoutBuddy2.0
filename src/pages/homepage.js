import { useEffect } from "react";
import WorkoutDeatils from "../components/workoutdetails";
import WorkoutForm from '../components/workoutForm'
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Homepage = () => {
    const { workouts, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();
    useEffect(()=>{
        const fetchWorkout = async () =>{
            const response = await fetch('https://workoutbuddy2-0.onrender.com/api/workouts/',{
                headers: {
                    'authorization': `bearer ${user.token}` 
                }
            });
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if(user){
            fetchWorkout()
        }
    },[dispatch,user])
    return (
        <div className="home">
            <div className="workout">
            {workouts?.map(workout=>(
                <WorkoutDeatils workout={workout} key={workout._id} />
            ))}
            </div>
            <WorkoutForm/>
        </div>
    );
}
 
export default Homepage;