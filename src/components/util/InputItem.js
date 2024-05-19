import React from 'react'

export default function InputItem({
  value,
  setter,
  label,
  isTextArea,
  isLarge,
  required,
  isPassword,
}) {
  const inputAreaStyles = 'p-2 border-1 border-slate-300 rounded-md'
  const handleChange = (e) => {
    setter((v) => e.target.value)
  }

  return (
    <>
      <label htmlFor={label} className="uppercase text-sm font-light">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          value={value}
          name={label}
          id={label}
          required={required}
          rows={isLarge ? 10 : 2}
          className={'p-2 border-1 border-slate-300 rounded-md'}
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
