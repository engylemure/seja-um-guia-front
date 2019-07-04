import React from 'react'
import MaterialButton from '@material-ui/core/Button';

const Button = (props) => {
  const { disabled, onClick, children } = props
  return (
    <MaterialButton
          size="small"
          color="primary"
          variant="outlined"
          disabled={disabled}
          onClick={onClick}
        >
          { children }
        </MaterialButton>
  )
}

export default Button