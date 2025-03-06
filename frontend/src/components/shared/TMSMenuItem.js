import { MenuItem } from '@mui/material'

const TMSMenuItem = ({ children, ...rest }) => {
  return <MenuItem {...rest}>{children}</MenuItem>
}

export default TMSMenuItem
