var Cd=0,Dl=1,Pd=2;var du=1,el=2,Bi=3,Qi=0,_n=1,Nn=2;var ji=0,$s=1,fn=2,Ul=3,Hl=4,Id=5,ms=100,Ld=101,Dd=102,Nl=103,Fl=104,Ud=200,Hd=201,Nd=202,Fd=203,fc=204,pc=205,Bd=206,Od=207,zd=208,Gd=209,kd=210,Vd=211,Wd=212,Xd=213,qd=214,Yd=0,Zd=1,Jd=2,Io=3,$d=4,Kd=5,jd=6,Qd=7,fu=0,ef=1,tf=2,bi=0,nf=1,sf=2,rf=3,of=4,af=5,cf=6;var pu=300,Qs=301,er=302,mc=303,gc=304,ta=306,tr=1e3,pi=1001,xc=1002,vn=1003,Bl=1004;var Da=1005;var Zt=1006,lf=1007;var Ur=1008;var Ri=1009,hf=1010,uf=1011,tl=1012,mu=1013,wi=1014,Ki=1015,ki=1016,gu=1017,xu=1018,xs=1020,df=1021,mi=1023,ff=1024,pf=1025,Gi=1026,nr=1027,mf=1028,vu=1029,gf=1030,yu=1031,_u=1033,Ua=33776,Ha=33777,Na=33778,Fa=33779,Ol=35840,zl=35841,Gl=35842,kl=35843,Eu=36196,Vl=37492,Wl=37496,Xl=37808,ql=37809,Yl=37810,Zl=37811,Jl=37812,$l=37813,Kl=37814,jl=37815,Ql=37816,eh=37817,th=37818,nh=37819,ih=37820,sh=37821,Ba=36492,rh=36494,oh=36495,xf=36283,ah=36284,ch=36285,lh=36286;var Lo=2300,Do=2301,Oa=2302,hh=2400,uh=2401,dh=2402;var Mu=3e3,vs=3001,vf=3200,yf=3201,Tu=0,_f=1,ti="",Qt="srgb",gi="srgb-linear",nl="display-p3",na="display-p3-linear",Uo="linear",kt="srgb",Ho="rec709",No="p3";var As=7680;var fh=519,Ef=512,Mf=513,Tf=514,Su=515,Sf=516,wf=517,bf=518,Rf=519,ph=35044;var mh="300 es",vc=1035,zi=2e3,Fo=2001,es=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],gh=1234567,Rr=Math.PI/180,Hr=180/Math.PI;function Ts(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Cn[i&255]+Cn[i>>8&255]+Cn[i>>16&255]+Cn[i>>24&255]+"-"+Cn[e&255]+Cn[e>>8&255]+"-"+Cn[e>>16&15|64]+Cn[e>>24&255]+"-"+Cn[t&63|128]+Cn[t>>8&255]+"-"+Cn[t>>16&255]+Cn[t>>24&255]+Cn[n&255]+Cn[n>>8&255]+Cn[n>>16&255]+Cn[n>>24&255]).toLowerCase()}function dn(i,e,t){return Math.max(e,Math.min(t,i))}function il(i,e){return(i%e+e)%e}function Af(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Cf(i,e,t){return i!==e?(t-i)/(e-i):0}function Ar(i,e,t){return(1-t)*i+t*e}function Pf(i,e,t,n){return Ar(i,e,1-Math.exp(-t*n))}function If(i,e=1){return e-Math.abs(il(i,e*2)-e)}function Lf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Df(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Uf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Hf(i,e){return i+Math.random()*(e-i)}function Nf(i){return i*(.5-Math.random())}function Ff(i){i!==void 0&&(gh=i);let e=gh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bf(i){return i*Rr}function Of(i){return i*Hr}function yc(i){return(i&i-1)===0&&i!==0}function zf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Bo(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Gf(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Un(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ia={DEG2RAD:Rr,RAD2DEG:Hr,generateUUID:Ts,clamp:dn,euclideanModulo:il,mapLinear:Af,inverseLerp:Cf,lerp:Ar,damp:Pf,pingpong:If,smoothstep:Lf,smootherstep:Df,randInt:Uf,randFloat:Hf,randFloatSpread:Nf,seededRandom:Ff,degToRad:Bf,radToDeg:Of,isPowerOfTwo:yc,ceilPowerOfTwo:zf,floorPowerOfTwo:Bo,setQuaternionFromProperEuler:Gf,normalize:Un,denormalize:Xs},pe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xt=class i{constructor(e,t,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],T=s[1],v=s[4],E=s[7],I=s[2],b=s[5],A=s[8];return r[0]=o*x+a*T+c*I,r[3]=o*m+a*v+c*b,r[6]=o*p+a*E+c*A,r[1]=l*x+h*T+u*I,r[4]=l*m+h*v+u*b,r[7]=l*p+h*E+u*A,r[2]=d*x+f*T+g*I,r[5]=d*m+f*v+g*b,r[8]=d*p+f*E+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(s*l-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=d*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(za.makeScale(e,t)),this}rotate(e){return this.premultiply(za.makeRotation(-e)),this}translate(e,t){return this.premultiply(za.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},za=new xt;function wu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Oo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kf(){let i=Oo("canvas");return i.style.display="block",i}var xh={};function Cr(i){i in xh||(xh[i]=!0,console.warn(i))}var vh=new xt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),yh=new xt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),to={[gi]:{transfer:Uo,primaries:Ho,toReference:i=>i,fromReference:i=>i},[Qt]:{transfer:kt,primaries:Ho,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[na]:{transfer:Uo,primaries:No,toReference:i=>i.applyMatrix3(yh),fromReference:i=>i.applyMatrix3(vh)},[nl]:{transfer:kt,primaries:No,toReference:i=>i.convertSRGBToLinear().applyMatrix3(yh),fromReference:i=>i.applyMatrix3(vh).convertLinearToSRGB()}},Vf=new Set([gi,na]),Ft={enabled:!0,_workingColorSpace:gi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Vf.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=to[e].toReference,s=to[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return to[i].primaries},getTransfer:function(i){return i===ti?Uo:to[i].transfer}};function Ks(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ga(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Cs,zo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Cs===void 0&&(Cs=Oo("canvas")),Cs.width=e.width,Cs.height=e.height;let n=Cs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Cs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Oo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ks(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ks(t[n]/255)*255):t[n]=Ks(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Wf=0,Go=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Ts(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ka(s[o].image)):r.push(ka(s[o]))}else r=ka(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ka(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?zo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Xf=0,ni=class i extends es{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=pi,s=pi,r=Zt,o=Ur,a=mi,c=Ri,l=i.DEFAULT_ANISOTROPY,h=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xf++}),this.uuid=Ts(),this.name="",this.source=new Go(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Cr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===vs?Qt:ti),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case tr:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case xc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case tr:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case xc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Cr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Qt?vs:Mu}set encoding(e){Cr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===vs?Qt:ti}};ni.DEFAULT_IMAGE=null;ni.DEFAULT_MAPPING=pu;ni.DEFAULT_ANISOTROPY=1;var Jt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,E=(f+1)/2,I=(p+1)/2,b=(h+d)/4,A=(u+x)/4,F=(g+m)/4;return v>E&&v>I?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=b/n,r=A/n):E>I?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=b/s,r=F/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=A/r,s=F/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-x)/T,this.z=(d-h)/T,this.w=Math.acos((l+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},_c=class extends es{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Jt(0,0,e,t),this.scissorTest=!1,this.viewport=new Jt(0,0,e,t);let s={width:e,height:t,depth:1};n.encoding!==void 0&&(Cr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===vs?Qt:ti),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new ni(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Go(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},on=class extends _c{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ko=class extends ni{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ec=class extends ni{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ii=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(u!==x||c!==d||l!==f||h!==g){let m=1-a,p=c*d+l*f+h*g+u*x,T=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let I=Math.sqrt(v),b=Math.atan2(I,p*T);m=Math.sin(m*b)/I,a=Math.sin(a*b)/I}let E=a*T;if(c=c*m+d*E,l=l*m+f*E,h=h*m+g*E,u=u*m+x*E,m===1-a){let I=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=I,l*=I,h*=I,u*=I}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dn(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_h.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_h.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Va.copy(this).projectOnVector(e),this.sub(Va)}reflect(e){return this.sub(Va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(dn(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Va=new R,_h=new ii,Vi=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ui.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ui.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ui.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ui):ui.fromBufferAttribute(r,o),ui.applyMatrix4(e.matrixWorld),this.expandByPoint(ui);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),no.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),no.copy(n.boundingBox)),no.applyMatrix4(e.matrixWorld),this.union(no)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ui),ui.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_r),io.subVectors(this.max,_r),Ps.subVectors(e.a,_r),Is.subVectors(e.b,_r),Ls.subVectors(e.c,_r),qi.subVectors(Is,Ps),Yi.subVectors(Ls,Is),hs.subVectors(Ps,Ls);let t=[0,-qi.z,qi.y,0,-Yi.z,Yi.y,0,-hs.z,hs.y,qi.z,0,-qi.x,Yi.z,0,-Yi.x,hs.z,0,-hs.x,-qi.y,qi.x,0,-Yi.y,Yi.x,0,-hs.y,hs.x,0];return!Wa(t,Ps,Is,Ls,io)||(t=[1,0,0,0,1,0,0,0,1],!Wa(t,Ps,Is,Ls,io))?!1:(so.crossVectors(qi,Yi),t=[so.x,so.y,so.z],Wa(t,Ps,Is,Ls,io))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ui).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ui).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Di=[new R,new R,new R,new R,new R,new R,new R,new R],ui=new R,no=new Vi,Ps=new R,Is=new R,Ls=new R,qi=new R,Yi=new R,hs=new R,_r=new R,io=new R,so=new R,us=new R;function Wa(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){us.fromArray(i,r);let a=s.x*Math.abs(us.x)+s.y*Math.abs(us.y)+s.z*Math.abs(us.z),c=e.dot(us),l=t.dot(us),h=n.dot(us);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var qf=new Vi,Er=new R,Xa=new R,ts=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):qf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);let t=Er.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Er,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(Xa)),this.expandByPoint(Er.copy(e.center).sub(Xa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ui=new R,qa=new R,ro=new R,Zi=new R,Ya=new R,oo=new R,Za=new R,Nr=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ui.copy(this.origin).addScaledVector(this.direction,t),Ui.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){qa.copy(e).add(t).multiplyScalar(.5),ro.copy(t).sub(e).normalize(),Zi.copy(this.origin).sub(qa);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ro),a=Zi.dot(this.direction),c=-Zi.dot(ro),l=Zi.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(qa).addScaledVector(ro,d),f}intersectSphere(e,t){Ui.subVectors(e.center,this.origin);let n=Ui.dot(this.direction),s=Ui.dot(Ui)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ui)!==null}intersectTriangle(e,t,n,s,r){Ya.subVectors(t,e),oo.subVectors(n,e),Za.crossVectors(Ya,oo);let o=this.direction.dot(Za),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zi.subVectors(this.origin,e);let c=a*this.direction.dot(oo.crossVectors(Zi,oo));if(c<0)return null;let l=a*this.direction.dot(Ya.cross(Zi));if(l<0||c+l>o)return null;let h=-a*Zi.dot(Za);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Rt=class i{constructor(e,t,n,s,r,o,a,c,l,h,u,d,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,x,m)}set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Ds.setFromMatrixColumn(e,0).length(),r=1/Ds.setFromMatrixColumn(e,1).length(),o=1/Ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-x*l,t[9]=-a*c,t[2]=x-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,x=l*u;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,x=l*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+x,t[1]=c*u,t[5]=x*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){let d=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yf,e,Zf)}lookAt(e,t,n){let s=this.elements;return qn.subVectors(e,t),qn.lengthSq()===0&&(qn.z=1),qn.normalize(),Ji.crossVectors(n,qn),Ji.lengthSq()===0&&(Math.abs(n.z)===1?qn.x+=1e-4:qn.z+=1e-4,qn.normalize(),Ji.crossVectors(n,qn)),Ji.normalize(),ao.crossVectors(qn,Ji),s[0]=Ji.x,s[4]=ao.x,s[8]=qn.x,s[1]=Ji.y,s[5]=ao.y,s[9]=qn.y,s[2]=Ji.z,s[6]=ao.z,s[10]=qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],T=n[3],v=n[7],E=n[11],I=n[15],b=s[0],A=s[4],F=s[8],M=s[12],S=s[1],k=s[5],Z=s[9],ae=s[13],U=s[2],O=s[6],X=s[10],ue=s[14],ee=s[3],ne=s[7],oe=s[11],ce=s[15];return r[0]=o*b+a*S+c*U+l*ee,r[4]=o*A+a*k+c*O+l*ne,r[8]=o*F+a*Z+c*X+l*oe,r[12]=o*M+a*ae+c*ue+l*ce,r[1]=h*b+u*S+d*U+f*ee,r[5]=h*A+u*k+d*O+f*ne,r[9]=h*F+u*Z+d*X+f*oe,r[13]=h*M+u*ae+d*ue+f*ce,r[2]=g*b+x*S+m*U+p*ee,r[6]=g*A+x*k+m*O+p*ne,r[10]=g*F+x*Z+m*X+p*oe,r[14]=g*M+x*ae+m*ue+p*ce,r[3]=T*b+v*S+E*U+I*ee,r[7]=T*A+v*k+E*O+I*ne,r[11]=T*F+v*Z+E*X+I*oe,r[15]=T*M+v*ae+E*ue+I*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+x*(+t*c*f-t*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+t*l*u-t*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-t*c*u+t*a*d+s*o*u-n*o*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],T=u*m*l-x*d*l+x*c*f-a*m*f-u*c*p+a*d*p,v=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,E=h*x*l-g*u*l+g*a*f-o*x*f-h*a*p+o*u*p,I=g*u*c-h*x*c-g*a*d+o*x*d+h*a*m-o*u*m,b=t*T+n*v+s*E+r*I;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/b;return e[0]=T*A,e[1]=(x*d*r-u*m*r-x*s*f+n*m*f+u*s*p-n*d*p)*A,e[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*p+n*c*p)*A,e[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*A,e[4]=v*A,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*A,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*A,e[7]=(o*d*r-h*c*r+h*s*l-t*d*l-o*s*f+t*c*f)*A,e[8]=E*A,e[9]=(g*u*r-h*x*r-g*n*f+t*x*f+h*n*p-t*u*p)*A,e[10]=(o*x*r-g*a*r+g*n*l-t*x*l-o*n*p+t*a*p)*A,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*f-t*a*f)*A,e[12]=I*A,e[13]=(h*x*s-g*u*s+g*n*d-t*x*d-h*n*m+t*u*m)*A,e[14]=(g*a*s-o*x*s-g*n*c+t*x*c+o*n*m-t*a*m)*A,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*d+t*a*d)*A,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,x=o*h,m=o*u,p=a*u,T=c*l,v=c*h,E=c*u,I=n.x,b=n.y,A=n.z;return s[0]=(1-(x+p))*I,s[1]=(f+E)*I,s[2]=(g-v)*I,s[3]=0,s[4]=(f-E)*b,s[5]=(1-(d+p))*b,s[6]=(m+T)*b,s[7]=0,s[8]=(g+v)*A,s[9]=(m-T)*A,s[10]=(1-(d+x))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Ds.set(s[0],s[1],s[2]).length(),o=Ds.set(s[4],s[5],s[6]).length(),a=Ds.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],di.copy(this);let l=1/r,h=1/o,u=1/a;return di.elements[0]*=l,di.elements[1]*=l,di.elements[2]*=l,di.elements[4]*=h,di.elements[5]*=h,di.elements[6]*=h,di.elements[8]*=u,di.elements[9]*=u,di.elements[10]*=u,t.setFromRotationMatrix(di),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=zi){let c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s),f,g;if(a===zi)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Fo)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=zi){let c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),d=(t+e)*l,f=(n+s)*h,g,x;if(a===zi)g=(o+r)*u,x=-2*u;else if(a===Fo)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ds=new R,di=new Rt,Yf=new R(0,0,0),Zf=new R(1,1,1),Ji=new R,ao=new R,qn=new R,Eh=new Rt,Mh=new ii,Ai=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(dn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-dn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(dn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-dn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(dn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-dn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Eh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Eh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mh.setFromEuler(this),this.setFromQuaternion(Mh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ai.DEFAULT_ORDER="XYZ";var Fr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Jf=0,Th=new R,Us=new ii,Hi=new Rt,co=new R,Mr=new R,$f=new R,Kf=new ii,Sh=new R(1,0,0),wh=new R(0,1,0),bh=new R(0,0,1),jf={type:"added"},Qf={type:"removed"},sn=class i extends es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new Ai,n=new ii,s=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new xt}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.multiply(Us),this}rotateOnWorldAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.premultiply(Us),this}rotateX(e){return this.rotateOnAxis(Sh,e)}rotateY(e){return this.rotateOnAxis(wh,e)}rotateZ(e){return this.rotateOnAxis(bh,e)}translateOnAxis(e,t){return Th.copy(e).applyQuaternion(this.quaternion),this.position.add(Th.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sh,e)}translateY(e){return this.translateOnAxis(wh,e)}translateZ(e){return this.translateOnAxis(bh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?co.copy(e):co.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hi.lookAt(Mr,co,this.up):Hi.lookAt(co,Mr,this.up),this.quaternion.setFromRotationMatrix(Hi),s&&(Hi.extractRotation(s.matrixWorld),Us.setFromRotationMatrix(Hi),this.quaternion.premultiply(Us.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(jf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qf)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,$f),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,Kf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};sn.DEFAULT_UP=new R(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fi=new R,Ni=new R,Ja=new R,Fi=new R,Hs=new R,Ns=new R,Rh=new R,$a=new R,Ka=new R,ja=new R,lo=!1,qs=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),fi.subVectors(e,t),s.cross(fi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){fi.subVectors(s,t),Ni.subVectors(n,t),Ja.subVectors(e,t);let o=fi.dot(fi),a=fi.dot(Ni),c=fi.dot(Ja),l=Ni.dot(Ni),h=Ni.dot(Ja),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getUV(e,t,n,s,r,o,a,c){return lo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),lo=!0),this.getInterpolation(e,t,n,s,r,o,a,c)}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Fi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Fi.x),c.addScaledVector(o,Fi.y),c.addScaledVector(a,Fi.z),c)}static isFrontFacing(e,t,n,s){return fi.subVectors(n,t),Ni.subVectors(e,t),fi.cross(Ni).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fi.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),fi.cross(Ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return lo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),lo=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Hs.subVectors(s,n),Ns.subVectors(r,n),$a.subVectors(e,n);let c=Hs.dot($a),l=Ns.dot($a);if(c<=0&&l<=0)return t.copy(n);Ka.subVectors(e,s);let h=Hs.dot(Ka),u=Ns.dot(Ka);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Hs,o);ja.subVectors(e,r);let f=Hs.dot(ja),g=Ns.dot(ja);if(g>=0&&f<=g)return t.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Ns,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Rh.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(Rh,a);let p=1/(m+x+d);return o=x*p,a=d*p,t.copy(n).addScaledVector(Hs,o).addScaledVector(Ns,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},ho={h:0,s:0,l:0};function Qa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ce=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ft.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ft.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ft.workingColorSpace){if(e=il(e,1),t=dn(t,0,1),n=dn(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Qa(o,r,e+1/3),this.g=Qa(o,r,e),this.b=Qa(o,r,e-1/3)}return Ft.toWorkingColorSpace(this,s),this}setStyle(e,t=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){let n=bu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ks(e.r),this.g=Ks(e.g),this.b=Ks(e.b),this}copyLinearToSRGB(e){return this.r=Ga(e.r),this.g=Ga(e.g),this.b=Ga(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return Ft.fromWorkingColorSpace(Pn.copy(this),e),Math.round(dn(Pn.r*255,0,255))*65536+Math.round(dn(Pn.g*255,0,255))*256+Math.round(dn(Pn.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ft.workingColorSpace){Ft.fromWorkingColorSpace(Pn.copy(this),t);let n=Pn.r,s=Pn.g,r=Pn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ft.workingColorSpace){return Ft.fromWorkingColorSpace(Pn.copy(this),t),e.r=Pn.r,e.g=Pn.g,e.b=Pn.b,e}getStyle(e=Qt){Ft.fromWorkingColorSpace(Pn.copy(this),e);let t=Pn.r,n=Pn.g,s=Pn.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL($i),this.setHSL($i.h+e,$i.s+t,$i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL($i),e.getHSL(ho);let n=Ar($i.h,ho.h,t),s=Ar($i.s,ho.s,t),r=Ar($i.l,ho.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pn=new Ce;Ce.NAMES=bu;var ep=0,ns=class extends es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Ts(),this.name="",this.type="Material",this.blending=$s,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fc,this.blendDst=pc,this.blendEquation=ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=Io,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=As,this.stencilZFail=As,this.stencilZPass=As,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$s&&(n.blending=this.blending),this.side!==Qi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fc&&(n.blendSrc=this.blendSrc),this.blendDst!==pc&&(n.blendDst=this.blendDst),this.blendEquation!==ms&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Io&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==As&&(n.stencilFail=this.stencilFail),this.stencilZFail!==As&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==As&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Bt=class extends ns{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=fu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var hn=new R,uo=new pe,yt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ph,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)uo.fromBufferAttribute(this,t),uo.applyMatrix3(e),this.setXY(t,uo.x,uo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix3(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyMatrix4(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.applyNormalMatrix(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hn.fromBufferAttribute(this,t),hn.transformDirection(e),this.setXYZ(t,hn.x,hn.y,hn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Un(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),n=Un(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),n=Un(n,this.array),s=Un(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),n=Un(n,this.array),s=Un(s,this.array),r=Un(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ph&&(e.usage=this.usage),e}};var Vo=class extends yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Wo=class extends yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var _t=class extends yt{constructor(e,t,n){super(new Float32Array(e),t,n)}};var tp=0,ei=new Rt,ec=new sn,Fs=new R,Yn=new Vi,Tr=new Vi,xn=new R,wt=class i extends es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tp++}),this.uuid=Ts(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wu(e)?Wo:Vo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new xt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ei.makeRotationFromQuaternion(e),this.applyMatrix4(ei),this}rotateX(e){return ei.makeRotationX(e),this.applyMatrix4(ei),this}rotateY(e){return ei.makeRotationY(e),this.applyMatrix4(ei),this}rotateZ(e){return ei.makeRotationZ(e),this.applyMatrix4(ei),this}translate(e,t,n){return ei.makeTranslation(e,t,n),this.applyMatrix4(ei),this}scale(e,t,n){return ei.makeScale(e,t,n),this.applyMatrix4(ei),this}lookAt(e){return ec.lookAt(e),ec.updateMatrix(),this.applyMatrix4(ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fs).negate(),this.translate(Fs.x,Fs.y,Fs.z),this}setFromPoints(e){let t=[];for(let n=0,s=e.length;n<s;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new _t(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Yn.setFromBufferAttribute(r),this.morphTargetsRelative?(xn.addVectors(this.boundingBox.min,Yn.min),this.boundingBox.expandByPoint(xn),xn.addVectors(this.boundingBox.max,Yn.max),this.boundingBox.expandByPoint(xn)):(this.boundingBox.expandByPoint(Yn.min),this.boundingBox.expandByPoint(Yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ts);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(Yn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Tr.setFromBufferAttribute(a),this.morphTargetsRelative?(xn.addVectors(Yn.min,Tr.min),Yn.expandByPoint(xn),xn.addVectors(Yn.max,Tr.max),Yn.expandByPoint(xn)):(Yn.expandByPoint(Tr.min),Yn.expandByPoint(Tr.max))}Yn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)xn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(xn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)xn.fromBufferAttribute(a,l),c&&(Fs.fromBufferAttribute(e,l),xn.add(Fs)),s=Math.max(s,n.distanceToSquared(xn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yt(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let S=0;S<a;S++)l[S]=new R,h[S]=new R;let u=new R,d=new R,f=new R,g=new pe,x=new pe,m=new pe,p=new R,T=new R;function v(S,k,Z){u.fromArray(s,S*3),d.fromArray(s,k*3),f.fromArray(s,Z*3),g.fromArray(o,S*2),x.fromArray(o,k*2),m.fromArray(o,Z*2),d.sub(u),f.sub(u),x.sub(g),m.sub(g);let ae=1/(x.x*m.y-m.x*x.y);isFinite(ae)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-x.y).multiplyScalar(ae),T.copy(f).multiplyScalar(x.x).addScaledVector(d,-m.x).multiplyScalar(ae),l[S].add(p),l[k].add(p),l[Z].add(p),h[S].add(T),h[k].add(T),h[Z].add(T))}let E=this.groups;E.length===0&&(E=[{start:0,count:n.length}]);for(let S=0,k=E.length;S<k;++S){let Z=E[S],ae=Z.start,U=Z.count;for(let O=ae,X=ae+U;O<X;O+=3)v(n[O+0],n[O+1],n[O+2])}let I=new R,b=new R,A=new R,F=new R;function M(S){A.fromArray(r,S*3),F.copy(A);let k=l[S];I.copy(k),I.sub(A.multiplyScalar(A.dot(k))).normalize(),b.crossVectors(F,k);let ae=b.dot(h[S])<0?-1:1;c[S*4]=I.x,c[S*4+1]=I.y,c[S*4+2]=I.z,c[S*4+3]=ae}for(let S=0,k=E.length;S<k;++S){let Z=E[S],ae=Z.start,U=Z.count;for(let O=ae,X=ae+U;O<X;O+=3)M(n[O+0]),M(n[O+1]),M(n[O+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new R,r=new R,o=new R,a=new R,c=new R,l=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xn.fromBufferAttribute(e,t),xn.normalize(),e.setXYZ(t,xn.x,xn.y,xn.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new yt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ah=new Rt,ds=new Nr,fo=new ts,Ch=new R,Bs=new R,Os=new R,zs=new R,tc=new R,po=new R,mo=new pe,go=new pe,xo=new pe,Ph=new R,Ih=new R,Lh=new R,vo=new R,yo=new R,B=class extends sn{constructor(e=new wt,t=new Bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){po.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(tc.fromBufferAttribute(u,e),o?po.addScaledVector(tc,h):po.addScaledVector(tc.sub(t),h))}t.add(po)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(r),ds.copy(e.ray).recast(e.near),!(fo.containsPoint(ds.origin)===!1&&(ds.intersectSphere(fo,Ch)===null||ds.origin.distanceToSquared(Ch)>(e.far-e.near)**2))&&(Ah.copy(r).invert(),ds.copy(e.ray).applyMatrix4(Ah),!(n.boundingBox!==null&&ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ds)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],T=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let E=T,I=v;E<I;E+=3){let b=a.getX(E),A=a.getX(E+1),F=a.getX(E+2);s=_o(this,p,e,n,l,h,u,b,A,F),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let T=a.getX(m),v=a.getX(m+1),E=a.getX(m+2);s=_o(this,o,e,n,l,h,u,T,v,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],T=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let E=T,I=v;E<I;E+=3){let b=E,A=E+1,F=E+2;s=_o(this,p,e,n,l,h,u,b,A,F),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let T=m,v=m+1,E=m+2;s=_o(this,o,e,n,l,h,u,T,v,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function np(i,e,t,n,s,r,o,a){let c;if(e.side===_n?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Qi,a),c===null)return null;yo.copy(a),yo.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(yo);return l<t.near||l>t.far?null:{distance:l,point:yo.clone(),object:i}}function _o(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Bs),i.getVertexPosition(c,Os),i.getVertexPosition(l,zs);let h=np(i,e,t,n,Bs,Os,zs,vo);if(h){s&&(mo.fromBufferAttribute(s,a),go.fromBufferAttribute(s,c),xo.fromBufferAttribute(s,l),h.uv=qs.getInterpolation(vo,Bs,Os,zs,mo,go,xo,new pe)),r&&(mo.fromBufferAttribute(r,a),go.fromBufferAttribute(r,c),xo.fromBufferAttribute(r,l),h.uv1=qs.getInterpolation(vo,Bs,Os,zs,mo,go,xo,new pe),h.uv2=h.uv1),o&&(Ph.fromBufferAttribute(o,a),Ih.fromBufferAttribute(o,c),Lh.fromBufferAttribute(o,l),h.normal=qs.getInterpolation(vo,Bs,Os,zs,Ph,Ih,Lh,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new R,materialIndex:0};qs.getNormal(Bs,Os,zs,u.normal),h.face=u}return h}var $e=class i extends wt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new _t(l,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(u,2));function g(x,m,p,T,v,E,I,b,A,F,M){let S=E/A,k=I/F,Z=E/2,ae=I/2,U=b/2,O=A+1,X=F+1,ue=0,ee=0,ne=new R;for(let oe=0;oe<X;oe++){let ce=oe*k-ae;for(let be=0;be<O;be++){let q=be*S-Z;ne[x]=q*T,ne[m]=ce*v,ne[p]=U,l.push(ne.x,ne.y,ne.z),ne[x]=0,ne[m]=0,ne[p]=b>0?1:-1,h.push(ne.x,ne.y,ne.z),u.push(be/A),u.push(1-oe/F),ue+=1}}for(let oe=0;oe<F;oe++)for(let ce=0;ce<A;ce++){let be=d+ce+O*oe,q=d+ce+O*(oe+1),j=d+(ce+1)+O*(oe+1),Se=d+(ce+1)+O*oe;c.push(be,q,Se),c.push(q,j,Se),ee+=6}a.addGroup(f,ee,M),f+=ee,d+=ue}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ir(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Hn(i){let e={};for(let t=0;t<i.length;t++){let n=ir(i[t]);for(let s in n)e[s]=n[s]}return e}function ip(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ru(i){return i.getRenderTarget()===null?i.outputColorSpace:Ft.workingColorSpace}var sp={clone:ir,merge:Hn},rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,op=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ot=class extends ns{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rp,this.fragmentShader=op,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ir(e.uniforms),this.uniformsGroups=ip(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Xo=class extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=zi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},yn=class extends Xo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Hr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Rr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hr*2*Math.atan(Math.tan(Rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Rr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Gs=-90,ks=1,Mc=class extends sn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new yn(Gs,ks,e,t);s.layers=this.layers,this.add(s);let r=new yn(Gs,ks,e,t);r.layers=this.layers,this.add(r);let o=new yn(Gs,ks,e,t);o.layers=this.layers,this.add(o);let a=new yn(Gs,ks,e,t);a.layers=this.layers,this.add(a);let c=new yn(Gs,ks,e,t);c.layers=this.layers,this.add(c);let l=new yn(Gs,ks,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===zi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Fo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},qo=class extends ni{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Qs,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Tc=class extends on{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Cr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===vs?Qt:ti),this.texture=new qo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new $e(5,5,5),r=new Ot({name:"CubemapFromEquirect",uniforms:ir(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:_n,blending:ji});r.uniforms.tEquirect.value=t;let o=new B(s,r),a=t.minFilter;return t.minFilter===Ur&&(t.minFilter=Zt),new Mc(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},nc=new R,ap=new R,cp=new xt,Oi=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=nc.subVectors(n,t).cross(ap.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(nc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||cp.getNormalMatrix(e),s=this.coplanarPoint(nc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},fs=new ts,Eo=new R,Br=class{constructor(e=new Oi,t=new Oi,n=new Oi,s=new Oi,r=new Oi,o=new Oi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zi){let n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],T=s[13],v=s[14],E=s[15];if(n[0].setComponents(c-r,d-l,m-f,E-p).normalize(),n[1].setComponents(c+r,d+l,m+f,E+p).normalize(),n[2].setComponents(c+o,d+h,m+g,E+T).normalize(),n[3].setComponents(c-o,d-h,m-g,E-T).normalize(),n[4].setComponents(c-a,d-u,m-x,E-v).normalize(),t===zi)n[5].setComponents(c+a,d+u,m+x,E+v).normalize();else if(t===Fo)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fs)}intersectsSprite(e){return fs.center.set(0,0,0),fs.radius=.7071067811865476,fs.applyMatrix4(e.matrixWorld),this.intersectsSphere(fs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Eo.x=s.normal.x>0?e.max.x:e.min.x,Eo.y=s.normal.y>0?e.max.y:e.min.y,Eo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Eo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Au(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function lp(i,e){let t=e.isWebGL2,n=new WeakMap;function s(l,h){let u=l.array,d=l.usage,f=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,d),l.onUploadCallback();let x;if(u instanceof Float32Array)x=i.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=i.SHORT;else if(u instanceof Uint32Array)x=i.UNSIGNED_INT;else if(u instanceof Int32Array)x=i.INT;else if(u instanceof Int8Array)x=i.BYTE;else if(u instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,h,u){let d=h.array,f=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,l),f.count===-1&&g.length===0&&i.bufferSubData(u,0,d),g.length!==0){for(let x=0,m=g.length;x<m;x++){let p=g[x];t?i.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):i.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(i.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}var Tn=class i extends wt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let T=p*d-o;for(let v=0;v<l;v++){let E=v*u-r;g.push(E,-T,0),x.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let T=0;T<a;T++){let v=T+l*p,E=T+l*(p+1),I=T+1+l*(p+1),b=T+1+l*p;f.push(v,E,b),f.push(E,I,b)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},hp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,up=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pp=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,mp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vp=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,_p=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ep=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ap=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Lp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Dp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Up=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Op=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gp=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,kp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Xp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$p=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Qp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,e0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,t0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,n0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,i0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,s0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,r0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,o0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,c0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,l0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,h0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,u0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,d0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,f0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,p0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,g0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,x0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,v0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,y0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,M0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,T0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,S0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,w0=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,b0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,R0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,A0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,C0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,P0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,I0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,L0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,D0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,U0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,H0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,N0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,F0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,B0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,O0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,z0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,G0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,k0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,W0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,X0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,q0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Y0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Z0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,J0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,K0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,j0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Q0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,em=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,im=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,sm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,cm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,lm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,xm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_m=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Em=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Am=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Pm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Im=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Um=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Om=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,km=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:hp,alphahash_pars_fragment:up,alphamap_fragment:dp,alphamap_pars_fragment:fp,alphatest_fragment:pp,alphatest_pars_fragment:mp,aomap_fragment:gp,aomap_pars_fragment:xp,batching_pars_vertex:vp,batching_vertex:yp,begin_vertex:_p,beginnormal_vertex:Ep,bsdfs:Mp,iridescence_fragment:Tp,bumpmap_pars_fragment:Sp,clipping_planes_fragment:wp,clipping_planes_pars_fragment:bp,clipping_planes_pars_vertex:Rp,clipping_planes_vertex:Ap,color_fragment:Cp,color_pars_fragment:Pp,color_pars_vertex:Ip,color_vertex:Lp,common:Dp,cube_uv_reflection_fragment:Up,defaultnormal_vertex:Hp,displacementmap_pars_vertex:Np,displacementmap_vertex:Fp,emissivemap_fragment:Bp,emissivemap_pars_fragment:Op,colorspace_fragment:zp,colorspace_pars_fragment:Gp,envmap_fragment:kp,envmap_common_pars_fragment:Vp,envmap_pars_fragment:Wp,envmap_pars_vertex:Xp,envmap_physical_pars_fragment:i0,envmap_vertex:qp,fog_vertex:Yp,fog_pars_vertex:Zp,fog_fragment:Jp,fog_pars_fragment:$p,gradientmap_pars_fragment:Kp,lightmap_fragment:jp,lightmap_pars_fragment:Qp,lights_lambert_fragment:e0,lights_lambert_pars_fragment:t0,lights_pars_begin:n0,lights_toon_fragment:s0,lights_toon_pars_fragment:r0,lights_phong_fragment:o0,lights_phong_pars_fragment:a0,lights_physical_fragment:c0,lights_physical_pars_fragment:l0,lights_fragment_begin:h0,lights_fragment_maps:u0,lights_fragment_end:d0,logdepthbuf_fragment:f0,logdepthbuf_pars_fragment:p0,logdepthbuf_pars_vertex:m0,logdepthbuf_vertex:g0,map_fragment:x0,map_pars_fragment:v0,map_particle_fragment:y0,map_particle_pars_fragment:_0,metalnessmap_fragment:E0,metalnessmap_pars_fragment:M0,morphcolor_vertex:T0,morphnormal_vertex:S0,morphtarget_pars_vertex:w0,morphtarget_vertex:b0,normal_fragment_begin:R0,normal_fragment_maps:A0,normal_pars_fragment:C0,normal_pars_vertex:P0,normal_vertex:I0,normalmap_pars_fragment:L0,clearcoat_normal_fragment_begin:D0,clearcoat_normal_fragment_maps:U0,clearcoat_pars_fragment:H0,iridescence_pars_fragment:N0,opaque_fragment:F0,packing:B0,premultiplied_alpha_fragment:O0,project_vertex:z0,dithering_fragment:G0,dithering_pars_fragment:k0,roughnessmap_fragment:V0,roughnessmap_pars_fragment:W0,shadowmap_pars_fragment:X0,shadowmap_pars_vertex:q0,shadowmap_vertex:Y0,shadowmask_pars_fragment:Z0,skinbase_vertex:J0,skinning_pars_vertex:$0,skinning_vertex:K0,skinnormal_vertex:j0,specularmap_fragment:Q0,specularmap_pars_fragment:em,tonemapping_fragment:tm,tonemapping_pars_fragment:nm,transmission_fragment:im,transmission_pars_fragment:sm,uv_pars_fragment:rm,uv_pars_vertex:om,uv_vertex:am,worldpos_vertex:cm,background_vert:lm,background_frag:hm,backgroundCube_vert:um,backgroundCube_frag:dm,cube_vert:fm,cube_frag:pm,depth_vert:mm,depth_frag:gm,distanceRGBA_vert:xm,distanceRGBA_frag:vm,equirect_vert:ym,equirect_frag:_m,linedashed_vert:Em,linedashed_frag:Mm,meshbasic_vert:Tm,meshbasic_frag:Sm,meshlambert_vert:wm,meshlambert_frag:bm,meshmatcap_vert:Rm,meshmatcap_frag:Am,meshnormal_vert:Cm,meshnormal_frag:Pm,meshphong_vert:Im,meshphong_frag:Lm,meshphysical_vert:Dm,meshphysical_frag:Um,meshtoon_vert:Hm,meshtoon_frag:Nm,points_vert:Fm,points_frag:Bm,shadow_vert:Om,shadow_frag:zm,sprite_vert:Gm,sprite_frag:km},Fe={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xt},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xt},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0},uvTransform:{value:new xt}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xt},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0}}},Si={basic:{uniforms:Hn([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:Hn([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new Ce(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:Hn([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:Hn([Fe.common,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.roughnessmap,Fe.metalnessmap,Fe.fog,Fe.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:Hn([Fe.common,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.gradientmap,Fe.fog,Fe.lights,{emissive:{value:new Ce(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:Hn([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:Hn([Fe.points,Fe.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:Hn([Fe.common,Fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:Hn([Fe.common,Fe.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:Hn([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:Hn([Fe.sprite,Fe.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:Hn([Fe.common,Fe.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:Hn([Fe.lights,Fe.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Si.physical={uniforms:Hn([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xt},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xt},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xt},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xt},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xt},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xt}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};var Mo={r:0,b:0,g:0};function Vm(i,e,t,n,s,r,o){let a=new Ce(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(m,p){let T=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?x(a,c):v&&v.isColor&&(x(v,1),T=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||T)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===ta)?(h===void 0&&(h=new B(new $e(1,1,1),new Ot({name:"BackgroundCubeMaterial",uniforms:ir(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Ft.getTransfer(v.colorSpace)!==kt,(u!==v||d!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new B(new Tn(2,2),new Ot({name:"BackgroundMaterial",uniforms:ir(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=Ft.getTransfer(v.colorSpace)!==kt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function x(m,p){m.getRGB(Mo,Ru(i)),n.buffers.color.setClear(Mo.r,Mo.g,Mo.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,x(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(a,c)},render:g}}function Wm(i,e,t,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null),l=c,h=!1;function u(U,O,X,ue,ee){let ne=!1;if(o){let oe=x(ue,X,O);l!==oe&&(l=oe,f(l.object)),ne=p(U,ue,X,ee),ne&&T(U,ue,X,ee)}else{let oe=O.wireframe===!0;(l.geometry!==ue.id||l.program!==X.id||l.wireframe!==oe)&&(l.geometry=ue.id,l.program=X.id,l.wireframe=oe,ne=!0)}ee!==null&&t.update(ee,i.ELEMENT_ARRAY_BUFFER),(ne||h)&&(h=!1,F(U,O,X,ue),ee!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(ee).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function f(U){return n.isWebGL2?i.bindVertexArray(U):r.bindVertexArrayOES(U)}function g(U){return n.isWebGL2?i.deleteVertexArray(U):r.deleteVertexArrayOES(U)}function x(U,O,X){let ue=X.wireframe===!0,ee=a[U.id];ee===void 0&&(ee={},a[U.id]=ee);let ne=ee[O.id];ne===void 0&&(ne={},ee[O.id]=ne);let oe=ne[ue];return oe===void 0&&(oe=m(d()),ne[ue]=oe),oe}function m(U){let O=[],X=[],ue=[];for(let ee=0;ee<s;ee++)O[ee]=0,X[ee]=0,ue[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:ue,object:U,attributes:{},index:null}}function p(U,O,X,ue){let ee=l.attributes,ne=O.attributes,oe=0,ce=X.getAttributes();for(let be in ce)if(ce[be].location>=0){let j=ee[be],Se=ne[be];if(Se===void 0&&(be==="instanceMatrix"&&U.instanceMatrix&&(Se=U.instanceMatrix),be==="instanceColor"&&U.instanceColor&&(Se=U.instanceColor)),j===void 0||j.attribute!==Se||Se&&j.data!==Se.data)return!0;oe++}return l.attributesNum!==oe||l.index!==ue}function T(U,O,X,ue){let ee={},ne=O.attributes,oe=0,ce=X.getAttributes();for(let be in ce)if(ce[be].location>=0){let j=ne[be];j===void 0&&(be==="instanceMatrix"&&U.instanceMatrix&&(j=U.instanceMatrix),be==="instanceColor"&&U.instanceColor&&(j=U.instanceColor));let Se={};Se.attribute=j,j&&j.data&&(Se.data=j.data),ee[be]=Se,oe++}l.attributes=ee,l.attributesNum=oe,l.index=ue}function v(){let U=l.newAttributes;for(let O=0,X=U.length;O<X;O++)U[O]=0}function E(U){I(U,0)}function I(U,O){let X=l.newAttributes,ue=l.enabledAttributes,ee=l.attributeDivisors;X[U]=1,ue[U]===0&&(i.enableVertexAttribArray(U),ue[U]=1),ee[U]!==O&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](U,O),ee[U]=O)}function b(){let U=l.newAttributes,O=l.enabledAttributes;for(let X=0,ue=O.length;X<ue;X++)O[X]!==U[X]&&(i.disableVertexAttribArray(X),O[X]=0)}function A(U,O,X,ue,ee,ne,oe){oe===!0?i.vertexAttribIPointer(U,O,X,ee,ne):i.vertexAttribPointer(U,O,X,ue,ee,ne)}function F(U,O,X,ue){if(n.isWebGL2===!1&&(U.isInstancedMesh||ue.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();let ee=ue.attributes,ne=X.getAttributes(),oe=O.defaultAttributeValues;for(let ce in ne){let be=ne[ce];if(be.location>=0){let q=ee[ce];if(q===void 0&&(ce==="instanceMatrix"&&U.instanceMatrix&&(q=U.instanceMatrix),ce==="instanceColor"&&U.instanceColor&&(q=U.instanceColor)),q!==void 0){let j=q.normalized,Se=q.itemSize,Ne=t.get(q);if(Ne===void 0)continue;let Re=Ne.buffer,Ue=Ne.type,ke=Ne.bytesPerElement,W=n.isWebGL2===!0&&(Ue===i.INT||Ue===i.UNSIGNED_INT||q.gpuType===mu);if(q.isInterleavedBufferAttribute){let ge=q.data,C=ge.stride,fe=q.offset;if(ge.isInstancedInterleavedBuffer){for(let V=0;V<be.locationSize;V++)I(be.location+V,ge.meshPerAttribute);U.isInstancedMesh!==!0&&ue._maxInstanceCount===void 0&&(ue._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let V=0;V<be.locationSize;V++)E(be.location+V);i.bindBuffer(i.ARRAY_BUFFER,Re);for(let V=0;V<be.locationSize;V++)A(be.location+V,Se/be.locationSize,Ue,j,C*ke,(fe+Se/be.locationSize*V)*ke,W)}else{if(q.isInstancedBufferAttribute){for(let ge=0;ge<be.locationSize;ge++)I(be.location+ge,q.meshPerAttribute);U.isInstancedMesh!==!0&&ue._maxInstanceCount===void 0&&(ue._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ge=0;ge<be.locationSize;ge++)E(be.location+ge);i.bindBuffer(i.ARRAY_BUFFER,Re);for(let ge=0;ge<be.locationSize;ge++)A(be.location+ge,Se/be.locationSize,Ue,j,Se*ke,Se/be.locationSize*ge*ke,W)}}else if(oe!==void 0){let j=oe[ce];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(be.location,j);break;case 3:i.vertexAttrib3fv(be.location,j);break;case 4:i.vertexAttrib4fv(be.location,j);break;default:i.vertexAttrib1fv(be.location,j)}}}}b()}function M(){Z();for(let U in a){let O=a[U];for(let X in O){let ue=O[X];for(let ee in ue)g(ue[ee].object),delete ue[ee];delete O[X]}delete a[U]}}function S(U){if(a[U.id]===void 0)return;let O=a[U.id];for(let X in O){let ue=O[X];for(let ee in ue)g(ue[ee].object),delete ue[ee];delete O[X]}delete a[U.id]}function k(U){for(let O in a){let X=a[O];if(X[U.id]===void 0)continue;let ue=X[U.id];for(let ee in ue)g(ue[ee].object),delete ue[ee];delete X[U.id]}}function Z(){ae(),h=!0,l!==c&&(l=c,f(l.object))}function ae(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:Z,resetDefaultState:ae,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfProgram:k,initAttributes:v,enableAttribute:E,disableUnusedAttributes:b}}function Xm(i,e,t,n){let s=n.isWebGL2,r;function o(h){r=h}function a(h,u){i.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,d){if(d===0)return;let f,g;if(s)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),t.update(u,r,d)}function l(h,u,d){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function qm(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,E=o||e.has("OES_texture_float"),I=v&&E,b=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:T,vertexTextures:v,floatFragmentTextures:E,floatVertexTextures:I,maxSamples:b}}function Ym(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Oi,a=new xt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let T=r?0:n,v=T*4,E=p.clippingState||null;c.value=E,E=h(g,d,v,f);for(let I=0;I!==v;++I)E[I]=t[I];p.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,E=f;v!==x;++v,E+=4)o.copy(u[v]).applyMatrix4(T,a),o.normal.toArray(m,E),m[E+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Zm(i){let e=new WeakMap;function t(o,a){return a===mc?o.mapping=Qs:a===gc&&(o.mapping=er),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===mc||a===gc)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Tc(c.height/2);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var sr=class extends Xo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ys=4,Dh=[.125,.215,.35,.446,.526,.582],gs=20,ic=new sr,Uh=new Ce,sc=null,rc=0,oc=0,ps=(1+Math.sqrt(5))/2,Vs=1/ps,Hh=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,ps,Vs),new R(0,ps,-Vs),new R(Vs,0,ps),new R(-Vs,0,ps),new R(ps,Vs,0),new R(-ps,Vs,0)],rr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(sc,rc,oc),e.scissorTest=!1,To(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Qs||e.mapping===er?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:ki,format:mi,colorSpace:gi,depthBuffer:!1},s=Nh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nh(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jm(r)),this._blurMaterial=$m(r,e,t)}return s}_compileMaterial(e){let t=new B(this._lodPlanes[0],e);this._renderer.compile(t,ic)}_sceneToCubeUV(e,t,n,s){let a=new yn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Uh),h.toneMapping=bi,h.autoClear=!1;let f=new Bt({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1}),g=new B(new $e,f),x=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(Uh),x=!0);for(let p=0;p<6;p++){let T=p%3;T===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):T===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let v=this._cubeSize;To(s,T*v,p>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Qs||e.mapping===er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fh());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new B(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;To(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,ic)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Hh[(s-1)%Hh.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new B(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gs-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):gs;m>gs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gs}`);let p=[],T=0;for(let A=0;A<gs;++A){let F=A/x,M=Math.exp(-F*F/2);p.push(M),A===0?T+=M:A<m&&(T+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/T;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;let E=this._sizeLods[s],I=3*E*(s>v-Ys?s-v+Ys:0),b=4*(this._cubeSize-E);To(t,I,b,3*E,2*E),c.setRenderTarget(t),c.render(u,ic)}};function Jm(i){let e=[],t=[],n=[],s=i,r=i-Ys+1+Dh.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Ys?c=Dh[o-i+Ys-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,T=new Float32Array(x*g*f),v=new Float32Array(m*g*f),E=new Float32Array(p*g*f);for(let b=0;b<f;b++){let A=b%3*2/3-1,F=b>2?0:-1,M=[A,F,0,A+2/3,F,0,A+2/3,F+1,0,A,F,0,A+2/3,F+1,0,A,F+1,0];T.set(M,x*g*b),v.set(d,m*g*b);let S=[b,b,b,b,b,b];E.set(S,p*g*b)}let I=new wt;I.setAttribute("position",new yt(T,x)),I.setAttribute("uv",new yt(v,m)),I.setAttribute("faceIndex",new yt(E,p)),e.push(I),s>Ys&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Nh(i,e,t){let n=new on(i,e,t);return n.texture.mapping=ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function To(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function $m(i,e,t){let n=new Float32Array(gs),s=new R(0,1,0);return new Ot({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Fh(){return new Ot({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Bh(){return new Ot({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function sl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Km(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===mc||c===gc,h=c===Qs||c===er;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new rr(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{let u=a.image;if(l&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new rr(i));let d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function jm(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Qm(i,e,t,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)e.update(d[g],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let T=f.array;x=f.version;for(let v=0,E=T.length;v<E;v+=3){let I=T[v+0],b=T[v+1],A=T[v+2];d.push(I,b,b,A,A,I)}}else if(g!==void 0){let T=g.array;x=g.version;for(let v=0,E=T.length/3-1;v<E;v+=3){let I=v+0,b=v+1,A=v+2;d.push(I,b,b,A,A,I)}}else return;let m=new(wu(d)?Wo:Vo)(d,1);m.version=x;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function eg(i,e,t,n){let s=n.isWebGL2,r;function o(f){r=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function h(f,g){i.drawElements(r,g,a,f*c),t.update(g,r,1)}function u(f,g,x){if(x===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,f*c,x),t.update(g,r,x)}function d(f,g,x){if(x===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<x;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,f,0,x);let p=0;for(let T=0;T<x;T++)p+=g[T];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function tg(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ng(i,e){return i[0]-e[0]}function ig(i,e){return Math.abs(e[1])-Math.abs(i[1])}function sg(i,e,t){let n={},s=new Float32Array(8),r=new WeakMap,o=new Jt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){let d=l.morphTargetInfluences;if(e.isWebGL2===!0){let f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0,x=r.get(h);if(x===void 0||x.count!==g){let U=function(){Z.dispose(),r.delete(h),h.removeEventListener("dispose",U)};x!==void 0&&x.texture.dispose();let T=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,E=h.morphAttributes.color!==void 0,I=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],A=h.morphAttributes.color||[],F=0;T===!0&&(F=1),v===!0&&(F=2),E===!0&&(F=3);let M=h.attributes.position.count*F,S=1;M>e.maxTextureSize&&(S=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let k=new Float32Array(M*S*4*g),Z=new ko(k,M,S,g);Z.type=Ki,Z.needsUpdate=!0;let ae=F*4;for(let O=0;O<g;O++){let X=I[O],ue=b[O],ee=A[O],ne=M*S*4*O;for(let oe=0;oe<X.count;oe++){let ce=oe*ae;T===!0&&(o.fromBufferAttribute(X,oe),k[ne+ce+0]=o.x,k[ne+ce+1]=o.y,k[ne+ce+2]=o.z,k[ne+ce+3]=0),v===!0&&(o.fromBufferAttribute(ue,oe),k[ne+ce+4]=o.x,k[ne+ce+5]=o.y,k[ne+ce+6]=o.z,k[ne+ce+7]=0),E===!0&&(o.fromBufferAttribute(ee,oe),k[ne+ce+8]=o.x,k[ne+ce+9]=o.y,k[ne+ce+10]=o.z,k[ne+ce+11]=ee.itemSize===4?o.w:1)}}x={count:g,texture:Z,size:new pe(M,S)},r.set(h,x),h.addEventListener("dispose",U)}let m=0;for(let T=0;T<d.length;T++)m+=d[T];let p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",p),u.getUniforms().setValue(i,"morphTargetInfluences",d),u.getUniforms().setValue(i,"morphTargetsTexture",x.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{let f=d===void 0?0:d.length,g=n[h.id];if(g===void 0||g.length!==f){g=[];for(let v=0;v<f;v++)g[v]=[v,0];n[h.id]=g}for(let v=0;v<f;v++){let E=g[v];E[0]=v,E[1]=d[v]}g.sort(ig);for(let v=0;v<8;v++)v<f&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(ng);let x=h.morphAttributes.position,m=h.morphAttributes.normal,p=0;for(let v=0;v<8;v++){let E=a[v],I=E[0],b=E[1];I!==Number.MAX_SAFE_INTEGER&&b?(x&&h.getAttribute("morphTarget"+v)!==x[I]&&h.setAttribute("morphTarget"+v,x[I]),m&&h.getAttribute("morphNormal"+v)!==m[I]&&h.setAttribute("morphNormal"+v,m[I]),s[v]=b,p+=b):(x&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),m&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),s[v]=0)}let T=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",T),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function rg(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var or=class extends ni{constructor(e,t,n,s,r,o,a,c,l,h){if(h=h!==void 0?h:Gi,h!==Gi&&h!==nr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Gi&&(n=wi),n===void 0&&h===nr&&(n=xs),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:vn,this.minFilter=c!==void 0?c:vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Cu=new ni,Pu=new or(1,1);Pu.compareFunction=Su;var Iu=new ko,Lu=new Ec,Du=new qo,Oh=[],zh=[],Gh=new Float32Array(16),kh=new Float32Array(9),Vh=new Float32Array(4);function hr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Oh[s];if(r===void 0&&(r=new Float32Array(s),Oh[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function pn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function mn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function sa(i,e){let t=zh[e];t===void 0&&(t=new Int32Array(e),zh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function og(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ag(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;i.uniform2fv(this.addr,e),mn(t,e)}}function cg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pn(t,e))return;i.uniform3fv(this.addr,e),mn(t,e)}}function lg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;i.uniform4fv(this.addr,e),mn(t,e)}}function hg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;Vh.set(n),i.uniformMatrix2fv(this.addr,!1,Vh),mn(t,n)}}function ug(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;kh.set(n),i.uniformMatrix3fv(this.addr,!1,kh),mn(t,n)}}function dg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(pn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),mn(t,e)}else{if(pn(t,n))return;Gh.set(n),i.uniformMatrix4fv(this.addr,!1,Gh),mn(t,n)}}function fg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function pg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;i.uniform2iv(this.addr,e),mn(t,e)}}function mg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pn(t,e))return;i.uniform3iv(this.addr,e),mn(t,e)}}function gg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;i.uniform4iv(this.addr,e),mn(t,e)}}function xg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function vg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pn(t,e))return;i.uniform2uiv(this.addr,e),mn(t,e)}}function yg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pn(t,e))return;i.uniform3uiv(this.addr,e),mn(t,e)}}function _g(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pn(t,e))return;i.uniform4uiv(this.addr,e),mn(t,e)}}function Eg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?Pu:Cu;t.setTexture2D(e||r,s)}function Mg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Lu,s)}function Tg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Du,s)}function Sg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Iu,s)}function wg(i){switch(i){case 5126:return og;case 35664:return ag;case 35665:return cg;case 35666:return lg;case 35674:return hg;case 35675:return ug;case 35676:return dg;case 5124:case 35670:return fg;case 35667:case 35671:return pg;case 35668:case 35672:return mg;case 35669:case 35673:return gg;case 5125:return xg;case 36294:return vg;case 36295:return yg;case 36296:return _g;case 35678:case 36198:case 36298:case 36306:case 35682:return Eg;case 35679:case 36299:case 36307:return Mg;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return Sg}}function bg(i,e){i.uniform1fv(this.addr,e)}function Rg(i,e){let t=hr(e,this.size,2);i.uniform2fv(this.addr,t)}function Ag(i,e){let t=hr(e,this.size,3);i.uniform3fv(this.addr,t)}function Cg(i,e){let t=hr(e,this.size,4);i.uniform4fv(this.addr,t)}function Pg(i,e){let t=hr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ig(i,e){let t=hr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Lg(i,e){let t=hr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Dg(i,e){i.uniform1iv(this.addr,e)}function Ug(i,e){i.uniform2iv(this.addr,e)}function Hg(i,e){i.uniform3iv(this.addr,e)}function Ng(i,e){i.uniform4iv(this.addr,e)}function Fg(i,e){i.uniform1uiv(this.addr,e)}function Bg(i,e){i.uniform2uiv(this.addr,e)}function Og(i,e){i.uniform3uiv(this.addr,e)}function zg(i,e){i.uniform4uiv(this.addr,e)}function Gg(i,e,t){let n=this.cache,s=e.length,r=sa(t,s);pn(n,r)||(i.uniform1iv(this.addr,r),mn(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Cu,r[o])}function kg(i,e,t){let n=this.cache,s=e.length,r=sa(t,s);pn(n,r)||(i.uniform1iv(this.addr,r),mn(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Lu,r[o])}function Vg(i,e,t){let n=this.cache,s=e.length,r=sa(t,s);pn(n,r)||(i.uniform1iv(this.addr,r),mn(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Du,r[o])}function Wg(i,e,t){let n=this.cache,s=e.length,r=sa(t,s);pn(n,r)||(i.uniform1iv(this.addr,r),mn(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Iu,r[o])}function Xg(i){switch(i){case 5126:return bg;case 35664:return Rg;case 35665:return Ag;case 35666:return Cg;case 35674:return Pg;case 35675:return Ig;case 35676:return Lg;case 5124:case 35670:return Dg;case 35667:case 35671:return Ug;case 35668:case 35672:return Hg;case 35669:case 35673:return Ng;case 5125:return Fg;case 36294:return Bg;case 36295:return Og;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Gg;case 35679:case 36299:case 36307:return kg;case 35680:case 36300:case 36308:case 36293:return Vg;case 36289:case 36303:case 36311:case 36292:return Wg}}var Sc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=wg(t.type)}},wc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xg(t.type)}},bc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},ac=/(\w+)(\])?(\[|\.)?/g;function Wh(i,e){i.seq.push(e),i.map[e.id]=e}function qg(i,e,t){let n=i.name,s=n.length;for(ac.lastIndex=0;;){let r=ac.exec(n),o=ac.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Wh(t,l===void 0?new Sc(a,i,e):new wc(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new bc(a),Wh(t,u)),t=u}}}var js=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);qg(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Xh(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Yg=37297,Zg=0;function Jg(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function $g(i){let e=Ft.getPrimaries(Ft.workingColorSpace),t=Ft.getPrimaries(i),n;switch(e===t?n="":e===No&&t===Ho?n="LinearDisplayP3ToLinearSRGB":e===Ho&&t===No&&(n="LinearSRGBToLinearDisplayP3"),i){case gi:case na:return[n,"LinearTransferOETF"];case Qt:case nl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function qh(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Jg(i.getShaderSource(e),o)}else return s}function Kg(i,e){let t=$g(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function jg(i,e){let t;switch(e){case nf:t="Linear";break;case sf:t="Reinhard";break;case rf:t="OptimizedCineon";break;case of:t="ACESFilmic";break;case cf:t="AgX";break;case af:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Qg(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Zs).join(`
`)}function ex(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Zs).join(`
`)}function tx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function nx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Zs(i){return i!==""}function Yh(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ix=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rc(i){return i.replace(ix,rx)}var sx=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function rx(i,e){let t=pt[e];if(t===void 0){let n=sx.get(e);if(n!==void 0)t=pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Rc(t)}var ox=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jh(i){return i.replace(ox,ax)}function ax(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $h(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cx(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===du?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===el?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Bi&&(e="SHADOWMAP_TYPE_VSM"),e}function lx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qs:case er:e="ENVMAP_TYPE_CUBE";break;case ta:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hx(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case er:e="ENVMAP_MODE_REFRACTION";break}return e}function ux(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case fu:e="ENVMAP_BLENDING_MULTIPLY";break;case ef:e="ENVMAP_BLENDING_MIX";break;case tf:e="ENVMAP_BLENDING_ADD";break}return e}function dx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function fx(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=cx(t),l=lx(t),h=hx(t),u=ux(t),d=dx(t),f=t.isWebGL2?"":Qg(t),g=ex(t),x=tx(r),m=s.createProgram(),p,T,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Zs).join(`
`),p.length>0&&(p+=`
`),T=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Zs).join(`
`),T.length>0&&(T+=`
`)):(p=[$h(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),T=[f,$h(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bi?"#define TONE_MAPPING":"",t.toneMapping!==bi?pt.tonemapping_pars_fragment:"",t.toneMapping!==bi?jg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,Kg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zs).join(`
`)),o=Rc(o),o=Yh(o,t),o=Zh(o,t),a=Rc(a),a=Yh(a,t),a=Zh(a,t),o=Jh(o),a=Jh(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,T=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===mh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===mh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);let E=v+p+o,I=v+T+a,b=Xh(s,s.VERTEX_SHADER,E),A=Xh(s,s.FRAGMENT_SHADER,I);s.attachShader(m,b),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function F(Z){if(i.debug.checkShaderErrors){let ae=s.getProgramInfoLog(m).trim(),U=s.getShaderInfoLog(b).trim(),O=s.getShaderInfoLog(A).trim(),X=!0,ue=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,b,A);else{let ee=qh(s,b,"vertex"),ne=qh(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+ae+`
`+ee+`
`+ne)}else ae!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ae):(U===""||O==="")&&(ue=!1);ue&&(Z.diagnostics={runnable:X,programLog:ae,vertexShader:{log:U,prefix:p},fragmentShader:{log:O,prefix:T}})}s.deleteShader(b),s.deleteShader(A),M=new js(s,m),S=nx(s,m)}let M;this.getUniforms=function(){return M===void 0&&F(this),M};let S;this.getAttributes=function(){return S===void 0&&F(this),S};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(m,Yg)),k},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Zg++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=A,this}var px=0,Ac=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Cc(e),t.set(e,n)),n}},Cc=class{constructor(e){this.id=px++,this.code=e,this.usedTimes=0}};function mx(i,e,t,n,s,r,o){let a=new Fr,c=new Ac,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function m(M,S,k,Z,ae){let U=Z.fog,O=ae.geometry,X=M.isMeshStandardMaterial?Z.environment:null,ue=(M.isMeshStandardMaterial?t:e).get(M.envMap||X),ee=ue&&ue.mapping===ta?ue.image.height:null,ne=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let oe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ce=oe!==void 0?oe.length:0,be=0;O.morphAttributes.position!==void 0&&(be=1),O.morphAttributes.normal!==void 0&&(be=2),O.morphAttributes.color!==void 0&&(be=3);let q,j,Se,Ne;if(ne){let Gt=Si[ne];q=Gt.vertexShader,j=Gt.fragmentShader}else q=M.vertexShader,j=M.fragmentShader,c.update(M),Se=c.getVertexShaderID(M),Ne=c.getFragmentShaderID(M);let Re=i.getRenderTarget(),Ue=ae.isInstancedMesh===!0,ke=ae.isBatchedMesh===!0,W=!!M.map,ge=!!M.matcap,C=!!ue,fe=!!M.aoMap,V=!!M.lightMap,re=!!M.bumpMap,Y=!!M.normalMap,Ae=!!M.displacementMap,Me=!!M.emissiveMap,_=!!M.metalnessMap,y=!!M.roughnessMap,N=M.anisotropy>0,de=M.clearcoat>0,le=M.iridescence>0,ie=M.sheen>0,Pe=M.transmission>0,ve=N&&!!M.anisotropyMap,ye=de&&!!M.clearcoatMap,ze=de&&!!M.clearcoatNormalMap,it=de&&!!M.clearcoatRoughnessMap,me=le&&!!M.iridescenceMap,ct=le&&!!M.iridescenceThicknessMap,at=ie&&!!M.sheenColorMap,Ze=ie&&!!M.sheenRoughnessMap,z=!!M.specularMap,te=!!M.specularColorMap,He=!!M.specularIntensityMap,We=Pe&&!!M.transmissionMap,Ie=Pe&&!!M.thicknessMap,De=!!M.gradientMap,he=!!M.alphaMap,D=M.alphaTest>0,we=!!M.alphaHash,Ee=!!M.extensions,Xe=!!O.attributes.uv1,qe=!!O.attributes.uv2,ht=!!O.attributes.uv3,ft=bi;return M.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(ft=i.toneMapping),{isWebGL2:h,shaderID:ne,shaderType:M.type,shaderName:M.name,vertexShader:q,fragmentShader:j,defines:M.defines,customVertexShaderID:Se,customFragmentShaderID:Ne,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:ke,instancing:Ue,instancingColor:Ue&&ae.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Re===null?i.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:gi,map:W,matcap:ge,envMap:C,envMapMode:C&&ue.mapping,envMapCubeUVHeight:ee,aoMap:fe,lightMap:V,bumpMap:re,normalMap:Y,displacementMap:d&&Ae,emissiveMap:Me,normalMapObjectSpace:Y&&M.normalMapType===_f,normalMapTangentSpace:Y&&M.normalMapType===Tu,metalnessMap:_,roughnessMap:y,anisotropy:N,anisotropyMap:ve,clearcoat:de,clearcoatMap:ye,clearcoatNormalMap:ze,clearcoatRoughnessMap:it,iridescence:le,iridescenceMap:me,iridescenceThicknessMap:ct,sheen:ie,sheenColorMap:at,sheenRoughnessMap:Ze,specularMap:z,specularColorMap:te,specularIntensityMap:He,transmission:Pe,transmissionMap:We,thicknessMap:Ie,gradientMap:De,opaque:M.transparent===!1&&M.blending===$s,alphaMap:he,alphaTest:D,alphaHash:we,combine:M.combine,mapUv:W&&x(M.map.channel),aoMapUv:fe&&x(M.aoMap.channel),lightMapUv:V&&x(M.lightMap.channel),bumpMapUv:re&&x(M.bumpMap.channel),normalMapUv:Y&&x(M.normalMap.channel),displacementMapUv:Ae&&x(M.displacementMap.channel),emissiveMapUv:Me&&x(M.emissiveMap.channel),metalnessMapUv:_&&x(M.metalnessMap.channel),roughnessMapUv:y&&x(M.roughnessMap.channel),anisotropyMapUv:ve&&x(M.anisotropyMap.channel),clearcoatMapUv:ye&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:ze&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:at&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Ze&&x(M.sheenRoughnessMap.channel),specularMapUv:z&&x(M.specularMap.channel),specularColorMapUv:te&&x(M.specularColorMap.channel),specularIntensityMapUv:He&&x(M.specularIntensityMap.channel),transmissionMapUv:We&&x(M.transmissionMap.channel),thicknessMapUv:Ie&&x(M.thicknessMap.channel),alphaMapUv:he&&x(M.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Y||N),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Xe,vertexUv2s:qe,vertexUv3s:ht,pointsUvs:ae.isPoints===!0&&!!O.attributes.uv&&(W||he),fog:!!U,useFog:M.fog===!0,fogExp2:U&&U.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ae.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:be,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:ft,useLegacyLights:i._useLegacyLights,decodeVideoTexture:W&&M.map.isVideoTexture===!0&&Ft.getTransfer(M.map.colorSpace)===kt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Nn,flipSided:M.side===_n,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:Ee&&M.extensions.derivatives===!0,extensionFragDepth:Ee&&M.extensions.fragDepth===!0,extensionDrawBuffers:Ee&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ee&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ee&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let k in M.defines)S.push(k),S.push(M.defines[k]);return M.isRawShaderMaterial===!1&&(T(S,M),v(S,M),S.push(i.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function T(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function v(M,S){a.disableAll(),S.isWebGL2&&a.enable(0),S.supportsVertexTextures&&a.enable(1),S.instancing&&a.enable(2),S.instancingColor&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.skinning&&a.enable(4),S.morphTargets&&a.enable(5),S.morphNormals&&a.enable(6),S.morphColors&&a.enable(7),S.premultipliedAlpha&&a.enable(8),S.shadowMapEnabled&&a.enable(9),S.useLegacyLights&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function E(M){let S=g[M.type],k;if(S){let Z=Si[S];k=sp.clone(Z.uniforms)}else k=M.uniforms;return k}function I(M,S){let k;for(let Z=0,ae=l.length;Z<ae;Z++){let U=l[Z];if(U.cacheKey===S){k=U,++k.usedTimes;break}}return k===void 0&&(k=new fx(i,S,M,r),l.push(k)),k}function b(M){if(--M.usedTimes===0){let S=l.indexOf(M);l[S]=l[l.length-1],l.pop(),M.destroy()}}function A(M){c.remove(M)}function F(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:I,releaseProgram:b,releaseShaderCache:A,programs:l,dispose:F}}function gx(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function xx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Kh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jh(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,f,g,x,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),e++,p}function a(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||xx),n.length>1&&n.sort(d||Kh),s.length>1&&s.sort(d||Kh)}function h(){for(let u=e,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function vx(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new jh,i.set(n,[o])):s>=r.length?(o=new jh,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function yx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Ce};break;case"SpotLight":t={position:new R,direction:new R,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function _x(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Ex=0;function Mx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Tx(i,e){let t=new yx,n=_x(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new R);let r=new R,o=new Rt,a=new Rt;function c(h,u){let d=0,f=0,g=0;for(let Z=0;Z<9;Z++)s.probe[Z].set(0,0,0);let x=0,m=0,p=0,T=0,v=0,E=0,I=0,b=0,A=0,F=0,M=0;h.sort(Mx);let S=u===!0?Math.PI:1;for(let Z=0,ae=h.length;Z<ae;Z++){let U=h[Z],O=U.color,X=U.intensity,ue=U.distance,ee=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)d+=O.r*X*S,f+=O.g*X*S,g+=O.b*X*S;else if(U.isLightProbe){for(let ne=0;ne<9;ne++)s.probe[ne].addScaledVector(U.sh.coefficients[ne],X);M++}else if(U.isDirectionalLight){let ne=t.get(U);if(ne.color.copy(U.color).multiplyScalar(U.intensity*S),U.castShadow){let oe=U.shadow,ce=n.get(U);ce.shadowBias=oe.bias,ce.shadowNormalBias=oe.normalBias,ce.shadowRadius=oe.radius,ce.shadowMapSize=oe.mapSize,s.directionalShadow[x]=ce,s.directionalShadowMap[x]=ee,s.directionalShadowMatrix[x]=U.shadow.matrix,E++}s.directional[x]=ne,x++}else if(U.isSpotLight){let ne=t.get(U);ne.position.setFromMatrixPosition(U.matrixWorld),ne.color.copy(O).multiplyScalar(X*S),ne.distance=ue,ne.coneCos=Math.cos(U.angle),ne.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),ne.decay=U.decay,s.spot[p]=ne;let oe=U.shadow;if(U.map&&(s.spotLightMap[A]=U.map,A++,oe.updateMatrices(U),U.castShadow&&F++),s.spotLightMatrix[p]=oe.matrix,U.castShadow){let ce=n.get(U);ce.shadowBias=oe.bias,ce.shadowNormalBias=oe.normalBias,ce.shadowRadius=oe.radius,ce.shadowMapSize=oe.mapSize,s.spotShadow[p]=ce,s.spotShadowMap[p]=ee,b++}p++}else if(U.isRectAreaLight){let ne=t.get(U);ne.color.copy(O).multiplyScalar(X),ne.halfWidth.set(U.width*.5,0,0),ne.halfHeight.set(0,U.height*.5,0),s.rectArea[T]=ne,T++}else if(U.isPointLight){let ne=t.get(U);if(ne.color.copy(U.color).multiplyScalar(U.intensity*S),ne.distance=U.distance,ne.decay=U.decay,U.castShadow){let oe=U.shadow,ce=n.get(U);ce.shadowBias=oe.bias,ce.shadowNormalBias=oe.normalBias,ce.shadowRadius=oe.radius,ce.shadowMapSize=oe.mapSize,ce.shadowCameraNear=oe.camera.near,ce.shadowCameraFar=oe.camera.far,s.pointShadow[m]=ce,s.pointShadowMap[m]=ee,s.pointShadowMatrix[m]=U.shadow.matrix,I++}s.point[m]=ne,m++}else if(U.isHemisphereLight){let ne=t.get(U);ne.skyColor.copy(U.color).multiplyScalar(X*S),ne.groundColor.copy(U.groundColor).multiplyScalar(X*S),s.hemi[v]=ne,v++}}T>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Fe.LTC_FLOAT_1,s.rectAreaLTC2=Fe.LTC_FLOAT_2):(s.rectAreaLTC1=Fe.LTC_HALF_1,s.rectAreaLTC2=Fe.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Fe.LTC_FLOAT_1,s.rectAreaLTC2=Fe.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=Fe.LTC_HALF_1,s.rectAreaLTC2=Fe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=f,s.ambient[2]=g;let k=s.hash;(k.directionalLength!==x||k.pointLength!==m||k.spotLength!==p||k.rectAreaLength!==T||k.hemiLength!==v||k.numDirectionalShadows!==E||k.numPointShadows!==I||k.numSpotShadows!==b||k.numSpotMaps!==A||k.numLightProbes!==M)&&(s.directional.length=x,s.spot.length=p,s.rectArea.length=T,s.point.length=m,s.hemi.length=v,s.directionalShadow.length=E,s.directionalShadowMap.length=E,s.pointShadow.length=I,s.pointShadowMap.length=I,s.spotShadow.length=b,s.spotShadowMap.length=b,s.directionalShadowMatrix.length=E,s.pointShadowMatrix.length=I,s.spotLightMatrix.length=b+A-F,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=F,s.numLightProbes=M,k.directionalLength=x,k.pointLength=m,k.spotLength=p,k.rectAreaLength=T,k.hemiLength=v,k.numDirectionalShadows=E,k.numPointShadows=I,k.numSpotShadows=b,k.numSpotMaps=A,k.numLightProbes=M,s.version=Ex++)}function l(h,u){let d=0,f=0,g=0,x=0,m=0,p=u.matrixWorldInverse;for(let T=0,v=h.length;T<v;T++){let E=h[T];if(E.isDirectionalLight){let I=s.directional[d];I.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(p),d++}else if(E.isSpotLight){let I=s.spot[g];I.position.setFromMatrixPosition(E.matrixWorld),I.position.applyMatrix4(p),I.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(p),g++}else if(E.isRectAreaLight){let I=s.rectArea[x];I.position.setFromMatrixPosition(E.matrixWorld),I.position.applyMatrix4(p),a.identity(),o.copy(E.matrixWorld),o.premultiply(p),a.extractRotation(o),I.halfWidth.set(E.width*.5,0,0),I.halfHeight.set(0,E.height*.5,0),I.halfWidth.applyMatrix4(a),I.halfHeight.applyMatrix4(a),x++}else if(E.isPointLight){let I=s.point[f];I.position.setFromMatrixPosition(E.matrixWorld),I.position.applyMatrix4(p),f++}else if(E.isHemisphereLight){let I=s.hemi[m];I.direction.setFromMatrixPosition(E.matrixWorld),I.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:s}}function Qh(i,e){let t=new Tx(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function o(u){n.push(u)}function a(u){s.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Sx(i,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new Qh(i,e),t.set(r,[c])):o>=a.length?(c=new Qh(i,e),a.push(c)):c=a[o],c}function s(){t=new WeakMap}return{get:n,dispose:s}}var Pc=class extends ns{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ic=class extends ns{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},wx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Rx(i,e,t){let n=new Br,s=new pe,r=new pe,o=new Jt,a=new Pc({depthPacking:yf}),c=new Ic,l={},h=t.maxTextureSize,u={[Qi]:_n,[_n]:Qi,[Nn]:Nn},d=new Ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:wx,fragmentShader:bx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new wt;g.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new B(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=du;let p=this.type;this.render=function(b,A,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;let M=i.getRenderTarget(),S=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),Z=i.state;Z.setBlending(ji),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);let ae=p!==Bi&&this.type===Bi,U=p===Bi&&this.type!==Bi;for(let O=0,X=b.length;O<X;O++){let ue=b[O],ee=ue.shadow;if(ee===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;s.copy(ee.mapSize);let ne=ee.getFrameExtents();if(s.multiply(ne),r.copy(ee.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ne.x),s.x=r.x*ne.x,ee.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ne.y),s.y=r.y*ne.y,ee.mapSize.y=r.y)),ee.map===null||ae===!0||U===!0){let ce=this.type!==Bi?{minFilter:vn,magFilter:vn}:{};ee.map!==null&&ee.map.dispose(),ee.map=new on(s.x,s.y,ce),ee.map.texture.name=ue.name+".shadowMap",ee.camera.updateProjectionMatrix()}i.setRenderTarget(ee.map),i.clear();let oe=ee.getViewportCount();for(let ce=0;ce<oe;ce++){let be=ee.getViewport(ce);o.set(r.x*be.x,r.y*be.y,r.x*be.z,r.y*be.w),Z.viewport(o),ee.updateMatrices(ue,ce),n=ee.getFrustum(),E(A,F,ee.camera,ue,this.type)}ee.isPointLightShadow!==!0&&this.type===Bi&&T(ee,F),ee.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,S,k)};function T(b,A){let F=e.update(x);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new on(s.x,s.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(A,null,F,d,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(A,null,F,f,x,null)}function v(b,A,F,M){let S=null,k=F.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(k!==void 0)S=k;else if(S=F.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let Z=S.uuid,ae=A.uuid,U=l[Z];U===void 0&&(U={},l[Z]=U);let O=U[ae];O===void 0&&(O=S.clone(),U[ae]=O,A.addEventListener("dispose",I)),S=O}if(S.visible=A.visible,S.wireframe=A.wireframe,M===Bi?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:u[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,F.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let Z=i.properties.get(S);Z.light=F}return S}function E(b,A,F,M,S){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===Bi)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,b.matrixWorld);let ae=e.update(b),U=b.material;if(Array.isArray(U)){let O=ae.groups;for(let X=0,ue=O.length;X<ue;X++){let ee=O[X],ne=U[ee.materialIndex];if(ne&&ne.visible){let oe=v(b,ne,M,S);b.onBeforeShadow(i,b,A,F,ae,oe,ee),i.renderBufferDirect(F,null,ae,oe,b,ee),b.onAfterShadow(i,b,A,F,ae,oe,ee)}}}else if(U.visible){let O=v(b,U,M,S);b.onBeforeShadow(i,b,A,F,ae,O,null),i.renderBufferDirect(F,null,ae,O,b,null),b.onAfterShadow(i,b,A,F,ae,O,null)}}let Z=b.children;for(let ae=0,U=Z.length;ae<U;ae++)E(Z[ae],A,F,M,S)}function I(b){b.target.removeEventListener("dispose",I);for(let F in l){let M=l[F],S=b.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}function Ax(i,e,t){let n=t.isWebGL2;function s(){let D=!1,we=new Jt,Ee=null,Xe=new Jt(0,0,0,0);return{setMask:function(qe){Ee!==qe&&!D&&(i.colorMask(qe,qe,qe,qe),Ee=qe)},setLocked:function(qe){D=qe},setClear:function(qe,ht,ft,ut,Gt){Gt===!0&&(qe*=ut,ht*=ut,ft*=ut),we.set(qe,ht,ft,ut),Xe.equals(we)===!1&&(i.clearColor(qe,ht,ft,ut),Xe.copy(we))},reset:function(){D=!1,Ee=null,Xe.set(-1,0,0,0)}}}function r(){let D=!1,we=null,Ee=null,Xe=null;return{setTest:function(qe){qe?ke(i.DEPTH_TEST):W(i.DEPTH_TEST)},setMask:function(qe){we!==qe&&!D&&(i.depthMask(qe),we=qe)},setFunc:function(qe){if(Ee!==qe){switch(qe){case Yd:i.depthFunc(i.NEVER);break;case Zd:i.depthFunc(i.ALWAYS);break;case Jd:i.depthFunc(i.LESS);break;case Io:i.depthFunc(i.LEQUAL);break;case $d:i.depthFunc(i.EQUAL);break;case Kd:i.depthFunc(i.GEQUAL);break;case jd:i.depthFunc(i.GREATER);break;case Qd:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=qe}},setLocked:function(qe){D=qe},setClear:function(qe){Xe!==qe&&(i.clearDepth(qe),Xe=qe)},reset:function(){D=!1,we=null,Ee=null,Xe=null}}}function o(){let D=!1,we=null,Ee=null,Xe=null,qe=null,ht=null,ft=null,ut=null,Gt=null;return{setTest:function(Et){D||(Et?ke(i.STENCIL_TEST):W(i.STENCIL_TEST))},setMask:function(Et){we!==Et&&!D&&(i.stencilMask(Et),we=Et)},setFunc:function(Et,Xt,nn){(Ee!==Et||Xe!==Xt||qe!==nn)&&(i.stencilFunc(Et,Xt,nn),Ee=Et,Xe=Xt,qe=nn)},setOp:function(Et,Xt,nn){(ht!==Et||ft!==Xt||ut!==nn)&&(i.stencilOp(Et,Xt,nn),ht=Et,ft=Xt,ut=nn)},setLocked:function(Et){D=Et},setClear:function(Et){Gt!==Et&&(i.clearStencil(Et),Gt=Et)},reset:function(){D=!1,we=null,Ee=null,Xe=null,qe=null,ht=null,ft=null,ut=null,Gt=null}}}let a=new s,c=new r,l=new o,h=new WeakMap,u=new WeakMap,d={},f={},g=new WeakMap,x=[],m=null,p=!1,T=null,v=null,E=null,I=null,b=null,A=null,F=null,M=new Ce(0,0,0),S=0,k=!1,Z=null,ae=null,U=null,O=null,X=null,ue=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,ne=0,oe=i.getParameter(i.VERSION);oe.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(oe)[1]),ee=ne>=1):oe.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),ee=ne>=2);let ce=null,be={},q=i.getParameter(i.SCISSOR_BOX),j=i.getParameter(i.VIEWPORT),Se=new Jt().fromArray(q),Ne=new Jt().fromArray(j);function Re(D,we,Ee,Xe){let qe=new Uint8Array(4),ht=i.createTexture();i.bindTexture(D,ht),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ft=0;ft<Ee;ft++)n&&(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)?i.texImage3D(we,0,i.RGBA,1,1,Xe,0,i.RGBA,i.UNSIGNED_BYTE,qe):i.texImage2D(we+ft,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,qe);return ht}let Ue={};Ue[i.TEXTURE_2D]=Re(i.TEXTURE_2D,i.TEXTURE_2D,1),Ue[i.TEXTURE_CUBE_MAP]=Re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ue[i.TEXTURE_2D_ARRAY]=Re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ue[i.TEXTURE_3D]=Re(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),ke(i.DEPTH_TEST),c.setFunc(Io),Me(!1),_(Dl),ke(i.CULL_FACE),Y(ji);function ke(D){d[D]!==!0&&(i.enable(D),d[D]=!0)}function W(D){d[D]!==!1&&(i.disable(D),d[D]=!1)}function ge(D,we){return f[D]!==we?(i.bindFramebuffer(D,we),f[D]=we,n&&(D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=we),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=we)),!0):!1}function C(D,we){let Ee=x,Xe=!1;if(D)if(Ee=g.get(we),Ee===void 0&&(Ee=[],g.set(we,Ee)),D.isWebGLMultipleRenderTargets){let qe=D.texture;if(Ee.length!==qe.length||Ee[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,ft=qe.length;ht<ft;ht++)Ee[ht]=i.COLOR_ATTACHMENT0+ht;Ee.length=qe.length,Xe=!0}}else Ee[0]!==i.COLOR_ATTACHMENT0&&(Ee[0]=i.COLOR_ATTACHMENT0,Xe=!0);else Ee[0]!==i.BACK&&(Ee[0]=i.BACK,Xe=!0);Xe&&(t.isWebGL2?i.drawBuffers(Ee):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ee))}function fe(D){return m!==D?(i.useProgram(D),m=D,!0):!1}let V={[ms]:i.FUNC_ADD,[Ld]:i.FUNC_SUBTRACT,[Dd]:i.FUNC_REVERSE_SUBTRACT};if(n)V[Nl]=i.MIN,V[Fl]=i.MAX;else{let D=e.get("EXT_blend_minmax");D!==null&&(V[Nl]=D.MIN_EXT,V[Fl]=D.MAX_EXT)}let re={[Ud]:i.ZERO,[Hd]:i.ONE,[Nd]:i.SRC_COLOR,[fc]:i.SRC_ALPHA,[kd]:i.SRC_ALPHA_SATURATE,[zd]:i.DST_COLOR,[Bd]:i.DST_ALPHA,[Fd]:i.ONE_MINUS_SRC_COLOR,[pc]:i.ONE_MINUS_SRC_ALPHA,[Gd]:i.ONE_MINUS_DST_COLOR,[Od]:i.ONE_MINUS_DST_ALPHA,[Vd]:i.CONSTANT_COLOR,[Wd]:i.ONE_MINUS_CONSTANT_COLOR,[Xd]:i.CONSTANT_ALPHA,[qd]:i.ONE_MINUS_CONSTANT_ALPHA};function Y(D,we,Ee,Xe,qe,ht,ft,ut,Gt,Et){if(D===ji){p===!0&&(W(i.BLEND),p=!1);return}if(p===!1&&(ke(i.BLEND),p=!0),D!==Id){if(D!==T||Et!==k){if((v!==ms||b!==ms)&&(i.blendEquation(i.FUNC_ADD),v=ms,b=ms),Et)switch(D){case $s:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fn:i.blendFunc(i.ONE,i.ONE);break;case Ul:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Hl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case $s:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fn:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ul:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Hl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}E=null,I=null,A=null,F=null,M.set(0,0,0),S=0,T=D,k=Et}return}qe=qe||we,ht=ht||Ee,ft=ft||Xe,(we!==v||qe!==b)&&(i.blendEquationSeparate(V[we],V[qe]),v=we,b=qe),(Ee!==E||Xe!==I||ht!==A||ft!==F)&&(i.blendFuncSeparate(re[Ee],re[Xe],re[ht],re[ft]),E=Ee,I=Xe,A=ht,F=ft),(ut.equals(M)===!1||Gt!==S)&&(i.blendColor(ut.r,ut.g,ut.b,Gt),M.copy(ut),S=Gt),T=D,k=!1}function Ae(D,we){D.side===Nn?W(i.CULL_FACE):ke(i.CULL_FACE);let Ee=D.side===_n;we&&(Ee=!Ee),Me(Ee),D.blending===$s&&D.transparent===!1?Y(ji):Y(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),a.setMask(D.colorWrite);let Xe=D.stencilWrite;l.setTest(Xe),Xe&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),N(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ke(i.SAMPLE_ALPHA_TO_COVERAGE):W(i.SAMPLE_ALPHA_TO_COVERAGE)}function Me(D){Z!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),Z=D)}function _(D){D!==Cd?(ke(i.CULL_FACE),D!==ae&&(D===Dl?i.cullFace(i.BACK):D===Pd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):W(i.CULL_FACE),ae=D}function y(D){D!==U&&(ee&&i.lineWidth(D),U=D)}function N(D,we,Ee){D?(ke(i.POLYGON_OFFSET_FILL),(O!==we||X!==Ee)&&(i.polygonOffset(we,Ee),O=we,X=Ee)):W(i.POLYGON_OFFSET_FILL)}function de(D){D?ke(i.SCISSOR_TEST):W(i.SCISSOR_TEST)}function le(D){D===void 0&&(D=i.TEXTURE0+ue-1),ce!==D&&(i.activeTexture(D),ce=D)}function ie(D,we,Ee){Ee===void 0&&(ce===null?Ee=i.TEXTURE0+ue-1:Ee=ce);let Xe=be[Ee];Xe===void 0&&(Xe={type:void 0,texture:void 0},be[Ee]=Xe),(Xe.type!==D||Xe.texture!==we)&&(ce!==Ee&&(i.activeTexture(Ee),ce=Ee),i.bindTexture(D,we||Ue[D]),Xe.type=D,Xe.texture=we)}function Pe(){let D=be[ce];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ve(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ze(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ct(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function at(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ze(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function z(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function te(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function He(D){Se.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Se.copy(D))}function We(D){Ne.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Ne.copy(D))}function Ie(D,we){let Ee=u.get(we);Ee===void 0&&(Ee=new WeakMap,u.set(we,Ee));let Xe=Ee.get(D);Xe===void 0&&(Xe=i.getUniformBlockIndex(we,D.name),Ee.set(D,Xe))}function De(D,we){let Xe=u.get(we).get(D);h.get(we)!==Xe&&(i.uniformBlockBinding(we,Xe,D.__bindingPointIndex),h.set(we,Xe))}function he(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ce=null,be={},f={},g=new WeakMap,x=[],m=null,p=!1,T=null,v=null,E=null,I=null,b=null,A=null,F=null,M=new Ce(0,0,0),S=0,k=!1,Z=null,ae=null,U=null,O=null,X=null,Se.set(0,0,i.canvas.width,i.canvas.height),Ne.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:ke,disable:W,bindFramebuffer:ge,drawBuffers:C,useProgram:fe,setBlending:Y,setMaterial:Ae,setFlipSided:Me,setCullFace:_,setLineWidth:y,setPolygonOffset:N,setScissorTest:de,activeTexture:le,bindTexture:ie,unbindTexture:Pe,compressedTexImage2D:ve,compressedTexImage3D:ye,texImage2D:z,texImage3D:te,updateUBOMapping:Ie,uniformBlockBinding:De,texStorage2D:at,texStorage3D:Ze,texSubImage2D:ze,texSubImage3D:it,compressedTexSubImage2D:me,compressedTexSubImage3D:ct,scissor:He,viewport:We,reset:he}}function Cx(i,e,t,n,s,r,o){let a=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(_,y){return f?new OffscreenCanvas(_,y):Oo("canvas")}function x(_,y,N,de){let le=1;if((_.width>de||_.height>de)&&(le=de/Math.max(_.width,_.height)),le<1||y===!0)if(typeof HTMLImageElement<"u"&&_ instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&_ instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&_ instanceof ImageBitmap){let ie=y?Bo:Math.floor,Pe=ie(le*_.width),ve=ie(le*_.height);u===void 0&&(u=g(Pe,ve));let ye=N?g(Pe,ve):u;return ye.width=Pe,ye.height=ve,ye.getContext("2d").drawImage(_,0,0,Pe,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+_.width+"x"+_.height+") to ("+Pe+"x"+ve+")."),ye}else return"data"in _&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+_.width+"x"+_.height+")."),_;return _}function m(_){return yc(_.width)&&yc(_.height)}function p(_){return a?!1:_.wrapS!==pi||_.wrapT!==pi||_.minFilter!==vn&&_.minFilter!==Zt}function T(_,y){return _.generateMipmaps&&y&&_.minFilter!==vn&&_.minFilter!==Zt}function v(_){i.generateMipmap(_)}function E(_,y,N,de,le=!1){if(a===!1)return y;if(_!==null){if(i[_]!==void 0)return i[_];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+_+"'")}let ie=y;if(y===i.RED&&(N===i.FLOAT&&(ie=i.R32F),N===i.HALF_FLOAT&&(ie=i.R16F),N===i.UNSIGNED_BYTE&&(ie=i.R8)),y===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(ie=i.R8UI),N===i.UNSIGNED_SHORT&&(ie=i.R16UI),N===i.UNSIGNED_INT&&(ie=i.R32UI),N===i.BYTE&&(ie=i.R8I),N===i.SHORT&&(ie=i.R16I),N===i.INT&&(ie=i.R32I)),y===i.RG&&(N===i.FLOAT&&(ie=i.RG32F),N===i.HALF_FLOAT&&(ie=i.RG16F),N===i.UNSIGNED_BYTE&&(ie=i.RG8)),y===i.RGBA){let Pe=le?Uo:Ft.getTransfer(de);N===i.FLOAT&&(ie=i.RGBA32F),N===i.HALF_FLOAT&&(ie=i.RGBA16F),N===i.UNSIGNED_BYTE&&(ie=Pe===kt?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function I(_,y,N){return T(_,N)===!0||_.isFramebufferTexture&&_.minFilter!==vn&&_.minFilter!==Zt?Math.log2(Math.max(y.width,y.height))+1:_.mipmaps!==void 0&&_.mipmaps.length>0?_.mipmaps.length:_.isCompressedTexture&&Array.isArray(_.image)?y.mipmaps.length:1}function b(_){return _===vn||_===Bl||_===Da?i.NEAREST:i.LINEAR}function A(_){let y=_.target;y.removeEventListener("dispose",A),M(y),y.isVideoTexture&&h.delete(y)}function F(_){let y=_.target;y.removeEventListener("dispose",F),k(y)}function M(_){let y=n.get(_);if(y.__webglInit===void 0)return;let N=_.source,de=d.get(N);if(de){let le=de[y.__cacheKey];le.usedTimes--,le.usedTimes===0&&S(_),Object.keys(de).length===0&&d.delete(N)}n.remove(_)}function S(_){let y=n.get(_);i.deleteTexture(y.__webglTexture);let N=_.source,de=d.get(N);delete de[y.__cacheKey],o.memory.textures--}function k(_){let y=_.texture,N=n.get(_),de=n.get(y);if(de.__webglTexture!==void 0&&(i.deleteTexture(de.__webglTexture),o.memory.textures--),_.depthTexture&&_.depthTexture.dispose(),_.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(N.__webglFramebuffer[le]))for(let ie=0;ie<N.__webglFramebuffer[le].length;ie++)i.deleteFramebuffer(N.__webglFramebuffer[le][ie]);else i.deleteFramebuffer(N.__webglFramebuffer[le]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[le])}else{if(Array.isArray(N.__webglFramebuffer))for(let le=0;le<N.__webglFramebuffer.length;le++)i.deleteFramebuffer(N.__webglFramebuffer[le]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let le=0;le<N.__webglColorRenderbuffer.length;le++)N.__webglColorRenderbuffer[le]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[le]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(_.isWebGLMultipleRenderTargets)for(let le=0,ie=y.length;le<ie;le++){let Pe=n.get(y[le]);Pe.__webglTexture&&(i.deleteTexture(Pe.__webglTexture),o.memory.textures--),n.remove(y[le])}n.remove(y),n.remove(_)}let Z=0;function ae(){Z=0}function U(){let _=Z;return _>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+_+" texture units while this GPU supports only "+s.maxTextures),Z+=1,_}function O(_){let y=[];return y.push(_.wrapS),y.push(_.wrapT),y.push(_.wrapR||0),y.push(_.magFilter),y.push(_.minFilter),y.push(_.anisotropy),y.push(_.internalFormat),y.push(_.format),y.push(_.type),y.push(_.generateMipmaps),y.push(_.premultiplyAlpha),y.push(_.flipY),y.push(_.unpackAlignment),y.push(_.colorSpace),y.join()}function X(_,y){let N=n.get(_);if(_.isVideoTexture&&Ae(_),_.isRenderTargetTexture===!1&&_.version>0&&N.__version!==_.version){let de=_.image;if(de===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se(N,_,y);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+y)}function ue(_,y){let N=n.get(_);if(_.version>0&&N.__version!==_.version){Se(N,_,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+y)}function ee(_,y){let N=n.get(_);if(_.version>0&&N.__version!==_.version){Se(N,_,y);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+y)}function ne(_,y){let N=n.get(_);if(_.version>0&&N.__version!==_.version){Ne(N,_,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+y)}let oe={[tr]:i.REPEAT,[pi]:i.CLAMP_TO_EDGE,[xc]:i.MIRRORED_REPEAT},ce={[vn]:i.NEAREST,[Bl]:i.NEAREST_MIPMAP_NEAREST,[Da]:i.NEAREST_MIPMAP_LINEAR,[Zt]:i.LINEAR,[lf]:i.LINEAR_MIPMAP_NEAREST,[Ur]:i.LINEAR_MIPMAP_LINEAR},be={[Ef]:i.NEVER,[Rf]:i.ALWAYS,[Mf]:i.LESS,[Su]:i.LEQUAL,[Tf]:i.EQUAL,[bf]:i.GEQUAL,[Sf]:i.GREATER,[wf]:i.NOTEQUAL};function q(_,y,N){if(N?(i.texParameteri(_,i.TEXTURE_WRAP_S,oe[y.wrapS]),i.texParameteri(_,i.TEXTURE_WRAP_T,oe[y.wrapT]),(_===i.TEXTURE_3D||_===i.TEXTURE_2D_ARRAY)&&i.texParameteri(_,i.TEXTURE_WRAP_R,oe[y.wrapR]),i.texParameteri(_,i.TEXTURE_MAG_FILTER,ce[y.magFilter]),i.texParameteri(_,i.TEXTURE_MIN_FILTER,ce[y.minFilter])):(i.texParameteri(_,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(_,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(_===i.TEXTURE_3D||_===i.TEXTURE_2D_ARRAY)&&i.texParameteri(_,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==pi||y.wrapT!==pi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(_,i.TEXTURE_MAG_FILTER,b(y.magFilter)),i.texParameteri(_,i.TEXTURE_MIN_FILTER,b(y.minFilter)),y.minFilter!==vn&&y.minFilter!==Zt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(_,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(_,i.TEXTURE_COMPARE_FUNC,be[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let de=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===vn||y.minFilter!==Da&&y.minFilter!==Ur||y.type===Ki&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===ki&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(_,de.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function j(_,y){let N=!1;_.__webglInit===void 0&&(_.__webglInit=!0,y.addEventListener("dispose",A));let de=y.source,le=d.get(de);le===void 0&&(le={},d.set(de,le));let ie=O(y);if(ie!==_.__cacheKey){le[ie]===void 0&&(le[ie]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,N=!0),le[ie].usedTimes++;let Pe=le[_.__cacheKey];Pe!==void 0&&(le[_.__cacheKey].usedTimes--,Pe.usedTimes===0&&S(y)),_.__cacheKey=ie,_.__webglTexture=le[ie].texture}return N}function Se(_,y,N){let de=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(de=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(de=i.TEXTURE_3D);let le=j(_,y),ie=y.source;t.bindTexture(de,_.__webglTexture,i.TEXTURE0+N);let Pe=n.get(ie);if(ie.version!==Pe.__version||le===!0){t.activeTexture(i.TEXTURE0+N);let ve=Ft.getPrimaries(Ft.workingColorSpace),ye=y.colorSpace===ti?null:Ft.getPrimaries(y.colorSpace),ze=y.colorSpace===ti||ve===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let it=p(y)&&m(y.image)===!1,me=x(y.image,it,!1,s.maxTextureSize);me=Me(y,me);let ct=m(me)||a,at=r.convert(y.format,y.colorSpace),Ze=r.convert(y.type),z=E(y.internalFormat,at,Ze,y.colorSpace,y.isVideoTexture);q(de,y,ct);let te,He=y.mipmaps,We=a&&y.isVideoTexture!==!0&&z!==Eu,Ie=Pe.__version===void 0||le===!0,De=I(y,me,ct);if(y.isDepthTexture)z=i.DEPTH_COMPONENT,a?y.type===Ki?z=i.DEPTH_COMPONENT32F:y.type===wi?z=i.DEPTH_COMPONENT24:y.type===xs?z=i.DEPTH24_STENCIL8:z=i.DEPTH_COMPONENT16:y.type===Ki&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Gi&&z===i.DEPTH_COMPONENT&&y.type!==tl&&y.type!==wi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=wi,Ze=r.convert(y.type)),y.format===nr&&z===i.DEPTH_COMPONENT&&(z=i.DEPTH_STENCIL,y.type!==xs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=xs,Ze=r.convert(y.type))),Ie&&(We?t.texStorage2D(i.TEXTURE_2D,1,z,me.width,me.height):t.texImage2D(i.TEXTURE_2D,0,z,me.width,me.height,0,at,Ze,null));else if(y.isDataTexture)if(He.length>0&&ct){We&&Ie&&t.texStorage2D(i.TEXTURE_2D,De,z,He[0].width,He[0].height);for(let he=0,D=He.length;he<D;he++)te=He[he],We?t.texSubImage2D(i.TEXTURE_2D,he,0,0,te.width,te.height,at,Ze,te.data):t.texImage2D(i.TEXTURE_2D,he,z,te.width,te.height,0,at,Ze,te.data);y.generateMipmaps=!1}else We?(Ie&&t.texStorage2D(i.TEXTURE_2D,De,z,me.width,me.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,me.width,me.height,at,Ze,me.data)):t.texImage2D(i.TEXTURE_2D,0,z,me.width,me.height,0,at,Ze,me.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){We&&Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,De,z,He[0].width,He[0].height,me.depth);for(let he=0,D=He.length;he<D;he++)te=He[he],y.format!==mi?at!==null?We?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,te.width,te.height,me.depth,at,te.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,he,z,te.width,te.height,me.depth,0,te.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?t.texSubImage3D(i.TEXTURE_2D_ARRAY,he,0,0,0,te.width,te.height,me.depth,at,Ze,te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,he,z,te.width,te.height,me.depth,0,at,Ze,te.data)}else{We&&Ie&&t.texStorage2D(i.TEXTURE_2D,De,z,He[0].width,He[0].height);for(let he=0,D=He.length;he<D;he++)te=He[he],y.format!==mi?at!==null?We?t.compressedTexSubImage2D(i.TEXTURE_2D,he,0,0,te.width,te.height,at,te.data):t.compressedTexImage2D(i.TEXTURE_2D,he,z,te.width,te.height,0,te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?t.texSubImage2D(i.TEXTURE_2D,he,0,0,te.width,te.height,at,Ze,te.data):t.texImage2D(i.TEXTURE_2D,he,z,te.width,te.height,0,at,Ze,te.data)}else if(y.isDataArrayTexture)We?(Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,De,z,me.width,me.height,me.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,at,Ze,me.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,z,me.width,me.height,me.depth,0,at,Ze,me.data);else if(y.isData3DTexture)We?(Ie&&t.texStorage3D(i.TEXTURE_3D,De,z,me.width,me.height,me.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,at,Ze,me.data)):t.texImage3D(i.TEXTURE_3D,0,z,me.width,me.height,me.depth,0,at,Ze,me.data);else if(y.isFramebufferTexture){if(Ie)if(We)t.texStorage2D(i.TEXTURE_2D,De,z,me.width,me.height);else{let he=me.width,D=me.height;for(let we=0;we<De;we++)t.texImage2D(i.TEXTURE_2D,we,z,he,D,0,at,Ze,null),he>>=1,D>>=1}}else if(He.length>0&&ct){We&&Ie&&t.texStorage2D(i.TEXTURE_2D,De,z,He[0].width,He[0].height);for(let he=0,D=He.length;he<D;he++)te=He[he],We?t.texSubImage2D(i.TEXTURE_2D,he,0,0,at,Ze,te):t.texImage2D(i.TEXTURE_2D,he,z,at,Ze,te);y.generateMipmaps=!1}else We?(Ie&&t.texStorage2D(i.TEXTURE_2D,De,z,me.width,me.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,at,Ze,me)):t.texImage2D(i.TEXTURE_2D,0,z,at,Ze,me);T(y,ct)&&v(de),Pe.__version=ie.version,y.onUpdate&&y.onUpdate(y)}_.__version=y.version}function Ne(_,y,N){if(y.image.length!==6)return;let de=j(_,y),le=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,_.__webglTexture,i.TEXTURE0+N);let ie=n.get(le);if(le.version!==ie.__version||de===!0){t.activeTexture(i.TEXTURE0+N);let Pe=Ft.getPrimaries(Ft.workingColorSpace),ve=y.colorSpace===ti?null:Ft.getPrimaries(y.colorSpace),ye=y.colorSpace===ti||Pe===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let ze=y.isCompressedTexture||y.image[0].isCompressedTexture,it=y.image[0]&&y.image[0].isDataTexture,me=[];for(let he=0;he<6;he++)!ze&&!it?me[he]=x(y.image[he],!1,!0,s.maxCubemapSize):me[he]=it?y.image[he].image:y.image[he],me[he]=Me(y,me[he]);let ct=me[0],at=m(ct)||a,Ze=r.convert(y.format,y.colorSpace),z=r.convert(y.type),te=E(y.internalFormat,Ze,z,y.colorSpace),He=a&&y.isVideoTexture!==!0,We=ie.__version===void 0||de===!0,Ie=I(y,ct,at);q(i.TEXTURE_CUBE_MAP,y,at);let De;if(ze){He&&We&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ie,te,ct.width,ct.height);for(let he=0;he<6;he++){De=me[he].mipmaps;for(let D=0;D<De.length;D++){let we=De[D];y.format!==mi?Ze!==null?He?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,D,0,0,we.width,we.height,Ze,we.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,D,te,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,D,0,0,we.width,we.height,Ze,z,we.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,D,te,we.width,we.height,0,Ze,z,we.data)}}}else{De=y.mipmaps,He&&We&&(De.length>0&&Ie++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Ie,te,me[0].width,me[0].height));for(let he=0;he<6;he++)if(it){He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,me[he].width,me[he].height,Ze,z,me[he].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,te,me[he].width,me[he].height,0,Ze,z,me[he].data);for(let D=0;D<De.length;D++){let Ee=De[D].image[he].image;He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,D+1,0,0,Ee.width,Ee.height,Ze,z,Ee.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,D+1,te,Ee.width,Ee.height,0,Ze,z,Ee.data)}}else{He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ze,z,me[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,te,Ze,z,me[he]);for(let D=0;D<De.length;D++){let we=De[D];He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,D+1,0,0,Ze,z,we.image[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,D+1,te,Ze,z,we.image[he])}}}T(y,at)&&v(i.TEXTURE_CUBE_MAP),ie.__version=le.version,y.onUpdate&&y.onUpdate(y)}_.__version=y.version}function Re(_,y,N,de,le,ie){let Pe=r.convert(N.format,N.colorSpace),ve=r.convert(N.type),ye=E(N.internalFormat,Pe,ve,N.colorSpace);if(!n.get(y).__hasExternalTextures){let it=Math.max(1,y.width>>ie),me=Math.max(1,y.height>>ie);le===i.TEXTURE_3D||le===i.TEXTURE_2D_ARRAY?t.texImage3D(le,ie,ye,it,me,y.depth,0,Pe,ve,null):t.texImage2D(le,ie,ye,it,me,0,Pe,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,_),Y(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,de,le,n.get(N).__webglTexture,0,re(y)):(le===i.TEXTURE_2D||le>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&le<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,de,le,n.get(N).__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(_,y,N){if(i.bindRenderbuffer(i.RENDERBUFFER,_),y.depthBuffer&&!y.stencilBuffer){let de=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||Y(y)){let le=y.depthTexture;le&&le.isDepthTexture&&(le.type===Ki?de=i.DEPTH_COMPONENT32F:le.type===wi&&(de=i.DEPTH_COMPONENT24));let ie=re(y);Y(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie,de,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,de,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,de,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,_)}else if(y.depthBuffer&&y.stencilBuffer){let de=re(y);N&&Y(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,de,i.DEPTH24_STENCIL8,y.width,y.height):Y(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,_)}else{let de=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let le=0;le<de.length;le++){let ie=de[le],Pe=r.convert(ie.format,ie.colorSpace),ve=r.convert(ie.type),ye=E(ie.internalFormat,Pe,ve,ie.colorSpace),ze=re(y);N&&Y(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ze,ye,y.width,y.height):Y(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ze,ye,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ye,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ke(_,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,_),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X(y.depthTexture,0);let de=n.get(y.depthTexture).__webglTexture,le=re(y);if(y.depthTexture.format===Gi)Y(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,de,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,de,0);else if(y.depthTexture.format===nr)Y(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,de,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,de,0);else throw new Error("Unknown depthTexture format")}function W(_){let y=n.get(_),N=_.isWebGLCubeRenderTarget===!0;if(_.depthTexture&&!y.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");ke(y.__webglFramebuffer,_)}else if(N){y.__webglDepthbuffer=[];for(let de=0;de<6;de++)t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[de]),y.__webglDepthbuffer[de]=i.createRenderbuffer(),Ue(y.__webglDepthbuffer[de],_,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),Ue(y.__webglDepthbuffer,_,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(_,y,N){let de=n.get(_);y!==void 0&&Re(de.__webglFramebuffer,_,_.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&W(_)}function C(_){let y=_.texture,N=n.get(_),de=n.get(y);_.addEventListener("dispose",F),_.isWebGLMultipleRenderTargets!==!0&&(de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture()),de.__version=y.version,o.memory.textures++);let le=_.isWebGLCubeRenderTarget===!0,ie=_.isWebGLMultipleRenderTargets===!0,Pe=m(_)||a;if(le){N.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(a&&y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer[ve]=[];for(let ye=0;ye<y.mipmaps.length;ye++)N.__webglFramebuffer[ve][ye]=i.createFramebuffer()}else N.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer=[];for(let ve=0;ve<y.mipmaps.length;ve++)N.__webglFramebuffer[ve]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(ie)if(s.drawBuffers){let ve=_.texture;for(let ye=0,ze=ve.length;ye<ze;ye++){let it=n.get(ve[ye]);it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&_.samples>0&&Y(_)===!1){let ve=ie?y:[y];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ye=0;ye<ve.length;ye++){let ze=ve[ye];N.__webglColorRenderbuffer[ye]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[ye]);let it=r.convert(ze.format,ze.colorSpace),me=r.convert(ze.type),ct=E(ze.internalFormat,it,me,ze.colorSpace,_.isXRRenderTarget===!0),at=re(_);i.renderbufferStorageMultisample(i.RENDERBUFFER,at,ct,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,N.__webglColorRenderbuffer[ye])}i.bindRenderbuffer(i.RENDERBUFFER,null),_.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Ue(N.__webglDepthRenderbuffer,_,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,de.__webglTexture),q(i.TEXTURE_CUBE_MAP,y,Pe);for(let ve=0;ve<6;ve++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let ye=0;ye<y.mipmaps.length;ye++)Re(N.__webglFramebuffer[ve][ye],_,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,ye);else Re(N.__webglFramebuffer[ve],_,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);T(y,Pe)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){let ve=_.texture;for(let ye=0,ze=ve.length;ye<ze;ye++){let it=ve[ye],me=n.get(it);t.bindTexture(i.TEXTURE_2D,me.__webglTexture),q(i.TEXTURE_2D,it,Pe),Re(N.__webglFramebuffer,_,it,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,0),T(it,Pe)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((_.isWebGL3DRenderTarget||_.isWebGLArrayRenderTarget)&&(a?ve=_.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ve,de.__webglTexture),q(ve,y,Pe),a&&y.mipmaps&&y.mipmaps.length>0)for(let ye=0;ye<y.mipmaps.length;ye++)Re(N.__webglFramebuffer[ye],_,y,i.COLOR_ATTACHMENT0,ve,ye);else Re(N.__webglFramebuffer,_,y,i.COLOR_ATTACHMENT0,ve,0);T(y,Pe)&&v(ve),t.unbindTexture()}_.depthBuffer&&W(_)}function fe(_){let y=m(_)||a,N=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let de=0,le=N.length;de<le;de++){let ie=N[de];if(T(ie,y)){let Pe=_.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ve=n.get(ie).__webglTexture;t.bindTexture(Pe,ve),v(Pe),t.unbindTexture()}}}function V(_){if(a&&_.samples>0&&Y(_)===!1){let y=_.isWebGLMultipleRenderTargets?_.texture:[_.texture],N=_.width,de=_.height,le=i.COLOR_BUFFER_BIT,ie=[],Pe=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(_),ye=_.isWebGLMultipleRenderTargets===!0;if(ye)for(let ze=0;ze<y.length;ze++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ze,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ze,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let ze=0;ze<y.length;ze++){ie.push(i.COLOR_ATTACHMENT0+ze),_.depthBuffer&&ie.push(Pe);let it=ve.__ignoreDepthValues!==void 0?ve.__ignoreDepthValues:!1;if(it===!1&&(_.depthBuffer&&(le|=i.DEPTH_BUFFER_BIT),_.stencilBuffer&&(le|=i.STENCIL_BUFFER_BIT)),ye&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[ze]),it===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Pe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Pe])),ye){let me=n.get(y[ze]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,me,0)}i.blitFramebuffer(0,0,N,de,0,0,N,de,le,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ye)for(let ze=0;ze<y.length;ze++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ze,i.RENDERBUFFER,ve.__webglColorRenderbuffer[ze]);let it=n.get(y[ze]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ze,i.TEXTURE_2D,it,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}}function re(_){return Math.min(s.maxSamples,_.samples)}function Y(_){let y=n.get(_);return a&&_.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ae(_){let y=o.render.frame;h.get(_)!==y&&(h.set(_,y),_.update())}function Me(_,y){let N=_.colorSpace,de=_.format,le=_.type;return _.isCompressedTexture===!0||_.isVideoTexture===!0||_.format===vc||N!==gi&&N!==ti&&(Ft.getTransfer(N)===kt?a===!1?e.has("EXT_sRGB")===!0&&de===mi?(_.format=vc,_.minFilter=Zt,_.generateMipmaps=!1):y=zo.sRGBToLinear(y):(de!==mi||le!==Ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),y}this.allocateTextureUnit=U,this.resetTextureUnits=ae,this.setTexture2D=X,this.setTexture2DArray=ue,this.setTexture3D=ee,this.setTextureCube=ne,this.rebindTextures=ge,this.setupRenderTarget=C,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=V,this.setupDepthRenderbuffer=W,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=Y}function Px(i,e,t){let n=t.isWebGL2;function s(r,o=ti){let a,c=Ft.getTransfer(o);if(r===Ri)return i.UNSIGNED_BYTE;if(r===gu)return i.UNSIGNED_SHORT_4_4_4_4;if(r===xu)return i.UNSIGNED_SHORT_5_5_5_1;if(r===hf)return i.BYTE;if(r===uf)return i.SHORT;if(r===tl)return i.UNSIGNED_SHORT;if(r===mu)return i.INT;if(r===wi)return i.UNSIGNED_INT;if(r===Ki)return i.FLOAT;if(r===ki)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===df)return i.ALPHA;if(r===mi)return i.RGBA;if(r===ff)return i.LUMINANCE;if(r===pf)return i.LUMINANCE_ALPHA;if(r===Gi)return i.DEPTH_COMPONENT;if(r===nr)return i.DEPTH_STENCIL;if(r===vc)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===mf)return i.RED;if(r===vu)return i.RED_INTEGER;if(r===gf)return i.RG;if(r===yu)return i.RG_INTEGER;if(r===_u)return i.RGBA_INTEGER;if(r===Ua||r===Ha||r===Na||r===Fa)if(c===kt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Ua)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ha)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Na)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Fa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Ua)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ha)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Na)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Fa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ol||r===zl||r===Gl||r===kl)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Ol)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===zl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Gl)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===kl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Eu)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Vl||r===Wl)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Vl)return c===kt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Wl)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Xl||r===ql||r===Yl||r===Zl||r===Jl||r===$l||r===Kl||r===jl||r===Ql||r===eh||r===th||r===nh||r===ih||r===sh)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Xl)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ql)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Yl)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Zl)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Jl)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===$l)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Kl)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===jl)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ql)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===eh)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===th)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===nh)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ih)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===sh)return c===kt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ba||r===rh||r===oh)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Ba)return c===kt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===rh)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===oh)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===xf||r===ah||r===ch||r===lh)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Ba)return a.COMPRESSED_RED_RGTC1_EXT;if(r===ah)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ch)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===lh)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===xs?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var Lc=class extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},ot=class extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ix={type:"move"},Pr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ix)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ot;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Dc=class extends es{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,x=t.getContextAttributes(),m=null,p=null,T=[],v=[],E=new pe,I=null,b=new yn;b.layers.enable(1),b.viewport=new Jt;let A=new yn;A.layers.enable(2),A.viewport=new Jt;let F=[b,A],M=new Lc;M.layers.enable(1),M.layers.enable(2);let S=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let j=T[q];return j===void 0&&(j=new Pr,T[q]=j),j.getTargetRaySpace()},this.getControllerGrip=function(q){let j=T[q];return j===void 0&&(j=new Pr,T[q]=j),j.getGripSpace()},this.getHand=function(q){let j=T[q];return j===void 0&&(j=new Pr,T[q]=j),j.getHandSpace()};function Z(q){let j=v.indexOf(q.inputSource);if(j===-1)return;let Se=T[j];Se!==void 0&&(Se.update(q.inputSource,q.frame,l||o),Se.dispatchEvent({type:q.type,data:q.inputSource}))}function ae(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",ae),s.removeEventListener("inputsourceschange",U);for(let q=0;q<T.length;q++){let j=v[q];j!==null&&(v[q]=null,T[q].disconnect(j))}S=null,k=null,e.setRenderTarget(m),f=null,d=null,u=null,s=null,p=null,be.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",ae),s.addEventListener("inputsourceschange",U),x.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(E),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let j={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new on(f.framebufferWidth,f.framebufferHeight,{format:mi,type:Ri,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let j=null,Se=null,Ne=null;x.depth&&(Ne=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=x.stencil?nr:Gi,Se=x.stencil?xs:wi);let Re={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Re),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new on(d.textureWidth,d.textureHeight,{format:mi,type:Ri,depthTexture:new or(d.textureWidth,d.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});let Ue=e.properties.get(p);Ue.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),be.setContext(s),be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function U(q){for(let j=0;j<q.removed.length;j++){let Se=q.removed[j],Ne=v.indexOf(Se);Ne>=0&&(v[Ne]=null,T[Ne].disconnect(Se))}for(let j=0;j<q.added.length;j++){let Se=q.added[j],Ne=v.indexOf(Se);if(Ne===-1){for(let Ue=0;Ue<T.length;Ue++)if(Ue>=v.length){v.push(Se),Ne=Ue;break}else if(v[Ue]===null){v[Ue]=Se,Ne=Ue;break}if(Ne===-1)break}let Re=T[Ne];Re&&Re.connect(Se)}}let O=new R,X=new R;function ue(q,j,Se){O.setFromMatrixPosition(j.matrixWorld),X.setFromMatrixPosition(Se.matrixWorld);let Ne=O.distanceTo(X),Re=j.projectionMatrix.elements,Ue=Se.projectionMatrix.elements,ke=Re[14]/(Re[10]-1),W=Re[14]/(Re[10]+1),ge=(Re[9]+1)/Re[5],C=(Re[9]-1)/Re[5],fe=(Re[8]-1)/Re[0],V=(Ue[8]+1)/Ue[0],re=ke*fe,Y=ke*V,Ae=Ne/(-fe+V),Me=Ae*-fe;j.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Me),q.translateZ(Ae),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();let _=ke+Ae,y=W+Ae,N=re-Me,de=Y+(Ne-Me),le=ge*W/y*_,ie=C*W/y*_;q.projectionMatrix.makePerspective(N,de,le,ie,_,y),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function ee(q,j){j===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(j.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;M.near=A.near=b.near=q.near,M.far=A.far=b.far=q.far,(S!==M.near||k!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),S=M.near,k=M.far);let j=q.parent,Se=M.cameras;ee(M,j);for(let Ne=0;Ne<Se.length;Ne++)ee(Se[Ne],j);Se.length===2?ue(M,b,A):M.projectionMatrix.copy(b.projectionMatrix),ne(q,M,j)};function ne(q,j,Se){Se===null?q.matrix.copy(j.matrixWorld):(q.matrix.copy(Se.matrixWorld),q.matrix.invert(),q.matrix.multiply(j.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(j.projectionMatrix),q.projectionMatrixInverse.copy(j.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Hr*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(q){c=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)};let oe=null;function ce(q,j){if(h=j.getViewerPose(l||o),g=j,h!==null){let Se=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let Ne=!1;Se.length!==M.cameras.length&&(M.cameras.length=0,Ne=!0);for(let Re=0;Re<Se.length;Re++){let Ue=Se[Re],ke=null;if(f!==null)ke=f.getViewport(Ue);else{let ge=u.getViewSubImage(d,Ue);ke=ge.viewport,Re===0&&(e.setRenderTargetTextures(p,ge.colorTexture,d.ignoreDepthValues?void 0:ge.depthStencilTexture),e.setRenderTarget(p))}let W=F[Re];W===void 0&&(W=new yn,W.layers.enable(Re),W.viewport=new Jt,F[Re]=W),W.matrix.fromArray(Ue.transform.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale),W.projectionMatrix.fromArray(Ue.projectionMatrix),W.projectionMatrixInverse.copy(W.projectionMatrix).invert(),W.viewport.set(ke.x,ke.y,ke.width,ke.height),Re===0&&(M.matrix.copy(W.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Ne===!0&&M.cameras.push(W)}}for(let Se=0;Se<T.length;Se++){let Ne=v[Se],Re=T[Se];Ne!==null&&Re!==void 0&&Re.update(Ne,j,l||o)}oe&&oe(q,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}let be=new Au;be.setAnimationLoop(ce),this.setAnimationLoop=function(q){oe=q},this.dispose=function(){}}};function Lx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ru(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,v,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,E)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,T,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===_n&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===_n&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let T=e.get(p).envMap;if(T&&(m.envMap.value=T,m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,T,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===_n&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Dx(i,e,t,n){let s={},r={},o=[],a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(T,v){let E=v.program;n.uniformBlockBinding(T,E)}function l(T,v){let E=s[T.id];E===void 0&&(g(T),E=h(T),s[T.id]=E,T.addEventListener("dispose",m));let I=v.program;n.updateUBOMapping(T,I);let b=e.render.frame;r[T.id]!==b&&(d(T),r[T.id]=b)}function h(T){let v=u();T.__bindingPointIndex=v;let E=i.createBuffer(),I=T.__size,b=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,I,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,E),E}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){let v=s[T.id],E=T.uniforms,I=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let b=0,A=E.length;b<A;b++){let F=Array.isArray(E[b])?E[b]:[E[b]];for(let M=0,S=F.length;M<S;M++){let k=F[M];if(f(k,b,M,I)===!0){let Z=k.__offset,ae=Array.isArray(k.value)?k.value:[k.value],U=0;for(let O=0;O<ae.length;O++){let X=ae[O],ue=x(X);typeof X=="number"||typeof X=="boolean"?(k.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,Z+U,k.__data)):X.isMatrix3?(k.__data[0]=X.elements[0],k.__data[1]=X.elements[1],k.__data[2]=X.elements[2],k.__data[3]=0,k.__data[4]=X.elements[3],k.__data[5]=X.elements[4],k.__data[6]=X.elements[5],k.__data[7]=0,k.__data[8]=X.elements[6],k.__data[9]=X.elements[7],k.__data[10]=X.elements[8],k.__data[11]=0):(X.toArray(k.__data,U),U+=ue.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Z,k.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,v,E,I){let b=T.value,A=v+"_"+E;if(I[A]===void 0)return typeof b=="number"||typeof b=="boolean"?I[A]=b:I[A]=b.clone(),!0;{let F=I[A];if(typeof b=="number"||typeof b=="boolean"){if(F!==b)return I[A]=b,!0}else if(F.equals(b)===!1)return F.copy(b),!0}return!1}function g(T){let v=T.uniforms,E=0,I=16;for(let A=0,F=v.length;A<F;A++){let M=Array.isArray(v[A])?v[A]:[v[A]];for(let S=0,k=M.length;S<k;S++){let Z=M[S],ae=Array.isArray(Z.value)?Z.value:[Z.value];for(let U=0,O=ae.length;U<O;U++){let X=ae[U],ue=x(X),ee=E%I;ee!==0&&I-ee<ue.boundary&&(E+=I-ee),Z.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=E,E+=ue.storage}}}let b=E%I;return b>0&&(E+=I-b),T.__size=E,T.__cache={},this}function x(T){let v={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(v.boundary=4,v.storage=4):T.isVector2?(v.boundary=8,v.storage=8):T.isVector3||T.isColor?(v.boundary=16,v.storage=12):T.isVector4?(v.boundary=16,v.storage=16):T.isMatrix3?(v.boundary=48,v.storage=48):T.isMatrix4?(v.boundary=64,v.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),v}function m(T){let v=T.target;v.removeEventListener("dispose",m);let E=o.indexOf(v.__bindingPointIndex);o.splice(E,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Or=class{constructor(e={}){let{canvas:t=kf(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;let f=new Uint32Array(4),g=new Int32Array(4),x=null,m=null,p=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qt,this._useLegacyLights=!1,this.toneMapping=bi,this.toneMappingExposure=1;let v=this,E=!1,I=0,b=0,A=null,F=-1,M=null,S=new Jt,k=new Jt,Z=null,ae=new Ce(0),U=0,O=t.width,X=t.height,ue=1,ee=null,ne=null,oe=new Jt(0,0,O,X),ce=new Jt(0,0,O,X),be=!1,q=new Br,j=!1,Se=!1,Ne=null,Re=new Rt,Ue=new pe,ke=new R,W={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ge(){return A===null?ue:1}let C=n;function fe(w,G){for(let J=0;J<w.length;J++){let $=w[J],K=t.getContext($,G);if(K!==null)return K}return null}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",he,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",we,!1),C===null){let G=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&G.shift(),C=fe(G,w),C===null)throw fe(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&C instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),C.getShaderPrecisionFormat===void 0&&(C.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let V,re,Y,Ae,Me,_,y,N,de,le,ie,Pe,ve,ye,ze,it,me,ct,at,Ze,z,te,He,We;function Ie(){V=new jm(C),re=new qm(C,V,e),V.init(re),te=new Px(C,V,re),Y=new Ax(C,V,re),Ae=new tg(C),Me=new gx,_=new Cx(C,V,Y,Me,re,te,Ae),y=new Zm(v),N=new Km(v),de=new lp(C,re),He=new Wm(C,V,de,re),le=new Qm(C,de,Ae,He),ie=new rg(C,le,de,Ae),at=new sg(C,re,_),it=new Ym(Me),Pe=new mx(v,y,N,V,re,He,it),ve=new Lx(v,Me),ye=new vx,ze=new Sx(V,re),ct=new Vm(v,y,N,Y,ie,d,c),me=new Rx(v,ie,re),We=new Dx(C,Ae,re,Y),Ze=new Xm(C,V,Ae,re),z=new eg(C,V,Ae,re),Ae.programs=Pe.programs,v.capabilities=re,v.extensions=V,v.properties=Me,v.renderLists=ye,v.shadowMap=me,v.state=Y,v.info=Ae}Ie();let De=new Dc(v,C);this.xr=De,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let w=V.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=V.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(w){w!==void 0&&(ue=w,this.setSize(O,X,!1))},this.getSize=function(w){return w.set(O,X)},this.setSize=function(w,G,J=!0){if(De.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=w,X=G,t.width=Math.floor(w*ue),t.height=Math.floor(G*ue),J===!0&&(t.style.width=w+"px",t.style.height=G+"px"),this.setViewport(0,0,w,G)},this.getDrawingBufferSize=function(w){return w.set(O*ue,X*ue).floor()},this.setDrawingBufferSize=function(w,G,J){O=w,X=G,ue=J,t.width=Math.floor(w*J),t.height=Math.floor(G*J),this.setViewport(0,0,w,G)},this.getCurrentViewport=function(w){return w.copy(S)},this.getViewport=function(w){return w.copy(oe)},this.setViewport=function(w,G,J,$){w.isVector4?oe.set(w.x,w.y,w.z,w.w):oe.set(w,G,J,$),Y.viewport(S.copy(oe).multiplyScalar(ue).floor())},this.getScissor=function(w){return w.copy(ce)},this.setScissor=function(w,G,J,$){w.isVector4?ce.set(w.x,w.y,w.z,w.w):ce.set(w,G,J,$),Y.scissor(k.copy(ce).multiplyScalar(ue).floor())},this.getScissorTest=function(){return be},this.setScissorTest=function(w){Y.setScissorTest(be=w)},this.setOpaqueSort=function(w){ee=w},this.setTransparentSort=function(w){ne=w},this.getClearColor=function(w){return w.copy(ct.getClearColor())},this.setClearColor=function(){ct.setClearColor.apply(ct,arguments)},this.getClearAlpha=function(){return ct.getClearAlpha()},this.setClearAlpha=function(){ct.setClearAlpha.apply(ct,arguments)},this.clear=function(w=!0,G=!0,J=!0){let $=0;if(w){let K=!1;if(A!==null){let Te=A.texture.format;K=Te===_u||Te===yu||Te===vu}if(K){let Te=A.texture.type,Ge=Te===Ri||Te===wi||Te===tl||Te===xs||Te===gu||Te===xu,Ke=ct.getClearColor(),Ye=ct.getClearAlpha(),st=Ke.r,et=Ke.g,je=Ke.b;Ge?(f[0]=st,f[1]=et,f[2]=je,f[3]=Ye,C.clearBufferuiv(C.COLOR,0,f)):(g[0]=st,g[1]=et,g[2]=je,g[3]=Ye,C.clearBufferiv(C.COLOR,0,g))}else $|=C.COLOR_BUFFER_BIT}G&&($|=C.DEPTH_BUFFER_BIT),J&&($|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",he,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",we,!1),ye.dispose(),ze.dispose(),Me.dispose(),y.dispose(),N.dispose(),ie.dispose(),He.dispose(),We.dispose(),Pe.dispose(),De.dispose(),De.removeEventListener("sessionstart",Gt),De.removeEventListener("sessionend",Et),Ne&&(Ne.dispose(),Ne=null),Xt.stop()};function he(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let w=Ae.autoReset,G=me.enabled,J=me.autoUpdate,$=me.needsUpdate,K=me.type;Ie(),Ae.autoReset=w,me.enabled=G,me.autoUpdate=J,me.needsUpdate=$,me.type=K}function we(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ee(w){let G=w.target;G.removeEventListener("dispose",Ee),Xe(G)}function Xe(w){qe(w),Me.remove(w)}function qe(w){let G=Me.get(w).programs;G!==void 0&&(G.forEach(function(J){Pe.releaseProgram(J)}),w.isShaderMaterial&&Pe.releaseShaderCache(w))}this.renderBufferDirect=function(w,G,J,$,K,Te){G===null&&(G=W);let Ge=K.isMesh&&K.matrixWorld.determinant()<0,Ke=cn(w,G,J,$,K);Y.setMaterial($,Ge);let Ye=J.index,st=1;if($.wireframe===!0){if(Ye=le.getWireframeAttribute(J),Ye===void 0)return;st=2}let et=J.drawRange,je=J.attributes.position,Mt=et.start*st,Nt=(et.start+et.count)*st;Te!==null&&(Mt=Math.max(Mt,Te.start*st),Nt=Math.min(Nt,(Te.start+Te.count)*st)),Ye!==null?(Mt=Math.max(Mt,0),Nt=Math.min(Nt,Ye.count)):je!=null&&(Mt=Math.max(Mt,0),Nt=Math.min(Nt,je.count));let It=Nt-Mt;if(It<0||It===1/0)return;He.setup(K,$,Ke,J,Ye);let Tt,dt=Ze;if(Ye!==null&&(Tt=de.get(Ye),dt=z,dt.setIndex(Tt)),K.isMesh)$.wireframe===!0?(Y.setLineWidth($.wireframeLinewidth*ge()),dt.setMode(C.LINES)):dt.setMode(C.TRIANGLES);else if(K.isLine){let rt=$.linewidth;rt===void 0&&(rt=1),Y.setLineWidth(rt*ge()),K.isLineSegments?dt.setMode(C.LINES):K.isLineLoop?dt.setMode(C.LINE_LOOP):dt.setMode(C.LINE_STRIP)}else K.isPoints?dt.setMode(C.POINTS):K.isSprite&&dt.setMode(C.TRIANGLES);if(K.isBatchedMesh)dt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else if(K.isInstancedMesh)dt.renderInstances(Mt,It,K.count);else if(J.isInstancedBufferGeometry){let rt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,rn=Math.min(J.instanceCount,rt);dt.renderInstances(Mt,It,rn)}else dt.render(Mt,It)};function ht(w,G,J){w.transparent===!0&&w.side===Nn&&w.forceSinglePass===!1?(w.side=_n,w.needsUpdate=!0,Fn(w,G,J),w.side=Qi,w.needsUpdate=!0,Fn(w,G,J),w.side=Nn):Fn(w,G,J)}this.compile=function(w,G,J=null){J===null&&(J=w),m=ze.get(J),m.init(),T.push(m),J.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(m.pushLight(K),K.castShadow&&m.pushShadow(K))}),w!==J&&w.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(m.pushLight(K),K.castShadow&&m.pushShadow(K))}),m.setupLights(v._useLegacyLights);let $=new Set;return w.traverse(function(K){let Te=K.material;if(Te)if(Array.isArray(Te))for(let Ge=0;Ge<Te.length;Ge++){let Ke=Te[Ge];ht(Ke,J,K),$.add(Ke)}else ht(Te,J,K),$.add(Te)}),T.pop(),m=null,$},this.compileAsync=function(w,G,J=null){let $=this.compile(w,G,J);return new Promise(K=>{function Te(){if($.forEach(function(Ge){Me.get(Ge).currentProgram.isReady()&&$.delete(Ge)}),$.size===0){K(w);return}setTimeout(Te,10)}V.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let ft=null;function ut(w){ft&&ft(w)}function Gt(){Xt.stop()}function Et(){Xt.start()}let Xt=new Au;Xt.setAnimationLoop(ut),typeof self<"u"&&Xt.setContext(self),this.setAnimationLoop=function(w){ft=w,De.setAnimationLoop(w),w===null?Xt.stop():Xt.start()},De.addEventListener("sessionstart",Gt),De.addEventListener("sessionend",Et),this.render=function(w,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(De.cameraAutoUpdate===!0&&De.updateCamera(G),G=De.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,G,A),m=ze.get(w,T.length),m.init(),T.push(m),Re.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),q.setFromProjectionMatrix(Re),Se=this.localClippingEnabled,j=it.init(this.clippingPlanes,Se),x=ye.get(w,p.length),x.init(),p.push(x),nn(w,G,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(ee,ne),this.info.render.frame++,j===!0&&it.beginShadows();let J=m.state.shadowsArray;if(me.render(J,w,G),j===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset(),ct.render(x,w),m.setupLights(v._useLegacyLights),G.isArrayCamera){let $=G.cameras;for(let K=0,Te=$.length;K<Te;K++){let Ge=$[K];Mi(x,w,Ge,Ge.viewport)}}else Mi(x,w,G);A!==null&&(_.updateMultisampleRenderTarget(A),_.updateRenderTargetMipmap(A)),w.isScene===!0&&w.onAfterRender(v,w,G),He.resetDefaultState(),F=-1,M=null,T.pop(),T.length>0?m=T[T.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function nn(w,G,J,$){if(w.visible===!1)return;if(w.layers.test(G.layers)){if(w.isGroup)J=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(G);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||q.intersectsSprite(w)){$&&ke.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Re);let Ge=ie.update(w),Ke=w.material;Ke.visible&&x.push(w,Ge,Ke,J,ke.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||q.intersectsObject(w))){let Ge=ie.update(w),Ke=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ke.copy(w.boundingSphere.center)):(Ge.boundingSphere===null&&Ge.computeBoundingSphere(),ke.copy(Ge.boundingSphere.center)),ke.applyMatrix4(w.matrixWorld).applyMatrix4(Re)),Array.isArray(Ke)){let Ye=Ge.groups;for(let st=0,et=Ye.length;st<et;st++){let je=Ye[st],Mt=Ke[je.materialIndex];Mt&&Mt.visible&&x.push(w,Ge,Mt,J,ke.z,je)}}else Ke.visible&&x.push(w,Ge,Ke,J,ke.z,null)}}let Te=w.children;for(let Ge=0,Ke=Te.length;Ge<Ke;Ge++)nn(Te[Ge],G,J,$)}function Mi(w,G,J,$){let K=w.opaque,Te=w.transmissive,Ge=w.transparent;m.setupLightsView(J),j===!0&&it.setGlobalState(v.clippingPlanes,J),Te.length>0&&Mn(K,Te,G,J),$&&Y.viewport(S.copy($)),K.length>0&&li(K,G,J),Te.length>0&&li(Te,G,J),Ge.length>0&&li(Ge,G,J),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function Mn(w,G,J,$){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;let Te=re.isWebGL2;Ne===null&&(Ne=new on(1,1,{generateMipmaps:!0,type:V.has("EXT_color_buffer_half_float")?ki:Ri,minFilter:Ur,samples:Te?4:0})),v.getDrawingBufferSize(Ue),Te?Ne.setSize(Ue.x,Ue.y):Ne.setSize(Bo(Ue.x),Bo(Ue.y));let Ge=v.getRenderTarget();v.setRenderTarget(Ne),v.getClearColor(ae),U=v.getClearAlpha(),U<1&&v.setClearColor(16777215,.5),v.clear();let Ke=v.toneMapping;v.toneMapping=bi,li(w,J,$),_.updateMultisampleRenderTarget(Ne),_.updateRenderTargetMipmap(Ne);let Ye=!1;for(let st=0,et=G.length;st<et;st++){let je=G[st],Mt=je.object,Nt=je.geometry,It=je.material,Tt=je.group;if(It.side===Nn&&Mt.layers.test($.layers)){let dt=It.side;It.side=_n,It.needsUpdate=!0,gn(Mt,J,$,Nt,It,Tt),It.side=dt,It.needsUpdate=!0,Ye=!0}}Ye===!0&&(_.updateMultisampleRenderTarget(Ne),_.updateRenderTargetMipmap(Ne)),v.setRenderTarget(Ge),v.setClearColor(ae,U),v.toneMapping=Ke}function li(w,G,J){let $=G.isScene===!0?G.overrideMaterial:null;for(let K=0,Te=w.length;K<Te;K++){let Ge=w[K],Ke=Ge.object,Ye=Ge.geometry,st=$===null?Ge.material:$,et=Ge.group;Ke.layers.test(J.layers)&&gn(Ke,G,J,Ye,st,et)}}function gn(w,G,J,$,K,Te){w.onBeforeRender(v,G,J,$,K,Te),w.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),K.onBeforeRender(v,G,J,$,w,Te),K.transparent===!0&&K.side===Nn&&K.forceSinglePass===!1?(K.side=_n,K.needsUpdate=!0,v.renderBufferDirect(J,G,$,K,w,Te),K.side=Qi,K.needsUpdate=!0,v.renderBufferDirect(J,G,$,K,w,Te),K.side=Nn):v.renderBufferDirect(J,G,$,K,w,Te),w.onAfterRender(v,G,J,$,K,Te)}function Fn(w,G,J){G.isScene!==!0&&(G=W);let $=Me.get(w),K=m.state.lights,Te=m.state.shadowsArray,Ge=K.state.version,Ke=Pe.getParameters(w,K.state,Te,G,J),Ye=Pe.getProgramCacheKey(Ke),st=$.programs;$.environment=w.isMeshStandardMaterial?G.environment:null,$.fog=G.fog,$.envMap=(w.isMeshStandardMaterial?N:y).get(w.envMap||$.environment),st===void 0&&(w.addEventListener("dispose",Ee),st=new Map,$.programs=st);let et=st.get(Ye);if(et!==void 0){if($.currentProgram===et&&$.lightsStateVersion===Ge)return Wn(w,Ke),et}else Ke.uniforms=Pe.getUniforms(w),w.onBuild(J,Ke,v),w.onBeforeCompile(Ke,v),et=Pe.acquireProgram(Ke,Ye),st.set(Ye,et),$.uniforms=Ke.uniforms;let je=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(je.clippingPlanes=it.uniform),Wn(w,Ke),$.needsLights=qt(w),$.lightsStateVersion=Ge,$.needsLights&&(je.ambientLightColor.value=K.state.ambient,je.lightProbe.value=K.state.probe,je.directionalLights.value=K.state.directional,je.directionalLightShadows.value=K.state.directionalShadow,je.spotLights.value=K.state.spot,je.spotLightShadows.value=K.state.spotShadow,je.rectAreaLights.value=K.state.rectArea,je.ltc_1.value=K.state.rectAreaLTC1,je.ltc_2.value=K.state.rectAreaLTC2,je.pointLights.value=K.state.point,je.pointLightShadows.value=K.state.pointShadow,je.hemisphereLights.value=K.state.hemi,je.directionalShadowMap.value=K.state.directionalShadowMap,je.directionalShadowMatrix.value=K.state.directionalShadowMatrix,je.spotShadowMap.value=K.state.spotShadowMap,je.spotLightMatrix.value=K.state.spotLightMatrix,je.spotLightMap.value=K.state.spotLightMap,je.pointShadowMap.value=K.state.pointShadowMap,je.pointShadowMatrix.value=K.state.pointShadowMatrix),$.currentProgram=et,$.uniformsList=null,et}function Vn(w){if(w.uniformsList===null){let G=w.currentProgram.getUniforms();w.uniformsList=js.seqWithValue(G.seq,w.uniforms)}return w.uniformsList}function Wn(w,G){let J=Me.get(w);J.outputColorSpace=G.outputColorSpace,J.batching=G.batching,J.instancing=G.instancing,J.instancingColor=G.instancingColor,J.skinning=G.skinning,J.morphTargets=G.morphTargets,J.morphNormals=G.morphNormals,J.morphColors=G.morphColors,J.morphTargetsCount=G.morphTargetsCount,J.numClippingPlanes=G.numClippingPlanes,J.numIntersection=G.numClipIntersection,J.vertexAlphas=G.vertexAlphas,J.vertexTangents=G.vertexTangents,J.toneMapping=G.toneMapping}function cn(w,G,J,$,K){G.isScene!==!0&&(G=W),_.resetTextureUnits();let Te=G.fog,Ge=$.isMeshStandardMaterial?G.environment:null,Ke=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:gi,Ye=($.isMeshStandardMaterial?N:y).get($.envMap||Ge),st=$.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,et=!!J.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),je=!!J.morphAttributes.position,Mt=!!J.morphAttributes.normal,Nt=!!J.morphAttributes.color,It=bi;$.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(It=v.toneMapping);let Tt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,dt=Tt!==void 0?Tt.length:0,rt=Me.get($),rn=m.state.lights;if(j===!0&&(Se===!0||w!==M)){let un=w===M&&$.id===F;it.setState($,w,un)}let Ct=!1;$.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==rn.state.version||rt.outputColorSpace!==Ke||K.isBatchedMesh&&rt.batching===!1||!K.isBatchedMesh&&rt.batching===!0||K.isInstancedMesh&&rt.instancing===!1||!K.isInstancedMesh&&rt.instancing===!0||K.isSkinnedMesh&&rt.skinning===!1||!K.isSkinnedMesh&&rt.skinning===!0||K.isInstancedMesh&&rt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&rt.instancingColor===!1&&K.instanceColor!==null||rt.envMap!==Ye||$.fog===!0&&rt.fog!==Te||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==it.numPlanes||rt.numIntersection!==it.numIntersection)||rt.vertexAlphas!==st||rt.vertexTangents!==et||rt.morphTargets!==je||rt.morphNormals!==Mt||rt.morphColors!==Nt||rt.toneMapping!==It||re.isWebGL2===!0&&rt.morphTargetsCount!==dt)&&(Ct=!0):(Ct=!0,rt.__version=$.version);let ln=rt.currentProgram;Ct===!0&&(ln=Fn($,G,K));let hi=!1,Xn=!1,Ti=!1,jt=ln.getUniforms(),Dn=rt.uniforms;if(Y.useProgram(ln.program)&&(hi=!0,Xn=!0,Ti=!0),$.id!==F&&(F=$.id,Xn=!0),hi||M!==w){jt.setValue(C,"projectionMatrix",w.projectionMatrix),jt.setValue(C,"viewMatrix",w.matrixWorldInverse);let un=jt.map.cameraPosition;un!==void 0&&un.setValue(C,ke.setFromMatrixPosition(w.matrixWorld)),re.logarithmicDepthBuffer&&jt.setValue(C,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&jt.setValue(C,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,Xn=!0,Ti=!0)}if(K.isSkinnedMesh){jt.setOptional(C,K,"bindMatrix"),jt.setOptional(C,K,"bindMatrixInverse");let un=K.skeleton;un&&(re.floatVertexTextures?(un.boneTexture===null&&un.computeBoneTexture(),jt.setValue(C,"boneTexture",un.boneTexture,_)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}K.isBatchedMesh&&(jt.setOptional(C,K,"batchingTexture"),jt.setValue(C,"batchingTexture",K._matricesTexture,_));let Li=J.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0&&re.isWebGL2===!0)&&at.update(K,J,ln),(Xn||rt.receiveShadow!==K.receiveShadow)&&(rt.receiveShadow=K.receiveShadow,jt.setValue(C,"receiveShadow",K.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Dn.envMap.value=Ye,Dn.flipEnvMap.value=Ye.isCubeTexture&&Ye.isRenderTargetTexture===!1?-1:1),Xn&&(jt.setValue(C,"toneMappingExposure",v.toneMappingExposure),rt.needsLights&&At(Dn,Ti),Te&&$.fog===!0&&ve.refreshFogUniforms(Dn,Te),ve.refreshMaterialUniforms(Dn,$,ue,X,Ne),js.upload(C,Vn(rt),Dn,_)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(js.upload(C,Vn(rt),Dn,_),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&jt.setValue(C,"center",K.center),jt.setValue(C,"modelViewMatrix",K.modelViewMatrix),jt.setValue(C,"normalMatrix",K.normalMatrix),jt.setValue(C,"modelMatrix",K.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){let un=$.uniformsGroups;for(let L=0,se=un.length;L<se;L++)if(re.isWebGL2){let P=un[L];We.update(P,ln),We.bind(P,ln)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ln}function At(w,G){w.ambientLightColor.needsUpdate=G,w.lightProbe.needsUpdate=G,w.directionalLights.needsUpdate=G,w.directionalLightShadows.needsUpdate=G,w.pointLights.needsUpdate=G,w.pointLightShadows.needsUpdate=G,w.spotLights.needsUpdate=G,w.spotLightShadows.needsUpdate=G,w.rectAreaLights.needsUpdate=G,w.hemisphereLights.needsUpdate=G}function qt(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(w,G,J){Me.get(w.texture).__webglTexture=G,Me.get(w.depthTexture).__webglTexture=J;let $=Me.get(w);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=J===void 0,$.__autoAllocateDepthBuffer||V.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,G){let J=Me.get(w);J.__webglFramebuffer=G,J.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(w,G=0,J=0){A=w,I=G,b=J;let $=!0,K=null,Te=!1,Ge=!1;if(w){let Ye=Me.get(w);Ye.__useDefaultFramebuffer!==void 0?(Y.bindFramebuffer(C.FRAMEBUFFER,null),$=!1):Ye.__webglFramebuffer===void 0?_.setupRenderTarget(w):Ye.__hasExternalTextures&&_.rebindTextures(w,Me.get(w.texture).__webglTexture,Me.get(w.depthTexture).__webglTexture);let st=w.texture;(st.isData3DTexture||st.isDataArrayTexture||st.isCompressedArrayTexture)&&(Ge=!0);let et=Me.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(et[G])?K=et[G][J]:K=et[G],Te=!0):re.isWebGL2&&w.samples>0&&_.useMultisampledRTT(w)===!1?K=Me.get(w).__webglMultisampledFramebuffer:Array.isArray(et)?K=et[J]:K=et,S.copy(w.viewport),k.copy(w.scissor),Z=w.scissorTest}else S.copy(oe).multiplyScalar(ue).floor(),k.copy(ce).multiplyScalar(ue).floor(),Z=be;if(Y.bindFramebuffer(C.FRAMEBUFFER,K)&&re.drawBuffers&&$&&Y.drawBuffers(w,K),Y.viewport(S),Y.scissor(k),Y.setScissorTest(Z),Te){let Ye=Me.get(w.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ye.__webglTexture,J)}else if(Ge){let Ye=Me.get(w.texture),st=G||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ye.__webglTexture,J||0,st)}F=-1},this.readRenderTargetPixels=function(w,G,J,$,K,Te,Ge){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ke=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ge!==void 0&&(Ke=Ke[Ge]),Ke){Y.bindFramebuffer(C.FRAMEBUFFER,Ke);try{let Ye=w.texture,st=Ye.format,et=Ye.type;if(st!==mi&&te.convert(st)!==C.getParameter(C.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let je=et===ki&&(V.has("EXT_color_buffer_half_float")||re.isWebGL2&&V.has("EXT_color_buffer_float"));if(et!==Ri&&te.convert(et)!==C.getParameter(C.IMPLEMENTATION_COLOR_READ_TYPE)&&!(et===Ki&&(re.isWebGL2||V.has("OES_texture_float")||V.has("WEBGL_color_buffer_float")))&&!je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=w.width-$&&J>=0&&J<=w.height-K&&C.readPixels(G,J,$,K,te.convert(st),te.convert(et),Te)}finally{let Ye=A!==null?Me.get(A).__webglFramebuffer:null;Y.bindFramebuffer(C.FRAMEBUFFER,Ye)}}},this.copyFramebufferToTexture=function(w,G,J=0){let $=Math.pow(2,-J),K=Math.floor(G.image.width*$),Te=Math.floor(G.image.height*$);_.setTexture2D(G,0),C.copyTexSubImage2D(C.TEXTURE_2D,J,0,0,w.x,w.y,K,Te),Y.unbindTexture()},this.copyTextureToTexture=function(w,G,J,$=0){let K=G.image.width,Te=G.image.height,Ge=te.convert(J.format),Ke=te.convert(J.type);_.setTexture2D(J,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,J.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,J.unpackAlignment),G.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,$,w.x,w.y,K,Te,Ge,Ke,G.image.data):G.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,$,w.x,w.y,G.mipmaps[0].width,G.mipmaps[0].height,Ge,G.mipmaps[0].data):C.texSubImage2D(C.TEXTURE_2D,$,w.x,w.y,Ge,Ke,G.image),$===0&&J.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),Y.unbindTexture()},this.copyTextureToTexture3D=function(w,G,J,$,K=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Te=w.max.x-w.min.x+1,Ge=w.max.y-w.min.y+1,Ke=w.max.z-w.min.z+1,Ye=te.convert($.format),st=te.convert($.type),et;if($.isData3DTexture)_.setTexture3D($,0),et=C.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)_.setTexture2DArray($,0),et=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,$.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,$.unpackAlignment);let je=C.getParameter(C.UNPACK_ROW_LENGTH),Mt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Nt=C.getParameter(C.UNPACK_SKIP_PIXELS),It=C.getParameter(C.UNPACK_SKIP_ROWS),Tt=C.getParameter(C.UNPACK_SKIP_IMAGES),dt=J.isCompressedTexture?J.mipmaps[K]:J.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,dt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,dt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,w.min.x),C.pixelStorei(C.UNPACK_SKIP_ROWS,w.min.y),C.pixelStorei(C.UNPACK_SKIP_IMAGES,w.min.z),J.isDataTexture||J.isData3DTexture?C.texSubImage3D(et,K,G.x,G.y,G.z,Te,Ge,Ke,Ye,st,dt.data):J.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),C.compressedTexSubImage3D(et,K,G.x,G.y,G.z,Te,Ge,Ke,Ye,dt.data)):C.texSubImage3D(et,K,G.x,G.y,G.z,Te,Ge,Ke,Ye,st,dt),C.pixelStorei(C.UNPACK_ROW_LENGTH,je),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Mt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Nt),C.pixelStorei(C.UNPACK_SKIP_ROWS,It),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Tt),K===0&&$.generateMipmaps&&C.generateMipmap(et),Y.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?_.setTextureCube(w,0):w.isData3DTexture?_.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?_.setTexture2DArray(w,0):_.setTexture2D(w,0),Y.unbindTexture()},this.resetState=function(){I=0,b=0,A=null,Y.reset(),He.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===nl?"display-p3":"srgb",t.unpackColorSpace=Ft.workingColorSpace===na?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Qt?vs:Mu}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===vs?Qt:gi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Uc=class extends Or{};Uc.prototype.isWebGL1Renderer=!0;var In=class extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}};var Yo=class extends yt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ws=new Rt,eu=new Rt,So=[],tu=new Vi,Ux=new Rt,Sr=new B,wr=new ts,xi=class extends B{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Yo(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ux)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ws),tu.copy(e.boundingBox).applyMatrix4(Ws),this.boundingBox.union(tu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ts),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ws),wr.copy(e.boundingSphere).applyMatrix4(Ws),this.boundingSphere.union(wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Sr.geometry=this.geometry,Sr.material=this.material,Sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wr.copy(this.boundingSphere),wr.applyMatrix4(n),e.ray.intersectsSphere(wr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ws),eu.multiplyMatrices(n,Ws),Sr.matrixWorld=eu,Sr.raycast(e,So);for(let o=0,a=So.length;o<a;o++){let c=So[o];c.instanceId=r,c.object=this,t.push(c)}So.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Yo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Bn=class extends ns{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},nu=new Rt,Hc=new Nr,wo=new ts,bo=new R,On=class extends sn{constructor(e=new wt,t=new Bn){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(s),wo.radius+=r,e.ray.intersectsSphere(wo)===!1)return;nu.copy(s).invert(),Hc.copy(e.ray).applyMatrix4(nu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let m=l.getX(g);bo.fromBufferAttribute(u,m),iu(bo,m,c,s,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)bo.fromBufferAttribute(u,g),iu(bo,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function iu(i,e,t,n,s,r,o){let a=Hc.distanceSqToPoint(i);if(a<t){let c=new R;Hc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}var zn=class extends ni{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},si=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new pe:new R);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new R,s=[],r=[],o=[],a=new R,c=new Rt;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new R)}r[0]=new R,o[0]=new R;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(dn(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(dn(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},zr=class extends si{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){let n=t||new pe,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Nc=class extends zr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function rl(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var Ro=new R,cc=new rl,lc=new rl,hc=new rl,Sn=class extends si{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new R){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Ro.subVectors(s[0],s[1]).add(s[0]),l=Ro);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Ro.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ro),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),cc.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,x,m),lc.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,x,m),hc.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(cc.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),lc.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),hc.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(cc.calc(c),lc.calc(c),hc.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new R().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function su(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function Hx(i,e){let t=1-i;return t*t*e}function Nx(i,e){return 2*(1-i)*i*e}function Fx(i,e){return i*i*e}function Ir(i,e,t,n){return Hx(i,e)+Nx(i,t)+Fx(i,n)}function Bx(i,e){let t=1-i;return t*t*t*e}function Ox(i,e){let t=1-i;return 3*t*t*i*e}function zx(i,e){return 3*(1-i)*i*i*e}function Gx(i,e){return i*i*i*e}function Lr(i,e,t,n,s){return Bx(i,e)+Ox(i,t)+zx(i,n)+Gx(i,s)}var Zo=class extends si{constructor(e=new pe,t=new pe,n=new pe,s=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new pe){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Lr(e,s.x,r.x,o.x,a.x),Lr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fc=class extends si{constructor(e=new R,t=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new R){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Lr(e,s.x,r.x,o.x,a.x),Lr(e,s.y,r.y,o.y,a.y),Lr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Jo=class extends si{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ar=class extends si{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$o=class extends si{constructor(e=new pe,t=new pe,n=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new pe){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ir(e,s.x,r.x,o.x),Ir(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},cr=class extends si{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ir(e,s.x,r.x,o.x),Ir(e,s.y,r.y,o.y),Ir(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ko=class extends si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(su(a,c.x,l.x,h.x,u.x),su(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new pe().fromArray(s))}return this}},jo=Object.freeze({__proto__:null,ArcCurve:Nc,CatmullRomCurve3:Sn,CubicBezierCurve:Zo,CubicBezierCurve3:Fc,EllipseCurve:zr,LineCurve:Jo,LineCurve3:ar,QuadraticBezierCurve:$o,QuadraticBezierCurve3:cr,SplineCurve:Ko}),Bc=class extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new jo[s.type]().fromJSON(s))}return this}},Vt=class extends Bc{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Jo(this.currentPoint.clone(),new pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new $o(this.currentPoint.clone(),new pe(e,t),new pe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new Zo(this.currentPoint.clone(),new pe(e,t),new pe(n,s),new pe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ko(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){let l=new zr(e,t,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},is=class i extends wt{constructor(e=[new pe(0,-.5),new pe(.5,0),new pe(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=dn(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/t,u=new R,d=new pe,f=new R,g=new R,x=new R,m=0,p=0;for(let T=0;T<=e.length-1;T++)switch(T){case 0:m=e[T+1].x-e[T].x,p=e[T+1].y-e[T].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(x.x,x.y,x.z);break;default:m=e[T+1].x-e[T].x,p=e[T+1].y-e[T].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let T=0;T<=t;T++){let v=n+T*h*s,E=Math.sin(v),I=Math.cos(v);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*E,u.y=e[b].y,u.z=e[b].x*I,o.push(u.x,u.y,u.z),d.x=T/t,d.y=b/(e.length-1),a.push(d.x,d.y);let A=c[3*b+0]*E,F=c[3*b+1],M=c[3*b+0]*I;l.push(A,F,M)}}for(let T=0;T<t;T++)for(let v=0;v<e.length-1;v++){let E=v+T*e.length,I=E,b=E+e.length,A=E+e.length+1,F=E+1;r.push(I,b,F),r.push(A,F,b)}this.setIndex(r),this.setAttribute("position",new _t(o,3)),this.setAttribute("uv",new _t(a,2)),this.setAttribute("normal",new _t(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Zn=class i extends is{constructor(e=1,t=1,n=4,s=8){let r=new Vt;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new i(e.radius,e.length,e.capSegments,e.radialSegments)}},ss=class i extends wt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new R,h=new pe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(a,3)),this.setAttribute("uv",new _t(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},nt=class i extends wt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,x=[],m=n/2,p=0;T(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new _t(u,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(f,2));function T(){let E=new R,I=new R,b=0,A=(t-e)/n;for(let F=0;F<=r;F++){let M=[],S=F/r,k=S*(t-e)+e;for(let Z=0;Z<=s;Z++){let ae=Z/s,U=ae*c+a,O=Math.sin(U),X=Math.cos(U);I.x=k*O,I.y=-S*n+m,I.z=k*X,u.push(I.x,I.y,I.z),E.set(O,A,X).normalize(),d.push(E.x,E.y,E.z),f.push(ae,1-S),M.push(g++)}x.push(M)}for(let F=0;F<s;F++)for(let M=0;M<r;M++){let S=x[M][F],k=x[M+1][F],Z=x[M+1][F+1],ae=x[M][F+1];h.push(S,k,ae),h.push(k,Z,ae),b+=6}l.addGroup(p,b,0),p+=b}function v(E){let I=g,b=new pe,A=new R,F=0,M=E===!0?e:t,S=E===!0?1:-1;for(let Z=1;Z<=s;Z++)u.push(0,m*S,0),d.push(0,S,0),f.push(.5,.5),g++;let k=g;for(let Z=0;Z<=s;Z++){let U=Z/s*c+a,O=Math.cos(U),X=Math.sin(U);A.x=M*X,A.y=m*S,A.z=M*O,u.push(A.x,A.y,A.z),d.push(0,S,0),b.x=O*.5+.5,b.y=X*.5*S+.5,f.push(b.x,b.y),g++}for(let Z=0;Z<s;Z++){let ae=I+Z,U=k+Z;E===!0?h.push(U,U+1,ae):h.push(U+1,U,ae),F+=3}l.addGroup(p,F,E===!0?1:2),p+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},$t=class i extends nt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Wt=class extends Vt{constructor(e){super(e),this.uuid=Ts(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Vt().fromJSON(s))}return this}},kx={triangulate:function(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Uu(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=Yx(i,e,r,t)),i.length>80*t){a=l=i[0],c=h=i[1];for(let g=t;g<s;g+=t)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Gr(r,o,t,a,c,f,0),o}};function Uu(i,e,t,n,s){let r,o;if(s===sv(i,e,t,n)>0)for(r=e;r<t;r+=n)o=ru(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=ru(r,i[r],i[r+1],o);return o&&ra(o,o.next)&&(Vr(o),o=o.next),o}function ys(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ra(t,t.next)||en(t.prev,t,t.next)===0)){if(Vr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Gr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&jx(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Wx(i,n,s,r):Vx(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),Vr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Xx(ys(i),e,t),Gr(i,e,t,n,s,r,2)):o===2&&qx(i,e,t,n,s,r):Gr(ys(i),e,t,n,s,r,1);break}}}function Vx(i){let e=i.prev,t=i,n=i.next;if(en(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Js(s,a,r,c,o,l,g.x,g.y)&&en(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Wx(i,e,t,n){let s=i.prev,r=i,o=i.next;if(en(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,x=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=Oc(f,g,e,t,n),T=Oc(x,m,e,t,n),v=i.prevZ,E=i.nextZ;for(;v&&v.z>=p&&E&&E.z<=T;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Js(a,h,c,u,l,d,v.x,v.y)&&en(v.prev,v,v.next)>=0||(v=v.prevZ,E.x>=f&&E.x<=x&&E.y>=g&&E.y<=m&&E!==s&&E!==o&&Js(a,h,c,u,l,d,E.x,E.y)&&en(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Js(a,h,c,u,l,d,v.x,v.y)&&en(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;E&&E.z<=T;){if(E.x>=f&&E.x<=x&&E.y>=g&&E.y<=m&&E!==s&&E!==o&&Js(a,h,c,u,l,d,E.x,E.y)&&en(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function Xx(i,e,t){let n=i;do{let s=n.prev,r=n.next.next;!ra(s,r)&&Hu(s,n,n.next,r)&&kr(s,r)&&kr(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Vr(n),Vr(n.next),n=i=r),n=n.next}while(n!==i);return ys(n)}function qx(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&tv(o,a)){let c=Nu(o,a);o=ys(o,o.next),c=ys(c,c.next),Gr(o,e,t,n,s,r,0),Gr(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Yx(i,e,t,n){let s=[],r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=Uu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(ev(l));for(s.sort(Zx),r=0;r<s.length;r++)t=Jx(s[r],t);return t}function Zx(i,e){return i.x-e.x}function Jx(i,e){let t=$x(i,e);if(!t)return e;let n=Nu(t,i);return ys(n,n.next),ys(t,t.next)}function $x(i,e){let t=e,n=-1/0,s,r=i.x,o=i.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){let d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,s=t.x<t.next.x?t:t.next,d===r))return s}t=t.next}while(t!==e);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&Js(o<l?r:n,o,c,l,o<l?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),kr(t,i)&&(u<h||u===h&&(t.x>s.x||t.x===s.x&&Kx(s,t)))&&(s=t,h=u)),t=t.next;while(t!==a);return s}function Kx(i,e){return en(i.prev,i,e.prev)<0&&en(e.next,i,i.next)<0}function jx(i,e,t,n){let s=i;do s.z===0&&(s.z=Oc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Qx(s)}function Qx(i){let e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function Oc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function ev(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Js(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function tv(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!nv(i,e)&&(kr(i,e)&&kr(e,i)&&iv(i,e)&&(en(i.prev,i,e.prev)||en(i,e.prev,e))||ra(i,e)&&en(i.prev,i,i.next)>0&&en(e.prev,e,e.next)>0)}function en(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ra(i,e){return i.x===e.x&&i.y===e.y}function Hu(i,e,t,n){let s=Co(en(i,e,t)),r=Co(en(i,e,n)),o=Co(en(t,n,i)),a=Co(en(t,n,e));return!!(s!==r&&o!==a||s===0&&Ao(i,t,e)||r===0&&Ao(i,n,e)||o===0&&Ao(t,i,n)||a===0&&Ao(t,e,n))}function Ao(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Co(i){return i>0?1:i<0?-1:0}function nv(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Hu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function kr(i,e){return en(i.prev,i,i.next)<0?en(i,e,i.next)>=0&&en(i,i.prev,e)>=0:en(i,e,i.prev)<0||en(i,i.next,e)<0}function iv(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Nu(i,e){let t=new zc(i.i,i.x,i.y),n=new zc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ru(i,e,t,n){let s=new zc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Vr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function zc(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function sv(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Dr=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];ou(e),au(n,e);let o=e.length;t.forEach(ou);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,au(n,t[c]);let a=kx.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function ou(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function au(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Jn=class i extends wt{constructor(e=new Wt([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new _t(s,3)),this.setAttribute("uv",new _t(r,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:rv,v,E=!1,I,b,A,F;p&&(v=p.getSpacedPoints(h),E=!0,d=!1,I=p.computeFrenetFrames(h,!1),b=new R,A=new R,F=new R),d||(m=0,f=0,g=0,x=0);let M=a.extractPoints(l),S=M.shape,k=M.holes;if(!Dr.isClockWise(S)){S=S.reverse();for(let C=0,fe=k.length;C<fe;C++){let V=k[C];Dr.isClockWise(V)&&(k[C]=V.reverse())}}let ae=Dr.triangulateShape(S,k),U=S;for(let C=0,fe=k.length;C<fe;C++){let V=k[C];S=S.concat(V)}function O(C,fe,V){return fe||console.error("THREE.ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(fe,V)}let X=S.length,ue=ae.length;function ee(C,fe,V){let re,Y,Ae,Me=C.x-fe.x,_=C.y-fe.y,y=V.x-C.x,N=V.y-C.y,de=Me*Me+_*_,le=Me*N-_*y;if(Math.abs(le)>Number.EPSILON){let ie=Math.sqrt(de),Pe=Math.sqrt(y*y+N*N),ve=fe.x-_/ie,ye=fe.y+Me/ie,ze=V.x-N/Pe,it=V.y+y/Pe,me=((ze-ve)*N-(it-ye)*y)/(Me*N-_*y);re=ve+Me*me-C.x,Y=ye+_*me-C.y;let ct=re*re+Y*Y;if(ct<=2)return new pe(re,Y);Ae=Math.sqrt(ct/2)}else{let ie=!1;Me>Number.EPSILON?y>Number.EPSILON&&(ie=!0):Me<-Number.EPSILON?y<-Number.EPSILON&&(ie=!0):Math.sign(_)===Math.sign(N)&&(ie=!0),ie?(re=-_,Y=Me,Ae=Math.sqrt(de)):(re=Me,Y=_,Ae=Math.sqrt(de/2))}return new pe(re/Ae,Y/Ae)}let ne=[];for(let C=0,fe=U.length,V=fe-1,re=C+1;C<fe;C++,V++,re++)V===fe&&(V=0),re===fe&&(re=0),ne[C]=ee(U[C],U[V],U[re]);let oe=[],ce,be=ne.concat();for(let C=0,fe=k.length;C<fe;C++){let V=k[C];ce=[];for(let re=0,Y=V.length,Ae=Y-1,Me=re+1;re<Y;re++,Ae++,Me++)Ae===Y&&(Ae=0),Me===Y&&(Me=0),ce[re]=ee(V[re],V[Ae],V[Me]);oe.push(ce),be=be.concat(ce)}for(let C=0;C<m;C++){let fe=C/m,V=f*Math.cos(fe*Math.PI/2),re=g*Math.sin(fe*Math.PI/2)+x;for(let Y=0,Ae=U.length;Y<Ae;Y++){let Me=O(U[Y],ne[Y],re);Re(Me.x,Me.y,-V)}for(let Y=0,Ae=k.length;Y<Ae;Y++){let Me=k[Y];ce=oe[Y];for(let _=0,y=Me.length;_<y;_++){let N=O(Me[_],ce[_],re);Re(N.x,N.y,-V)}}}let q=g+x;for(let C=0;C<X;C++){let fe=d?O(S[C],be[C],q):S[C];E?(A.copy(I.normals[0]).multiplyScalar(fe.x),b.copy(I.binormals[0]).multiplyScalar(fe.y),F.copy(v[0]).add(A).add(b),Re(F.x,F.y,F.z)):Re(fe.x,fe.y,0)}for(let C=1;C<=h;C++)for(let fe=0;fe<X;fe++){let V=d?O(S[fe],be[fe],q):S[fe];E?(A.copy(I.normals[C]).multiplyScalar(V.x),b.copy(I.binormals[C]).multiplyScalar(V.y),F.copy(v[C]).add(A).add(b),Re(F.x,F.y,F.z)):Re(V.x,V.y,u/h*C)}for(let C=m-1;C>=0;C--){let fe=C/m,V=f*Math.cos(fe*Math.PI/2),re=g*Math.sin(fe*Math.PI/2)+x;for(let Y=0,Ae=U.length;Y<Ae;Y++){let Me=O(U[Y],ne[Y],re);Re(Me.x,Me.y,u+V)}for(let Y=0,Ae=k.length;Y<Ae;Y++){let Me=k[Y];ce=oe[Y];for(let _=0,y=Me.length;_<y;_++){let N=O(Me[_],ce[_],re);E?Re(N.x,N.y+v[h-1].y,v[h-1].x+V):Re(N.x,N.y,u+V)}}}j(),Se();function j(){let C=s.length/3;if(d){let fe=0,V=X*fe;for(let re=0;re<ue;re++){let Y=ae[re];Ue(Y[2]+V,Y[1]+V,Y[0]+V)}fe=h+m*2,V=X*fe;for(let re=0;re<ue;re++){let Y=ae[re];Ue(Y[0]+V,Y[1]+V,Y[2]+V)}}else{for(let fe=0;fe<ue;fe++){let V=ae[fe];Ue(V[2],V[1],V[0])}for(let fe=0;fe<ue;fe++){let V=ae[fe];Ue(V[0]+X*h,V[1]+X*h,V[2]+X*h)}}n.addGroup(C,s.length/3-C,0)}function Se(){let C=s.length/3,fe=0;Ne(U,fe),fe+=U.length;for(let V=0,re=k.length;V<re;V++){let Y=k[V];Ne(Y,fe),fe+=Y.length}n.addGroup(C,s.length/3-C,1)}function Ne(C,fe){let V=C.length;for(;--V>=0;){let re=V,Y=V-1;Y<0&&(Y=C.length-1);for(let Ae=0,Me=h+m*2;Ae<Me;Ae++){let _=X*Ae,y=X*(Ae+1),N=fe+re+_,de=fe+Y+_,le=fe+Y+y,ie=fe+re+y;ke(N,de,le,ie)}}}function Re(C,fe,V){c.push(C),c.push(fe),c.push(V)}function Ue(C,fe,V){W(C),W(fe),W(V);let re=s.length/3,Y=T.generateTopUV(n,s,re-3,re-2,re-1);ge(Y[0]),ge(Y[1]),ge(Y[2])}function ke(C,fe,V,re){W(C),W(fe),W(re),W(fe),W(V),W(re);let Y=s.length/3,Ae=T.generateSideWallUV(n,s,Y-6,Y-3,Y-2,Y-1);ge(Ae[0]),ge(Ae[1]),ge(Ae[3]),ge(Ae[1]),ge(Ae[2]),ge(Ae[3])}function W(C){s.push(c[C*3+0]),s.push(c[C*3+1]),s.push(c[C*3+2])}function ge(C){r.push(C.x),r.push(C.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return ov(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new jo[s.type]().fromJSON(s)),new i(n,e.options)}},rv={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new pe(r,o),new pe(a,c),new pe(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],x=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new pe(o,1-c),new pe(l,1-u),new pe(d,1-g),new pe(x,1-p)]:[new pe(a,1-c),new pe(h,1-u),new pe(f,1-g),new pe(m,1-p)]}};function ov(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var _s=class i extends wt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=e,d=(t-e)/s,f=new R,g=new pe;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<s;x++){let m=x*(n+1);for(let p=0;p<n;p++){let T=p+m,v=T,E=T+n+1,I=T+n+2,b=T+1;a.push(v,E,b),a.push(E,I,b)}}this.setIndex(a),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(l,3)),this.setAttribute("uv",new _t(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Qe=class i extends wt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new R,d=new R,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let T=[],v=p/n,E=0;p===0&&o===0?E=.5/t:p===n&&c===Math.PI&&(E=-.5/t);for(let I=0;I<=t;I++){let b=I/t;u.x=-e*Math.cos(s+b*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(s+b*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(b+E,1-v),T.push(l++)}h.push(T)}for(let p=0;p<n;p++)for(let T=0;T<t;T++){let v=h[p][T+1],E=h[p][T],I=h[p+1][T],b=h[p+1][T+1];(p!==0||o>0)&&f.push(v,E,b),(p!==n-1||c<Math.PI)&&f.push(E,I,b)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(x,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var mt=class i extends wt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new R,u=new R,d=new R;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,T=(s+1)*f+g;o.push(x,m,T),o.push(m,p,T)}this.setIndex(o),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(c,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var En=class i extends wt{constructor(e=new cr(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new R,c=new R,l=new pe,h=new R,u=[],d=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new _t(u,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(f,2));function x(){for(let v=0;v<t;v++)m(v);m(r===!1?t:0),T(),p()}function m(v){h=e.getPointAt(v/t,h);let E=o.normals[v],I=o.binormals[v];for(let b=0;b<=s;b++){let A=b/s*Math.PI*2,F=Math.sin(A),M=-Math.cos(A);c.x=M*E.x+F*I.x,c.y=M*E.y+F*I.y,c.z=M*E.z+F*I.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let v=1;v<=t;v++)for(let E=1;E<=s;E++){let I=(s+1)*(v-1)+(E-1),b=(s+1)*v+(E-1),A=(s+1)*v+E,F=(s+1)*(v-1)+E;g.push(I,b,F),g.push(b,A,F)}}function T(){for(let v=0;v<=t;v++)for(let E=0;E<=s;E++)l.x=v/t,l.y=E/s,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new jo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var an=class extends ns{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tu,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},bt=class extends an{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return dn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function Po(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function av(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var lr=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Gc=class extends lr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:hh,endingEnd:hh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case uh:r=e,a=2*t-n;break;case dh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case uh:o=e,c=2*n-t;break;case dh:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,T=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,v=(-1-f)*m+(1.5+f)*x+.5*g,E=f*m-f*x;for(let I=0;I!==a;++I)r[I]=p*o[h+I]+T*o[l+I]+v*o[c+I]+E*o[u+I];return r}},kc=class extends lr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},Vc=class extends lr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},vi=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Po(t,this.TimeBufferType),this.values=Po(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Po(e.times,Array),values:Po(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Vc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new kc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Gc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Lo:t=this.InterpolantFactoryMethodDiscrete;break;case Do:t=this.InterpolantFactoryMethodLinear;break;case Oa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Lo;case this.InterpolantFactoryMethodLinear:return Do;case this.InterpolantFactoryMethodSmooth:return Oa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&av(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Oa,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[d+g]||x!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};vi.prototype.TimeBufferType=Float32Array;vi.prototype.ValueBufferType=Float32Array;vi.prototype.DefaultInterpolation=Do;var Es=class extends vi{};Es.prototype.ValueTypeName="bool";Es.prototype.ValueBufferType=Array;Es.prototype.DefaultInterpolation=Lo;Es.prototype.InterpolantFactoryMethodLinear=void 0;Es.prototype.InterpolantFactoryMethodSmooth=void 0;var Wc=class extends vi{};Wc.prototype.ValueTypeName="color";var Xc=class extends vi{};Xc.prototype.ValueTypeName="number";var qc=class extends lr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)ii.slerpFlat(r,0,o,l-a,o,l,c);return r}},Wr=class extends vi{InterpolantFactoryMethodLinear(e){return new qc(this.times,this.values,this.getValueSize(),e)}};Wr.prototype.ValueTypeName="quaternion";Wr.prototype.DefaultInterpolation=Do;Wr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ms=class extends vi{};Ms.prototype.ValueTypeName="string";Ms.prototype.ValueBufferType=Array;Ms.prototype.DefaultInterpolation=Lo;Ms.prototype.InterpolantFactoryMethodLinear=void 0;Ms.prototype.InterpolantFactoryMethodSmooth=void 0;var Yc=class extends vi{};Yc.prototype.ValueTypeName="vector";var Zc=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},cv=new Zc,Jc=class{constructor(e){this.manager=e!==void 0?e:cv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Jc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xr=class extends sn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ce(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};var uc=new Rt,cu=new R,lu=new R,Qo=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Br,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;cu.setFromMatrixPosition(e.matrixWorld),t.position.copy(cu),lu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lu),t.updateMatrixWorld(),uc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var hu=new Rt,br=new R,dc=new R,$c=class extends Qo{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new pe(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),br.setFromMatrixPosition(e.matrixWorld),n.position.copy(br),dc.copy(n.position),dc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(dc),n.updateMatrixWorld(),s.makeTranslation(-br.x,-br.y,-br.z),hu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hu)}},Gn=class extends Xr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new $c}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Kc=class extends Qo{constructor(){super(new sr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},wn=class extends Xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.target=new sn,this.shadow=new Kc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},ri=class extends Xr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var ol="\\[\\]\\.:\\/",lv=new RegExp("["+ol+"]","g"),al="[^"+ol+"]",hv="[^"+ol.replace("\\.","")+"]",uv=/((?:WC+[\/:])*)/.source.replace("WC",al),dv=/(WCOD+)?/.source.replace("WCOD",hv),fv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",al),pv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",al),mv=new RegExp("^"+uv+dv+fv+pv+"$"),gv=["material","materials","bones","map"],jc=class{constructor(e,t,n){let s=n||Yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Yt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(lv,"")}static parseTrackName(e){let t=mv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);gv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Yt.Composite=jc;Yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Yt.prototype.GetterByBindingType=[Yt.prototype._getValue_direct,Yt.prototype._getValue_array,Yt.prototype._getValue_arrayElement,Yt.prototype._getValue_toArray];Yt.prototype.SetterByBindingTypeAndVersioning=[[Yt.prototype._setValue_direct,Yt.prototype._setValue_direct_setNeedsUpdate,Yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_array,Yt.prototype._setValue_array_setNeedsUpdate,Yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_arrayElement,Yt.prototype._setValue_arrayElement_setNeedsUpdate,Yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_fromArray,Yt.prototype._setValue_fromArray_setNeedsUpdate,Yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Kv=new Float32Array(1);var ea=class{constructor(e,t,n=0,s=1/0){this.ray=new Nr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Fr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Qc(e,this,n,t),n.sort(uu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Qc(e[s],this,n,t);return n.sort(uu),n}};function uu(i,e){return i.distance-e.distance}function Qc(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){let s=i.children;for(let r=0,o=s.length;r<o;r++)Qc(s[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var Ut=(i,e,t)=>Math.min(t,Math.max(e,i)),zt=(i,e,t)=>i+(e-i)*t;var ku=(i,e=12)=>Math.floor(i*e)/e;function Yr(i,e,t,n=.28){if(i<e){let s=e-i;return e-Math.tanh(s/Math.max(1e-4,n))*n}if(i>t){let s=i-t;return t+Math.tanh(s/Math.max(1e-4,n))*n}return i}var vt=class{constructor(e=0,t=170,n=18){this.x=e,this.target=e,this.v=0,this.k=t,this.d=n}setParams(e,t){this.k=e,this.d=t}impulse(e){this.v+=e}snap(e){this.x=e,this.target=e,this.v=0}update(e){let n=Math.min(e,.05)*.5;for(let s=0;s<2;s++){let r=-this.k*(this.x-this.target)-this.d*this.v;this.v+=r*n,this.x+=this.v*n}return this.x}},Ss=class{constructor(e=0,t=0,n=140,s=17){this.sx=new vt(e,n,s),this.sy=new vt(t,n,s)}setTarget(e,t){this.sx.target=e,this.sy.target=t}snap(e,t){this.sx.snap(e),this.sy.snap(t)}impulse(e,t){this.sx.impulse(e),this.sy.impulse(t)}update(e){return this.sx.update(e),this.sy.update(e),this}get x(){return this.sx.x}get y(){return this.sy.x}},qr=class{constructor(e=0,t=0,n=0,s=120,r=16){this.sx=new vt(e,s,r),this.sy=new vt(t,s,r),this.sz=new vt(n,s,r)}setTarget(e,t,n){this.sx.target=e,this.sy.target=t,this.sz.target=n}snap(e,t,n){this.sx.snap(e),this.sy.snap(t),this.sz.snap(n)}impulse(e,t,n){this.sx.impulse(e),this.sy.impulse(t),this.sz.impulse(n)}update(e){return this.sx.update(e),this.sy.update(e),this.sz.update(e),this}copyTo(e){return e.set(this.sx.x,this.sy.x,this.sz.x),e}};function Be(i,e=!0){if(!i||i.length===0)return new wt;let t=[],n=0;for(let u=0;u<i.length;u++){let d=i[u];if(!d||!d.attributes.position)continue;let f=d.index?d.toNonIndexed():d;f.attributes.normal||f.computeVertexNormals(),t.push({g:f,owned:f!==d,orig:d}),n+=f.attributes.position.count}let s=new Float32Array(n*3),r=new Float32Array(n*3),o=new Float32Array(n*2),c=t.some(u=>!!u.g.attributes.color)?new Float32Array(n*3):null,l=0;for(let u=0;u<t.length;u++){let{g:d,owned:f,orig:g}=t[u],x=d.attributes.position,m=d.attributes.normal,p=d.attributes.uv,T=d.attributes.color,v=x.count;for(let E=0;E<v;E++){let I=(l+E)*3,b=(l+E)*2;s[I]=x.getX(E),s[I+1]=x.getY(E),s[I+2]=x.getZ(E),r[I]=m?m.getX(E):0,r[I+1]=m?m.getY(E):1,r[I+2]=m?m.getZ(E):0,p?(o[b]=p.getX(E),o[b+1]=p.getY(E)):(o[b]=(s[I]+s[I+2])*.5,o[b+1]=s[I+1]*.5),c&&(c[I]=T?T.getX(E):1,c[I+1]=T?T.getY(E):1,c[I+2]=T?T.getZ(E):1)}l+=v,f&&d.dispose(),e&&g&&g.dispose()}let h=new wt;return h.setAttribute("position",new yt(s,3)),h.setAttribute("normal",new yt(r,3)),h.setAttribute("uv",new yt(o,2)),c&&h.setAttribute("color",new yt(c,3)),h}function xv(i,e){let t=e instanceof Ce?e:new Ce(e),n=i.attributes.position.count,s=new Float32Array(n*3);for(let r=0;r<n;r++)s[r*3]=t.r,s[r*3+1]=t.g,s[r*3+2]=t.b;return i.setAttribute("color",new yt(s,3)),i}function bn(i,e,t=[],n=null){let s=new Set(t.filter(Boolean));i.updateMatrixWorld(!0);let r=i.matrixWorld.clone().invert(),o=[],a=d=>{if(!(!d||s.has(d)||!d.visible)){d!==i&&d.isMesh&&!d.isInstancedMesh&&!Array.isArray(d.material)&&!d.userData?.kind&&d.material?.color&&(d.material.metalness??0)<.5&&(!d.material.map||d.material.map===n)&&!(d.material.emissiveIntensity>.05&&d.material.emissive?.getHex()>0)&&o.push(d);for(let f=0;f<d.children.length;f++)a(d.children[f])}};if(a(i),o.length<2)return;let c=[],l=!1,h=!1;for(let d of o){let f=d.geometry.clone();f.applyMatrix4(r.clone().multiply(d.matrixWorld)),xv(f,d.material.color),c.push(f),d.castShadow&&(l=!0),d.receiveShadow&&(h=!0),d.parent&&d.parent.remove(d)}let u=new B(Be(c,!0),e);u.castShadow=l,u.receiveShadow=h,i.add(u)}var Fu=new Rt,Bu=new ii,Ou=new Ai,zu=new R,Gu=new R(1,1,1);function H(i,{x:e=0,y:t=0,z:n=0,rx:s=0,ry:r=0,rz:o=0,sx:a=1,sy:c=1,sz:l=1}={}){return zu.set(e,t,n),Ou.set(s,r,o),Bu.setFromEuler(Ou),Gu.set(a,c,l),Fu.compose(zu,Bu,Gu),i.applyMatrix4(Fu),i}function $n(i,e=[]){let t=new Set(e.filter(Boolean));i.updateMatrixWorld(!0);let n=i.matrixWorld.clone().invert(),s=new Map,r=o=>{if(!(!o||t.has(o)||!o.visible)){if(o!==i&&o.isMesh&&!o.isInstancedMesh&&!Array.isArray(o.material)&&!o.userData?.kind){let a=s.get(o.material);a||(a=[],s.set(o.material,a)),a.push(o)}for(let a=0;a<o.children.length;a++)r(o.children[a])}};r(i);for(let[o,a]of s.entries()){if(a.length<2)continue;let c=[],l=!1,h=!1;for(let d of a){let f=n.clone().multiply(d.matrixWorld),g=d.geometry.clone();g.applyMatrix4(f),c.push(g),d.castShadow&&(l=!0),d.receiveShadow&&(h=!0),d.parent&&d.parent.remove(d)}let u=new B(Be(c,!0),o);u.castShadow=l,u.receiveShadow=h,i.add(u)}}function oa({teeth:i=24,outerRadius:e=1,innerRadius:t=.84,thickness:n=.12,holeRadius:s=.2,spokes:r=5,bevelSize:o=.018}={}){let a=new Wt,c=Math.PI*2/i,l=t,h=(e+t)*.5,u=e;for(let x=0;x<i;x++){let m=x*c,p=m,T=m+c*.18,v=m+c*.3,E=m+c*.52,I=m+c*.64,b=m+c*.82,A=[[Math.cos(p)*l,Math.sin(p)*l],[Math.cos(T)*l,Math.sin(T)*l],[Math.cos(v)*h,Math.sin(v)*h],[Math.cos(v+c*.04)*u,Math.sin(v+c*.04)*u],[Math.cos(E-c*.04)*u,Math.sin(E-c*.04)*u],[Math.cos(E)*h,Math.sin(E)*h],[Math.cos(I)*l,Math.sin(I)*l],[Math.cos(b)*l,Math.sin(b)*l]];x===0&&a.moveTo(A[0][0],A[0][1]);for(let F=1;F<A.length;F++)a.lineTo(A[F][0],A[F][1])}if(a.closePath(),s>.01){let x=new Vt;x.absarc(0,0,s,0,Math.PI*2,!0),a.holes.push(x)}let d=t*.78,f=Math.max(s*1.65,t*.32);if(r>=3&&d-f>.12){let x=Math.PI*2/r,m=Math.min(.14,x*.18);for(let p=0;p<r;p++){let T=p*x+m,v=(p+1)*x-m;if(v-T<=.08)continue;let E=new Vt;E.moveTo(Math.cos(T)*f,Math.sin(T)*f),E.absarc(0,0,f,T,v,!1),E.lineTo(Math.cos(v)*d,Math.sin(v)*d),E.absarc(0,0,d,v,T,!0),E.closePath(),a.holes.push(E)}}let g=new Jn(a,{depth:n,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:o,bevelThickness:o,curveSegments:12});return g.center(),g}function Ln({points:i=8,outerRadius:e=1,innerRadius:t=.38,depth:n=.34,minorScale:s=.72}={}){let r=[],o=[],a=i*2,c=[];for(let f=0;f<a;f++){let g=f/a*Math.PI*2-Math.PI*.5,x=t;if(f%2===0){let m=f/2;x=e*(m%2===1&&i>=6?s:1)}c.push([Math.cos(g)*x,Math.sin(g)*x])}let l=(f,g,x)=>{r.push(f[0],f[1],f[2],g[0],g[1],g[2],x[0],x[1],x[2]),o.push(f[0]*.5+.5,f[1]*.5+.5,g[0]*.5+.5,g[1]*.5+.5,x[0]*.5+.5,x[1]*.5+.5)},h=[0,0,n],u=[0,0,-n];for(let f=0;f<a;f++){let g=[c[f][0],c[f][1],0],x=[c[(f+1)%a][0],c[(f+1)%a][1],0];l(h,g,x),l(u,x,g)}let d=new wt;return d.setAttribute("position",new _t(r,3)),d.setAttribute("uv",new _t(o,2)),d.computeVertexNormals(),d}function rs({sides:i=6,radius:e=.25,height:t=.85,waist:n=.18}={}){let s=t*.5,r=t*n,o=[],a=[],c=[],l=[];for(let g=0;g<i;g++){let x=g/i*Math.PI*2,m=(g+.5)/i*Math.PI*2;c.push([Math.cos(x)*e,r,Math.sin(x)*e]),l.push([Math.cos(m)*e*.92,-r,Math.sin(m)*e*.92])}let h=[0,s,0],u=[0,-s,0],d=(g,x,m)=>{o.push(g[0],g[1],g[2],x[0],x[1],x[2],m[0],m[1],m[2]),a.push(.5,1,0,.5,1,.5)};for(let g=0;g<i;g++){let x=(g+1)%i;d(h,c[x],c[g]),d(c[g],c[x],l[g]),d(c[x],l[x],l[g]),d(u,l[g],l[x])}let f=new wt;return f.setAttribute("position",new _t(o,3)),f.setAttribute("uv",new _t(a,2)),f.computeVertexNormals(),f}function Ht(i,e,t,n=.04,s=.02){let r=Math.max(.01,i*.5-s),o=Math.max(.01,e*.5-s),a=Math.min(n,r*.8,o*.8),c=new Wt;c.moveTo(-r+a,-o),c.lineTo(r-a,-o),c.quadraticCurveTo(r,-o,r,-o+a),c.lineTo(r,o-a),c.quadraticCurveTo(r,o,r-a,o),c.lineTo(-r+a,o),c.quadraticCurveTo(-r,o,-r,o-a),c.lineTo(-r,-o+a),c.quadraticCurveTo(-r,-o,-r+a,-o);let l=new Jn(c,{depth:Math.max(.01,t-s*2),bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:s,bevelThickness:s,curveSegments:6});return l.center(),l}function cl({radius:i=2.15,height:e=.14,flutes:t=96,fluteDepth:n=.026}={}){let s=new Wt,r=t*2;for(let c=0;c<=r;c++){let l=c/r*Math.PI*2,h=i-(c%2===1?n:0),u=Math.cos(l)*h,d=Math.sin(l)*h;c===0?s.moveTo(u,d):s.lineTo(u,d)}let o=new Vt;o.absarc(0,0,i-n-.12,0,Math.PI*2,!0),s.holes.push(o);let a=new Jn(s,{depth:e,bevelEnabled:!0,bevelSegments:1,bevelSize:.008,bevelThickness:.008,steps:1});return a.rotateX(Math.PI*.5),a.center(),a}function Vu({radius:i=.052,height:e=3.05,turns:t=5.5,tubularSegments:n=96}={}){let s=[];for(let r=0;r<2;r++){let o=[];for(let c=0;c<=48;c++){let l=c/48,h=l*t*Math.PI*2+r*Math.PI,u=i*.46;o.push(new R(Math.cos(h)*u,(l-.5)*e,Math.sin(h)*u))}let a=new Sn(o);s.push(new En(a,n,i*.58,10,!1))}return s.push(H(new mt(i*1.45,i*.42,10,24),{y:e*.5-.04,rx:Math.PI*.5})),s.push(H(new mt(i*1.55,i*.45,10,24),{y:-e*.5+.04,rx:Math.PI*.5})),Be(s,!0)}function ll(i,e,{beads:t=18,radius:n=.048}={}){let s=[];for(let r=0;r<t;r++){let o=(r+.5)/t,a=zt(i.x,e.x,o),c=zt(i.y,e.y,o),l=zt(i.z,e.z,o),h=new Qe(n,10,8);H(h,{x:a,y:c,z:l,sx:1.25,sy:.88,sz:.95,rz:r%2===0?.22:-.22}),s.push(h)}return Be(s,!0)}function ur({color:i=16764806,opacity:e=.16,power:t=2.4}={}){return new Ot({transparent:!0,depthWrite:!1,side:Nn,blending:fn,uniforms:{uColor:{value:new Ce(i)},uOpacity:{value:e},uPower:{value:t},uTime:{value:0}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewDir;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vec4 mv = viewMatrix * wp;
        vNormalView = normalize(normalMatrix * normal);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uPower;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewDir;
      varying vec3 vWorldPos;

      void main() {
        float ndv = abs(dot(normalize(vNormalView), normalize(vViewDir)));
        float edgeSoft = pow(ndv, uPower);
        float verticalFade = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.18, vUv.y);
        float shimmer = 0.86 + 0.14 * sin(vWorldPos.y * 5.0 - uTime * 1.4 + vWorldPos.x * 3.2);
        float alpha = edgeSoft * verticalFade * uOpacity * shimmer;
        gl_FragColor = vec4(uColor * alpha, alpha);
      }
    `})}function Wu(){return new Ot({transparent:!0,depthWrite:!1,blending:fn,uniforms:{uTime:{value:0}},vertexShader:`
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        float h = clamp(uv.y, 0.0, 1.0);
        // Teardrop taper + gentle organic draft sway at tip
        float swayX = sin(uTime * 7.3 + h * 2.5) * 0.022 * h * h
                    + sin(uTime * 13.1) * 0.008 * h;
        float swayZ = cos(uTime * 5.9 + h * 2.0) * 0.016 * h * h;
        float stretch = 1.0 + sin(uTime * 11.4) * 0.06 * h;
        p.x += swayX;
        p.z += swayZ;
        p.y *= stretch;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,fragmentShader:`
      varying vec2 vUv;
      void main() {
        float h = clamp(vUv.y, 0.0, 1.0);
        vec3 blueCore = vec3(0.24, 0.45, 1.0);
        vec3 warmBody = vec3(1.0, 0.72, 0.22);
        vec3 hotCenter = vec3(1.0, 0.97, 0.86);
        vec3 col = mix(blueCore, warmBody, smoothstep(0.05, 0.36, h));
        col = mix(col, hotCenter, smoothstep(0.18, 0.52, h) * (1.0 - smoothstep(0.65, 0.98, h)));
        float fade = smoothstep(0.0, 0.14, h) * (1.0 - smoothstep(0.68, 1.0, h));
        gl_FragColor = vec4(col * 2.6 * fade, fade);
      }
    `})}function Xu(i,{lightPos:e=new R(0,1.35,.35),lightColor:t=new Ce(16753720),strength:n=.42}={}){return i.userData.paperUniforms={uSssPos:{value:e},uSssColor:{value:t},uSssStrength:{value:n}},i.onBeforeCompile=s=>{Object.assign(s.uniforms,i.userData.paperUniforms),s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vPaperWorldPos;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vPaperWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
        varying vec3 vPaperWorldPos;
        uniform vec3 uSssPos;
        uniform vec3 uSssColor;
        uniform float uSssStrength;`).replace("#include <opaque_fragment>",`vec3 toCandle = uSssPos - vPaperWorldPos;
        float distC = length(toCandle) + 1e-4;
        vec3 Lc = toCandle / distC;
        vec3 Vw = normalize(cameraPosition - vPaperWorldPos);
        // Warm wax-honey backscatter through thin paper fibers
        float backScatter = pow(clamp(dot(Vw, -Lc) * 0.65 + 0.35, 0.0, 1.0), 2.6);
        float atten = 1.0 / (1.0 + 0.22 * distC * distC);
        outgoingLight += diffuseColor.rgb * uSssColor * backScatter * atten * uSssStrength;
        #include <opaque_fragment>`)},i.customProgramCacheKey=()=>"paper-sss-v2",i}function aa(i,{ridgeScale:e=42,ridgeStrength:t=.055,icingScatter:n=.18}={}){return i.onBeforeCompile=s=>{s.uniforms.uRidgeScale={value:e},s.uniforms.uRidgeStrength={value:t},s.uniforms.uIcingScatter={value:n},s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vClayLocalPos;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vClayLocalPos = position;`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
        varying vec3 vClayLocalPos;
        uniform float uRidgeScale;
        uniform float uRidgeStrength;
        uniform float uIcingScatter;`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        // 0.4mm tactile sculptor fingerprint whorl ridges in object space (never stretches on bevels!)
        float whorl = sin((vClayLocalPos.x * 1.3 + vClayLocalPos.y * 0.9 + sin(vClayLocalPos.z * 6.0) * 0.25) * uRidgeScale);
        vec3 microPerturb = normalize(vec3(dFdx(whorl), dFdy(whorl), 1.0));
        normal = normalize(normal + (microPerturb - vec3(0.0, 0.0, 1.0)) * uRidgeStrength);`).replace("#include <opaque_fragment>",`float wrapRim = pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.2);
        outgoingLight += diffuseColor.rgb * vec3(1.0, 0.93, 0.85) * wrapRim * uIcingScatter;
        #include <opaque_fragment>`)},i.customProgramCacheKey=()=>`clay-grain-${t.toFixed(3)}-${n.toFixed(2)}`,i}function oi(i,{anisoStrength:e=.38,patinaStrength:t=.25}={}){return i.onBeforeCompile=n=>{n.uniforms.uAnisoStrength={value:e},n.uniforms.uPatinaStrength={value:t},n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vBrassTangent;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vec2 radDirV = normalize(position.xy + vec2(1e-5));
        vec3 tangLocalV = normalize(vec3(-radDirV.y, radDirV.x, 0.15));
        #ifdef USE_INSTANCING
          vBrassTangent = normalize(mat3(modelViewMatrix * instanceMatrix) * tangLocalV);
        #else
          vBrassTangent = normalize(normalMatrix * tangLocalV);
        #endif`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
        varying vec3 vBrassTangent;
        uniform float uAnisoStrength;
        uniform float uPatinaStrength;`).replace("#include <opaque_fragment>",`// Radial lathe-turned tangential anisotropy lobe (fan-shaped watchmaker sheen)
        vec3 tangView = normalize(vBrassTangent);
        vec3 Vdir = normalize(vViewPosition);
        vec3 keyDir = normalize(vec3(0.45, 0.72, 0.52));
        vec3 Hvec = normalize(Vdir + keyDir);
        float tDotH = dot(tangView, Hvec);
        float sinTH = sqrt(max(0.0, 1.0 - tDotH * tDotH));
        float anisoSpec = pow(sinTH, 26.0) * max(0.0, dot(normal, keyDir));
        outgoingLight += diffuseColor.rgb * vec3(1.25, 1.08, 0.78) * anisoSpec * uAnisoStrength;
        // Subtle antique bronze patina darkening in high-curvature crevices
        float curv = clamp(length(fwidth(normal)) * 1.6, 0.0, 1.0);
        outgoingLight *= mix(1.0, 1.0 - uPatinaStrength * 0.55, curv);
        #include <opaque_fragment>`)},i.customProgramCacheKey=()=>`aniso-brass-${e.toFixed(2)}`,i}function Zr(i,{tint:e=14678527,emissive:t=1988216,emissiveIntensity:n=.42,dispersion:s=.028}={}){return new Ot({uniforms:{tRefract:{value:i},uTint:{value:new Ce(e)},uEmissive:{value:new Ce(t)},uEmissiveIntensity:{value:n},uDispersion:{value:s},uTime:{value:0}},vertexShader:`
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vViewNormal;
      varying vec4 vClipPos;
      void main() {
        vec4 localPos = vec4(position, 1.0);
        mat4 wm = modelMatrix;
        #ifdef USE_INSTANCING
          wm = modelMatrix * instanceMatrix;
        #endif
        vec4 wp = wm * localPos;
        vWorldPos = wp.xyz;
        mat3 nm = mat3(wm);
        vWorldNormal = normalize(nm * normal);
        vViewNormal = normalize(mat3(viewMatrix) * vWorldNormal);
        vClipPos = projectionMatrix * viewMatrix * wp;
        gl_Position = vClipPos;
      }
    `,fragmentShader:`
      uniform sampler2D tRefract;
      uniform vec3 uTint;
      uniform vec3 uEmissive;
      uniform float uEmissiveIntensity;
      uniform float uDispersion;
      uniform float uTime;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vViewNormal;
      varying vec4 vClipPos;

      vec3 thinFilmSpectrum(float cosTheta, float shift) {
        float phase = (1.0 - cosTheta) * 5.2 + shift;
        return 0.55 + 0.45 * cos(phase + vec3(0.0, 2.094, 4.188));
      }

      void main() {
        vec3 N = normalize(vWorldNormal);
        vec3 V = normalize(cameraPosition - vWorldPos);
        float ndv = clamp(abs(dot(N, V)), 0.0, 1.0);
        float fresnel = pow(1.0 - ndv, 3.2);

        vec2 screenUV = (vClipPos.xy / max(vClipPos.w, 1e-4)) * 0.5 + 0.5;
        vec2 bend = -vViewNormal.xy * (0.032 + (1.0 - ndv) * 0.045);

        // Spectral 3-wavelength dispersion sampling from refractRT
        float r = texture2D(tRefract, clamp(screenUV + bend * (1.0 - uDispersion * 5.0), vec2(0.002), vec2(0.998))).r;
        float g = texture2D(tRefract, clamp(screenUV + bend, vec2(0.002), vec2(0.998))).g;
        float b = texture2D(tRefract, clamp(screenUV + bend * (1.0 + uDispersion * 6.0), vec2(0.002), vec2(0.998))).b;
        vec3 refracted = vec3(r, g, b) * uTint;

        // Dichroic thin-film rainbow interference across crystal facets
        float facetShift = dot(N, vec3(0.6, 0.5, 0.6)) * 2.4 + uTime * 0.25;
        vec3 irid = thinFilmSpectrum(ndv, facetShift);

        // Razor-sharp diamond facet pinlight speculars
        vec3 R = reflect(-V, N);
        vec3 L1 = normalize(vec3(0.48, 0.76, 0.44));
        vec3 L2 = normalize(vec3(-0.62, 0.55, 0.56));
        float spec = pow(max(dot(R, L1), 0.0), 64.0) * 2.8
                   + pow(max(dot(R, L2), 0.0), 42.0) * 1.8;

        // Internal caustic sparkle
        float caustic = pow(max(0.0, sin(vWorldPos.y * 16.0 + ndv * 9.0 - uTime * 1.8)), 6.0) * 0.35;

        vec3 col = mix(refracted * 1.18, irid * 1.45, clamp(0.28 + fresnel * 0.68, 0.0, 1.0));
        col += uEmissive * uEmissiveIntensity;
        col += irid * caustic;
        col += vec3(0.94, 0.98, 1.0) * spec;

        gl_FragColor = vec4(col, 1.0);
      }
    `})}var Jr=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,vv=`
uniform sampler2D tDepth;
uniform vec2 uRes;
uniform float uNear;
uniform float uFar;
uniform float uFovTan;
uniform float uAspect;
uniform float uRadius;
varying vec2 vUv;

float readViewZ(vec2 uv) {
  float d = texture2D(tDepth, uv).x;
  float ndcZ = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / max(uFar + uNear - ndcZ * (uFar - uNear), 1e-4);
}

vec3 uvToViewPos(vec2 uv, float vz) {
  vec2 ndc = uv * 2.0 - 1.0;
  return vec3(ndc.x * uAspect * uFovTan * vz, ndc.y * uFovTan * vz, -vz);
}

float ignHash(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

void main() {
  float vz = readViewZ(vUv);
  // Skip background sky dome / extreme distance
  if (vz > uFar * 0.65) {
    gl_FragColor = vec4(1.0);
    return;
  }

  vec3 P = uvToViewPos(vUv, vz);
  // Reconstruct view-space surface normal via screen-space derivatives
  vec3 dPdx = dFdx(P);
  vec3 dPdy = dFdy(P);
  vec3 N = normalize(cross(dPdx, dPdy));

  float jitter = ignHash(gl_FragCoord.xy) * 6.2831853;
  float screenRad = clamp(uRadius / max(vz, 0.6), 0.004, 0.055);
  vec2 aspectFix = vec2(1.0 / max(uAspect, 0.1), 1.0);

  float occ = 0.0;
  for (int i = 0; i < 12; i++) {
    float fi = float(i);
    float r = sqrt((fi + 0.5) / 12.0) * screenRad;
    float ang = fi * 2.3999632 + jitter;
    vec2 sUv = vUv + vec2(cos(ang), sin(ang)) * aspectFix * r;
    if (sUv.x < 0.002 || sUv.x > 0.998 || sUv.y < 0.002 || sUv.y > 0.998) continue;

    float svz = readViewZ(sUv);
    vec3 S = uvToViewPos(sUv, svz);
    vec3 diff = S - P;
    float dist = length(diff) + 1e-4;
    float ndotv = dot(N, diff / dist);

    // Smooth thickness range check so foreground silhouettes never cast dark halos onto distant walls
    float rangeCheck = smoothstep(uRadius * 1.65, uRadius * 0.25, dist);
    occ += smoothstep(0.06, 0.68, ndotv) * rangeCheck;
  }

  float ao = clamp(1.0 - (occ / 12.0) * 1.25, 0.28, 1.0);
  gl_FragColor = vec4(vec3(ao), clamp(vz / uFar, 0.0, 1.0));
}
`,yv=`
uniform sampler2D tAO;
uniform vec2 uTexel;
varying vec2 vUv;

void main() {
  vec4 center = texture2D(tAO, vUv);
  float cAo = center.r;
  float cDepth = center.a;
  if (cDepth > 0.64) {
    gl_FragColor = vec4(1.0);
    return;
  }
  float sum = cAo * 0.28;
  float wSum = 0.28;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      if (x == 0 && y == 0) continue;
      vec2 off = vec2(float(x), float(y)) * uTexel * 1.5;
      vec4 s = texture2D(tAO, vUv + off);
      float dz = abs(s.a - cDepth);
      float w = exp(-dz * 180.0) * 0.09;
      sum += s.r * w;
      wSum += w;
    }
  }
  gl_FragColor = vec4(vec3(sum / max(wSum, 1e-4)), cDepth);
}
`,_v=`
uniform sampler2D tColor;
uniform vec2 uTexel;
uniform float uThreshold;
varying vec2 vUv;

void main() {
  vec3 sum = vec3(0.0);
  for (int y = 0; y < 2; y++) {
    for (int x = 0; x < 2; x++) {
      vec2 off = (vec2(float(x), float(y)) - 0.5) * 2.0 * uTexel;
      vec3 s = texture2D(tColor, vUv + off).rgb;
      float lum = dot(s, vec3(0.2126, 0.7152, 0.0722));
      float knee = uThreshold * 0.55;
      float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
      soft = (soft * soft) / (4.0 * knee + 1e-4);
      float contrib = max(soft, lum - uThreshold) / max(lum, 1e-4);
      sum += min(s * contrib, vec3(10.0));
    }
  }
  gl_FragColor = vec4(sum * 0.25, 1.0);
}
`,Ev=`
uniform sampler2D tSrc;
uniform vec2 uDir;
varying vec2 vUv;

void main() {
  vec3 c = texture2D(tSrc, vUv).rgb * 0.2270270;
  c += (texture2D(tSrc, vUv + uDir * 1.3846153).rgb + texture2D(tSrc, vUv - uDir * 1.3846153).rgb) * 0.3162162;
  c += (texture2D(tSrc, vUv + uDir * 3.2307692).rgb + texture2D(tSrc, vUv - uDir * 3.2307692).rgb) * 0.0702703;
  gl_FragColor = vec4(c, 1.0);
}
`,Mv=`
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform sampler2D tAO;
uniform sampler2D tBloom1;
uniform sampler2D tBloom2;
uniform vec2 uRes;
uniform float uNear;
uniform float uFar;
uniform float uFocusDist;
uniform float uAperture;
uniform float uAoStrength;
uniform float uTime;
uniform float uBloomStrength;
uniform float uStarburst;
uniform float uTransition;
uniform vec3 uTransTint;
varying vec2 vUv;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float linearizeDepth(float d) {
  float ndcZ = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / max(uFar + uNear - ndcZ * (uFar - uNear), 1e-4);
}

vec3 agxTonemap(vec3 col) {
  const mat3 agxIn = mat3(
    0.842479062253094, 0.0423282422610123, 0.0423756549057051,
    0.0784335999999992, 0.878468636469772, 0.0784336,
    0.0792237451477643, 0.0791661274605434, 0.879142973793104
  );
  const mat3 agxOut = mat3(
    1.19687900512017, -0.0528968517574562, -0.0529716355144438,
    -0.0980208811401368, 1.15190312990417, -0.0980434501171241,
    -0.0990297440797205, -0.0989611768448433, 1.15107367264116
  );
  vec3 v = max(agxIn * max(col, vec3(0.0)), vec3(1e-6));
  v = clamp(log2(v) * 0.06060606 + 0.75757575, 0.0, 1.0);
  vec3 x2 = v * v;
  vec3 x4 = x2 * x2;
  v = 15.5 * x4 * x2 - 40.14 * x4 * v + 31.96 * x4 - 6.868 * x2 * v + 0.4298 * x2 + 0.1191 * v - 0.00232;
  vec3 outCol = max(agxOut * v, vec3(0.0));
  return pow(outCol, vec3(1.0 / 2.2));
}

void main() {
  vec2 aspect = vec2(uRes.x / max(uRes.y, 1.0), 1.0);
  vec2 texel = 1.0 / uRes;

  // True Physical Circle-of-Confusion (CoC) Macro Depth of Field!
  // Keeps tall church spires & North Star razor-sharp when in the focal zone,
  // while melting foreground/distant bokeh into creamy discs as you zoom closer.
  float viewZ = linearizeDepth(texture2D(tDepth, vUv).x);
  float focalPlane = max(1.2, uFocusDist);
  // Generous sharp depth-of-field sweet spot around focalPlane (+/- 22% of focal distance)
  float defocusDelta = max(0.0, abs(viewZ - focalPlane) - focalPlane * 0.22);
  // Closer macro focus = shallower DoF; sky dome (>45m) receives gentle atmospheric softness
  float macroScale = clamp(8.5 / focalPlane, 0.65, 2.1);
  float physCoC = clamp((defocusDelta / max(viewZ, 1.2)) * uAperture * macroScale * 5.2, 0.0, 6.2);
  float blurAmt = physCoC + uTransition * 18.0;

  // Subtle Leica 0.75px peripheral radial chromatic aberration
  vec2 fromCenter = vUv - 0.5;
  float edgeDist2 = dot(fromCenter, fromCenter);
  vec2 caShift = fromCenter * edgeDist2 * texel * 2.2;

  vec3 baseCol = vec3(0.0);
  if (blurAmt < 0.12) {
    float rCh = texture2D(tColor, clamp(vUv + caShift, vec2(0.001), vec2(0.999))).r;
    float gCh = texture2D(tColor, vUv).g;
    float bCh = texture2D(tColor, clamp(vUv - caShift, vec2(0.001), vec2(0.999))).b;
    baseCol = vec3(rCh, gCh, bCh);
  } else {
    float wSum = 0.0;
    float rBase = blurAmt * min(texel.x, texel.y) * 1.42;
    for (int i = 0; i < 12; i++) {
      float fi = float(i);
      float rad = sqrt((fi + 0.5) / 12.0) * rBase;
      float ang = fi * 2.3999632 + 0.4;
      // Slight cat's-eye optical compression near screen corners
      vec2 off = vec2(cos(ang), sin(ang) * aspect.x) * rad / aspect.x;
      vec2 sUv = clamp(vUv + off, vec2(0.002), vec2(0.998));
      vec3 samp = texture2D(tColor, sUv).rgb;
      float sZ = linearizeDepth(texture2D(tDepth, sUv).x);
      // Prevent sharp in-focus foreground objects from bleeding over background bokeh
      float leakGuard = (sZ < focalPlane * 0.82 && blurAmt < 6.5) ? smoothstep(0.0, 1.5, abs(sZ - focalPlane)) : 1.0;
      float l = dot(samp, vec3(0.2126, 0.7152, 0.0722));
      float w = (1.0 + smoothstep(0.65, 3.0, l) * (1.25 + uTransition * 4.5)) * mix(0.35, 1.0, leakGuard);
      baseCol += samp * w;
      wSum += w;
    }
    baseCol /= max(wSum, 1e-4);
  }

  // Apply Screen-Space Contact Ambient Occlusion (automatically exempted on emissive flames/stars!)
  float aoRaw = texture2D(tAO, vUv).r;
  float lumBase = dot(baseCol, vec3(0.2126, 0.7152, 0.0722));
  float emissiveExempt = smoothstep(0.55, 1.65, lumBase);
  float aoFactor = mix(mix(1.0, aoRaw, uAoStrength), 1.0, emissiveExempt);
  // Warm bounce tint in occluded crevices so shadows feel rich rather than muddy grey
  vec3 aoTint = mix(vec3(0.18, 0.11, 0.10), vec3(1.0), aoFactor);
  baseCol *= mix(vec3(aoFactor), aoTint, 0.25 * (1.0 - aoFactor));

  // Multi-scale bloom
  vec3 bloom = texture2D(tBloom1, vUv).rgb * 0.65 + texture2D(tBloom2, vUv).rgb * 0.85;

  // Diagonal 4-point starburst streaks
  if (uStarburst > 0.01) {
    vec3 glare = vec3(0.0);
    vec2 d1 = normalize(vec2(1.0, 0.58)) * texel * 5.5;
    vec2 d2 = normalize(vec2(-1.0, 0.58)) * texel * 5.5;
    for (int s = -3; s <= 3; s++) {
      float w = exp(-abs(float(s)) * 0.55);
      glare += texture2D(tBloom1, vUv + d1 * float(s)).rgb * w;
      glare += texture2D(tBloom1, vUv + d2 * float(s)).rgb * w;
    }
    bloom += glare * 0.095 * uStarburst;
  }

  vec3 hdr = baseCol + bloom * uBloomStrength;

  // Optical bokeh orbs during act transitions
  if (uTransition > 0.005) {
    vec2 p = (vUv - 0.5) * aspect;
    vec3 orbs = vec3(0.0);
    for (int k = 0; k < 18; k++) {
      float fk = float(k);
      vec2 center = vec2(
        sin(fk * 2.13 + uTime * 0.45) * 0.78,
        cos(fk * 1.71 - uTime * 0.35) * 0.46
      );
      float rad = mix(0.07, 0.22, fract(fk * 0.618034));
      float d = length(p - center);
      float disc = 1.0 - smoothstep(rad * 0.82, rad, d);
      float ring = smoothstep(rad * 0.55, rad * 0.92, d) * disc;
      vec3 orbCol = mix(vec3(1.0, 0.78, 0.42), uTransTint, fract(fk * 0.37));
      orbs += orbCol * (disc * 0.35 + ring * 0.55);
    }
    float veil = smoothstep(0.0, 0.88, uTransition);
    hdr = mix(hdr, hdr * 0.32 + orbs * 1.45 + uTransTint * 0.14, veil);
  }

  vec2 vc = (vUv - 0.5) * aspect;
  float vig = 1.0 - 0.16 * dot(vc, vc);
  hdr *= clamp(vig, 0.74, 1.0);

  vec3 srgb = agxTonemap(hdr);
  float grain = (hash12(gl_FragCoord.xy + fract(uTime) * 137.0) - 0.5) * (1.5 / 255.0);
  srgb = clamp(srgb + grain, 0.0, 1.0);

  gl_FragColor = vec4(srgb, 1.0);
}
`,ca=class{constructor(e){this.renderer=e,this.w=1,this.h=1;let t=ki,n=new or(1,1,wi);n.format=Gi,n.minFilter=vn,n.magFilter=vn;let s=Math.min(4,e.capabilities.maxSamples||0);this.sceneRT=new on(1,1,{type:t,minFilter:Zt,magFilter:Zt,depthBuffer:!0,stencilBuffer:!1,depthTexture:n,samples:s}),e.properties.get(this.sceneRT).__useRenderToTexture=!1,this._fboVerified=!1,this.refractRT=new on(1,1,{type:t,minFilter:Zt,magFilter:Zt,depthBuffer:!0});let r={type:Ri,minFilter:Zt,magFilter:Zt,depthBuffer:!1};this.aoRawRT=new on(1,1,r),this.aoBlurRT=new on(1,1,r);let o={type:t,minFilter:Zt,magFilter:Zt,depthBuffer:!1};this.brightRT=new on(1,1,o),this.blur1A=new on(1,1,o),this.blur1B=new on(1,1,o),this.blur2A=new on(1,1,o),this.blur2B=new on(1,1,o),this.orthoCam=new sr(-1,1,1,-1,0,1);let a=new Tn(2,2);this.gtaoMat=new Ot({vertexShader:Jr,fragmentShader:vv,uniforms:{tDepth:{value:n},uRes:{value:new pe(1,1)},uNear:{value:.1},uFar:{value:120},uFovTan:{value:Math.tan(42*Math.PI/360)},uAspect:{value:1},uRadius:{value:.34}},depthTest:!1,depthWrite:!1}),this.aoBlurMat=new Ot({vertexShader:Jr,fragmentShader:yv,uniforms:{tAO:{value:null},uTexel:{value:new pe(1,1)}},depthTest:!1,depthWrite:!1}),this.brightMat=new Ot({vertexShader:Jr,fragmentShader:_v,uniforms:{tColor:{value:null},uTexel:{value:new pe},uThreshold:{value:.85}},depthTest:!1,depthWrite:!1}),this.blurMat=new Ot({vertexShader:Jr,fragmentShader:Ev,uniforms:{tSrc:{value:null},uDir:{value:new pe}},depthTest:!1,depthWrite:!1}),this.finalMat=new Ot({vertexShader:Jr,fragmentShader:Mv,uniforms:{tColor:{value:null},tDepth:{value:n},tAO:{value:null},tBloom1:{value:null},tBloom2:{value:null},uRes:{value:new pe(1,1)},uNear:{value:.1},uFar:{value:120},uFocusDist:{value:8.5},uAperture:{value:.55},uAoStrength:{value:.78},uTime:{value:0},uBloomStrength:{value:.48},uStarburst:{value:.15},uTransition:{value:0},uTransTint:{value:new Ce(16758888)}},depthTest:!1,depthWrite:!1}),this.quad=new B(a,this.brightMat),this.quad.frustumCulled=!1,this.quadScene=new In,this.quadScene.add(this.quad)}setSize(e,t){if(e===this.w&&t===this.h)return;this.w=e,this.h=t,this.sceneRT.setSize(e,t),this.renderer.properties.get(this.sceneRT).__useRenderToTexture=!1,this._fboVerified=!1;let n=Math.max(1,Math.floor(e*.5)),s=Math.max(1,Math.floor(t*.5)),r=Math.max(1,Math.floor(e*.25)),o=Math.max(1,Math.floor(t*.25));this.refractRT.setSize(n,s),this.aoRawRT.setSize(n,s),this.aoBlurRT.setSize(n,s),this.brightRT.setSize(n,s),this.blur1A.setSize(n,s),this.blur1B.setSize(n,s),this.blur2A.setSize(r,o),this.blur2B.setSize(r,o),this.gtaoMat.uniforms.uRes.value.set(n,s),this.aoBlurMat.uniforms.uTexel.value.set(1/n,1/s),this.finalMat.uniforms.uRes.value.set(e,t)}captureRefractionPass(e,t,n){if(!n||n.length===0)return;let s=this.renderer.shadowMap.autoUpdate;this.renderer.shadowMap.autoUpdate=!1;for(let r=0;r<n.length;r++)n[r].visible=!1;this.renderer.setRenderTarget(this.refractRT),this.renderer.clear(),this.renderer.render(e,t);for(let r=0;r<n.length;r++)n[r].visible=!0;this.renderer.shadowMap.autoUpdate=s}render(e,t,n,s={}){let r=this.renderer;if(s.onBeforeMainRender&&s.onBeforeMainRender(r,t),s.refractMeshes&&s.refractMeshes.length>0&&this.captureRefractionPass(e,t,s.refractMeshes),this.renderer.properties.get(this.sceneRT).__useRenderToTexture=!1,r.setRenderTarget(this.sceneRT),!this._fboVerified){this._fboVerified=!0;let d=r.getContext();this.sceneRT.samples>0&&d.checkFramebufferStatus(d.FRAMEBUFFER)!==d.FRAMEBUFFER_COMPLETE&&(this.sceneRT.samples=0,this.sceneRT.dispose(),r.setRenderTarget(this.sceneRT))}r.clear(),r.render(e,t);let o=Math.max(1,Math.floor(this.w*.5)),a=Math.max(1,Math.floor(this.h*.5)),c=Math.max(1,Math.floor(this.w*.25)),l=Math.max(1,Math.floor(this.h*.25)),h=s.aoStrength??.78;if(h>.01){this.quad.material=this.gtaoMat;let d=this.gtaoMat.uniforms;d.uNear.value=t.near,d.uFar.value=t.far,d.uFovTan.value=Math.tan(t.fov*Math.PI/360),d.uAspect.value=t.aspect,d.uRadius.value=s.aoRadius??.34,r.setRenderTarget(this.aoRawRT),r.render(this.quadScene,this.orthoCam),this.quad.material=this.aoBlurMat,this.aoBlurMat.uniforms.tAO.value=this.aoRawRT.texture,r.setRenderTarget(this.aoBlurRT),r.render(this.quadScene,this.orthoCam)}this.quad.material=this.brightMat,this.brightMat.uniforms.tColor.value=this.sceneRT.texture,this.brightMat.uniforms.uTexel.value.set(1/this.w,1/this.h),this.brightMat.uniforms.uThreshold.value=s.bloomThreshold??.82,r.setRenderTarget(this.brightRT),r.render(this.quadScene,this.orthoCam),this.quad.material=this.blurMat,this.blurMat.uniforms.tSrc.value=this.brightRT.texture,this.blurMat.uniforms.uDir.value.set(1/o,0),r.setRenderTarget(this.blur1A),r.render(this.quadScene,this.orthoCam),this.blurMat.uniforms.tSrc.value=this.blur1A.texture,this.blurMat.uniforms.uDir.value.set(0,1/a),r.setRenderTarget(this.blur1B),r.render(this.quadScene,this.orthoCam),this.blurMat.uniforms.tSrc.value=this.blur1B.texture,this.blurMat.uniforms.uDir.value.set(1.5/c,0),r.setRenderTarget(this.blur2A),r.render(this.quadScene,this.orthoCam),this.blurMat.uniforms.tSrc.value=this.blur2A.texture,this.blurMat.uniforms.uDir.value.set(0,1.5/l),r.setRenderTarget(this.blur2B),r.render(this.quadScene,this.orthoCam),this.quad.material=this.finalMat;let u=this.finalMat.uniforms;u.tColor.value=this.sceneRT.texture,u.tAO.value=this.aoBlurRT.texture,u.tBloom1.value=this.blur1B.texture,u.tBloom2.value=this.blur2B.texture,u.uNear.value=t.near,u.uFar.value=t.far,u.uFocusDist.value=s.focusDist??8.5,u.uAperture.value=s.aperture??.52,u.uAoStrength.value=h,u.uTime.value=n,u.uBloomStrength.value=s.bloomStrength??.48,u.uStarburst.value=s.starburst??.15,u.uTransition.value=s.transition??0,s.transTint&&u.uTransTint.value.copy(s.transTint),r.setRenderTarget(null),r.render(this.quadScene,this.orthoCam)}};function yi(i,e){let t=document.createElement("canvas");return t.width=i,t.height=e,t}function Kn(i,e){let t=Math.sin(i*127.1+e*311.7)*43758.5453123;return t-Math.floor(t)}function dr(i,e){let t=Math.floor(i),n=Math.floor(e),s=i-t,r=e-n,o=s*s*(3-2*s),a=r*r*(3-2*r),c=Kn(t,n),l=Kn(t+1,n),h=Kn(t,n+1),u=Kn(t+1,n+1);return c+(l-c)*o+(h-c)*a+(c-l-h+u)*o*a}function la(i,e,t=4){let n=0,s=.5,r=1;for(let o=0;o<t;o++)n+=s*dr(i*r,e*r),r*=2.03,s*=.5;return n}function qu(i){let e=null,t=()=>(e||(e=new rr(i)),e),n=(a,c,l)=>{let h=new In,u=new Qe(30,24,16),d=u.attributes.position,f=new Float32Array(d.count*3),g=new Ce(a),x=new Ce(c),m=new Ce;for(let E=0;E<d.count;E++){let I=ia.clamp(d.getY(E)/30*.5+.5,0,1);m.copy(x).lerp(g,Math.pow(I,.85)),f[E*3]=m.r,f[E*3+1]=m.g,f[E*3+2]=m.b}u.setAttribute("color",new yt(f,3));let p=new B(u,new Bt({vertexColors:!0,side:_n,toneMapped:!1}));h.add(p);let T=[];for(let E of l){let I=E.sphere?new Qe(E.r||1.2,12,10):new Tn(E.w||8,E.h||5),b=new Ce(E.color).multiplyScalar(E.intensity||4),A=new B(I,new Bt({color:b,side:Nn,toneMapped:!1}));A.position.set(E.x,E.y,E.z),A.lookAt(0,0,0),h.add(A),T.push(A)}let v=t().fromScene(h,.02,.1,60);u.dispose(),p.material.dispose();for(let E of T)E.geometry.dispose(),E.material.dispose();return v.texture},s={envPaper:()=>n(1253435,1773579,[{x:9,y:12,z:10,w:12,h:7,color:16770229,intensity:4.8},{x:-12,y:8,z:6,w:10,h:6,color:16762744,intensity:3.4},{x:0,y:15,z:-10,w:14,h:5,color:7116543,intensity:2.3},{sphere:!0,x:-4.8,y:2.5,z:8,r:1.2,color:16758876,intensity:7.2}]),envClay:()=>n(3154470,1905166,[{x:0,y:16,z:8,w:18,h:10,color:16774114,intensity:3.8},{x:-13,y:6,z:9,w:9,h:9,color:16765350,intensity:3},{x:13,y:7,z:8,w:9,h:9,color:13428479,intensity:2.4},{sphere:!0,x:-4,y:2,z:13,r:1.5,color:16755036,intensity:5.2}]),envGlobe:()=>n(792622,1707528,[{x:-10,y:11,z:11,w:6,h:14,color:14216447,intensity:6.5},{x:11,y:9,z:10,w:9,h:7,color:16763776,intensity:5.5},{sphere:!0,x:6,y:-1,z:13,r:1.3,color:16747579,intensity:9.2},{sphere:!0,x:9,y:2,z:11,r:.9,color:16759134,intensity:8.5},{sphere:!0,x:-6,y:14,z:-8,r:2,color:8304383,intensity:4.6}]),envAurora:()=>n(595499,329490,[{x:-9,y:13,z:8,w:16,h:5,color:5177288,intensity:6},{x:10,y:11,z:7,w:15,h:5,color:11958527,intensity:5.4},{x:0,y:6,z:14,w:10,h:4,color:16773324,intensity:4.8},{sphere:!0,x:-5,y:8,z:12,r:1,color:16777215,intensity:10.5},{sphere:!0,x:6,y:4,z:12,r:1,color:9238271,intensity:9.2}])},r={},o={};for(let a of Object.keys(s))Object.defineProperty(o,a,{enumerable:!0,get(){return r[a]||(r[a]=s[a]()),r[a]}});return o}function Yu(i){let e=i?Math.min(8,i.capabilities.getMaxAnisotropy()||4):4,t=(W,ge=1,C=1)=>(W.anisotropy=e,(ge!==1||C!==1)&&(W.wrapS=W.wrapT=tr,W.repeat.set(ge,C)),W),n=256,s=yi(n,n),r=s.getContext("2d"),o=r.createImageData(n,n);for(let W=0;W<n;W++)for(let ge=0;ge<n;ge++){let C=la(ge*.09,W*.09,4),fe=dr(ge*.68,W*.16)*.32+dr(ge*.16,W*.68)*.32,V=Math.pow(dr(ge*.24,W*.24),2)*.22,re=Math.floor(ia.clamp((C*.55+fe*.45+V)*255,0,255)),Y=(W*n+ge)*4;o.data[Y]=244+(re-128>>3),o.data[Y+1]=237+(re-128>>3),o.data[Y+2]=223+(re-128>>3),o.data[Y+3]=255}r.putImageData(o,0,0);let a=t(new zn(s),3.5,3.5),c=yi(n,n),l=c.getContext("2d"),h=l.createImageData(n,n);for(let W=0;W<n;W++)for(let ge=0;ge<n;ge++){let C=la(ge*.032,W*.032,4),fe=Math.sin(ge*.36+W*.24+C*7.2)*.5+.5,V=Kn(ge,W)*.12,re=Math.floor(ia.clamp((C*.68+fe*.2+V)*255,0,255)),Y=(W*n+ge)*4;h.data[Y]=re,h.data[Y+1]=re,h.data[Y+2]=re,h.data[Y+3]=255}l.putImageData(h,0,0);let u=t(new zn(c),2.5,2.5),d=yi(n,n),f=d.getContext("2d"),g=f.createImageData(n,n);for(let W=0;W<n;W++)for(let ge=0;ge<n;ge++){let C=ge-n*.5,fe=W-n*.5,V=Math.hypot(C,fe),re=Math.atan2(fe,C),Y=Math.sin(V*2.1+dr(re*12,V*.08)*1.8)*.5+.5,Ae=la(ge*.04,W*.04,3),Me=Math.floor((Y*.52+Ae*.48)*255),_=(W*n+ge)*4;g.data[_]=Me,g.data[_+1]=Me,g.data[_+2]=Me,g.data[_+3]=255}f.putImageData(g,0,0);let x=t(new zn(d),1,1);x.wrapS=x.wrapT=tr;let m=yi(n,n),p=m.getContext("2d"),T=p.createImageData(n,n);for(let W=0;W<n;W++)for(let ge=0;ge<n;ge++){let C=la(ge*.014,W*.005,4)*14,fe=Math.sin(ge*.095+C)*.5+.5,V=dr(ge*.9,W*.08),re=Math.pow(fe,1.5)*.72+V*.28,Y=(W*n+ge)*4;T.data[Y]=Math.floor(22+re*28),T.data[Y+1]=Math.floor(13+re*18),T.data[Y+2]=Math.floor(10+re*12),T.data[Y+3]=255}p.putImageData(T,0,0);let v=t(new zn(m),4,3);v.colorSpace=Qt;let E=yi(512,512),I=E.getContext("2d");I.fillStyle="#8b1f27",I.fillRect(0,0,512,512),I.fillStyle="rgba(24, 72, 52, 0.72)";for(let W=0;W<512;W+=64)I.fillRect(W,0,28,512),I.fillRect(0,W,512,28);I.strokeStyle="rgba(242, 206, 126, 0.75)",I.lineWidth=3;for(let W=32;W<512;W+=64)I.beginPath(),I.moveTo(W,0),I.lineTo(W,512),I.moveTo(0,W),I.lineTo(512,W),I.stroke();let b=t(new zn(E),2,2);b.colorSpace=Qt;let A=yi(512,512),F=A.getContext("2d");F.fillStyle="#000000",F.fillRect(0,0,512,512);let M=(W,ge,C,fe)=>{F.strokeStyle=W,F.lineCap="round";for(let V=0;V<C;V++){let re=Kn(V,1.7)*512,Y=Kn(V,9.3)*512,Ae=Kn(V,4.1)*Math.PI*2;F.lineWidth=ge,F.beginPath(),F.moveTo(re,Y);for(let Me=0;Me<fe;Me++){Ae+=(Kn(V*19+Me,Me*3.7)-.5)*.85;let _=14+Kn(Me,V)*24;re+=Math.cos(Ae)*_,Y+=Math.sin(Ae)*_,F.lineTo(re,Y)}F.stroke()}};F.globalCompositeOperation="lighter",M("rgba(0, 220, 0, 0.65)",3.2,28,10),M("rgba(255, 40, 0, 0.85)",1.3,42,12);let S=t(new zn(A),4,4),k=yi(1024,256),Z=k.getContext("2d"),ae=Z.createLinearGradient(0,0,1024,256);ae.addColorStop(0,"#ecc678"),ae.addColorStop(.5,"#f6dc9f"),ae.addColorStop(1,"#c89644"),Z.fillStyle=ae,Z.fillRect(0,0,1024,256),Z.strokeStyle="#3b260c",Z.lineWidth=6,Z.strokeRect(20,20,984,216),Z.lineWidth=2.5,Z.strokeRect(32,32,960,192);for(let W of[78,946])Z.fillStyle="#233b6e",Z.beginPath(),Z.arc(W,128,20,0,Math.PI*2),Z.fill(),Z.strokeStyle="#9db8ef",Z.lineWidth=4,Z.beginPath(),Z.moveTo(W-14,120),Z.lineTo(W+14,136),Z.stroke();Z.fillStyle="#2b1a07",Z.textAlign="center",Z.font='600 54px Georgia, "Times New Roman", serif',Z.fillText("HOROLOGIUM  NOCTIS",512,124),Z.font='400 28px Georgia, "Times New Roman", serif',Z.fillText("AUTOMATON  \xB7  MMXXVI  \xB7  ACT III",512,178);let U=t(new zn(k),1,1);U.colorSpace=Qt;let O=yi(128,128),X=O.getContext("2d");X.translate(64,64);let ue=X.createRadialGradient(0,0,2,0,0,58);ue.addColorStop(0,"rgba(255,255,255,1)"),ue.addColorStop(.55,"rgba(245,250,255,0.88)"),ue.addColorStop(1,"rgba(220,240,255,0)"),X.strokeStyle=ue,X.lineCap="round";for(let W=0;W<6;W++){X.save(),X.rotate(W*Math.PI/3),X.lineWidth=3.2,X.beginPath(),X.moveTo(0,0),X.lineTo(0,-52),X.stroke(),X.lineWidth=2;for(let ge of[18,32,43]){let C=(56-ge)*.48;X.beginPath(),X.moveTo(-C*.75,-ge-C*.65),X.lineTo(0,-ge),X.lineTo(C*.75,-ge-C*.65),X.stroke()}X.restore()}let ee=new zn(O),ne=yi(128,128),oe=ne.getContext("2d"),ce=oe.createRadialGradient(64,64,0,64,64,62);ce.addColorStop(0,"rgba(255,252,240,1)"),ce.addColorStop(.22,"rgba(255,232,175,0.72)"),ce.addColorStop(.6,"rgba(255,198,110,0.16)"),ce.addColorStop(1,"rgba(255,180,90,0)"),oe.fillStyle=ce,oe.fillRect(0,0,128,128),oe.fillStyle="rgba(255,252,240,0.88)",oe.beginPath(),oe.moveTo(64,6),oe.quadraticCurveTo(66,60,122,64),oe.quadraticCurveTo(66,68,64,122),oe.quadraticCurveTo(62,68,6,64),oe.quadraticCurveTo(62,60,64,6),oe.fill();let be=new zn(ne),q=yi(1024,1024),j=q.getContext("2d");j.translate(512,512);let Se=j.createRadialGradient(0,0,24,0,0,496);Se.addColorStop(0,"#1c325e"),Se.addColorStop(.65,"#0f1c3a"),Se.addColorStop(1,"#080e1f"),j.fillStyle=Se,j.beginPath(),j.arc(0,0,496,0,Math.PI*2),j.fill(),j.strokeStyle="#e7c67d";for(let[W,ge]of[[476,4],[452,1.8],[392,2.2],[296,1.5],[164,1.5]])j.lineWidth=ge,j.beginPath(),j.arc(0,0,W,0,Math.PI*2),j.stroke();for(let W=0;W<72;W++){let ge=W/72*Math.PI*2,C=W%6===0,fe=C?396:430;j.lineWidth=C?3:1.3,j.beginPath(),j.moveTo(Math.cos(ge)*fe,Math.sin(ge)*fe),j.lineTo(Math.cos(ge)*452,Math.sin(ge)*452),j.stroke()}j.lineWidth=2.4,j.beginPath(),j.arc(0,-56,268,0,Math.PI*2),j.stroke(),j.fillStyle="#fff3cf";for(let W=0;W<95;W++){let ge=Kn(W,3.1)*Math.PI*2,C=56+Math.sqrt(Kn(W,7.7))*326,fe=1.8+Kn(W,13.3)*4.5;j.beginPath(),j.arc(Math.cos(ge)*C,Math.sin(ge)*C,fe,0,Math.PI*2),j.fill()}j.fillStyle="#ffe7a3",j.beginPath();for(let W=0;W<16;W++){let ge=W/16*Math.PI*2-Math.PI*.5,C=W%2===0?48:16,fe=Math.cos(ge)*C,V=-336+Math.sin(ge)*C;W===0?j.moveTo(fe,V):j.lineTo(fe,V)}j.closePath(),j.fill();let Ne=t(new zn(q),1,1);Ne.colorSpace=Qt;let Re=yi(512,512),Ue=Re.getContext("2d");Ue.fillStyle="#fbf5ec",Ue.fillRect(0,0,512,512),Ue.fillStyle="#cc2936";for(let W=-512;W<1024;W+=96)Ue.beginPath(),Ue.moveTo(W,0),Ue.lineTo(W+44,0),Ue.lineTo(W+44-512,512),Ue.lineTo(W-512,512),Ue.closePath(),Ue.fill();Ue.fillStyle="#368f6b";for(let W=-512;W<1024;W+=96)Ue.beginPath(),Ue.moveTo(W+54,0),Ue.lineTo(W+62,0),Ue.lineTo(W+62-512,512),Ue.lineTo(W+54-512,512),Ue.closePath(),Ue.fill();let ke=t(new zn(Re),2,2);return ke.colorSpace=Qt,{paperTex:a,clayBump:u,brassTex:x,walnutTex:v,plaidTex:b,iceVeinTex:S,plaqueTex:U,snowflakeTex:ee,sparkTex:be,volvelleTex:Ne,candyStripeTex:ke}}var ai=i=>440*Math.pow(2,(i-69)/12),Tv=[[53,57,60,64],[52,55,60,64],[50,53,57,60],[45,52,57,60],[46,53,57,62],[45,53,57,60],[43,50,55,58],[48,55,58,64]],Sv=[77,0,76,79,0,72,74,0,72,69,0,72,74,76,77,81,0,77,76,0,74,72,0,0],ha=class{constructor(){this.ctx=null,this.master=null,this.reverb=null,this.muted=!1,this.running=!1,this.activeAct=1,this.awakened=new Set,this.finaleMode=!1,this.bpm=84,this.beatDur=60/this.bpm,this.nextBeatTime=0,this.beatIndex=0,this.timerId=null,this.noiseBuf=null,this.ambienceBeds=null,this.nextMicroAmbTime=0}unlock(){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=this.muted?0:.72;let t=this.ctx.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=3.5,t.attack.value=.01,t.release.value=.25,this.reverb=this.ctx.createConvolver(),this.reverb.buffer=this._buildHallIR(1.9,2.6);let n=this.ctx.createGain();n.gain.value=.35,this.dryBus=this.ctx.createGain(),this.dryBus.gain.value=.85,this.dryBus.connect(t),this.reverb.connect(n),n.connect(t),t.connect(this.master),this.master.connect(this.ctx.destination);let s=this.ctx.sampleRate*3;this.noiseBuf=this.ctx.createBuffer(1,s,this.ctx.sampleRate);let r=this.noiseBuf.getChannelData(0),o=0,a=0,c=0;for(let l=0;l<s;l++){let h=Math.random()*2-1;o=.997*o+h*.029,a=.985*a+h*.032,c=.95*c+h*.048;let u=Math.min(1,l/1200,(s-l)/1200);r[l]=(o+a+c+h*.16)*.65*u}this._initAmbienceBeds(),this._applyAmbienceCrossfade()}this.ctx.state==="suspended"&&this.ctx.resume(),!this.running&&this.ctx&&(this.running=!0,this.nextBeatTime=this.ctx.currentTime+.12,this.nextMicroAmbTime=this.ctx.currentTime+.2,this.timerId=setInterval(()=>this._schedule(),85))}_initAmbienceBeds(){if(!this.ctx||!this.noiseBuf)return;let e=(t,n,s,r,o=!1)=>{let a=this.ctx.createBufferSource();a.buffer=this.noiseBuf,a.loop=!0;let c=this.ctx.createBiquadFilter();c.type=t,c.frequency.value=n,c.Q.value=s;let l=this.ctx.createGain();if(l.gain.value=1e-4,a.connect(c),c.connect(l),l.connect(this.dryBus),o){let h=this.ctx.createOscillator(),u=this.ctx.createGain();h.frequency.value=.14,u.gain.value=260,h.connect(u),u.connect(c.frequency),h.start()}return a.start(0,Math.random()*1.5),{gain:l,maxGain:r}};this.ambienceBeds={1:e("lowpass",280,.8,.018,!1),2:e("lowpass",195,1.2,.028,!1),3:e("bandpass",920,2.2,.009,!1),4:e("bandpass",580,4.8,.022,!0),5:e("lowpass",340,.9,.016,!1)}}_applyAmbienceCrossfade(){if(!this.ambienceBeds||!this.ctx)return;let e=this.ctx.currentTime;for(let t=1;t<=5;t++){let n=this.ambienceBeds[t],s=t===this.activeAct?n.maxGain:1e-4;n.gain.gain.setTargetAtTime(s,e,.42)}}_buildHallIR(e,t){let n=this.ctx.sampleRate,s=Math.floor(n*e),r=this.ctx.createBuffer(2,s,n);for(let o=0;o<2;o++){let a=r.getChannelData(o),c=0;for(let l=0;l<s;l++){let h=l/s,u=Math.pow(1-h,t),d=Math.random()*2-1,f=.22+.55*(1-h);c=c+f*(d-c),a[l]=c*u*.5}}return r}setMuted(e){this.muted=e,this.master&&this.ctx&&this.master.gain.setTargetAtTime(e?0:.72,this.ctx.currentTime,.08)}setAct(e){this.activeAct=e,this.finaleMode=e===5,this._applyAmbienceCrossfade()}awakenVoice(e){this.awakened.add(e)}_voiceLevel(e){return this.finaleMode?.88:this.activeAct===e?.92:this.awakened.has(e)?.42:0}_schedule(){if(!this.ctx||!this.running)return;let e=this.ctx.currentTime;for(;this.nextBeatTime<e+.26;)this._playBeat(this.beatIndex,this.nextBeatTime),this.nextBeatTime+=this.beatDur,this.beatIndex=(this.beatIndex+1)%24;for(;this.nextMicroAmbTime<e+.24;)this._scheduleMicroAmbience(this.nextMicroAmbTime),this.nextMicroAmbTime+=1/6}_scheduleMicroAmbience(e){this.muted||(this.activeAct===3?this._escapementTick(e,Math.round(e*6)%2===0?4200:3650,.0085):this.activeAct===2&&Math.random()<.22?this._hearthCrackle(e,.018+Math.random()*.018):this.activeAct===1&&Math.random()<.07&&this._hearthCrackle(e,.008))}_escapementTick(e,t,n){let s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="triangle",s.frequency.setValueAtTime(t,e),r.gain.setValueAtTime(n,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.012),s.connect(r),r.connect(this.dryBus),s.start(e),s.stop(e+.015)}_hearthCrackle(e,t){if(!this.noiseBuf)return;let n=this.ctx.createBufferSource();n.buffer=this.noiseBuf;let s=this.ctx.createBiquadFilter();s.type="bandpass",s.frequency.value=1400+Math.random()*1600,s.Q.value=4.5;let r=this.ctx.createGain();r.gain.setValueAtTime(t,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.028),n.connect(s),s.connect(r),r.connect(this.dryBus),n.start(e,Math.random()*2,.032)}_playBeat(e,t){let n=Math.floor(e/3),s=e%3,r=Tv[n],o=this._voiceLevel(1);if(o>.01){let h=r[s===0?1:s===1?2:3]+12;this._celestaPluck(ai(h),t,.095*o,1.15)}let a=this._voiceLevel(2);a>.01&&(s===0?this._marimbaTone(ai(r[0]),t,.14*a):(this._marimbaTone(ai(r[s]+12),t,.06*a),this._sleighShimmer(t,.022*a)));let c=this._voiceLevel(3);if(c>.01){let h=Sv[e];h>0&&this._musicBoxTine(ai(h),t,.105*c)}let l=this._voiceLevel(4);l>.01&&s===0&&(this._glassPad(ai(r[2]+12),t,.055*l,this.beatDur*2.9),this._glassPad(ai(r[3]+12),t+.04,.045*l,this.beatDur*2.9))}_celestaPluck(e,t,n,s){let r=this.ctx.createOscillator(),o=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sine",o.type="triangle",r.frequency.value=e,o.frequency.value=e*2;let c=this.ctx.createGain();c.gain.value=.18,a.gain.setValueAtTime(1e-4,t),a.gain.linearRampToValueAtTime(n,t+.012),a.gain.exponentialRampToValueAtTime(1e-4,t+s),r.connect(a),o.connect(c),c.connect(a),a.connect(this.dryBus),a.connect(this.reverb),r.start(t),o.start(t),r.stop(t+s+.03),o.stop(t+s+.03)}_marimbaTone(e,t,n){let s=this.ctx.createOscillator(),r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createGain();s.type="sine",r.type="sine",s.frequency.value=e,r.frequency.value=e*3.98,a.gain.setValueAtTime(n*.25,t),a.gain.exponentialRampToValueAtTime(1e-4,t+.09),o.gain.setValueAtTime(1e-4,t),o.gain.linearRampToValueAtTime(n,t+.008),o.gain.exponentialRampToValueAtTime(1e-4,t+.55),s.connect(o),r.connect(a),a.connect(this.dryBus),o.connect(this.dryBus),o.connect(this.reverb),s.start(t),r.start(t),s.stop(t+.58),r.stop(t+.12)}_sleighShimmer(e,t){if(!this.noiseBuf)return;let n=this.ctx.createBufferSource();n.buffer=this.noiseBuf;let s=this.ctx.createBiquadFilter();s.type="bandpass",s.frequency.value=6400,s.Q.value=9;let r=this.ctx.createGain();r.gain.setValueAtTime(1e-4,e),r.gain.linearRampToValueAtTime(t,e+.01),r.gain.exponentialRampToValueAtTime(1e-4,e+.13),n.connect(s),s.connect(r),r.connect(this.reverb),n.start(e,Math.random()*1.2,.16)}_musicBoxTine(e,t,n){let s=this.ctx.createOscillator(),r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createGain();s.type="sine",r.type="sine",s.frequency.value=e,r.frequency.value=e*5.41,a.gain.setValueAtTime(n*.22,t),a.gain.exponentialRampToValueAtTime(1e-4,t+.055),o.gain.setValueAtTime(1e-4,t),o.gain.linearRampToValueAtTime(n,t+.005),o.gain.exponentialRampToValueAtTime(1e-4,t+1.45),s.connect(o),r.connect(a),a.connect(this.dryBus),o.connect(this.dryBus),o.connect(this.reverb),s.start(t),r.start(t),s.stop(t+1.5),r.stop(t+.07)}_glassPad(e,t,n,s){let r=this.ctx.createOscillator(),o=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sine",o.type="sine",r.frequency.value=e,o.frequency.value=e*1.003,a.gain.setValueAtTime(1e-4,t),a.gain.linearRampToValueAtTime(n,t+s*.35),a.gain.exponentialRampToValueAtTime(1e-4,t+s),r.connect(a),o.connect(a),a.connect(this.reverb),r.start(t),o.start(t),r.stop(t+s+.05),o.stop(t+s+.05)}playWaxSealBreak(){if(this.unlock(),!this.ctx||this.muted)return;let e=this.ctx.currentTime;if(this.noiseBuf){let t=this.ctx.createBufferSource();t.buffer=this.noiseBuf;let n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.value=1950,n.Q.value=2.8;let s=this.ctx.createGain();s.gain.setValueAtTime(.24,e),s.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(n),n.connect(s),s.connect(this.dryBus),t.start(e,.2,.14)}[65,69,72,76,81].forEach((t,n)=>{this._musicBoxTine(ai(t),e+.06+n*.065,.088)})}playHoverTick(e=1){if(!this.ctx||this.muted)return;let t=this.ctx.currentTime,n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="sine",n.frequency.value=1320*e,s.gain.setValueAtTime(.018,t),s.gain.exponentialRampToValueAtTime(1e-4,t+.035),n.connect(s),s.connect(this.dryBus),n.start(t),n.stop(t+.04)}playPaperFold(e=!0){if(this.unlock(),!this.ctx||this.muted||!this.noiseBuf)return;let t=this.ctx.currentTime,n=this.ctx.createBufferSource();n.buffer=this.noiseBuf;let s=this.ctx.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(e?780:620,t),s.frequency.linearRampToValueAtTime(e?1450:480,t+.16),s.Q.value=1.8;let r=this.ctx.createGain();r.gain.setValueAtTime(.001,t),r.gain.linearRampToValueAtTime(.11,t+.03),r.gain.exponentialRampToValueAtTime(5e-4,t+.19),n.connect(s),s.connect(r),r.connect(this.dryBus),n.start(t,Math.random(),.22),this._celestaPluck(ai(e?77:72),t+.02,.06,.7)}playClayPop(e=0){if(this.unlock(),!this.ctx||this.muted)return;let t=this.ctx.currentTime,n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="sine";let r=280+e%6*45;n.frequency.setValueAtTime(r,t),n.frequency.exponentialRampToValueAtTime(r*2.15,t+.075),s.gain.setValueAtTime(.14,t),s.gain.exponentialRampToValueAtTime(5e-4,t+.09),n.connect(s),s.connect(this.dryBus),n.start(t),n.stop(t+.1)}playBellChime(e=0){if(this.unlock(),!this.ctx||this.muted)return;let t=[65,67,69,72,74,77,81,84],n=t[e%t.length];this._musicBoxTine(ai(n),this.ctx.currentTime,.12)}playRatchetClick(e=1){if(this.unlock(),!this.ctx||this.muted)return;let t=this.ctx.currentTime,n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="triangle",n.frequency.setValueAtTime(920+Math.random()*180,t),n.frequency.exponentialRampToValueAtTime(320,t+.026),s.gain.setValueAtTime(.08*e,t),s.gain.exponentialRampToValueAtTime(5e-4,t+.03),n.connect(s),s.connect(this.dryBus),n.start(t),n.stop(t+.035)}playSnowWhoosh(e=.6){if(!this.ctx||this.muted||!this.noiseBuf)return;let t=this.ctx.currentTime,n=this.ctx.createBufferSource();n.buffer=this.noiseBuf;let s=this.ctx.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(520,t),s.frequency.linearRampToValueAtTime(1200,t+.18),s.Q.value=1.4;let r=this.ctx.createGain();r.gain.setValueAtTime(.001,t),r.gain.linearRampToValueAtTime(.07*e,t+.08),r.gain.exponentialRampToValueAtTime(5e-4,t+.42),n.connect(s),s.connect(r),r.connect(this.reverb),n.start(t,Math.random(),.45)}playCrystalHarmonica(e=0){if(this.unlock(),!this.ctx||this.muted)return;let t=[69,72,74,76,77,81,84,88],n=ai(t[e%t.length]),s=this.ctx.currentTime;this._glassPad(n,s,.09,1.8),this._celestaPluck(n*2,s,.045,.9)}playSigilAwaken(){if(this.unlock(),!this.ctx||this.muted)return;let e=this.ctx.currentTime;[65,69,72,76,77,81,84,88,93].forEach((n,s)=>{this._musicBoxTine(ai(n),e+s*.055,.095)}),this._glassPad(ai(77),e+.15,.08,2.8)}};var hl=Math.PI/180,Zu=new R,$r=new R,ci=class{constructor(e,t,{parallaxX:n=.72,parallaxY:s=.42,minZoom:r=.56,maxZoom:o=1.18,maxAzimuthDeg:a=32,minPolarDeg:c=-10,maxPolarDeg:l=22}={}){this.baseLook=t.clone(),$r.copy(e).sub(t),this.baseDist=$r.length(),this.baseAzimuth=Math.atan2($r.x,$r.z),this.basePolar=Math.asin(Ut($r.y/Math.max(this.baseDist,1e-4),-.98,.98)),this.parallaxX=n,this.parallaxY=s,this.minZoom=r,this.maxZoom=o,this.maxAzimuth=a*hl,this.minPolar=c*hl,this.maxPolar=l*hl,this.rawZoom=1,this.zoomSpring=new vt(1,95,16),this.userAzimuth=0,this.userPolar=0,this.azimuthSpring=new vt(0,82,15),this.polarSpring=new vt(0,82,15),this.orbitHoldTimer=0,this.isOrbitDragging=!1,this.lastOrbitPtr={x:0,y:0},this.focusLookOffset=new R,this.focusZoomFactor=1,this.focusTimer=0,this.posSpring=new qr(e.x,e.y,e.z,78,15),this.lookSpring=new qr(t.x,t.y,t.z,86,16),this.currentFocusDist=this.baseDist}focusOn(e,t,n,s=.78,r=1.65){this.focusLookOffset.set(e,t,n),this.focusZoomFactor=s,this.focusTimer=r}onWheel(e){let t=Ut(e*85e-5,-.14,.14);this.rawZoom=Ut(this.rawZoom+t,this.minZoom-.08,this.maxZoom+.08);let n=Yr(this.rawZoom,this.minZoom,this.maxZoom,.06);this.zoomSpring.target=n}onPinchScale(e){e<=0||(this.rawZoom=Ut(this.rawZoom/e,this.minZoom-.06,this.maxZoom+.06),this.zoomSpring.target=Yr(this.rawZoom,this.minZoom,this.maxZoom,.06))}beginOrbitDrag(e){this.isOrbitDragging=!0,this.lastOrbitPtr.x=e.x,this.lastOrbitPtr.y=e.y,this.orbitHoldTimer=2}moveOrbitDrag(e){if(!this.isOrbitDragging)return!1;let t=e.x-this.lastOrbitPtr.x,n=e.y-this.lastOrbitPtr.y;return this.lastOrbitPtr.x=e.x,this.lastOrbitPtr.y=e.y,this.userAzimuth=Yr(this.userAzimuth-t*1.45,-this.maxAzimuth,this.maxAzimuth,.1),this.userPolar=Yr(this.userPolar-n*1.05,this.minPolar,this.maxPolar,.08),this.azimuthSpring.target=this.userAzimuth,this.polarSpring.target=this.userPolar,this.orbitHoldTimer=2,!0}endOrbitDrag(){this.isOrbitDragging=!1,this.userAzimuth=Ut(this.userAzimuth,-this.maxAzimuth,this.maxAzimuth),this.userPolar=Ut(this.userPolar,this.minPolar,this.maxPolar),this.azimuthSpring.target=this.userAzimuth,this.polarSpring.target=this.userPolar}resetFraming(){this.rawZoom=1,this.zoomSpring.target=1,this.userAzimuth=0,this.userPolar=0,this.azimuthSpring.target=0,this.polarSpring.target=0,this.focusTimer=0,this.focusLookOffset.set(0,0,0),this.focusZoomFactor=1}update(e,t){if(this.rawZoom<this.minZoom?(this.rawZoom+=(this.minZoom-this.rawZoom)*Math.min(1,e*10),this.zoomSpring.target=this.rawZoom):this.rawZoom>this.maxZoom&&(this.rawZoom+=(this.maxZoom-this.rawZoom)*Math.min(1,e*10),this.zoomSpring.target=this.rawZoom),!this.isOrbitDragging)if(this.orbitHoldTimer>0)this.orbitHoldTimer-=e;else{let p=Math.exp(-e*1.35);this.userAzimuth*=p,this.userPolar*=p,this.azimuthSpring.target=this.userAzimuth,this.polarSpring.target=this.userPolar}this.focusTimer>0&&(this.focusTimer-=e,this.focusTimer<=0&&(this.focusLookOffset.set(0,0,0),this.focusZoomFactor=1));let n=this.zoomSpring.update(e)*(this.focusTimer>0?this.focusZoomFactor:1),s=this.baseAzimuth+this.azimuthSpring.update(e)+t.x*.085*this.parallaxX,r=Ut(this.basePolar+this.polarSpring.update(e)+t.y*.062*this.parallaxY,-.35,1.28),o=this.baseDist*n,a=this.baseLook.x+this.focusLookOffset.x+t.x*.16*this.parallaxX,c=this.baseLook.y+this.focusLookOffset.y+t.y*.12*this.parallaxY,l=this.baseLook.z+this.focusLookOffset.z,h=Math.cos(r),u=a+Math.sin(s)*h*o,d=c+Math.sin(r)*o,f=l+Math.cos(s)*h*o;this.posSpring.setTarget(u,d,f),this.lookSpring.setTarget(a,c,l),this.posSpring.update(e),this.lookSpring.update(e);let g=this.posSpring.sx.x-this.lookSpring.sx.x,x=this.posSpring.sy.x-this.lookSpring.sy.x,m=this.posSpring.sz.x-this.lookSpring.sz.x;this.currentFocusDist=Math.hypot(g,x,m)}apply(e){this.posSpring.copyTo(e.position),this.lookSpring.copyTo(Zu),e.lookAt(Zu)}getFocusDistance(){return this.currentFocusDist}};var oy=new R;function Rn(i,e=.028,t=.005,n=18){return new Jn(i,{depth:e,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:t,bevelThickness:t,curveSegments:n})}function ua(i,e,t=5){let n=new Wt;n.moveTo(0,0),n.lineTo(i*.14,0),n.lineTo(i*.14,e*.1);for(let s=0;s<t;s++){let r=s/t,o=(s+1)/t,a=e*(.1+r*.84),c=e*(.1+o*.9),l=i*(1-r*.7),h=i*(1-o*.74)*.38;n.quadraticCurveTo(l*.7,a-.03*e,l,a),s<t-1?n.quadraticCurveTo(l*.65,c*.92,h,c*.95):n.quadraticCurveTo(l*.42,e*.94,0,e)}n.closePath();for(let s=0;s<2;s++){let r=e*(.34+s*.28),o=i*(.14-s*.03),a=new Vt;a.moveTo(i*.08,r),a.lineTo(i*.08+o,r+o*1.3),a.lineTo(i*.08+o*1.9,r),a.lineTo(i*.08+o,r-o*1.3),a.closePath(),n.holes.push(a)}return n}function wv(i=1){let e=new Wt;e.moveTo(-.56*i,-.08*i),e.bezierCurveTo(-.74*i,-.22*i,-.88*i,-.44*i,-.84*i,-.52*i),e.bezierCurveTo(-.78*i,-.54*i,-.62*i,-.32*i,-.44*i,-.18*i),e.bezierCurveTo(-.18*i,-.22*i,.16*i,-.18*i,.36*i,-.12*i),e.bezierCurveTo(.54*i,-.28*i,.72*i,-.44*i,.78*i,-.38*i),e.bezierCurveTo(.76*i,-.3*i,.56*i,-.14*i,.44*i,.02*i),e.bezierCurveTo(.52*i,.22*i,.58*i,.36*i,.74*i,.38*i),e.bezierCurveTo(.78*i,.44*i,.66*i,.5*i,.5*i,.48*i),e.bezierCurveTo(.42*i,.56*i,.32*i,.54*i,.36*i,.42*i),e.bezierCurveTo(.3*i,.24*i,.18*i,.12*i,-.06*i,.12*i),e.bezierCurveTo(-.32*i,.12*i,-.52*i,.2*i,-.64*i,.26*i),e.bezierCurveTo(-.68*i,.18*i,-.62*i,.04*i,-.56*i,-.08*i),e.closePath();let t=new Vt;return t.absellipse(-.04*i,-.02*i,.18*i,.075*i,0,Math.PI*2,!0,.12),e.holes.push(t),e}function Ju(i=1){let e=new Wt;return e.moveTo(-.03*i,0),e.bezierCurveTo(-.18*i,.14*i,-.28*i,.32*i,-.22*i,.48*i),e.lineTo(-.16*i,.44*i),e.lineTo(-.12*i,.3*i),e.lineTo(-.04*i,.46*i),e.lineTo(.02*i,.44*i),e.lineTo(.02*i,.24*i),e.lineTo(.14*i,.38*i),e.lineTo(.19*i,.34*i),e.bezierCurveTo(.14*i,.18*i,.08*i,.08*i,.03*i,0),e.closePath(),e}function $u(i=1){let e=new Wt;e.moveTo(-.92*i,-.18*i),e.bezierCurveTo(-1.06*i,.18*i,-.88*i,.48*i,-.56*i,.44*i),e.bezierCurveTo(-.34*i,.4*i,-.24*i,.22*i,.04*i,.22*i),e.bezierCurveTo(.32*i,.22*i,.56*i,.38*i,.78*i,.34*i),e.bezierCurveTo(.98*i,.3*i,1.04*i,.02*i,.86*i,-.18*i),e.lineTo(-.92*i,-.18*i),e.closePath();let t=new Vt;t.absarc(-.46*i,.12*i,.11*i,0,Math.PI*2,!0);let n=new Vt;return n.absarc(.38*i,.08*i,.09*i,0,Math.PI*2,!0),e.holes.push(t,n),e}function Ku({envMap:i,textures:e,audio:t,onAwaken:n,onHint:s}){let r=new In;r.background=new Ce(722953),r.environment=i;let o=new ci(new R(0,4.25,9.05),new R(0,1.58,-.3),{parallaxX:.78,parallaxY:.45,minZoom:.56,maxZoom:1.18});r.add(new ri(2831442,.82));let a=new wn(16769712,2.55);a.position.set(5.6,9.6,6.4),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.near=2,a.shadow.camera.far=24,a.shadow.camera.left=-7.6,a.shadow.camera.right=7.6,a.shadow.camera.top=7.4,a.shadow.camera.bottom=-4.5,a.shadow.bias=-5e-4,a.shadow.radius=3.2,r.add(a);let c=new wn(7247359,1.18);c.position.set(-6.5,6.2,-5.5),r.add(c);let l=new R(0,1.35,-.15),h=new Gn(16754239,1.35,9.8,1.6);h.position.copy(l),r.add(h);let u=new Gn(16752184,1.55,8.2,1.7);u.position.set(-3.85,1.42,2.38),r.add(u);let d=(L,se=.84,P=.42)=>{let Q=new an({color:L,map:e.paperTex,bumpMap:e.paperTex,bumpScale:.018,roughness:se,metalness:.02,envMapIntensity:.68});return Xu(Q,{lightPos:l,strength:P})},f=d(16182748,.83,.48),g=d(16578800,.79,.44),x=d(1455144,.85,.3),m=d(2313018,.84,.34),p=d(4657177,.75,.22),T=d(1121851,.82,.25),v=new bt({map:e.walnutTex,bumpMap:e.walnutTex,bumpScale:.008,roughness:.42,metalness:.04,clearcoat:.38,clearcoatRoughness:.28,envMapIntensity:.95}),E=oi(new bt({color:16044934,roughnessMap:e.brassTex,metalness:.96,roughness:.19,clearcoat:.35,clearcoatRoughness:.18,envMapIntensity:2.45}),{anisoStrength:.42,patinaStrength:.18}),I=new bt({color:16248536,roughness:.34,clearcoat:.45,sheen:.4,sheenColor:new Ce(16766617)}),b=new an({color:16770733,emissive:new Ce(16751668),emissiveIntensity:.85,roughness:.38}),A=new B(new Tn(36,26),v);A.rotation.x=-Math.PI*.5,A.position.y=-.18,A.receiveShadow=!0,r.add(A);let F=new ot;F.position.set(-3.85,-.18,2.38),r.add(F);let M=[new pe(0,0),new pe(.58,0),new pe(.55,.06),new pe(.38,.12),new pe(.14,.22),new pe(.22,.46),new pe(.11,.72),new pe(.34,.8),new pe(.36,.86),new pe(.19,.86),new pe(.19,.78)],S=[new is(M,36)];S.push(H(new mt(.18,.024,10,24),{x:-.44,y:.22})),S.push(H(new $t(.065,1.35,4),{x:11.15,y:.03,z:.2,rz:Math.PI*.5,ry:.38,sy:1,sz:.28})),S.push(H(new mt(.11,.022,8,20),{x:11.82,y:.04,z:-.06,rx:Math.PI*.5}));let k=new B(Be(S),E);k.castShadow=!0,k.receiveShadow=!0,F.add(k);let Z=[H(new nt(.165,.175,.68,24),{y:1.14})];for(let L=0;L<5;L++){let se=L*1.25+.4,P=.16+L%3*.11;Z.push(H(new Zn(.022,P,6,10),{x:Math.cos(se)*.168,y:1.42-P*.5,z:Math.sin(se)*.168}))}let ae=new B(Be(Z),I);ae.castShadow=!0,F.add(ae);let U=Wu(),O=new $t(.068,.28,16,10);O.translate(0,.14,0);let X=new B(O,U);X.position.y=1.49,F.add(X);let ue=[],ee=[];for(let L=0;L<7;L++){let se=-.5+L*.24;ue.push(H(new $t(.14,.55,5),{x:5.55+Math.cos(se)*.35,y:-.13,z:-2.15+Math.sin(se)*.35,rx:Math.PI*.48,ry:se,sz:.22}))}for(let L=0;L<6;L++)ee.push(H(new Qe(.055,10,8),{x:5.45+L%3*.13,y:-.11,z:-2.05+Math.floor(L/3)*.14}));r.add(new B(Be(ue),x)),r.add(new B(Be(ee),p));let ne=ur({color:16763514,opacity:.095,power:2.3}),oe=new B(new nt(.35,2.65,8.2,24,1,!0),ne);oe.position.set(-1.6,2.85,.65),oe.rotation.z=-.58,oe.rotation.x=.18,r.add(oe);let ce=new ot;r.add(ce);let be=new vt(.18,52,11);be.target=1;let q=5.45,j=6.85,Se=.09,Ne=[H(new $e(q,Se,j),{x:-q*.5-.04,y:-.11}),H(new $e(q,Se,j),{x:q*.5+.04,y:-.11}),H(new nt(.15,.15,j,16,1,!1,0,Math.PI),{y:-.09,rx:Math.PI*.5,rz:Math.PI})],Re=new Sn([new R(0,.02,1.2),new R(.18,.03,3.22),new R(.32,-.15,3.68),new R(.46,-.165,4.35)]);Ne.push(new En(Re,28,.055,6,!1));let Ue=new B(Be(Ne),p);Ue.receiveShadow=!0,Ue.castShadow=!0,ce.add(Ue);let ke=[];for(let L=0;L<12;L++){let se=L/11,P=se*.11+L%2*.014,Q=-.065+se*.085;ke.push(H(new $e(10.42-P*2,.008,6.46-P*1.4),{y:Q}))}let W=new Wt;W.moveTo(-5.12,.01),W.quadraticCurveTo(-2.5,.1,0,.005),W.quadraticCurveTo(2.5,.1,5.12,.01),W.lineTo(5.12,-.03),W.lineTo(-5.12,-.03),W.closePath();let ge=new Jn(W,{depth:6.32,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,steps:1});ge.center(),H(ge,{y:.025}),ke.push(ge);let C=new B(Be(ke),f);C.receiveShadow=!0,C.castShadow=!0,ce.add(C);let fe=[H(new $e(9.8,.008,.035),{y:.056,z:-2.92}),H(new $e(9.8,.008,.035),{y:.056,z:2.92}),H(new $e(.035,.008,5.88),{x:-4.9,y:.056}),H(new $e(.035,.008,5.88),{x:4.9,y:.056}),H(Ln({points:4,outerRadius:.11,innerRadius:.045,depth:.02}),{x:.46,y:-.155,z:4.42,rx:Math.PI*.5})];for(let L of[-1,1])for(let se of[-1,1]){let P=new Wt;P.moveTo(0,0),P.lineTo(.42,0),P.quadraticCurveTo(.18,.18,0,.42),P.closePath();let Q=new Vt;Q.absarc(.12,.12,.05,0,Math.PI*2,!0),P.holes.push(Q);let xe=Rn(P,.025,.004,8);xe.rotateX(-Math.PI*.5),H(xe,{x:L*5.48,y:-.05,z:se*3.41,ry:L<0?se<0?0:Math.PI*.5:se<0?-Math.PI*.5:Math.PI}),fe.push(xe)}ce.add(new B(Be(fe),E));let V=new ot;V.position.y=.04,ce.add(V);let re=[];for(let L of[-1,1])for(let se=0;se<3;se++){let P=-1.8+se*1.45;re.push(H(new $e(.55,.014,.42),{x:L*4.25,y:.18,z:P,rz:L*.48}),H(new $e(.55,.014,.42),{x:L*4.25,y:.42,z:P,rz:-L*.48}))}V.add(new B(Be(re),f));let Y=[],Ae=new Wt;Ae.moveTo(-4.45,0),Ae.lineTo(-4.45,2.85),Ae.bezierCurveTo(-4.45,4.95,-1.6,5.28,0,5.32),Ae.bezierCurveTo(1.6,5.28,4.45,4.95,4.45,2.85),Ae.lineTo(4.45,0),Ae.closePath();let Me=new Vt;Me.absarc(0,3.35,1.48,0,Math.PI*2,!0),Ae.holes.push(Me);for(let L of[-1,1]){let se=new Vt;se.absarc(L*3.15,3.55,.26,0,Math.PI*2,!0),Ae.holes.push(se)}let _=new B(Rn(Ae,.042,.008),T);_.position.set(0,0,-2.35),_.castShadow=!0,_.receiveShadow=!0,V.add(_);let y=new ot;y.position.set(0,3.35,-2.44),V.add(y);let N=new an({map:e.volvelleTex,roughness:.36,metalness:.42,envMapIntensity:1.65}),de=new B(new nt(1.76,1.76,.03,64),N);de.rotation.x=Math.PI*.5,y.add(de);let le=[H(new Qe(.09,18,14),{z:.03})];for(let L=0;L<12;L++){let se=L/12*Math.PI*2;le.push(H(new nt(.095,.095,.045,14),{x:Math.cos(se)*1.74,y:Math.sin(se)*1.74,z:.01,rx:Math.PI*.5}))}y.add(new B(Be(le),E)),de.userData={kind:"volvelle",label:"\u62E8\u52A8\u661F\u8C61\u8F6C\u76D8 \xB7 \u5C06\u5317\u6781\u661F\u523B\u5EA6\u8F6C\u81F3\u6B63\u4E0A\u65B9\u6307\u9488"},Y.push(de);let ie=new Wt;ie.moveTo(-4.35,0),ie.bezierCurveTo(-4,1.4,-3.65,2.45,-3.25,2.42),ie.bezierCurveTo(-2.85,2.38,-2.55,1.48,-2.15,1.52),ie.bezierCurveTo(-1.65,1.58,-1.25,2.95,-.82,2.92),ie.bezierCurveTo(-.38,2.88,-.05,1.65,.42,1.68),ie.bezierCurveTo(.95,1.72,1.45,3.05,1.92,3.02),ie.bezierCurveTo(2.42,2.98,2.85,1.82,3.28,1.85),ie.bezierCurveTo(3.68,1.88,4.05,2.38,4.35,2.22),ie.lineTo(4.35,0),ie.closePath();let Pe=new B(Rn(ie,.032,.006,22),g);Pe.position.set(0,0,-1.78),Pe.castShadow=!0,Pe.receiveShadow=!0,V.add(Pe);let ve=new ot;ve.position.set(0,.6,-1.35),V.add(ve);let ye=new ot;ve.add(ye);let ze=new B(Rn($u(.56),.042,.007),p);ye.add(ze);let it=[H(Rn($u(.58),.018,.004),{z:-.012}),H(new mt(.16,.014,8,24,Math.PI*1.25),{x:.48,y:-.14,z:.02}),H(new $e(1.08,.018,.03),{x:-.05,y:-.22,z:.02}),H(new $e(.22,.22,.18),{x:-.16,y:.22,z:.02})],me=new cr(new R(.38,.14,.02),new R(1.28,-.02,.04),new R(2.28,.28,.02));it.push(new En(me,24,.009,6,!1)),ye.add(new B(Be(it),E));let ct=[],at=Rn(wv(.48),.028,.005,18),Ze=H(Rn(Ju(.46),.012,.002,12),{x:.22,y:.22,z:.015,ry:.46}),z=H(Rn(Ju(.46),.012,.002,12),{x:.22,y:.22,z:.015,ry:-.46}),te=Be([Ze,z],!0);for(let L=0;L<3;L++){let se=new ot;se.position.set(.84+L*.7,.06+L*.05,0);let P=new B(at,f),Q=new B(te,E);se.add(P,Q),ye.add(se),ct.push(se)}let He=36,We=new wt,Ie=new Float32Array(He*3);for(let L=0;L<He;L++)Ie[L*3+1]=-20;We.setAttribute("position",new yt(Ie,3));let De=new On(We,new Bn({map:e.sparkTex,color:16770204,size:.24,transparent:!0,opacity:.92,depthWrite:!1,blending:fn}));V.add(De);let he=0,D=[],we=[],Ee=[];we.push(H(new mt(1.5,.032,12,64),{y:3.35,z:-2.3}));let Xe=new Wt;Xe.moveTo(0,-.18),Xe.lineTo(-.09,.06),Xe.lineTo(.09,.06),Xe.closePath(),we.push(H(Rn(Xe,.02,.004,6),{y:4.86,z:-2.26}));let qe=(L,se,P,Q,xe,_e=!1)=>{let Le=new Wt;if(Le.moveTo(-P*.5,0),Le.lineTo(-P*.5,Q),_e?(Le.lineTo(-P*.28,Q+.22),Le.lineTo(-P*.28,Q+.68),Le.lineTo(0,Q+xe),Le.lineTo(P*.28,Q+.68),Le.lineTo(P*.28,Q+.22)):Le.lineTo(0,Q+xe),Le.lineTo(P*.5,Q),Le.lineTo(P*.5,0),Le.closePath(),_e){let Je=new Vt;Je.moveTo(-.18,.06),Je.lineTo(-.18,.42),Je.absarc(0,.42,.18,Math.PI,0,!0),Je.lineTo(.18,.06),Je.closePath(),Le.holes.push(Je);let Pt=1.28,St=new Vt;St.absarc(0,Pt,.085,0,Math.PI*2,!0),Le.holes.push(St);for(let Ve=0;Ve<8;Ve++){let tt=Ve/8*Math.PI*2,Oe=new Vt;Oe.absarc(Math.cos(tt)*.2,Pt+Math.sin(tt)*.2,.058,0,Math.PI*2,!0),Le.holes.push(Oe)}let gt=new Vt;gt.moveTo(-.15,Q+.18),gt.lineTo(-.15,Q+.52),gt.absarc(0,Q+.52,.15,Math.PI,0,!0),gt.lineTo(.15,Q+.18),gt.closePath(),Le.holes.push(gt),Ee.push(H(new Tn(.72,1.65),{x:L,y:.95,z:se-.01}));for(let Ve of[-1,1]){let tt=new Wt;tt.moveTo(0,0),tt.lineTo(Ve*.34,0),tt.lineTo(Ve*.12,Q*.85),tt.lineTo(0,Q*.92),tt.closePath();let Oe=new Vt;Oe.absarc(Ve*.14,Q*.38,.065,0,Math.PI*2,!0),tt.holes.push(Oe),D.push(H(Rn(tt,.026,.004,10),{x:L+Ve*P*.5,z:se}))}we.push(H(new _s(.28,.32,24),{x:L,y:Pt,z:se+.048}),H(Ln({points:8,outerRadius:.2,innerRadius:.07,depth:.05}),{x:L,y:Q+xe+.16,z:se+.02}))}else{for(let gt=0;gt<2;gt++){let Ve=(gt-.5)*(P*.44),tt=Q*.44,Oe=new Vt;Oe.moveTo(Ve-.12,tt-.14),Oe.lineTo(Ve-.12,tt+.06),Oe.absarc(Ve,tt+.06,.12,Math.PI,0,!0),Oe.lineTo(Ve+.12,tt-.14),Oe.closePath(),Le.holes.push(Oe)}let Je=new Vt;Je.absarc(0,Q+xe*.36,.085,0,Math.PI*2,!0),Le.holes.push(Je),Ee.push(H(new Tn(P*.78,Q*.85),{x:L,y:Q*.56,z:se-.01}));let Pt=Math.hypot(P*.54,xe),St=Math.atan2(xe,P*.5);for(let gt of[-1,1])we.push(H(new $e(Pt,.042,.055),{x:L+gt*P*.26,y:Q+xe*.5+.02,z:se+.02,rz:-gt*St}))}D.push(H(Rn(Le,.036,.007,16),{x:L,z:se}))};qe(0,-.65,1.32,1.98,1.55,!0),qe(-1.42,-.42,1.15,1.16,.7,!1),qe(1.44,-.46,1.18,1.22,.72,!1),qe(-2.55,-.18,.96,.96,.58,!1),qe(2.58,-.22,.98,1.02,.62,!1);let ht=new Wt;ht.moveTo(-1.48,0),ht.quadraticCurveTo(0,.72,1.48,0),ht.lineTo(1.48,.24),ht.quadraticCurveTo(0,.96,-1.48,.24),ht.closePath();for(let L=-3;L<=3;L++){let se=L*.34,P=.52-se*se*.22,Q=new Vt;Q.absarc(se,P,.045,0,Math.PI*2,!0),ht.holes.push(Q)}D.push(H(Rn(ht,.032,.005,18),{z:1.05})),we.push(H(new mt(1.56,.015,8,32,Math.PI*.58),{y:-.7,z:1.09,rz:Math.PI*.21}));let ft=new B(Be(D),f);ft.castShadow=!0,ft.receiveShadow=!0,V.add(ft),V.add(new B(Be(Ee),b));let ut=new B(new $t(.085,.16,16),E);ut.position.set(0,2.42,-.63),V.add(ut);let Gt=new B(new Tn(3.25,2.95),new bt({color:14281983,roughness:.14,metalness:.12,clearcoat:.85,envMapIntensity:1.95}));Gt.rotation.x=-Math.PI*.5,Gt.position.set(0,.032,1.15),V.add(Gt);let Et=[],Xt=[],nn=[[-3.85,1.75,.78,2.25,!0,!0],[-3.05,2.18,.62,1.68,!1,!1],[-2.15,1.88,.55,1.45,!0,!0],[3.75,1.72,.8,2.3,!0,!0],[2.95,2.15,.6,1.62,!1,!1],[2.05,1.92,.52,1.38,!0,!0],[-3.65,-.55,.72,2.05,!1,!0],[3.62,-.48,.74,2.12,!1,!0]];for(let[L,se,P,Q,xe,_e]of nn)(xe?Et:Xt).push(H(Rn(ua(P,Q,5),.022,.004,10),{x:L,z:se,ry:Math.PI-.52}),H(Rn(ua(P,Q,5),.022,.004,10),{x:L,z:se,ry:.52})),_e&&we.push(H(Rn(ua(P*1.03,Q*1.015,5),.01,.003,8),{x:L,z:se-.015,ry:Math.PI-.55}),H(Rn(ua(P*1.03,Q*1.015,5),.01,.003,8),{x:L,z:se-.015,ry:.55}));let Mi=new B(Be(Et),x);Mi.castShadow=!0,Mi.receiveShadow=!0;let Mn=new B(Be(Xt),m);Mn.castShadow=!0,Mn.receiveShadow=!0;let li=new B(Be(we),E);V.add(Mi,Mn,li);let gn=new ot;gn.position.set(4.55,.075,1.35),ce.add(gn);let Fn=new B(new $e(1.65,.024,.46),p);Fn.castShadow=!0;let Vn=new B(Be([H(new $e(1.68,.016,.5),{y:-.005}),H(new mt(.18,.028,12,32),{x:.92,rx:Math.PI*.5}),H(Ln({points:4,outerRadius:.13,innerRadius:.05,depth:.02}),{x:.42,y:.02,rx:Math.PI*.5})]),E),Wn=new Bt({color:16770204,transparent:!0,opacity:0,depthWrite:!1,blending:fn}),cn=new B(new _s(.2,.28,32),Wn);cn.rotation.x=-Math.PI*.5,cn.position.set(.92,.025,0),gn.add(Fn,Vn,cn);let At=new B(new $e(1.95,.38,.88),new Bt({visible:!1}));At.position.set(.3,.05,0),At.userData={kind:"pulltab",label:"\u5411\u53F3\u62C9\u52A8\u70EB\u91D1\u7EB8\u62C9\u6761 \xB7 \u653E\u98DE\u9542\u7A7A\u8DC3\u9E7F\u96EA\u6A47"},gn.add(At),Y.push(At);let qt=[],w=(L,se,P,Q,xe)=>{let _e=new ot;_e.position.set(L,se,P),V.add(_e);let Le=new an({color:16773058,emissive:new Ce(xe),emissiveIntensity:1.65,roughness:.3}),Je=new B(new ss(.24,24),Le);Je.position.set(.22,.24,-.01),_e.add(Je);let Pt=new B(Ln({points:6,outerRadius:.15,innerRadius:.06,depth:.045}),E);Pt.position.set(.22,.24,.02),Pt.scale.setScalar(.01),_e.add(Pt);let St=new ot;_e.add(St);let gt=new Wt;gt.moveTo(0,0),gt.lineTo(0,.34),gt.absarc(.22,.34,.22,Math.PI,0,!0),gt.lineTo(.44,0),gt.closePath();let Ve=new B(Rn(gt,.022,.004,12),p);Ve.position.z=.025,Ve.castShadow=!0;let tt=new B(new Qe(.035,12,10),E);tt.position.set(.36,.2,.055),St.add(Ve,tt);let Oe=new B(new $e(.62,.68,.32),new Bt({visible:!1}));Oe.position.set(.22,.26,.05);let lt={open:!1,spring:new vt(0,165,14),hinge:St,charm:Pt,alcoveMat:Le};Oe.userData={kind:"flap",flapObj:lt,label:Q},_e.add(Oe),Y.push(Oe),qt.push(lt)};w(-1.82,.02,1.52,"\u6380\u5F00\u677E\u6797\u6298\u9875\u5C0F\u95E8 \xB7 \u85CF\u7740\u91D1\u7B94\u661F\u5FBD",16755259),w(-.22,.04,-.58,"\u8F7B\u6572\u54E5\u7279\u949F\u697C\u62F1\u95E8 \xB7 \u70B9\u4EAE\u5723\u548F\u70DB\u706B",16761941),w(1.48,.02,1.48,"\u6380\u5F00\u6EAA\u7554\u96EA\u5C4B\u6298\u9875 \xB7 \u5BFB\u89C5\u51AC\u591C\u661F\u5149",16752192);let G=48,J=new wt,$=new Float32Array(G*3),K=new Float32Array(G);for(let L=0;L<G;L++)$[L*3]=(Math.random()-.5)*9.5,$[L*3+1]=.35+Math.random()*4.4,$[L*3+2]=(Math.random()-.5)*5.2,K[L]=Math.random()*Math.PI*2;J.setAttribute("position",new yt($,3)),r.add(new On(J,new Bn({map:e.sparkTex,color:16770728,size:.22,transparent:!0,opacity:.85,depthWrite:!1,blending:fn})));let Te=new vt(.12,125,15),Ge=new vt(.72,115,15),Ke=Math.round(.72/(Math.PI/12)),Ye=null,st=0,et=0,je=0,Mt=!1,Nt=!1,It=0,Tt=!1,dt=new B(Ln({points:8,outerRadius:.44,innerRadius:.16,depth:.12}),E);dt.position.set(0,5.58,-2.26),dt.scale.setScalar(.001),V.add(dt);let rt=new vt(0,140,12),rn=d(16777215,.8,.42);rn.vertexColors=!0;for(let L of ct)bn(L,rn,[],e.paperTex);for(let L of qt)bn(L.hinge,rn,[],e.paperTex);bn(ye,rn,ct,e.paperTex),bn(gn,rn,[cn],e.paperTex),bn(V,rn,[y,ve,ut,dt,...qt.flatMap(L=>[L.hinge,L.charm])],e.paperTex),$n(V,[y,ve,ut,dt,...qt.flatMap(L=>[L.hinge,L.charm])]),$n(r,[V,gn,X,oe]);function Ct(){return{current:(Mt?1:0)+(Nt?1:0)+(It>0?1:0),total:3}}function ln(){Tt||(Ct().current>=2||It>=2)&&(Tt=!0,rt.target=1,o.focusOn(0,1.35,-.6,.82,2.2),t.playSigilAwaken(),n(1,"\u7B2C\u4E00\u58F0\u90E8\u5DF2\u5524\u9192 \xB7 \u70EB\u91D1\u7EB8\u96D5\u7AD6\u7434\u4E0E\u94A2\u7247\u7434\u60A0\u626C\u594F\u54CD"),s("\u677E\u6797\u661F\u591C\u4E66\u5DF2\u70B9\u4EAE \xB7 \u53EF\u6EDA\u8F6E\u63A8\u8FD1\u7EC6\u8D4F\u9542\u7A7A\u9E7F\u89D2\u4E0E\u8721\u6CEA\uFF0C\u6216\u524D\u5F80\u7B2C\u4E8C\u5E55"))}function hi(L,se){if(!L)return!1;let{kind:P,flapObj:Q}=L.object.userData;return P==="pulltab"?(Ye="pulltab",st=se.x,et=Te.target,t.playPaperFold(!0),!0):P==="volvelle"?(Ye="volvelle",je=Math.atan2(se.y-.18,se.x),et=Ge.target,t.playRatchetClick(.7),!0):P==="flap"&&Q?(Q.open=!Q.open,Q.spring.target=Q.open?1:0,t.playPaperFold(Q.open),Q.open&&(It++,o.focusOn(L.point.x*.25,.1,.2,.86,1.5),ln()),!0):!1}function Xn(L){if(!Ye)return!1;if(Ye==="pulltab"){let se=(L.x-st)*2.35,P=Te.target,Q=Ut(et+se,0,1);return Te.target=Q,Q>=.98&&P<.98&&(Te.impulse(1.8),t.playRatchetClick(.9)),Q>.52&&!Mt&&(Mt=!0,t.playBellChime(4),ln()),!0}if(Ye==="volvelle"){let P=Math.atan2(L.y-.18,L.x)-je;P>Math.PI&&(P-=Math.PI*2),P<-Math.PI&&(P+=Math.PI*2);let Q=et-P*1.4;Ge.target=Q;let xe=Math.round(Q/(Math.PI/12));xe!==Ke&&(Ke=xe,t.playRatchetClick(.55));let _e=(Q%(Math.PI*2)+Math.PI*2)%(Math.PI*2);return(_e<.34||_e>Math.PI*2-.34)&&!Nt&&(Nt=!0,Ge.target=Math.round(Q/(Math.PI*2))*(Math.PI*2),t.playBellChime(6),ln()),!0}return!1}function Ti(){if(Ye==="volvelle"){let L=Math.PI/12;Ge.target=Math.round(Ge.target/L)*L}Ye=null}let jt=.12;function Dn(L,se,P){let Q=be.update(L);V.scale.y=Math.max(.05,Q),U.uniforms.uTime.value=se,ne.uniforms.uTime.value=se,u.intensity=1.38+Math.sin(se*7.8)*.12+Math.sin(se*14.3)*.06;let xe=Mt?0:Math.pow(Math.max(0,Math.sin(se*1.6)),4)*.65;Wn.opacity=xe;let _e=Te.update(L);gn.position.x=4.45+_e*.98;let Le=zt(-.82,.82,_e),Je=Le*2.65,Pt=2.48+(1-Le*Le)*1.18+Math.sin(se*2.2)*.05;ye.position.set(Je,Pt,0),ye.rotation.z=-Le*.34,Math.abs(_e-jt)>.0025&&(Ie[he*3]=Je-.55+(Math.random()-.5)*.18,Ie[he*3+1]=Pt+.45+(Math.random()-.5)*.18,Ie[he*3+2]=-1.32+(Math.random()-.5)*.12,he=(he+1)%He),jt=_e;for(let Oe=0;Oe<He;Oe++)Ie[Oe*3+1]>-10&&(Ie[Oe*3+1]-=L*.28,Ie[Oe*3+1]<.2&&(Ie[Oe*3+1]=-20));We.attributes.position.needsUpdate=!0;for(let Oe=0;Oe<ct.length;Oe++)ct[Oe].position.y=.06+Oe*.05+Math.sin(se*4.5+Oe*1.1+_e*8)*.055,ct[Oe].rotation.z=Math.sin(se*4.5+Oe)*.07;let St=Ge.update(L);de.rotation.y=St,ut.rotation.z=Math.sin(se*3.2)*(Tt?.18:.05);for(let Oe=0;Oe<qt.length;Oe++){let lt=qt[Oe],yr=lt.spring.update(L);lt.hinge.rotation.y=-yr*2.15,lt.charm.scale.setScalar(Math.max(.01,yr)),lt.charm.rotation.y=se*1.6+Oe,lt.alcoveMat.emissiveIntensity=lt.open?2.1:1.35+Math.sin(se*2.4+Oe)*.35}let gt=rt.update(L);dt.scale.setScalar(Math.max(.001,gt)),dt.rotation.y=se*.9;let Ve=.88+.12*Math.sin(se*6.3)*Math.cos(se*10.7);h.intensity=(Tt?2.15:1.25)*Ve,b.emissiveIntensity=(Tt?1.35:.82)*Ve;let tt=J.attributes.position.array;for(let Oe=0;Oe<G;Oe++)tt[Oe*3+1]+=L*.14,tt[Oe*3]+=Math.sin(se*.8+K[Oe])*L*.08,tt[Oe*3+1]>5&&(tt[Oe*3+1]=.25);J.attributes.position.needsUpdate=!0,o.update(L,P)}function Li(L){o.apply(L)}function un(L){be.snap(1),(L==="hero"||L==="climax")&&(Te.snap(.68),Ge.snap(0),qt[0].open=!0,qt[0].spring.snap(1),Tt=!0,rt.snap(1)),Dn(.016,2.4,{x:.08,y:.04})}return{id:1,roman:"ACT I",title:"\u677E\u6797\u661F\u591C\u4E66",subtitle:"\u70EB\u91D1\u7ACB\u4F53\u6298\u7EB8\u5267\u573A \xB7 GILDED POP-UP DIORAMA",defaultHint:"\u5411\u53F3\u62C9\u52A8\u7EB8\u62C9\u6761\u653E\u98DE\u96EA\u6A47 \xB7 \u62E8\u52A8\u661F\u8C61\u76D8 \xB7 \u6EDA\u8F6E\u53EF\u63A8\u8FD1\u7EC6\u8D4F\u7EB8\u96D5\u4E0E\u70DB\u53F0",transTint:new Ce(16763514),cameraRig:o,getProgress:Ct,getPostOpts:()=>({bloomStrength:.44,bloomThreshold:.82,starburst:.2,focusDist:o.getFocusDistance(),aperture:.5,aoStrength:.85,aoRadius:.36}),scene:r,interactables:Y,onPointerDown:hi,onPointerMove:Xn,onPointerUp:Ti,update:Dn,applyCamera:Li,setCaptureState:un}}var ju=new R,ul=new R,bv=new R(0,1,0),Qu=new ii;function ed({envMap:i,textures:e,audio:t,onAwaken:n,onHint:s}){let r=new In;r.background=new Ce(1379600),r.environment=i;let o=new ci(new R(0,2.72,9.55),new R(0,2.42,0),{parallaxX:.72,parallaxY:.42,minZoom:.56,maxZoom:1.18});r.add(new ri(4994107,.95));let a=new wn(16773336,2.38);a.position.set(4.8,9.2,7.5),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.near=2,a.shadow.camera.far=22,a.shadow.camera.left=-6.8,a.shadow.camera.right=6.8,a.shadow.camera.top=7.5,a.shadow.camera.bottom=-2.5,a.shadow.bias=-5e-4,a.shadow.radius=3.6,r.add(a);let c=new wn(10668287,.85);c.position.set(-6.5,4.5,5),r.add(c);let l=new Gn(16743209,1.55,6.8,1.6);l.position.set(-1.72,.78,.35),r.add(l);let h=(P,Q=.72)=>aa(new bt({color:P,bumpMap:e.clayBump,bumpScale:.022,roughness:Q,metalness:.01,sheen:.35,sheenRoughness:.85,sheenColor:new Ce(16771286),envMapIntensity:.78}),{ridgeScale:44,ridgeStrength:.055,icingScatter:.14}),u=P=>new bt({color:P,bumpMap:e.paperTex,bumpScale:.028,roughness:.92,sheen:1,sheenRoughness:.76,sheenColor:new Ce(16774634),envMapIntensity:.65}),d=h(10377780,.75),f=h(7092509,.78),g=h(3562326,.75),x=h(8928070,.75),m=h(15654085,.74),p=h(16109492,.68),T=h(15891748,.58),v=h(1775125,.55),E=aa(new bt({color:16644336,bumpMap:e.clayBump,bumpScale:.007,roughness:.22,clearcoat:.9,clearcoatRoughness:.12,envMapIntensity:1.32}),{ridgeScale:28,ridgeStrength:.018,icingScatter:.26}),I=new bt({map:e.candyStripeTex,roughness:.2,clearcoat:.88,clearcoatRoughness:.1,envMapIntensity:1.25}),b=oi(new bt({color:15911544,roughnessMap:e.brassTex,metalness:.94,roughness:.22,envMapIntensity:2.25}),{anisoStrength:.36,patinaStrength:.18}),A=new bt({color:14677759,roughness:.12,metalness:.1,transparent:!0,opacity:.42,clearcoat:1,envMapIntensity:2.2}),F=u(12857912),M=u(2645574),S=u(16315112),k=u(4927010),Z=new bt({map:e.plaidTex,bumpMap:e.paperTex,bumpScale:.022,roughness:.9,sheen:.95,sheenColor:new Ce(16770764)}),ae=new ot;r.add(ae);let U=new B(new nt(6.9,7.3,.36,48),h(2496534,.65));U.position.y=-.22,U.receiveShadow=!0,ae.add(U);let O=5.4,X=1.65,ue=3.25,ee=1.78,ne=[],oe=[],ce=[H(Ht(7.9,.26,4.5,.35,.09),{y:.02,rx:Math.PI*.5})],be=[],q=[],j=[],Se=new B(new $e(O-.16,1.58,.12),x);Se.position.set(0,.86,-ee*.5),Se.receiveShadow=!0;let Ne=new B(new $e(O-.16,1.55,.12),g);Ne.position.set(0,2.45,-ee*.5),Ne.receiveShadow=!0;let Re=new Wt;Re.moveTo(-O*.5,0),Re.lineTo(O*.5,0),Re.lineTo(0,1.98),Re.closePath();let Ue=new B(new Jn(Re,{depth:.12,bevelEnabled:!1}),m);Ue.position.set(0,3.22,-ee*.5-.06),Ue.receiveShadow=!0,ae.add(Se,Ne,Ue);let ke=[H(new nt(.32,.32,.12,24),{y:5.18,z:ee*.5+.16,rx:Math.PI*.5})];for(let P of[-1,1])ne.push(H(Ht(.18,3.25,ee,.04,.03),{x:P*(O*.5-.06),y:1.66})),ke.push(H(new nt(.095,.095,3.22,20),{x:P*(O*.5+.02),y:1.66,z:ee*.5-.06}));for(let P of[.08,X,ue])oe.push(H(Ht(O+.18,.14,ee+.14,.04,.03),{y:P})),ce.push(ll(new R(-O*.5,P+.06,ee*.5+.08),new R(O*.5,P+.06,ee*.5+.08),{beads:26,radius:.038}));let W=Math.hypot(O*.56,2.05),ge=Math.atan2(2.05,O*.56);for(let P of[-1,1]){let Q=P*O*.27,xe=4.22,_e=-P*ge;ne.push(H(Ht(W,.16,ee+.36,.05,.04),{x:Q,y:xe,z:.04,rz:_e})),ce.push(H(Ht(W+.08,.11,ee+.44,.05,.045),{x:Q-Math.sin(_e)*.09,y:xe+Math.cos(_e)*.09,z:.04,rz:_e})),ce.push(ll(new R(0,5.22,ee*.5+.24),new R(P*(O*.5+.35),3.16,ee*.5+.24),{beads:18,radius:.046}));for(let Le=0;Le<9;Le++){let Je=(Le+.5)/9,Pt=zt(.12*P,P*(O*.5+.28),Je),St=zt(5.12,3.18,Je);ce.push(H(new Zn(.048,.08+Le%2*.05,6,10),{x:Pt,y:St-.12,z:ee*.5+.22}))}}q.push(H(new mt(.26,.075,10,24),{y:4.42,z:ee*.5+.14}));for(let P=0;P<6;P++){let Q=P/6*Math.PI*2;j.push(H(new Qe(.04,8,8),{x:Math.cos(Q)*.26,y:4.42+Math.sin(Q)*.26,z:ee*.5+.205}))}let C=[],fe=new ot;fe.position.set(1.78,4.55,.08),ae.add(fe);let V=[Ht(.6,.92,.6,.05,.03)];for(let P=0;P<4;P++)for(let Q=-1;Q<=1;Q+=2)V.push(H(Ht(.24,.13,.06,.02,.01),{x:Q*.14+P%2*.05,y:-.28+P*.19,z:.3}));let re=new B(Be(V),x);re.castShadow=!0;let Y=new B(new mt(.3,.095,10,22),E);Y.rotation.x=Math.PI*.5,Y.position.y=.46;let Ae=new B(new Qe(.175,24,20),I);Ae.position.y=.64,fe.add(re,Y,Ae);let Me=new B(new $e(.98,1.38,.98),new Bt({visible:!1}));Me.position.y=.35,Me.userData={kind:"chimney",label:"\u70B9\u51FB\u70DF\u56F1 \xB7 \u6295\u9012\u8584\u8377\u7CD6\u7403\u5F00\u542F\u4E09\u5C42\u8FC7\u5C71\u8F66\u8FDE\u9501\u673A\u5173"},fe.add(Me),C.push(Me);let _=[16729927,16761917,3991196,5679359],y=[],N=[];for(let P=0;P<=20;P++){let Q=P/20,xe=zt(-2.68,2.92,Q),_e=Math.sin(Q*Math.PI)*.18+Math.sin(Q*Math.PI*5)*.015;N.push(new R(xe,3.18-_e,ee*.5+.09))}let de=new Sn(N);q.push(new En(de,56,.014,6,!1));let le=new $t(.058,.135,10);le.rotateX(Math.PI);let ie=new bt({color:16777215,emissive:new Ce(16777215),emissiveIntensity:.2,roughness:.16,clearcoat:.9});ie.onBeforeCompile=P=>{P.fragmentShader=P.fragmentShader.replace("vec3 totalEmissiveRadiance = emissive;","vec3 totalEmissiveRadiance = emissive * diffuseColor.rgb;")};let Pe=new xi(le,ie,11),ve=new sn,ye=new Ce;for(let P=0;P<11;P++){let Q=(P+.5)/11,xe=de.getPoint(Q);be.push(H(new nt(.032,.026,.055,10),{x:xe.x,y:xe.y-.02,z:xe.z})),ve.position.set(xe.x,xe.y-.095,xe.z),ve.updateMatrix(),Pe.setMatrixAt(P,ve.matrix),ye.setHex(_[P%_.length]),Pe.setColorAt(P,ye),y.push({x:xe.x,baseY:xe.y-.095,z:xe.z})}Pe.instanceMatrix.needsUpdate=!0,Pe.instanceColor&&(Pe.instanceColor.needsUpdate=!0),ae.add(Pe);let ze=new ot;ze.position.set(2.94,3.16,ee*.5+.08),ae.add(ze);let it=new B(new nt(.019,.019,1,8),S);it.geometry.translate(0,-.5,0);let me=new ot;me.position.y=-1.08;let ct=new B(new Qe(.15,18,14),F),at=new B(new mt(.062,.016,8,18),b);at.position.y=.14,me.add(ct,at),ze.add(it,me);let Ze=new B(new $e(.7,1.65,.7),new Bt({visible:!1}));Ze.position.y=-.72,Ze.userData={kind:"cord",label:"\u5411\u4E0B\u62FD\u52A8\u6BDB\u6BE1\u7EA2\u7ED2\u7403 \xB7 \u70B9\u4EAE\u5168\u5C4B\u590D\u53E4\u5F69\u706F"},ze.add(Ze),C.push(Ze),oe.push(H(Ht(3.35,.08,.38,.03,.02),{x:.18,y:3.74,z:.18,rz:.15}));let z=[];for(let P=0;P<4;P++){let Q=1.18-P*.76,xe=4.18-P*.11,_e=new ot;_e.position.set(Q,xe,.18);let Le=new B(Be([H(new $t(.115,.2,16),{y:-.1}),H(new mt(.112,.016,8,18),{y:-.2,rx:Math.PI*.5}),H(new Qe(.036,10,8),{y:-.22})]),b);_e.add(Le),ae.add(_e),z.push({pivot:_e,swing:new vt(0,215,9),hitInRun:!1,x:Q,y:xe-.18})}let te=new B(new $t(.32,.42,24,1,!0),A);te.rotation.x=Math.PI,te.position.set(-1.62,3.38,.22),ae.add(te),be.push(H(new mt(.32,.022,8,24),{x:-1.62,y:3.59,z:.22,rx:Math.PI*.5}));let He=[new R(1.78,5.05,.12),new R(1.62,4.08,.18),new R(.42,3.89,.18),new R(-.95,3.68,.18),new R(-1.62,3.48,.22),new R(-2.88,2.85,.58),new R(-3.12,2.02,.68),new R(-2.65,1.15,.52),new R(-1.15,.36,.18),new R(-.62,.34,.18)],We=new Sn(He,!1,"catmullrom",.38),Ie=[],De=[];for(let P=0;P<=32;P++){let Q=zt(.45,.9,P/32),xe=We.getPoint(Q);Ie.push(new R(xe.x,xe.y-.11,xe.z-.085)),De.push(new R(xe.x,xe.y-.11,xe.z+.085)),P%5===0&&be.push(H(new $e(.05,.03,.24),{x:xe.x,y:xe.y-.13,z:xe.z}))}ke.push(new En(new Sn(Ie),44,.024,8,!1),new En(new Sn(De),44,.024,8,!1));let he=new B(new Qe(.17,24,20),I);he.castShadow=!0,he.visible=!1,ae.add(he);let D=36,we=new wt,Ee=new Float32Array(D*3),Xe=new Float32Array(D*3);for(let P=0;P<D;P++)Ee[P*3+1]=-20;we.setAttribute("position",new yt(Ee,3));let qe=new On(we,new Bn({map:e.sparkTex,color:16773320,size:.24,transparent:!0,opacity:.95,depthWrite:!1,blending:fn}));ae.add(qe);let ht=0;function ft(P,Q,xe,_e=7){for(let Le=0;Le<_e;Le++){let Je=ht;ht=(ht+1)%D,Ee[Je*3]=P,Ee[Je*3+1]=Q,Ee[Je*3+2]=xe,Xe[Je*3]=(Math.random()-.5)*2.2,Xe[Je*3+1]=.8+Math.random()*1.8,Xe[Je*3+2]=(Math.random()-.2)*1.6}}let ut=[],Gt=["nutcracker","penguin","snowman"],Et=["\u6572\u5F00 I \u53F7\u76F2\u76D2\u95E8 \xB7 \u5524\u9192\u80E1\u987B\u656C\u793C\u80E1\u6843\u5939\u5B50","\u6572\u5F00 II \u53F7\u76F2\u76D2\u95E8 \xB7 \u5524\u9192\u9001\u4FE1\u5C0F\u4F01\u9E45\u90AE\u5DEE","\u6572\u5F00 III \u53F7\u76F2\u76D2\u95E8 \xB7 \u5524\u9192\u59DC\u997C\u5927\u53A8\u96EA\u4EBA"];function Xt(P){let Q=new ot,xe=[],_e=[],Le=null;if(P==="nutcracker"){let Je=new B(new nt(.15,.165,.42,16),F);Je.position.y=.24;let Pt=new B(new Qe(.145,16,14),p);Pt.position.y=.56;let St=new B(new nt(.158,.142,.26,16),k);St.position.y=.77;let gt=new B(Be([H(new Qe(.032,8,8),{x:-.085,y:.53,z:.12}),H(new Qe(.032,8,8),{x:.085,y:.53,z:.12})]),F);_e.push(H(new Zn(.025,.09,6,8),{x:-.055,y:.5,z:.14,rz:1.32}),H(new Zn(.025,.09,6,8),{x:.055,y:.5,z:.14,rz:-1.32}),H(new $t(.055,.14,10),{y:.41,z:.12,rx:Math.PI})),xe.push(H(new Qe(.022,8,8),{x:-.05,y:.58,z:.135}),H(new Qe(.022,8,8),{x:.05,y:.58,z:.135}));let Ve=new B(Be([H(new mt(.148,.02,8,20),{y:.66,rx:Math.PI*.5}),H(new Qe(.048,10,8),{x:-.17,y:.42,sx:1.3,sy:.6}),H(new Qe(.048,10,8),{x:.17,y:.42,sx:1.3,sy:.6}),H(new Qe(.022,8,8),{x:-.05,y:.34,z:.155}),H(new Qe(.022,8,8),{x:.05,y:.34,z:.155}),H(new Qe(.022,8,8),{x:-.05,y:.24,z:.158}),H(new Qe(.022,8,8),{x:.05,y:.24,z:.158})]),b);Le=new ot,Le.position.set(.18,.4,0);let tt=new B(new Zn(.038,.18,6,10),F);tt.position.y=-.1,Le.add(tt),Q.add(Je,Pt,St,gt,Ve,Le)}else if(P==="penguin"){let Je=new B(new Zn(.17,.24,12,16),k);Je.position.y=.28,_e.push(H(new Qe(.145,14,12),{y:.26,z:.09,sx:.9,sy:1.15,sz:.5}));let Pt=new B(Be([H(new mt(.155,.038,10,20),{y:.42,rx:Math.PI*.5}),H(new Zn(.032,.14,6,8),{x:.11,y:.31,z:.14,rz:-.2})]),F),St=new B(new $t(.048,.12,12),T);St.rotation.x=Math.PI*.5,St.position.set(0,.48,.19),xe.push(H(new Qe(.022,8,8),{x:-.06,y:.53,z:.145}),H(new Qe(.022,8,8),{x:.06,y:.53,z:.145}));let gt=new B(Ht(.14,.12,.07,.02,.01),f);gt.position.set(-.16,.22,.08);let Ve=new B(new $e(.09,.07,.02),b);Ve.position.set(-.16,.28,.09),Ve.rotation.z=.25,Le=new ot,Le.position.set(.17,.36,0);let tt=new B(new Zn(.035,.16,6,8),k);tt.position.y=-.08,Le.add(tt),Q.add(Je,Pt,St,gt,Ve,Le)}else{_e.push(H(new Qe(.2,18,16),{y:.2}),H(new Qe(.145,18,16),{y:.49}),H(new nt(.12,.11,.18,14),{y:.68,rz:-.1}),H(new Qe(.145,14,12),{x:.02,y:.79,sy:.75}));let Je=new B(new $t(.036,.14,10),T);Je.rotation.x=Math.PI*.5,Je.position.set(0,.49,.18),xe.push(H(new Qe(.022,8,8),{x:-.05,y:.53,z:.135}),H(new Qe(.022,8,8),{x:.05,y:.53,z:.135}),H(new Qe(.022,8,8),{y:.31,z:.185}),H(new Qe(.022,8,8),{y:.21,z:.198})),Le=new ot,Le.position.set(0,.34,.18);let Pt=new B(new nt(.12,.12,.02,16),b),St=new B(new Qe(.055,10,8),d);St.scale.set(1,.4,1),St.position.y=.025,Le.add(Pt,St),Q.add(Je,Le)}return xe.length&&Q.add(new B(Be(xe),v)),_e.length&&Q.add(new B(Be(_e),E)),Q.userData.armPivot=Le,$n(Q,[Le]),Q}for(let P=0;P<3;P++){let Q=(P-1)*1.52,xe=new ot;xe.position.set(Q,1.74,.08),ae.add(xe),ce.push(H(Ht(.94,1.18,.08,.05,.025),{x:Q,y:2.34,z:.34}));let _e=Xt(Gt[P]);_e.position.set(0,.05,-.1),_e.scale.setScalar(.86),xe.add(_e);let Le=new ot;Le.position.set(-.41,.6,.31),xe.add(Le);let Je=new B(Ht(.82,1.06,.06,.04,.02),P===1?M:F);Je.position.x=.41,Je.castShadow=!0;let Pt=[H(new Qe(.048,12,10),{x:.7,z:.05})];for(let Ve=0;Ve<=P;Ve++)Pt.push(H(new $e(.04,.24,.02),{x:.41+(Ve-P*.5)*.085,y:.14,z:.04}));Le.add(Je,new B(Be(Pt),b));let St=new B(new $e(1.05,1.25,.55),new Bt({visible:!1}));St.position.set(0,.6,.3);let gt={idx:P,open:!1,doorSpring:new vt(0,175,13),popSpring:new vt(0,160,11),hinge:Le,puppet:_e};St.userData={kind:"advent",doorObj:gt,label:Et[P]},xe.add(St),C.push(St),ut.push(gt)}let nn=new B(new nt(1.65,1.68,.024,40),Z);nn.position.set(.15,.165,.05),nn.receiveShadow=!0,ae.add(nn);let Mi=[H(Ht(.62,.24,.56,.06,.04),{x:.42,y:.32,z:-.46,ry:-.28}),H(Ht(.58,.66,.16,.06,.04),{x:.46,y:.66,z:-.66,ry:-.28}),H(Ht(.14,.42,.52,.05,.03),{x:.16,y:.48,z:-.39,ry:-.28}),H(Ht(.14,.42,.52,.05,.03),{x:.68,y:.48,z:-.53,ry:-.28})];q.push(...Mi),oe.push(H(new nt(.24,.24,.05,18),{x:-.45,y:.5,z:-.52}),H(new nt(.05,.07,.34,12),{x:-.45,y:.32,z:-.52}),H(new nt(.065,.065,.44,10),{x:-1.72,y:.25,z:.04,rz:Math.PI*.48,ry:.2}),H(new nt(.06,.06,.4,10),{x:-1.72,y:.31,z:.09,rz:Math.PI*.52,ry:-.25}),H(Ht(.32,.38,.1,.03,.02),{x:0,y:1.24,z:-.8})),j.push(H(new nt(.065,.058,.13,14),{x:-.45,y:.59,z:-.52})),ce.push(H(new Qe(.058,10,8),{x:-.45,y:.66,z:-.52,sy:.6}));let Mn=new ot;Mn.position.set(0,1.05,-.76);let li=new B(Be([H(new $e(.018,.22,.01),{y:-.11}),H(new nt(.055,.055,.02,16),{y:-.22,rx:Math.PI*.5})]),b);Mn.add(li),ae.add(Mn),ce.push(H(Ht(1.26,1.08,.56,.06,.04),{x:-1.72,y:.69,z:-.05}));let gn=new B(new $e(.68,.62,.38),v);gn.position.set(-1.72,.49,.07),ae.add(gn);let Fn=new an({color:16756024,emissive:new Ce(16735764),emissiveIntensity:2.35,roughness:.3}),Vn=new ot;Vn.position.set(-1.72,.36,.09);let Wn=[];for(let P=-1;P<=1;P++)Wn.push(H(new $t(.11-Math.abs(P)*.02,.34,12),{x:P*.13,y:.12}));Vn.add(new B(Be(Wn,!0),Fn)),ae.add(Vn);for(let P=-1;P<=1;P++){let Q=H(new Zn(.055,.14,8,10),{x:-1.72+P*.32,y:1.07,z:.26,rz:.14});P===0?q.push(Q):j.push(Q)}let cn=(P,Q,xe=!0)=>{if(!P.length)return;let _e=new B(Be(P),Q);_e.castShadow=xe,_e.receiveShadow=xe,ae.add(_e)};cn(ne,d),cn(oe,f),cn(ce,E),cn(ke,I),cn(be,b,!1),cn(q,M),cn(j,F);let At=[];for(let P=0;P<4;P++){let Q=new ot;Q.position.set(-.62+P*.44,.16,.18);let xe=new B(Ht(.095,.56,.34,.025,.015),d);xe.position.y=.28,xe.castShadow=!0;let _e=[];for(let Le=0;Le<=P;Le++)_e.push(H(new Qe(.028,8,8),{y:.42-Le*.085,z:.17}));Q.add(xe,new B(Be(_e),E)),ae.add(Q),At.push({pivot:Q,spring:new vt(0,185,13),fallen:!1})}let qt=new ot;qt.position.set(1.55,.16,.18),ae.add(qt);let w=new B(Ht(.92,.76,.86,.05,.03),M);w.position.y=.38,w.castShadow=!0;let G=new B(new $e(.16,.78,.89),F);G.position.y=.38,qt.add(w,G);let J=new ot;J.position.set(.45,.76,0),qt.add(J);let $=new B(Ht(.98,.16,.92,.04,.025),F);$.position.x=-.45,$.castShadow=!0;let K=new B(Be([H(new mt(.14,.042,10,20),{x:-.56,y:.14,rz:.45}),H(new mt(.14,.042,10,20),{x:-.34,y:.14,rz:-.45})]),b);J.add($,K);let Te=new B(Ln({points:8,outerRadius:.38,innerRadius:.15,depth:.12}),b);Te.position.set(0,.45,0),Te.scale.setScalar(.001),qt.add(Te);let Ge=new B(new $e(1.1,1.1,1.1),new Bt({visible:!1}));Ge.position.y=.5,Ge.userData={kind:"gift",label:"\u70B9\u51FB\u70DF\u56F1\u6295\u9012\u7CD6\u7403\uFF08\u6216\u8F7B\u6572\u793C\u76D2\uFF09\u5F00\u542F\u60CA\u559C"},qt.add(Ge),C.push(Ge);let Ke=aa(new bt({color:16777215,vertexColors:!0,bumpMap:e.clayBump,bumpScale:.022,roughness:.62,clearcoat:.14}),{ridgeStrength:.024,icingScatter:.25});for(let P of ut)bn(P.puppet,Ke,[P.puppet.userData.armPivot]),P.puppet.userData.armPivot&&bn(P.puppet.userData.armPivot,Ke),bn(P.hinge,Ke);for(let P of At)bn(P.pivot,Ke);bn(J,Ke),bn(me,Ke),$n(fe,[Ae]),$n(qt,[J,Te]),bn(ae,Ke,[fe,ze,Pe,he,Ae,Mn,Vn,qt,...z.map(P=>P.pivot),...At.map(P=>P.pivot),...ut.flatMap(P=>[P.hinge,P.puppet])]),$n(ae,[fe,ze,Pe,he,Ae,Mn,Vn,qt,...z.map(P=>P.pivot),...At.map(P=>P.pivot),...ut.flatMap(P=>[P.hinge,P.puppet])]);let Ye=!1,st=new vt(0,210,11),et=new vt(.16,85,14),je=new vt(0,150,11),Mt=new vt(0,110,12),Nt=!1,It=0,Tt=-1,dt=new R,rt=0,rn=!1,Ct=!1,ln=!1;function hi(){return{current:(Ye?1:0)+(rt>0?1:0)+(rn?1:0),total:3}}function Xn(){Ct||(Ct=!0,je.target=1,Mt.target=1,Ye=!0,et.target=2.5,o.focusOn(1.1,-.8,.4,.8,2.2),ft(1.55,.95,.25,14),t.playSigilAwaken(),n(2,"\u7B2C\u4E8C\u58F0\u90E8\u5DF2\u5524\u9192 \xB7 \u6E29\u6696\u6728\u7434\u4E0E\u96EA\u6A47\u94F6\u94C3\u6C47\u5165\u5408\u594F"),s("\u59DC\u997C\u5947\u9047\u5C4B\u5168\u5C4B\u70B9\u4EAE \xB7 \u53EF\u6EDA\u8F6E\u63A8\u8FD1\u89C2\u8D4F\u73A9\u5076\u80E1\u987B\u4E0E\u683C\u7EB9\u5730\u6BEF"))}function Ti(){if(!(Tt>=0)){for(let P of z)P.hitInRun=!1;for(let P of At)P.fallen=!1,P.spring.snap(0);ln=!1,Tt=0,We.getPoint(0,dt),he.position.copy(dt),he.quaternion.identity(),he.visible=!0,Ae.visible=!1,t.playClayPop(1),s("\u8584\u8377\u7CD6\u7403\u5DF2\u5165\u8F68 \xB7 \u649E\u54CD\u94DC\u949F\u5E76\u6ED1\u5165\u5DE6\u4FA7\u62D0\u6756\u7CD6\u53CC\u8F68\u8FC7\u5C71\u8F66\u2026")}}function jt(P,Q){if(!P)return!1;let{kind:xe,doorObj:_e}=P.object.userData;return xe==="cord"?(Nt=!0,It=Q.y,st.target=.28,!0):xe==="advent"&&_e?(_e.open=!_e.open,_e.doorSpring.target=_e.open?1:0,_e.popSpring.target=_e.open?1:0,t.playClayPop(_e.idx+1),_e.open&&(rt++,t.playBellChime(_e.idx*2),o.focusOn((_e.idx-1)*.95,0,.2,.84,1.45),rt>=3&&Xn()),!0):xe==="chimney"?(Ti(),!0):xe==="gift"?(!rn&&Tt<0?Ti():Xn(),!0):!1}function Dn(P){if(!Nt)return!1;let Q=Ut((It-P.y)*1.9+.22,0,.82);return st.target=Q,!0}function Li(){Nt&&(Nt=!1,Ye=!Ye,et.target=Ye?2.5:.16,st.impulse(-4.5),st.target=0,t.playClayPop(Ye?3:0),Ye&&t.playBellChime(5))}function un(P,Q,xe){let _e=ku(Q,12),Le=st.update(P),Je=Math.max(.55,1+Le*.68);it.scale.y=Je,me.position.y=-1.08*Je;let Pt=et.update(P);ie.emissiveIntensity=Pt*(.88+.12*Math.sin(_e*6));for(let Ve=0;Ve<y.length;Ve++)ve.position.set(y[Ve].x,y[Ve].baseY-Math.max(0,Le)*(Ve/10)*.08,y[Ve].z),ve.updateMatrix(),Pe.setMatrixAt(Ve,ve.matrix);Pe.instanceMatrix.needsUpdate=!0,Mn.rotation.z=Math.sin(_e*4.2)*.28;for(let Ve=0;Ve<ut.length;Ve++){let tt=ut[Ve],Oe=tt.doorSpring.update(P),lt=tt.popSpring.update(P);tt.hinge.rotation.y=-Oe*2.22,tt.puppet.position.z=zt(-.1,.3,lt),lt>.2&&(tt.puppet.rotation.z=Math.sin(_e*5.5+Ve*2.1)*.12*lt,tt.puppet.position.y=.05+Math.abs(Math.sin(_e*6.2+Ve))*.065*lt,tt.puppet.userData.armPivot&&(tt.puppet.userData.armPivot.rotation.x=-Math.abs(Math.sin(_e*5.5+Ve))*.95*lt))}if(Tt>=0&&Tt<=1){let Ve=Tt>.44&&Tt<.86?.38:.25;Tt+=P*Ve;let tt=Math.min(1,Tt);We.getPoint(tt,he.position);let Oe=he.position.distanceTo(dt);if(Oe>1e-5&&(ju.copy(he.position).sub(dt).normalize(),ul.crossVectors(bv,ju).normalize(),ul.lengthSq()>.01&&(Qu.setFromAxisAngle(ul,Oe/.17),he.quaternion.premultiply(Qu)),dt.copy(he.position)),tt<.46)for(let lt=0;lt<z.length;lt++)!z[lt].hitInRun&&he.position.x<=z[lt].x+.08&&(z[lt].hitInRun=!0,z[lt].swing.impulse(-9.2),ft(z[lt].x,z[lt].y,.25,6),t.playBellChime(lt*2));else ln||(ln=!0,ft(-1.62,3.48,.26,8),t.playClayPop(4))}else if(Tt>1){Tt+=P;let Ve=Tt-1;he.visible=!1;for(let tt=0;tt<At.length;tt++)!At[tt].fallen&&Ve>=tt*.15&&(At[tt].fallen=!0,At[tt].spring.target=-1.24,ft(-.62+tt*.44,.55,.24,5),t.playClayPop(tt+2));Ve>=.72&&(Tt=-1,Ae.visible=!0,rn=!0,Xn())}else Ae.position.y=.64+Math.abs(Math.sin(_e*3.8))*.06,Ae.rotation.y=_e*1.4;for(let Ve=0;Ve<D;Ve++)Ee[Ve*3+1]>-10&&(Ee[Ve*3]+=Xe[Ve*3]*P,Ee[Ve*3+1]+=Xe[Ve*3+1]*P,Ee[Ve*3+2]+=Xe[Ve*3+2]*P,Xe[Ve*3+1]-=4.8*P,Ee[Ve*3+1]<.05&&(Ee[Ve*3+1]=-20));we.attributes.position.needsUpdate=!0;for(let Ve of z)Ve.pivot.rotation.z=Ve.swing.update(P);for(let Ve of At)Ve.pivot.rotation.z=Ve.spring.update(P);let St=je.update(P);J.rotation.z=-St*2.05;let gt=Mt.update(P);Te.scale.setScalar(Math.max(.001,gt)),Te.position.y=zt(.45,1.25,gt)+Math.sin(Q*2.6)*.05*gt,Te.rotation.y=Q*1.25,Vn.scale.y=.88+.2*Math.sin(_e*9.5),l.intensity=1.4+.28*Math.sin(_e*8.2),o.update(P,xe)}function L(P){o.apply(P)}function se(P){if(P==="hero"||P==="climax"){Ye=!0,et.snap(2.5),ut[0].open=!0,ut[0].doorSpring.snap(1),ut[0].popSpring.snap(1),ut[1].open=!0,ut[1].doorSpring.snap(1),ut[1].popSpring.snap(1);for(let Q of At)Q.spring.snap(-1.24);Ct=!0,rn=!0,je.snap(1),Mt.snap(1)}un(.016,2.6,{x:-.05,y:.04})}return{id:2,roman:"ACT II",title:"\u59DC\u997C\u5947\u9047\u5C4B",subtitle:"\u5B9A\u683C\u9ECF\u571F\u793C\u76D2\u5DE5\u574A \xB7 TACTILE CLAYMATION WORKSHOP",defaultHint:"\u5411\u4E0B\u62FD\u52A8\u6BDB\u6BE1\u7ED2\u7403\u70B9\u4EAE\u5F69\u706F \xB7 \u6572\u5F00\u76F2\u76D2\u95E8 \xB7 \u70B9\u51FB\u70DF\u56F1\u5F00\u542F\u62D0\u6756\u7CD6\u8FC7\u5C71\u8F66\u8FDE\u9501",transTint:new Ce(16751964),cameraRig:o,getProgress:hi,getPostOpts:()=>({bloomStrength:.42,bloomThreshold:.84,starburst:.16,focusDist:o.getFocusDistance(),aperture:.48,aoStrength:.82,aoRadius:.34}),scene:r,interactables:C,onPointerDown:jt,onPointerMove:Dn,onPointerUp:Li,update:un,applyCamera:L,setCaptureState:se}}var Rv=`
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vLocalPos;
varying vec4 vScreenPos;

void main() {
  vLocalPos = position;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vec4 clip = projectionMatrix * viewMatrix * wp;
  vScreenPos = clip;
  gl_Position = clip;
}
`,Av=`
uniform sampler2D tRefract;
uniform float uSwirlGlow;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vLocalPos;
varying vec4 vScreenPos;

void main() {
  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPos);
  float ndv = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = pow(1.0 - ndv, 3.6);

  // Thick meniscus base collar magnification near bottom of glass sphere
  float baseThick = smoothstep(-0.9, -2.1, vLocalPos.y);
  vec2 uv = (vScreenPos.xy / max(vScreenPos.w, 1e-4)) * 0.5 + 0.5;
  vec3 viewN = mat3(viewMatrix) * N;
  float rimBend = ((1.0 - ndv) * 0.052 + baseThick * 0.032);

  vec2 offR = -viewN.xy * (rimBend * 0.87);
  vec2 offG = -viewN.xy * (rimBend * 1.00);
  vec2 offB = -viewN.xy * (rimBend * 1.15);

  float r = texture2D(tRefract, clamp(uv + offR, vec2(0.002), vec2(0.998))).r;
  float g = texture2D(tRefract, clamp(uv + offG, vec2(0.002), vec2(0.998))).g;
  float b = texture2D(tRefract, clamp(uv + offB, vec2(0.002), vec2(0.998))).b;
  vec3 refracted = vec3(r, g, b);

  vec3 R = reflect(-V, N);
  vec3 Lwin = normalize(vec3(-0.62, 0.66, 0.42));
  vec3 Lhearth = normalize(vec3(0.68, -0.18, 0.71));
  float specWin = pow(max(dot(R, Lwin), 0.0), 46.0) * 1.65 + smoothstep(0.80, 0.96, dot(R, Lwin)) * 0.78;
  float specFire = pow(max(dot(R, Lhearth), 0.0), 30.0) * 1.42;

  vec3 rimTint = mix(vec3(0.76, 0.91, 1.0), vec3(1.0, 0.82, 0.54), clamp(N.x * 0.5 + 0.5, 0.0, 1.0));
  vec3 glassCol = refracted * (1.0 - fresnel * 0.26);
  glassCol += rimTint * (fresnel + baseThick * 0.22) * (0.56 + uSwirlGlow * 0.35);
  glassCol += vec3(0.88, 0.95, 1.0) * specWin;
  glassCol += vec3(1.0, 0.70, 0.35) * specFire;

  gl_FragColor = vec4(glassCol, 1.0);
}
`,Cv=`
attribute vec4 aSeed; // x: radiusFrac, y: baseAngle, z: fallSpeed, w: phase
uniform float uTime;
uniform float uSwirlPhase;
uniform float uVortex;
uniform float uPixelRatio;
varying float vAlpha;

void main() {
  float hCycle = fract(aSeed.w - uTime * aSeed.z * (0.14 + uVortex * 0.08));
  float y = mix(-1.32, 1.98, hCycle);
  // Sphere chord envelope so no flake ever leaves the 2.16m inner glass boundary!
  float maxChord = sqrt(max(0.02, 2.14 * 2.14 - y * y));
  float r = aSeed.x * maxChord * (0.92 + 0.08 * sin(uTime * 1.7 + aSeed.w * 12.0));
  float theta = aSeed.y + uSwirlPhase * (0.7 + (1.0 - aSeed.x) * 0.9) + sin(uTime * 1.3 + aSeed.w * 9.0) * 0.35;

  vec3 pos = vec3(cos(theta) * r, y, sin(theta) * r);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float sz = mix(0.075, 0.145, fract(aSeed.w * 7.13));
  gl_PointSize = sz * uPixelRatio * (340.0 / max(-mv.z, 0.5));
  vAlpha = smoothstep(-1.32, -1.05, y) * smoothstep(1.98, 1.65, y);
}
`,Pv=`
uniform sampler2D tSnow;
varying float vAlpha;
void main() {
  vec4 tex = texture2D(tSnow, gl_PointCoord);
  if (tex.a < 0.04) discard;
  gl_FragColor = vec4(tex.rgb, tex.a * vAlpha * 0.92);
}
`,Iv=`
attribute vec4 aFlakeSeed; // x: radFrac, y: baseAngle, z: spinRate, w: phase
attribute vec3 aCorner;
uniform float uTime;
uniform float uSwirlPhase;
uniform float uVortex;
varying vec3 vFlakeNormal;
varying vec3 vWorldPos;
varying float vFade;

void main() {
  float hCycle = fract(aFlakeSeed.w - uTime * (0.09 + uVortex * 0.06));
  float y = mix(-1.25, 1.90, hCycle);
  float maxChord = sqrt(max(0.02, 2.08 * 2.08 - y * y));
  float r = aFlakeSeed.x * maxChord;
  float theta = aFlakeSeed.y + uSwirlPhase * 1.15 + cos(uTime * 1.5 + aFlakeSeed.w * 11.0) * 0.3;
  vec3 center = vec3(cos(theta) * r, y, sin(theta) * r);

  // 3D tumbling rotation matrix in vertex shader!
  float ax = uTime * aFlakeSeed.z * 2.8 + uSwirlPhase * 2.2 + aFlakeSeed.w * 6.28;
  float ay = uTime * aFlakeSeed.z * 1.9 + aFlakeSeed.y;
  float cx = cos(ax), sx = sin(ax);
  float cy = cos(ay), sy = sin(ay);
  mat3 rotX = mat3(1.0, 0.0, 0.0,  0.0, cx, -sx,  0.0, sx, cx);
  mat3 rotY = mat3(cy, 0.0, sy,    0.0, 1.0, 0.0, -sy, 0.0, cy);
  mat3 tumble = rotY * rotX;

  vec3 localPos = center + tumble * aCorner;
  vec3 localNorm = tumble * vec3(0.0, 0.0, 1.0);

  vec4 wp = modelMatrix * vec4(localPos, 1.0);
  vWorldPos = wp.xyz;
  vFlakeNormal = normalize(mat3(modelMatrix) * localNorm);
  vFade = smoothstep(-1.25, -0.98, y) * smoothstep(1.90, 1.60, y);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,Lv=`
varying vec3 vFlakeNormal;
varying vec3 vWorldPos;
varying float vFade;
void main() {
  if (vFade < 0.02) discard;
  vec3 N = normalize(vFlakeNormal);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vWorldPos);
  vec3 L1 = normalize(vec3(0.52, 0.74, 0.45));
  vec3 L2 = normalize(vec3(-0.45, 0.35, 0.82));
  vec3 H1 = normalize(V + L1);
  vec3 H2 = normalize(V + L2);
  // Sharp mirror glint flash when tumbling gold leaf catches studio lights!
  float glint = pow(max(dot(N, H1), 0.0), 38.0) * 4.2 + pow(max(dot(N, H2), 0.0), 28.0) * 2.5;
  float diff = 0.35 + 0.65 * abs(dot(N, L1));
  vec3 goldBase = vec3(0.96, 0.78, 0.42) * diff + vec3(1.0, 0.94, 0.76) * glint;
  gl_FragColor = vec4(goldBase * vFade, vFade);
}
`;function td({envMap:i,textures:e,refractTex:t,audio:n,onAwaken:s,onHint:r}){let o=new In;o.background=new Ce(461072),o.environment=i;let a=new ci(new R(0,2.32,8.28),new R(0,1.72,0),{parallaxX:.75,parallaxY:.42,minZoom:.56,maxZoom:1.18});o.add(new ri(2504024,.85));let c=new wn(16770749,2.45);c.position.set(5.5,8.8,6.2),c.castShadow=!0,c.shadow.mapSize.set(2048,2048),c.shadow.camera.near=2,c.shadow.camera.far=20,c.shadow.camera.left=-4.5,c.shadow.camera.right=4.5,c.shadow.camera.top=5.5,c.shadow.camera.bottom=-3,c.shadow.bias=-5e-4,c.shadow.radius=3,o.add(c);let l=new wn(7252223,1.25);l.position.set(-6.5,5.5,-4.5),o.add(l);let h=new Gn(16757844,1.55,6.8,1.6);h.position.set(0,2.35,.2),o.add(h);let u=oi(new bt({color:15120998,roughnessMap:e.brassTex,bumpMap:e.brassTex,bumpScale:.008,metalness:.96,roughness:.22,clearcoat:.28,envMapIntensity:2.35}),{anisoStrength:.44,patinaStrength:.26}),d=oi(new bt({color:14057040,roughnessMap:e.brassTex,metalness:.94,roughness:.25,envMapIntensity:2.1}),{anisoStrength:.35,patinaStrength:.24}),f=oi(new bt({color:14476528,metalness:.96,roughness:.16,envMapIntensity:2.4}),{anisoStrength:.4,patinaStrength:.15}),g=new an({color:2497299,roughness:.46,metalness:.72,envMapIntensity:1.3}),x=new an({color:6052707,bumpMap:e.clayBump,bumpScale:.018,roughness:.82,metalness:.12}),m=new bt({map:e.plaqueTex,bumpMap:e.plaqueTex,bumpScale:.006,metalness:.88,roughness:.24,clearcoat:.3,envMapIntensity:2.1}),p=new bt({color:991515,bumpMap:e.paperTex,bumpScale:.014,roughness:.9,sheen:.92,sheenRoughness:.74,sheenColor:new Ce(3829340)}),T=new bt({color:16251391,bumpMap:e.clayBump,bumpScale:.012,roughness:.46,clearcoat:.24,sheen:.5,sheenColor:new Ce(14413567),envMapIntensity:.98}),v=new an({color:1522732,roughness:.78,envMapIntensity:.82}),E=new bt({color:11018281,roughness:.26,metalness:.25,clearcoat:.78,envMapIntensity:1.55}),I=new an({color:16771240,emissive:new Ce(16752178),emissiveIntensity:1.65,roughness:.25}),b=new B(new Tn(34,24),p);b.rotation.x=-Math.PI*.5,b.position.y=-1.15,b.receiveShadow=!0,o.add(b);let A=28,F=new wt,M=new Float32Array(A*3);for(let L=0;L<A;L++)M[L*3]=Math.sin(L*2.37)*7.8,M[L*3+1]=-.4+L*.618%1*6.8,M[L*3+2]=-9-L%4*1.2;F.setAttribute("position",new yt(M,3)),o.add(new On(F,new Bn({map:e.sparkTex,color:16758376,size:1.35,transparent:!0,opacity:.34,depthWrite:!1,blending:fn})));let S=new ot;S.position.y=-1.12,o.add(S);let k=[new is([new pe(0,0),new pe(2.4,0),new pe(2.4,.11),new pe(2.24,.18),new pe(2.14,.28),new pe(1.96,.34),new pe(0,.34)],64),new is([new pe(0,1.06),new pe(1.98,1.06),new pe(2.14,1.15),new pe(2.04,1.28),new pe(1.88,1.38),new pe(0,1.38)],64),H(cl({radius:2.41,height:.09,flutes:96,fluteDepth:.025}),{y:.06}),H(cl({radius:2.15,height:.1,flutes:96,fluteDepth:.024}),{y:1.18})],Z=[];for(let L=0;L<8;L++){let se=L/8*Math.PI*2+Math.PI/8;k.push(H(new nt(.055,.068,.76,14),{x:Math.cos(se)*1.98,y:.7,z:Math.sin(se)*1.98}));let P=new an({color:16765565,emissive:new Ce(16751918),emissiveIntensity:.28,roughness:.2}),Q=new B(new Qe(.052,12,10),P);Q.position.set(Math.cos(se)*2.11,1.2,Math.sin(se)*2.11),S.add(Q),Z.push(P)}let ae=new B(Be(k),u);ae.castShadow=!0,ae.receiveShadow=!0,S.add(ae);let U=new nt(2.34,2.34,.22,32,1,!0,-.34,.68),O=new B(U,m);O.position.y=.16,S.add(O);let X=new B(new nt(1.36,1.42,.82,40),g);X.position.y=.7,S.add(X);let ue=new Gn(16753723,1.75,4.4,1.8);ue.position.set(0,.72,2.28),S.add(ue);let ee=[],ne=(L,se,P,Q,xe,_e,Le=1.86)=>{let Je=new B(oa({teeth:Q,outerRadius:P,innerRadius:P*.82,thickness:.082,holeRadius:P*.18,spokes:5,bevelSize:.013}),_e);Je.position.set(Math.sin(L)*Le,se,Math.cos(L)*Le),Je.lookAt(0,se,0),S.add(Je),ee.push({mesh:Je,ratio:xe})};ne(0,.74,.36,22,1,u,1.88),ne(.34,.75,.28,16,-1.375,d,1.86),ne(-.34,.67,.29,18,-1.22,d,1.86),ne(.68,.71,.33,20,1.1,u,1.85),ne(-.68,.73,.31,18,1.22,u,1.85);let oe=new ot;oe.position.set(-.38,.88,1.82),oe.lookAt(0,.88,0);let ce=[new mt(.19,.022,10,28),new $e(.37,.024,.018),new $e(.024,.37,.018),new mt(.08,.008,6,20)];oe.add(new B(Be(ce),u)),S.add(oe);let be=[H(new nt(.125,.125,.54,24),{rz:Math.PI*.5})];for(let L=0;L<28;L++){let se=L*1.9,P=-.22+L/27*.44;be.push(H(new $e(.014,.028,.014),{x:P,y:Math.cos(se)*.132,z:Math.sin(se)*.132}))}let q=new B(Be(be),u);q.position.set(0,.43,1.79),S.add(q);let j=[H(new $e(.54,.028,.12),{z:.07})];for(let L=0;L<12;L++){let se=-.23+L/11*.46,P=.08+L/11*.05;j.push(H(new $e(.026,.012,P),{x:se,z:.01-P*.3}))}let Se=new B(Be(j),f);Se.position.set(0,.565,1.8),S.add(Se);let Ne=[],Re=new ot;Re.position.set(2.12,.72,.35),Re.rotation.y=-.18,S.add(Re);let Ue=new B(new nt(.065,.065,.62,16),u);Ue.rotation.z=Math.PI*.5,Ue.position.x=.25,Re.add(Ue);let ke=new ot;ke.position.x=.56;let W=[];for(let L of[-1,1])W.push(H(new mt(.24,.048,12,26),{x:.1,y:L*.24,sx:1.15,sy:.88}));ke.add(new B(Be(W),u));let ge=new B(new Qe(.085,14,12),d);ge.position.x=.24,ke.add(ge),Re.add(ke);let C=new B(new $e(1.18,1.18,1.08),new Bt({visible:!1}));C.position.x=.42,C.userData={kind:"windkey",label:"\u62E7\u52A8\u8774\u8776\u9EC4\u94DC\u53D1\u6761 \xB7 \u4E3A\u6446\u8F6E\u6E38\u4E1D\u4E0E\u84B8\u6C7D\u5217\u8F66\u4E0A\u5F26"},Re.add(C),Ne.push(C);let fe=3.22,V=2.36,re=new ot;re.position.y=fe,S.add(re);let Y=[H(new nt(1.94,1.55,.75,48),{y:-1.52}),H(new $t(1.24,.84,36),{y:-.95})],Ae=[],Me=[],_=[];for(let L=0;L<6;L++){let se=L/6*Math.PI*2+.32,P=1.14,Q=Math.cos(se)*P,xe=Math.sin(se)*P,_e=-1.06,Le=-se+Math.PI*.5;Ae.push(H(new $e(.36,.34,.32),{x:Q,y:_e+.17,z:xe,ry:Le}),H(new $e(.4,.04,.36),{x:Q,y:_e+.21,z:xe,ry:Le}),H(new $e(.07,.22,.07),{x:Q+Math.cos(se+.2)*.1,y:_e+.46,z:xe+Math.sin(se+.2)*.1,ry:Le}));let Je=H(Ht(.3,.06,.4,.02,.015),{x:-.11,y:.4,rz:.62}),Pt=H(Ht(.3,.06,.4,.02,.015),{x:.11,y:.4,rz:-.62}),St=Be([Je,Pt],!0);Y.push(H(St,{x:Q,y:_e,z:xe,ry:Le}));let gt=Be([H(new Tn(.08,.1),{x:-.07,y:.13,z:.165}),H(new Tn(.08,.1),{x:.07,y:.13,z:.165}),H(new Tn(.07,.08),{x:0,y:.28,z:.165}),H(new Qe(.032,8,8),{x:.24,y:.24,z:.16})],!0);Me.push(H(gt,{x:Q,y:_e,z:xe,ry:Le})),_.push(H(new nt(.012,.016,.24,8),{x:Q+Math.cos(se-.25)*.22,y:_e+.12,z:xe+Math.sin(se-.25)*.22}))}let y=[];for(let L=0;L<5;L++){let se=.78-L*.135,P=.56-L*.05;y.push(H(new $t(se,P,24),{y:-.62+.28+L*.34})),Y.push(H(new mt(se*.92,.036,8,24),{y:-.62+.04+L*.34,rx:Math.PI*.5}))}let N=new B(Be(y),v);N.castShadow=!0,re.add(N);let de=[],le=[];for(let L=0;L<28;L++){let se=L/28,P=L*2.39996,Q=zt(.7,.14,se),xe=-.62+zt(.14,1.72,se),_e=H(new Qe(.048,10,8),{x:Math.cos(P)*Q,y:xe,z:Math.sin(P)*Q});L%2===0?de.push(_e):le.push(_e)}re.add(new B(Be(de),E)),_.push(...le);let ie=[],Pe=new xi(new $t(.14,.38,4),u,6);re.add(Pe);let ve=new Rt,ye=new Rt,ze=new Ai;for(let L=0;L<6;L++)ie.push(L/6*Math.PI*2);let it=new an({color:16774612,emissive:new Ce(16760399),emissiveIntensity:1.25,metalness:.6,roughness:.18}),me=new B(Ln({points:8,outerRadius:.3,innerRadius:.11,depth:.09}),it);me.position.y=1.42,re.add(me);let ct=ur({color:16766597,opacity:.11,power:2.2}),at=new B(new nt(.18,1.45,2.55,20,1,!0),ct);at.position.y=.25,re.add(at);let Ze=1.62,z=-.98;_.push(H(new mt(Ze+.062,.015,8,64),{y:z,rx:Math.PI*.5}),H(new mt(Ze-.062,.015,8,64),{y:z,rx:Math.PI*.5}));let te=new Wt;te.moveTo(-.36,-.32),te.lineTo(-.36,0),te.lineTo(.36,0),te.lineTo(.36,-.32),te.lineTo(.22,-.32),te.absarc(0,-.32,.22,0,Math.PI,!1),te.lineTo(-.36,-.32),te.closePath();let He=[],We=14;for(let L=0;L<We;L++){let se=L/We*Math.PI*2,P=new Jn(te,{depth:.16,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,steps:1});P.center(),He.push(H(P,{x:Math.cos(se)*Ze,y:z-.16,z:Math.sin(se)*Ze,ry:-se+Math.PI*.5}))}for(let L=0;L<56;L++){let se=L/56*Math.PI*2;Ae.push(H(new $e(.19,.018,.036),{x:Math.cos(se)*Ze,y:z-.008,z:Math.sin(se)*Ze,ry:-se}))}let Ie=new B(Be(He),x);Ie.castShadow=!0,Ie.receiveShadow=!0,re.add(Ie);let De=new B(Be(Y),T);De.receiveShadow=!0,re.add(De),re.add(new B(Be(Ae),g)),re.add(new B(Be(Me),I)),re.add(new B(Be(_),u));let he=new ot;he.position.y=z+.02,re.add(he);let D=[],we=(L=.065,se=.105)=>{let P=[H(new nt(.01,.01,se*2,8),{rz:Math.PI*.5})];for(let Q of[-se,se]){P.push(H(new mt(L,.012,8,18),{x:Q,ry:Math.PI*.5}));for(let xe=0;xe<4;xe++)P.push(H(new $e(.012,L*1.9,.012),{x:Q,rx:xe*Math.PI/4}))}return Be(P,!0)},Ee=we(.065,.105),Xe=we(.051,.095),qe=(L,se)=>{let P=new ot;if(P.position.set(Math.cos(L)*Ze,0,Math.sin(L)*Ze),P.rotation.y=-L,se==="engine"){let Q=[H(new nt(.095,.095,.36,16),{y:.13,z:.05,rx:Math.PI*.5}),H(new $e(.2,.24,.18),{y:.17,z:-.15})],xe=[H(new nt(.044,.03,.15,12),{y:.25,z:.16}),H(new Qe(.048,10,8),{y:.22,z:.02}),H(new $t(.11,.14,4),{y:.06,z:.26,rx:Math.PI*.5,ry:Math.PI*.25}),H(new $e(.22,.024,.2),{y:.3,z:-.15}),H(new $e(.014,.022,.28),{x:.115,y:.065,z:.02}),H(new $e(.014,.022,.28),{x:-.115,y:.065,z:.02})];P.add(new B(Be(Q),E)),P.add(new B(Be(xe),u));let _e=new B(Be([H(new Qe(.038,10,8),{y:.14,z:.24}),H(new $e(.205,.09,.09),{y:.2,z:-.15})]),I);P.add(_e);for(let Le of[-.11,.08]){let Je=new B(Ee,u);Je.position.set(0,.065,Le),P.add(Je),D.push(Je)}}else if(se==="tender")P.add(new B(H(new $e(.18,.14,.22),{y:.1}),E)),P.add(new B(Be([H(new $e(.09,.09,.09),{x:-.03,y:.2,z:.03,ry:.3}),H(new $e(.08,.1,.08),{x:.04,y:.2,z:-.04})]),u));else{P.add(new B(H(new $e(.19,.19,.33),{y:.13}),E)),P.add(new B(H(new $e(.21,.032,.35),{y:.23}),T));let Q=[];for(let xe=-1;xe<=1;xe++)Q.push(H(new $e(.196,.075,.068),{y:.15,z:xe*.095}));P.add(new B(Be(Q),I));for(let xe of[-.11,.11]){let _e=new B(Xe,u);_e.position.set(0,.055,xe),P.add(_e)}}return P};he.add(qe(0,"engine"),qe(-.18,"tender"),qe(-.39,"coach"),qe(-.62,"coach")),$n(he,D);let ht=9,ft=new xi(new Qe(.055,8,8),new Bt({color:16774888,transparent:!0,opacity:.42,depthWrite:!1}),ht);re.add(ft);let ut=new sn,Gt=[];for(let L=0;L<ht;L++)Gt.push({x:0,y:-10,z:0,age:L*.24});let Et=1200,Xt=new wt,nn=new Float32Array(Et*4),Mi=new Float32Array(Et*3);for(let L=0;L<Et;L++)nn[L*4]=Math.sqrt(Math.random())*.96,nn[L*4+1]=Math.random()*Math.PI*2,nn[L*4+2]=.55+Math.random()*.85,nn[L*4+3]=Math.random();Xt.setAttribute("position",new yt(Mi,3)),Xt.setAttribute("aSeed",new yt(nn,4));let Mn=new Ot({transparent:!0,depthWrite:!1,blending:fn,uniforms:{tSnow:{value:e.snowflakeTex},uTime:{value:0},uSwirlPhase:{value:0},uVortex:{value:.25},uPixelRatio:{value:Math.min(window.devicePixelRatio||1,2)}},vertexShader:Cv,fragmentShader:Pv}),li=new On(Xt,Mn);li.frustumCulled=!1,re.add(li);let gn=320,Fn=new wt,Vn=new Float32Array(gn*6*3),Wn=new Float32Array(gn*6*3),cn=new Float32Array(gn*6*4),At=.024,qt=[[-At,-At*.7,0],[At,-At*.7,0],[At*.6,At,0],[-At,-At*.7,0],[At*.6,At,0],[-At*.8,At*.8,0]];for(let L=0;L<gn;L++){let se=.15+Math.sqrt(Math.random())*.8,P=Math.random()*Math.PI*2,Q=(Math.random()>.5?1:-1)*(.7+Math.random()*1.4),xe=Math.random();for(let _e=0;_e<6;_e++){let Le=L*6+_e;Wn[Le*3]=qt[_e][0],Wn[Le*3+1]=qt[_e][1],Wn[Le*3+2]=qt[_e][2],cn[Le*4]=se,cn[Le*4+1]=P,cn[Le*4+2]=Q,cn[Le*4+3]=xe}}Fn.setAttribute("position",new yt(Vn,3)),Fn.setAttribute("aCorner",new yt(Wn,3)),Fn.setAttribute("aFlakeSeed",new yt(cn,4));let w=new Ot({transparent:!0,side:Nn,uniforms:{uTime:{value:0},uSwirlPhase:{value:0},uVortex:{value:.25}},vertexShader:Iv,fragmentShader:Lv}),G=new B(Fn,w);G.frustumCulled=!1,re.add(G);let J=new Ot({vertexShader:Rv,fragmentShader:Av,uniforms:{tRefract:{value:t},uSwirlGlow:{value:0}}}),$=new B(new Qe(V,64,48),J);$.position.y=fe,S.add($),$.userData={kind:"globe",label:"\u5FEB\u901F\u5212\u8FC7\u6216\u6447\u6643\u6C34\u6676\u7403 \xB7 \u6380\u8D77\u788E\u91D1\u66B4\u98CE\u96EA\u6F29\u6DA1"},Ne.push($);let K=new an({color:16777215,vertexColors:!0,bumpMap:e.clayBump,bumpScale:.015,roughness:.72});$n(ke),$n(oe),bn(re,K,[he,ft,Pe,me,at,G]),bn(S,K,[Re,oe,q,re,$,...ee.map(L=>L.mesh)]),$n(S,[Re,oe,q,re,$,...ee.map(L=>L.mesh)]);let Te=.34,Ge=0,Ke=!1,Ye=.6,st=0,et=0,je=.25,Mt=0,Nt=!1,It=new Ss(0,0,148,11),Tt=new vt(0,95,12),dt=new vt(.95,80,12),rt=null,rn={x:0,y:0,time:0};function Ct(){let L=Ge>.35?1:0,se=Nt?1:0,P=Ke?1:0;return{current:Math.min(3,L+se+P),total:3}}function ln(L,se=0,P=0){je=Ut(je+L,0,3.6),It.impulse(se,P),L>.35&&(Ke=!0,n.playSnowWhoosh(Math.min(1,L)))}function hi(L){Te=Ut(Te+L,0,1.38),Ge+=L,st+=L*9.5,Math.abs(st-et)>.4&&(et=st,n.playRatchetClick(1)),(Te>=.95||Ge>=.82)&&!Nt&&(Nt=!0,Tt.target=1,dt.target=2.6,ln(1.85,.35,-.55),a.focusOn(0,.45,0,.8,2.2),n.playSigilAwaken(),s(3,"\u7B2C\u4E09\u58F0\u90E8\u5DF2\u5524\u9192 \xB7 \u745E\u58EB\u516B\u97F3\u76D2\u4E3B\u65CB\u5F8B\u6E05\u8106\u6D41\u6DCC"),r("\u5348\u591C\u5929\u6587\u949F\u6EE1\u5F26\u8FD0\u8F6C \xB7 \u53EF\u6EDA\u8F6E\u63A8\u8FD1\u89C2\u8D4F\u6446\u8F6E\u6E38\u4E1D\u300112\u9F7F\u97F3\u68B3\u4E0E\u77F3\u62F1\u5217\u8F66"))}function Xn(L,se){if(!L)return!1;let{kind:P}=L.object.userData;return rn={x:se.x,y:se.y,time:performance.now()},P==="windkey"?(rt="windkey",hi(.32),ln(.35,.12,-.22),!0):P==="globe"?(rt="globe",ln(1.15,(Math.random()-.5)*.55,-se.x*.85),hi(.18),!0):!1}function Ti(L){if(!rt)return!1;let se=performance.now(),P=Math.max(8,se-rn.time),Q=L.x-rn.x,xe=L.y-rn.y,_e=Q/P*16,Le=xe/P*16;if(rn={x:L.x,y:L.y,time:se},rt==="windkey"){let Je=Math.hypot(Q,xe)*1.45;return Je>.002&&hi(Je),!0}if(rt==="globe"){let Je=Math.hypot(_e,Le);return Je>.004&&(ln(Je*2.8,Ut(-Le*1.4,-1.2,1.2),Ut(-_e*1.8,-1.5,1.5)),hi(Je*.25)),!0}return!1}function jt(){rt=null}function Dn(L,se,P){Te=Math.max(Nt?.55:.22,Te-L*.032),je=Math.max(.24+Te*.35,je*Math.exp(-L*.72)),Mt+=L*(.45+je*1.95),It.update(L),S.rotation.x=It.x,S.rotation.z=It.y,ke.rotation.x=st+se*Te*1.25;let xe=L*Te*1.85;for(let Oe of ee)Oe.mesh.rotation.z+=xe*Oe.ratio;oe.rotation.z=Math.sin(se*Math.PI*2*6)*(.35+Te*.35),q.rotation.x+=xe*.9;for(let Oe=0;Oe<Z.length;Oe++){let lt=Te*Z.length>Oe;Z[Oe].emissiveIntensity=lt?1.85:.22}let _e=Ye;Ye+=L*(.38+Te*1.25),he.rotation.y=-Ye;let Le=(Ye-_e)*(Ze/.065);for(let Oe=0;Oe<D.length;Oe++)D[Oe].rotation.x+=Le;let Je=-Ye,Pt=Math.cos(Je+.09)*Ze,St=Math.sin(Je+.09)*Ze;for(let Oe=0;Oe<Gt.length;Oe++){let lt=Gt[Oe];lt.age+=L*(.8+Te*.65),lt.age>2.15?(lt.age=0,lt.x=Pt,lt.y=z+.32,lt.z=St):(lt.y+=L*.36,lt.x+=Math.sin(se*2+lt.age*4)*L*.08);let yr=lt.age/2.15,Ad=Math.sin(yr*Math.PI);ut.position.set(lt.x,lt.y,lt.z),ut.scale.setScalar(Math.max(.001,(.45+yr*1.45)*Ad)),ut.updateMatrix(),ft.setMatrixAt(Oe,ut.matrix)}ft.instanceMatrix.needsUpdate=!0;let gt=Tt.update(L),Ve=zt(-.35,-1.18,gt);for(let Oe=0;Oe<ie.length;Oe++){let lt=ie[Oe];ze.set(0,-lt,0),ve.makeRotationFromEuler(ze),ve.setPosition(Math.cos(lt)*.55,-.6,Math.sin(lt)*.55),ze.set(0,0,Ve),ye.makeRotationFromEuler(ze),ye.setPosition(0,.18,0),ve.multiply(ye),Pe.setMatrixAt(Oe,ve)}Pe.instanceMatrix.needsUpdate=!0;let tt=dt.update(L);it.emissiveIntensity=tt,me.rotation.y=se*.9,ct.uniforms.uTime.value=se,ct.uniforms.uOpacity.value=.07+(tt-.9)*.05,h.intensity=1.25+tt*.55,I.emissiveIntensity=1.35+Te*.85,Mn.uniforms.uTime.value=se,Mn.uniforms.uSwirlPhase.value=Mt,Mn.uniforms.uVortex.value=je,w.uniforms.uTime.value=se,w.uniforms.uSwirlPhase.value=Mt,w.uniforms.uVortex.value=je,J.uniforms.uSwirlGlow.value=Ut(je*.32,0,1),a.update(L,P)}function Li(L){a.apply(L)}function un(L){(L==="hero"||L==="climax")&&(Te=1.18,je=1.85,Mt=2.4,Nt=!0,Tt.snap(1),dt.snap(2.6),Ye=1.05),Dn(.016,3.1,{x:.06,y:.04})}return{id:3,roman:"ACT III",title:"\u5348\u591C\u5929\u6587\u949F",subtitle:"\u53D1\u6761\u9EC4\u94DC\u6C34\u6676\u7403 \xB7 CLOCKWORK BRASS HOROLOGIUM",defaultHint:"\u62E7\u52A8\u53F3\u4FA7\u8774\u8776\u53D1\u6761 \xB7 \u5FEB\u901F\u62E8\u6643\u6C34\u6676\u7403\u6380\u8D77\u788E\u91D1\u66B4\u98CE\u96EA \xB7 \u6EDA\u8F6E\u63A8\u8FD1\u770B\u6446\u8F6E\u4E0E\u5217\u8F66",transTint:new Ce(9224959),cameraRig:a,getProgress:Ct,getPostOpts:()=>({bloomStrength:.48,bloomThreshold:.8,starburst:.32,focusDist:a.getFocusDistance(),aperture:.5,aoStrength:.78,aoRadius:.32,refractMeshes:[$]}),scene:o,interactables:Ne,onPointerDown:Xn,onPointerMove:Ti,onPointerUp:jt,update:Dn,applyCamera:Li,setCaptureState:un}}var Dv=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Uv=`
uniform float uTime;
uniform float uSurge;
varying vec3 vDir;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  // Support upside-down reflection rays by taking abs(vDir.y) when needed, or natural dome y
  vec3 d = normalize(vDir);
  float h = clamp(d.y, 0.0, 1.0);

  vec3 zenith = vec3(0.012, 0.022, 0.068);
  vec3 horizon = vec3(0.024, 0.065, 0.118);
  vec3 sky = mix(horizon, zenith, pow(h, 0.65));

  vec2 uv = d.xz / (h + 0.22);
  vec3 aurora = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float speed = (0.14 + fi * 0.05) * (1.0 + uSurge * 0.8);
    float wave = sin(uv.x * (1.65 + fi * 0.72) + uTime * speed + noise2(uv * 1.45 + fi * 3.1) * 3.0);
    // Centered across the -Z polar vista (uv.y ~ -1.6) directly behind the Polaris Sanctuary!
    float ribbon = exp(-abs(uv.y + 1.65 + wave * 0.52 - (fi - 1.0) * 0.55) * (2.6 + fi * 0.5));
    float verticalMask = smoothstep(0.04, 0.22, h) * smoothstep(0.92, 0.36, h);
    float striations = 0.55 + 0.45 * noise2(vec2(uv.x * 16.0 + uTime * 0.35, h * 9.0 + fi));

    vec3 cGreen = vec3(0.14, 1.0, 0.66);
    vec3 cCyan = vec3(0.20, 0.85, 1.0);
    vec3 cViolet = vec3(0.72, 0.32, 1.0);
    vec3 ribCol = mix(cGreen, cCyan, fi * 0.45);
    ribCol = mix(ribCol, cViolet, smoothstep(0.24, 0.68, h));

    aurora += ribCol * ribbon * verticalMask * striations * (0.92 + uSurge * 0.75);
  }

  vec2 starGrid = d.xz / (h + 0.35) * 44.0;
  vec2 starId = floor(starGrid);
  vec2 starF = fract(starGrid) - 0.5;
  float sRnd = hash21(starId);
  float starDot = smoothstep(0.14, 0.0, length(starF));
  float star = step(0.968, sRnd) * starDot * smoothstep(0.08, 0.35, h);
  float twinkle = 0.6 + 0.4 * sin(uTime * 3.2 + sRnd * 60.0);
  sky += vec3(0.9, 0.96, 1.0) * star * twinkle * 1.35;

  gl_FragColor = vec4(sky + aurora, 1.0);
}
`,Hv=`
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec4 vScreenPos;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vScreenPos = projectionMatrix * viewMatrix * wp;
  gl_Position = vScreenPos;
}
`,Nv=`
uniform sampler2D tMirror;
uniform sampler2D tVeins;
uniform float uTime;
uniform float uEnergy;
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec4 vScreenPos;

void main() {
  vec3 V = normalize(cameraPosition - vWorldPos);
  float ndv = clamp(V.y, 0.02, 1.0);
  float fresnel = 0.38 + 0.58 * pow(1.0 - ndv, 2.8);

  // Subtle ice-micro-undulation ripple on planar mirror UV
  vec2 worldUV = vWorldPos.xz * 0.12;
  vec2 ripple = vec2(
    sin(vWorldPos.x * 3.2 + vWorldPos.z * 2.1) * 0.0032,
    cos(vWorldPos.z * 3.6 - vWorldPos.x * 1.8) * 0.0032
  );

  // Mirror camera renders with flipped Y; screen X matches, screen Y flips!
  vec2 sUv = (vScreenPos.xy / max(vScreenPos.w, 1e-4)) * 0.5 + 0.5;
  vec2 reflUv = clamp(vec2(sUv.x, 1.0 - sUv.y) + ripple, vec2(0.003), vec2(0.997));
  vec3 mirrorCol = texture2D(tMirror, reflUv).rgb;

  // 2-Layer Parallax Offset Mapping into deep frozen abyssal ice!
  vec2 parallaxDir = (V.xz / max(ndv + 0.25, 0.28));
  float shallowCrack = texture2D(tVeins, worldUV * 1.65 - parallaxDir * 0.016).r;
  float deepFracture = texture2D(tVeins, worldUV * 0.95 - parallaxDir * 0.072).g;

  vec3 abyssBase = vec3(0.008, 0.020, 0.045);
  vec3 crackCol = vec3(0.32, 0.78, 0.96) * shallowCrack * (0.11 + uEnergy * 0.07)
                + vec3(0.09, 0.42, 0.72) * deepFracture * (0.14 + uEnergy * 0.08);

  // Distance radial fade so horizon blends seamlessly into aurora mist
  float distFade = 1.0 - smoothstep(7.0, 20.0, length(vWorldPos.xz));
  vec3 col = mix(abyssBase + crackCol, mirrorCol * 1.06 + crackCol * 0.35, fresnel);
  col = mix(vec3(0.016, 0.046, 0.090), col, distFade);

  gl_FragColor = vec4(col, 1.0);
}
`,jn=new yn,nd=new R,da=new R;function id(i=!1){let e=[],t=i?-.65:.15,n=new Sn([new R(-.32,.48,0),new R(0,.52,0),new R(.28,.56,0),new R(.38,.88,Math.sin(t)*.08),new R(.48*Math.cos(t),.96,Math.sin(t)*.22)]);e.push(new En(n,24,.078,8,!1));let s=[[-.28,0,-.07,-.26,.48,-.06],[-.24,0,.07,-.24,.48,.06],[.24,0,-.07,.22,.54,-.06],[.28,0,.07,.25,.54,.06]];for(let[c,l,h,u,d,f]of s)e.push(new En(new ar(new R(c,l,h),new R(u,d,f)),4,.024,6,!1));let r=.4,o=.95,a=Math.sin(t)*.16;for(let c of[-1,1]){let l=new Sn([new R(r,o,a),new R(r-.06,o+.2,a+c*.14),new R(r-.14,o+.38,a+c*.24)]);e.push(new En(l,12,.015,5,!1)),e.push(H(rs({sides:5,radius:.032,height:.14}),{x:r-.14,y:o+.42,z:a+c*.24}))}return Be(e,!0)}function sd({envMap:i,textures:e,refractTex:t,audio:n,onAwaken:s,onHint:r}){let o=new In;o.background=new Ce(263953),o.environment=i;let a=new ci(new R(0,2.52,8.75),new R(0,2.28,0),{parallaxX:.82,parallaxY:.46,minZoom:.56,maxZoom:1.18}),c=new on(512,512,{type:ki,minFilter:Zt,magFilter:Zt,depthBuffer:!0});o.add(new ri(2045522,.9));let l=new wn(14219007,2.3);l.position.set(5.5,9.5,6.5),o.add(l);let h=new wn(12155135,1.65);h.position.set(-6.5,5.5,-5),o.add(h);let u=new Gn(5439448,2.1,10.5,1.5);u.position.set(0,2.4,0),o.add(u);let d=new Ot({vertexShader:Dv,fragmentShader:Uv,side:_n,depthWrite:!1,uniforms:{uTime:{value:0},uSurge:{value:0}}}),f=new B(new Qe(52,48,32),d);o.add(f);let g=new Ot({vertexShader:Hv,fragmentShader:Nv,uniforms:{tMirror:{value:c.texture},tVeins:{value:e.iceVeinTex},uTime:{value:0},uEnergy:{value:.35}}}),x=new B(new ss(22,72),g);x.rotation.x=-Math.PI*.5,x.position.y=0,o.add(x);let m=oi(new bt({color:16244650,roughnessMap:e.brassTex,metalness:.96,roughness:.16,envMapIntensity:2.55}),{anisoStrength:.4,patinaStrength:.14}),p=[];for(let[z,te]of[[1.65,.018],[2.85,.022],[4.15,.015]])p.push(H(new _s(z,z+te,72),{y:.008,rx:-Math.PI*.5}));let T=[];for(let z=0;z<=36;z++){let te=z/36,He=zt(-1.26,1.26,te),We=3.05,Ie=Math.sin(He)*We,De=Math.cos(He)*We*.72+.55,he=2.68+Math.cos((te-.5)*Math.PI)*.55;T.push(new R(Ie,he,De))}p.push(new En(new Sn(T),56,.018,8,!1));let v=new ot;o.add(v);let E=[],I=Zr(t,{tint:14875391,emissive:1789296,emissiveIntensity:.38,dispersion:.03}),b=[];for(let z=0;z<2;z++){let te=[];for(let He=0;He<=84;He++){let We=He/84,Ie=We*4.2*Math.PI*2+z*Math.PI,De=zt(1.75,.08,Math.pow(We,.88)),he=.25+We*4.25;te.push(new R(Math.cos(Ie)*De,he,Math.sin(Ie)*De))}b.push(new En(new Sn(te),100,.017,7,!1))}v.add(new B(Be(b),m));let A=[];for(let z=0;z<3;z++){let te=new B(new mt(1.45-z*.32,.013,8,56),m);te.position.y=1.45+z*.95,te.rotation.x=.35*(z%2===0?1:-1),te.rotation.z=.22*(z-1),v.add(te),A.push(te)}let F=220,M=rs({sides:6,radius:.11,height:.38,waist:.16}),S=new xi(M,I,F),k=new sn;for(let z=0;z<F;z++){let te=z/F,He=z*2.3999632,We=zt(1.68,.12,Math.pow(te,.82))*(.88+.18*Math.sin(z*3.7)),Ie=.32+te*4.12,De=zt(1.15,.58,te);k.position.set(Math.cos(He)*We,Ie,Math.sin(He)*We),k.rotation.set(.12*Math.sin(z),-He,.15*Math.cos(z)),k.scale.setScalar(De),k.updateMatrix(),S.setMatrixAt(z,k.matrix)}v.add(S),E.push(S);let Z=new B(id(!1),I);Z.position.set(-1.95,.02,.65),Z.rotation.y=.52;let ae=new B(id(!0),I);ae.position.set(1.98,.02,.58),ae.rotation.y=Math.PI-.58,o.add(Z,ae),E.push(Z,ae);let U=new an({color:16777215,emissive:new Ce(9238271),emissiveIntensity:1.85,metalness:.3,roughness:.08}),O=new B(Ln({points:8,outerRadius:.52,innerRadius:.18,depth:.16}),U);O.position.y=4.78,v.add(O);let X=ur({color:6488026,opacity:.1,power:2.5}),ue=new B(new nt(.28,1.85,5.2,24,1,!0),X);ue.position.y=2.45,o.add(ue);let ee=[],ne=[],oe=[7273696,7657727,11050239,16103679,16769694,8323012,9160959,14199039];for(let z=0;z<8;z++){let te=z/7,He=zt(-1.18,1.18,te),We=3.05,Ie=Math.sin(He)*We,De=Math.cos(He)*We*.72+.55,he=2.68+Math.cos((te-.5)*Math.PI)*.55;p.push(H(new nt(.005,.005,.85,6),{x:Ie,y:he-.42,z:De}));let D=new ot;D.position.set(Ie,he-.85,De),o.add(D);let we=Zr(t,{tint:oe[z],emissive:oe[z],emissiveIntensity:.35,dispersion:.032}),Ee=.78-Math.abs(z-3.5)*.055,Xe=new B(rs({sides:6,radius:.115,height:Ee,waist:.24}),we);D.add(Xe),E.push(Xe);let qe=new B(new $e(.48,1.15,.48),new Bt({visible:!1})),ht={idx:z,pendulum:D,baseX:Ie,baseY:he-.85,baseZ:De,clapperDrop:Ee*.42,mat:we,swing:new vt(0,185,7),glow:new vt(.35,90,12),cooldown:0};qe.userData={kind:"chime",chimeObj:ht,label:`\u8F7B\u62C2\u7409\u7483\u51B0\u6676\u98CE\u94C3 \xB7 \u7B2C ${z+1} \u97F3`},D.add(qe),ee.push(qe),ne.push(ht)}let ce=new xi(new Qe(.034,10,8),m,8);o.add(ce);let be=new sn;o.add(new B(Be(p),m));let q=[],j=rs({sides:4,radius:.085,height:.34,waist:.15}),Se=new xi(j,I,36);o.add(Se),E.push(Se);let Ne=new Rt,Re=new Rt,Ue=new Rt,ke=new Ai;for(let z=0;z<6;z++){let te=z/6*Math.PI*2+.52,He=2.25;q.push({x:Math.cos(te)*He,z:Math.sin(te)*He,bloom:new vt(.2,95,12)})}let W=[],ge=[[-2.25,3.55,-.35],[-1.35,4.45,.25],[0,4.78,.55],[1.35,4.45,.25],[2.25,3.55,-.35]];for(let z=0;z<5;z++){let[te,He,We]=ge[z],Ie=new ot;Ie.position.set(te,He,We),o.add(Ie);let De=new an({color:15399679,emissive:new Ce(5175002),emissiveIntensity:.48,roughness:.15,metalness:.5}),he=new B(Ln({points:6,outerRadius:.24,innerRadius:.09,depth:.08}),De),D=new B(new mt(.32,.012,8,32),m);Ie.add(he,D);let we=new ar(new R(te,He,We),new R(0,4.78,0)),Ee=new Bt({color:10420204,transparent:!0,opacity:0,blending:fn});o.add(new B(new En(we,6,.014,6,!1),Ee));let Xe=new B(new Qe(.46,10,8),new Bt({visible:!1})),qe={idx:z,lit:!1,group:Ie,starMesh:he,halo:D,mat:De,beamMat:Ee,glowSpring:new vt(.45,110,12)};Xe.userData={kind:"star_node",nodeObj:qe,label:`\u70B9\u4EAE\u7B2C ${z+1} \u9897\u6781\u5149\u661F\u5195\u8282\u70B9`},Ie.add(Xe),ee.push(Xe),W.push(qe)}let C=72,fe=new wt,V=new Float32Array(C*3);for(let z=0;z<C;z++)V[z*3+1]=-20;fe.setAttribute("position",new yt(V,3));let re=new On(fe,new Bn({map:e.sparkTex,color:12582888,size:.28,transparent:!0,opacity:.85,depthWrite:!1,blending:fn}));o.add(re);let Y=0,Ae=0,Me=0,_=!1,y=new vt(.38,75,13),N=new vt(0,55,11);function de(){let z=Ae>=2?1:0,te=Me>=1?1:0,He=_?1:0;return{current:Math.min(3,z+te+He),total:3}}function le(){if(!_&&(Me>=3||Me>=2&&Ae>=4||Ae>=6)){_=!0;for(let z of W)z.lit=!0,z.glowSpring.target=3.2;y.target=2.45,N.target=1,a.focusOn(0,.65,0,.82,2.2),n.playSigilAwaken(),s(4,"\u7B2C\u56DB\u58F0\u90E8\u5DF2\u5524\u9192 \xB7 \u6C34\u6676\u73BB\u7483\u7434\u4E0E\u6781\u5149\u5723\u548F\u9F50\u9E23"),r("\u5317\u6781\u661F\u5723\u6BBF\u5168\u51A0\u70B9\u4EAE \xB7 \u9ED1\u51B0\u5B9E\u65F6\u5012\u6620\u6F2B\u5929\u6781\u5149\uFF0C\u7EC8\u7AE0\u5DF2\u5C31\u7EEA")}}function ie(z){z.cooldown>0||(z.cooldown=.16,z.swing.impulse((Math.random()>.5?1:-1)*5.2),z.glow.snap(2.6),z.glow.target=.55,n.playCrystalHarmonica(z.idx),Ae++,le())}function Pe(z){z.lit?(z.glowSpring.impulse(4),n.playCrystalHarmonica(z.idx+2)):(z.lit=!0,Me++,z.glowSpring.target=3,n.playCrystalHarmonica(z.idx+2),le())}function ve(z){if(!z)return!1;let{kind:te,chimeObj:He,nodeObj:We}=z.object.userData;return te==="chime"&&He?(ie(He),!0):te==="star_node"&&We?(Pe(We),!0):!1}function ye(z){if(!z)return;let{kind:te,chimeObj:He}=z.object.userData;te==="chime"&&He&&ie(He)}function ze(z){let te=z.x*4.4,He=Ut(2.35+z.y*2.4,.25,5.2);V[Y*3]=te+(Math.random()-.5)*.14,V[Y*3+1]=He+(Math.random()-.5)*.14,V[Y*3+2]=1.65,Y=(Y+1)%C;for(let We of q){let Ie=Math.hypot(We.x-te,We.z-1.2);We.bloom.target=Ie<2.2?1:_?.85:.22}return!1}function it(){}function me(z,te){jn.fov=te.fov,jn.aspect=te.aspect,jn.near=te.near,jn.far=te.far,jn.position.set(te.position.x,-te.position.y,te.position.z),te.getWorldDirection(da),nd.set(jn.position.x+da.x*10,jn.position.y-da.y*10,jn.position.z+da.z*10),jn.up.set(0,-1,0),jn.lookAt(nd),jn.updateProjectionMatrix(),jn.updateMatrixWorld();let He=z.shadowMap.autoUpdate;z.shadowMap.autoUpdate=!1,x.visible=!1,z.setRenderTarget(c),z.clear(),z.render(o,jn),x.visible=!0,z.shadowMap.autoUpdate=He}function ct(z,te,He){d.uniforms.uTime.value=te,d.uniforms.uSurge.value=N.update(z);let We=y.update(z);I.uniforms.uTime.value=te,I.uniforms.uEmissiveIntensity.value=We*.42,g.uniforms.uTime.value=te,g.uniforms.uEnergy.value=We,X.uniforms.uTime.value=te,X.uniforms.uOpacity.value=.06+We*.035,U.emissiveIntensity=1.45+We*1.35,O.rotation.y=te*.75,v.rotation.y=te*.16,u.intensity=1.85+We*1.1;for(let Ie=0;Ie<A.length;Ie++)A[Ie].rotation.y=te*(Ie%2===0?.35:-.42);for(let Ie=0;Ie<ne.length;Ie++){let De=ne[Ie];De.cooldown>0&&(De.cooldown-=z);let D=De.swing.update(z)*.12;De.pendulum.rotation.z=D,De.pendulum.rotation.x=Math.sin(te*1.5+De.idx)*.03,De.mat.uniforms.uTime.value=te,De.mat.uniforms.uEmissiveIntensity.value=De.glow.update(z),be.position.set(De.baseX+Math.sin(D)*De.clapperDrop*.85,De.baseY-Math.cos(D)*De.clapperDrop,De.baseZ),be.updateMatrix(),ce.setMatrixAt(Ie,be.matrix)}ce.instanceMatrix.needsUpdate=!0;for(let Ie=0;Ie<q.length;Ie++){let De=q[Ie],he=De.bloom.update(z),D=te*.25+Ie,we=zt(-.22,-.95,he);for(let Ee=0;Ee<6;Ee++)ke.set(0,D+Ee/6*Math.PI*2,0),Ne.makeRotationFromEuler(ke),Ne.setPosition(De.x,.04,De.z),ke.set(0,0,we),Ue.makeRotationFromEuler(ke),Ue.setPosition(.08,.15,0),Re.multiplyMatrices(Ne,Ue),Se.setMatrixAt(Ie*6+Ee,Re)}Se.instanceMatrix.needsUpdate=!0;for(let Ie=0;Ie<W.length;Ie++){let De=W[Ie],he=De.glowSpring.update(z),D=De.lit?0:Math.pow(Math.max(0,Math.sin(te*1.8+Ie*1.2)),4)*.85;De.mat.emissiveIntensity=he+D,De.starMesh.rotation.y=te*.9+Ie,De.halo.rotation.x=Math.sin(te*.8+Ie)*.6,De.halo.rotation.y=te*.5,De.beamMat.opacity=Ut((he-.6)*.32,0,.72)}for(let Ie=0;Ie<C;Ie++)V[Ie*3+1]>-10&&(V[Ie*3+1]-=z*.22,V[Ie*3+1]<.05&&(V[Ie*3+1]=-20));fe.attributes.position.needsUpdate=!0,a.update(z,He)}function at(z){a.apply(z)}function Ze(z){if(z==="hero"||z==="climax"){for(let te of W)te.lit=!0,te.glowSpring.snap(3.2);for(let te of q)te.bloom.snap(.95);_=!0,y.snap(2.45),N.snap(1)}ct(.016,4.2,{x:-.04,y:.05})}return{id:4,roman:"ACT IV",title:"\u5317\u6781\u661F\u5723\u6BBF",subtitle:"\u6781\u5149\u7409\u7483\u51B0\u6676\u5947\u5883 \xB7 AURORA DICHROIC SANCTUARY",defaultHint:"\u8F7B\u62C2\u7409\u7483\u51B0\u6676\u98CE\u94C3 \xB7 \u70B9\u4EAE\u4E94\u9897\u6781\u5149\u661F\u5195\u8282\u70B9 \xB7 \u4FEF\u89C6\u9ED1\u51B0\u6B23\u8D4F\u5B9E\u65F6\u6781\u5149\u5012\u5F71\u4E0E\u6DF1\u6E0A\u51B0\u7EB9",transTint:new Ce(7142626),cameraRig:a,getProgress:de,getPostOpts:()=>({bloomStrength:.56,bloomThreshold:.76,starburst:.65,focusDist:a.getFocusDistance(),aperture:.44,aoStrength:.45,aoRadius:.3,refractMeshes:E,onBeforeMainRender:me}),scene:o,interactables:ee,onPointerDown:ve,onHoverHit:ye,onPointerMove:ze,onPointerUp:it,update:ct,applyCamera:at,setCaptureState:Ze}}function rd({envMap:i,textures:e,refractTex:t,audio:n,onOpenCardStudio:s,onSelectAct:r}){let o=new In;o.background=new Ce(591627),o.environment=i;let a=new ci(new R(0,2.75,8.95),new R(0,1.85,0),{parallaxX:.85,parallaxY:.46,minZoom:.58,maxZoom:1.18});o.add(new ri(3812411,.92));let c=new wn(16770488,2.55);c.position.set(5.5,9.5,6.5),c.castShadow=!0,c.shadow.mapSize.set(2048,2048),c.shadow.camera.near=2,c.shadow.camera.far=22,c.shadow.camera.left=-5.5,c.shadow.camera.right=5.5,c.shadow.camera.top=6.5,c.shadow.camera.bottom=-2.5,c.shadow.bias=-5e-4,c.shadow.radius=3.2,o.add(c);let l=new wn(8118527,1.35);l.position.set(-6.5,5.5,-5),o.add(l);let h=new Gn(16757847,2.3,10,1.5);h.position.set(0,2.25,.4),o.add(h);let u=oi(new bt({color:16043904,roughnessMap:e.brassTex,metalness:.96,roughness:.18,clearcoat:.35,envMapIntensity:2.5}),{anisoStrength:.42,patinaStrength:.2}),d=new bt({color:16774628,metalness:1,roughness:.04,clearcoat:1,envMapIntensity:2.8}),f=new bt({color:6034205,bumpMap:e.paperTex,bumpScale:.014,roughness:.78,sheen:.95,sheenColor:new Ce(16758968)}),g=new bt({color:1591350,bumpMap:e.paperTex,bumpScale:.014,roughness:.78,sheen:.88,sheenColor:new Ce(10420182)}),x=new bt({color:16512488,bumpMap:e.clayBump,bumpScale:.01,roughness:.42,clearcoat:.55}),m=Zr(t,{tint:14679039,emissive:2516352,emissiveIntensity:.42,dispersion:.03}),p=new B(new ss(22,64),new bt({color:920077,roughness:.18,metalness:.42,clearcoat:.88,envMapIntensity:1.85}));p.rotation.x=-Math.PI*.5,p.receiveShadow=!0,o.add(p);let T=new ot;o.add(T);let v=[],E=[H(new nt(2.88,3.08,.28,64),{y:.14}),H(new mt(2.58,.075,14,64),{y:3.45,rx:Math.PI*.5})],I=new B(new nt(.28,.34,3.15,8),d);I.position.y=1.95,T.add(I);let b=new B(new nt(2.7,2.76,.18,64),f);b.position.y=.34,b.receiveShadow=!0,T.add(b);let A=[],F=[],M=Math.PI*2/8;for(let _=0;_<8;_++){let y=_*M,N=H(new $t(2.64,1.08,12,1,!1,y,M),{y:3.99});_%2===0?A.push(N):F.push(N);let de=y+M*.5;E.push(H(new mt(.48,.025,8,18,Math.PI),{x:Math.cos(de)*2.56,y:3.42,z:Math.sin(de)*2.56,ry:-de+Math.PI*.5,rz:Math.PI}))}T.add(new B(Be(A),f)),T.add(new B(Be(F),g));let S=new B(oa({teeth:28,outerRadius:1.48,innerRadius:1.24,thickness:.08,spokes:6}),u);S.rotation.x=Math.PI*.5,S.position.y=3.42;let k=new B(Ln({points:8,outerRadius:.54,innerRadius:.19,depth:.15}),u);k.position.y=4.82,T.add(S,k);let Z=[];for(let _=0;_<16;_++){let y=_/16*Math.PI*2,N=H(rs({sides:6,radius:.058,height:.24,waist:.2}),{x:Math.cos(y)*2.58,y:3.24,z:Math.sin(y)*2.58});_%2===0?Z.push(N):E.push(N)}let ae=Vu({radius:.052,height:3.05,turns:5.5});for(let _=0;_<4;_++){let y=_/4*Math.PI*2+Math.PI*.25;E.push(H(ae.clone(),{x:Math.cos(y)*2.42,y:1.92,z:Math.sin(y)*2.42}));let N=_/4*Math.PI*2;E.push(H(new nt(.022,.022,3.02,10),{x:Math.cos(N)*1.68,y:1.92,z:Math.sin(N)*1.68}))}ae.dispose();let U=new B(Be(E),u);U.castShadow=!0,T.add(U);let O=new B(Be(Z),m);T.add(O),v.push(O);let X=[],ue=[],ee=["\u53CC\u51FB\u56DE\u8BBF\u7B2C\u4E00\u5E55 \xB7 \u677E\u6797\u661F\u591C\u4E66","\u53CC\u51FB\u56DE\u8BBF\u7B2C\u4E8C\u5E55 \xB7 \u59DC\u997C\u5947\u9047\u5C4B","\u53CC\u51FB\u56DE\u8BBF\u7B2C\u4E09\u5E55 \xB7 \u5348\u591C\u5929\u6587\u949F","\u53CC\u51FB\u56DE\u8BBF\u7B2C\u56DB\u5E55 \xB7 \u5317\u6781\u661F\u5723\u6BBF"];for(let _=0;_<4;_++){let y=_/4*Math.PI*2,N=new ot;N.position.set(Math.cos(y)*1.68,.45,Math.sin(y)*1.68),N.rotation.y=-y+Math.PI*.5,T.add(N);let de=new B(new nt(.56,.62,.12,32),u);de.position.y=.06,N.add(de);let le=new ot;if(le.position.y=.14,N.add(le),_===0){let Pe=[],ve=[H(Ln({points:6,outerRadius:.18,innerRadius:.07,depth:.05}),{y:1.16})];for(let ye=0;ye<3;ye++)Pe.push(H(new $t(.42-ye*.09,.48,6),{y:.28+ye*.28})),ve.push(H(new mt(.39-ye*.09,.016,8,24),{y:.06+ye*.28,rx:Math.PI*.5}));le.add(new B(Be(Pe),g),new B(Be(ve),u))}else if(_===1)le.add(new B(Be([H(Ht(.46,.48,.42,.04,.02),{x:-.14,y:.24,z:-.06}),H(new mt(.12,.032,8,18),{x:.22,y:.36,z:.14,rx:Math.PI*.5})]),f),new B(Be([H(new $t(.38,.34,4),{x:-.14,y:.62,z:-.06,ry:Math.PI*.25}),H(new Qe(.2,16,14),{x:.22,y:.2,z:.14}),H(new Qe(.14,16,14),{x:.22,y:.47,z:.14})]),x),new B(H(new nt(.11,.11,.2,14),{x:.22,y:.68,z:.14}),g));else if(_===2){let Pe=Be([H(new nt(.16,.16,.56,18),{x:.06,y:.28,rz:Math.PI*.5}),H(Ht(.3,.38,.34,.03,.02),{x:-.22,y:.34})]),ve=[H(new $e(.34,.04,.38),{x:-.22,y:.54}),H(new nt(.075,.052,.24,14),{x:.22,y:.5})];for(let ye=-1;ye<=1;ye++)for(let ze of[-.18,.18])ve.push(H(new nt(.095,.095,.035,14),{x:ye*.2,y:.1,z:ze,rx:Math.PI*.5}));le.add(new B(Pe,f),new B(Be(ve),u))}else{let Pe=[];for(let ye=0;ye<7;ye++){let ze=ye/6*Math.PI*2;Pe.push(H(rs({sides:6,radius:ye===0?.15:.105,height:ye===0?1.22:.76,waist:.2}),{x:ye===0?0:Math.cos(ze)*.24,y:ye===0?.62:.38,z:ye===0?0:Math.sin(ze)*.24,rx:ye===0?0:Math.sin(ze)*.22,rz:ye===0?0:-Math.cos(ze)*.22}))}let ve=new B(Be(Pe),m);v.push(ve),le.add(ve,new B(H(new mt(.38,.014,8,28),{y:.72,rx:.45}),u))}let ie=new B(new nt(.62,.62,1.35,14),new Bt({visible:!1}));ie.position.y=.65,ie.userData={kind:"tribute",actTarget:_+1,label:`${ee[_]}\uFF08\u5DE6\u53F3\u62D6\u52A8\u53EF\u65CB\u8F6C\u8D70\u9A6C\u706F\uFF09`},le.add(ie),X.push(ie),ue.push(le)}let ne=new ot;ne.position.set(0,1.85,2.38),o.add(ne);let oe=new B(Ht(.92,.64,.06,.04,.015),f),ce=new B(Be([H(Ht(.96,.68,.04,.04,.012),{z:-.01}),H(new nt(.115,.115,.032,24),{z:.036,rx:Math.PI*.5})]),u);ne.add(oe,ce);let be=new B(new $e(1.25,.95,.45),new Bt({visible:!1}));be.userData={kind:"open_card",label:"\u70B9\u51FB\u5F00\u542F\u70EB\u91D1\u5723\u8BDE\u793C\u7B3A\u5DE5\u574A \xB7 4 \u6B3E\u9986\u85CF\u7EB8\u5F20\u4E3B\u9898\u5B9A\u5236\u4FDD\u5B58"},ne.add(be),X.push(be);let q=new B(new nt(2.8,2.8,3.8,24),new Bt({visible:!1}));q.position.y=1.9,q.userData={kind:"spin_carousel",label:"\u5DE6\u53F3\u62D6\u52A8\u65CB\u8F6C\u7687\u5BB6\u516B\u97F3\u76D2\u8D70\u9A6C\u706F"},T.add(q),X.push(q);let j=320,Se=new wt,Ne=new Float32Array(j*3);for(let _=0;_<j;_++)Ne[_*3]=(Math.random()-.5)*14,Ne[_*3+1]=Math.random()*8,Ne[_*3+2]=(Math.random()-.5)*10;Se.setAttribute("position",new yt(Ne,3)),o.add(new On(Se,new Bn({map:e.sparkTex,color:16771248,size:.2,transparent:!0,opacity:.85,depthWrite:!1,blending:fn})));let Re=new vt(.32,40,8),Ue=0,ke=!1,W=0,ge=0,C=0;function fe(_,y){if(!_)return!1;let{kind:N,actTarget:de}=_.object.userData;if(N==="open_card")return n.playWaxSealBreak(),s(),!0;if(N==="tribute"){let le=performance.now();return le-ge<360&&C===de&&r?(r(de),!0):(ge=le,C=de,ke=!0,W=y.x,!0)}return N==="spin_carousel"?(ke=!0,W=y.x,!0):!1}function V(_){if(!ke)return!1;let y=_.x-W;return W=_.x,Ue+=y*3.8,Re.impulse(y*12),!0}function re(){ke=!1,Re.target=.32}function Y(_,y,N){let de=Re.update(_);ke||(Ue+=de*_),T.rotation.y=Ue,S.rotation.z=-y*.6,k.rotation.y=y*1.1,m.uniforms.uTime.value=y;for(let ie=0;ie<ue.length;ie++)ue[ie].position.y=.14+Math.sin(y*2.4+ie*Math.PI*.5)*.14,ue[ie].rotation.y=y*.5;ne.position.y=1.65+Math.sin(y*2.2)*.08,ne.rotation.y=Math.sin(y*1.1)*.14;let le=Se.attributes.position.array;for(let ie=0;ie<j;ie++)le[ie*3+1]-=_*.42,le[ie*3]+=Math.sin(y+ie)*_*.12,le[ie*3+1]<.1&&(le[ie*3+1]=7.8);Se.attributes.position.needsUpdate=!0,a.update(_,N)}function Ae(_){a.apply(_)}function Me(){Ue=.38,Y(.016,2.5,{x:.06,y:.04})}return{id:5,roman:"FINALE \xB7 V",title:"\u5E73\u5B89\u591C\u56DB\u91CD\u594F",subtitle:"\u7687\u5BB6\u516B\u97F3\u76D2\u8D70\u9A6C\u706F\u4E0E\u70EB\u91D1\u793C\u7B3A \xB7 GRAND CAROUSEL QUARTET",defaultHint:"\u5DE6\u53F3\u62E8\u52A8\u516B\u74E3\u7687\u51A0\u8D70\u9A6C\u706F \xB7 \u53CC\u51FB\u5FAE\u7F29\u5C55\u53F0\u56DE\u8BBF\u5267\u5E55 \xB7 \u70B9\u51FB\u524D\u65B9\u70EB\u91D1\u4FE1\u7B3A\u5B9A\u5236\u8D3A\u5361",transTint:new Ce(16308108),cameraRig:a,getProgress:()=>({current:4,total:4}),getPostOpts:()=>({bloomStrength:.5,bloomThreshold:.8,starburst:.52,focusDist:a.getFocusDistance(),aperture:.46,aoStrength:.72,aoRadius:.34,refractMeshes:v}),scene:o,interactables:X,onPointerDown:fe,onPointerMove:V,onPointerUp:re,update:Y,applyCamera:Ae,setCaptureState:Me}}var Kr={burgundy:{name:"\u52C3\u826E\u7B2C\u706B\u6F06",bgStops:["#3d131c","#220b10","#110608"],foilStops:["#f9e7bc","#d6a856","#f7dfaa","#9f732d"],textMain:"#f8f0e2",textSub:"rgba(247, 226, 182, 0.76)",sealStops:["#d13b3b","#8d1921","#46080f"]},pine:{name:"\u677E\u6797\u68C9\u7EB8\u7EFF",bgStops:["#1c3f31","#10271e","#08140f"],foilStops:["#faecc8","#dbb265","#f8e4b4","#9e7632"],textMain:"#f6f2e6",textSub:"rgba(232, 244, 226, 0.76)",sealStops:["#d99b38","#9c6417","#4f3008"]},horologium:{name:"\u5348\u591C\u5929\u6587\u84DD",bgStops:["#182b52","#0d1832","#060b19"],foilStops:["#fbe9be","#d8a650","#ffe3a8","#986924"],textMain:"#f2f5fc",textSub:"rgba(220, 232, 255, 0.78)",sealStops:["#b86b35","#7d3f18","#3d1c08"]},aurora:{name:"\u6781\u591C\u7409\u7483\u7D2B",bgStops:["#241b4a","#111836","#070b1a"],foilStops:["#e4fff7","#9ad8ff","#e5c6ff","#7498c8"],textMain:"#f4faff",textSub:"rgba(205, 245, 255, 0.80)",sealStops:["#3ec8b8","#1d7588","#0c3547"]}};function od(i,{to:e,message:t,from:n,theme:s="burgundy"}){let r=Kr[s]||Kr.burgundy,o=i.getContext("2d"),a=i.width,c=i.height,l=o.createRadialGradient(a*.5,c*.38,60,a*.5,c*.5,c*.78);l.addColorStop(0,r.bgStops[0]),l.addColorStop(.58,r.bgStops[1]),l.addColorStop(1,r.bgStops[2]),o.fillStyle=l,o.fillRect(0,0,a,c),o.fillStyle="rgba(255, 245, 225, 0.024)";for(let b=0;b<1800;b++){let A=(Math.sin(b*91.7)*.5+.5)*a,F=(Math.cos(b*47.3)*.5+.5)*c;o.fillRect(A,F,2,2)}let h=o.createLinearGradient(0,0,a,c);if(h.addColorStop(0,r.foilStops[0]),h.addColorStop(.35,r.foilStops[1]),h.addColorStop(.68,r.foilStops[2]),h.addColorStop(1,r.foilStops[3]),o.strokeStyle=h,o.lineWidth=3.2,o.strokeRect(54,54,a-108,c-108),o.lineWidth=1.2,o.strokeRect(72,72,a-144,c-144),o.save(),o.translate(a*.5,275),o.strokeStyle=h,o.globalAlpha=.16,o.lineWidth=1.5,o.beginPath(),o.arc(0,0,145,0,Math.PI*2),o.stroke(),s==="horologium")for(let b=0;b<24;b++){let A=b/24*Math.PI*2;o.beginPath(),o.moveTo(Math.cos(A)*130,Math.sin(A)*130),o.lineTo(Math.cos(A)*145,Math.sin(A)*145),o.stroke()}else s==="aurora"&&(o.rotate(Math.PI/4),o.strokeRect(-102,-102,204,204));o.restore();let u=(b,A,F,M)=>{o.save(),o.translate(b,A),o.scale(F,M),o.strokeStyle=h,o.lineWidth=2.2,o.beginPath(),o.moveTo(0,76),o.bezierCurveTo(0,24,24,0,76,0),o.stroke(),o.beginPath(),o.moveTo(14,48),o.quadraticCurveTo(14,14,48,14),o.stroke(),o.beginPath(),o.arc(28,28,5.5,0,Math.PI*2),o.fillStyle=h,o.fill(),o.restore()};u(72,72,1,1),u(a-72,72,-1,1),u(72,c-72,1,-1),u(a-72,c-72,-1,-1),o.save(),o.translate(a*.5,268),o.strokeStyle=h,o.lineWidth=1.8,o.beginPath(),o.arc(0,0,96,0,Math.PI*2),o.stroke(),o.fillStyle=h,o.beginPath();for(let b=0;b<16;b++){let A=b/16*Math.PI*2-Math.PI*.5,F=b%2===0?b%4===0?78:48:18,M=Math.cos(A)*F,S=Math.sin(A)*F;b===0?o.moveTo(M,S):o.lineTo(M,S)}o.closePath(),o.fill(),o.restore(),o.fillStyle=h,o.textAlign="center",o.font='500 22px Georgia, "Songti SC", serif',o.fillText("N O E L  \xB7  I V   \uFF5C   W I N T E R   Q U A R T E T",a*.5,424),o.font='400 18px Georgia, "Songti SC", serif',o.fillStyle=r.textSub,o.fillText("I \xB7 \u70EB\u91D1\u7EB8\u96D5    II \xB7 \u5B9A\u683C\u9ECF\u571F    III \xB7 \u53D1\u6761\u96EA\u7403    IV \xB7 \u6781\u5149\u7409\u7483",a*.5,464),o.strokeStyle="rgba(244, 223, 174, 0.34)",o.lineWidth=1,o.beginPath(),o.moveTo(220,506),o.lineTo(a-220,506),o.stroke();let d=(e||"\u4EB2\u7231\u7684\u670B\u53CB").trim();o.textAlign="left",o.fillStyle=h,o.font='600 36px "Songti SC", "Noto Serif SC", Georgia, serif',o.fillText(`\u81F4 ${d}\uFF1A`,156,594);let f=(t||"\u613F\u51AC\u591C\u56DB\u91CD\u594F\u7684\u70DB\u5149\u3001\u94F6\u94C3\u3001\u516B\u97F3\u76D2\u4E0E\u6781\u5149\u4F34\u4F60\u6E29\u6696\u8FC7\u51AC\u3002\u5723\u8BDE\u5FEB\u4E50\u3002").trim();o.fillStyle=r.textMain,o.font='400 33px "Songti SC", "Noto Serif SC", Georgia, serif';let g=a-312,x=60,m="",p=682;for(let b=0;b<f.length;b++){let A=f[b];if(A===`
`){o.fillText(m,156,p),m="",p+=x;continue}let F=m+A;o.measureText(F).width>g?(o.fillText(m,156,p),m=A,p+=x):m=F}m&&o.fillText(m,156,p);let T=(n||"\u51AC\u591C\u5BC4\u4FE1\u4EBA").trim();o.textAlign="right",o.fillStyle=h,o.font='500 31px "Songti SC", "Noto Serif SC", Georgia, serif',o.fillText(`\u2014\u2014 ${T}`,a-156,1020),o.font="400 20px Georgia, serif",o.fillStyle=r.textSub,o.fillText("SOLSTITIUM \xB7 DECEMBER \xB7 MMXXVI",a-156,1060);let v=a*.5,E=1178,I=o.createRadialGradient(v-18,E-18,8,v,E,68);I.addColorStop(0,r.sealStops[0]),I.addColorStop(.58,r.sealStops[1]),I.addColorStop(1,r.sealStops[2]),o.fillStyle=I,o.beginPath();for(let b=0;b<=32;b++){let A=b/32*Math.PI*2,F=64+Math.sin(A*5)*3.5+Math.cos(A*3)*2.5,M=v+Math.cos(A)*F,S=E+Math.sin(A)*F;b===0?o.moveTo(M,S):o.lineTo(M,S)}o.closePath(),o.fill(),o.strokeStyle=h,o.lineWidth=2.2,o.beginPath(),o.arc(v,E,48,0,Math.PI*2),o.stroke(),o.fillStyle=h,o.textAlign="center",o.font="600 26px Georgia, serif",o.fillText("IV",v,E+9)}var kn=new URLSearchParams(location.search),ls=kn.has("capture"),Tl=kn.has("skip")||ls,An=document.body,cs=document.getElementById("stage"),Wi=new yn(42,1,.1,120),tn=new ha,Lt=null,Xi=null,ws=null,bs=null,Aa=!1,Fv=0,Ea=document.getElementById("prologue"),gl=document.getElementById("wax-seal-btn"),ad=document.getElementById("env-recipient"),xl=document.getElementById("act-banner"),Bv=document.getElementById("act-roman"),Ov=document.getElementById("act-name"),zv=document.getElementById("act-sub"),fr=document.getElementById("act-progress"),md=document.getElementById("whisper-hint"),ma=document.getElementById("sigil-toast"),dl=document.getElementById("climax-ripple"),vl=document.getElementById("flying-sigil"),os=document.getElementById("cursor-halo"),Gv=document.getElementById("cursor-label"),kv=document.getElementById("btn-home"),gd=document.getElementById("btn-reset-cam"),xd=document.getElementById("btn-sound"),vd=document.getElementById("btn-finale"),yd=document.getElementById("tab-finale"),Vv=document.getElementById("finale-rail-line"),Sl=Array.from(document.querySelectorAll(".act-tab[data-act]")),Ei=document.getElementById("card-modal"),_d=document.getElementById("keepsake-canvas"),mr=document.getElementById("inp-to"),Ca=document.getElementById("inp-msg"),Pa=document.getElementById("inp-from"),Wv=document.getElementById("btn-card-open"),Xv=document.getElementById("btn-card-close"),qv=document.getElementById("btn-download-card"),Yv=document.getElementById("btn-copy-link"),Ma=document.getElementById("copy-feedback"),Ta=Array.from(document.querySelectorAll(".theme-swatch[data-theme]")),gr=Kr[kn.get("theme")]?kn.get("theme"):"burgundy";for(let i of Ta)i.classList.toggle("is-selected",i.dataset.theme===gr);kn.get("to")&&(mr.value=kn.get("to").slice(0,28),ad.textContent=`\u81F4 ${mr.value}`,ad.hidden=!1);kn.get("msg")&&(Ca.value=kn.get("msg").slice(0,120));kn.get("from")&&(Pa.value=kn.get("from").slice(0,24));function Ia(){od(_d,{to:mr.value,message:Ca.value,from:Pa.value,theme:gr})}function wl(){Ia(),Ei.hidden=!1}function La(){Ei.hidden=!0,Ma.textContent=""}var cd=null;function ld(i){i&&(ma.textContent=i,ma.classList.add("is-shown"),clearTimeout(cd),cd=setTimeout(()=>ma.classList.remove("is-shown"),3800))}function fa(i){md.textContent=i}var Qn=null;function Zv(i){let e=document.querySelector(`.act-tab[data-act="${i}"]`);if(ls||!e){e&&e.classList.add("is-awakened");return}dl.classList.remove("is-active"),dl.offsetWidth,dl.classList.add("is-active");let n=(e.querySelector(".sigil-star")||e).getBoundingClientRect(),s=window.innerWidth*.5,r=window.innerHeight*.44,o=n.left+n.width*.5,a=n.top+n.height*.5;Qn={elapsed:0,dur:.92,x0:s,y0:r,cx:zt(s,o,.35)+(i<=2?-90:90),cy:Math.min(r,a)-110,x1:o,y1:a,tab:e},vl.style.opacity="1"}var ga=new Set;function jr(i,e){ga.has(i)||(ga.add(i),tn.awakenVoice(i),Zv(i),ld(e),ga.size===4&&(vd.hidden=!1,yd.hidden=!1,Vv.hidden=!1,ls||setTimeout(()=>{ld("\u56DB\u679A\u51AC\u591C\u661F\u5FBD\u5DF2\u96C6\u9F50 \xB7 \u5E73\u5B89\u591C\u56DB\u91CD\u594F\u7EC8\u7AE0\u5DF2\u89E3\u9501")},2350)))}var Kt={},yl={1:()=>Ku({envMap:ws.envPaper,textures:bs,audio:tn,onAwaken:jr,onHint:fa}),2:()=>ed({envMap:ws.envClay,textures:bs,audio:tn,onAwaken:jr,onHint:fa}),3:()=>td({envMap:ws.envGlobe,textures:bs,refractTex:Xi.refractRT.texture,audio:tn,onAwaken:jr,onHint:fa}),4:()=>sd({envMap:ws.envAurora,textures:bs,refractTex:Xi.refractRT.texture,audio:tn,onAwaken:jr,onHint:fa}),5:()=>rd({envMap:ws.envGlobe,textures:bs,refractTex:Xi.refractRT.texture,audio:tn,onOpenCardStudio:wl,onSelectAct:xr})},Sa={1:new Ce(16758888),2:new Ce(16749672),3:new Ce(16763506),4:new Ce(5439448),5:new Ce(16763e3)};function wa(i){return!Lt||!Xi||!ws||!bs?null:(!Kt[i]&&yl[i]&&(Kt[i]=yl[i](),Lt.shadowMap.needsUpdate=!0),Kt[i])}var Dt=Ut(parseInt(kn.get("act")||"1",10)||1,1,5),as=null,Rs=0,_i=0,Ed=(Sa[Dt]||Sa[1]).clone(),_l=-1;function Md(i){if(!i||!i.getProgress)return;let{current:e,total:t}=i.getProgress(),n=i.id*100+t*10+e;if(n!==_l){for(_l=n;fr.children.length<t;){let s=document.createElement("span");s.className="prog-pip",fr.appendChild(s)}for(;fr.children.length>t;)fr.removeChild(fr.lastChild);for(let s=0;s<t;s++)fr.children[s].classList.toggle("is-done",s<e)}}function bl(i){if(i){An.dataset.act=String(i.id),Bv.textContent=i.roman,Ov.textContent=i.title,zv.textContent=i.subtitle,md.textContent=i.defaultHint,_l=-1,Md(i);for(let e of Sl)e.classList.toggle("is-active",Number(e.dataset.act)===i.id)}}tn.setAct(Dt);function xr(i){if(yl[i]&&!(as===null&&i===Dt)&&as!==i){try{tn.unlock(),tn.playHoverTick(1.15)}catch{}if(i===Dt){as=null,_i=-1,xl.classList.remove("is-switching");return}as=i,_i=1,Ed.copy(Sa[i]||Sa[1]),xl.classList.add("is-switching");for(let e of Sl)e.classList.toggle("is-active",Number(e.dataset.act)===i)}}var Td=Math.min(window.devicePixelRatio||1,2);ls&&kn.get("dpr")&&(Td=Ut(parseFloat(kn.get("dpr")),1,2));var xa=1;function Rl(){if(!Lt||!Xi)return;let i=Math.max(1,window.innerWidth),e=Math.max(1,window.innerHeight);Wi.aspect=i/e,Wi.fov=i<e?54:42,Wi.updateProjectionMatrix();let t=Td*xa;Lt.setPixelRatio(t),Lt.setSize(i,e,!1);let n=Math.max(1,Math.floor(i*t)),s=Math.max(1,Math.floor(e*t));Xi.setSize(n,s)}window.addEventListener("resize",Rl);var El=!!(Tl||window.__pendingUnseal),Al=0;function Sd(){if(!El||!Aa||An.dataset.state==="playing")return;let i=performance.now()-Al,e=Tl?0:Math.max(0,460-i);Ea.classList.remove("is-pre-unsealing"),Ea.classList.add("is-opening"),Rs=.92,_i=-1,e<=0?An.dataset.state="playing":setTimeout(()=>{An.dataset.state="playing"},e)}function Cl(){if(!(An.dataset.state==="playing"||El)){El=!0,Al=performance.now();try{tn.playWaxSealBreak()}catch{}if(Aa)Sd();else{Ea.classList.add("is-pre-unsealing");let i=gl&&gl.querySelector(".seal-caption");i&&(i.textContent="\u6B63\u5728\u70B9\u4EAE\u51AC\u591C\u5FAE\u7F29\u5267\u573A\u2026")}}}window.__enterStage=Cl;if(window.__pendingUnseal&&!Tl){Al=performance.now()-300;try{tn.playWaxSealBreak()}catch{}}gl.addEventListener("click",Cl);for(let i of Sl)i.addEventListener("click",()=>xr(Number(i.dataset.act)));kv.addEventListener("click",()=>xr(1));vd.addEventListener("click",()=>xr(5));gd.addEventListener("click",()=>{let i=Kt[Dt];i&&i.cameraRig&&(i.cameraRig.resetFraming(),tn.playHoverTick(1.25))});xd.addEventListener("click",()=>{tn.unlock();let i=!tn.muted;tn.setMuted(i),An.classList.toggle("is-muted",i)});Wv.addEventListener("click",()=>{tn.unlock(),tn.playPaperFold(!0),wl()});Xv.addEventListener("click",La);Ei.addEventListener("click",i=>{i.target===Ei&&La()});for(let i of Ta)i.addEventListener("click",()=>{gr=i.dataset.theme;for(let e of Ta)e.classList.toggle("is-selected",e===i);tn.playHoverTick(1.1),Ia()});[mr,Ca,Pa].forEach(i=>{i.addEventListener("input",Ia)});qv.addEventListener("click",()=>{Ia();let i=document.createElement("a");i.download=`NOEL-IV-\u5723\u8BDE\u793C\u7B3A-${(mr.value||"\u795D\u798F").trim()}.png`,i.href=_d.toDataURL("image/png"),i.click(),Ma.textContent="\u5370\u5237\u7EA7\u9AD8\u6E05\u70EB\u91D1\u8D3A\u5361\u5DF2\u751F\u6210\u4E0B\u8F7D\u3002"});Yv.addEventListener("click",async()=>{let i=new URL(location.href.split("?")[0]);i.searchParams.set("to",mr.value.trim()),i.searchParams.set("msg",Ca.value.trim()),i.searchParams.set("from",Pa.value.trim()),i.searchParams.set("theme",gr);try{await navigator.clipboard.writeText(i.toString()),Ma.textContent="\u4E13\u5C5E\u62C6\u5C01\u60CA\u559C\u94FE\u63A5\u5DF2\u590D\u5236\uFF0C\u53EF\u76F4\u63A5\u53D1\u9001\u7ED9\u5BF9\u65B9\u3002"}catch{Ma.textContent=i.toString()}});window.addEventListener("keydown",i=>{if(!Ei.hidden){i.key==="Escape"&&La();return}if(An.dataset.state!=="playing"){(i.key==="Enter"||i.key===" ")&&Cl();return}i.key>="1"&&i.key<="4"&&xr(Number(i.key)),i.key==="5"&&(!yd.hidden||kn.has("all"))&&xr(5),(i.key==="m"||i.key==="M")&&xd.click(),(i.key==="r"||i.key==="R")&&gd.click()});var hd=new ea,Pi=new pe(0,0),fl={x:0,y:0},va=new Ss(0,0,55,13),ya=new Ss(window.innerWidth*.5,window.innerHeight*.5,420,28),pl=null,vr=!1,ba=!1,Ra=!1,ud=null,Ii=new Map,Qr=0;function Pl(){An.classList.remove("is-idle"),clearTimeout(ud),ud=setTimeout(()=>{!vr&&Ei.hidden&&An.classList.add("is-idle")},4e3)}function Il(i,e){Pi.x=i/Math.max(1,window.innerWidth)*2-1,Pi.y=-(e/Math.max(1,window.innerHeight))*2+1,va.setTarget(Ut(Pi.x,-1,1),Ut(Pi.y,-1,1)),ya.setTarget(i,e)}function Ll(i){if(!i||!i.interactables||i.interactables.length===0)return null;i.applyCamera(Wi),Wi.updateMatrixWorld(),hd.setFromCamera(Pi,Wi);let e=hd.intersectObjects(i.interactables,!1);return e.length>0?e[0]:null}cs.addEventListener("wheel",i=>{if(An.dataset.state!=="playing"||!Ei.hidden)return;i.preventDefault(),Pl();let e=Kt[Dt];e&&e.cameraRig&&e.cameraRig.onWheel(i.deltaY)},{passive:!1});cs.addEventListener("dblclick",i=>{if(An.dataset.state!=="playing"||!Ei.hidden)return;Il(i.clientX,i.clientY);let e=Kt[Dt];!Ll(e)&&e&&e.cameraRig&&(e.cameraRig.resetFraming(),tn.playHoverTick(1.3))});cs.addEventListener("pointermove",i=>{if(Pl(),os.classList.add("is-visible"),Il(i.clientX,i.clientY),Ii.has(i.pointerId)&&(Ii.set(i.pointerId,{x:i.clientX,y:i.clientY}),Ii.size===2)){let t=Array.from(Ii.values()),n=Math.hypot(t[0].x-t[1].x,t[0].y-t[1].y);Qr>0&&Kt[Dt]?.cameraRig&&Kt[Dt].cameraRig.onPinchScale(n/Qr),Qr=n;return}if(An.dataset.state!=="playing"||!Ei.hidden)return;let e=Kt[Dt];if(vr){ba?e.onPointerMove(Pi):e.cameraRig&&e.cameraRig.moveOrbitDrag(Pi);return}e.onPointerMove(Pi),Ra=!0});cs.addEventListener("pointerdown",i=>{if(Pl(),Ii.set(i.pointerId,{x:i.clientX,y:i.clientY}),Ii.size===2){let n=Array.from(Ii.values());Qr=Math.hypot(n[0].x-n[1].x,n[0].y-n[1].y);return}if(An.dataset.state!=="playing"||!Ei.hidden)return;tn.unlock(),Il(i.clientX,i.clientY),vr=!0,os.classList.add("is-drag");let e=Kt[Dt],t=Ll(e);ba=!!e.onPointerDown(t,Pi),!ba&&e.cameraRig&&(e.cameraRig.beginOrbitDrag(Pi),cs.style.cursor="grabbing")});function wd(i){if(i&&Ii.has(i.pointerId)&&(Ii.delete(i.pointerId),Ii.size<2&&(Qr=0)),!vr)return;vr=!1,ba=!1,os.classList.remove("is-drag");let e=Kt[Dt];e&&(e.onPointerUp(),e.cameraRig&&e.cameraRig.endOrbitDrag()),Ra=!0}window.addEventListener("pointerup",wd);window.addEventListener("pointercancel",wd);var Ml=performance.now()*.001,_a=0,ml=.0166,pa=0;function Jv(i){let e=Ll(i);if(e){pl!==e.object&&(pl=e.object,tn.playHoverTick(1),i.onHoverHit&&i.onHoverHit(e)),os.classList.add("is-hover");let t=e.object.userData?.label||"";t?(Gv.textContent=t,os.classList.add("has-label")):os.classList.remove("has-label"),cs.style.cursor="pointer"}else pl=null,os.classList.remove("is-hover","has-label"),cs.style.cursor="grab"}function $v(i){if(!Qn)return;Qn.elapsed+=i;let e=Ut(Qn.elapsed/Qn.dur,0,1),t=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,n=1-t,s=n*n*Qn.x0+2*n*t*Qn.cx+t*t*Qn.x1,r=n*n*Qn.y0+2*n*t*Qn.cy+t*t*Qn.y1,o=zt(1.35,.52,t);vl.style.transform=`translate3d(${s.toFixed(1)}px, ${r.toFixed(1)}px, 0) rotate(${(t*180).toFixed(0)}deg) scale(${o.toFixed(2)})`,e>=1&&(vl.style.opacity="0",Qn.tab.classList.add("is-awakened","just-socketed"),tn.playBellChime(7),Qn=null)}function eo(i){if(!Aa||!Kt[Dt])return;if(_a+=i,_i!==0){let n=_i>0?3.1:2.2;Rs=Ut(Rs+_i*i*n,0,1),_i>0&&Rs>=1?(wa(as),Dt=as,as=null,bl(Kt[Dt]),tn.setAct(Dt),Lt.shadowMap.needsUpdate=!0,xl.classList.remove("is-switching"),_i=-1):_i<0&&Rs<=0&&(_i=0)}va.update(i),fl.x=va.x,fl.y=va.y,ya.update(i),os.style.transform=`translate3d(${ya.x.toFixed(1)}px, ${ya.y.toFixed(1)}px, 0)`,$v(i);let e=Kt[Dt];Ra&&!vr&&An.dataset.state==="playing"&&Ei.hidden&&(Ra=!1,Jv(e)),e.update(i,_a,fl),Md(e),e.applyCamera(Wi),++Fv%3===0&&(Lt.shadowMap.needsUpdate=!0);let t=e.getPostOpts?e.getPostOpts():e.postOpts;Xi.render(e.scene,Wi,_a,{...t,transition:Rs,transTint:Ed})}function bd(i){if(ls)return;requestAnimationFrame(bd);let e=i*.001,t=e-Ml;Ml=e;let n=Math.min(.05,Math.max(.001,t));t>.002&&t<.12&&(ml=ml*.9+t*.1,ml>.0172&&xa>.8?(pa++,pa>28&&(xa=Math.max(.8,xa-.08),pa=0,Rl())):pa=0),eo(n)}function dd(){try{Lt=new Or({canvas:cs,antialias:!1,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:ls})}catch(i){throw document.getElementById("nogl").hidden=!1,i}if(!Lt.capabilities.isWebGL2)throw document.getElementById("nogl").hidden=!1,new Error("WebGL2 required");Lt.outputColorSpace=gi,Lt.toneMapping=bi,Lt.shadowMap.enabled=!0,Lt.shadowMap.type=el,Lt.shadowMap.autoUpdate=!1,Lt.shadowMap.needsUpdate=!0,Xi=new ca(Lt),ws=qu(Lt),Rl()}function fd(){bs=Yu(Lt)}function pd(){wa(Dt),bl(Kt[Dt]),Aa=!0,Ml=performance.now()*.001,eo(.016),Sd(),ls||requestAnimationFrame(bd)}var pr=null;function Rd(){return pr||(ls?(dd(),fd(),pd(),pr=Promise.resolve(),pr):(pr=new Promise(i=>{setTimeout(()=>{try{dd(),setTimeout(()=>{fd(),setTimeout(()=>{pd(),i()},0)},0)}catch(e){console.error(e)}},0)}),pr))}Rd();window.__setChristmas=async(i={})=>{if(await Rd(),i.prologue?(An.dataset.state="prologue",Ea.classList.remove("is-opening","is-pre-unsealing")):An.dataset.state="playing",i.allAwakened&&([1,2,3,4].forEach(s=>{wa(s),jr(s,"")}),ma.classList.remove("is-shown")),i.act&&(wa(i.act),Dt=Ut(i.act,1,5),as=null,Rs=i.transition??0,_i=0,bl(Kt[Dt])),i.zoom&&Kt[Dt]?.cameraRig?(Kt[Dt].cameraRig.rawZoom=i.zoom,Kt[Dt].cameraRig.zoomSpring.snap(i.zoom)):Kt[Dt]?.cameraRig&&Kt[Dt].cameraRig.resetFraming(),i.preset&&Kt[Dt].setCaptureState&&Kt[Dt].setCaptureState(i.preset),i.cardTheme&&Kr[i.cardTheme]){gr=i.cardTheme;for(let s of Ta)s.classList.toggle("is-selected",s.dataset.theme===gr)}i.cardModal?wl():La(),_a=i.time??3.2,Lt.shadowMap.needsUpdate=!0;for(let s=0;s<3;s++)eo(.016);Lt.shadowMap.needsUpdate=!1,Lt.info.autoReset=!1,Lt.info.reset(),eo(.016);let e=Lt.info.render.calls,t=Lt.info.render.triangles;Lt.info.reset(),Lt.setRenderTarget(Xi.sceneRT),Lt.render(Kt[Dt].scene,Wi),Lt.setRenderTarget(null);let n=Lt.info.render.calls;return Lt.info.autoReset=!0,eo(.016),await new Promise(s=>requestAnimationFrame(()=>requestAnimationFrame(s))),{act:Dt,state:An.dataset.state,awakened:ga.size,mainPassDrawCalls:n,totalPipelineCalls:e,triangles:t}};
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
