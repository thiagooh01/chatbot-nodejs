const watson = require('watson-developer-cloud/assistant/v1'); // watson sdk
const prompt = require('prompt-sync')();
require('dotenv').config();
const workspace_id= process.env.workspace_id

const chatbot = new watson({
    'version': process.env.version,
    'url': process.env.ASSISTANT_IAM_URL,
    'iam_apikey': process.env.ASSISTANT_IAM_APIKEY,
    'iam_url': 'https://iam.bluemix.net/identity/token'
    
  });
 
  var payload = {
    workspace_id: process.env.workspace_id,
    context: {},
    input: {}
  };

    let FimDeConversa = false;

   //Começando a conversação com a mensagem vazia;
   chatbot.message(payload, function trataResposta(err, resposta){ //Não alterar essa linha configs novas

     if(err){
        console.log(err);
        return;
    }

  //Detecta a intenção do usuario
    if(resposta.intents.length > 0){
      console.log('Eu detectei a intençao: ' + resposta.intents[0].intent);
      if(resposta.intents[0].intent == 'despedida'){
      FimDeConversa = true;
    }
 }

 
    // exibe a resposta do dialogo,caso exista
    if(resposta.output.text.length > 0){
        console.log(resposta.output.text[0])
    }
    if(!FimDeConversa){
      const MensagemUsuario = prompt('>>');
      chatbot.message({
      workspace_id,
      input: {text: MensagemUsuario},
      context: resposta.context
    },trataResposta);
  }


  })