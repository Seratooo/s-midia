import {_Init} from '../main/script.js'
const txtArea = document.getElementById('txtConteudo');
const btnPublicar = document.getElementById('btnPublicar');
const rbPriv = document.getElementById('rbPriv');
const rbPub = document.getElementById('rbPub');
var inputFile = document.querySelector('#arquivos');
var inputLabel = document.querySelector('.labelformArquivo');
var ref = firebase.storage().ref('Arquivos');
var loadingContainer = document.querySelector('.loading-container');
var loadingCarregando = document.querySelector('.loading-container p.carregando');
var loadingConcluido = document.querySelector('.loading-container p.concluido');
var lbLista = document.querySelector('.Wrapper_List label.lbLista');
var listContainer = document.querySelector('.Container_List');
var ulList = document.querySelector('.Wrapper_pubs ul');
var typeFile, nameFile;
var base64=null;
var myArquivo=null;
var btnCreateList = document.getElementById('createMyList');
var GroupPosts = [];
var listContainer = document.querySelector('.Container_List');
var inputLista = document.querySelector('#txtLista');
const divRadios = document.querySelector('.Radiobuttons');
const rbPubList = document.getElementById('rbPubList');

var group;
_Init();
function getPubs(){
  firebase.firestore().collection('Data').doc(localStorage.getItem('Email')).collection('Posts').orderBy('DataPub','desc').get().then(snapshot=>{
     
    ulList.innerHTML='';
    
    snapshot.docs.forEach(object=>{
        const Data = object.data();
        const propertyInArray = Object.entries(object.data());
        const reference = ['referenceId',object.id];
        propertyInArray.push(reference);
        if(!localStorage.getItem(object.id)){
          localStorage.setItem(object.id,JSON.stringify(propertyInArray));
        }
        let li = document.createElement('li');
        li.setAttribute('referenceId',object.id);
        
        let pNome = document.createElement('p');
        pNome.classList.add('NomePub');
  
        let pTexto = document.createElement('p');
        pTexto.classList.add('TextoPub');
  
        let pData = document.createElement('p');
  
  
        let pLink = document.createElement('p');
        let aLink = document.createElement('a');
  
        let img = document.createElement('img');
  
        let pPrivacidade = document.createElement('p');
        pPrivacidade.classList.add('privacidadePub');
  
        let aAudio, vVideo;
        let sSource;
    
        if(Data.Nome){
          pNome.innerText = Data.Nome;
        }
        if(Data.Texto){
          pTexto.innerText = Data.Texto;
        }
        if(Data.DataPub){
          pData.innerText = Data.DataPub;
        }
  
        if(Data.TipoMidia.includes('image')){
          aLink.setAttribute('href',Data.MidiaUrl);
          aLink.setAttribute('target','_black');
          img.setAttribute('src',Data.MidiaUrl);
          aLink.appendChild(img);
        }
        else if(Data.TipoMidia.includes('audio')){
          aAudio = document.createElement('audio');
          sSource = document.createElement('source');

          aAudio.setAttribute('controls','');
          sSource.setAttribute('src',Data.MidiaUrl);
          aAudio.append(sSource);
        }
        else if(Data.TipoMidia.includes('video')){
          vVideo = document.createElement('video');
          vVideo.setAttribute('controls','');
          vVideo.setAttribute('name','media');
          sSource = document.createElement('source');
          sSource.setAttribute('src',Data.MidiaUrl);
          vVideo.append(sSource);
        }
        else{
          pLink.innerText = Data.NomeMidia;
          aLink.setAttribute('href',Data.MidiaUrl);
          aLink.setAttribute('target','_black');
          aLink.append(pLink);
        }
  
        if(Data.Privacidade){
          pPrivacidade.innerText = Data.Privacidade;
        }
  
        li.appendChild(pNome);
        li.appendChild(pTexto);
        li.appendChild(aLink);
        if(aAudio){
          li.append(aAudio);
        }
        if(vVideo){
          li.append(vVideo);
        }
        li.appendChild(pData);
        li.appendChild(pPrivacidade);
        li.addEventListener("click",function(){
        
        li.classList.toggle('active');
        if(li.classList.contains('active')){
          GroupPosts.push(JSON.parse(localStorage.getItem(li.getAttribute('referenceId'))));
        }else{
           GroupPosts = GroupPosts.filter((item) => item[8][1] !== JSON.parse(localStorage.getItem(li.getAttribute('referenceId')))[8][1]);
        }
          var liList = document.querySelectorAll('.Wrapper_pubs ul li.active');

          if(liList.length){
            btnCreateList.style.display='unset';
          }else{
            btnCreateList.style.display='none';
          }
        })
        ulList.append(li);
    })
    
  });
}
getPubs();


firebase.firestore().collection('Grupos').get().then(snapshot=>{
  snapshot.docs.forEach(object=>{
      const data = object.data()['data'];
      if(data.DonoEmail == localStorage.getItem('Email')){
        let span = document.createElement('span');

        const dados = `
          <label for="rbPub">${data.NomeGrupo}</label>
          <input type="checkbox" name="" class="checkBoxGroup" value="${data.NomeGrupo}">
        `
        span.innerHTML = dados;
        divRadios.append(span);
      }
  })
})



firebase.firestore().collection('PostPublico').onSnapshot(snapshot =>{

  snapshot.docChanges().forEach(object =>{
      if(object.type == 'added'){
        ulList.innerHTML='';
        getPubs();
      }
      if(object.type == 'modified'){
      
      }
      if(object.type == 'removed'){
        ulList.innerHTML='';
        getPubs();
      }
  })
});

function createList(){
  listContainer.style.display = 'flex';
  let txtLista = document.querySelector('#txtLista')

  const btnCancelar = document.querySelector('.Wrapper_List .btnOption button.btnCancelar');
  btnCancelar.onclick = function(){
    txtLista.value ="";
    listContainer.style.display = 'none';

  }

  const btnCriar = document.querySelector('.Wrapper_List .btnOption button.btnCriar');
  btnCriar.onclick = function(){
    listContainer.style.display = 'none';
    addList();
  }
}

function addList(){
  loadingContainer.style.display = 'flex';

  let txtLista = document.querySelector('#txtLista');
  let Privacidade;

  if(rbPubList.checked){
    Privacidade = 'Público'; 
  }else{
    Privacidade = 'Privado'; 
  }

  
  let data = {};
  let Lista = {};
  let ColecaoLista = {};
 GroupPosts.forEach((Group,index)=>{
   for(let g of Group){
      data[g[0]] = g[1];
   }
   Lista[index]=data;
 })

 ColecaoLista['Name'] = localStorage.getItem('Name');
 ColecaoLista['Email'] = localStorage.getItem('Email');
 ColecaoLista['Titulo'] = txtLista.value;
 ColecaoLista['Privacidade'] = Privacidade;
 ColecaoLista['DataLista'] = new Date().toLocaleString();
 ColecaoLista['Dados'] = Lista;

 txtLista.value ="";

 if(rbPubList.checked){
  firebase.firestore().collection('ListasPublicas').add(ColecaoLista).then(()=>{
      // console.log('Listas Publicadas')
  })
 }
  
  firebase.firestore().collection('Data').doc(localStorage.getItem('Email')).collection('Lista').add(ColecaoLista).then(()=>{
    loadingCarregando.style.display='none';
    loadingConcluido.style.display='flex';
    
    loadingContainer.addEventListener('click',function(){
      loadingContainer.style.display='none';
      loadingCarregando.style.display='flex';
      loadingConcluido.style.display='none';
    });

  })
}

btnCreateList.addEventListener('click',createList);

inputLista.onfocus = inputLista.onblur = function(){
  lbLista.classList.toggle('active');
}









firebase.firestore().collection('Data').doc(localStorage.getItem('Email')).collection('Posts').onSnapshot(snapshot =>{

  snapshot.docChanges().forEach(object =>{
      if(object.type == 'added'){
        ulList.innerHTML='';
        getPubs();
      }
      if(object.type == 'modified'){
      
      }
      if(object.type == 'removed'){
        ulList.innerHTML='';
        getPubs();
      }
  })
})

//PUBLICAR
inputFile.onchange = function(event){
  var arquivo = event.target.files[0];
  if(arquivo.name){
    inputLabel.innerText = arquivo.name;
    nameFile = arquivo.name;
    typeFile = arquivo.type;
  }

  if(arquivo.type.includes('image')){
      const reader = new FileReader();
      reader.readAsDataURL(arquivo);
      
      reader.onload = function(){
      base64 = reader.result.split('base64,')[1];
    }
  }else{
    myArquivo = arquivo;
  }
}


function addPub(){
  loadingContainer.style.display = 'flex';
      let Privacidade;
      
      if(rbPub.checked){
        Privacidade = rbPub.value;
      }else{
        Privacidade = rbPriv.value;
      }

      if(base64){
        const id = Math.floor(Date.now() * Math.random()).toString(36);
        ref.child('imagem '+id).putString(base64,'base64',{contentType:'image/png'}).then(snapshot =>{
          ref.child('imagem '+id).getDownloadURL().then(url=>{
             
                  var email = localStorage.getItem('Email');
                  var data = {
                    Nome: localStorage.getItem('Name'),
                    Email: email,
                    Privacidade,
                    Texto: txtArea.value,
                    MidiaUrl:''+url,
                    TipoMidia: typeFile,
                    NomeMidia:nameFile,
                    DataPub: new Date().toLocaleString(),
                    idPub: Math.floor(Date.now() * Math.random()).toString(36),
                  }


                  //Posts Publicos e Privados
                  firebase.firestore().collection('Data').doc(email).collection('Posts').add(data).then(()=>{
                    loadingCarregando.style.display='none';
                    loadingConcluido.style.display='flex';
                    loadingContainer.addEventListener('click',function(){
                      loadingContainer.style.display='none';
                      loadingCarregando.style.display='flex';
                      loadingConcluido.style.display='none';
                    });
                  })
                  
                  //Posts Publicos
                  if(rbPub.checked){
                    data['Comentarios'] = {};
                    firebase.firestore().collection('PostPublico').add(data).then(()=>{
                   }) 
                  }
                  
                 

                       //checked RB
                       var checkBoxGroup=document.querySelectorAll('.checkBoxGroup');
                       checkBoxGroup.forEach(checkbox=>{
                       
                       if(checkbox.checked){
                           const NomeGrupo = checkbox.value;
                           firebase.firestore().collection('Grupos').get().then(snapshot=>{
                             snapshot.docs.forEach(object=>{
     
                              
                               if(object.data()['data'].NomeGrupo == NomeGrupo){
               
                                 if(group){
                                   group = {};
                                 }
                                 
                                 group['data'] = object.data().data;
                                 
                                 if(group){
                                   const newIntegrante = data;
                                 
                                   let index=0;
                                   for(let int in group['data'].publicacoes){
                                     group['data'].publicacoes[index] = group['data'].publicacoes[int];
                                     index++;
                                  } 
                                  group['data'].publicacoes[index] = newIntegrante;
                       
                                  group['data'] = group['data'];
                       
                                 }
                                 
               
                                 firebase.firestore().collection('Grupos').doc(object.id).update(group).then(()=>{
                               
                                 })
               

                               }
                             })
                 
                           })
                         }
                       })



           })
        })
      }else if(myArquivo){
        const id = Math.floor(Date.now() * Math.random()).toString(36);
        ref.child('ficheiro '+id).put(myArquivo).then(snapshot =>{
          ref.child('ficheiro '+id).getDownloadURL().then(url=>{

                  var email = localStorage.getItem('Email');
                  var data = {
                    Nome: localStorage.getItem('Name'),
                    Email: email,
                    Privacidade,
                    Texto: txtArea.value,
                    MidiaUrl:''+url,
                    TipoMidia: typeFile,
                    NomeMidia:nameFile,
                    DataPub: new Date().toLocaleString(),
                    idPub: Math.floor(Date.now() * Math.random()).toString(36),

                  }
                 
                  //Posts Publicos e Privados
                  firebase.firestore().collection('Data').doc(email).collection('Posts').add(data).then(()=>{
                    loadingCarregando.style.display='none';
                    loadingConcluido.style.display='flex';
                    loadingContainer.addEventListener('click',function(){
                      loadingContainer.style.display='none';
                      loadingCarregando.style.display='flex';
                      loadingConcluido.style.display='none';
                    });
                  })

                  //Posts Publicos
                  if(rbPub.checked){
                    data['Comentarios'] = {};
                    firebase.firestore().collection('PostPublico').add(data).then(()=>{
                    }) 
                  }

                       //checked RB
                       var checkBoxGroup=document.querySelectorAll('.checkBoxGroup');
                       checkBoxGroup.forEach(checkbox=>{
                       
                       if(checkbox.checked){
                           const NomeGrupo = checkbox.value;
                           firebase.firestore().collection('Grupos').get().then(snapshot=>{
                             snapshot.docs.forEach(object=>{
     

                               if(object.data()['data'].NomeGrupo == NomeGrupo){
               
                                 group = {};
                                 group['data'] = object.data().data;
                                 
                                 if(group){
                                   const newIntegrante = data;
                                 
                                   let index=0;
                                   for(let int in group['data'].publicacoes){
                                     group['data'].publicacoes[index] = group['data'].publicacoes[int];
                                     index++;
                                  } 
                                  group['data'].publicacoes[index] = newIntegrante;
                       
                                  group['data'] = group['data'];
                       
                                 }
                                 
               
                                 firebase.firestore().collection('Grupos').doc(object.id).update(group).then(()=>{
                               
                                 })
               

                               }
                             })
                 
                           })
                         }
                       })



          })
        })
      }else{

              var email = localStorage.getItem('Email');
              var data = {
                    Nome: localStorage.getItem('Name'),
                    Email: email,                
                    Privacidade,
                    Texto: txtArea.value,
                    MidiaUrl:'',
                    TipoMidia: 'Texto',
                    NomeMidia:'',
                    DataPub: new Date().toLocaleString(),
                    idPub: Math.floor(Date.now() * Math.random()).toString(36),

                  }

                  //Posts Publicos e Privados
                  firebase.firestore().collection('Data').doc(email).collection('Posts').add(data).then(()=>{
                    loadingCarregando.style.display='none';
                    loadingConcluido.style.display='flex';
                    loadingContainer.addEventListener('click',function(){
                      loadingContainer.style.display='none';
                      loadingCarregando.style.display='flex';
                      loadingConcluido.style.display='none';
                    });

                  //Posts Publicos
                  if(rbPub.checked){
                    data['Comentarios'] = {};
                    firebase.firestore().collection('PostPublico').add(data).then(()=>{
                    }) 
                  }



                  //checked RB
                  var checkBoxGroup=document.querySelectorAll('.checkBoxGroup');
                  checkBoxGroup.forEach(checkbox=>{
                  
                  if(checkbox.checked){
                      const NomeGrupo = checkbox.value;
                      firebase.firestore().collection('Grupos').get().then(snapshot=>{
                        snapshot.docs.forEach(object=>{

  
                          if(object.data()['data'].NomeGrupo == NomeGrupo){
          
                            group = {};
                            group['data'] = object.data().data;
                            
                            if(group){
                              const newIntegrante = data;
                            
                              let index=0;
                              for(let int in group['data'].publicacoes){
                                group['data'].publicacoes[index] = group['data'].publicacoes[int];
                                index++;
                             } 
                             group['data'].publicacoes[index] = newIntegrante;
                  
                             group['data'] = group['data'];
                  
                            }
                            
          
                            firebase.firestore().collection('Grupos').doc(object.id).update(group).then(()=>{
                          
                            })
          

                          }
                        })
            
                      })
                    }
                  })

                 




              })

      }
}


btnPublicar.addEventListener("click",addPub);
