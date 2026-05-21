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
  return (
    <div>
      <components.Option {...props}>
        <Flex alignItems="center" gap="12px">
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

interface SingleSelectProps<T extends string | number> {
  options?: Option<T>[];
  onChange?: (value: T | undefined) => void;
  value?: T;
  creatable?: boolean;
  clearable?: boolean;
  placeholder?: string;
  searchable?: boolean;
  instanceId?: string; // 添加 instanceId 属性
  disabled?: boolean; // 添加 disabled 属性
  customStyles?: StylesConfig<any, any>; // 添加自定义样式属性
}

export const SingleSelect = <T extends string | number>({
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
}: SingleSelectProps<T>) => {

  const value = useMemo(() => {
    if (valueProp === undefined || valueProp === null || valueProp === '') {
      return undefined
    }
    return options?.find(option => option.value === valueProp) || {
      label: valueProp,
      value: valueProp,
    }
  }, [valueProp, options])


  const handleChange = (option?: Option<T>) => {
    onChange?.(
      option?.value
    )
  }


  if (creatable) {
    return <CreatableSelect
      instanceId={instanceId}
      options={options}
      onChange={handleChange}
      value={value}
      styles={customStyles || styles}
      clearable={clearable}
      placeholder={placeholder}
      hideSelectedOptions={false}
      isSearchable={searchable}
      isDisabled={disabled} // 添加 isDisabled 属性
      components={{
        Option,
      }}
    />
  }


  return (
    <Select
      instanceId={instanceId}
      components={{
        Option,
      }}
      options={options}
      onChange={handleChange}
      value={value}
      styles={customStyles || styles}
      placeholder={placeholder}
      hideSelectedOptions={false}
      isSearchable={searchable}
      isDisabled={disabled}
      isClearable={clearable}
    />
  )
};

export default SingleSelect;
