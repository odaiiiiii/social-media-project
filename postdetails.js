

//  استخرجت id  عشان اخذ منه البوست المطلوب
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("postId")

getUserPost()

//  بستدعي البوست الذي اضغط عليه
function getUserPost(){
    const baseUrl = "https://tarmeezacademy.com/api/v1"
  
    axios.get(`${baseUrl}/posts/${id}`)
  .then(function(response){
  
      const post = response.data.data
      const comments = post.comments
         


      let postTitle = ""
      if(post.title != null){
        postTitle = post.title
      }
     
     
     document.getElementById("userName-post").innerHTML = post.author.username
      let commentContent = ``
      for(comment of comments){
        commentContent += `
        
        <!--  التعليق على البوست  -->

        <div id="comment" style="background-color: rgb(240, 234, 234);" class="p-3  my-2">

          <div id="" >
            <img src="${comment.author.profile_image  }" style="width: 30px;height: 30px; border-radius: 50%;">
            <b>@${comment.author.username}</b>
          </div>
          <div id="contnt-comment">
            <p class="my-1" style="margin-left: 2rem;">${comment.body}</p>
          </div>
      </div>

        `
      }

     const content = `
              

     <!-- البوست نفسه  -->
     <div class="container d-flex justify-content-center mt-2 ">

         
     <div class="card d-flex   shadow  "  >
         <div class="card-header "  >
           <img src= '${post.author.profile_image}' class="rounded-circle "  style="width: 40px; height: 40px;">
          
           <span class="fw-bold mx-1"> <b>@</b> ${post.author.username} </span>
         </div>
         <div class="card-body "  style="cursor:pointer" >
          <img src="${post.image}"  style="width: 100%;" >
             <p class="my-2 mx-2 " style="color: rgb(163, 120, 160);font-size:13px">${post.created_at}</p>
             <h2 class=" mx-2">${postTitle}</h2>
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
             <div id="comments">${commentContent} </div>


             <!-- add comment dev  -->
             <div style="display: flex;margin-top: 15px;" id="commentDev">
              <input placeholder="Add your comment here  " type="text" class="addCommentStyle" id="inputAddComment">
              <button onclick="creatNewComment()" type="button" class="btn btn-outline-success AddCommentBtn" style="margin-left: 10px;"><b>Add Comment</b></button>
            </div>

            <!-- //  add comment dev //-->


         </div>
             </div>
       
       </div>
     </div>
         
  
     `
     document.getElementById("userPost").innerHTML = content


      
  
  })
  }


    // لانشاء بوست جديد 
  function creatNewComment(){
    
    let inputAddComment = document.getElementById("inputAddComment").value

    let params = {
      "body" : inputAddComment
    }

    let token = localStorage.getItem("token")
    let url = `${baseUrl}/posts/${id}/comments`

      axios.post(url,params,{
        headers :{
          "authorization" : `Bearer ${token}`
        }
      }
        )

        .then((response)=>{
          getUserPost()

        })
        .catch((error)=>{
     let err = error.response.data.message
        showAlert(err ,'danger')

        })
        

  }

