
import React, { useState } from 'react';
import { Calculator, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ResultsDisplay from './ResultsDisplay';
import { validateInput, calculateFactorialIterative, calculateFactorialRecursive } from '../utils/factorialUtils';

interface CalculationResult {
  value: string;
  time: number;
  method: string;
}

interface ValidationError {
  isValid: boolean;
  message: string;
}

const FactorialCalculator = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{
    iterative: CalculationResult | null;
    recursive: CalculationResult | null;
  }>({
    iterative: null,
    recursive: null,
  });
  const [validation, setValidation] = useState<ValidationError>({
    isValid: true,
    message: '',
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Real-time validation
    const validationResult = validateInput(value);
    setValidation(validationResult);
    
    // Clear results if input becomes invalid
    if (!validationResult.isValid) {
      setResults({ iterative: null, recursive: null });
    }
  };

  const handleCalculate = async () => {
    const validationResult = validateInput(input);
    
    if (!validationResult.isValid) {
      setValidation(validationResult);
      return;
    }

    setIsCalculating(true);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const number = parseInt(input);
    
    try {
      // Calculate iterative
      const startIterative = performance.now();
      const iterativeResult = calculateFactorialIterative(number);
      const endIterative = performance.now();
      
      // Calculate recursive
      const startRecursive = performance.now();
      const recursiveResult = calculateFactorialRecursive(number);
      const endRecursive = performance.now();
      
      setResults({
        iterative: {
          value: iterativeResult,
          time: endIterative - startIterative,
          method: 'Iterative',
        },
        recursive: {
          value: recursiveResult,
          time: endRecursive - startRecursive,
          method: 'Recursive',
        },
      });
    } catch (error) {
      setValidation({
        isValid: false,
        message: 'Number too large to calculate safely',
      });
    }
    
    setIsCalculating(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && validation.isValid && input.trim()) {
      handleCalculate();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-gray-800">
            <Calculator className="h-6 w-6 text-blue-600" />
            Calculate Factorial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="number-input" className="text-lg font-medium text-gray-700">
              Enter a positive integer (0 ≤ n ≤ 170)
            </Label>
            <div className="relative">
              <Input
                id="number-input"
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="e.g., 5"
                className={`text-lg p-4 ${
                  validation.isValid 
                    ? 'border-gray-300 focus:border-blue-500' 
                    : 'border-red-500 focus:border-red-500'
                }`}
                disabled={isCalculating}
              />
              {input && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validation.isValid ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {!validation.isValid && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {validation.message}
              </div>
            )}
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!validation.isValid || !input.trim() || isCalculating}
            className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            {isCalculating ? (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 animate-spin" />
                Calculating...
              </div>
            ) : (
              'Calculate Factorial'
            )}
          </Button>
        </CardContent>
      </Card>

      {(results.iterative || results.recursive) && (
        <ResultsDisplay results={results} inputNumber={parseInt(input)} />
      )}
    </div>
  );
};

export default FactorialCalculator;
