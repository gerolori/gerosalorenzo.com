---
title: Healthcheck.io setup for Home Assistant
date: 2025-11-15
draft: false
description: How I setup healthchecks for my home assistant instance
categories:
  - self-hosting
  - tutorial
tags:
  - home-assistant
  - healthchecks
  - monitoring
  - uptime
showToc: true
TocOpen: false
hidemeta: false
comments: false
hideSummary: false
searchHidden: false
disableShare: false
disableHLJS: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
editPost:
  URL: https://github.com/gerolori/docu/tree/main/content
  Text: Suggest Changes
  appendFilePath: true
---
Go to healthcheck.io and configure your first project and sensor. After you get your first key you can start implementation. On linux hosts it's easier to embed that into cron but in home assistant there's multiple options.

You could either create a rest command in your configuration.yaml and call it via a timed automation (every x minutes, the one you've configured in the healthcheck dashboard).

``` yaml
# Example configuration.yaml entry
rest_command:
  healthcheck:
    url: "https://hc-ping.com/{your-key}"

```

Or you could add a cron job via the terminal (by running `crontab -e` and putting the following line inside):
`*/5*            \*       \*       *       curl -fsS -m 10 --retry 5 -o /dev/null https://hc-ping.com/{your-key}`

Or the easiest method by using [https://github.com/custom-components/healthchecksio](healthcheck.io home assistant's integration via HACS). As you can see from the documentation it actually doubles as a ping for the key that you specify, but also as an aggregator to visualize on Home Assistant the state of your other configured pings in the Healthcheck.io UI.
