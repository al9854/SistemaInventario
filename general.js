export function Validar(dato){
   //si esta vacio retorna true
   return !dato.trim();
}

export function Mensaje(texto, tipo = "success") {
   const contenedor = document.createElement("div");
   contenedor.style.position = "fixed";
   contenedor.style.top = "0";
   contenedor.style.left = "0";
   contenedor.style.width = "100vw";
   contenedor.style.height = "100vh";
   contenedor.style.background = "rgba(0, 0, 0, 0.5)";
   contenedor.style.display = "flex";
   contenedor.style.justifyContent = "center";
   contenedor.style.alignItems = "center";
   contenedor.style.zIndex = "1000";

   const mensaje = document.createElement("div");
   mensaje.style.padding = "20px 40px";
   mensaje.style.borderRadius = "10px";
   mensaje.style.background = "#fff";
   mensaje.style.color = tipo === "success" ? "#4CAF50" : tipo === "danger" ? "#F44336" : tipo === "warning" ? "#FFC107" : "#333";
   mensaje.style.fontSize = "18px";
   mensaje.style.fontWeight = "bold";
   mensaje.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
   mensaje.innerText = texto;

   contenedor.appendChild(mensaje);
   document.body.appendChild(contenedor);

   contenedor.addEventListener("click", () => document.body.removeChild(contenedor));

   setTimeout(() => {
       if (document.body.contains(contenedor)) {
           document.body.removeChild(contenedor);
       }
   }, 3000);
}
