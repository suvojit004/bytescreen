// Customer list shown on /customers (source: Customer List.pdf).
// Logos live in src/public/images/customers/<logo>.png

const CUSTOMER_GROUPS = [
  {
    id: "government",
    title: "Government & public sector",
    customers: [
      { name: "Defence Estates Organisation", logo: "defence-estates" },
      { name: "Government of Bihar", logo: "bihar-sarkar" },
      { name: "Corps of Signals", logo: "corps-of-signals" },
      { name: "TS Transco", logo: "ts-transco" },
      { name: "TG Transco", logo: "tg-transco" },
      { name: "Military Engineer Services", logo: "military-engineer-services" },
    ],
  },
  {
    id: "corporate",
    title: "Corporate clients",
    customers: [
      { name: "Jaypee Group", logo: "jaypee-group" },
      { name: "J.D. Birla Institute", logo: "jd-birla-institute" },
      { name: "SRV's Solar", logo: "srvs-solar" },
      { name: "Altus", logo: "altus" },
      { name: "Wellsttore", logo: "wellsttore" },
      { name: "Meesho", logo: "meesho" },
      { name: "DEW", logo: "dew" },
      { name: "Sky Agency", logo: "sky-agency" },
      { name: "JILIT", logo: "jilit" },
      { name: "A.G. Organica", logo: "ag-organica" },
      { name: "Fit.Zone", logo: "fitzone" },
      { name: "Primarius Technologies", logo: "primarius" },
      { name: "Sabhyata", logo: "sabhyata" },
      { name: "Paramount Resort", logo: "paramount-resort" },
      { name: "Softshield Technologies", logo: "softshield" },
      { name: "Nirmala Hospital", logo: "nirmala-hospital" },
      { name: "Krypton", logo: "krypton" },
      { name: "JV Ventures", logo: "jv-ventures" },
      { name: "Acquisory", logo: "acquisory" },
      { name: "V. Singhi & Associates", logo: "v-singhi-associates" },
      { name: "Reddy CPA", logo: "reddy-cpa" },
    ],
  },
];

module.exports = CUSTOMER_GROUPS;
