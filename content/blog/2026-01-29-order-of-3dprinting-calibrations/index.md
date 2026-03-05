---
title: "Calibrate your slicer settings in this order for perfect prints"
date: 2026-02-02
# weight: 1
# aliases: ["/first"]
tags: ["calibration", "orca-slicer", "klipper", "reference"]
categories: ["3d-printing"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Complete guide to calibrating your 3D printer slicer settings in the right order. Save filament and get perfect prints by following this systematic approach for Orca Slicer."
canonicalURL: "https://gerosalorenzo.com/posts/2026-01-29-order-of-3dprinting-calibrations/"
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

In this post we'll touch upon the order suggested for calibrating your printer (my take anyway). This way, you should have beautiful prints without any defects and possibly with the best aesthetic you can achieve.

This will cost you about half of a kilo of filament. Some calibrations don't need to be redone for different filaments, but my guess would be that you need an additional 100/200g for every filament you want to tune.

Also I'll mark every section with "FI" as "Filament Independent" so that you know that calibration doesn't to be run for every filament type you have, just one time.

## What to calibrate

All Orca Slicer values and options are worth tweaking. I have a very different profile from the stock one. The outline of the post will be the list of the changes we'll make.

Disclaimer: in some cases multiple calibrations of the same thing might be needed as you can set half decent values but then fine tweak them when the rest of the values are in place (eg temperature needs to be set beforhand but might benefit some tweaking after doing retraction and bridge settings. And again both of these might need new calibration after tweaking the temperature).

## Before any change

To avoid making breaking changes or overriding values that work by default i suggest you to backup the current profiles that you can use without issue (either saving with different name or actual export of those profiles).

Also your overall printer should be mechanically sound, so make sure you've assebled it properly and did all the basic mechanical calibrations like:

- bed leveling (full bed level, even if you use kamp, make sure there's not too much deviation in it and shim the bed with aluminium tape if needed)
- bed screw tune
- a decent enough z offset (i recommend [this one](https://www.printables.com/model/251587-stress-free-first-layer-calibration-in-less-than-5)).
- pid tuning for all heaters (nozzle, bed)
- e-step calibration (don't skip this one, it'll effect  all the rest. the default values of my printer were considerably off from ideal)

Also when making any test print, slice it and observe. If you, like me, own a .6mm nozzle, a lot of test prints are modeled with .4mm nozzles in mind so consider scaling those model's xy axis by 150%. The VFA test in orcaslicer is a good example, if not scaled it prints like a damn mess.

## Printer, filament and profile presets

I've come to the conclusion that there's so many values in the slicer that the most effective way to calibrate is to:

- set a printer profile (with your preferred mesh settings, bed heatsoak, right printhead dimensions for sequential printing etc)
- filament settings, setting a generic profile for every filament type you intend to use, and eventually create filament settings for specific use cases (very different filament, may need temperature and pressure advance change, fine tweaking ironing and whatnot)
- than create a process preset for each filament preset you have. this ensures stuff like SAFC, supports, brims, elefant foot (and more) are actually aligned with the filament you're using

Some example of preset selection:

`Neptune 4 Pro > PLA > PLA`

`Neptune 4 Pro > PETG Transparent > PETG Transparent`

You can obviously create any profile you want but i recommend starting with the structure above.

## The list

### Temporary profile

Use you default printer profile and do just these few tweaks to iron out possible big issues. Keep the order as flow rate can only be reliably changed after selecting the temperature, not the other way around.

#### [Temperature](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp-calib#temp-calibration)

Run a temperature tower and pick the best. If you're unsure I usually go 220 for PLA and 240 for PETG as both are the middle of the range given by most manifacturers. Don't worry about stringing, bridging and overhangs for now.

#### [Flow rate](https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow-rate-calib#orcaslicer--230-archimedean-chords--yolo-recommended)

Use the YOLO flow rate calibration to choose the best chip that has no visible gaps in the spiral top layer. I usually don't care about material buldging on the side of the spiral. It's an edge case (literally lol) and in my experience the archimedean chords print better than this test print even if they are a little bulgy in the test.

### Mechanical tweaks

These dictate motion, not extrusion, so they set the base for a solid printing profile.

#### [Input shaping](https://github.com/OrcaSlicer/OrcaSlicer/wiki/input-shaping-calib) - FI

You can skip this if you have a printer with an integrated accelerometer. If not you can use the orca test that already has the right model and sets the right values. This is critical to avoid ringing and vertical surface print defect. The test should also suggest you a desired max accelleration.

I honestly don't care for values other than the exterior surface of the print, if the infill has any ringing i don't care. So i usally reset the outer wall values to my 2500mm2/s default that i found out prints pretty well. Doing that I'm making sure I can select the best input shaping settings that give the best result for the outer surface.

Also tune the dampening, I saw a bit of improvement from tuning it and the x and y values are a bit different at least for my printer setup.

#### [VFA](https://github.com/OrcaSlicer/OrcaSlicer/wiki/vfa-calib)

After the input shaping we can check for the best speed to print our exterior walls at. This one will influence the outer wall a lot so do it and be careful, if you see any layer shift go back and tone down the acceleration for outer walls.

I empirically found out that there's ususally a threshold on the upper hand of your print speed where VFAs are mitigated by the amount of high speed, so i usually go pretty high on outer wall speeds (other than overhangs obviously, we'll see those later).

#### [Jerk](https://github.com/OrcaSlicer/OrcaSlicer/wiki/cornering-calib) - FI

Now take a look at your prints and if there's a lot of bulging in the corners consider lowering your jerk (either the overall value or specifically the wall value. I usually consent high jerk everywhere except outside walls and top surface).

#### Acceleration

Stick to you printer defaults or empirically try to increase them. I landed on double the defaults on some features, while keeping the outside wall lower than stock.

There's no good calibration test that is one click. If you have a Klipper based printer I recommend you using the [official guide](https://www.klipper3d.org/Resonance_Compensation.html) for this.

### Thermal and volumetric

#### [Temperature](https://github.com/OrcaSlicer/OrcaSlicer/wiki/temp-calib#temp-calibration) & [Flow rate](https://github.com/OrcaSlicer/OrcaSlicer/wiki/flow-rate-calib#orcaslicer--230-archimedean-chords--yolo-recommended)

Now it's a good time to redo the calibration for both these settings as you might see a slight change in them (especially if you make speed and jerk higher than default)

Like before don't invert the order of these 2 tests as flow is meaningless before the correct temp.

#### [Max volumetric flow rate](https://github.com/OrcaSlicer/OrcaSlicer/wiki/volumetric-speed-calib)

You can find this one in the calibration tab in orca and it's easy enough to run. With the previous settings set this will be ok to run at this time. I usually pick the best value before the extruder skips and then remove .5-1 mm3/s to be safer. If you want to maximize this value you should use a cht nozzle and increase the temperature your filament runs at. But be aware that such changes introduce a lot of stringing and less reliable bridges/overhangs, so if you're mainly printing boxes or geometrical shapes you might consider it, but for a good overall printer a more conservative value is better in my opinion (or again, you could make a couple of presets instead so you would select the specific filament profile for boxes too when printing).

### Pressure and extrusion

This section will make a hell of a lot of difference of corner definition and how much retraction does your printer do. This is crucial to avoid filament fatigue that leads to the printer stopping the extrusion because it can't grip the material anymore. I've had this problem and the cause was exactly the retraction being too aggressive

Also keep Small Area Flow Compensation for the time being, we'll set it better later as it can interfere with these calibrations

#### [Pressure advance](https://github.com/OrcaSlicer/OrcaSlicer/wiki/pressure-advance-calib)

Run the default test in orca and see for yourself, the best way to examine this value is to use a scanner to take a high resolution scan (i used 3600 dpi and was resolute enough) and be able to zoom in from your computer so that you can choose the best values without relying on your eyes. It can be also done by eye if you really know what you're looking for and a lens and a bright light can help you.

##### [Adaptive pressure advance](https://github.com/OrcaSlicer/OrcaSlicer/wiki/adaptive-pressure-advance-calib)

After setting the default pressure advance you can tune for the adaptive one (by specifying speed and accels in its calibration window). I usally input the common values I print at for both speed (i use both speeds and acceleration from outer wall/top surface, infill and bridge). This gives a realistic tune to the adaptive pressure advance.

#### [Retraction](https://github.com/OrcaSlicer/OrcaSlicer/wiki/retraction-calib)

You can only test the lenght with the orca model but should tune also the speed and the wipe if you experience jams or inconsistencies.

#### [Extrusion rate smooothing](https://github.com/OrcaSlicer/OrcaSlicer/wiki/speed_settings_advanced) - FI

Almost FI I should say. The calculation is detached from filament type but more fluid filaments like PETG compared to PLA can benefit from a lower value (60% of the calculated value, while I use 70% for PLA)

It's a relatively new orca setting and it's incredibly powerful. You should follow the official guide for it, and calculate you extrusion rate change from the max speed/accel/line width to the slowest part of a print (test on something like a benchy). So let's say going from 20mm3/s to 2mm3/s. This setting will help you smooth out the speed in which the extruder is requested to make a flow change, leading to smoother Features and less bumps/ridges.

### Path generation and line behaviour

#### Arachne values - FI

The deafult seems fine for both .4 and .6 nozzles but if you've never studied the settings I recommend taking a look at them because in some edge cases they will help with problems in some prints.

#### Line width - FI

I usually set everything at 110% except from the infill which can go to 160%. I also suggest to play with top surface line width as it can give you similar results as ironing, will explain later in the ironing tweaking section. With the .6 nozzle i was able to print 58% with no problem.

#### SAFC - Small Area Flow Compensation

This is almost FI. I found that a good amount of the courve overlaps between filaments (or has the same shape but an overall offset). So tune for one filament then test the found settings with the next filament and fine tweak. The first time it took me 8 tests, when tuning for petg I did 3 additional tests and found the right curve.

I suggest you [this model](https://www.printables.com/model/1084856-small-area-flow-rate-calibration) as as sinthetic test and [this one](https://www.printables.com/model/904788-small-area-flow-compensation-tester) as a more real world example on your prints. Also use [this spreadsheet](https://docs.google.com/spreadsheets/d/1N8rhKJ484WSviWE6zFKouiXxSNJRWCFdV1PVLgLK5Tc/edit?usp=sharing) (create a copy) to track changes, it makes it much easier than trial and error. I label my tests with a letter on the bottom to be able to track change.

This, after tuning adaptive pressure advance is probably the most useful tweak to skyrocket your print quality on small areas (reduce bulging, smoother finish). This will help you remove small imperfections that will help your print stand out.

Try using a sensible line width (100%-110% of nozzle size, or at least the most common you use) so that the whole print has small details tuned. We'll change the line width in a later chapter and fine tune it with flow only for it.

### Seams and scarf

These tweaks are aimed to the seam of a print. Usally i align my seams and are pretty flawless, but if you want to reach very good results you should tweak both. Remember to test on square objects, round objects hide the seam bump better and make it more difficult to compare. I simply used a small cube.

#### Seams

Tweak those by changing the value in percentage by 2% at a time. Doing so will make you discover the best value for the material/preset you're using.

#### Scarf joint - FI

Looks to be mostly FI, could benefit from filament specific tuning but my values looked pretty close from PLA to PETG.

I've used [this model](https://www.printables.com/model/783313-better-seams-an-orca-slicer-guide-to-using-scarf-s) for tuning and then [this one](https://www.printables.com/model/784633-scarf-seam-test-model) as a final test to ensure even bigger circles print correctly (doing so i found that a bigger scarf step is needed to ensure smooth big circles).

If you're using a .6m m nozzle has pretty different values than default. This will help you have a flawless finish on circular things and is best to keep on if it doesn't interfere with your other settings.

### First layer and bottom surface

All these kind of tests can be performed while you test other things (other than layer height, z offset, temperature and flow rate). By tweaking settings while you test other things you can save a lot of material without sacrificing accuracy.

#### Elefant foot compensation

Just make simple cubes and test some values, the results are pretty rewarding since it's a common issues, that can be mitigated with chamfers but is clearly still visible to a trainded eye.

#### Brim to object gap

Don't get me wrong, deburring tool is cool but i've never had one and I'm still going strong. Again this needs calibration as it will effect how easy brims come off, so you have the least post processing to make.

#### First layer flow

This could be worth tuning as at this point all the extrusion and heat settings are done. So you can create a better squish of the material by increasing it if you have a non uniform bottom to the part.

### Bridges and unsupported features

I'm still testing this section but I would highly suggest you to go watch this video in detail and make your calibrations of this. If calibrated correctly is a game changer.

### Supports

There's plenty of support test models (I used [this one](https://www.printables.com/model/96903-support-test) scaled to 50% and [this other one](https://www.printables.com/model/198420-support-test) to test ironing), just print one and find your best values, i found that different filament types have really different settings (eg: tpu works well with 0 interface spacing).

Consider enabling ironing for the interface layers as it'll leave a much more uniform surface of the overhanging part, especially noticeable on higher nozzle sizes.

### Top surface

This one is tricky

#### Don't use ironing - FI

Almost FI, line width and speed are basically FI, flow ratio is filament dependant so just rerun the flow test from the model linked below for each new filament you want to tune.

Ironing will give you an insanely perfect finish, but I don't think it's worth the effort or the slowness, you will be better printing at 65% line width and lowering the speed (both only for the top surface). This will give you a similar surface effect as the natural layer separation of the layer height (for me .3mm layer height vs .35mm top surface line width).

Again, this has the best and most coherent visual effect.

And [this](https://makerworld.com/en/models/2083080-advanced-top-surface-guide-understand-improve#profileId-2251186) is where you can find a good guide on this.

I used the model for the .4 mm as the .6 model is way too big. It also makes a better job on showing small areas as they are the trickyest of the bunch.

#### Use ironing

[This](https://www.printables.com/model/1247198-top-surface-ironing-test) is a good first test, i also used [this one](https://www.printables.com/model/654876-ironing-test-model) for a more real world example in use.

What? Why would I?

Basically one of the most aweful parts that can be printed (maybe a bit less excessive once you tune them like in the previous paragraphs) are bridges and support interfaces.

Even by tuning bridges, the results for a .6mm nozzle are not satisfactory at all so you might consider tuning to enable ironing of the support interface, to make it even easier to detach from the part and make the bottom of the supported part have and insanely precise finish (again, may be comparable to the sides or the top).

### Fuzzy skin - FI

This one is almost FI too, PETG droops a bit more than PLA so higher fuzzy skin values you could see a difference, but I think a good middle ground can be found.

I find that having a good fuzzy skin setting as default makes me want to use it more, but materials differentiate wildly so i suggest calibrating it for each and every material you're using to have a perfect one at hand. There's some good [fuzzy skin test models](https://www.printables.com/model/470352-fuzzy-skin-test) online.

You could also just print something that you would like to have a good feeling grip to it, I've done so with [these screwdrivers](https://www.printables.com/model/493064-ergonomic-lockable-bit-screw-driver-with-print-in). By doing so you make sure it's the best feeling fuzzy skin to the touch

## That's it!

You've calibrated every setting that could impact the quality of your prints. As I said in the intro, I think every settings needs attention to get the full grasp of the potential of your slicer.

Most of printing problems come from design flaws, but with these settings you can now be sure that most of the problems that pop up from now can be takled on the design side, and no printing is mostly a one button click job. Happy printing!