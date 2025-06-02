import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

type AnalysisReport = {
  totalEmails: number;
  uniqueEmails: number;
  duplicateEmails: string[];
  domains: {
    [domain: string]: string[];
  };
};

/**
 * Analyse CSV files for email addresses
 * @param inputPaths - Array of CSV file paths
 * @param outputPath - Path to write the output JSON file
 */
async function analyseFiles(inputPaths: string[], outputPath: string) {
  const emailSet = new Set<string>();
  const duplicateEmails: string[] = [];
  const domainMap: Record<string, Set<string>> = {};

  for (const filePath of inputPaths) {
    const absolutePath = path.resolve(filePath);
    const content = fs.readFileSync(absolutePath, 'utf-8');

    const records: string[][] = parse(content, {
      skip_empty_lines: true,
    });

    const header = records[0];
    const emailIndex = header.findIndex(h => h.toLowerCase() === 'email');

    if (emailIndex === -1) {
      console.warn(`⚠️ No 'email' column in: ${filePath}`);
      continue;
    }

    for (let i = 1; i < records.length; i++) {
      const row = records[i];
      const email = row[emailIndex]?.toLowerCase().trim();
      if (!email) continue;

      if (emailSet.has(email)) {
        duplicateEmails.push(email);
      } else {
        emailSet.add(email);
        const domain = email.split('@')[1];
        if (!domainMap[domain]) domainMap[domain] = new Set();
        domainMap[domain].add(email);
      }
    }
  }

  const report: AnalysisReport = {
    totalEmails: emailSet.size + duplicateEmails.length,
    uniqueEmails: emailSet.size,
    duplicateEmails,
    domains: Object.fromEntries(
      Object.entries(domainMap).map(([domain, emails]) => [domain, Array.from(emails)])
    ),
  };

  const finalOutput = path.resolve(outputPath);
  fs.writeFileSync(finalOutput, JSON.stringify(report, null, 2), 'utf-8');

  console.log(`✅ Analysis complete. Report saved to ${finalOutput}`);
}

export default analyseFiles;
