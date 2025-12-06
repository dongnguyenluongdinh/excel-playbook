function initTree() {
  const lines = [
    "       ‧   ⋆      ‧ ‧       ⭐     ❅         ⋆         ",
    "    ‧   ❅   ‧    ⋆  ‧     >o<<    ‧       ‧ ‧      ‧     ",
    "   ‧    ‧      ‧ ‧     ‧   >O>>*<     ‧ ‧          ⋆      ",
    "   ‧             ‧      >>>>o << ‧          ‧   ‧   ‧    ",
    "     ‧      ‧   ‧   ❅  >> *>>O <<        ⋆    ⋆    ⋆   ",
    "       ‧    ⋆    ‧    >> *>o <<* <    ‧         ‧  ‧     ",
    "        ‧    ‧       >>> @ <<<*>>*<     ❅       ‧      ",
    "     ‧     ‧    ⋆   > * <@>> @>>> o<        ‧    ⋆      ",
    "  ‧   ‧        ‧    > o>> *>>> O>> O<<      ‧   ‧     ‧  ",
    "   ‧   ‧ ❅    ‧   >> o> o>>> O <* <<<<   ‧            ‧",
    "  ‧         ‧    >> O>> o>> * <<@ <<<*<     ‧   ‧       ",
    "   ‧     ⋆     >> *>> O>>> o<<< *>>> o<  ‧       ⋆    ",
    "    ‧      ‧   >> @>> *<<< O>>> *<<< o><<         ‧  ‧  ",
    "      ‧      >> o<<< *>> O<<< @>>o << O>>    ‧         ",
    "   ⋆  ‧  ‧   >> *<<< o>>> O<<< *>>> o<<< @>   ‧      ‧  ",
    "       ‧  ‧ >> O>>> *<<< o>>> *<<< O>>> o>>>           ",
    " ❅  ‧   ‧  >> *<<< O>>> o<<< *>>> O<<< *>>>o<   ‧  ‧    ",
    "   ⋆   ‧  >> o>>> *<<< O>>> o<<< *>>> O<<< *>>   ❅     ",
    "  ‧     ‧ >> *<<< O>>> o<<@< *>>> o<<< @>>> *<<<     ‧ ‧ ",
    "    ❅  >> O>>> *<<< o>>> O<<< *>>> o<<< *>>> O<   ⋆   ",
    " ‧     >> *<<< O>>> o<<< *> o<<< *>> O<<< *>>> o<      ",
    "                        |     |                       ",
    "                     /\\_/\\    |                     ",
    "                \\ 三( •.• )三  /                     ",
    "                 \\ __|___|_⟆_/|                      ",
    "         __  _    |          ||____ __   _            ",
    "          __    _ |          |  __  __                ",
    "                  |__________|"
  ];

  const palette = {
    ">": "bright",
    "<": "bright",
    "o": "red",
    "O": "blue",
    "*": "yellow",
    "@": "magenta",
    "❅": "blue",
    "⋆": "white",
    "‧": "white",
    "|": "white",
    "三": "white",
    "•": "white",
    "/": "white",
    "\\": "white",
    ".": "white",
    "(": "white",
    ")": "white",
    "⟆": "white",
    "_": "white"
  };

  function colorize(line) {
    return line.split("").map(ch => {
      const cls = palette[ch];
      if (!cls) return ch;
      return `<span class="${cls}">${ch}</span>`;
    }).join("");
  }

  const el = document.getElementById("tree");
  if (!el) return; 

  el.innerHTML = lines.map(colorize).join("\n");

  const sparkleChars = new Set(["o","O","*","@","⋆","❅","‧"]);
  function sparkle() {
    const ranges = el.querySelectorAll("span");
    for (let i = 0; i < 20; i++) {
      const idx = Math.floor(Math.random() * ranges.length);
      const s = ranges[idx];
      if (!s || !sparkleChars.has(s.textContent)) continue;
      s.classList.add("sparkle");
      setTimeout(() => s.classList.remove("sparkle"), 180);
    }
  }
  setInterval(sparkle, 220);
}

document.addEventListener("DOMContentLoaded", initTree);
