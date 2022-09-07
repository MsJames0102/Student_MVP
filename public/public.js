

const form = document.querySelector("#Add-new-task");

const sumbit = document.querySelector('#new-task-submit')
const div = document.querySelector('#Todo')


form.addEventListener('submit', (e) => {
  e.preventDefault()

  createPost()
})

// post to database
async function createPost() {
  const name = document.querySelector("#name")
  const getDate = document.querySelector("#date")
  const goals = document.querySelector('#Add-task');
  // console.log(name.value)
  // console.log(getDate.value)
  // console.log(goals.value)

  const dataObj = {
    name: name.value,
    getdate: getDate.value,
    goals: goals.value
  }; // my data in object that will be send to cli
  const create = {
    method: 'POST', // create a method defining the crud.
    headers: { // applying header to my request
      'Content-type': 'application/json;charset=utf-8'// telling the api the type of info it sends
    },
    body: JSON.stringify(dataObj) // body sending on post request
  }
  const response = await fetch('http://localhost:8002/todo', create) // send the request

  let data = await response.json()
  console.log(data)
}
