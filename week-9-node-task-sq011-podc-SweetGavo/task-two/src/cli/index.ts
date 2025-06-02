import { validateInputs } from '../validation';
import { analyzeFiles } from '../analysis';

const handleError = (error: Error): never => {
  console.error('Error:', error.message);
  throw error;
};

export const run = async (inputPaths: string[], outputFile: string): Promise<void> => {
  try {
    // Validate inputs
    const validationError = validateInputs(inputPaths, outputFile);
    if (validationError) {
      handleError(new Error(validationError));
    }

    // Analyze files
    await analyzeFiles(inputPaths, outputFile);
    console.log('Analysis complete! Results written to:', outputFile);
  } catch (error) {
    handleError(error as Error);
  }
}; 