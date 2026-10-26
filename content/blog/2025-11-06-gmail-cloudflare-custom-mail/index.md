---
title: "Use Gmail to send mail through a custom Cloudflare email address"
date: 2025-11-06
# weight: 1
# aliases: ["/first"]
tags: ["cloudflare", "email", "gmail"]
categories: ["self-hosting", "tutorial"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Avoid paying for Google Workspace by using Gmail as a backend for custom Cloudflare Email routing. Free solution for managing multiple professional email addresses."
canonicalURL: "https://gerosalorenzo.com/gmail-send-as-other"
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

I've made this to avoid paying Google Workspaces (6 a month) or to use and external free service since I have this domain already.

## Cloudflare

Go to email routing, add a destination mail (your primary one that you want to use to control all the others).
Setup a custom address that you want to use to sign up to services, in my example it'll be dev@gerosalorenzo.com.

## Gmail

Go to the cog wheel in the top right, select all settings and go to "Accounts and imports".

Go to the "Send emails as" section and "add another email address" (while you're there you can check the reply from the same address the message was sent to).

After that you need to input the desired email in the right field and choose a name you want to be displayed as you send mails. Remember to uncheck the "Treat as an alias" box if you want to manage everything from Gmail.

For the SMTP settings, use:
- SMTP Server: smtp.gmail.com
- Port: 587
- Username: your full Gmail address
- Password: your Gmail password (or [app password](https://support.google.com/accounts/answer/185833?hl=en) if you use 2FA)
- Secured connection using: TLS

Then confirm the email that arrived and you're done. Now you can send emails as the custom email you've set trough cloudflare.

## Usage

You now can receive mails from that address, you can set to answer from it automatically if the email is sent to said address and you can choose to send mails with that address whenever you want.

On top of that you can now filter mail by who they are sent to, for important ones I've set to never send them to spam, categorize them properly and always set as important.

Enjoy