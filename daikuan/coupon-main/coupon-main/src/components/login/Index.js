import React from 'react';
import Link from 'react-router';
import style from './login.less';
import t_style from '../../styles/less/com_blend.less';
import c_style from '../../styles/less/common.less';
import classnames from 'classnames';
import Constants from '../../constants/login'

class Login extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    login = (e) => {
        const {dispatch} = this.props;
        e.preventDefault();
        e.stopPropagation();
        dispatch({type: Constants.LOGIN_REQUESTED, password: this.refs['password'].value, username: this.refs['username'].value});
    }
    render() {
        return (
            <div className={style['login__bg']} >
                <div className={style['login__box']} >
                    <p className={classnames(t_style['text-center'], style['login--welcome'])} ><img src="images/welcome.png"/></p>
                    <p className={classnames(t_style['text-center'], style['login--title'])} >贷款名额管理平台</p>
                    <p className={classnames(t_style['text-center'], c_style['mb0'])} >
                        <img src="images/easy_start.png"/>
                    </p>
                    <div className={style['login__form']} >
                        <form>
                            <input className={classnames(style['login__input'], style['login--usericon'])} placeholder='用户名' type="text" ref="username"/>
                            <input className={classnames(style['login__input'], style['login--password'])} placeholder='密码' type="password" ref="password" />
                            <button type='submit' className={style['login__submit']} onClick={this.login} >登录</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;