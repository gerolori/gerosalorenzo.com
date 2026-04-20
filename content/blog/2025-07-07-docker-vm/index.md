---
title: "Static IP in Proxmox Docker VM from helper script"
date: 2025-07-07
# weight: 1
# aliases: ["/first"]
tags: ["proxmox", "docker", "networking", "homelab", "netplan"]
categories: ["self-hosting", "tutorial"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Configure static IP addresses for Proxmox Docker VMs using Netplan. Essential setup for reliable homelab infrastructure and service separation."
canonicalURL: "https://gerosalorenzo.com/posts/2025-07-07-docker-vm/"
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
    URL: "https://github.com/gerolori/docu/tree/main/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link
---

I've chose to use the [Docker VM helper script](https://community-scripts.github.io/ProxmoxVE/scripts?id=docker-vm) for Proxmox as it gives me ease of mind to be able to use backups and migrate machines whenever. Also the separation of concerns about different things in my home makes it easier to mantain (I've got a different vm for each kind of service, one overall, a 3dprinting one, a cloud/file hosting one so I can make brake stuff in one but not affect all the others).

However without the cloud-init being available in the webui I wanted to change to a static IP the freshly booted VM and couldn't find a quick way of doing it.

Since it's a simple debian VM we just need to setup netplan properly and that's it.

## Backup your current config

Since you're probably opening the console from proxmox you won't have trouble losing connection, but as a safe measure I like to bacukp the default file.
Remember to use your own name of the file.

```bash
cp /etc/netplan/90-default.yaml /etc/netplan/90-default.yaml.bkp
```

## Let's get into it

Now you need to search for your ethernet adapter name with

```bash
ip a
```

Then nano into the file:

```bash
nano /etc/netplan/90-default.yaml
```

And copy this config personalyzing your address. In this example the static IP I've set is 192.168.1.10 and my gateway is 192.168.1.1 (I've also left it as a the dns resolver to resort to it's default settings).

Change ens18 to your own adapter name, even tho it might easly be matching mine.

```bash
network:
  version: 2
  ethernets:
    ens18:
      dhcp4: false
      dhcp6: false
      addresses:
        - 192.168.1.10/24
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [192.168.1.1]
```

After doing that I tried to apply the netplan but it threw an error, but installing this package fixed it:

```bash
sudo apt-get install openvswitch-switch-dpdk
```

Last thing you need to do is just to apply the changes

```bash
sudo netplan apply
```

And check if everything went well, you should se the ip address you set in the config file.

```bash
ip a
```

## What next?

If you're planning to use many docker vms you could consider to create a vm template with this static ip (set it to a number outside your router dhcp address range, and then at the first boot you can change it to whatever you prever).

Follow this [guide to create a docker vm template](https://www.winters.nz/proxmox/create-vm-template/) (i skipped the docker installation part since I've used the proxmox helper script for it. I also added tailscale and portainer agent so those are installed too when i spin one up)
