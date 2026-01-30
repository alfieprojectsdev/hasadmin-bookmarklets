# hasadmin-bookmarklets

A collection of productivity bookmarklets for hazard assessment workflows, designed for use with the GeoRisk PH platforms and related web tools.

## Bookmarklets

### 1. Check Feature in ULAP

**File:** [Check Feature in ULAP.js](Check%20Feature%20in%20ULAP.js)

- Opens the ULAP web app viewer centered on the coordinates of the first hazard assessment row found in the current page.
- Helps quickly verify if a polygon or feature appears in ULAP after syncing.
- Alerts the user if no coordinates are found or if the format is invalid.

### 2. HAM Filename Generator
<!-- deprecated; current version in `ham-filename-extension` -->

**File:** [HAMFilenameGenerator.js](HAMFilenameGenerator.js)
- Extracts key fields (Request ID, Hazard Type, Client, Location) from the current page.
- Normalizes and combines these fields to generate a standardized filename for HAM (Hazard Assessment Map) outputs.
- Copies the generated filename to the clipboard and alerts the user.

### 3. Parse Request for Coords

**File:** [Parse Request for Coords.js](Parse%20Request%20for%20Coords.js)

- Scans the page for coordinates in DMS (degrees, minutes, seconds) format within remarks columns.
- Converts found coordinates to decimal degrees and copies them to the clipboard.
- If no coordinates are found, attempts to find and copy KMZ/KML download links.
- Alerts the user if neither coordinates nor download links are found.

## Usage

1. Open the desired JavaScript file.
2. Copy the code starting with `javascript:(...)`.
3. Create a new bookmark in your browser and paste the code as the URL.
4. Use the bookmarklet on supported web pages to automate repetitive tasks.

## License

MIT License. See individual files