/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html,css}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {

    colors: {
      'purple': '#211b44',
      'purpleOn': '#7169eb',
      'blue': {
        '800': '#17275c',
        '700': '#1a3eb3',
        '500': '#09a5ee',
        '400': '#5ca5fe',
        '300': '#1d9bf0',
      },
      'gray': {
        '50': '#f9fafb',
        '100': '#f3f4f6',
        '200': '#e5e7eb',
        '300': '#d1d5db',
        '400': '#9ca3af',
        '500': '#6b7280',
        '600': '#4b5563',
        '700': '#374151',
        '800': '#1f2937',
        '900': '#111827',
      },
      'mainColor': {
        '50': '#EFF1FE',
        '100': '#E1E6FE',
        '200': '#C9CFFC',
        '300': '#A9AFF8',
        '400': '#8687F3',
        '500': '#7169EB',
        '600': '#614DDE',
        '700': '#533EC4',
        '800': '#44359E',
        '900': '#3A317E',
        '950': '#211B44',
      },
      'black': {
        '50': '#FFFFFF',
        '100': '#EFEFEF',
        '200': '#DCDCDC',
        '300': '#BDBDBD',
        '400': '#989898',
        '500': '#7C7C7C',
        '600': '#656565',
        '700': '#525252',
        '800': '#464646',
        '900': '#3D3D3D',
        '950': '#292929',
      },

    },

    extend: {
      fontFamily: {
        'kanit': ["Kanit", "sans-serif"],
        'kanit-regular': ["Kanit Regular"],
        'kanit-medium': ["Kanit Medium"],
        'kanit-semibold': ["Kanit SemiBold"],
      }

    },
   
  },
  plugins: [
  ],
}