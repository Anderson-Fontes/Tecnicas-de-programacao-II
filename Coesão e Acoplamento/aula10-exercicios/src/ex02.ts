class CarrinhoDeCompras {
    private itens: string[];
  
    constructor() {
      this.itens = [];
    }
  
    adicionarItem(item: string): void {
      this.itens.push(item);
      console.log(`"${item}" foi adicionado ao carrinho.`);
      this.atualizarLista();
    }
  
    removerItem(item: string): void {
      const index = this.itens.indexOf(item);
      if (index > -1) {
        this.itens.splice(index, 1);
        console.log(`"${item}" foi removido do carrinho.`);
      } else {
        console.log(`"${item}" não foi encontrado no carrinho.`);
      }
      this.atualizarLista();
    }
  
    imprimir(): void {
      console.log("Itens no carrinho:");
      if (this.itens.length === 0) {
        console.log("O carrinho está vazio.");
      } else {
        this.itens.forEach((item, index) => {
          console.log(`${index + 1}. ${item}`);
        });
      }
    }
  
    private atualizarLista(): void {}
  }
  
  console.log("--- Teste Exercício 2: Carrinho de Compras ---");
  const carrinho = new CarrinhoDeCompras();
  carrinho.adicionarItem("Camiseta");
  carrinho.adicionarItem("Calça");
  carrinho.adicionarItem("Meia");
  console.log("---");
  carrinho.imprimir();
  console.log("---");
  carrinho.removerItem("Camiseta");
  console.log("---");
  carrinho.imprimir();
  console.log("----------------------------------------------");