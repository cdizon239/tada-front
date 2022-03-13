import React from 'react'
import { AppNav } from './components/AppNav'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const StyledDiv = styled.div`
  padding: 2% ;
`

export const AppLayout = (props) => {
  const location = useLocation()
  return (
    <>
        {location.pathname !== '/' && <AppNav/>}
        <StyledDiv>
        {props.children}
        </StyledDiv>
    </>
  )
}
