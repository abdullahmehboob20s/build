import{aA as f,aB as w,aC as y,aD as p,aE as h,aF as g,aG as k,aH as O,aI as E,aJ as m,aK as L}from"./index-81d86a26.js";class x extends f{constructor({callbackSelector:e,cause:t,data:n,extraData:c,sender:d,urls:a}){var i;super(t.shortMessage||"An error occurred while fetching for an offchain result.",{cause:t,metaMessages:[...t.metaMessages||[],(i=t.metaMessages)!=null&&i.length?"":[],"Offchain Gateway Call:",a&&["  Gateway URL(s):",...a.map(u=>`    ${w(u)}`)],`  Sender: ${d}`,`  Data: ${n}`,`  Callback selector: ${e}`,`  Extra data: ${c}`].flat()}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupError"})}}class M extends f{constructor({result:e,url:t}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${w(t)}`,`Response: ${y(e)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupResponseMalformedError"})}}class R extends f{constructor({sender:e,to:t}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${t}`,`OffchainLookup sender address: ${e}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupSenderMismatchError"})}}function $(s,e){if(!p(s))throw new h({address:s});if(!p(e))throw new h({address:e});return s.toLowerCase()===e.toLowerCase()}const v="0x556f1830",A={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function D(s,{blockNumber:e,blockTag:t,data:n,to:c}){const{args:d}=g({data:n,abi:[A]}),[a,i,u,r,o]=d;try{if(!$(c,a))throw new R({sender:a,to:c});const l=await S({data:u,sender:a,urls:i}),{data:b}=await k(s,{blockNumber:e,blockTag:t,data:O([r,E([{type:"bytes"},{type:"bytes"}],[l,o])]),to:c});return b}catch(l){throw new x({callbackSelector:r,cause:l,data:n,extraData:o,sender:a,urls:i})}}async function S({data:s,sender:e,urls:t}){var c;let n=new Error("An unknown error occurred.");for(let d=0;d<t.length;d++){const a=t[d],i=a.includes("{sender}")||a.includes("{data}")?"GET":"POST",u=i==="POST"?{data:s,sender:e}:void 0;try{const r=await fetch(a.replace("{sender}",e).replace("{data}",s),{body:JSON.stringify(u),method:i});let o;if((c=r.headers.get("Content-Type"))!=null&&c.startsWith("application/json")?o=(await r.json()).data:o=await r.text(),!r.ok){n=new m({body:u,details:y(o.error)||r.statusText,headers:r.headers,status:r.status,url:a});continue}if(!L(o)){n=new M({result:o,url:a});continue}return o}catch(r){n=new m({body:u,details:r.message,url:a})}}throw n}export{S as ccipFetch,D as offchainLookup,A as offchainLookupAbiItem,v as offchainLookupSignature};
