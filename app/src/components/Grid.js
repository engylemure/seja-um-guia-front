import React from 'react';
import GridComponent from '@material-ui/core/Grid';
import './../style/Grid.css';

const Grid = props => {
  const { data, renderItem, getItemKey, sharedProps } = props;
  return (
    <GridComponent container spacing={8} className={'Grid-container'}>
      {(data || []).map(item => (
        <GridComponent
          item
          xs={12}
          sm={6}
          lg={3}
          xl={3}
          md={3}
          key={getItemKey(item)}
        >
          {renderItem({ item, ...sharedProps })}
        </GridComponent>
      ))}
    </GridComponent>
  );
};

export default Grid;
