# SS14 Dashboard

## Overview
SS14 Dashboard is a dynamic and user-friendly dashboard for monitoring the status of the official Space Station 14 servers (reffered to as "Wizard's Den"). It provides real-time data visualization and server management tools, designed to enhance the gaming experience for both players and administrators.

## Live Demonstration
A live version of this repository is viewable [on my website](https://yunii.net/ss14)

## Features
- Real-time server statistics: Track player counts, server status, and other critical metrics.
- Automatic refresh options: Customize data refresh intervals for up-to-date information.
- Responsive design: Optimal viewing experience across a wide range of devices.
- Easy embeddability: Integrate the dashboard into other websites with a simple script.
- Easy-to-use public API endpoints: Retrieve server data with a simple GET request.
- Embed Functionality: Embed the dashboard into other websites with a simple script.

## Embedding
You can embed single server widgets into your website by adding the following iframe code to your HTML document:
```html
<iframe src="https://yunii.net/ss14?embed=true&server=leviathan" width="420px" height="150px" frameborder="0" scrolling="no"></iframe>
```
### Embed Parameters
- `embed` (boolean) - Set to `true` to enable embed mode. **Required**
- `server` (string) - The server name to display. **Required**
  - Available Servers: `leviathan`, `lizard`, `vulture`, `salamander`, `spider`, `miros` (RIP Centipede)
- `refresh`(float): The refresh interval in minutes. **Optional**
  - Default: No refresh
  - Please note that I highly recommend setting a refresh interval of at least `1` to avoid spamming my server, going below `1` is possible if absolutely needed but not recommended. If you need to, please ask me first. Thanks!
- `zoom` (float): The zoom level of the embedded widget. **Optional**
  - Default: `1`
  - Supported Zoom Levels: `0.25` - `4`

You can freely set the width and height of the iframe to your liking, the widget will automatically adjust to the given size. I recommend lowering the zoom if you need to go below 400x150
*Note: Not setting both of the required parameters results in nothing being displayed. Make sure both `embed` and `server` are set!*

## Getting Started

### Prerequisites
- Node.js
- npm or Yarn
- ReactJS ^18.2.0

### Installation
1. Clone the repository:
`git clone https://github.com/bhenrich/ss14-serverdashboard.git`
2. Navigate to the project directory:
3. Install dependencies:
`yarn add` or `npm install`
4. Start the development server:
`yarn start` or `npm run start`


## Contributing
Contributions to the SS14 Dashboard are welcome! Please feel free to submit pull requests or open issues for any enhancements, bug fixes, or feature requests.

## License
This project is licensed under the [MPL-2.0 License](LICENSE).

## Contact
- YuNii - benjamin@bhenrich.de
- Project Link: https://github.com/bhenrich/ss14-serverdashboard

## Acknowledgments
- Space Station 14 Game, Concept, Server Data and Logo Art by [Space Wizards](https://github.com/space-wizards)
- Space Station 14 Dashboard by [YuNii](https://github.com/bhenrich)

- This project is a independent project and not affiliated with Space Station 14 or Space Wizards in any way. All rights reserved by their respective owners. For more information, please visit https://spacestation14.io/
