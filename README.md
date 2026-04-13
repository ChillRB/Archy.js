# Archy.js 🐧

> A fully interactive Arch Linux terminal emulator that runs entirely in the browser.

This is my **first GitHub repository featuring TypeScript (TS)** — a milestone project that combines a realistic Linux shell simulation with a clean, immersive UI built on the Catppuccin Mocha colour palette.

> 📄 **This repo includes a free PDF** — `Archy.js Documentation.pdf` — with 23 pages of in-depth documentation covering every command, the design system, the TypeScript architecture, customisation tips, troubleshooting, and more. No sign-up, no paywall, just open it.

---

## Preview

- Animated connected-dots background with mouse interaction
- Login screen with live clock and Arch Linux ASCII logo
- systemd-style boot sequence animation
- Full interactive terminal with 100+ commands

---

## Tech Stack

| File | Purpose |
|---|---|
| `index.html` | Complete self-contained app — all CSS, JS, and HTML in one file |
| `terminal.ts` | TypeScript source — types, interfaces, and command logic (companion reference) |
| `README.md` | This file |
| `Archy.js Documentation.pdf` | Free 23-page in-depth reference guide — included in this repo |

No build tools. No frameworks. No dependencies. Open `index.html` in any browser and it runs.

---

## Getting Started

```bash
git clone https://github.com/ChillRB/archy.js
cd archy.js
# Open index.html in your browser
```

Or just double-click `index.html`. That's it.

**Login credentials:**
- Username: `user`
- Password: `user`

**Sudo password:** `admin`

---

## Free Included PDF

This repo ships with **`Archy.js Documentation.pdf`** — a complete 23-page reference guide written specifically for this project. It covers:

- Every single command with detailed descriptions and example output
- The full Catppuccin Mocha design system with all 18 colour tokens
- TypeScript architecture — every interface, function, and type explained
- Virtual filesystem structure and how file operations work internally
- Login screen, boot sequence, and shell initialisation deep dives
- Keyboard shortcuts, prompt anatomy, and UX details
- Customisation guide — change the username, add commands, tune the particles
- Troubleshooting & FAQ for common issues
- Ideas for future features and how to extend the project
- Porting guide for React / Vite / Node.js

No external link. No download required. It's right here in the repo.

---

## Features

### Login Screen
- Live clock showing real time and date
- Arch Linux ASCII logo in Catppuccin blue
- Username + password authentication (`user` / `user`)
- Specific error messages for wrong username vs wrong password
- Smooth fade transition into the terminal on success

### Connected Dots Background
- Canvas-based particle animation with 85 floating dots
- Dots draw connecting lines when within proximity of each other
- Mouse interaction — nearby dots link to your cursor with brighter lines
- Runs behind both the login screen and terminal

### Terminal
- Fullscreen — fills the entire viewport
- Catppuccin Mocha palette throughout every element
- JetBrains Mono font for all text
- Realistic boot sequence with systemd-style `[  OK  ]` lines
- Smooth scroll, themed scrollbar, blinking cursor

### Shell Behaviour
- `↑` / `↓` — command history navigation
- `Tab` — filename completion in the current directory
- `Ctrl+L` — clear terminal
- `Ctrl+C` — cancel current input
- `sudo` — password prompt with 5-minute session timeout

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
| `grep [pattern] [file]` | Search file for pattern |
| `wc [file]` | Word, line, and byte count |
| `head [-n N] [file]` | First N lines |
| `tail [-n N] [file]` | Last N lines |
| `sort [file]` | Sort lines alphabetically |
| `uniq [file]` | Remove duplicate adjacent lines |
| `diff [file1] [file2]` | Compare two files |
| `base64 [-d]` | Encode or decode base64 |
| `md5sum / sha256sum` | Hash files |
| `rev [text]` | Reverse a string |
| `printf [fmt]` | Formatted print |

### System Information
| Command | Description |
|---|---|
| `neofetch` | System info with full Arch Linux ASCII logo |
| `uname [-a\|-r\|-m]` | Kernel and system information |
| `whoami` | Current user |
| `id` | User and group IDs |
| `uptime` | System uptime and load average |
| `date` | Current date and time |
| `df` | Disk filesystem usage |
| `free` | Memory and swap usage |
| `ps [aux]` | Process list |
| `top` | Static process snapshot |
| `lsblk` | Block device tree |
| `lscpu` | CPU architecture details |
| `lsusb` | Connected USB devices |
| `lspci` | PCI device list |
| `dmesg` | Kernel ring buffer messages |
| `vmstat / iostat / mpstat` | System performance stats |

### Package Management (`sudo` required)
| Command | Description |
|---|---|
| `pacman -Syu` | Full system upgrade |
| `pacman -S [pkg]` | Install package |
| `pacman -R [pkg]` | Remove package |
| `pacman -Q` | List all installed packages |
| `pacman -Qi [pkg]` | Detailed package info |
| `pacman -Ss [query]` | Search package database |

### Networking
| Command | Description |
|---|---|
| `ping [host]` | Ping with realistic RTT |
| `curl [url]` | Fetch URL (wttr.in and ipinfo supported) |
| `ip addr / route` | Network interfaces and routing |
| `nmap [host]` | Port scanner |
| `traceroute [host]` | Trace network path |
| `dig / nslookup / host` | DNS lookups |
| `ufw` | Firewall management |
| `nmcli` | NetworkManager CLI |
| `speedtest` | Simulated speed test |
| `rsync [src] [dst]` | File synchronisation |

### Git
| Command | Description |
|---|---|
| `git status` | Repo status |
| `git log` | Commit history with hashes |
| `git diff` | Show changes |
| `git branch` | List branches |
| `git clone [url]` | Clone repository |
| `git add / commit / push / pull` | Standard git operations |

### Security & Crypto
| Command | Description |
|---|---|
| `gpg --list-keys` | List GPG keys |
| `openssl rand -hex N` | Random hex bytes |
| `openssl genrsa` | Generate RSA key |
| `ssh-keygen` | Generate SSH keypair with randomart |
| `ufw / iptables` | Firewall rules |

### Languages & Build Tools
| Command | Description |
|---|---|
| `node -e "expr"` | Evaluate JavaScript |
| `npm init / install / run` | Node.js package manager |
| `python3 -c "expr"` | Evaluate Python (print() supported) |
| `pip install / list` | Python packages |
| `cargo new / build / run / test` | Rust build tool |
| `go build / run / test` | Go build tool |
| `gcc / g++` | C/C++ compiler |
| `make` | GNU Make |
| `java / javac` | Java runtime and compiler |

### System Services & Logs
| Command | Description |
|---|---|
| `systemctl status [svc]` | Service status |
| `sudo systemctl start/stop/enable` | Manage services |
| `journalctl [-n N]` | View systemd logs |
| `timedatectl` | Time and timezone info |
| `hostnamectl` | Hostname and machine info |
| `crontab -l / -e` | Scheduled tasks |
| `pactl / amixer` | Audio control |

### Fun & Visual
| Command | Description |
|---|---|
| `sl` | Steam locomotive |
| `cowsay [text]` | ASCII cow |
| `fortune` | Random programmer wisdom |
| `matrix / cmatrix` | Matrix character rain |
| `pipes.sh` | Animated pipe art |
| `cbonsai` | ASCII bonsai tree |
| `pokemon` | Random Pokémon encounter |
| `hack` | Fake hacking sequence |
| `banner / figlet / lolcat` | ASCII art text |
| `weather [city]` | Weather report |
| `bc [expr]` | Calculator |
| `factor [n]` | Prime factorisation |
| `cal` | Calendar |

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `↑` / `↓` | Command history |
| `Tab` | Filename completion |
| `Ctrl+L` | Clear terminal |
| `Ctrl+C` | Cancel input |

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

Full palette reference: [catppuccin.com](https://catppuccin.com)

---

## TypeScript File (`terminal.ts`)

The typed companion to the HTML file. Defines:

- `FileSystemNode` — interface for the virtual filesystem tree
- `TerminalState` — full shell state (path, history, env, packages, sudo)
- `CommandResult` — return type for all commands

See the included PDF for a complete breakdown of every interface and function.

---

## Project Structure

```
archy.js/
├── index.html                    # The entire app — open this in a browser
├── terminal.ts                   # TypeScript source (companion reference)
├── README.md                     # You are here
└── Archy.js Documentation.pdf    # Free 23-page in-depth reference — included!
```

---

## Acknowledgements

- [Catppuccin](https://github.com/catppuccin/catppuccin) — colour palette
- [JetBrains Mono](https://www.jetbrains.com/legalforms/fonts/) — terminal font
- Arch Linux — the distro that inspired this whole thing

---

*Built with vanilla HTML, CSS, and JavaScript. No frameworks. No build step. Just open it.*
