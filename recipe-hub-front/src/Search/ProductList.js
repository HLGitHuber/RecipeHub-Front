import React from 'react';
import { List } from '@mui/material';
import CustomListProduct from './CustomListProduct';

const ProductList = ({ items, onItemClick }) => {
  return (
    <List>
      {items.map((item) => (
        <CustomListProduct
          key={item.id}
          product={item}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </List>
  );
};

export default ProductList;
