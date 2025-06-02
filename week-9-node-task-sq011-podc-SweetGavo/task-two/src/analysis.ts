const h = (h) => {
  // ... existing code ...
}

const objectFromEntries = (entries) => {
  return entries.reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

const groupedEmails = objectFromEntries(
  Array.from(domainGroups.entries()).map(([
    domain,
    emails,
  ]) => [
    domain,
    Array.from(emails),
  ])
); 