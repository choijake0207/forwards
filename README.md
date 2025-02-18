# Forward
Forward is a habit tracking application based off of a previous full-stack application that I had built. The purpose of this project was to mainly improve my full stack capabilities along with handling frequent data interactions. This repository contains all the code for the user portal of Forward seperate from the landing page (currently being built).

You can see the live app here => (not deployed on vercel yet)


## Tech Stack
Framework/Library: Next.js, Node.js
DB: MySQL
ORM: Prisma
Misc: Chart.js, JWT

## How/Why I Made It

**Why**
Besides the fact that this was a great challenge to tackle as a still-learning self-taught developer, I always wanted to create applications that provided utility to users. I personally couldn't think of more useful than a habit tracker that visualizes consistency and discipline. My previous full-stack builds were admittedly pretty uninspiring work as I was just doing them for educative practice. However, with Forward, I was very motivated to consider user experience a lot more carefully. Initially, I had plans to make Forward a socially-interactive application in addition to being a habit tracker. The idea was to be able to make "friends" with other users and enable user-to-user accountability through "nudges" and "reminders". I still very much intend on adding this feature as this current version is just the MVP. 

**How**
The how of this project can mostly be inferred through a quick skim of the code base and the tech stack. However, I'll note some things that I personally found very challenging. First, I struggled with how to best display habit check ins over a continuous time period. Rather than keeping track of time progression in the database, I decided to make a data processing layer in a centralized context file to append new day objects with boolean properties as time progressed. Second, there was a lot of optimistic rendering that had to be done with 3 major components requiring seamless UI updates (progress tracker, checklist, analytics graph). I traditionally would've opted for the "append response object to current state and rollback if error" method, however, with the data processing, this wouldn't have worked due to rerenders. As a result, I opted for a render persistent cache of optimistic objects with the useRef hook. Lastly, I have to say nothing was more frustrating than working with JS date objects and formatting them for calculations and UI.




