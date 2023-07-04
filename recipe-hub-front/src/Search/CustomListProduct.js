import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

const CustomListProduct = ({ product, onClick }) => {
  return (
    <ListItem button onClick={onClick} key={product.id} id={product.id}>
      <ListItemText primary={product.name} />
    </ListItem>
  );
};

export default CustomListProduct;