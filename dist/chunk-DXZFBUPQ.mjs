// src/utils/generate-slug.ts
function generateSlugify(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
}

export {
  generateSlugify
};
