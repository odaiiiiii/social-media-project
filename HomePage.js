

let currentPage = 1
let lastPage = 1


function toggelLoader(show = true){

  if(show){
    document.getElementById("loader").style.visibility = "visible"
  }
  else {
    document.getElementById("loader").style.visibility = "hidden"

  }

}

//  تظهر البوستات 
getPosts()

function getPosts(reload = true, page = 1){
  toggelLoader(true)

  const baseUrl = "https://tarmeezacademy.com/api/v1"


  axios.get(`${baseUrl}/posts?limit=5&page=${page}`)
.then(function(response){

  toggelLoader(false)

    const posts = response.data.data
     lastPage = response.data.meta.last_page
    if(reload){
      document.getElementById("postsDev").innerHTML = ""
    }

    for(let post of posts){

      let postTitle = ""
      let user =  getCurrentUser()
  let isMyPost = user != null  && post.author.id == user.id
  let editfunction = ``
  
  if(isMyPost){
    editfunction = `

        </svg>
        <svg class="icon-delete-post"   onclick="deleteFunctionModal('${encodeURIComponent(JSON.stringify(post))}')"  xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>
        <svg class="icon-edit-post"  onclick="editfunction('${encodeURIComponent(JSON.stringify(post))}')"  xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"   >
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>

    
    `
  }

      if(post.title != null){
        postTitle = post.title  
      }

      
        const content = `
            
        <div class="container d-flex justify-content-center mt-5  ">

            
        <div class="card  d-flex   shadow-sm "  id="test" >
            <div class="card-header  "  >
             
            <span onclick="clickGoTOPagePost(${post.author.id})" style="cursor:pointer">
            <img src= '${post.author.profile_image}' class="rounded-circle "  style="width: 40px; height: 40px;">
             
            <span class="fw-bold">@${post.author.username} </span>
            </span>

                ${editfunction}
            
            </div>
            <div class="card-body " onclick="clickCard(${post.id})" style="cursor:pointer" >
             <img src="${post.image}"  style="width: 100%;" >
                <p class="my-2 mx-2 " style="color: rgb(163, 120, 160);font-size:13px">${post.created_at}</p>
                <h2 class=" mx-2">${post.title}</h2>
                <p class="mx-2">
                ${post.body}
                </p>
                

                <hr>

                <div class="tagCss mx-3">
                
                <span style="margin-right:7px" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                </svg>
                </span>
             
                
                <span>
                Comment ( ${post.comments_count} )
                </span>


                </div>

            </div>
                </div>
          
          </div>
        </div>
            
     
        `
        document.getElementById("postsDev").innerHTML += content


      
    }

})
}




//     INFINITE SCROLLING         //

window.addEventListener("scroll", function(){
 
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;

  if(endOfPage && currentPage < lastPage){

    currentPage = currentPage + 1 ;
    getPosts( false , currentPage)
  }
})

//   ===  INFINITE SCROLLING   ===      //




//  لما اضغط على اسم او صورة المستخدم اروح ع صفحته
function clickGoTOPagePost(IdUser){
window.location = `profile.html?userId=${IdUser}`
}


























/*    الكود الاول */

// const baseUrl = "https://tarmeezacademy.com/api/v1"
// let currentPage = 1
// let lastPage = 1

// //  تظهر البوستات 
// getPosts()


// function getPosts(reload = true, page = 1){
//   axios.get(`${baseUrl}/posts?limit=5&page=${page}`)
// .then(function(response){

//     const posts = response.data.data
//      lastPage = response.data.meta.last_page
//     if(reload){
//       document.getElementById("postsDev").innerHTML = ""
//     }

//     for(let post of posts){
//         const content = `
            
//         <div class="container d-flex justify-content-center mt-5 ">

            
//         <div class="card d-flex  col-9 shadow " >
//             <div class="card-header">
//               <img src= '${post.author.profile_image}' class="rounded-circle "  style="width: 40px; height: 40px;">
             
//               <span class="fw-bold">${post.author.username} </span>
//             </div>
//             <div class="card-body">
//              <img src="${post.image}"  style="width: 100%;" >
//                 <p class="my-2 mx-2 " style="color: rgb(163, 120, 160);font-size:13px">${post.created_at}</p>
//                 <h2 class=" mx-2">${post.title}</h2>
//                 <p class="mx-2">
//                 ${post.body}
//                 </p>
                

//                 <hr>

//                 <div class="tagCss mx-3">
                
//                 <span style="margin-right:7px" >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
//                 <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
//                 </svg>
//                 </span>
             
                
//                 <span>
//                 Comment ( ${post.comments_count} )
//                 </span>

              
     
               

//                 </div>

//             </div>
//                 </div>
          
//           </div>
//         </div>
            
     
//         `
//         document.getElementById("postsDev").innerHTML += content


      
//     }

// })
// }

// // تسجيل الدخول 
// function loginOpen(){

// const username = document.getElementById("userNameInput").value
// const password = document.getElementById("passwordInput").value

// const params ={
//     "username" :  username ,
//     "password" : password
// }

// const url = `${baseUrl}/login`

// axios.post(url,params)
// .then((response)=>{

//         // save token & user in localStorage
//         localStorage.setItem("token",response.data.token)
//         localStorage.setItem("user",JSON.stringify(response.data.user))
    
    
//         // close alert after login 
    
//         const modal = document.getElementById("login-Modal")
//         const modalInstance = bootstrap.Modal.getInstance(modal)

//         modalInstance.hide()
//         showHidenLogReg()

//         showAlert("Log in is successfully")


// })    

// }

// // تسجيل مستخدم جديد
// function RegisterOpen(){

//     const userRegister = document.getElementById("user-input-register").value
//     const passwordRegister = document.getElementById("password-input-register").value
//     const nameRegister = document.getElementById("name-input-register").value
//     const  image  = document.getElementById("img-input-register").files[0]


//     //  لما يكون عندي ملفات  لا استخدم params
//         let formData = new FormData()
//         formData.append("username" , userRegister)
//         formData.append("name",nameRegister)
//         formData.append("password",passwordRegister)
//         formData.append("image",image)


//         const headers ={
//           "Content-Type" : 'multipart/form-data',
//         }


//         const url = `${baseUrl}/register`
        
//         axios.post(url,formData,{
//           headers : headers
//         })
//         .then((response)=>{
//           console.log(response.data)

//             // save token & user in localStorage
//             localStorage.setItem("token",response.data.token)
//             localStorage.setItem("user",JSON.stringify(response.data.user))
        
//             // close alert after login 
        
//             const modal = document.getElementById("register-Modal")
//             const modalInstance = bootstrap.Modal.getInstance(modal)
    
//             modalInstance.hide()
//               showHidenLogReg()
    
//             showAlert(" register is successfully")
    
//     })
//     .catch(function (error) {
//         showAlert(error.response.data.message ,'danger')

//         alertHide.close()
        
//       });


// }


// showHidenLogReg()


// // لما اسجل دخولي زر التسجيل يختفي وز الخروج يظهر
// function showHidenLogReg(){
    
//     const token = localStorage.getItem("token")

//     const loginAndRegDev  = document.getElementById("loginAndRegDev")
//     const logOutDev = document.getElementById("logOutDev")
//     const btnPlus = document.getElementById("btn-plus")

//      if(token == null){
//          loginAndRegDev.style.setProperty("display","flex","important")
//          logOutDev.style.setProperty("display","none","important")
//          btnPlus.style.setProperty("display","none","important")

//  }
//  else{
//     loginAndRegDev.style.setProperty("display","none","important")
//     logOutDev.style.setProperty("display","flex","important")
//     btnPlus.style.setProperty("display","flex","important")

//     let user = getCurrentUser()
//     document.getElementById("username-nav").innerHTML = `<b>@</b>` + user.username
//     document.getElementById("profileImg-nav").src = user.profile_image

    

//  }

// }

// // لما اسجل خروج يفضي اللوكال ستوريج
// function logOut(){
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")

//     showHidenLogReg()
//     showAlert("Log Out  Successfully",'success')
// }



// // show alert when login or logout
// function showAlert(message ,type ='success'){

//     const alertPlaceholder = document.getElementById('showAlert')
//     const appendAlert = (message, type) => {
//      const wrapper = document.createElement('div')
//      wrapper.innerHTML = [
//     `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//     `   <div>${message}</div>`,
//     '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//     '</div>'
//   ].join('')

//   alertPlaceholder.append(wrapper)
// }


//         appendAlert(message, type)

// /*   TO DO :
//    setTimeout(() => {
//     const alertHide = bootstrap.Alert.getOrCreateInstance('#showAlert')
//      alertHide.close()
//  }, 2500);

//  */
// }


// function createPost(){
// const title = document.getElementById("create-post-title").value
// const body = document.getElementById("create-post-body").value
// const image = document.getElementById("create-post-img").files[0]   // طريقة استدعاء الملفات 
// const token = localStorage.getItem("token")

// //  لما يكون عندي ملفات  لا استخدم params
// let formData = new FormData()
// formData.append("body" , body)
// formData.append("title",title)
// formData.append("image",image)

// const url = `${baseUrl}/posts`
// const headers ={
//   "Content-Type" : 'multipart/form-data',
//   "authorization" : `Bearer ${token}`
// }

// axios.post(url,formData,{
//   headers : headers
// })
// .then((response)=>{
  
//   const modal = document.getElementById("create-post-Modal")
//   const modalInstance = bootstrap.Modal.getInstance(modal)
//   modalInstance.hide()
//   showHidenLogReg()
  
//   showAlert("Add post is successfully")
//   getPosts()
// })
// .catch(function (error) {
//   showAlert(error.response.data.message ,'danger')

//   alertHide.close()
  
// });
// }



// // بتجيب المستخدم المسجل دخوله
// function getCurrentUser(){
//   let user = null
//   const localStorageUser = localStorage.getItem("user")

//   if(localStorageUser != null){
//     user =JSON.parse(localStorageUser)
//   }
//   return user
// }


// //     INFINITE SCROLLING         //

// window.addEventListener("scroll", function(){
 
//   const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

//   if(endOfPage && currentPage < lastPage){

//     currentPage = currentPage + 1 ;
//     getPosts( false , currentPage)
//   }
// })

// //   ===  INFINITE SCROLLING   ===      //
