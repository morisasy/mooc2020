/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper= require('./test_helper')
//  initialBlogs, nonExistingId, blogsInDb
const User = require('../models/user')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blog post saved', () => {

  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('When blogs are returned with id but  not _id', async () => {
    const response = await api.get('/api/blogs/')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
    console.table(response.body)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')
    //console.table(response.body)
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
/*
  test('the title of the first blog is You never fail until you stop trying ', async () => {
    const response = await api.get('/api/blogs')
    console.log('first blog', response.body[0])
    expect(response.body[0].author).toBe('albert stein')
  })
*/

  test('a specific blog is within the returned blog', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('Sunbath Trend')
  })

})

describe('addition of a new blog post', () => {
  test('creation of  a new blog post', async () => {
    const newPost = {
      title: 'Uskollinen Lukija',
      author: 'Max Seeck',
      url: 'https://www.uskollinenlukija.fi',
      likes: 50
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const getBlogPost = await helper.blogsInDb()
    expect(getBlogPost.length).toBe(helper.initialBlogs.length + 1)

    const contents = getBlogPost.map(blog => blog.title)
    expect(contents).toContain('Uskollinen Lukija')
  })
  test('When a blog withought a like default value is 0', async () => {
    const newBlog = {
      title: 'Please like my post',
      author: 'Withought Likes',
      url: 'https://ww.zerolikes.fi'
    }

    await api
      .post('/api/blogs')
      .send({
        ...newBlog,
        likes: undefined
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const getBlogPost = await helper.blogsInDb()
    const contents  = getBlogPost.map(blog => blog.likes)
    // expect(contents).toBe(0)
    expect(contents).toContain()
  })

  test('when adding a blogpost without url or title  should returns 400', async () => {
    const newPost = {
      author: 'Paivi',
      likes: 10
    }
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})


describe('Blogpost deletion', () => {
  test('succeeds with 204 if it exists', async () => {
    const blogAtStart = await helper.blogsInDb()
    console.table(blogAtStart)
    const postToDelete = blogAtStart[0]
    console.table(postToDelete.id)
    console.log('post to Delete:', postToDelete)

    await api
      .delete(`/api/blogs/${postToDelete.id}`)
      .expect(204)

    const blogAtEnd = await helper.blogsInDb()

    expect(blogAtEnd.length).toBe(blogAtStart.length - 1)
    const contents = blogAtEnd.map(post => post.title)
    expect(contents).not.toContain(postToDelete.title)
  })
})


describe('Updating a Blogpost', () => {
  test('A blog can be updated', async () => {
    const beforeBlogsUpdated = await helper.blogsInDb()
    const newBlog = {
      id: '5e0a6b50d695a243ffca846d',
      title:'Suana Winter Trend',
      author:'Jim Kim',
      url:'www.thesun.com',
      likes:60,
    }

    await api
      .put(`/api/blogs/${newBlog.id}`)
      .send(newBlog)
      .expect(200)
    const updatedBlogs = await helper.blogsInDb()
    const titles = updatedBlogs.map(t => t.title)
    const likes = updatedBlogs.map(l => l.likes)

    console.table(beforeBlogsUpdated)
    expect(titles).not.toContain(beforeBlogsUpdated.title)
    expect(likes).not.toContain(beforeBlogsUpdated.likes)
    expect(updatedBlogs.length).toBe(beforeBlogsUpdated.length)
  })
})


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
