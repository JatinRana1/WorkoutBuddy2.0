import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { FaEye, FaEyeSlash  } from "react-icons/fa";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signUp, isLoading, error} = useSignup()
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await signUp(email,password)
    }
    const ShowPassword = () =>{
        setShowPassword(!showPassword)
    }
    return (
        <form className="signup"
         onSubmit={handleSubmit}
        >
            <h1>Signup</h1>
            <label htmlFor="email">Email: </label>
            <input type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <label htmlFor="password">Password: </label>
            <div className="password-input-container">
                <input type={showPassword?'text':'password'}
                    className="password-input"
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                {showPassword?
                <FaEye onClick={ShowPassword} size={20} className="toggle-password"/>
                :<FaEyeSlash onClick={ShowPassword} size={20} className="toggle-password"/>}
            </div>
            <button disabled={isLoading}>Signup</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default SignUp;
