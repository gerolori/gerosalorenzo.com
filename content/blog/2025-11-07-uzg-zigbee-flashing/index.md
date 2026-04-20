---
title: "How to flash UZG-01 PoE Zigbee coordinator firmware"
date: 2025-11-07
# weight: 1
# aliases: ["/first"]
tags: ["home-automation", "zigbee", "firmware", "hardware"]
categories: ["self-hosting", "tutorial"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Step-by-step guide to properly flash firmware on the UZG-01 PoE Zigbee coordinator for home automation. Includes driver installation and troubleshooting tips."
canonicalURL: "https://gerosalorenzo.com/posts/2025-11-07-uzg-zigbee-flashing/"
disableHLJS: true # to disable highlightjs
disableShare: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
editPost:
    URL: "https://github.com/gerolori/gerosalorenzo.com/tree/main/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link
---

## Install the drivers

Those are usually pre installed, but you might have to do so manually.

Download them [here](https://www.silabs.com/software-and-tools/usb-to-uart-bridge-vcp-drivers?tab=downloads), extract the zip then click install after right clicking on the "silabser.inf" file (these are the instructions for windows).

After doing that reboot your pc.

## Flashing

I chose to install [XZG](https://xzg.xyzroe.cc/install/) but I'm pretty sure it works with the [UZG](https://uzg.zig-star.com/webinstall/) page too.

- Open one of the links above with a Chrome based browser.
- Hold down the reset button on the back of the uzg-01 poe.
- Plug it in a usb port of your pc (still holding the button down), I used a port directly on the motherboard and not one on the front IO, I think it was part of the problem why it wasn't working.
- Then, while still keeping the button pressed, press on install and select your device from the dropdown.
- Press "Install XZG firmware"
- If you're only seeing the "Preparing installation" text for 30s or more it probably failed, if it goes to "Erasing data" after a few sec it should be going well.
- Wait a couple of minutes until it finishes and then you can unplug it

Enjoy the new fresh install.