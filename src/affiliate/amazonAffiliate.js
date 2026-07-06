const AMAZON_DOMAINS = {
  FR: "amazon.fr",
  DE: "amazon.de",
  IT: "amazon.it",
  ES: "amazon.es",
  UK: "amazon.co.uk",
  US: "amazon.com",
  CA: "amazon.ca",
  JP: "amazon.co.jp"
};

export function getAmazonAffiliateTag() {
  try {
    return localStorage.getItem("tradeai_amazon_affiliate_tag") || "";
  } catch {
    return "";
  }
}

export function setAmazonAffiliateTag(tag) {
  try {
    localStorage.setItem("tradeai_amazon_affiliate_tag", tag.trim());
  } catch {
    // Stockage indisponible : l'application reste fonctionnelle sans persistance.
  }
}

export function buildAmazonAffiliateLink({ marketplace = "FR", keyword = "", asin = "" }) {
  const domain = AMAZON_DOMAINS[marketplace] || AMAZON_DOMAINS.FR;
  const tag = getAmazonAffiliateTag();

  if (asin) {
    return `https://www.${domain}/dp/${encodeURIComponent(asin)}?tag=${encodeURIComponent(tag)}`;
  }

  const query = encodeURIComponent(keyword || "produit amazon");
  return `https://www.${domain}/s?k=${query}&tag=${encodeURIComponent(tag)}`;
}
