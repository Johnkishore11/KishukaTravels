/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#f97316', // Orange
                secondary: '#333333', // Dark Gray for contrast
                peach: '#FFF5F1',
                peachDark: '#FFE8DF'
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
