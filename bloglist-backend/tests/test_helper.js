
const Blog = require('../models/blog')
const User = require('../models/user')
//  _id:Objectid("5e0540128ee3d04b09f9cb31"),


const initialBlogs = [
  {
    _id: '5e0a6b50d695a243ffca846c',
    title:'You never fail until you stop trying',
    author:'albert stein',
    url:'htps://www.thebusiness.com/quoteoftheday',
    likes:1000,
  },
  {
    _id: '5e0a6b50d695a243ffca846d',
    title:'Sunbath Trend',
    author:'Jim Kim',
    url:'www.thesun.com',
    likes:50,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author:'Removed',
    url:'htps://www.removed.com/info',
    likes:10
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}