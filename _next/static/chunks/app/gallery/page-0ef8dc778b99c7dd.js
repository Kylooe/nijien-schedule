(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[928],{9056:function(t,e,r){Promise.resolve().then(r.bind(r,5780))},5780:function(t,e,r){"use strict";r.r(e),r.d(e,{default:function(){return g}});var o=r(7437),a=r(2265),i=r(6691),n=r.n(i),l=r(6926),c=r.n(l),u=r(5346),s=r.n(u);let m=c()([{name:"Finana Ryugu",group:"LazuLight",color:"#79CFB8",twitter:"FinanaRyugu"},{name:"Elira Pendora",group:"LazuLight",color:"#95C8D8",twitter:"EliraPendora"},{name:"Pomu Rainpuff",group:"LazuLight",color:"#258E70",twitter:"PomuRainpuff",graduated:!0},{name:"Petra Gurin",group:"OBSYDIA",color:"#FFAE42",twitter:"Petra_Gurin"},{name:"Selen Tatsuki",group:"OBSYDIA",color:"#7E4EAC",twitter:"Selen_Tatsuki",graduated:!0},{name:"Rosemi Lovelock",group:"OBSYDIA",color:"#DC3753",twitter:"Rosemi_Lovelock"},{name:"Enna Alouette",group:"Ethyria",color:"#858ED1",twitter:"EnnaAlouette"},{name:"Nina Kosaka",group:"Ethyria",color:"#660000",twitter:"NinaKosaka",graduated:!0},{name:"Millie Parfait",group:"Ethyria",color:"#FEBC87",twitter:"MillieParfait"},{name:"Reimu Endou",group:"Ethyria",color:"#B90B4A",twitter:"ReimuEndou"},{name:"Mysta Rias",group:"Luxiem",color:"#C3552B",twitter:"Mysta_Rias",graduated:!0},{name:"Ike Eveland",group:"Luxiem",color:"#348EC7",twitter:"ike_eveland"},{name:"Shu Yamino",group:"Luxiem",color:"#A660A7",twitter:"shu_yamino"},{name:"Luca Kaneshiro",group:"Luxiem",color:"#D4AF37",twitter:"luca_kaneshiro"},{name:"Vox Akuma",group:"Luxiem",color:"#960018",twitter:"Vox_Akuma"},{name:"Sonny Brisko",group:"Noctyx",color:"#FFF321",twitter:"Sonny_Brisko"},{name:"Alban Knox",group:"Noctyx",color:"#FF5F00",twitter:"Alban_Knox"},{name:"Uki Violeta",group:"Noctyx",color:"#B600FF",twitter:"uki_violeta"},{name:"Fulgur Ovid",group:"Noctyx",color:"#FF0000",twitter:"fulgur_ovid"},{name:"Kyo Kaneko",group:"ILUNA",color:"#00AFCC",twitter:"KyoKanek0",graduated:!0},{name:"Maria Marionette",group:"ILUNA",color:"#E55A9B",twitter:"MariaMari0nette"},{name:"Aster Arcadia",group:"ILUNA",color:"#6662A4",twitter:"AsterArcadia"},{name:"Aia Amare",group:"ILUNA",color:"#FFFEF7",twitter:"AiaAmare"},{name:"Ren Zotto",group:"ILUNA",color:"#429B76",twitter:"RenZott0"},{name:"Scarle Yonaguni",group:"ILUNA",color:"#E60012",twitter:"ScarleYonaguni"},{name:"Doppio Dropscythe",group:"XSOLEIL",color:"#A50082",twitter:"d_dropscythe"},{name:"Hex Haywire",group:"XSOLEIL",color:"#007199",twitter:"HexHaywire"},{name:"Meloco Kyoran",group:"XSOLEIL",color:"#A09BD8",twitter:"MelocoKyoran"},{name:"Ver Vermillion",group:"XSOLEIL",color:"#D5345E",twitter:"Ver_Vermillion"},{name:"Kotoka Torahime",group:"XSOLEIL",color:"#DC6B9A",twitter:"KotokaTorahime"},{name:"Yu Q. Wilson",group:"Krisis",color:"#F5EB28",twitter:"YuQWilson"},{name:"Vantacrow Bringer",group:"Krisis",color:"#8728E1",twitter:"Tyrant_Vanta"},{name:"Vezalius Bandage",group:"Krisis",color:"#C34196",twitter:"VezaliusBandage"},{name:"Kunai Nakasato",group:"TTT",color:"#3D6E64",twitter:"kunainakasato"},{name:"Victoria Brightshield",group:"TTT",color:"#D7D2EB",twitter:"vbrightshield"},{name:"Claude Clawmark",group:"TTT",color:"#7D3CAF",twitter:"claudeclawmark"}],"group");var g=()=>{let[t,e]=a.useState({}),[r,i]=a.useState(!1),[l,c]=a.useState("");return a.useEffect(()=>{let t=function(){let t=new Date,e=t.getDay();return 6!==e&&t.setDate(t.getDate()-e-1),"".concat(t.getFullYear()).concat((t.getMonth()+1).toString().padStart(2,"0")).concat(t.getDate().toString().padStart(2,"0"))}();fetch("data/".concat(t,".json")).then(t=>t.json()).then(t=>{e(t)})},[]),(0,o.jsxs)("div",{className:"w-full",children:[s()(m).map(e=>(0,o.jsx)("div",{className:"flex justify-between items-stretch flex-nowrap",children:m[e].map(e=>{var r,a;return(null===(r=t[e.twitter])||void 0===r?void 0:r.img)?(0,o.jsx)("div",{className:"basis-0 hover:opacity-75 cursor-pointer",style:{flexGrow:t[e.twitter].width/t[e.twitter].height},children:(0,o.jsx)(n(),{src:t[e.twitter].img,width:t[e.twitter].width,height:t[e.twitter].height,alt:e.name,className:"hover:opacity-75 cursor-pointer",onClick:()=>{c(t[e.twitter].img),i(!0)}})},e.name):(0,o.jsxs)("div",{className:"flex-1 flex flex-col justify-center items-center py-8",style:{backgroundColor:e.color},children:[(0,o.jsx)("p",{className:"".concat(e.graduated?"line-through":""," font-bold text-xl ").concat(/Aia|Sonny|YuQ/.test(e.twitter)?"text-black":"text-white"),children:e.name}),!e.graduated&&(0,o.jsx)("div",{children:(0,o.jsx)("a",{href:"https://twitter.com/".concat(e.twitter),target:"_blank",children:"twitter"})})]},e.name)})},e)),r&&(0,o.jsx)("div",{onClick:()=>i(!1),className:"fixed left-0 top-0 w-screen h-screen flex justify-center items-center overflow-hidden bg-black/50",children:(0,o.jsx)(n(),{src:l,width:1200,height:675,alt:"schedule",className:"max-w-screen max-h-screen object-contain"})})]})}}},function(t){t.O(0,[749,506,971,938,744],function(){return t(t.s=9056)}),_N_E=t.O()}]);