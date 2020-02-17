class ProcessBox {
  //Definição das variáveis internas
  constructor(father_elem_id, codigo, descricao, clocks_totais, clock_entrada) {
    //Variaveis algoritmicas
    this.codigo = codigo;
    this.descricao = descricao;
    this.clocks_totais = clocks_totais;
    this.clock_entrada = clock_entrada;
    this.clocks_fcfs = 0;
    this.clocks_sjf = 0;
    this.clocks_rr = 0;
    //Status
    this.status = 'esperando';
    this.status_fcfs = 'esperando';
    this.status_sjf = 'esperando';
    this.status_rr = 'esperando';
    //Criando visual
    this.create_box(father_elem_id);
    //Variaveis visuais
    this.bar_fcfs = getById('fcfs_bar_' + codigo);
    this.bar_sjf = getById('sjf_bar_' + codigo);
    this.bar_rr = getById('rr_bar_' + codigo);
    this.small_status = getById('status_' + codigo);
    this.small_status_fcfs = getById('status_fcfs_' + codigo);
    this.small_status_sjf = getById('status_sjf_' + codigo);
    this.small_status_rr = getById('status_rr_' + codigo);
  }

  create_box(father_elem_id) {
    //Recebendo código interno
    let cod = this.codigo;
    //Encontrando elemento pai
    let pai = getById(father_elem_id);
    //Montando box principal
    let box = createElem('div')
    box.classList.add('col', 's6', 'm3', 'l3', 'blue-grey','lighten-4', 'card');
    box.style.border = '2.5px solid #26363e';
    box.style.boxShadow = 'none';
    box.id = 'div_process_'+cod;
    //Adicionando descricao
    let descricao = createElem('b');
    descricao.innerHTML = this.descricao+"&nbsp;&nbsp;&nbsp;<br><small><b><i>E</i></b>: "+this.clock_entrada+" <b><i>C</i></b>: "+this.codigo+"</small>"
    descricao.classList.add('truncate');
    box.appendChild(descricao);
    //FCFS
    box.appendChild(this.create_bar('fcfs', 'teal', box));
    //SJF
    box.appendChild(this.create_bar('sjf', 'blue', box));
    //RR
    box.appendChild(this.create_bar('rr', 'orange', box));
    //Quebra de linha
    box.appendChild(createElem("br"));
    //Adicionando ao elemento pai
    pai.appendChild(box);
  }

  create_bar(type, color, box) {
    let cod = this.codigo;
    /* caixa da barra */
    let div = createElem('div');
    div.classList.add('progress', color, 'darken-4');
    div.style.paddingBottom = '0px';
    div.style.marginBottom = '0px';
    div.id = type + '_div_' + cod;
    /* verificando display */
    if (getById('options_view_' + type).getAttribute('status') == 'hide') {
      div.style.display = 'none';
    }
    box.appendChild(div);
    /* barra */
    let bar = createElem('div');
    bar.classList.add('determinate', color, 'lighten-2');
    bar.style.width = '0%';
    bar.id = type + '_bar_' + cod;
    div.appendChild(bar);
    /* linha de status e texto */
    let row = createElem('row');
    row.id = type;
    div.after(row);
    /* texto */
    let text = createElem('small');
    text.appendChild(createText('0/' + this.clocks_totais));
    text.classList.add(color + '-text', 'text-darken-2', 'left');
    text.id = type + '_txt_' + cod;
    if (getById('options_view_' + type).getAttribute('status') == 'hide') {
      text.style.display = 'none';
    }
    row.appendChild(text);
    /* status */
    let status = createElem('small');
    status.appendChild(createText('...'));
    status.id = 'status_' + type + '_' + this.codigo;
    status.classList.add(color + '-text', 'right');
    if (getById('options_view_' + type).getAttribute('status') == 'hide') {
      status.style.display = 'none';
    }
    row.appendChild(status);
    //Quebra de linha
    let br = createElem("br");
    br.id = type;
    div.after(br);
    return div;
  }

  set_bar_value(type, value) {
    let width = value + '%';
    getById(type + '_bar_' + this.codigo).style.width = width;
  }

  clock(type, value = null) {
    if (value == null) {
      value = 1;
    }
    let porc = 0;
    let clocks_executados = 0;
    let conc = 0;
    switch (type) {
      case 'fcfs':
        if (this.clocks_fcfs + value <= this.clocks_totais) {
          this.clocks_fcfs += value;
          clocks_executados = this.clocks_fcfs;
          porc = (this.clocks_fcfs / this.clocks_totais) * 100;
          conc = 0;
        } else {
          this.clocks_fcfs = this.clocks_totais;
          clocks_executados = this.clocks_totais;
          porc = 100;
          conc = 1;
        }
        break;
      case 'sjf':
        if (this.clocks_sjf + value <= this.clocks_totais) {
          this.clocks_sjf += value;
          clocks_executados = this.clocks_sjf;
          porc = (this.clocks_sjf / this.clocks_totais) * 100;
          conc = 0;
        } else {
          this.clocks_sjf = this.clocks_totais;
          clocks_executados = this.clocks_totais;
          porc = 100;
          conc = 1;
        }
        break;
      case 'rr':
        if (this.clocks_rr + value <= this.clocks_totais) {
          this.clocks_rr += value;
          clocks_executados = this.clocks_rr;
          porc = (this.clocks_rr / this.clocks_totais) * 100;
          conc = 0;
        } else {
          this.clocks_rr = this.clocks_totais;
          clocks_executados = this.clocks_totais;
          porc = 100;
          conc = 1;
        }
        break;
    }
    getById(type + '_txt_' + this.codigo).innerHTML = clocks_executados + '/' + this.clocks_totais;
    this.set_bar_value(type, porc);
    return conc;
  }

  back_clock(type, value = null) {
    let porc = 0;
    let clocks_executados = 0;
    if(value == null){
      value = 1;
    }
    switch (type) {
      case 'fcfs':
        if (this.clocks_fcfs - value >= 0) {
          this.clocks_fcfs -= value;
          clocks_executados = this.clocks_fcfs;
          porc = (this.clocks_fcfs / this.clocks_totais) * 100;
        } else {
          this.clocks_fcfs = 0;
          clocks_executados = 0;
          porc = 0;
        }
        break;
      case 'sjf':
        if (this.clocks_sjf - value >= 0) {
          this.clocks_sjf -= value;
          clocks_executados = this.clocks_sjf;
          porc = (this.clocks_sjf / this.clocks_totais) * 100;
        } else {
          this.clocks_sjf = 0;
          clocks_executados = 0;
          porc = 0;
        }
        break;
      case 'rr':
        if (this.clocks_rr - value >= 0) {
          this.clocks_rr -= value;
          clocks_executados = this.clocks_rr;
          porc = (this.clocks_rr / this.clocks_totais) * 100;
        } else {
          this.clocks_rr = 0;
          clocks_executados = 0;
          porc = 0;
        }
        break;
    }
    getById(type + '_txt_' + this.codigo).innerHTML = clocks_executados + '/' + this.clocks_totais;
    this.set_bar_value(type, porc);
  }

  set_status(type, status) {
    if(status == 'concluido'){
      $("#div_process_"+this.codigo).prependTo("#div_processos_concluido");
      getById('div_process_'+this.codigo).classList.add('blue-grey','darken-1');
      getById('div_process_'+this.codigo).classList.remove('white');
      getById('div_process_'+this.codigo).classList.remove('blue-grey','lighten-4');
    }else if(status == 'executando'){
      if(type != 'rr'){
        $("#div_process_"+this.codigo).prependTo("#div_processos_executando");
        getById('div_process_'+this.codigo).classList.add('white');
        getById('div_process_'+this.codigo).classList.remove('blue-grey','lighten-4');
        getById('div_process_'+this.codigo).classList.remove('blue-grey','darken-1');
      }
    }else{
      $("#div_process_"+this.codigo).prependTo("#div_processos");
      getById('div_process_'+this.codigo).classList.add('blue-grey','lighten-4');
      getById('div_process_'+this.codigo).classList.remove('white');
      getById('div_process_'+this.codigo).classList.remove('blue-grey','darken-1');
    }
    let id = 'status_' + type + '_' + this.codigo;
    let status_elem = getById(id);
    let color;
    switch(type){
      case 'fcfs':
        color = 'teal';
      break;
      case 'sjf':
        color = 'blue';
      break;
      case 'rr':
        color = 'orange';
      break;
    }
    //Limpando todas as clasess
    status_elem.className = '';
    //Identificando status e alterando cor e texto
    switch (status) {
      case 'executando':
        this.status = 'executando';
        status_elem.classList.add('blue-text', 'darken-2');
        status_elem.innerHTML = 'Executando...';
        break;
      case 'esperando':
        this.status = 'esperando';
        status_elem.classList.add(color+'-text', 'darken-2');
        status_elem.innerHTML = '...';
        break;
      case 'concluido':
        this.status = 'concluido';
        status_elem.classList.add('green-text', 'darken-2');
        status_elem.innerHTML = 'Concluído';
        break;
    }
    status_elem.classList.add('right');
  }

}

class ProcessadorFCFS {
  constructor() {
    this.processos = [];
    this.processo_atual = 0;
    this.log = [];
    this.time = 0;
    this.clocks_totais = 0;
    this.clocks_pendentes = 0;
  }

  add_processo(processo) {
    this.clocks_totais += processo.clocks_totais;
    this.processos.push(processo);
  }
}

class ProcessadorSJF {
  constructor() {
    this.processos = [];
    this.processo_atual = 0;
    this.log = [];
    this.time = 0;
    this.clocks_totais = 0;
    this.clocks_pendentes = 0;
  }

  add_processo(processo) {
    this.clocks_totais += processo.clocks_totais;
    this.processos.push(processo);
  }
}


class ProcessadorRR {
  constructor() {
    this.processos = [];
    this.processo_atual = 0;
    this.log = [];
    this.time = 0;
    this.clocks_totais = 0;
    this.clocks_pendentes = 0;
  }

  add_processo(processo) {
    this.clocks_totais += processo.clocks_totais;
    this.processos.push(processo);
  }
}

class Barra_tempo {
  constructor() {
    this.max = 0;
    this.atual = 0;
    this.processo_fcfs_old = null;
    this.concluidos_fcfs = 0;
    this.processo_sjf_old = null;
    this.concluidos_sjf = 0;
    this.processo_rr_old = null;
    this.concluidos_rr = 0;
    this.status = 'pause';
  }

  //Alterna o status entre PAUSE e PLAY alterando também o ícone do botão
  change_status(status = null) {
    if(status == null){
      if (this.status == 'pause') {
        this.status = 'play';
        setHTMLById('player_btn_play', createIcon('pause'));

      } else {
        this.status = 'pause';
        setHTMLById('player_btn_play', createIcon('play_arrow'));
        blurById('player_btn_play');
      }
    }else{
      switch(status){
        case 'play':
          this.status = 'play';
          setHTMLById('player_btn_play', createIcon('pause'));
        break;
        case 'pause':
          this.status = 'pause';
          setHTMLById('player_btn_play', createIcon('play_arrow'));
          blurById('player_btn_play');
        break;
      }
    }
  }

  //Atualiza valor maximo
  update_max(value) {
    this.max += parseInt(value);
    setHTMLById('max_range', this.max);
    getById('range_field').setAttribute('max', this.max);
  }

  update_concluidos(type, value){
    switch(type){
      case 'fcfs':
        this.concluidos_fcfs += value;
        getById('lbl_'+type+'_total').innerHTML = this.concluidos_fcfs;
      break;
      case 'sjf':
        this.concluidos_sjf += value;
        getById('lbl_'+type+'_total').innerHTML = this.concluidos_sjf;
      break;
      case 'rr':
        this.concluidos_rr += value;
        getById('lbl_'+type+'_total').innerHTML = this.concluidos_rr;
      break;
    }
  }

  clock_processador(type){
    let processo;
    let clocks;
    let log;
    let processador;
    switch(type){
      case 'fcfs':
        processo = fcfs.processos[fcfs.log[this.atual]];
        clocks = processo.clocks_fcfs;
        if(clocks == 0){
          processo.set_status('fcfs','esperando');
        }else if(clocks + 1 >= processo.clocks_totais){
          processo.set_status('fcfs','concluido');
        }else if(fcfs.log.length >= this.atual + 1){
          if(fcfs.processos[fcfs.log[this.atual + 1]] == processo){
            processo.set_status('fcfs','esperando');
          }else{
            processo.set_status('fcfs','executando');
          }
        }
        processo.clock(type);
      break;
      case 'sjf':
        processo = sjf.processos[sjf.log[this.atual]];
        clocks = processo.clocks_sjf;
        if(clocks == 0){
          processo.set_status('sjf','esperando');
        }else if(clocks + 1 >= processo.clocks_totais){
          processo.set_status('sjf','concluido');
        }else if(sjf.log.length >= this.atual + 1){
          if(sjf.processos[fcfs.log[this.atual + 1]] == processo){
            processo.set_status('sjf','esperando');
          }else{
            processo.set_status('sjf','executando');
          }
        }
        processo.clock(type);
      break;
      case 'rr':
        processo = rr.processos[rr.log[this.atual]];
        clocks = processo.clocks_rr;
        if(clocks == 0){
          processo.set_status('rr','esperando');
        }else if(clocks + 1 >= processo.clocks_totais){
          processo.set_status('rr','concluido');
        }else if(rr.log.length >= this.atual + 1){
          if(rr.processos[rr.log[this.atual + 1]] == processo){
            processo.set_status('rr','esperando');
          }else{
            processo.set_status('rr','executando');
          }
        }
        processo.clock(type);
      break;
    }
    processo.set_status(type,'executando');
    getById('lbl_'+type+'_process').innerHTML = processo.descricao;
  }

  back_clock_processador(type){
    let processo;
    let clocks;
    switch(type){
      case 'fcfs':
        processo = fcfs.processos[fcfs.log[this.atual]];
        clocks = processo.clocks_fcfs;
      break;
      case 'sjf':
        processo = sjf.processos[sjf.log[this.atual]];
        clocks = processo.clocks_sjf;
      break;
      case 'rr':
        processo = rr.processos[rr.log[this.atual]];
        clocks = processo.clocks_rr;
      break;
    }
    processo.back_clock(type);
    if(clocks - 1 == 0 || clocks == 0){
      processo.set_status(type,'esperando');
    }else{
      processo.set_status(type,'executando');
      getById('lbl_'+type+'_process').innerHTML = processo.descricao;
    }

    if(type == 'rr'){
      if(clocks == processo.clocks_totais - 2){
        this.update_concluidos(type, -1);
      }
    }else{
      if(clocks == processo.clocks_totais - 1){
        this.update_concluidos(type, -1);
      }
    }
  }

  //Avancar tempo
  mudar_tempo(elem = null, value = null) {
    if (elem != null || value != null) {
      let meta;
      if(value != null){
        meta = parseInt(getById('range_field').value) + value;
        if(meta >= this.max){
          meta = this.max;
        }else if(meta <= 0){
          meta = 0;
        }
      }else{
        meta = parseInt(getById('range_field').value);
      }
      do{
        //Se a meta for maior que o tempo atual
        if(meta > this.atual){
          this.atual += 1;
          this.clock_processador('fcfs');
          this.clock_processador('sjf');
          this.clock_processador('rr');
        }
        //Se a meta for menor que o tempo atual
        else if(meta < this.atual){
          this.back_clock_processador('fcfs');
          this.back_clock_processador('sjf');
          this.back_clock_processador('rr');
          this.atual -= 1;
        }
      }while(this.atual != meta);
    }else{
      this.atual += 1;
      this.clock_processador('fcfs');
      this.clock_processador('sjf');
      this.clock_processador('rr');
    }
    //Atualizando barra
    getById('range_field').value = this.atual;
    this.change_atual();
  }

  //Muda o valor do mínimo
  change_atual() {
    $('#atual_range').html(this.atual.toString());
  }

  avancar_tempo() {
    if (this.cl_atual < this.cl_total) {
      timeBarChange(getById('range_field'));
      getById('range_field').value = time.cl_atual + 1;
      this.cl_atual += 1;
    }
  }
}