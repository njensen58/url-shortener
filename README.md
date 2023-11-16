# URL-Shortener
* App built to practice different techs in a fullstack environment.  
* This guide was used for broad steps [GUIDE](https://codingchallenges.fyi/challenges/challenge-url-shortener/)
* Incorporates the use of MD5 to base64 for hash.

## Stack
- React, Typescript, Node, Redis

## Techs
- Tailwindcss, jest, Webpack, postcss

## Get Started
 * install dependencies for Client and App with `npm i` in root and client dirs.
 * Create a local docker redis container (requires redis and docker installation first).
 * Start redis docker instance in server with `npm run docker-redis`
 * Start up server with `npm run start`
 * Start up client with `npm start`

## Issues / TODO
* No collision handling, collision = NoGo
* No network load balancing 
* No tests written