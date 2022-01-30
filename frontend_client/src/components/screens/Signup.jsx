import {Link} from 'react-router-dom'

const Signup = () =>{
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h3>Instagram Signup</h3>
                <input 
                    type="text"
                    placeholder="Name" 
                />
                <input 
                    type="text"
                    placeholder="Email" 
                />
                <input 
                    type="text"
                    placeholder="password" 
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
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