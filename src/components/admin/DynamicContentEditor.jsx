import React, { useState } from 'react';
import * as defaultPortfolioData from '../../data/portfolioData';

const inputClass = 'w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-white text-xs focus:border-[#f50604] focus:outline-none';
const textareaClass = `${inputClass} min-h-24 leading-relaxed resize-y`;

const labelFor = (key) => String(key)
  .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  .replace(/[_-]/g, ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const blankLike = (value) => {
  if (Array.isArray(value)) return [];
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, blankLike(child)]));
  }
  if (typeof value === 'boolean') return false;
  return '';
};

const templates = {
  statsData: { num: '', label: '', desc: '' },
  softSkillsList: { name: '', icon: '', desc: '' },
  projects: {
    id: '', number: '', badge: '', title: '', category: '', client: '', duration: '', description: '', ctaLabel: '', ctaHref: '',
    techTags: [], imageUrl: '', isFlagship: false, accentColor: '', visualType: '',
    visualContent: { heading: '', badge: '', footerLeft: '', footerRight: '', items: [] },
    caseStudy: { client: '', domain: '', role: '', problem: '', contributions: [], impact: '' },
  },
  educationData: { isCurrent: false, year: '', degree: '', institution: '', location: '', grade: '', category: '', description: '' },
  certificatesData: { id: '', title: '', issuer: '', category: '', icon: '', imageUrl: '', imageAlt: '', description: '', skills: [] },
  cards: { number: '', title: '', status: '', text: '' },
  categories: { title: '', skills: [] },
  skills: { name: '', status: '', tag: '', iconText: '', iconColor: '', iconBackground: '' },
  techStack: { name: '', tag: '', shortName: '', color: '', bg: '' },
  taglines: '',
  links: { name: '', href: '' },
  facts: { label: '', value: '' },
  highlights: '',
  competencyTags: '',
  techTags: '',
  contributions: '',
  items: { label: '', value: '', detail: '' },
};

const defaultAtPath = (path) => {
  let value = defaultPortfolioData;
  for (const segment of path) {
    if (value === null || value === undefined || !Object.prototype.hasOwnProperty.call(value, segment)) return undefined;
    value = value[segment];
  }
  return value;
};


const blankShape = (sample, template) => {
  if (Array.isArray(template)) return [];
  if (template && typeof template === 'object' && !Array.isArray(template)) {
    const sampleObject = sample && typeof sample === 'object' && !Array.isArray(sample) ? sample : {};
    const keys = new Set([...Object.keys(sampleObject), ...Object.keys(template)]);
    return Object.fromEntries([...keys].map((key) => [
      key,
      Object.prototype.hasOwnProperty.call(template, key)
        ? blankShape(sampleObject[key], template[key])
        : blankLike(sampleObject[key]),
    ]));
  }
  return blankLike(sample !== undefined ? sample : template);
};

const createArrayItem = (arrayKey, current, depth = 0, path = []) => {
  // Certificate competencies are string tags; technical skill-group entries are structured objects.
  if (arrayKey === 'skills' && path.includes('certificatesData')) return '';
  if (arrayKey === 'skills' && current.length > 0 && typeof current[0] !== 'object') return '';
  if (current.length > 0) {
    const template = templates[arrayKey];
    return template ? blankShape(current[0], template) : blankLike(current[0]);
  }
  if (Object.prototype.hasOwnProperty.call(templates, arrayKey)) return blankLike(templates[arrayKey]);
  return '';
};

const DynamicValueEditor = ({ name, value, onChange, onRemove, depth = 0, path = [] }) => {
  const [newKey, setNewKey] = useState('');
  const isArray = Array.isArray(value);
  const isObject = value !== null && typeof value === 'object' && !isArray;

  if (isArray) {
    return (
      <div className={`rounded-xl border border-white/10 bg-white/[0.025] ${depth ? 'p-3' : 'p-4'} space-y-3`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wide">{labelFor(name)}</h4>
            <p className="text-[10px] text-white/35 font-mono">{value.length} item{value.length === 1 ? '' : 's'}</p>
          </div>
          <button type="button" onClick={() => onChange([...value, createArrayItem(name, value, depth, path)])} className="px-3 py-1.5 rounded-lg bg-[#f50604]/15 border border-[#f50604]/35 text-[#ff8a8a] text-[10px] font-bold uppercase tracking-wider hover:bg-[#f50604]/25">+ Add Card / Item</button>
        </div>
        {value.length === 0 && <p className="text-[11px] text-white/35 italic">No items yet. Add a card or item to begin.</p>}
        <div className="space-y-3">
          {value.map((item, index) => (
            <div key={index} className="relative rounded-xl border border-white/10 bg-black/25 p-3 pt-8">
              <div className="absolute top-2 left-3 text-[10px] text-[#f50604] font-mono font-bold">ITEM {String(index + 1).padStart(2, '0')}</div>
              <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="absolute top-2 right-3 text-[10px] text-red-300/70 hover:text-red-300">Remove item</button>
              <DynamicValueEditor
                name={typeof item === 'object' && item ? item.title || item.name || item.id || `Item ${index + 1}` : `Item ${index + 1}`}
                value={item}
                depth={depth + 1}
                path={[...path, index]}
                onChange={(nextItem) => onChange(value.map((current, itemIndex) => itemIndex === index ? nextItem : current))}
                onRemove={undefined}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isObject) {
    return (
      <div className={`rounded-xl border border-white/10 bg-white/[0.025] ${depth ? 'p-3' : 'p-4'} space-y-3`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wide">{labelFor(name)}</h4>
          {onRemove && <button type="button" onClick={onRemove} className="text-[10px] text-red-300/70 hover:text-red-300">{defaultAtPath(path) !== undefined ? 'Clear field' : 'Remove field'}</button>}
        </div>
        <div className="space-y-3">
          {Object.entries(value).map(([key, child]) => (
            <DynamicValueEditor
              key={key}
              name={key}
              value={child}
              depth={depth + 1}
              path={[...path, key]}
              onChange={(nextChild) => onChange({ ...value, [key]: nextChild })}
              onRemove={() => {
                const next = { ...value };
                if (defaultAtPath([...path, key]) !== undefined) next[key] = blankLike(child);
                else delete next[key];
                onChange(next);
              }}
            />
          ))}
        </div>
        <form
          className="flex gap-2 pt-2 border-t border-white/10"
          onSubmit={(event) => {
            event.preventDefault();
            const key = newKey.trim();
            if (!key || Object.prototype.hasOwnProperty.call(value, key)) return;
            onChange({ ...value, [key]: '' });
            setNewKey('');
          }}
        >
          <input value={newKey} onChange={(event) => setNewKey(event.target.value)} placeholder="Add a new editable field (e.g. subtitle)" className={`${inputClass} flex-1`} />
          <button type="submit" className="px-3 rounded-lg bg-white/10 border border-white/15 text-white text-[10px] font-bold uppercase hover:bg-white/20">+ Field</button>
        </form>
      </div>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <div className="flex items-center justify-between gap-3 bg-black/20 border border-white/10 rounded-lg px-3 py-2">
        <label className="text-[11px] text-white/70">{labelFor(name)}</label>
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="accent-[#f50604] w-4 h-4" />
          {onRemove && <button type="button" onClick={onRemove} className="text-[10px] text-red-300/70 hover:text-red-300">{defaultAtPath(path) !== undefined ? 'Clear' : 'Remove'}</button>}
        </div>
      </div>
    );
  }

  const text = value === null || value === undefined ? '' : String(value);
  const useTextarea = text.length > 100 || /description|subtitle|summary|bio|problem|impact|contribution|text|message|content|statement|tagline/i.test(name);
  const handleChange = (next) => {
    if (typeof value === 'number' && next.trim() !== '' && Number.isFinite(Number(next))) onChange(Number(next));
    else onChange(next);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[190px_minmax(0,1fr)_auto] gap-2 items-start">
      <label className="text-[11px] text-white/60 pt-2">{labelFor(name)}</label>
      {useTextarea ? (
        <textarea rows={3} value={text} onChange={(event) => handleChange(event.target.value)} placeholder="Leave empty to hide this content on the website" className={textareaClass} />
      ) : (
        <input type={typeof value === 'number' ? 'number' : 'text'} value={text} onChange={(event) => handleChange(event.target.value)} placeholder="Leave empty to hide this content on the website" className={inputClass} />
      )}
      {onRemove && <button type="button" onClick={onRemove} className="text-[10px] text-red-300/70 hover:text-red-300 px-1 py-2">{defaultAtPath(path) !== undefined ? 'Clear' : 'Remove'}</button>}
    </div>
  );
};

export default DynamicValueEditor;
