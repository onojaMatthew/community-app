import { isAuthenticated } from "./helper/authenticate";

const role = isAuthenticated().user && isAuthenticated().user.role;

const superAdminBoard = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Business',
    url: '/dashboard/business',
    icon: 'icon-briefcase',
    
  },
  {
    name: 'Chat Management',
    url: '/dashboard/chat_management',
    icon: 'icon-speech',
  },
  {
    name: "Chat Category",
    url: "/dashboard/chat_category",
    icon: "icon-speech"
  },
  {
    name: 'User Management',
    url: '/dashboard/users',
    icon: 'icon-user',
    
  },
  {
    divider: true,
  }, 
  {
    name: 'Task Management',
    icon: 'icon-settings',
    children: [
      {
        name: "Assign Task",
        url: "/dashboard/tasks",
        icon: "icon-settings"
      },
      {
        name: "View Tasks",
        url: "/dashboard/task_list",
        icon: "icon-settings"
      }
    ]
  },
  {
    name: 'Partners',
    url: '/partners',
    icon: 'icon-people',
  },
  {
    name: 'Category',
    url: '/dashboard/category',
    icon: 'icon-cursor',
  },
  {
    name: 'Salary Management',
    url: '/dashboard/salary',
    icon:  "icon-speech",
  },
  {
    name: 'Portfolio',
    url: '/dashboard/portfolio',
    icon: 'icon-briefcase',
  },
];

const supportDashboard = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs',
        icon: 'icon-puzzle',
      },
      
    ],
  },
  {
    divider: true,
  }, 
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    attributes: { disabled: true },
  },
  
];

const adminBoard = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs',
        icon: 'icon-puzzle',
      },
      
    ],
  },
  {
    divider: true,
  }, 
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    attributes: { disabled: true },
  },
  
];

const sales = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs',
        icon: 'icon-puzzle',
      },
      
    ],
  },
  {
    divider: true,
  }, 
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    attributes: { disabled: true },
  },
  
];

const supportAssociate = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Mail',
    url: '/dashboard/mail',
    icon: 'icon-envelope',
    
  },
  {
    name: 'Sms',
    url: '/dashboard/message',
    icon: 'icon-envelope',
  },
  {
    name: 'Make Call',
    url: '/dashboard/call',
    icon: 'icon-phone',
  },
  {
    name: 'Card',
    // url: '/base',
    icon: 'icon-credit-card',
    children: [
      {
        name: 'Card Request',
        url: '/dashboard/card_request',
        icon: 'icon-credit-card',
      },
      {
        name: 'Card Update',
        url: '/dashboard/card_update',
        icon: 'icon-credit-card',
      },
      {
        name: 'Card Replacement',
        url: '/dashboard/card_replacement',
        icon: 'icon-credit-card',
      },
    ],
  },
  {
    name: 'Report Fraud',
    url: '/dashboard/fraud',
    icon: 'icon-comment',
  },
  {
    name: 'Reset Pin',
    url: '/dashboard/reset',
    icon: 'icon-settings',
  },
  {
    name: 'Chat',
    url: '/dashboard/chat',
    icon: 'icon-chat',
  },
  {
    divider: true,
  }
];

export default {
  items: role === "admin" ? adminBoard : role === "support" ? supportDashboard : role === "support_associate" ? supportAssociate: role === "super_admin" ? superAdminBoard : sales
};
