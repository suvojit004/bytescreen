const fs = require("fs/promises");
const path = require("path");

// Downloadable documents live in src/public/resources/<folder>/ and are served at /resources/<folder>/<file>
const RESOURCES_DIR = path.join(__dirname, "..", "public", "resources");

// Words kept in capitals when file names are written in ALL CAPS
const ACRONYMS = new Set([
    "AAA", "ARP", "BT", "CIPS", "DHCP", "DNS", "FWAAS", "GEO", "IP", "LAN", "NAT", "NGFW",
    "NMS", "PDF", "PPPOE", "SD", "SSL", "VPN", "WAN",
]);

// ALL-CAPS words become Title Case unless they are acronyms or contain digits (e.g. "V1");
// mixed-case words such as "ARPing" or "FWaaS" are left exactly as written
const tidyWord = (word) => {
    if (word !== word.toUpperCase() || /\d/.test(word) || ACRONYMS.has(word)) return word;
    return word.charAt(0) + word.slice(1).toLowerCase();
};

// "Country-or-GEO-Filter-Configuration.pdf" → "Country or GEO Filter Configuration"
// "BT-NETWORK-SECURITY-BROCHURE-1.pdf"      → "BT Network Security Brochure 1"
// stripPrefix removes a repeated start, e.g. "Troubleshooting-" → "Troubleshooting-PING.pdf" becomes "Ping"
const titleFromFileName = (fileName, stripPrefix = "") => {
    let name = path.parse(fileName).name;
    if (stripPrefix && name.toLowerCase().startsWith(stripPrefix.toLowerCase())) {
        name = name.slice(stripPrefix.length);
    }
    return name.split(/[-_\s]+/).filter(Boolean).map(tidyWord).join(" ");
};

// List the PDFs in a resources folder, sorted by title. A missing folder returns an empty list.
const listDocuments = async (folder, { stripPrefix } = {}) => {
    let entries;
    try {
        entries = await fs.readdir(path.join(RESOURCES_DIR, folder), { withFileTypes: true });
    } catch (e) {
        if (e.code === "ENOENT") return [];
        throw e;
    }

    return entries
        .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === ".pdf")
        .map((entry) => ({
            title: titleFromFileName(entry.name, stripPrefix),
            fileName: entry.name,
            url: `/resources/${encodeURIComponent(folder)}/${encodeURIComponent(entry.name)}`,
        }))
        .sort((a, b) => a.title.localeCompare(b.title));
};

module.exports = {
    listDocuments,
};
