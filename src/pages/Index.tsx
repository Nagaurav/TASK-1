
import FactorialCalculator from '../components/FactorialCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Factorial Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate factorials using both iterative and recursive methods with real-time validation and performance comparison
          </p>
        </div>
        <FactorialCalculator />
      </div>
    </div>
  );
};

export default Index;
