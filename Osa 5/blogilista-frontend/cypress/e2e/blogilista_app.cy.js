describe('Bloglist app', function () {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
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

            cy.get('#notification')
                .contains('Welcome back Matti Luukkainen')
                .should('have.css', 'color', 'rgb(0, 128, 0)')
        })

        it('Fails with wrong credentials', function () {
            cy.get('#usernameInput').type('wrongUser')
            cy.get('#passwordInput').type('wrongPassword')
            cy.get('#loginButton').click()

            cy.get('#notification')
                .contains('Wrong username or password!')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('A blog can be created', function () {
            cy.get('#togglableCreateNew').get('#openButton').click()
            cy.get('#titleInput').type('testi blogi')
            cy.get('#authorInput').type('testaaja')
            cy.get('#urlInput').type('test url')
            cy.get('#createButton').click()

            cy.get('#blogList').find('div').contains('testi blogi')
        })

        it('Blog can be liked', function () {
            cy.createBlog({ title: 'testi blogi', author: 'testaaja', url: 'test url' })

            cy.get('#blogList').find('div').contains('testi blogi').as('blogDiv')
            cy.get('@blogDiv').find('#openButton').click()
            cy.get('@blogDiv').invoke('text').then(function (textContent) {
                const likesBeforeClick = Number(textContent.match(/Likes: (\d+)/)[1])

                cy.get('@blogDiv').find('#likeButton').click()

                cy.get('@blogDiv').invoke('text').should(function (newTextContent) {
                    const likesAfterClick = Number(newTextContent.match(/Likes: (\d+)/)[1])

                    expect(likesAfterClick).to.equal(likesBeforeClick + 1)
                })
            })
        })

        it('Blog can be deleted by it\'s creator', function () {
            cy.createBlog({ title: 'testi blogi', author: 'testaaja', url: 'test url' })

            cy.get('#blogList')
                .find('div')
                .contains('testi blogi')
                .find('#deleteButton')
                .click()

            cy.get('#blogList').should('not.contain', 'testi blogi')
        })

        it('Blog can\'t be deleted others', function () {
            cy.createBlog({ title: 'testi blogi', author: 'testaaja', url: 'test url' })

            cy.get('#logoutButton').click
            const anotherUser = {
                name: 'Pekka Koski',
                username: 'PeKKo',
                password: 'salainen'
            }
            cy.request('POST', `${Cypress.env('BACKEND')}/users`, anotherUser)
            cy.login({ username: 'PeKKo', password: 'salainen' })

            cy.get('#blogList')
                .find('div')
                .contains('testi blogi')
                .find('#deleteButton')
                .should('not.exist')
        })

        it.only('Blogs are ordered correctly based on likes', function () {
            cy.createBlog({ title: 'testi blogi 1', author: 'testaaja', url: 'test url' })
            cy.createBlog({ title: 'testi blogi 2', author: 'testaaja', url: 'test url' })
            cy.createBlog({ title: 'testi blogi 3', author: 'testaaja', url: 'test url' })
            cy.addLikes('testi blogi 2', 2)
            cy.addLikes('testi blogi 3', 1)

            cy.get('#blogNumber0').contains('testi blogi 2')
            cy.get('#blogNumber1').contains('testi blogi 3')
            cy.get('#blogNumber2').contains('testi blogi 1')
        })
    })

})