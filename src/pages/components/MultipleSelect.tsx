import React, { useMemo } from 'react';

import CreatableSelect from 'react-select/creatable';
import Select, { components, StylesConfig } from 'react-select';
import { Flex, Text } from '@chakra-ui/react';

const styles: StylesConfig<any, any> = {
  control: (baseStyles, state) => {
    return {
      ...baseStyles,
      borderRadius: '8px',
      minHeight: '48px',
      borderColor: state.isFocused ? '#13172E' : '#E6E7E9',
    }
  },
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#F5F5F5',
    borderRadius: '8px',
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
    height: '28px',
  }),

  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    width: '22px',
    height: '22px',
    backgroundColor: 'transparent',
    color: '#13172E',
    '&:hover': {
      backgroundColor: '#E5E5E5',
      color: '#13172E',
    },
    borderRadius: '100px',
  }),

  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    display: 'none',
  }),


  menu: (baseStyles: any) => ({
    ...baseStyles,
    borderRadius: '8px',
    borderColor: '#E6E7E9',
    padding: '6px 0px',
  }),

  menuList: (baseStyles) => ({
    ...baseStyles,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0px 4px',
  }),

  option: (baseStyles, state) => {
    return ({
      ...baseStyles,
      padding: '0px 16px',
      height: '44px',
      fontSize: '14px',
      fontWeight: '400',
      color: '#000',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '8px',
      backgroundColor: state.isFocused ? '#F1F2F3' : 'transparent',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      ':hover': {
        backgroundColor: '#F1F2F3',
        cursor: 'pointer',
      },
      ':active': {
        backgroundColor: 'transparent',
      },
    })
  },
}

const Option = (props: any) => {
  const renderCheckbox = () => {
    return props.isSelected ? (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" rx="2" fill="#13172E" />
        <path d="M11.1998 5.59961L6.42679 10.3996L4.7998 8.76342" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 0.5H14C14.8284 0.5 15.5 1.17157 15.5 2V14C15.5 14.8284 14.8284 15.5 14 15.5H2C1.17157 15.5 0.5 14.8284 0.5 14V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="white" stroke="#13172E" />
      </svg>
    )
  }

  return (
    <div>
      <components.Option {...props}>
        <Flex alignItems="center" gap="12px">
          {props.creatable ? null : renderCheckbox()}

          <Text fontSize="14px" fontWeight="400" color="#000" lineHeight="22px">{props.label}</Text>
        </Flex>
      </components.Option>
    </div>);
};


interface Option<T extends string | number> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface MultipleSelectProps<T extends string | number> {
  options?: Option<T>[];
  onChange?: (value: T[]) => void;
  value?: T[];
  creatable?: boolean;
  clearable?: boolean;
  placeholder?: string;
  searchable?: boolean;
  instanceId?: string; // 添加 instanceId 属性
  disabled?: boolean; // 添加 disabled 属性
  customStyles?: StylesConfig<any, any>; // 添加自定义样式属性
  noOptionsMessage?: string; // 添加空选项提示文字
}

export const MultipleSelect = <T extends string | number>({
  options,
  onChange,
  value: valueProp,
  creatable = false,
  clearable = false,
  placeholder = '请选择',
  searchable = false,
  instanceId,
  disabled = false, // 添加 disabled 参数
  customStyles, // 添加自定义样式参数
  noOptionsMessage = '请输入岗位关键词', // 默认空选项提示
}: MultipleSelectProps<T>) => {

  const value = useMemo(() => {
    return (valueProp?.map(v => {
      const option = options?.find(option => option.value === v)
      return option || { label: v, value: v }
    })) as Option<T>[]
  }, [valueProp, options])


  const handleChange = (options: Option<T>[]) => {
    onChange?.(options.map(option => option.value))
  }


  if (creatable) {
    return (
      <div suppressHydrationWarning>
        <CreatableSelect
          instanceId={instanceId}
          options={options}
          onChange={handleChange}
          value={value}
          styles={customStyles || styles}
          isMulti
          placeholder={placeholder}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isSearchable
          isDisabled={disabled}
          noOptionsMessage={() => noOptionsMessage}
          components={{
            Option,
          }}
        />
      </div>
    )
  }


  return (
    <div suppressHydrationWarning>
      <Select
        instanceId={instanceId}
        components={{
          Option,
        }}
        options={options}
        onChange={handleChange}
        value={value}
        styles={customStyles || styles}
        isMulti
        placeholder={placeholder}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isSearchable={searchable}
        isDisabled={disabled}
        noOptionsMessage={() => noOptionsMessage}
      />
    </div>
  )
};

export default MultipleSelect;
