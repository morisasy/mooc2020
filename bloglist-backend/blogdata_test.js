const {blogList} = require('./tests/blog_for_test')

console.log('blogList: ', blogList[3])
totalLikes = blogList.reduce((sum, blog) => { return sum + blog.likes},0)
// get max likes
const maxLikes = Math.max(...blogList.map(blog => blog.likes))
console.log('Max like', maxLikes)

// Get the object liked most
const favoriteBlog = blogList.find(blog => blog.likes === maxLikes)
console.log('blog most liked', favoriteBlog)
console.log('list of blogs', blogList)

console.log('Total bloglist: ', blogList.length)
console.log('Total likes : ', totalLikes)


const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    let topWriter = blogs.reduce((a, b) => {
      return blogs.filter(blog => blog.author === a.author).length >= blogs.filter(blog => blog.author === b.author).length ? a : b
    }, blogs[0])
    return {
      author: topWriter.author,
      blogs: blogs.filter(blog => blog.author === topWriter.author).length
    }
  }
let newBlogList = blogList.filter(blog => blog.author !== "Robert C. Martin")
  console.log('Most blog : ', mostBlogs(newBlogList))

  const authorList = blogList.map(blog => blog.author)
  console.log('author list : ',  authorList)