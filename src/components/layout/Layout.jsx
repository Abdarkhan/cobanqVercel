import Container from '@mui/material/Container'
import AppHeader from './AppHeader'
import Box from '@mui/material/Box'
import React from 'react'
import AppFooter from './AppFooter'
import { useLocation } from 'react-router-dom'
import { getLayoutConfig } from '@/utils/getLayoutConfig'

const Layout = ({ children, ...props }) => {
  const { maxWidth } = props || {}

  const { pathname } = useLocation();
  const config = getLayoutConfig(pathname);

  return (
    <React.Fragment>
      <AppHeader />
      <Container maxWidth={maxWidth || ""} sx={{ p: { xs: 0, md: 'auto' } }}>
        <Box sx={{ px: { xs: 0, md: 0 } }}>
          {children}
        </Box>
      </Container>
      {config.footer && <AppFooter bgcolor={config?.footerStyle?.bgcolor ?? null} />}
    </React.Fragment>
  )
}

export default Layout
