const interactionCounter = {}

export default {
  fetch: (req) => {
    const ip = req.headers.get('CF-Connecting-IP')
    const {origin} = new URL(req.url)
    interactionCounter[ip] = interactionCounter[ip] ? interactionCounter[ip] + 1 : 1
    return new Response(JSON.stringify({
        site: {
          icon: '■',
          home: 'https://nouns.dev',
          shortlink: 'https://■.to',
          api: 'https://nouns.dev/api',
          title: 'Nouns.dev',
          description: 'The easiest way to develop in the cloud 🚀',
        },
        plans: {
          build: {
            icon: '👩‍💻',
            name: 'Build',
            price: '$0/mo',
            action: 'Subscribe',
            link: origin + '/plans/build',
          },
          grow: {
            icon: '🚀',
            name: 'Grow',
            price: '$5/mo',
            features: [
              'Custom Domain'
            ],
            action: 'Subscribe',
            link: origin + '/plans/grow',
          },
          scale: {
            icon: '🏢',
            name: 'Scale',
            price: 'varies',
            action: 'Contact Us',
            link: origin + '/plans/scale',
          },
        },
        about: {
          
        },
        user: {
          login: origin + '/login',
          signup: origin + '/signup',
          authenticated: false,
          plan: 'build',
          ip,
          isp: req.cf.asOrganization,
          city: req.cf.city,
          region: req.cf.region,
          country: req.cf.country,
          continent: req.cf.continent,
          requestId: req.headers.get('cf-ray') + '-' + req.cf.colo,
          latencyMilliseconds: req.cf.clientTcpRtt,
          recentInteractions: interactionCounter[ip],
        },
      }, 
      null, 2), { headers: { "Content-Type": "application/json; charset=utf-8" } }
    )
  }
}
