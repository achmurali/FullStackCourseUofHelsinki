describe('Blogs app',function() {
    beforeEach(function() {
        cy.request('POST','http://localhost:3003/api/testing/reset')
        const user = {
            name: 'arsenal',
            username: 'arsenal',
            password: 'arsenal'
          }
        cy.request('POST', 'http://localhost:3003/api/users/', user).then(response => {
            
        })
        
    })

    it('login form is shown',function(){
        cy.visit('http://localhost:3000')
        cy.contains('Sign In')
    })

    describe('login',function(){
        it('Succesful Login',function(){
            cy.visit('http://localhost:3000')
            cy.get('input:first').type('arsenal')
            cy.get('input:last').type('arsenal')
            cy.get('button').click()

            cy.contains('arsenal is logged in')
        })
        it('Failed Login',function(){
            cy.visit('http://localhost:3000')
            cy.get('input:first').type('arsenal')
            cy.get('input:last').type('arsenal1')
            cy.get('button').click()

            cy.contains('Wrong Credentials')
        })
    })

    describe('when logged in',function(){
        beforeEach(function(){
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'arsenal', password: 'arsenal'
              }).then(response => {
                localStorage.setItem('blogListUser',JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        it('a new blog can be created',function(){

            cy.contains('create new').click()
            cy.get('.title').type('arsenal')
            cy.get('.submit').click()
        })

        describe('a blog exists',function(){
            beforeEach(function(){
                cy.request({
                    method:'POST',
                    url:'http://localhost:3003/api/blog',
                    body:   { "title":"Arsenal is the best",
                    "author":"Arsene Wenger 1",
                    "url":"the wenger ball 1",
                    "likes":1012},
                    headers:{
                        'Authorization':`bearer ${JSON.parse(localStorage.getItem('blogListUser')).token}`
                    }
                })
                cy.visit('http://localhost:3000')
            })
    
            it('like a blog',function(){
                cy.contains('show').click()
                cy.contains('Like').click()

                cy.visit('http://localhost:3000')
                cy.contains('show').click()
                cy.contains('1013')
            })

            it('delete a blog',function(){
                cy.contains('show').click()
                cy.contains('Delete').click()

                cy.visit('http://localhost:3000')
                cy.get('html').should('not.contain','show')
            })
        })
    })


})