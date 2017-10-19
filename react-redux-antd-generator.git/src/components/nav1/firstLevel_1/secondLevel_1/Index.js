import React from 'react';
import style from './style.less';
import t_style from '../../../../styles/less/com_blend.less';

class CommodityList extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render() {
        return (
            <div className={style['createcommodity']}>
                <div className={t_style['navi']} >
                    <span className={t_style['nav--title']} >一级菜单>二级菜单</span>
                    <button type="button" disabled={true} className={t_style['button-disable']}><span>申请上架</span></button>
                    <button type="button" className={t_style['button-disable']} ><span>预览</span></button>
                    <button type="button" className={t_style['button-pink']} >保存</button>
                </div>
                <div className={style['createcommodity__info']} style={{width:'calc(100% - 40px)', maxHeight: 'calc(100% - 80px)'}}>

                </div>
            </div>
        )
    }
}

export default CommodityList;