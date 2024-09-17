/// <reference types="cypress" />

// yarn workspace @waypoint/testing cypress open --env EMAIL=me@patriksafar.cz,PASSWORD='17eeIR4Fr@1$IdALLe1z2b',SITE=https://patriksafar.atlassian.net
// yarn workspace @waypoint/testing cypress run --env EMAIL=me@patriksafar.cz,PASSWORD='17eeIR4Fr@1$IdALLe1z2b',SITE=https://patriksafar.atlassian.net

const ENV = {
  email: Cypress.env('EMAIL'),
  password: Cypress.env('PASSWORD'),
  site: Cypress.env('SITE'),
}

describe('Jira plugin install', () => {
  it('should login', () => {
    cy.clearLocalStorage()
    cy.clearCookies()

    cy.visit(`${ENV.site}`)

    cy.get('[data-testid="username"]').type(ENV.email)
    cy.get('[data-testid="username"]').should('have.value', ENV.email)

    cy.get('#login-submit').click()

    cy.get('[data-testid="password"]').type(ENV.password)
    cy.get('[data-testid="password"]').should('have.value', ENV.password)

    cy.get('#login-submit').click()

    cy.wait(10000)
  })

  it('should navigate to the marketplace', () => {
    cy.visit(
      `${ENV.site}/jira/marketplace/discover/app/waypoint-for-jira?installDialogOpen=true&source=mpac`
    )
  })

  it('should install app', () => {
    cy.get('#install-app-dialog__install-confirm-btn')
      .as('installButton')
      .should('exist')

    cy.get('@installButton').click()

    cy.wait(5000)
  })

  it('should uninstall app from environment', () => {
    cy.visit(`${ENV.site}/plugins/servlet/upm`)

    cy.get('[data-key="waypoint-for-jira"]').should('exist')
  })
})

describe('Jira uninstall', () => {
  it('should uninstall app from environment', () => {
    cy.visit(`${ENV.site}/plugins/servlet/upm`)

    cy.get('[data-key="waypoint-for-jira"]').click()

    cy.get('[data-action="UNINSTALL"]').click()

    cy.get('[data-testid="uninstall-app-confirm"]').click()
  })
})
