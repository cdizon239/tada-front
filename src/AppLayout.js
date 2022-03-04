import React from 'react'
import { AppNav } from './components/AppNav'

export const AppLayout = (props) => {
  return (
    <>
        <AppNav/>
        {props.children}
    </>
  )
}
