const blockedWords = [
  // English
  "nude",
  "naked",
  "nsfw",
  "porn",
  "sex",
  "sexual",
  "erotic",
  "boobs",
  "breasts",
  "nipples",
  "milf",
  "adolescent",
  "jav",
  "av",
  "bbw",
  "bdsm",
  "creampie",
  "buggery",
  "tiny tits",
  "big cock",
  "big butt",
  "big breast",
  "big boobs",
  "topless",
  "top less",
  "big boots",
  "lolicon",
  "shotacon",
  "dp",
  "femdom",
  "pedophilia",
  "pedophile",
  "phedophilia",
  "phedhophile",
  "wall-to-wall",
  "vagina",
  "penis",
  "dick",
  "pussy",
  "asshole",
  "cum",
  "orgasm",
  "fetish",
  "underage",
  "minor",
  "child",
  "teen",
  "schoolgirl",
  "orgy",
  "schoolboy",
  "loli",
  "shota",

  // Indonesian
  "telanjang",
  "orgi",
  "bugil",
  "tanpa busana",
  "porno",
  "bencong",
  "bundir",
  "bunuh",
  "cium",
  "cipok",
  "colmek",
  "jilat",
  "coli",
  "adegan dewasa",
  "dildo",
  "gay",
  "sex toy",
  "sex toys",
  "cumbu",
  "gei",
  "gigolo",
  "hentai",
  "pelacur",
  "konthol",
  "lonte",
  "maho",
  "nenen",
  "ngentot",
  "ngulum",
  "pentil",
  "perek",
  "selangkangan",
  "selangkang",
  "ngangkang",
  "bersetubuh",
  "setubuh",
  "senggama",
  "sodomi",
  "titit",
  "tete",
  "xxx",
  "pornografi",
  "seks",
  "seksual",
  "erotis",
  "eksotis",
  "mesum",
  "cabul",
  "payudara",
  "puting",
  "kontol",
  "memek",
  "bokep",
  "sange",
  "masturbasi",
  "orgasme",
  "di bawah umur",
  "dibawah umur",
];

export function checkPromptSafety(prompt) {
  const lower = prompt.toLowerCase();

  const matched = blockedWords.find((word) => {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // For phrases like "big boobs" or "di bawah umur"
    if (word.includes(" ")) {
      return lower.includes(word);
    }

    // For single words, use basic word boundary
    const regex = new RegExp(`\\b${escapedWord}\\b`, "i");
    return regex.test(lower);
  });

  if (matched) {
    return {
      safe: false,
      reason: `Blocked unsafe prompt term: ${matched}`,
    };
  }

  return {
    safe: true,
  };
}
