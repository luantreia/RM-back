/**
 * Fórmulas para calcular el 1RM estimado
 */

const epley = (peso, reps) => {
  if (reps === 1) return peso;
  return peso * (1 + reps / 30);
};

const brzycki = (peso, reps) => {
  if (reps === 1) return peso;
  return peso * (36 / (37 - reps));
};

const lombardi = (peso, reps) => {
  if (reps === 1) return peso;
  return peso * Math.pow(reps, 0.10);
};

const calcularRM = (peso, reps, formula) => {
  const p = parseFloat(peso);
  const r = parseInt(reps);
  
  switch (formula) {
    case 'epley':
      return epley(p, r);
    case 'brzycki':
      return brzycki(p, r);
    case 'lombardi':
      return lombardi(p, r);
    default:
      return epley(p, r);
  }
};

module.exports = {
  calcularRM
};
