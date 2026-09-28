/**
 * Acceso seguro a localStorage: puede no existir o lanzar excepciones
 * (modo privado, datos bloqueados). Solo para preferencias locales, nunca datos personales.
 */
const PREFIX = "ortoguia:";

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento disponible: la preferencia solo dura esta visita.
  }
}
