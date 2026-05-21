import React from 'react'
import styles from './SearchInput.module.css'

export type SearchInputProps = {
  placeholder?: string
  onSearch?: (value: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = '搜索岗位关键词',
  onSearch,
}) => {
  const [value, setValue] = React.useState('')

  const handleSearch = () => {
    onSearch && onSearch(value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputMd}>
        <svg
          className={styles.icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM10 14a4 4 0 110-8 4 4 0 010 8z"
            fill="#9D9EA3"
          />
        </svg>

        <input
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />

        <button className={styles.button} onClick={handleSearch} type="button">
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchInput
