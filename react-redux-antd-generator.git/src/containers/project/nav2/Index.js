import React from 'react';
import Menu from '../../../components/common/menu/Index';
import style from '../../../components/common/style/menu.less';
const iconUrl = require('../../../images/commodity.png')
/***
**
******************************************************************************
**
**    注：若使用新天网后台系统UI框架， 本文件只需更改相应的 @menuList 为自己的路由结构即可
**
******************************************************************************
** 注意菜单内的图片的 @iconUrl 请先 require，保证loader能够正常解析路径及文件
**/
const menuList = [
    {
        title: '一级菜单',
        hash: 'project/nav2/firstLevel_1',
        iconUrl: iconUrl,
        submenu: [
            {
                hash: '/SecondLevel_1',
                content: '二级菜单'
            },
            {
                hash: '/SecondLevel_2',
                content: '二级菜单'
            }
        ]
    }
]
class Nav2 extends React.Component {
    render() {
        return (
            <div style={{height: '100%'}} >
                <Menu menuList = {menuList} ></Menu>
                <div style={{width: 'calc(100% - 200px)', height: '100%', float: 'left'}}>
                    {this.props.children}
                </div>
            </div>
        )
  }
}

Nav2.defaultProps = {
};

export default Nav2;


