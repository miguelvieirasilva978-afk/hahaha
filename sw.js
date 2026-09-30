const CACHE_NOME = "eletroeletronica-ifal-v1";
const ARQUIVOS_BASE = [
  "index.html",
  "inicio.html",
  "sobre.html",
  "videoaulas.html",
  "exercicios.html",
  "simuladores.html",
  "projetos.html",
  "jogos.html",
  "fontes.html",
  "style.css",
  "script.js",
  "manifest.json",
  "icones/icon-192.png",
  "icones/icon-512.png",
  "imagens/pcb-solda.jpg"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NOME).then((cache) => cache.addAll(ARQUIVOS_BASE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(
        nomes.filter((nome) => nome !== CACHE_NOME).map((nome) => caches.delete(nome))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((resposta) => resposta || fetch(evento.request))
  );
});
