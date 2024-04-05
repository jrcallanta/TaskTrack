/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                urbanist: ["Urbanist", "sans-serif"],
            },
            colors: {
                "grey-dark": "#3C3C3C",
                "grey-light": "#7D7D7D",
            },
        },
    },
    plugins: [
        function ({ addBase, addComponents, addUtilities, theme }) {
            addBase({
                fontFamily: "Poppins sans-serif",
            });
            addComponents({
                ".flex-gap": {
                    display: "flex",
                    gap: "1px",
                },
            });
            addUtilities({});
        },
    ],
};
