import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Submenu from '../../../components/common/menu/Submenu';
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
// let menuList = [
//     {
//         title: '贷款名额管理',
//         hash: 'loanQuota/nav/loanManagement',  // 一级菜单完整的hash值
//         iconUrl: iconUrl,
//         submenu: [
//             {
//                 hash: '/createLoan',   // 二级菜单对应的path即可
//                 content: '新建贷款名额',
//                 hasAuth: false,
//             },
//             {
//                 hash: '/inquireLoanBatch',
//                 content: '贷款名额批次'
//                 hasAuth: false,
//             },
//             {
//                 hash: '/inquireLoanDetail',
//                 content: '贷款名额明细'
//                 hasAuth: false,
//             }
//         ]
//     }
// ]

class Nav extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const { role } = this.props
        let menuList = [
            {
                title: '贷款名额管理',
                hash: 'loanQuota/nav/loanManagement',  // 一级菜单完整的hash值
                iconUrl: iconUrl,
                submenu: [
                    {
                        hash: '/createLoan',   // 二级菜单对应的path即可
                        content: '新建贷款名额',
                        hasAuth: role == 'SOP',
                    },
                    {
                        hash: '/inquireLoanBatch',
                        content: '贷款名额批次',
                        hasAuth: role == 'CONSULTANT' || role == 'SOP',
                    },
                    {
                        hash: '/inquireLoanDetail',
                        content: '贷款名额明细',
                        hasAuth: role == 'CONSULTANT' || role == 'SOP',
                    }
                ]
            }
        ]
        let children = React.Children.map(this.props.children, (child, index) => React.cloneElement(child, {
            role: role
        }))
        return (
            <div style={{height: '100%'}} >
                <Menu menuList = {menuList} ></Menu>
                <div style={{width: 'calc(100% - 200px)', height: '100%', float: 'left'}}>
                    { children }
                </div>
            </div>
        )
  }
}


const getUserInfo = (state) => {
  return state.login ;
};

const selectors = createSelector(
  [getUserInfo],
  (login) => {
    const { role } = login;
    return  { role } ;
  }
)

export default connect(selectors)(Nav);
