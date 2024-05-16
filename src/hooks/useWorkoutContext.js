import { useContext } from "react";
import { workoutContext } from "../context/workoutContext";

export const useWorkoutContext = () =>{
    const context = useContext(workoutContext)
    if(!context){
        throw Error('useWorkoutContext must be inside an WorkoutContextProvider')
    }
    return context;
}
