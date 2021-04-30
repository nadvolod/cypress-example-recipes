/// <reference types="cypress" />
let authenticatedUser = ''

// Mocha before hook that will execute before the entire spec
before(function fetchUser () {
  // web request to get back an authenticated user and store that information in a variable
  cy.request('POST', 'http://localhost:4000/users/authenticate', {
    username: Cypress.env('username'),
    password: Cypress.env('password'),
  })
  .its('body')
  .then((response) => {
    authenticatedUser = response
  })
})

describe('bypassing UI login', () => {
  // but set the user before visiting the page
// so the app thinks it is already authenticated
  beforeEach(function setUser () {
    cy.visit('/')
    // the page should be opened and the user should be logged in
    // eslint-disable-next-line no-undef
    window.localStorage.setItem('user', JSON.stringify(authenticatedUser))
  })

  it('shows logged in user', () => {
    // use contains() to check for a select with a specific text
    cy.contains('li', 'Test User').should('be.visible')
  })

  it('should log out', () => {
    // use get() to retrieve an element to act on
    cy.get('[href="/login"]').click()
    cy.contains('h2', 'Login').should('be.visible')
  })

  it('makes authenticated request', () => {
    // we can make authenticated request ourselves
    // since we know the token
    cy.request({
      url: 'http://localhost:4000/users',
      auth: {
        bearer: authenticatedUser.token,
      },
    })
    .its('body')
    .should('deep.equal', [
      {
        id: 1,
        username: 'test',
        firstName: 'Test',
        lastName: 'User',
      },
    ])
  })
})
