/*
 * searchtools.js_t
 * ~~~~~~~~~~~~~~~~
 *
 * Sphinx JavaScript utilities for the full-text search.
 *
 * :copyright: Copyright 2007-2016 by the Sphinx team, see AUTHORS.
 * :license: BSD, see LICENSE for details.
 *
 */

function splitQuery(e){for(var t=[],i=-1,a=0;a<e.length;a++)splitChars[e.charCodeAt(a)]?-1!==i&&(t.push(e.slice(i,a)),i=-1):-1===i&&(i=a);return-1!==i&&t.push(e.slice(i)),t}var Stemmer=function(){var e={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},t={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},i="[^aeiou]",a="[aeiouy]",r=i+"[^aeiouy]*",s=a+"[aeiou]*",n="^("+r+")?"+s+r,o="^("+r+")?"+s+r+"("+s+")?$",u="^("+r+")?"+s+r+s+r,l="^("+r+")?"+a;this.stemWord=function(i){var s,c,h;if(i.length<3)return i;var f,p,d,v;if(h=i.substr(0,1),"y"==h&&(i=h.toUpperCase()+i.substr(1)),f=/^(.+?)(ss|i)es$/,p=/^(.+?)([^s])s$/,f.test(i)?i=i.replace(f,"$1$2"):p.test(i)&&(i=i.replace(p,"$1$2")),f=/^(.+?)eed$/,p=/^(.+?)(ed|ing)$/,f.test(i)){var x=f.exec(i);f=new RegExp(n),f.test(x[1])&&(f=/.$/,i=i.replace(f,""))}else if(p.test(i)){var x=p.exec(i);s=x[1],p=new RegExp(l),p.test(s)&&(i=s,p=/(at|bl|iz)$/,d=new RegExp("([^aeiouylsz])\\1$"),v=new RegExp("^"+r+a+"[^aeiouwxy]$"),p.test(i)?i+="e":d.test(i)?(f=/.$/,i=i.replace(f,"")):v.test(i)&&(i+="e"))}if(f=/^(.+?)y$/,f.test(i)){var x=f.exec(i);s=x[1],f=new RegExp(l),f.test(s)&&(i=s+"i")}if(f=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,f.test(i)){var x=f.exec(i);s=x[1],c=x[2],f=new RegExp(n),f.test(s)&&(i=s+e[c])}if(f=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,f.test(i)){var x=f.exec(i);s=x[1],c=x[2],f=new RegExp(n),f.test(s)&&(i=s+t[c])}if(f=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,p=/^(.+?)(s|t)(ion)$/,f.test(i)){var x=f.exec(i);s=x[1],f=new RegExp(u),f.test(s)&&(i=s)}else if(p.test(i)){var x=p.exec(i);s=x[1]+x[2],p=new RegExp(u),p.test(s)&&(i=s)}if(f=/^(.+?)e$/,f.test(i)){var x=f.exec(i);s=x[1],f=new RegExp(u),p=new RegExp(o),d=new RegExp("^"+r+a+"[^aeiouwxy]$"),(f.test(s)||p.test(s)&&!d.test(s))&&(i=s)}return f=/ll$/,p=new RegExp(u),f.test(i)&&p.test(i)&&(f=/.$/,i=i.replace(f,"")),"y"==h&&(i=h.toLowerCase()+i.substr(1)),i}},Scorer={objNameMatch:11,objPartialMatch:6,objPrio:{0:15,1:5,2:-5},objPrioDefault:0,title:15,term:5},splitChars=function(){var e,t,i,a,r={},s=[96,180,187,191,215,247,749,885,903,907,909,930,1014,1648,1748,1809,2416,2473,2481,2526,2601,2609,2612,2615,2653,2702,2706,2729,2737,2740,2857,2865,2868,2910,2928,2948,2961,2971,2973,3085,3089,3113,3124,3213,3217,3241,3252,3295,3341,3345,3369,3506,3516,3633,3715,3721,3736,3744,3748,3750,3756,3761,3781,3912,4239,4347,4681,4695,4697,4745,4785,4799,4801,4823,4881,5760,5901,5997,6313,7405,8024,8026,8028,8030,8117,8125,8133,8181,8468,8485,8487,8489,8494,8527,11311,11359,11687,11695,11703,11711,11719,11727,11735,12448,12539,43010,43014,43019,43587,43696,43713,64286,64297,64311,64317,64319,64322,64325,65141];for(e=0;e<s.length;e++)r[s[e]]=!0;var n=[[0,47],[58,64],[91,94],[123,169],[171,177],[182,184],[706,709],[722,735],[741,747],[751,879],[888,889],[894,901],[1154,1161],[1318,1328],[1367,1368],[1370,1376],[1416,1487],[1515,1519],[1523,1568],[1611,1631],[1642,1645],[1750,1764],[1767,1773],[1789,1790],[1792,1807],[1840,1868],[1958,1968],[1970,1983],[2027,2035],[2038,2041],[2043,2047],[2070,2073],[2075,2083],[2085,2087],[2089,2307],[2362,2364],[2366,2383],[2385,2391],[2402,2405],[2419,2424],[2432,2436],[2445,2446],[2449,2450],[2483,2485],[2490,2492],[2494,2509],[2511,2523],[2530,2533],[2546,2547],[2554,2564],[2571,2574],[2577,2578],[2618,2648],[2655,2661],[2672,2673],[2677,2692],[2746,2748],[2750,2767],[2769,2783],[2786,2789],[2800,2820],[2829,2830],[2833,2834],[2874,2876],[2878,2907],[2914,2917],[2930,2946],[2955,2957],[2966,2968],[2976,2978],[2981,2983],[2987,2989],[3002,3023],[3025,3045],[3059,3076],[3130,3132],[3134,3159],[3162,3167],[3170,3173],[3184,3191],[3199,3204],[3258,3260],[3262,3293],[3298,3301],[3312,3332],[3386,3388],[3390,3423],[3426,3429],[3446,3449],[3456,3460],[3479,3481],[3518,3519],[3527,3584],[3636,3647],[3655,3663],[3674,3712],[3717,3718],[3723,3724],[3726,3731],[3752,3753],[3764,3772],[3774,3775],[3783,3791],[3802,3803],[3806,3839],[3841,3871],[3892,3903],[3949,3975],[3980,4095],[4139,4158],[4170,4175],[4182,4185],[4190,4192],[4194,4196],[4199,4205],[4209,4212],[4226,4237],[4250,4255],[4294,4303],[4349,4351],[4686,4687],[4702,4703],[4750,4751],[4790,4791],[4806,4807],[4886,4887],[4955,4968],[4989,4991],[5008,5023],[5109,5120],[5741,5742],[5787,5791],[5867,5869],[5873,5887],[5906,5919],[5938,5951],[5970,5983],[6001,6015],[6068,6102],[6104,6107],[6109,6111],[6122,6127],[6138,6159],[6170,6175],[6264,6271],[6315,6319],[6390,6399],[6429,6469],[6510,6511],[6517,6527],[6572,6592],[6600,6607],[6619,6655],[6679,6687],[6741,6783],[6794,6799],[6810,6822],[6824,6916],[6964,6980],[6988,6991],[7002,7042],[7073,7085],[7098,7167],[7204,7231],[7242,7244],[7294,7400],[7410,7423],[7616,7679],[7958,7959],[7966,7967],[8006,8007],[8014,8015],[8062,8063],[8127,8129],[8141,8143],[8148,8149],[8156,8159],[8173,8177],[8189,8303],[8306,8307],[8314,8318],[8330,8335],[8341,8449],[8451,8454],[8456,8457],[8470,8472],[8478,8483],[8506,8507],[8512,8516],[8522,8525],[8586,9311],[9372,9449],[9472,10101],[10132,11263],[11493,11498],[11503,11516],[11518,11519],[11558,11567],[11622,11630],[11632,11647],[11671,11679],[11743,11822],[11824,12292],[12296,12320],[12330,12336],[12342,12343],[12349,12352],[12439,12444],[12544,12548],[12590,12592],[12687,12689],[12694,12703],[12728,12783],[12800,12831],[12842,12880],[12896,12927],[12938,12976],[12992,13311],[19894,19967],[40908,40959],[42125,42191],[42238,42239],[42509,42511],[42540,42559],[42592,42593],[42607,42622],[42648,42655],[42736,42774],[42784,42785],[42889,42890],[42893,43002],[43043,43055],[43062,43071],[43124,43137],[43188,43215],[43226,43249],[43256,43258],[43260,43263],[43302,43311],[43335,43359],[43389,43395],[43443,43470],[43482,43519],[43561,43583],[43596,43599],[43610,43615],[43639,43641],[43643,43647],[43698,43700],[43703,43704],[43710,43711],[43715,43738],[43742,43967],[44003,44015],[44026,44031],[55204,55215],[55239,55242],[55292,55295],[57344,63743],[64046,64047],[64110,64111],[64218,64255],[64263,64274],[64280,64284],[64434,64466],[64830,64847],[64912,64913],[64968,65007],[65020,65135],[65277,65295],[65306,65312],[65339,65344],[65371,65381],[65471,65473],[65480,65481],[65488,65489],[65496,65497]];for(e=0;e<n.length;e++)for(i=n[e][0],a=n[e][1],t=i;a>=t;t++)r[t]=!0;return r}(),Search={_index:null,_queued_query:null,_pulse_status:-1,init:function(){var e=$.getQueryParameters();if(e.q){var t=e.q[0];$('input[name="q"]')[0].value=t,this.performSearch(t)}},loadIndex:function(e){$.ajax({type:"GET",url:e,data:null,dataType:"script",cache:!0,complete:function(t,i){"success"!=i&&(document.getElementById("searchindexloader").src=e)}})},setIndex:function(e){var t;this._index=e,null!==(t=this._queued_query)&&(this._queued_query=null,Search.query(t))},hasIndex:function(){return null!==this._index},deferQuery:function(e){this._queued_query=e},stopPulse:function(){this._pulse_status=0},startPulse:function(){function e(){var t;Search._pulse_status=(Search._pulse_status+1)%4;var i="";for(t=0;t<Search._pulse_status;t++)i+=".";Search.dots.text(i),Search._pulse_status>-1&&window.setTimeout(e,500)}this._pulse_status>=0||e()},performSearch:function(e){this.out=$("#search-results"),this.title=$("<h2>"+_("Searching")+"</h2>").appendTo(this.out),this.dots=$("<span></span>").appendTo(this.title),this.status=$('<p style="display: none"></p>').appendTo(this.out),this.output=$('<ul class="search"/>').appendTo(this.out),$("#search-progress").text(_("Preparing search...")),this.startPulse(),this.hasIndex()?this.query(e):this.deferQuery(e)},query:function(e){function t(){if(v.length){var e=v.pop(),i=$('<li style="display:none"></li>');if(""===DOCUMENTATION_OPTIONS.FILE_SUFFIX){var a=e[0]+"/";a.match(/\/index\/$/)?a=a.substring(0,a.length-6):"index/"==a&&(a=""),i.append($("<a/>").attr("href",DOCUMENTATION_OPTIONS.URL_ROOT+a+f+e[2]).html(e[1]))}else i.append($("<a/>").attr("href",e[0]+DOCUMENTATION_OPTIONS.FILE_SUFFIX+f+e[2]).html(e[1]));e[3]?(i.append($("<span> ("+e[3]+")</span>")),Search.output.append(i),i.slideDown(5,function(){t()})):DOCUMENTATION_OPTIONS.HAS_SOURCE?$.ajax({url:DOCUMENTATION_OPTIONS.URL_ROOT+"_sources/"+e[0]+".txt",dataType:"text",complete:function(e,a){var r=e.responseText;""!==r&&void 0!==r&&i.append(Search.makeSearchSummary(r,s,o)),Search.output.append(i),i.slideDown(5,function(){t()})}}):(Search.output.append(i),i.slideDown(5,function(){t()}))}else Search.stopPulse(),Search.title.text(_("Search Results")),g?Search.status.text(_("Search finished, found %s page(s) matching the search query.").replace("%s",g)):Search.status.text(_("Your search did not match any documents. Please make sure that all words are spelled correctly and that you've selected enough categories.")),Search.status.fadeIn(500)}var i,a=["a","and","are","as","at","be","but","by","for","if","in","into","is","it","near","no","not","of","on","or","such","that","the","their","then","there","these","they","this","to","was","will","with"],r=new Stemmer,s=[],n=[],o=[],u=splitQuery(e),l=[];for(i=0;i<u.length;i++)if(""!==u[i]&&l.push(u[i].toLowerCase()),-1==$u.indexOf(a,u[i].toLowerCase())&&!u[i].match(/^\d+$/)&&""!==u[i]){var c,h=r.stemWord(u[i].toLowerCase());"-"==h[0]?(c=n,h=h.substr(1)):(c=s,o.push(u[i].toLowerCase())),$u.contains(c,h)||c.push(h)}var f="?highlight="+$.urlencode(o.join(" ")),p=this._index.terms,d=this._index.titleterms,v=[];for($("#search-progress").empty(),i=0;i<l.length;i++){var x=[].concat(l.slice(0,i),l.slice(i+1,l.length));v=v.concat(this.performObjectSearch(l[i],x))}if(v=v.concat(this.performTermsSearch(s,n,p,d)),Scorer.score)for(i=0;i<v.length;i++)v[i][4]=Scorer.score(v[i]);v.sort(function(e,t){var i=e[4],a=t[4];return i>a?1:a>i?-1:(i=e[1].toLowerCase(),a=t[1].toLowerCase(),i>a?-1:a>i?1:0)});var g=v.length;t()},performObjectSearch:function(e,t){var i,a=this._index.filenames,r=this._index.objects,s=this._index.objnames,n=this._index.titles,o=[];for(var u in r)for(var l in r[u]){var c=(u?u+".":"")+l;if(c.toLowerCase().indexOf(e)>-1){var h=0,f=c.split(".");c==e||f[f.length-1]==e?h+=Scorer.objNameMatch:f[f.length-1].indexOf(e)>-1&&(h+=Scorer.objPartialMatch);var p=r[u][l],d=s[p[1]][2],v=n[p[0]];if(t.length>0){var x=(u+" "+l+" "+d+" "+v).toLowerCase(),g=!0;for(i=0;i<t.length;i++)if(-1==x.indexOf(t[i])){g=!1;break}if(!g)continue}var m=d+_(", in ")+v,$=p[3];""===$?$=c:"-"==$&&($=s[p[1]][1]+"-"+c),h+=Scorer.objPrio.hasOwnProperty(p[2])?Scorer.objPrio[p[2]]:Scorer.objPrioDefault,o.push([a[p[0]],c,"#"+$,m,h])}}return o},performTermsSearch:function(e,t,i,a){var r,s,n,o=this._index.filenames,u=this._index.titles,l={},c={},h=[];for(r=0;r<e.length;r++){var f=e[r],p=[],d=[{files:i[f],score:Scorer.term},{files:a[f],score:Scorer.title}];if($u.every(d,function(e){return void 0===e.files}))break;$u.each(d,function(e){var t=e.files;if(void 0!==t)for(void 0===t.length&&(t=[t]),p=p.concat(t),s=0;s<t.length;s++)n=t[s],n in c||(c[n]={}),c[n][f]=e.score});for(s=0;s<p.length;s++)n=p[s],n in l?l[n].push(f):l[n]=[f]}for(n in l){var v=!0;if(l[n].length==e.length){for(r=0;r<t.length;r++)if(i[t[r]]==n||a[t[r]]==n||$u.contains(i[t[r]]||[],n)||$u.contains(a[t[r]]||[],n)){v=!1;break}if(v){var x=$u.max($u.map(l[n],function(e){return c[n][e]}));h.push([o[n],u[n],"",null,x])}}}return h},makeSearchSummary:function(e,t,i){var a=e.toLowerCase(),r=0;$.each(t,function(){var e=a.indexOf(this.toLowerCase());e>-1&&(r=e)}),r=Math.max(r-120,0);var s=(r>0?"...":"")+$.trim(e.substr(r,240))+(r+240-e.length?"...":""),n=$('<div class="context"></div>').text(s);return $.each(i,function(){n=n.highlightText(this,"highlighted")}),n}};$(document).ready(function(){Search.init()});