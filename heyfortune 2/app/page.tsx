"use client";
// @ts-nocheck

import { useState, useEffect, useCallback } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700;900&family=Noto+Sans+KR:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#09090b;overflow-x:hidden}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes glowPulse{0%,100%{filter:drop-shadow(0 0 8px rgba(255,107,107,.15))}50%{filter:drop-shadow(0 0 20px rgba(255,107,107,.4))}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes heartbeat{0%,100%{transform:scale(1)}15%{transform:scale(1.3)}30%{transform:scale(1)}45%{transform:scale(1.3)}75%{transform:scale(1)}}
@keyframes orbMove{0%{transform:translate(0,0)}33%{transform:translate(30px,-20px)}66%{transform:translate(-20px,15px)}100%{transform:translate(0,0)}}
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.fu{animation:fadeUp .7s cubic-bezier(.16,1,.3,1) forwards;opacity:0}
.fi{animation:fadeIn .5s ease forwards;opacity:0}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}
*{-webkit-tap-highlight-color:transparent}
input,select,button{font-family:'Noto Sans KR',sans-serif}
`;

const P = {
  bg:"#09090b",card:"#1c1c20",accent:"#ff6b6b",lime:"#a3e635",cyan:"#22d3ee",
  violet:"#a78bfa",pink:"#f472b6",white:"#fafafa",
  w80:"rgba(250,250,250,.8)",w60:"rgba(250,250,250,.6)",w40:"rgba(250,250,250,.4)",
  w20:"rgba(250,250,250,.2)",w10:"rgba(250,250,250,.1)",w05:"rgba(250,250,250,.05)",
  sans:"'Noto Sans KR',sans-serif",serif:"'Noto Serif KR',serif",mono:"'JetBrains Mono',monospace",
};

const ZO=[{n:"원숭이",e:"🐵",k:"申"},{n:"닭",e:"🐔",k:"酉"},{n:"개",e:"🐕",k:"戌"},{n:"돼지",e:"🐷",k:"亥"},{n:"쥐",e:"🐭",k:"子"},{n:"소",e:"🐮",k:"丑"},{n:"호랑이",e:"🐯",k:"寅"},{n:"토끼",e:"🐰",k:"卯"},{n:"용",e:"🐲",k:"辰"},{n:"뱀",e:"🐍",k:"巳"},{n:"말",e:"🐴",k:"午"},{n:"양",e:"🐑",k:"未"}];
const EL=[{n:"금",c:"#e2e8f0",s:"칼날 같은 판단력"},{n:"금",c:"#e2e8f0",s:"결단의 아이콘"},{n:"수",c:"#38bdf8",s:"흐르는 물처럼 유연한"},{n:"수",c:"#38bdf8",s:"적응의 천재"},{n:"목",c:"#4ade80",s:"끝없이 자라나는"},{n:"목",c:"#4ade80",s:"성장하는 에너지"},{n:"화",c:"#fb923c",s:"불꽃 같은 열정"},{n:"화",c:"#fb923c",s:"타오르는 존재감"},{n:"토",c:"#fbbf24",s:"흔들리지 않는 대지"},{n:"토",c:"#fbbf24",s:"단단한 중심축"}];
const HR=[{n:"子",t:"23~01시",ic:"🌑",v:"자"},{n:"丑",t:"01~03시",ic:"🌒",v:"축"},{n:"寅",t:"03~05시",ic:"🌓",v:"인"},{n:"卯",t:"05~07시",ic:"🌔",v:"묘"},{n:"辰",t:"07~09시",ic:"🌕",v:"진"},{n:"巳",t:"09~11시",ic:"☀️",v:"사"},{n:"午",t:"11~13시",ic:"🔥",v:"오"},{n:"未",t:"13~15시",ic:"🌤",v:"미"},{n:"申",t:"15~17시",ic:"🌅",v:"신"},{n:"酉",t:"17~19시",ic:"🌆",v:"유"},{n:"戌",t:"19~21시",ic:"🌖",v:"술"},{n:"亥",t:"21~23시",ic:"🌗",v:"해"}];
const gz=(y)=>ZO[y%12]; const ge=(y)=>EL[y%10];
const YRS=Array.from({length:45},(_,i)=>2012-i);
const getDays=(y,m)=>y&&m?new Date(y,m,0).getDate():31;

const R={
  "원숭이":{a:"카오스 컨트롤러",sub:"혼돈 속에서 가장 빛나는 사람",personality:"조용한 방에 있으면 오히려 불안해지는 타입. 복잡할수록 머리가 맑아지고, 남들이 패닉할 때 가장 냉정한 판단을 내리죠. 멀티태스킹의 신 — 다만 가끔은 하나에 깊이 빠져보는 것도 나쁘지 않아요.",wealth:"돈이 오는 길목을 본능적으로 알아챕니다. 2026년 하반기, 예상치 못한 곳에서 수입이 열려요.",love:"'같이 있으면 심심할 틈이 없어.' 올해는 지적 대화가 통하는 사람에게 끌릴 확률 높아요."},
  "닭":{a:"완벽주의 스나이퍼",sub:"디테일에서 승부를 보는 사람",personality:"다른 사람이 못 보는 게 보여요. 실밥, 오탈자, 미세한 표정 변화까지. 양날의 검이죠 — 최고의 결과물을 만들지만, 자기 자신에게도 너무 엄격할 수 있어요.",wealth:"꼼꼼한 성격이 재무에서 빛납니다. 2026년은 '작은 것을 모아 큰 것을 만드는' 해.",love:"첫인상은 까다로워 보이지만, 마음 열면 세상에서 가장 세심한 파트너."},
  "개":{a:"의리의 아이콘",sub:"한 번 편이면 끝까지 가는 사람",personality:"'적당히'라는 단어가 사전에 없어요. 좋아하면 올인, 싫으면 올아웃. 그것이 주변 사람들이 당신을 무조건적으로 신뢰하는 이유.",wealth:"성실함이 곧 재물운. 2026년, 누군가의 제안을 신중하게 검토해보세요.",love:"사랑에 올인하는 스타일. '나의 기준'과 '상대의 속도'를 조율하는 연습이 필요해요."},
  "돼지":{a:"바이브 메이커",sub:"같이 있으면 세상이 밝아지는 사람",personality:"파티의 중심은 아니어도, 당신이 빠지면 뭔가 허전. 자연스러운 유머와 편안한 에너지로 주변을 무장 해제시키는 능력자.",wealth:"복이 있는 사주. 2026년은 사이드 프로젝트에서 의외의 수확. 관심사를 수익화해 보세요.",love:"함께 있으면 편안한 것이 최대 무기. 올해는 '설렘'을 줄 수 있는 관계를 만들어 보세요."},
  "쥐":{a:"소셜 해커",sub:"사람과 기회를 연결하는 천재",personality:"'이 사람과 저 사람이 만나면 대박일 텐데'라는 직감이 놀랍도록 정확하죠. 정보의 허브이자 관계의 브릿지.",wealth:"네트워킹이 곧 재물운. 우연한 만남에서 시작된 프로젝트가 예상 외의 수입을 가져올 수 있어요.",love:"대화가 통하면 반은 먹고 들어가는 스타일. 1:1 깊은 대화에서 인연을 만날 확률이 높아요."},
  "소":{a:"사일런트 킹",sub:"말보다 결과로 증명하는 사람",personality:"회의에서 마지막에 한마디 하는 사람. 근데 그 한마디가 결론이 되죠. 강철 멘탈의 소유자.",wealth:"느리지만 확실한 성장. 2026년은 씨앗을 뿌리는 해. 당신의 페이스가 가장 빠른 길.",love:"말수가 적어서 속마음을 모르겠다는 소리 듣죠. 올해는 '표현'이 키워드."},
  "호랑이":{a:"메인 캐릭터",sub:"어디 가든 주인공 에너지",personality:"방에 들어오면 공기가 바뀌어요. 타고난 존재감과 자신감. 도전적인 상황에서 눈이 빛나는 타입.",wealth:"큰 판에서 큰 돈을 버는 사주. 2026년은 스케일을 키울 시기.",love:"강한 사람 옆에는 강한 파트너가 필요해요. '함께 성장할 사람'을 찾아보세요."},
  "토끼":{a:"무드 아키텍트",sub:"분위기를 설계하는 예술가",personality:"인스타 피드에 통일감이 있을 거예요. 모든 것에 당신만의 '톤'이 있어요. 갈등 중재하는 외교력도 탁월.",wealth:"심미안을 살린 분야에서 재물운이 트입니다. 크리에이티브한 사이드 잡에 주목.",love:"표면은 쿨하지만, 내면은 로맨티스트. 진짜 감정을 보여줄 용기가 필요한 시기."},
  "용":{a:"빅 드리머",sub:"불가능이란 단어를 모르는 사람",personality:"목표를 말하면 '현실적으로 생각해봐'라고 하죠. 근데 결국 해내는 것도 당신.",wealth:"큰 그림에서 큰 돈을 잡는 사주. 투자나 사업 확장에 유리. 디테일은 맡기세요.",love:"압도적인 매력. '약한 모습'을 보여줄 수 있는 관계가 진짜 인연입니다."},
  "뱀":{a:"인사이트 스캐너",sub:"본질을 꿰뚫어 보는 사람",personality:"'이 사람 내 마음을 읽나?'라는 생각이 들게 하는 타입. 적은 정보로 전체 그림을 파악하는 능력.",wealth:"직관을 믿으세요. '이건 되겠다'는 느낌이 오면 바로 움직이세요.",love:"쉽게 마음을 열지 않지만, 한 번 열면 깊이가 남달라요."},
  "말":{a:"프리 러너",sub:"자유를 위해 달리는 사람",personality:"통제, 규칙, 루틴 — 알레르기 같은 단어들. 열정이 불타오를 때의 당신은 무적.",wealth:"도전에서 돈이 옵니다. '시작하는 능력'만큼 '끝내는 능력'이 중요한 해.",love:"자유로운 영혼끼리 만나야 오래 갑니다. 서로의 공간을 존중하는 관계를 찾아보세요."},
  "양":{a:"힐링 크리에이터",sub:"존재 자체로 치유가 되는 사람",personality:"당신 옆에 있으면 마음이 놓여요. 공감 능력과 부드러운 에너지가 매력. '나'를 챙기는 것도 이기적인 게 아니에요.",wealth:"창작 에너지가 곧 재물운. 감성을 담은 작업물이 수입을 가져다줄 수 있어요.",love:"사랑받기 위해 태어난 사주. '주는 것'과 '받는 것'의 균형이 가장 중요."},
};

function calcCompat(z1,z2){
  const best={"쥐":["용","원숭이"],"소":["뱀","닭"],"호랑이":["말","개"],"토끼":["양","돼지"],"용":["쥐","원숭이"],"뱀":["소","닭"],"말":["호랑이","개"],"양":["토끼","돼지"],"원숭이":["쥐","용"],"닭":["소","뱀"],"개":["호랑이","말"],"돼지":["토끼","양"]};
  const worst={"쥐":["말","양"],"소":["말","양"],"호랑이":["원숭이","뱀"],"토끼":["닭","용"],"용":["개","토끼"],"뱀":["돼지","호랑이"],"말":["쥐","소"],"양":["소","쥐"],"원숭이":["호랑이","돼지"],"닭":["토끼","개"],"개":["용","닭"],"돼지":["뱀","원숭이"]};
  if(best[z1]?.includes(z2))return 3;if(worst[z1]?.includes(z2))return 1;return 2;
}
const CD={
  1:{tier:"헤어져",emoji:"💔",color:"#ff4757",score:38,title:"솔직히 말할게...",verdict:"불꽃은 튀는데, 그 불꽃이 집을 태울 수도 있는 조합",desc:"서로의 에너지가 부딪히는 지점이 많아서, 의식적인 노력 없이는 소모적인 관계가 될 수 있어요. 하지만 서로를 가장 성장시킬 수 있는 조합이기도 합니다.",advice:"서로의 '다름'을 인정하는 것에서 시작하세요. 상대를 바꾸려 하면 둘 다 지칩니다."},
  2:{tier:"노력해",emoji:"🤔",color:"#ffa502",score:65,title:"가능성은 있어, 근데...",verdict:"노력하면 꽤 괜찮은 사이가 될 수 있어",desc:"완전히 맞지도, 완전히 안 맞지도 않는 조합. 노력한 만큼 정직하게 돌아오는 궁합.",advice:"'대화의 양'보다 '대화의 질'에 집중하세요. 속 깊은 이야기를 나눌수록 가까워집니다."},
  3:{tier:"결혼해",emoji:"💍",color:"#2ed573",score:92,title:"이거 운명 아니야?",verdict:"천생연분이라는 말이 괜히 있는 게 아니야",desc:"서로의 부족한 부분을 자연스럽게 채워주는 최상의 조합. 함께 있을 때 편안하면서도 성장할 수 있는 에너지. 이런 궁합은 흔하지 않습니다.",advice:"'당연하다'고 생각하는 순간 주의하세요. 좋은 궁합도 감사함을 잃으면 무뎌집니다."},
};

/* ── Atoms ── */
function Btn({children,onClick,disabled,loading,full,variant="primary",size="lg",style:s={}}){
  const [h,setH]=useState(false);
  const base={fontFamily:P.sans,fontWeight:700,cursor:disabled?"not-allowed":"pointer",transition:"all .3s cubic-bezier(.16,1,.3,1)",border:"none",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,borderRadius:999,width:full?"100%":"auto",letterSpacing:-.3,...s};
  const sz={sm:{padding:"10px 20px",fontSize:13},md:{padding:"14px 28px",fontSize:14},lg:{padding:"17px 36px",fontSize:15}};
  const v={primary:{color:"#fff",background:h&&!disabled?P.accent:"linear-gradient(135deg,#ff6b6b,#ff8a65)",boxShadow:h&&!disabled?"0 8px 30px rgba(255,107,107,.3)":"0 4px 15px rgba(255,107,107,.15)",transform:h&&!disabled?"translateY(-2px)":"none"},ghost:{color:P.w60,background:"transparent",border:"1.5px solid "+P.w10},dark:{color:P.white,background:P.card,border:"1px solid "+P.w10}};
  return <button onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={disabled?undefined:onClick} style={{...base,...sz[size],...v[variant],...(disabled?{opacity:.3}:{})}}>{loading&&<span style={{width:16,height:16,border:"2px solid rgba(255,255,255,.2)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .6s linear infinite"}}/>}{children}</button>;
}

function FixedBottom({children}){
  return <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"16px 24px",paddingBottom:"max(24px,env(safe-area-inset-bottom))",background:"linear-gradient(0deg,#09090b 50%,transparent)",zIndex:50,display:"flex",justifyContent:"center"}}><div style={{maxWidth:440,width:"100%"}}>{children}</div></div>;
}

function AnimBar({label,val,color,delay}){
  const [w,setW]=useState(0);
  useEffect(()=>{const t=setTimeout(()=>setW(val),400+(delay||0)*1000);return()=>clearTimeout(t)},[val,delay]);
  return <div style={{marginBottom:14}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
      <span style={{fontSize:13,fontWeight:600,color:P.w60}}>{label}</span>
      <span style={{fontSize:16,fontWeight:800,color,fontFamily:P.mono}}>{val}</span>
    </div>
    <div style={{height:6,borderRadius:3,background:P.w05,overflow:"hidden"}}>
      <div style={{height:"100%",borderRadius:3,background:color,width:w+"%",transition:"width 1.2s cubic-bezier(.16,1,.3,1)"}}/>
    </div>
  </div>;
}

/* ── Landing ── */
function Landing({go}){
  return <div style={{minHeight:"100vh",background:P.bg,fontFamily:P.sans,position:"relative",overflow:"hidden"}}>
    {[{x:15,y:20,s:90,c:P.accent},{x:75,y:15,s:70,c:P.violet},{x:50,y:70,s:60,c:P.cyan},{x:85,y:60,s:50,c:P.lime},{x:25,y:80,s:55,c:P.pink}].map((o,i)=><div key={i} style={{position:"absolute",left:o.x+"%",top:o.y+"%",width:o.s,height:o.s,borderRadius:"50%",background:"radial-gradient(circle,"+o.c+"12,transparent 70%)",filter:"blur(30px)",animation:"orbMove "+(3+i)+"s ease-in-out infinite",animationDelay:i*.4+"s",pointerEvents:"none"}}/>)}
    <nav style={{display:"flex",alignItems:"center",gap:8,padding:"20px 24px",position:"relative",zIndex:2}}>
      <span style={{fontSize:22,animation:"glowPulse 3s ease-in-out infinite"}}>🔮</span>
      <span style={{fontSize:17,fontWeight:800,color:P.white,letterSpacing:-.5}}>헤이포춘</span>
    </nav>
    <section style={{padding:"48px 24px 50px",textAlign:"center",position:"relative",zIndex:2}}>
      <div className="fu" style={{fontSize:56,marginBottom:20,animation:"float 4s ease-in-out infinite"}}>🔮</div>
      <h1 className="fu" style={{animationDelay:".12s",fontFamily:P.serif,fontSize:"clamp(30px,8vw,48px)",fontWeight:900,color:P.white,lineHeight:1.15,letterSpacing:-2,marginBottom:14}}>
        너의 사주,<br/><span style={{background:"linear-gradient(135deg,#ff6b6b,#a3e635,#22d3ee)",backgroundSize:"200% auto",animation:"gradientShift 3s ease infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>필터 없이</span>
      </h1>
      <p className="fu" style={{animationDelay:".25s",fontSize:16,color:P.w40,lineHeight:1.8,maxWidth:300,margin:"0 auto 36px"}}>뻔한 운세 말고,<br/>진짜 너에 대한 이야기.</p>
      <div className="fu" style={{animationDelay:".38s"}}><Btn onClick={()=>go("analyze")}>내 사주 까보기</Btn></div>
    </section>
    <FixedBottom><Btn full onClick={()=>go("analyze")}>3분 만에 나를 알아보기</Btn></FixedBottom>
  </div>;
}

/* ── Analyze ── */
function Analyze({go,form,setForm}){
  const [step,setStep]=useState(0);const tot=4;const pct=((step+1)/tot)*100;
  const z=form.year?gz(form.year):null;const el=form.year?ge(form.year):null;
  const days=Array.from({length:getDays(form.year,form.month)},(_,i)=>i+1);
  const ok=useCallback(()=>{if(step===0)return form.name.trim().length>=2;if(step===1)return form.year&&form.month&&form.day;if(step===2)return form.hour!==null;if(step===3)return form.gender!==null;return false},[step,form]);
  const next=()=>{if(!ok())return;step<tot-1?setStep(step+1):go("loading")};
  const sel={flex:1,minWidth:0,padding:"16px 4px",borderRadius:12,border:"1.5px solid "+P.w10,background:P.card,fontSize:15,color:P.white,textAlign:"center",cursor:"pointer",appearance:"none",WebkitAppearance:"none"};

  return <div style={{minHeight:"100vh",background:P.bg,fontFamily:P.sans,display:"flex",flexDirection:"column"}}>
    <nav style={{display:"flex",alignItems:"center",gap:12,padding:"16px 20px",zIndex:2,position:"relative"}}>
      <button onClick={()=>step>0?setStep(step-1):go("landing")} style={{width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+P.w10,background:P.card,cursor:"pointer",fontSize:18,color:P.w40}}>←</button>
      <div style={{flex:1,height:4,borderRadius:2,background:P.w05,overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#ff6b6b,#a3e635)",width:pct+"%",transition:"width .5s cubic-bezier(.16,1,.3,1)"}}/></div>
      <span style={{fontSize:12,color:P.w20,fontFamily:P.mono}}>{step+1}/{tot}</span>
    </nav>
    <main style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px",zIndex:2,position:"relative"}} key={step}>
      <div style={{width:"100%",maxWidth:400,paddingBottom:100}}>
        {step===0&&<div className="fu" style={{textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16,animation:"float 3s ease-in-out infinite"}}>✍️</div>
          <h2 style={{fontFamily:P.serif,fontSize:28,fontWeight:700,color:P.white,marginBottom:8}}>이름이 뭐야?</h2>
          <p style={{fontSize:14,color:P.w40,marginBottom:32}}>분석에 사용할 이름을 알려줘</p>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="이름" autoFocus maxLength={10} style={{width:"100%",padding:"20px",borderRadius:16,border:"2px solid "+P.w10,background:P.card,fontSize:20,color:P.white,textAlign:"center",letterSpacing:4,outline:"none"}} onFocus={e=>{e.target.style.borderColor=P.accent}} onBlur={e=>{e.target.style.borderColor=P.w10}}/>
        </div>}
        {step===1&&<div className="fu" style={{textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16,animation:"float 3s ease-in-out infinite"}}>📅</div>
          <h2 style={{fontFamily:P.serif,fontSize:28,fontWeight:700,color:P.white,marginBottom:8}}>언제 태어났어?</h2>
          <p style={{fontSize:14,color:P.w40,marginBottom:28}}>양력 기준으로</p>
          <div style={{display:"flex",gap:8}}>
            <select value={form.year||""} onChange={e=>setForm({...form,year:+e.target.value||null})} style={sel}><option value="">년</option>{YRS.map(y=><option key={y} value={y}>{y}</option>)}</select>
            <select value={form.month||""} onChange={e=>setForm({...form,month:+e.target.value||null})} style={sel}><option value="">월</option>{Array.from({length:12},(_,i)=>i+1).map(m=><option key={m} value={m}>{m}</option>)}</select>
            <select value={form.day||""} onChange={e=>setForm({...form,day:+e.target.value||null})} style={sel}><option value="">일</option>{days.map(d=><option key={d} value={d}>{d}</option>)}</select>
          </div>
          {z&&el&&<div className="fu" style={{marginTop:20,padding:"16px 20px",borderRadius:16,background:P.card,border:"1px solid "+P.w10,display:"flex",alignItems:"center",gap:14,textAlign:"left"}}><span style={{fontSize:40}}>{z.e}</span><div><div style={{fontSize:15,fontWeight:700,color:P.white}}>{z.n}띠 · {z.k}</div><div style={{fontSize:13,color:el.c,marginTop:2}}>✦ {el.s}</div></div></div>}
        </div>}
        {step===2&&<div className="fu" style={{textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16,animation:"float 3s ease-in-out infinite"}}>🕐</div>
          <h2 style={{fontFamily:P.serif,fontSize:28,fontWeight:700,color:P.white,marginBottom:8}}>몇 시에 태어났어?</h2>
          <p style={{fontSize:14,color:P.w40,marginBottom:20}}>대략적이면 충분해</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {HR.map((h,i)=>{const s=form.hour===h.v;return <button key={i} onClick={()=>setForm({...form,hour:h.v})} style={{padding:"12px 4px",borderRadius:12,border:"1.5px solid "+(s?P.accent:P.w10),background:s?"rgba(255,107,107,.08)":P.card,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,transition:"all .2s",transform:s?"scale(1.05)":"scale(1)"}}><span style={{fontSize:18}}>{h.ic}</span><span style={{fontSize:11,fontWeight:700,color:s?P.accent:P.w60}}>{h.n}</span><span style={{fontSize:8,color:P.w20}}>{h.t}</span></button>})}
          </div>
          <button onClick={()=>setForm({...form,hour:"?"})} style={{marginTop:14,padding:"10px 24px",borderRadius:999,border:"1px solid "+(form.hour==="?"?P.accent:P.w10),background:form.hour==="?"?"rgba(255,107,107,.08)":"transparent",cursor:"pointer",fontSize:13,fontWeight:600,color:form.hour==="?"?P.accent:P.w40}}>🤷 몰라도 괜찮아</button>
        </div>}
        {step===3&&<div className="fu" style={{textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16,animation:"float 3s ease-in-out infinite"}}>⚡</div>
          <h2 style={{fontFamily:P.serif,fontSize:28,fontWeight:700,color:P.white,marginBottom:28}}>마지막! 성별은?</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[{v:"M",l:"남자",ic:"🕺",c:P.cyan},{v:"F",l:"여자",ic:"💃",c:P.pink}].map(g=>{const s=form.gender===g.v;return <button key={g.v} onClick={()=>setForm({...form,gender:g.v})} style={{padding:"32px 16px",borderRadius:20,border:"2px solid "+(s?g.c:P.w10),background:s?g.c+"10":P.card,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,transition:"all .3s",transform:s?"scale(1.05)":"scale(1)"}}><span style={{fontSize:44}}>{g.ic}</span><span style={{fontSize:16,fontWeight:700,color:s?g.c:P.w60}}>{g.l}</span></button>})}
          </div>
        </div>}
      </div>
    </main>
    <FixedBottom><Btn full disabled={!ok()} onClick={next}>{step<tot-1?"다음":"내 사주 까보기 →"}</Btn></FixedBottom>
  </div>;
}

/* ── Loading ── */
function LoadingScreen({onDone}){
  const [p,setP]=useState(0);const [m,setM]=useState(0);
  const ms=["사주팔자 펼치는 중...","오행 밸런스 계산 중...","AI가 해석하는 중...","거의 다 됐어..."];
  useEffect(()=>{const iv=setInterval(()=>setP(v=>{if(v>=100){clearInterval(iv);setTimeout(onDone,300);return 100}return v+1.2}),40);return()=>clearInterval(iv)},[]);
  useEffect(()=>{const iv=setInterval(()=>setM(v=>(v+1)%ms.length),1000);return()=>clearInterval(iv)},[]);
  return <div style={{minHeight:"100vh",background:P.bg,fontFamily:P.sans,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}>
    <div style={{position:"relative",width:120,height:120,marginBottom:28}}>
      <svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke={P.w05} strokeWidth="5"/><circle cx="60" cy="60" r="52" fill="none" stroke={P.accent} strokeWidth="5" strokeLinecap="round" strokeDasharray={(p*3.27)+" 327"} transform="rotate(-90 60 60)" style={{transition:"stroke-dasharray .1s",filter:"drop-shadow(0 0 8px rgba(255,107,107,.3))"}}/></svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,animation:"glowPulse 2s ease-in-out infinite"}}>🔮</div>
    </div>
    <div style={{fontSize:32,fontWeight:800,color:P.white,fontFamily:P.mono,marginBottom:12}}>{Math.min(Math.round(p),100)}%</div>
    <p key={m} className="fi" style={{fontSize:14,color:P.w40}}>{ms[m]}</p>
  </div>;
}

/* ── Result ── */
function ResultPage({go,form}){
  const [tab,setTab]=useState("personality");const [copied,setCopied]=useState(false);
  const z=form.year?gz(form.year):ZO[0];const el=form.year?ge(form.year):EL[0];const r=R[z.n]||R["용"];
  const sc={personality:Math.min(97,72+(form.year||95)%22),wealth:Math.min(95,60+(form.month||5)*3),love:Math.min(96,58+((form.day||15)*1.5|0)),career:Math.min(98,68+((form.year||95)%28))};
  return <div style={{minHeight:"100vh",background:P.bg,fontFamily:P.sans,paddingBottom:40}}>
    <div style={{padding:"32px 24px 0",textAlign:"center",position:"relative",zIndex:2}}>
      <div className="fu" style={{fontSize:56,marginBottom:12}}>{z.e}</div>
      <h1 className="fu" style={{animationDelay:".1s",fontFamily:P.serif,fontSize:"clamp(28px,7vw,40px)",fontWeight:900,color:P.white,letterSpacing:-2,marginBottom:4}}>{form.name||"회원"}</h1>
      <div className="fu" style={{animationDelay:".2s",fontSize:20,fontWeight:800,color:P.accent,marginBottom:4}}>{r.a}</div>
      <p className="fu" style={{animationDelay:".3s",fontSize:14,color:P.w40,marginBottom:24}}>{r.sub}</p>
    </div>
    <div style={{maxWidth:480,margin:"0 auto",padding:"0 20px",position:"relative",zIndex:2}}>
      <div className="fu" style={{animationDelay:".35s",padding:20,borderRadius:20,background:P.card,border:"1px solid "+P.w05,marginBottom:16}}>
        <AnimBar label="성격" val={sc.personality} color={P.accent} delay={0}/>
        <AnimBar label="재물" val={sc.wealth} color={P.lime} delay={0.15}/>
        <AnimBar label="연애" val={sc.love} color={P.pink} delay={0.3}/>
        <AnimBar label="커리어" val={sc.career} color={P.cyan} delay={0.45}/>
      </div>
      <div style={{display:"flex",gap:4,background:P.card,borderRadius:14,padding:4,border:"1px solid "+P.w05,marginBottom:12}}>
        {[{id:"personality",l:"성격",ic:"🧠"},{id:"wealth",l:"재물",ic:"💰"},{id:"love",l:"연애",ic:"💘"}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"11px 4px",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:tab===t.id?P.w10:"transparent",color:tab===t.id?P.white:P.w40,transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><span>{t.ic}</span>{t.l}</button>)}
      </div>
      <div key={tab} className="fu" style={{padding:22,borderRadius:20,background:P.card,border:"1px solid "+P.w05,marginBottom:20}}>
        <p style={{fontSize:15,color:P.w80,lineHeight:2,wordBreak:"keep-all"}}>{r[tab]}</p>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[{ic:"💬",l:"카카오톡"},{ic:"📸",l:"저장"},{ic:copied?"✓":"🔗",l:copied?"복사됨":"링크"}].map((b,i)=><button key={i} onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),1500)}} style={{flex:1,padding:"12px",borderRadius:12,border:"1px solid "+P.w10,background:P.card,cursor:"pointer",fontSize:12,fontWeight:600,color:P.w40,display:"flex",alignItems:"center",justifyContent:"center",gap:4,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=P.accent}} onMouseLeave={e=>{e.currentTarget.style.borderColor=P.w10}}><span style={{fontSize:15}}>{b.ic}</span>{b.l}</button>)}
      </div>
      <div style={{padding:24,borderRadius:20,background:"rgba(255,107,107,.04)",border:"1px solid rgba(255,107,107,.15)",textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:36,marginBottom:8}}>💕</div>
        <div style={{fontSize:20,fontWeight:800,color:P.white,marginBottom:4}}>궁합 볼 사람?</div>
        <p style={{fontSize:13,color:P.w40,marginBottom:16}}>상대방 정보만 입력하면<br/>둘의 궁합을 까발려 드릴게</p>
        <Btn onClick={()=>go("compat_input")}>궁합 보러 가기 →</Btn>
      </div>
      <div style={{textAlign:"center"}}><Btn variant="ghost" size="sm" onClick={()=>go("landing")}>처음으로</Btn></div>
      <div style={{textAlign:"center",padding:"28px 0 0",fontSize:11,color:P.w20}}>🔮 헤이포춘 · 오락 및 참고 목적의 AI 사주 분석</div>
    </div>
  </div>;
}

/* ── Compat Input ── */
function CompatInput({go,partner,setPartner}){
  const [step,setStep]=useState(0);const z=partner.year?gz(partner.year):null;const el=partner.year?ge(partner.year):null;
  const days=Array.from({length:getDays(partner.year,partner.month)},(_,i)=>i+1);
  const ok=step===0?partner.name.trim().length>=2:(partner.year&&partner.month&&partner.day);
  const sel={flex:1,minWidth:0,padding:"16px 4px",borderRadius:12,border:"1.5px solid "+P.w10,background:P.card,fontSize:15,color:P.white,textAlign:"center",cursor:"pointer",appearance:"none",WebkitAppearance:"none"};
  return <div style={{minHeight:"100vh",background:P.bg,fontFamily:P.sans,display:"flex",flexDirection:"column"}}>
    <nav style={{display:"flex",alignItems:"center",gap:12,padding:"16px 20px",zIndex:2,position:"relative"}}>
      <button onClick={()=>step>0?setStep(0):go("result")} style={{width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+P.w10,background:P.card,cursor:"pointer",fontSize:18,color:P.w40}}>←</button>
      <span style={{fontSize:15,fontWeight:700,color:P.white}}>💕 궁합 상대 정보</span>
    </nav>
    <main style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px",zIndex:2,position:"relative"}} key={step}>
      <div style={{width:"100%",maxWidth:400,paddingBottom:100}}>
        {step===0&&<div className="fu" style={{textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>💘</div>
          <h2 style={{fontFamily:P.serif,fontSize:26,fontWeight:700,color:P.white,marginBottom:8}}>상대방 이름은?</h2>
          <p style={{fontSize:14,color:P.w40,marginBottom:32}}>궁합을 볼 상대의 이름</p>
          <input value={partner.name} onChange={e=>setPartner({...partner,name:e.target.value})} placeholder="상대방 이름" autoFocus maxLength={10} style={{width:"100%",padding:"20px",borderRadius:16,border:"2px solid "+P.w10,background:P.card,fontSize:20,color:P.white,textAlign:"center",letterSpacing:4,outline:"none"}} onFocus={e=>{e.target.style.borderColor=P.pink}} onBlur={e=>{e.target.style.borderColor=P.w10}}/>
        </div>}
        {step===1&&<div className="fu" style={{textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>📅</div>
          <h2 style={{fontFamily:P.serif,fontSize:26,fontWeight:700,color:P.white,marginBottom:8}}>{partner.name}의 생년월일</h2>
          <p style={{fontSize:14,color:P.w40,marginBottom:28}}>양력 기준</p>
          <div style={{display:"flex",gap:8}}>
            <select value={partner.year||""} onChange={e=>setPartner({...partner,year:+e.target.value||null})} style={sel}><option value="">년</option>{YRS.map(y=><option key={y} value={y}>{y}</option>)}</select>
            <select value={partner.month||""} onChange={e=>setPartner({...partner,month:+e.target.value||null})} style={sel}><option value="">월</option>{Array.from({length:12},(_,i)=>i+1).map(m=><option key={m} value={m}>{m}</option>)}</select>
            <select value={partner.day||""} onChange={e=>setPartner({...partner,day:+e.target.value||null})} style={sel}><option value="">일</option>{days.map(d=><option key={d} value={d}>{d}</option>)}</select>
          </div>
          {z&&el&&<div className="fu" style={{marginTop:20,padding:"16px 20px",borderRadius:16,background:P.card,border:"1px solid "+P.w10,display:"flex",alignItems:"center",gap:14,textAlign:"left"}}><span style={{fontSize:40}}>{z.e}</span><div><div style={{fontSize:15,fontWeight:700,color:P.white}}>{z.n}띠 · {z.k}</div><div style={{fontSize:13,color:el.c,marginTop:2}}>✦ {el.s}</div></div></div>}
        </div>}
      </div>
    </main>
    <FixedBottom><Btn full disabled={!ok} onClick={()=>{if(step===0)setStep(1);else go("compat_loading")}}>{step===0?"다음":"궁합 분석하기 💕"}</Btn></FixedBottom>
  </div>;
}

/* ── Compat Loading ── */
function CompatLoading({onDone,form,partner}){
  const [p,setP]=useState(0);const z1=form.year?gz(form.year):ZO[0];const z2=partner.year?gz(partner.year):ZO[0];
  useEffect(()=>{const iv=setInterval(()=>setP(v=>{if(v>=100){clearInterval(iv);setTimeout(onDone,500);return 100}return v+1.5}),40);return()=>clearInterval(iv)},[]);
  return <div style={{minHeight:"100vh",background:P.bg,fontFamily:P.sans,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}>
    <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:32}}>
      <div style={{textAlign:"center"}}><div style={{fontSize:48}}>{z1.e}</div><div style={{fontSize:13,fontWeight:700,color:P.w60,marginTop:4}}>{form.name}</div></div>
      <div style={{fontSize:32,animation:"heartbeat 1.5s ease-in-out infinite"}}>💕</div>
      <div style={{textAlign:"center"}}><div style={{fontSize:48}}>{z2.e}</div><div style={{fontSize:13,fontWeight:700,color:P.w60,marginTop:4}}>{partner.name}</div></div>
    </div>
    <div style={{width:200,height:6,borderRadius:3,background:P.w05,overflow:"hidden",marginBottom:16}}><div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,#ff6b6b,#f472b6)",width:p+"%",transition:"width .1s"}}/></div>
    <p style={{fontSize:14,color:P.w40}}>두 사람의 궁합을 분석하는 중...</p>
  </div>;
}

/* ── Compat Result ── */
function CompatResult({go,form,partner}){
  const z1=form.year?gz(form.year):ZO[0];const z2=partner.year?gz(partner.year):ZO[0];
  const level=calcCompat(z1.n,z2.n);const d=CD[level];
  const [revealed,setRevealed]=useState(false);
  const [barW,setBarW]=useState(0);
  useEffect(()=>{setTimeout(()=>setRevealed(true),800)},[]);
  useEffect(()=>{if(revealed)setTimeout(()=>setBarW(d.score),400)},[revealed]);

  return <div style={{minHeight:"100vh",background:P.bg,fontFamily:P.sans,paddingBottom:40}}>
    <div style={{padding:"32px 24px",textAlign:"center",position:"relative",zIndex:2}}>
      <div className="fu" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginBottom:24}}>
        <div style={{textAlign:"center"}}><div style={{width:72,height:72,borderRadius:20,background:P.card,border:"1px solid "+P.w10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 6px"}}>{z1.e}</div><div style={{fontSize:14,fontWeight:700,color:P.white}}>{form.name}</div><div style={{fontSize:11,color:P.w40}}>{z1.n}띠</div></div>
        <div style={{fontSize:28,animation:revealed?"heartbeat 1.5s ease-in-out infinite":"none"}}>{d.emoji}</div>
        <div style={{textAlign:"center"}}><div style={{width:72,height:72,borderRadius:20,background:P.card,border:"1px solid "+P.w10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 6px"}}>{z2.e}</div><div style={{fontSize:14,fontWeight:700,color:P.white}}>{partner.name}</div><div style={{fontSize:11,color:P.w40}}>{z2.n}띠</div></div>
      </div>
      {revealed&&<div className="fu">
        <div style={{display:"inline-block",padding:"10px 28px",borderRadius:999,border:"2px solid "+d.color,background:d.color+"10",marginBottom:16}}>
          <span style={{fontSize:28,fontWeight:900,color:d.color,fontFamily:P.serif,letterSpacing:-1}}>{d.tier}</span>
        </div>
        <h2 style={{fontFamily:P.serif,fontSize:24,fontWeight:900,color:P.white,marginBottom:4,letterSpacing:-1}}>{d.title}</h2>
        <p style={{fontSize:15,fontWeight:600,color:d.color,marginBottom:24}}>{d.verdict}</p>
      </div>}
    </div>
    {revealed&&<div style={{maxWidth:480,margin:"0 auto",padding:"0 20px",position:"relative",zIndex:2}}>
      <div className="fu" style={{animationDelay:".15s",padding:24,borderRadius:20,background:P.card,border:"1px solid "+P.w05,marginBottom:16,textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:P.w40,marginBottom:8}}>궁합 지수</div>
        <div style={{fontSize:56,fontWeight:900,color:d.color,fontFamily:P.mono}}>{d.score}<span style={{fontSize:24,color:P.w40}}>점</span></div>
        <div style={{height:8,borderRadius:4,background:P.w05,overflow:"hidden",margin:"12px 0"}}><div style={{height:"100%",borderRadius:4,background:d.color,width:barW+"%",transition:"width 1.5s cubic-bezier(.16,1,.3,1)"}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:P.w20}}><span>💔 헤어져</span><span>🤔 노력해</span><span>💍 결혼해</span></div>
      </div>
      <div className="fu" style={{animationDelay:".25s",padding:22,borderRadius:20,background:P.card,border:"1px solid "+P.w05,marginBottom:16}}>
        <p style={{fontSize:15,color:P.w80,lineHeight:2,wordBreak:"keep-all"}}>{d.desc}</p>
      </div>
      <div className="fu" style={{animationDelay:".35s",padding:18,borderRadius:16,background:d.color+"10",border:"1px solid "+d.color+"30",marginBottom:24}}>
        <div style={{fontSize:12,fontWeight:700,color:d.color,marginBottom:6}}>💡 이 관계를 위한 조언</div>
        <p style={{fontSize:14,color:P.w60,lineHeight:1.8}}>{d.advice}</p>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:12}}><Btn full variant="dark" onClick={()=>go("result")}>내 결과 다시 보기</Btn></div>
      <div style={{display:"flex",gap:10}}><Btn full variant="ghost" size="md" onClick={()=>go("landing")}>처음으로</Btn></div>
      <div style={{textAlign:"center",padding:"28px 0 0",fontSize:11,color:P.w20}}>🔮 헤이포춘 · 오락 및 참고 목적</div>
    </div>}
  </div>;
}

/* ── Main ── */
export default function HeyFortune(){
  const [page,setPage]=useState("landing");
  const [form,setForm]=useState({name:"",year:null,month:null,day:null,hour:null,gender:null});
  const [partner,setPartner]=useState({name:"",year:null,month:null,day:null});
  const go=(p)=>{window.scrollTo({top:0,behavior:"instant"});setPage(p)};
  return <div style={{maxWidth:480,margin:"0 auto",position:"relative",minHeight:"100vh"}}>
    <style>{css}</style>
    {page==="landing"&&<Landing go={go}/>}
    {page==="analyze"&&<Analyze go={go} form={form} setForm={setForm}/>}
    {page==="loading"&&<LoadingScreen onDone={()=>go("result")}/>}
    {page==="result"&&<ResultPage go={go} form={form}/>}
    {page==="compat_input"&&<CompatInput go={go} partner={partner} setPartner={setPartner}/>}
    {page==="compat_loading"&&<CompatLoading onDone={()=>go("compat_result")} form={form} partner={partner}/>}
    {page==="compat_result"&&<CompatResult go={go} form={form} partner={partner}/>}
  </div>;
}
