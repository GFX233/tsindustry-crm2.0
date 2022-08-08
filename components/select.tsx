import { Ref } from "react"

interface SelectProps {
  options: string[]
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  referer?: Ref<HTMLSelectElement>
}

const Select: React.JSXElementConstructor<SelectProps> = ({options, name, value, onChange, referer}) => {
  return (
    <select ref={referer} value={value} onChange={onChange} className="block mb-4 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200">
      <option className="text-gray-900">{name}</option>
      {options.map((option, idx) => {
        return <option key={idx} value={option}>{option}</option>
      })}
    </select>
  )
}

export default Select