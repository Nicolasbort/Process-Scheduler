//Mensagem por Toast
function show_toast(status, html){
  if(status == 'success'){
    let c = 'rounded';
    M.toast({html: html, classes:c});
  }else{
    let c = 'rounded red darken-3';
    M.toast({html: html, classes:c});
  }
}

function blurById(id){
  document.getElementById(id).blur();
}

function createIcon(icon_name){
  return '<i class="material-icons">'+icon_name+"</i>";
}

function setHTMLById(id, html){
  document.getElementById(id).innerHTML = html;
}

function timeBarChange(bar){
  console.log(bar.value);
  getById('atual_range').innerHTML = bar.value;
  fcfs.set_time(bar.value, time);
}

function getById(id){
  return document.getElementById(id);
}

function createElem(type){
  return document.createElement(type);
}

function createText(text){
  return document.createTextNode(text);
}

function clearValue(id){
  document.getElementById(id).value = '';
}

function focusById(id){
  document.getElementById(id).focus();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

Array.prototype.clockPendentes = function(type) {
    var i = this.length;
    while (i--) {
      switch(type){
        case 'fcfs':
          if(this[i].clocks_fcfs < this[i].clocks_totais){
            return true;
          }
        break;
        case 'sjf':
          if(this[i].clocks_sjf < this[i].clocks_totais){
            return true;
          }
        break;
        case 'rr':
          if(this[i].clocks_rr < this[i].clocks_totais){
            return true;
          }
        break;
      }
    }
    return false;
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};//Mensagem por Toast
function show_toast(status, html){
  if(status == 'success'){
    let c = 'rounded';
    M.toast({html: html, classes:c});
  }else{
    let c = 'rounded red darken-3';
    M.toast({html: html, classes:c});
  }
}

function blurById(id){
  document.getElementById(id).blur();
}

function createIcon(icon_name){
  return '<i class="material-icons">'+icon_name+"</i>";
}

function setHTMLById(id, html){
  document.getElementById(id).innerHTML = html;
}

function timeBarChange(bar){
  console.log(bar.value);
  getById('atual_range').innerHTML = bar.value;
  fcfs.set_time(bar.value, time);
}

function getById(id){
  return document.getElementById(id);
}

function createElem(type){
  return document.createElement(type);
}

function createText(text){
  return document.createTextNode(text);
}

function clearValue(id){
  document.getElementById(id).value = '';
}

function focusById(id){
  document.getElementById(id).focus();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

Array.prototype.clockPendentes = function(type) {
    var i = this.length;
    while (i--) {
      switch(type){
        case 'fcfs':
          if(this[i].clocks_fcfs < this[i].clocks_totais){
            return true;
          }
        break;
        case 'sjf':
          if(this[i].clocks_sjf < this[i].clocks_totais){
            return true;
          }
        break;
        case 'rr':
          if(this[i].clocks_rr < this[i].clocks_totais){
            return true;
          }
        break;
      }
    }
    return false;
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};