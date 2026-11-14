---
title: "Getting started with Microsoft Graph PowerShell"
date: 2026-11-12
description: "Install the Microsoft Graph PowerShell module, sign in with only the permissions you need and run your first query."
categories: ["M365"]
tags: ["PowerShell", "Microsoft Graph", "Entra ID"]
---

> [!NOTE]
> This is a sample post that shows what an article looks like. Replace or delete it when you publish your own.

Most Microsoft 365 administration that goes beyond the admin portals ends up in Microsoft Graph. This post walks through the first steps: installing the module, signing in and reading some data.

## Install the module

Open PowerShell and install the module for your own user account:

```powershell
Install-Module Microsoft.Graph -Scope CurrentUser
```

## Sign in with the right scopes

Graph works with permission scopes. Ask only for what you need for the task at hand:

```powershell
Connect-MgGraph -Scopes "User.Read.All"
```

> [!TIP]
> Run `Get-MgContext` to see which account and scopes your current session uses.

## Run a first query

```powershell
Get-MgUser -All |
    Select-Object DisplayName, UserPrincipalName |
    Sort-Object DisplayName
```

## Sign out

```powershell
Disconnect-MgGraph
```

## What the formatting looks like

| Element | How to write it |
|---|---|
| Code block | Three backticks followed by the language, for example `powershell` |
| Note or tip | A quote that starts with `[!NOTE]`, `[!TIP]` or `[!WARNING]` |
| Screenshot | Put the image next to `index.md` and write `![description](file.png)` |
