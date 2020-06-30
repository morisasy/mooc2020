const listHelper = require('../utils/list_helper')
const {blogList} = require('./blog_for_test')


describe('total likes', () => {

  test('Total blogList likes equal to 36', () => {
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(36)
  })

  test('total number of blog in the blogList is six', () => {
    const result = listHelper.blogCount(blogList)
    expect(result).toBe(6)
  })

  test('of empty blogList is zero', () => {
    const result = listHelper.blogCount([])
    expect(result).toBe(0)
  })

    
})









