
const baseUrl = "https://tarmeezacademy.com/api/v1"



showHidenLogReg()
// تسجيل الدخول 
function loginOpen(){

    const username = document.getElementById("userNameInput").value
    const password = document.getElementById("passwordInput").value
    
    const params ={
        "username" :  username ,
        "password" : password
    }
    
    const url = `${baseUrl}/login`
    
    axios.post(url,params)
    .then((response)=>{
    
            // save token & user in localStorage
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))
        
        
            // close alert after login 
        
            const modal = document.getElementById("login-Modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
    
            modalInstance.hide()
            showHidenLogReg()
    
            showAlert("Log in is successfully")
    
    
    })    
    .catch(function (error) {
      showAlert(error.response.data.message ,'danger')

      alertHide.close()
      
    });
    
    }
    

    // تسجيل مستخدم جديد
function RegisterOpen(){

    const userRegister = document.getElementById("user-input-register").value
    const passwordRegister = document.getElementById("password-input-register").value
    const nameRegister = document.getElementById("name-input-register").value
    const  image  = document.getElementById("img-input-register").files[0]


    //  لما يكون عندي ملفات  لا استخدم params
        let formData = new FormData()
        formData.append("username" , userRegister)
        formData.append("name",nameRegister)
        formData.append("password",passwordRegister)
        formData.append("image",image)


        const headers ={
          "Content-Type" : 'multipart/form-data',
        }


        const url = `${baseUrl}/register`
        
        axios.post(url,formData,{
          headers : headers
        })
        .then((response)=>{

            // save token & user in localStorage
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))
        
            // close alert after login 
        
            const modal = document.getElementById("register-Modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
    
            modalInstance.hide()
              showHidenLogReg()
    
            showAlert(" register is successfully")
    
    })
    .catch(function (error) {
        showAlert(error.response.data.message ,'danger')

        alertHide.close()
        
      });


}



// لما اسجل دخولي زر التسجيل يختفي وز الخروج يظهر
function showHidenLogReg(){
    
    const token = localStorage.getItem("token")

    const loginAndRegDev  = document.getElementById("loginAndRegDev")
    const logOutDev = document.getElementById("logOutDev")
    const btnPlus = document.getElementById("btn-plus")

     if(token == null){
         loginAndRegDev.style.setProperty("display","flex","important")
         logOutDev.style.setProperty("display","none","important")

         if(btnPlus != null){
            btnPlus.style.setProperty("display","none","important")

         }
 }
 else{
    loginAndRegDev.style.setProperty("display","none","important")
    logOutDev.style.setProperty("display","flex","important")

    if(btnPlus != null){
        btnPlus.style.setProperty("display","flex","important")

     }

     
    let user = getCurrentUser()
    document.getElementById("username-nav").innerHTML = `<b>@</b>` + user.username
    document.getElementById("profileImg-nav").src = user.profile_image

    

 }

}

// لما اسجل خروج يفضي اللوكال ستوريج
function logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    showHidenLogReg()
    showAlert("Log Out  Successfully",'success')
}


// show alert when login or logout
function showAlert(message ,type ='success'){

    const alertPlaceholder = document.getElementById('showAlert')
    const appendAlert = (message, type) => {
     const wrapper = document.createElement('div')
     wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}


        appendAlert(message, type)

/*   TO DO :
   setTimeout(() => {
    const alertHide = bootstrap.Alert.getOrCreateInstance('#showAlert')
     alertHide.close()
 }, 2500);

 */
}




// بتجيب المستخدم المسجل دخوله
function getCurrentUser(){
    let user = null
    const localStorageUser = localStorage.getItem("user")
  
    if(localStorageUser != null){
      user =JSON.parse(localStorageUser)
    }

    return user
    
  }


  function onClickProfile(){

    const idUser = getCurrentUser()
    let postId = idUser.id

    window.location = `profile.html?userId=${postId}`
  }



  //  ==      == // 



  function editfunction(postObject){

    let post = JSON.parse(decodeURIComponent(postObject))
      let postModal = new bootstrap.Modal(document.getElementById("create-post-Modal",{}))
     document.getElementById("create-post-title").value = post.title
     document.getElementById("create-post-body").value = post.body
     document.getElementById("post-id-input").value = post.id
     document.getElementById("btn-create-or-update").innerHTML = "Update"
      postModal.toggle()
    }
    
    
    function deleteFunctionModal(postObject){
    
      let post = JSON.parse(decodeURIComponent(postObject))
    
      document.getElementById("delet-post-id").value  = post.id
    
      let postModal = new bootstrap.Modal(document.getElementById("delete-post-Modal",{}))
     
      postModal.toggle()
    
    }
    
    
    
    function deletePost(){
    const postId =  document.getElementById("delet-post-id").value
    const url = `${baseUrl}/posts/${postId}`
    const token = localStorage.getItem("token")
    
    const headers ={
      "Content-Type" : 'multipart/form-data',
      "authorization" : `Bearer ${token}`
    }
    
    axios.delete(url,{
      headers : headers
    })
    .then((response)=>{
    
      //  بعد الحذف بطلع رسالة تم الحذف ويغلق نافذة
     
      const modal = document.getElementById("delete-post-Modal")
      const modalInstance = bootstrap.Modal.getInstance(modal)
      modalInstance.hide()
      showHidenLogReg()
      
      showAlert("The post has been successfully deleted")
      getPosts()
    })
      
    .catch(function(error){
    
      showAlert(error.response.data.error_message,"danger")
      alertHide()
    })
    
    
    
    }




    function createPost(){

      let postId =  document.getElementById("post-id-input").value
       let isCreate = postId == null || postId == ""
     
     const title = document.getElementById("create-post-title").value
     const body = document.getElementById("create-post-body").value
     const image = document.getElementById("create-post-img").files[0]   // طريقة استدعاء الملفات 
     const token = localStorage.getItem("token")
     
     //  لما يكون عندي ملفات  لا استخدم params
     let formData = new FormData()
     formData.append("body" , body)
     formData.append("title",title)
     formData.append("image",image)
     
     let url = ``
     const headers ={
       "Content-Type" : 'multipart/form-data',
       "authorization" : `Bearer ${token}`
     }
     
     if(isCreate){
       url = `${baseUrl}/posts`
       
     }
     else{
       
       formData.append("_method","put")
       url = `${baseUrl}/posts/${postId}`
     
     }
     axios.post(url,formData,{
       headers : headers
     })
     .then((response)=>{
       
       const modal = document.getElementById("create-post-Modal")
       const modalInstance = bootstrap.Modal.getInstance(modal)
       modalInstance.hide()
       showHidenLogReg()
       
       showAlert("Add post is successfully")
       getPosts()
     })
     .catch(function (error) {
       showAlert(error.response.data.message ,'danger')
     
       
     });
     
     }
    




     function addBtn(){
      document.getElementById("create-post-title").value = ""
      document.getElementById("create-post-body").value = ""
      document.getElementById("post-id-input").value = ""
      document.getElementById("btn-create-or-update").innerHTML = "Create"
       let postModal = new bootstrap.Modal(document.getElementById("create-post-Modal",{}))
     
       postModal.toggle()
     }
     

     function clickCard(postId){

      window.location = `postdetails.html?postId=${postId}`
  }
  
  

    
  