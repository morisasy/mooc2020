const dummy = (blogs) => {
  return 1
}

// count number of blog in a list
const blogCount = (blogs) => {
  return blogs.length
}
// get  total likes
const sumofLikes = (a, b) =>  a + b.likes


// The filterHelper method helps to filter items in the blogList
// It takes two parameter items which is blogList and an element as el to test 
const filterHelper = (items, el) => items.filter(item => item.author === el.author)



// totalLikes = blogList.reduce((sum, blog) => { return sum + blog.likes},0)
const totalLikes = array => {
  const result=  array.reduce(sumofLikes, 0)
  return result
}

// get most liked blogger helper function
const mostLikedBlogger = items => items.reduce((a, b) => a.likes > b.likes ? a : b )

// Get the favorite blog 
const favoriteBlog = (items) => {
  if (items.length === 0) return null
  const favoriteItem = mostLikedBlogger(items)
  let favoriteBlogPost = {}
  favoriteBlogPost['title'] = favoriteItem.title
  favoriteBlogPost['author'] = favoriteItem.author
  favoriteBlogPost['likes'] = favoriteItem.likes
  return favoriteBlogPost
}

// // Get the most blog

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  let mostBlog = blogs.reduce((a, b) => {
    return  filterHelper(blogs,a).length >= filterHelper(blogs,b).length ? a : b
  }, blogs[0])
  let topBlog = {}
  topBlog['author'] = mostBlog.author
  topBlog['blogs'] = filterHelper(blogs, mostBlog).length
  return topBlog
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  // Get a blog with most likes
  let blogWithMostLikes = blogs.reduce((a, b) => a.likes > b.likes ? a : b )
 

  // Get a blogList of blogger with most likes
  let mostLikesListBlog= filterHelper(blogs, blogWithMostLikes)
  let newBlog = {}
  newBlog ['author'] = blogWithMostLikes.author
  newBlog ['likes'] = totalLikes(mostLikesListBlog)
  return newBlog
}
module.exports = {
  dummy,
  blogCount,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}