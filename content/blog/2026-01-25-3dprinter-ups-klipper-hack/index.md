---
title: "Fix UPS triggering when running klipper based 3d printer"
date: 2026-01-25
# weight: 1
# aliases: ["/first"]
tags: ["klipper", "power-management", "ups", "hardware", "troubleshooting"]
categories: ["3d-printing"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "I finally managed to tweak my printer to run on a really small and cheap ups. You can too"
canonicalURL: "https://gerosalorenzo.com/posts/2026-01-25-3dprinter-ups-klipper-hack/"
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

## The problem

I have some power outages in my area and we often trip the breaker in my house. I also modded my printer so i lost all the print resume ability of the printer when the AC blips. So i naturally wanted to get an UPS but after buying the cheapest I could get it started beeping on me when heating the whole bed.

## The premise

If you want to follow this guide you just need a Klipper based printer and your small UPS (or even a bigger one that triggers it's safety features when all printers are going at the same time)

## The solution

So basically you can just adjust the amount of power the bed is allowed to get, in my case I have a printer (Neptune 4 Pro) that has an inner and outer bed, so in my case I've left the inner bed untouched to make small prints still heat fast.

The setting you're looking for is:

``` gcode
[heater_generic heater_bed_outer]
heater_pin:PC8
max_power: 1.0
```

And by tweaking the `max_power`, either on your outer bed or on your main bed, you can find the right treshold where the heatbed is heating but doesn't trip the safety features of the ups.

You could easily measure the watt consumption of your 3d printer from cold to max bed temperature and write down its values.

I found that in my case that the Tecnoware 750VA/560w UPS is triggering the beeping right above 200w consumption (when hovering around 220/210w it still seems to hold, looks like you have to do some testing), the inner bed uses 130w when heating up, the outer 176w. I need to reduce the 176 to 70w to be able to heat up both at the same time. 70/176=0.4.

If you're exactly in my situation, with a Tecnoware ERA PLUS 750VA and a Elegoo Neptune 4 Pro you can start by setting it at .63 as it seems the exact threshold before it triggers.

If you have the 2 zone bed remember that you're still using the inner bed to heat, so your time to heat will increase but the power will be .66 combined for the beds, whereas smaller prints will heat at the same rate.

## Consclusions, is it worth it?

In my case it's a good tradeoff as I would not have bought anything more expensive than the 41 euros I've spent on the UPS and if your other option is to not run the printer with a ups i thinks it's invaluable as it has just saved you time and money on the reprints that will occur when the current blips or you trigger the braker accidentally.

This kind of small ups won't save you from a full on power outage but will give you around 30 minuts of buffer for smaller ones and grid blips.
