
const names = document.querySelector("#name")
const getDate = document.querySelector("#date")
const goals = document.querySelector('#Add-task');
const form = document.querySelector("#Add-new-task");
const sumbit = document.querySelector('#new-task-submit')
const div = document.querySelector('#Todo')
// console.log(form)
// console.log(sumbit)
// console.log(div)
// console.log(name.value)
// console.log(getDate.value)
// console.log(goals.value)
form.addEventListener('submit', (e) => {
  e.preventDefault() //stop your page from refreshing
  createPost()
})
// post to database
async function createPost() {
  const dataObj = {
    name: names.value,
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
  // console.log(data)
  PostContainer(data)
}

function PostContainer(data) {
  for (let i = 0; i < data.length; i++) {//access a array
    let currentData = data[i]// access object
    // console.log(currentData)
    makeNewContainer(currentData)
  }
}
function makeNewContainer(currentData) {
  let name = currentData.name
  let dates = currentData.getdate
  let goals = currentData.goals
  let id = currentData.id

//create delete button 
  const deleteBtn = document.createElement('button')
  deleteBtn.className = "btn"
  deleteBtn.innerText = "Delete"
  deleteBtn.id = "deleteGoals"
  deleteBtn.addEventListener("click", () => {
    div.removeChild(postGoals)
    // postDelete()
  })
  //create edit button
  const editBtn = document.createElement('button')
  editBtn.className = "btn"
  editBtn.innerHTML = "Edit"
  editBtn.addEventListener("click", () => {
   if(editBtn.innerText.toLowerCase() === "edit") {
    // postGoals.removeAttribute('read-only')
    // postGoals.focus();
    editBtn.innerText = "Save"
   } else{
    // postGoals.setAttribute('read-only')
    editBtn.innerHTML = "Edit"
   }
    // postEdit()
  })

  const postGoals = document.createElement("div");
  postGoals.className = "goals"
  postGoals.id = `${id}`
  // postGoals.setAttribute('read-only', `${name}: ${goals}`)
  postGoals.append(`${name}: ${goals} ${dates}`)
  form.reset()
  postGoals.append(deleteBtn)
  postGoals.append(editBtn)
  div.appendChild(postGoals)
}

//delete fetch
// async function postDelete() {
//   const res = await fetch(`http://localhost:8002/todo/${id}`, { method: "delete" });// id is undefined
//   const data = await res.json();
//   const result = {
//     status: res.status + "-" + res.statusText,
//     headers: { "Content-Type": res.headers.get("Content-Type") },
//     data: data,
//   };
// }
//edit fetch
// async function postEdit() {
//   const dataObj = {
//     name: names.value,
//     getdate: getDate.value,
//     goals: goals.value
//   }; // my data in object that will be send to cli
//   const edit = {
//     method: 'PATCH', // create a method defining the crud.
//     headers: { // applying header to my request
//       'Content-type': 'application/json;charset=utf-8'// telling the api the type of info it sends
//     },
//     body: JSON.stringify(dataObj) // body sending on post request
//   }
//   const response = await fetch('http://localhost:8002/todo', edit) // send the request
//   let data = await response.json()
//   console.log(data)
// }
