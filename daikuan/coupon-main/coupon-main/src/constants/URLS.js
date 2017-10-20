const URLS =  {
    //首页获得列表的url
    LOGIN: '/api/user/login',
    LOGOUT: '/api/user/logout',
    GET_CURRENT_USER: '/api/user/getCurrentUser',
    GET_DEPARTMENT_LIST: '/api/coupon/getDepartmentList',
    GET_LEGION_LIST: '/api/coupon/getLegionList',
    GET_LOANCHANNEL_LIST: '/api/coupon/getLoanChannelList',
    GET_LOAN_LIST: '/api/coupon/getLoanList',
    GET_COUPON_LIST: '/api/coupon/queryCoupons',
    CREATE_LOAN: '/api/coupon/addLoan',
    DOWNLOAD_LOAN: '/api/coupon/exportLoanCoupons',
    DOWNLOAD_LOAN_BY_SEARCH: '/api/coupon/exportLoanCouponsBySearch',
    DOWNLOAD_LOAN_BY_SEARCH_VALID: '/api/coupon/validate',
}

for( let key in URLS){
    // URLS[key] = URLS[key].replace(/\/api/, '/coupon-war')
}

export default URLS;
