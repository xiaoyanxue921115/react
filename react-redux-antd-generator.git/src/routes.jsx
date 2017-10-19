import React from 'react';
import ReactDom from 'react-dom';

import global from './common/global';
import util from './common/util';
import URLS from './constants/URLS';

//main
import Main from './containers/Main';
//home
import Login from './containers/login/Index';
import Project from './containers/project/Index';

//导航1
import Nav1 from './containers/project/nav1/Index';
//一级菜单
import SecondLevel_1 from './containers/project/nav1/firstLevel_1/SecondLevel_1';
import SecondLevel_2 from './containers/project/nav1/firstLevel_1/SecondLevel_2';

//导航2
import Nav2 from './containers/project/nav2/Index';
import SecondLevel_31 from './containers/project/nav2/firstLevel_1/SecondLevel_1';
import SecondLevel_32 from './containers/project/nav2/firstLevel_1/SecondLevel_2';


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
            path: 'project',
            component: Project,
            indexRoute: {onEnter:(nextState, replace)=>{
                            replace('/project/nav1');
                        }},
            childRoutes: [
                {
                    path: 'nav1',
                    component: Nav1,
                    childRoutes: [
                        {
                            path: 'firstLevel_1',
                            indexRoute: {component: SecondLevel_1},
                            childRoutes: [
                                {
                                    path: 'secondLevel_1',
                                    component:  SecondLevel_1
                                },
                                {
                                    path: 'secondLevel_2',
                                    component:  SecondLevel_2
                                }
                          ]
                        }
                    ]
                },
                {
                    path: 'nav2',
                    component: Nav2,
                    childRoutes: [
                        {
                            path: 'firstLevel_1',
                            indexRoute: {component: SecondLevel_31},
                            childRoutes: [
                                {
                                    path: 'secondLevel_1',
                                    component:  SecondLevel_31
                                },
                                {
                                    path: 'secondLevel_2',
                                    component:  SecondLevel_32
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
