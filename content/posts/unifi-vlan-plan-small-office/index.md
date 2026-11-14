---
title: "A simple VLAN plan for a small office on UniFi"
date: 2026-11-08
description: "A starting point for splitting a small office network into separate networks for staff, guests, voice and IoT."
categories: ["UniFi"]
tags: ["VLAN", "Network design", "Wi-Fi"]
---

> [!NOTE]
> This is a sample post that shows what an article looks like. Replace or delete it when you publish your own.

One flat network is easy to set up and hard to live with. Splitting it into a few VLANs keeps guests away from company data and gives phones their own quiet lane.

## The plan

| VLAN | Name | Purpose | Example subnet |
|---|---|---|---|
| 1 | Management | Gateway, switches, access points | 10.10.1.0/24 |
| 10 | Staff | Laptops and desktops | 10.10.10.0/24 |
| 20 | Voice | Desk phones and the PBX | 10.10.20.0/24 |
| 30 | IoT | Printers, displays, sensors | 10.10.30.0/24 |
| 40 | Guest | Visitors, internet only | 10.10.40.0/24 |

## Rules of thumb

- Keep the numbering consistent across every site you manage.
- Give each VLAN its own Wi-Fi network only when devices really need wireless.
- Block traffic between VLANs by default and open only what is needed.

> [!WARNING]
> Test firewall changes while you are on site or have a second way in. Locking yourself out of the management network is easier than it sounds.
