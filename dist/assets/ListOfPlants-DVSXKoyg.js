import{j as n,L as T,u as L,F as E,f as F,r as x,D as q,E as G,a as M,C as I}from"./index-Dxj2Z565.js";function O({plantData:e}){var c,d,r,g,f,p,j,S,v;const t=(d=(c=e==null?void 0:e.node)==null?void 0:c.components)==null?void 0:d.flatMap(l=>{var u,m;return(m=(u=l==null?void 0:l.content)==null?void 0:u.images)==null?void 0:m.map(o=>o)}),s=(g=(r=e==null?void 0:e.node)==null?void 0:r.components)==null?void 0:g.map(l=>{var u;if((l==null?void 0:l.type)==="richText"&&(l==null?void 0:l.name)==="Description")return(u=l==null?void 0:l.content)==null?void 0:u.plainText});return n.jsx("li",{className:"border shadow rounded lg:hover:shadow-md",children:n.jsxs(T,{to:`${(f=e==null?void 0:e.node)==null?void 0:f.path}?productId=${e==null?void 0:e.node.productId}`,className:"w-full flex flex-col",type:"button",children:[n.jsx("div",{children:n.jsx("img",{className:"aspect-square object-cover rounded-t w-full",src:(p=t==null?void 0:t[1])==null?void 0:p.url,alt:""})}),n.jsxs("div",{className:"flex flex-col px-2 py-3 lg:p-7 gap-2 md:gap-2 lg:gap-3",children:[n.jsx("h1",{className:"text-sm font-bold md:text-lg lg:text-2xl line-clamp-1",children:(j=e==null?void 0:e.node)!=null&&j.name?e.node.name.charAt(0).toUpperCase()+e.node.name.slice(1):""}),n.jsx("p",{className:"line-clamp-4 lg:line-clamp-5 text-sm lg:leading-6",children:(S=s[2])!=null&&S[0]?(v=s==null?void 0:s[2])==null?void 0:v[0]:"Description Goes Here. 👍"})]})]})})}function R({query:e,setQuery:t}){const{t:s}=L();return n.jsxs("div",{className:"flex items-center w-full",children:[n.jsx(E,{className:"absolute ps-3 text-gray-500",icon:F}),n.jsx("input",{className:"ps-9 w-full h-10 rounded shadow border outline-secondary-eucalyptus",type:"text",placeholder:s("searchPlaceholder"),value:e,onChange:c=>t(c.target.value)})]})}function V({folder:e,setCategory:t,setQuery:s}){const{t:c}=L(),d=e==null?void 0:e.map((r,g)=>{var f,p;return n.jsx("option",{value:(f=r==null?void 0:r.node)==null?void 0:f.path,children:(p=r==null?void 0:r.node)==null?void 0:p.name},g)});return n.jsx("div",{className:"w-full h-10",children:n.jsxs("select",{onChange:r=>{r.preventDefault(),t(r.target.value),s("")},className:"ps-2 w-full h-full rounded shadow border outline-secondary-eucalyptus cursor-pointer",children:[n.jsx("option",{value:c("plantGuidePath"),children:c("categoryLang")}),d]})})}const k=async(e,t,s,c)=>(await e.catalogueApi(`#graphql
        query ($language: String!, $path: String!, $version: VersionLabel) {
          catalogue(path: $path, language: $language, version: $version) {
            ... on Folder {
          subtree {
            edges {
              cursor
              node {
                path
                type
                name
                components {
                  name
                  content {
                    ... on PieceContent {
                      components {
                        content {
                          ... on SingleLineContent {
                            text
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,{path:t,version:s,language:c})).catalogue,z=async(e,t,s,c,d,r)=>d===r?(await e.catalogueApi(`#graphql
        query ($language: String!, $path: String!, $version: VersionLabel) {
          catalogue(path: $path, version: $version, language: $language) {
            subtree {
              edges {
                node {
                  name
                  type
                  subtree {
                    edges {
                      node {
                        path
                        name
                        id
                        type
                        components {
                          name
                          type
                          content {
                            ... on RichTextContent {
                              plainText
                            }
                            ... on ImageContent {
                              images {
                                url
                                altText
                              }
                            }
                            ... on SingleLineContent {
                              text
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`,{path:t,version:s,language:c})).catalogue:(await e.catalogueApi(`#graphql
        query ($language: String!, $path: String!, $version: VersionLabel) {
          catalogue(path: $path, version: $version, language: $language) {
                subtree {
                  edges {
                    node {
                      path
                      name
                      id
                      type
                      components {
                        name
                        type
                        content {
                        ... on RichTextContent {
                          plainText
                        }
                        ... on ImageContent {
                          images {
                            url
                            altText
                          }
                        }
                        ... on SingleLineContent {
                          text
                        }
                      }
                      }
                    }
                  }
                }
              }
    }`,{path:t,version:s,language:c})).catalogue;function H({query:e}){const{t}=L();return n.jsxs("div",{className:"flex flex-col justify-center items-center gap-3 mt-[25px]",children:[n.jsx("h1",{className:"font-bold text-base lg:text-3xl",children:`${t("plantNotFound.partOne")} "${e}"`}),n.jsx("h2",{className:"text-base lg:text-xl",children:t("plantNotFound.partTwo")})]})}function B(){const[e,t]=x.useState([]),[s,c]=x.useState(""),[d,r]=x.useState([]),[g,f]=x.useState(""),[p,j]=x.useState(!1),[S,v]=x.useState(!1),{setIsDisabled:l}=x.useContext(q),{t:u}=L();x.useEffect(()=>{const o=new AbortController;async function h(){var y,C,$,w,i;try{j(!0);const a=await k(I,u("plantGuidePath"),"published",u("lang"));t((y=a==null?void 0:a.subtree)==null?void 0:y.edges),(u("plantGuidePath")||(($=(C=a==null?void 0:a.subtree)==null?void 0:C.edges)==null?void 0:$.length)>0)&&c(u("plantGuidePath")?u("plantGuidePath"):(i=(w=a.subtree.edges[0])==null?void 0:w.node)==null?void 0:i.path)}catch(a){v(!0),console.log(a)}finally{l(!1),j(!1)}}return h(),()=>{o.abort()}},[u,l]),x.useEffect(()=>{async function o(){var h,y,C,$,w;if(s)try{const i=await z(I,s.toLocaleString(),"published",u("lang"),s,u("plantGuidePath")),a=(y=(h=i==null?void 0:i.subtree)==null?void 0:h.edges)==null?void 0:y.map(b=>{var N;return(N=b==null?void 0:b.node)==null?void 0:N.type});if(a!=null&&a.includes("document"))return r((C=i==null?void 0:i.subtree)==null?void 0:C.edges);if(a!=null&&a.includes("folder"))return r((w=($=i==null?void 0:i.subtree)==null?void 0:$.edges)==null?void 0:w.flatMap(b=>{var N,P;return(P=(N=b==null?void 0:b.node)==null?void 0:N.subtree)==null?void 0:P.edges}))}catch(i){v(!0),console.log(i)}}o()},[s,u]);const m=d==null?void 0:d.filter(o=>{var h,y;if((y=(h=o==null?void 0:o.node)==null?void 0:h.name)!=null&&y.toLowerCase().includes(g.toLowerCase()))return o.node.id==="65f5c043dc43f1a0400eb885"?o.node.productId="541577":o.node.id==="65f5c043dc43f1a0400eb886"?o.node.productId="520896":o.node.id==="65f5c044dc43f1a0400eb887"&&(o.node.productId="529794"),o});return console.log(m),n.jsxs(n.Fragment,{children:[S&&n.jsx(G,{}),p&&n.jsx(M,{}),!p&&n.jsxs("div",{className:"flex flex-col gap-5",children:[n.jsxs("div",{className:"flex gap-2 lg:gap-5",children:[n.jsx(R,{query:g,setQuery:f}),n.jsx(V,{folder:e,setFolder:t,setCategory:c,setQuery:f})]}),m.length<1&&g.length>2?n.jsx(H,{query:g}):n.jsx("ul",{className:"grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-5",children:m==null?void 0:m.map((o,h)=>n.jsx(O,{plantData:o},h))})]})]})}export{B as default};
