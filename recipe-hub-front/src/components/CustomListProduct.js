import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CustomListProduct = ({ product, onClick, icon }) => {
  const IconComponent = icon === 'add' ? AddIcon : RemoveIcon;

  return (
    <ListItem button onClick={onClick} key={product.id} id={product.id}>
      <ListItemIcon>
        <IconComponent sx={{ color: 'bisque' }} />
      </ListItemIcon>
      <ListItemText primary={product.name} sx={{ color: 'bisque' }} primaryTypographyProps={{fontSize: '20px'}}  />
    </ListItem>
  );
};

export default CustomListProduct;