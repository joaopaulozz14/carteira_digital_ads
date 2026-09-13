export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],
  theme: {
    extend: {
      colors: {
        'navy-deep': '#0C1D33',
        'navy-secondary': '#162336',
        'action-blue': '#0057FF',
        'action-blue-dark': '#0044CC',
        'text-heading': '#2D323D',
        'text-secondary': '#7D818D',
        'text-table-head': '#848D94',
        'bg-banner': '#F4F7FD',
        'bg-input': '#F4F6F8',
      },
      fontFamily: {
        display: ['Poppins', 'Segoe UI', 'system-ui', 'sans-serif'],
        body: ['Inter', 'DM Sans', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        btn: '8px',
        input: '8px',
        card: '14px',
        icon: '10px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(12,29,51,0.06)',
        float: '0 8px 24px rgba(12,29,51,0.15)',
      },
      minHeight: {
        touch: '44px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};