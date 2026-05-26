import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart
} from "recharts";
import {
  LayoutDashboard, Users, GraduationCap, ClipboardList, Activity, DollarSign,
  Calendar, MessageSquare, BarChart2, Settings, Bell, Search, Menu, X,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Plus, Download, Edit,
  Eye, Trash2, Check, CheckCircle2, AlertCircle, Clock, TrendingUp, TrendingDown,
  Zap, Award, Filter, MoreHorizontal, User, Lock, Phone, Mail, Globe, MapPin,
  RefreshCw, WifiOff, Save, Printer, FileText, BookOpen, Shield, Star, Target,
  Layers, Home, UserPlus, Send, Upload, BookMarked, ArrowUp, ArrowDown,
  CreditCard, Wifi, Smartphone, Briefcase, Flag, Building, Hash, CheckCheck,
  UserCheck, UserX, AlertTriangle, Info, ToggleLeft, Database, Key, HelpCircle
} from "lucide-react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const G = {
  green:"#004000", gd:"#002600", gl:"#005800", gll:"#007A00",
  orange:"#F66000",
  bg:"#F7F9F7", bg2:"#EFF3EF", card:"#FFFFFF",
  text:"#0F172A", muted:"#64748B", light:"#94A3B8",
  border:"#E1E8E1",
  ok:"#10B981", warn:"#F59E0B", err:"#EF4444", info:"#3B82F6",
  purple:"#8B5CF6", pink:"#EC4899", cyan:"#06B6D4",
  gp:"rgba(0,64,0,0.08)", gpb:"rgba(0,64,0,0.16)",
  op:"rgba(246,96,0,0.08)",
};
const PL = {EE:G.green,ME:G.info,AE:G.warn,BE:G.err};
const PN = {EE:"Exceeding",ME:"Meeting",AE:"Approaching",BE:"Below"};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STUDENTS = [
  {id:"KE001",name:"Amina Wanjiku",  grade:"5A",att:96,lvl:"EE",gpa:82,fees:"paid",  risk:false,dob:"12 Mar 2014",parent:"Fatuma Wanjiku",  phone:"+254 722 001 001",admDate:"Jan 2021"},
  {id:"KE002",name:"Brian Otieno",   grade:"5A",att:88,lvl:"ME",gpa:74,fees:"paid",  risk:false,dob:"22 Jul 2014",parent:"James Otieno",    phone:"+254 733 002 002",admDate:"Jan 2021"},
  {id:"KE003",name:"Cynthia Muthoni",grade:"6B",att:72,lvl:"AE",gpa:61,fees:"partial",risk:true,dob:"8 Jan 2014", parent:"Ann Muthoni",     phone:"+254 700 003 003",admDate:"Jan 2020"},
  {id:"KE004",name:"David Kipchoge", grade:"4C",att:94,lvl:"ME",gpa:71,fees:"paid",  risk:false,dob:"30 Nov 2013",parent:"Robert Kipchoge",phone:"+254 711 004 004",admDate:"Jan 2022"},
  {id:"KE005",name:"Esther Achieng", grade:"5A",att:99,lvl:"EE",gpa:89,fees:"partial",risk:false,dob:"17 May 2014",parent:"Ruth Achieng",  phone:"+254 722 005 005",admDate:"Jan 2021"},
  {id:"KE006",name:"Felix Kamau",    grade:"6B",att:65,lvl:"BE",gpa:48,fees:"unpaid",risk:true, dob:"3 Sep 2014", parent:"Peter Kamau",    phone:"+254 733 006 006",admDate:"Jan 2020"},
  {id:"KE007",name:"Grace Njeri",    grade:"5A",att:91,lvl:"ME",gpa:76,fees:"paid",  risk:false,dob:"14 Feb 2014",parent:"Sarah Njeri",    phone:"+254 700 007 007",admDate:"Jan 2021"},
  {id:"KE008",name:"Hassan Abdi",    grade:"7B",att:87,lvl:"EE",gpa:84,fees:"paid",  risk:false,dob:"25 Dec 2013",parent:"Mohamed Abdi",  phone:"+254 711 008 008",admDate:"Jan 2019"},
  {id:"KE009",name:"Irene Wambua",   grade:"5A",att:93,lvl:"ME",gpa:72,fees:"paid",  risk:false,dob:"20 Apr 2014",parent:"Lucy Wambua",   phone:"+254 722 009 009",admDate:"Jan 2021"},
  {id:"KE010",name:"John Gitau",     grade:"6B",att:78,lvl:"AE",gpa:58,fees:"unpaid",risk:true, dob:"11 Aug 2014",parent:"Daniel Gitau",  phone:"+254 733 010 010",admDate:"Jan 2020"},
  {id:"KE011",name:"Kendi Mugo",     grade:"4A",att:95,lvl:"ME",gpa:78,fees:"paid",  risk:false,dob:"5 Jun 2015", parent:"Mary Mugo",     phone:"+254 700 011 011",admDate:"Jan 2022"},
  {id:"KE012",name:"Leon Mwangi",    grade:"7A",att:90,lvl:"ME",gpa:73,fees:"paid",  risk:false,dob:"19 Oct 2013",parent:"Paul Mwangi",   phone:"+254 711 012 012",admDate:"Jan 2019"},
];
const TEACHERS = [
  {id:"T001",name:"Njeri Wambua",   sub:"Mathematics · Science",  cls:"5A (CT)",att:96,rating:4.8,load:22,hrs:28,qual:"BEd Math, UoN",  joined:"Jan 2019",status:"active"},
  {id:"T002",name:"James Odhiambo", sub:"English · Literacy",     cls:"5A, 5B", att:92,rating:4.5,load:24,hrs:30,qual:"BEd English, KU",joined:"Jan 2020",status:"active"},
  {id:"T003",name:"Beatrice Kariuki",sub:"Science & Technology",  cls:"6A, 6B, 7A",att:98,rating:4.9,load:18,hrs:22,qual:"BSc Biology, UoN",joined:"Mar 2018",status:"active"},
  {id:"T004",name:"Samuel Mwenda",  sub:"Kiswahili",              cls:"Gr 4–7",  att:89,rating:4.3,load:26,hrs:32,qual:"BEd Kiswahili, MMU",joined:"Jan 2021",status:"active"},
  {id:"T005",name:"Agnes Mutua",    sub:"Social Studies · CRE",   cls:"4A, 4B, 4C",att:94,rating:4.6,load:20,hrs:26,qual:"BA History, UoN",joined:"Aug 2017",status:"active"},
  {id:"T006",name:"Peter Kimani",   sub:"Creative Arts",           cls:"Gr 4–6",  att:91,rating:4.4,load:14,hrs:18,qual:"BA Fine Art, KU", joined:"Jan 2022",status:"active"},
  {id:"T007",name:"David Wafula",   sub:"Physical Education",      cls:"Gr 4–7",  att:97,rating:4.7,load:16,hrs:20,qual:"BSc Sports Sci",  joined:"Jan 2020",status:"active"},
  {id:"T008",name:"Grace Omondi",   sub:"Home Science · Agriculture",cls:"Gr 5–7",att:88,rating:4.2,load:18,hrs:22,qual:"BEd Home Sci",  joined:"Jan 2023",status:"probation"},
];
const FEE_ACCOUNTS = [
  {id:"KE001",name:"Amina Wanjiku",  grade:"5A",total:56000,paid:56000,bal:0,    status:"paid",   lastPay:"21 Apr",mpesa:true},
  {id:"KE003",name:"Cynthia Muthoni",grade:"6B",total:58000,paid:30000,bal:28000,status:"partial",lastPay:"5 May", mpesa:false},
  {id:"KE005",name:"Esther Achieng", grade:"5A",total:56000,paid:50000,bal:6000, status:"partial",lastPay:"21 Apr",mpesa:true},
  {id:"KE006",name:"Felix Kamau",    grade:"6B",total:58000,paid:0,    bal:58000,status:"unpaid", lastPay:null,    mpesa:false},
  {id:"KE010",name:"John Gitau",     grade:"6B",total:58000,paid:10000,bal:48000,status:"unpaid", lastPay:"Mar 15",mpesa:false},
];
const ANNOUNCEMENTS = [
  {id:1,title:"Mid-Term Examination Schedule Released",body:"The mid-term examinations for all grades will be held from 2nd–6th June 2026. CBC portfolio submissions are due by 30th May.",author:"Principal Kamau",date:"24 May 2026",tag:"Academic",pinned:true,audience:"All Staff & Parents",sent:1316},
  {id:2,title:"School Fees Reminder – Term 2",body:"Kindly settle outstanding Term 2 balances by 31st May 2026 to avoid late payment penalties. Paybill 890456, Acct: Admission No.",author:"Bursar Ouma",date:"22 May 2026",tag:"Finance",pinned:true,audience:"Parents",sent:842},
  {id:3,title:"CBC Professional Development Workshop",body:"All teachers are required to attend the CBC Assessment Methodology refresher on Saturday 1st June at 9:00 AM in the Main Hall.",author:"Deputy Principal",date:"21 May 2026",tag:"Staff",pinned:false,audience:"Teaching Staff",sent:68},
  {id:4,title:"Athletics Day – 14th June 2026",body:"Inter-house athletics on 14th June. Sports captains to submit team lists by 7th June.",author:"Sports Director",date:"20 May 2026",tag:"Activity",pinned:false,audience:"All",sent:1384},
];
const ATT_TREND = [{m:"Jan",r:88},{m:"Feb",r:91},{m:"Mar",r:89},{m:"Apr",r:93},{m:"May",r:94}];
const FEE_TREND  = [{m:"Jan",col:18.5,tgt:22.8},{m:"Feb",col:19.2,tgt:22.8},{m:"Mar",col:17.5,tgt:22.8},{m:"Apr",col:21.0,tgt:22.8},{m:"May",col:19.8,tgt:22.8}];
const GRADE_PERF = [{g:"Gr 4",v:76,c:G.green},{g:"Gr 5",v:74,c:G.info},{g:"Gr 6",v:71,c:G.warn},{g:"Gr 7",v:69,c:G.orange}];
const RADAR_SCHOOL = [{s:"Literacy",v:82},{s:"Numeracy",v:78},{s:"Science",v:84},{s:"Creativity",v:76},{s:"Social",v:80},{s:"Digital",v:71},{s:"PE",v:88}];
const INCIDENTS = [
  {id:1,student:"Felix Kamau",    grade:"6B",type:"Misconduct", severity:"medium",date:"22 May",desc:"Disruptive in class, repeated verbal warnings.",action:"Parent notified",status:"open"},
  {id:2,student:"Cynthia Muthoni",grade:"6B",type:"Attendance", severity:"high",  date:"17 May",desc:"3rd consecutive Friday unexplained absence.",action:"Counselor referral",status:"open"},
  {id:3,student:"John Gitau",     grade:"6B",type:"Academic",   severity:"medium",date:"12 May",desc:"Repeated incomplete homework 4 weeks running.",action:"One-on-one scheduled",status:"resolved"},
  {id:4,student:"Brian Otieno",   grade:"5A",type:"Positive",   severity:"low",   date:"21 May",desc:"Helped struggling classmate — commended by teacher.",action:"Certificate issued",status:"resolved"},
];
const STAFF_LOG = [
  {name:"Ms. Wambua",   action:"CBC Assessment Entry – Grade 5A",  time:"Today 09:14"},
  {name:"Mr. Odhiambo", action:"Submitted Attendance – Grade 5B",   time:"Today 08:55"},
  {name:"Ms. Kariuki",  action:"Uploaded Lab Resource – Grade 6A",  time:"Today 08:30"},
  {name:"Mr. Mwenda",   action:"Parent Message – Cynthia Muthoni",  time:"Yesterday"},
  {name:"Bursar Ouma",  action:"Fee Payment Recorded – KE005",      time:"Yesterday"},
];
const SYSTEM_HEALTH = [
  {l:"Database",v:"Operational",c:G.ok,icon:"🗄️"},{l:"M-Pesa API",v:"Connected",c:G.ok,icon:"📱"},
  {l:"SMS Gateway",v:"Connected",c:G.ok,icon:"💬"},{l:"KNEC API",v:"Synced",c:G.ok,icon:"🎓"},
  {l:"Backup",v:"2h ago",c:G.ok,icon:"💾"},{l:"Storage",v:"62% used",c:G.warn,icon:"📦"},
];
const CLASSES = [
  {id:"4A",grade:"Gr 4",stream:"A",ct:"Agnes Mutua",  count:32,room:"C1",avgAtt:94,avgPerf:78},
  {id:"4B",grade:"Gr 4",stream:"B",ct:"Agnes Mutua",  count:30,room:"C2",avgAtt:91,avgPerf:75},
  {id:"4C",grade:"Gr 4",stream:"C",ct:"Peter Kimani", count:29,room:"C3",avgAtt:89,avgPerf:73},
  {id:"5A",grade:"Gr 5",stream:"A",ct:"Njeri Wambua", count:32,room:"C4",avgAtt:93,avgPerf:76},
  {id:"5B",grade:"Gr 5",stream:"B",ct:"James Odhiambo",count:30,room:"C5",avgAtt:89,avgPerf:72},
  {id:"6A",grade:"Gr 6",stream:"A",ct:"Beatrice Kariuki",count:28,room:"C6",avgAtt:92,avgPerf:74},
  {id:"6B",grade:"Gr 6",stream:"B",ct:"Samuel Mwenda",count:27,room:"C7",avgAtt:87,avgPerf:70},
  {id:"7A",grade:"Gr 7",stream:"A",ct:"David Wafula", count:34,room:"C8",avgAtt:90,avgPerf:71},
  {id:"7B",grade:"Gr 7",stream:"B",ct:"Grace Omondi", count:32,room:"C9",avgAtt:88,avgPerf:69},
];

// ─── ATOMS ───────────────────────────────────────────────────────────────────
const avBg  = i=>["#e0f0e0","#e0eaf8","#fdf0e0","#f0e0f4","#e0f4ec","#fce8e0","#e8f0fe","#f0f8e8"][i%8];
const avTx  = i=>["#1a5c1a","#1a3a7c","#7c5c1a","#6c1a6c","#1a5c3a","#7c2a1a","#1a3a7c","#3a5c1a"][i%8];
const avInit = n=>n.split(" ").map(w=>w[0]).join("").slice(0,2);

function Av({name,idx=0,size=34}){
  return <div style={{width:size,height:size,borderRadius:size*0.28,background:avBg(idx),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:size*0.35,color:avTx(idx),flexShrink:0}}>{avInit(name)}</div>;
}
function Card({children,style={},onClick}){
  return <div onClick={onClick} style={{background:G.card,borderRadius:16,border:`1px solid ${G.border}`,boxShadow:"0 1px 6px rgba(0,64,0,0.05)",padding:"18px 20px",cursor:onClick?"pointer":"default",...style}}>{children}</div>;
}
function Pill({level,sm}){
  const c=PL[level];
  return <span style={{background:`${c}18`,color:c,border:`1px solid ${c}25`,borderRadius:20,padding:sm?"2px 7px":"3px 10px",fontSize:sm?10:11,fontWeight:700,whiteSpace:"nowrap"}}>{sm?level:`${level} · ${PN[level]}`}</span>;
}
function Chip({children,color=G.green,sm}){
  return <span style={{background:`${color}12`,color,border:`1px solid ${color}22`,fontSize:sm?10:11,fontWeight:700,padding:sm?"2px 8px":"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{children}</span>;
}
function Tag({children,color=G.muted}){
  return <span style={{background:`${color}15`,color,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:5,letterSpacing:.3,textTransform:"uppercase"}}>{children}</span>;
}
function Btn({children,variant="green",icon:I,sm,onClick,style={},disabled}){
  const v={green:{bg:G.green,tx:"#fff",bd:"none"},orange:{bg:G.orange,tx:"#fff",bd:"none"},ghost:{bg:"transparent",tx:G.muted,bd:`1px solid ${G.border}`},pale:{bg:G.gp,tx:G.green,bd:"none"},err:{bg:`${G.err}10`,tx:G.err,bd:`1px solid ${G.err}20`}}[variant]||{bg:G.green,tx:"#fff",bd:"none"};
  return <button disabled={disabled} onClick={onClick} style={{display:"flex",alignItems:"center",gap:5,padding:sm?"6px 12px":"8px 16px",borderRadius:9,border:v.bd,background:v.bg,color:v.tx,fontSize:sm?11:12,fontWeight:700,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,...style}}>{I&&<I size={sm?12:13}/>}{children}</button>;
}
function SH({title,sub,right,mb=14}){
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:mb}}><div><div style={{fontSize:14,fontWeight:800,color:G.text,letterSpacing:-.2}}>{title}</div>{sub&&<div style={{fontSize:11,color:G.muted,marginTop:2}}>{sub}</div>}</div>{right}</div>;
}
function PBar({value,max=100,color=G.green,h=6}){
  return <div style={{height:h,background:G.bg2,borderRadius:h,overflow:"hidden"}}><div style={{width:`${Math.min((value/max)*100,100)}%`,height:"100%",background:color,borderRadius:h,transition:"width .6s ease"}}/></div>;
}
function Toggle({on,onChange}){
  return <button onClick={()=>onChange(!on)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:on?G.green:G.bg2,position:"relative",transition:"background .2s",flexShrink:0}}><div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:on?21:3,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/></button>;
}
function Section({children}){return <div style={{display:"flex",flexDirection:"column",gap:16}}>{children}</div>;}
function MetCard({icon:I,label,value,trend,color,sub,data}){
  const up=trend>=0;
  return <Card style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:10}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div style={{width:34,height:34,borderRadius:10,background:`${color}14`,display:"flex",alignItems:"center",justifyContent:"center"}}><I size={15} color={color}/></div>
      <span style={{display:"flex",alignItems:"center",gap:3,fontSize:11,fontWeight:700,color:up?G.ok:G.err}}>{up?<ArrowUp size={10}/>:<ArrowDown size={10}/>}{Math.abs(trend)}%</span>
    </div>
    <div><div style={{fontSize:mob_?18:22,fontWeight:800,color:G.text,lineHeight:1}}>{value}</div><div style={{fontSize:11,color:G.muted,marginTop:3}}>{label}</div></div>
    {sub&&<div style={{fontSize:10,color:G.light}}>{sub}</div>}
  </Card>;
}
let mob_ = false;

// ─── VIEW: DASHBOARD ─────────────────────────────────────────────────────────
function DashboardView({mob}){
  mob_=mob;
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
      <div>
        <div style={{fontSize:mob?17:21,fontWeight:800,color:G.text,letterSpacing:-.4}}>Good morning, Principal Kamau 👋</div>
        <div style={{fontSize:11,color:G.muted,marginTop:2}}>Nairobi Greenfields Academy · Friday 24 May 2026 · Term 2 Week 11</div>
      </div>
      {!mob&&<div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Download}>Export</Btn><Btn icon={Plus}>Quick Action</Btn></div>}
    </div>

    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(6,1fr)",gap:10}}>
      {[
        {i:Users,     l:"Students",        v:"1,248",t:3.2, c:G.green,  s:"↑ 38 this term"},
        {i:GraduationCap,l:"Teaching Staff",v:"68",  t:1.5, c:G.info,   s:"4 part-time"},
        {i:DollarSign, l:"Fee Collection", v:"KES 12.4M",t:8.7,c:G.orange,s:"54% of target"},
        {i:Activity,   l:"Attendance",     v:"94.6%", t:2.1, c:G.ok,    s:"Above avg"},
        {i:ClipboardList,l:"CBC Complete",  v:"78%",  t:-1.3,c:G.warn,  s:"Gr 7 pending"},
        {i:BookOpen,   l:"Active Classes", v:"42",    t:0,   c:G.purple, s:"9 grades"},
      ].map(({i,l,v,t,c,s})=><MetCard key={l} icon={i} label={l} value={v} trend={t} color={c} sub={s}/>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"2fr 1fr",gap:14}}>
      <Card>
        <SH title="Attendance Trend" sub="Monthly average · 2026" right={!mob&&<div style={{display:"flex",gap:6}}>{["This Year","Last Year"].map((t,i)=><button key={t} style={{padding:"3px 10px",borderRadius:7,fontSize:10,fontWeight:600,background:i===0?G.green:"transparent",color:i===0?"#fff":G.muted,border:i===0?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{t}</button>)}</div>}/>
        <ResponsiveContainer width="100%" height={mob?150:180}>
          <AreaChart data={ATT_TREND}><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={G.green} stopOpacity={.2}/><stop offset="95%" stopColor={G.green} stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={G.border}/><XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/><YAxis domain={[80,100]} tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}} formatter={v=>[`${v}%`]}/><Area type="monotone" dataKey="r" stroke={G.green} strokeWidth={2.5} fill="url(#ag)" dot={{fill:G.green,r:3}} activeDot={{r:5}}/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card style={{background:`linear-gradient(155deg,${G.gd},${G.gl})`,border:"none",boxShadow:"0 6px 24px rgba(0,64,0,.25)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <div style={{width:28,height:28,borderRadius:8,background:"rgba(255,255,255,.14)",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={13} color="#fff"/></div>
          <span style={{fontSize:13,fontWeight:800,color:"#fff"}}>AI Insights</span>
        </div>
        {[
          {icon:"⚠️",tag:"Attendance",text:"Grade 7B attendance down 8% this week. Intervention recommended."},
          {icon:"📈",tag:"Finance",   text:"Fee collection 4% above last month — strong parent response."},
          {icon:"🎓",tag:"CBC",       text:"3 learners across Grade 5 ready for EE upgrade in Mathematics."},
        ].map((x,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,.08)",borderRadius:9,padding:"9px 11px",marginBottom:i<2?7:0}}>
            <div style={{fontSize:9,color:"rgba(255,255,255,.5)",marginBottom:2}}>{x.icon} {x.tag}</div>
            <div style={{fontSize:11,color:"#fff",lineHeight:1.5}}>{x.text}</div>
          </div>
        ))}
      </Card>
    </div>

    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:14}}>
      <Card>
        <SH title="Fee Collection" sub="KES millions vs target"/>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={FEE_TREND} barCategoryGap="30%"><CartesianGrid strokeDasharray="3 3" stroke={G.border} vertical={false}/><XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}} formatter={v=>[`KES ${v}M`]}/><Bar dataKey="tgt" fill={G.bg2} radius={[3,3,0,0]} name="Target"/><Bar dataKey="col" fill={G.orange} radius={[3,3,0,0]} name="Collected"/></BarChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <SH title="Performance by Grade" sub="Average GPA · Term 2"/>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {GRADE_PERF.map(({g,v,c})=>(
            <div key={g} style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:40,fontSize:11,fontWeight:700,color:G.text}}>{g}</div>
              <div style={{flex:1}}><PBar value={v} color={c}/></div>
              <div style={{fontSize:12,fontWeight:800,color:c,width:36,textAlign:"right"}}>{v}%</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SH title="CBC Competency Radar" sub="School-wide · all subjects"/>
        <ResponsiveContainer width="100%" height={150}>
          <RadarChart data={RADAR_SCHOOL}><PolarGrid stroke={G.border}/><PolarAngleAxis dataKey="s" tick={{fontSize:9,fill:G.muted}}/><Radar dataKey="v" stroke={G.orange} fill={G.orange} fillOpacity={.18} strokeWidth={2}/><Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}}/></RadarChart>
        </ResponsiveContainer>
      </Card>
    </div>

    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14}}>
      <Card>
        <SH title="Recent Staff Activity" sub="Last 24 hours"/>
        {STAFF_LOG.map((l,i)=>(
          <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"9px 0",borderBottom:i<STAFF_LOG.length-1?`1px solid ${G.border}`:"none"}}>
            <Av name={l.name} idx={i} size={32}/>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:G.text}}>{l.name}</div><div style={{fontSize:11,color:G.muted}}>{l.action}</div></div>
            <div style={{fontSize:10,color:G.light,flexShrink:0}}>{l.time}</div>
          </div>
        ))}
      </Card>
      <Card>
        <SH title="System Health" sub="All integrations"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {SYSTEM_HEALTH.map((s,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"10px 12px",background:G.bg,borderRadius:10}}>
              <span style={{fontSize:18}}>{s.icon}</span>
              <div><div style={{fontSize:11,fontWeight:700,color:G.text}}>{s.l}</div><div style={{fontSize:10,fontWeight:700,color:s.c}}>{s.v}</div></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </Section>;
}

// ─── VIEW: STUDENT MANAGEMENT ────────────────────────────────────────────────
function StudentsView({mob}){
  const [q,setQ]=useState("");
  const [grade,setGrade]=useState("All");
  const [sel,setSel]=useState(null);
  const [admForm,setAdmForm]=useState(false);
  const rows=STUDENTS.filter(s=>{
    const qm=s.name.toLowerCase().includes(q.toLowerCase())||s.id.toLowerCase().includes(q.toLowerCase());
    const gm=grade==="All"||s.grade.startsWith(grade);
    return qm&&gm;
  });
  const feeC={paid:G.ok,partial:G.warn,unpaid:G.err};
  if(sel){
    const s=STUDENTS.find(x=>x.id===sel);
    const idx=STUDENTS.indexOf(s);
    return <Section>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setSel(null)} style={{width:32,height:32,borderRadius:8,border:`1px solid ${G.border}`,background:G.card,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={14} color={G.muted}/></button>
        <div style={{flex:1}}><div style={{fontSize:16,fontWeight:800,color:G.text}}>Learner Profile</div><div style={{fontSize:11,color:G.muted}}>{s.id}</div></div>
        <Btn variant="ghost" icon={Edit} sm>Edit</Btn>
        <Btn variant="err" icon={Trash2} sm>Withdraw</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"260px 1fr",gap:14}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card style={{textAlign:"center",padding:"24px 20px"}}>
            <Av name={s.name} idx={idx} size={64}/>
            <div style={{fontSize:16,fontWeight:800,color:G.text,marginTop:10}}>{s.name}</div>
            <div style={{fontSize:11,color:G.muted}}>Grade {s.grade} · {s.id}</div>
            <div style={{marginTop:8}}><Pill level={s.lvl}/></div>
            {s.risk&&<div style={{marginTop:8,padding:"6px 10px",background:`${G.err}10`,borderRadius:8,fontSize:10,fontWeight:700,color:G.err}}>⚠ Intervention Flagged</div>}
          </Card>
          <Card>
            {[{l:"Date of Birth",v:s.dob},{l:"Admission Date",v:s.admDate},{l:"Parent / Guardian",v:s.parent},{l:"Phone",v:s.phone}].map(({l,v})=>(
              <div key={l} style={{padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
                <div style={{fontSize:10,color:G.muted,fontWeight:700}}>{l}</div>
                <div style={{fontSize:12,fontWeight:600,color:G.text,marginTop:2}}>{v}</div>
              </div>
            ))}
          </Card>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            {[{l:"Attendance",v:`${s.att}%`,c:s.att>90?G.ok:G.warn},{l:"GPA",v:`${s.gpa}%`,c:G.info},{l:"CBC Level",v:s.lvl,c:PL[s.lvl]},{l:"Fees",v:s.fees,c:feeC[s.fees]}].map(({l,v,c})=>(
              <div key={l} style={{background:G.card,borderRadius:12,padding:"12px 14px",border:`1px solid ${G.border}`,textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,color:c,textTransform:"capitalize"}}>{v}</div><div style={{fontSize:10,color:G.muted}}>{l}</div></div>
            ))}
          </div>
          <Card>
            <SH title="Subject Performance" sub="Current term"/>
            {["Mathematics","English","Science & Technology","Kiswahili"].map((sub,i)=>{
              const score=[s.gpa+3,s.gpa-2,s.gpa+5,s.gpa-8][i];
              const lvl=score>=85?"EE":score>=70?"ME":score>=55?"AE":"BE";
              return <div key={sub} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<3?`1px solid ${G.border}`:"none"}}>
                <div style={{flex:1,fontSize:12,fontWeight:600,color:G.text}}>{sub}</div>
                <div style={{width:80,height:5,background:G.bg2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${score}%`,height:"100%",background:PL[lvl],borderRadius:3}}/></div>
                <div style={{width:34,fontSize:12,fontWeight:700,color:PL[lvl],textAlign:"right"}}>{score}%</div>
                <Pill level={lvl} sm/>
              </div>;
            })}
          </Card>
          <Card>
            <SH title="Admin Actions"/>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <Btn icon={MessageSquare} sm>Message Parent</Btn>
              <Btn icon={FileText} sm variant="ghost">View Report Card</Btn>
              <Btn icon={AlertCircle} sm variant="err">Flag for Intervention</Btn>
              <Btn icon={Download} sm variant="ghost">Export Profile</Btn>
            </div>
          </Card>
        </div>
      </div>
    </Section>;
  }
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Student Management</div><div style={{fontSize:11,color:G.muted}}>1,248 learners · 42 classes · 9 grades</div></div>
      <div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Download} sm>Export</Btn><Btn icon={UserPlus} onClick={()=>setAdmForm(true)}>Admit Learner</Btn></div>
    </div>
    {admForm&&<Card style={{background:G.gp,border:`1px solid ${G.gpb}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div style={{fontSize:13,fontWeight:800,color:G.green}}>New Admission</div><button onClick={()=>setAdmForm(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={16} color={G.muted}/></button></div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:10,marginBottom:10}}>
        {["Full Name","Admission Number","Date of Birth","Parent/Guardian","Phone Number","Grade to Join"].map(p=><input key={p} placeholder={p} style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}/>)}
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost" onClick={()=>setAdmForm(false)}>Cancel</Btn><Btn icon={UserPlus}>Admit</Btn></div>
    </Card>}
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      <div style={{position:"relative",flex:1,minWidth:200}}>
        <Search size={13} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:G.light,pointerEvents:"none"}}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name or ID…" style={{width:"100%",paddingLeft:30,paddingRight:12,paddingTop:8,paddingBottom:8,border:`1px solid ${G.border}`,borderRadius:10,fontSize:12,outline:"none",background:G.card,boxSizing:"border-box"}}/>
      </div>
      {["All","4","5","6","7"].map(g=><button key={g} onClick={()=>setGrade(g)} style={{padding:"7px 12px",borderRadius:9,fontSize:11,fontWeight:700,background:grade===g?G.green:G.card,color:grade===g?"#fff":G.muted,border:grade===g?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{g==="All"?"All Grades":`Grade ${g}`}</button>)}
    </div>
    {mob?(
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {rows.map((s,i)=>(
          <Card key={s.id} onClick={()=>setSel(s.id)} style={{padding:"13px 15px",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Av name={s.name} idx={i} size={38}/>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{s.name}</div><div style={{fontSize:10,color:G.muted}}>Grade {s.grade} · {s.id}</div></div>
              {s.risk&&<AlertCircle size={13} color={G.err}/>}
              <Pill level={s.lvl} sm/>
            </div>
          </Card>
        ))}
      </div>
    ):(
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 80px 80px 80px 80px 100px 70px",padding:"10px 18px",background:G.bg2,borderBottom:`1px solid ${G.border}`}}>
          {["Learner","Grade","Att.","GPA","CBC","Fees",""].map(h=><div key={h} style={{fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.7}}>{h}</div>)}
        </div>
        {rows.map((s,i)=>(
          <div key={s.id} onClick={()=>setSel(s.id)} style={{display:"grid",gridTemplateColumns:"2fr 80px 80px 80px 80px 100px 70px",padding:"11px 18px",alignItems:"center",borderBottom:i<rows.length-1?`1px solid ${G.border}`:"none",cursor:"pointer",transition:"background .1s"}} onMouseEnter={e=>e.currentTarget.style.background=G.bg} onMouseLeave={e=>e.currentTarget.style.background=""}>
            <div style={{display:"flex",alignItems:"center",gap:10}}><Av name={s.name} idx={i} size={30}/><div><div style={{fontSize:13,fontWeight:600,color:G.text}}>{s.name}</div><div style={{fontSize:10,color:G.light}}>{s.id}</div></div></div>
            <div style={{fontSize:12,color:G.muted}}>Gr {s.grade}</div>
            <div style={{fontSize:12,fontWeight:700,color:s.att>90?G.ok:G.warn}}>{s.att}%</div>
            <div style={{fontSize:12,fontWeight:700,color:G.info}}>{s.gpa}%</div>
            <Pill level={s.lvl} sm/>
            <Tag color={feeC[s.fees]}>{s.fees}</Tag>
            <div style={{display:"flex",gap:4}}>
              {s.risk&&<AlertCircle size={12} color={G.err}/>}
              <button style={{padding:"4px 7px",borderRadius:7,border:`1px solid ${G.border}`,background:"none",cursor:"pointer"}}><Eye size={12} color={G.muted}/></button>
            </div>
          </div>
        ))}
      </Card>
    )}
  </Section>;
}

// ─── VIEW: TEACHER MANAGEMENT ────────────────────────────────────────────────
function TeachersAdminView({mob}){
  const [sel,setSel]=useState(null);
  if(sel){
    const t=TEACHERS.find(x=>x.id===sel);
    const idx=TEACHERS.indexOf(t);
    return <Section>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setSel(null)} style={{width:32,height:32,borderRadius:8,border:`1px solid ${G.border}`,background:G.card,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={14} color={G.muted}/></button>
        <div style={{flex:1}}><div style={{fontSize:16,fontWeight:800,color:G.text}}>{t.name}</div><div style={{fontSize:11,color:G.muted}}>{t.sub}</div></div>
        <Btn variant="ghost" icon={Edit} sm>Edit</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"260px 1fr",gap:14}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card style={{textAlign:"center",padding:"24px 20px"}}>
            <Av name={t.name} idx={idx} size={64}/>
            <div style={{fontSize:15,fontWeight:800,color:G.text,marginTop:10}}>{t.name}</div>
            <div style={{fontSize:11,color:G.muted}}>{t.sub}</div>
            <div style={{marginTop:8}}><Chip color={t.status==="active"?G.ok:G.warn}>{t.status}</Chip></div>
          </Card>
          <Card>
            {[{l:"Classes",v:t.cls},{l:"Qualification",v:t.qual},{l:"Joined",v:t.joined},{l:"Lessons/Week",v:`${t.load} lessons`},{l:"Hours/Week",v:`${t.hrs} hours`}].map(({l,v})=>(
              <div key={l} style={{padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
                <div style={{fontSize:10,color:G.muted,fontWeight:700}}>{l}</div>
                <div style={{fontSize:12,fontWeight:600,color:G.text,marginTop:2}}>{v}</div>
              </div>
            ))}
          </Card>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {[{l:"Attendance",v:`${t.att}%`,c:t.att>95?G.ok:G.warn},{l:"Rating",v:`⭐ ${t.rating}`,c:G.orange},{l:"Workload",v:`${t.load}/28`,c:t.load>24?G.err:G.ok}].map(({l,v,c})=>(
              <div key={l} style={{background:G.card,borderRadius:12,padding:"13px 15px",border:`1px solid ${G.border}`,textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:10,color:G.muted}}>{l}</div></div>
            ))}
          </div>
          <Card>
            <SH title="Workload" sub="Lessons per week"/>
            <PBar value={t.load} max={28} color={t.load>24?G.err:G.ok} h={10}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{fontSize:10,color:G.muted}}>Current: {t.load} lessons</span><span style={{fontSize:10,color:G.muted}}>Max: 28</span></div>
          </Card>
          <Card>
            <SH title="Admin Actions"/>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <Btn icon={MessageSquare} sm>Send Message</Btn>
              <Btn icon={Calendar} sm variant="ghost">View Timetable</Btn>
              <Btn icon={BarChart2} sm variant="ghost">Performance Review</Btn>
              <Btn icon={FileText} sm variant="ghost">Generate Contract</Btn>
            </div>
          </Card>
        </div>
      </div>
    </Section>;
  }
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Teaching Staff</div><div style={{fontSize:11,color:G.muted}}>68 teachers · 6 departments</div></div>
      <Btn icon={UserPlus}>Add Teacher</Btn>
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:12}}>
      {TEACHERS.map((t,i)=>(
        <Card key={t.id} onClick={()=>setSel(t.id)} style={{padding:"16px 18px",cursor:"pointer",transition:"all .15s",borderLeft:`3px solid ${i%3===0?G.green:i%3===1?G.info:G.orange}`}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(0,64,0,.1)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 6px rgba(0,64,0,.05)"}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <Av name={t.name} idx={i} size={42}/>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:800,color:G.text}}>{t.name}</div><div style={{fontSize:11,color:G.muted}}>{t.sub}</div><div style={{fontSize:10,color:G.light}}>Classes: {t.cls}</div></div>
            <Chip color={t.status==="active"?G.ok:G.warn} sm>{t.status}</Chip>
          </div>
          <div style={{display:"flex",gap:12,marginBottom:8}}>
            {[{l:"Att.",v:`${t.att}%`,c:t.att>95?G.ok:G.warn},{l:"Rating",v:`⭐ ${t.rating}`,c:G.orange},{l:"Hrs/wk",v:t.hrs,c:G.info}].map(({l,v,c})=>(
              <div key={l}><div style={{fontSize:9,color:G.muted,fontWeight:700,textTransform:"uppercase"}}>{l}</div><div style={{fontSize:13,fontWeight:800,color:c}}>{v}</div></div>
            ))}
          </div>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:10,color:G.muted}}>Workload</span><span style={{fontSize:10,fontWeight:700,color:t.load>24?G.err:G.ok}}>{t.load}/28</span></div>
            <PBar value={t.load} max={28} color={t.load>24?G.err:G.ok} h={5}/>
          </div>
        </Card>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: CLASS MANAGEMENT ──────────────────────────────────────────────────
function ClassesView({mob}){
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Class Management</div><div style={{fontSize:11,color:G.muted}}>9 classes · 274 total learners</div></div>
      <Btn icon={Plus}>Create Class</Btn>
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:12}}>
      {CLASSES.map((c,i)=>(
        <Card key={c.id} style={{padding:"16px 18px",borderTop:`4px solid ${[G.green,G.info,G.orange,G.warn,G.purple,G.pink,G.cyan,G.ok,G.err][i%9]}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div><div style={{fontSize:18,fontWeight:800,color:G.text}}>Grade {c.id}</div><div style={{fontSize:11,color:G.muted}}>{c.grade} · Stream {c.stream}</div></div>
            <div style={{background:G.bg,borderRadius:9,padding:"5px 10px",textAlign:"center"}}><div style={{fontSize:14,fontWeight:800,color:G.text}}>{c.count}</div><div style={{fontSize:9,color:G.muted}}>learners</div></div>
          </div>
          <div style={{fontSize:11,color:G.muted,marginBottom:10}}>CT: {c.ct} · Room {c.room}</div>
          <div style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:10,color:G.muted}}>Avg Attendance</span><span style={{fontSize:10,fontWeight:700,color:G.ok}}>{c.avgAtt}%</span></div><PBar value={c.avgAtt} color={G.ok} h={5}/></div>
          <div><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:10,color:G.muted}}>Avg Performance</span><span style={{fontSize:10,fontWeight:700,color:G.green}}>{c.avgPerf}%</span></div><PBar value={c.avgPerf} color={G.green} h={5}/></div>
        </Card>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: FINANCE ───────────────────────────────────────────────────────────
function FinanceView({mob}){
  const [recPay,setRecPay]=useState(false);
  const total=1248;const paid=906;const partial=186;const unpaid=156;
  const pieData=[{name:"Paid",v:73,c:G.ok},{name:"Partial",v:15,c:G.warn},{name:"Unpaid",v:12,c:G.err}];
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Finance Management</div><div style={{fontSize:11,color:G.muted}}>Term 2 · 2026 · M-Pesa & Bank Integrated</div></div>
      <div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Download} sm>Export</Btn><Btn variant="orange" icon={Plus} onClick={()=>setRecPay(true)}>Record Payment</Btn></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
      {[{l:"Total Expected",v:"KES 22.8M",c:G.text,bg:G.card},{l:"Collected",v:"KES 12.4M",c:G.green,bg:G.gp},{l:"Outstanding",v:"KES 10.4M",c:G.err,bg:`${G.err}06`},{l:"M-Pesa Txns",v:"1,847",c:G.orange,bg:G.op}].map(({l,v,c,bg})=>(
        <div key={l} style={{background:bg,borderRadius:13,padding:"13px 15px",border:`1px solid ${G.border}`}}>
          <div style={{fontSize:9,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.8}}>{l}</div>
          <div style={{fontSize:mob?16:20,fontWeight:800,color:c,marginTop:6}}>{v}</div>
        </div>
      ))}
    </div>
    {recPay&&<Card style={{background:G.gp,border:`1px solid ${G.gpb}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div style={{fontSize:13,fontWeight:800,color:G.green}}>Record Fee Payment</div><button onClick={()=>setRecPay(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={16} color={G.muted}/></button></div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:10,marginBottom:10}}>
        {["Admission Number","Student Name","Amount (KES)","M-Pesa Reference","Payment Date"].map(p=><input key={p} placeholder={p} style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}/>)}
        <select style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}><option>Payment Method</option><option>M-Pesa</option><option>Bank Transfer</option><option>Cash</option></select>
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost" onClick={()=>setRecPay(false)}>Cancel</Btn><Btn icon={Save}>Record</Btn></div>
    </Card>}
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14}}>
      <Card>
        <SH title="Monthly Collection vs Target" sub="KES millions"/>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={FEE_TREND} barCategoryGap="28%"><CartesianGrid strokeDasharray="3 3" stroke={G.border} vertical={false}/><XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}} formatter={v=>[`KES ${v}M`]}/><Bar dataKey="tgt" fill={G.bg2} radius={[4,4,0,0]} name="Target"/><Bar dataKey="col" fill={G.orange} radius={[4,4,0,0]} name="Collected"/></BarChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <SH title="Payment Status Distribution" sub="1,248 student accounts"/>
        <ResponsiveContainer width="100%" height={140}>
          <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} dataKey="v" strokeWidth={0}>{pieData.map((e,i)=><Cell key={i} fill={e.c}/>)}</Pie><Tooltip formatter={v=>[`${v}%`]} contentStyle={{borderRadius:10,border:"none",fontSize:11}}/></PieChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:8}}>
          {pieData.map(d=><div key={d.name} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:2,background:d.c}}/><span style={{fontSize:11,color:G.muted}}>{d.name}: {d.v}%</span></div>)}
        </div>
      </Card>
    </div>
    <Card>
      <SH title="Defaulter Accounts" sub="Outstanding balance — action required" right={<Btn variant="ghost" icon={Send} sm>SMS Reminder</Btn>}/>
      {FEE_ACCOUNTS.filter(f=>f.status!=="paid").map((f,i,arr)=>(
        <div key={f.id} style={{display:mob?"block":"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 120px 100px",padding:"12px 0",alignItems:"center",borderBottom:i<arr.length-1?`1px solid ${G.border}`:"none",gap:mob?0:10}}>
          <div style={{marginBottom:mob?4:0}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{f.name}</div><div style={{fontSize:10,color:G.muted}}>Grade {f.grade} · {f.id}</div></div>
          {!mob&&<><div style={{fontSize:12,color:G.muted}}>KES {f.total.toLocaleString()}</div><div style={{fontSize:12,fontWeight:700,color:G.ok}}>KES {f.paid.toLocaleString()}</div><div style={{fontSize:13,fontWeight:800,color:G.err}}>KES {f.bal.toLocaleString()}</div></>}
          {mob&&<div style={{display:"flex",gap:14,marginBottom:6}}><div><div style={{fontSize:9,color:G.muted}}>Balance</div><div style={{fontSize:13,fontWeight:800,color:G.err}}>KES {f.bal.toLocaleString()}</div></div></div>}
          <Tag color={feeStatusC(f.status)}>{f.status}</Tag>
          <div style={{display:"flex",gap:6,marginTop:mob?6:0}}><Btn sm icon={MessageSquare} variant="ghost">Notify</Btn></div>
        </div>
      ))}
    </Card>
  </Section>;
}
const feeStatusC=s=>s==="paid"?G.ok:s==="partial"?G.warn:G.err;

// ─── VIEW: ATTENDANCE ADMIN ──────────────────────────────────────────────────
function AttendanceAdminView({mob}){
  const hm=r=>{if(r===0)return G.bg2;if(r>=95)return G.green;if(r>=90)return"#2d7a2d";if(r>=85)return"#5aaa5a";return G.warn;};
  const weekData=[{label:"Apr 28",days:[91,88,93,85,92]},{label:"May 5",days:[94,96,90,87,95]},{label:"May 12",days:[88,92,94,93,91]},{label:"May 19",days:[96,95,97,94,98]},{label:"May 26",days:[93,94,0,0,0]}];
  return <Section>
    <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Attendance Management</div><div style={{fontSize:11,color:G.muted}}>School-wide · Term 2 2026</div></div>
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
      {[{l:"Overall Rate",v:"94.6%",c:G.green},{l:"Present Today",v:"1,182",c:G.ok},{l:"Absent Today",v:"66",c:G.err},{l:"Classes Tracked",v:"38/42",c:G.info}].map(({l,v,c})=>(
        <div key={l} style={{background:G.card,borderRadius:12,padding:"13px 15px",border:`1px solid ${G.border}`,textAlign:"center"}}><div style={{fontSize:mob?18:22,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:11,color:G.muted}}>{l}</div></div>
      ))}
    </div>
    <Card>
      <SH title="Attendance Trend" sub="Monthly average · Jan–May 2026"/>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={ATT_TREND}><defs><linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={G.green} stopOpacity={.2}/><stop offset="95%" stopColor={G.green} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke={G.border}/><XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/><YAxis domain={[80,100]} tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/><Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}} formatter={v=>[`${v}%`]}/><Area type="monotone" dataKey="r" stroke={G.green} strokeWidth={2.5} fill="url(#ag2)" dot={{fill:G.green,r:3}}/></AreaChart>
      </ResponsiveContainer>
    </Card>
    <Card>
      <SH title="School Heatmap" sub="5-week attendance by day"/>
      <div style={{display:"flex",gap:10}}>
        <div style={{display:"flex",flexDirection:"column",gap:4,paddingTop:20}}>
          {weekData.map(w=><div key={w.label} style={{fontSize:10,color:G.muted,height:28,display:"flex",alignItems:"center",whiteSpace:"nowrap"}}>{w.label}</div>)}
        </div>
        <div style={{flex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginBottom:4}}>
            {["Mon","Tue","Wed","Thu","Fri"].map(d=><div key={d} style={{fontSize:10,color:G.muted,textAlign:"center",fontWeight:600}}>{d}</div>)}
          </div>
          {weekData.map((w,wi)=>(
            <div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginBottom:4}}>
              {w.days.map((r,di)=>(
                <div key={di} style={{height:28,borderRadius:6,background:hm(r),display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {r>0&&<span style={{fontSize:9,fontWeight:700,color:r>=90?"rgba(255,255,255,.9)":G.text}}>{r}%</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
    <Card>
      <SH title="Class Attendance Summary" sub="Today · 24 May 2026"/>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:8}}>
        {CLASSES.map(c=>(
          <div key={c.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:G.bg,borderRadius:10}}>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>Grade {c.id}</div><div style={{fontSize:10,color:G.muted}}>CT: {c.ct.split(" ")[0]}</div></div>
            <div style={{width:50,height:5,background:G.bg2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${c.avgAtt}%`,height:"100%",background:c.avgAtt>92?G.ok:G.warn,borderRadius:3}}/></div>
            <div style={{fontSize:12,fontWeight:800,color:c.avgAtt>92?G.ok:G.warn,flexShrink:0}}>{c.avgAtt}%</div>
          </div>
        ))}
      </div>
    </Card>
  </Section>;
}

// ─── VIEW: COMMUNICATION ADMIN ───────────────────────────────────────────────
function CommunicationAdminView({mob}){
  const [compose,setCompose]=useState(false);
  const typeC={Academic:G.green,Finance:G.orange,Staff:G.purple,Activity:G.info};
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Communication Hub</div><div style={{fontSize:11,color:G.muted}}>Announcements · SMS · Parent Notices</div></div>
      <div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Send} sm>SMS Blast</Btn><Btn icon={Plus} onClick={()=>setCompose(true)}>New Announcement</Btn></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
      {[{l:"Announcements",v:"24",c:G.green,i:"📣"},{l:"SMS Sent",v:"3,241",c:G.info,i:"💬"},{l:"Parents Reached",v:"1,084",c:G.orange,i:"👨‍👩‍👧"},{l:"Delivery Rate",v:"98.2%",c:G.ok,i:"✅"}].map(({l,v,c,i})=>(
        <div key={l} style={{background:G.card,borderRadius:12,padding:"13px 15px",border:`1px solid ${G.border}`}}>
          <div style={{fontSize:20,marginBottom:5}}>{i}</div>
          <div style={{fontSize:mob?18:20,fontWeight:800,color:c}}>{v}</div>
          <div style={{fontSize:11,color:G.muted}}>{l}</div>
        </div>
      ))}
    </div>
    {compose&&<Card style={{background:G.gp,border:`1px solid ${G.gpb}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={{fontSize:13,fontWeight:800,color:G.green}}>New Announcement</div><button onClick={()=>setCompose(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={16} color={G.muted}/></button></div>
      <input placeholder="Announcement title…" style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      <textarea placeholder="Write the announcement…" rows={3} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,resize:"vertical",outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
        <select style={{flex:1,padding:"7px 10px",borderRadius:8,border:`1px solid ${G.border}`,fontSize:11,outline:"none",background:G.card}}><option>Audience: All</option><option>Teaching Staff Only</option><option>Parents Only</option><option>Grade 5 Parents</option></select>
        <select style={{flex:1,padding:"7px 10px",borderRadius:8,border:`1px solid ${G.border}`,fontSize:11,outline:"none",background:G.card}}><option>Category</option><option>Academic</option><option>Finance</option><option>Staff</option><option>Activity</option></select>
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost" onClick={()=>setCompose(false)}>Cancel</Btn><Btn icon={Send} onClick={()=>setCompose(false)}>Publish</Btn></div>
    </Card>}
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"2fr 1fr",gap:14}}>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div style={{fontSize:12,fontWeight:800,color:G.muted,textTransform:"uppercase",letterSpacing:.8}}>Announcements</div>
        {ANNOUNCEMENTS.map(a=>(
          <Card key={a.id} style={{padding:"15px 17px",borderLeft:`3px solid ${typeC[a.tag]||G.green}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:6}}>
              <div style={{fontSize:13,fontWeight:800,color:G.text,flex:1,lineHeight:1.3}}>{a.pinned&&<span style={{fontSize:9,fontWeight:800,color:G.orange,background:G.op,padding:"1px 6px",borderRadius:4,marginRight:5}}>PINNED</span>}{a.title}</div>
              <Chip color={typeC[a.tag]||G.green} sm>{a.tag}</Chip>
            </div>
            <div style={{fontSize:11,color:G.muted,lineHeight:1.6,marginBottom:8}}>{a.body}</div>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
              <div style={{fontSize:10,color:G.light}}>By {a.author} · {a.date}</div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}><Chip color={G.muted} sm>{a.audience}</Chip><div style={{fontSize:10,color:G.ok,fontWeight:700}}>✓ {a.sent} reached</div></div>
            </div>
          </Card>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <Card style={{background:`linear-gradient(145deg,${G.gd},${G.gl})`,border:"none",padding:"16px 18px"}}>
          <div style={{fontSize:12,fontWeight:800,color:"#fff",marginBottom:8}}>📱 SMS Blast</div>
          <select style={{width:"100%",padding:"7px 10px",borderRadius:8,border:"none",fontSize:11,marginBottom:7,outline:"none"}}>
            <option>All Parents (1,248)</option><option>Grade 5 Parents</option><option>Fee Defaulters</option>
          </select>
          <textarea placeholder="Type your message…" rows={3} style={{width:"100%",padding:"7px 10px",borderRadius:8,border:"none",fontSize:11,resize:"none",outline:"none",boxSizing:"border-box",marginBottom:8}}/>
          <button style={{width:"100%",padding:"9px",background:G.orange,color:"#fff",border:"none",borderRadius:9,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Send size={12}/>Send Message</button>
        </Card>
        <Card>
          <SH title="Recent SMS Campaigns" sub="Last 3 blasts"/>
          {[{msg:"Fee reminder",r:342,d:338,time:"Yesterday 10:14"},{msg:"Mid-term schedule",r:1248,d:1231,time:"22 May 09:30"},{msg:"PT meeting invite",r:420,d:418,time:"20 May 08:00"}].map((s,i)=>(
            <div key={i} style={{padding:"10px 0",borderBottom:i<2?`1px solid ${G.border}`:"none"}}>
              <div style={{fontSize:11,fontWeight:700,color:G.text,marginBottom:5}}>{s.msg}</div>
              <div style={{display:"flex",gap:10}}>
                <span style={{fontSize:10,color:G.info}}>Sent: {s.r}</span>
                <span style={{fontSize:10,color:G.ok}}>Del: {s.d}</span>
                <span style={{fontSize:10,color:G.light}}>{s.time}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </Section>;
}

// ─── VIEW: REPORTS ADMIN ─────────────────────────────────────────────────────
function ReportsAdminView({mob}){
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Reports & Analytics</div><div style={{fontSize:11,color:G.muted}}>School-wide performance · Term 2 2026</div></div>
      <div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Printer} sm>Print</Btn><Btn icon={Download}>Export PDF</Btn></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
      {[{l:"School Avg GPA",v:"73.4%",c:G.green},{l:"CBC Completion",v:"78%",c:G.info},{l:"Top Performers",v:"42",c:G.orange},{l:"Need Support",v:"23",c:G.err}].map(({l,v,c})=>(
        <div key={l} style={{background:G.card,borderRadius:12,padding:"13px 15px",border:`1px solid ${G.border}`,textAlign:"center"}}><div style={{fontSize:mob?18:22,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:11,color:G.muted}}>{l}</div></div>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14}}>
      <Card>
        <SH title="CBC Completion by Grade" sub="Assessment submission rate"/>
        {GRADE_PERF.map(({g,v,c})=>(
          <div key={g} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,fontWeight:700,color:G.text}}>{g}</span><span style={{fontSize:12,fontWeight:800,color:c}}>{v}%</span></div>
            <div style={{height:20,background:G.bg2,borderRadius:6,overflow:"hidden"}}><div style={{width:`${v}%`,height:"100%",background:`linear-gradient(90deg,${c},${c}cc)`,borderRadius:6,display:"flex",alignItems:"center",paddingLeft:8}}><span style={{fontSize:10,fontWeight:800,color:"#fff"}}>{v}%</span></div></div>
          </div>
        ))}
      </Card>
      <Card>
        <SH title="School Competency Map" sub="Radar — all subjects"/>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={RADAR_SCHOOL}><PolarGrid stroke={G.border}/><PolarAngleAxis dataKey="s" tick={{fontSize:9,fill:G.muted}}/><Radar dataKey="v" stroke={G.orange} fill={G.orange} fillOpacity={.18} strokeWidth={2}/><Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}}/></RadarChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card>
      <SH title="Grade-by-Grade Summary" right={<Btn variant="ghost" icon={Printer} sm>Print All</Btn>}/>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr>{["Grade","Learners","Avg GPA","CBC Done","At Risk","Action"].map(h=><th key={h} style={{padding:"8px 12px",fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase",textAlign:"left",borderBottom:`1px solid ${G.border}`,background:G.bg}}>{h}</th>)}</tr></thead>
        <tbody>
          {[{g:"Grade 4",n:91,gpa:76,cbc:82,risk:3,c:G.green},{g:"Grade 5",n:62,gpa:74,cbc:79,risk:2,c:G.info},{g:"Grade 6",n:55,gpa:71,cbc:74,risk:5,c:G.warn},{g:"Grade 7",n:66,gpa:69,cbc:68,risk:4,c:G.orange}].map((r,i)=>(
            <tr key={i} onMouseEnter={e=>e.currentTarget.style.background=G.bg} onMouseLeave={e=>e.currentTarget.style.background=""} style={{transition:"background .1s"}}>
              <td style={{padding:"12px",fontSize:12,fontWeight:700,color:G.text}}>{r.g}</td>
              <td style={{padding:"12px",fontSize:12,color:G.muted}}>{r.n}</td>
              <td style={{padding:"12px"}}><span style={{fontSize:13,fontWeight:800,color:r.c}}>{r.gpa}%</span></td>
              <td style={{padding:"12px"}}><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:60,height:5,background:G.bg2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${r.cbc}%`,height:"100%",background:r.c,borderRadius:3}}/></div><span style={{fontSize:11,fontWeight:700,color:r.c}}>{r.cbc}%</span></div></td>
              <td style={{padding:"12px"}}><span style={{fontSize:12,fontWeight:700,color:G.err}}>{r.risk}</span></td>
              <td style={{padding:"12px"}}><button style={{padding:"5px 11px",borderRadius:7,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",fontSize:11,color:G.muted}}>View Report</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </Section>;
}

// ─── VIEW: BEHAVIOR ADMIN ────────────────────────────────────────────────────
function BehaviorAdminView({mob}){
  const sevC={Positive:G.ok,low:G.info,medium:G.warn,high:G.err};
  const sevI={Positive:"✅",low:"ℹ️",medium:"⚠️",high:"🚨"};
  const [log,setLog]=useState(false);
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Behavior & Discipline</div><div style={{fontSize:11,color:G.muted}}>Incident tracker · School-wide</div></div>
      <Btn icon={Plus} onClick={()=>setLog(true)}>Log Incident</Btn>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      {[{l:"Open",v:2,c:G.err},{l:"Resolved",v:2,c:G.ok},{l:"Positive",v:1,c:G.purple},{l:"This Month",v:5,c:G.info}].map(({l,v,c})=>(
        <div key={l} style={{background:G.card,borderRadius:12,padding:"13px 15px",border:`1px solid ${G.border}`,textAlign:"center"}}><div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:11,color:G.muted}}>{l}</div></div>
      ))}
    </div>
    {log&&<Card style={{background:G.gp,border:`1px solid ${G.gpb}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={{fontSize:13,fontWeight:800,color:G.green}}>Log Incident</div><button onClick={()=>setLog(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={16} color={G.muted}/></button></div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <input placeholder="Student name or ID…" style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}/>
        <select style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}><option>Type: Concern</option><option>Misconduct</option><option>Attendance</option><option>Academic</option><option>Positive</option></select>
        <select style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}><option>Severity</option><option>Low</option><option>Medium</option><option>High</option></select>
      </div>
      <textarea placeholder="Describe the incident or commendation…" rows={2} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",resize:"vertical",boxSizing:"border-box",marginBottom:8}}/>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost" onClick={()=>setLog(false)}>Cancel</Btn><Btn icon={Save} onClick={()=>setLog(false)}>Save</Btn></div>
    </Card>}
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {INCIDENTS.map((b,i)=>(
        <Card key={b.id} style={{padding:"15px 17px",borderLeft:`4px solid ${sevC[b.severity]}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:7}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:16}}>{sevI[b.severity]}</span><div><div style={{fontSize:13,fontWeight:800,color:G.text}}>{b.student} <span style={{fontSize:10,color:G.muted}}>Grade {b.grade}</span></div><div style={{fontSize:10,color:G.muted}}>{b.date}</div></div></div>
            <div style={{display:"flex",gap:6}}><Tag color={sevC[b.severity]}>{b.severity}</Tag><Tag color={G.muted}>{b.type}</Tag><Tag color={b.status==="open"?G.warn:G.ok}>{b.status}</Tag></div>
          </div>
          <div style={{fontSize:12,color:G.muted,lineHeight:1.5,marginBottom:7}}>{b.desc}</div>
          <div style={{padding:"7px 11px",background:G.bg,borderRadius:8,fontSize:11,color:G.text}}><strong>Action:</strong> {b.action}</div>
        </Card>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: TIMETABLE ADMIN ───────────────────────────────────────────────────
function TimetableAdminView({mob}){
  const days=["Mon","Tue","Wed","Thu","Fri"];
  const dayFull={Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday"};
  const [day,setDay]=useState("Fri");
  const subC={"Mathematics":G.green,"Science & Technology":G.warn,"English":G.info,"Kiswahili":G.purple,"Social Studies":G.pink,"CRE":G.cyan,"Creative Arts":G.orange,"Physical Education":G.ok};
  const slots=[
    {t:"07:40",e:"08:20",sub:"Mathematics",teacher:"Ms. Wambua",cls:"5A",room:"C1"},
    {t:"08:20",e:"09:00",sub:"Science & Technology",teacher:"Ms. Kariuki",cls:"5A",room:"Lab 1",now:true},
    {t:"09:00",e:"09:40",sub:"English",teacher:"Mr. Odhiambo",cls:"6A",room:"C2"},
    {t:"10:00",e:"10:40",sub:"Mathematics",teacher:"Ms. Wambua",cls:"5B",room:"C1"},
    {t:"10:40",e:"11:20",sub:"Kiswahili",teacher:"Mr. Mwenda",cls:"7A",room:"C3"},
    {t:"13:00",e:"13:40",sub:"Physical Education",teacher:"Mr. Wafula",cls:"6B",room:"Field"},
    {t:"13:40",e:"14:20",sub:"Creative Arts",teacher:"Mr. Kimani",cls:"4A",room:"Art"},
  ];
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Timetable & Scheduling</div><div style={{fontSize:11,color:G.muted}}>Week of 20–24 May 2026</div></div>
      <div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Printer} sm>Print</Btn><Btn icon={Plus}>Add Lesson</Btn></div>
    </div>
    <div style={{display:"flex",gap:6}}>
      {days.map(d=><button key={d} onClick={()=>setDay(d)} style={{flex:1,padding:"9px 0",borderRadius:10,fontSize:mob?11:12,fontWeight:700,background:day===d?G.green:G.card,color:day===d?"#fff":G.muted,border:day===d?"none":`1px solid ${G.border}`,cursor:"pointer",transition:"all .12s"}}>{mob?d:dayFull[d]}</button>)}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {slots.map((l,i)=>{
        const sc=subC[l.sub]||G.green;
        return <div key={i} style={{display:"flex",gap:0,borderRadius:13,overflow:"hidden",border:`1px solid ${l.now?sc:G.border}`,boxShadow:l.now?`0 2px 14px ${sc}22`:""}} onMouseEnter={e=>e.currentTarget.style.borderColor=sc} onMouseLeave={e=>e.currentTarget.style.borderColor=l.now?sc:G.border}>
          <div style={{width:5,background:sc,flexShrink:0}}/>
          <div style={{display:"flex",alignItems:"center",gap:mob?10:16,padding:"14px 16px",flex:1,flexWrap:"wrap",background:l.now?`${sc}06`:G.card}}>
            <div style={{width:mob?58:80,flexShrink:0}}><div style={{fontSize:mob?11:12,fontWeight:700,color:l.now?sc:G.text}}>{l.t}</div><div style={{fontSize:10,color:G.muted}}>–{l.e}</div>{l.now&&<div style={{fontSize:9,fontWeight:800,color:sc}}>● LIVE</div>}</div>
            <div style={{flex:1,minWidth:100}}><div style={{fontSize:mob?13:15,fontWeight:800,color:G.text}}>{l.sub}</div><div style={{fontSize:11,color:G.muted}}>{l.teacher}</div></div>
            <div style={{display:"flex",gap:7}}>
              <div style={{background:`${sc}12`,color:sc,fontSize:10,fontWeight:700,padding:"4px 10px",borderRadius:8}}>Grade {l.cls}</div>
              <div style={{background:G.bg2,color:G.muted,fontSize:10,fontWeight:600,padding:"4px 10px",borderRadius:8}}>🚪 {l.room}</div>
            </div>
            {!mob&&<div style={{display:"flex",gap:6}}>
              <button style={{padding:"5px 10px",borderRadius:8,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",fontSize:11,color:G.muted}}>Edit</button>
            </div>}
          </div>
        </div>;
      })}
    </div>
  </Section>;
}

// ─── VIEW: SETTINGS ADMIN ────────────────────────────────────────────────────
function SettingsAdminView({mob}){
  const [notifs,setNotifs]=useState({sms:true,email:true,push:false,weekly:true,parent:true,alerts:true});
  const [integrations,setIntegrations]=useState({mpesa:true,sms:true,knec:true,google:false,biometric:false,parent_app:true});
  return <Section>
    <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>System Settings</div><div style={{fontSize:11,color:G.muted}}>Manage school profile, integrations and preferences</div></div>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14}}>
      <Card>
        <SH title="School Profile" sub="Institution details"/>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:"12px",background:G.gp,borderRadius:11}}>
          <div style={{width:52,height:52,borderRadius:15,background:G.green,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:18,color:"#fff",flexShrink:0}}>NG</div>
          <div><div style={{fontSize:14,fontWeight:800,color:G.green}}>Nairobi Greenfields Academy</div><div style={{fontSize:11,color:G.muted}}>KNEC Reg: NBI/PRV/2019/0042</div></div>
        </div>
        {[{i:MapPin,l:"Location",v:"Karen, Nairobi County"},{i:Phone,l:"Phone",v:"+254 722 345 678"},{i:Mail,l:"Email",v:"admin@greenfields.ac.ke"},{i:Globe,l:"Website",v:"www.greenfields.ac.ke"},{i:Users,l:"Total Learners",v:"1,248"},{i:GraduationCap,l:"Teaching Staff",v:"68"}].map(({i:I,l,v})=>(
          <div key={l} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${G.border}`}}><I size={12} color={G.muted}/><span style={{fontSize:11,color:G.muted,width:100,flexShrink:0}}>{l}</span><span style={{fontSize:12,color:G.text,fontWeight:600}}>{v}</span></div>
        ))}
        <Btn variant="ghost" icon={Edit} style={{marginTop:12}}>Edit Profile</Btn>
      </Card>
      <Card>
        <SH title="Academic Year" sub="Term and calendar settings"/>
        {[{l:"Current Year",v:"2026"},{l:"Current Term",v:"Term 2"},{l:"Term Start",v:"21 April 2026"},{l:"Term End",v:"8 August 2026"},{l:"School Days Elapsed",v:"28 / 62"},{l:"CBC Curriculum",v:"Grade 1–9"},{l:"KNEC Board",v:"Kenya"},{l:"School Type",v:"Private Day"}].map(({l,v})=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${G.border}`}}><span style={{fontSize:11,color:G.muted}}>{l}</span><span style={{fontSize:12,fontWeight:700,color:G.text}}>{v}</span></div>
        ))}
      </Card>
      <Card>
        <SH title="Integrations" sub="Connected third-party services"/>
        {[{k:"mpesa",i:CreditCard,l:"M-Pesa Paybill",v:"890456"},{k:"sms",i:MessageSquare,l:"Africa's Talking SMS",v:"Connected"},{k:"knec",i:Shield,l:"KNEC API",v:"Synced"},{k:"google",i:Globe,l:"Google Classroom",v:"Not connected"},{k:"biometric",i:Wifi,l:"Biometric Attendance",v:"Setup needed"},{k:"parent_app",i:Smartphone,l:"Parent Mobile App",v:"Beta live"}].map(({k,i:I,l,v})=>(
          <div key={k} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${G.border}`}}>
            <div style={{width:30,height:30,borderRadius:8,background:integrations[k]?G.gp:`${G.err}10`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={13} color={integrations[k]?G.green:G.err}/></div>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:G.text}}>{l}</div><div style={{fontSize:10,color:G.muted}}>{v}</div></div>
            <button style={{padding:"4px 10px",borderRadius:7,border:`1px solid ${integrations[k]?G.border:G.orange}`,background:integrations[k]?"none":G.op,fontSize:10,fontWeight:700,color:integrations[k]?G.muted:G.orange,cursor:"pointer"}} onClick={()=>setIntegrations(p=>({...p,[k]:!p[k]}))}>
              {integrations[k]?"Manage":"Connect"}
            </button>
          </div>
        ))}
      </Card>
      <Card>
        <SH title="Notifications & Alerts"/>
        {[{k:"sms",l:"SMS Notifications",d:"Fees, events, urgent alerts"},{k:"email",l:"Email Digest",d:"Daily admin summary at 6 AM"},{k:"push",l:"Push Notifications",d:"Browser and mobile push"},{k:"weekly",l:"Weekly Analytics Report",d:"Auto Monday morning report"},{k:"parent",l:"Parent Notifications",d:"Automated parent updates"},{k:"alerts",l:"At-Risk Alerts",d:"Immediate learner risk flags"}].map(({k,l,d})=>(
          <div key={k} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${G.border}`}}>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{l}</div><div style={{fontSize:10,color:G.muted}}>{d}</div></div>
            <Toggle on={notifs[k]} onChange={v=>setNotifs(p=>({...p,[k]:v}))}/>
          </div>
        ))}
      </Card>
      <Card>
        <SH title="User Management" sub="Admin accounts and roles"/>
        {[{name:"Principal Kamau",role:"Super Admin",last:"Today 06:30"},{name:"Deputy Principal",role:"Academic Admin",last:"Today 07:45"},{name:"Bursar Ouma",role:"Finance Admin",last:"Yesterday 16:10"},{name:"ICT Coordinator",role:"System Admin",last:"22 May 14:00"}].map((u,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<3?`1px solid ${G.border}`:"none"}}>
            <Av name={u.name} idx={i} size={34}/>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{u.name}</div><div style={{fontSize:10,color:G.muted}}>{u.role} · Last: {u.last}</div></div>
            <Btn variant="ghost" icon={Edit} sm>Edit</Btn>
          </div>
        ))}
        <Btn icon={UserPlus} sm style={{marginTop:10}}>Add Admin User</Btn>
      </Card>
      <Card>
        <SH title="System & Data" sub="Backups, storage, maintenance"/>
        {SYSTEM_HEALTH.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<SYSTEM_HEALTH.length-1?`1px solid ${G.border}`:"none"}}>
            <span style={{fontSize:18}}>{s.icon}</span>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{s.l}</div></div>
            <span style={{fontSize:11,fontWeight:700,color:s.c}}>{s.v}</span>
          </div>
        ))}
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <Btn variant="ghost" icon={RefreshCw} sm>Force Backup</Btn>
          <Btn variant="ghost" icon={Database} sm>View Logs</Btn>
        </div>
      </Card>
    </div>
  </Section>;
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
const NAV = [
  {grp:"Overview",    items:[{id:"dashboard",   icon:LayoutDashboard, label:"Dashboard"}]},
  {grp:"Academic",    items:[{id:"students",    icon:Users,           label:"Students"},{id:"teachers",    icon:GraduationCap,  label:"Teachers"},{id:"classes",     icon:Layers,         label:"Classes"},{id:"attendance",  icon:Activity,       label:"Attendance"},{id:"timetable",  icon:Calendar,       label:"Timetable"}]},
  {grp:"Operations",  items:[{id:"finance",     icon:DollarSign,      label:"Finance"},{id:"communication",icon:MessageSquare,  label:"Communication"},{id:"behavior",    icon:Shield,         label:"Behavior"}]},
  {grp:"Insights",    items:[{id:"reports",     icon:BarChart2,       label:"Reports & Analytics"}]},
  {grp:"System",      items:[{id:"settings",    icon:Settings,        label:"Settings"}]},
];
const BOTTOM = [
  {id:"dashboard",    icon:Home,           label:"Home"},
  {id:"students",     icon:Users,          label:"Students"},
  {id:"finance",      icon:DollarSign,     label:"Finance"},
  {id:"reports",      icon:BarChart2,      label:"Reports"},
  {id:"_more",        icon:MoreHorizontal, label:"More"},
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AdminModule(){
  const [view,setView]=useState("dashboard");
  const [collapsed,setCollapsed]=useState(false);
  const [drawer,setDrawer]=useState(false);
  const [moreSheet,setMoreSheet]=useState(false);
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);

  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  const mob=w<720;
  mob_=mob;
  const go=id=>{setView(id);setDrawer(false);setMoreSheet(false);};

  const renderView=()=>{
    const p={mob};
    switch(view){
      case"dashboard":    return <DashboardView        {...p}/>;
      case"students":     return <StudentsView         {...p}/>;
      case"teachers":     return <TeachersAdminView    {...p}/>;
      case"classes":      return <ClassesView          {...p}/>;
      case"attendance":   return <AttendanceAdminView  {...p}/>;
      case"timetable":    return <TimetableAdminView   {...p}/>;
      case"finance":      return <FinanceView          {...p}/>;
      case"communication":return <CommunicationAdminView{...p}/>;
      case"behavior":     return <BehaviorAdminView    {...p}/>;
      case"reports":      return <ReportsAdminView     {...p}/>;
      case"settings":     return <SettingsAdminView    {...p}/>;
      default:            return <div style={{textAlign:"center",padding:"60px",color:G.muted}}>Module coming soon</div>;
    }
  };

  const SidebarContent=()=>(
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"18px 14px 10px",display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:34,height:34,borderRadius:10,background:G.orange,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}><GraduationCap size={17} color="#fff"/></div>
        {(!collapsed||mob)&&<div><div style={{fontSize:15,fontWeight:800,color:"#fff",letterSpacing:-.3}}>eGrade</div><div style={{fontSize:9,color:"rgba(255,255,255,.4)",fontWeight:700,letterSpacing:1.5}}>KENYA · ADMIN</div></div>}
        {mob&&<button onClick={()=>setDrawer(false)} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.5)"}}><X size={18}/></button>}
      </div>
      {(!collapsed||mob)&&<div style={{margin:"0 10px 10px",padding:"10px 12px",background:"rgba(255,255,255,.08)",borderRadius:10}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:32,height:32,borderRadius:9,background:avBg(0),flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:avTx(0)}}>PK</div>
          <div style={{flex:1,overflow:"hidden"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Principal Kamau</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.4)"}}>Super Admin · Greenfields</div>
          </div>
          <div style={{width:7,height:7,borderRadius:"50%",background:G.ok,flexShrink:0}}/>
        </div>
      </div>}
      <div style={{flex:1,overflowY:"auto",padding:"0 8px"}}>
        {NAV.map(group=>(
          <div key={group.grp} style={{marginBottom:4}}>
            {(!collapsed||mob)&&<div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.28)",textTransform:"uppercase",letterSpacing:1.5,padding:"5px 8px 2px"}}>{group.grp}</div>}
            {group.items.map(item=>{
              const active=view===item.id;
              return <button key={item.id} onClick={()=>go(item.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:(collapsed&&!mob)?"9px 0":"7px 10px",justifyContent:(collapsed&&!mob)?"center":"flex-start",borderRadius:9,border:"none",cursor:"pointer",background:active?"rgba(255,255,255,.18)":"transparent",color:active?"#fff":"rgba(255,255,255,.52)",marginBottom:1,transition:"all .1s",position:"relative"}} onMouseEnter={e=>{if(!active){e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.color="#fff";}}} onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,.52)";}}}
              >
                {active&&<div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:18,background:G.orange,borderRadius:"0 3px 3px 0"}}/>}
                <item.icon size={15}/>
                {(!collapsed||mob)&&<span style={{fontSize:12,fontWeight:active?700:500,flex:1,textAlign:"left"}}>{item.label}</span>}
              </button>;
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      *{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;box-sizing:border-box;margin:0;padding:0}
      ::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${G.border};border-radius:2px}
      button:focus,input:focus,textarea:focus,select:focus{outline:none}
      input:focus,textarea:focus,select:focus{border-color:${G.green}!important;box-shadow:0 0 0 3px ${G.gp}}
      @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
      @keyframes slideIn{from{transform:translateX(-270px)}to{transform:translateX(0)}}
      @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
    `}</style>
    <div style={{display:"flex",height:"100vh",background:G.bg,overflow:"hidden"}}>
      {!mob&&<div style={{width:collapsed?62:222,flexShrink:0,background:`linear-gradient(175deg,${G.gd},${G.gl})`,display:"flex",flexDirection:"column",transition:"width .22s ease",position:"relative",zIndex:10}}>
        <SidebarContent/>
        <button onClick={()=>setCollapsed(!collapsed)} style={{position:"absolute",right:-10,top:66,width:20,height:20,borderRadius:"50%",background:G.card,border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.1)",zIndex:20}}>
          {collapsed?<ChevronRight size={10} color={G.green}/>:<ChevronLeft size={10} color={G.green}/>}
        </button>
      </div>}
      {mob&&drawer&&<div style={{position:"fixed",inset:0,zIndex:200,display:"flex",animation:"fadeIn .18s ease"}}>
        <div style={{width:272,background:`linear-gradient(175deg,${G.gd},${G.gl})`,height:"100%",animation:"slideIn .2s ease",boxShadow:"4px 0 24px rgba(0,0,0,.25)",overflow:"hidden"}}><SidebarContent/></div>
        <div style={{flex:1,background:"rgba(0,0,0,.45)"}} onClick={()=>setDrawer(false)}/>
      </div>}
      {mob&&moreSheet&&<div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end",animation:"fadeIn .15s ease"}}>
        <div style={{flex:1,background:"rgba(0,0,0,.4)"}} onClick={()=>setMoreSheet(false)}/>
        <div style={{background:G.card,borderRadius:"20px 20px 0 0",padding:"16px 18px 36px",animation:"slideUp .2s ease"}}>
          <div style={{width:40,height:4,background:G.border,borderRadius:2,margin:"0 auto 16px"}}/>
          <div style={{fontSize:12,fontWeight:800,color:G.text,marginBottom:14}}>More</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            {[{id:"teachers",icon:GraduationCap,label:"Teachers"},{id:"classes",icon:Layers,label:"Classes"},{id:"attendance",icon:Activity,label:"Attend."},{id:"timetable",icon:Calendar,label:"Timetable"},{id:"communication",icon:MessageSquare,label:"Comms"},{id:"behavior",icon:Shield,label:"Discipline"},{id:"settings",icon:Settings,label:"Settings"},{id:"reports",icon:BarChart2,label:"Reports"}].map(item=>(
              <button key={item.id} onClick={()=>go(item.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:"12px 5px",borderRadius:12,border:`1px solid ${view===item.id?G.green:G.border}`,background:view===item.id?G.gp:G.card,cursor:"pointer"}}>
                <div style={{width:34,height:34,borderRadius:10,background:view===item.id?G.green:G.bg2,display:"flex",alignItems:"center",justifyContent:"center"}}><item.icon size={15} color={view===item.id?"#fff":G.muted}/></div>
                <span style={{fontSize:9,fontWeight:700,color:view===item.id?G.green:G.muted}}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{height:mob?52:56,background:G.card,borderBottom:`1px solid ${G.border}`,display:"flex",alignItems:"center",padding:`0 ${mob?14:22}px`,gap:12,flexShrink:0,boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
          {mob&&<button onClick={()=>setDrawer(true)} style={{background:"none",border:"none",cursor:"pointer",flexShrink:0}}><Menu size={20} color={G.muted}/></button>}
          {mob&&<div style={{width:26,height:26,borderRadius:7,background:G.orange,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><GraduationCap size={14} color="#fff"/></div>}
          {!mob&&<div style={{flex:1,position:"relative",maxWidth:380}}>
            <Search size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:G.light,pointerEvents:"none"}}/>
            <input placeholder="Search students, staff, assessments…" style={{width:"100%",paddingLeft:32,paddingRight:12,paddingTop:7,paddingBottom:7,border:`1px solid ${G.border}`,borderRadius:9,fontSize:12,background:G.bg,color:G.text}}/>
          </div>}
          <div style={{flex:1}}/>
          {!mob&&<div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 11px",background:G.gp,borderRadius:9}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:G.green}}/>
            <span style={{fontSize:10,fontWeight:700,color:G.green}}>Nairobi Greenfields Academy</span>
          </div>}
          <button style={{width:34,height:34,borderRadius:9,border:`1px solid ${G.border}`,background:G.card,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",flexShrink:0}}>
            <Bell size={14} color={G.muted}/>
            <div style={{position:"absolute",top:7,right:7,width:7,height:7,borderRadius:"50%",background:G.orange,border:"2px solid #fff"}}/>
          </button>
          {!mob&&<div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 10px",background:G.gp,borderRadius:9,cursor:"pointer"}}>
            <div style={{width:26,height:26,borderRadius:7,background:avBg(0),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:10,color:avTx(0),flexShrink:0}}>PK</div>
            <span style={{fontSize:11,fontWeight:700,color:G.green}}>Principal Kamau</span>
            <ChevronDown size={11} color={G.muted}/>
          </div>}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:mob?14:24,paddingBottom:mob?80:24}}>
          {renderView()}
        </div>
      </div>
    </div>
    {mob&&<div style={{position:"fixed",bottom:0,left:0,right:0,height:64,background:G.card,borderTop:`1px solid ${G.border}`,display:"flex",alignItems:"center",zIndex:100,boxShadow:"0 -4px 20px rgba(0,64,0,.08)"}}>
      {BOTTOM.map(item=>{
        const isMore=item.id==="_more";
        const active=isMore?moreSheet:view===item.id;
        return <button key={item.id} onClick={()=>isMore?setMoreSheet(!moreSheet):go(item.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"8px 0",height:"100%",position:"relative"}}>
          {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:20,height:3,background:G.orange,borderRadius:"0 0 3px 3px"}}/>}
          <div style={{width:32,height:32,borderRadius:10,background:active?G.gp:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}><item.icon size={17} color={active?G.green:G.light}/></div>
          <span style={{fontSize:9,fontWeight:active?800:500,color:active?G.green:G.light}}>{item.label}</span>
        </button>;
      })}
    </div>}
  </>;
}
