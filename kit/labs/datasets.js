// The register of real datasets used by interactives. Every real dataset must be listed here, with its source,
// licence, attribution, coverage and dates, and come from an approved source (owner's decision, 7 Nov 2026).
// Being openly accessible doesn't by itself make data free to reuse: each licence is recorded, and marked
// verified only once it has been read on the publisher's site. tests/interactives.test.mjs checks every data file
// under kit/labs/*/data/ is registered and every entry is complete. The interactive itself shows the source and the
// date retrieved next to the data (kit/labs/social/ui.js dataLabel).

export const APPROVED_SOURCES = ["Office for National Statistics", "World Bank Open Data", "OECD Data", "Eurostat", "UNData"];

// a published statistical example, not a dataset from a statistical agency: allowed as a teaching example, cited
export const TEACHING_EXAMPLES = ["Anscombe's quartet"];

const WB = {
  publisher: "World Bank Open Data",
  dataset: "World Development Indicators",
  licence: "Creative Commons Attribution 4.0 (CC BY 4.0), as stated in the World Bank's terms of use for datasets",
  licenceVerified: false,   // to confirm on the World Bank's site: the working environment can't reach it
  attribution: "World Bank, World Development Indicators",
  limitations: "Values as published by the World Bank, which compiles them from national sources with differing methods and years; missing years are absent, not estimated. Comparisons show association, not cause.",
  fetchedBy: "scripts/fetch-social-data.mjs",
};

export const DATASETS = [
  { file: "kit/labs/sociology/data/demography.js", ...WB, title: "Birth and death rates, fertility, life expectancy, urbanisation and population",
    indicators: ["SP.DYN.CBRT.IN", "SP.DYN.CDRT.IN", "SP.DYN.TFRT.IN", "SP.DYN.LE00.IN", "SP.URB.TOTL.IN.ZS", "SP.POP.TOTL"],
    coverage: "10 countries: Brazil, China, Germany, India, Japan, Nigeria, South Africa, Sweden, United Kingdom, United States", years: "1960–2024", retrieved: "2026-11-01" },
  { file: "kit/labs/sociology/data/indicators.js", ...WB, title: "Social indicators: inequality, poverty, income, health, work, gender, education, crime, emissions, urbanisation",
    indicators: ["SI.POV.GINI", "SI.POV.DDAY", "NY.GDP.PCAP.PP.KD", "SP.DYN.LE00.IN", "SL.UEM.TOTL.ZS", "SL.TLF.CACT.FE.ZS", "SL.TLF.CACT.MA.ZS", "SG.GEN.PARL.ZS", "SE.ENR.TERT.FM.ZS", "SE.TER.ENRR", "SE.PRM.CMPT.ZS", "VC.IHR.PSRC.P5", "…"],
    coverage: "22 countries across every inhabited continent", years: "1990–2024", retrieved: "2026-11-01" },
  { file: "kit/labs/sociology/data/inequality.js", ...WB, title: "Gini index and income shares by quintile",
    indicators: ["SI.POV.GINI", "SI.DST.FRST.20", "SI.DST.02ND.20", "SI.DST.03RD.20", "SI.DST.04TH.20", "SI.DST.05TH.20"],
    coverage: "10 countries: Brazil, China, Germany, India, Japan, Nigeria, South Africa, Sweden, United Kingdom, United States", years: "1963–2024", retrieved: "2026-11-01" },
  { file: "kit/labs/sociology/data/pyramids.js", ...WB, title: "Population by five-year age band and sex",
    indicators: ["SP.POP.<age band>.FE", "SP.POP.<age band>.MA"],
    coverage: "10 countries: Brazil, China, Germany, India, Japan, Nigeria, South Africa, Sweden, United Kingdom, United States", years: "1960, 1990 and 2023", retrieved: "2026-11-01" },
  { file: "kit/labs/social/statslab.js", example: "Anscombe's quartet", publisher: "F. J. Anscombe, The American Statistician 27(1): 17–21 (1973)",
    dataset: "Anscombe's quartet (four sets of 11 points)", licence: "Published in a journal article; the eleven-point sets are reproduced as a short factual teaching example with citation", licenceVerified: false,
    attribution: "Anscombe (1973), The American Statistician 27(1): 17–21, doi:10.1080/00031305.1973.10478966", coverage: "Not geographical: constructed numbers", years: "1973", retrieved: "n/a (constructed example)",
    limitations: "Constructed to show that identical summary statistics can hide very different data; not observations of anything." },
];
