import React from 'react';
import style from './style.less';
import t_style from '../../../../styles/less/com_blend.less';

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
                <div className={t_style['navi']} >
                    <span className={t_style['nav--title']} >面包屑导航</span>
                    <button type="button" disabled={true} className={t_style['button-disable']}><span>申请上架</span></button>
                    <button type="button" className={t_style['button-disable']} ><span>预览</span></button>
                    <button type="button" className={t_style['button-pink']} >保存</button>
                </div>
            </div>
        )
    }
}

export default CreateCommodity;