!function(){class e{events;_element;children;constructor(e={},t=[]){this.events=e,this._element=null,this.children=t,this.init()}init(){}_addEvents(){this._element&&Object.keys(this.events).forEach(e=>{this._element.addEventListener(e,this.events[e])})}_removeEvents(){this._element&&Object.keys(this.events).forEach(e=>{this._element.removeEventListener(e,this.events[e])})}show(){this._element&&(this._element.style.display="flex")}hide(){this._element&&(this._element.style.display="none")}render(e){let t=document.createElement("template");return t.innerHTML=e.trim(),this._element=t.content.firstChild,this._addEvents(),this._renderChildren(),this._element}_renderChildren(){this._element&&Object.entries(this.children).forEach(([e,t])=>{let s=this._element.querySelector(`[data-component="${e}"]`);if(s){let e=t.render();s.replaceWith(e)}})}}d="af3h5q_mainPageContainer",o="af3h5q_progressText",c="_9_UJVG_progressBar",u="_9_UJVG_progressElement";class t extends e{constructor(e={},t=[]){super(e,t),this.value=50,this.animate=!1}setValue(e){this.value=e,this.updateProgress()}setAnimate(e){this.animate=e,this.updateProgress()}updateProgress(){this.element.querySelector("progress").value=this.value;let e=this.value,t=this.element.querySelector(`.${u}`);this.animate?t.style.animation="":t.style.animation="none",t.style.background=`
      radial-gradient(closest-side, white 79%, transparent 80%),
      conic-gradient(#005cff ${e}%, #eaf0f6 ${e}%)
    `}render(){let e=`
      <div class="${c}">
        <div class="${u}">
          <progress min="0" max="100" style="visibility:hidden;height:0;width:0;"></progress>
        </div>
      </div>
    `,t=super.render(e);return this.element=t,this.updateProgress(),t}}p="zt4PeW_controlsContainer",m="zt4PeW_progressContainer",v="zt4PeW_progressSection",g="Hb0ipq_controlsSection",_="ZNwoca_valueContainer",C="ZNwoca_valueLabel",V="ZNwoca_valueNumber";class s extends e{constructor(e){super({input:e=>this.handleValueChange(e)}),this.value=50,this.onValueChange=e}handleValueChange(e){let t=Number(e.target.value);isNaN(t)||(t<0?t=0:t>100&&(t=100),this.value=t,e.target.value=this.value,this.onValueChange(this.value))}render(){let e=`
        <div class="${_}">
          <input 
            class="${V}" 
            type="number" 
            value="${this.value}" 
            min="0" 
            max="100" 
            step="1" 
            />
          <label class="${C}">Value</label>
        </div>
        `;return super.render(e)}}b="-vFfhq_animateContainer",$="-vFfhq_animateLabel",w="VnCaga_slider",y="VnCaga_switch";class n extends e{constructor(e){super({change:e=>this.handleChange(e)}),this.handleAnimateChange=e,this.checked=!1}handleChange(e){this.checked=e.target.checked,this.handleAnimateChange&&this.handleAnimateChange(this.checked)}render(){let e=`
        <label class="${y}">
            <input type="checkbox" ${this.checked?"checked":""}>
            <span class="${w}"></span>
        </label>
        `;return super.render(e)}}class i extends e{constructor(e){super(),this.onAnimateChange=e}init(){this.children={checkbox:new n(e=>this.handleAnimateChange(e))}}handleAnimateChange(e){this.onAnimateChange&&this.onAnimateChange(e)}render(){let e=`
      <div class="${b}">
        <div data-component="checkbox"></div>
        <label class="${$}">Animate</label>
      </div>
    `;return super.render(e)}}A="AhP2Dq_hideContainer",f="AhP2Dq_hideLabel";class a extends e{constructor(e){super(),this.updateHideValue=e}init(){this.children={checkbox:new n(e=>this.handleUpdateHideValue(e))}}handleUpdateHideValue(e){this.updateHideValue&&this.updateHideValue(e)}render(){let e=`
        <div class="${A}">
            <div data-component="checkbox"></div>
            <label class="${f}">Hide</label> 
        </div>
    
        `;return super.render(e)}}class r extends e{constructor(e,t,s){super(),this.onValueChange=e,this.onAnimateChange=t,this.updateHideValue=s}init(){this.children={value:new s(e=>this.handleValueChange(e)),animate:new i(e=>this.handleAnimateChange(e)),hide:new a(e=>this.handleUpdateHideValue(e))}}handleValueChange(e){this.onValueChange(e)}handleAnimateChange(e){this.onAnimateChange(e)}handleUpdateHideValue(e){this.updateHideValue(e)}render(){let e=`
      <section class="${g}">
        <div data-component="value"></div>
        <div data-component="animate"></div>
        <div data-component="hide"></div>
      </section>
    `;return super.render(e)}}class h extends e{init(){this.progress=new t,this.controlsContainer=new r(e=>this.updateProgressValue(e),e=>this.updateProgressAnimation(e),e=>this.updateHideValue(e)),this.children={progress:this.progress,controls:this.controlsContainer}}updateProgressValue(e){this.progress.setValue(e)}updateProgressAnimation(e){this.progress.setAnimate(e)}updateHideValue(e){e?this.progress.hide():this.progress.show()}render(){let e=`
      <section class="${v}">
      <div class="${m}">
        <div data-component="progress"></div>
      </div>
      <div class="${p}">
        <div data-component="controls"></div>
      </div>
      </section>
    `;return super.render(e)}}class l extends e{init(){this.children={progress:new h}}render(){let e=`
      <div class="${d}">
        <h class="${o}">Progress</h>
        <div data-component="progress"></div>
      </div>
    `;return super.render(e)}}var d,o,c,u,p,m,v,g,_,C,V,b,$,w,y,A,f,x=new class{routes;rootQuery;constructor(e){this.routes=[],this.rootQuery=e}use(e,t){let s=new t,n=function(e,t){let s=document.querySelector(e);if(null===s)throw Error(`Cannot find root element with query: ${e}`);s.innerHTML="";let n=t.render();return s.appendChild(n),s}(this.rootQuery,s);return this.routes.push({pathname:e,route:n}),this}}("#root");window.addEventListener("DOMContentLoaded",async()=>{x.use("/",l)})}();
//# sourceMappingURL=index.6497f117.js.map
