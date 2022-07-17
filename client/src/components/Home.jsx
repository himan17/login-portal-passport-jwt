import React from "react";
import { request } from "../utils/axiosUtils";
import { withRouter } from "./withRouter";

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            auth: 0,
            userName: ''
        }
    }

    componentDidMount(){
        if(localStorage.JWT_PAYLOAD){
            console.log(localStorage.JWT_PAYLOAD);
            const header = {
                Authorization: localStorage.getItem('JWT_PAYLOAD')
            }
            request({url: '/api/user/profile'})
            .then(res=>{
                if(res.data){
                    console.log(res.data);
                    this.setState({
                        auth : 1,
                        userName : res.data.fullName
                    });
                }
            })
            .catch(er => {
                console.log(er);
            })
        }
        else{
            console.log("session expired");
            return setTimeout(()=>{this.props.navigate('/');}); 
        }
    }

    render(){
        return(
                <div>
                {this.state.auth === 0 ? 
                <div className="user-interface">
                <img src = "https://i.ibb.co/p2qkyDx/image-removebg-preview-3.png"/>
                <p>You are logged out. Sign In to view protected content</p>
                <button className="btn-blue" onClick={()=>{this.props.navigate('/')}}>Sign In</button>
                </div> 
                :
                <div className="user-interface">
                    <img src = "https://i.ibb.co/Cws59vw/bald-men-and-red-heads-rejoice-610264.png" width = "40%"/>
                    <br />
                    <p>Hello <strong>{this.state.userName}</strong> - You are logged in.</p>
                    <button className="btn-red"onClick={()=>{
                        this.setState({auth: 0});
                        localStorage.clear();
                    }}>Logout</button>
                </div>
                } 
                </div>
            )
    }
}

export default withRouter(Home);