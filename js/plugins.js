   
    /*
     * @Autor Agência Pixele
     * @Email ti@pixele.com.br
     * Copyright 2014
     */

    (function() {
        var method;
        var noop = function () {};
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());

    /**********************************************
    *  PLUGINS
    **********************************************/

    /*!
        jQuery Bootstrap Pixele
        UI de Escolha de Itens v1.0 - 07/12/2013
    */
    (function ($) {

        $.fn.uiEscolhaItens = function(c) {

            var configuracao = $.extend({
                msgSelecao: 'Escolha os itens que deseja.',
                msgAlerta:  'O item selecionado já foi escolhido ou nenhuma seleção foi feita.'
            }, c);

            var ui              = '#' + this.attr('id');
            var listaEscolhida  = ui + ' .lista-escolhida';

            // ESCOLHER ITEM
            $(ui + ' #escolherItem').click(function (e) {
                
                e.preventDefault();

                var d = Array();

                $(listaEscolhida + " option").each(function () {

                    var id = $(this).val();

                    $(ui + " .lista-escolha option[value='" + id + "']").removeAttr('selected');

                    d.push(id);
                });

                var itensEscolhidos = $(ui + ' .lista-escolha option:selected');

                if (itensEscolhidos.length == 0) {

                    if (d.length > 0) {
                        alert(configuracao.msgAlerta);
                        return;
                    } else {
                        alert(configuracao.msgSelecao);
                        return;
                    }
                }

                $(listaEscolhida).append($(itensEscolhidos).clone());
                
            });

            /* REMOVER ITEM */
            $(ui + ' #removerItem').click(function (e) {

                e.preventDefault();

                $(ui + ' .lista-escolhida option:selected').each(function () {
                    $(this).remove();
                });
                
            });

        };
     
    }(jQuery));

    /*!
        jQuery Delay Pixele
        Delay v1.0 - 17/03/2014
    */
    var Delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })();
	
	/*!
        ORDENAÇÃO E FILTROS
        v0.0 - 00/00/0000
    */

	var TINY={};

	function T$(i){return document.getElementById(i)}
	function T$$(e,p){return p.getElementsByTagName(e)}

	TINY.table=function(){
		function sorter(n,t,p){this.n=n; this.id=t; this.p=p; if(this.p.init){this.init()}}
		sorter.prototype.init=function(){
			this.set(); var t=this.t, i=d=0; t.h=T$$('tr',t)[0];
			t.l=t.r.length; t.w=t.r[0].cells.length; t.a=[]; t.c=[]; this.p.is=this.p.size;
			if(this.p.colddid){
				d=T$(this.p.colddid);
				var o=document.createElement('option'); o.value=-1; o.innerHTML='Filtrar...'; d.appendChild(o)
			}
			for(i;i<t.w;i++){
				var c=t.h.cells[i]; t.c[i]={};
				if(c.className!='nosort'){
					c.className=this.p.headclass; c.onclick=new Function(this.n+'.sort('+i+')');
					c.onmousedown=function(){return false};
				}
				if(this.p.columns){
					var l=this.p.columns.length, x=0;
					for(x;x<l;x++){
						if(this.p.columns[x].index==i){
							var g=this.p.columns[x];
							t.c[i].format=g.format==null?1:g.format; t.c[i].decimals=g.decimals==null?2:g.decimals
						}
					}
				}
				if(d){
					var o=document.createElement('option'); o.value=i; o.innerHTML=T$$('h3',c)[0].innerHTML; d.appendChild(o)
				}
			}
			this.reset()
		};
		sorter.prototype.reset=function(){
			var t=this.t; t.t=t.l;
			for(var i=0;i<t.l;i++){t.a[i]={}; t.a[i].s=1}
			if(this.p.sortcolumn!=undefined){
				this.sort(this.p.sortcolumn,1,this.p.is)
			}else{
				if(this.p.paginate){this.size()} this.alt(); this.sethover()
			}
			this.calc()
		};
		sorter.prototype.sort=function(x,f,z){
			var t=this.t; t.y=x; var x=t.h.cells[t.y], i=0, n=document.createElement('tbody');
			for(i;i<t.l;i++){
				t.a[i].o=i; var v=t.r[i].cells[t.y]; t.r[i].style.display='';
				while(v.hasChildNodes()){v=v.firstChild}
				t.a[i].v=v.nodeValue?v.nodeValue:''
			}
			for(i=0;i<t.w;i++){var c=t.h.cells[i]; if(c.className!='nosort'){c.className=this.p.headclass}}
			if(t.p==t.y&&!f){t.a.reverse(); x.className=t.d?this.p.ascclass:this.p.descclass; t.d=t.d?0:1}
			else{t.p=t.y; f&&this.p.sortdir==-1?t.a.sort(cp).reverse():t.a.sort(cp); t.d=0; x.className=this.p.ascclass}
			for(i=0;i<t.l;i++){var r=t.r[t.a[i].o].cloneNode(true); n.appendChild(r)}
			t.replaceChild(n,t.b); this.set(); this.alt(); if(this.p.paginate){this.size(z)} this.sethover()
		};
		sorter.prototype.sethover=function(){
			if(this.p.hoverid){
				for(var i=0;i<this.t.l;i++){
					var r=this.t.r[i];
					r.setAttribute('onmouseover',this.n+'.hover('+i+',1)');
					r.setAttribute('onmouseout',this.n+'.hover('+i+',0)')
				}
			}
		};
		sorter.prototype.calc=function(){
			if(this.p.sum||this.p.avg){
				var t=this.t, i=x=0, f,r;
				if(!T$$('tfoot',t)[0]){
					f=document.createElement('tfoot'); t.appendChild(f)
				}else{
					f=T$$('tfoot',t)[0]; while(f.hasChildNodes()){f.removeChild(f.firstChild)}
				}
				if(this.p.sum){
					r=this.newrow(f);
					for(i;i<t.w;i++){
						var j=r.cells[i];
						if(this.p.sum.exists(i)){
							var s=0, m=t.c[i].format||'';
							for(x=0;x<this.t.l;x++){
								if(t.a[x].s){s+=parseFloat(t.r[x].cells[i].innerHTML.replace(/(\$|\,)/g,''))}
							}
							s=decimals(s,t.c[i].decimals?t.c[i].decimals:2);
							s=isNaN(s)?'n/a':m=='$'?s=s.currency(t.c[i].decimals):s+m;
							r.cells[i].innerHTML=s
						}else{r.cells[i].innerHTML='&nbsp;'}
					}
				}
				if(this.p.avg){
					r=this.newrow(f);
					for(i=0;i<t.w;i++){
						var j=r.cells[i];
						if(this.p.avg.exists(i)){
							var s=c=0, m=t.c[i].format||'';
							for(x=0;x<this.t.l;x++){
								if(t.a[x].s){s+=parseFloat(t.r[x].cells[i].innerHTML.replace(/(\$|\,)/g,'')); c++}
							}
							s=decimals(s/c,t.c[i].decimals?t.c[i].decimals:2);
							s=isNaN(s)?'n/a':m=='$'?s=s.currency(t.c[i].decimals):s+m;
							j.innerHTML=s
						}else{j.innerHTML='&nbsp;'}
					}
				}
			}
		};
		sorter.prototype.newrow=function(p){
			var r=document.createElement('tr'), i=0; p.appendChild(r);
			for(i;i<this.t.w;i++){r.appendChild(document.createElement('td'))}
			return r
		};
		sorter.prototype.alt=function(){
			var t=this.t, i=x=0;
			for(i;i<t.l;i++){
				var r=t.r[i];
				if(t.a[i].s){
					r.className=x%2==0?this.p.evenclass:this.p.oddclass; var cells=T$$('td',r);
					for(var z=0;z<t.w;z++){cells[z].className=t.y==z?x%2==0?this.p.evenselclass:this.p.oddselclass:''}
					x++
				}
				if(!t.a[i].s){r.style.display='none'}
			}
		};
		sorter.prototype.page=function(s){
			var t=this.t, i=x=0, l=s+parseInt(this.p.size);
			if(this.p.totalrecid){T$(this.p.totalrecid).innerHTML=t.t}
			if(this.p.currentid){T$(this.p.currentid).innerHTML=this.g}
			if(this.p.startingrecid){
				var b=((this.g-1)*this.p.size)+1, m=b+(this.p.size-1); m=m<t.l?m:t.t; m=m<t.t?m:t.t;
				T$(this.p.startingrecid).innerHTML=t.t==0?0:b;; T$(this.p.endingrecid).innerHTML=m
			}
			for(i;i<t.l;i++){var r=t.r[i]; if(t.a[i].s){r.style.display=x>=s&&x<l?'':'none'; x++}else{r.style.display='none'}}
		};
		sorter.prototype.move=function(d,m){
			this.goto(d==1?(m?this.d:this.g+1):(m?1:this.g-1))
		};
		sorter.prototype.goto=function(s){
			if(s<=this.d&&s>0){this.g=s; this.page((s-1)*this.p.size)}
		};
		sorter.prototype.size=function(s){
			var t=this.t;
			if(s){this.p.size=s}
			this.g=1; this.d=Math.ceil(this.t.t/this.p.size);
			if(this.p.navid){T$(this.p.navid).style.display=this.d<2?'none':'block'}
			this.page(0);
			if(this.p.totalid){T$(this.p.totalid).innerHTML=t.t==0?1:this.d}
			if(this.p.pageddid){
				var d=T$(this.p.pageddid), l=this.d+1;
				d.setAttribute('onchange',this.n+'.goto(this.value)');
				while(d.hasChildNodes()){d.removeChild(d.firstChild)}
				for(var i=1;i<=this.d;i++){
					var o=document.createElement('option');
					o.value=i; o.innerHTML=i; d.appendChild(o)
				}
			}
		};
		sorter.prototype.showall=function(){
			this.size(this.t.t)
		};
		sorter.prototype.search=function(f){
			var i=x=n=0, k=-1, q=T$(f).value.toLowerCase();
			if(this.p.colddid){k=T$(this.p.colddid).value}
			var s=(k==-1)?0:k, e=(k==-1)?this.t.w:parseInt(s)+1;
			for(i;i<this.t.l;i++){
				var r=this.t.r[i], v;
				if(q==''){
					v=1
				}else{
					for(x=s;x<e;x++){
						var b=r.cells[x].innerHTML.toLowerCase();
						if(b.indexOf(q)==-1){v=0}else{v=1; break}
					}
				}
				if(v){n++}
				this.t.a[i].s=v
			}
			this.t.t=n;
			if(this.p.paginate){this.size()}
			this.calc(); this.alt()
		};
		sorter.prototype.hover=function(i,d){
			this.t.r[i].id=d?this.p.hoverid:''
		};
		sorter.prototype.set=function(){
			var t=T$(this.id); t.b=T$$('tbody',t)[0]; t.r=t.b.rows; this.t=t
		};
		Array.prototype.exists=function(v){
			for(var i=0;i<this.length;i++){if(this[i]==v){return 1}} return 0
		};
		Number.prototype.currency=function(c){
			var n=this, d=n.toFixed(c).split('.');
			d[0]=d[0].split('').reverse().join('').replace(/(\d{3})(?=\d)/g,'$1,').split('').reverse().join('');
			return '$'+d.join('.')
		};
		function decimals(n,d){return Math.round(n*Math.pow(10,d))/Math.pow(10,d)};
		function cp(f,c){
			var g,h; f=g=f.v.toLowerCase(); c=h=c.v.toLowerCase();
			
			var i=parseFloat(f.replace(/(\$|\,)/g,'')), n=parseFloat(c.replace(/(\$|\,)/g,''));
			
			if(!isNaN(i)&&!isNaN(n)){g=i,h=n}
			
			//i=Date.parse(f); n=Date.parse(c);
			
			var meses=new Array("","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

			i=Date.parse(f.split("/")[0] + " " + meses[parseInt(f.split("/")[1])] + "," + f.split("/")[2]);

			n=Date.parse(c.split("/")[0] + " " + meses[parseInt(c.split("/")[1])] + "," + c.split("/")[2]);
			
			if(!isNaN(i)&&!isNaN(n)){g=i; h=n}

			return g>h?1:(g<h?-1:0)

		};

		return{sorter:sorter}
	}();
	
    /*!
        jQuery Colorbox v1.4.15 - 2013-04-22
        (c) 2013 Jack Moore - jacklmoore.com/colorbox
        license: http://www.opensource.org/licenses/mit-license.php
    */
    (function(t,e,i){function o(i,o,n){var r=e.createElement(i);return o&&(r.id=te+o),n&&(r.style.cssText=n),t(r)}function n(){return i.innerHeight?i.innerHeight:t(i).height()}function r(t){var e=H.length,i=(j+t)%e;return 0>i?e+i:i}function h(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():n())/100:1)*parseInt(t,10))}function l(t,e){return t.photo||t.photoRegex.test(e)}function s(t,e){return t.retinaUrl&&i.devicePixelRatio>1?e.replace(t.photoRegex,t.retinaSuffix):e}function a(t){"contains"in x[0]&&!x[0].contains(t.target)&&(t.stopPropagation(),x.focus())}function d(){var e,i=t.data(A,Z);null==i?(_=t.extend({},Y),console&&console.log&&console.log("Error: cboxElement missing settings object")):_=t.extend({},i);for(e in _)t.isFunction(_[e])&&"on"!==e.slice(0,2)&&(_[e]=_[e].call(A));_.rel=_.rel||A.rel||t(A).data("rel")||"nofollow",_.href=_.href||t(A).attr("href"),_.title=_.title||A.title,"string"==typeof _.href&&(_.href=t.trim(_.href))}function c(i,o){t(e).trigger(i),se.trigger(i),t.isFunction(o)&&o.call(A)}function u(){var t,e,i,o,n,r=te+"Slideshow_",h="click."+te;_.slideshow&&H[1]?(e=function(){clearTimeout(t)},i=function(){(_.loop||H[j+1])&&(t=setTimeout(J.next,_.slideshowSpeed))},o=function(){M.html(_.slideshowStop).unbind(h).one(h,n),se.bind(ne,i).bind(oe,e).bind(re,n),x.removeClass(r+"off").addClass(r+"on")},n=function(){e(),se.unbind(ne,i).unbind(oe,e).unbind(re,n),M.html(_.slideshowStart).unbind(h).one(h,function(){J.next(),o()}),x.removeClass(r+"on").addClass(r+"off")},_.slideshowAuto?o():n()):x.removeClass(r+"off "+r+"on")}function f(i){G||(A=i,d(),H=t(A),j=0,"nofollow"!==_.rel&&(H=t("."+ee).filter(function(){var e,i=t.data(this,Z);return i&&(e=t(this).data("rel")||i.rel||this.rel),e===_.rel}),j=H.index(A),-1===j&&(H=H.add(A),j=H.length-1)),g.css({opacity:parseFloat(_.opacity),cursor:_.overlayClose?"pointer":"auto",visibility:"visible"}).show(),V&&x.add(g).removeClass(V),_.className&&x.add(g).addClass(_.className),V=_.className,K.html(_.close).show(),$||($=q=!0,x.css({visibility:"hidden",display:"block"}),W=o(ae,"LoadedContent","width:0; height:0; overflow:hidden").appendTo(v),D=b.height()+k.height()+v.outerHeight(!0)-v.height(),B=C.width()+T.width()+v.outerWidth(!0)-v.width(),N=W.outerHeight(!0),z=W.outerWidth(!0),_.w=h(_.initialWidth,"x"),_.h=h(_.initialHeight,"y"),J.position(),u(),c(ie,_.onOpen),O.add(F).hide(),x.focus(),e.addEventListener&&(e.addEventListener("focus",a,!0),se.one(he,function(){e.removeEventListener("focus",a,!0)})),_.returnFocus&&se.one(he,function(){t(A).focus()})),w())}function p(){!x&&e.body&&(X=!1,E=t(i),x=o(ae).attr({id:Z,"class":t.support.opacity===!1?te+"IE":"",role:"dialog",tabindex:"-1"}).hide(),g=o(ae,"Overlay").hide(),S=o(ae,"LoadingOverlay").add(o(ae,"LoadingGraphic")),y=o(ae,"Wrapper"),v=o(ae,"Content").append(F=o(ae,"Title"),I=o(ae,"Current"),P=t('<button type="button"/>').attr({id:te+"Previous"}),R=t('<button type="button"/>').attr({id:te+"Next"}),M=o("button","Slideshow"),S,K=t('<button type="button"/>').attr({id:te+"Close"})),y.append(o(ae).append(o(ae,"TopLeft"),b=o(ae,"TopCenter"),o(ae,"TopRight")),o(ae,!1,"clear:left").append(C=o(ae,"MiddleLeft"),v,T=o(ae,"MiddleRight")),o(ae,!1,"clear:left").append(o(ae,"BottomLeft"),k=o(ae,"BottomCenter"),o(ae,"BottomRight"))).find("div div").css({"float":"left"}),L=o(ae,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),O=R.add(P).add(I).add(M),t(e.body).append(g,x.append(y,L)))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.control||(t.preventDefault(),f(this))}return x?(X||(X=!0,R.click(function(){J.next()}),P.click(function(){J.prev()}),K.click(function(){J.close()}),g.click(function(){_.overlayClose&&J.close()}),t(e).bind("keydown."+te,function(t){var e=t.keyCode;$&&_.escKey&&27===e&&(t.preventDefault(),J.close()),$&&_.arrowKey&&H[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),R.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+te,"."+ee,i):t("."+ee).live("click."+te,i)),!0):!1}function w(){var e,n,r,a=J.prep,u=++de;q=!0,U=!1,A=H[j],d(),c(le),c(oe,_.onLoad),_.h=_.height?h(_.height,"y")-N-D:_.innerHeight&&h(_.innerHeight,"y"),_.w=_.width?h(_.width,"x")-z-B:_.innerWidth&&h(_.innerWidth,"x"),_.mw=_.w,_.mh=_.h,_.maxWidth&&(_.mw=h(_.maxWidth,"x")-z-B,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.maxHeight&&(_.mh=h(_.maxHeight,"y")-N-D,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.href,Q=setTimeout(function(){S.show()},100),_.inline?(r=o(ae).hide().insertBefore(t(e)[0]),se.one(le,function(){r.replaceWith(W.children())}),a(t(e))):_.iframe?a(" "):_.html?a(_.html):l(_,e)?(e=s(_,e),t(U=new Image).addClass(te+"Photo").bind("error",function(){_.title=!1,a(o(ae,"Error").html(_.imgError))}).one("load",function(){var e;u===de&&(U.alt=t(A).attr("alt")||t(A).attr("data-alt")||"",_.retinaImage&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),_.scalePhotos&&(n=function(){U.height-=U.height*e,U.width-=U.width*e},_.mw&&U.width>_.mw&&(e=(U.width-_.mw)/U.width,n()),_.mh&&U.height>_.mh&&(e=(U.height-_.mh)/U.height,n())),_.h&&(U.style.marginTop=Math.max(_.mh-U.height,0)/2+"px"),H[1]&&(_.loop||H[j+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",setTimeout(function(){a(U)},1))}),setTimeout(function(){U.src=e},1)):e&&L.load(e,_.data,function(e,i){u===de&&a("error"===i?o(ae,"Error").html(_.xhrError):t(this).contents())})}var g,x,y,v,b,C,T,k,H,E,W,L,S,F,I,M,R,P,K,O,_,D,B,N,z,A,j,U,$,q,G,Q,J,V,X,Y={transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"imagem(s) {current} de {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0},Z="colorbox",te="cbox",ee=te+"Element",ie=te+"_open",oe=te+"_load",ne=te+"_complete",re=te+"_cleanup",he=te+"_closed",le=te+"_purge",se=t("<a/>"),ae="div",de=0;t.colorbox||(t(p),J=t.fn[Z]=t[Z]=function(e,i){var o=this;if(e=e||{},p(),m()){if(t.isFunction(o))o=t("<a/>"),e.open=!0;else if(!o[0])return o;i&&(e.onComplete=i),o.each(function(){t.data(this,Z,t.extend({},t.data(this,Z)||Y,e))}).addClass(ee),(t.isFunction(e.open)&&e.open.call(o)||e.open)&&f(o[0])}return o},J.position=function(t,e){function i(t){b[0].style.width=k[0].style.width=v[0].style.width=parseInt(t.style.width,10)-B+"px",v[0].style.height=C[0].style.height=T[0].style.height=parseInt(t.style.height,10)-D+"px"}var o,r,l,s=0,a=0,d=x.offset();E.unbind("resize."+te),x.css({top:-9e4,left:-9e4}),r=E.scrollTop(),l=E.scrollLeft(),_.fixed?(d.top-=r,d.left-=l,x.css({position:"fixed"})):(s=r,a=l,x.css({position:"absolute"})),a+=_.right!==!1?Math.max(E.width()-_.w-z-B-h(_.right,"x"),0):_.left!==!1?h(_.left,"x"):Math.round(Math.max(E.width()-_.w-z-B,0)/2),s+=_.bottom!==!1?Math.max(n()-_.h-N-D-h(_.bottom,"y"),0):_.top!==!1?h(_.top,"y"):Math.round(Math.max(n()-_.h-N-D,0)/2),x.css({top:d.top,left:d.left,visibility:"visible"}),t=x.width()===_.w+z&&x.height()===_.h+N?0:t||0,y[0].style.width=y[0].style.height="9999px",o={width:_.w+z+B,height:_.h+N+D,top:s,left:a},0===t&&x.css(o),x.dequeue().animate(o,{duration:t,complete:function(){i(this),q=!1,y[0].style.width=_.w+z+B+"px",y[0].style.height=_.h+N+D+"px",_.reposition&&setTimeout(function(){E.bind("resize."+te,J.position)},1),e&&e()},step:function(){i(this)}})},J.resize=function(t){$&&(t=t||{},t.width&&(_.w=h(t.width,"x")-z-B),t.innerWidth&&(_.w=h(t.innerWidth,"x")),W.css({width:_.w}),t.height&&(_.h=h(t.height,"y")-N-D),t.innerHeight&&(_.h=h(t.innerHeight,"y")),t.innerHeight||t.height||(W.css({height:"auto"}),_.h=W.height()),W.css({height:_.h}),J.position("none"===_.transition?0:_.speed))},J.prep=function(e){function i(){return _.w=_.w||W.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function n(){return _.h=_.h||W.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if($){var h,a="none"===_.transition?0:_.speed;W.empty().remove(),W=o(ae,"LoadedContent").append(e),W.hide().appendTo(L.show()).css({width:i(),overflow:_.scrolling?"auto":"hidden"}).css({height:n()}).prependTo(v),L.hide(),t(U).css({"float":"none"}),h=function(){function e(){t.support.opacity===!1&&x[0].style.removeAttribute("filter")}var i,n,h=H.length,d="frameBorder",u="allowTransparency";$&&(n=function(){clearTimeout(Q),S.hide(),c(ne,_.onComplete)},F.html(_.title).add(W).show(),h>1?("string"==typeof _.current&&I.html(_.current.replace("{current}",j+1).replace("{total}",h)).show(),R[_.loop||h-1>j?"show":"hide"]().html(_.next),P[_.loop||j?"show":"hide"]().html(_.previous),_.slideshow&&M.show(),_.preloading&&t.each([r(-1),r(1)],function(){var e,i,o=H[this],n=t.data(o,Z);n&&n.href?(e=n.href,t.isFunction(e)&&(e=e.call(o))):e=t(o).attr("href"),e&&l(n,e)&&(e=s(n,e),i=new Image,i.src=e)})):O.hide(),_.iframe?(i=o("iframe")[0],d in i&&(i[d]=0),u in i&&(i[u]="true"),_.scrolling||(i.scrolling="no"),t(i).attr({src:_.href,name:(new Date).getTime(),"class":te+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",n).appendTo(W),se.one(le,function(){i.src="//about:blank"}),_.fastIframe&&t(i).trigger("load")):n(),"fade"===_.transition?x.fadeTo(a,1,e):e())},"fade"===_.transition?x.fadeTo(a,0,function(){J.position(0,h)}):J.position(a,h)}},J.next=function(){!q&&H[1]&&(_.loop||H[j+1])&&(j=r(1),f(H[j]))},J.prev=function(){!q&&H[1]&&(_.loop||j)&&(j=r(-1),f(H[j]))},J.close=function(){$&&!G&&(G=!0,$=!1,c(re,_.onCleanup),E.unbind("."+te),g.fadeTo(_.fadeOut||0,0),x.stop().fadeTo(_.fadeOut||0,0,function(){x.add(g).css({opacity:1,cursor:"auto"}).hide(),c(le),W.empty().remove(),setTimeout(function(){G=!1,c(he,_.onClosed)},1)}))},J.remove=function(){x&&(x.stop(),t.colorbox.close(),x.stop().remove(),g.remove(),G=!1,x=null,t("."+ee).removeData(Z).removeClass(ee),t(e).unbind("click."+te))},J.element=function(){return t(A)},J.settings=Y)})(jQuery,document,window);

	/*
	    jQuery Masked Input Plugin
	    Copyright (c) 2007 - 2014 Josh Bush (digitalbush.com)
	    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	    Version: 1.4.0
	*/
	!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(a.length<o.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a)},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

	/*
	 *  jquery-maskmoney - v3.0.2
	 *  jQuery plugin to mask data entry in the input text in the form of money (currency)
	 *  https://github.com/plentz/jquery-maskmoney
	 *
	 *  Made by Diego Plentz
	 *  Under MIT License (https://raw.github.com/plentz/jquery-maskmoney/master/LICENSE)
	 */
	!function($){"use strict";$.browser||($.browser={},$.browser.mozilla=/mozilla/.test(navigator.userAgent.toLowerCase())&&!/webkit/.test(navigator.userAgent.toLowerCase()),$.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase()),$.browser.opera=/opera/.test(navigator.userAgent.toLowerCase()),$.browser.msie=/msie/.test(navigator.userAgent.toLowerCase()));var a={destroy:function(){return $(this).unbind(".maskMoney"),$.browser.msie&&(this.onpaste=null),this},mask:function(a){return this.each(function(){var b,c=$(this);return"number"==typeof a&&(c.trigger("mask"),b=$(c.val().split(/\D/)).last()[0].length,a=a.toFixed(b),c.val(a)),c.trigger("mask")})},unmasked:function(){return this.map(function(){var a,b=$(this).val()||"0",c=-1!==b.indexOf("-");return $(b.split(/\D/).reverse()).each(function(b,c){return c?(a=c,!1):void 0}),b=b.replace(/\D/g,""),b=b.replace(new RegExp(a+"$"),"."+a),c&&(b="-"+b),parseFloat(b)})},init:function(a){return a=$.extend({prefix:"",suffix:"",affixesStay:!0,thousands:",",decimal:".",precision:2,allowZero:!1,allowNegative:!1},a),this.each(function(){function b(){var a,b,c,d,e,f=s.get(0),g=0,h=0;return"number"==typeof f.selectionStart&&"number"==typeof f.selectionEnd?(g=f.selectionStart,h=f.selectionEnd):(b=document.selection.createRange(),b&&b.parentElement()===f&&(d=f.value.length,a=f.value.replace(/\r\n/g,"\n"),c=f.createTextRange(),c.moveToBookmark(b.getBookmark()),e=f.createTextRange(),e.collapse(!1),c.compareEndPoints("StartToEnd",e)>-1?g=h=d:(g=-c.moveStart("character",-d),g+=a.slice(0,g).split("\n").length-1,c.compareEndPoints("EndToEnd",e)>-1?h=d:(h=-c.moveEnd("character",-d),h+=a.slice(0,h).split("\n").length-1)))),{start:g,end:h}}function c(){var a=!(s.val().length>=s.attr("maxlength")&&s.attr("maxlength")>=0),c=b(),d=c.start,e=c.end,f=c.start!==c.end&&s.val().substring(d,e).match(/\d/)?!0:!1,g="0"===s.val().substring(0,1);return a||f||g}function d(a){s.each(function(b,c){if(c.setSelectionRange)c.focus(),c.setSelectionRange(a,a);else if(c.createTextRange){var d=c.createTextRange();d.collapse(!0),d.moveEnd("character",a),d.moveStart("character",a),d.select()}})}function e(b){var c="";return b.indexOf("-")>-1&&(b=b.replace("-",""),c="-"),c+a.prefix+b+a.suffix}function f(b){var c,d,f,g=b.indexOf("-")>-1&&a.allowNegative?"-":"",h=b.replace(/[^0-9]/g,""),i=h.slice(0,h.length-a.precision);return i=i.replace(/^0*/g,""),i=i.replace(/\B(?=(\d{3})+(?!\d))/g,a.thousands),""===i&&(i="0"),c=g+i,a.precision>0&&(d=h.slice(h.length-a.precision),f=new Array(a.precision+1-d.length).join(0),c+=a.decimal+f+d),e(c)}function g(a){var b,c=s.val().length;s.val(f(s.val())),b=s.val().length,a-=c-b,d(a)}function h(){var a=s.val();s.val(f(a))}function i(){var b=s.val();return a.allowNegative?""!==b&&"-"===b.charAt(0)?b.replace("-",""):"-"+b:b}function j(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function k(a){a=a||window.event;var d,e,f,h,k,l=a.which||a.charCode||a.keyCode;return void 0===l?!1:48>l||l>57?45===l?(s.val(i()),!1):43===l?(s.val(s.val().replace("-","")),!1):13===l||9===l?!0:!$.browser.mozilla||37!==l&&39!==l||0!==a.charCode?(j(a),!0):!0:c()?(j(a),d=String.fromCharCode(l),e=b(),f=e.start,h=e.end,k=s.val(),s.val(k.substring(0,f)+d+k.substring(h,k.length)),g(f+1),!1):!1}function l(c){c=c||window.event;var d,e,f,h,i,k=c.which||c.charCode||c.keyCode;return void 0===k?!1:(d=b(),e=d.start,f=d.end,8===k||46===k||63272===k?(j(c),h=s.val(),e===f&&(8===k?""===a.suffix?e-=1:(i=h.split("").reverse().join("").search(/\d/),e=h.length-i-1,f=e+1):f+=1),s.val(h.substring(0,e)+h.substring(f,h.length)),g(e),!1):9===k?!0:!0)}function m(){r=s.val(),h();var a,b=s.get(0);b.createTextRange&&(a=b.createTextRange(),a.collapse(!1),a.select())}function n(){setTimeout(function(){h()},0)}function o(){var b=parseFloat("0")/Math.pow(10,a.precision);return b.toFixed(a.precision).replace(new RegExp("\\.","g"),a.decimal)}function p(b){if($.browser.msie&&k(b),""===s.val()||s.val()===e(o()))a.allowZero?a.affixesStay?s.val(e(o())):s.val(o()):s.val("");else if(!a.affixesStay){var c=s.val().replace(a.prefix,"").replace(a.suffix,"");s.val(c)}s.val()!==r&&s.change()}function q(){var a,b=s.get(0);b.setSelectionRange?(a=s.val().length,b.setSelectionRange(a,a)):s.val(s.val())}var r,s=$(this);a=$.extend(a,s.data()),s.unbind(".maskMoney"),s.bind("keypress.maskMoney",k),s.bind("keydown.maskMoney",l),s.bind("blur.maskMoney",p),s.bind("focus.maskMoney",m),s.bind("click.maskMoney",q),s.bind("cut.maskMoney",n),s.bind("paste.maskMoney",n),s.bind("mask.maskMoney",h)})}};$.fn.maskMoney=function(b){return a[b]?a[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?($.error("Method "+b+" does not exist on jQuery.maskMoney"),void 0):a.init.apply(this,arguments)}}(window.jQuery||window.Zepto);

    /* 
        jQuery Validation Plugin - v1.11.1 - 3/22/2013
        https://github.com/jzaefferer/jquery-validation
        Copyright (c) 2013 Jörn Zaefferer 
        Licensed MIT 
    */
    (function(t){t.extend(t.fn,{validate:function(e){if(!this.length)return e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."),void 0;var i=t.data(this[0],"validator");return i?i:(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(e){i.settings.submitHandler&&(i.submitButton=e.target),t(e.target).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==t(e.target).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.submit(function(e){function s(){var s;return i.settings.submitHandler?(i.submitButton&&(s=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&s.remove(),!1):!0}return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,s()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):s():(i.focusInvalid(),!1)})),i)},valid:function(){if(t(this[0]).is("form"))return this.validate().form();var e=!0,i=t(this[0].form).validate();return this.each(function(){e=e&&i.element(this)}),e},removeAttrs:function(e){var i={},s=this;return t.each(e.split(/\s/),function(t,e){i[e]=s.attr(e),s.removeAttr(e)}),i},rules:function(e,i){var s=this[0];if(e){var r=t.data(s.form,"validator").settings,n=r.rules,a=t.validator.staticRules(s);switch(e){case"add":t.extend(a,t.validator.normalizeRule(i)),delete a.messages,n[s.name]=a,i.messages&&(r.messages[s.name]=t.extend(r.messages[s.name],i.messages));break;case"remove":if(!i)return delete n[s.name],a;var u={};return t.each(i.split(/\s/),function(t,e){u[e]=a[e],delete a[e]}),u}}var o=t.validator.normalizeRules(t.extend({},t.validator.classRules(s),t.validator.attributeRules(s),t.validator.dataRules(s),t.validator.staticRules(s)),s);if(o.required){var l=o.required;delete o.required,o=t.extend({required:l},o)}return o}}),t.extend(t.expr[":"],{blank:function(e){return!t.trim(""+t(e).val())},filled:function(e){return!!t.trim(""+t(e).val())},unchecked:function(e){return!t(e).prop("checked")}}),t.validator=function(e,i){this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init()},t.validator.format=function(e,i){return 1===arguments.length?function(){var i=t.makeArray(arguments);return i.unshift(e),t.validator.format.apply(this,i)}:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){e=e.replace(RegExp("\\{"+t+"\\}","g"),function(){return i})}),e)},t.extend(t.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:t([]),errorLabelContainer:t([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(t)).hide())},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){(9!==e.which||""!==this.elementValue(t))&&(t.name in this.submitted||t===this.lastElement)&&this.element(t)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(s):t(e).addClass(i).removeClass(s)},unhighlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(s):t(e).removeClass(i).addClass(s)}},setDefaults:function(e){t.extend(t.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:t.validator.format("Please enter no more than {0} characters."),minlength:t.validator.format("Please enter at least {0} characters."),rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),range:t.validator.format("Please enter a value between {0} and {1}."),max:t.validator.format("Please enter a value less than or equal to {0}."),min:t.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function e(e){var i=t.data(this[0].form,"validator"),s="on"+e.type.replace(/^validate/,"");i.settings[s]&&i.settings[s].call(i,this[0],e)}this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i=this.groups={};t.each(this.settings.groups,function(e,s){"string"==typeof s&&(s=s.split(/\s/)),t.each(s,function(t,s){i[s]=e})});var s=this.settings.rules;t.each(s,function(e,i){s[e]=t.validator.normalizeRule(i)}),t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",e).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",e),this.settings.invalidHandler&&t(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(e){e=this.validationTargetFor(this.clean(e)),this.lastElement=e,this.prepareElement(e),this.currentElements=t(e);var i=this.check(e)!==!1;return i?delete this.invalid[e.name]:this.invalid[e.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),i},showErrors:function(e){if(e){t.extend(this.errorMap,e),this.errorList=[];for(var i in e)this.errorList.push({message:e[i],element:this.findByName(i)[0]});this.successList=t.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){t.fn.resetForm&&t(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e=0;for(var i in t)e++;return e},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}},findLastActive:function(){var e=this.lastActive;return e&&1===t.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var e=this,i={};return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in i||!e.objectLength(t(this).rules())?!1:(i[this.name]=!0,!0)})},clean:function(e){return t(e)[0]},errors:function(){var e=this.settings.errorClass.replace(" ",".");return t(this.settings.errorElement+"."+e,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([]),this.currentElements=t([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(e){var i=t(e).attr("type"),s=t(e).val();return"radio"===i||"checkbox"===i?t("input[name='"+t(e).attr("name")+"']:checked").val():"string"==typeof s?s.replace(/\r/g,""):s},check:function(e){e=this.validationTargetFor(this.clean(e));var i,s=t(e).rules(),r=!1,n=this.elementValue(e);for(var a in s){var u={method:a,parameters:s[a]};try{if(i=t.validator.methods[a].call(this,n,e,u.parameters),"dependency-mismatch"===i){r=!0;continue}if(r=!1,"pending"===i)return this.toHide=this.toHide.not(this.errorsFor(e)),void 0;if(!i)return this.formatAndAdd(e,u),!1}catch(o){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+u.method+"' method.",o),o}}return r?void 0:(this.objectLength(s)&&this.successList.push(e),!0)},customDataMessage:function(e,i){return t(e).data("msg-"+i.toLowerCase())||e.attributes&&t(e).attr("data-msg-"+i.toLowerCase())},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;arguments.length>t;t++)if(void 0!==arguments[t])return arguments[t];return void 0},defaultMessage:function(e,i){return this.findDefined(this.customMessage(e.name,i),this.customDataMessage(e,i),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i],"<strong>Warning: No message defined for "+e.name+"</strong>")},formatAndAdd:function(e,i){var s=this.defaultMessage(e,i.method),r=/\$?\{(\d+)\}/g;"function"==typeof s?s=s.call(this,i.parameters,e):r.test(s)&&(s=t.validator.format(s.replace(r,"{$1}"),i.parameters)),this.errorList.push({message:s,element:e}),this.errorMap[e.name]=s,this.submitted[e.name]=s},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e;for(t=0;this.errorList[t];t++){var i=this.errorList[t];this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return t(this.errorList).map(function(){return this.element})},showLabel:function(e,i){var s=this.errorsFor(e);s.length?(s.removeClass(this.settings.validClass).addClass(this.settings.errorClass),s.html(i)):(s=t("<"+this.settings.errorElement+">").attr("for",this.idOrName(e)).addClass(this.settings.errorClass).html(i||""),this.settings.wrapper&&(s=s.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(s).length||(this.settings.errorPlacement?this.settings.errorPlacement(s,t(e)):s.insertAfter(e))),!i&&this.settings.success&&(s.text(""),"string"==typeof this.settings.success?s.addClass(this.settings.success):this.settings.success(s,e)),this.toShow=this.toShow.add(s)},errorsFor:function(e){var i=this.idOrName(e);return this.errors().filter(function(){return t(this).attr("for")===i})},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),t},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(e){return t(this.currentForm).find("[name='"+e+"']")},getLength:function(e,i){switch(i.nodeName.toLowerCase()){case"select":return t("option:selected",i).length;case"input":if(this.checkable(i))return this.findByName(i.name).filter(":checked").length}return e.length},depend:function(t,e){return this.dependTypes[typeof t]?this.dependTypes[typeof t](t,e):!0},dependTypes:{"boolean":function(t){return t},string:function(e,i){return!!t(e,i.form).length},"function":function(t,e){return t(e)}},optional:function(e){var i=this.elementValue(e);return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0)},stopRequest:function(e,i){this.pendingRequest--,0>this.pendingRequest&&(this.pendingRequest=0),delete this.pending[e.name],i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(e){return t.data(e,"previousValue")||t.data(e,"previousValue",{old:null,valid:!0,message:this.defaultMessage(e,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(e,i){e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e)},classRules:function(e){var i={},s=t(e).attr("class");return s&&t.each(s.split(" "),function(){this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this])}),i},attributeRules:function(e){var i={},s=t(e),r=s[0].getAttribute("type");for(var n in t.validator.methods){var a;"required"===n?(a=s.get(0).getAttribute(n),""===a&&(a=!0),a=!!a):a=s.attr(n),/min|max/.test(n)&&(null===r||/number|range|text/.test(r))&&(a=Number(a)),a?i[n]=a:r===n&&"range"!==r&&(i[n]=!0)}return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,i},dataRules:function(e){var i,s,r={},n=t(e);for(i in t.validator.methods)s=n.data("rule-"+i.toLowerCase()),void 0!==s&&(r[i]=s);return r},staticRules:function(e){var i={},s=t.data(e.form,"validator");return s.settings.rules&&(i=t.validator.normalizeRule(s.settings.rules[e.name])||{}),i},normalizeRules:function(e,i){return t.each(e,function(s,r){if(r===!1)return delete e[s],void 0;if(r.param||r.depends){var n=!0;switch(typeof r.depends){case"string":n=!!t(r.depends,i.form).length;break;case"function":n=r.depends.call(i,i)}n?e[s]=void 0!==r.param?r.param:!0:delete e[s]}}),t.each(e,function(s,r){e[s]=t.isFunction(r)?r(i):r}),t.each(["minlength","maxlength"],function(){e[this]&&(e[this]=Number(e[this]))}),t.each(["rangelength","range"],function(){var i;e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].split(/[\s,]+/),e[this]=[Number(i[0]),Number(i[1])]))}),t.validator.autoCreateRanges&&(e.min&&e.max&&(e.range=[e.min,e.max],delete e.min,delete e.max),e.minlength&&e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],delete e.minlength,delete e.maxlength)),e},normalizeRule:function(e){if("string"==typeof e){var i={};t.each(e.split(/\s/),function(){i[this]=!0}),e=i}return e},addMethod:function(e,i,s){t.validator.methods[e]=i,t.validator.messages[e]=void 0!==s?s:t.validator.messages[e],3>i.length&&t.validator.addClassRules(e,t.validator.normalizeRule(e))},methods:{required:function(e,i,s){if(!this.depend(s,i))return"dependency-mismatch";if("select"===i.nodeName.toLowerCase()){var r=t(i).val();return r&&r.length>0}return this.checkable(i)?this.getLength(e,i)>0:t.trim(e).length>0},email:function(t,e){return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)},url:function(t,e){return this.optional(e)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},date:function(t,e){return this.optional(e)||!/Invalid|NaN/.test(""+new Date(t))},dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)},number:function(t,e){return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},creditcard:function(t,e){if(this.optional(e))return"dependency-mismatch";if(/[^0-9 \-]+/.test(t))return!1;var i=0,s=0,r=!1;t=t.replace(/\D/g,"");for(var n=t.length-1;n>=0;n--){var a=t.charAt(n);s=parseInt(a,10),r&&(s*=2)>9&&(s-=9),i+=s,r=!r}return 0===i%10},minlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s},maxlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||s>=r},rangelength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s[0]&&s[1]>=r},min:function(t,e,i){return this.optional(e)||t>=i},max:function(t,e,i){return this.optional(e)||i>=t},range:function(t,e,i){return this.optional(e)||t>=i[0]&&i[1]>=t},equalTo:function(e,i,s){var r=t(s);return this.settings.onfocusout&&r.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){t(i).valid()}),e===r.val()},remote:function(e,i,s){if(this.optional(i))return"dependency-mismatch";var r=this.previousValue(i);if(this.settings.messages[i.name]||(this.settings.messages[i.name]={}),r.originalMessage=this.settings.messages[i.name].remote,this.settings.messages[i.name].remote=r.message,s="string"==typeof s&&{url:s}||s,r.old===e)return r.valid;r.old=e;var n=this;this.startRequest(i);var a={};return a[i.name]=e,t.ajax(t.extend(!0,{url:s,mode:"abort",port:"validate"+i.name,dataType:"json",data:a,success:function(s){n.settings.messages[i.name].remote=r.originalMessage;var a=s===!0||"true"===s;if(a){var u=n.formSubmitted;n.prepareElement(i),n.formSubmitted=u,n.successList.push(i),delete n.invalid[i.name],n.showErrors()}else{var o={},l=s||n.defaultMessage(i,"remote");o[i.name]=r.message=t.isFunction(l)?l(e):l,n.invalid[i.name]=!0,n.showErrors(o)}r.valid=a,n.stopRequest(i,a)}},s)),"pending"}}}),t.format=t.validator.format})(jQuery),function(t){var e={};if(t.ajaxPrefilter)t.ajaxPrefilter(function(t,i,s){var r=t.port;"abort"===t.mode&&(e[r]&&e[r].abort(),e[r]=s)});else{var i=t.ajax;t.ajax=function(s){var r=("mode"in s?s:t.ajaxSettings).mode,n=("port"in s?s:t.ajaxSettings).port;return"abort"===r?(e[n]&&e[n].abort(),e[n]=i.apply(this,arguments),e[n]):i.apply(this,arguments)}}}(jQuery),function(t){t.extend(t.fn,{validateDelegate:function(e,i,s){return this.bind(i,function(i){var r=t(i.target);return r.is(e)?s.apply(r,arguments):void 0})}})}(jQuery);

        jQuery.validator.addMethod("cpf", function(value, element) {
            value = value.replace('.','');
            value = value.replace('.','');
            cpf = value.replace('-','');
            while(cpf.length < 11) cpf = "0"+ cpf;
            var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
            var a = [];
            var b = new Number;
            var c = 11;
            for (i=0; i<11; i++){
                a[i] = cpf.charAt(i);
                if (i < 9) b += (a[i] * --c);
            }
            if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
            b = 0;
            c = 11;
            for (y=0; y<10; y++) b += (a[y] * c--);
            if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
            if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;
            return true;
        }, "Informe um CPF válido.");

        jQuery.validator.addMethod("cnpj", function(cnpj, element) {
           cnpj = jQuery.trim(cnpj);

           cnpj = cnpj.replace('/','');
           cnpj = cnpj.replace('.','');
           cnpj = cnpj.replace('.','');
           cnpj = cnpj.replace('-','');
         
           var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
           digitos_iguais = 1;
         
           if (cnpj.length < 14 && cnpj.length < 15){
              return false;
           }
           for (i = 0; i < cnpj.length - 1; i++){
              if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
                 digitos_iguais = 0;
                 break;
              }
           }
         
           if (!digitos_iguais){
              tamanho = cnpj.length - 2
              numeros = cnpj.substring(0,tamanho);
              digitos = cnpj.substring(tamanho);
              soma = 0;
              pos = tamanho - 7;
         
              for (i = tamanho; i >= 1; i--){
                 soma += numeros.charAt(tamanho - i) * pos--;
                 if (pos < 2){
                    pos = 9;
                 }
              }
              resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
              if (resultado != digitos.charAt(0)){
                 return false;
              }
              tamanho = tamanho + 1;
              numeros = cnpj.substring(0,tamanho);
              soma = 0;
              pos = tamanho - 7;
              for (i = tamanho; i >= 1; i--){
                 soma += numeros.charAt(tamanho - i) * pos--;
                 if (pos < 2){
                    pos = 9;
                 }
              }
              resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
              if (resultado != digitos.charAt(1)){
                 return false;
              }
              return true;
           }else{
              return false;
           }
        }, "Informe um CNPJ válido.");

        jQuery.validator.addMethod("dateBR", function(value, element) {
            
            if(value.length!=10) return false;
            
            var data        = value;
            var dia         = data.substr(0,2);
            var barra1      = data.substr(2,1);
            var mes         = data.substr(3,2);
            var barra2      = data.substr(5,1);
            var ano         = data.substr(6,4);
            
            if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12)return false;
            if((mes==4||mes==6||mes==9||mes==11) && dia==31)return false;
            if(mes==2  &&  (dia>29||(dia==29 && ano%4!=0)))return false;
            if(ano < 1900)return false;
            return true;
        }, "Informe uma data válida.");

        // SWEET ALERT
        !function(e,t,n){function o(e){var t=x(),n=t.querySelector("h2"),o=t.querySelector("p"),a=t.querySelector("button.cancel"),r=t.querySelector("button.confirm");if(n.innerHTML=e.html?e.title:E(e.title).split("\n").join("<br>"),o.innerHTML=e.html?e.text:E(e.text||"").split("\n").join("<br>"),e.text&&A(o),e.customClass)T(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var s=t.getAttribute("data-custom-class");B(t,s),t.setAttribute("data-custom-class","")}if(O(t.querySelectorAll(".sa-icon")),e.type&&!u()){for(var c=!1,l=0;l<h.length;l++)if(e.type===h[l]){c=!0;break}if(!c)return f("Unknown alert type: "+e.type),!1;var d=t.querySelector(".sa-icon.sa-"+e.type);switch(A(d),e.type){case"success":T(d,"animate"),T(d.querySelector(".sa-tip"),"animateSuccessTip"),T(d.querySelector(".sa-long"),"animateSuccessLong");break;case"error":T(d,"animateErrorIcon"),T(d.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":T(d,"pulseWarning"),T(d.querySelector(".sa-body"),"pulseWarningIns"),T(d.querySelector(".sa-dot"),"pulseWarningIns")}}if(e.imageUrl){var m=t.querySelector(".sa-icon.sa-custom");m.style.backgroundImage="url("+e.imageUrl+")",A(m);var p=80,y=80;if(e.imageSize){var v=e.imageSize.toString().split("x"),b=v[0],g=v[1];b&&g?(p=b,y=g):f("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}m.setAttribute("style",m.getAttribute("style")+"width:"+p+"px; height:"+y+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?a.style.display="inline-block":O(a),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?r.style.display="inline-block":O(r),e.cancelButtonText&&(a.innerHTML=E(e.cancelButtonText)),e.confirmButtonText&&(r.innerHTML=E(e.confirmButtonText)),r.style.backgroundColor=e.confirmButtonColor,i(r,e.confirmButtonColor),t.setAttribute("data-allow-ouside-click",e.allowOutsideClick);var w=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",w),e.animation?t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)}function a(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a}function r(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function s(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null}function i(e,t){var n=s(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"}function c(){var e=x();H(k(),10),A(e),T(e,"showSweetAlert"),B(e,"hideSweetAlert"),d=t.activeElement;var n=e.querySelector("button.confirm");n.focus(),setTimeout(function(){T(e,"visible")},500);var o=e.getAttribute("data-timer");"null"!==o&&""!==o&&(e.timeout=setTimeout(function(){v.close()},o))}function l(){var e=x();e.style.marginTop=D(x())}function u(){return e.attachEvent&&!e.addEventListener?!0:!1}function f(t){e.console&&e.console.log("SweetAlert: "+t)}var d,m,p,y,v,b,g=".sweet-alert",w=".sweet-overlay",h=["error","warning","info","success"],S={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#AEDEF4",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0},x=function(){var e=t.querySelector(g);return e||(j(),e=x()),e},k=function(){return t.querySelector(w)},C=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},T=function(e,t){C(e,t)||(e.className+=" "+t)},B=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(C(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},E=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},q=function(e){e.style.opacity="",e.style.display="block"},A=function(e){if(e&&!e.length)return q(e);for(var t=0;t<e.length;++t)q(e[t])},I=function(e){e.style.opacity="",e.style.display="none"},O=function(e){if(e&&!e.length)return I(e);for(var t=0;t<e.length;++t)I(e[t])},M=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},D=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt(n/2+t)+"px"},H=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)};o()}e.style.display="block"},L=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"};o()},N=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},P=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)},j=function(){var e='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert" tabIndex="-1"><div class="sa-icon sa-error"><span class="sa-x-mark"><span class="sa-line sa-left"></span><span class="sa-line sa-right"></span></span></div><div class="sa-icon sa-warning"> <span class="sa-body"></span> <span class="sa-dot"></span> </div> <div class="sa-icon sa-info"></div> <div class="sa-icon sa-success"> <span class="sa-line sa-tip"></span> <span class="sa-line sa-long"></span> <div class="sa-placeholder"></div> <div class="sa-fix"></div> </div> <div class="sa-icon sa-custom"></div> <h2>Title</h2><p>Text</p><button class="cancel" tabIndex="2">Cancel</button><button class="confirm" tabIndex="1">OK</button></div>',n=t.createElement("div");for(n.innerHTML=e;n.firstChild;)t.body.appendChild(n.firstChild)};v=b=function(){function s(e){var t=b;return"undefined"!=typeof t[e]?t[e]:S[e]}function u(t){var o=t||e.event,a=o.keyCode||o.which;if(-1!==[9,13,32,27].indexOf(a)){for(var r=o.target||o.srcElement,s=-1,c=0;c<D.length;c++)if(r===D[c]){s=c;break}9===a?(r=-1===s?I:s===D.length-1?D[0]:D[s+1],P(o),r.focus(),i(r,g.confirmButtonColor)):(r=13===a||32===a?-1===s?I:n:27===a&&g.allowEscapeKey===!0?O:n,r!==n&&N(r,o))}}function d(t){var n=t||e.event,o=n.target||n.srcElement,a=n.relatedTarget,r=C(B,"visible");if(r){var s=-1;if(null!==a){for(var i=0;i<D.length;i++)if(a===D[i]){s=i;break}-1===s&&o.focus()}else y=o}}var b=arguments[0];if(arguments[0]===n)return f("SweetAlert expects at least 1 attribute!"),!1;var g=r({},S);switch(typeof arguments[0]){case"string":g.title=arguments[0],g.text=arguments[1]||"",g.type=arguments[2]||"";break;case"object":if(arguments[0].title===n)return f('Missing "title" argument!'),!1;g.title=arguments[0].title;for(var w=["text","type","customClass","allowOutsideClick","showConfirmButton","showCancelButton","closeOnConfirm","closeOnCancel","timer","confirmButtonColor","cancelButtonText","imageUrl","imageSize","html","animation","allowEscapeKey"],h=w.length,k=0;h>k;k++){var T=w[k];g[T]=s(T)}g.confirmButtonText=g.showCancelButton?"Confirm":S.confirmButtonText,g.confirmButtonText=s("confirmButtonText"),g.doneFunction=arguments[1]||null;break;default:return f('Unexpected type of argument! Expected "string" or "object", got '+typeof arguments[0]),!1}o(g),l(),c();for(var B=x(),E=function(t){var n=t||e.event,o=n.target||n.srcElement,r=-1!==o.className.indexOf("confirm"),s=C(B,"visible"),i=g.doneFunction&&"true"===B.getAttribute("data-has-done-function");switch(n.type){case"mouseover":r&&(o.style.backgroundColor=a(g.confirmButtonColor,-.04));break;case"mouseout":r&&(o.style.backgroundColor=g.confirmButtonColor);break;case"mousedown":r&&(o.style.backgroundColor=a(g.confirmButtonColor,-.14));break;case"mouseup":r&&(o.style.backgroundColor=a(g.confirmButtonColor,-.04));break;case"focus":var c=B.querySelector("button.confirm"),l=B.querySelector("button.cancel");r?l.style.boxShadow="none":c.style.boxShadow="none";break;case"click":if(r&&i&&s)g.doneFunction(!0),g.closeOnConfirm&&v.close();else if(i&&s){var u=String(g.doneFunction).replace(/\s/g,""),f="function("===u.substring(0,9)&&")"!==u.substring(9,10);f&&g.doneFunction(!1),g.closeOnCancel&&v.close()}else v.close()}},q=B.querySelectorAll("button"),A=0;A<q.length;A++)q[A].onclick=E,q[A].onmouseover=E,q[A].onmouseout=E,q[A].onmousedown=E,q[A].onfocus=E;m=t.onclick,t.onclick=function(t){var n=t||e.event,o=n.target||n.srcElement,a=B===o,r=M(B,o),s=C(B,"visible"),i="true"===B.getAttribute("data-allow-ouside-click");!a&&!r&&s&&i&&v.close()};var I=B.querySelector("button.confirm"),O=B.querySelector("button.cancel"),D=B.querySelectorAll("button[tabindex]");p=e.onkeydown,e.onkeydown=u,I.onblur=d,O.onblur=d,e.onfocus=function(){e.setTimeout(function(){y!==n&&(y.focus(),y=n)},0)}},v.setDefaults=b.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");r(S,e)},v.close=b.close=function(){var o=x();L(k(),5),L(o,5),B(o,"showSweetAlert"),T(o,"hideSweetAlert"),B(o,"visible");var a=o.querySelector(".sa-icon.sa-success");B(a,"animate"),B(a.querySelector(".sa-tip"),"animateSuccessTip"),B(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");B(r,"animateErrorIcon"),B(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");B(s,"pulseWarning"),B(s.querySelector(".sa-body"),"pulseWarningIns"),B(s.querySelector(".sa-dot"),"pulseWarningIns"),e.onkeydown=p,t.onclick=m,d&&d.focus(),y=n,clearTimeout(o.timeout)},"function"==typeof define&&define.amd?define(function(){return v}):"undefined"!=typeof module&&module.exports?module.exports=v:"undefined"!=typeof e&&(e.sweetAlert=e.swal=v)}(window,document);

    $.validator.addMethod("greaterThan",
	    function(value, max, min){
	        return parseInt(value) > parseInt($(min).val());
	    }, "Max must be greater than min"
	);

	//Javascript para utilizar o colorPicker....
	window.jscolor||(window.jscolor=function(){var e={register:function(){e.attachDOMReadyEvent(e.init),e.attachEvent(document,"mousedown",e.onDocumentMouseDown),e.attachEvent(document,"touchstart",e.onDocumentTouchStart),e.attachEvent(window,"resize",e.onWindowResize)},init:function(){e.jscolor.lookupClass&&e.jscolor.installByClassName(e.jscolor.lookupClass)},tryInstallOnElements:function(t,n){for(var r=RegExp("(^|\\s)("+n+")(\\s*(\\{[^}]*\\})|\\s|$)","i"),o=0;t.length>o;o+=1)if(void 0===t[o].type||"color"!=t[o].type.toLowerCase()||!e.isColorAttrSupported){var i;if(!t[o].jscolor&&t[o].className&&(i=t[o].className.match(r))){var s=t[o],l=null,a=e.getDataAttr(s,"jscolor");null!==a?l=a:i[4]&&(l=i[4]);var d={};if(l)try{d=Function("return ("+l+")")()}catch(c){e.warn("Error parsing jscolor options: "+c+":\n"+l)}s.jscolor=new e.jscolor(s,d)}}},isColorAttrSupported:function(){var e=document.createElement("input");return e.setAttribute&&(e.setAttribute("type","color"),"color"==e.type.toLowerCase())?!0:!1}(),isCanvasSupported:function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))}(),fetchElement:function(e){return"string"==typeof e?document.getElementById(e):e},isElementType:function(e,t){return e.nodeName.toLowerCase()===t.toLowerCase()},getDataAttr:function(e,t){var n="data-"+t,r=e.getAttribute(n);return null!==r?r:null},attachEvent:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},detachEvent:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)},_attachedGroupEvents:{},attachGroupEvent:function(t,n,r,o){e._attachedGroupEvents.hasOwnProperty(t)||(e._attachedGroupEvents[t]=[]),e._attachedGroupEvents[t].push([n,r,o]),e.attachEvent(n,r,o)},detachGroupEvents:function(t){if(e._attachedGroupEvents.hasOwnProperty(t)){for(var n=0;e._attachedGroupEvents[t].length>n;n+=1){var r=e._attachedGroupEvents[t][n];e.detachEvent(r[0],r[1],r[2])}delete e._attachedGroupEvents[t]}},attachDOMReadyEvent:function(e){var t=!1,n=function(){t||(t=!0,e())};if("complete"===document.readyState)return void setTimeout(n,1);if(document.addEventListener)document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1);else if(document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",arguments.callee),n())}),window.attachEvent("onload",n),document.documentElement.doScroll&&window==window.top)){var r=function(){if(document.body)try{document.documentElement.doScroll("left"),n()}catch(e){setTimeout(r,1)}};r()}},warn:function(e){window.console&&window.console.warn&&window.console.warn(e)},preventDefault:function(e){e.preventDefault&&e.preventDefault(),e.returnValue=!1},captureTarget:function(t){t.setCapture&&(e._capturedTarget=t,e._capturedTarget.setCapture())},releaseTarget:function(){e._capturedTarget&&(e._capturedTarget.releaseCapture(),e._capturedTarget=null)},fireEvent:function(e,t){if(e)if(document.createEvent){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}else if(document.createEventObject){var n=document.createEventObject();e.fireEvent("on"+t,n)}else e["on"+t]&&e["on"+t]()},classNameToList:function(e){return e.replace(/^\s+|\s+$/g,"").split(/\s+/)},hasClass:function(e,t){return t?-1!=(" "+e.className.replace(/\s+/g," ")+" ").indexOf(" "+t+" "):!1},setClass:function(t,n){for(var r=e.classNameToList(n),o=0;r.length>o;o+=1)e.hasClass(t,r[o])||(t.className+=(t.className?" ":"")+r[o])},unsetClass:function(t,n){for(var r=e.classNameToList(n),o=0;r.length>o;o+=1){var i=RegExp("^\\s*"+r[o]+"\\s*|\\s*"+r[o]+"\\s*$|\\s+"+r[o]+"(\\s+)","g");t.className=t.className.replace(i,"$1")}},getStyle:function(e){return window.getComputedStyle?window.getComputedStyle(e):e.currentStyle},setStyle:function(){var e=document.createElement("div"),t=function(t){for(var n=0;t.length>n;n+=1)if(t[n]in e.style)return t[n]},n={borderRadius:t(["borderRadius","MozBorderRadius","webkitBorderRadius"]),boxShadow:t(["boxShadow","MozBoxShadow","webkitBoxShadow"])};return function(e,t,r){switch(t.toLowerCase()){case"opacity":var o=Math.round(100*parseFloat(r));e.style.opacity=r,e.style.filter="alpha(opacity="+o+")";break;default:e.style[n[t]]=r}}}(),setBorderRadius:function(t,n){e.setStyle(t,"borderRadius",n||"0")},setBoxShadow:function(t,n){e.setStyle(t,"boxShadow",n||"none")},getElementPos:function(t,n){var r=0,o=0,i=t.getBoundingClientRect();if(r=i.left,o=i.top,!n){var s=e.getViewPos();r+=s[0],o+=s[1]}return[r,o]},getElementSize:function(e){return[e.offsetWidth,e.offsetHeight]},getAbsPointerPos:function(e){e||(e=window.event);var t=0,n=0;return void 0!==e.changedTouches&&e.changedTouches.length?(t=e.changedTouches[0].clientX,n=e.changedTouches[0].clientY):"number"==typeof e.clientX&&(t=e.clientX,n=e.clientY),{x:t,y:n}},getRelPointerPos:function(e){e||(e=window.event);var t=e.target||e.srcElement,n=t.getBoundingClientRect(),r=0,o=0,i=0,s=0;return void 0!==e.changedTouches&&e.changedTouches.length?(i=e.changedTouches[0].clientX,s=e.changedTouches[0].clientY):"number"==typeof e.clientX&&(i=e.clientX,s=e.clientY),r=i-n.left,o=s-n.top,{x:r,y:o}},getViewPos:function(){var e=document.documentElement;return[(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0),(window.pageYOffset||e.scrollTop)-(e.clientTop||0)]},getViewSize:function(){var e=document.documentElement;return[window.innerWidth||e.clientWidth,window.innerHeight||e.clientHeight]},redrawPosition:function(){if(e.picker&&e.picker.owner){var t,n,r=e.picker.owner;r.fixed?(t=e.getElementPos(r.targetElement,!0),n=[0,0]):(t=e.getElementPos(r.targetElement),n=e.getViewPos());var o,i,s,l=e.getElementSize(r.targetElement),a=e.getViewSize(),d=e.getPickerOuterDims(r);switch(r.position.toLowerCase()){case"left":o=1,i=0,s=-1;break;case"right":o=1,i=0,s=1;break;case"top":o=0,i=1,s=-1;break;default:o=0,i=1,s=1}var c=(l[i]+d[i])/2;if(r.smartPosition)var h=[-n[o]+t[o]+d[o]>a[o]&&-n[o]+t[o]+l[o]/2>a[o]/2&&t[o]+l[o]-d[o]>=0?t[o]+l[o]-d[o]:t[o],-n[i]+t[i]+l[i]+d[i]-c+c*s>a[i]?-n[i]+t[i]+l[i]/2>a[i]/2&&t[i]+l[i]-c-c*s>=0?t[i]+l[i]-c-c*s:t[i]+l[i]-c+c*s:t[i]+l[i]-c+c*s>=0?t[i]+l[i]-c+c*s:t[i]+l[i]-c-c*s];else var h=[t[o],t[i]+l[i]-c+c*s];var p=h[o],u=h[i],m=r.fixed?"fixed":"absolute",v=(h[0]+d[0]>t[0]||t[0]+l[0]>h[0])&&t[1]+l[1]>h[1]+d[1];e._drawPosition(r,p,u,m,v)}},_drawPosition:function(t,n,r,o,i){var s=i?0:t.shadowBlur;e.picker.wrap.style.position=o,e.picker.wrap.style.left=n+"px",e.picker.wrap.style.top=r+"px",e.setBoxShadow(e.picker.boxS,t.shadow?new e.BoxShadow(0,s,t.shadowBlur,0,t.shadowColor):null)},getPickerDims:function(t){var n=!!e.getSliderComponent(t),r=[2*t.insetWidth+2*t.padding+t.width+(n?2*t.insetWidth+e.getPadToSliderPadding(t)+t.sliderSize:0),2*t.insetWidth+2*t.padding+t.height+(t.closable?2*t.insetWidth+t.padding+t.buttonHeight:0)];return r},getPickerOuterDims:function(t){var n=e.getPickerDims(t);return[n[0]+2*t.borderWidth,n[1]+2*t.borderWidth]},getPadToSliderPadding:function(e){return Math.max(e.padding,1.5*(2*e.pointerBorderWidth+e.pointerThickness))},getPadYComponent:function(e){switch(e.mode.charAt(1).toLowerCase()){case"v":return"v"}return"s"},getSliderComponent:function(e){if(e.mode.length>2)switch(e.mode.charAt(2).toLowerCase()){case"s":return"s";case"v":return"v"}return null},onDocumentMouseDown:function(t){t||(t=window.event);var n=t.target||t.srcElement;n._jscLinkedInstance?n._jscLinkedInstance.showOnClick&&n._jscLinkedInstance.show():n._jscControlName?e.onControlPointerStart(t,n,n._jscControlName,"mouse"):e.picker&&e.picker.owner&&e.picker.owner.hide()},onDocumentTouchStart:function(t){t||(t=window.event);var n=t.target||t.srcElement;n._jscLinkedInstance?n._jscLinkedInstance.showOnClick&&n._jscLinkedInstance.show():n._jscControlName?e.onControlPointerStart(t,n,n._jscControlName,"touch"):e.picker&&e.picker.owner&&e.picker.owner.hide()},onWindowResize:function(t){e.redrawPosition()},onParentScroll:function(t){e.picker&&e.picker.owner&&e.picker.owner.hide()},_pointerMoveEvent:{mouse:"mousemove",touch:"touchmove"},_pointerEndEvent:{mouse:"mouseup",touch:"touchend"},_pointerOrigin:null,_capturedTarget:null,onControlPointerStart:function(t,n,r,o){var i=n._jscInstance;e.preventDefault(t),e.captureTarget(n);var s=function(i,s){e.attachGroupEvent("drag",i,e._pointerMoveEvent[o],e.onDocumentPointerMove(t,n,r,o,s)),e.attachGroupEvent("drag",i,e._pointerEndEvent[o],e.onDocumentPointerEnd(t,n,r,o))};if(s(document,[0,0]),window.parent&&window.frameElement){var l=window.frameElement.getBoundingClientRect(),a=[-l.left,-l.top];s(window.parent.window.document,a)}var d=e.getAbsPointerPos(t),c=e.getRelPointerPos(t);switch(e._pointerOrigin={x:d.x-c.x,y:d.y-c.y},r){case"pad":switch(e.getSliderComponent(i)){case"s":0===i.hsv[1]&&i.fromHSV(null,100,null);break;case"v":0===i.hsv[2]&&i.fromHSV(null,null,100)}e.setPad(i,t,0,0);break;case"sld":e.setSld(i,t,0)}e.dispatchFineChange(i)},onDocumentPointerMove:function(t,n,r,o,i){return function(t){var o=n._jscInstance;switch(r){case"pad":t||(t=window.event),e.setPad(o,t,i[0],i[1]),e.dispatchFineChange(o);break;case"sld":t||(t=window.event),e.setSld(o,t,i[1]),e.dispatchFineChange(o)}}},onDocumentPointerEnd:function(t,n,r,o){return function(t){var r=n._jscInstance;e.detachGroupEvents("drag"),e.releaseTarget(),e.dispatchChange(r)}},dispatchChange:function(t){t.valueElement&&e.isElementType(t.valueElement,"input")&&e.fireEvent(t.valueElement,"change")},dispatchFineChange:function(e){if(e.onFineChange){var t;t="string"==typeof e.onFineChange?Function(e.onFineChange):e.onFineChange,t.call(e)}},setPad:function(t,n,r,o){var i=e.getAbsPointerPos(n),s=r+i.x-e._pointerOrigin.x-t.padding-t.insetWidth,l=o+i.y-e._pointerOrigin.y-t.padding-t.insetWidth,a=s*(360/(t.width-1)),d=100-l*(100/(t.height-1));switch(e.getPadYComponent(t)){case"s":t.fromHSV(a,d,null,e.leaveSld);break;case"v":t.fromHSV(a,null,d,e.leaveSld)}},setSld:function(t,n,r){var o=e.getAbsPointerPos(n),i=r+o.y-e._pointerOrigin.y-t.padding-t.insetWidth,s=100-i*(100/(t.height-1));switch(e.getSliderComponent(t)){case"s":t.fromHSV(null,s,null,e.leavePad);break;case"v":t.fromHSV(null,null,s,e.leavePad)}},_vmlNS:"jsc_vml_",_vmlCSS:"jsc_vml_css_",_vmlReady:!1,initVML:function(){if(!e._vmlReady){var t=document;if(t.namespaces[e._vmlNS]||t.namespaces.add(e._vmlNS,"urn:schemas-microsoft-com:vml"),!t.styleSheets[e._vmlCSS]){var n=["shape","shapetype","group","background","path","formulas","handles","fill","stroke","shadow","textbox","textpath","imagedata","line","polyline","curve","rect","roundrect","oval","arc","image"],r=t.createStyleSheet();r.owningElement.id=e._vmlCSS;for(var o=0;n.length>o;o+=1)r.addRule(e._vmlNS+"\\:"+n[o],"behavior:url(#default#VML);")}e._vmlReady=!0}},createPalette:function(){var t={elm:null,draw:null};if(e.isCanvasSupported){var n=document.createElement("canvas"),r=n.getContext("2d"),o=function(e,t,o){n.width=e,n.height=t,r.clearRect(0,0,n.width,n.height);var i=r.createLinearGradient(0,0,n.width,0);i.addColorStop(0,"#F00"),i.addColorStop(1/6,"#FF0"),i.addColorStop(2/6,"#0F0"),i.addColorStop(.5,"#0FF"),i.addColorStop(4/6,"#00F"),i.addColorStop(5/6,"#F0F"),i.addColorStop(1,"#F00"),r.fillStyle=i,r.fillRect(0,0,n.width,n.height);var s=r.createLinearGradient(0,0,0,n.height);switch(o.toLowerCase()){case"s":s.addColorStop(0,"rgba(255,255,255,0)"),s.addColorStop(1,"rgba(255,255,255,1)");break;case"v":s.addColorStop(0,"rgba(0,0,0,0)"),s.addColorStop(1,"rgba(0,0,0,1)")}r.fillStyle=s,r.fillRect(0,0,n.width,n.height)};t.elm=n,t.draw=o}else{e.initVML();var i=document.createElement("div");i.style.position="relative",i.style.overflow="hidden";var s=document.createElement(e._vmlNS+":fill");s.type="gradient",s.method="linear",s.angle="90",s.colors="16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0";var l=document.createElement(e._vmlNS+":rect");l.style.position="absolute",l.style.left="-1px",l.style.top="-1px",l.stroked=!1,l.appendChild(s),i.appendChild(l);var a=document.createElement(e._vmlNS+":fill");a.type="gradient",a.method="linear",a.angle="180",a.opacity="0";var d=document.createElement(e._vmlNS+":rect");d.style.position="absolute",d.style.left="-1px",d.style.top="-1px",d.stroked=!1,d.appendChild(a),i.appendChild(d);var o=function(e,t,n){switch(i.style.width=e+"px",i.style.height=t+"px",l.style.width=d.style.width=e+1+"px",l.style.height=d.style.height=t+1+"px",s.color="#F00",s.color2="#F00",n.toLowerCase()){case"s":a.color=a.color2="#FFF";break;case"v":a.color=a.color2="#000"}};t.elm=i,t.draw=o}return t},createSliderGradient:function(){var t={elm:null,draw:null};if(e.isCanvasSupported){var n=document.createElement("canvas"),r=n.getContext("2d"),o=function(e,t,o,i){n.width=e,n.height=t,r.clearRect(0,0,n.width,n.height);var s=r.createLinearGradient(0,0,0,n.height);s.addColorStop(0,o),s.addColorStop(1,i),r.fillStyle=s,r.fillRect(0,0,n.width,n.height)};t.elm=n,t.draw=o}else{e.initVML();var i=document.createElement("div");i.style.position="relative",i.style.overflow="hidden";var s=document.createElement(e._vmlNS+":fill");s.type="gradient",s.method="linear",s.angle="180";var l=document.createElement(e._vmlNS+":rect");l.style.position="absolute",l.style.left="-1px",l.style.top="-1px",l.stroked=!1,l.appendChild(s),i.appendChild(l);var o=function(e,t,n,r){i.style.width=e+"px",i.style.height=t+"px",l.style.width=e+1+"px",l.style.height=t+1+"px",s.color=n,s.color2=r};t.elm=i,t.draw=o}return t},leaveValue:1,leaveStyle:2,leavePad:4,leaveSld:8,BoxShadow:function(){var e=function(e,t,n,r,o,i){this.hShadow=e,this.vShadow=t,this.blur=n,this.spread=r,this.color=o,this.inset=!!i};return e.prototype.toString=function(){var e=[Math.round(this.hShadow)+"px",Math.round(this.vShadow)+"px",Math.round(this.blur)+"px",Math.round(this.spread)+"px",this.color];return this.inset&&e.push("inset"),e.join(" ")},e}(),jscolor:function(t,n){function r(e,t,n){e/=255,t/=255,n/=255;var r=Math.min(Math.min(e,t),n),o=Math.max(Math.max(e,t),n),i=o-r;if(0===i)return[null,0,100*o];var s=e===r?3+(n-t)/i:t===r?5+(e-n)/i:1+(t-e)/i;return[60*(6===s?0:s),100*(i/o),100*o]}function o(e,t,n){var r=255*(n/100);if(null===e)return[r,r,r];e/=60,t/=100;var o=Math.floor(e),i=o%2?e-o:1-(e-o),s=r*(1-t),l=r*(1-t*i);switch(o){case 6:case 0:return[r,l,s];case 1:return[l,r,s];case 2:return[s,r,l];case 3:return[s,l,r];case 4:return[l,s,r];case 5:return[r,s,l]}}function i(){e.unsetClass(m.targetElement,m.activeClass),e.picker.wrap.parentNode.removeChild(e.picker.wrap),delete e.picker.owner}function s(){function t(){var e=m.insetColor.split(/\s+/),t=2>e.length?e[0]:e[1]+" "+e[0]+" "+e[0]+" "+e[1];n.btn.style.borderColor=t}m._processParentElementsInDOM(),e.picker||(e.picker={owner:null,wrap:document.createElement("div"),box:document.createElement("div"),boxS:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),padPal:e.createPalette(),cross:document.createElement("div"),crossBY:document.createElement("div"),crossBX:document.createElement("div"),crossLY:document.createElement("div"),crossLX:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div"),sldGrad:e.createSliderGradient(),sldPtrS:document.createElement("div"),sldPtrIB:document.createElement("div"),sldPtrMB:document.createElement("div"),sldPtrOB:document.createElement("div"),btn:document.createElement("div"),btnT:document.createElement("span")},e.picker.pad.appendChild(e.picker.padPal.elm),e.picker.padB.appendChild(e.picker.pad),e.picker.cross.appendChild(e.picker.crossBY),e.picker.cross.appendChild(e.picker.crossBX),e.picker.cross.appendChild(e.picker.crossLY),e.picker.cross.appendChild(e.picker.crossLX),e.picker.padB.appendChild(e.picker.cross),e.picker.box.appendChild(e.picker.padB),e.picker.box.appendChild(e.picker.padM),e.picker.sld.appendChild(e.picker.sldGrad.elm),e.picker.sldB.appendChild(e.picker.sld),e.picker.sldB.appendChild(e.picker.sldPtrOB),e.picker.sldPtrOB.appendChild(e.picker.sldPtrMB),e.picker.sldPtrMB.appendChild(e.picker.sldPtrIB),e.picker.sldPtrIB.appendChild(e.picker.sldPtrS),e.picker.box.appendChild(e.picker.sldB),e.picker.box.appendChild(e.picker.sldM),e.picker.btn.appendChild(e.picker.btnT),e.picker.box.appendChild(e.picker.btn),e.picker.boxB.appendChild(e.picker.box),e.picker.wrap.appendChild(e.picker.boxS),e.picker.wrap.appendChild(e.picker.boxB));var n=e.picker,r=!!e.getSliderComponent(m),o=e.getPickerDims(m),i=2*m.pointerBorderWidth+m.pointerThickness+2*m.crossSize,s=e.getPadToSliderPadding(m),d=Math.min(m.borderRadius,Math.round(m.padding*Math.PI)),c="crosshair";n.wrap.style.clear="both",n.wrap.style.width=o[0]+2*m.borderWidth+"px",n.wrap.style.height=o[1]+2*m.borderWidth+"px",n.wrap.style.zIndex=m.zIndex,n.box.style.width=o[0]+"px",n.box.style.height=o[1]+"px",n.boxS.style.position="absolute",n.boxS.style.left="0",n.boxS.style.top="0",n.boxS.style.width="100%",n.boxS.style.height="100%",e.setBorderRadius(n.boxS,d+"px"),n.boxB.style.position="relative",n.boxB.style.border=m.borderWidth+"px solid",n.boxB.style.borderColor=m.borderColor,n.boxB.style.background=m.backgroundColor,e.setBorderRadius(n.boxB,d+"px"),n.padM.style.background=n.sldM.style.background="#FFF",e.setStyle(n.padM,"opacity","0"),e.setStyle(n.sldM,"opacity","0"),n.pad.style.position="relative",n.pad.style.width=m.width+"px",n.pad.style.height=m.height+"px",n.padPal.draw(m.width,m.height,e.getPadYComponent(m)),n.padB.style.position="absolute",n.padB.style.left=m.padding+"px",n.padB.style.top=m.padding+"px",n.padB.style.border=m.insetWidth+"px solid",n.padB.style.borderColor=m.insetColor,n.padM._jscInstance=m,n.padM._jscControlName="pad",n.padM.style.position="absolute",n.padM.style.left="0",n.padM.style.top="0",n.padM.style.width=m.padding+2*m.insetWidth+m.width+s/2+"px",n.padM.style.height=o[1]+"px",n.padM.style.cursor=c,n.cross.style.position="absolute",n.cross.style.left=n.cross.style.top="0",n.cross.style.width=n.cross.style.height=i+"px",n.crossBY.style.position=n.crossBX.style.position="absolute",n.crossBY.style.background=n.crossBX.style.background=m.pointerBorderColor,n.crossBY.style.width=n.crossBX.style.height=2*m.pointerBorderWidth+m.pointerThickness+"px",n.crossBY.style.height=n.crossBX.style.width=i+"px",n.crossBY.style.left=n.crossBX.style.top=Math.floor(i/2)-Math.floor(m.pointerThickness/2)-m.pointerBorderWidth+"px",n.crossBY.style.top=n.crossBX.style.left="0",n.crossLY.style.position=n.crossLX.style.position="absolute",n.crossLY.style.background=n.crossLX.style.background=m.pointerColor,n.crossLY.style.height=n.crossLX.style.width=i-2*m.pointerBorderWidth+"px",n.crossLY.style.width=n.crossLX.style.height=m.pointerThickness+"px",n.crossLY.style.left=n.crossLX.style.top=Math.floor(i/2)-Math.floor(m.pointerThickness/2)+"px",n.crossLY.style.top=n.crossLX.style.left=m.pointerBorderWidth+"px",n.sld.style.overflow="hidden",n.sld.style.width=m.sliderSize+"px",n.sld.style.height=m.height+"px",n.sldGrad.draw(m.sliderSize,m.height,"#000","#000"),n.sldB.style.display=r?"block":"none",n.sldB.style.position="absolute",n.sldB.style.right=m.padding+"px",n.sldB.style.top=m.padding+"px",n.sldB.style.border=m.insetWidth+"px solid",n.sldB.style.borderColor=m.insetColor,n.sldM._jscInstance=m,n.sldM._jscControlName="sld",n.sldM.style.display=r?"block":"none",n.sldM.style.position="absolute",n.sldM.style.right="0",n.sldM.style.top="0",n.sldM.style.width=m.sliderSize+s/2+m.padding+2*m.insetWidth+"px",n.sldM.style.height=o[1]+"px",n.sldM.style.cursor="default",n.sldPtrIB.style.border=n.sldPtrOB.style.border=m.pointerBorderWidth+"px solid "+m.pointerBorderColor,n.sldPtrOB.style.position="absolute",n.sldPtrOB.style.left=-(2*m.pointerBorderWidth+m.pointerThickness)+"px",n.sldPtrOB.style.top="0",n.sldPtrMB.style.border=m.pointerThickness+"px solid "+m.pointerColor,n.sldPtrS.style.width=m.sliderSize+"px",n.sldPtrS.style.height=g+"px",n.btn.style.display=m.closable?"block":"none",n.btn.style.position="absolute",n.btn.style.left=m.padding+"px",n.btn.style.bottom=m.padding+"px",n.btn.style.padding="0 15px",n.btn.style.height=m.buttonHeight+"px",n.btn.style.border=m.insetWidth+"px solid",t(),n.btn.style.color=m.buttonColor,n.btn.style.font="12px sans-serif",n.btn.style.textAlign="center";try{n.btn.style.cursor="pointer"}catch(h){n.btn.style.cursor="hand"}n.btn.onmousedown=function(){m.hide()},n.btnT.style.lineHeight=m.buttonHeight+"px",n.btnT.innerHTML="",n.btnT.appendChild(document.createTextNode(m.closeText)),l(),a(),e.picker.owner&&e.picker.owner!==m&&e.unsetClass(e.picker.owner.targetElement,m.activeClass),e.picker.owner=m,e.isElementType(v,"body")?e.redrawPosition():e._drawPosition(m,0,0,"relative",!1),n.wrap.parentNode!=v&&v.appendChild(n.wrap),e.setClass(m.targetElement,m.activeClass)}function l(){switch(e.getPadYComponent(m)){case"s":var t=1;break;case"v":var t=2}var n=Math.round(m.hsv[0]/360*(m.width-1)),r=Math.round((1-m.hsv[t]/100)*(m.height-1)),i=2*m.pointerBorderWidth+m.pointerThickness+2*m.crossSize,s=-Math.floor(i/2);switch(e.picker.cross.style.left=n+s+"px",e.picker.cross.style.top=r+s+"px",e.getSliderComponent(m)){case"s":var l=o(m.hsv[0],100,m.hsv[2]),a=o(m.hsv[0],0,m.hsv[2]),d="rgb("+Math.round(l[0])+","+Math.round(l[1])+","+Math.round(l[2])+")",c="rgb("+Math.round(a[0])+","+Math.round(a[1])+","+Math.round(a[2])+")";e.picker.sldGrad.draw(m.sliderSize,m.height,d,c);break;case"v":var h=o(m.hsv[0],m.hsv[1],100),d="rgb("+Math.round(h[0])+","+Math.round(h[1])+","+Math.round(h[2])+")",c="#000";e.picker.sldGrad.draw(m.sliderSize,m.height,d,c)}}function a(){var t=e.getSliderComponent(m);if(t){switch(t){case"s":var n=1;break;case"v":var n=2}var r=Math.round((1-m.hsv[n]/100)*(m.height-1));e.picker.sldPtrOB.style.top=r-(2*m.pointerBorderWidth+m.pointerThickness)-Math.floor(g/2)+"px"}}function d(){return e.picker&&e.picker.owner===m}function c(){m.importColor()}this.value=null,this.valueElement=t,this.styleElement=t,this.required=!0,this.refine=!0,this.hash=!1,this.uppercase=!0,this.onFineChange=null,this.activeClass="jscolor-active",this.minS=0,this.maxS=100,this.minV=0,this.maxV=100,this.hsv=[0,0,100],this.rgb=[255,255,255],this.width=181,this.height=101,this.showOnClick=!0,this.mode="HSV",this.position="bottom",this.smartPosition=!0,this.sliderSize=16,this.crossSize=8,this.closable=!1,this.closeText="Close",this.buttonColor="#000000",this.buttonHeight=18,this.padding=12,this.backgroundColor="#FFFFFF",this.borderWidth=1,this.borderColor="#BBBBBB",this.borderRadius=8,this.insetWidth=1,this.insetColor="#BBBBBB",this.shadow=!0,this.shadowBlur=15,this.shadowColor="rgba(0,0,0,0.2)",this.pointerColor="#4C4C4C",this.pointerBorderColor="#FFFFFF",this.pointerBorderWidth=1,this.pointerThickness=2,this.zIndex=1e3,this.container=null;for(var h in n)n.hasOwnProperty(h)&&(this[h]=n[h]);if(this.hide=function(){d()&&i()},this.show=function(){s()},this.redraw=function(){d()&&s()},this.importColor=function(){this.valueElement&&e.isElementType(this.valueElement,"input")?this.refine?!this.required&&/^\s*$/.test(this.valueElement.value)?(this.valueElement.value="",this.styleElement&&(this.styleElement.style.backgroundImage=this.styleElement._jscOrigStyle.backgroundImage,this.styleElement.style.backgroundColor=this.styleElement._jscOrigStyle.backgroundColor,this.styleElement.style.color=this.styleElement._jscOrigStyle.color),this.exportColor(e.leaveValue|e.leaveStyle)):this.fromString(this.valueElement.value)||this.exportColor():this.fromString(this.valueElement.value,e.leaveValue)||(this.styleElement&&(this.styleElement.style.backgroundImage=this.styleElement._jscOrigStyle.backgroundImage,this.styleElement.style.backgroundColor=this.styleElement._jscOrigStyle.backgroundColor,this.styleElement.style.color=this.styleElement._jscOrigStyle.color),this.exportColor(e.leaveValue|e.leaveStyle)):this.exportColor()},this.exportColor=function(t){if(!(t&e.leaveValue)&&this.valueElement){var n=""+this;this.uppercase&&(n=n.toUpperCase()),this.hash&&(n="#"+n),e.isElementType(this.valueElement,"input")?this.valueElement.value=n:this.valueElement.innerHTML=n}t&e.leaveStyle||this.styleElement&&(this.styleElement.style.backgroundImage="none",this.styleElement.style.backgroundColor="#"+this,this.styleElement.style.color=this.isLight()?"#000":"#FFF"),t&e.leavePad||!d()||l(),t&e.leaveSld||!d()||a()},this.fromHSV=function(e,t,n,r){if(null!==e){if(isNaN(e))return!1;e=Math.max(0,Math.min(360,e))}if(null!==t){if(isNaN(t))return!1;t=Math.max(0,Math.min(100,this.maxS,t),this.minS)}if(null!==n){if(isNaN(n))return!1;n=Math.max(0,Math.min(100,this.maxV,n),this.minV)}this.rgb=o(null===e?this.hsv[0]:this.hsv[0]=e,null===t?this.hsv[1]:this.hsv[1]=t,null===n?this.hsv[2]:this.hsv[2]=n),this.exportColor(r)},this.fromRGB=function(e,t,n,i){if(null!==e){if(isNaN(e))return!1;e=Math.max(0,Math.min(255,e))}if(null!==t){if(isNaN(t))return!1;t=Math.max(0,Math.min(255,t))}if(null!==n){if(isNaN(n))return!1;n=Math.max(0,Math.min(255,n))}var s=r(null===e?this.rgb[0]:e,null===t?this.rgb[1]:t,null===n?this.rgb[2]:n);null!==s[0]&&(this.hsv[0]=Math.max(0,Math.min(360,s[0]))),0!==s[2]&&(this.hsv[1]=null===s[1]?null:Math.max(0,this.minS,Math.min(100,this.maxS,s[1]))),this.hsv[2]=null===s[2]?null:Math.max(0,this.minV,Math.min(100,this.maxV,s[2]));var l=o(this.hsv[0],this.hsv[1],this.hsv[2]);this.rgb[0]=l[0],this.rgb[1]=l[1],this.rgb[2]=l[2],this.exportColor(i)},this.fromString=function(e,t){var n;if(n=e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i))return 6===n[1].length?this.fromRGB(parseInt(n[1].substr(0,2),16),parseInt(n[1].substr(2,2),16),parseInt(n[1].substr(4,2),16),t):this.fromRGB(parseInt(n[1].charAt(0)+n[1].charAt(0),16),parseInt(n[1].charAt(1)+n[1].charAt(1),16),parseInt(n[1].charAt(2)+n[1].charAt(2),16),t),!0;if(n=e.match(/^\W*rgba?\(([^)]*)\)\W*$/i)){var r,o,i,s=n[1].split(","),l=/^\s*(\d*)(\.\d+)?\s*$/;if(s.length>=3&&(r=s[0].match(l))&&(o=s[1].match(l))&&(i=s[2].match(l))){var a=parseFloat((r[1]||"0")+(r[2]||"")),d=parseFloat((o[1]||"0")+(o[2]||"")),c=parseFloat((i[1]||"0")+(i[2]||""));return this.fromRGB(a,d,c,t),!0}}return!1},this.toString=function(){return(256|Math.round(this.rgb[0])).toString(16).substr(1)+(256|Math.round(this.rgb[1])).toString(16).substr(1)+(256|Math.round(this.rgb[2])).toString(16).substr(1)},this.toHEXString=function(){return"#"+(""+this).toUpperCase()},this.toRGBString=function(){return"rgb("+Math.round(this.rgb[0])+","+Math.round(this.rgb[1])+","+Math.round(this.rgb[2])+")"},this.isLight=function(){return.213*this.rgb[0]+.715*this.rgb[1]+.072*this.rgb[2]>127.5},this._processParentElementsInDOM=function(){if(!this._linkedElementsProcessed){this._linkedElementsProcessed=!0;var t=this.targetElement;do{var n=e.getStyle(t);n&&"fixed"===n.position.toLowerCase()&&(this.fixed=!0),t!==this.targetElement&&(t._jscEventsAttached||(e.attachEvent(t,"scroll",e.onParentScroll),t._jscEventsAttached=!0))}while((t=t.parentNode)&&!e.isElementType(t,"body"))}},"string"==typeof t){var p=t,u=document.getElementById(p);u?this.targetElement=u:e.warn("Could not find target element with ID '"+p+"'")}else t?this.targetElement=t:e.warn("Invalid target element: '"+t+"'");if(this.targetElement._jscLinkedInstance)return void e.warn("Cannot link jscolor twice to the same element. Skipping.");this.targetElement._jscLinkedInstance=this,this.valueElement=e.fetchElement(this.valueElement),this.styleElement=e.fetchElement(this.styleElement);var m=this,v=this.container?e.fetchElement(this.container):document.getElementsByTagName("body")[0],g=3;if(e.isElementType(this.targetElement,"button"))if(this.targetElement.onclick){var y=this.targetElement.onclick;this.targetElement.onclick=function(e){return y.call(this,e),!1}}else this.targetElement.onclick=function(){return!1};if(this.valueElement&&e.isElementType(this.valueElement,"input")){var f=function(){m.fromString(m.valueElement.value,e.leaveValue),e.dispatchFineChange(m)};e.attachEvent(this.valueElement,"keyup",f),e.attachEvent(this.valueElement,"input",f),e.attachEvent(this.valueElement,"blur",c),this.valueElement.setAttribute("autocomplete","off")}this.styleElement&&(this.styleElement._jscOrigStyle={backgroundImage:this.styleElement.style.backgroundImage,backgroundColor:this.styleElement.style.backgroundColor,color:this.styleElement.style.color}),this.value?this.fromString(this.value)||this.exportColor():this.importColor()}};return e.jscolor.lookupClass="jscolor",e.jscolor.installByClassName=function(t){var n=document.getElementsByTagName("input"),r=document.getElementsByTagName("button");e.tryInstallOnElements(n,t),e.tryInstallOnElements(r,t)},e.register(),e.jscolor}());


   //Number format...

   Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
	    j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };

 