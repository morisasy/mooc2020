/* eslint-disable no-undef */
const listHelper = require('../utils/list_helper')
const {blogList} = require('./blog_for_test')


describe('Most Favorite blog in the blogList ', () => {
  test('favorite blog ', () => {
    const favoriteBlogToTEst = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual(favoriteBlogToTEst)
     
  })
  
  test('A blog with 7 likes ', () => {
    const newblog = {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    }
    let newBlogList = blogList.filter(blog => blog.author === "Michael Chan")
    const result = listHelper.favoriteBlog(newBlogList)
    expect(result).toEqual(newblog)
  })
  
  test('when blogList is empty ', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })
      
})



