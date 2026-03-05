---
title: "First impressions, Vim is cool (setup)"
date: 2026-02-27
series:
  - vim-journey
series_weight: 1
description: "Day 1 of learning Vim: getting to know the basics and learning the first commands."
tags:
  - vim
  - productivity
  - keyboard-shortcuts
categories:
  - programming
ShowToc: true
TocOpen: false
canonicalURL: "https://gerosalorenzo.com/posts/first-impressions-vim-is-cool"
---

## I lied to you

That's not my first test run, I've installe neovim in 2024 and got discouraged by the setup and by the fact that the basic movements (even hjkl) were completely foreign to my hands (addin 2 new layers of stuff on top of the most basic thing ever, typing, seemed somewhat useless and pretty discouraging since I could feel the friction between toughts and my hands executing actions). Then I started digging on ergo/split keyboards and typing hand placement and got deep into that rabbit hole.

### Dissecting the problem

I than took a step back and managed to break down the task and first fixing my typing hand placement, then worrying about Vim motions and cool shortcuts.

First i started by researching good typing hand placement and came clear to me that asdf-jkl; would be the place where I would spend most of the time from then on, since I've spent most of my life typing with a similar hand placement of gaming (wasd rest postition, and no specific fingers assigned to each keyboard, they went all over the place).

### The chance

It seems a bit off topig but when watching different videos of split keyboard I got presented the home row based QMK configurations, that basically developed around making the home row the base of your movement, leveraging the least motion and using your strongest fingers to match the most used functions. And that's what sealed the deal for me, I understood that it was my chance to bind my arrow key (and especially, my mouse up/down/left/right) to hjlk to finally start getting acquainted with vim motions, even if other vim shortcuts would come at a later time.

### Don't mind if I do

My first contact with vim shortcut would come not that much later when I was trying to move most of my interactions to the keyboard, to save time and avoid moving the hands from it. Since most of what I was doing was basically browsing the web, coding and studying I started looking into browser extensions that could let me browse visually with a keyboard and found [vimium](https://vimium.github.io/).

That re-sparked the interest into shortcuts and I started using the `f` shortcut to navigate pages (by doing that you can also realize how many websites are completely unusable accessibility wise).

And I often looked at the cheatsheet of the extension with `?`, suddently dreaming of a fluent way to select text via keyboard on a web page, the last mouse movement I was addicted to.

## The plan

After a good year of practicing Vim motions and a couple of known Vimium shortcuts memorized I'm deciding to take the jump and actually incorporate Vim motion/shortcuts into my coding workflow and exploring Vimium deeper too.

## The setup

I'll probably do a deeper dive into my setup in another post, but for now let's cover the basics.

I'm using different extensions/plugins to avoid using neovim entirely (not sure why that, but I feagured I could move to it any time as my primary code editor after I've become fluent with the motions).

| Source                             | Extension                                       |
| ---------------------------------- | ----------------------------------------------- |
| Browser                            | [Vimium](https://vimium.github.io/)             |
| VSCode(ium)                        | [Vim](https://github.com/VSCodeVim/Vim)         |
| Intellij IDEs (Android Studio too) | [IdeaVim](https://github.com/JetBrains/ideavim) |

With that setup I've basically enabled Vim on the places where I spend most of my time, and the last mile is done by the [QMK mouse keys](https://docs.qmk.fm/features/mouse_keys) I've setup to match hjkl.

### Insane tip

I know AI is now taken by granted, but I honestly tought only recently that copying snippets of the code that I'm trying to navigate to ask what's the best combo to efficiently do whatever I'm trying to do.

## First day of using it, how is it?

Honestly? It's basically like writing with your non dominant hand, and having to consult the dictionary for every goddamn letter you try to write. It's unsufferable lol.

Jokes aside, it's really tough but doing it a bit of a time and taking a couple of minutes to really understand the commands you're using is really useful and I feel like I'm progressing really fast (noobie gains let's goo).

### v for visual mode.

I've come used to navigating the browser with the f key by now, but I'm realizing that's pretty much useless in editing documents, since most I'm trying to do is select stuff and copy it for now (to ask AI like I've said).

In the next post I'll share a couple more findings I've done in the next few days.
