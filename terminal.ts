// Archy.js — TypeScript Logic
// Arch Linux Terminal Emulator
// Catppuccin Mocha palette reference (used in HTML/CSS)

export interface FileSystemNode {
  type: "file" | "dir";
  content?: string;
  children?: Record<string, FileSystemNode>;
  permissions?: string;
  owner?: string;
  size?: number;
  modified?: string;
}

export interface TerminalState {
  user: string;
  hostname: string;
  currentPath: string[];
  history: string[];
  historyIndex: number;
  fileSystem: FileSystemNode;
  sudoAuthenticated: boolean;
  sudoTimeout?: number;
  env: Record<string, string>;
  installedPackages: string[];
}

export interface CommandResult {
  output: string;
  isError?: boolean;
  requiresPassword?: boolean;
  delay?: number;
  isHtml?: boolean;
}

const NEOFETCH_ASCII = `<span class="neo-blue">                   -\`</span>
<span class="neo-blue">                  .o+\`</span>
<span class="neo-blue">                 \`ooo/</span>
<span class="neo-blue">                \`+oooo:</span>
<span class="neo-blue">               \`+oooooo:</span>
<span class="neo-blue">               -+oooooo+:</span>
<span class="neo-blue">             \`/:-:++oooo+:</span>
<span class="neo-blue">            \`/++++/+++++++:</span>
<span class="neo-blue">           \`/++++++++++++++:</span>
<span class="neo-blue">          \`/+++ooooooooooooo/\`</span>
<span class="neo-blue">         ./ooosssso++osssssso+\`</span>
<span class="neo-blue">        .oossssso-\`\`\`\`/ossssss+\`</span>
<span class="neo-blue">       -osssssso.      :ssssssso.</span>
<span class="neo-blue">      :osssssss/        osssso+++.</span>
<span class="neo-blue">     /ossssssss/        +ssssooo/-</span>
<span class="neo-blue">   \`/ossssso+/:-        -:/+osssso+-</span>
<span class="neo-blue">  \`+sso+:-\`                 \`.-/+oso:</span>
<span class="neo-blue"> \`++:.                           \`-/+/</span>
<span class="neo-blue"> .\`                                 \`/</span>`;

function getNeofetchOutput(state: TerminalState): string {
  const lines = [
    `<span class="neo-user">${state.user}@${state.hostname}</span>`,
    `<span class="neo-separator">-----------------------</span>`,
    `<span class="neo-key">OS:</span>           Arch Linux x86_64`,
    `<span class="neo-key">Host:</span>         ThinkPad X1 Carbon Gen 11`,
    `<span class="neo-key">Kernel:</span>       6.9.3-arch1-1`,
    `<span class="neo-key">Uptime:</span>       3 hours, 42 mins`,
    `<span class="neo-key">Packages:</span>     1247 (pacman)`,
    `<span class="neo-key">Shell:</span>        bash 5.2.26`,
    `<span class="neo-key">Resolution:</span>   2560x1600`,
    `<span class="neo-key">WM:</span>           Hyprland`,
    `<span class="neo-key">Terminal:</span>     kitty`,
    `<span class="neo-key">CPU:</span>          Intel Core i7-1365U (12) @ 5.200GHz`,
    `<span class="neo-key">GPU:</span>          Intel Iris Xe Graphics`,
    `<span class="neo-key">Memory:</span>       3.41GiB / 15.41GiB`,
    ``,
    `<span class="color-block" style="color:#45475a">███</span><span class="color-block" style="color:#f38ba8">███</span><span class="color-block" style="color:#a6e3a1">███</span><span class="color-block" style="color:#f9e2af">███</span><span class="color-block" style="color:#89b4fa">███</span><span class="color-block" style="color:#f5c2e7">███</span><span class="color-block" style="color:#94e2d5">███</span><span class="color-block" style="color:#bac2de">███</span>`,
  ];

  const asciiLines = NEOFETCH_ASCII.split('\n');
  const maxLines = Math.max(asciiLines.length, lines.length);
  let result = '';

  for (let i = 0; i < maxLines; i++) {
    const ascii = asciiLines[i] ?? '                                   ';
    const info = lines[i] ?? '';
    result += `<span class="neo-line">${ascii}   ${info}</span>\n`;
  }

  return result.trimEnd();
}

function buildInitialFS(): FileSystemNode {
  return {
    type: "dir",
    children: {
      home: {
        type: "dir",
        children: {
          user: {
            type: "dir",
            children: {
              ".bashrc": {
                type: "file",
                content: `# ~/.bashrc\nexport PS1='[\\u@\\h \\W]\\$ '\nexport EDITOR=nvim\nexport PATH=$PATH:~/.local/bin\nalias ls='ls --color=auto'\nalias ll='ls -la'\nalias grep='grep --color=auto'`,
                size: 145,
                modified: "Jun 14 09:22",
              },
              ".bash_history": {
                type: "file",
                content: `sudo pacman -Syu\nneofetch\ncd Projects\nls -la\nnvim config.ts`,
                size: 52,
                modified: "Jun 14 11:03",
              },
              ".config": {
                type: "dir",
                children: {
                  hypr: { type: "dir", children: {
                    "hyprland.conf": { type: "file", content: "# Hyprland config", size: 4096, modified: "Jun 10 14:30" }
                  }},
                  kitty: { type: "dir", children: {
                    "kitty.conf": { type: "file", content: "# Kitty terminal config\nfont_family JetBrains Mono\nfont_size 13.0", size: 512, modified: "Jun 12 08:15" }
                  }},
                },
              },
              Projects: {
                type: "dir",
                children: {
                  "README.md": {
                    type: "file",
                    content: `# Projects\nPersonal development workspace.`,
                    size: 42,
                    modified: "Jun 13 16:44",
                  },
                },
              },
              Documents: { type: "dir", children: {} },
              Downloads: { type: "dir", children: {} },
              Pictures: { type: "dir", children: {} },
            },
          },
        },
      },
      etc: {
        type: "dir",
        children: {
          "os-release": {
            type: "file",
            content: `NAME="Arch Linux"\nPRETTY_NAME="Arch Linux"\nID=arch\nBUILD_ID=rolling\nANSI_COLOR="38;2;23;147;209"\nHOME_URL="https://archlinux.org/"\nSUPPORT_URL="https://bbs.archlinux.org/"\nBUG_REPORT_URL="https://bugs.archlinux.org/"`,
            size: 234,
            modified: "Jun 01 00:00",
          },
          "hostname": { type: "file", content: "archbox", size: 8, modified: "Jun 01 00:00" },
          "pacman.conf": { type: "file", content: "# Pacman configuration", size: 1024, modified: "Jun 01 00:00" },
        },
      },
      usr: {
        type: "dir",
        children: {
          bin: { type: "dir", children: {} },
          lib: { type: "dir", children: {} },
          share: { type: "dir", children: {} },
        },
      },
      var: {
        type: "dir",
        children: {
          log: { type: "dir", children: {
            "pacman.log": { type: "file", content: "[2024-06-14 09:15] [PACMAN] Running 'pacman -Syu'\n[2024-06-14 09:15] [ALPM] transaction started\n[2024-06-14 09:16] [ALPM] upgraded linux (6.9.2-1 -> 6.9.3-1)", size: 2048, modified: "Jun 14 09:16" }
          }},
        },
      },
      tmp: { type: "dir", children: {} },
      proc: { type: "dir", children: {} },
    },
  };
}

export function createTerminalState(): TerminalState {
  return {
    user: "user",
    hostname: "archbox",
    currentPath: ["home", "user"],
    history: [],
    historyIndex: -1,
    fileSystem: buildInitialFS(),
    sudoAuthenticated: false,
    env: {
      HOME: "/home/user",
      SHELL: "/bin/bash",
      EDITOR: "nvim",
      TERM: "xterm-256color",
      LANG: "en_US.UTF-8",
    },
    installedPackages: [
      "base", "linux", "linux-firmware", "networkmanager", "bash",
      "neofetch", "git", "nvim", "hyprland", "kitty", "firefox",
      "nodejs", "npm", "python", "rust", "go", "htop", "curl", "wget",
      "unzip", "tar", "which", "sudo", "man-db", "pacman"
    ],
  };
}

function getNodeAtPath(fs: FileSystemNode, path: string[]): FileSystemNode | null {
  let node = fs;
  for (const segment of path) {
    if (!node.children || !node.children[segment]) return null;
    node = node.children[segment];
  }
  return node;
}

function formatPath(path: string[]): string {
  if (path.length === 0) return "/";
  return "/" + path.join("/");
}

function resolvePath(state: TerminalState, target: string): string[] | null {
  if (!target || target === ".") return [...state.currentPath];
  if (target === "~") return ["home", "user"];

  let parts: string[];
  if (target.startsWith("/")) {
    parts = target.split("/").filter(Boolean);
  } else if (target.startsWith("~/")) {
    parts = ["home", "user", ...target.slice(2).split("/").filter(Boolean)];
  } else {
    parts = [...state.currentPath, ...target.split("/").filter(Boolean)];
  }

  // Resolve . and ..
  const resolved: string[] = [];
  for (const part of parts) {
    if (part === "..") {
      resolved.pop();
    } else if (part !== ".") {
      resolved.push(part);
    }
  }
  return resolved;
}

function lsFormat(children: Record<string, FileSystemNode>, longFormat: boolean, showHidden: boolean): string {
  const entries = Object.entries(children).filter(([name]) => showHidden || !name.startsWith("."));
  
  if (!longFormat) {
    return entries.map(([name, node]) => {
      if (node.type === "dir") return `<span class="ls-dir">${name}/</span>`;
      if (name.endsWith(".sh") || name.endsWith(".bash")) return `<span class="ls-exec">${name}</span>`;
      return `<span class="ls-file">${name}</span>`;
    }).join("  ");
  }

  const lines = ["total " + entries.length * 8];
  for (const [name, node] of entries) {
    const perms = node.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
    const size = node.size ?? (node.type === "dir" ? 4096 : 0);
    const modified = node.modified ?? "Jun 14 10:00";
    const owner = node.owner ?? "user user";
    const display = node.type === "dir" 
      ? `<span class="ls-dir">${name}/</span>` 
      : `<span class="ls-file">${name}</span>`;
    lines.push(`${perms}  1 ${owner}  ${String(size).padStart(6)}  ${modified}  ${display}`);
  }
  return lines.join("\n");
}

export function executeCommand(input: string, state: TerminalState): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  // Handle sudo
  if (trimmed.startsWith("sudo ")) {
    if (!state.sudoAuthenticated) {
      return { output: "", requiresPassword: true };
    }
    const subCmd = trimmed.slice(5);
    return executeSudoCommand(subCmd, state);
  }

  const [cmd, ...args] = trimmed.split(/\s+/);

  switch (cmd) {
    case "help":
      return cmdHelp();
    case "clear":
      return { output: "__CLEAR__" };
    case "pwd":
      return { output: formatPath(state.currentPath) };
    case "whoami":
      return { output: state.user };
    case "echo":
      return { output: args.join(" ").replace(/\$(\w+)/g, (_, v) => state.env[v] ?? "") };
    case "ls":
      return cmdLs(args, state);
    case "cd":
      return cmdCd(args, state);
    case "cat":
      return cmdCat(args, state);
    case "touch":
      return cmdTouch(args, state);
    case "mkdir":
      return cmdMkdir(args, state);
    case "rm":
      return cmdRm(args, state);
    case "uname":
      return cmdUname(args);
    case "neofetch":
      return { output: getNeofetchOutput(state), isHtml: true, delay: 150 };
    case "pacman":
      return cmdPacman(args, state);
    case "which":
      return cmdWhich(args, state);
    case "history":
      return { output: state.history.slice(-20).map((h, i) => `  ${String(i + 1).padStart(3)}  ${h}`).join("\n") };
    case "env":
      return { output: Object.entries(state.env).map(([k, v]) => `${k}=${v}`).join("\n") };
    case "date":
      return { output: new Date().toString() };
    case "uptime":
      return { output: " 10:42:03 up 3:41, 1 user, load average: 0.52, 0.38, 0.29" };
    case "df":
      return { output: `Filesystem      Size  Used Avail Use% Mounted on\ndev             7.7G     0  7.7G   0% /dev\ntmpfs           7.7G  1.6M  7.7G   1% /run\n/dev/nvme0n1p2  477G   42G  411G   9% /\ntmpfs           7.7G  102M  7.6G   2% /dev/shm` };
    case "free":
      return { output: `               total        used        free      shared  buff/cache   available\nMem:        16156844     3562412     8934200      318440     3660232    11999936\nSwap:        8388604           0     8388604` };
    case "ps":
      return { output: `  PID TTY          TIME CMD\n 1234 pts/0    00:00:00 bash\n 5678 pts/0    00:00:00 ps` };
    case "man":
      return { output: args[0] ? `No manual entry for ${args[0]} (this is a simulation)` : "What manual page do you want?", isError: !args[0] };
    case "exit":
      return { output: "logout" };
    case "sudo":
      return { output: "usage: sudo command [args...]" };
    default:
      return { output: `bash: ${cmd}: command not found`, isError: true };
  }
}

function executeSudoCommand(cmd: string, state: TerminalState): CommandResult {
  const [subcmd, ...args] = cmd.split(/\s+/);
  if (subcmd === "pacman") return cmdPacman(args, state, true);
  if (subcmd === "systemctl") {
    const action = args[0];
    const service = args[1];
    if (!action || !service) return { output: "Usage: sudo systemctl [start|stop|enable|disable] <service>" };
    return { output: `● ${service}\n   Loaded: loaded\n   Active: ${action === "start" ? "active (running)" : "inactive (dead)"}\n[sudo] ${action}ed ${service}.service`, delay: 400 };
  }
  if (subcmd === "rm" && args.includes("-rf")) {
    const target = args.find(a => !a.startsWith("-"));
    if (target === "/" || target === "*") return { output: "Nice try. This is a simulation.", isError: true };
    return cmdRm(["-rf", target ?? ""], state);
  }
  return executeCommand(cmd, state);
}

function cmdHelp(): CommandResult {
  return {
    output: `<span class="help-title">Arch Linux Terminal Emulator — Available Commands</span>

<span class="help-category">Navigation</span>
  ls [-la]          List directory contents
  cd [dir]          Change directory
  pwd               Print working directory

<span class="help-category">File Operations</span>
  cat [file]        Display file contents
  touch [file]      Create empty file
  mkdir [dir]       Create directory
  rm [-rf] [path]   Remove file or directory

<span class="help-category">System</span>
  neofetch          Display system information
  uname [-a]        Print system information
  whoami            Print current user
  uptime            Show system uptime
  df                Disk space usage
  free              Memory usage
  ps                Process status
  history           Command history
  env               Environment variables
  date              Current date and time

<span class="help-category">Package Management</span>
  pacman -Syu       System upgrade
  pacman -S [pkg]   Install package
  pacman -R [pkg]   Remove package
  pacman -Q         List installed packages
  pacman -Ss [pkg]  Search packages

<span class="help-category">Other</span>
  echo [text]       Print text
  which [cmd]       Locate command
  sudo [cmd]        Execute as superuser
  clear             Clear terminal
  help              Show this help`,
    isHtml: true,
  };
}

function cmdLs(args: string[], state: TerminalState): CommandResult {
  const longFormat = args.includes("-l") || args.includes("-la") || args.includes("-al") || args.includes("-a");
  const showHidden = args.includes("-a") || args.includes("-la") || args.includes("-al");
  const target = args.find(a => !a.startsWith("-")) ?? ".";
  const path = resolvePath(state, target);
  if (!path) return { output: `ls: cannot access '${target}': No such file or directory`, isError: true };

  const node = getNodeAtPath(state.fileSystem, path);
  if (!node) return { output: `ls: cannot access '${target}': No such file or directory`, isError: true };
  if (node.type === "file") return { output: target };
  if (!node.children) return { output: "" };

  return { output: lsFormat(node.children, longFormat || showHidden, showHidden), isHtml: true };
}

function cmdCd(args: string[], state: TerminalState): CommandResult {
  const target = args[0] ?? "~";
  const path = resolvePath(state, target);
  if (!path) return { output: `cd: ${target}: No such file or directory`, isError: true };

  const node = getNodeAtPath(state.fileSystem, path);
  if (!node) return { output: `cd: ${target}: No such file or directory`, isError: true };
  if (node.type !== "dir") return { output: `cd: ${target}: Not a directory`, isError: true };

  state.currentPath = path;
  return { output: "" };
}

function cmdCat(args: string[], state: TerminalState): CommandResult {
  if (!args[0]) return { output: "cat: missing operand", isError: true };
  const path = resolvePath(state, args[0]);
  if (!path) return { output: `cat: ${args[0]}: No such file or directory`, isError: true };

  const node = getNodeAtPath(state.fileSystem, path);
  if (!node) return { output: `cat: ${args[0]}: No such file or directory`, isError: true };
  if (node.type === "dir") return { output: `cat: ${args[0]}: Is a directory`, isError: true };
  return { output: node.content ?? "" };
}

function cmdTouch(args: string[], state: TerminalState): CommandResult {
  if (!args[0]) return { output: "touch: missing file operand", isError: true };
  const name = args[0];
  const parentPath = [...state.currentPath];
  const parent = getNodeAtPath(state.fileSystem, parentPath);
  if (!parent || !parent.children) return { output: `touch: cannot touch '${name}': Permission denied`, isError: true };

  if (!parent.children[name]) {
    parent.children[name] = {
      type: "file",
      content: "",
      size: 0,
      modified: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
    };
  }
  return { output: "" };
}

function cmdMkdir(args: string[], state: TerminalState): CommandResult {
  if (!args[0]) return { output: "mkdir: missing operand", isError: true };
  const name = args[0];
  const parent = getNodeAtPath(state.fileSystem, state.currentPath);
  if (!parent || !parent.children) return { output: `mkdir: cannot create directory '${name}': Permission denied`, isError: true };
  if (parent.children[name]) return { output: `mkdir: cannot create directory '${name}': File exists`, isError: true };

  parent.children[name] = { type: "dir", children: {} };
  return { output: "" };
}

function cmdRm(args: string[], state: TerminalState): CommandResult {
  const recursive = args.includes("-r") || args.includes("-rf") || args.includes("-f");
  const target = args.find(a => !a.startsWith("-"));
  if (!target) return { output: "rm: missing operand", isError: true };

  const parentPath = [...state.currentPath];
  const parent = getNodeAtPath(state.fileSystem, parentPath);
  if (!parent || !parent.children || !parent.children[target]) {
    return { output: `rm: cannot remove '${target}': No such file or directory`, isError: true };
  }
  if (parent.children[target].type === "dir" && !recursive) {
    return { output: `rm: cannot remove '${target}': Is a directory`, isError: true };
  }

  delete parent.children[target];
  return { output: "" };
}

function cmdUname(args: string[]): CommandResult {
  if (args.includes("-a")) {
    return { output: "Linux archbox 6.9.3-arch1-1 #1 SMP PREEMPT_DYNAMIC Fri, 14 Jun 2024 00:00:00 +0000 x86_64 GNU/Linux" };
  }
  return { output: "Linux" };
}

function cmdWhich(args: string[], state: TerminalState): CommandResult {
  const commands: Record<string, string> = {
    bash: "/bin/bash", ls: "/usr/bin/ls", cat: "/usr/bin/cat",
    cd: "/usr/bin/cd", rm: "/usr/bin/rm", mkdir: "/usr/bin/mkdir",
    touch: "/usr/bin/touch", echo: "/usr/bin/echo", pwd: "/usr/bin/pwd",
    pacman: "/usr/bin/pacman", neofetch: "/usr/bin/neofetch",
    sudo: "/usr/bin/sudo", which: "/usr/bin/which", git: "/usr/bin/git",
    nvim: "/usr/bin/nvim", python: "/usr/bin/python", node: "/usr/bin/node",
  };
  const cmd = args[0];
  if (!cmd) return { output: "which: missing argument", isError: true };
  return commands[cmd]
    ? { output: commands[cmd] }
    : { output: `which: no ${cmd} in (/usr/local/sbin:/usr/local/bin:/usr/bin:/usr/sbin:/sbin:/bin)`, isError: true };
}

function cmdPacman(args: string[], state: TerminalState, isSudo = false): CommandResult {
  const flag = args[0];
  const packages = args.slice(1).filter(a => !a.startsWith("-"));

  if (flag === "-Syu" || flag === "-Syyu") {
    if (!isSudo) return { output: "error: you cannot perform this operation unless you are root.", isError: true };
    return {
      output: `:: Synchronizing package databases...
 core                                    148.8 KiB  1234 KiB/s 00:00
 extra                                  8.85 MiB   8.92 MiB/s 00:01
 multilib                              171.1 KiB   2.34 MiB/s 00:00
:: Starting full system upgrade...
 there is nothing to do`,
      delay: 800,
    };
  }

  if (flag === "-S") {
    if (!isSudo) return { output: "error: you cannot perform this operation unless you are root.", isError: true };
    if (!packages.length) return { output: "error: no targets specified (use -h for help)", isError: true };
    const pkg = packages[0];
    if (state.installedPackages.includes(pkg)) return { output: `warning: ${pkg} is up to date -- reinstalling\n[installing] ${pkg}... done`, delay: 600 };
    return {
      output: `resolving dependencies...
looking for conflicting packages...

Packages (1) ${pkg}-1.0.0

Total Installed Size:  2.34 MiB

:: Proceed with installation? [Y/n] Y
(1/1) installing ${pkg}                        [#####################] 100%`,
      delay: 900,
    };
  }

  if (flag === "-R" || flag === "-Rs") {
    if (!isSudo) return { output: "error: you cannot perform this operation unless you are root.", isError: true };
    if (!packages.length) return { output: "error: no targets specified", isError: true };
    const pkg = packages[0];
    if (!state.installedPackages.includes(pkg)) return { output: `error: target not found: ${pkg}`, isError: true };
    return { output: `checking dependencies...\n(1/1) removing ${pkg}                         [#####################] 100%`, delay: 500 };
  }

  if (flag === "-Q" || flag === "-Qi") {
    if (packages.length) {
      const pkg = packages[0];
      if (!state.installedPackages.includes(pkg)) return { output: `error: package '${pkg}' was not found`, isError: true };
      return { output: `Name            : ${pkg}\nVersion         : 1.0.0-1\nDescription     : Package ${pkg}\nArchitecture    : x86_64\nURL             : https://archlinux.org\nLicenses        : GPL\nInstall Date    : Sat 14 Jun 2024 09:00:00 AM UTC\nInstall Reason  : Explicitly installed` };
    }
    return { output: state.installedPackages.map(p => `${p} 1.0.0-1`).join("\n") };
  }

  if (flag === "-Ss") {
    const query = packages[0] ?? "";
    const results = state.installedPackages.filter(p => p.includes(query));
    if (!results.length) return { output: "" };
    return { output: results.map(p => `extra/${p} 1.0.0-1\n    Package ${p} for Arch Linux`).join("\n") };
  }

  return { output: "usage: pacman <operation> [...]\noperations:\n  pacman -S  [package]    install\n  pacman -R  [package]    remove\n  pacman -Syu             upgrade system\n  pacman -Q              list installed\n  pacman -Ss [query]     search" };
}
