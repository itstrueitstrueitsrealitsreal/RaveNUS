import React from 'react'
import Sync from './Sync'

describe('<Sync />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Sync />)
  })
})