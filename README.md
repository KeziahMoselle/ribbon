# Ribbon

## A bookmark manager app

This is an application which aim to help you complete reading your bookmarks.

## Preview

<p>
  <img width="250" src="./.github/demo.gif" alt="preview">

  <img width="250" src="./.github/homescreen.png" alt="preview">

  <img width="250" src="./.github/pinnedscreen.png" alt="preview">
</p>

## Features

- 📚 Manage your Reddit saved posts
- 🔔 Get reminders for pinned bookmarks
- 🔎 Filter through all your bookmarks

## Services

The goal is to centralize all bookmarks from different services but unfortunately it's not that easy since they did not provide an easy/legal way to do so.

✔️ Supported services :
- Reddit (Saved)

💡 Ideas :
- GitHub (Stars)

❌ Not possible :
- Twitter (Bookmark) **API endpoint closed**
- YouTube (Watch later) **API endpoint closed**

## How to install ?

### Requirements

- Node.js >= 12.0.0
- Yarn >= 1.16.0

1. Clone this repository

```sh
$ git clone https://github.com/KeziahMoselle/ribbon.git
```

2. Install dependencies

```sh
$ cd ribbon && yarn
```

3. Rename the `.env.example` to `.env` like so :

```
REDDIT_CLIENT_ID=theClientIdOfYourApp
REDDIT_USERNAME=yourRedditUsername
```
- Create an app at [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)
- It must be an `installed app`
- And your redirect URI should be like : `https://auth.expo.io/@yourusername/appname`

![clientId](https://i.imgur.com/4ilPYUg.png)

4. Launch the app

```sh
$ yarn start
```
