class Item {
    descricao: string;
    valor: number;
    quantidade: number;
  
    constructor(descricao: string, valor: number, quantidade: number) {
      this.descricao = descricao;
      this.valor = valor;
      this.quantidade = quantidade;
    }
  }
  
  class Carrinho {
    itens: Item[];
  
    constructor() {
      this.itens = [];
    }
  
    adicionarItem(item: Item): void {
      this.itens.push(item);
      console.log(`Item "${item.descricao}" adicionado.`);
    }
  
    removerItem(item: Item): void {
      const index = this.itens.indexOf(item);
      if (index > -1) {
        this.itens.splice(index, 1);
        console.log(`Item "${item.descricao}" removido.`);
      }
    }
  
    calcularTotal(): number {
      let total = 0;
      for (const item of this.itens) {
        total += item.valor * item.quantidade;
      }
      return total;
    }
  }
  
  class Pagamento {
    processarPagamento(total: number, forma: string): void {
      console.log(
        `Pagamento de R$${total.toFixed(
          2
        )} em ${forma}, processado com sucesso!`
      );
    }
  }
  
  console.log("--- Teste Exercício 3: Carrinho e Pagamento ---");
  const carrinhoc = new Carrinho();
  let item = new Item("Camiseta", 50, 2);
  carrinhoc.adicionarItem(item);
  item = new Item("Calça", 130, 1);
  carrinhoc.adicionarItem(item);
  item = new Item("Meia", 20, 3);
  carrinhoc.adicionarItem(item);
  
  const total = carrinhoc.calcularTotal();
  console.log(`Total do carrinho: R$${total.toFixed(2)}`);
  
  const pagamento = new Pagamento();
  pagamento.processarPagamento(total, "dinheiro");
  console.log("-----------------------------------------------");