import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, waitForElement } from "@testing-library/react"
import { prettyDOM } from '@testing-library/dom'
jest.mock("../services/blogs")
import App from "../App"

/*
const user = {
      username: "mluukkai",
      token: '1231231214',
      name: "Matti Luukkainen"
   }
   "username": "mluukkai",
            "password": "salainen"
const user = {
    username: "tester",
    token: '1231231214',
    name: 'Donald Tester'
  
}
*/
const user = {
  username: "tester",
  token: '1231231214',
  name: 'Donald Tester'
}
describe("<App />", () => {
    test("if nobody login, blogs are not rendered", async () => {
      const component = render(
        <App />
      )
      component.rerender(<App />)

      await waitForElement(
        () => component.getByText("login")
      )

      const divButton = component.container.querySelector('.form-group-login')
      expect(divButton).toBeDefined()

      // not login
      const div = component.container.querySelectorAll(".blog-detail")
      expect (div.length).toBe(0)
    })

  test("When user is login, blogs are rendered", async () => {
   

    
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    // renders all notes it gets from backend
    const component = render(
        <App />
      )
      component.rerender(<App />)
    await waitForElement(
        () =>component.container.querySelector('.blog-user')
      )

    expect(component.container.querySelector(".blog-detail")).toBeDefined()
   
    const divForm = component.container.querySelector(".form-group")
    expect(divForm).toBeDefined()

    const blogs = component.container.querySelectorAll('span')

    const div = component.container.querySelector('div')
  
    console.log(prettyDOM(div))
    expect(blogs).toHaveTextContent("Oprah Winfrey")
    expect(blogs).toHaveTextContent("Crypto currency")
    expect(blogs).toHaveTextContent("You never fail until you stop trying")
    expect(blogs).toHaveTextContent("Money is important than education")
    expect(blogs).toHaveTextContent("Usa and Iran Tension")

    const formDetail = component.container.querySelector('.form-group')
    console.log(prettyDOM(formDetail))
   
    
  })

 
})