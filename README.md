# URL-Shortener
* App built to practice different techs in a fullstack environment.  

## Stack
- React, Typescript, Node, Redis

## Techs
- Tailwindcss, jest, Webpack, postcss

## Get Started
 * install dependencies for Client and App with `npm i` in root and client dirs.
 * Create a local docker redis container (requires redis and docker installation first).
    - `docker run -p 6379:6379 -it redis/redis-stack-server:latest`
 * Start up server with `npm run start`
 * Start up client with `npm start`

## Issues / TODO
* No collision handling, collision = NoGo
* No network load balancing 
* No tests written