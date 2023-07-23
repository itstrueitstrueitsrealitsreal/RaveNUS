import React from 'react'
import LocationPin from './LocationPin'

describe('<LocationPin />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LocationPin />)
  })
})