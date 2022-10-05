
export interface OptionType<T extends "CREATED" | "ACTIVE" | "DONE"> {
  value: T;
}

export const Select = <T extends "CREATED" | "ACTIVE" | "DONE">({
  value,
  onChange,
  options
}: {
  value: T;
  onChange: (newValue: T) => void;
  options: OptionType<T>[];
}): React.ReactElement => (
  <select value={value ?? ""} onChange={(event) => onChange(event.target.value as T)} className="block mb-4 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200">
    {options.map((option) => (
      <option value={option.value ?? ""} key={option.value}>{option.value}
      </option>
    ))}
  </select>
);
export default Select