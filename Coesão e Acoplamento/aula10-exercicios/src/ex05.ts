class AutenticacaoDeUsuario {
    private usuarios: Map<string, string>;
  
    constructor() {
      this.usuarios = new Map<string, string>();
    }
  
    registrarUsuario(usuario: string, senha: string): void {
      if (this.usuarios.has(usuario)) {
        console.log(`Usuário "${usuario}" já existe.`);
      } else {
        this.usuarios.set(usuario, senha);
        console.log(`Usuário "${usuario}" registrado com sucesso.`);
      }
    }
  
    autenticarUsuario(usuario: string, senha: string): boolean {
      if (!this.usuarios.has(usuario)) {
        return false;
      }
      return this.usuarios.get(usuario) === senha;
    }
  }
  
  console.log("--- Teste Exercício 5: Autenticação de Usuário ---");
  const autenticacao = new AutenticacaoDeUsuario();
  autenticacao.registrarUsuario("alice", "senha123");
  autenticacao.registrarUsuario("bob", "outrasenha");
  
  let usuarioAutenticado = autenticacao.autenticarUsuario("alice", "senha123");
  if (usuarioAutenticado) {
    console.log("Usuário 'alice' autenticado com sucesso!");
  } else {
    console.log("Falha na autenticação do Usuário 'alice'!");
  }
  
  usuarioAutenticado = autenticacao.autenticarUsuario("bob", "senhaerrada");
  if (usuarioAutenticado) {
    console.log("Usuário 'bob' autenticado com sucesso!");
  } else {
    console.log("Falha na autenticação do Usuário 'bob' (senha incorreta)!");
  }
  
  usuarioAutenticado = autenticacao.autenticarUsuario("charlie", "senha123");
  if (usuarioAutenticado) {
    console.log("Usuário 'charlie' autenticado com sucesso!");
  } else {
    console.log("Falha na autenticação do Usuário 'charlie' (usuário inexistente)!");
  }
  console.log("--------------------------------------------------");