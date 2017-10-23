import React from 'react';
import style from './style/header.less';
import { Link } from 'react-router';
import Constants from '../../constants/login'

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    logout = () => {
        const {dispatch} = this.props
        dispatch({type: Constants.LOGOUT_REQUESTED})
    }
    render() {
        return (
            <div className={style['header']} >
                <span className={style['header__title']} >贷款名额</span>
                <span className={style['header__logout']} onClick={this.logout} >退出</span>
                <div className={style['header__divider']} ></div>
                <span className={style['header__user']} >{this.props.userInfo.userName}</span>
            </div>
        )
    }
}

export default Header;