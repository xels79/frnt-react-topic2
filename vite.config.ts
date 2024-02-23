import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { OutgoingHttpHeader } from 'http';

type obj1 = {[index:string]:string|undefined};
const renderHeaders = (h:obj1):string[]=>{
  const keys:string[] = Object.keys(h);
  const rVal:string[] = [];
  keys.forEach(key=>{
    const k = key as string;
    if (k){
      rVal.push(`"${k}" : "${h[k]}"`);
    }
  })
  return rVal;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://a-xels.ru:8100',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log(
              "Sending Request:",
              req.method,
              req.url,
              " => TO THE TARGET =>  ",
              proxyReq.method+"\n",
              proxyReq.protocol+"\n",
              proxyReq.host+"\n",
              proxyReq.path+"\n",
              //"**** HEADERS: ****\n",
              //renderHeaders((proxyReq.getHeaders()) as obj1).join("\n"),
              //JSON.stringify(proxyReq.getHeaders()),
            );
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url,
              //JSON.stringify(proxyRes.headers),
            );
          });
        },
      }
    }
  }

})
