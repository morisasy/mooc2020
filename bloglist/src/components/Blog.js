import React from 'react'
import PropTypes from "prop-types"
import BlogDetail from './BlogDetail'
const Blog = ({ blog, handleLike , handleDelete}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogRef = React.createRef();

  const handleToggleVisibility = () => {
    blogRef.current.toggleVisibility()
  }

  return (
   
     <div className ="blog">
        <div style={blogStyle}  onClick={handleToggleVisibility} className="blog-user" >
                   
                    <span className="title">{blog.title}</span> &nbsp;
                    <span className="author">{blog.author}</span>
        </div>

        <BlogDetail
            blog={blog}
            handleLike = {handleLike}
            handleDelete = {handleDelete}
            ref={blogRef}
            
          />       
   </div>
  )
  }
Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}
  

export default Blog