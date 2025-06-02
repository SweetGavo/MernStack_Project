import { existsSync } from 'fs';
import { extname } from 'path';

const isTextFile = (filePath: string): boolean => {
  const textExtensions = ['.txt', '.log', '.md'];
  return textExtensions.includes(extname(filePath).toLowerCase());
};

const isValidEmailFormat = (email: string): boolean => {
  // Updated regex without unnecessary escapes
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validateInputs = (
  inputPaths: string[],
  outputFile: string,
): string | null => {
  if (!inputPaths.length) {
    return 'No input files provided';
  }

  for (const path of inputPaths) {
    if (!existsSync(path)) {
      return `File not found: ${path}`;
    }
    if (!isTextFile(path)) {
      return `Invalid file type: ${path}`;
    }
  }

  if (!outputFile) {
    return 'No output file specified';
  }

  if (!isTextFile(outputFile)) {
    return 'Output file must be a text file';
  }

  return null;
}; 