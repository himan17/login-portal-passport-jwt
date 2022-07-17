import React from "react";
import axios from 'axios';
import store from "../store/store";
import { withRouter } from "./withRouter";

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            errors: []
        }
    }
    
    handleChange = (event) =>{
        this.setState({
            fullName: event.target.type === "text" ? event.target.value : this.state.fullName,
            email: event.target.type === "email" ? event.target.value : this.state.email,
            password: event.target.type === "password" ? event.target.value : this.state.password
        });
    }

    submit = () => {
        axios.post('/api/user/register', {
            email : this.state.email, 
            password: this.state.password, 
            fullName: this.state.fullName
        })
        .then(res => {
            if(res.data.success){
                store.dispatch({
                    type: "login",
                    user: res.data.user,
                    token: res.data.token
                });
                this.props.navigate('/home');
            }
            else{
                let arr = [1,2]; 
                this.setState({
                    errors: res.data.error
                });
            }
        })
        .catch(er => {
            console.log("axios error", er);
        })

    } 

    render(){
        return (
            
            <div className="login-box">
                <h1>Sign Up</h1>
                {this.state.errors.map((msg, idx) => {return <p className="red-para">{idx+1}. {msg}</p>})}
                <input type = "text" placeholder = "Full Name" onChange = {this.handleChange} value = {this.fullName}></input>
                <input type = "email" placeholder = "Email" onChange = {this.handleChange} value = {this.email}></input>
                <input type = "password" placeholder = "Password (min 8 characters)" onChange = {this.handleChange} value = {this.password}></input>
                <button onClick = {this.submit}>Sign Up</button>
            </div>
        )
    }
}

export default withRouter(SignUp);
