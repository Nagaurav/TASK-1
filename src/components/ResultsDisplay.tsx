
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, RefreshCw } from 'lucide-react';

interface CalculationResult {
  value: string;
  time: number;
  method: string;
}

interface ResultsDisplayProps {
  results: {
    iterative: CalculationResult | null;
    recursive: CalculationResult | null;
  };
  inputNumber: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, inputNumber }) => {
  const formatTime = (time: number): string => {
    if (time < 1) return `${(time * 1000).toFixed(2)}μs`;
    return `${time.toFixed(3)}ms`;
  };

  const formatResult = (value: string): string => {
    if (value.length > 50) {
      return `${value.substring(0, 47)}...`;
    }
    return value;
  };

  const getFasterMethod = (): string | null => {
    if (!results.iterative || !results.recursive) return null;
    return results.iterative.time < results.recursive.time ? 'iterative' : 'recursive';
  };

  const fasterMethod = getFasterMethod();

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Results for {inputNumber}!
        </h3>
        <p className="text-gray-600">
          Comparing iterative vs recursive factorial calculations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {results.iterative && (
          <Card className={`shadow-lg transition-all duration-300 hover:shadow-xl ${
            fasterMethod === 'iterative' ? 'ring-2 ring-green-500 bg-green-50/50' : 'bg-white/80'
          } backdrop-blur-sm`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Iterative Method
                </div>
                {fasterMethod === 'iterative' && (
                  <Badge className="bg-green-500 text-white">Faster</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Result:</p>
                <p className="text-lg font-mono bg-gray-100 p-2 rounded break-all">
                  {formatResult(results.iterative.value)}
                </p>
                {results.iterative.value.length > 50 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Full result: {results.iterative.value.length} digits
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                Execution time: {formatTime(results.iterative.time)}
              </div>
            </CardContent>
          </Card>
        )}

        {results.recursive && (
          <Card className={`shadow-lg transition-all duration-300 hover:shadow-xl ${
            fasterMethod === 'recursive' ? 'ring-2 ring-green-500 bg-green-50/50' : 'bg-white/80'
          } backdrop-blur-sm`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-purple-600" />
                  Recursive Method
                </div>
                {fasterMethod === 'recursive' && (
                  <Badge className="bg-green-500 text-white">Faster</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Result:</p>
                <p className="text-lg font-mono bg-gray-100 p-2 rounded break-all">
                  {formatResult(results.recursive.value)}
                </p>
                {results.recursive.value.length > 50 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Full result: {results.recursive.value.length} digits
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                Execution time: {formatTime(results.recursive.time)}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {fasterMethod && results.iterative && results.recursive && (
        <Card className="bg-blue-50/50 border-blue-200">
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-800">
                The <span className="font-bold">{fasterMethod}</span> method was{' '}
                {(Math.max(results.iterative.time, results.recursive.time) / 
                  Math.min(results.iterative.time, results.recursive.time)).toFixed(1)}x faster
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Performance may vary based on input size and browser optimization
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsDisplay;
