Cypress.Commands.add('login', function ({ username, password }) {
    return cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username,
        password,
    }).then(function ({ body }) {
        localStorage.setItem('loggedBloglistappUser', JSON.stringify(body))
        cy.visit('')
    })
})

Cypress.Commands.add('createBlog', function ({ title, author, url }) {
    const token = JSON.parse(localStorage.getItem('loggedBloglistappUser')).token

    return cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(function () {
        cy.visit('')
    })
})

Cypress.Commands.add('addLikes', function (title, numberOfLikes) {
    cy.get('#blogList').find('div').contains(title).as('blogDiv')
    cy.get('@blogDiv').find('#openButton').click()
    for (let i = 0; i < numberOfLikes; i++) {
        cy.get('@blogDiv').invoke('text').then(function (textContent) {
            const likesBeforeClick = Number(textContent.match(/Likes: (\d+)/)[1])

            cy.get('@blogDiv').find('#likeButton').click()

            cy.get('@blogDiv').invoke('text').should(function (newTextContent) {
                const likesAfterClick = Number(newTextContent.match(/Likes: (\d+)/)[1])

                expect(likesAfterClick).to.equal(likesBeforeClick + 1)
            })
        })
    }
})
