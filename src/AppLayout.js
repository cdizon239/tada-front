import React from 'react'
import { AppNav } from './components/AppNav'
import styled from 'styled-components'

const StyledDiv = styled.div`
  padding: 2% ;
`

export const AppLayout = (props) => {
  return (
    <>
        <AppNav/>
        <StyledDiv>
        {props.children}
        </StyledDiv>
    </>
  )
}
