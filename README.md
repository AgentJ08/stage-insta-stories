This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Application Setup

```bash
git clone https://github.com/AgentJ08/stage-insta-stories.git
cd stage-insta-stories
npm install
```

## Running The Application
```bash
npm run dev
```
The application would start running on [http://localhost:3000](http://localhost:3000).
To get the mobile view, open developer tools of the browser and select the mobile dimensions.

## Running The Tests
```bash
#Start the server first by running:
npm run dev
#Then in another terminal instance, run:
npx playwright test
#The test report can be viewed by running the command:
npx playwright show-report
```


## Design Choices
- Space Optimization: Using two 1D arrays for storing views status, instead of a 2D array to store view status of every story of every user.

## Assumptions I Made
- The loggedin user has atleast one story uploaded.

## Deployment

The application is deployed on Vercel.
Deployment Link: [https://stage-insta-stories-kappa.vercel.app/](https://stage-insta-stories-kappa.vercel.app/)
Short Link: [https://bit.ly/ArpitStage](https://bit.ly/ArpitStage)
You can directly open the link in your mobile device to get the mobile view, or open developer tools of your desktop browser and select the mobile dimensions.
