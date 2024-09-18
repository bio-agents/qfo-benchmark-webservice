function help(myvar) {
            window.open(myvar,"oma","width=200,height=300,agentbar=no,menu=no,resizable=yes,status=no,scrollbars=yes");
}

// Cool agenttips from 
// http://www.texsoft.it/index.php?c=software&m=sw.js.htmlagenttip&l=it

function xsagenttip_findPosX(obj) 
{
  var curleft = 0;
  if (obj.offsetParent) 
  {
    while (obj.offsetParent) 
        {
            curleft += obj.offsetLeft
            obj = obj.offsetParent;
        }
    }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
}

function xsagenttip_findPosY(obj) 
{
    var curtop = 0;
    if (obj.offsetParent) 
    {
        while (obj.offsetParent) 
        {
            curtop += obj.offsetTop
            obj = obj.offsetParent;
        }
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}

function xsagenttip_show(agenttipId, parentId, posX, posY)
{
    it = document.getElementById(agenttipId);
    
    if ((it.style.top == '' || it.style.top == 0) 
        && (it.style.left == '' || it.style.left == 0))
    {
        // need to fixate default size (MSIE problem)
        it.style.width = it.offsetWidth + 'px';
        it.style.height = it.offsetHeight + 'px';
        
        img = document.getElementById(parentId); 
    
        // if agenttip is too wide, shift left to be within parent 
        if (posX + it.offsetWidth > img.offsetWidth) posX = img.offsetWidth - it.offsetWidth;
        if (posX < 0 ) posX = 0; 
        
        x = xsagenttip_findPosX(img) + posX;
        y = xsagenttip_findPosY(img) + posY;
        
        it.style.top = y + 'px';
        it.style.left = x + 'px';
    }
    
    it.style.visibility = 'visible'; 
}

function xsagenttip_hide(id)
{
    it = document.getElementById(id); 
    it.style.visibility = 'hidden'; 
}

function expand(thistag, tag) {
    styleObj=document.getElementById(thistag).style; 
    if (styleObj.display=='none') { 
        styleObj.display=''; 
	tag.innerHTML = "(less...)"; 
    } else {
        styleObj.display='none'; 
	tag.innerHTML = "(more...)"; 
    } 
}

/* 
 * sprintf implementation
 */
function str_repeat(i, m) { for (var o = []; m > 0; o[--m] = i); return(o.join('')); }

function sprintf () {
  var i = 0, a, f = arguments[i++], o = [], m, p, c, x;
  while (f) {
    if (m = /^[^\x25]+/.exec(f)) o.push(m[0]);
    else if (m = /^\x25{2}/.exec(f)) o.push('%');
    else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
      if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) throw("Too few arguments.");
      if (/[^s]/.test(m[7]) && (typeof(a) != 'number'))
        throw("Expecting number but found " + typeof(a));
      switch (m[7]) {
        case 'b': a = a.toString(2); break;
        case 'c': a = String.fromCharCode(a); break;
        case 'd': a = parseInt(a); break;
        case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
        case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
        case 'o': a = a.toString(8); break;
        case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
        case 'u': a = Math.abs(a); break;
        case 'x': a = a.toString(16); break;
        case 'X': a = a.toString(16).toUpperCase(); break;
      }
      a = (/[def]/.test(m[7]) && m[2] && a > 0 ? '+' + a : a);
      c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
      x = m[5] - String(a).length;
      p = m[5] ? str_repeat(c, x) : '';
      o.push(m[4] ? a + p : p + a);
    }
    else throw ("Huh ?!");
    f = f.substring(m[0].length);
  }
  return o.join('');
}

function toggleDisableSeqUploadOnDatasetChange(rad){
  if (rad.value=="OMA") {
      document.getElementById("SequencesUpload").style.display = "inherit";
  }
  else {
      document.getElementById("SequencesUpload").style.display = "none";
  }
}

function setFormSubmitted(button) {
    if (document.getElementById("methVis_public").checked ){
        if ( (document.getElementById("methName").value == "") ||
             (document.getElementById("methDesc").value == "") || 
             (document.getElementById("methURL").value == "") ){
            alert("For public projects, all meta-data fields need to be specified");
            return false;
        }
    }
    document.getElementById("afterSubmit").style.visibility = "visible";
    document.forms[0].submit();
    return true;
}
