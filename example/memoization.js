function isPrime(value) {
  // 创建缓存
  const answers = isPrime.answers || (isPrime.answers = {});

  if (answers[value] !== undefined) {
    return answers[value];
  }

  console.log(123);

  let prime = value !== 0 && value !== 1; 

  for (var i = 2; i < value; i++) {
    if (value % i === 0) {
      prime = false;
      break;
    }
  }

  return answers[value] = prime;
}

console.log(isPrime(5));
console.log(isPrime(5));
console.log(isPrime(6));
console.log(isPrime(0));
