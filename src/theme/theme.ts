import { extendTheme, theme as baseTheme, withDefaultColorScheme } from '@chakra-ui/react';
import components from './components';

const themeConfig = {
  colors: {
    black: '#000000',
    white: '#FFFFFF',

    blackAlpha: baseTheme.colors.blackAlpha,
    primary: {
      '10': '#F2F2F2',
      '50': '#E5E5E5',
      '100': '#CCCCCC',
      '200': '#B2B2B2',
      '300': '#999999',
      '400': '#808080',
      '500': '#666666',
      '600': '#4D4D4D',
      '700': '#333333',
      '800': '#1A1A1A',
      '900': '#000000'
    },
    grey: {
      '10': '#F2F2F2',
      '50': '#E5E5E5',
      '100': '#CCCCCC',
      '200': '#B2B2B2',
      '300': '#999999',
      '400': '#808080',
      '500': '#666666',
      '600': '#4D4D4D',
      '700': '#333333',
      '800': '#1A1A1A',
      '900': '#000000'
    },
    purple: {
      '50': '#EFF1FD',
      '100': '#E0E4FC',
      '200': '#D0D6FB',
      '300': '#C1C9F9',
      '400': '#B1BBF7',
      '500': '#A2AEF6',
      '600': '#93A1F5',
      '700': '#8393F3',
      '800': '#7485F2',
      '900': '#6478F0'
    },
    beige: {
      '50': '#FDFDFC',
      '100': '#FBFAF9',
      '200': '#FAF8F5',
      '300': '#F8F6F2',
      '400': '#F6F3EF',
      '500': '#F4F1EC',
      '600': '#F2EFE9',
      '700': '#F1EDE5',
      '800': '#EFEAE2',
      '900': '#EDE8DF'
    },
    green: {
      '50': '#F3FCF7',
      '100': '#E7F9F0',
      '200': '#DBF6E9',
      '300': '#CFF3E1',
      '400': '#C3F1D9',
      '500': '#B8EED2',
      '600': '#ACEBCB',
      '700': '#A0E8C3',
      '800': '#94E5BC',
      '900': '#88E2B4'
    },
    orange: {
      '50': '#FEF5F1',
      '100': '#FEEAE3',
      '200': '#FDE0D5',
      '300': '#FDD6C7',
      '400': '#FDCBB9',
      '500': '#FCC1AC',
      '600': '#FCB79E',
      '700': '#FBAD90',
      '800': '#FBA282',
      '900': '#FA9874'
    },
    blue: {
      '100': '#4E47DB',
      '200': '#716DF7'
    }
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },

  components: components,
};


export const theme = extendTheme(themeConfig, withDefaultColorScheme({ colorScheme: 'primary' }));
