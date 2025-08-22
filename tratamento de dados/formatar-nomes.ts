import { readFile, writeFile } from 'fs/promises';

function capitalizarNome(nome: string): string {
  const preposicoes: string[] = ['de', 'da', 'das', 'do', 'dos', 'e'];
  const palavras = nome.toLowerCase().split(' ');

  const palavrasCapitalizadas = palavras.map((palavra, index) => {
    if (index === 0 || !preposicoes.includes(palavra)) {
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    } else {
      return palavra;
    }
  });

  return palavrasCapitalizadas.join(' ');
}

async function processarNomes(): Promise<void> {
  const arquivoEntrada = 'nomes.csv';
  const arquivoSaida = 'nomes_formatados.csv';

  try {
    const conteudo = await readFile(arquivoEntrada, 'utf8');

    const nomes = conteudo.split(/\r?\n/)
                         .filter(nome => nome.trim() !== '')
                         .map(capitalizarNome);

    const conteudoFinal = nomes.join('\n');

    await writeFile(arquivoSaida, conteudoFinal, 'utf8');

    console.log(`Arquivo "${arquivoSaida}" criado com sucesso!`);

  } catch (error) {
    console.error('Ocorreu um erro durante o processo:', error);
  }
}

processarNomes();