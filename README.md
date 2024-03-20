# Planet Keeper Hack the Weave submission

### What is the dApp stack?

- Vue and Vite for the front-end of the website
- Arweave for the blockchain, database, and authentication
- ao for the communication, processes, and more
- dragondeploy for the deployment of the website costing $0.13 once.
- deployed to pollinator.arweave.dev though here is the long form of the website:
  https://4yzpih7vzwg6sgoc6ozobpm2k3qia75brzqke6mihjsgoqdx2e6q.arweave.net/5jL0H_XNjekZwvOy4L2aVuCAf6GOYKJ5iDpkZ0B30T0/

Vue and Vite are used to create the front-end of the website. The website is hosted on Arweave and uses Arweave for the blockchain, database, and authentication. The communication, processes, and more are handled by ao.

### Troubles

- tailwind docs do not list one step of adding the new index.css file as an import to the main.tsx file
- SQL addition not being accepted by vercel
  -vercel was only used to deploy for testing, but a sample website can be seen there at [pollinator.vercel.app](https://pollinator.vercel.app/)
- the wallet connect import did not work, so I had to use their actual template to add the Arweave wallet connect functionaltiy
- the wallet connect functionality works on the desktop, but not on the mobile so far.

### Building / Hackathon roadmap for Pollinators

- [x] Start new template
- [x] desktop Arweave wallet connect functionality
- [x] mobile Arweave wallet connect functionality
- [x] test SQLite
  - result: worked locally did not pass through vercel so could not include it
- [] aos PlanetKeeper chatroom
- [x] create beekeeper token and .lua file
  - templates are made but not tested yet
- [x] start step one of the tutorial for users
- [] start step two of the tutorial for users
- [x] implement dryrun using Planet Keepers aos process
- [x] create #pollinator tag for future transactions
- [] add whitepaper to the website
- [] submit first #pollinator transaction
- [] get arns testnet tokens
- [] purchase domain
- [] create permage account and profile
- [] deploy website to permapages
  - turns out a Vue / Vite app is not supported by permapages
- [] use the [dragon deploy](https://dragondeploy.xyz/) to deploy the website
- [] create hackathon summary
- [] tokengate PlanetKeeper chatroom
- [] tutorial video
- [] create twitter thread
- [] create a blog post
- [] potential --cron (30-minutes)
- [] Understaning Process Ownership
  Start a new process with the aos console, the ownership of the process is set to your wallet address. aos uses the Owner global variable to define the ownership of the process. If you wish to transfer ownership or lock the process so that no one can own, you simply modify the Owner variable to another wallet address or set it to nil.

- [] encoding data as json
  When sending data to another process or an external service, you may want to use JSON as a way to encode the data for recipients. Using the json module in lua, you can encode and decode pure lua tables that contain values.

### Building roadmap for Developers

- [x] Start image folder of troubleshooting images

### Lessons Learned

- Tutorials can be most effective when the knowledge is given at a tempo or pace. We built ours so that each user fully absorbs that step before being able to move on to the next step. This interactivity creates a more engaging learning experience that can be more effective than traditional methods.
- Not all templates are equal and it takes time to learn the boundaries of each one.

### Intro

["Intro"](/public/intro.mp4)

["Pollinator App Demo"](/public/pollinator.mp4)
