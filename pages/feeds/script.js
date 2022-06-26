import {_Init,logout} from '../main/script.js'

var ulList = document.querySelector('.Wrapper_pubs ul');
var btnCreateList = document.getElementById('createMyList');
var GroupPosts = [];
var loadingContainer = document.querySelector('.loading-container');
var loadingCarregando = document.querySelector('.loading-container p.carregando');
var loadingConcluido = document.querySelector('.loading-container p.concluido');
var inputLista = document.querySelector('#txtLista');
var lbLista = document.querySelector('.Wrapper_List label.lbLista');
var listContainer = document.querySelector('.Container_List');
const rbPriv = document.getElementById('rbPriv');
const rbPub = document.getElementById('rbPub');
const btnSairHeader = document.getElementById('btnSairHeader');

_Init();
function getPubs(){
  firebase.firestore().collection('PostPublico').orderBy('DataPub','desc').get().then(snapshot=>{
    
    ulList.innerHTML='';
    
    snapshot.docs.forEach(object=>{
        const Data = object.data();
        const Comentarios = object.data().Comentarios;
        const propertyInArray = Object.entries(object.data());
        const reference = ['referenceId',object.id];
        const divComents = document.createElement('div');
        divComents.classList.add('coments');
       

        propertyInArray.push(reference);
        if(!localStorage.getItem(object.id)){
          localStorage.setItem(object.id,JSON.stringify(propertyInArray));
        }

        if(Comentarios){
          for(let coment in Comentarios){
            const pNameComent = document.createElement('p');
            pNameComent.classList.add('NameComent');
            pNameComent.innerText = Comentarios[coment].Nome;

            let pComentario = document.createElement('p');
            pComentario.classList.add('ComentText');
            pComentario.innerText = Comentarios[coment].Comentario;

            let divComent = document.createElement('div');
            divComent.classList.add('wrapper_coment');
            
            divComent.append(pNameComent);
            divComent.append(pComentario);
            divComents.append(divComent);

          }
        }

        let input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Escrever comentario...'
        input.id = 'comentario';

        let btnComentar = document.createElement('button');
        btnComentar.innerText = 'Comentar';
        btnComentar.classList.add('btnComentar');

        let li = document.createElement('li');
        li.setAttribute('referenceId',object.id);
        li.setAttribute('referenceIdPub',object.data().idPub);

        let labelSelect = document.createElement('label');
        labelSelect.innerText = 'selecionar';
        
        let inputChecked = document.createElement('input');
        inputChecked.type='checkbox';
        inputChecked.id = 'checkboxInput';
        labelSelect.append(inputChecked);

        let divSelect = document.createElement('div');
        divSelect.classList.add('selectDiv');

        
        
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
        divSelect.appendChild(pNome);
        divSelect.appendChild(labelSelect);

        li.appendChild(divSelect);
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
        li.appendChild(input);
        li.appendChild(btnComentar);
        li.appendChild(divComents);
        
        inputChecked.addEventListener("click",function(e){
            const li = e.path[3];
            li.classList.toggle('active');
            const btnChecked = li.children[0].childNodes[1].childNodes[1];

            if(li.classList.contains('active') && btnChecked.checked){
              GroupPosts.push(JSON.parse(localStorage.getItem(li.getAttribute('referenceId'))));
            }else{
              GroupPosts = GroupPosts.filter((item) => item[8][1] !== JSON.parse(localStorage.getItem(li.getAttribute('referenceId')))[8][1]);
            }
        })

        li.addEventListener("click",function(){
  
          var liList = document.querySelectorAll('.Wrapper_pubs ul li.active');

          if(liList.length){
            btnCreateList.style.display='unset';
          }else{
            btnCreateList.style.display='none';
          }


          btnComentar.addEventListener('click',function(){
            const comentario = input.value;
            const data = {
              Nome: localStorage.getItem('Name'),
              Comentario: comentario,
              DataComentario: new Date().toLocaleString(),
            }
            let Comentarios = {};
            const id = Math.floor(Date.now() * Math.random()).toString(36);
            Comentarios[id] = data;

            firebase.firestore().collection('PostPublico').orderBy('DataPub','desc').get().then(snapshot=>{
              snapshot.docs.forEach(object=>{
                  
                  if(object.data().Comentarios){
                    if(li.getAttribute('referenceIdPub') == object.data().idPub){

                      const data = {
                        Nome: localStorage.getItem('Name'),
                        Comentario: comentario,
                        DataComentario: new Date().toLocaleString(),
                      }
    
                      let Comentarios2 = object.data().Comentarios
    
                      const id2 = Math.floor(Date.now() * Math.random()).toString(36);
                      Comentarios2[id2] = data;
                      Comentarios = Comentarios2;
                     
                      firebase.firestore().collection('PostPublico').doc(li.getAttribute('referenceId')).update({Comentarios: Comentarios}).then(()=>{
                          input.value = '';
                      });

                    }

                  }else{
                    firebase.firestore().collection('PostPublico').doc(li.getAttribute('referenceId')).update({Comentarios: Comentarios}).then(()=>{
                      input.value = '';
                    })
                  }
              })
            })

           
          })
  
        })
        ulList.append(li);
    })
    
  });
}
getPubs();



firebase.firestore().collection('PostPublico').onSnapshot(snapshot =>{

  snapshot.docChanges().forEach(object =>{
      if(object.type == 'added'){
        ulList.innerHTML='';
        getPubs();
      }
      if(object.type == 'modified'){
        ulList.innerHTML='';
        getPubs();
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

  if(rbPub.checked){
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

 if(rbPub.checked){
  firebase.firestore().collection('ListasPublicas').add(ColecaoLista).then(()=>{

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

btnSairHeader.addEventListener('click',logout);
