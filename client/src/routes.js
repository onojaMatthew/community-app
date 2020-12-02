import React from 'react';
import CategoryFile from './containers/components/Category/PartnerCategory';
import BusinessDev from './containers/components/Business/BusinessDevelopment';
import ChatContainer from './containers/components/Chat/Chat';
import Chat from './views/Chat/Chat';
import CategoryData from './views/Community/CategoryData';

const CallContainer = React.lazy(() => import('./containers/components/support/Call'))
const CardUpdate = React.lazy(() => import('./containers/components/support/CardUpdate'))
const UserFile = React.lazy(() => import('./containers/components/Users/UserContainer'))
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const UserviewFile = React.lazy(() => import('./containers/components/Users/UserView'))
const MailContainer = React.lazy(() => import("./containers/components/support/MailContainer"));
const CardFile = React.lazy(() => import('./containers/components/support/CardReplacement'));
const CardContainer = React.lazy(() => import('./containers/components/support/CardContainer'));
const CardRequestFile = React.lazy(() => import('./containers/components/support/CardRequest'));
const SmsFile = React.lazy(() => import('./containers/components/support/SmsContainer'));
const PortfolioFile = React.lazy(() => import("./containers/components/Portfolio/Portfolio"));
const TaskContainer = React.lazy(() => import("./containers/components/Tasks/TaskContainer"));
const SalaryFile = React.lazy(() => import("./containers/components/salary/Salary"));
const TaskListContainer = React.lazy(() => import('./containers/components/Tasks/TaskList'));
// const BusinessDev = React.lazy(() => import('./containers/components/Business/BusinessDev'))
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: "/dashboard/mail", name: "Mail", component: MailContainer },
  { path: "/dashboard/message", name: "Sms", component: SmsFile },
  { path: "/dashboard/portfolio", name: "Portfolio", component: PortfolioFile },
  { path: "/dashboard/card_request", name: "Card Request", component: CardRequestFile },
  { path: "/dashboard/card", name: "Card", component: CardContainer },
  { path: "/dashboard/card_replacement", name: "Card Replacement", component: CardFile },
  { path: "/dashboard/call", name: "Card Replacement", component: CallContainer },
  { path: "/dashboard/card_update", name: "Card Update", component: CardUpdate },
  { path: '/dashboard/users', exact: true,  name: 'Users', component: UserFile },
  { path: '/dashboard/category', exact: true,  name: 'Category', component: CategoryFile },
  { path: "/dashboard/chat_category", exact: true, name: "Category Data", component: CategoryData},
  { path: '/dashboard/tasks', exact: true,  name: 'Task Management', component: TaskContainer },
  { path: '/dashboard/business', exact: true,  name: 'Business Development', component: BusinessDev },
  { path: '/dashboard/task_list', exact: true,  name: 'Task List', component: TaskListContainer },
  { path: '/dashboard/chat_management', exact: true,  name: 'Chat Management', component: ChatContainer },
  { path: '/dashboard/chat', name: 'Chat', component: Chat },

  { path: '/dashboard/salary', exact: true,  name: 'Category', component: SalaryFile },
  { path: '/dashboard/users/:id', exact: true, name: 'User Details', component: UserviewFile },
];

export default routes;