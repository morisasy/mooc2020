const listHelper = require('../utils/list_helper')
const {blogList} = require('./blog_for_test')

describe('Most blog  ', () => {
    test('if most blog author has 3 blog post ', () => {
        const topBlogger = {
             author: 'Robert C. Martin',
             blogs: 3
        }
        const result = listHelper.mostBlogs(blogList)
        expect(result).toEqual(topBlogger)   
    })
  
    test('A blogger with 2 blog post ', () => {
        const blogger = {
            author: "Edsger W. Dijkstra",
            blogs: 2
       }
       // get a new blogList exclude most blogger "Robert C.Martin"
       let newBlogList = blogList.filter(blog => blog.author !== "Robert C. Martin")
       const result = listHelper.mostBlogs(newBlogList)
       expect(result).toEqual(blogger)
    })
  
    test('when blogList is empty ', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(null)
      })
      
  })



