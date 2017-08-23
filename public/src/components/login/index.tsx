
import * as React from 'react';
import axios from 'axios';
import boundleFunc from '$helper/boundle';
import { FromControlUserName } from './FromControlUserName';
import { FromControlPassword } from './FromControlPassword';
import { FromControlSubmit } from './FromControlSubmit';
import { judgeRepeat, loginService, registorService} from '$apis/login';

//1默认一秒防抖 
let boundle = boundleFunc(2000);

interface LoginStates{
    userName:string,
    password: string,
    login: boolean,
    tip:{
        isRepeat: boolean,
        value: string,
        className: string
    }
}


class Login extends React.Component<undefined, LoginStates>{

    constructor(){
        super();
        this.state = {
            userName:'',
            password:'',
            login:true,
            tip:{
                isRepeat:false,
                value:'',
                className:''
            }
        };
    }

    render(){

        return (
            <div className="m-login m-login-bc">

                <FromControlUserName
                    judgeRepeat={this.judgeRepeat}
                    tip={this.state.tip}
                    userName={this.state.userName}
                    that={this}/>
                <FromControlPassword
                    password={this.state.password}
                    handleChange={(e: any)=>{ this.setState({password: e.target.value}) }} />
                <FromControlSubmit
                    login={this.state.login}
                    loginFunc={this.login}
                    switchLoginFunc={this.switch}
                    registorFunc={this.registor}/>
            </div>
        )
    }

    judgeRepeatThoughtRedis = (userName:string) => {

        judgeRepeat(userName).then(({isRepeat})=>{
            this.setState({
                tip:{
                    value:'该账号已经注册',
                    isRepeat:true,
                    className:'notice'
                }
             });
        });
    }

    switch = () =>{
        this.setState({login: !this.state.login});
    }
    /**
     * 判断是否重复
     */
    judgeRepeat = (e: any) => {
        let userName = e.target.value;
        this.setState({userName});

        if(!userName) return;
        if(this.state.login) return;

        //先用防抖函数来判断是否还会继续输入，如果不输入，才会调方法执行
        boundle((userName)=>{
            this.judgeRepeatThoughtRedis.call(this, userName);
        }, userName);
    }

    registor = () => {
        let {userName, password, tip} = this.state;
        if(!userName || !password){
            alert('用户名或密码不能为空');
            return;
        }
        if(tip.isRepeat){
            alert('该用户名已存在');
            return;
        }

        registorService(userName, password).then(this.cb);
    }

    /**
     * 登录或注册成功跳转
     */
    cb = ({status, msg}) => {
        if(!status){
            alert(msg);
        }else{
            window.location.href='/writer';
        }
    }

    login = () => {
        let {userName, password} = this.state;
        loginService(userName, password).then(this.cb);
    }
}

export default Login;

