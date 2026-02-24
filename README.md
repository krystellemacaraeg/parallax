# PARALLAX — Ground Station Terminal

A NASA Astronomy Picture of the Day terminal built as a learning project.
Receives daily transmissions from the NASA APOD API, decodes image and video
signals, and writes saved entries to a local memory buffer.

Built with React (Vite), Tailwind CSS, and the NASA Open API.

## Features

- Live and archive signal acquisition via date picker (back to June 16, 1995)
- Automatic decoder — handles image and video transmissions
- Memory buffer — saves signals to localStorage across sessions
- Raw telemetry view — flip to the unprocessed JSON payload
- Dark terminal UI with sidebar layout

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- NASA APOD API

## Setup
````bash
git clone https://github.com/YOUR_USERNAME/parallax.git
cd parallax
npm install
````

Create a `.env` file in the root:
````bash
VITE_NASA_API_KEY=your_key_here
````

Get a free API key at [api.nasa.gov](https://api.nasa.gov).
````bash
npm run dev
````

## Live Demo

[parallax-yourname.vercel.app](https://parallax-yourname.vercel.app)