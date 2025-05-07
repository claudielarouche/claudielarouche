---
title: claudielarouche.com Style Guide
description: Sytle Guide for claudielarouche.com
image: https://claudielarouche.com/assets/img/art-supplies.jpg
image-hero: https://claudielarouche.com/assets/img/art-supplies.jpg
tags: [work]
permalink: /style-guide/
layout: dev
---

Photo by <a href="https://unsplash.com/@jennie_ra?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jennie Razumnaya</a> on <a href="https://unsplash.com/photos/a-group-of-brushes-XbcfTH69aAc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

This page demonstrates **Minima theme capabilities** and custom enhancements with simple CSS.

---

## Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading

```
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
```

---

## Paragraph and Text Formatting

Normal paragraph text with **bold**, *italic*, ~~strikethrough~~, and `inline code`.

```
Normal paragraph text with **bold**, *italic*, ~~strikethrough~~, and `inline code`.
```

> Example blockquote for callout.

```
> Example blockquote for callout.
```

## Escaping characters

\*Not italic\*

```
\*Not italic\*
```

---

## Lists

### Unordered

- Item One
- Item Two
  - Nested Item
- Item Three

```
- Item One
- Item Two
  - Nested Item
- Item Three
```

### Ordered

1. Step One
2. Step Two
3. Step Three

```
1. Step One
2. Step Two
3. Step Three
```

### Task list

- [x] Task done
- [ ] Task not done

```
- [x] Task done
- [ ] Task not done
```

---

## Links and Buttons

[Standard Link](https://claudielarouche.com)

```
[Standard Link](https://claudielarouche.com)
```

[Standard Link Opening in new window](https://claudielarouche.com){:target="_blank" rel="noopener noreferrer"}

```
[Standard Link Opening in new window](https://claudielarouche.com){:target="_blank" rel="noopener noreferrer"}
```

---

## Images

![Example Image](https://placehold.co/600x300?text=Sample+Image)
```
![Example Image](https://placehold.co/600x300?text=Sample+Image)
```

---

## Tables

| Product | Price | Available |
|---------|-------|-----------|
| Widget A | $10 | Yes |
| Widget B | $20 | No |
| Widget C | $15 | Yes |


```
| Product | Price | Available |
|---------|-------|-----------|
| Widget A | $10 | Yes |
| Widget B | $20 | No |
| Widget C | $15 | Yes |
```

---

## Other Code Blocks

```javascript
function hello(name) {
  console.log("Hello, " + name);
}
```


&#96;&#96;&#96;javascript  
function hello(name) {  
  console.log("Hello, " + name);  
}  
&#96;&#96;&#96;

## Horizontal Rule (Separator)

---
<br>

```
---
```

## Footnote

Here is a sentence.[^1]

[^1]: This is the footnote.

```
Here is a sentence.[^1]

[^1]: This is the footnote.
```

## Front matter (Jekyll)

```
---
layout: page
title: My Page
permalink: /mypage/
---
```

## Add Markdown in the middle of HTML

<div>
{{ "**Bold text**" | markdownify }}
</div>

```
<div>
{% raw %}
{{ "**Bold text**" | markdownify }}
{% endraw %}
</div>
```

## Open-Collapse section

<details>
<summary>Click to expand</summary>

Here is the hidden content that will show when expanded.

</details>

```
<details>
<summary>Click to expand</summary>

Here is the hidden content that will show when expanded.

</details>
```

## Alerts

{% capture note_content %}
Highlights information that users should take into account.
{% endcapture %}
{% include admonition.html type="Note" icon="ℹ️" content=note_content %}

{% capture tip_content %}
Optional information to help a user be more successful.
{% endcapture %}
{% include admonition.html type="Tip" icon="💡" content=tip_content %}

{% capture important_content %}
Crucial information necessary for users to succeed.
{% endcapture %}
{% include admonition.html type="Important" icon="❗" content=important_content %}

{% capture warning_content %}
Critical content demanding immediate user attention.
{% endcapture %}
{% include admonition.html type="Warning" icon="⚠️" content=warning_content %}

{% capture caution_content %}
Negative potential consequences of an action.
{% endcapture %}
{% include admonition.html type="Caution" icon="🚫" content=caution_content %}


```
{% raw %}
## Alerts

{% capture note_content %}
Highlights information that users should take into account.
{% endcapture %}
{% include admonition.html type="Note" icon="ℹ️" content=note_content %}

{% capture tip_content %}
Optional information to help a user be more successful.
{% endcapture %}
{% include admonition.html type="Tip" icon="💡" content=tip_content %}

{% capture important_content %}
Crucial information necessary for users to succeed.
{% endcapture %}
{% include admonition.html type="Important" icon="❗" content=important_content %}

{% capture warning_content %}
Critical content demanding immediate user attention.
{% endcapture %}
{% include admonition.html type="Warning" icon="⚠️" content=warning_content %}

{% capture caution_content %}
Negative potential consequences of an action.
{% endcapture %}
{% include admonition.html type="Caution" icon="🚫" content=caution_content %}

{% endraw %}
```