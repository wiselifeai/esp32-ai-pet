(function () {
  "use strict";
  var STORAGE_KEY = "esp32-ai-pet-3d-workshop-v1";
  var KEY_LIST = ["PCB_W","PCB_H","LCD_X","LCD_Y","LCD_W","LCD_H","PANEL_MARGIN","PANEL_T","WINDOW_GAP"];
  var REQUIRED = ["PCB_W","PCB_H","LCD_X","LCD_Y","LCD_W","LCD_H"];
  var STEP_IDS = ["a","b","c","d","e","f","g","h"];
  var state = {dims:{},finished:{},revision:{designed:"",measured:"",feature:"LCD 開孔寬度"}};
  var errorState = null;

  function byId(id) { return document.getElementById(id); }
  function notify(message) {
    var node=byId("guide-toast"); node.textContent=message;node.classList.add("show");
    clearTimeout(window.__guideToast);window.__guideToast=setTimeout(function(){node.classList.remove("show");},3100);
  }
  function load() {
    try {
      var data=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");
      if(data&&typeof data==="object"){
        if(data.dims&&typeof data.dims==="object")state.dims=data.dims;
        if(data.finished&&typeof data.finished==="object")state.finished=data.finished;
        if(data.revision&&typeof data.revision==="object")state.revision=data.revision;
      }
    } catch(e) { notify("舊進度資料有誤，改用新記錄。"); }
  }
  function save(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
    catch(e){notify("此瀏覽器無法儲存進度，請匯出 JSON 備份。");}
  }
  function num(key){
    var input=document.querySelector('[data-dim="'+key+'"]');
    if(!input||input.value.trim()==="")return null;
    var value=Number(input.value);
    return Number.isFinite(value)?value:null;
  }
  function validateDims(){
    for(var i=0;i<KEY_LIST.length;i++){
      var key=KEY_LIST[i],value=num(key);
      if(value===null) return {ok:false,msg:"尚未填入 "+key+"。請使用實際量測值。"};
      if((key==="LCD_X"||key==="LCD_Y"||key==="WINDOW_GAP") ? value<0 : value<=0)
        return {ok:false,msg:key+" 的數值不能為負，外形尺寸必須大於 0。"};
    }
    var w=num("PCB_W"),h=num("PCB_H"),x=num("LCD_X"),y=num("LCD_Y"),lw=num("LCD_W"),lh=num("LCD_H"),gap=num("WINDOW_GAP"),mar=num("PANEL_MARGIN");
    if(x+lw>w+1e-6||y+lh>h+1e-6)
      return {ok:false,msg:"LCD 開窗超出 PCB 外形。請檢查座標原點與量測方向。"};
    if(x+mar-gap<0||y+mar-gap<0||x+lw+mar+gap>w+2*mar||y+lh+mar+gap>h+2*mar)
      return {ok:false,msg:"開窗與額外餘隙超過面板大小，請檢查 WINDOW_GAP 或 PANEL_MARGIN。"};
    return {ok:true,msg:"✓ 數值邊界檢查通過。這仍需核對實物／原廠圖，不能視為已完成工程驗收。"};
  }
  function readInputs(){
    KEY_LIST.forEach(function(key){
      var input=document.querySelector('[data-dim="'+key+'"]');
      if(input)state.dims[key]=input.value.trim();
    });
    var a=byId("test-designed"),b=byId("test-measured"),c=byId("test-feature");
    state.revision={designed:a.value,measured:b.value,feature:c.value};
  }
  function restoreInputs(){
    KEY_LIST.forEach(function(key){
      var input=document.querySelector('[data-dim="'+key+'"]');
      if(input&&Object.prototype.hasOwnProperty.call(state.dims,key))input.value=state.dims[key];
    });
    byId("test-designed").value=state.revision.designed||"";
    byId("test-measured").value=state.revision.measured||"";
    byId("test-feature").value=state.revision.feature||"LCD 開孔寬度";
    document.querySelectorAll("[data-finished]").forEach(function(box){
      box.checked=state.finished[box.getAttribute("data-finished")]===true;
    });
  }
  function draftPrompt(assembly){
    var values=KEY_LIST.map(function(k){var v=num(k);return k+" = "+(v===null?"【待實測】":v+" mm");}).join("\n");
    var p="你是有產品開發與 3D 列印經驗的機構工程設計助理。\n\n";
    p+="專案：手掌型 ESP32 AI 桌上寵物，使用 Waveshare ESP32-S3-LCD-1.47B-M（SKU 31031）。\n";
    p+="製造：FreeCAD 可編輯參數化建模 → STL → Bambu Studio → 公司 Bambu Lab P2S，材料 ABS。\n";
    p+="概念外型：約高 95、寬 80、深 80 mm（不保證能放下全部配件）。\n";
    p+="硬限制：螢幕在正面；USB-C 與馬達獨立 5V 電源入口均只能位於背面；外殼可拆裝、便於維修。預留兩個 SG90、麥克風、喇叭和控制模組。\n";
    p+="座標：LCD 面朝向我，PCB 左下角是 (0,0)，X 向右、Y 向上；全部使用毫米。\n\n";
    p+="目前量測資料（這些數字請以我照片與尺／卡尺或原廠結構檔核對）：\n"+values+"\n";
    p+="PCB 固定孔座標、USB-C 精確位置／接頭插拔距離和未購入零件：若未附實測數據，一律視為未知，不能自行猜測。\n\n";
    p+="請先查看我另外附上的主板正面、背面、側面、USB-C 插線照片，以及 Waveshare 官方 3D Structure（如有）。不要假裝你已看到未上傳的照片。\n";
    p+="輸出：1. 已確認／估測／未知尺寸表；2. 缺少的關鍵量測；3. 參數化 CAD 架構與分件；4. 可執行的 FreeCAD Python Macro（頂端集中參數，僅使用可信的 FreeCAD / Part API）；5. STL／裝配可驗證清單。\n";
    if(assembly) p+="\n此輪進一步設計前殼、主體、後殼、雙 SG90 支架、底座；必須檢查線材、LCD、PCB、伺服轉動的干涉，並標明哪些缺數據而不能完成正式孔位。每個零件獨立生成，保留 .FCStd、STEP 和分件 STL。\n";
    else p+="\n此輪先用已確認尺寸生成 LCD 開孔的簡單測試片；不要聲稱已完成 PCB 固定柱或整機外殼。\n";
    return p;
  }
  function updatePrompt(){byId("prompt-preview").textContent=draftPrompt(false);}
  function showValidity(){
    var result=validateDims(),box=byId("dims-validation");
    box.textContent=result.msg;box.classList.toggle("ok",result.ok);box.classList.toggle("error",!result.ok);
    var check=document.querySelector('[data-finished="b"]');
    if(check){check.disabled=!result.ok;check.parentElement.title=result.ok?"請實際量測後才勾選":"請先填入全部必要尺寸，且確認與實物一致";}
    return result.ok;
  }
  function drawPreview(){
    var existing=byId("measurement-preview");
    if(!existing){
      existing=document.createElement("div");existing.id="measurement-preview";
      existing.style.cssText="border:1px solid #dce9e1;border-radius:14px;background:#f7fbf9;padding:14px;margin:14px 0;color:#325c56;";
      var ref=byId("dims-validation");ref.parentNode.insertBefore(existing,ref);
    }
    var w=num("PCB_W"),h=num("PCB_H"),x=num("LCD_X"),y=num("LCD_Y"),lw=num("LCD_W"),lh=num("LCD_H");
    if(![w,h,x,y,lw,lh].every(function(n){return n!==null&&Number.isFinite(n)})||!validateDims().ok){
      existing.innerHTML="<strong>CAD 2D 開孔預覽</strong><p style='font-size:13px;margin:4px 0'>請先填妥全部尺寸，預覽會顯示 PCB 與 LCD 相對位置（這不是 STL）。</p>";
      return;
    }
    var b=+num("PANEL_MARGIN"),g=+num("WINDOW_GAP");
    var W=w+2*b,H=h+2*b,winX=b+x-g,winY=b+h-(y+lh+g),winW=lw+2*g,winH=lh+2*g;
    var scal=Math.min(230/W,200/H),drawW=W*scal,drawH=H*scal,left=(360-drawW)/2,top=(240-drawH)/2;
    var svg='<svg viewBox="0 0 360 240" width="100%" role="img" aria-label="以你輸入的毫米參數繪製 PCB 面板及 LCD 開窗示意">'
      +'<rect x="'+left+'" y="'+top+'" width="'+drawW+'" height="'+drawH+'" rx="6" fill="#cde8dc" stroke="#3b8c76" stroke-width="2"/>'
      +'<rect x="'+(left+winX*scal)+'" y="'+(top+winY*scal)+'" width="'+(winW*scal)+'" height="'+(winH*scal)+'" fill="#173943" stroke="#315b63" stroke-width="1.5"/>'
      +'<text x="180" y="232" font-size="12" text-anchor="middle" fill="#436d65">面板 '+W.toFixed(2)+' × '+H.toFixed(2)+' mm｜LCD 開孔 '+winW.toFixed(2)+' × '+winH.toFixed(2)+' mm</text></svg>';
    existing.innerHTML='<strong>CAD 2D 開孔預覽（非實際 STL）</strong>'+svg;
  }
  function sync(){readInputs();save();updatePrompt();showValidity();drawPreview();updateResult();}
  function updateProgress(){
    var done=STEP_IDS.filter(function(id){return state.finished[id]===true;}).length;
    byId("done-count").textContent=done;
    byId("overall-bar").style.width=(done/STEP_IDS.length*100)+"%";
    document.querySelectorAll("[data-led]").forEach(function(n){n.classList.toggle("done",state.finished[n.getAttribute("data-led")]===true);});
  }
  function updateResult(){
    var a=byId("test-designed").value,b=byId("test-measured").value,box=byId("error-result");
    if(!a.trim()||!b.trim()){box.textContent="輸入兩個數字，這裡會顯示「實測－設計」的偏差。";errorState=null;return;}
    var design=Number(a),measured=Number(b);
    if(!Number.isFinite(design)||!Number.isFinite(measured)||design<=0||measured<=0){box.textContent="設計與量測值都必須是大於零的毫米數值。";errorState=null;return;}
    var delta=measured-design;
    errorState={design:design,measured:measured,delta:delta,feature:byId("test-feature").value};
    box.textContent=byId("test-feature").value+"：CAD "+design.toFixed(2)+" mm，ABS 實測 "+measured.toFixed(2)+" mm，偏差 "+(delta>=0?"+":"")+delta.toFixed(2)+" mm。此值需配合多點量測與裝配再判斷，不代表固定收縮率。";
  }
  function copy(text,success){
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){notify(success||"已複製。");},function(){notify("複製失敗，請手動選取文字。");});
    } else notify("你的瀏覽器不支援一鍵複製，請手動選取。");
  }
  function fileDownload(name,content,type){
    var blob=new Blob([content],{type:type||"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob);
    var a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(url);},1300);
  }
  function downloadMacro(){
    readInputs();
    var valid=validateDims();
    if(!valid.ok){notify("先完成真實尺寸量測："+valid.msg);byId("step-b").scrollIntoView({behavior:"smooth"});return;}
    fetch("../freecad/LCD_Window_Test.FCMacro",{cache:"no-store"}).then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.text();})
    .then(function(template){
      KEY_LIST.forEach(function(key){
        var re=new RegExp("^"+key+"\\s*=\\s*[^\\r\\n]*","m");
        if(!re.test(template))throw Error("Macro 缺少參數："+key);
        template=template.replace(re,key+" = "+num(key));
      });
      var banner="# DIMENSIONS GENERATED FROM USER INPUT; VERIFY AGAINST ACTUAL PCB BEFORE PRINTING.\\n";
      fileDownload("AI_Pet_LCD_Window_Measured.FCMacro",banner+template,"text/plain;charset=utf-8");
      byId("macro-status").textContent="Macro 已依表單產生並下載。固定孔 MOUNT_HOLES 仍為 []（未提供孔距）。請先核對照片／卡尺、再用 FreeCAD 開啟與檢查；本網站不能驗證 STL 尺寸是否正確。";
      byId("macro-status").className="validation-area ok";
      notify("FreeCAD Macro 已產生。接著依 10-D 操作執行。");
    }).catch(function(e){notify("產生 Macro 失敗："+e.message+"。可先從 GitHub 取得原始範例。");});
  }
  function exportState(){
    readInputs();
    var packageData={format:"esp32-ai-pet-3d-progress",version:1,exportedAt:new Date().toISOString(),data:state};
    fileDownload("ESP32_AI_Pet_3D_Progress_"+new Date().toISOString().slice(0,10)+".json",JSON.stringify(packageData,null,2),"application/json");
    notify("進度及尺寸資料已匯出（不包含照片）。");
  }
  function importState(file){
    if(!file)return;
    if(file.size>1024*1024){notify("備份檔太大。");return;}
    file.text().then(function(raw){
      var o=JSON.parse(raw);
      if(!o||o.format!=="esp32-ai-pet-3d-progress"||o.version!==1||!o.data||typeof o.data!=="object")throw Error("無效格式");
      if(!confirm("匯入會覆蓋本瀏覽器目前的 3D 課程勾選及量測資料，確定嗎？"))return;
      state={dims:o.data.dims&&typeof o.data.dims==="object"?o.data.dims:{},finished:o.data.finished&&typeof o.data.finished==="object"?o.data.finished:{},revision:o.data.revision&&typeof o.data.revision==="object"?o.data.revision:{designed:"",measured:"",feature:"LCD 開孔寬度"}};
      save();window.location.reload();
    }).catch(function(){notify("檔案無效，請使用本站匯出的 JSON。");});
  }
  function start(){
    load();restoreInputs();
    document.querySelectorAll("[data-dim], #test-designed, #test-measured, #test-feature").forEach(function(input){input.addEventListener("input",sync);input.addEventListener("change",sync);});
    document.querySelectorAll("[data-finished]").forEach(function(input){input.addEventListener("change",function(){
      var id=input.getAttribute("data-finished");
      if(id==="b"&&!validateDims().ok){input.checked=false;notify("請先填入實際尺寸。");return;}
      state.finished[id]=input.checked;save();updateProgress();
    });});
    byId("save-dims").addEventListener("click",function(){readInputs();save();notify(showValidity()?"尺寸已儲存，請再與實物核對。":"已儲存草稿；還有尺寸未完成。");});
    byId("download-dims").addEventListener("click",function(){readInputs();fileDownload("ESP32_3D_Measurements_Draft.json",JSON.stringify({status:"measurement draft; verify against real board",unit:"mm",model:"ESP32-S3-LCD-1.47B-M",values:state.dims},null,2),"application/json");notify("尺寸草稿已匯出。");});
    byId("copy-prompt").addEventListener("click",function(){copy(draftPrompt(false),"AI 建模指令已複製，請另外附上照片和原廠資料。");});
    byId("copy-assembly").addEventListener("click",function(){copy(draftPrompt(true),"完整外殼 AI 指令已複製，請另外附上照片和原廠資料。");});
    byId("download-macro").addEventListener("click",downloadMacro);
    byId("copy-revision").addEventListener("click",function(){
      updateResult();
      if(!errorState){notify("請先輸入有效的設計值與實測值。");return;}
      var x=errorState;
      copy("我用 Bambu Lab P2S + ABS 列印 ESP32 AI 寵物測試件。\\n量測項目："+x.feature+"\\nCAD 設計："+x.design.toFixed(2)+" mm\\nABS 實測："+x.measured.toFixed(2)+" mm\\n誤差（實測−設計）："+x.delta.toFixed(2)+" mm\\n請不要直接當成固定收縮率。先推測造成差異的量測方法、翹曲、切片輪廓、材料 Profile 和 CAD 來源；請我補照片和更多量測，再給出最小的 FreeCAD 參數修改與第二次試印驗收方法。","ABS 改版指令已複製。");
    });
    byId("export-3d-progress").addEventListener("click",exportState);
    byId("import-3d-progress").addEventListener("change",function(e){importState(e.target.files[0]);});
    sync();updateProgress();
    if("IntersectionObserver" in window){
      var observer=new IntersectionObserver(function(entries){
        entries.filter(function(e){return e.isIntersecting;}).forEach(function(e){
          document.querySelectorAll(".step-nav a").forEach(function(a){a.classList.toggle("current",a.getAttribute("href")==="#"+e.target.id);});
        });
      },{rootMargin:"-120px 0px -55% 0px",threshold:0});
      STEP_IDS.forEach(function(id){observer.observe(byId("step-"+id));});
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
