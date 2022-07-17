import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

function App(){
    const [login, setLogin] = useState(1);
    return (
        <div>
            {login === 0 ? <SignUp/> : <SignIn />}
            <div onClick={()=>{setLogin(login === 0?1:0)}}>
                <br/>
                {login === 0 ? <p>Already registered? <span>Click here to Sign In</span></p> : <p>New to app? <span>Click to Sign Up</span></p>}
            </div>
        </div>
    )
}

export default App;