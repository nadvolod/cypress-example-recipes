/// <reference types="cypress" />

describe('Logging In - HTML Web Form', function () {
  // we can use these values to log in
  const username = 'jane.lane'
  const password = 'password123'

  context('HTML form submission through UI', function () {
    beforeEach(() => {
      cy.clearCookies()
    })

    // an e2e test validating the correct app behavior
    it('logs in through the UI', function () {
      cy.visit('/login')
      cy.get('input[name=username]').type(username)
      cy.get('input[name=password]').type(`${password}{enter}`)

      cy.url().should('include', '/dashboard')
      cy.get('h1').should('contain', 'jane.lane')
      // and our cookie should be set to 'cypress-session-cookie'
      cy.getCookie('cypress-session-cookie').should('exist')
    })

    it('needs login to access /dashboard', function () {
      cy.visit('/dashboard')
      cy.get('h3').should('contain.text', 'You are not logged in and cannot access this page')
    })

    it('can bypass the UI and yet still test log in', function () {
      // oftentimes once we have a proper e2e test around logging in
      // there is NO more reason to actually use our UI to log in
      // - is slow because our entire page has to load with the resources
      // - we have to fill in the form, wait for the form submission and redirection process
      // - it is more prone to error as there are multiple areas of potential failure

      // with cy.request we can bypass this because it automatically gets
      // and sets cookies under the hood. This acts exactly as if the requests
      // came from the browser
      cy.request({
        method: 'POST',
        url: '/login', // baseUrl in cypress.json will be prepended to this url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        body: {
          username,
          password,
        },
      })
    })
  })

  context('Exercises: login without UI', () => {
    beforeEach(() => {
      cy.clearCookies()
      // arrange
      cy.request({
        method: 'POST',
        url: '/login', // baseUrl in cypress.json will be prepended to this url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        body: {
          username,
          password,
        },
      })
    })

    it('can visit /dashboard', () => {
      /**
       * Your code below here
       */
      //1. use cy to visit('/dashboard')
      cy.visit('/dashboard')
      //2. use cy.get() to find an element that should('contain.text', 'Welcome to the Dashboard, jane.lane!')
      cy.get('h1').should('contain.text', 'Welcome to the Dashboard, jane.lane!')
      /**
       * Your code above here
       */
    })

    it('can visit /users', () => {
      /**
       * Your code below here
       */
      //1. use cy to visit the correct url
      cy.visit('/users')
      //2. use cy.get() to find an element that should('contain.text', 'Users')
      cy.get('h1').should('contain.text', 'Users')
      /**
       * Your code above here
       */
    })

    it('can visit /admin', () => {
      /**
       * Your code below here
       */

      //do the same thing, just with a different url and text
      cy.visit('/admin')
      cy.get('h1').should('contain.text', 'Admin')

      /**
       * Your code above here
       */
    })
  })
})
