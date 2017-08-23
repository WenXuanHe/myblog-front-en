import _ from 'lodash';
import * as React from 'react';
import Submit from '../buttons/submit';
import axios from 'axios';
import boundleFunc from '../../helper/boundle';

//1默认一秒防抖
let boundle = boundleFunc(2000);

interface loginStates{
    userName:string,
    password: string,
    login: true,
    tip:{
        isRepeat: boolean,
        value: string,
        className: string
    }
}

/**
 * 用户名输入组件Props
 */
interface FromControlUserNameProps{
    judgeRepeat: () => void,
    tip:{
        className:string, 
        isRepeat:boolean, 
        value:string},
    userName: string,
    that:any
}

/**
 * 密码输入Props
 */
interface FromControlPasswordProps{
    password: string,
    handleChange: () => void,
    that: any
}

interface FromControlSubmitProps{
    login: boolean,
    loginFunc: () => void,
    registorFunc: () => void,
    that: any
}


/**
 * 用户名输入组件
 * @param  {[object]} props [description]
 * {props.judgeRepeat} 判断重复
 * {props.tip} 是否重复的信息
 * {userName} 用户名
 * @return {[type]}       [description]
 */
const FromControlUserName = (props:FromControlUserNameProps):any => {
    let {judgeRepeat, tip, userName, that} = props;
    return (
        <div className="u-userName form-control">
            <label className="flex">
                <span className="ml2em">用户名: </span>
                <input type='text' name='userName' placeholder='请输入用户名'
                className="w160" value={userName} onChange={_.bind(judgeRepeat, that)} />
                <span className={`col-3 ${tip.className}`}>{tip.isRepeat ? tip.value : ""}</span>
            </label>
        </div>
    )
}

/**
 * 
 * @param props interface FromControlPasswordProps
 */
const FromControlPassword = (props: FromControlPasswordProps): any => {
    let {password, handleChange, that} = props;
    return (
        <div className="u-password form-control">
            <label className="flex">
                <span className="ml2em">密码: </span>
                <input type='password' placeholder='请输入密码'
                    className="w160" value={password} onChange={_.bind(handleChange, that)} />
                <span className="col-3"></span>
            </label>
        </div>
    )
}

/**
 * 
 * @param props interface FromControlSubmitProps
 */
const FromControlSubmit = (props:FromControlSubmitProps): any => {

    let { login, loginFunc, registorFunc, that } = props;

    let submitButton = login ?
        <Submit func={_.bind(loginFunc , that)} value={'登录'}/> :
        <Submit func={_.bind(registorFunc , that)} value={'注册'}/> ;
    return (
        <div className="u-submit form-control">
            {submitButton}
            <a href="javascript:void(0)" className="switch-registor"
            onClick={()=>that.setState({'login': !login})}>{login ? "去注册" : "去登录"}</a>
        </div>
    )
}


class Login extends React.Component<undefined, loginStates>{

    // constructor(){
    //     super();
    //     this.state = {
    //         userName:'',
    //         password:'',
    //         login:true,
    //         tip:{
    //             isRepeat:false,
    //             value:'',
    //             className:''
    //         }
    //     };
    // }

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
                    handleChange={this.handleChangePassword}
                    that={this} />

                <FromControlSubmit
                    login={this.state.login}
                    loginFunc={this.login}
                    registorFunc={this.registor}
                    that={this}/>

            </div>
        )
    }

    judgeRepeatThoughtRedis (userName:string) {
        let _self = this;
        return axios.post('/login/judgeRepeat', {
            userName
        }).then(function(result){
            if(result.data.result.isRepeat){
                 _self.setState({
                    tip:{
                        value:'该账号已经注册',
                        isRepeat:true,
                        className:'notice'
                    }
                 });
            }
        }).catch(function(ex){
             _self.setState({
                tip:{
                    value:'请求失败，请重试',
                    isRepeat:true,
                    className:'error'
                }
             });
            console.log(ex);
        })
    }


    handleChangePassword(e:any){
        this.setState({password: e.target.value});
    }

    /**
     * 判断是否重复
     */
    judgeRepeat (e: any) {
        let userName = e.target.value;
        this.setState({userName});

        if(!userName) return;
        if(this.state.login) return;

        //先用防抖函数来判断是否还会继续输入，如果不输入，才会调方法执行
        boundle((userName)=>{
            _.bind(this.judgeRepeatThoughtRedis, this, userName)();
        }, userName);
    }

    registor (){
        let {userName, password, tip} = this.state;
        if(!userName || !password){
            alert('用户名或密码不能为空');
            return;
        }
        if(tip.isRepeat){
            alert('该用户名已存在');
            return;
        }

        this.registorRequest(userName, password);
    }

    login (){
        let {userName, password} = this.state;
        let _self = this;
        return axios.post('/login/loginRequest', {
            userName,
            password
        }).then(function(result){
            if(!result.data.status){
                alert(result.data.msg);
            }else{
                window.location.href='/writer';
            }
        }).catch(function(ex){
             _self.setState({
                tip:ex
            });
            console.log(ex);
        })
    }

    registorRequest (userName: string, password: string) {
        let _self = this;
        return axios.post('/login/registorRequest', {
            userName,
            password
        }).then(function(result){
            if(!result.data.status){
                alert(result.data.msg);
            }else{
                window.location.href='/writer';
            }
        }).catch(function(ex){
             _self.setState({
                tip:ex
            });
            console.log(ex);
        })
    }
}

export default Login;

