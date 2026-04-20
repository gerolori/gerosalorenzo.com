---
title: "You are wrong about dark mode."
date: 2026-02-26
# weight: 1
# aliases: ["/first"]
# Choose categories based on content:
# - Domain: 3d-printing, self-hosting, programming
# - Type: tutorial (if step-by-step guide)
# - Can use multiple! Example: ["self-hosting", "tutorial"]
categories: ["programming"]
tags: ["ergonomics", "dark-mode", "light-mode", "eye-health", "productivity"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "You're wrong about dark mode. There, I said it. Here's why proper brightness beats edgy themes; and it's a night/day difference (pun intended)."
canonicalURL: "https://gerosalorenzo.com/you-are-wrong-about-dark-mode"
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
editPost:
    URL: "https://github.com/gerolori/gerosalorenzo.com/tree/main/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link
---

## That's true

You're probably a programmer, or some kind of tech enthusiast and since 2016 when android introduced dark mode to the world you were hooked. Or if you're younger you probably got bullied into dark mode by your edgy cool friend that said that light mode is for boomers. Well either way, I was all of those above for some time, but the need of working of computer for 8+ hours a day (both for uni, work and personal projects).

## Wait but I'm right, dark mode IS better

Well, yeah, but no. Like everything in life it's circumstantial.

### Readability is only somewhat subjective

You might think readability is just personal preference, like choosing between coffee or tea. "I just prefer dark mode, it feels easier on my eyes" is something I've heard a million times. And I get it, subjective comfort matters.

But here's the thing: researchers actually measured this stuff. Like, with real people and controlled experiments. And what they found isn't just opinions, it's measurable, repeatable data about how our eyes and brains process text on screens.

So while your preference is valid (I'm not here to yuck your yum), the objective reality of how quickly and accurately you can read? That's less subjective than you'd think.

### You're not made for dark mode

Here's where it gets interesting (and by interesting I mean: bad news for dark mode enthusiasts).

Your pupils are constantly adjusting based on light conditions. When you're looking at a bright screen with dark text (light mode), your pupils contract. When the screen is dark with light text (dark mode), your pupils dilate to let more light in.

So what's the problem with dilated pupils? Well, a smaller pupil (from bright conditions) reduces what's called spherical aberrations and increases your depth of field. Basically, your eyes can focus better and more precisely. Dilated pupils in dark mode? The opposite happens: more aberration, harder to focus.

This is why small text is especially painful in dark mode. Your eyes are already working harder to maintain focus, and then you throw tiny fonts at them? It's like asking someone to thread a needle while wearing someone else's prescription glasses (a bit dramatic, but you get the point).

### White mode is simply superior

Alright, time for the receipts. Multiple peer-reviewed studies from different research groups all found the same thing, and it's pretty damning for dark mode:

- [Piepenbrock et al. (2013)](https://doi.org/10.1080/00140139.2013.790485) in the Ergonomics Journal found light mode won across all dimensions for visual acuity and proofreading tasks. Not some dimensions, all of them.

- [Piepenbrock et al. (2014)](https://doi.org/10.1177/0018720813515509) in Human Factors discovered something wild: the light mode advantage increases as font size decreases. So the smaller your text, the more you need light mode. Also, participants didn't even perceive the difference even though their performance was measurably better in light mode.

- [Palmén et al. (2023)](https://doi.org/10.1145/3544548.3581552), a Google research team study with 459 participants at ACM CHI, confirmed that dark text on light background is read reliably faster.

- The [Nielsen Norman Group (2020)](https://www.nngroup.com/articles/dark-mode/) literature review summed it up nicely: "In users with normal vision, light mode leads to better performance most of the time."

## But I don't like white mode, it's too bright

You're right, it's goddamn white, the brightest it can be. But guess what, if you actually think that you've probably never touched the brightness setting of your monitor. And I can't belive that people with 20+ years of work experience I've seen work don't bother with it at all. I know plenty of people that get headaches from staring at a computer screen 12+ hours a day, and it's honestly pretty much guaranteed at some point and time, but you can easily minimize discomfort to a null by tuning your screen brightness down.

### How low tho?

#### Prepping the space

They key to screen brightness is to tune it in the moment of day where the light is max in the space where you have your pc. Doing so makes sure it's as bright as it needs to be for the brightest part of day (so I'd suggest to pick a pretty sunny day to do this) and the darker stuff will come later.

First of all you need light behind your monitor, especially if you're tucked in a dark corner of your office or your house. This will ensure that your background isn't too dark to make even low brightness discomfortable with light mode. If you're in the market for a light for the back of your monitor I would suggest to you to use some kind of bulb with any kind of lamp mount that can dim and change white temperature, those will be crucial for the dark part of the day (I actually use one the whole time I'm at the pc, and I auto dim/temp the smart light bulb with a [home assitant plugin](https://github.com/basnijholt/adaptive-lighting))

If you have a very bright window on any direction around you shoud consider either moving or installing diffusing courtains.

#### Setting screen brightness

Now it's just trial and error, my guess is that you'll land somewhere between 30% and 50% but every screen is very different to one another so you should go from 100% to 1% and try and notice what is the range where your monitor "blends" with your wall behind the monitor. Don't be afraid of doing it for a ton of times, it should become really comfortable to your eyes.

### Now what? I still don't like to use dark mode at night

And you shouldn't! Dark mode is actually the best invention of the millenium, it really tones down the whole monitor output but at readability cost. And just like room light, I like to tie togeather things to the movement of the sun, to simulate the light exposure of a normal day outside (that's what we're born to do anyway, so it's best to replicate it if you can't retire early to manage kettle in a remote mountain hut).

Go ahead and install an auto theme switcher. On Windows 11 I'm using [Auto Dark Mode](https://github.com/AutoDarkMode/Windows-Auto-Night-Mode). For linux there's [scripts](https://github.com/littleant/auto-darkmode-switcher) or whole [shell extensions](https://extensions.gnome.org/extension/2236/night-theme-switcher/) to achieve the same thing, and your apple ecosystem already has a setting for that (Android too, but I use mine in dark mode all the time just to squeeze out more battery time from my amoled display).

#### I bet a lot of you don't even bother with browser extension

If your one of those half dark knights, go ahead and install Dark Reader on your favourite browser and go ahead an sync it with your system theme so that it switches togeather with it.

#### Of course IDEs and terminal too

There's plenty of extensions you can install to sync the theme of your favourite code editor to match your system. The only tricky one is the [guide to get that to work in Windows Terminal](https://superuser.com/questions/1843248/windows-terminal-automatic-switch-dark-light-theme-based-on-windows-settings), but you shouldn't use that anyway.

## Conclusion

By doing everything in this post you'll have the most comfortable setup you had in years, I guarantee you. It's night/day difference (lol, do you see what I did there?). Now there's nothing left other than spamming github issues on your favourite projects to actually include a white mode to make everything matching time of the day.

## You want more?

I mean, I have some more, here it is: match this configuration with a [f.lux installation](https://justgetflux.com/). This way you will have matched your cyrcadiam rithm and daylight exposure to the day, and working on a pc will finally feel natural, no more headaches, no more dry eyes (well, you still need to follow the [20-20-20 rule](https://www.google.com/search?q=20+rule+for+eyes) for your eyes benefit).