import React from "react";
import axios from 'axios';
import store from "../store/store";
import { withRouter } from "./withRouter";

class SignIn extends React.Component {
    componentDidMount(){
        
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: []
        }
    }

    handleChange = (event) => {
        this.setState({
            email: event.target.type === "email" ? event.target.value : this.state.email,
            password: event.target.type === "password" ? event.target.value : this.state.password
        });
    }

    submit = () => {
        axios.post('/api/user/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(res => {
                if (res.data.success) {
                    store.dispatch({
                        type: "login",
                        user: res.data.user,
                        token: res.data.token
                    });
                    this.props.navigate('/home');
                }
                else {
                    if(res.data.error){
                        this.setState({
                            errors: res.data.error
                        })
                    }
                    else{
                        const arr =[];
                        arr.push(res.data.message);
                        this.setState({
                            errors: arr
                        })
                    }
                }
            })
            .catch(er => {
                console.log("axios error", er);
            })

    }

    render() {
        return (
            <div className="login-box">
                <h1>Sign In</h1>
                {this.state.errors.map((msg, idx) => {return <p className="red-para">{idx+1}. {msg}</p>})}
                <input type="email" placeholder="Email" onChange={this.handleChange} value={this.email}></input>
                <input type="password" placeholder="Password (min 8 characters)" onChange={this.handleChange} value={this.password}></input>
                <button onClick={this.submit} id="submit_button">Sign In</button>
            </div>
        )
    }
}

export default withRouter(SignIn);