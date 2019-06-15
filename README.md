# Elec Renamer
> Origin Project: https://github.com/larsalbrecht/jsrenamer

## Description
Elec Renamer is a simple tool to rename files.

## Usage
// TODO

## Features

Example Input Files:
```text
/directory/to/example.file - 001.txt
/directory/to/example.file - 02.txt
/directory/to/example.file - 004.txt
/directory/to/example.file - 41.txt
/directory/to/example.file.jpg
```

### Replace with Tags (TagReplacer)
Tags can be used inside the upper input. The Tags can be combined.

#### Counter [c|, \<start\>|, \<step\>|, \<intWidth\>] (CounterTagReplacer)
The Counter-Tag is for generating a number. So you can enumerate a list of files.

Input: `[c]`
Output:
```text
0
1
2
3
4
```

Input: `[c, 10]`
Output:
```text
10
11
12
13
14
```

Input: `[c, 10, 5]`
Output:
```text
10
15
20
25
30
```

Input: `[c, 10, 5, 4]`
Output:
```text
0010
0015
0020
0025
0030
```

#### Date [d|, \<format\>] (DateTagReplacer)
The Date-Tag is for generating a date. So you can add a date to a list of files. The allowed signs for the format can be found here:
https://date-fns.org/v1.30.1/docs/format

Input: `[d]`
Output:
```text
2019-06-15
2019-06-15
2019-06-15
2019-06-15
2019-06-15
```

Input: `[d, D.MM.YYYY]`
Output:
```text
15.06.2019
15.06.2019
15.06.2019
15.06.2019
15.06.2019
```

#### [e|, <without-dot>] (FileExtensionTagReplacer)
The FileExtension-Tag is for getting the current file extension.

Input: `[e]`
Output:
```text
.txt
.txt
.txt
.txt
.jpg
```

Input: `[e, false]`
Output:
```text
txt
txt
txt
txt
jpg
```

#### [f|, <upper-directory>|, <start>|, <length>] (FolderTagReplacer)
The Folder-Tag is to get a part of the directory to a file.

Input: `[f]`
Output:
```text
to
to
to
to
to
```

Input: `[f, 1]`
Output:
```text
directory
directory
directory
directory
directory
```

Input: `[f, 1, 1]`
Output:
```text
irectory
irectory
irectory
irectory
irectory
```

Input: `[f, 1, 1, 1]`
Output:
```text
i
i
i
i
i
```

#### [n|, <start>|, <length>] (NameTagReplacer)
The Filename-Tag is to get a part of the name of a file.

Input: `[n]`
```text
example.file - 001.txt
example.file - 02.txt
example.file - 004.txt
example.file - 41.txt
example.file.jpg
```

Input: `[n, 8]`
```text
file - 001.txt
file - 02.txt
file - 004.txt
file - 41.txt
file.jpg
```

Input: `[n, 8, 2]`
```text
fi
fi
fi
fi
fi
```

#### [ts, u|l|wu|wl]<content>[/ts] (TextSizeTagReplacer)
The Text-Size-Tag is a special Tag. You can ignore the end-tag if you want to change the case of all signs.

* `u` = uppercase
* `l` = lowercase
* `wu` = word uppercase
* `wl` = word lowercase

Input: `[ts, u]abcdef[/ts]`
```text
ABCDEF
ABCDEF
ABCDEF
ABCDEF
ABCDEF
```

Input: `[ts, l]ABCDEF[/ts]`
```text
abcdef
abcdef
abcdef
abcdef
abcdef
```

Input: `[ts, wu]this is an example[/ts]`
```text
This Is An Example
This Is An Example
This Is An Example
This Is An Example
This Is An Example
```

Input: `[ts, wl]THIS IS AN EXAMPLE[/ts]`
```text
tHIS iS aN eXAMPLE
tHIS iS aN eXAMPLE
tHIS iS aN eXAMPLE
tHIS iS aN eXAMPLE
tHIS iS aN eXAMPLE
```

#### [t, <content>] (TextTagReplacer)
The Text-Tag is a simple Tag to add text.

Input: `[t, "EXAMPLE!!"]`
```text
EXAMPLE!!
EXAMPLE!!
EXAMPLE!!
EXAMPLE!!
EXAMPLE!!
```

### Replace with values from List using Text-Tag and $list$ (ListReplacer)
You can add a list with texts to add the text to the filename. Each line is one file. To use this, you can use the Text-Tag:

Inputlist:`
```text
1st Entry
2nd Entry
3rd Entry
4th Entry
```

Input: `[t, $list$]`
```text
1st Entry
2nd Entry
3rd Entry
4th Entry
example.file.jpg
```

### Replace with Text (InputReplacer)
With the Input-Replacer you can replace specific text. You can add multiple replacers to replace also multiple different texts.

* Before: The text inside must before the search word.
* Not (Before): With this option, the text from "Before" must not be present.
* Search: This is the search word to search for.
* After: The text inside must after the search word.
* Not (After): With this option, the text from "After" must not be present.
* Replace With: This is the value that will be replaced with the found in "Search".
* Replace all: By default, only the first find is replaced. With this option all finds will be replaced.

Input: `This is an example sentence to demonstrate the input replacer.`

#### Search / Replace With
* Search: `an example`
* Replace With: `a`

Output: `This is a sentence to demonstrate the input replacer.`

#### Search / Replace With / Replace All
* Search: ` `
* Replace With: `-`
* Replace All: `checked`

Output: `This-is-an-example-sentence-to-demonstrate-the-input-replacer.`

#### Before / Search / Replace With / Replace All
* Before: `e`
* Search: ` `
* Replace With: `-`
* Replace All: `checked`

Output: `This is an example-sentence-to demonstrate-the-input replacer.`

#### Before / Not (Before) / Search / Replace With / Replace All
* Before: `e`
* Not (Before): `checked`
* Search: ` `
* Replace With: `-`
* Replace All: `checked`

Output: `This-is-an-example sentence to-demonstrate the input-replacer.`

#### Search / After / Replace With / Replace All
* Search: ` `
* After: `t`
* Replace With: `-`
* Replace All: `checked`

Output: `This is an example sentence-to demonstrate-the input replacer.`

#### Search / After / Not (After) / Replace With / Replace All
* Search: ` `
* After: `t`
* Not (After): `checked`
* Replace With: `-`
* Replace All: `checked`

Output: `This-is-an-example-sentence to-demonstrate the-input-replacer.`
