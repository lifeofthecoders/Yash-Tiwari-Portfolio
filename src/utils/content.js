export const hasContent = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.some(hasContent);
  if (typeof value === 'object') return Object.values(value).some(hasContent);
  return true;
};

export const contentItems = (value) => Array.isArray(value) ? value.filter(hasContent) : [];

export const cleanText = (value) => (typeof value === 'string' ? value.trim() : '');

export const fieldLabel = (key) => String(key)
  .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  .replace(/[_-]/g, ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

// String/number properties not already rendered by a component are surfaced as editable details.
export const additionalTextFields = (source, knownKeys = []) => {
  if (!source || typeof source !== 'object' || Array.isArray(source)) return [];
  const known = new Set(knownKeys);
  return Object.entries(source).flatMap(([key, value]) => {
    if (known.has(key) || !hasContent(value)) return [];
    if (typeof value === 'string' || typeof value === 'number') {
      return [{ key, label: fieldLabel(key), value: String(value) }];
    }
    if (Array.isArray(value) && value.every((item) => typeof item === 'string' || typeof item === 'number')) {
      const joined = value.filter(hasContent).map(String).join(' · ');
      return joined ? [{ key, label: fieldLabel(key), value: joined }] : [];
    }
    return [];
  });
};
