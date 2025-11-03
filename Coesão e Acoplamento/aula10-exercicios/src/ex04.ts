class Contato {
    nome: string;
    telefone: string;
    email: string;
  
    constructor(nome: string, telefone: string, email: string) {
      this.nome = nome;
      this.telefone = telefone;
      this.email = email;
    }
  }
  
  class Agenda {
    contatos: Contato[];
  
    constructor() {
      this.contatos = [];
    }
  
    adicionarContato(contato: Contato): void {
      this.contatos.push(contato);
      console.log(`Contato "${contato.nome}" adicionado à agenda.`);
    }
  
    removerrContato(contato: Contato): void {
      const index = this.contatos.indexOf(contato);
      if (index > -1) {
        this.contatos.splice(index, 1);
        console.log(`Contato "${contato.nome}" removido da agenda.`);
      } else {
        console.log(`Contato "${contato.nome}" não encontrado.`);
      }
    }
  
    listarContatos(): void {
      console.log("--- Lista de Contatos ---");
      if (this.contatos.length === 0) {
        console.log("Agenda vazia.");
      } else {
        this.contatos.forEach((c) => {
          console.log(`- Nome: ${c.nome}, Tel: ${c.telefone}, Email: ${c.email}`);
        });
      }
      console.log("-------------------------");
    }
  }
  
  console.log("--- Teste Exercício 4: Agenda de Contatos ---");
  const agenda = new Agenda();
  
  const contato1 = new Contato("Alice", "111-111", "alice@email.com");
  const contato2 = new Contato("Bob", "222-222", "bob@email.com");
  const contato3 = new Contato("Charlie", "333-333", "charlie@email.com");
  
  agenda.adicionarContato(contato1);
  agenda.adicionarContato(contato2);
  agenda.adicionarContato(contato3);
  
  agenda.listarContatos();
  
  agenda.removerrContato(contato2);
  
  agenda.listarContatos();
  console.log("---------------------------------------------");