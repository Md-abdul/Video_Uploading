import React from 'react';
import { Link } from 'react-router-dom';

const navdata = () => {
  const menuItems = [
    {
      subItems: [
        {
          id: "All Videos",
          label: "All Videos",
          link: "/videos",
          icon: "fa fa-mens"
        },
        {
          id: "Upload Videos",
          label: "Upload Videos",
          link: "/videos/upload",
          icon: "fa fa-womens"
        }
      ]
    }
  ];
  
  return menuItems;
};

export default navdata;