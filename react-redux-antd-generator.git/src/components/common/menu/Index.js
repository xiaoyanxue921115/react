import React from 'react';
import Submenu from './Submenu';
import style from '../style/menu.less';

class Menu extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const renderSubmenu = submenuList => {
            let submenu = submenuList.map((sub, index) => {
                return ( <Submenu.Option key={index} hash={sub.hash} content={sub.content} /> )
            })
            return submenu
        }
        const Menu = this.props.menuList.map((first, index) => {
            return  (<Submenu key={index} title={first.title} hash={first.hash} iconUrl={first.iconUrl}>
                        {first.submenu && renderSubmenu(first.submenu)}
                    </Submenu>)
        })
        return (
            <div style={{height: '100%', width: 'auto', float: 'left'}} >
                <div className={style['menu']} style={{height: '100%'}}>
                    {Menu}
                </div>
            </div>
        )
  }
}

Menu.defaultProps = {
};

export default Menu;


