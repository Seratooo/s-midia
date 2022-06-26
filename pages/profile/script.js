//import {_Init} from '../main/script.js'
//_Init();


let mainContent = document.getElementById('mainContent');
function getUser(){
  const dados = `
  <div class="page-header min-height-300 border-radius-xl mt-4" style="background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');">
  <span class="mask  bg-gradient-primary  opacity-6"></span>
</div>
<div class="card card-body mx-3 mx-md-4 mt-n6">
  <div class="row gx-4 mb-2">
    <div class="col-auto">
      <div class="avatar avatar-xl position-relative">
        <img src="../assets/img/user.png" alt="profile_image" class="w-100 border-radius-lg shadow-sm">
      </div>
    </div>
    <div class="col-auto my-auto">
      <div class="h-100">
        <h5 class="mb-1">
        ${localStorage.getItem('Name')}
        </h5>
        <p class="mb-0 font-weight-normal text-sm">
        ${localStorage.getItem('Email')}
        </p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="row">
      <!-- <div class="col-12 col-xl-4">
          <div class="card-body p-3">
            <p class="text-sm">
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
            </p>
            <hr class="horizontal gray-light my-4">
            <ul class="list-group">
              <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Full Name:</strong> &nbsp; Alec M. Thompson</li>
              <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Mobile:</strong> &nbsp; (44) 123 1234 123</li>
              <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong> &nbsp; alecthompson@mail.com</li>
              <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Location:</strong> &nbsp; USA</li>
              <li class="list-group-item border-0 ps-0 pb-0">
                <strong class="text-dark text-sm">Social:</strong> &nbsp;
                <a class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                  <i class="fab fa-facebook fa-lg"></i>
                </a>
                <a class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                  <i class="fab fa-twitter fa-lg"></i>
                </a>
                <a class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                  <i class="fab fa-instagram fa-lg"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
      <!--div class="col-12 col-xl-4">
        <div class="card card-plain h-100">
          <div class="card-header pb-0 p-3">
            <h6 class="mb-0">Amigos</h6>
          </div>
          <div class="card-body p-3">
            <ul class="list-group">
              <li class="list-group-item border-0 d-flex align-items-center px-0 mb-2 pt-0">
                <div class="avatar me-3">
                  <img src="../assets/img/user.png" alt="kal" class="border-radius-lg shadow">
                </div>
                <div class="d-flex align-items-start flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Sophie B.</h6>
                  <p class="mb-0 text-xs">Hi! I need more information..</p>
                </div>
                <a class="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto" href="javascript:;">Reply</a>
              </li>
              
            </ul>
          </div>
        </div>
      </div -->
       
    </div>
  </div>
</div>
  `

  mainContent.innerHTML = dados;
}

document.addEventListener("DOMContentLoaded",getUser);
