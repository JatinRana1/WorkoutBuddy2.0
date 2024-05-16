import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { FaEye, FaEyeSlash  } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { login, isLoading, error } = useLogin();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await login(email,password);
    }
    const ShowPassword = () =>{
        setShowPassword(!showPassword)
    }
    return (
        <form className="login"
         onSubmit={handleSubmit}
        >
            <h1>Login</h1>
            <label htmlFor="email">Email: </label>
            <input type="email"
                id="email"
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
            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default Login;
