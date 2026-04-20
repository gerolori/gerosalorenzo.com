---
title: "Printing keycaps with a .6 nozzle: an optimization guide"
date: 2026-04-20T16:43:00.000+02:00
draft: false
description: There's a couple of tips that increase surface quality and
  printability drastically. Follow this guide to print your favourite keycaps
  the best they can be!
tags: []
categories:
  - 3d-printing
showToc: true
TocOpen: false
hidemeta: false
comments: false
hideSummary: false
searchHidden: false
disableShare: false
disableHLJS: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
  relative: false
  hidden: false
  image: img_20260420_105238826_hdr.jpg
editPost:
  URL: https://github.com/gerolori/gerosalorenzo.com/tree/main/content
  Text: Suggest Changes
  appendFilePath: true
---
This guide won't touch generic print calibration or any other print settings, you can follow my guide on best calibration settings order as you need a perfectly tuned printer to be able to print such small and precise things, especially with a larger size nozzle (mine is .6mm, i bet some keycaps can be printed on .8mm with a few more tweaks).

## Context

I've had my corne v4 keyboard for more than a year now, and i've bought it with no keycaps or keys since i had a 3d printer laying around and a spare set of keys. So i've printed a set, but since time was running low i stuck with a thicker keycap (nothing bad, even thockier if you prefer that), but recently i've found [this reddit post](https://www.reddit.com/r/ErgoMechKeyboards/comments/1so36jf/klp_lamé_on_cornix%2f) and tought "damn, i could use some new ergo keycaps since mine are flat and jump off the keyboard if i strike them too hard" (really, for future reference, pla keycaps don't wear on surface but the stem part becomes incredibly loose overtime, especially if you remove them somewhat frequently to fix them).

So with a couple of free hours on hand I've compiled this guide to suggest you the best slicer settings to get the best result possible. Enjoy :)

## Prerequisites

You obviously need a slicer, I'll be using Orcaslicer, but you find these settings in all the main ones, just with slightly different names.

Get the keycap you would like to print, you can do a standard flat one or even the accent keycaps with mini figurines on top of them, this guide improves quality for those too.

Get som petg, it has a worse finish than pla but the stem will stay more tight overtime, gripping the key better. 

## Modifiers

Part prep is as important as slicer settings, for the first step of this guide we'll cover print orientation and seam placememnt.

### Print orientation

45 degrees is the best way to print these, any other orientation on fdm and you'll be left with an ugly result.

### Adhesion improvement

By rotating to 45 you'll realize your keycap will likely be on an edge, and probably on a really thin one. On my example I've used the cut tool to remove .6mm of material from the bottom of the keycap. This way I can fit 2 full lines as the first layer of the keycap. That should be the metric, 2 complete lines should show on the first layer.

### Seam placement

That's crucial to control to make keycaps all uniform. I've enabled the seam modifier tool and did a vertical line on the back of the keycap, a line on the thicker portion of the stem, and a line on the upper portion, on the border side of the keycap to avoid that any seam would leak into the surface that the finger actually touches.

![Line of seam on the underside of the keycap](orca-slicer_xt0apptuxc.png "Line of seam on the underside of the keycap")

![Detail of seam on the stem](orca-slicer_grozannjz8.png "Detail of seam on the stem")

![Detail of side of keycap that shows to place seam on the outer portion of the keycap to avoid seams being applied to the part that gets touched by the finger](orca-slicer_dpinlmm1zj.png "Detail of side of keycap that shows to place seam on the outer portion of the keycap")

## Onto the settings

### Arachne, you can't without it.

Arachne, you can't without it. The other tweak is line width combined with Minimum Wall Width. On [these](https://github.com/braindefender/KLP-Lame-Keycaps/) keycaps (thin border) you're constrained to print them on a 45 degree slant to have a half decent result. This means you're going to print two of the sides with a 45 degree overhang (pla suggested for this, better than petg, even with supports) and with default arachne settings the tips of the thinnest loops merge into a single line.

The default setting is 85% and leads to this situation and artifacts:

![Interested area of the edge of the overhanging cap border. Merge in the 2 lines is clearly visible and arrows point to the visual artifacts that are present on the side of the keycap as the consequence of this setting at 85%.](orca-slicer_slxxijoi0k.png "Defect area")

With a more aggressive setting (but not enough to fix the problem fully, 80% in my case), the effect is mitigated (lines get separated) but vertical artifacts are still present.

![Lines now are separated up until the tip, vertical artifacts are still showing](orca-slicer_de32p6dzza.png "Still wrong settings, but better than before")

By setting Minimum Wall Width to 70% instead of the default 85% you are able to have tips that show like this:

![Lines fully rounded out an minimal vertical artifacts showing from the gcode preview](orca-slicer_hidstvkizq.png "This is the desred visual effect")

### Supports

Those need to be on and with a 40-45 degree threshold (especially with petg). This ensure the steam is propely supported and even the upper lip that gets created as a consequence of rotating to 45 degree the keycap. 

Raft

I've enabled it with 2 layers and .2mm of distance from the object so that the bottom part has a cleaner siding. Since, even when cut, it has a pretty thin surface of contact, having a raft makes those 2 thin lines possible and much easier to clean after the print.

### Wall count and infill

I printed them at 100% infill for better sound, there's no need strenght wise but hollow sounds worse.

### Lower your layer height

I went to .12 for best quality on my .6 nozzle. Not only does this improve looks, but also strengthens the sterm that's the crucial part of the print.

### Layer width

### Maybe

Fuzzy skin on the part that gets touched (by selecting the paint tool and having fuzzy skin set to "Paited Only") could improve perceived print quality, but would also lead to harder to clean keycaps. Worth tweaking tho, it looks like .4 spacing and .15 thickness is a good middle ground but it's pretty much personal preference.

## Results

There it is! all completed, for around 1 eur of material and replaceable at any time, doesn't get much better than this :)

![Finished project!](img_20260420_105238826_hdr.jpg "Finished project!")

![Finished project!](img_20260420_105306174_hdr.jpg "Finished project!")

![Detail of front of printed keycap](img_20260420_101133410_hdr.jpg "Detail of front of printed keycap")

![Detail of back of printed keycap](img_20260420_101326736.jpg "Detail of back of printed keycap")

![Detail of printed keycap](img_20260420_101256139_hdr.jpg "Detail of printed keycap")
