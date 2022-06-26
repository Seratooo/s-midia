import {_Init} from '../main/script.js'

const Wrapper_pubs = document.querySelector('.Wrapper_pubs ul');
_Init();


firebase.firestore().collection('ListasPublicas').orderBy('DataLista','desc').get().then(snapshot=>{
    
  Wrapper_pubs.innerHTML= '';

    snapshot.docs.forEach(object=>{
        
          const Data = object.data();
          const li = document.createElement('li');
          const divTexts = document.createElement('div');
          divTexts.classList.add('Texts');

          const pNome = document.createElement('p');
          pNome.classList.add('NomeListPub');
          const pTexto = document.createElement('p');
          pTexto.classList.add('TextoListPub');
          const pPrivacidade = document.createElement('p');
          pPrivacidade.classList.add('privacidadeListPub');

          const divMyPubs = document.createElement('div');
          divMyPubs.classList.add('MyPubs');

          pNome.innerText = Data.Name;
          pTexto.innerText = Data.Titulo;
          pPrivacidade.innerText = Data.Privacidade;

          divTexts.append(pNome);
          divTexts.append(pTexto);
          li.append(divTexts);
          li.append(pPrivacidade);

          
        const Dados = Data.Dados;
        for(let indexDado in Dados){
          let Dado = Data.Dados[indexDado];
          const divPubs = document.createElement('div');
          divPubs.classList.add('MyPubs_Wrapper');

          let pNomeElement = document.createElement('p');
          pNomeElement.classList.add('NomePub');
    
          let pTextoElement = document.createElement('p');
          pTextoElement.classList.add('TextoPub');
    
          let pDataElement = document.createElement('p');
    
    
          let pLinkElement = document.createElement('p');
          let aLinkElement = document.createElement('a');
    
          let imgElement = document.createElement('img');
    
          let pPrivacidadeElement = document.createElement('p');
          pPrivacidadeElement.classList.add('privacidadePub');
    
          let aAudioElement, vVideoElement;
          let sSourceElement;
      
          if(Dado.Nome){
            pNomeElement.innerText = Dado.Nome;
          }
          if(Dado.Texto){
            pTextoElement.innerText = Dado.Texto;
          }
          if(Dado.DataPub){
            pDataElement.innerText = Dado.DataPub;
          }
    
          if(Dado.TipoMidia.includes('image')){
            aLinkElement.setAttribute('href',Dado.MidiaUrl);
            aLinkElement.setAttribute('target','_black');
            imgElement.setAttribute('src',Dado.MidiaUrl);
            aLinkElement.appendChild(imgElement);
          }
          else if(Dado.TipoMidia.includes('audio')){
            aAudioElement = document.createElement('audio');
            sSourceElement = document.createElement('source');
  
            aAudioElement.setAttribute('controls','');
            sSourceElement.setAttribute('src',Dado.MidiaUrl);
            aAudioElement.append(sSourceElement);
          }
          else if(Dado.TipoMidia.includes('video')){
            vVideoElement = document.createElement('video');
            vVideoElement.setAttribute('controls','');
            vVideoElement.setAttribute('name','media');
            sSourceElement = document.createElement('source');
            sSourceElement.setAttribute('src',Dado.MidiaUrl);
            vVideoElement.append(sSourceElement);
          }
          else{
            pLinkElement.innerText = Dado.NomeMidia;
            aLinkElement.setAttribute('href',Dado.MidiaUrl);
            aLinkElement.setAttribute('target','_black');
            aLinkElement.append(pLinkElement);
          }
    
          if(Dado.Privacidade){
            pPrivacidadeElement.innerText = Dado.Privacidade;
          }
    
          divPubs.appendChild(pNomeElement);
          divPubs.appendChild(pTextoElement);
          divPubs.appendChild(aLinkElement);
          if(aAudioElement){
            divPubs.append(aAudioElement);
          }
          if(vVideoElement){
            divPubs.append(vVideoElement);
          }
          divPubs.appendChild(pDataElement);
          divPubs.appendChild(pPrivacidadeElement);
  
          divMyPubs.append(divPubs);
        }
        
        li.addEventListener('click',()=>{
          li.classList.toggle('active');
        });

        li.append(divMyPubs);
        Wrapper_pubs.append(li);
      })
    })   
