import React from 'react';
import { List } from '@mui/material';
import CustomListProduct from './CustomListProduct';

const ProductList = ({ items, onItemClick, icon }) => {
  return (
    <List>
      {items.map((item) => (
        <CustomListProduct
          key={item.id}
          product={item}
          icon={icon}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </List>
  );
};

export default ProductList;
