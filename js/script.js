// Menu mobile
const botaoMenu = document.querySelector(".menu-botao");
const menu = document.getElementById("menu");

function fecharMenu() {
  menu.classList.remove("aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(aberto));
  document.body.style.overflow = aberto ? "hidden" : "";
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenu(); });

// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Formulário de contato (validação simples, sem back-end)
const form = document.getElementById("formulario");
const status = form.querySelector(".form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = form.nome;
  const email = form.email;
  let valido = true;

  [nome, email].forEach((campo) => {
    const ok = campo.value.trim() !== "" && campo.checkValidity();
    campo.classList.toggle("invalido", !ok);
    if (!ok) valido = false;
  });

  if (!valido) {
    status.className = "form-status erro";
    status.textContent = "Preencha nome e um e-mail válido para enviar.";
    return;
  }

  // Aqui você pode integrar com um serviço de envio (Formspree, EmailJS, back-end próprio etc.)
  status.className = "form-status ok";
  status.textContent = `Mensagem enviada. Obrigado, ${nome.value.trim().split(" ")[0]}! Entraremos em contato em breve.`;
  form.reset();
});
