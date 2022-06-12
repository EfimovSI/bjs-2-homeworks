"use strict";

function solveEquation(a, b, c) {
  let arr;
  let d = Math.pow(b, 2) - 4 * a * c;
  if (d < 0) {
    arr = [];
  } else if (d === 0) {
    arr = [-b / (2 * a)];
  } else {
    arr = [(-b + Math.sqrt(d)) / (2 * a), (-b - Math.sqrt(d)) / (2 * a)];
  }
  return arr; // array
}

function calculateTotalMortgage(percent, contribution, amount, date) {
  let totalAmount;
  let now = new Date();
  let termDate = new Date(date);
  let loanBody = parseInt(amount) - parseInt(contribution);
  let term = (termDate.getFullYear() - now.getFullYear()) * 12;
  term += termDate.getMonth() - now.getMonth();
  if (termDate.getDate() > now.getDate()) {
    term += 1;
  }
  let p = parseFloat(percent / 12 / 100);
  let monthlyPayment = loanBody * (p + (p / (Math.pow(1 + p, term) - 1)));
  totalAmount = +(monthlyPayment * term).toFixed(2);
  return totalAmount;
}
