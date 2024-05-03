module.exports = {
    siteUrl: 'https://goeduabroad.com/',
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
            `https://goeduabroad.com/sitemap.xml`,
            `https://goeduabroad.com/server-sitemap.xml`,
        ],
    },
};