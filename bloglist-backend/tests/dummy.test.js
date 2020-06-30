const listHelper = require('../utils/list_helper')
const {blogList} = require('./blog_for_test')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

