import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";
import {
  LayoutDashboard, Users, GraduationCap, ClipboardList,
  DollarSign, MessageSquare, BarChart2, Settings, Bell,
  Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown,
  Activity, CheckCircle2, UserPlus, Plus, Download, Edit,
  Eye, BookOpen, Zap, ChevronDown, AlertCircle, Calendar,
  Clock, X, Menu, Send, Mail, MessageCircle, Megaphone,
  FileText, Globe, Shield, Smartphone, Monitor, Home,
  MoreHorizontal, User, Lock, RefreshCw, Star, ChevronUp,
  Filter, Printer, CreditCard, MapPin, Phone, CheckCheck, Wifi
} from "lucide-react";

const G = {
  green:"#004000",greenDk:"#002600",greenLt:"#005800",
  orange:"#F66000",orangePale:"rgba(246,96,0,0.09)",
  greenPale:"rgba(0,64,0,0.08)",greenPaleBr:"rgba(0,64,0,0.18)",
  bg:"#F7F9F7",bgAlt:"#EFF3EF",card:"#FFFFFF",
  text:"#0F172A",muted:"#64748B",light:"#94A3B8",
  border:"#E1E8E1",borderHov:"#C0D4C0",
  ok:"#10B981",warn:"#F59E0B",err:"#EF4444",info:"#3B82F6",
  purple:"#8B5CF6",pink:"#EC4899",
};
const perf={EE:G.green,ME:G.info,AE:G.warn,BE:G.err};
const perfName={EE:"Exceeding",ME:"Meeting",AE:"Approaching",BE:"Below"};
const SUB_COLORS={
  "Mathematics":G.green,"English":G.info,"Kiswahili":G.purple,
  "Science & Tech":G.warn,"Social Studies":G.pink,
  "CRE / IRE":"#6366F1","Creative Arts":G.orange,
  "Physical Education":G.ok,
};

// ── DATA ─────────────────────────────────────────────────────────────────────
const attData=[{m:"Jan",r:87},{m:"Feb",r:91},{m:"Mar",r:88},{m:"Apr",r:93},{m:"May",r:95},{m:"Jun",r:89},{m:"Jul",r:92},{m:"Aug",r:96},{m:"Sep",r:94},{m:"Oct",r:97}];
const feeData=[{m:"Jan",col:1850,tgt:2000},{m:"Feb",col:1920,tgt:2000},{m:"Mar",col:1750,tgt:2000},{m:"Apr",col:2100,tgt:2000},{m:"May",col:1980,tgt:2000},{m:"Jun",col:2200,tgt:2000}];
const radarData=[{s:"Communication",v:78},{s:"Numeracy",v:82},{s:"Creativity",v:69},{s:"Digital Lit",v:71},{s:"Social",v:88},{s:"Self-Efficacy",v:75},{s:"Learning",v:85}];
const perfDist=[{l:"EE",n:42,c:G.green},{l:"ME",n:118,c:G.info},{l:"AE",n:67,c:G.warn},{l:"BE",n:23,c:G.err}];
const pieBreakdown=[{name:"Tuition",v:68,c:G.green},{name:"Activities",v:12,c:G.orange},{name:"Transport",v:11,c:G.info},{name:"Meals",v:9,c:G.warn}];
const spark=(vals)=>vals.map(v=>({v}));

const STUDENTS=[
  {id:"KE001",name:"Amina Wanjiku",cls:"Grade 5A",att:96,lvl:"EE",ok:true},
  {id:"KE002",name:"Brian Otieno",cls:"Grade 5A",att:88,lvl:"ME",ok:true},
  {id:"KE003",name:"Cynthia Muthoni",cls:"Grade 6B",att:72,lvl:"AE",ok:false},
  {id:"KE004",name:"David Kipchoge",cls:"Grade 4C",att:94,lvl:"ME",ok:true},
  {id:"KE005",name:"Esther Achieng",cls:"Grade 7A",att:99,lvl:"EE",ok:true},
  {id:"KE006",name:"Felix Kamau",cls:"Grade 6B",att:65,lvl:"BE",ok:false},
  {id:"KE007",name:"Grace Njeri",cls:"Grade 5A",att:91,lvl:"ME",ok:true},
  {id:"KE008",name:"Hassan Abdi",cls:"Grade 7B",att:87,lvl:"EE",ok:true},
];
const AREAS=[
  {area:"Mathematics",strand:"Numbers",sub:"Place Value & Operations",rows:[{n:"Amina W.",s:"EE"},{n:"Brian O.",s:"ME"},{n:"Cynthia M.",s:"AE"},{n:"David K.",s:"ME"},{n:"Esther A.",s:"EE"},{n:"Felix K.",s:"BE"}]},
  {area:"English",strand:"Reading",sub:"Comprehension Skills",rows:[{n:"Amina W.",s:"EE"},{n:"Brian O.",s:"ME"},{n:"Cynthia M.",s:"ME"},{n:"David K.",s:"AE"},{n:"Esther A.",s:"EE"},{n:"Felix K.",s:"AE"}]},
  {area:"Science & Tech",strand:"Living Things",sub:"Habitats & Ecosystems",rows:[{n:"Amina W.",s:"ME"},{n:"Brian O.",s:"EE"},{n:"Cynthia M.",s:"AE"},{n:"David K.",s:"ME"},{n:"Esther A.",s:"ME"},{n:"Felix K.",s:"BE"}]},
];
const ATT_STUDENTS=[
  "Amina Wanjiku","Brian Otieno","Cynthia Muthoni","David Kipchoge",
  "Esther Achieng","Felix Kamau","Grace Njeri","Hassan Abdi",
  "Iris Wambua","James Njoroge","Kalinda Aoko","Liam Musyoka",
  "Mary Chebet","Nathan Gitau","Olive Anyango","Peter Waweru",
  "Queen Wangari","Robert Macharia","Sarah Kariuki","Tom Odhiambo",
];
const HEATMAP_WEEKS=[
  {label:"Apr 28",days:[91,88,93,85,92]},
  {label:"May 5", days:[94,96,90,87,95]},
  {label:"May 12",days:[88,92,94,93,91]},
  {label:"May 19",days:[96,95,97,94,98]},
  {label:"May 26",days:[93,94,0,0,0]},
];
const ANNOUNCEMENTS=[
  {id:1,title:"Mid-Term Examinations Schedule Released",body:"The mid-term examinations for all grades will be held from 2nd–6th June 2026. Please ensure all CBC portfolio submissions are complete before 30th May.",author:"Principal Kamau",date:"24 May 2026",tag:"Academic",pinned:true,audience:"All Staff & Parents"},
  {id:2,title:"School Fees Reminder – Term 2",body:"Kindly settle outstanding Term 2 balances by 31st May 2026 to avoid late payment penalties. M-Pesa Paybill: 890456, Account: Learner Admission No.",author:"Bursar Ouma",date:"22 May 2026",tag:"Finance",pinned:true,audience:"Parents"},
  {id:3,title:"CBC Professional Development Workshop",body:"All teachers are required to attend the CBC Assessment Methodology refresher on Saturday 1st June at 9:00 AM in the Main Hall.",author:"Deputy Principal",date:"21 May 2026",tag:"Staff",pinned:false,audience:"Teaching Staff"},
  {id:4,title:"Athletics Day – 14th June 2026",body:"Inter-house athletics competition will be held on 14th June. Sports captains to submit team lists by 7th June.",author:"Sports Director",date:"20 May 2026",tag:"Activity",pinned:false,audience:"All"},
];
const SMS_LOG=[
  {msg:"Fee reminder sent",recipients:342,delivered:338,failed:4,time:"Yesterday 10:14",type:"Finance"},
  {msg:"Mid-term schedule notification",recipients:1248,delivered:1231,failed:17,time:"22 May 09:30",type:"Academic"},
  {msg:"Parent-Teacher meeting invite",recipients:420,delivered:418,failed:2,time:"20 May 08:00",type:"Event"},
];
const GRADE_PERFORMANCE=[
  {grade:"Grade 4",completion:82,avgScore:76,color:G.green},
  {grade:"Grade 5",completion:79,avgScore:74,color:G.info},
  {grade:"Grade 6",completion:74,avgScore:71,color:G.warn},
  {grade:"Grade 7",completion:68,avgScore:69,color:G.orange},
];
const TIMETABLE_DATA={
  Mon:[
    {slot:"7:40–8:20",sub:"Mathematics",teacher:"Ms. Wambua",cls:"5A",room:"C1"},
    {slot:"8:20–9:00",sub:"English",teacher:"Mr. Odhiambo",cls:"5A",room:"C2"},
    {slot:"9:00–9:40",sub:"Science & Tech",teacher:"Ms. Kariuki",cls:"6B",room:"Lab 1"},
    {slot:"10:00–10:40",sub:"Kiswahili",teacher:"Mr. Mwenda",cls:"4A",room:"C3"},
    {slot:"10:40–11:20",sub:"Social Studies",teacher:"Ms. Mutua",cls:"5B",room:"C4"},
    {slot:"11:20–12:00",sub:"Mathematics",teacher:"Ms. Wambua",cls:"6A",room:"C1"},
    {slot:"1:00–1:40",sub:"Creative Arts",teacher:"Mr. Kimani",cls:"4B",room:"Art"},
    {slot:"1:40–2:20",sub:"Physical Education",teacher:"Mr. Wafula",cls:"7A",room:"Field"},
  ],
  Tue:[
    {slot:"7:40–8:20",sub:"English",teacher:"Mr. Odhiambo",cls:"6A",room:"C2"},
    {slot:"8:20–9:00",sub:"Mathematics",teacher:"Ms. Wambua",cls:"5B",room:"C1"},
    {slot:"9:00–9:40",sub:"CRE / IRE",teacher:"Ms. Mutua",cls:"5A",room:"C3"},
    {slot:"10:00–10:40",sub:"Science & Tech",teacher:"Ms. Kariuki",cls:"7A",room:"Lab 1"},
    {slot:"10:40–11:20",sub:"Kiswahili",teacher:"Mr. Mwenda",cls:"6B",room:"C3"},
    {slot:"1:00–1:40",sub:"Physical Education",teacher:"Mr. Wafula",cls:"5A",room:"Field"},
    {slot:"1:40–2:20",sub:"Social Studies",teacher:"Ms. Mutua",cls:"4C",room:"C4"},
  ],
  Wed:[
    {slot:"7:40–8:20",sub:"Mathematics",teacher:"Ms. Wambua",cls:"7A",room:"C1"},
    {slot:"8:20–9:00",sub:"Kiswahili",teacher:"Mr. Mwenda",cls:"5A",room:"C3"},
    {slot:"9:00–9:40",sub:"English",teacher:"Mr. Odhiambo",cls:"4A",room:"C2"},
    {slot:"10:00–10:40",sub:"Creative Arts",teacher:"Mr. Kimani",cls:"6A",room:"Art"},
    {slot:"1:00–1:40",sub:"Science & Tech",teacher:"Ms. Kariuki",cls:"5B",room:"Lab 1"},
    {slot:"1:40–2:20",sub:"Mathematics",teacher:"Ms. Wambua",cls:"4B",room:"C1"},
  ],
  Thu:[
    {slot:"7:40–8:20",sub:"Social Studies",teacher:"Ms. Mutua",cls:"7A",room:"C4"},
    {slot:"8:20–9:00",sub:"Science & Tech",teacher:"Ms. Kariuki",cls:"4A",room:"Lab 1"},
    {slot:"9:00–9:40",sub:"Mathematics",teacher:"Ms. Wambua",cls:"6B",room:"C1"},
    {slot:"10:00–10:40",sub:"English",teacher:"Mr. Odhiambo",cls:"5B",room:"C2"},
    {slot:"10:40–11:20",sub:"CRE / IRE",teacher:"Ms. Mutua",cls:"6A",room:"C3"},
    {slot:"1:00–1:40",sub:"Kiswahili",teacher:"Mr. Mwenda",cls:"7B",room:"C3"},
    {slot:"1:40–2:20",sub:"Physical Education",teacher:"Mr. Wafula",cls:"6B",room:"Field"},
  ],
  Fri:[
    {slot:"7:40–8:20",sub:"Mathematics",teacher:"Ms. Wambua",cls:"5A",room:"C1"},
    {slot:"8:20–9:00",sub:"English",teacher:"Mr. Odhiambo",cls:"5A",room:"C2"},
    {slot:"9:00–9:40",sub:"Science & Tech",teacher:"Ms. Kariuki",cls:"5A",room:"Lab 1"},
    {slot:"10:00–10:40",sub:"Kiswahili",teacher:"Mr. Mwenda",cls:"5A",room:"C3"},
    {slot:"10:40–11:20",sub:"Social Studies",teacher:"Ms. Mutua",cls:"5A",room:"C4"},
    {slot:"1:00–1:40",sub:"Creative Arts",teacher:"Mr. Kimani",cls:"5A",room:"Art"},
    {slot:"1:40–2:20",sub:"CRE / IRE",teacher:"Ms. Mutua",cls:"5A",room:"C3"},
  ],
};
const TEACHERS=[
  {id:"T001",name:"Njeri Wambua",sub:"Mathematics · Science",cls:"Grade 5A CT",att:96,rating:4.8,load:18,hrs:22,bg:"#e0f0e0",tx:"#1a5c1a"},
  {id:"T002",name:"James Odhiambo",sub:"English · Literacy",cls:"Grades 5A, 5B",att:92,rating:4.5,load:22,hrs:26,bg:"#e0eaf8",tx:"#1a3a7c"},
  {id:"T003",name:"Beatrice Kariuki",sub:"Science & Technology",cls:"Grades 6A, 6B, 7A",att:98,rating:4.9,load:16,hrs:20,bg:"#fdf0e0",tx:"#7c5c1a"},
  {id:"T004",name:"Samuel Mwenda",sub:"Kiswahili",cls:"Grades 4–7",att:89,rating:4.3,load:24,hrs:28,bg:"#f0e0f8",tx:"#5c1a7c"},
  {id:"T005",name:"Agnes Mutua",sub:"Social Studies · CRE",cls:"Grades 4A, 4B, 4C",att:94,rating:4.6,load:20,hrs:24,bg:"#e0f4ec",tx:"#1a5c3c"},
  {id:"T006",name:"Peter Kimani",sub:"Creative Arts",cls:"Grades 4–6",att:91,rating:4.4,load:14,hrs:18,bg:"#fce8e0",tx:"#7c2a1a"},
];

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function Pill({level}){
  const c=perf[level];
  return <span style={{background:`${c}18`,color:c,border:`1px solid ${c}28`,borderRadius:20,padding:"2px 9px",fontSize:11,fontWeight:700,letterSpacing:.4,whiteSpace:"nowrap"}}>{level} · {perfName[level]}</span>;
}
function MiniBar({val,max=100,color}){
  return <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:52,height:5,background:G.bgAlt,borderRadius:3,overflow:"hidden"}}><div style={{width:`${(val/max)*100}%`,height:"100%",background:color,borderRadius:3}}/></div><span style={{fontSize:12,fontWeight:600,color:G.text}}>{val}%</span></div>;
}
function Chip({children,color=G.green}){
  return <span style={{background:`${color}12`,color,border:`1px solid ${color}22`,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{children}</span>;
}
function Card({children,style={}}){
  return <div style={{background:G.card,borderRadius:16,border:`1px solid ${G.border}`,boxShadow:"0 1px 6px rgba(0,64,0,0.06)",padding:"18px 20px",...style}}>{children}</div>;
}
function SH({title,sub,right}){
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}><div><div style={{fontSize:14,fontWeight:800,color:G.text,letterSpacing:-.2}}>{title}</div>{sub&&<div style={{fontSize:11,color:G.muted,marginTop:2}}>{sub}</div>}</div>{right}</div>;
}
function Btn({children,variant="primary",onClick,icon:Icon,sm}){
  const base={border:"none",borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontWeight:700,transition:"opacity .12s"};
  const vars={
    primary:{background:G.green,color:"#fff",padding:sm?"6px 12px":"8px 16px",fontSize:sm?11:12},
    secondary:{background:G.card,color:G.muted,border:`1px solid ${G.border}`,padding:sm?"6px 12px":"8px 14px",fontSize:sm?11:12},
    orange:{background:G.orange,color:"#fff",padding:sm?"6px 12px":"8px 16px",fontSize:sm?11:12},
  };
  return <button style={{...base,...vars[variant]}} onClick={onClick}>{Icon&&<Icon size={sm?12:13}/>}{children}</button>;
}
function MetCard({icon:Icon,label,value,trend,color,sub,data}){
  const up=trend>=0;
  return (
    <Card style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{width:36,height:36,borderRadius:10,background:`${color}14`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={17} color={color}/></div>
        <span style={{display:"flex",alignItems:"center",gap:3,fontSize:11,fontWeight:700,color:up?G.ok:G.err}}>{up?<ArrowUp size={10}/>:<ArrowDown size={10}/>}{Math.abs(trend)}%</span>
      </div>
      <div>
        <div style={{fontSize:22,fontWeight:800,color:G.text,lineHeight:1}}>{value}</div>
        <div style={{fontSize:11,color:G.muted,marginTop:3}}>{label}</div>
      </div>
      {data&&<ResponsiveContainer width="100%" height={28}><AreaChart data={data} margin={{top:0,right:0,bottom:0,left:0}}><Area type="monotone" dataKey="v" stroke={color} fill={`${color}20`} strokeWidth={2} dot={false}/></AreaChart></ResponsiveContainer>}
      {sub&&<div style={{fontSize:10,color:G.light}}>{sub}</div>}
    </Card>
  );
}
function AvatarCircle({name,bg,tx,size=34}){
  const initials=name.split(" ").map(n=>n[0]).join("").slice(0,2);
  return <div style={{width:size,height:size,borderRadius:size/3,background:bg||G.greenPale,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:size*0.35,color:tx||G.green,flexShrink:0}}>{initials}</div>;
}

// ── VIEW: DASHBOARD ───────────────────────────────────────────────────────────
function DashboardView({mob}){
  return (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:mob?17:20,fontWeight:800,color:G.text,letterSpacing:-.4}}>Good morning, Principal Kamau 👋</div>
          <div style={{fontSize:11,color:G.muted,marginTop:2}}>Nairobi Greenfields Academy · Term 2, Week 11 · Fri 24 May 2026</div>
        </div>
        {!mob&&<div style={{display:"flex",gap:8}}><Btn variant="secondary" icon={Download}>Export</Btn><Btn icon={Plus}>Quick Action</Btn></div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(auto-fill,minmax(170px,1fr))",gap:10}}>
        <MetCard icon={Users} label="Total Students" value="1,248" trend={3.2} color={G.green} sub="↑ 38 new this term" data={spark([82,85,80,88,90,87,92,94])}/>
        <MetCard icon={GraduationCap} label="Teaching Staff" value="68" trend={1.5} color={G.info} sub="4 part-time" data={spark([60,62,63,64,65,66,67,68])}/>
        <MetCard icon={DollarSign} label="Fee Collection" value="KES 12.4M" trend={8.7} color={G.orange} sub="92% of target" data={spark([65,70,68,75,80,82,88,92])}/>
        <MetCard icon={Activity} label="Attendance Rate" value="94.6%" trend={2.1} color={G.ok} sub="Above national avg" data={spark([88,90,89,91,93,92,95,94])}/>
        {!mob&&<MetCard icon={ClipboardList} label="CBC Assessments" value="78%" trend={-1.3} color={G.warn} sub="Grade 7 pending" data={spark([82,80,79,78,76,77,78,78])}/>}
        {!mob&&<MetCard icon={BookOpen} label="Active Classes" value="42" trend={0} color={G.greenLt} sub="6 streams, 7 grades" data={spark([40,40,42,42,42,42,42,42])}/>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"2fr 1fr",gap:12}}>
        <Card>
          <SH title="Attendance Trend" sub="Monthly average · 2026" right={!mob&&<div style={{display:"flex",gap:6}}>{["This Year","Last Year"].map((t,i)=><button key={t} style={{padding:"3px 10px",borderRadius:7,fontSize:10,fontWeight:600,background:i===0?G.green:"transparent",color:i===0?"#fff":G.muted,border:i===0?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{t}</button>)}</div>}/>
          <ResponsiveContainer width="100%" height={mob?160:190}>
            <AreaChart data={attData}><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={G.green} stopOpacity={.22}/><stop offset="95%" stopColor={G.green} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={G.border}/><XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/><YAxis domain={[80,100]} tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
              <Tooltip contentStyle={{borderRadius:10,border:"none",boxShadow:"0 4px 16px rgba(0,0,0,.1)",fontSize:11}} formatter={v=>[`${v}%`,"Attendance"]}/>
              <Area type="monotone" dataKey="r" stroke={G.green} strokeWidth={2.5} fill="url(#ag)" dot={{fill:G.green,r:3}} activeDot={{r:5}}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SH title="CBC Competencies" sub="School-wide mastery"/>
          <ResponsiveContainer width="100%" height={mob?160:190}>
            <RadarChart data={radarData}><PolarGrid stroke={G.border}/><PolarAngleAxis dataKey="s" tick={{fontSize:mob?8:9,fill:G.muted}}/><Radar dataKey="v" stroke={G.orange} fill={G.orange} fillOpacity={.18} strokeWidth={2}/><Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}}/></RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:12}}>
        <Card>
          <SH title="Fee Collection" sub="KES thousands"/><ResponsiveContainer width="100%" height={140}><BarChart data={feeData} barCategoryGap="30%"><CartesianGrid strokeDasharray="3 3" stroke={G.border} vertical={false}/><XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/><YAxis hide/><Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}} formatter={v=>[`KES ${v}k`]}/><Bar dataKey="tgt" fill={G.bgAlt} radius={[3,3,0,0]} name="Target"/><Bar dataKey="col" fill={G.orange} radius={[3,3,0,0]} name="Collected"/></BarChart></ResponsiveContainer>
        </Card>
        <Card>
          <SH title="Performance Levels" sub="All grades · CBC"/>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {perfDist.map(({l,n,c})=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:9}}>
                <div style={{width:7,height:7,borderRadius:2,background:c,flexShrink:0}}/>
                <div style={{fontSize:10,color:G.muted,width:72}}>{perfName[l]}</div>
                <div style={{flex:1,height:5,background:G.bgAlt,borderRadius:3,overflow:"hidden"}}><div style={{width:`${(n/250)*100}%`,height:"100%",background:c,borderRadius:3}}/></div>
                <div style={{fontSize:11,fontWeight:700,color:G.text,width:24,textAlign:"right"}}>{n}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:12,padding:"8px 11px",background:G.greenPale,borderRadius:9}}><div style={{fontSize:10,color:G.green,fontWeight:700}}>🎯 68% meeting or exceeding expectations</div></div>
        </Card>
        <div style={{background:`linear-gradient(155deg,${G.greenDk},${G.greenLt})`,borderRadius:16,padding:"18px 20px",boxShadow:"0 4px 20px rgba(0,64,0,.28)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><div style={{width:26,height:26,borderRadius:7,background:"rgba(255,255,255,.14)",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={13} color="#fff"/></div><span style={{fontSize:12,fontWeight:800,color:"#fff"}}>AI Insights</span></div>
          {[{icon:"⚠️",tag:"Attendance",text:"Grade 7B attendance down 8% this week."},{icon:"📈",tag:"Finance",text:"Fee collection 4% above average — strong month-end."},{icon:"🎓",tag:"CBC",text:"3 learners ready for EE upgrade in Math."}].map((x,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.09)",borderRadius:9,padding:"9px 11px",marginBottom:i<2?7:0}}>
              <div style={{fontSize:9,color:"rgba(255,255,255,.5)",marginBottom:2}}>{x.icon} {x.tag}</div>
              <div style={{fontSize:11,color:"#fff",lineHeight:1.5}}>{x.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── VIEW: STUDENTS ─────────────────────────────────────────────────────────────
function StudentsView({mob}){
  const [q,setQ]=useState("");
  const rows=STUDENTS.filter(s=>s.name.toLowerCase().includes(q.toLowerCase())||s.cls.toLowerCase().includes(q.toLowerCase()));
  const avBg=(i)=>["#e0f0e0","#e0eaf8","#fdf0e0","#f0e0f0","#e0f4ec","#fce8e0","#e8f0fe","#f0f8e8"][i%8];
  const avTx=(i)=>["#1a5c1a","#1a3a7c","#7c5c1a","#5c1a5c","#1a5c3a","#7c2a1a","#1a3a7c","#3a5c1a"][i%8];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Student Directory</div><div style={{fontSize:11,color:G.muted}}>1,248 learners across 42 active classes</div></div>
        <Btn icon={UserPlus}>Admit Learner</Btn>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <div style={{position:"relative",flex:1,minWidth:180}}>
          <Search size={13} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:G.light}}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search learners…" style={{width:"100%",paddingLeft:30,paddingRight:12,paddingTop:8,paddingBottom:8,border:`1px solid ${G.border}`,borderRadius:10,fontSize:12,outline:"none",background:G.card,color:G.text,boxSizing:"border-box"}}/>
        </div>
        {!mob&&["All","Grade 4","Grade 5","Grade 6","Grade 7"].map((g,i)=>(
          <button key={g} style={{padding:"7px 12px",borderRadius:8,fontSize:11,fontWeight:600,background:i===0?G.green:G.card,color:i===0?"#fff":G.muted,border:i===0?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{g}</button>
        ))}
      </div>
      {mob ? (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {rows.map((s,i)=>(
            <Card key={s.id} style={{padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:11}}>
                <AvatarCircle name={s.name} bg={avBg(i)} tx={avTx(i)} size={40}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:G.text}}>{s.name}</div>
                  <div style={{fontSize:11,color:G.muted}}>{s.cls} · {s.id}</div>
                </div>
                <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:20,background:s.ok?`${G.ok}15`:`${G.err}15`,color:s.ok?G.ok:G.err}}>{s.ok?"● Active":"⚠ Alert"}</span>
              </div>
              <div style={{display:"flex",gap:14,marginTop:10,paddingTop:10,borderTop:`1px solid ${G.border}`}}>
                <div><div style={{fontSize:9,color:G.muted,fontWeight:700,textTransform:"uppercase",marginBottom:3}}>Attendance</div><MiniBar val={s.att} color={s.att>90?G.ok:s.att>75?G.warn:G.err}/></div>
                <div><div style={{fontSize:9,color:G.muted,fontWeight:700,textTransform:"uppercase",marginBottom:3}}>CBC Level</div><Pill level={s.lvl}/></div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card style={{padding:0,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 130px 100px 70px",padding:"10px 18px",background:G.bg,borderBottom:`1px solid ${G.border}`}}>
            {["Learner","Class","Attendance","CBC Level","Status",""].map(h=><div key={h} style={{fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.8}}>{h}</div>)}
          </div>
          {rows.map((s,i)=>(
            <div key={s.id} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 130px 100px 70px",padding:"12px 18px",alignItems:"center",borderBottom:i<rows.length-1?`1px solid ${G.border}`:"none",transition:"background .12s"}} onMouseEnter={e=>e.currentTarget.style.background=G.bg} onMouseLeave={e=>e.currentTarget.style.background=""}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><AvatarCircle name={s.name} bg={avBg(i)} tx={avTx(i)} size={32}/><div><div style={{fontSize:13,fontWeight:600,color:G.text}}>{s.name}</div><div style={{fontSize:10,color:G.light}}>{s.id}</div></div></div>
              <div style={{fontSize:12,color:G.text}}>{s.cls}</div>
              <MiniBar val={s.att} color={s.att>90?G.ok:s.att>75?G.warn:G.err}/>
              <Pill level={s.lvl}/>
              <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:20,background:s.ok?`${G.ok}15`:`${G.err}15`,color:s.ok?G.ok:G.err}}>{s.ok?"● Active":"⚠ Alert"}</span>
              <div style={{display:"flex",gap:5}}><button style={{padding:"4px 7px",borderRadius:7,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",color:G.muted}}><Eye size={12}/></button><button style={{padding:"4px 7px",borderRadius:7,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",color:G.muted}}><Edit size={12}/></button></div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ── VIEW: CBC ASSESSMENT ──────────────────────────────────────────────────────
function CBCView({mob}){
  const [tab,setTab]=useState(0);
  const [data,setData]=useState(AREAS.map(a=>({...a,rows:a.rows.map(r=>({...r}))})));
  const levels=["EE","ME","AE","BE"];
  const area=data[tab];
  const setScore=(ri,lv)=>setData(prev=>prev.map((a,ai)=>ai!==tab?a:{...a,rows:a.rows.map((r,i)=>i!==ri?r:{...r,s:lv})}));
  const counts=levels.reduce((acc,l)=>({...acc,[l]:area.rows.filter(r=>r.s===l).length}),{});
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>CBC Assessment Entry</div><div style={{fontSize:11,color:G.muted}}>Grade 5A · Tap cells to assign performance levels</div></div>
        <Btn icon={CheckCircle2}>Save Assessments</Btn>
      </div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        {data.map((a,i)=><button key={i} onClick={()=>setTab(i)} style={{padding:"7px 14px",borderRadius:10,fontSize:12,fontWeight:700,background:tab===i?G.green:G.card,color:tab===i?"#fff":G.muted,border:tab===i?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{a.area}</button>)}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {levels.map(l=><div key={l} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 11px",background:G.card,borderRadius:8,border:`1px solid ${G.border}`}}><div style={{width:8,height:8,borderRadius:2,background:perf[l]}}/><span style={{fontSize:10,fontWeight:700,color:G.text}}>{l}</span><span style={{fontSize:10,color:G.muted}}>— {perfName[l]}</span></div>)}
      </div>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"11px 17px",background:G.greenPale,borderBottom:`1px solid ${G.greenPaleBr}`}}>
          <div style={{display:"flex",gap:18,flexWrap:"wrap"}}>
            <div><span style={{fontSize:9,fontWeight:700,color:G.muted,textTransform:"uppercase"}}>Strand: </span><span style={{fontSize:11,fontWeight:800,color:G.green}}>{area.strand}</span></div>
            <div><span style={{fontSize:9,fontWeight:700,color:G.muted,textTransform:"uppercase"}}>Sub-Strand: </span><span style={{fontSize:11,fontWeight:800,color:G.green}}>{area.sub}</span></div>
          </div>
        </div>
        {mob ? (
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {area.rows.map((row,ri)=>(
              <div key={ri} style={{padding:"12px 16px",borderBottom:ri<area.rows.length-1?`1px solid ${G.border}`:"none",background:ri%2===0?G.card:G.bg}}>
                <div style={{fontSize:13,fontWeight:700,color:G.text,marginBottom:10}}>{row.n}</div>
                <div style={{display:"flex",gap:8}}>
                  {levels.map(lv=>(
                    <button key={lv} onClick={()=>setScore(ri,lv)} style={{flex:1,padding:"10px 0",borderRadius:10,border:"none",cursor:"pointer",background:row.s===lv?perf[lv]:`${perf[lv]}18`,color:row.s===lv?"#fff":perf[lv],fontWeight:800,fontSize:12,transform:row.s===lv?"scale(1.05)":"scale(1)",transition:"all .15s",boxShadow:row.s===lv?`0 2px 8px ${perf[lv]}55`:"none"}}>{lv}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div style={{display:"grid",gridTemplateColumns:"180px repeat(4,1fr) 130px",padding:"9px 18px",background:G.bg,borderBottom:`1px solid ${G.border}`}}>
              <div style={{fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase"}}>Learner</div>
              {levels.map(l=><div key={l} style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:.8,color:perf[l],textAlign:"center"}}>{l}</div>)}
              <div style={{fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase",textAlign:"center"}}>Result</div>
            </div>
            {area.rows.map((row,ri)=>(
              <div key={ri} style={{display:"grid",gridTemplateColumns:"180px repeat(4,1fr) 130px",padding:"11px 18px",alignItems:"center",borderBottom:ri<area.rows.length-1?`1px solid ${G.border}`:"none",background:ri%2===0?G.card:G.bg}}>
                <div style={{fontSize:13,fontWeight:600,color:G.text}}>{row.n}</div>
                {levels.map(lv=>(
                  <div key={lv} style={{display:"flex",justifyContent:"center"}}>
                    <button onClick={()=>setScore(ri,lv)} style={{width:36,height:36,borderRadius:10,border:"none",cursor:"pointer",background:row.s===lv?perf[lv]:`${perf[lv]}18`,color:row.s===lv?"#fff":perf[lv],fontWeight:800,fontSize:11,transform:row.s===lv?"scale(1.12)":"scale(1)",transition:"all .15s",boxShadow:row.s===lv?`0 2px 8px ${perf[lv]}55`:"none"}}>{lv}</button>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"center"}}><Pill level={row.s}/></div>
              </div>
            ))}
          </>
        )}
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {levels.map(l=>(
          <div key={l} style={{background:G.card,borderRadius:13,padding:"13px 15px",border:`1px solid ${G.border}`,borderLeft:`4px solid ${perf[l]}`}}>
            <div style={{fontSize:22,fontWeight:800,color:perf[l]}}>{counts[l]}</div>
            <div style={{fontSize:11,fontWeight:700,color:G.text,marginTop:1}}>{perfName[l]}</div>
            <div style={{fontSize:10,color:G.muted}}>{Math.round((counts[l]/area.rows.length)*100)}% of class</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── VIEW: ATTENDANCE ──────────────────────────────────────────────────────────
function AttendanceView({mob}){
  const [cls,setCls]=useState("5A");
  const [att,setAtt]=useState(()=>{const m={};ATT_STUDENTS.forEach(n=>{m[n]="P";});return m;});
  const [submitted,setSubmitted]=useState(false);
  const streams=["5A","5B","6A","6B","7A","7B"];
  const pCount=Object.values(att).filter(v=>v==="P").length;
  const aCount=Object.values(att).filter(v=>v==="A").length;
  const lCount=Object.values(att).filter(v=>v==="L").length;

  const heatColor=(r)=>{
    if(r===0)return G.bgAlt;
    if(r>=95)return "#004000";
    if(r>=90)return "#2d7a2d";
    if(r>=85)return "#5aaa5a";
    if(r>=80)return "#8dcf8d";
    return "#f4b860";
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Attendance</div><div style={{fontSize:11,color:G.muted}}>Friday 24 May 2026 · Take today's register</div></div>
        {!submitted&&<Btn icon={CheckCheck} onClick={()=>setSubmitted(true)}>Submit Register</Btn>}
      </div>
      {submitted&&<div style={{background:`${G.ok}15`,border:`1px solid ${G.ok}30`,borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}><CheckCircle2 size={16} color={G.ok}/><span style={{fontSize:13,fontWeight:700,color:G.ok}}>Register submitted for Grade {cls} at 09:04 AM</span></div>}

      {/* Quick stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {[{l:"Present",v:pCount,c:G.ok},{l:"Absent",v:aCount,c:G.err},{l:"Late",v:lCount,c:G.warn}].map(x=>(
          <div key={x.l} style={{background:G.card,borderRadius:13,padding:"13px 15px",border:`1px solid ${G.border}`,textAlign:"center"}}>
            <div style={{fontSize:mob?22:26,fontWeight:800,color:x.c}}>{x.v}</div>
            <div style={{fontSize:11,color:G.muted}}>{x.l}</div>
          </div>
        ))}
      </div>

      {/* Stream tabs */}
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:2}}>
        {streams.map(s=><button key={s} onClick={()=>setCls(s)} style={{padding:"6px 14px",borderRadius:9,fontSize:11,fontWeight:700,whiteSpace:"nowrap",background:cls===s?G.green:G.card,color:cls===s?"#fff":G.muted,border:cls===s?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{s}</button>)}
      </div>

      {/* Student quick-take */}
      <Card style={{padding:0,overflow:"hidden"}}>
        {!mob&&<div style={{display:"grid",gridTemplateColumns:"1fr 40px 40px 40px",padding:"9px 18px",background:G.bg,borderBottom:`1px solid ${G.border}`}}>
          {["Learner","P","A","L"].map(h=><div key={h} style={{fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase",textAlign:h!=="Learner"?"center":"left"}}>{h}</div>)}
        </div>}
        {ATT_STUDENTS.map((name,i)=>{
          const v=att[name];
          const setV=(val)=>setAtt(p=>({...p,[name]:val}));
          return mob ? (
            <div key={name} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px",borderBottom:i<ATT_STUDENTS.length-1?`1px solid ${G.border}`:"none",background:i%2===0?G.card:G.bg}}>
              <div style={{flex:1,fontSize:13,fontWeight:600,color:G.text}}>{name}</div>
              {[{l:"P",c:G.ok},{l:"A",c:G.err},{l:"L",c:G.warn}].map(({l,c})=>(
                <button key={l} onClick={()=>setV(l)} style={{width:44,height:36,borderRadius:9,border:"none",cursor:"pointer",background:v===l?c:`${c}18`,color:v===l?"#fff":c,fontWeight:800,fontSize:12,transition:"all .12s"}}>{l}</button>
              ))}
            </div>
          ) : (
            <div key={name} style={{display:"grid",gridTemplateColumns:"1fr 40px 40px 40px",padding:"10px 18px",alignItems:"center",borderBottom:i<ATT_STUDENTS.length-1?`1px solid ${G.border}`:"none",background:i%2===0?G.card:G.bg}}>
              <div style={{fontSize:12,fontWeight:600,color:G.text}}>{name}</div>
              {[{l:"P",c:G.ok},{l:"A",c:G.err},{l:"L",c:G.warn}].map(({l,c})=>(
                <div key={l} style={{display:"flex",justifyContent:"center"}}>
                  <button onClick={()=>setV(l)} style={{width:30,height:30,borderRadius:8,border:"none",cursor:"pointer",background:v===l?c:`${c}18`,color:v===l?"#fff":c,fontWeight:800,fontSize:11,transition:"all .12s"}}>{l}</button>
                </div>
              ))}
            </div>
          );
        })}
      </Card>

      {/* Heatmap */}
      <Card>
        <SH title="Attendance Heatmap" sub="Last 5 weeks · Mon–Fri"/>
        <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
          <div style={{display:"flex",flexDirection:"column",gap:4,marginTop:18}}>
            {HEATMAP_WEEKS.map(w=><div key={w.label} style={{fontSize:10,color:G.muted,height:28,display:"flex",alignItems:"center",whiteSpace:"nowrap"}}>{w.label}</div>)}
          </div>
          <div style={{flex:1}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginBottom:4}}>
              {["Mon","Tue","Wed","Thu","Fri"].map(d=><div key={d} style={{fontSize:10,color:G.muted,textAlign:"center",fontWeight:600}}>{d}</div>)}
            </div>
            {HEATMAP_WEEKS.map((w,wi)=>(
              <div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginBottom:4}}>
                {w.days.map((r,di)=>(
                  <div key={di} title={r?`${r}%`:"Future"} style={{height:28,borderRadius:6,background:heatColor(r),display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {r>0&&<span style={{fontSize:9,fontWeight:700,color:r>=90?"rgba(255,255,255,.9)":G.text}}>{r}%</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
          {[{c:"#004000",l:"≥95%"},{c:"#5aaa5a",l:"90–94%"},{c:"#8dcf8d",l:"85–89%"},{c:"#f4b860",l:"<85%"},{c:G.bgAlt,l:"Future"}].map(x=>(
            <div key={x.l} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:12,height:12,borderRadius:3,background:x.c,border:`1px solid ${G.border}`}}/><span style={{fontSize:10,color:G.muted}}>{x.l}</span></div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── VIEW: COMMUNICATION ───────────────────────────────────────────────────────
function CommunicationView({mob}){
  const [compose,setCompose]=useState(false);
  const [msg,setMsg]=useState("");
  const tagColors={"Academic":G.green,"Finance":G.orange,"Staff":G.purple,"Activity":G.info,"Event":G.pink};
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Communication Hub</div><div style={{fontSize:11,color:G.muted}}>Announcements · SMS · Parent Notices</div></div>
        <div style={{display:"flex",gap:8}}>
          <Btn variant="secondary" icon={Send} sm>SMS Blast</Btn>
          <Btn icon={Plus} onClick={()=>setCompose(true)}>New Announcement</Btn>
        </div>
      </div>

      {/* Compose box */}
      {compose&&(
        <Card style={{border:`1px solid ${G.greenPaleBr}`,background:G.greenPale}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,color:G.green}}>New Announcement</div>
            <button onClick={()=>setCompose(false)} style={{background:"none",border:"none",cursor:"pointer",color:G.muted}}><X size={16}/></button>
          </div>
          <input placeholder="Title…" style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:13,marginBottom:8,outline:"none",boxSizing:"border-box"}}/>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Write your announcement…" rows={3} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <select style={{flex:1,padding:"7px 10px",borderRadius:8,border:`1px solid ${G.border}`,fontSize:11,color:G.text,outline:"none"}}>
              <option>All Staff & Parents</option><option>Teaching Staff</option><option>Parents Only</option><option>Grade 5 Parents</option>
            </select>
            <Btn icon={Send} onClick={()=>setCompose(false)}>Publish</Btn>
          </div>
        </Card>
      )}

      {/* Stats row */}
      <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
        {[{icon:Megaphone,l:"Announcements",v:"24",c:G.green},{icon:MessageCircle,l:"SMS Sent",v:"3,241",c:G.info},{icon:Mail,l:"Parent Messages",v:"18",c:G.orange},{icon:CheckCheck,l:"Delivered Rate",v:"98.2%",c:G.ok}].map(({icon:Icon,l,v,c})=>(
          <div key={l} style={{background:G.card,borderRadius:13,padding:"13px 15px",border:`1px solid ${G.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style={{width:28,height:28,borderRadius:8,background:`${c}12`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={13} color={c}/></div><span style={{fontSize:10,color:G.muted}}>{l}</span></div>
            <div style={{fontSize:20,fontWeight:800,color:c}}>{v}</div>
          </div>
        ))}
      </div>

      {/* Announcements feed */}
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"2fr 1fr",gap:12}}>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{fontSize:12,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.8}}>Latest Announcements</div>
          {ANNOUNCEMENTS.map(a=>(
            <Card key={a.id} style={{padding:"15px 17px",borderLeft:`3px solid ${tagColors[a.tag]||G.green}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:6}}>
                <div style={{fontSize:13,fontWeight:800,color:G.text,flex:1,lineHeight:1.4}}>{a.pinned&&<span style={{fontSize:9,fontWeight:800,color:G.orange,background:G.orangePale,padding:"1px 6px",borderRadius:4,marginRight:6}}>PINNED</span>}{a.title}</div>
                <Chip color={tagColors[a.tag]||G.green}>{a.tag}</Chip>
              </div>
              <div style={{fontSize:11,color:G.muted,lineHeight:1.6,marginBottom:8}}>{a.body}</div>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
                <div style={{fontSize:10,color:G.light}}>By {a.author} · {a.date}</div>
                <Chip color={G.muted}>{a.audience}</Chip>
              </div>
            </Card>
          ))}
        </div>

        {!mob&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{fontSize:12,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.8}}>SMS Log</div>
          {SMS_LOG.map((s,i)=>(
            <Card key={i} style={{padding:"13px 15px"}}>
              <div style={{fontSize:12,fontWeight:700,color:G.text,marginBottom:6}}>{s.msg}</div>
              <div style={{display:"flex",gap:12,marginBottom:6}}>
                <div><div style={{fontSize:9,color:G.muted,textTransform:"uppercase"}}>Sent</div><div style={{fontSize:13,fontWeight:800,color:G.info}}>{s.recipients}</div></div>
                <div><div style={{fontSize:9,color:G.muted,textTransform:"uppercase"}}>Delivered</div><div style={{fontSize:13,fontWeight:800,color:G.ok}}>{s.delivered}</div></div>
                <div><div style={{fontSize:9,color:G.muted,textTransform:"uppercase"}}>Failed</div><div style={{fontSize:13,fontWeight:800,color:G.err}}>{s.failed}</div></div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:10,color:G.light}}>{s.time}</span>
                <Chip color={G.muted}>{s.type}</Chip>
              </div>
            </Card>
          ))}
          <Card style={{background:`linear-gradient(135deg,${G.greenDk},${G.greenLt})`,border:"none",padding:"15px 17px"}}>
            <div style={{fontSize:12,fontWeight:800,color:"#fff",marginBottom:8}}>📱 Send SMS Blast</div>
            <select style={{width:"100%",padding:"7px 10px",borderRadius:8,border:"none",fontSize:11,marginBottom:8,outline:"none"}}>
              <option>All Parents (1,248)</option><option>Grade 5 Parents</option><option>Defaulters List</option>
            </select>
            <textarea placeholder="Type your message…" rows={2} style={{width:"100%",padding:"7px 10px",borderRadius:8,border:"none",fontSize:11,resize:"none",outline:"none",boxSizing:"border-box",marginBottom:8}}/>
            <button style={{width:"100%",padding:"9px",background:G.orange,color:"#fff",border:"none",borderRadius:9,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Send size={12}/>Send Message</button>
          </Card>
        </div>}
      </div>
    </div>
  );
}

// ── VIEW: TIMETABLE ───────────────────────────────────────────────────────────
function TimetableView({mob}){
  const days=["Mon","Tue","Wed","Thu","Fri"];
  const dayLabels={Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday"};
  const [day,setDay]=useState("Mon");
  const lessons=TIMETABLE_DATA[day]||[];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Timetable & Scheduling</div><div style={{fontSize:11,color:G.muted}}>Week of 20–24 May 2026</div></div>
        <Btn icon={Plus}>Add Lesson</Btn>
      </div>
      <div style={{display:"flex",gap:6}}>
        {days.map(d=>(
          <button key={d} onClick={()=>setDay(d)} style={{flex:1,padding:"9px 0",borderRadius:10,fontSize:mob?11:12,fontWeight:700,background:day===d?G.green:G.card,color:day===d?"#fff":G.muted,border:day===d?"none":`1px solid ${G.border}`,cursor:"pointer",transition:"all .12s"}}>
            {mob?d:dayLabels[d]}
          </button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {lessons.map((l,i)=>{
          const sc=SUB_COLORS[l.sub]||G.green;
          const isNow=i===2;
          return (
            <div key={i} style={{display:"flex",gap:12,alignItems:"stretch",background:G.card,borderRadius:13,border:`1px solid ${isNow?sc:G.border}`,overflow:"hidden",boxShadow:isNow?`0 2px 12px ${sc}25`:"none",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 2px 12px ${sc}30`;e.currentTarget.style.borderColor=sc;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow=isNow?`0 2px 12px ${sc}25`:"none";e.currentTarget.style.borderColor=isNow?sc:G.border;}}>
              <div style={{width:4,background:sc,flexShrink:0,borderRadius:"0 0 0 0"}}/>
              <div style={{display:"flex",alignItems:"center",gap:mob?10:14,padding:"12px 14px 12px 10px",flex:1,flexWrap:"wrap"}}>
                <div style={{width:mob?60:72}}>
                  <div style={{fontSize:mob?10:11,fontWeight:700,color:isNow?sc:G.text}}>{l.slot}</div>
                  {isNow&&<div style={{fontSize:9,fontWeight:800,color:sc,marginTop:1}}>● NOW</div>}
                </div>
                <div style={{flex:1,minWidth:100}}>
                  <div style={{fontSize:mob?13:14,fontWeight:800,color:G.text}}>{l.sub}</div>
                  <div style={{fontSize:11,color:G.muted}}>{l.teacher}</div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <div style={{background:`${sc}12`,color:sc,fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:7}}>{l.cls}</div>
                  <div style={{background:G.bgAlt,color:G.muted,fontSize:10,fontWeight:600,padding:"3px 9px",borderRadius:7}}>🚪 {l.room}</div>
                </div>
              </div>
            </div>
          );
        })}
        {lessons.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:G.muted,fontSize:13}}>No lessons scheduled for this day.</div>}
      </div>
    </div>
  );
}

// ── VIEW: REPORTS ─────────────────────────────────────────────────────────────
function ReportsView({mob}){
  const progressData=GRADE_PERFORMANCE.map(g=>({grade:g.grade.replace("Grade ","G"),completion:g.completion,avg:g.avgScore}));
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Reports & Analytics</div><div style={{fontSize:11,color:G.muted}}>Term 2 · Academic performance overview</div></div>
        <div style={{display:"flex",gap:8}}><Btn variant="secondary" icon={Printer} sm>Print</Btn><Btn icon={Download}>Export PDF</Btn></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
        {[{l:"School Avg Score",v:"73.4%",c:G.green,i:Star},{l:"CBC Completion",v:"78%",c:G.info,i:ClipboardList},{l:"Top Performers",v:"42",c:G.orange,i:Zap},{l:"Needs Support",v:"23",c:G.err,i:AlertCircle}].map(({l,v,c,i:Icon})=>(
          <div key={l} style={{background:G.card,borderRadius:13,padding:"13px 15px",border:`1px solid ${G.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><div style={{width:26,height:26,borderRadius:7,background:`${c}14`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={12} color={c}/></div><span style={{fontSize:10,color:G.muted}}>{l}</span></div>
            <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
        <Card>
          <SH title="CBC Completion by Grade" sub="Assessment submission rate"/>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {GRADE_PERFORMANCE.map(g=>(
              <div key={g.grade} style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:mob?52:64,fontSize:11,fontWeight:700,color:G.text,flexShrink:0}}>{g.grade}</div>
                <div style={{flex:1,height:22,background:G.bgAlt,borderRadius:6,overflow:"hidden",position:"relative"}}>
                  <div style={{width:`${g.completion}%`,height:"100%",background:`linear-gradient(90deg,${g.color},${g.color}cc)`,borderRadius:6,transition:"width .6s ease",display:"flex",alignItems:"center",paddingLeft:8}}>
                    <span style={{fontSize:10,fontWeight:800,color:"#fff"}}>{g.completion}%</span>
                  </div>
                </div>
                <div style={{width:32,fontSize:11,color:G.muted,textAlign:"right"}}>{g.avgScore}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:8}}>
            <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:2,background:G.bgAlt,border:`1px solid ${G.border}`}}/><span style={{fontSize:10,color:G.muted}}>Completion %</span></div>
            <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:2,background:G.greenPale,border:`1px solid ${G.greenPaleBr}`}}/><span style={{fontSize:10,color:G.muted}}>Avg Score →</span></div>
          </div>
        </Card>
        <Card>
          <SH title="Competency Mastery" sub="School-wide performance distribution"/>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[{s:"EE",v:42},{s:"ME",v:118},{s:"AE",v:67},{s:"BE",v:23}]}>
              <CartesianGrid strokeDasharray="3 3" stroke={G.border} vertical={false}/>
              <XAxis dataKey="s" tick={{fontSize:11,fill:G.muted}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}}/>
              <Bar dataKey="v" radius={[6,6,0,0]} name="Learners">
                {[G.green,G.info,G.warn,G.err].map((c,i)=><Cell key={i} fill={c}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <SH title="Grade-by-Grade Summary" sub="Term 2 academic performance"/>
        {mob ? (
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {GRADE_PERFORMANCE.map((g,i)=>(
              <div key={i} style={{padding:"12px 14px",background:G.bg,borderRadius:11,border:`1px solid ${G.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:G.text}}>{g.grade}</div>
                  <div style={{fontSize:13,fontWeight:800,color:g.color}}>{g.avgScore}%</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <div><span style={{fontSize:10,color:G.muted}}>CBC Completion: </span><span style={{fontSize:11,fontWeight:700,color:G.text}}>{g.completion}%</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr>{["Grade","Students","Avg Score","CBC Completion","Top Competency","Action"].map(h=><th key={h} style={{padding:"8px 14px",fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase",textAlign:"left",borderBottom:`1px solid ${G.border}`,background:G.bg}}>{h}</th>)}</tr></thead>
            <tbody>
              {[{grade:"Grade 4",students:248,avg:76,comp:82,top:"Communication",c:G.green},{grade:"Grade 5",students:312,avg:74,comp:79,top:"Numeracy",c:G.info},{grade:"Grade 6",students:364,avg:71,comp:74,top:"Social",c:G.warn},{grade:"Grade 7",students:324,avg:69,comp:68,top:"Learning",c:G.orange}].map((r,i)=>(
                <tr key={i} onMouseEnter={e=>e.currentTarget.style.background=G.bg} onMouseLeave={e=>e.currentTarget.style.background=""} style={{transition:"background .1s"}}>
                  <td style={{padding:"12px 14px",fontSize:12,fontWeight:700,color:G.text}}>{r.grade}</td>
                  <td style={{padding:"12px 14px",fontSize:12,color:G.text}}>{r.students}</td>
                  <td style={{padding:"12px 14px"}}><span style={{fontSize:13,fontWeight:800,color:r.c}}>{r.avg}%</span></td>
                  <td style={{padding:"12px 14px"}}><MiniBar val={r.comp} color={r.c}/></td>
                  <td style={{padding:"12px 14px"}}><Chip color={r.c}>{r.top}</Chip></td>
                  <td style={{padding:"12px 14px"}}><button style={{padding:"5px 11px",borderRadius:7,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",fontSize:11,color:G.muted}}>View Report</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}

// ── VIEW: TEACHERS ─────────────────────────────────────────────────────────────
function TeachersView({mob}){
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Teaching Staff</div><div style={{fontSize:11,color:G.muted}}>68 teachers · 6 departments</div></div>
        <Btn icon={UserPlus}>Add Teacher</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        {TEACHERS.map((t,i)=>(
          <Card key={t.id} style={{padding:"16px 18px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <AvatarCircle name={t.name} bg={t.bg} tx={t.tx} size={44}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:800,color:G.text}}>{t.name}</div>
                <div style={{fontSize:11,color:G.muted}}>{t.sub}</div>
                <div style={{fontSize:10,color:G.light,marginTop:1}}>{t.cls}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:14,marginBottom:12}}>
              <div><div style={{fontSize:9,color:G.muted,fontWeight:700,textTransform:"uppercase"}}>Attendance</div><div style={{fontSize:14,fontWeight:800,color:t.att>95?G.ok:G.warn}}>{t.att}%</div></div>
              <div><div style={{fontSize:9,color:G.muted,fontWeight:700,textTransform:"uppercase"}}>Rating</div><div style={{fontSize:14,fontWeight:800,color:G.orange}}>⭐ {t.rating}</div></div>
              <div><div style={{fontSize:9,color:G.muted,fontWeight:700,textTransform:"uppercase"}}>Hrs/Week</div><div style={{fontSize:14,fontWeight:800,color:G.info}}>{t.hrs}</div></div>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:10,color:G.muted}}>Workload</span>
                <span style={{fontSize:10,fontWeight:700,color:t.load>22?G.err:t.load>18?G.warn:G.ok}}>{t.load}/24 lessons</span>
              </div>
              <div style={{height:5,background:G.bgAlt,borderRadius:3,overflow:"hidden"}}><div style={{width:`${(t.load/24)*100}%`,height:"100%",background:t.load>22?G.err:t.load>18?G.warn:G.ok,borderRadius:3}}/></div>
            </div>
            <div style={{display:"flex",gap:7}}>
              <button style={{flex:1,padding:"7px 0",borderRadius:8,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",fontSize:11,fontWeight:600,color:G.muted,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><Eye size={12}/>Profile</button>
              <button style={{flex:1,padding:"7px 0",borderRadius:8,border:"none",background:G.greenPale,cursor:"pointer",fontSize:11,fontWeight:700,color:G.green,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><Calendar size={12}/>Schedule</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── VIEW: SETTINGS ────────────────────────────────────────────────────────────
function SettingsView({mob}){
  const [theme,setTheme]=useState("Light");
  const [notifs,setNotifs]=useState({sms:true,email:true,push:false,weekly:true});
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>System Settings</div><div style={{fontSize:11,color:G.muted}}>Manage school profile, integrations and preferences</div></div>

      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
        {/* School Profile */}
        <Card>
          <SH title="School Profile" sub="Institution details"/>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:"12px",background:G.greenPale,borderRadius:11}}>
            <div style={{width:48,height:48,borderRadius:14,background:G.green,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16,color:"#fff",flexShrink:0}}>NG</div>
            <div><div style={{fontSize:14,fontWeight:800,color:G.green}}>Nairobi Greenfields Academy</div><div style={{fontSize:11,color:G.muted}}>KNEC Registration: NBI/PRV/2019/0042</div></div>
          </div>
          {[{icon:MapPin,l:"Location",v:"Karen, Nairobi County"},{icon:Phone,l:"Phone",v:"+254 722 345 678"},{icon:Mail,l:"Email",v:"admin@greenfields.ac.ke"},{icon:Globe,l:"Website",v:"www.greenfields.ac.ke"}].map(({icon:Icon,l,v})=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${G.border}`}}>
              <Icon size={13} color={G.muted}/><span style={{fontSize:11,color:G.muted,width:64}}>{l}</span><span style={{fontSize:12,color:G.text,fontWeight:600}}>{v}</span>
            </div>
          ))}
          <button style={{marginTop:12,padding:"8px 14px",borderRadius:9,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",fontSize:11,fontWeight:700,color:G.green,display:"flex",alignItems:"center",gap:5}}><Edit size={12}/>Edit Profile</button>
        </Card>

        {/* Academic Year */}
        <Card>
          <SH title="Academic Year" sub="Term and calendar settings"/>
          {[{l:"Current Year",v:"2026"},{ l:"Current Term",v:"Term 2"},{ l:"Term Start",v:"21 April 2026"},{ l:"Term End",v:"8 August 2026"},{ l:"School Days Elapsed",v:"28 / 62"},{ l:"CBC Curriculum",v:"Grade 1–9"}].map(({l,v})=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${G.border}`}}>
              <span style={{fontSize:11,color:G.muted}}>{l}</span><span style={{fontSize:12,fontWeight:700,color:G.text}}>{v}</span>
            </div>
          ))}
        </Card>

        {/* Integrations */}
        <Card>
          <SH title="Integrations" sub="Connected services"/>
          {[{icon:CreditCard,l:"M-Pesa Paybill",v:"890456",ok:true},{icon:MessageCircle,l:"Africa's Talking SMS",v:"Connected",ok:true},{icon:Shield,l:"KNEC API",v:"Connected",ok:true},{icon:Monitor,l:"Google Classroom",v:"Not connected",ok:false},{icon:Wifi,l:"Biometric Attendance",v:"Setup required",ok:false},{icon:Smartphone,l:"Parent Mobile App",v:"Beta",ok:true}].map(({icon:Icon,l,v,ok})=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${G.border}`}}>
              <div style={{width:28,height:28,borderRadius:8,background:ok?G.greenPale:`${G.err}10`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon size={13} color={ok?G.green:G.err}/></div>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:G.text}}>{l}</div><div style={{fontSize:10,color:G.muted}}>{v}</div></div>
              <button style={{padding:"4px 10px",borderRadius:7,border:`1px solid ${ok?G.border:G.orange}`,background:ok?"none":G.orangePale,fontSize:10,fontWeight:700,color:ok?G.muted:G.orange,cursor:"pointer"}}>{ok?"Manage":"Connect"}</button>
            </div>
          ))}
        </Card>

        {/* Notifications */}
        <Card>
          <SH title="Notifications" sub="Alerts and communication preferences"/>
          {[{k:"sms",l:"SMS Notifications",d:"Send SMS for fees, events, alerts"},{k:"email",l:"Email Digest",d:"Daily summary to admin email"},{k:"push",l:"Push Notifications",d:"Browser and mobile push"},{k:"weekly",l:"Weekly Analytics Report",d:"Auto-generated every Monday"}].map(({k,l,d})=>(
            <div key={k} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:`1px solid ${G.border}`}}>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{l}</div><div style={{fontSize:10,color:G.muted}}>{d}</div></div>
              <button onClick={()=>setNotifs(p=>({...p,[k]:!p[k]}))} style={{width:42,height:24,borderRadius:12,border:"none",cursor:"pointer",background:notifs[k]?G.green:G.bgAlt,position:"relative",transition:"background .2s"}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:notifs[k]?21:3,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
              </button>
            </div>
          ))}
          <div style={{marginTop:12}}>
            <div style={{fontSize:11,fontWeight:700,color:G.text,marginBottom:8}}>Theme</div>
            <div style={{display:"flex",gap:8}}>
              {["Light","Dark","System"].map(t=><button key={t} onClick={()=>setTheme(t)} style={{flex:1,padding:"7px 0",borderRadius:8,fontSize:11,fontWeight:700,background:theme===t?G.green:G.card,color:theme===t?"#fff":G.muted,border:theme===t?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{t}</button>)}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── VIEW: FINANCE ─────────────────────────────────────────────────────────────
function FinanceView({mob}){
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Finance Overview</div><div style={{fontSize:11,color:G.muted}}>Term 2 · 2026 · M-Pesa & Bank Integrated</div></div>
        <div style={{display:"flex",gap:8}}><Btn variant="secondary" icon={Download} sm>Export</Btn><Btn variant="orange" icon={Plus}>Record Payment</Btn></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
        {[{l:"Total Expected",v:"KES 22.8M",s:"For Term 2",c:G.text,bg:G.card},{l:"Collected",v:"KES 12.4M",s:"54.4% of target",c:G.green,bg:G.greenPale},{l:"Outstanding",v:"KES 10.4M",s:"342 accounts",c:G.err,bg:"rgba(239,68,68,.06)"},{l:"M-Pesa Txns",v:"1,847",s:"This term",c:G.orange,bg:G.orangePale}].map((x,i)=>(
          <div key={i} style={{background:x.bg,borderRadius:13,padding:"13px 15px",border:`1px solid ${G.border}`}}>
            <div style={{fontSize:9,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.8}}>{x.l}</div>
            <div style={{fontSize:mob?18:20,fontWeight:800,color:x.c,marginTop:6}}>{x.v}</div>
            <div style={{fontSize:10,color:G.muted,marginTop:2}}>{x.s}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"2fr 1fr",gap:12}}>
        <Card>
          <SH title="Monthly Collection vs Target" sub="KES thousands"/>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={feeData} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="3 3" stroke={G.border} vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}k`}/>
              <Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}} formatter={v=>[`KES ${v}k`]}/>
              <Bar dataKey="tgt" fill={G.bgAlt} name="Target" radius={[4,4,0,0]}/>
              <Bar dataKey="col" fill={G.orange} name="Collected" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SH title="Revenue Breakdown" sub="By category"/>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart><Pie data={pieBreakdown} cx="50%" cy="50%" innerRadius={38} outerRadius={60} dataKey="v" strokeWidth={0}>{pieBreakdown.map((e,i)=><Cell key={i} fill={e.c}/>)}</Pie><Tooltip formatter={v=>[`${v}%`]} contentStyle={{borderRadius:10,border:"none",fontSize:11}}/></PieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:8}}>
            {pieBreakdown.map((d,i)=><div key={i} style={{display:"flex",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:2,background:d.c}}/><span style={{fontSize:10,color:G.muted}}>{d.name}</span></div><span style={{fontSize:11,fontWeight:700,color:G.text}}>{d.v}%</span></div>)}
          </div>
        </Card>
      </div>
      <Card>
        <SH title="Recent Transactions" sub="Today · 24 May 2026"/>
        {[{n:"John Wanjiku",ref:"MP240524001",amt:"KES 48,000",type:"M-Pesa",t:"08:14"},{n:"Grace Achieng",ref:"MP240524002",amt:"KES 24,000",type:"M-Pesa",t:"09:02"},{n:"Peter Kimani",ref:"BK240524003",amt:"KES 96,000",type:"Bank",t:"10:33"},{n:"Mary Otieno",ref:"MP240524004",amt:"KES 12,000",type:"M-Pesa",t:"11:45"}].map((tx,i,arr)=>(
          <div key={i} style={{display:mob?"block":"grid",gridTemplateColumns:"2fr 1fr 1fr 70px",padding:"11px 0",alignItems:"center",borderBottom:i<arr.length-1?`1px solid ${G.border}`:"none"}}>
            <div style={{marginBottom:mob?6:0}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{tx.n}</div><div style={{fontSize:10,color:G.light}}>{tx.ref}</div></div>
            <div style={{marginBottom:mob?6:0}}><Chip color={tx.type==="M-Pesa"?G.green:G.info}>{tx.type}</Chip></div>
            <div style={{fontSize:13,fontWeight:800,color:G.green,marginBottom:mob?4:0}}>{tx.amt}</div>
            <div style={{fontSize:10,color:G.muted,textAlign:mob?"left":"right"}}>{tx.t}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── VIEW: TEACHER PORTAL ──────────────────────────────────────────────────────
function TeacherPortal({mob}){
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Teacher Dashboard</div><div style={{fontSize:11,color:G.muted}}>Ms. Njeri Wambua · Grade 5A Class Teacher</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"2fr 1fr",gap:12}}>
        <Card>
          <SH title="Today's Schedule" sub="Friday 24 May · 5 lessons"/>
          {[{t:"07:40–08:20",sub:"Mathematics",top:"Numbers & Operations",cls:"5A",done:true},{t:"08:20–09:00",sub:"English",top:"Creative Writing",cls:"5A",done:true},{t:"09:00–09:40",sub:"Science & Tech",top:"Ecosystems",cls:"5B",done:false,now:true},{t:"10:00–10:40",sub:"Kiswahili",top:"Mazungumzo",cls:"5A",done:false},{t:"10:40–11:20",sub:"Social Studies",top:"Kenya's Resources",cls:"5A",done:false}].map((l,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,background:l.now?G.greenPale:l.done?G.bg:G.card,border:`1px solid ${l.now?G.greenPaleBr:G.border}`,marginBottom:7}}>
              <div style={{width:3,height:36,borderRadius:2,background:l.done?G.light:l.now?G.green:G.border,flexShrink:0}}/>
              <div style={{width:mob?62:72,fontSize:10,color:l.now?G.green:G.muted,fontWeight:l.now?700:400,flexShrink:0}}>{l.t}</div>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:l.done?G.muted:G.text}}>{l.sub}</div><div style={{fontSize:10,color:G.muted}}>{l.top}</div></div>
              <Chip color={l.now?G.green:l.done?G.ok:G.muted}>{l.cls}</Chip>
              {l.now&&<span style={{fontSize:9,fontWeight:800,color:G.green}}>LIVE</span>}
              {l.done&&<CheckCircle2 size={13} color={G.ok}/>}
            </div>
          ))}
        </Card>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Card>
            <SH title="Quick Stats" sub="This week"/>
            {[{icon:Users,l:"Learners",v:"32",c:G.green},{icon:ClipboardList,l:"Pending assessments",v:"8",c:G.warn},{icon:Activity,l:"Attendance today",v:"96%",c:G.ok},{icon:AlertCircle,l:"Learner alerts",v:"2",c:G.err}].map(({icon:Icon,l,v,c})=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                <div style={{width:26,height:26,borderRadius:7,background:`${c}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Icon size={12} color={c}/></div>
                <span style={{flex:1,fontSize:11,color:G.muted}}>{l}</span><span style={{fontSize:14,fontWeight:800,color:c}}>{v}</span>
              </div>
            ))}
          </Card>
          <div style={{background:`linear-gradient(145deg,${G.greenDk},${G.greenLt})`,borderRadius:14,padding:"16px 18px",boxShadow:"0 4px 18px rgba(0,64,0,.3)"}}>
            <div style={{fontSize:12,fontWeight:800,color:"#fff",marginBottom:10}}>🎯 CBC Progress · Grade 5A</div>
            {[{s:"Mathematics",p:88},{s:"English",p:74},{s:"Science & Tech",p:68},{s:"Kiswahili",p:82}].map((x,i)=>(
              <div key={i} style={{marginBottom:9}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:10,color:"rgba(255,255,255,.8)"}}>{x.s}</span><span style={{fontSize:10,fontWeight:700,color:"#fff"}}>{x.p}%</span></div>
                <div style={{height:4,background:"rgba(255,255,255,.15)",borderRadius:2,overflow:"hidden"}}><div style={{width:`${x.p}%`,height:"100%",background:G.orange,borderRadius:2}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
const NAV=[
  {grp:"Overview",items:[{id:"dashboard",icon:LayoutDashboard,label:"Dashboard"}]},
  {grp:"Academic",items:[{id:"students",icon:Users,label:"Students"},{id:"teachers",icon:GraduationCap,label:"Teachers"},{id:"cbc",icon:ClipboardList,label:"CBC Assessments"},{id:"attendance",icon:Activity,label:"Attendance"},{id:"timetable",icon:Calendar,label:"Timetable"}]},
  {grp:"Operations",items:[{id:"finance",icon:DollarSign,label:"Finance"},{id:"communication",icon:MessageSquare,label:"Communication"},{id:"reports",icon:BarChart2,label:"Reports"}]},
  {grp:"System",items:[{id:"settings",icon:Settings,label:"Settings"}]},
];
const BOTTOM_NAV=[
  {id:"dashboard",icon:Home,label:"Home"},
  {id:"students",icon:Users,label:"Learners"},
  {id:"attendance",icon:Activity,label:"Attend"},
  {id:"cbc",icon:ClipboardList,label:"CBC"},
  {id:"_more",icon:MoreHorizontal,label:"More"},
];

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function EGradeKenya(){
  const [view,setView]=useState("dashboard");
  const [collapsed,setCollapsed]=useState(false);
  const [portal,setPortal]=useState("admin");
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);
  const [drawer,setDrawer]=useState(false);
  const [moreSheet,setMoreSheet]=useState(false);

  useEffect(()=>{
    const h=()=>setW(window.innerWidth);
    window.addEventListener("resize",h);
    return ()=>window.removeEventListener("resize",h);
  },[]);
  const mob=w<700;

  const go=(id)=>{setView(id);setDrawer(false);setMoreSheet(false);if(portal==="teacher")setPortal("admin");};

  const renderView=()=>{
    if(portal==="teacher")return <TeacherPortal mob={mob}/>;
    const props={mob};
    switch(view){
      case"dashboard":return <DashboardView {...props}/>;
      case"students":return <StudentsView {...props}/>;
      case"cbc":return <CBCView {...props}/>;
      case"finance":return <FinanceView {...props}/>;
      case"attendance":return <AttendanceView {...props}/>;
      case"communication":return <CommunicationView {...props}/>;
      case"timetable":return <TimetableView {...props}/>;
      case"reports":return <ReportsView {...props}/>;
      case"teachers":return <TeachersView {...props}/>;
      case"settings":return <SettingsView {...props}/>;
      default:return <div style={{textAlign:"center",padding:"60px 0",color:G.muted}}>Coming soon</div>;
    }
  };

  const SidebarInner=()=>(
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"0 0 14px"}}>
      <div style={{padding:"18px 14px 12px",display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:32,height:32,borderRadius:9,background:G.orange,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}><GraduationCap size={17} color="#fff"/></div>
        {(!collapsed||mob)&&<div><div style={{fontSize:14,fontWeight:800,color:"#fff",letterSpacing:-.3,lineHeight:1}}>eGrade</div><div style={{fontSize:9,color:"rgba(255,255,255,.4)",fontWeight:700,letterSpacing:1.5}}>KENYA</div></div>}
        {mob&&<button onClick={()=>setDrawer(false)} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.6)"}}><X size={18}/></button>}
      </div>
      {(!collapsed||mob)&&(
        <div style={{margin:"0 10px 12px",background:"rgba(255,255,255,.1)",borderRadius:9,padding:3,display:"flex"}}>
          {["admin","teacher"].map(p=><button key={p} onClick={()=>setPortal(p)} style={{flex:1,padding:"5px 0",borderRadius:7,border:"none",cursor:"pointer",background:portal===p?"#fff":"transparent",color:portal===p?G.green:"rgba(255,255,255,.5)",fontSize:11,fontWeight:700,textTransform:"capitalize",transition:"all .18s"}}>{p==="admin"?"Admin":"Teacher"}</button>)}
        </div>
      )}
      <div style={{flex:1,overflowY:"auto",padding:"0 8px"}}>
        {NAV.map(group=>(
          <div key={group.grp} style={{marginBottom:4}}>
            {(!collapsed||mob)&&<div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.28)",textTransform:"uppercase",letterSpacing:1.5,padding:"6px 8px 2px"}}>{group.grp}</div>}
            {group.items.map(item=>{
              const active=portal==="admin"&&view===item.id;
              return(
                <button key={item.id} onClick={()=>go(item.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:(collapsed&&!mob)?"9px 0":"8px 10px",justifyContent:(collapsed&&!mob)?"center":"flex-start",borderRadius:9,border:"none",cursor:"pointer",background:active?"rgba(255,255,255,.18)":"transparent",color:active?"#fff":"rgba(255,255,255,.5)",marginBottom:1,transition:"all .1s",position:"relative"}}
                  onMouseEnter={e=>{if(!active){e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.color="#fff";}}}
                  onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,.5)";}}}
                >
                  {active&&<div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:18,background:G.orange,borderRadius:"0 3px 3px 0"}}/>}
                  <item.icon size={15}/>
                  {(!collapsed||mob)&&<span style={{fontSize:12,fontWeight:active?700:500}}>{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{margin:"6px 8px 0",padding:"10px 10px",background:"rgba(255,255,255,.08)",borderRadius:10,display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:28,height:28,borderRadius:8,background:G.orange,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:11,color:"#fff"}}>{portal==="admin"?"PK":"NW"}</div>
        {(!collapsed||mob)&&<><div style={{flex:1,overflow:"hidden"}}><div style={{fontSize:11,fontWeight:700,color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{portal==="admin"?"Principal Kamau":"Ms. Njeri Wambua"}</div><div style={{fontSize:9,color:"rgba(255,255,255,.4)"}}>{portal==="admin"?"Admin · Greenfields":"Grade 5A Teacher"}</div></div><ChevronDown size={11} color="rgba(255,255,255,.3)"/></>}
      </div>
    </div>
  );

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${G.border};border-radius:2px}
        button:focus,input:focus,textarea:focus,select:focus{outline:none}
        input:focus,textarea:focus{border-color:${G.green}!important;box-shadow:0 0 0 3px ${G.greenPale}}
        @keyframes slideIn{from{transform:translateX(-260px)}to{transform:translateX(0)}}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      `}</style>

      <div style={{display:"flex",height:"100vh",background:G.bg,overflow:"hidden",fontSize:14}}>

        {/* Desktop sidebar */}
        {!mob&&(
          <div style={{width:collapsed?62:218,flexShrink:0,background:`linear-gradient(175deg,${G.greenDk} 0%,${G.greenLt} 100%)`,display:"flex",flexDirection:"column",transition:"width .22s ease",position:"relative",zIndex:10}}>
            <SidebarInner/>
            <button onClick={()=>setCollapsed(!collapsed)} style={{position:"absolute",right:-10,top:66,width:20,height:20,borderRadius:"50%",background:G.card,border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.1)",zIndex:20}}>
              {collapsed?<ChevronRight size={10} color={G.green}/>:<ChevronLeft size={10} color={G.green}/>}
            </button>
          </div>
        )}

        {/* Mobile drawer */}
        {mob&&drawer&&(
          <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",animation:"fadeIn .18s ease"}}>
            <div style={{width:260,background:`linear-gradient(175deg,${G.greenDk},${G.greenLt})`,height:"100%",display:"flex",flexDirection:"column",animation:"slideIn .2s ease",boxShadow:"4px 0 24px rgba(0,0,0,.25)"}}>
              <SidebarInner/>
            </div>
            <div style={{flex:1,background:"rgba(0,0,0,.45)"}} onClick={()=>setDrawer(false)}/>
          </div>
        )}

        {/* More sheet (mobile) */}
        {mob&&moreSheet&&(
          <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end",animation:"fadeIn .15s ease"}}>
            <div style={{background:"rgba(0,0,0,.4)",flex:1}} onClick={()=>setMoreSheet(false)}/>
            <div style={{background:G.card,borderRadius:"20px 20px 0 0",padding:"16px 18px 36px",animation:"slideUp .2s ease",boxShadow:"0 -4px 30px rgba(0,0,0,.15)"}}>
              <div style={{width:40,height:4,background:G.border,borderRadius:2,margin:"0 auto 16px"}}/>
              <div style={{fontSize:12,fontWeight:800,color:G.text,marginBottom:12}}>More Navigation</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {[{id:"teachers",icon:GraduationCap,label:"Teachers"},{id:"timetable",icon:Calendar,label:"Timetable"},{id:"finance",icon:DollarSign,label:"Finance"},{id:"communication",icon:MessageSquare,label:"Messages"},{id:"reports",icon:BarChart2,label:"Reports"},{id:"settings",icon:Settings,label:"Settings"}].map(item=>(
                  <button key={item.id} onClick={()=>go(item.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"14px 8px",borderRadius:12,border:`1px solid ${view===item.id?G.green:G.border}`,background:view===item.id?G.greenPale:G.card,cursor:"pointer"}}>
                    <div style={{width:36,height:36,borderRadius:10,background:view===item.id?G.green:G.bgAlt,display:"flex",alignItems:"center",justifyContent:"center"}}><item.icon size={16} color={view===item.id?"#fff":G.muted}/></div>
                    <span style={{fontSize:10,fontWeight:700,color:view===item.id?G.green:G.muted}}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {/* Top nav */}
          <div style={{height:mob?52:56,background:G.card,borderBottom:`1px solid ${G.border}`,display:"flex",alignItems:"center",padding:`0 ${mob?14:22}px`,gap:12,boxShadow:"0 1px 4px rgba(0,0,0,.04)",flexShrink:0}}>
            {mob&&<button onClick={()=>setDrawer(true)} style={{background:"none",border:"none",cursor:"pointer",color:G.muted,padding:4,flexShrink:0}}><Menu size={20}/></button>}
            {mob&&<div style={{width:26,height:26,borderRadius:7,background:G.orange,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><GraduationCap size={14} color="#fff"/></div>}
            {!mob&&(
              <div style={{flex:1,position:"relative",maxWidth:360}}>
                <Search size={13} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:G.light}}/>
                <input placeholder="Search students, assessments…" style={{width:"100%",paddingLeft:30,paddingRight:12,paddingTop:7,paddingBottom:7,border:`1px solid ${G.border}`,borderRadius:9,fontSize:12,background:G.bg,color:G.text}}/>
              </div>
            )}
            <div style={{flex:1}}/>
            <button style={{width:mob?34:34,height:mob?34:34,borderRadius:9,border:`1px solid ${G.border}`,background:G.card,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",flexShrink:0}}>
              <Bell size={14} color={G.muted}/>
              <div style={{position:"absolute",top:mob?6:7,right:mob?6:7,width:7,height:7,borderRadius:"50%",background:G.orange,border:"2px solid #fff"}}/>
            </button>
            {!mob&&<div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 11px",background:G.greenPale,borderRadius:9}}><div style={{width:6,height:6,borderRadius:"50%",background:G.green}}/><span style={{fontSize:10,fontWeight:700,color:G.green}}>Nairobi Greenfields Academy</span></div>}
            {mob&&<div style={{width:30,height:30,borderRadius:8,background:G.orange,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:11,color:"#fff",flexShrink:0}}>PK</div>}
          </div>

          {/* Content */}
          <div style={{flex:1,overflowY:"auto",padding:mob?14:22,paddingBottom:mob?80:22}}>
            {renderView()}
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      {mob&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,height:64,background:G.card,borderTop:`1px solid ${G.border}`,display:"flex",alignItems:"center",zIndex:100,boxShadow:"0 -4px 20px rgba(0,64,0,.08)"}}>
          {BOTTOM_NAV.map(item=>{
            const active=item.id==="portal"?portal==="teacher":view===item.id;
            const isMore=item.id==="_more";
            const isActive=isMore?moreSheet:active;
            return(
              <button key={item.id} onClick={()=>{if(isMore){setMoreSheet(!moreSheet);}else{go(item.id);setMoreSheet(false);}}} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"8px 0",height:"100%",position:"relative"}}>
                {isActive&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:20,height:3,background:G.orange,borderRadius:"0 0 3px 3px"}}/>}
                <div style={{width:32,height:32,borderRadius:10,background:isActive?G.greenPale:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .15s"}}>
                  <item.icon size={17} color={isActive?G.green:G.light}/>
                </div>
                <span style={{fontSize:9,fontWeight:isActive?800:500,color:isActive?G.green:G.light}}>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
