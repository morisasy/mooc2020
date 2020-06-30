import React, { useState, useEffect } from "react"
import './App.css'
import Button from './components/Button'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import BlogList from "./components/BlogList"

import blogService from './services/blogs'
import loginService from './services/login'

import { useField } from "./hooks"


function App() {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] =  useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const username = useField("username")
  const password = useField("password")
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")
  // create AddblogForm reference
  const addBlogFormRef = React.createRef()



  useEffect(() => {
    blogService
      .getAll().then(initialBlog => {
       // let sortedBlog = sortByLikes(initialBlog)
       console.log( " initialBlog :", initialBlog)
        setBlogs(initialBlog)
       // setBlogs(sortedBlog)
      })
  }, [])
  
  console.log("initial blogs", blogs)
// get user information from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

// handle login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.inputProps.value,
        password: password.inputProps.value
      })
      console.log("user services", user)

      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      username.reset('')
      password.reset('')
      
    } catch (exception) {
      setErrorMessage(` Wrong username or password`)
    
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  
    }
   
  }



// create new blog
const handleAddBlog = async (event) => {
    event.preventDefault()
    console.log( "create blog")

    addBlogFormRef.current.toggleVisibility()

    try {
      const newBlog = {
        title: title.inputProps.value,
        author: author.inputProps.value,
        url: url.inputProps.value,
      }
      console.log("new object to add: ", JSON.stringify(newBlog))
      const blogCreated = await blogService.create(newBlog)
      //setBlogs(blogs.concat(blogCreated))
      console.log("new object to add: ", JSON.stringify(blogCreated))
      setBlogs([...blogs, blogCreated])
      setSuccessMessage(`a new blog added: ${title.inputProps.value} by ${user.name}`)
      
      title.reset('')
      author.reset('')
      url.reset('')
      // Notification displays only 5s
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(`Something went wrong  ${error}`)
    
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  
    }
  }
// handle logout 
//logout functionality
const handleLogout = (event) => {
  window.localStorage.clear()
  setUser(null)
  blogService.setToken(null)
 
}
const handleLikeUpdate = blogId =>  async event => {
  event.preventDefault();
  try {

    //use find method to get a current clicked blog
    //
    let foundBlog =  await blogs.find(blog => blog.id === blogId) 
    console.log( "found blog", foundBlog)
    const newLike = foundBlog.likes + 1
    let blogToUpdate = { ...foundBlog,
                        likes: newLike,
                        user: user.id
                      }
    console.log( "updated blog", blogToUpdate)
    const blogUpdated = await  blogService.update(blogId, blogToUpdate)
    console.log( "updated blog", blogUpdated)
    setBlogs(blogs.map(blog => blog.id !== blogId ? blog: blogUpdated))
    setSuccessMessage(
       `Blog ${foundBlog.title} written by ${foundBlog.author} liked!`
       );
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  } catch (error) {
    setErrorMessage(`Something went wrong  ${error}`)
    
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    
    
  }
}

const handleDelete = blogId =>  async event => {
  event.preventDefault();
   //use find method to get a current clicked blog
  let blogToDelete =  await blogs.find(blog => blog.id === blogId) 
  console.log( "found blog:", blogToDelete )
  console.log( "found blog id: ", blogToDelete.id )
  console.log( "found blog blogId: ", blogId)


  // Get a new blog list
  // exclude a blog to be deleted
  const newBlogList =  await blogs.filter(blog => blog.id !== blogId)
  console.log( "new blog list: ", newBlogList)

  let okCancel = window.confirm(
    `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
    )
  if (okCancel) {
    try {
 
      const deletedBlog = await  blogService.remove(blogId)
      console.log( "updated blog", deletedBlog)
      setBlogs(newBlogList)
      setSuccessMessage(
         `Blog post ${blogToDelete.title} deleted`
         )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(`Something went wrong  ${error}`)
      
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
      
    }
  }
}
  const loginForm = () =>{
    return (
      <div className = "wrapper-box" >
                      <LoginForm
                          handleLogin={handleLogin}
                          username={username}
                          password={password}
                      />
      </div> 
    )
  }

  const display = () =>{
    if (blogs.length){

   
    return(
      <div className = "wrapper-box" >
                          <h2>Blogs</h2>
                          
                          <SuccessNotification message={successMessage}/>
                          <p>{user.name} logged in
                            <Button onClick={handleLogout} text = "Logout"/>
                          </p>
                          <Togglable buttonLabel="create" ref ={addBlogFormRef} >
                              <AddBlogForm 
                                handleAddBlog={handleAddBlog}
                                title={title}
                                author={author}
                                url={url}              
                              />
                          </Togglable>

                          <div className = "wrapper-box-container" >
                            <BlogList
                                  blogs = {blogs}
                                  handleLike = {handleLikeUpdate}
                                  handleDelete = {handleDelete}
                            />
                          </div>
                    </div>
    )
  }
  }


  return (
    <div className = "wrapper">
        <ErrorNotification message={errorMessage}/>
        {user? display(): loginForm()}
               
        <Footer />
   </div>
  )
}

export default App;
