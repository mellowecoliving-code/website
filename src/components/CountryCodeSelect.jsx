import { COUNTRY_CODES } from '../data/countryCodes'

function CountryCodeSelect({ value, onChange, className = '' }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Country code"
      className={`rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-900 focus:border-[#013485] focus:outline-none ${className}`}
    >
      {COUNTRY_CODES.map(({ code, country, flag }) => (
        <option key={`${code}-${country}`} value={code}>
          {flag} {code}
        </option>
      ))}
    </select>
  )
}

export default CountryCodeSelect
