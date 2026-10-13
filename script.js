const folhas = document.querySelectorAll(".folha");
const visualizador = document.getElementById("visualizador");
const tituloAmpliado = document.getElementById("titulo-ampliado");
const textoAmpliado = document.getElementById("texto-ampliado");
const imagemAmpliada = document.getElementById("imagem-ampliada");
const botaoFechar = document.querySelector(".fechar");

folhas.forEach((folha) => {
  folha.addEventListener("click", () => {
    tituloAmpliado.textContent = folha.dataset.titulo || "Sem título";
    textoAmpliado.textContent = folha.dataset.texto || "";

    const caminhoImagem = (folha.dataset.imagem || "").trim();

    if (caminhoImagem) {
      imagemAmpliada.src = caminhoImagem;
      imagemAmpliada.alt = folha.dataset.titulo
        ? "Imagem: " + folha.dataset.titulo
        : "Imagem da folha";
      imagemAmpliada.classList.add("visivel");

      imagemAmpliada.onerror = () => {
        imagemAmpliada.classList.remove("visivel");
        imagemAmpliada.removeAttribute("src");
        console.warn("Não foi possível carregar a imagem:", caminhoImagem);
      };
    } else {
      imagemAmpliada.classList.remove("visivel");
      imagemAmpliada.removeAttribute("src");
    }

    visualizador.showModal();
  });
});

botaoFechar.addEventListener("click", () => visualizador.close());

// Clicar no fundo escuro fecha automatico
visualizador.addEventListener("click", (evento) => {
  if (evento.target === visualizador) {
    visualizador.close();
  }
});

const musica = document.getElementById("musica-fundo");

musica.volume = 0.3;

musica.addEventListener("error", () => {
  console.error("Erro ao carregar o áudio:", musica.error);
});

musica.addEventListener("canplay", () => {
  console.log("Áudio carregado e pronto para tocar!");
});

document.addEventListener("click", function tocarMusica() {
  musica.play().then(() => {
    console.log("Música iniciada!");
  }).catch((erro) => {
    console.error("Não foi possível tocar a música:", erro);
  });
}, { once: true });