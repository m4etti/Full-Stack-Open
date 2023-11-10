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
