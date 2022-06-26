import {_Init} from '../main/script.js'
var ulList = document.querySelector('.Wrapper_pubs ul');
_Init();


firebase.firestore().collection('Grupos').get().then(snapshot=>{
    
  ulList.innerHTML= '';

    snapshot.docs.forEach(object=>{
          const UserOn = localStorage.getItem('Email');
          let UserConvidado;
          const data = object.data()['data'];
          
          
          for(let pubIndex in data.Integrantes){
            if(data.Integrantes[pubIndex].Email === UserOn){
              UserConvidado = data.Integrantes[pubIndex].Email;
            }
          }

          
          for(let pubIndex in data.publicacoes){
           
           if(pubIndex!=0){

            const Data = data.publicacoes[pubIndex];
            
        if(UserOn == data.DonoEmail || UserConvidado == UserOn ){
           
            let li = document.createElement('li');
         
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
            pPrivacidade.innerText = data.NomeGrupo;
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
      
          ulList.append(li);
    
            }else{
              // ulList.innerHTML='';
              // let li = document.createElement('li');
              // let pText = document.createElement('p');
              // pText.innerText='Voce ainda não adiriu um grupo!!';
              // li.append(pText);
              // ulList.append(li);
            }
           }

         }
          
          
      })
    }) 