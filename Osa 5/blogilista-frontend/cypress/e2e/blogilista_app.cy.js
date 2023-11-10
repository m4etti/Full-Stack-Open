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

    describe('Login', function () {
        it('Succeeds with correct credentials', function () {
            cy.get('#usernameInput').type('mluukkai')
            cy.get('#passwordInput').type('salainen')
            cy.get('#loginButton').click()

            cy.contains('Welcome back Matti Luukkainen')
        })

        it('Fails with wrong credentials', function () {
            cy.get('#usernameInput').type('wrongUser')
            cy.get('#passwordInput').type('wrongPassword')
            cy.get('#loginButton').click()

            cy.contains('Wrong username or password!')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#usernameInput').type('mluukkai')
            cy.get('#passwordInput').type('salainen')
            cy.get('#loginButton').click()

            cy.contains('Welcome back Matti Luukkainen')
            cy.contains('Blogs')
        })

        it('A blog can be created', function () {
            cy.get('#togglableCreateNewNewButton').click()
            cy.get('#titleInput').type('testi blogi')
            cy.get('#authorInput').type('testaaja')
            cy.get('#urlInput').type('test url')
            cy.get('#createButton').click()

            cy.contains('testi blogi')
        })
    })

})

