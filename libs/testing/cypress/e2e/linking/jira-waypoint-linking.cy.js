/// <reference types="cypress" />

// yarn workspace @waypoint/testing cypress open --env EMAIL=me@patriksafar.cz,PASSWORD='17eeIR4Fr@1$IdALLe1z2b',SITE=https://patriksafar.atlassian.net
// yarn workspace @waypoint/testing cypress open --env EMAIL=patrik@mywaypoint.ai,PASSWORD='&B2B6^*CloREby^IEpIZTw',SITE=https://patrik-safar.atlassian.net

// the next comment line loads the custom commands from the plugin
// so that our editor understands "cy.frameLoaded" and "cy.iframe"
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

const ENV = {
  email: Cypress.env('EMAIL'),
  password: Cypress.env('PASSWORD'),
  site: Cypress.env('SITE'),
}

describe('Jira plugin install', () => {
  // it('should login', () => {
  //   cy.clearLocalStorage()
  //   cy.clearCookies()

  //   cy.visit(`${ENV.site}`)

  //   cy.get('[data-testid="username"]').type(ENV.email)
  //   cy.get('[data-testid="username"]').should('have.value', ENV.email)

  //   cy.get('#login-submit').click()

  //   cy.get('[data-testid="password"]').type(ENV.password)
  //   cy.get('[data-testid="password"]').should('have.value', ENV.password)

  //   cy.get('#login-submit').click()

  //   cy.wait(10000)
  // })

  // const getIframeDocument = () => {
  //   return (
  //     cy
  //       .get('iframe')
  //       // Cypress yields jQuery element, which has the real
  //       // DOM element under property "0".
  //       // From the real DOM iframe element we can get
  //       // the "document" element, it is stored in "contentDocument" property
  //       // Cypress "its" command can access deep properties using dot notation
  //       // https://on.cypress.io/its
  //       .its('0.contentDocument')
  //       .should('exist')
  //   )
  // }

  // const getIframeBody = () => {
  //   // get the document
  //   return (
  //     getIframeDocument()
  //       // automatically retries until body is loaded
  //       .its('body')
  //       .should('not.be.undefined')
  //       // wraps "body" DOM element to allow
  //       // chaining more Cypress commands, like ".find(...)"
  //       .then(cy.wrap)
  //   )
  // }

  // it('should navigate to the post install page', () => {
  //   cy.visit(
  //     `${ENV.site}/plugins/servlet/ac/ps-test-connect/admin-link-post-install`
  //   )

  //   cy.wait(10000)

  //   getIframeBody()
  //     .find('#continue-button')
  //     .then(($link) => {
  //       // Extract the href attribute
  //       const href = $link.attr('href')

  //       // Visit the URL specified by the href attribute
  //       cy.visit(href)
  //     })
  // })

  it('should login customer to Waypoint', () => {
    cy.clearLocalStorage()

    cy.visit(
      'http://localhost:3000/link-account/LLhc6ZQvJddYkEXYJfi9bQzFwPn1nxpE'
    )

    cy.get('#username').type(ENV.email)

    cy.get('#password').type(ENV.password)

    cy.get('button[name="action"]').contains('Continue').click()

    cy.get('button').contains('Accept').click()
  })

  it('should accept terms and conditions', () => {
    cy.get('button').contains('Accept').click()
  })

  it('navigate to waypoint linking page and accept linking with Jira', () => {
    cy.get('button').contains('Finish integration').click()

    cy.wait(10000)
  })

  // it('should logout from Waypoint', () => {
  //   cy.visit('http://localhost:3000/logout')
  // })
})
