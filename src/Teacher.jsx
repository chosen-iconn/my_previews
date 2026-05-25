import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  LayoutDashboard, BookOpen, Users, ClipboardList, Activity, Calendar,
  FileText, BookMarked, Send, FolderOpen, BarChart2, Shield, Star,
  Settings, Bell, Search, Menu, X, ChevronLeft, ChevronRight, ChevronDown,
  Plus, Download, Edit, Eye, Trash2, Check, CheckCheck, CheckCircle2,
  AlertCircle, ArrowUp, ArrowDown, Clock, MessageSquare, Zap, Award,
  Target, Lightbulb, Upload, Filter, MoreHorizontal, User, Lock, Phone,
  Mail, Globe, MapPin, RefreshCw, WifiOff, Save, Printer, Heart,
  ThumbsUp, Info, ChevronUp, Home, GraduationCap, TrendingUp, Layers,
  Smile, Frown, Meh
} from "lucide-react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const G = {
  green:"#004000", gd:"#002600", gl:"#005800", gll:"#007A00",
  orange:"#F66000",
  bg:"#F7F9F7", bg2:"#EFF3EF", card:"#FFFFFF",
  text:"#0F172A", muted:"#64748B", light:"#94A3B8",
  border:"#E1E8E1",
  ok:"#10B981", warn:"#F59E0B", err:"#EF4444", info:"#3B82F6",
  purple:"#8B5CF6", pink:"#EC4899", cyan:"#06B6D4",
  gp:"rgba(0,64,0,0.08)", gpb:"rgba(0,64,0,0.15)",
  op:"rgba(246,96,0,0.08)",
};
const P = { EE:G.green, ME:G.info, AE:G.warn, BE:G.err };
const PN = { EE:"Exceeding", ME:"Meeting", AE:"Approaching", BE:"Below" };
const SC = {
  "Mathematics":G.green, "English":G.info, "Kiswahili":G.purple,
  "Science & Technology":G.warn, "Social Studies":G.pink,
  "CRE":G.cyan, "Creative Arts":G.orange, "Physical Education":G.ok,
};

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const LEARNERS = [
  {id:"KE001",name:"Amina Wanjiku",   att:96,lvl:"EE",gpa:82,risk:false,parent:"Fatuma Wanjiku",  phone:"+254 722 001 001"},
  {id:"KE002",name:"Brian Otieno",    att:88,lvl:"ME",gpa:74,risk:false,parent:"James Otieno",    phone:"+254 733 002 002"},
  {id:"KE003",name:"Cynthia Muthoni", att:72,lvl:"AE",gpa:61,risk:true, parent:"Ann Muthoni",     phone:"+254 700 003 003"},
  {id:"KE004",name:"David Kipchoge",  att:94,lvl:"ME",gpa:71,risk:false,parent:"Robert Kipchoge", phone:"+254 711 004 004"},
  {id:"KE005",name:"Esther Achieng",  att:99,lvl:"EE",gpa:89,risk:false,parent:"Ruth Achieng",    phone:"+254 722 005 005"},
  {id:"KE006",name:"Felix Kamau",     att:65,lvl:"BE",gpa:48,risk:true, parent:"Peter Kamau",     phone:"+254 733 006 006"},
  {id:"KE007",name:"Grace Njeri",     att:91,lvl:"ME",gpa:76,risk:false,parent:"Sarah Njeri",     phone:"+254 700 007 007"},
  {id:"KE008",name:"Hassan Abdi",     att:87,lvl:"EE",gpa:84,risk:false,parent:"Mohamed Abdi",   phone:"+254 711 008 008"},
  {id:"KE009",name:"Irene Wambua",    att:93,lvl:"ME",gpa:72,risk:false,parent:"Lucy Wambua",     phone:"+254 722 009 009"},
  {id:"KE010",name:"John Gitau",      att:78,lvl:"AE",gpa:58,risk:true, parent:"Daniel Gitau",   phone:"+254 733 010 010"},
  {id:"KE011",name:"Kendi Mugo",      att:95,lvl:"ME",gpa:78,risk:false,parent:"Mary Mugo",       phone:"+254 700 011 011"},
  {id:"KE012",name:"Leon Mwangi",     att:90,lvl:"ME",gpa:73,risk:false,parent:"Paul Mwangi",     phone:"+254 711 012 012"},
];
const CLASSES = [
  {id:"5A",grade:"Grade 5",stream:"A",count:32,subjects:["Mathematics","Science & Technology"],ct:true, room:"C1",avgAtt:93,avgPerf:74},
  {id:"5B",grade:"Grade 5",stream:"B",count:30,subjects:["Mathematics"],                        ct:false,room:"C2",avgAtt:89,avgPerf:71},
  {id:"6A",grade:"Grade 6",stream:"A",count:28,subjects:["Mathematics","Science & Technology"],ct:false,room:"C3",avgAtt:91,avgPerf:76},
];
const TT = {
  Mon:[{slot:"07:40",end:"08:20",sub:"Mathematics",cls:"5A",room:"C1",done:false},{slot:"08:20",end:"09:00",sub:"Science & Technology",cls:"5A",room:"Lab 1",done:false},{slot:"10:00",end:"10:40",sub:"Mathematics",cls:"5B",room:"C2",done:false},{slot:"11:20",end:"12:00",sub:"Mathematics",cls:"6A",room:"C3",done:false}],
  Tue:[{slot:"07:40",end:"08:20",sub:"Mathematics",cls:"6A",room:"C3",done:false},{slot:"09:00",end:"09:40",sub:"Science & Technology",cls:"5A",room:"Lab 1",done:false},{slot:"10:40",end:"11:20",sub:"Mathematics",cls:"5A",room:"C1",done:false}],
  Wed:[{slot:"08:20",end:"09:00",sub:"Mathematics",cls:"5B",room:"C2",done:false},{slot:"10:00",end:"10:40",sub:"Mathematics",cls:"5A",room:"C1",done:false},{slot:"13:00",end:"13:40",sub:"Science & Technology",cls:"6A",room:"Lab 1",done:false}],
  Thu:[{slot:"07:40",end:"08:20",sub:"Mathematics",cls:"5A",room:"C1",done:false},{slot:"09:00",end:"09:40",sub:"Mathematics",cls:"6A",room:"C3",done:false},{slot:"10:40",end:"11:20",sub:"Science & Technology",cls:"5A",room:"Lab 1",done:false},{slot:"13:40",end:"14:20",sub:"Mathematics",cls:"5B",room:"C2",done:false}],
  Fri:[{slot:"07:40",end:"08:20",sub:"Mathematics",cls:"5A",room:"C1",done:true},{slot:"08:20",end:"09:00",sub:"Science & Technology",cls:"5A",room:"Lab 1",done:true},{slot:"10:00",end:"10:40",sub:"Mathematics",cls:"5B",room:"C2",done:false,now:true},{slot:"10:40",end:"11:20",sub:"Mathematics",cls:"6A",room:"C3",done:false},{slot:"13:00",end:"13:40",sub:"Science & Technology",cls:"6A",room:"Lab 1",done:false}],
};
const ASSIGNMENTS = [
  {id:1,title:"Fractions Worksheet",        cls:"Grade 5A",due:"2026-05-27",submitted:24,total:32,graded:18,status:"active"},
  {id:2,title:"Science Lab Report – Habitats",cls:"Grade 5A",due:"2026-05-28",submitted:30,total:32,graded:30,status:"grading"},
  {id:3,title:"Number Patterns Assessment", cls:"Grade 5B",due:"2026-05-30",submitted:8, total:30,graded:0, status:"active"},
  {id:4,title:"Measurement Practical",      cls:"Grade 6A",due:"2026-06-02",submitted:0, total:28,graded:0, status:"upcoming"},
  {id:5,title:"Term 2 CAT – Mathematics",   cls:"Grade 5A",due:"2026-06-06",submitted:0, total:32,graded:0, status:"upcoming"},
];
const CBC_AREAS = [
  {area:"Mathematics",strands:[
    {strand:"Numbers",subs:["Place Value","Addition & Subtraction","Multiplication & Division","Fractions"]},
    {strand:"Measurement",subs:["Length","Mass","Capacity","Time","Money"]},
    {strand:"Geometry",subs:["Shapes","Lines & Angles","Symmetry"]},
  ]},
  {area:"Science & Technology",strands:[
    {strand:"Living Things",subs:["Habitats","Food Chains","Human Body"]},
    {strand:"Matter",subs:["States of Matter","Properties","Changes"]},
    {strand:"Technology",subs:["Simple Machines","Digital Literacy"]},
  ]},
];
const BEHAVIOR_LOG = [
  {id:1,learner:"Felix Kamau",   type:"concern",  desc:"Disruptive during lesson, repeated talking.",     date:"May 22",action:"Verbal warning, parent notified", sev:"medium"},
  {id:2,learner:"Brian Otieno",  type:"positive", desc:"Helped classmate struggling with fractions.",    date:"May 21",action:"Commended in class",              sev:"positive"},
  {id:3,learner:"Cynthia Muthoni",type:"concern", desc:"3rd consecutive Friday absence unexplained.",    date:"May 17",action:"Parent call initiated",            sev:"high"},
  {id:4,learner:"David Kipchoge",type:"positive", desc:"Won inter-class spelling competition.",          date:"May 15",action:"Certificate awarded",              sev:"positive"},
  {id:5,learner:"John Gitau",    type:"concern",  desc:"Incomplete homework 4 weeks running.",           date:"May 12",action:"One-on-one session scheduled",     sev:"low"},
];
const RESOURCES = [
  {id:1,name:"CBC Grade 5 Mathematics Syllabus",  type:"pdf",  size:"2.4 MB",cat:"Curriculum",    date:"Jan 2026",pinned:true},
  {id:2,name:"Fractions Interactive Slides",       type:"pptx", size:"8.1 MB",cat:"Lesson Material",date:"May 2026",pinned:true},
  {id:3,name:"Science Habitats Video",             type:"video",size:"45 MB", cat:"Media",         date:"Apr 2026",pinned:false},
  {id:4,name:"CBC Assessment Rubric Template",     type:"docx", size:"380 KB",cat:"Assessment",    date:"Mar 2026",pinned:false},
  {id:5,name:"Number Patterns Worksheet",          type:"pdf",  size:"620 KB",cat:"Worksheets",    date:"May 2026",pinned:false},
  {id:6,name:"KICD Grade 5 Schemes of Work",       type:"xlsx", size:"1.1 MB",cat:"Curriculum",    date:"Jan 2026",pinned:true},
];
const SCHEMES = [
  {wk:1,dates:"21–25 Apr",strand:"Numbers",topic:"Place Value to 100,000",comp:100,lessons:4},
  {wk:2,dates:"28 Apr–2 May",strand:"Numbers",topic:"Addition & Subtraction",comp:100,lessons:4},
  {wk:3,dates:"5–9 May",strand:"Numbers",topic:"Multiplication",comp:100,lessons:4},
  {wk:4,dates:"12–16 May",strand:"Numbers",topic:"Division & Remainders",comp:100,lessons:4},
  {wk:5,dates:"19–23 May",strand:"Fractions",topic:"Fractions – Halves & Quarters",comp:80,lessons:3},
  {wk:6,dates:"26–30 May",strand:"Fractions",topic:"Fractions – Thirds & Mixed Numbers",comp:0,lessons:4},
  {wk:7,dates:"2–6 Jun",strand:"Measurement",topic:"Length & Estimation",comp:0,lessons:4},
  {wk:8,dates:"9–13 Jun",strand:"Measurement",topic:"Mass & Weighing Activities",comp:0,lessons:4},
];
const INBOX = [
  {id:1,from:"Principal Kamau",  av:"PK",type:"admin",  msg:"Mid-term assessment schedule released. CBC portfolios due 30th May.",time:"2h ago",read:false,priority:true},
  {id:2,from:"Fatuma Wanjiku",   av:"FW",type:"parent", msg:"Amina will miss Thursday for a medical appointment.",             time:"3h ago",read:false,priority:false},
  {id:3,from:"HOD Mathematics",  av:"HM",type:"hod",    msg:"Moderation meeting moved to Tuesday 10:00 AM.",                  time:"Yesterday",read:true,priority:false},
  {id:4,from:"Deputy Principal", av:"DP",type:"admin",  msg:"CBC professional development workshop – Saturday 1st June.",     time:"Yesterday",read:true,priority:false},
  {id:5,from:"Peter Kamau",      av:"PK2",type:"parent",msg:"Felix was unwell. Returns Monday with sick note.",               time:"2 days ago",read:true,priority:true},
];
const NOTIFS_D = [
  {id:1,icon:"⚠️",title:"At-Risk Alert",    body:"Felix Kamau attendance below 70%.",            color:G.err, time:"Just now", read:false},
  {id:2,icon:"📋",title:"Assessment Due",   body:"Grade 5A Fractions assessment due in 2 days.", color:G.warn,time:"1h ago",   read:false},
  {id:3,icon:"✅",title:"Register Saved",   body:"Grade 5A attendance submitted successfully.",  color:G.ok,  time:"2h ago",   read:false},
  {id:4,icon:"💬",title:"Parent Message",   body:"New message from Fatuma Wanjiku.",              color:G.info,time:"3h ago",   read:true},
  {id:5,icon:"🎯",title:"CBC Progress",     body:"Grade 5A Mathematics completion reached 82%.", color:G.green,time:"Yesterday",read:true},
  {id:6,icon:"📅",title:"Event Reminder",  body:"Moderation meeting Tuesday 10:00 AM.",          color:G.purple,time:"Yesterday",read:true},
];
const PERF_TREND  = [{m:"Jan",avg:68},{m:"Feb",avg:71},{m:"Mar",avg:70},{m:"Apr",avg:74},{m:"May",avg:76}];
const ATT_TREND   = [{m:"Jan",r:88},{m:"Feb",r:91},{m:"Mar",r:89},{m:"Apr",r:93},{m:"May",r:94}];
const RADAR_D     = [{s:"Numbers",v:82},{s:"Measure",v:74},{s:"Geometry",v:68},{s:"Data",v:71},{s:"Algebra",v:65}];
const HM_WEEKS    = [
  {label:"Apr 28",days:[91,88,93,85,92]},{label:"May 5",days:[94,96,90,87,95]},
  {label:"May 12",days:[88,92,94,93,91]},{label:"May 19",days:[96,95,97,94,98]},
  {label:"May 26",days:[93,94,0,0,0]},
];

// ─── SHARED ATOMS ─────────────────────────────────────────────────────────────
const avBg  = i => ["#e0f0e0","#e0eaf8","#fdf0e0","#f0e0f4","#e0f4ec","#fce8e0","#e8f0fe","#f0f8e8","#fef0e8","#e8fef0","#f8e8fe","#e8f8fe"][i%12];
const avTx  = i => ["#1a5c1a","#1a3a7c","#7c5c1a","#6c1a6c","#1a5c3a","#7c2a1a","#1a3a7c","#3a5c1a","#7c4a1a","#1a7c5a","#5a1a7c","#1a5a7c"][i%12];
const avInit = n => n.split(" ").map(w=>w[0]).join("").slice(0,2);

function Av({name,idx=0,size=34}){
  return <div style={{width:size,height:size,borderRadius:size*0.28,background:avBg(idx),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:size*0.36,color:avTx(idx),flexShrink:0}}>{avInit(name)}</div>;
}
function Card({children,style={},onClick}){
  return <div onClick={onClick} style={{background:G.card,borderRadius:15,border:`1px solid ${G.border}`,boxShadow:"0 1px 5px rgba(0,64,0,0.05)",padding:"18px 20px",...style,cursor:onClick?"pointer":"default"}}>{children}</div>;
}
function Pill({level,sm}){
  const c=P[level];
  return <span style={{background:`${c}18`,color:c,border:`1px solid ${c}25`,borderRadius:20,padding:sm?"2px 7px":"3px 10px",fontSize:sm?10:11,fontWeight:700,whiteSpace:"nowrap"}}>{sm?level:`${level} · ${PN[level]}`}</span>;
}
function Chip({children,color=G.green,sm}){
  return <span style={{background:`${color}12`,color,border:`1px solid ${color}22`,fontSize:sm?10:11,fontWeight:700,padding:sm?"2px 8px":"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{children}</span>;
}
function Tag({children,color=G.muted}){
  return <span style={{background:`${color}15`,color,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:5,letterSpacing:.3,textTransform:"uppercase"}}>{children}</span>;
}
function Btn({children,variant="green",icon:I,sm,onClick,style={},disabled}){
  const v={
    green:{bg:G.green,tx:"#fff",bd:"none"},
    orange:{bg:G.orange,tx:"#fff",bd:"none"},
    ghost:{bg:"transparent",tx:G.muted,bd:`1px solid ${G.border}`},
    pale:{bg:G.gp,tx:G.green,bd:"none"},
  }[variant]||{bg:G.green,tx:"#fff",bd:"none"};
  return <button disabled={disabled} onClick={onClick} style={{display:"flex",alignItems:"center",gap:5,padding:sm?"6px 12px":"8px 16px",borderRadius:9,border:v.bd,background:v.bg,color:v.tx,fontSize:sm?11:12,fontWeight:700,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,transition:"opacity .15s",...style}}>{I&&<I size={sm?12:13}/>}{children}</button>;
}
function SH({title,sub,right,mb=14}){
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:mb}}><div><div style={{fontSize:14,fontWeight:800,color:G.text,letterSpacing:-.2}}>{title}</div>{sub&&<div style={{fontSize:11,color:G.muted,marginTop:2}}>{sub}</div>}</div>{right}</div>;
}
function ProgressBar({value,max=100,color=G.green,height=6,label}){
  return <div><div style={{height,background:G.bg2,borderRadius:height,overflow:"hidden"}}><div style={{width:`${(value/max)*100}%`,height:"100%",background:color,borderRadius:height,transition:"width .5s ease"}}/></div>{label&&<div style={{display:"flex",justifyContent:"space-between",marginTop:3}}><span style={{fontSize:10,color:G.muted}}>{label}</span><span style={{fontSize:10,fontWeight:700,color}}>{value}%</span></div>}</div>;
}
function Toggle({on,onChange}){
  return <button onClick={()=>onChange(!on)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:on?G.green:G.bg2,position:"relative",transition:"background .2s",flexShrink:0}}><div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:on?21:3,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/></button>;
}
function Section({children}){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>{children}</div>;
}
function Skeleton({h=20,w="100%",r=8}){
  return <div style={{height:h,width:w,borderRadius:r,background:"linear-gradient(90deg,#e8ede8 25%,#f0f5f0 50%,#e8ede8 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite"}}/>; 
}
function EmptyState({icon:I=BookOpen,title,sub,cta,onCta}){
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"48px 24px",gap:12,textAlign:"center"}}>
    <div style={{width:60,height:60,borderRadius:18,background:G.gp,display:"flex",alignItems:"center",justifyContent:"center"}}><I size={26} color={G.green}/></div>
    <div style={{fontSize:16,fontWeight:800,color:G.text}}>{title}</div>
    <div style={{fontSize:12,color:G.muted,maxWidth:260}}>{sub}</div>
    {cta&&<Btn icon={Plus} onClick={onCta}>{cta}</Btn>}
  </div>;
}

// ─── VIEW: DASHBOARD ──────────────────────────────────────────────────────────
function DashboardView({mob}){
  const risk = LEARNERS.filter(l=>l.risk);
  return <Section>
    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
      <div>
        <div style={{fontSize:mob?17:21,fontWeight:800,color:G.text,letterSpacing:-.4}}>Good morning, Ms. Wambua 👋</div>
        <div style={{fontSize:11,color:G.muted,marginTop:2}}>Friday 24 May · Term 2 Week 11 · Nairobi Greenfields Academy</div>
      </div>
      {!mob&&<div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Download}>Export</Btn><Btn icon={Plus}>Quick Action</Btn></div>}
    </div>

    {/* Metric strip */}
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(5,1fr)",gap:10}}>
      {[
        {l:"Today's Lessons",v:"5",sub:"2 completed",c:G.green,i:BookOpen},
        {l:"Pending Assessments",v:"8",sub:"Grade 5A due Tue",c:G.warn,i:ClipboardList},
        {l:"Attendance",v:"94%",sub:"28 classes tracked",c:G.ok,i:Activity},
        {l:"Avg Performance",v:"76%",sub:"↑ 2% this term",c:G.info,i:TrendingUp},
        {l:"Unread Messages",v:"2",sub:"1 parent, 1 admin",c:G.orange,i:MessageSquare},
      ].map(({l,v,sub,c,i:Icon},idx)=>(
        <Card key={l} style={{padding:"14px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{width:32,height:32,borderRadius:9,background:`${c}14`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={15} color={c}/></div>
          </div>
          <div style={{fontSize:mob?18:22,fontWeight:800,color:c,lineHeight:1}}>{v}</div>
          <div style={{fontSize:11,fontWeight:700,color:G.text,marginTop:3}}>{l}</div>
          <div style={{fontSize:10,color:G.muted,marginTop:1}}>{sub}</div>
        </Card>
      ))}
    </div>

    {/* Main grid */}
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"2fr 1fr",gap:14}}>
      {/* Today's timetable */}
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 18px 12px"}}><SH title="Today's Schedule" sub="Friday 24 May · 5 lessons" mb={0}/></div>
        {(TT.Fri||[]).map((l,i)=>{
          const sc=SC[l.sub]||G.green;
          return <div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"10px 18px",borderTop:`1px solid ${G.border}`,background:l.now?G.gp:l.done?G.bg2:G.card}}>
            <div style={{width:3,height:36,borderRadius:2,background:l.done?G.light:l.now?sc:G.border,flexShrink:0}}/>
            <div style={{width:mob?56:68,flexShrink:0}}>
              <div style={{fontSize:11,fontWeight:l.now?700:500,color:l.now?sc:G.muted}}>{l.slot}</div>
              {l.now&&<div style={{fontSize:9,fontWeight:800,color:sc}}>● NOW</div>}
              {l.done&&<div style={{fontSize:9,color:G.ok}}>✓ Done</div>}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:l.done?G.muted:G.text}}>{l.sub}</div>
              <div style={{fontSize:10,color:G.muted}}>Grade {l.cls} · {l.room}</div>
            </div>
            <div style={{background:`${sc}12`,color:sc,fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:7}}>{l.cls}</div>
          </div>;
        })}
      </Card>

      {/* Right column */}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {/* At-risk alert */}
        <div style={{background:`linear-gradient(135deg,#7f1d1d,${G.err})`,borderRadius:14,padding:"16px 18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <AlertCircle size={16} color="#fff"/>
            <span style={{fontSize:13,fontWeight:800,color:"#fff"}}>Learner Alerts</span>
            <span style={{marginLeft:"auto",background:"rgba(255,255,255,.2)",borderRadius:12,padding:"2px 8px",fontSize:11,fontWeight:800,color:"#fff"}}>{risk.length}</span>
          </div>
          {risk.map((r,i)=><div key={r.id} style={{background:"rgba(255,255,255,.1)",borderRadius:9,padding:"9px 12px",marginBottom:i<risk.length-1?7:0}}>
            <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{r.name}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.65)",marginTop:2}}>Att: {r.att}% · Level: {r.lvl} · GPA: {r.gpa}%</div>
          </div>)}
          <button style={{marginTop:10,width:"100%",padding:"7px",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.25)",borderRadius:8,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>View Interventions</button>
        </div>

        {/* Quick actions */}
        <Card style={{padding:"14px 16px"}}>
          <div style={{fontSize:12,fontWeight:800,color:G.text,marginBottom:10}}>Quick Actions</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            {[
              {l:"Take Attendance",icon:Activity,c:G.green},
              {l:"Enter Grades",icon:ClipboardList,c:G.info},
              {l:"Message Parent",icon:MessageSquare,c:G.orange},
              {l:"Add Assignment",icon:Plus,c:G.purple},
            ].map(({l,icon:I,c})=>(
              <button key={l} style={{padding:"10px 8px",borderRadius:10,border:`1px solid ${G.border}`,background:G.card,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:5,transition:"all .12s"}} onMouseEnter={e=>{e.currentTarget.style.background=G.gp;e.currentTarget.style.borderColor=G.gpb;}} onMouseLeave={e=>{e.currentTarget.style.background=G.card;e.currentTarget.style.borderColor=G.border;}}>
                <div style={{width:28,height:28,borderRadius:8,background:`${c}14`,display:"flex",alignItems:"center",justifyContent:"center"}}><I size={13} color={c}/></div>
                <span style={{fontSize:10,fontWeight:700,color:G.text,textAlign:"center",lineHeight:1.3}}>{l}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>

    {/* Charts row */}
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:14}}>
      <Card>
        <SH title="Class Performance" sub="Grade 5A · Monthly avg"/>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={PERF_TREND}>
            <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={G.green} stopOpacity={.2}/><stop offset="95%" stopColor={G.green} stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={G.border}/>
            <XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/>
            <YAxis domain={[60,100]} tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}} formatter={v=>[`${v}%`]}/>
            <Area type="monotone" dataKey="avg" stroke={G.green} strokeWidth={2.5} fill="url(#pg)" dot={{fill:G.green,r:3}}/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <SH title="Attendance Trend" sub="Grade 5A · 2026"/>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={ATT_TREND}>
            <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={G.ok} stopOpacity={.2}/><stop offset="95%" stopColor={G.ok} stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={G.border}/>
            <XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/>
            <YAxis domain={[80,100]} tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}} formatter={v=>[`${v}%`]}/>
            <Area type="monotone" dataKey="r" stroke={G.ok} strokeWidth={2.5} fill="url(#ag)" dot={{fill:G.ok,r:3}}/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <SH title="CBC Competencies" sub="Grade 5A · Mathematics"/>
        <ResponsiveContainer width="100%" height={140}>
          <RadarChart data={RADAR_D}>
            <PolarGrid stroke={G.border}/>
            <PolarAngleAxis dataKey="s" tick={{fontSize:9,fill:G.muted}}/>
            <Radar dataKey="v" stroke={G.orange} fill={G.orange} fillOpacity={.18} strokeWidth={2}/>
            <Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}}/>
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    </div>

    {/* AI Panel */}
    <Card style={{background:`linear-gradient(155deg,${G.gd},${G.gl})`,border:"none",boxShadow:"0 6px 24px rgba(0,64,0,.25)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{width:32,height:32,borderRadius:10,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={16} color="#fff"/></div>
        <div><div style={{fontSize:14,fontWeight:800,color:"#fff"}}>AI Teaching Insights</div><div style={{fontSize:10,color:"rgba(255,255,255,.5)"}}>Powered by eGrade AI · Updated 6:00 AM</div></div>
        <span style={{marginLeft:"auto",background:"rgba(246,96,0,.3)",color:G.orange,border:"1px solid rgba(246,96,0,.4)",borderRadius:12,padding:"3px 10px",fontSize:10,fontWeight:800}}>3 new insights</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:10}}>
        {[
          {icon:"🎯",tag:"Performance",text:"Esther Achieng & Hassan Abdi are ready for enrichment tasks — they're scoring EE consistently.",color:G.orange},
          {icon:"⚠️",tag:"Intervention",text:"Felix Kamau and John Gitau need structured support. Suggest paired learning with stronger peers.",color:G.err},
          {icon:"📈",tag:"Pacing",text:"Grade 5A is 1 week ahead in fractions. Consider introducing decimals preview next week.",color:G.info},
        ].map((x,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,.08)",borderRadius:11,padding:"12px 14px",borderLeft:`3px solid ${x.color}`}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,.5)",marginBottom:5}}>{x.icon} {x.tag}</div>
            <div style={{fontSize:12,color:"#fff",lineHeight:1.6}}>{x.text}</div>
          </div>
        ))}
      </div>
    </Card>
  </Section>;
}

// ─── VIEW: MY CLASSES ─────────────────────────────────────────────────────────
function ClassesView({mob,setView,setCtx}){
  const [sel,setSel]=useState(null);
  if(sel){
    const cls=CLASSES.find(c=>c.id===sel);
    return <Section>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setSel(null)} style={{width:32,height:32,borderRadius:8,border:`1px solid ${G.border}`,background:G.card,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={14} color={G.muted}/></button>
        <div><div style={{fontSize:17,fontWeight:800,color:G.text}}>Grade {cls.id} — {cls.grade} {cls.stream}</div><div style={{fontSize:11,color:G.muted}}>{cls.count} learners · {cls.room} · {cls.subjects.join(", ")}</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
        {[{l:"Learners",v:cls.count,c:G.green},{l:"Avg Attendance",v:`${cls.avgAtt}%`,c:G.ok},{l:"Avg Performance",v:`${cls.avgPerf}%`,c:G.info},{l:"CBC Complete",v:"79%",c:G.orange}].map(({l,v,c})=>(
          <Card key={l} style={{padding:"13px 15px",textAlign:"center"}}>
            <div style={{fontSize:mob?18:22,fontWeight:800,color:c}}>{v}</div>
            <div style={{fontSize:11,color:G.muted,marginTop:3}}>{l}</div>
          </Card>
        ))}
      </div>
      <Card>
        <SH title="Class Roster" sub={`${cls.count} learners`} right={<Btn icon={Plus} sm>Add Learner</Btn>}/>
        {LEARNERS.map((l,i)=>(
          <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:i>0?`1px solid ${G.border}`:"none"}}>
            <Av name={l.name} idx={i} size={34}/>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{l.name}</div><div style={{fontSize:10,color:G.muted}}>{l.id}</div></div>
            <Pill level={l.lvl} sm/>
            <div style={{fontSize:11,fontWeight:600,color:l.att>90?G.ok:l.att>75?G.warn:G.err}}>{l.att}%</div>
            {l.risk&&<AlertCircle size={13} color={G.err}/>}
          </div>
        ))}
      </Card>
    </Section>;
  }
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>My Classes</div><div style={{fontSize:11,color:G.muted}}>3 classes · Term 2 2026</div></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:14}}>
      {CLASSES.map((cls,ci)=>(
        <Card key={cls.id} onClick={()=>setSel(cls.id)} style={{padding:"18px 20px",cursor:"pointer",transition:"all .15s",borderTop:`4px solid ${ci===0?G.green:ci===1?G.info:G.orange}`}} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 20px rgba(0,64,0,.12)";}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 5px rgba(0,64,0,.05)";}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontSize:20,fontWeight:800,color:G.text}}>Grade {cls.id}</div>
              <div style={{fontSize:12,color:G.muted}}>{cls.grade} · Stream {cls.stream}</div>
            </div>
            {cls.ct&&<Chip color={G.orange}>Class Teacher</Chip>}
          </div>
          <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
            {cls.subjects.map(s=><Tag key={s} color={SC[s]||G.green}>{s}</Tag>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
            {[{l:"Learners",v:cls.count},{l:"Room",v:cls.room}].map(({l,v})=>(
              <div key={l} style={{background:G.bg,borderRadius:9,padding:"8px 10px"}}>
                <div style={{fontSize:9,color:G.muted,textTransform:"uppercase",fontWeight:700}}>{l}</div>
                <div style={{fontSize:14,fontWeight:800,color:G.text,marginTop:2}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:4}}><ProgressBar value={cls.avgAtt} label="Avg Attendance" color={G.ok}/></div>
          <ProgressBar value={cls.avgPerf} label="Avg Performance" color={G.green}/>
        </Card>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: LEARNER MANAGEMENT ─────────────────────────────────────────────────
function LearnersView({mob}){
  const [sel,setSel]=useState(null);
  const [q,setQ]=useState("");
  const filtered=LEARNERS.filter(l=>l.name.toLowerCase().includes(q.toLowerCase()));
  if(sel){
    const l=LEARNERS.find(x=>x.id===sel);
    const i=LEARNERS.indexOf(l);
    const cbcData=[{s:"Numbers",v:l.gpa},{s:"Measure",v:l.gpa-6},{s:"Geometry",v:l.gpa-12},{s:"Data",v:l.gpa-4},{s:"Language",v:l.gpa+3}];
    return <Section>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setSel(null)} style={{width:32,height:32,borderRadius:8,border:`1px solid ${G.border}`,background:G.card,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={14} color={G.muted}/></button>
        <div style={{fontSize:16,fontWeight:800,color:G.text}}>Learner Profile</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"280px 1fr",gap:14}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card style={{textAlign:"center",padding:"24px 20px"}}>
            <Av name={l.name} idx={i} size={64}/>
            <div style={{fontSize:16,fontWeight:800,color:G.text,marginTop:10}}>{l.name}</div>
            <div style={{fontSize:11,color:G.muted,marginTop:2}}>{l.id} · Grade 5A</div>
            <div style={{marginTop:10}}><Pill level={l.lvl}/></div>
            {l.risk&&<div style={{marginTop:8,padding:"6px 10px",background:`${G.err}12`,borderRadius:8,fontSize:10,fontWeight:700,color:G.err}}>⚠ Intervention Flagged</div>}
          </Card>
          <Card>
            <div style={{fontSize:11,fontWeight:800,color:G.text,marginBottom:10}}>Parent / Guardian</div>
            {[{icon:User,v:l.parent},{icon:Phone,v:l.phone},{icon:Mail,v:"parent@email.ke"}].map(({icon:Icon,v})=>(
              <div key={v} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><Icon size={12} color={G.muted}/><span style={{fontSize:11,color:G.muted}}>{v}</span></div>
            ))}
            <Btn variant="pale" icon={MessageSquare} style={{marginTop:6,width:"100%",justifyContent:"center"}}>Message Parent</Btn>
          </Card>
          <Card>
            {[{l:"Attendance",v:`${l.att}%`,c:l.att>90?G.ok:G.warn},{l:"GPA",v:`${l.gpa}%`,c:G.info},{l:"CBC Level",v:PN[l.lvl],c:P[l.lvl]}].map(({l:lb,v,c})=>(
              <div key={lb} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
                <span style={{fontSize:11,color:G.muted}}>{lb}</span><span style={{fontSize:12,fontWeight:700,color:c}}>{v}</span>
              </div>
            ))}
          </Card>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card>
            <SH title="CBC Competency Profile" sub="Strand-level mastery"/>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={cbcData}>
                <PolarGrid stroke={G.border}/><PolarAngleAxis dataKey="s" tick={{fontSize:10,fill:G.muted}}/>
                <Radar dataKey="v" stroke={P[l.lvl]} fill={P[l.lvl]} fillOpacity={.2} strokeWidth={2}/>
                <Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}}/>
              </RadarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <SH title="Assessment History" sub="Last 5 assessments"/>
            {[{t:"Fractions Quiz",d:"May 20",s:78,lvl:"ME"},{t:"Number Patterns",d:"May 12",s:82,lvl:"ME"},{t:"Division CAT",d:"May 5",s:74,lvl:"ME"},{t:"Place Value",d:"Apr 28",s:86,lvl:"EE"},{t:"Multiplication",d:"Apr 21",s:70,lvl:"ME"}].map((a,ai)=>(
              <div key={ai} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:ai<4?`1px solid ${G.border}`:"none"}}>
                <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:G.text}}>{a.t}</div><div style={{fontSize:10,color:G.muted}}>{a.d}</div></div>
                <div style={{fontSize:14,fontWeight:800,color:P[a.lvl]}}>{a.s}%</div>
                <Pill level={a.lvl} sm/>
              </div>
            ))}
          </Card>
          <Card>
            <SH title="Teacher Notes" sub="Observations and comments"/>
            <textarea defaultValue={`${l.name} is performing at the ${PN[l.lvl]} level. ${l.risk?"Requires targeted intervention and parent engagement. ":"Steady progress observed. "}Continue monitoring and providing differentiated support.`} rows={4} style={{width:"100%",padding:"10px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,color:G.text,resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
            <Btn icon={Save} sm style={{marginTop:8}}>Save Notes</Btn>
          </Card>
        </div>
      </div>
    </Section>;
  }
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Learner Management</div><div style={{fontSize:11,color:G.muted}}>Grade 5A · {LEARNERS.length} learners</div></div>
    </div>
    <div style={{position:"relative"}}>
      <Search size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:G.light,pointerEvents:"none"}}/>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search learners…" style={{width:"100%",paddingLeft:32,paddingRight:12,paddingTop:9,paddingBottom:9,border:`1px solid ${G.border}`,borderRadius:10,fontSize:12,outline:"none",background:G.card,color:G.text,boxSizing:"border-box"}}/>
    </div>
    {mob?(
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {filtered.map((l,i)=>(
          <Card key={l.id} onClick={()=>setSel(l.id)} style={{padding:"14px 16px",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Av name={l.name} idx={i} size={40}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:G.text}}>{l.name}</div><div style={{fontSize:10,color:G.muted}}>{l.id}</div></div>
              {l.risk&&<AlertCircle size={14} color={G.err}/>}<Pill level={l.lvl} sm/>
            </div>
            <div style={{display:"flex",gap:16,marginTop:10,paddingTop:10,borderTop:`1px solid ${G.border}`}}>
              <div><div style={{fontSize:9,color:G.muted,fontWeight:700,textTransform:"uppercase"}}>Attendance</div><div style={{fontSize:13,fontWeight:800,color:l.att>90?G.ok:G.warn}}>{l.att}%</div></div>
              <div><div style={{fontSize:9,color:G.muted,fontWeight:700,textTransform:"uppercase"}}>GPA</div><div style={{fontSize:13,fontWeight:800,color:G.info}}>{l.gpa}%</div></div>
            </div>
          </Card>
        ))}
      </div>
    ):(
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 120px 100px 60px",padding:"10px 18px",background:G.bg2,borderBottom:`1px solid ${G.border}`}}>
          {["Learner","Attendance","GPA","CBC Level","Status",""].map(h=><div key={h} style={{fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.7}}>{h}</div>)}
        </div>
        {filtered.map((l,i)=>(
          <div key={l.id} onClick={()=>setSel(l.id)} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 120px 100px 60px",padding:"12px 18px",alignItems:"center",borderBottom:i<filtered.length-1?`1px solid ${G.border}`:"none",cursor:"pointer",transition:"background .1s"}} onMouseEnter={e=>e.currentTarget.style.background=G.bg} onMouseLeave={e=>e.currentTarget.style.background=""}>
            <div style={{display:"flex",alignItems:"center",gap:10}}><Av name={l.name} idx={i} size={32}/><div><div style={{fontSize:13,fontWeight:600,color:G.text}}>{l.name}</div><div style={{fontSize:10,color:G.light}}>{l.id}</div></div></div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:48,height:5,background:G.bg2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${l.att}%`,height:"100%",background:l.att>90?G.ok:G.warn,borderRadius:3}}/></div><span style={{fontSize:12,fontWeight:600,color:G.text}}>{l.att}%</span></div>
            <div style={{fontSize:13,fontWeight:700,color:G.info}}>{l.gpa}%</div>
            <Pill level={l.lvl} sm/>
            <div style={{display:"flex",alignItems:"center",gap:5}}>{l.risk&&<AlertCircle size={12} color={G.err}/>}<span style={{fontSize:11,fontWeight:700,color:l.risk?G.err:G.ok}}>{l.risk?"At Risk":"Active"}</span></div>
            <button style={{padding:"5px 7px",borderRadius:7,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",color:G.muted}}><Eye size={12}/></button>
          </div>
        ))}
      </Card>
    )}
  </Section>;
}

// ─── VIEW: CBC ASSESSMENT ─────────────────────────────────────────────────────
function CBCView({mob}){
  const [areaIdx,setAreaIdx]=useState(0);
  const [strandIdx,setStrandIdx]=useState(0);
  const [subIdx,setSubIdx]=useState(0);
  const levels=["EE","ME","AE","BE"];
  const area=CBC_AREAS[areaIdx];
  const strand=area.strands[strandIdx];
  const sub=strand.subs[subIdx];
  const [grades,setGrades]=useState(()=>{
    const g={};
    LEARNERS.forEach(l=>{g[l.id]=l.lvl;});
    return g;
  });
  const [comments,setComments]=useState({});
  const [saved,setSaved]=useState(false);
  const counts=levels.reduce((a,l)=>({...a,[l]:Object.values(grades).filter(v=>v===l).length}),{});
  const doSave=()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);};

  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>CBC Assessment Entry</div><div style={{fontSize:11,color:G.muted}}>Grade 5A · Click cells to assign performance levels</div></div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {saved&&<div style={{display:"flex",alignItems:"center",gap:5,padding:"6px 12px",background:`${G.ok}15`,borderRadius:8}}><CheckCircle2 size={13} color={G.ok}/><span style={{fontSize:11,fontWeight:700,color:G.ok}}>Saved!</span></div>}
        <Btn icon={Save} onClick={doSave}>Save All</Btn>
      </div>
    </div>

    {/* Area selector */}
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {CBC_AREAS.map((a,i)=>(
        <button key={i} onClick={()=>{setAreaIdx(i);setStrandIdx(0);setSubIdx(0);}} style={{padding:"8px 16px",borderRadius:10,fontSize:12,fontWeight:700,background:areaIdx===i?G.green:G.card,color:areaIdx===i?"#fff":G.muted,border:areaIdx===i?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{a.area}</button>
      ))}
    </div>

    {/* Strand > Sub navigation */}
    <Card style={{padding:"14px 16px",background:G.gp,border:`1px solid ${G.gpb}`}}>
      <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
        <div>
          <div style={{fontSize:9,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.8}}>Strand</div>
          <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}>
            {area.strands.map((s,i)=>(
              <button key={i} onClick={()=>{setStrandIdx(i);setSubIdx(0);}} style={{padding:"5px 12px",borderRadius:8,fontSize:11,fontWeight:700,background:strandIdx===i?G.green:"rgba(255,255,255,.7)",color:strandIdx===i?"#fff":G.muted,border:strandIdx===i?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{s.strand}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:9,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.8}}>Sub-Strand</div>
          <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}>
            {strand.subs.map((s,i)=>(
              <button key={i} onClick={()=>setSubIdx(i)} style={{padding:"5px 12px",borderRadius:8,fontSize:11,fontWeight:700,background:subIdx===i?G.orange:"rgba(255,255,255,.7)",color:subIdx===i?"#fff":G.muted,border:subIdx===i?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{marginTop:10,padding:"6px 10px",background:"rgba(255,255,255,.5)",borderRadius:7,display:"inline-block"}}>
        <span style={{fontSize:11,fontWeight:700,color:G.green}}>{area.area} › {strand.strand} › {sub}</span>
      </div>
    </Card>

    {/* Legend */}
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {levels.map(l=><div key={l} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",background:G.card,borderRadius:8,border:`1px solid ${G.border}`}}><div style={{width:8,height:8,borderRadius:2,background:P[l]}}/><span style={{fontSize:10,fontWeight:700,color:G.text}}>{l}</span><span style={{fontSize:10,color:G.muted}}>— {PN[l]}</span></div>)}
    </div>

    {/* Grading grid */}
    <Card style={{padding:0,overflow:"hidden"}}>
      {!mob&&<div style={{display:"grid",gridTemplateColumns:"180px repeat(4,1fr) 140px 180px",padding:"10px 18px",background:G.bg2,borderBottom:`1px solid ${G.border}`}}>
        {["Learner","EE","ME","AE","BE","Level","Comment"].map(h=><div key={h} style={{fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.7,textAlign:["EE","ME","AE","BE"].includes(h)?"center":"left"}}>{h}</div>)}
      </div>}
      {LEARNERS.map((l,ri)=>{
        const g=grades[l.id];
        return mob?(
          <div key={l.id} style={{padding:"12px 16px",borderBottom:ri<LEARNERS.length-1?`1px solid ${G.border}`:"none",background:ri%2===0?G.card:G.bg}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <Av name={l.name} idx={ri} size={30}/>
              <div style={{flex:1,fontSize:12,fontWeight:700,color:G.text}}>{l.name}</div>
              <Pill level={g} sm/>
            </div>
            <div style={{display:"flex",gap:6}}>
              {levels.map(lv=><button key={lv} onClick={()=>setGrades(p=>({...p,[l.id]:lv}))} style={{flex:1,padding:"10px 0",borderRadius:9,border:"none",cursor:"pointer",background:g===lv?P[lv]:`${P[lv]}18`,color:g===lv?"#fff":P[lv],fontWeight:800,fontSize:12,transition:"all .15s",transform:g===lv?"scale(1.04)":"scale(1)"}}>{lv}</button>)}
            </div>
          </div>
        ):(
          <div key={l.id} style={{display:"grid",gridTemplateColumns:"180px repeat(4,1fr) 140px 180px",padding:"10px 18px",alignItems:"center",borderBottom:ri<LEARNERS.length-1?`1px solid ${G.border}`:"none",background:ri%2===0?G.card:G.bg}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><Av name={l.name} idx={ri} size={28}/><div style={{fontSize:12,fontWeight:600,color:G.text}}>{l.name}</div></div>
            {levels.map(lv=><div key={lv} style={{display:"flex",justifyContent:"center"}}>
              <button onClick={()=>setGrades(p=>({...p,[l.id]:lv}))} style={{width:36,height:36,borderRadius:10,border:"none",cursor:"pointer",background:g===lv?P[lv]:`${P[lv]}18`,color:g===lv?"#fff":P[lv],fontWeight:800,fontSize:11,transform:g===lv?"scale(1.1)":"scale(1)",transition:"all .15s",boxShadow:g===lv?`0 2px 8px ${P[lv]}55`:"none"}}>{lv}</button>
            </div>)}
            <Pill level={g} sm/>
            <input value={comments[l.id]||""} onChange={e=>setComments(p=>({...p,[l.id]:e.target.value}))} placeholder="Add comment…" style={{fontSize:11,padding:"5px 8px",borderRadius:7,border:`1px solid ${G.border}`,outline:"none",width:"100%",boxSizing:"border-box"}}/>
          </div>
        );
      })}
    </Card>

    {/* Summary */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      {levels.map(l=>(
        <div key={l} style={{background:G.card,borderRadius:13,padding:"13px 15px",border:`1px solid ${G.border}`,borderLeft:`4px solid ${P[l]}`}}>
          <div style={{fontSize:22,fontWeight:800,color:P[l]}}>{counts[l]}</div>
          <div style={{fontSize:11,fontWeight:700,color:G.text}}>{PN[l]}</div>
          <div style={{fontSize:10,color:G.muted}}>{Math.round((counts[l]/LEARNERS.length)*100)}% of class</div>
        </div>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: ATTENDANCE ─────────────────────────────────────────────────────────
function AttendanceView({mob}){
  const [att,setAtt]=useState(()=>Object.fromEntries(LEARNERS.map(l=>[l.id,l.att>75?"P":"A"])));
  const [submitted,setSubmitted]=useState(false);
  const P2=Object.values(att).filter(v=>v==="P").length;
  const A2=Object.values(att).filter(v=>v==="A").length;
  const L2=Object.values(att).filter(v=>v==="L").length;
  const hm=r=>{if(r===0)return G.bg2;if(r>=95)return G.green;if(r>=90)return "#2d7a2d";if(r>=85)return "#5aaa5a";if(r>=80)return "#8dcf8d";return G.warn;};
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Attendance</div><div style={{fontSize:11,color:G.muted}}>Friday 24 May · Grade 5A · 09:00 AM lesson</div></div>
      {!submitted?<Btn icon={CheckCheck} onClick={()=>setSubmitted(true)}>Submit Register</Btn>:<div style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",background:`${G.ok}15`,borderRadius:9}}><CheckCircle2 size={14} color={G.ok}/><span style={{fontSize:12,fontWeight:700,color:G.ok}}>Submitted 09:04 AM</span></div>}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
      {[{l:"Present",v:P2,c:G.ok},{l:"Absent",v:A2,c:G.err},{l:"Late",v:L2,c:G.warn}].map(x=>(
        <div key={x.l} style={{background:G.card,borderRadius:13,padding:"14px 16px",border:`1px solid ${G.border}`,textAlign:"center"}}>
          <div style={{fontSize:mob?22:28,fontWeight:800,color:x.c}}>{x.v}</div>
          <div style={{fontSize:12,color:G.muted}}>{x.l}</div>
        </div>
      ))}
    </div>
    <Card style={{padding:0,overflow:"hidden"}}>
      {LEARNERS.map((l,i)=>(
        <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 16px",borderBottom:i<LEARNERS.length-1?`1px solid ${G.border}`:"none",background:i%2===0?G.card:G.bg}}>
          <Av name={l.name} idx={i} size={34}/>
          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{l.name}</div><div style={{fontSize:10,color:G.muted}}>{l.id}</div></div>
          <div style={{display:"flex",gap:6}}>
            {[{v:"P",c:G.ok},{v:"A",c:G.err},{v:"L",c:G.warn}].map(({v,c})=>(
              <button key={v} onClick={()=>setAtt(p=>({...p,[l.id]:v}))} style={{width:mob?44:38,height:mob?38:34,borderRadius:9,border:"none",cursor:"pointer",background:att[l.id]===v?c:`${c}18`,color:att[l.id]===v?"#fff":c,fontWeight:800,fontSize:mob?13:11,transition:"all .12s",transform:att[l.id]===v?"scale(1.06)":"scale(1)"}}>{v}</button>
            ))}
          </div>
        </div>
      ))}
    </Card>
    <Card>
      <SH title="Attendance Heatmap" sub="Last 5 weeks · Mon–Fri"/>
      <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
        <div style={{display:"flex",flexDirection:"column",gap:4,paddingTop:20}}>
          {HM_WEEKS.map(w=><div key={w.label} style={{fontSize:10,color:G.muted,height:28,display:"flex",alignItems:"center",whiteSpace:"nowrap"}}>{w.label}</div>)}
        </div>
        <div style={{flex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginBottom:4}}>
            {["Mon","Tue","Wed","Thu","Fri"].map(d=><div key={d} style={{fontSize:10,color:G.muted,textAlign:"center",fontWeight:600}}>{d}</div>)}
          </div>
          {HM_WEEKS.map((w,wi)=>(
            <div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginBottom:4}}>
              {w.days.map((r,di)=>(
                <div key={di} title={r?`${r}%`:"Future"} style={{height:28,borderRadius:6,background:hm(r),display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {r>0&&<span style={{fontSize:9,fontWeight:700,color:r>=90?"rgba(255,255,255,.9)":G.text}}>{r}%</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  </Section>;
}

// ─── VIEW: LESSON PLANNING ────────────────────────────────────────────────────
function LessonPlanView({mob}){
  const [editing,setEditing]=useState(null);
  const days=["Mon","Tue","Wed","Thu","Fri"];
  const [aiPlan,setAiPlan]=useState(false);
  const [aiLoading,setAiLoading]=useState(false);
  const loadAI=()=>{setAiLoading(true);setTimeout(()=>{setAiLoading(false);setAiPlan(true);},1800);};
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Lesson Planning</div><div style={{fontSize:11,color:G.muted}}>Week of 26–30 May 2026</div></div>
      <div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Lightbulb} onClick={loadAI}>AI Assist</Btn><Btn icon={Plus}>New Lesson</Btn></div>
    </div>

    {aiLoading&&<Card style={{background:G.gp,border:`1px solid ${G.gpb}`,padding:"16px 18px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:28,height:28,borderRadius:8,background:G.green,display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 1s infinite"}}><Zap size={13} color="#fff"/></div>
        <div><div style={{fontSize:12,fontWeight:700,color:G.green}}>AI is generating lesson plans…</div><div style={{fontSize:11,color:G.muted}}>Aligning with CBC strands for week of 26 May</div></div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:12}}>{[80,60,90,50].map((w,i)=><Skeleton key={i} h={16} w={`${w}%`}/>)}</div>
    </Card>}

    {aiPlan&&<Card style={{background:`linear-gradient(135deg,${G.gd},${G.gl})`,border:"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><Zap size={15} color="#fff"/><span style={{fontSize:13,fontWeight:800,color:"#fff"}}>AI Lesson Suggestion</span></div>
        <button onClick={()=>setAiPlan(false)} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.5)"}}><X size={14}/></button>
      </div>
      <div style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"13px 15px"}}>
        <div style={{fontSize:12,fontWeight:800,color:"#fff",marginBottom:6}}>📚 Week 6: Fractions – Thirds & Mixed Numbers</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,.75)",lineHeight:1.7}}>
          <strong style={{color:"#fff"}}>Objective:</strong> Learners identify and work with thirds, sixths, and mixed numbers using visual models.<br/>
          <strong style={{color:"#fff"}}>Activities:</strong> Fraction wall activity (Day 1), Story problems with food sharing (Day 2), Group game with fraction cards (Day 3).<br/>
          <strong style={{color:"#fff"}}>CBC Alignment:</strong> Numbers strand — Fractions sub-strand — Indicators F.5.1.3 to F.5.1.5.<br/>
          <strong style={{color:"#fff"}}>Assessment:</strong> Exit ticket quiz on Day 4. Portfolio evidence: learner fraction booklet.
        </div>
        <div style={{display:"flex",gap:8,marginTop:12}}><button style={{padding:"7px 14px",borderRadius:8,background:G.orange,border:"none",color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>Use This Plan</button><button style={{padding:"7px 14px",borderRadius:8,background:"rgba(255,255,255,.15)",border:"none",color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer"}}>Regenerate</button></div>
      </div>
    </Card>}

    {/* Weekly planner grid */}
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(5,1fr)",gap:10}}>
      {days.map(day=>(
        <div key={day}>
          <div style={{fontSize:11,fontWeight:800,color:G.muted,textTransform:"uppercase",letterSpacing:.8,marginBottom:8,textAlign:"center"}}>{day}{day==="Fri"&&<span style={{marginLeft:4,fontSize:9,background:G.orange,color:"#fff",padding:"1px 5px",borderRadius:4}}>TODAY</span>}</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {(TT[day]||[]).map((l,i)=>{
              const sc=SC[l.sub]||G.green;
              return <div key={i} onClick={()=>setEditing(`${day}-${i}`)} style={{padding:"10px 12px",borderRadius:10,background:G.card,border:`1px solid ${editing===`${day}-${i}`?sc:G.border}`,borderLeft:`3px solid ${sc}`,cursor:"pointer",transition:"all .12s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=sc} onMouseLeave={e=>e.currentTarget.style.borderColor=editing===`${day}-${i}`?sc:G.border}>
                <div style={{fontSize:10,color:G.muted,marginBottom:3}}>{l.slot}–{l.end}</div>
                <div style={{fontSize:12,fontWeight:700,color:G.text,lineHeight:1.3}}>{l.sub}</div>
                <div style={{fontSize:10,color:G.muted}}>Grade {l.cls} · {l.room}</div>
                {l.done&&<div style={{marginTop:5,fontSize:9,color:G.ok,fontWeight:700}}>✓ Completed</div>}
                {l.now&&<div style={{marginTop:5,fontSize:9,color:sc,fontWeight:800}}>● Live Now</div>}
              </div>;
            })}
            <button onClick={()=>setEditing(`${day}-new`)} style={{padding:"8px",borderRadius:10,border:`1px dashed ${G.border}`,background:"none",color:G.light,fontSize:11,cursor:"pointer"}}>+ Add lesson</button>
          </div>
        </div>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: SCHEMES OF WORK ────────────────────────────────────────────────────
function SchemesView({mob}){
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Schemes of Work</div><div style={{fontSize:11,color:G.muted}}>Mathematics · Grade 5A · Term 2 2026</div></div>
      <div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Printer} sm>Print</Btn><Btn icon={Download} sm>Export</Btn></div>
    </div>
    <Card>
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <span style={{fontSize:12,fontWeight:700,color:G.text}}>Term Progress</span>
          <span style={{fontSize:12,fontWeight:800,color:G.green}}>62.5%</span>
        </div>
        <div style={{height:8,background:G.bg2,borderRadius:4,overflow:"hidden"}}><div style={{width:"62.5%",height:"100%",background:`linear-gradient(90deg,${G.green},${G.gll})`,borderRadius:4}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{fontSize:10,color:G.muted}}>5 of 8 topics covered</span><span style={{fontSize:10,color:G.muted}}>3 weeks remaining</span></div>
      </div>
    </Card>
    <Card style={{padding:0,overflow:"hidden"}}>
      {!mob&&<div style={{display:"grid",gridTemplateColumns:"50px 100px 1fr 1fr 80px 60px",padding:"10px 18px",background:G.bg2,borderBottom:`1px solid ${G.border}`}}>
        {["Wk","Dates","Strand","Topic","Status","Lessons"].map(h=><div key={h} style={{fontSize:10,fontWeight:700,color:G.muted,textTransform:"uppercase",letterSpacing:.7}}>{h}</div>)}
      </div>}
      {SCHEMES.map((s,i)=>(
        <div key={i} style={{display:mob?"flex":"grid",flexDirection:"column",gridTemplateColumns:"50px 100px 1fr 1fr 80px 60px",padding:mob?"12px 16px":"12px 18px",gap:mob?4:0,alignItems:"center",borderBottom:i<SCHEMES.length-1?`1px solid ${G.border}`:"none",background:s.comp===100?`${G.ok}06`:s.comp>0?`${G.warn}06`:G.card}}>
          <div style={{fontSize:13,fontWeight:800,color:G.muted}}>W{s.wk}</div>
          {!mob&&<div style={{fontSize:11,color:G.muted}}>{s.dates}</div>}
          <div style={{fontSize:mob?10:11,color:G.muted,fontWeight:600}}>{s.strand}</div>
          <div style={{fontSize:mob?13:13,fontWeight:700,color:G.text}}>{s.topic}</div>
          <div>
            {s.comp===100?<Chip color={G.ok} sm>Done</Chip>:s.comp>0?<div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:40,height:5,background:G.bg2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${s.comp}%`,height:"100%",background:G.warn,borderRadius:3}}/></div><span style={{fontSize:10,color:G.warn,fontWeight:700}}>{s.comp}%</span></div>:<Chip color={G.muted} sm>Planned</Chip>}
          </div>
          {!mob&&<div style={{fontSize:11,color:G.muted}}>{s.lessons} lessons</div>}
        </div>
      ))}
    </Card>
  </Section>;
}

// ─── VIEW: ASSIGNMENTS ────────────────────────────────────────────────────────
function AssignmentsView({mob}){
  const [compose,setCompose]=useState(false);
  const statusC={active:G.info,grading:G.warn,upcoming:G.muted,closed:G.ok};
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Assignments & Homework</div><div style={{fontSize:11,color:G.muted}}>5 active · Term 2</div></div>
      <Btn icon={Plus} onClick={()=>setCompose(true)}>New Assignment</Btn>
    </div>
    {compose&&<Card style={{border:`1px solid ${G.gpb}`,background:G.gp}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div style={{fontSize:13,fontWeight:800,color:G.green}}>Create Assignment</div><button onClick={()=>setCompose(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={16} color={G.muted}/></button></div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:10,marginBottom:10}}>
        {[{p:"Assignment title…"},{p:"Select class…"}].map((x,i)=><input key={i} placeholder={x.p} style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}/>)}
      </div>
      <textarea placeholder="Instructions and description…" rows={3} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",resize:"vertical",boxSizing:"border-box",marginBottom:10}}/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <input type="date" defaultValue="2026-05-30" style={{padding:"7px 10px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}/>
        <div style={{flex:1}}/>
        <Btn variant="ghost" onClick={()=>setCompose(false)}>Cancel</Btn>
        <Btn icon={Send} onClick={()=>setCompose(false)}>Publish</Btn>
      </div>
    </Card>}
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {ASSIGNMENTS.map((a,i)=>{
        const pct=a.total>0?Math.round((a.submitted/a.total)*100):0;
        const sc=statusC[a.status]||G.muted;
        return <Card key={a.id} style={{padding:"16px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,marginBottom:10}}>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:800,color:G.text,marginBottom:3}}>{a.title}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <Chip color={G.green} sm>{a.cls}</Chip>
                <Tag color={sc}>{a.status}</Tag>
                <span style={{fontSize:11,color:G.muted,display:"flex",alignItems:"center",gap:4}}><Clock size={11}/>Due {a.due}</span>
              </div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <Btn variant="ghost" icon={Eye} sm>View</Btn>
              {a.status==="grading"&&<Btn icon={Edit} sm>Grade</Btn>}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:10}}>
            {[{l:"Submitted",v:`${a.submitted}/${a.total}`,c:G.info},{l:"Graded",v:`${a.graded}/${a.submitted}`,c:G.ok},{l:"Pending",v:`${a.submitted-a.graded}`,c:a.submitted-a.graded>0?G.warn:G.muted}].map(({l,v,c})=>(
              <div key={l} style={{background:G.bg,borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                <div style={{fontSize:14,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:10,color:G.muted}}>{l}</div>
              </div>
            ))}
          </div>
          <ProgressBar value={pct} color={pct===100?G.ok:G.info} label={`${pct}% submitted`}/>
        </Card>;
      })}
    </div>
  </Section>;
}

// ─── VIEW: ANALYTICS ──────────────────────────────────────────────────────────
function AnalyticsView({mob}){
  const dist=[{l:"EE",n:3,c:G.green},{l:"ME",n:6,c:G.info},{l:"AE",n:2,c:G.warn},{l:"BE",n:1,c:G.err}];
  return <Section>
    <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Analytics & Reports</div><div style={{fontSize:11,color:G.muted}}>Grade 5A · Term 2 2026</div></div>
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
      {[{l:"Class Average",v:"76%",c:G.green,t:"+2%"},{l:"CBC Completion",v:"79%",c:G.info,t:"+5%"},{l:"Top Performers",v:"3",c:G.orange,t:null},{l:"Need Support",v:"3",c:G.err,t:null}].map(({l,v,c,t})=>(
        <Card key={l} style={{padding:"14px 16px",textAlign:"center"}}>
          <div style={{fontSize:mob?20:24,fontWeight:800,color:c}}>{v}</div>
          <div style={{fontSize:11,color:G.muted}}>{l}</div>
          {t&&<div style={{fontSize:10,fontWeight:700,color:G.ok,marginTop:3}}>{t} this term</div>}
        </Card>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:14}}>
      <Card>
        <SH title="Performance Trend" sub="Class average · Jan–May 2026"/>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={PERF_TREND}>
            <defs><linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={G.green} stopOpacity={.2}/><stop offset="95%" stopColor={G.green} stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={G.border}/>
            <XAxis dataKey="m" tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/>
            <YAxis domain={[60,100]} tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}} formatter={v=>[`${v}%`,"Avg Score"]}/>
            <Area type="monotone" dataKey="avg" stroke={G.green} strokeWidth={2.5} fill="url(#pg2)" dot={{fill:G.green,r:4}}/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <SH title="CBC Performance Distribution" sub="All learners"/>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dist} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke={G.border} vertical={false}/>
            <XAxis dataKey="l" tick={{fontSize:11,fill:G.muted}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:10,fill:G.muted}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{borderRadius:10,border:"none",fontSize:11}}/>
            <Bar dataKey="n" radius={[7,7,0,0]} name="Learners">
              {dist.map((d,i)=><Cell key={i} fill={d.c}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card>
      <SH title="Learner Performance Summary" sub="Individual scores · last assessment" right={<Btn variant="ghost" icon={Download} sm>Export PDF</Btn>}/>
      {LEARNERS.map((l,i)=>(
        <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<LEARNERS.length-1?`1px solid ${G.border}`:"none"}}>
          <div style={{width:18,fontSize:11,fontWeight:800,color:G.muted}}>{i+1}</div>
          <Av name={l.name} idx={i} size={30}/>
          <div style={{flex:1,fontSize:12,fontWeight:600,color:G.text}}>{l.name}</div>
          <div style={{width:mob?80:120,height:5,background:G.bg2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${l.gpa}%`,height:"100%",background:P[l.lvl],borderRadius:3}}/></div>
          <div style={{width:40,fontSize:12,fontWeight:800,color:P[l.lvl],textAlign:"right"}}>{l.gpa}%</div>
          {!mob&&<Pill level={l.lvl} sm/>}
        </div>
      ))}
    </Card>
  </Section>;
}

// ─── VIEW: COMMUNICATION ──────────────────────────────────────────────────────
function CommunicationView({mob}){
  const [compose,setCompose]=useState(false);
  const [msg,setMsg]=useState("");
  const typeC={admin:G.purple,parent:G.green,hod:G.orange};
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Communication</div><div style={{fontSize:11,color:G.muted}}>{INBOX.filter(m=>!m.read).length} unread messages</div></div>
      <Btn icon={Plus} onClick={()=>setCompose(true)}>Compose</Btn>
    </div>
    {compose&&<Card style={{background:G.gp,border:`1px solid ${G.gpb}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={{fontSize:13,fontWeight:800,color:G.green}}>New Message</div><button onClick={()=>setCompose(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={16} color={G.muted}/></button></div>
      <input placeholder="To: Parent / Teacher / Admin…" style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      <input placeholder="Subject…" style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Write your message…" rows={4} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,resize:"vertical",outline:"none",boxSizing:"border-box",marginBottom:8}}/>
      <div style={{display:"flex",justifyContent:"flex-end",gap:8}}><Btn variant="ghost" onClick={()=>setCompose(false)}>Cancel</Btn><Btn icon={Send} onClick={()=>setCompose(false)}>Send</Btn></div>
    </Card>}
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {INBOX.map((m,i)=>(
        <div key={m.id} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"14px 16px",background:m.read?G.card:`${G.green}06`,borderRadius:13,border:`1px solid ${m.read?G.border:G.gpb}`,cursor:"pointer",transition:"background .12s"}} onMouseEnter={e=>e.currentTarget.style.background=G.bg} onMouseLeave={e=>e.currentTarget.style.background=m.read?G.card:`${G.green}06`}>
          <div style={{width:36,height:36,borderRadius:10,background:avBg(i),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:avTx(i),flexShrink:0}}>{m.av.slice(0,2)}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
              <div style={{fontSize:12,fontWeight:m.read?600:800,color:G.text}}>{m.from}</div>
              <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
                {m.priority&&<span style={{fontSize:9,fontWeight:800,color:G.err,background:`${G.err}12`,padding:"1px 6px",borderRadius:4}}>URGENT</span>}
                <span style={{fontSize:10,color:G.muted}}>{m.time}</span>
              </div>
            </div>
            <div style={{fontSize:11,color:G.muted,marginTop:3,lineHeight:1.5}}>{m.msg}</div>
          </div>
          {!m.read&&<div style={{width:8,height:8,borderRadius:"50%",background:G.green,flexShrink:0,marginTop:4}}/>}
        </div>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: RESOURCES ──────────────────────────────────────────────────────────
function ResourcesView({mob}){
  const typeI={pdf:"📄",pptx:"📊",video:"🎬",docx:"📝",xlsx:"📋"};
  const typeC={pdf:G.err,pptx:G.orange,video:G.purple,docx:G.info,xlsx:G.ok};
  const [q,setQ]=useState("");
  const filtered=RESOURCES.filter(r=>r.name.toLowerCase().includes(q.toLowerCase()));
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Learning Resources</div><div style={{fontSize:11,color:G.muted}}>{RESOURCES.length} files · {RESOURCES.filter(r=>r.pinned).length} pinned</div></div>
      <Btn icon={Upload}>Upload File</Btn>
    </div>
    <div style={{position:"relative"}}>
      <Search size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:G.light,pointerEvents:"none"}}/>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search resources…" style={{width:"100%",paddingLeft:32,paddingRight:12,paddingTop:9,paddingBottom:9,border:`1px solid ${G.border}`,borderRadius:10,fontSize:12,outline:"none",background:G.card,color:G.text,boxSizing:"border-box"}}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(2,1fr)",gap:10}}>
      {filtered.map((r,i)=>(
        <div key={r.id} style={{display:"flex",gap:12,alignItems:"center",padding:"14px 16px",background:G.card,borderRadius:13,border:`1px solid ${r.pinned?G.gpb:G.border}`,transition:"all .12s",cursor:"pointer"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=G.gpb;e.currentTarget.style.boxShadow="0 2px 12px rgba(0,64,0,.08)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=r.pinned?G.gpb:G.border;e.currentTarget.style.boxShadow="none";}}>
          <div style={{width:44,height:44,borderRadius:12,background:`${typeC[r.type]||G.muted}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{typeI[r.type]||"📁"}</div>
          <div style={{flex:1,overflow:"hidden"}}>
            <div style={{fontSize:13,fontWeight:700,color:G.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</div>
            <div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}>
              <Tag color={typeC[r.type]||G.muted}>{r.type.toUpperCase()}</Tag>
              <span style={{fontSize:10,color:G.muted}}>{r.size} · {r.date}</span>
            </div>
          </div>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            {r.pinned&&<Star size={13} color={G.orange} fill={G.orange}/>}
            <button style={{width:28,height:28,borderRadius:7,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Download size={12} color={G.muted}/></button>
          </div>
        </div>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: BEHAVIOR ───────────────────────────────────────────────────────────
function BehaviorView({mob}){
  const [compose,setCompose]=useState(false);
  const sevC={positive:G.ok,low:G.info,medium:G.warn,high:G.err};
  const sevI={positive:"✅",low:"ℹ️",medium:"⚠️",high:"🚨"};
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Behavior & Discipline</div><div style={{fontSize:11,color:G.muted}}>Grade 5A · Incident log</div></div>
      <Btn icon={Plus} onClick={()=>setCompose(true)}>Log Incident</Btn>
    </div>
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
      {[{l:"Positive",v:2,c:G.ok},{l:"Low",v:1,c:G.info},{l:"Medium",v:1,c:G.warn},{l:"High",v:1,c:G.err}].map(({l,v,c})=>(
        <div key={l} style={{background:G.card,borderRadius:12,padding:"13px 15px",border:`1px solid ${G.border}`,borderLeft:`4px solid ${c}`}}>
          <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div>
          <div style={{fontSize:11,color:G.muted}}>{l} severity</div>
        </div>
      ))}
    </div>
    {compose&&<Card style={{background:G.gp,border:`1px solid ${G.gpb}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={{fontSize:13,fontWeight:800,color:G.green}}>Log Incident</div><button onClick={()=>setCompose(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={16} color={G.muted}/></button></div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:10,marginBottom:10}}>
        <select style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}><option>Select Learner…</option>{LEARNERS.map(l=><option key={l.id}>{l.name}</option>)}</select>
        <select style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}><option>Type: Concern</option><option>Type: Positive</option></select>
      </div>
      <textarea placeholder="Describe the incident or commendation…" rows={3} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",resize:"vertical",boxSizing:"border-box",marginBottom:8}}/>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost" onClick={()=>setCompose(false)}>Cancel</Btn><Btn icon={Save}>Save</Btn></div>
    </Card>}
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {BEHAVIOR_LOG.map((b,i)=>(
        <Card key={b.id} style={{padding:"15px 17px",borderLeft:`4px solid ${sevC[b.sev]}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:16}}>{sevI[b.sev]}</span><div><div style={{fontSize:13,fontWeight:800,color:G.text}}>{b.learner}</div><div style={{fontSize:10,color:G.muted}}>{b.date}</div></div></div>
            <Tag color={sevC[b.sev]}>{b.type}</Tag>
          </div>
          <div style={{fontSize:12,color:G.muted,marginBottom:6,lineHeight:1.5}}>{b.desc}</div>
          <div style={{padding:"7px 10px",background:G.bg,borderRadius:8,fontSize:11,color:G.text}}><strong>Action taken:</strong> {b.action}</div>
        </Card>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: PROFILE/SETTINGS ───────────────────────────────────────────────────
function ProfileView({mob}){
  const [notifs,setNotifs]=useState({sms:true,email:true,push:false,weekly:true,alerts:true});
  return <Section>
    <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Profile & Settings</div></div>
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"280px 1fr",gap:14}}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <Card style={{textAlign:"center",padding:"24px 20px"}}>
          <div style={{width:72,height:72,borderRadius:22,background:avBg(0),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:26,color:avTx(0),margin:"0 auto"}}>NW</div>
          <div style={{fontSize:16,fontWeight:800,color:G.text,marginTop:10}}>Ms. Njeri Wambua</div>
          <div style={{fontSize:11,color:G.muted}}>Mathematics · Science & Technology</div>
          <div style={{marginTop:8}}><Chip color={G.orange}>Class Teacher 5A</Chip></div>
          <Btn variant="ghost" icon={Edit} style={{margin:"12px auto 0",justifyContent:"center"}}>Edit Profile</Btn>
        </Card>
        <Card>
          {[{icon:Phone,v:"+254 722 456 789"},{icon:Mail,v:"n.wambua@greenfields.ac.ke"},{icon:MapPin,v:"Westlands, Nairobi"},{icon:GraduationCap,v:"BEd. Mathematics, UoN"}].map(({icon:I,v})=>(
            <div key={v} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${G.border}`}}><I size={12} color={G.muted}/><span style={{fontSize:11,color:G.muted}}>{v}</span></div>
          ))}
        </Card>
        <Card>
          <div style={{fontSize:11,fontWeight:800,color:G.text,marginBottom:10}}>Teaching Stats</div>
          {[{l:"Classes",v:"3"},{l:"Learners",v:"90"},{l:"Subjects",v:"2"},{l:"Lessons/Week",v:"22"}].map(({l,v})=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${G.border}`}}><span style={{fontSize:11,color:G.muted}}>{l}</span><span style={{fontSize:12,fontWeight:800,color:G.text}}>{v}</span></div>
          ))}
        </Card>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <Card>
          <SH title="Notifications" sub="Manage alert preferences"/>
          {[{k:"sms",l:"SMS Alerts",d:"Important school notifications via SMS"},{k:"email",l:"Email Digest",d:"Daily email summary at 6:00 AM"},{k:"push",l:"Push Notifications",d:"Real-time browser notifications"},{k:"weekly",l:"Weekly Progress Report",d:"Auto-generated every Monday"},{k:"alerts",l:"At-Risk Learner Alerts",d:"Immediate notification for learner concerns"}].map(({k,l,d})=>(
            <div key={k} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:`1px solid ${G.border}`}}>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{l}</div><div style={{fontSize:10,color:G.muted}}>{d}</div></div>
              <Toggle on={notifs[k]} onChange={v=>setNotifs(p=>({...p,[k]:v}))}/>
            </div>
          ))}
        </Card>
        <Card>
          <SH title="Account & Security"/>
          {[{icon:Lock,l:"Change Password",sub:"Last changed 3 months ago"},{icon:User,l:"Manage Profile Photo",sub:"Upload a professional photo"},{icon:Globe,l:"Language",sub:"English (Kenya)"},{icon:RefreshCw,l:"Sync & Data",sub:"All data synced · Last sync 2 min ago"}].map(({icon:I,l,sub})=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 0",borderBottom:`1px solid ${G.border}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=G.bg} onMouseLeave={e=>e.currentTarget.style.background=""}>
              <div style={{width:32,height:32,borderRadius:9,background:G.gp,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I size={14} color={G.green}/></div>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{l}</div><div style={{fontSize:10,color:G.muted}}>{sub}</div></div>
              <ChevronRight size={14} color={G.light}/>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </Section>;
}

// ─── VIEW: NOTIFICATIONS ──────────────────────────────────────────────────────
function NotifsView({mob}){
  const [items,setItems]=useState(NOTIFS_D);
  const unread=items.filter(n=>!n.read).length;
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Notifications</div><div style={{fontSize:11,color:G.muted}}>{unread} unread</div></div>
      {unread>0&&<Btn variant="ghost" sm icon={CheckCheck} onClick={()=>setItems(p=>p.map(n=>({...n,read:true})))}>Mark all read</Btn>}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {items.map((n,i)=>(
        <div key={n.id} onClick={()=>setItems(p=>p.map((x,xi)=>xi===i?{...x,read:true}:x))} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"14px 16px",background:n.read?G.card:`${n.color}06`,borderRadius:13,border:`1px solid ${n.read?G.border:`${n.color}25`}`,cursor:"pointer",transition:"all .12s"}} onMouseEnter={e=>e.currentTarget.style.background=G.bg} onMouseLeave={e=>e.currentTarget.style.background=n.read?G.card:`${n.color}06`}>
          <div style={{width:38,height:38,borderRadius:11,background:`${n.color}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{n.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:n.read?600:800,color:G.text}}>{n.title}</div>
            <div style={{fontSize:11,color:G.muted,marginTop:2,lineHeight:1.5}}>{n.body}</div>
            <div style={{fontSize:10,color:G.light,marginTop:4}}>{n.time}</div>
          </div>
          {!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:n.color,flexShrink:0,marginTop:5}}/>}
        </div>
      ))}
    </div>
  </Section>;
}

// ─── VIEW: OFFLINE / SYSTEM STATES ───────────────────────────────────────────
function SystemView(){
  const [mode,setMode]=useState("offline");
  return <Section>
    <div style={{fontSize:20,fontWeight:800,color:G.text}}>System States</div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {["offline","loading","error","empty"].map(m=><button key={m} onClick={()=>setMode(m)} style={{padding:"7px 14px",borderRadius:9,fontSize:11,fontWeight:700,background:mode===m?G.green:G.card,color:mode===m?"#fff":G.muted,border:mode===m?"none":`1px solid ${G.border}`,cursor:"pointer",textTransform:"capitalize"}}>{m}</button>)}
    </div>
    <Card>
      {mode==="offline"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 20px",gap:14,textAlign:"center"}}>
        <div style={{width:64,height:64,borderRadius:20,background:`${G.warn}14`,display:"flex",alignItems:"center",justifyContent:"center"}}><WifiOff size={30} color={G.warn}/></div>
        <div style={{fontSize:16,fontWeight:800,color:G.text}}>You're Offline</div>
        <div style={{fontSize:12,color:G.muted,maxWidth:320}}>eGrade Kenya is running in offline mode. Your attendance, grades, and notes are saved locally and will sync when you reconnect.</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%",maxWidth:360}}>
          {["3 attendance records waiting to sync","2 CBC assessments saved locally","1 assignment grade pending upload"].map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:`${G.warn}10`,borderRadius:10,border:`1px solid ${G.warn}25`}}>
              <Clock size={13} color={G.warn}/><span style={{fontSize:11,color:G.warn,fontWeight:600}}>{t}</span>
            </div>
          ))}
        </div>
        <Btn icon={RefreshCw} variant="orange">Retry Connection</Btn>
      </div>}
      {mode==="loading"&&<div style={{display:"flex",flexDirection:"column",gap:12,padding:"20px 0"}}>
        {[100,80,90,60,70,50].map((w,i)=><Skeleton key={i} h={i%3===0?48:20} w={`${w}%`}/>)}
      </div>}
      {mode==="error"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 20px",gap:14,textAlign:"center"}}>
        <div style={{width:64,height:64,borderRadius:20,background:`${G.err}14`,display:"flex",alignItems:"center",justifyContent:"center"}}><AlertCircle size={30} color={G.err}/></div>
        <div style={{fontSize:16,fontWeight:800,color:G.text}}>Something went wrong</div>
        <div style={{fontSize:12,color:G.muted,maxWidth:300}}>We couldn't load your assessments. Your local data is safe. Please try again.</div>
        <div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Info}>Report Issue</Btn><Btn icon={RefreshCw}>Try Again</Btn></div>
      </div>}
      {mode==="empty"&&<EmptyState icon={ClipboardList} title="No Assessments Yet" sub="You haven't created any CBC assessments for this class. Start your first assessment below." cta="Create Assessment"/>}
    </Card>
  </Section>;
}

// ─── VIEW: EXAMS & ASSESSMENTS ────────────────────────────────────────────────
const EXAMS = [
  {id:"E001",title:"Term 2 CAT 1 – Mathematics",type:"CAT",cls:"Grade 5A",date:"2026-06-06",marks:40,status:"upcoming",submitted:0,total:32,graded:0},
  {id:"E002",title:"Science Mid-Term Assessment",type:"Practical",cls:"Grade 5A",date:"2026-06-10",marks:30,status:"upcoming",submitted:0,total:32,graded:0},
  {id:"E003",title:"Number Patterns Oral Assessment",type:"Oral",cls:"Grade 6A",date:"2026-05-28",marks:20,status:"active",submitted:14,total:28,graded:8},
  {id:"E004",title:"Division CAT – Grade 5B",type:"CAT",cls:"Grade 5B",date:"2026-05-20",marks:40,status:"graded",submitted:30,total:30,graded:30},
  {id:"E005",title:"Measurement Project",type:"Project",cls:"Grade 6A",date:"2026-05-15",marks:50,status:"graded",submitted:27,total:28,graded:27},
];
const CAT_SCORES = [
  {name:"Amina W.",score:36,max:40},{name:"Brian O.",score:29,max:40},{name:"Cynthia M.",score:22,max:40},
  {name:"David K.",score:31,max:40},{name:"Esther A.",score:38,max:40},{name:"Felix K.",score:14,max:40},
  {name:"Grace N.",score:33,max:40},{name:"Hassan A.",score:35,max:40},{name:"Irene W.",score:30,max:40},
  {name:"John G.",score:19,max:40},{name:"Kendi M.",score:34,max:40},{name:"Leon M.",score:28,max:40},
];
function ExamsView({mob}){
  const [tab,setTab]=useState("upcoming");
  const [marksheet,setMarksheet]=useState(false);
  const [compose,setCompose]=useState(false);
  const typeC={CAT:G.green,Practical:G.purple,Oral:G.orange,Project:G.info,Exam:G.err};
  const statusC={upcoming:G.muted,active:G.info,graded:G.ok,draft:G.warn};
  const filtered=tab==="all"?EXAMS:EXAMS.filter(e=>e.status===tab);
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Exams & Assessments</div><div style={{fontSize:11,color:G.muted}}>CATs · Projects · Oral · Practical</div></div>
      <div style={{display:"flex",gap:8}}><Btn variant="ghost" icon={Printer} sm>Print Slips</Btn><Btn icon={Plus} onClick={()=>setCompose(true)}>New Assessment</Btn></div>
    </div>

    {/* Summary strip */}
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
      {[{l:"Upcoming",v:EXAMS.filter(e=>e.status==="upcoming").length,c:G.muted},{l:"Active",v:EXAMS.filter(e=>e.status==="active").length,c:G.info},{l:"Graded",v:EXAMS.filter(e=>e.status==="graded").length,c:G.ok},{l:"Total This Term",v:EXAMS.length,c:G.green}].map(({l,v,c})=>(
        <div key={l} style={{background:G.card,borderRadius:12,padding:"13px 15px",border:`1px solid ${G.border}`,textAlign:"center"}}>
          <div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:11,color:G.muted}}>{l}</div>
        </div>
      ))}
    </div>

    {/* Compose panel */}
    {compose&&<Card style={{background:G.gp,border:`1px solid ${G.gpb}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:800,color:G.green}}>Create Assessment</div>
        <button onClick={()=>setCompose(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={16} color={G.muted}/></button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <input placeholder="Assessment title…" style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}/>
        <select style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}>
          <option>Type: CAT</option><option>Oral</option><option>Practical</option><option>Project</option><option>Exam</option>
        </select>
        <select style={{padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card}}>
          <option>Grade 5A</option><option>Grade 5B</option><option>Grade 6A</option>
        </select>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <div><div style={{fontSize:10,color:G.muted,marginBottom:4,fontWeight:700}}>Date</div><input type="date" defaultValue="2026-06-06" style={{padding:"8px 10px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card,width:"100%",boxSizing:"border-box"}}/></div>
        <div><div style={{fontSize:10,color:G.muted,marginBottom:4,fontWeight:700}}>Total Marks</div><input type="number" defaultValue="40" style={{padding:"8px 10px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card,width:"100%",boxSizing:"border-box"}}/></div>
        <div><div style={{fontSize:10,color:G.muted,marginBottom:4,fontWeight:700}}>Duration (min)</div><input type="number" defaultValue="40" style={{padding:"8px 10px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",background:G.card,width:"100%",boxSizing:"border-box"}}/></div>
      </div>
      <textarea placeholder="Instructions for learners (optional)…" rows={2} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,outline:"none",resize:"vertical",boxSizing:"border-box",marginBottom:10}}/>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost" onClick={()=>setCompose(false)}>Cancel</Btn><Btn icon={Save} onClick={()=>setCompose(false)}>Create</Btn></div>
    </Card>}

    {/* Tabs */}
    <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
      {["all","upcoming","active","graded"].map(t=>(
        <button key={t} onClick={()=>setTab(t)} style={{padding:"7px 14px",borderRadius:9,fontSize:11,fontWeight:700,textTransform:"capitalize",background:tab===t?G.green:G.card,color:tab===t?"#fff":G.muted,border:tab===t?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{t}</button>
      ))}
    </div>

    {/* List */}
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {filtered.map(e=>{
        const tc=typeC[e.type]||G.muted;
        const sc=statusC[e.status]||G.muted;
        const pct=e.total>0?Math.round((e.graded/e.total)*100):0;
        return <Card key={e.id} style={{padding:"16px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,marginBottom:10}}>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:800,color:G.text,marginBottom:4}}>{e.title}</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
                <Tag color={tc}>{e.type}</Tag>
                <Chip color={G.green} sm>{e.cls}</Chip>
                <span style={{fontSize:11,color:G.muted,display:"flex",alignItems:"center",gap:3}}><Calendar size={11}/>{e.date}</span>
                <span style={{fontSize:11,color:G.muted}}>{e.marks} marks</span>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
              <Tag color={sc}>{e.status}</Tag>
              {e.status==="graded"&&<Btn variant="ghost" icon={Eye} sm onClick={()=>setMarksheet(e.id)}>Marksheet</Btn>}
              {e.status==="active"&&<Btn icon={Edit} sm>Enter Marks</Btn>}
            </div>
          </div>
          {e.status!=="upcoming"&&<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
              {[{l:"Total",v:e.total,c:G.muted},{l:"Submitted",v:e.submitted,c:G.info},{l:"Graded",v:e.graded,c:G.ok}].map(({l,v,c})=>(
                <div key={l} style={{background:G.bg,borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                  <div style={{fontSize:16,fontWeight:800,color:c}}>{v}</div>
                  <div style={{fontSize:10,color:G.muted}}>{l}</div>
                </div>
              ))}
            </div>
            <ProgressBar value={pct} color={pct===100?G.ok:G.info} label={`${pct}% graded`}/>
          </>}
        </Card>;
      })}
    </div>

    {/* Marksheet modal */}
    {marksheet&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setMarksheet(false)}>
      <div style={{background:G.card,borderRadius:18,width:"100%",maxWidth:580,maxHeight:"80vh",overflow:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.3)"}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"18px 22px",borderBottom:`1px solid ${G.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:G.card,zIndex:1}}>
          <div><div style={{fontSize:14,fontWeight:800,color:G.text}}>Marksheet — Division CAT</div><div style={{fontSize:11,color:G.muted}}>Grade 5B · 30 learners · /40 marks</div></div>
          <button onClick={()=>setMarksheet(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={18} color={G.muted}/></button>
        </div>
        <div style={{padding:"16px 22px"}}>
          {/* Score distribution bar */}
          <div style={{marginBottom:16}}>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
              {[{l:"90–100%",v:2,c:G.green},{l:"75–89%",v:8,c:G.info},{l:"50–74%",v:14,c:G.warn},{l:"<50%",v:6,c:G.err}].map(({l,v,c})=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:5,background:`${c}12`,padding:"4px 10px",borderRadius:7}}>
                  <div style={{width:8,height:8,borderRadius:2,background:c}}/><span style={{fontSize:11,fontWeight:700,color:c}}>{v} — {l}</span>
                </div>
              ))}
            </div>
          </div>
          {CAT_SCORES.map((s,i)=>{
            const pct=Math.round((s.score/s.max)*100);
            const c=pct>=90?G.green:pct>=75?G.info:pct>=50?G.warn:G.err;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<CAT_SCORES.length-1?`1px solid ${G.border}`:"none"}}>
              <div style={{width:20,fontSize:11,fontWeight:700,color:G.muted,textAlign:"right"}}>{i+1}</div>
              <div style={{flex:1,fontSize:12,fontWeight:600,color:G.text}}>{s.name}</div>
              <div style={{width:80,height:5,background:G.bg2,borderRadius:3,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:c,borderRadius:3}}/></div>
              <div style={{width:36,fontSize:13,fontWeight:800,color:c,textAlign:"right"}}>{s.score}</div>
              <div style={{width:28,fontSize:11,color:G.muted}}>/{s.max}</div>
            </div>;
          })}
          <div style={{marginTop:14,padding:"12px 16px",background:G.gp,borderRadius:10,display:"flex",gap:20}}>
            <div><div style={{fontSize:10,color:G.muted,fontWeight:700}}>Class Average</div><div style={{fontSize:18,fontWeight:800,color:G.green}}>29.4/40</div></div>
            <div><div style={{fontSize:10,color:G.muted,fontWeight:700}}>Highest</div><div style={{fontSize:18,fontWeight:800,color:G.ok}}>38</div></div>
            <div><div style={{fontSize:10,color:G.muted,fontWeight:700}}>Lowest</div><div style={{fontSize:18,fontWeight:800,color:G.err}}>14</div></div>
          </div>
          <div style={{marginTop:12,display:"flex",gap:8,justifyContent:"flex-end"}}>
            <Btn variant="ghost" icon={Printer} sm>Print</Btn>
            <Btn icon={Download} sm>Export CSV</Btn>
          </div>
        </div>
      </div>
    </div>}
  </Section>;
}

// ─── VIEW: TIMETABLE & CALENDAR ───────────────────────────────────────────────
const CALENDAR_EVENTS = [
  {date:26,type:"lesson",label:"Grade 5A – Mathematics",time:"07:40",color:G.green},
  {date:26,type:"lesson",label:"Grade 5A – Science",time:"08:20",color:G.warn},
  {date:27,type:"assessment",label:"Fractions Worksheet Due",time:"All day",color:G.orange},
  {date:28,type:"meeting",label:"HOD Math Moderation",time:"10:00",color:G.purple},
  {date:30,type:"deadline",label:"CBC Portfolio Submission",time:"All day",color:G.err},
  {date:6,month:"Jun",type:"exam",label:"Term 2 CAT 1",time:"09:00",color:G.info},
  {date:14,month:"Jun",type:"event",label:"Athletics Day",time:"All day",color:G.pink},
];
function TimetableView({mob}){
  const [calView,setCalView]=useState("week");
  const [selDay,setSelDay]=useState("Fri");
  const days=["Mon","Tue","Wed","Thu","Fri"];
  const dayFull={Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday"};
  const typeColor={lesson:G.green,assessment:G.orange,meeting:G.purple,deadline:G.err,exam:G.info,event:G.pink};
  const typeIcon={lesson:"📚",assessment:"📋",meeting:"🤝",deadline:"⏰",exam:"📝",event:"🏆"};
  const calDays=[
    {d:19,day:"Mon",past:true},{d:20,day:"Tue",past:true},{d:21,day:"Wed",past:true},
    {d:22,day:"Thu",past:true},{d:23,day:"Fri",past:true},
    {d:26,day:"Mon"},{d:27,day:"Tue"},{d:28,day:"Wed"},{d:29,day:"Thu"},{d:30,day:"Fri"},
    {d:2,day:"Mon",next:true},{d:3,day:"Tue",next:true},{d:4,day:"Wed",next:true},{d:5,day:"Thu",next:true},{d:6,day:"Fri",next:true},
  ];
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Timetable & Calendar</div><div style={{fontSize:11,color:G.muted}}>May–June 2026 · Term 2</div></div>
      <div style={{display:"flex",gap:8}}>
        {["week","calendar"].map(v=>(
          <button key={v} onClick={()=>setCalView(v)} style={{padding:"7px 14px",borderRadius:9,fontSize:11,fontWeight:700,textTransform:"capitalize",background:calView===v?G.green:G.card,color:calView===v?"#fff":G.muted,border:calView===v?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{v==="week"?"Week View":"Calendar"}</button>
        ))}
      </div>
    </div>

    {calView==="week"&&<>
      {/* Day tabs */}
      <div style={{display:"flex",gap:6}}>
        {days.map(d=>(
          <button key={d} onClick={()=>setSelDay(d)} style={{flex:1,padding:"10px 0",borderRadius:11,fontSize:mob?11:12,fontWeight:700,background:selDay===d?G.green:G.card,color:selDay===d?"#fff":G.muted,border:selDay===d?"none":`1px solid ${G.border}`,cursor:"pointer",transition:"all .12s",position:"relative"}}>
            {mob?d:dayFull[d]}
            {d==="Fri"&&<div style={{position:"absolute",top:4,right:4,width:6,height:6,borderRadius:"50%",background:G.orange}}/>}
          </button>
        ))}
      </div>
      {/* Lesson list */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {(TT[selDay]||[]).length===0&&<EmptyState icon={Calendar} title="No Lessons" sub="No classes scheduled for this day."/>}
        {(TT[selDay]||[]).map((l,i)=>{
          const sc=SC[l.sub]||G.green;
          const isNow=l.now;
          return <div key={i} style={{display:"flex",gap:0,borderRadius:13,overflow:"hidden",border:`1px solid ${isNow?sc:G.border}`,boxShadow:isNow?`0 2px 16px ${sc}22`:"none",background:G.card,transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=sc} onMouseLeave={e=>e.currentTarget.style.borderColor=isNow?sc:G.border}>
            <div style={{width:5,background:sc,flexShrink:0}}/>
            <div style={{display:"flex",alignItems:"center",gap:mob?10:16,padding:"14px 16px",flex:1,flexWrap:"wrap"}}>
              <div style={{width:mob?58:80,flexShrink:0}}>
                <div style={{fontSize:mob?11:12,fontWeight:700,color:isNow?sc:G.text}}>{l.slot}</div>
                <div style={{fontSize:10,color:G.muted}}>–{l.end}</div>
                {isNow&&<div style={{fontSize:9,fontWeight:800,color:sc,marginTop:2}}>● LIVE</div>}
                {l.done&&<div style={{fontSize:9,color:G.ok,marginTop:2}}>✓ Done</div>}
              </div>
              <div style={{flex:1,minWidth:100}}>
                <div style={{fontSize:mob?13:15,fontWeight:800,color:l.done?G.muted:G.text}}>{l.sub}</div>
                <div style={{fontSize:11,color:G.muted}}>Grade {l.cls}</div>
              </div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                <div style={{background:`${sc}12`,color:sc,fontSize:10,fontWeight:700,padding:"4px 10px",borderRadius:8}}>Grade {l.cls}</div>
                <div style={{background:G.bg2,color:G.muted,fontSize:10,fontWeight:600,padding:"4px 10px",borderRadius:8}}>🚪 {l.room}</div>
              </div>
              {!mob&&<div style={{display:"flex",gap:6,flexShrink:0}}>
                <button style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${G.border}`,background:"none",cursor:"pointer",fontSize:11,fontWeight:600,color:G.muted}}>Lesson Plan</button>
                {!l.done&&<button style={{padding:"6px 12px",borderRadius:8,border:"none",background:G.gp,cursor:"pointer",fontSize:11,fontWeight:700,color:G.green}}>Take Attendance</button>}
              </div>}
            </div>
          </div>;
        })}
      </div>
    </>}

    {calView==="calendar"&&<>
      {/* Mini calendar */}
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <button style={{width:28,height:28,borderRadius:7,border:`1px solid ${G.border}`,background:G.card,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={14} color={G.muted}/></button>
          <div style={{fontSize:14,fontWeight:800,color:G.text}}>May – June 2026</div>
          <button style={{width:28,height:28,borderRadius:7,border:`1px solid ${G.border}`,background:G.card,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={14} color={G.muted}/></button>
        </div>
        {/* Day headers */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:8}}>
          {days.map(d=><div key={d} style={{fontSize:10,fontWeight:700,color:G.muted,textAlign:"center",textTransform:"uppercase"}}>{d}</div>)}
        </div>
        {/* Calendar grid — 3 weeks */}
        {[0,1,2].map(week=>(
          <div key={week} style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:6}}>
            {calDays.slice(week*5,week*5+5).map((day,di)=>{
              const evts=CALENDAR_EVENTS.filter(e=>e.date===day.d&&!e.month);
              const isToday=day.d===24&&!day.past&&!day.next;
              return <div key={di} style={{minHeight:mob?44:56,borderRadius:10,border:`1px solid ${isToday?G.orange:G.border}`,background:isToday?G.op:day.past?G.bg2:G.card,padding:"6px 7px",cursor:"pointer",transition:"all .12s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=G.gpb} onMouseLeave={e=>e.currentTarget.style.borderColor=isToday?G.orange:G.border}>
                <div style={{fontSize:11,fontWeight:isToday?800:600,color:isToday?G.orange:day.past?G.light:G.text,marginBottom:3}}>{day.d}{!mob&&<span style={{fontSize:9,color:G.muted,marginLeft:2}}>{day.day}</span>}</div>
                {evts.slice(0,mob?1:2).map((e,ei)=>(
                  <div key={ei} style={{fontSize:9,fontWeight:700,color:"#fff",background:e.color,borderRadius:4,padding:"2px 5px",marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.label.slice(0,mob?8:16)}{mob&&e.label.length>8?"…":""}</div>
                ))}
                {evts.length>2&&<div style={{fontSize:9,color:G.muted}}>+{evts.length-2} more</div>}
              </div>;
            })}
          </div>
        ))}
      </Card>
      {/* Upcoming events */}
      <Card>
        <SH title="Upcoming Events & Deadlines" sub="Next 30 days"/>
        {CALENDAR_EVENTS.map((e,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<CALENDAR_EVENTS.length-1?`1px solid ${G.border}`:"none"}}>
            <div style={{width:38,height:38,borderRadius:11,background:`${e.color}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{typeIcon[e.type]||"📅"}</div>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{e.label}</div><div style={{fontSize:10,color:G.muted}}>{e.date} {e.month||"May"} · {e.time}</div></div>
            <Tag color={e.color}>{e.type}</Tag>
          </div>
        ))}
      </Card>
    </>}
  </Section>;
}

// ─── VIEW: CO-CURRICULAR ACTIVITIES ──────────────────────────────────────────
const CLUBS = [
  {id:1,name:"Mathematics Club",role:"Patron",members:24,nextMeet:"2026-06-07",day:"Saturday",time:"9:00 AM",venue:"Room C1",achievements:["1st Place – District Quiz 2025","12 members in national competition"],active:true},
  {id:2,name:"Science Fair Committee",role:"Coordinator",members:12,nextMeet:"2026-06-14",day:"Saturday",time:"10:00 AM",venue:"Science Lab",achievements:["3 projects shortlisted county level","1st runner-up – Regional 2024"],active:true},
];
const CLUB_MEMBERS = [
  {name:"Esther Achieng",role:"Club Captain",cls:"5A",achievement:"Best performer 2025"},
  {name:"Hassan Abdi",role:"Secretary",cls:"5A",achievement:"District top scorer"},
  {name:"Amina Wanjiku",role:"Member",cls:"5A",achievement:"3rd place quiz 2025"},
  {name:"David Kipchoge",role:"Member",cls:"5A",achievement:""},
  {name:"Kendi Mugo",role:"Member",cls:"5B",achievement:""},
  {name:"Leon Mwangi",role:"Vice Captain",cls:"5B",achievement:"Science fair finalist"},
];
const COCURR_EVENTS = [
  {date:"2026-06-07",title:"Maths Club Practice",club:"Mathematics Club",desc:"Algebra problems sprint · 12 students registered"},
  {date:"2026-06-10",title:"Science Fair Judging Prep",club:"Science Fair Committee",desc:"Final project reviews before county presentation"},
  {date:"2026-06-14",title:"Athletics Day Volunteering",club:"N/A",desc:"Assisting sports department with timing and scoring"},
  {date:"2026-06-21",title:"District Quiz Competition",club:"Mathematics Club",desc:"6 learners participating · transport arranged"},
];
function CoCurricularView({mob}){
  const [selClub,setSelClub]=useState(null);
  const [tab,setTab]=useState("overview");
  if(selClub){
    const club=CLUBS.find(c=>c.id===selClub);
    return <Section>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={()=>setSelClub(null)} style={{width:32,height:32,borderRadius:8,border:`1px solid ${G.border}`,background:G.card,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={14} color={G.muted}/></button>
        <div><div style={{fontSize:16,fontWeight:800,color:G.text}}>{club.name}</div><div style={{fontSize:11,color:G.muted}}>{club.role} · {club.members} members</div></div>
      </div>
      <div style={{display:"flex",gap:7}}>
        {["overview","members","schedule"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:"7px 14px",borderRadius:9,fontSize:11,fontWeight:700,textTransform:"capitalize",background:tab===t?G.green:G.card,color:tab===t?"#fff":G.muted,border:tab===t?"none":`1px solid ${G.border}`,cursor:"pointer"}}>{t}</button>
        ))}
      </div>
      {tab==="overview"&&<>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
          <Card>
            <SH title="Club Details"/>
            {[{l:"Role",v:club.role},{l:"Members",v:club.members},{l:"Meeting Day",v:club.day},{l:"Time",v:club.time},{l:"Venue",v:club.venue},{l:"Next Meeting",v:club.nextMeet}].map(({l,v})=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
                <span style={{fontSize:11,color:G.muted}}>{l}</span><span style={{fontSize:12,fontWeight:700,color:G.text}}>{v}</span>
              </div>
            ))}
          </Card>
          <Card>
            <SH title="Achievements"/>
            {club.achievements.map((a,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderBottom:i<club.achievements.length-1?`1px solid ${G.border}`:"none"}}>
                <div style={{width:28,height:28,borderRadius:8,background:`${G.orange}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Award size={14} color={G.orange}/></div>
                <div style={{fontSize:12,fontWeight:600,color:G.text,lineHeight:1.5}}>{a}</div>
              </div>
            ))}
            <div style={{marginTop:10,padding:"10px 12px",background:G.gp,borderRadius:9}}>
              <div style={{fontSize:11,fontWeight:700,color:G.green}}>🎯 Next goal: County Championship 2026</div>
            </div>
          </Card>
        </div>
      </>}
      {tab==="members"&&<Card>
        <SH title="Club Members" sub={`${CLUB_MEMBERS.length} active members`} right={<Btn icon={Plus} sm>Add Member</Btn>}/>
        {CLUB_MEMBERS.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<CLUB_MEMBERS.length-1?`1px solid ${G.border}`:"none"}}>
            <Av name={m.name} idx={i} size={34}/>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:G.text}}>{m.name}</div><div style={{fontSize:10,color:G.muted}}>{m.cls}</div></div>
            <Chip color={m.role==="Club Captain"?G.orange:m.role==="Secretary"?G.purple:G.muted} sm>{m.role}</Chip>
            {m.achievement&&!mob&&<div style={{fontSize:10,color:G.ok,fontWeight:600,maxWidth:160,textAlign:"right"}}>⭐ {m.achievement}</div>}
          </div>
        ))}
      </Card>}
      {tab==="schedule"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
        {COCURR_EVENTS.filter(e=>e.club===club.name||e.club==="N/A").map((e,i)=>(
          <Card key={i} style={{padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{fontSize:13,fontWeight:800,color:G.text}}>{e.title}</div>
              <span style={{fontSize:10,color:G.muted,flexShrink:0}}>{e.date}</span>
            </div>
            <div style={{fontSize:11,color:G.muted,lineHeight:1.5}}>{e.desc}</div>
          </Card>
        ))}
      </div>}
    </Section>;
  }
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>Co-curricular Activities</div><div style={{fontSize:11,color:G.muted}}>Clubs · Sports · Events</div></div>
      <Btn icon={Plus}>Join Club</Btn>
    </div>
    {/* My clubs */}
    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:12}}>
      {CLUBS.map((c,i)=>(
        <Card key={c.id} onClick={()=>setSelClub(c.id)} style={{cursor:"pointer",padding:"18px 20px",borderTop:`4px solid ${i===0?G.green:G.orange}`,transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(0,64,0,.12)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 5px rgba(0,64,0,.05)"}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{fontSize:15,fontWeight:800,color:G.text}}>{c.name}</div>
              <div style={{fontSize:11,color:G.muted,marginTop:2}}>{c.role} · {c.members} members</div>
            </div>
            <Chip color={i===0?G.green:G.orange}>{c.role}</Chip>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            {[{l:"Next Meeting",v:c.nextMeet},{l:"Venue",v:c.venue}].map(({l,v})=>(
              <div key={l} style={{background:G.bg,borderRadius:8,padding:"8px 10px"}}>
                <div style={{fontSize:9,color:G.muted,fontWeight:700,textTransform:"uppercase"}}>{l}</div>
                <div style={{fontSize:12,fontWeight:700,color:G.text,marginTop:2}}>{v}</div>
              </div>
            ))}
          </div>
          <div>
            {c.achievements.slice(0,1).map((a,ai)=>(
              <div key={ai} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 10px",background:`${G.orange}10`,borderRadius:8}}>
                <Award size={12} color={G.orange}/><span style={{fontSize:11,color:G.orange,fontWeight:600}}>{a}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
    {/* Upcoming schedule */}
    <Card>
      <SH title="Upcoming Co-curricular Events" sub="Next 30 days"/>
      {COCURR_EVENTS.map((e,i)=>(
        <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"11px 0",borderBottom:i<COCURR_EVENTS.length-1?`1px solid ${G.border}`:"none"}}>
          <div style={{width:42,height:42,borderRadius:12,background:`${G.orange}12`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <div style={{fontSize:14,fontWeight:800,color:G.orange}}>{e.date.slice(8)}</div>
            <div style={{fontSize:8,fontWeight:700,color:G.muted}}>{e.date.slice(5,7)==="06"?"JUN":"MAY"}</div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:800,color:G.text}}>{e.title}</div>
            <div style={{fontSize:11,color:G.muted,marginTop:2}}>{e.desc}</div>
            {e.club!=="N/A"&&<Chip color={G.green} sm style={{marginTop:4}}>{e.club}</Chip>}
          </div>
        </div>
      ))}
    </Card>
    {/* Learner talent tracking */}
    <Card>
      <SH title="Learner Talent Tracking" sub="Grade 5A co-curricular participation"/>
      {LEARNERS.slice(0,6).map((l,i)=>{
        const activities=[["Maths Club","Science Fair"],["Maths Club"],["Drama"],["Football","Maths Club"],["Science Fair","Chess"],["None"]][i];
        return <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<5?`1px solid ${G.border}`:"none"}}>
          <Av name={l.name} idx={i} size={30}/>
          <div style={{flex:1,fontSize:12,fontWeight:600,color:G.text}}>{l.name}</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {activities.map(a=><Chip key={a} color={a==="None"?G.muted:G.green} sm>{a}</Chip>)}
          </div>
        </div>;
      })}
    </Card>
  </Section>;
}

// ─── VIEW: AI ASSISTANT ───────────────────────────────────────────────────────
const AI_SUGGESTIONS = [
  {id:1,type:"lesson",icon:"📚",tag:"Lesson Planning",title:"Suggested: Fractions Week 6",body:"Based on your Week 5 progress (80% completion), AI recommends opening Week 6 with a visual fraction wall activity using paper folding. Estimated time: 35 minutes.",action:"Use in Lesson Plan",color:G.green},
  {id:2,type:"risk",icon:"⚠️",tag:"At-Risk Detection",title:"Felix Kamau — Urgent Intervention",body:"Felix has missed 35% of lessons this month and scored BE in the last 3 assessments. AI suggests a one-on-one session, parent call, and referral to the counselor.",action:"Log Intervention",color:G.err},
  {id:3,type:"insight",icon:"📈",tag:"Class Insight",title:"Grade 5A outperforming target",body:"Your class average (76%) is 4 points above the school benchmark for this week in Term 2. Peer learning groups appear to be working — maintain current grouping strategy.",action:"View Analytics",color:G.info},
  {id:4,type:"comment",icon:"💬",tag:"Auto Comments",title:"CBC Report Comments Ready",body:"AI has drafted report card comments for 12 learners based on their CBC assessment data. Review and personalise before submitting to admin.",action:"Review Comments",color:G.orange},
  {id:5,type:"assessment",icon:"🎯",tag:"Assessment Suggestion",title:"Readiness check: Measurement",body:"Based on fractions mastery scores, 9 of 12 learners are ready to begin Measurement. Consider pre-assessing before Week 7 to confirm.",action:"Create Pre-Assessment",color:G.purple},
];
const AI_CHAT_HISTORY = [
  {role:"user",  msg:"What can I do to help Felix Kamau improve his performance?"},
  {role:"ai",    msg:"Based on Felix's data: attendance 65%, GPA 48%, classified BE in the last 3 CBC assessments. I recommend: (1) Schedule a one-on-one catch-up session focusing on Numbers strand gaps, (2) Pair Felix with Esther or Amina for peer learning in your next groupwork activity, (3) Contact his parent — note the last parent contact was 2 weeks ago, (4) Log an intervention in the Behaviour module so the counselor is looped in."},
  {role:"user",  msg:"Can you draft a lesson plan for fractions using real-life Kenyan examples?"},
  {role:"ai",    msg:"Here's a 40-minute CBC-aligned lesson plan for Grade 5A:\n\n📌 Topic: Fractions in Daily Life — Thirds & Mixed Numbers\n🎯 Strand: Numbers › Fractions\n✅ Indicators: F.5.1.3, F.5.1.4\n\nIntroduction (8 min): Display 3 mandazi. Ask: 'If we share equally among 3 friends, what fraction does each get?'\n\nDevelopment (18 min): Learners fold paper into thirds. Use uji/chai cups as measurement metaphors. Group activity: 'sharing githeri' fraction cards.\n\nConsolidation (10 min): Whiteboard drill — 6 mixed number problems.\n\nAssessment (4 min): Exit slip — draw a fraction model for 1⅓."},
];
function AIAssistantView({mob}){
  const [input,setInput]=useState("");
  const [chat,setChat]=useState(AI_CHAT_HISTORY);
  const [loading,setLoading]=useState(false);
  const [dismissed,setDismissed]=useState([]);
  const chatRef=useRef(null);
  const send=()=>{
    if(!input.trim())return;
    const newMsg={role:"user",msg:input};
    setChat(p=>[...p,newMsg]);
    setInput("");
    setLoading(true);
    setTimeout(()=>{
      setChat(p=>[...p,{role:"ai",msg:"I'm analysing your Grade 5A data and CBC curriculum alignment now. Based on current Term 2 progress, here's my recommendation for your query about "+input.slice(0,30)+"…\n\nThis is a demonstration — in production, this connects to the live eGrade AI engine with your real learner and curriculum data."}]);
      setLoading(false);
    },1800);
    setTimeout(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;},100);
  };
  const visible=AI_SUGGESTIONS.filter(s=>!dismissed.includes(s.id));
  return <Section>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
      <div>
        <div style={{fontSize:mob?17:20,fontWeight:800,color:G.text}}>AI Teaching Assistant</div>
        <div style={{fontSize:11,color:G.muted}}>Powered by eGrade AI · Updated hourly from your class data</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:7,padding:"6px 12px",background:`${G.ok}14`,borderRadius:9}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:G.ok,animation:"pulse 2s infinite"}}/>
        <span style={{fontSize:11,fontWeight:700,color:G.ok}}>AI Active</span>
      </div>
    </div>

    {/* Quick stat */}
    <div style={{display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:10}}>
      {[{l:"Insights Ready",v:`${visible.length}`,c:G.orange,i:"🔍"},{l:"Learners Analysed",v:"12",c:G.green,i:"👥"},{l:"Risk Flags",c:G.err,v:"3",i:"⚠️"},{l:"Comments Drafted",v:"12",c:G.info,i:"💬"}].map(({l,v,c,i})=>(
        <div key={l} style={{background:G.card,borderRadius:12,padding:"13px 15px",border:`1px solid ${G.border}`,display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:22}}>{i}</div>
          <div><div style={{fontSize:18,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:10,color:G.muted}}>{l}</div></div>
        </div>
      ))}
    </div>

    <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"5fr 4fr",gap:14}}>
      {/* Insight cards */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div style={{fontSize:12,fontWeight:800,color:G.muted,textTransform:"uppercase",letterSpacing:.8}}>Smart Insights</div>
        {visible.length===0&&<EmptyState icon={Zap} title="All Caught Up!" sub="No new AI insights right now. Check back after your next lesson."/>}
        {visible.map(s=>(
          <div key={s.id} style={{background:G.card,borderRadius:14,border:`1px solid ${G.border}`,borderLeft:`4px solid ${s.color}`,padding:"15px 17px",transition:"all .12s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 12px rgba(0,64,0,.08)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:20}}>{s.icon}</span>
                <div><Tag color={s.color}>{s.tag}</Tag></div>
              </div>
              <button onClick={()=>setDismissed(p=>[...p,s.id])} style={{background:"none",border:"none",cursor:"pointer",color:G.light,padding:2}}><X size={14}/></button>
            </div>
            <div style={{fontSize:13,fontWeight:800,color:G.text,marginBottom:6}}>{s.title}</div>
            <div style={{fontSize:12,color:G.muted,lineHeight:1.65,marginBottom:10}}>{s.body}</div>
            <button style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${s.color}`,background:`${s.color}12`,color:s.color,fontSize:11,fontWeight:700,cursor:"pointer"}}>{s.action}</button>
          </div>
        ))}
      </div>

      {/* AI Chat */}
      <div style={{display:"flex",flexDirection:"column",gap:0,background:G.card,borderRadius:16,border:`1px solid ${G.border}`,overflow:"hidden"}}>
        {/* Chat header */}
        <div style={{padding:"14px 16px",borderBottom:`1px solid ${G.border}`,background:`linear-gradient(135deg,${G.gd},${G.gl})`,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:10,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><Zap size={15} color="#fff"/></div>
          <div><div style={{fontSize:13,fontWeight:800,color:"#fff"}}>Chat with eGrade AI</div><div style={{fontSize:10,color:"rgba(255,255,255,.5)"}}>Ask anything about your class, CBC, or learners</div></div>
        </div>
        {/* Messages */}
        <div ref={chatRef} style={{flex:1,overflowY:"auto",padding:"14px 16px",display:"flex",flexDirection:"column",gap:10,minHeight:300,maxHeight:mob?300:400}}>
          {chat.map((m,i)=>(
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start",gap:4}}>
              <div style={{fontSize:9,fontWeight:700,color:G.muted,textTransform:"uppercase"}}>{m.role==="user"?"You":"eGrade AI"}</div>
              <div style={{maxWidth:"88%",padding:"10px 13px",borderRadius:m.role==="user"?"12px 12px 4px 12px":"12px 12px 12px 4px",background:m.role==="user"?G.green:G.bg,color:m.role==="user"?"#fff":G.text,fontSize:12,lineHeight:1.65,whiteSpace:"pre-line"}}>
                {m.msg}
              </div>
            </div>
          ))}
          {loading&&<div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{padding:"10px 14px",background:G.bg,borderRadius:"12px 12px 12px 4px",display:"flex",gap:4,alignItems:"center"}}>
              {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:G.muted,animation:`pulse ${0.6+i*0.2}s infinite`}}/>)}
            </div>
          </div>}
        </div>
        {/* Suggestions */}
        <div style={{padding:"0 12px 8px",display:"flex",gap:6,overflowX:"auto"}}>
          {["Help Felix improve","Lesson plan for fractions","What's my class trend?","Draft report comments"].map(s=>(
            <button key={s} onClick={()=>setInput(s)} style={{padding:"5px 11px",borderRadius:8,border:`1px solid ${G.border}`,background:G.bg,color:G.muted,fontSize:10,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all .1s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=G.green} onMouseLeave={e=>e.currentTarget.style.borderColor=G.border}>{s}</button>
          ))}
        </div>
        {/* Input */}
        <div style={{padding:"10px 12px",borderTop:`1px solid ${G.border}`,display:"flex",gap:8,alignItems:"flex-end"}}>
          <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask about your learners, lessons, CBC…" rows={2} style={{flex:1,padding:"8px 11px",borderRadius:9,border:`1px solid ${G.border}`,fontSize:12,resize:"none",outline:"none",lineHeight:1.4}}/>
          <button onClick={send} disabled={!input.trim()} style={{width:36,height:36,borderRadius:9,border:"none",background:input.trim()?G.green:G.bg2,cursor:input.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .15s"}}>
            <Send size={15} color={input.trim()?"#fff":G.light}/>
          </button>
        </div>
      </div>
    </div>
  </Section>;
}

// ─── NAVIGATION STRUCTURE ─────────────────────────────────────────────────────
const NAV = [
  {grp:"Overview",    items:[{id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},{id:"ai",icon:Zap,label:"AI Assistant"}]},
  {grp:"My Classes",  items:[{id:"classes",icon:Layers,label:"My Classes"},{id:"learners",icon:Users,label:"Learners"},{id:"attendance",icon:Activity,label:"Attendance"}]},
  {grp:"Teaching",    items:[{id:"cbc",icon:ClipboardList,label:"CBC Assessment"},{id:"exams",icon:GraduationCap,label:"Exams & CATs"},{id:"lessons",icon:BookOpen,label:"Lesson Planning"},{id:"schemes",icon:BookMarked,label:"Schemes of Work"},{id:"assignments",icon:FileText,label:"Assignments"}]},
  {grp:"Calendar",    items:[{id:"timetable",icon:Calendar,label:"Timetable & Calendar"},{id:"cocurricular",icon:Award,label:"Co-curricular"}]},
  {grp:"Analytics",   items:[{id:"analytics",icon:BarChart2,label:"Analytics"},{id:"behavior",icon:Shield,label:"Behavior & Discipline"}]},
  {grp:"Tools",       items:[{id:"resources",icon:FolderOpen,label:"Resources"},{id:"communication",icon:MessageSquare,label:"Communication"},{id:"notifications",icon:Bell,label:"Notifications"}]},
  {grp:"System",      items:[{id:"system",icon:WifiOff,label:"System States"},{id:"profile",icon:User,label:"Profile & Settings"}]},
];
const BOTTOM = [
  {id:"dashboard",icon:Home,label:"Home"},
  {id:"cbc",icon:ClipboardList,label:"CBC"},
  {id:"attendance",icon:Activity,label:"Attend"},
  {id:"communication",icon:MessageSquare,label:"Messages"},
  {id:"_more",icon:MoreHorizontal,label:"More"},
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function TeacherModule(){
  const [view,setView]=useState("dashboard");
  const [collapsed,setCollapsed]=useState(false);
  const [drawer,setDrawer]=useState(false);
  const [moreSheet,setMoreSheet]=useState(false);
  const [w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);

  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  const mob=w<720;

  const go=id=>{setView(id);setDrawer(false);setMoreSheet(false);};

  const renderView=()=>{
    const p={mob};
    switch(view){
      case"dashboard":     return <DashboardView    {...p}/>;
      case"ai":            return <AIAssistantView   {...p}/>;
      case"classes":       return <ClassesView       {...p}/>;
      case"learners":      return <LearnersView      {...p}/>;
      case"cbc":           return <CBCView           {...p}/>;
      case"exams":         return <ExamsView         {...p}/>;
      case"attendance":    return <AttendanceView    {...p}/>;
      case"lessons":       return <LessonPlanView    {...p}/>;
      case"schemes":       return <SchemesView       {...p}/>;
      case"assignments":   return <AssignmentsView   {...p}/>;
      case"timetable":     return <TimetableView     {...p}/>;
      case"cocurricular":  return <CoCurricularView  {...p}/>;
      case"analytics":     return <AnalyticsView     {...p}/>;
      case"behavior":      return <BehaviorView      {...p}/>;
      case"resources":     return <ResourcesView     {...p}/>;
      case"communication": return <CommunicationView {...p}/>;
      case"notifications": return <NotifsView        {...p}/>;
      case"system":        return <SystemView/>;
      case"profile":       return <ProfileView       {...p}/>;
      default:             return <EmptyState icon={BookOpen} title="Coming Soon" sub="This module is being developed."/>;
    }
  };

  const SidebarContent=()=>(
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      {/* Logo */}
      <div style={{padding:"18px 14px 10px",display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:34,height:34,borderRadius:10,background:G.orange,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}><GraduationCap size={17} color="#fff"/></div>
        {(!collapsed||mob)&&<div><div style={{fontSize:15,fontWeight:800,color:"#fff",letterSpacing:-.3}}>eGrade</div><div style={{fontSize:9,color:"rgba(255,255,255,.4)",fontWeight:700,letterSpacing:1.5}}>KENYA · TEACHER</div></div>}
        {mob&&<button onClick={()=>setDrawer(false)} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.5)"}}><X size={18}/></button>}
      </div>
      {/* Teacher badge */}
      {(!collapsed||mob)&&<div style={{margin:"0 10px 10px",padding:"10px 12px",background:"rgba(255,255,255,.08)",borderRadius:10}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:32,height:32,borderRadius:9,background:avBg(0),flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:avTx(0)}}>NW</div>
          <div style={{flex:1,overflow:"hidden"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Ms. Njeri Wambua</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.4)"}}>Class Teacher · Grade 5A</div>
          </div>
          <div style={{width:8,height:8,borderRadius:"50%",background:G.ok,flexShrink:0}}/>
        </div>
      </div>}
      {/* Nav */}
      <div style={{flex:1,overflowY:"auto",padding:"0 8px"}}>
        {NAV.map(group=>(
          <div key={group.grp} style={{marginBottom:4}}>
            {(!collapsed||mob)&&<div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.28)",textTransform:"uppercase",letterSpacing:1.5,padding:"5px 8px 2px"}}>{group.grp}</div>}
            {group.items.map(item=>{
              const active=view===item.id;
              const unreadBadge=item.id==="notifications"?NOTIFS_D.filter(n=>!n.read).length:0;
              return <button key={item.id} onClick={()=>go(item.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:(collapsed&&!mob)?"9px 0":"7px 10px",justifyContent:(collapsed&&!mob)?"center":"flex-start",borderRadius:9,border:"none",cursor:"pointer",background:active?"rgba(255,255,255,.18)":"transparent",color:active?"#fff":"rgba(255,255,255,.52)",marginBottom:1,transition:"all .1s",position:"relative"}} onMouseEnter={e=>{if(!active){e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.color="#fff";}}} onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,.52)";}}}>
                {active&&<div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:18,background:G.orange,borderRadius:"0 3px 3px 0"}}/>}
                <item.icon size={15}/>
                {(!collapsed||mob)&&<span style={{fontSize:12,fontWeight:active?700:500,flex:1,textAlign:"left"}}>{item.label}</span>}
                {(!collapsed||mob)&&unreadBadge>0&&<span style={{background:G.orange,color:"#fff",borderRadius:10,padding:"1px 6px",fontSize:10,fontWeight:800}}>{unreadBadge}</span>}
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

      {/* Desktop sidebar */}
      {!mob&&<div style={{width:collapsed?62:222,flexShrink:0,background:`linear-gradient(175deg,${G.gd},${G.gl})`,display:"flex",flexDirection:"column",transition:"width .22s ease",position:"relative",zIndex:10}}>
        <SidebarContent/>
        <button onClick={()=>setCollapsed(!collapsed)} style={{position:"absolute",right:-10,top:66,width:20,height:20,borderRadius:"50%",background:G.card,border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.1)",zIndex:20}}>
          {collapsed?<ChevronRight size={10} color={G.green}/>:<ChevronLeft size={10} color={G.green}/>}
        </button>
      </div>}

      {/* Mobile drawer */}
      {mob&&drawer&&<div style={{position:"fixed",inset:0,zIndex:200,display:"flex",animation:"fadeIn .18s ease"}}>
        <div style={{width:270,background:`linear-gradient(175deg,${G.gd},${G.gl})`,height:"100%",animation:"slideIn .2s ease",boxShadow:"4px 0 24px rgba(0,0,0,.25)",overflow:"hidden"}}><SidebarContent/></div>
        <div style={{flex:1,background:"rgba(0,0,0,.45)"}} onClick={()=>setDrawer(false)}/>
      </div>}

      {/* More sheet */}
      {mob&&moreSheet&&<div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end",animation:"fadeIn .15s ease"}}>
        <div style={{flex:1,background:"rgba(0,0,0,.4)"}} onClick={()=>setMoreSheet(false)}/>
        <div style={{background:G.card,borderRadius:"20px 20px 0 0",padding:"16px 18px 36px",animation:"slideUp .2s ease"}}>
          <div style={{width:40,height:4,background:G.border,borderRadius:2,margin:"0 auto 16px"}}/>
          <div style={{fontSize:12,fontWeight:800,color:G.text,marginBottom:14}}>More</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {[{id:"classes",icon:Layers,label:"My Classes"},{id:"learners",icon:Users,label:"Learners"},{id:"exams",icon:GraduationCap,label:"Exams"},{id:"timetable",icon:Calendar,label:"Calendar"},{id:"cocurricular",icon:Award,label:"Activities"},{id:"lessons",icon:BookOpen,label:"Planner"},{id:"schemes",icon:BookMarked,label:"Schemes"},{id:"analytics",icon:BarChart2,label:"Analytics"},{id:"behavior",icon:Shield,label:"Behavior"},{id:"resources",icon:FolderOpen,label:"Resources"},{id:"ai",icon:Zap,label:"AI Assist"},{id:"profile",icon:User,label:"Profile"}].map(item=>(
              <button key={item.id} onClick={()=>go(item.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:"13px 6px",borderRadius:12,border:`1px solid ${view===item.id?G.green:G.border}`,background:view===item.id?G.gp:G.card,cursor:"pointer"}}>
                <div style={{width:34,height:34,borderRadius:10,background:view===item.id?G.green:G.bg2,display:"flex",alignItems:"center",justifyContent:"center"}}><item.icon size={15} color={view===item.id?"#fff":G.muted}/></div>
                <span style={{fontSize:9,fontWeight:700,color:view===item.id?G.green:G.muted}}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>}

      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* Top bar */}
        <div style={{height:mob?52:56,background:G.card,borderBottom:`1px solid ${G.border}`,display:"flex",alignItems:"center",padding:`0 ${mob?14:22}px`,gap:12,flexShrink:0,boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
          {mob&&<button onClick={()=>setDrawer(true)} style={{background:"none",border:"none",cursor:"pointer",flexShrink:0}}><Menu size={20} color={G.muted}/></button>}
          {mob&&<div style={{width:26,height:26,borderRadius:7,background:G.orange,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><GraduationCap size={14} color="#fff"/></div>}
          {!mob&&<div style={{flex:1,position:"relative",maxWidth:380}}>
            <Search size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:G.light,pointerEvents:"none"}}/>
            <input placeholder="Search learners, assessments, resources…" style={{width:"100%",paddingLeft:32,paddingRight:12,paddingTop:7,paddingBottom:7,border:`1px solid ${G.border}`,borderRadius:9,fontSize:12,background:G.bg,color:G.text}}/>
          </div>}
          <div style={{flex:1}}/>
          {/* Offline indicator */}
          <div style={{display:"flex",alignItems:"center",gap:4,padding:"4px 9px",background:`${G.ok}14`,borderRadius:7}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:G.ok}}/>
            <span style={{fontSize:9,fontWeight:700,color:G.ok}}>ONLINE</span>
          </div>
          <button onClick={()=>go("notifications")} style={{width:34,height:34,borderRadius:9,border:`1px solid ${G.border}`,background:G.card,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative",flexShrink:0}}>
            <Bell size={14} color={G.muted}/>
            <div style={{position:"absolute",top:7,right:7,width:7,height:7,borderRadius:"50%",background:G.orange,border:"2px solid #fff"}}/>
          </button>
          {!mob&&<div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 10px",background:G.gp,borderRadius:9,cursor:"pointer"}}>
            <div style={{width:26,height:26,borderRadius:7,background:avBg(0),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:10,color:avTx(0),flexShrink:0}}>NW</div>
            <span style={{fontSize:11,fontWeight:700,color:G.green}}>Ms. Wambua</span>
            <ChevronDown size={11} color={G.muted}/>
          </div>}
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:mob?14:24,paddingBottom:mob?80:24}}>
          {renderView()}
        </div>
      </div>
    </div>

    {/* Bottom nav (mobile) */}
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
