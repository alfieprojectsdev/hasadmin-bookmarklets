# hasadmin-bookmarklets

A collection of productivity bookmarklets for hazard assessment workflows, designed for use with the GeoRisk PH platforms and related web tools.

## Installation

We have simplified the installation process. You can install these bookmarklets by dragging the buttons from our installation page regarding the bookmarks bar.

**[👉 Open Installation Page](docs/index.html)**

> Note: If you are viewing this on GitHub, you can use the GitHub Pages link (if enabled) or download the repository and open `docs/index.html` locally.

## Bookmarklets

### 1. Check Feature in ULAP

**Source:** [src/check-feature-in-ulap.js](src/check-feature-in-ulap.js)

- Opens the ULAP web app viewer centered on the coordinates of the first hazard assessment row found in the current page.
- Helps quickly verify if a polygon or feature appears in ULAP after syncing.
- Alerts the user if no coordinates are found or if the format is invalid.

### 2. Parse Request for Coords

**Source:** [src/parse-request-coords.js](src/parse-request-coords.js)

- Scans the page for coordinates in DMS (degrees, minutes, seconds) format within remarks columns.
- Converts found coordinates to decimal degrees and copies them to the clipboard.
- If no coordinates are found, attempts to find and copy KMZ/KML download links.
- Alerts the user if neither coordinates nor download links are found.

### ⚠️ Deprecated

#### HAM Filename Generator
> **Status:** Deprecated. This tool has been superseded by the **HAM Filename Extension** (Chrome Extension).
> The source for this bookmarklet has been moved to the `archive/` directory for reference.

- *Historically used to extract key fields and generate standardized filenames.*

## Development

1.  edit files in `src/`.
2.  run `npm install` (once).
3.  run `npm run build` to update the `docs/index.html` file.

## License

MIT License. See individual files