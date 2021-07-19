---
title: Make your PowerShell fancy by Windows Terminal and Oh My Posh
date: 2021-06-27 15:56:42
thumbnail: make-your-powershell-fancy-by-windows-terminal-and-oh-my-posh/goals.png
toc: true
categories:
  - 技術文章
tags:
  - terminal
  - powershell
---

## Goals

Follow steps in this article, and the result will look like this

{% asset_img goals.png %}

## Steps

There are only 6 steps to do

1. Install Windows Terminal
2. Install posh-git and oh-my-posh
3. Install powerline font
4. Config powershell profile
5. Config Windows Terminal Settings
6. Config VSCode Settings

Maybe only need to takes 15 mins to set everything right.

<!-- more -->

### Install Windows Terminal

From

- [Windows Store](https://aka.ms/terminal)
- [Github](https://github.com/microsoft/terminal)

### Install posh-git and oh-my-posh

Open powershell and

```powershell
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
```

### Install powerline font

See [https://github.com/ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts)

### Config powershell profile

Open powershell and

```json
code $PROFILE
```

That will open **Microsoft.PowerShell_profile.ps1**, then we fill in this and save

```powershell
Import-Module posh-git
Import-Module oh-my-posh
Set-PoshPrompt -Theme paradox
```

Then powershell will import posh-git and oh-my-posh and set theme every time you start you powershell

### Config Windows Terminal Settings

Open **settings.json** of Windows Terminal, add `defaults` section into `profiles` section, and assign colorScheme and fontFace you want

```json
{
		"profiles": {
        "defaults":
        {
            // Put settings here that you want to apply to all profiles.
            "colorScheme": "One Half Dark",
            "fontFace": "SauceCodePro NF"
        },
        "list":
        [
            {
                // Make changes here to the powershell.exe profile.
                "guid": "...",
                "name": "Windows PowerShell",
                "commandline": "powershell.exe",
                "hidden": false
            },
            {
                // Make changes here to the cmd.exe profile.
                "guid": "...",
                "name": "命令提示字元",
                "commandline": "cmd.exe",
                "hidden": false
            }
        ]
    },
}
```

### Config VSCode Settings

Open **settings.json** of vscode and add `terminal.integrated.fontFamily`

```json
{
	"terminal.integrated.fontFamily": "SauceCodePro NF"
}
```

## References

- [https://github.com/microsoft/terminal](https://github.com/microsoft/terminal)
- [https://github.com/dahlbyk/posh-git](https://github.com/dahlbyk/posh-git)
- [https://github.com/JanDeDobbeleer/oh-my-posh/](https://github.com/JanDeDobbeleer/oh-my-posh/)
- [https://github.com/ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts)
- [https://zhuanlan.zhihu.com/p/354603010](https://zhuanlan.zhihu.com/p/354603010)
