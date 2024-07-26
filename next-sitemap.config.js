module.exports = {
    siteUrl: 'https://www.goeduabroad.com/',
    exclude: ['/404'],
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [{
                userAgent: "*",
                disallow: ["/404", "/age-5-10", "/image.webp"],

            },
            {
                userAgent: "*",
                allow: '/',
            }
        ],
        additionalSitemaps: [
            `https://www.goeduabroad.com/sitemap.xml`,
            `https://www.goeduabroad.com/server-sitemap.xml`,
        ],
    },
};