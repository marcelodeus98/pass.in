export function generateSlugify(text: string): string {
    return text
        .normalize("NFD") // Normaliza os caracteres Unicode para decomposição canônica
        .replace(/[\u0300-\u036f]/g, "") // Remove caracteres de acentuação
        .toLowerCase() // Converte para minúsculas
        .trim() // Remove espaços em branco no início e no fim
        .replace(/[^a-z0-9\s]/g, "") // Remove caracteres especiais e símbolos, exceto espaços em branco
        .replace(/\s+/g, "-"); // Substitui espaços em branco por hífens
}


