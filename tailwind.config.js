/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './components/**/*.stories.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '0.5rem',
        lg: '0.5rem',
        xl: '4rem',
        '2xl': '7rem',
      },
    },
    colors: {
      black: colors.black,
      white: colors.white,
      transparent: colors.transparent,
      slate: colors.slate,
      brand: {
        DEFAULT: '#193D8F',
        base: '#193D8F',
        hover: '#2253C3',
        pressed: '#132E6C',
        background: '#DCE5F9',
        tag: '#DCE5F9', // same as background, but legacy name
        border: '#A8BEF0',
      },
      primary: {
        colTable: '#1890FF1F',
        base: '#366AE2',
        hover: '#799CEC',
        pressed: '#1D50C9',
        background: '#EDF2FD',
        tag: '#EDF2FD', // same as background, but legacy name
        border: '#BCCDF5',
      },
      secondary1: {
        base: '#FC6B03',
        hover: '#FD974E',
        pressed: '#B14B02',
        background: '#FFF3EB',
        tag: '#FFF3EB', // same as background, but legacy name
        border: '#FED3B3',
      },
      secondary2: {
        base: '#39AC6D',
        hover: '#79D2A1',
        pressed: '#339961',
        background: '#E8F7EF',
        tag: '#E8F7EF', // same as background, but legacy name
        border: '#C6ECD7',
      },
      secondary3: {
        base: '#DEA821',
        hover: '#E8C264',
        pressed: '#C8981E',
        background: '#FBF5E4',
        tag: '#FBF5E4', // same as background, but legacy name
        border: '#F5E5BC',
      },
      secondary4: {
        base: '#AC67E4',
        hover: '#C493EC',
        pressed: '#943CDD',
        background: '#F6EEFC',
        tag: '#F6EEFC', // same as background, but legacy name
        border: '#E7D4F7',
      },
      info: {
        base: '#366AE2',
        hover: '#799CEC',
        pressed: '#1D50C9',
        background: '#EDF2FD',
        tag: '#EDF2FD', // same as background, but legacy name
        border: '#BCCDF5',
      },
      success: {
        base: '#39AC6D',
        hover: '#79D2A1',
        pressed: '#339961',
        background: '#E8F7EF',
        tag: '#E8F7EF', // same as background, but legacy name
        border: '#C6ECD7',
      },
      warning: {
        base: '#FC6B03',
        hover: '#FDA668',
        pressed: '#E36002',
        background: '#FFF3EB',
        tag: '#FFF3EB', // same as background, but legacy name
        border: '#FED3B3',
      },
      error: {
        base: '#E14337',
        hover: '#EB817A',
        pressed: '#C8291E',
        background: '#FCEEED',
        tag: '#FCEEED', // same as background, but legacy name
        border: '#F5C0BC',
      },
      grey: {
        1: '#F9FAFB',
        2: '#F2F5F8',
        3: '#E6EAF0',
        4: '#E8E8E8',
        5: '#D9D9D9',
        9: '#262626',
        hover: '#f8fafc',
        disabled: '#0035800a',
      },
      yellow: {
        50: 'rgb(254 252 232)',
      },
      blue: {
        100: 'rgb(219 234 254)',
        500: 'rgb(59 130 246)',
      },
      typography: {
        disabled: '#00204D40',
        placeholder: '#00204D66',
        subtitle: '#00204D99',
        secondary: '#8C8C8C',
        primary: '#595959',
        title: '#00204D',
        body: '#00204Dcc',
        label: '#00204De6',
      },
      border: {
        1: '#00358033',
        2: '#00358014',
      },
    },
    fontSize: {
      'heading-0': [
        '64px',
        {
          lineHeight: '65px',
          fontWeight: '400',
        },
      ],
      'heading-1': [
        '56px',
        {
          lineHeight: '65px',
          fontWeight: '600',
        },
      ],
      'heading-2': [
        '46px',
        {
          lineHeight: '56px',
          fontWeight: '600',
        },
      ],
      'heading-3': [
        '38px',
        {
          lineHeight: '46px',
          fontWeight: '600',
        },
      ],
      'heading-4': [
        '30px',
        {
          lineHeight: '38px',
          fontWeight: '600',
        },
      ],
      'heading-5': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '600',
        },
      ],
      'heading-6': [
        '20px',
        {
          lineHeight: '28px',
          fontWeight: '600',
        },
      ],
      'heading-7': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '600',
        },
      ],
      'heading-8': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '600',
        },
      ],
      'heading-9': [
        '12px',
        {
          lineHeight: '20px',
          fontWeight: '600',
        },
      ],
      'title-large': [
        '38px',
        {
          lineHeight: '48px',
          fontWeight: '500',
        },
      ],
      'title-1': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '500',
        },
      ],
      'title-2': [
        '20px',
        {
          lineHeight: '28px',
          fontWeight: '500',
        },
      ],
      'title-3': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '500',
        },
      ],
      'title-4': [
        '16px',
        {
          lineHeight: '22px',
          fontWeight: '500',
        },
      ],
      'title-5': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '500',
        },
      ],
      'title-6': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '400',
        },
      ],
      'body-1': [
        '18px',
        {
          lineHeight: '28px',
          fontWeight: '400',
        },
      ],
      'body-2': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '400',
        },
      ],
      'body-3': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '400',
        },
      ],
      'button-1': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '600',
        },
      ],
      'button-2': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '500',
        },
      ],
      'button-3': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '500',
        },
      ],
      'button-4': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '400',
        },
      ],
      'button-5': [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: '500',
        },
      ],
      'button-6': [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: '400',
        },
      ],
      'subtitle-1': [
        '18px',
        {
          lineHeight: '26px',
          fontWeight: '400',
        },
      ],
      'subtitle-2': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '400',
        },
      ],
      'subtitle-3': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '400',
        },
      ],
      'subtitle-4': [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: '400',
        },
      ],
      'subtitle-5': [
        '10px',
        {
          lineHeight: '14px',
          fontWeight: '400',
        },
      ],
      'label-1': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '500',
        },
      ],
      'label-2': [
        '16px',
        {
          lineHeight: '22px',
          fontWeight: '400',
        },
      ],
      'label-3': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '500',
        },
      ],
      'label-4': [
        '14px',
        {
          fontWeight: '400',
          lineHeight: '22px',
        },
      ],
      'label-5': [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: '400',
        },
      ],
      'placeholder-1': [
        '16px',
        {
          lineHeight: '28px',
          fontWeight: '400',
        },
      ],
      'placeholder-2': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '400',
        },
      ],
      'caption-1': [
        '14px',
        {
          lineHeight: '22px',
          fontWeight: '400',
        },
      ],
      'caption-2': [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: '400',
        },
      ],
      'caption-3': [
        '10px',
        {
          lineHeight: '14px',
          fontWeight: '400',
        },
      ],
    },
    extend: {
      fontFamily: {
        'nunito-sans': ['var(--font-nunito-sans)'],
      },
      animation: {
        section6: 'section6 10s linear infinite',
        'section6-mobile': 'section6-mobile 10s linear infinite',
        'spin-slow': 'spin 50s linear infinite',
        pulsed: 'pulsed 10s ease-in-out infinite',
        rotate180: 'rotate180 4s steps(1, end) infinite',
      },
      keyframes: {
        section6: {
          '0%, 100%': { transform: 'scaleY(1.9) skewX(-40deg)' },
          '50%': { transform: 'scaleY(1.3) skewX(0deg)' },
        },
        'section6-mobile': {
          '0%, 100%': { transform: 'scaleY(1.9) skewX(-15deg)' },
          '50%': { transform: 'scaleY(1.3) skewX(0deg)' },
        },
        pulsed: {
          '0%': {
            opacity: '0.5',
            transform: 'scale(0.5)',
          },
          '7%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '40%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '60%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '80%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        rotate180: {
          '0%': {
            transform: 'rotateY(0deg)',
          },
          '50%': {
            transform: 'rotateY(180deg)',
          },
        },
      },
      backgroundImage: {
        'fpt-logo': "url('../public/images/FPTlogo.png')",
        login: "url('../public/images/bg-login.jpg')",
        'overlay-white-12':
          'linear-gradient(0deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.12) 100%)',
        'overlay-grey-8':
          'linear-gradient(0deg, rgba(0, 53, 128, 0.08) 0%, rgba(0, 53, 128, 0.08) 100%)',
        'overlay-grey-30':
          'linear-gradient(0deg, rgba(0, 53, 128, 0.3) 0%, rgba(0, 53, 128, 0.3) 100%)',
      },
      width: {
        // table cell custom widths
        choose: '50px',
        stt: '70px',
        name: '240px',
        description: '230px',
        pill: '175px',
        create_time: '155px',
        tenant: '170px',
        'name-short': '160px',
        actions: '80px',
        'ticket-id': '100px',
        switch: '100px',
        boolean: '130px',
        permissiontype: '150px',
        status: '150px',
        time: '340px',
        sla: '210px',
      },
      height: {
        // table custom height
        'table-regular': 'calc(100vh - 16rem)',
        'table-taller': 'calc(100vh - 13rem)',
        'table-task-ticket': 'max(calc(100vh - 29.5rem), 24rem)',
        'table-report': 'calc(100vh - 19rem)',
        'table-project': 'calc(100vh - 27.3rem)',
        'table-role': 'calc(100vh - 24rem)',
        'table-task-project': 'calc(100vh - 20.3rem)',
      },
      boxShadow: {
        top: '0 -1px 6px 0px rgba(45, 50, 57, 0.06)',
        left: '-1px 0 6px 0 rgba(45, 50, 57, 0.06)',
      },
    },
    // container: {
    //   center: true,
    //   padding: {
    //     DEFAULT: '0.5rem',
    //     lg: '2rem',
    //   },
    // },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('@headlessui/tailwindcss')({ prefix: 'ui' })],
}
