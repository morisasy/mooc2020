const blogs = [
   
    {
        title: "Oprah Winfrey ",
        author: "thesavoyshow",
        url: "htps://www.independent.com",
        likes: 106,
        user: {
            username: "mluukkai",
            name: "Matti Luukkainen",
            _id: "5e0e56dead3ce32f34a0a9e8"
        },
        id: "5de6da554ec6bf776aa8f3b4"
    },
    {
        title: "Crypto currency",
        author: "Medi",
        url: "htps://www.crypto.com/info",
        likes: 16,
        user: {
            username: "mluukkai",
            name: "Matti Luukkainen",
            _id: "5e0e56dead3ce32f34a0a9e8"
        },
        id: "5de818f06bfe9d317d4583b1"
    },

    {
        title: "You never fail until you stop trying",
        author: "albert stein",
        url: "htps://www.thebusiness.com/quoteoftheday",
        likes: 1001,
        user: {
            username: "mluukkai",
            name: "Matti Luukkainen",
            _id: "5e0e56dead3ce32f34a0a9e8"
        },
        id: "5de821546bfe9d317d4583b3"
    },
    {
        title: "Money is important than education",
        author: "mluukkai",
        url: "www.yle.fi/ruoka/newyear/resolution",
        likes: 80,
        user: {
            username: "mluukkai",
            name: "Matti Luukkainen",
            _id: "5e0e56dead3ce32f34a0a9e8"
        },
        id: "5e0e6d4e99cf3a3ed6bd4177"
    },
    {
        title: "Usa and Iran Tension",
        author: "Ville",
        url: "www.uutiset.fi/usairan",
        likes: 4,
        user: {
            username: "mluukkai",
            name: "Matti Luukkainen",
            _id: "5e0e56dead3ce32f34a0a9e8"
        },
        id: "5e220b5af7a9361eeaa6c419"
    }
  ]

  const getAll = () => {
    return Promise.resolve(blogs);
  };
  
  const setToken = () => {};
  
  export default { getAll, setToken };