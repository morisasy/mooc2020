import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from '../components/SimpleBlog'

// CI=true npm test -- --coverage
const blog = {
  title: 'Record number of human trafic in Finland',
  author: 'Risasi',
  likes: 20
}

// Searching for content in a component
describe('SimpleBlog', () => {

  const mockHandle = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandle} />
    )
  })
  // print html rendered to console
  // component.debug()
  test('render title', () => {
    const divTitle = component.container.querySelector(".title")
    expect(divTitle).toHaveTextContent(blog.title)

    const element = component.getByText(
      'Record number of human trafic in Finland'
    )
    expect(element).toBeDefined()
    const div = component.container.querySelector('div')
  
    console.log(prettyDOM(div))
  })

  test('render author', () => {
    const div = component.container.querySelector(".author")
    expect(div).toHaveTextContent(blog.author)
  })

  test('render likes', () => {
    const div = component.container.querySelector(".likes")
    expect(div).toHaveTextContent(blog.likes)

  })


  test('Click twice button to call event handler', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandle.mock.calls.length).toBe(2)
  })
})