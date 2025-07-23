import { useState } from 'react';

const LanguageInput = () => {
  const [languageInput, setLanguageInput] = useState('');
  const [languages, setLanguages] = useState([]);

  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const addLanguage = () => {
    const trimmed = languageInput.trim();
    if (!trimmed) return;

    const formatted = capitalizeWords(trimmed);

    if (!languages.includes(formatted)) {
      setLanguages([...languages, formatted]);
      setLanguageInput('');
    }
  };

  const removeLanguage = (langToRemove) => {
    setLanguages(languages.filter((lang) => lang !== langToRemove));
  };

  return (
    <div className="flex flex-col">
      <label className="font-satoshi text-base font-semibold text-gray-700 dark:text-gray-300">
        Languages
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a language"
          className="form_input flex-grow"
          value={languageInput}
          onChange={(e) => setLanguageInput(e.target.value)}
        />
        <button
          type="button"
          onClick={addLanguage}
          className="rounded bg-blue-600 px-4 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* List of added languages */}
      <div className="flex flex-wrap gap-2">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="mt-2 flex items-center rounded-md border bg-gray-200 px-3 py-1 dark:bg-gray-700"
          >
            <span className="mr-2 text-sm">{lang}</span>
            <button
              type="button"
              onClick={() => removeLanguage(lang)}
              className="text-xs font-bold text-red-600"
            >
              ✕
            </button>

            {/* Hidden input to submit to form */}
            <input type="hidden" name={`languages[${index}]`} value={lang} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageInput;
