import axios from 'axios';

let url = "https://login-portal-app.herokuapp.com/"
const client = axios.create({baseURL: url});

export const request = ({...options}) => {
    client.defaults.headers.common["Authorization"] = localStorage.getItem("JWT_PAYLOAD");
    const onSuccess = (response) => response
    const onError = (err) =>{return err;}
    return client(options).then(onSuccess).catch(onError);
}
