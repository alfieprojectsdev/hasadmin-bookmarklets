// HAMFilenameGenerator.js
javascript:(() => {
  // Grab all visible text from the current page
  const text = document.body.innerText;

  // Extract the value after a given field label using regex
  const get = (label) => {
    // Matches the pattern: "Label<TAB or SPACES>value<NEWLINE>"
    const match = text.match(new RegExp(label + '\\s+(.+?)\\n'));
    return match ? match[1].trim() : '';
  };

  // Normalize client name: remove punctuation, PascalCase each word
  const normalizeClient = (name) =>
    name
      .replace(/[^a-zA-Z0-9 ]/g, '') // Remove anything not alphanumeric or space
      .split(/\s+/)                  // Split by whitespace
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) // PascalCase
      .join('');

  // Normalize location: PascalCase and format as Province-City-BrgyBarangay
  const normalizeLoc = (prov, city, brgy) =>
    [prov, city, 'Brgy' + brgy]
      .map(s =>
        s.trim()
         .split(/\s+/)
         .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
         .join('')
      ).join('-');

  // Mapping of hazard names to shorthand codes
  const hazardMap = {
    'Active Fault': 'AF',
    'Liquefaction': 'LIQ',
    'Landslide - Earthquake - Induced': 'EIL',
    'Tsunami': 'TSU',
    // Extend this list as needed
  };

  // Extract fields from the page
  const reqId = get('Request');
  const hazards = get('Hazard Type');
  const client = get('Requested For');
  const loc = get('Province, City, Barangay').split(',');

  // Convert matched hazards into their respective codes (e.g., AF-TSU)
  const hazardCodes = Object.entries(hazardMap)
    .filter(([key]) => hazards.includes(key)) // Match any part of the string
    .map(([, val]) => val)
    .join('-');

  // Build the final filename using normalized pieces
  const filename = `${reqId}_${hazardCodes}_${normalizeLoc(loc[2] || '', loc[1] || '', loc[0] || '')}_${normalizeClient(client)}_arp.jpg`;

  // Copy the filename to clipboard and alert the user
  navigator.clipboard.writeText(filename);
  alert(`📄 HAM Filename copied to clipboard:\n\n${filename}`);
})();
