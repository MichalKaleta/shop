(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();var x=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","#","$","%","*","+",",","-",".",":",";","=","?","@","[","]","^","_","{","|","}","~"],g=t=>{let e=0;for(let r=0;r<t.length;r++){let s=t[r],n=x.indexOf(s);e=e*83+n}return e},b=t=>{let e=t/255;return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)},w=t=>{let e=Math.max(0,Math.min(1,t));return e<=.0031308?Math.trunc(e*12.92*255+.5):Math.trunc((1.055*Math.pow(e,.4166666666666667)-.055)*255+.5)},N=t=>t<0?-1:1,y=(t,e)=>N(t)*Math.pow(Math.abs(t),e),C=class extends Error{constructor(t){super(t),this.name="ValidationError",this.message=t}},O=t=>{if(!t||t.length<6)throw new C("The blurhash string must be at least 6 characters");let e=g(t[0]),r=Math.floor(e/9)+1,s=e%9+1;if(t.length!==4+2*s*r)throw new C(`blurhash length mismatch: length is ${t.length} but it should be ${4+2*s*r}`)},S=t=>{let e=t>>16,r=t>>8&255,s=t&255;return[b(e),b(r),b(s)]},T=(t,e)=>{let r=Math.floor(t/361),s=Math.floor(t/19)%19,n=t%19;return[y((r-9)/9,2)*e,y((s-9)/9,2)*e,y((n-9)/9,2)*e]},_=(t,e,r,s)=>{O(t),s=s|1;let n=g(t[0]),a=Math.floor(n/9)+1,o=n%9+1,u=(g(t[1])+1)/166,d=new Array(o*a);for(let i=0;i<d.length;i++)if(i===0){let c=g(t.substring(2,6));d[i]=S(c)}else{let c=g(t.substring(4+i*2,6+i*2));d[i]=T(c,u*s)}let l=e*4,h=new Uint8ClampedArray(l*r);for(let i=0;i<r;i++)for(let c=0;c<e;c++){let v=0,M=0,E=0;for(let p=0;p<a;p++)for(let m=0;m<o;m++){let f=Math.cos(Math.PI*c*m/e)*Math.cos(Math.PI*i*p/r),I=d[m+p*o];v+=I[0]*f,M+=I[1]*f,E+=I[2]*f}let L=w(v),z=w(M),P=w(E);h[4*c+0+i*l]=L,h[4*c+1+i*l]=z,h[4*c+2+i*l]=P,h[4*c+3+i*l]=255}return h},$=_;class A{constructor(){this.imageGrid=document.getElementById("imageGrid"),this.observerTarget=document.getElementById("observerTarget"),this.loading=!0,this.page=1,this.per_page=window.innerWidth>=1345?8:6,this.imageSize=null,this.setupIntersectionObserver(),this.fetchImages()}async fetchImages(){try{let r=await(await fetch(`https://api.unsplash.com/collections/Lyz89J_lfpY/photos?per_page=${this.per_page}&page=${this.page}`,{headers:{Authorization:`Client-ID ${secrets.UNSPLASH_KEY}`}})).json();if(r.errors)throw r.errors[0];this.renderImages(r)}catch(e){this.renderError(e),console.error("Error fetching images:",e),this.loading=!1}finally{this.loading=!1}}generatePrice(){return`$${(Math.random()*100+20).toFixed(2)}`}getImageSize(e){const{width:r,height:s}=e.getBoundingClientRect();return this.imageSize={width:parseInt(r),height:parseInt(s)},this.imageSize}getImageBlur(e,r,s){console.log(this.itemsToFetchCount,window.innerWidth),console.log(r,s);const n=document.createElement("canvas"),a=n.getContext("2d"),o=a.createImageData(r,s),u=$(e,r,s);return o.data.set(u),a.putImageData(o,0,0),n.toDataURL()}renderError(e){const r=document.createElement("p");r.className="error",r.innerHTML=e,document.body.appendChild(r)}renderImages(e){let r=0;e==null||e.forEach(s=>{const n=document.createElement("div");n.className="image-wraper",n.setAttribute("data-id",s.id);const a=document.createElement("div");a.className="image-container";const o=document.createElement("div");o.className="product-info";const u=document.createElement("h3");u.className="product-title",u.textContent=s.description||s.alt_description||"-";const d=document.createElement("div");d.className="product-price",d.textContent=this.generatePrice();const l=document.createElement("img");l.className="lazy-image",l.alt=s.alt_description||"Product",l.loading="lazy",o.appendChild(u),o.appendChild(d),n.appendChild(a),n.appendChild(o),this.imageGrid.appendChild(n);const h=this.imageSize?this.imageSize:this.getImageSize(a);a.style.backgroundImage=`url(${this.getImageBlur(s.blur_hash,h.width,h.height)})`,l.src=s.urls.regular,a.appendChild(l),window.setTimeout(()=>{n.classList.add("appear")},r),r+=200}),r=0}setupIntersectionObserver(){new IntersectionObserver(r=>{r[0].isIntersecting&&!this.loading&&(this.page++,this.fetchImages())},{rootMargin:"100px",threshold:.1}).observe(this.observerTarget)}}document.addEventListener("DOMContentLoaded",()=>{new A});
