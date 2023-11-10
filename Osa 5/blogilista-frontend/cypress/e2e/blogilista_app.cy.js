describe('Bloglist app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:5173')
    })
    it('Login form is shown', function () {
        cy.contains('Bloglist')
        cy.contains('Username')
        cy.contains('Password')
        cy.get('body').should('not.contain', 'Blogs')
    })

    it('user can login', function () {
        cy.get('#usernameInput').type('mluukkai')
        cy.get('#passwordInput').type('salainen')
        cy.get('#loginButton').click()

        cy.contains('Welcome back Matti Luukkainen')
    })
})

