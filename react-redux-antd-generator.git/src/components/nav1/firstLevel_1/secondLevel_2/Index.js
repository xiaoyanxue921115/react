import React from 'react';
import Link from 'react-router';
import style from './style.less';
import t_style from '../../../../styles/less/com_blend.less';
import c_style from '../../../../styles/less/common.less';
import { hashHistory } from 'react-router';
import classnames from 'classnames';

class CreateCommodity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
    }

    render() {
        return (
            <div className={style['createcommodity']}>
            </div>
        )
    }
}

export default CreateCommodity;