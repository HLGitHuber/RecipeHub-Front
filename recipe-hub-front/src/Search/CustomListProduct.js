import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

const CustomListProduct = ({ item, onClick }) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

export default CustomListProduct;