import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/es/Typography/Typography';
import { useSelector } from 'react-redux';

const _selector = ({ categories, jokes: { byCategory } }) => {
  return {
    categories: categories.map(category => ({
      name: category,
      numberOfJokes: (byCategory[category] || []).length
    }))
  };
};

const CategoriesMenu = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { categories } = useSelector(_selector);
  return (
    <div>
      <Button
        variant="contained"
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        Categories
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {categories.map(({ name, numberOfJokes }) => {
          return (
            <MenuItem key={name} onClick={() => setAnchorEl(null)}>
              <Badge color="primary" badgeContent={numberOfJokes}>
                <Typography>{name}</Typography>
              </Badge>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default CategoriesMenu;
