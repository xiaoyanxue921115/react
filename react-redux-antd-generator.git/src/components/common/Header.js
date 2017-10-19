import React from 'react';
import style from './style/header.less';
import { Link } from 'react-router';
import Constants from '../../constants/login'

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    logout = () => {
        const {dispatch} = this.props
        dispatch({type: Constants.LOGOUT_REQUESTED})
    }
    render() {
        return (
            <div className={style['header']} >
                <span className={style['header__title']} >项目名称</span>
                <Link to={{pathname: '/project/nav1'}} className={style['header__nav--item']} activeClassName={style['header__nav--item-active']} >nav1</Link>
                <Link to={{pathname: '/project/nav2'}} className={style['header__nav--item']} activeClassName={style['header__nav--item-active']} >nav2</Link>
                <span className={style['header__logout']} onClick={this.logout} >退出</span>
                <div className={style['header__divider']} ></div>
                <span className={style['header__user']} >Mercury</span>
            </div>
        )
    }
}

export default Header;