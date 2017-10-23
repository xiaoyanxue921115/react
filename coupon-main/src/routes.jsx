//main
import Main from './containers/Main';
//home
import Login from './containers/login/Index';
import LoanQuota from './containers/loanQuota/Index';

//导航1
import Nav from './containers/loanQuota/nav/Index';
//一级菜单
import CreateLoan from './containers/loanQuota/nav/loanManagement/CreateLoan';
import InquireLoanBatch from './containers/loanQuota/nav/loanManagement/InquireLoanBatch';
import InquireLoanDetail from './containers/loanQuota/nav/loanManagement/InquireLoanDetail';

const routes = {
    path: '/',
    component: Main,
    indexRoute: {component: Login},
    childRoutes: [
        {
            path: 'login',
            component: Login
        },
        {
            path: 'loanQuota',
            component: LoanQuota,
            indexRoute: {onEnter:(nextState, replace)=>{
                            replace('/loanQuota/nav');
                        }},
            childRoutes: [
                {
                    path: 'nav',
                    component: Nav,
                    indexRoute: {onEnter:(nextState, replace)=>{
                                    replace('/loanQuota/nav/loanManagement/inquireLoanBatch');
                                }},
                    childRoutes: [
                        {
                            path: 'loanManagement',
                            indexRoute: {component: CreateLoan},
                            childRoutes: [
                                {
                                    path: 'createLoan',
                                    component:  CreateLoan
                                },
                                {
                                    path: 'inquireLoanBatch',
                                    component:  InquireLoanBatch
                                },
                                {
                                    path: 'inquireLoanDetail',
                                    component:  InquireLoanDetail
                                }
                          ]
                        }
                    ]
                }
            ]
        }
    ]
};

export default routes;
