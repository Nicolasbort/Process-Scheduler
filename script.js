function controle_visivel(elem, visivel) {
  let color = elem.getAttribute('color');
  let icon = getById('options_view_' + visivel + '_icon');
  if (elem.getAttribute('status') == 'show') {
    elem.setAttribute('status', 'hide');
    elem.classList.remove(color + '-text');
    elem.classList.add('grey-text');
    icon.classList.remove(color + '-text');
    icon.classList.add('grey-text');
    $('[id^="' + visivel + '"]').hide();
  } else {
    elem.setAttribute('status', 'show');
    elem.classList.remove('grey-text');
    elem.classList.add(color + '-text');
    icon.classList.remove('grey-text');
    icon.classList.add(color + '-text');
    $('[id^="' + visivel + '"]').show();
  }
}


function adicionar_processo() {
  try {
    let descricao = document.getElementById('add_processo_descricao').value;
    let clocks_totais = parseInt(document.getElementById('add_clocks_totais').value);
    let clock_entrada = parseInt(document.getElementById('add_clock_entrada').value);
    if (descricao != "" && clocks_totais > 0 && clock_entrada > 0) {
      let novo_processo = new ProcessBox('div_processos', codigo, descricao, clocks_totais, clock_entrada);
      time.update_max(parseInt(clocks_totais));
      fcfs.add_processo(novo_processo);
      sjf.add_processo(novo_processo);
      rr.add_processo(novo_processo);
      codigo += 1;
      clearValue('add_processo_descricao');
      clearValue('add_clocks_totais');
      clearValue('add_clock_entrada');
      focusById('add_processo_descricao');
      show_toast('success', 'Processo &nbsp;<i><b>' + descricao + '</b></i>&nbsp; adicionado com sucesso!');
      if (getById('footer').style.display == 'none') {
        getById('footer').style.display = 'block';
      }
    } else {
      show_toast('error', 'Preencha todas as informações!');
    }
  } catch (e) {
    show_toast('error', e);
  }
}

let log = [];

window.onload = function(){
    var elems  = document.querySelectorAll("input[type=range]");
    M.Range.init(elems);
}

function gerarSimulacao() {
  //MONTANDO FCFS
  //ordenando por clock de entrada
  fcfs.processos.sort(function sortByClockEntrada(a, b) {
    return a.clock_entrada - b.clock_entrada;
  });
  //montando log
  function montarLogFCFS(element, index, array) {
    //console.log(element);
    let c = 0;
    while (element.clocks_totais > c) {
      //console.log(index);
      fcfs.log.push(index);
      c += 1;
    }
  }
  fcfs.processos.forEach(montarLogFCFS);

  //MONTANDO RR
  //ordenando por clock de entrada
  rr.processos.sort(function sortByClockEntrada(a, b) {
    return a.clock_entrada - b.clock_entrada;
  });
  //montando log
  let i = 0;
  while(rr.processos.clockPendentes('rr')){
    if(rr.processos[i].clocks_rr < rr.processos[i].clocks_totais){
      let j = 0;
      while(j < 2){
        if(rr.processos[i].clocks_rr < rr.processos[i].clocks_totais){
          rr.processos[i].clocks_rr += 1;
          rr.log.push(i);
        }
        j += 1;
      }
    }
    if(i < rr.processos.length - 1){
      i += 1;
    }else{
      i = 0;
    }
  }
  //revertendo alterações ( voltando clocks para 0 )
  function revertChangesRR(element, index, array) {
    element.clocks_rr = 0;
  }
  fcfs.processos.forEach(revertChangesRR);

  //MONTANDO SJF
  //ordenando por clock de entrada
  sjf.processos.sort(function sortByClockEntrada(a, b) {
    return a.clock_entrada - b.clock_entrada;
  });
  //montando log
  function montarLogSJF(element, index, array){
    if(element.clock_entrada >= sjf.log.length - 1){
      //Adicionar no final todos os clocks
      let c = element.clocks_totais;
      while(c--){
        sjf.log.push(index);
      }
    }else{
      //Entra no loop
      let ce = element.clock_entrada;
      let old = null;
      let size = 0;
      let found = false;
      while(ce < sjf.log.length){
        if(old == null){
          old = sjf.log[ce];
        }else{
          if(old != sjf.log[ce]){
            if(ce + 1 < sjf.log.length){
              if(element.clocks_totais < sjf.processos[sjf.log[ce + 1]].clocks_totais){
                //Adicionar em CE
                let c = element.clocks_totais;
                while(c--){
                  sjf.log.insert(ce,index);
                }
                found = true;
                break;
              }else{
                old = sjf.log[ce];
                size = 0;
              }
            }else{
              //Adicionar no final todos os clocks
              let c = element.clocks_totais;
              while(c--){
                sjf.log.push(index);
              }
            }
          }else{
            size += 1;
          }
          if(size > element.clocks_totais){
            //Adicionar em clodk de entrada
            let c = element.clocks_totais;
            while(c--){
              sjf.log.insert(ce,element.clock_entrada);
            }
            found = true;
            break;
          }
        }
        ce += 1;
      }
      if(!found){
        //Adicionar no final todos os clocks
        let c = element.clocks_totais;
        while(c--){
          sjf.log.push(index);
        }
      }
    }
  }
  sjf.processos.forEach(montarLogSJF);


  //adicionando beiradas
  fcfs.log.push(-99);
  fcfs.log.unshift(-99);
  rr.log.push(-99);
  rr.log.unshift(-99);
  sjf.log.push(-99);
  sjf.log.unshift(-99);

  console.log(fcfs.log);
  console.log(sjf.log);
  console.log(rr.log);

  getById('footer_player').style.display = 'block';
  getById('footer_begin').style.display = 'none';
  getById('sidebar_add_processos').style.display = 'none';

}

let codigo = 0;

let fcfs = new ProcessadorFCFS();
let sjf = new ProcessadorSJF();
let rr = new ProcessadorRR();

let time = new Barra_tempo();


//Está rodando
window.setInterval(function () {
  if (time.status == 'play') {
    if(time.atual < time.max){
      time.mudar_tempo();
      time.change_atual();
    }else{
      time.change_status('pause');
    }
  }
}, 250);

//Le o arquivo de texto e adiciona os processos
const input = document.querySelector('input[type="file"]');
input.addEventListener('change', function(e){
  try{
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    let n = 0;
    reader.onload = function (){
      let string = reader.result;
      //Separa os processos por '\n'
      string = string.split('\n');
      for (let i=0; i < string.length - 1; i++){
        //Quebrando texto
        let string_split = string[i].split(' ');
        let descricao = string_split[0];
        let clock_entrada = string_split[1]; 
        let clocks_totais = string_split[2];
        //Adiciona o novo processo
        let novo_processo = new ProcessBox('div_processos', codigo, descricao, clocks_totais, clock_entrada);
        //Atualizando informações
        time.update_max(clocks_totais);
        fcfs.add_processo(novo_processo);
        sjf.add_processo(novo_processo);
        rr.add_processo(novo_processo);
        codigo += 1;	
        n += 1;
      }
      console.log(n);
      show_toast('success','Arquivo lido com sucesso');
      show_toast('success','<b>'+n+'</b>&nbsp;processos lidos e adicionados');
      if (getById('footer').style.display == 'none') {
        getById('footer').style.display = 'block';
      }
    }
	}catch(e){
    show_toast('error',e);
  }
}, false);