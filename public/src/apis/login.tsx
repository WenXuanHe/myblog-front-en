import axios from 'axios';

export const judgeRepeat = (userName:string) => {
    return axios.post('/login/judgeRepeat', {
        userName
    }).then(function(res){
        return res.data.result;
        
    }).catch(function(ex){
        throw new Error(ex);
    })
}


export const loginService = (userName: string, password: string|number) =>{
    return  axios.post('/login/loginRequest', {
        userName,
        password
    }).then(function(res){
        return res.data;
       
    }).catch(function(ex){
        throw new Error(ex);
    })
}

export const registorService = (userName: string, password: string|number) =>{
    return axios.post('/login/registorRequest', {
        userName,
        password
    }).then(function(result){
        return result.data;
    }).catch(function(ex){
        throw new Error(ex);
    })
}