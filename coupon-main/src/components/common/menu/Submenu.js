import React from 'react';
import t_style from '../../../styles/less/com_blend.less';
import c_style from '../../../styles/less/common.less';
import style from '../style/menu.less';
import Submenu_Option from './Submenu_Option';

class Submenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showChildren:true
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({showChildren:!this.state.showChildren})
    }
    render() {
        const {hash, iconUrl, title, children, location} = this.props;
        const options = React.Children.map(children, (child, index) => React.cloneElement(child, {
            parent_hash: hash
        }))
        return (
            <div className={style['submenu']} >
                <div className={style['submenu--title']}>
                    <img className={style['submenu--title-img']} src={iconUrl} />{title}
                    {this.state.showChildren ?
                        <img className={style['submenu--title-toggle']} src="images/pull_up.png" onClick={this.toggle}/>
                    :   <img className={style['submenu--title-toggle']} src="images/pull_down.png" onClick={this.toggle}/>}
                </div>
                {this.state.showChildren ? options : null}
            </div>
        )
    }
}

Submenu.Option = Submenu_Option;
export default Submenu;