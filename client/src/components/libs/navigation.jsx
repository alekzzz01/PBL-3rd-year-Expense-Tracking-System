
import {SquareMenu,  BadgeCent, ReceiptText } from "lucide-react";

export const Sidebar_Links = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <SquareMenu />
  },
  {
    key: 'transactions',
    label: 'Transactions',
    path: '/transactions',
    icon: <BadgeCent />
  },
  {
    key: 'budgeting',
    label: 'Budgeting',
    icon: <ReceiptText />,
    submenu: [
      {
        key: 'categories',
        label: 'Categories',
        path: '/budgeting/categories'
      },
      {
        key: 'reports',
        label: 'Reports',
        path: '/budgeting/reports'
      }
      // Add more submenu items as needed
    ]
  }
];
