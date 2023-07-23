import React from 'react'
import Index from './Index'

describe('<Index />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Index />)
  })
})