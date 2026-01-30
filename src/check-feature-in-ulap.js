// Check Feature in ULAP
(() => {
    try {
        const row = document.querySelector('#assessment-grid .items tbody tr');
        if (!row) throw new Error("No hazard assessment rows found.");

        const loc = row.cells[3].innerText.trim();
        const [lon, lat] = loc.split(',').map(x => parseFloat(x));

        if (isNaN(lat) || isNaN(lon)) throw new Error("Invalid coordinates: " + loc);

        const ulapURL = `https://ulap-portal.georisk.gov.ph/arcgis/apps/webappviewer/index.html?id=8f46bb981d874849b97e0c23f81f6b86&center=${lon},${lat}&level=17`;

        window.open(ulapURL, '_blank');

        setTimeout(() => alert("🧭 ULAP viewer opened.\nCheck if your polygon appears.\nIf not, go back and re-sync."), 500);
    } catch (e) {
        alert("❌ Failed: " + e.message);
    }
})();
