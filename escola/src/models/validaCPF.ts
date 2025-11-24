// src/models/validaCPF.ts
export function isValidCPF (value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  // Remove caracteres não-dígitos
  value = value.replace(/[^\d]+/g,'');

  // Verifica se tem 11 dígitos e se não são todos iguais
  if (value.length !== 11 || !! value.match(/(\d)\1{10}/)) {
    return false;
  }

  const values = value.split('').map(el => +el);
  // Calcula o dígito verificador
  const rest = (count: number) => (values.slice(0, count - 1).reduce((soma, el, index) =>
    (soma + el * (count - index)), 0) * 10) % 11 % 10;

  // Compara os dígitos verificadores calculados com os informados
  return rest(10) === values [9] && rest(11) === values [10];
}