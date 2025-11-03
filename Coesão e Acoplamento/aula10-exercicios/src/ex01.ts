class ContaBancaria {
    private saldo: number;
  
    constructor() {
      this.saldo = 0;
    }
  
    depositar(valor: number): void {
      if (valor > 0) {
        this.saldo += valor;
        console.log(`Depósito de R$${valor.toFixed(2)} realizado com sucesso.`);
      } else {
        console.log("Valor de depósito inválido.");
      }
    }
  
    sacar(valor: number): void {
      if (valor > 0 && valor <= this.saldo) {
        this.saldo -= valor;
        console.log(`Saque de R$${valor.toFixed(2)} realizado com sucesso.`);
      } else if (valor > this.saldo) {
        console.log("Saldo insuficiente para este saque.");
      } else {
        console.log("Valor de saque inválido.");
      }
    }
  
    getSaldo(): number {
      return this.saldo;
    }
  }
  
  class Cliente {
    private nome: string;
    private cpf: string;
    private nasc: Date;
    private nomemae: string;
    private conta: ContaBancaria;
  
    constructor(
      nome: string,
      cpf: string,
      nasc: Date,
      nomemae: string,
      conta: ContaBancaria
    ) {
      this.nome = nome;
      this.cpf = cpf;
      this.nasc = nasc;
      this.nomemae = nomemae;
      this.conta = conta;
    }
  
    depositar(valor: number): void {
      this.conta.depositar(valor);
    }
  
    sacar(valor: number): void {
      this.conta.sacar(valor);
    }
  
    verSaldo(): void {
      console.log(`Saldo atual da conta: R$${this.conta.getSaldo().toFixed(2)}`);
    }
  }
  
  const minhaConta = new ContaBancaria();
  
  const cliente = new Cliente(
    "Seu Nome Aqui",
    "123.456.789-00",
    new Date("1990-01-01"),
    "Primeiro Nome Mae",
    minhaConta
  );
  
  console.log("--- Teste Exercício 1: Conta Bancária ---");
  cliente.verSaldo();
  
  cliente.depositar(100.00);
  cliente.verSaldo();
  
  cliente.sacar(50.00);
  cliente.verSaldo();
  
  cliente.sacar(60.00);
  cliente.verSaldo();
  console.log("-----------------------------------------");