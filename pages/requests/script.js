import {_Init, logout} from '../main/script.js'
let users = document.getElementById('users');
var loadingContainer = document.querySelector('.loading-container');
var loadingCarregando = document.querySelector('.loading-container p.carregando');
var loadingConcluido = document.querySelector('.loading-container p.concluido');
var btnCancelarGroup = document.getElementById('btnCancelarGroup');
var ContentCreateGroup = document.querySelector('.ContentCreateGroup');
var btnCreateGroup = document.getElementById('btnCreateGroup');
var inputGroupName = document.getElementById('groupName');
var usersGroup = document.getElementById('usersGroup');
var btnConcluirGroup = document.getElementById('btnConcluirGroup');
var group;
const btnSairHeader = document.getElementById('btnSairHeader');
var groupTable = document.getElementById('groupTable');
_Init();


function getUsers(){
  firebase.firestore().collection('Data').orderBy('Name','desc').get().then(snapshot=>{
    users.innerHTML = '';
    snapshot.docs.forEach(object=>{
        const Data = object.data();
        let TheEmail = Data.Email;
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          td.classList.add('align-middle');
          const a = document.createElement('a');
          
          a.innerText='Adicionar';
        

          firebase.firestore().collection('Data').doc(localStorage.getItem('Email')).get()
          .then(snapshot=>{
            const Data = snapshot.data();

            if(Data.Amizade){
            
              for(let Amigos in Data.Amizade){
               
                //Acitar pedido
                // console.log(""+Data.Amizade[Amigos].TipoRequisicao+"Para email= "+Data.Amizade[Amigos].ParaEmail);
                // if(!Data.Amizade[Amigos].TipoRequisicao.includes('Amigo')){

                //   if(Data.Amizade[Amigos].DeEmail == TheEmail){
                //     a.innerHTML=Data.Amizade[Amigos].TipoRequisicao;
                //     }
                  
                //   //Adicionados
                //   if(Data.Amizade[Amigos].ParaEmail == TheEmail){
                //       a.innerHTML=Data.Amizade[Amigos].TipoRequisicao;
                //     }
                // }else{
                //   a.innerHTML=Data.Amizade[Amigos].TipoRequisicao;
                // }

                if(Data.Amizade[Amigos].Owner == Data.Amizade[Amigos].DeEmail){
                  
                  if(Data.Amizade[Amigos].ParaEmail == TheEmail){
                    a.innerHTML=Data.Amizade[Amigos].TipoRequisicao;
                  }
                }

                if(Data.Amizade[Amigos].Owner == Data.Amizade[Amigos].ParaEmail){
                  
                  if(Data.Amizade[Amigos].DeEmail == TheEmail){
                    a.innerHTML=Data.Amizade[Amigos].TipoRequisicao;
                  }
                }


              }
            
          }


          })


          a.id= 'addUser';
          a.setAttribute('Name',Data.Name);
          a.setAttribute('Email',Data.Email);
          
      a.addEventListener("click",function(e){

            loadingContainer.style.display='flex';
            const Name = a.getAttribute('Name');
            const Email = a.getAttribute('Email');     
            
      if(a.innerText.includes('Adicionar')){


            firebase.firestore().collection('Data').orderBy('Name','desc').get().then(snapshot=>{
              snapshot.docs.forEach(object=>{

                if(object.data().Email == localStorage.getItem('Email')){
                      const Data = object.data();

                      let dados;
                      let dataFriend = {
                        ParaName: Name,
                        ParaEmail: Email,
                        DeName:localStorage.getItem('Name'),
                        DeEmail:localStorage.getItem('Email'),
                        Owner:localStorage.getItem('Email'),
                        Respostas:{
                          Emissor: 'Sim',
                          Receptor: 'Nao',
                        },
                        TipoRequisicao: 'Adicionado',
                      }
              
                        let MyFriends={};
                     
          
                      if(Data.Amizade){
          
                          let lastIndex=0;
                          for(let Amigo in Data.Amizade){
                              MyFriends[lastIndex]= Data.Amizade[Amigo];
                              lastIndex++;
                          }
          
                          MyFriends[lastIndex]=dataFriend;
                        }
                        
                      if(Data.Amizade){
                        dados = {'Amizade': MyFriends}
                      }else{
                        const ReqFriends= {dataFriend, }
                        dados = {'Amizade': ReqFriends}
                      }
                      
          
                      firebase.firestore().collection('Data').doc(localStorage.getItem('Email')).update(dados).then(()=>{
                       
                        loadingCarregando.style.display='none';
                        loadingConcluido.style.display='flex';
                        loadingContainer.addEventListener('click',function(){
                          loadingContainer.style.display='none';
                          loadingCarregando.style.display='flex';
                          loadingConcluido.style.display='none';
                        });
                      })
                   }
                
                })
              })
            





              firebase.firestore().collection('Data').orderBy('Name','desc').get().then(snapshot=>{
                snapshot.docs.forEach(object=>{
  
                  if(object.data().Email == Email){
                        const Data = object.data();
                        
                                    let dados1;
                                    let dataFriendRecetor = {
                                      ParaName: Name,
                                      ParaEmail: Email,
                                      DeName:localStorage.getItem('Name'),
                                      DeEmail:localStorage.getItem('Email'),
                                      Owner:Email,
                                      Respostas:{
                                        Emissor: 'Sim',
                                        Receptor: 'Nao'
                                      },
                                      TipoRequisicao: 'Aceitar Pedido',
                                    }
                        
                                    let MyFriends1={};
                                    
                                    if(Data.Amizade){
                        
                                      let lastIndex=0;
                                      for(let Amigo in Data.Amizade){
                                          MyFriends1[lastIndex]= Data.Amizade[Amigo];
                                          lastIndex++;
                                      }
                        
                                      MyFriends1[lastIndex]=dataFriendRecetor;
                                    }
                        
                                    if(Data.Amizade){
                                      dados1 = {'Amizade': MyFriends1}
                                    }else{
                                      const ReqFriends= {dataFriendRecetor, }
                                      dados1 = {'Amizade': ReqFriends}
                                    }
                            
                                    firebase.firestore().collection('Data').doc(Email).update(dados1).then(()=>{
                                      loadingCarregando.style.display='none';
                                      loadingConcluido.style.display='flex';
                                      
                                      loadingContainer.addEventListener('click',function(){
                                        loadingContainer.style.display='none';
                                        loadingCarregando.style.display='flex';
                                        loadingConcluido.style.display='none';
                                      });
                                    });
                  
                   }
                  })
                })

              }else  if(a.innerText.includes('Adicionado')){
                loadingContainer.style.display='none';
              }else  if(a.innerText.includes('Aceitar Pedido')){

                loadingContainer.style.display='flex';
                const Name = a.getAttribute('Name');
                const Email = a.getAttribute('Email'); 

              firebase.firestore().collection('Data').orderBy('Name','desc').get().then(snapshot=>{
              snapshot.docs.forEach(object=>{


                if(object.data().Email == localStorage.getItem('Email')){
                      const Data = object.data();

                      let dados;
                      let MyFriends={};
                     
          
                      if(Data.Amizade){
          
                          let lastIndex=0;
                          for(let Amigo in Data.Amizade){
                            
                            if(Data.Amizade[Amigo].TipoRequisicao.includes('Aceitar Pedido') && Data.Amizade[Amigo].DeEmail==Email){
                              Data.Amizade[Amigo].TipoRequisicao = 'Amigo';
                              Data.Amizade[Amigo].Respostas['Receptor'] = 'Sim';
                            }
                              MyFriends[lastIndex] = Data.Amizade[Amigo];
                              lastIndex++;
                          }
          
                        }
                        
                      if(Data.Amizade){
                        dados = {'Amizade': MyFriends}
                      }else{
                        const ReqFriends= {dataFriend, }
                        dados = {'Amizade': ReqFriends}
                      }
                      
          
                      firebase.firestore().collection('Data').doc(localStorage.getItem('Email')).update(dados).then(()=>{
                       
                        loadingCarregando.style.display='none';
                        loadingConcluido.style.display='flex';
                        loadingContainer.addEventListener('click',function(){
                          loadingContainer.style.display='none';
                          loadingCarregando.style.display='flex';
                          loadingConcluido.style.display='none';
                        });
                      })
                   }
                
                })
              })
            





              firebase.firestore().collection('Data').orderBy('Name','desc').get().then(snapshot=>{
                snapshot.docs.forEach(object=>{
  
                  if(object.data().Email == Email){
                       
                          const Data = object.data();
                        
                                    let dados1;
                                  
                        
                                    let MyFriends1={};
                                    
                                    if(Data.Amizade){
                        
                                      let lastIndex=0;
                                      for(let Amigo in Data.Amizade){
                                         
                                        if(Data.Amizade[Amigo].ParaEmail == localStorage.getItem('Email') && Data.Amizade[Amigo].TipoRequisicao.includes('Adicionado')){
                                          Data.Amizade[Amigo].Respostas['Receptor'] = 'Sim';
                                          Data.Amizade[Amigo].TipoRequisicao = 'Amigo';
                                         }
                                          MyFriends1[lastIndex]= Data.Amizade[Amigo];
                                          lastIndex++;
                                      }
                                    }
                        
                                    if(Data.Amizade){
                                      dados1 = {'Amizade': MyFriends1}
                                    }else{
                                      const ReqFriends= {dataFriendRecetor, }
                                      dados1 = {'Amizade': ReqFriends}
                                    }

                              
                            
                                    firebase.firestore().collection('Data').doc(Email).update(dados1).then(()=>{
                                      loadingCarregando.style.display='none';
                                      loadingConcluido.style.display='flex';
                                      
                                      loadingContainer.addEventListener('click',function(){
                                        loadingContainer.style.display='none';
                                        loadingCarregando.style.display='flex';
                                        loadingConcluido.style.display='none';
                                      });
                                    });
                  
                   }
                 })
               })
              }else{
                loadingContainer.style.display='none';
              }

          });

          td.append(a);
          const user = `
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img src="../assets/img/user.png" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm" id="nameUser">${Data.Name}</h6>
                <p class="text-xs text-secondary mb-0" id="nameUser">${Data.Email}</p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0"></p>
            <p class="text-xs text-secondary mb-0"></p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-gradient-success"></span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold"></span>
          </td>
          `
          if(localStorage.getItem('Email')!==Data.Email){
          tr.innerHTML = user;
          tr.append(td);
          users.append(tr);
         }
        
    })
  
  })
}
getUsers();

firebase.firestore().collection('Data').onSnapshot(snapshot =>{

  snapshot.docChanges().forEach(object =>{
      if(object.type == 'added'){
        users.innerHTML='';
        getUsers();
      }
      if(object.type == 'modified'){
        users.innerHTML='';
        getUsers();
      }
      if(object.type == 'removed'){
        users.innerHTML='';
        getUsers();
      }
  })
});


btnCreateGroup.addEventListener("click",function(){
  ContentCreateGroup.style.display='flex';

  firebase.firestore().collection('Data').doc(localStorage.getItem('Email')).get()
  .then(snapshot=>{
   
    usersGroup.innerHTML= '';
    const Data = snapshot.data();
    if(Data.Amizade){
      for(let Amigos in Data.Amizade){
        if(Data.Amizade[Amigos].TipoRequisicao.includes('Amigo')){
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          const a = document.createElement('a');
          a.id = 'addGroup';
          a.setAttribute('Name',Data.Amizade[Amigos].Owner == Data.Amizade[Amigos].DeEmail ? Data.Amizade[Amigos].ParaName: Data.Amizade[Amigos].DeName);
          a.setAttribute('Email',Data.Amizade[Amigos].Owner == Data.Amizade[Amigos].DeEmail ? Data.Amizade[Amigos].ParaEmail: Data.Amizade[Amigos].DeEmail);
          a.innerText = 'Adicionar';
          let user = `
          <div class="d-flex px-2 py-1">
            <div>
              <img src="../assets/img/user.png" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
            </div>
            <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm" id="nameUser">${Data.Amizade[Amigos].Owner == Data.Amizade[Amigos].DeEmail ? Data.Amizade[Amigos].ParaName: Data.Amizade[Amigos].DeName}</h6>
              <p class="text-xs text-secondary mb-0" id="nameUser">${Data.Amizade[Amigos].Owner == Data.Amizade[Amigos].DeEmail ? Data.Amizade[Amigos].ParaEmail: Data.Amizade[Amigos].DeEmail}</p>
            </div>
          </div>
          `

          a.addEventListener("click",function(){
          const NomeOfGrupo = inputGroupName.value;
          const id = Math.floor(Date.now() * Math.random()).toString(36);

          const data = {
              NomeGrupo: NomeOfGrupo+" (id:"+id+")",
              DonoEmail: localStorage.getItem('Email'),
              DonoNome: localStorage.getItem('Name'),
              Integrantes:{
              0:{
                  Nome: a.getAttribute('Name'),
                  Email: a.getAttribute('Email'),
               }
              },
              publicacoes: {
                0:{
                  Texto: 'grupo criado',
                }
              }
            }
            
            if(group){
              const newIntegrante = {
                Nome: a.getAttribute('Name'),
                Email: a.getAttribute('Email'),
              }
            
              let index=0;
              for(let int in group['data'].Integrantes){
                group['data'].Integrantes[index] = group['data'].Integrantes[int];
                index++;
             } 
             group['data'].Integrantes[index] = newIntegrante;

             group['data'] = group['data'];

            }else{
              group= {};
              group['data'] = data; 
            }

            
            a.remove();
          })

          td.innerHTML= user;
          td.appendChild(a);
          tr.append(td);
          usersGroup.append(tr)
        }
      }
    }


  })

})

btnConcluirGroup.addEventListener("click",function(){
  ContentCreateGroup.style.display='none';
  loadingContainer.style.display='flex';

  firebase.firestore().collection('Grupos').add(group).then(()=>{
    loadingCarregando.style.display='none';
    loadingConcluido.style.display='flex';
    loadingContainer.addEventListener('click',function(){
      loadingContainer.style.display='none';
      loadingCarregando.style.display='flex';
      loadingConcluido.style.display='none';
    });

  })
})

btnCancelarGroup.addEventListener("click",function(){
  ContentCreateGroup.style.display='none';
})

function getGroup(){
  //const NameGroup = inputGroupName.value;
  firebase.firestore().collection('Grupos').get().then(snapshot=>{
    groupTable.innerHTML = '';
    snapshot.docs.forEach(object=>{
      const Data = object.data();
       const UserOn = localStorage.getItem('Email');  
       
     
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        tr.classList.add('groupTbrow')
        td.classList.add('groutTbline');
        const a = document.createElement('a');
        a.id= 'btnAderirGroup';
        a.innerText='Aderir';
        a.setAttribute('NomeGrupo',Data['data'].NomeGrupo);
        a.setAttribute('DonoEmail',Data['data'].DonoEmail);

        

        let elementGroup=`    
          <div class="" style="display:flex; align-items: center;">
            <div>
              <img src="../assets/img/group.png" class="avatar avatar-sm rounded-circle me-2" alt="spotify">
            </div>
            <div class="my-auto">
              <h6 class="mb-0 text-sm">${Data['data'].NomeGrupo}</h6>
            </div>
          </div>
        </td>
        <td class="align-middle">
        `

        a.addEventListener("click",function(){
        loadingContainer.style.display='flex';
          const data= {
            TipoRequisicao: 'Pedido de Adesao',
            NomeGrupo: a.getAttribute('NomeGrupo'),
            DonoEmail: a.getAttribute('DonoEmail'),
            Nome: localStorage.getItem('Name'),
            Email: localStorage.getItem('Email'),
          }


          firebase.firestore().collection('Data').doc(a.getAttribute('DonoEmail')).collection('Pedido_de_Adesao').add(data).then(()=>{
            loadingCarregando.style.display='none';
            loadingConcluido.style.display='flex';
            loadingContainer.addEventListener('click',function(){
              loadingContainer.style.display='none';
              loadingCarregando.style.display='flex';
              loadingConcluido.style.display='none';
            });
          })

          
          setTimeout(function(){
            a.innerHTML='Pedido Enviado';
          },500);
          setTimeout(function(){
            a.remove();
          },1000);

        })

        td.innerHTML=elementGroup;
        
        if(UserOn != Data['data'].DonoEmail){
          td.append(a);
          for(let user in Data['data'].Integrantes){
              if(Data['data'].Integrantes[user].Email == UserOn){
                a.remove();
              }
          }
          
        }
        tr.append(td);
        groupTable.appendChild(tr);
      //}


    })

  })
}
getGroup();

btnSairHeader.addEventListener('click',logout);