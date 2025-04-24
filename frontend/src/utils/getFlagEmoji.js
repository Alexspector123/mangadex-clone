export const getFlagUrl = (langCode) => {
    const map = {
      en: 'us',
      vi: 'vn',
      jp: 'jp',
      fr: 'fr',
      es: 'es',
      'pt-br': 'br',
      id: 'id',
    };
  
    const countryCode = map[langCode.toLowerCase()] || 'us';
    return `https://flagcdn.com/w40/${countryCode}.png`; // 40px wide flag
  };