const listHelper = require('../utils/list_helper')
const {blogList} = require('./blog_for_test')


describe('Most Likes blogger  ', () => {
    test('If blogger has most likes ', () => {
        const blogger = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        const result = listHelper.mostLikes(blogList)
        expect(result).toEqual(blogger)   
    })
  
    test('when blogList is empty ', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(null)
      })
      
  })