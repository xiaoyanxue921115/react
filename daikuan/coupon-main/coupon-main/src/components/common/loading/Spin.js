import React from 'react';
import {Link} from 'react-router';
import style from './style.less';
import { Spin } from 'antd'

class Submenu_Option extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className={style['spin--bg']}>
                <div className={style['spin--content']} >
                    <Spin size="large"/>
                </div>
            </div>
        )
    }
}

export default Submenu_Option;