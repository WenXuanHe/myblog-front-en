import _ from 'lodash';
import React from 'react';
import Submit from '../buttons/submit';
import axios from 'axios';

class Login extends React.Component{

    constructor(){
        super(...arguments);
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
        this.cache = {};
    }

    render(){

        return (
            <div className="m-login m-login-bc">
                <div className="u-userName form-control">
                    <label className="flex">
                        <span className="ml2em">用户名: </span>
                        <input type='text' name='userName' placeholder='请输入用户名'
                        className="w160" value={this.state.userName} onChange={_.bind(this.judgeRepeat, this)} />
                        <span className={`col-3 ${this.state.tip.className}`}>{this.state.tip.isRepeat ? this.state.tip.value : ""}</span>
                    </label>
                </div>
                <div className="u-password form-control">
                    <label className="flex">
                        <span className="ml2em">密码: </span>
                        <input type='password' placeholder='请输入密码'
                            className="w160" value={this.state.password} onChange={_.bind(this.asynPassword, this)} />
                        <span className="col-3"></span>
                    </label>
                </div>
                <div className="u-submit form-control">
                    {
                        this.state.login && <Submit func={_.bind(this.login , this)} value={'登录'}/>
                    }
                    {
                        !this.state.login && <Submit func={_.bind(this.registor , this)} value={'注册'}/>
                    }
                    <a href="javascript:void(0)" className="switch-registor"
                    onClick={()=>this.setState({'login': !this.state.login})}>{this.state.login ? "去注册" : "去登录"}</a>
                </div>
            </div>
        )
    }

    judgeRepeatThoughtRedis (userName) {
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

    /**
     * 防抖
     */
    boundle (wait){

        let timer = null;

        return function(callBack){
            let args = [].slice.call(arguments, 1);
            clearTimeout(timer);

            timer = setTimeout(() => {
                callBack(...args);
            }, wait);
        }

    }

    asynPassword(e){
        let password = e.target.value;
        this.setState({password});
    }
    /**
     * 判断是否重复
     */
    judgeRepeat (e) {
        //先用防抖函数来判断是否还会继续输入，如果不输入，才会调方法执行
        let userName = e.target.value;
        let boundle = null;
        this.setState({userName});
        if(!userName) return;

        if(this.cache.boundle){
            boundle = this.cache.boundle
        }else{
            this.cache.boundle = this.boundle(1000);
            boundle = this.cache.boundle;
        }

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
            }
        }).catch(function(ex){
             _self.setState({
                tip:ex,
                display:true,
                className:'error'
            });
            console.log(ex);
        })
    }

    registorRequest (userName, password) {
        let _self = this;
        return axios.post('/login/registorRequest', {
            userName,
            password
        }).then(function(result){
            if(!result.data.status){
                alert(result.data.msg);
            }
        }).catch(function(ex){
             _self.setState({
                tip:ex,
                display:true,
                className:'error'
            });
            console.log(ex);
        })
    }
}

module.exports = Login;

