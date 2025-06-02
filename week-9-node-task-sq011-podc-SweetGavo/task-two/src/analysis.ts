import { readFile, writeFile } from 'fs/promises';

export const analyzeFiles = async (inputPaths: string[], outputFile: string): Promise<void> => {
  const domainGroups = new Map<string, Set<string>>();

  for (const path of inputPaths) {
    const content = await readFile(path, 'utf-8');
    const emails = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
    
    for (const email of emails) {
      const domain = email.split('@')[1];
      if (!domainGroups.has(domain)) {
        domainGroups.set(domain, new Set());
      }
      domainGroups.get(domain)?.add(email);
    }
  }

  // Convert Map to object without using Object.fromEntries
  const groupedEmails = Array.from(domainGroups.entries()).reduce((obj, [domain, emails]) => {
    obj[domain] = Array.from(emails);
    return obj;
  }, {} as Record<string, string[]>);

  await writeFile(outputFile, JSON.stringify(groupedEmails, null, 2));
};

const h = (h) => {
  // ... existing code ...
};

const objectFromEntries = (entries) => {
  return entries.reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};
const domainGroups = new Map();
const groupedEmails = objectFromEntries(
  Array.from(domainGroups.entries()).map((entry) => [
    entry[0],
    Array.from(entry[1]),
  ]),
);
