import {_Init} from '../main/script.js'
var notificacoesConteiner = document.getElementById('notificacoesConteiner');
let isContent;

_Init();


firebase.firestore().collection('Data').doc(localStorage.getItem('Email')).collection('Pedido_de_Adesao').get().then(snapshot=>{

  if(isContent){
    notificacoesConteiner.innerHTML='';
  }

  snapshot.docs.forEach(object=>{
      const data = object.data();
      isContent = data;
      if(data.DonoEmail == localStorage.getItem('Email')){
          const div = document.createElement('div');
          const a = document.createElement('a');
          a.innerText = 'Aceitar';
          a.setAttribute('referenceIdPedido',object.id);
          div.classList.add('alert');
          div.classList.add('alert-primary');
          div.classList.add('alert-dismissible');
          div.classList.add('text-white');
          div.setAttribute('role','alert');

          const dados = `
            <span class="text-sm">${data.Nome}<a href="javascript:;" class="alert-link text-white"> fez uma pedido de adesão ao seu grupo </a>: - ${data.NomeGrupo} - </span>
            <button type="button" class="btn-close text-lg py-3 opacity-10" data-bs-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> 
          `
          a.addEventListener("click",function(){
            
            if(!a.innerText.includes('Adicionado')){
          
            let group;
            let referenceIdPedido = a.getAttribute('referenceIdPedido');
          
            firebase.firestore().collection('Grupos').get().then(snapshot=>{
              snapshot.docs.forEach(object=>{

                if(object.data()['data'].NomeGrupo == data.NomeGrupo){

                  group = {};
                  group['data'] = object.data().data;
                  
                  if(group){
                    const newIntegrante = {
                      Nome: data.Nome,
                      Email: data.Email,
                    }
                  
                    let index=0;
                    for(let int in group['data'].Integrantes){
                      group['data'].Integrantes[index] = group['data'].Integrantes[int];
                      index++;
                   } 
                   group['data'].Integrantes[index] = newIntegrante;
        
                   group['data'] = group['data'];
        
                  }
                  
                  firebase.firestore().collection('Grupos').doc(object.id).update(group).then(()=>{
                      a.innerText='Pedido Aceite';
                      
                      firebase.firestore().collection('Data').doc(localStorage.getItem('Email')).collection('Pedido_de_Adesao').doc(referenceIdPedido).delete().then(()=>{
                        a.innerText='Adicionado';
                      })
                  })

                 
                }
            
              })
  
            })

          }
  
            
          })

          div.innerHTML = dados;
          div.append(a);
          notificacoesConteiner.append(div);
      }
  })




})


// snapshot.docChanges().forEach(object =>{
//   if(object.type == 'added'){
//     //bntInfo.click();
//   }
//   if(object.type == 'modified'){
//    // bntInfo.click();
//   }
//   if(object.type == 'removed'){
//   }
// })