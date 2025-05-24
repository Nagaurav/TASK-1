
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const validateInput = (input: string): ValidationResult => {
  // Check if input is empty
  if (!input.trim()) {
    return {
      isValid: false,
      message: 'Please enter a number',
    };
  }

  // Check if input contains non-numeric characters (except for leading/trailing spaces)
  const trimmedInput = input.trim();
  if (!/^\d+$/.test(trimmedInput)) {
    return {
      isValid: false,
      message: 'Please enter only positive integers (no decimals, letters, or special characters)',
    };
  }

  // Convert to number and check if it's a valid integer
  const number = parseInt(trimmedInput, 10);
  
  // Check for NaN (shouldn't happen with our regex, but safety check)
  if (isNaN(number)) {
    return {
      isValid: false,
      message: 'Please enter a valid number',
    };
  }

  // Check if number is negative (shouldn't happen with our regex, but safety check)
  if (number < 0) {
    return {
      isValid: false,
      message: 'Please enter a non-negative integer (≥ 0)',
    };
  }

  // Check if number is too large (factorial of numbers > 170 causes overflow in JavaScript)
  if (number > 170) {
    return {
      isValid: false,
      message: 'Number too large (maximum: 170). Larger numbers cause overflow.',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

export const calculateFactorialIterative = (n: number): string => {
  if (n === 0 || n === 1) {
    return '1';
  }

  let result = BigInt(1);
  for (let i = 2; i <= n; i++) {
    result *= BigInt(i);
  }

  return result.toString();
};

export const calculateFactorialRecursive = (n: number): string => {
  const factorial = (num: number): bigint => {
    if (num === 0 || num === 1) {
      return BigInt(1);
    }
    return BigInt(num) * factorial(num - 1);
  };

  return factorial(n).toString();
};

export const formatLargeNumber = (numberStr: string): string => {
  // Add commas to large numbers for better readability
  return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getFactorialInfo = (n: number): string => {
  if (n === 0) return "0! = 1 (by definition)";
  if (n === 1) return "1! = 1";
  
  const result = calculateFactorialIterative(n);
  const digitCount = result.length;
  
  return `${n}! has ${digitCount} digit${digitCount > 1 ? 's' : ''}`;
};
