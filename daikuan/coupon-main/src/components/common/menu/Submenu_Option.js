import React from 'react';
import {Link} from 'react-router';
import t_style from '../../../styles/less/com_blend.less';
import c_style from '../../../styles/less/common.less';
import style from '../style/menu.less';

class Submenu_Option extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {hash, parent_hash, content} = this.props;
        let the_hash = parent_hash + hash;
        let pathHash = window.location.hash;
        return (
            <div className={c_style['psr']}>
                <Link to={{pathname:the_hash}} className={style['submenu--option']} activeClassName={style['submenu--option-active']} >{content}</Link>
                {(pathHash.indexOf(the_hash)!= -1) ? <div className={style['submenu--option-triangle']}></div> : null}
            </div>
        )
    }
}

export default Submenu_Option;