# Archy.js 🐧

> A fully interactive Arch Linux terminal emulator that runs entirely in the browser.

This is my **first GitHub repository featuring TypeScript (TS)** — a milestone project that combines a realistic Linux shell simulation with a clean, immersive UI built on the Catppuccin Mocha colour palette.

---

## Preview

- Animated connected-dots background
- Login screen with live clock
- Boot sequence animation
- Full interactive terminal with 60+ commands

---

## Tech Stack

| File | Purpose |
|---|---|
| `index.html` | Complete self-contained app — all CSS, JS, and HTML in one file |
| `terminal.ts` | TypeScript source — types, interfaces, and command logic (companion reference) |

No build tools. No frameworks. No dependencies. Open `index.html` in any browser and it runs.

---

## Getting Started

```bash
git clone https://github.com/yourusername/archy.js
cd archy.js
# Open index.html in your browser
```

Or just double-click `index.html`. That's it.

**Login credentials:**
- Username: `user`
- Password: `user`

**Sudo password:** `admin`

---

## Features

### Login Screen
- Live clock showing real time and date
- Arch Linux ASCII logo
- Username + password authentication (`user` / `user`)
- Specific error messages for wrong username vs wrong password
- Smooth fade transition into the terminal

### Connected Dots Background
- Canvas-based particle animation with 85 floating dots
- Dots draw connecting lines when within proximity
- Mouse interaction — nearby dots link to your cursor with brighter lines
- Runs behind both the login screen and terminal

### Terminal
- Fullscreen — fills the entire viewport
- Catppuccin Mocha palette throughout
- JetBrains Mono font
- Realistic boot sequence with systemd-style `[  OK  ]` lines
- Blinking cursor, smooth scroll, themed scrollbar
- Semi-transparent terminal over the animated background

### Shell Behaviour
- `↑` / `↓` — command history navigation
- `Tab` — filename completion in the current directory
- `Ctrl+L` — clear terminal
- `Ctrl+C` — cancel current input
- `sudo` — prompts for password with 5-minute session timeout

### Virtual Filesystem
A persistent in-memory filesystem that survives across commands within a session:

```
/
├── home/user/
│   ├── .bashrc
│   ├── .bash_history
│   ├── .config/
│   │   ├── hypr/hyprland.conf
│   │   ├── kitty/kitty.conf
│   │   └── nvim/init.lua
│   ├── Projects/README.md
│   ├── Documents/
│   ├── Downloads/
│   └── Pictures/
├── etc/
│   ├── os-release
│   ├── hostname
│   ├── pacman.conf
│   └── fstab
├── var/log/pacman.log
└── ...
```

---

## Commands

### Navigation & Files
| Command | Description |
|---|---|
| `ls [-la]` | List directory contents (colour-coded, hidden files with `-a`) |
| `cd [dir]` | Change directory (`~`, `..`, absolute and relative paths) |
| `pwd` | Print working directory |
| `cat [file]` | Display file contents |
| `touch [file]` | Create empty file |
| `mkdir [dir]` | Create directory |
| `rm [-rf] [path]` | Remove file or directory |
| `cp [src] [dst]` | Copy file |
| `mv [src] [dst]` | Move or rename file |
| `ln [src] [dst]` | Create a hard link |
| `stat [file]` | Detailed file metadata |
| `file [file]` | Detect file type |
| `du [path]` | Disk usage of path |
| `tree [dir]` | Visual directory tree |
| `find [path] [-name pattern]` | Find files by name |

### Text Tools
| Command | Description |
|---|---|
| `grep [pattern] [file]` | Search file for pattern (case-insensitive with `-i`) |
| `wc [file]` | Word, line, and byte count |
| `head [-n N] [file]` | First N lines (default 10) |
| `tail [-n N] [file]` | Last N lines (default 10) |
| `sort [file]` | Sort lines alphabetically (`-r` to reverse) |
| `uniq [file]` | Remove duplicate adjacent lines |
| `diff [file1] [file2]` | Compare two files |
| `base64 [-d] [text]` | Encode or decode base64 |
| `md5sum [file]` | MD5 hash |
| `sha256sum [file]` | SHA-256 hash |
| `rev [text]` | Reverse a string |
| `sed`, `awk` | Stream editing (basic simulation) |

### Archive & Compression
| Command | Description |
|---|---|
| `tar [-c\|-x\|-t] [-f archive] [files]` | Create, extract, or list archives |
| `zip [archive] [files]` | Compress files |
| `unzip [archive]` | Extract archive |

### System Information
| Command | Description |
|---|---|
| `neofetch` | System info with full Arch Linux ASCII logo |
| `uname [-a\|-r\|-m]` | Kernel and system information |
| `whoami` | Current user |
| `id` | User and group IDs |
| `groups` | Group memberships |
| `uptime` | System uptime and load average |
| `date` | Current date and time |
| `df` | Disk filesystem usage |
| `free` | Memory and swap usage |
| `ps [aux]` | Process list |
| `top` | Static process snapshot |
| `kill [pid]` | Send signal to process |
| `killall [name]` | Kill process by name |
| `lsblk` | Block device tree |
| `lscpu` | CPU architecture details |
| `lsusb` | Connected USB devices |
| `lspci` | PCI device list |
| `dmesg` | Kernel ring buffer messages |
| `env` | Environment variables |
| `history` | Command history (last 20) |
| `alias` | List or set shell aliases |
| `type [cmd]` | Identify command type |
| `which [cmd]` | Locate command binary |
| `chmod [mode] [file]` | Change file permissions |
| `sleep [n]` | Pause for N seconds |

### Network
| Command | Description |
|---|---|
| `ping [host]` | Ping a host (simulated with realistic RTT) |
| `curl [url]` | Fetch URL (simulated) |
| `wget [url]` | Download URL (simulated) |
| `ip addr` | Network interfaces |
| `ip route` | Routing table |
| `ip link` | Link-layer info |
| `ss` | Socket statistics |
| `ssh [host]` | SSH connection attempt |

### Package Management (`sudo` required)
| Command | Description |
|---|---|
| `pacman -Syu` | Full system upgrade |
| `pacman -S [pkg]` | Install package |
| `pacman -R [pkg]` | Remove package |
| `pacman -Rs [pkg]` | Remove with dependencies |
| `pacman -Q` | List all installed packages |
| `pacman -Q [pkg]` | Query specific package |
| `pacman -Qi [pkg]` | Detailed package info |
| `pacman -Ss [query]` | Search package database |

### Git
| Command | Description |
|---|---|
| `git --version` | Git version |
| `git init` | Initialise repository |
| `git status` | Working tree status |
| `git log` | Commit history |
| `git diff` | Show unstaged changes |
| `git branch` | List branches |
| `git clone [url]` | Clone repository |
| `git add / commit / push / pull / fetch / merge / checkout / stash` | Standard git operations |

### Math & Utilities
| Command | Description |
|---|---|
| `bc [expr]` | Calculator — evaluates real math expressions |
| `factor [n]` | Prime factorisation |
| `seq [n]` | Print number sequence |
| `cal` | Calendar with today highlighted |

### System Services
| Command | Description |
|---|---|
| `systemctl status [svc]` | Service status |
| `sudo systemctl start/stop/restart/enable/disable [svc]` | Manage services |

### Fun & Extras
| Command | Description |
|---|---|
| `sl` | Steam locomotive — the classic typo punishment |
| `cowsay [text]` | ASCII cow delivers your message |
| `fortune` | Random programmer wisdom |
| `banner [text]` | Big ASCII block letters |
| `figlet [text]` | FIGlet-style large text |
| `lolcat [text]` | Rainbow-coloured text output |
| `matrix` | Matrix-style Japanese character rain |
| `cmatrix` | Alternative character rain style |
| `hack` | Dramatic fake hacking sequence |
| `weather [city]` | Simulated weather report |
| `yes [str]` | Repeat a string (truncated at 24 lines) |
| `fortune` | Random quote from a developer's soul |

---

## Sudo & Authentication

```bash
# Requires sudo:
sudo pacman -S neovim
# [sudo] password for user: admin

# Session persists for 5 minutes before re-prompting
sudo pacman -Syu   # no re-prompt within timeout
```

---

## Colour Palette — Catppuccin Mocha

| Role | Colour |
|---|---|
| Background | `#1e1e2e` (Base) |
| Username | `#a6e3a1` (Green) |
| Hostname | `#89b4fa` (Blue) |
| Path | `#cba6f7` (Mauve) |
| Prompt `$` | `#fab387` (Peach) |
| Errors | `#f38ba8` (Red) |
| Directories | `#89b4fa` (Blue) |
| Executables | `#a6e3a1` (Green) |

Full palette: [catppuccin.com](https://catppuccin.com)

---

## TypeScript File (`terminal.ts`)

This is the typed companion to the HTML file. It defines:

- `FileSystemNode` — interface for the virtual filesystem tree
- `TerminalState` — full shell state (path, history, env, packages, sudo)
- `CommandResult` — return type for all commands
- All command implementations with proper TypeScript types

It's structured for porting into a React, Vite, or Node.js project. The HTML file runs standalone and doesn't import the TS file — think of `terminal.ts` as the typed blueprint.

---

## Project Structure

```
archy.js/
├── index.html      # The entire app — open this in a browser
├── terminal.ts     # TypeScript source (companion reference)
└── README.md       # You are here
```

---

## Acknowledgements

- [Catppuccin](https://github.com/catppuccin/catppuccin) — colour palette
- [JetBrains Mono](https://www.jetbrains.com/legalforms/fonts/) — terminal font
- Arch Linux — the distro that inspired this whole thing

---

*Built with vanilla HTML, CSS, and JavaScript. No frameworks. No build step. Just open it.*
