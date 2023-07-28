import React from 'react'

export default function InputItem({
  value,
  setter,
  label,
  isLarge,
  required,
  isPassword,
}) {
  const inputAreaStyles = 'p-2 border-1 border-slate-100'
  const handleChange = (e) => {
    setter((v) => e.target.value)
  }

  return (
    <>
      <label htmlFor={label} className="uppercase text-sm font-light">
        {label}
      </label>
      {isLarge ? (
        <textarea
          value={value}
          name={label}
          id={label}
          required={required}
          rows={10}
          className={'p-2 border-1 border-indigo-400'}
          onChange={handleChange}
        ></textarea>
      ) : (
        <input
          type={isPassword ? 'password' : 'text'}
          value={value}
          name={label}
          id={label}
          required={required}
          className={inputAreaStyles}
          onChange={handleChange}
        ></input>
      )}
    </>
  )
}
