# Convenient Homepage

>a chrome extension served as a homepage with built-in notes, links manager and global search

# Features
- **Background rotation** - configurable background rotation, utilize images from bing, unsplash, pixabay
- **Notes** - create and save markdown like notes locally in you browser
- **Bookmarks** - enumerate all your bookmarks and manage them here
- **Global search panel** - search everything in one place
- **Restorable Database** - backup and restore your data as json

# Installation

1. clone this repository `git clone https://github.com/nafalabi/convenient-homepage.git`
2. install dependencies `yarn install` make sure you have node v16
3. fill in .env variables (sample is in .env.sample)
4. build the app `yarn build`
5. go to chrome extension manager and turn on developer mode
6. click on `load unpacked` and choose `<convenient_homepage_folder>/build`

# Showcase

### Initial install
![](screenshots/ch-initial.png)
### Homepage
![](screenshots/ch-idle.png)
### Global Search (notes, bookmarks, links)
![](screenshots/ch-search-panel-open.png)
### Global Search - searching keyword
![](screenshots/ch-search-panel-entered-keyword.png)
### Notes
![](screenshots/ch-notes.png)
### Settings
![](screenshots/ch-background-settings1.png)
### Settings 2
![](screenshots/ch-background-settings2.png)
### Bookmarks
![](screenshots/ch-bookmarks.png)
### Menu
![](screenshots/ch-menus.png)
