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
            <div className={style['commoditylist']}>
                <div className={t_style['navi']} >
                </div>
            </div>
        )
    }
}

export default CommodityList;