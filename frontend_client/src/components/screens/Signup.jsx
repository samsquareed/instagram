import { useState } from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios'
import M from 'materialize-css'

const Signup = () =>{

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () =>{
        console.log(name, email, password);
        Axios.post('http://localhost:5000/signup',{name,email,password})
        .then(response=> {
            // console.log(response)
            if(response.data.message){
                M.toast({html: response.data.message, classes:"#43a047 green darken-1"})
            } else if(response.data.error) {
                // console.log(response.data.error);
                M.toast({html: response.data.error,classes:"#c62828 red darken-3"})
            }
        });
    }

    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h3>Instagram Signup</h3>
                <input 
                    type="text"
                    placeholder="Name" 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
                <input 
                    type="email"
                    placeholder="Email" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="password" 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={handleSignUp}
                >
                    Signup  
                </button>
                <h5>
                    <Link to="/login">Already have an account ?</Link>
                </h5>
                {/* <h6>
                    <Link to="/reset">Forgot password ?</Link>
                </h6> */}
            </div>
        </div>
    )
}

export default Signup;