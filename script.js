const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const bottomCurrentTime = document.getElementById("bottomCurrentTime");
const bottomDuration = document.getElementById("bottomDuration");
const bottomProgressFill = document.getElementById("bottomProgressFill");
const volumeSlider = document.getElementById("volumeSlider");
const bottomVolumeSlider = document.getElementById("bottomVolumeSlider");
const lyricsList = document.getElementById("lyricsList");
const lyricsDot = document.getElementById("lyricsDot");
const playerShell = document.getElementById("playerShell");
const playToggles = document.querySelectorAll('[data-action="toggle"]');
const prevButtons = document.querySelectorAll('[data-action="prev"]');
const nextButtons = document.querySelectorAll('[data-action="next"]');
const shuffleButtons = document.querySelectorAll('[data-action="shuffle"]');
const repeatButtons = document.querySelectorAll('[data-action="repeat"]');
const bottomProgressBg = document.querySelector(".bottom-progress-bg");

// Songs Data
const songs = [
  {
    id: 0,
    title: "I Don't Love You",
    artist: "My Chemical Romance",
    cover: "I Dont Love You/coverlagu.jpg",
    audio: "I Dont Love You/I Don't Love You_spotdown.org.mp3",
    lrc: "I Dont Love You/I Don't Love You_spotdown.org.mp3.lrc",
    lrcEmbedded: `[id: ngidjour]
[ar: My Chemical Romance]
[al: The Black Parade / Living with Ghosts (The 10th Anniversary Edition)]
[ti: I Don't Love You]
[au: Frank Anthony Iero, Gerard Arthur Way, Michael James Way, Raymond Toro & Robert Cory Bryar]
[length: 03:58]

[00:26.23]Well, <00:26.60>when <00:27.35>you <00:28.05>go
[00:31.37]Don't <00:31.86>ever <00:32.16>think <00:32.94>I'll <00:33.22>make <00:33.56>you <00:33.91>try <00:34.95>to <00:35.51>stay
[00:37.77]And <00:38.21>maybe <00:38.75>when <00:39.21>you <00:39.52>get <00:39.83>back
[00:40.67]I'll <00:41.38>be <00:42.14>off <00:42.67>to <00:42.98>find <00:43.34>another <00:44.74>way
[00:45.77]
[00:48.42]And <00:48.78>after <00:49.57>all <00:50.12>this <00:50.87>time <00:51.46>that <00:51.84>you <00:52.52>still <00:53.13>owe
[00:54.06]You're <00:54.47>still <00:54.79>a <00:55.12>good-<00:55.85>for-<00:56.47>no<00:57.10>thing, <00:57.64>I <00:58.32>don't <00:59.01>know
[01:00.36]So <01:00.71>take <01:01.05>your <01:01.33>gloves <01:01.85>and <01:02.08>get <01:02.30>out
[01:03.80]Better <01:04.33>get <01:04.53>out <01:06.43>while <01:07.05>you <01:07.41>can
[01:08.71]
[01:13.37]When <01:15.47>you <01:15.94>go
[01:17.38]And <01:17.73>would <01:18.09>you <01:18.82>e<01:19.44>ven <01:20.04>turn <01:20.77>to <01:21.44>say
[01:23.76]"I <01:24.13>don't <01:24.50>love <01:24.88>you <01:26.44>like <01:26.76>I <01:27.16>did <01:28.86>yes<01:29.32>ter<01:29.88>day"?
[01:31.68]
[01:33.92]Sometimes, <01:35.05>I <01:35.66>cry <01:36.42>so <01:37.09>hard <01:38.09>from <01:38.48>pleading
[01:39.92]So <01:40.32>sick <01:40.63>and <01:41.02>tired <01:41.38>of <01:41.77>all <01:42.39>the <01:42.78>needless <01:44.09>beating
[01:45.60]But <01:45.96>baby, <01:46.48>when <01:47.05>they <01:47.21>knock <01:47.63>you <01:48.48>down <01:49.16>and <01:49.85>out
[01:50.61]Is <01:50.94>where <01:51.26>you <01:51.64>oughta <01:52.42>stay
[01:53.48]
[01:56.13]And <01:56.60>after <01:57.18>all <01:57.88>the <01:58.58>blood <01:59.22>that <01:59.63>you <02:00.20>still <02:00.92>owe
[02:01.86]Another <02:02.85>dollar's <02:04.22>just <02:04.84>another <02:06.64>blow
[02:08.07]So <02:08.39>fix <02:08.74>your <02:09.00>eyes <02:09.56>and <02:09.86>get <02:10.07>up
[02:11.63]Better <02:12.10>get <02:12.30>up <02:13.95>while <02:14.76>you <02:15.33>can
[02:16.61]Whoa, <02:18.09>whoa, <02:19.15>whoa
[02:20.93]
[02:21.24]When <02:23.27>you <02:23.62>go
[02:25.16]And <02:25.50>would <02:25.82>you <02:26.60>e<02:27.28>ven <02:27.80>turn <02:28.57>to <02:29.30>say
[02:31.49]"I <02:31.92>don't <02:32.25>love <02:32.59>you <02:34.32>like <02:34.71>I <02:35.04>did <02:36.75>yes<02:37.19>ter<02:37.80>day"?
[02:40.62]Well, <02:40.88>come <02:41.23>on, <02:41.90>come <02:42.36>on
[02:44.04]
[03:06.32]When <03:08.48>you <03:08.86>go
[03:10.59]Would <03:11.03>you <03:11.68>have <03:12.47>the <03:13.01>guts <03:13.73>to <03:14.39>say
[03:16.71]"I <03:17.11>don't <03:17.39>love <03:17.75>you <03:19.40>like <03:19.75>I <03:20.24>loved <03:20.67>you <03:21.87>yes<03:22.33>ter<03:23.33>day"?
[03:27.97]I <03:28.37>don't <03:28.69>love <03:29.02>you <03:30.64>like <03:31.15>I <03:31.50>loved <03:31.84>you <03:33.34>yes<03:33.65>ter<03:34.53>day
[03:39.29]I <03:39.70>don't <03:40.33>love <03:41.05>you <03:41.66>like <03:42.41>I <03:42.91>loved <03:43.62>you <03:44.33>yes<03:45.11>ter<03:45.86>day
[03:50.13]`
  },
  {
    id: 1,
    title: "The Reason",
    artist: "Hoobastank",
    cover: "The Reason/Hoobastank_-_The_Reason.jpg",
    audio: "The Reason/The Reason_spotdown.org.mp3",
    lrc: "The Reason/The Reason - Hoobastank.lrc",
    lrcEmbedded: `[id: naaa8wcf]
[ar: Hoobastank]
[al: 忘れられない2000年代洋楽ラブソング]
[ti: The Reason]
[au: Daniel Estrin, Douglas Robb, Markku Lappalainen & Chris Hesse]
[length: 03:52]

[00:14.22]I'm <00:14.62>not <00:15.00>a <00:15.65>perfect <00:17.08>person
[00:20.00]There's <00:20.35>many <00:20.89>things <00:21.30>I <00:21.67>wish <00:22.05>I <00:22.59>didn't <00:22.92>do
[00:25.77]But <00:26.20>I <00:26.50>continue <00:28.64>learning
[00:31.64]I <00:31.94>never <00:32.49>meant <00:32.85>to <00:33.22>do <00:33.64>those <00:33.99>things <00:34.34>to <00:34.67>you
[00:37.37]And <00:37.72>so <00:37.90>I <00:38.30>have <00:38.67>to <00:39.00>say <00:39.36>before <00:40.07>I <00:40.50>go
[00:43.86]That <00:44.21>I <00:44.58>just <00:44.96>want <00:45.28>you <00:45.63>to <00:45.99>know
[00:48.38]
[00:48.95]I've <00:49.28>found <00:49.80>a <00:50.35>reason <00:51.45>for <00:51.82>me
[00:54.77]To <00:55.10>change <00:55.62>who <00:56.16>I <00:56.54>used <00:57.14>to <00:57.60>be
[01:00.54]A <01:00.86>reason <01:01.97>to <01:02.29>start <01:02.86>over <01:03.74>new
[01:07.37]And <01:07.73>the <01:07.88>reason <01:08.83>is <01:09.57>you
[01:11.75]
[01:12.11]I'm <01:12.44>sorry <01:13.48>that <01:14.26>I <01:14.96>hurt <01:15.71>you
[01:17.90]It's <01:18.19>something <01:18.76>I <01:19.13>must <01:19.51>live <01:19.89>with <01:20.23>everyday
[01:23.53]And <01:24.14>all <01:24.52>the <01:25.25>pain <01:25.98>I <01:26.33>put <01:26.72>you <01:27.40>through
[01:29.45]I <01:29.84>wish <01:30.20>that <01:30.42>I <01:30.72>could <01:31.05>take <01:31.39>it <01:31.73>all <01:32.10>away
[01:35.21]And <01:35.56>be <01:35.94>the <01:36.09>one <01:36.49>who <01:36.87>catches <01:37.59>all <01:37.91>your <01:38.53>tears
[01:41.79]That's <01:42.11>why <01:42.47>I <01:42.84>need <01:43.19>you <01:43.56>to <01:43.91>hear
[01:46.50]
[01:46.79]I've <01:47.12>found <01:47.66>a <01:48.22>reason <01:49.31>for <01:49.64>me
[01:52.59]To <01:52.91>change <01:53.47>who <01:53.99>I <01:54.38>used <01:54.89>to <01:55.44>be
[01:58.39]A <01:58.73>reason <01:59.84>to <02:00.16>start <02:00.71>over <02:01.63>new
[02:05.22]And <02:05.58>the <02:05.77>reason <02:06.70>is <02:07.35>you
[02:10.96]And <02:11.34>the <02:11.51>reason <02:12.49>is <02:13.19>you
[02:16.78]And <02:17.15>the <02:17.36>reason <02:18.28>is <02:18.99>you
[02:22.63]And <02:22.93>the <02:23.10>reason <02:24.07>is <02:24.81>you
[02:27.95]
[02:33.06]I'm <02:33.42>not <02:33.76>a <02:34.37>perfect <02:35.94>person
[02:38.90]I <02:39.23>never <02:39.71>meant <02:40.08>to <02:40.42>do <02:40.78>those <02:41.17>things <02:41.55>to <02:41.88>you
[02:44.65]And <02:45.02>so <02:45.21>I <02:45.54>have <02:45.92>to <02:46.29>say <02:46.69>before <02:47.37>I <02:47.75>go
[02:51.16]That <02:51.48>I <02:51.86>just <02:52.24>want <02:52.61>you <02:52.96>to <02:53.33>know
[02:55.18]
[02:56.20]I've <02:56.55>found <02:57.05>a <02:57.62>reason <02:58.70>for <02:59.07>me
[03:02.01]To <03:02.34>change <03:02.89>who <03:03.44>I <03:03.79>used <03:04.31>to <03:04.94>be
[03:07.80]A <03:08.15>reason <03:09.25>to <03:09.57>start <03:10.15>over <03:11.05>new
[03:14.65]And <03:15.00>the <03:15.18>reason <03:16.08>is <03:16.88>you
[03:19.38]I've <03:19.71>found <03:20.24>a <03:20.79>reason <03:21.91>to <03:22.23>show
[03:25.14]A <03:25.45>side <03:26.04>of <03:26.54>me <03:27.32>you <03:27.69>didn't <03:28.42>know
[03:30.94]A <03:31.29>reason <03:32.41>for <03:32.73>all <03:33.24>that <03:33.78>I <03:34.14>do
[03:37.82]And <03:38.11>the <03:38.29>reason <03:39.24>is <03:39.99>you
[03:42.34]...`
  },
  {
    id: 2,
    title: "We Fell Love In October",
    artist: "girl in red",
    cover: "We Fell Love In October/We Fell Love In October.jpg",
    audio: "We Fell Love In October/we fell in love in october_spotdown.org.mp3",
    lrc: "We Fell Love In October/we fell in love in october - girl in red.lrc",
    lrcEmbedded: `[id: 3dopt5t]
[ar: girl in red]
[al: we fell in love in october / forget her - Single]
[ti: We Fell in Love in October]
[au: Marie Ulven Ringheim]
[length: 03:04]

[00:18.23]Smoking <00:19.27>cigarettes <00:20.19>on <00:21.01>the <00:21.53>roof
[00:25.52]You <00:25.80>look <00:26.18>so <00:26.65>pretty, <00:27.13>and <00:27.35>I <00:27.55>love <00:28.48>this <00:28.98>view
[00:30.01]
[00:32.67]We <00:33.09>fell <00:33.81>in <00:34.02>love <00:34.97>in <00:35.19>Oct<00:35.71>o<00:36.13>ber
[00:37.36]That's <00:37.78>why <00:39.60>I <00:39.83>love <00:40.31>fall
[00:41.48]Looking <00:42.38>at <00:43.04>the <00:43.59>stars
[00:44.91]Admiring <00:46.04>from <00:46.76>a<00:47.42>far
[00:48.03]
[00:48.38]My <00:48.62>girl, <00:49.35>my <00:49.57>girl, <00:50.44>my <00:51.14>girl
[00:53.39]You <00:53.93>will <00:54.38>be <00:54.86>my <00:55.09>girl
[00:55.74]My <00:55.99>girl, <00:56.66>my <00:56.91>girl, <00:57.88>my <00:58.51>girl
[01:00.84]You <01:01.27>will <01:01.77>be <01:02.22>my <01:02.46>world
[01:03.19]My <01:03.46>world, <01:04.07>my <01:04.30>world, <01:05.27>my <01:05.92>world
[01:08.23]You <01:08.71>will <01:09.16>be <01:09.63>my <01:09.90>girl
[01:11.08]
[01:17.31]Smoking <01:18.33>cigarettes <01:19.25>on <01:20.25>the <01:20.68>roof
[01:24.66]You <01:24.90>look <01:25.27>so <01:25.74>pretty, <01:26.25>and <01:26.47>I <01:26.67>love <01:27.62>this <01:28.05>view
[01:31.76]Don't <01:32.21>bother <01:32.98>looking <01:33.79>down, <01:34.83>we're <01:35.28>not <01:35.66>going <01:36.80>that <01:37.27>way
[01:39.14]At <01:39.60>least <01:40.36>I <01:40.98>know <01:42.28>I <01:42.70>am <01:43.26>here <01:43.94>to <01:44.51>stay
[01:45.66]
[01:46.57]We <01:46.96>fell <01:47.65>in <01:47.90>love <01:48.83>in <01:49.08>Oct<01:49.62>o<01:50.04>ber
[01:51.19]That's <01:51.60>why <01:53.41>I <01:53.67>love <01:54.14>fall
[01:55.24]Looking <01:56.22>at <01:56.90>the <01:57.50>stars
[01:58.77]Admiring <01:59.91>from <02:00.61>a<02:01.29>far
[02:16.74]
[02:16.98]My <02:17.26>girl, <02:17.92>my <02:18.17>girl, <02:19.04>my <02:19.78>girl
[02:22.06]You <02:22.50>will <02:22.98>be <02:23.45>my <02:23.72>girl
[02:24.44]My <02:24.73>girl, <02:25.33>my <02:25.55>girl, <02:26.51>my <02:27.16>girl
[02:29.35]You <02:29.86>will <02:30.32>be <02:30.81>my <02:31.06>girl
[02:31.77]
[02:31.77]My <02:32.03>girl, <02:32.70>my <02:32.92>girl, <02:33.80>my <02:34.50>girl
[02:36.88]You <02:37.33>will <02:37.78>be <02:38.23>my <02:38.48>girl
[02:39.22]My <02:39.48>girl, <02:40.15>my <02:40.40>girl, <02:41.20>my <02:41.94>girl
[02:44.21]You <02:44.72>will <02:45.17>be <02:45.64>my <02:45.87>world
[02:46.60]My <02:46.87>world, <02:47.50>my <02:47.77>world, <02:48.65>my <02:49.32>world
[02:51.58]You <02:52.13>will <02:52.54>be <02:53.03>my <02:53.26>girl
[02:54.29]... `
  },
  {
    id: 3,
    title: "The Man Who Can't Be Moved",
    artist: "The Script",
    cover: "The Man Who Can't Be Moved/The Man Who Can't Be Moved.jpg",
    audio: "The Man Who Can't Be Moved/The Man Who Can't Be Moved_spotdown.org.mp3",
    lrc: "The Man Who Can't Be Moved/The Man Who Can't Be Moved - The Script.lrc",
    lrcEmbedded: `[id: ngidj1ds]
[ar: The Script]
[al: Tales from The Script: Greatest Hits]
[ti: The Man Who Can't Be Moved]
[au: Stephen Kipner, Andrew Frampton, Daniel O'Donoghue & Mark Sheehan]
[length: 04:00]

[00:09.50]Going <00:10.21>back <00:10.62>to <00:10.77>the <00:10.93>corner <00:11.85>where <00:12.07>I <00:12.47>first <00:12.88>saw <00:13.27>you
[00:14.31]Gonna <00:14.95>camp <00:15.20>in <00:15.43>my <00:15.71>sleeping <00:16.23>bag, <00:16.83>I'm <00:17.08>not <00:17.33>gonna <00:17.61>move
[00:19.14]Got <00:19.39>some <00:19.82>words <00:20.17>on <00:20.57>cardboard, <00:21.47>got <00:21.76>your <00:22.10>picture <00:22.57>in <00:22.74>my <00:23.06>hand
[00:23.80]Saying, <00:24.71>"If <00:25.02>you <00:25.22>see <00:25.46>this <00:25.71>girl, <00:26.22>can <00:26.42>you <00:26.66>tell <00:26.96>her <00:27.12>where <00:27.40>I <00:27.65>am?"
[00:28.38]
[00:28.38]Some <00:28.06>try <00:28.78>to <00:29.32>hand <00:29.76>me <00:29.98>money, <00:30.80>they <00:31.08>don't <00:31.84>understand
[00:33.22]I'm <00:33.42>not <00:34.07>broke, <00:35.22>I'm <00:35.74>just <00:35.92>a <00:36.14>broken-<00:36.60>hearted <00:37.02>man
[00:38.01]I <00:38.19>know <00:38.39>it <00:38.94>makes <00:39.29>no <00:39.64>sense, <00:40.33>but <00:40.46>what <00:40.68>else <00:41.36>can <00:41.61>I <00:41.89>do?
[00:43.30]And <00:43.40>how <00:43.64>can <00:43.77>I <00:44.10>move <00:44.39>on <00:45.38>when <00:45.57>I'm <00:45.74>still <00:46.04>in <00:46.26>love <00:46.50>with <00:46.73>you?
[00:47.54]
[00:47.54]'Cause <00:47.78>if <00:48.06>one <00:48.37>day <00:48.69>you <00:49.02>wake <00:49.03>up <00:49.58>and <00:49.91>find <00:50.21>that <00:50.51>you're <00:50.82>missing <00:51.38>me
[00:52.42]And <00:52.63>your <00:52.89>heart <00:53.20>starts <00:53.52>to <00:53.79>wonder <00:54.43>where <00:54.72>on <00:54.97>this <00:55.29>Earth <00:55.62>I <00:55.92>could <00:56.20>be
[00:57.12]Thinking <00:57.70>maybe <00:58.31>you'll <00:58.60>come <00:58.85>back <00:59.20>here <00:59.50>to <00:59.78>the <01:00.08>place <01:00.40>that <01:00.70>we'd <01:00.97>meet
[01:01.90]And <01:02.22>you'll <01:02.56>see <01:02.73>me <01:03.04>waiting <01:03.51>for <01:03.82>you <01:04.54>on <01:04.83>the <01:05.04>corner <01:05.47>of <01:05.70>the <01:05.92>street
[01:06.36]So <01:06.59>I'm <01:06.92>not <01:07.61>moving, <01:10.85>I'm <01:11.29>not <01:11.77>moving
[01:15.29]
[01:27.04]Policeman <01:27.81>says, <01:28.50>"Son <01:28.73>you <01:29.38>can't <01:29.72>stay <01:30.04>here"
[01:30.87]I <01:31.02>said, <01:31.90>"There's <01:32.00>someone <01:32.34>I'm <01:32.62>waiting <01:33.07>for, <01:33.42>if <01:33.64>it's <01:33.84>a <01:34.05>day, <01:34.60>a <01:34.72>month, <01:35.18>a <01:35.32>year"
[01:35.85]Gotta <01:36.35>stand <01:36.82>my <01:37.20>ground, <01:37.94>even <01:38.29>if <01:38.57>it <01:39.10>rains <01:39.62>or <01:39.85>snows
[01:40.90]If <01:41.02>she <01:41.28>changes <01:41.71>her <01:41.89>mind, <01:42.84>this <01:42.96>is <01:43.15>the <01:43.32>first <01:43.59>place <01:43.86>she <01:44.10>will <01:44.38>go
[01:46.99]
[01:45.18]'Cause <01:45.43>if <01:45.70>one <01:46.02>day <01:46.32>you <01:46.62>wake <01:46.89>up <01:47.20>and <01:47.50>find <01:47.79>that <01:48.11>you're <01:48.40>missing <01:48.99>me
[01:49.93]And <01:50.21>your <01:50.48>heart <01:50.78>starts <01:51.11>to <01:51.40>wonder <01:52.01>where <01:52.27>on <01:52.55>this <01:52.88>Earth <01:53.23>I <01:53.53>could <01:53.81>be
[01:54.86]Thinking <01:55.34>maybe <01:55.91>you'll <01:56.19>come <01:56.46>back <01:56.75>here <01:57.08>to <01:57.36>the <01:57.69>place <01:58.02>that <01:58.29>we'd <01:58.59>meet
[01:59.60]And <01:59.86>you'll <02:00.13>see <02:00.43>me <02:00.58>waiting <02:01.04>for <02:01.39>you <02:02.12>on <02:02.35>the <02:02.57>corner <02:03.04>of <02:03.20>the <02:03.41>street
[02:04.01]So <02:04.16>I'm <02:04.56>not <02:05.17>moving, <02:08.50>I'm <02:08.90>not <02:09.37>moving
[02:13.28]I'm <02:13.71>not <02:14.21>moving, <02:18.14>I'm <02:18.54>not <02:18.98>moving
[02:22.37]
[02:24.74]People <02:25.17>talk <02:25.50>about <02:26.07>the <02:26.36>guy <02:27.45>that's <02:27.83>waiting <02:28.67>on <02:28.82>a <02:29.10>girl, <02:30.98>oh-<02:31.31>oh-<02:31.47>oh
[02:34.36]There <02:34.51>are <02:34.80>no <02:35.09>holes <02:35.35>in <02:35.63>his <02:35.92>shoes <02:36.95>but <02:37.09>a <02:37.24>big <02:37.51>hole <02:38.21>in <02:38.36>his <02:38.59>world, <02:40.62>hmm
[02:43.12]And <02:43.32>maybe <02:43.77>I'll <02:44.10>get <02:44.35>famous <02:45.40>as <02:45.51>the <02:45.64>man <02:45.93>who <02:46.14>can't <02:46.41>be <02:46.71>moved
[02:47.82]And <02:47.97>maybe <02:48.54>you <02:48.86>won't <02:49.17>mean <02:49.49>to <02:50.09>but <02:50.21>you'll <02:50.34>see <02:50.69>me <02:51.00>on <02:51.30>the <02:51.59>news
[02:52.24]And <02:52.34>you'll <02:52.62>come <02:52.92>running <02:53.46>to <02:53.61>the <02:53.88>corner
[02:55.96]'Cause <02:56.11>you'll <02:56.41>know <02:56.71>it's <02:57.01>just <02:57.28>for <02:58.50>you
[02:59.27]I'm <02:59.51>the <02:59.79>man <03:00.68>who <03:01.00>can't <03:01.31>be <03:01.52>moved
[03:03.99]I'm <03:04.29>the <03:04.57>man <03:05.50>who <03:05.80>can't <03:06.06>be <03:06.37>moved
[03:07.17]
[03:06.71]'Cause <03:07.01>if <03:07.31>one <03:07.61>day <03:07.92>you <03:08.21>wake <03:08.46>up <03:08.76>and <03:09.11>find <03:09.41>that <03:09.72>you're <03:10.04>missing <03:10.56>me
[03:11.53]And <03:11.82>your <03:12.10>heart <03:12.40>starts <03:12.70>to <03:13.00>wonder <03:13.60>where <03:13.86>on <03:14.19>this <03:14.50>Earth <03:14.83>I <03:15.13>could <03:15.42>be
[03:16.40]Thinking <03:16.94>maybe <03:17.53>you'll <03:17.79>come <03:18.06>back <03:18.38>here <03:18.68>to <03:18.96>the <03:19.29>place <03:19.59>that <03:19.87>we'd <03:20.15>meet
[03:21.22]And <03:21.43>you'll <03:21.73>see <03:21.93>me <03:22.15>waiting <03:22.66>for <03:23.01>you <03:23.74>on <03:23.89>the <03:24.16>corner <03:24.66>of <03:24.82>the <03:25.05>street
[03:25.67]
[03:25.69]<03:25.94>'Cause <03:26.17>if <03:26.47>one <03:26.81>day <03:27.12>you <03:27.43>wake <03:27.70>up <03:27.99>and <03:28.29>find <03:28.59>that <03:28.89>you're <03:29.18>missing <03:29.77>me
[03:30.22]<03:30.83>And <03:31.00>your <03:31.27>heart <03:31.60>starts <03:31.89>to <03:32.19>wonder <03:32.77>where <03:33.04>on <03:33.37>this <03:33.67>Earth <03:33.99>I <03:34.30>could <03:34.60>be
[03:35.02]<03:35.56>Thinking <03:36.14>maybe <03:36.71>you'll <03:36.97>come <03:37.32>back <03:37.60>here <03:37.90>to <03:38.18>the <03:38.49>place <03:38.76>that <03:39.06>we'd <03:39.32>meet
[03:39.78]<03:40.39>And <03:40.63>you'll <03:40.93>see <03:41.20>me <03:41.35>waiting <03:41.82>for <03:42.18>you <03:42.99>on <03:43.12>the <03:43.35>corner <03:43.87>of <03:44.13>the <03:44.26>street
[03:44.87]
[03:45.45]Going <03:46.17>back <03:46.51>to <03:46.73>the <03:47.02>corner <03:47.83>where <03:48.12>I <03:48.51>first <03:48.90>saw <03:49.29>you
[03:50.27]Gonna <03:50.95>camp <03:51.26>in <03:51.45>my <03:51.65>sleeping <03:52.18>bag, <03:52.88>I'm <03:53.08>not <03:53.30>gonna <03:53.68>move
[03:55.84]...`
  },
  { 
    id: 4,
    title: "Starboy",
    artist: "Weeknd",
    cover: "Starboy/Starboy.jpg",
    audio: "Starboy/Starboy.mp3",
    lrc: "Starboy/Starboy.lrc",
    lrcEmbedded: `[id: ngidtunq]
[ar: The Weeknd]
[al: Starboy]
[ti: Starboy (feat. Daft Punk)]
[au: Abel Tesfaye, Thomas Bangalter, Guy-Manuel de Homem-Christo, Martin McKinney, Henry Walter & Jason 'Daheala' Quenneville]
[length: 03:50]

[00:16.04]I'm <00:16.55>tryna <00:16.86>put <00:17.00>you <00:17.20>in <00:17.35>the <00:17.51>worst <00:17.83>mood, <00:18.20>ah
[00:18.79]P<00:19.15>1 <00:19.46>cleaner <00:19.78>than <00:19.94>your <00:20.08>church <00:20.41>shoes, <00:20.76>ah
[00:21.40]Milli <00:21.73>point <00:22.05>two <00:22.35>just <00:22.50>to <00:22.63>hurt <00:23.00>you, <00:23.33>ah
[00:23.97]All <00:24.29>red <00:24.64>Lamb' <00:24.96>just <00:25.12>to <00:25.25>tease <00:25.61>you, <00:25.92>ah
[00:26.56]None <00:26.71>of <00:26.86>these <00:27.17>toys <00:27.49>on <00:27.82>lease <00:28.16>too, <00:28.51>ah
[00:29.10]Made <00:29.25>your <00:29.04>whole <00:29.75>year <00:30.10>in <00:30.25>a <00:30.40>week <00:30.73>too, <00:31.06>yeah
[00:31.69]Main <00:32.01>bitch <00:32.38>out <00:32.53>of <00:32.68>your <00:33.01>league <00:33.31>too, <00:33.65>ah
[00:34.30]Side <00:34.62>bitch <00:34.96>out <00:35.10>of <00:35.26>your <00:35.55>league <00:35.86>too, <00:36.21>ah
[00:36.56]
[00:37.15]House <00:37.36>so <00:37.49>empty, <00:37.84>need <00:37.96>a <00:38.12>center<00:38.45>piece
[00:39.49]Twenty <00:39.75>racks <00:39.91>a <00:40.06>table, <00:40.39>carved <00:40.56>from <00:40.75>ebony
[00:42.38]Cut <00:42.51>that <00:42.67>ivory <00:42.98>into <00:43.03>skinny <00:43.63>pieces
[00:44.35]Then <00:44.47>she <00:44.61>clean <00:44.78>it <00:44.94>with <00:45.09>her <00:45.23>face
[00:45.63]Man, <00:45.77>I <00:45.90>love <00:46.02>my <00:46.18>baby, <00:46.87>ah
[00:47.39]You <00:47.51>talkin' <00:47.87>money, <00:48.19>need <00:48.31>a <00:48.46>hearing <00:48.79>aid
[00:50.00]You <00:50.11>talking <00:50.44>'bout <00:50.59>me, <00:50.75>I <00:50.91>don't <00:51.07>see <00:51.26>the <00:51.42>shade
[00:52.54]Switch <00:52.64>up <00:52.80>my <00:52.95>style, <00:53.34>I <00:53.47>take <00:53.62>any <00:53.95>lane
[00:54.60]I <00:55.11>switch <00:55.24>up <00:55.38>my <00:55.06>cup, <00:55.92>I <00:56.05>kill <00:56.21>any <00:56.57>pain
[00:56.94]
[01:01.31]Look <01:01.53>what <01:01.65>you've <01:01.81>done
[01:06.28]I'm <01:06.39>a <01:06.52>mother<01:06.88>fuckin' <01:07.17>star<01:07.52>boy
[01:11.67]Look <01:11.87>what <01:12.01>you've <01:12.21>done
[01:16.58]I'm <01:16.70>a <01:16.85>mother<01:17.21>fuckin' <01:17.50>star<01:17.84>boy
[01:18.10]
[01:18.17]Every <01:18.48>day, <01:18.62>a <01:18.76>**** <01:19.12>try <01:19.26>to <01:19.41>test <01:19.77>me, <01:20.09>ah
[01:20.79]Every <01:21.07>day, <01:21.23>a <01:21.36>**** <01:21.71>try <01:21.84>to <01:22.00>end <01:22.36>me, <01:22.68>ah
[01:23.33]Pull <01:23.45>off <01:23.69>in <01:23.79>that <01:23.93>Roadster <01:24.63>SV, <01:25.25>ah
[01:25.93]Pockets <01:26.22>overweight, <01:26.88>gettin' <01:27.19>hefty, <01:27.80>ah
[01:28.49]Comin' <01:28.82>for <01:28.95>the <01:29.11>king, <01:29.47>that's <01:29.64>a <01:29.74>far <01:30.09>cry, <01:30.42>I
[01:31.25]I <01:31.36>come <01:31.58>alive <01:32.04>in <01:32.17>the <01:32.35>fall <01:32.68>time, <01:33.02>I
[01:33.84]The <01:33.95>competition, <01:34.60>I <01:34.74>don't <01:34.94>really <01:35.25>listen
[01:35.76]I'm <01:35.88>in <01:36.04>the <01:36.20>blue <01:36.58>Mulsanne <01:37.20>bumping <01:37.54>New <01:37.71>Edition
[01:38.18]
[01:39.15]House <01:39.28>so <01:39.44>empty, <01:39.77>need <01:39.92>a <01:40.08>center<01:40.40>piece
[01:41.40]Twenty <01:41.70>racks <01:41.86>a <01:42.01>table, <01:42.33>carved <01:42.47>from <01:42.64>ebony
[01:44.25]Cut <01:44.45>that <01:44.59>ivory <01:44.94>into <01:45.22>skinny <01:45.55>pieces
[01:46.24]Then <01:46.37>she <01:46.52>clean <01:46.66>it <01:46.82>with <01:47.00>her <01:47.17>face
[01:47.55]Man, <01:47.66>I <01:47.82>love <01:47.98>my <01:48.14>baby, <01:48.86>ah
[01:49.32]You <01:49.46>talkin' <01:49.79>money, <01:50.10>need <01:50.24>a <01:50.40>hearing <01:50.75>aid
[01:51.89]You <01:52.02>talking <01:52.37>'bout <01:52.51>me, <01:52.67>I <01:52.85>don't <01:53.02>see <01:53.19>the <01:53.34>shade
[01:54.46]Switch <01:54.60>up <01:54.74>my <01:54.90>style, <01:55.29>I <01:55.42>take <01:55.58>any <01:55.89>lane
[01:56.57]I <01:57.06>switch <01:57.18>up <01:57.35>my <01:57.51>cup, <01:57.86>I <01:57.99>kill <01:58.14>any <01:58.51>pain
[01:59.00]
[02:03.21]Look <02:03.43>what <02:03.58>you've <02:03.78>done
[02:08.20]I'm <02:08.32>a <02:08.48>mother<02:08.81>fuckin' <02:09.09>star<02:09.45>boy
[02:13.60]Look <02:13.84>what <02:13.98>you've <02:14.11>done
[02:18.51]I'm <02:18.63>a <02:18.77>mother<02:19.12>fuckin' <02:19.43>star<02:19.75>boy
[02:20.12]
[02:20.80]Let <02:20.93>a <02:21.09>**** <02:21.42>brag <02:21.74>Pitt
[02:22.11]Legend <02:22.41>of <02:22.53>the <02:22.69>Fall, <02:23.08>took <02:23.21>the <02:23.36>year <02:23.72>like <02:23.84>a <02:24.00>bandit
[02:24.64]Bought <02:24.79>mama <02:25.14>a <02:25.27>crib <02:25.63>and <02:25.75>a <02:25.90>brand <02:26.23>new <02:26.53>wagon
[02:27.22]Now <02:27.34>she <02:27.49>hit <02:27.64>the <02:27.81>grocery <02:28.50>shop <02:28.82>lookin' <02:29.12>lavish
[02:29.84]Star <02:30.14>Trek <02:30.43>roof <02:30.77>in <02:30.91>that <02:31.07>Wraith <02:31.40>of <02:31.55>Khan
[02:32.35]Girls <02:32.69>get <02:33.01>loose <02:33.31>when <02:33.46>they <02:33.63>hear <02:33.95>the <02:34.09>song
[02:34.81]A <02:34.93>hundred <02:35.29>on <02:35.41>the <02:35.56>dash <02:35.91>get <02:36.04>me <02:36.20>close <02:36.55>to <02:36.68>God
[02:37.19]We <02:37.34>don't <02:37.48>pray <02:37.83>for <02:37.96>love, <02:38.51>we <02:38.64>just <02:38.79>pray <02:39.15>for <02:39.27>cars
[02:40.31]
[02:41.07]House <02:41.21>so <02:41.38>empty, <02:41.70>need <02:41.85>a <02:41.99>center<02:42.31>piece
[02:43.35]Twenty <02:43.65>racks <02:43.78>a <02:43.93>table, <02:44.26>carved <02:44.40>from <02:44.56>ebony
[02:46.23]Cut <02:46.36>that <02:46.50>ivory <02:46.88>into <02:47.15>skinny <02:47.48>pieces
[02:48.18]Then <02:48.29>she <02:48.45>clean <02:48.63>it <02:48.81>with <02:48.97>her <02:49.14>face
[02:49.45]Man, <02:49.58>I <02:49.74>love <02:49.90>my <02:50.06>baby, <02:50.79>ah
[02:51.28]You <02:51.40>talkin' <02:51.72>money, <02:52.04>need <02:52.18>a <02:52.34>hearing <02:52.66>aid
[02:53.87]You <02:53.99>talking <02:54.32>'bout <02:54.44>me, <02:54.60>I <02:54.76>don't <02:54.92>see <02:55.08>the <02:55.24>shade
[02:56.40]Switch <02:56.51>up <02:56.67>my <02:56.81>style, <02:57.21>I <02:57.34>take <02:57.49>any <02:57.79>lane
[02:58.51]I <02:59.00>switch <02:59.12>up <02:59.28>my <02:59.44>cup, <02:59.79>I <02:59.92>kill <03:00.08>any <03:00.43>pain
[03:00.99]
[03:05.15]Look <03:05.43>what <03:05.54>you've <03:05.71>done
[03:10.10]I'm <03:10.23>a <03:10.38>mother<03:10.73>fuckin' <03:11.02>star<03:11.38>boy
[03:15.44]Look <03:15.73>what <03:15.88>you've <03:16.04>done
[03:20.44]I'm <03:20.56>a <03:20.70>mother<03:21.05>fuckin' <03:21.34>star<03:21.70>boy
[03:22.06]
[03:25.73]Look <03:26.08>what <03:26.21>you've <03:26.36>done
[03:30.74]I'm <03:30.87>a <03:31.03>mother<03:31.37>fuckin' <03:31.71>star<03:32.04>boy
[03:36.13]Look <03:36.36>what <03:36.48>you've <03:36.66>done
[03:41.07]I'm <03:41.21>a <03:41.35>mother<03:41.71>fuckin' <03:42.02>star<03:42.35>boy
[03:42.71]...`
  },
  { 
    id: 5,
    title: "Letdown",
    artist: "Radiohead",
    cover: "Letdown/Letdown.jpg",
    audio: "Letdown/Letdown.mp3",
    lrc: "Letdown/Letdown.lrc",
    lrcEmbedded: `[id: ngidehqe]
[ar: Radiohead]
[al: OK Computer]
[ti: Let Down]
[au: Colin Greenwood, Ed O'Brien, Jonny Greenwood, Phil Selway & Thom Yorke]
[length: 04:59]

[00:22.00]Transport, <00:24.38>motorways <00:26.08>and <00:26.44>tram <00:27.83>lines
[00:28.90]Starting <00:30.09>and <00:30.69>then <00:31.10>stopp<00:32.66>ing
[00:33.71]Taking <00:34.07>off <00:35.63>and <00:35.97>land<00:37.25>ing
[00:38.20]The <00:38.52>emptiest <00:39.90>of <00:40.62>feelings
[00:43.10]Dis<00:43.95>appointed <00:45.23>peo<00:46.66>ple
[00:47.79]Clinging <00:48.78>on <00:49.03>to <00:49.97>bottles
[00:52.32]When <00:52.86>it <00:53.41>comes <00:54.12>it's <00:54.63>so, <00:56.00>so <00:57.17>dis<00:57.79>appointing
[00:59.32]
[00:59.48]Let <01:00.50>down <01:01.15>and <01:02.02>hang<01:02.50>ing <01:02.98>a<01:03.67>round
[01:06.57]Crushed <01:07.56>like <01:08.08>a <01:08.97>bug <01:09.73>in <01:09.99>the <01:10.30>ground
[01:13.74]Let <01:14.55>down <01:15.24>and <01:16.02>hang<01:16.48>ing <01:17.11>around
[01:18.71]
[01:30.22]Shell <01:31.51>smashed, <01:32.57>juices <01:33.53>flowing
[01:34.64]Wings <01:36.22>twitch, <01:37.38>legs <01:37.69>are <01:38.15>going
[01:39.39]Don't <01:40.83>get <01:41.93>senti<01:42.91>mental
[01:44.07]It <01:45.59>always <01:46.81>ends <01:47.11>up <01:47.50>drivel
[01:48.99]
[01:48.99]One <01:50.29>day, <01:51.46>I <01:51.84>am <01:52.32>gonna <01:53.41>grow <01:54.78>wings
[01:55.76]A <01:56.10>chemical <01:57.78>reaction
[02:00.34]Hysterical <02:02.45>and <02:02.87>useless
[02:05.12]Hysterical <02:06.88>and
[02:07.54]
[02:07.54]Let <02:08.54>down <02:09.28>and <02:10.01>hang<02:10.50>ing <02:11.11>around
[02:14.62]Crushed <02:15.60>like <02:16.29>a <02:17.10>bug <02:17.60>in <02:17.89>the <02:18.19>ground
[02:21.74]Let <02:22.59>down <02:23.34>and <02:24.10>hang<02:24.75>ing <02:25.08>around
[02:26.81]
[03:06.51]Let <03:07.40>down <03:08.23>a<03:09.56>gain
[03:15.86]Let <03:16.71>down <03:17.61>a<03:19.85>gain
[03:25.31]Let <03:26.17>down <03:27.26>a<03:28.55>gain
[03:37.26]
[03:41.40]You <03:42.49>know, <03:43.60>you <03:44.05>know <03:44.47>where <03:45.31>you <03:45.71>are <03:46.98>with
[03:48.18]You <03:48.60>know <03:49.07>where <03:49.97>you <03:50.30>are <03:51.58>with
[03:52.70]Floor <03:53.42>collap<03:54.27>sing
[03:54.75]Float<03:56.38>ing, <03:57.44>bouncing <03:58.38>back
[03:58.93]
[03:58.93]And <03:59.75>one <04:00.97>day
[04:02.03]I <04:02.41>am <04:02.92>gonna <04:04.10>grow <04:05.37>wings
[04:06.39]A <04:06.67>chemical <04:08.50>reaction
[04:10.96]Hysterical <04:12.91>and <04:13.29>useless
[04:15.58]Hysterical <04:17.37>and
[04:24.78]
[04:18.16]Let <04:19.06>down <04:19.89>and <04:20.60>hang<04:21.21>ing <04:21.51>a<04:22.33>round
[04:25.14]Crushed <04:25.96>like <04:26.53>a <04:27.41>bug <04:28.08>in <04:28.37>the <04:28.63>ground
[04:32.08]Let <04:33.01>down <04:33.72>and <04:34.46>hang<04:34.89>ing <04:35.46>a<04:36.20>round
[04:37.24]...`
  },
  {
    id: 6,
    title: "Drunk Text",
    artist: "Henry Moodie",
    cover: "Drunk Text/Drunk Text.jpg",
    audio: "Drunk Text/Drunk Text.mp3",
    lrc: "Drunk Text/Drunk Text.lrc",
    lrcEmbedded: `[id: bi9n3kz4]
[ar: Henry Moodie]
[al: mood swings]
[ti: drunk text]
[au: Henry Moodie, Joshua Mark McClelland & Andrew Edward Bannister]
[length: 03:07]

[00:00.56]5th <00:00.99>of <00:01.33>No<00:01.50>vem<00:02.11>ber
[00:04.18]When <00:04.42>I <00:04.77>walked <00:05.04>you <00:05.39>home
[00:08.54]That's <00:08.79>when <00:08.98>I <00:09.48>nearly <00:09.91>said <00:10.46>it
[00:10.84]But <00:11.02>then <00:11.30>said <00:11.66>"Forget <00:12.32>it" <00:12.62>and <00:12.87>froze
[00:13.80]
[00:15.76]Do <00:16.12>you <00:16.45>remem<00:17.38>ber?
[00:19.28]You <00:19.52>probably <00:20.46>don't
[00:23.64]'Cause <00:23.94>the <00:24.06>sparks <00:24.57>in <00:24.91>the <00:25.02>sky
[00:25.61]Took <00:25.93>a <00:26.09>hold <00:26.47>of <00:26.75>your <00:27.05>eyes <00:27.53>while <00:27.80>we <00:27.95>spoke
[00:28.61]
[00:31.90]Yes<00:32.22>ter<00:32.46>day, <00:33.77>drank <00:34.10>way <00:34.39>too <00:34.73>much
[00:35.12]And <00:35.28>stayed <00:35.67>up <00:35.96>too <00:36.33>late
[00:37.44]Started <00:38.10>to <00:38.45>write <00:38.88>what <00:39.16>I <00:39.42>wanna <00:39.89>say
[00:41.04]De<00:41.39>leted <00:41.97>the <00:42.25>message<00:42.92> but <00:43.24>I <00:43.50>still <00:43.99>remember <00:44.82>it <00:45.09>said
[00:45.75]
[00:46.84]I <00:47.04>wish <00:47.98>I <00:48.58>was <00:48.87>who <00:49.26>you <00:49.54>drunk <00:49.89>texted <00:50.17>at <00:50.71>mid<00:51.66>night
[00:52.44]Wish <00:52.69>I <00:53.04>was <00:53.39>the <00:53.65>reason <00:54.29>you <00:54.46>stay <00:54.95>up <00:55.20>till <00:55.52>3
[00:55.92]And <00:56.19>you <00:56.43>can't <00:56.86>fall <00:57.13>a<00:57.31>sleep
[00:58.44]Wai<00:58.76>ting <00:58.98>for <00:59.33>me <00:59.66>to <01:00.04>re<01:00.34>ply
[01:01.94]I <01:02.24>wish <01:03.14>I <01:03.77>was <01:04.10>more <01:04.47>than <01:04.68>just <01:05.01>someone <01:05.72>you <01:05.96>walk <01:06.87>by
[01:07.50]Wish <01:07.86>I <01:08.22>wasn't <01:08.71>scared <01:09.16>to <01:09.46>be <01:09.77>honest <01:10.37>and <01:10.74>open
[01:11.48]Instead <01:12.03>of <01:12.34>just <01:12.56>hoping
[01:13.38]You'd <01:13.49>feel <01:13.95>what <01:14.23>I'm <01:14.52>feeling <01:15.09>inside
[01:17.31]
[01:18.28]April <01:18.94>the <01:19.06>7th
[01:21.91]And <01:22.09>nothing <01:22.51>has <01:23.08>changed
[01:26.54]It's <01:26.86>hard <01:27.14>to <01:27.35>get <01:27.62>by
[01:28.14]When <01:28.39>you're <01:28.50>still <01:29.03>on <01:29.36>my <01:29.55>mind <01:30.01>every<01:30.56>day
[01:31.20]
[01:33.46]Sometimes <01:34.09>I <01:34.25>question
[01:37.08]If <01:37.24>you <01:37.55>feel <01:38.01>the <01:38.20>same?
[01:41.52]Do <01:41.71>we <01:41.90>make <01:42.19>stupid <01:42.79>jokes?
[01:43.24]Tryna <01:43.74>hide <01:44.20>that <01:44.47>we're <01:44.66>both <01:45.12>too <01:45.49>afraid <01:47.26>to <01:47.51>say
[01:48.14]
[01:49.30]I <01:49.49>wish <01:50.47>I <01:51.03>was <01:51.33>who <01:51.72>you <01:52.00>drunk <01:52.35>texted <01:52.62>at <01:53.16>mid<01:54.11>night
[01:54.94]Wish <01:55.19>I <01:55.54>was <01:55.89>the <01:56.15>reason <01:56.79>you <01:56.96>stay <01:57.45>up <01:57.70>till <01:58.03>3
[01:58.44]And <01:58.70>you <01:58.95>can't <01:59.37>fall <01:59.65>a<01:59.83>sleep
[02:00.96]Wai<02:01.27>ting <02:01.50>for <02:01.84>me <02:02.17>to <02:02.56>re<02:02.85>ply
[02:04.46]I <02:04.76>wish <02:05.66>I <02:06.29>was <02:06.62>more <02:06.99>than <02:07.20>just <02:07.53>someone <02:08.25>you <02:08.48>walk <02:09.39>by
[02:10.14]Wish <02:10.50>I <02:10.86>wasn't <02:11.35>scared <02:11.80>to <02:12.10>be <02:12.41>honest <02:13.01>and <02:13.37>open
[02:14.02]Instead <02:14.58>of <02:14.88>just <02:15.10>hoping
[02:15.96]You'd <02:16.06>feel <02:16.53>what <02:16.81>I'm <02:17.10>feeling <02:17.66>inside
[02:19.88]
[02:19.86]Oh, <02:20.60>and <02:20.84>here <02:21.56>we <02:21.82>go <02:22.53>again
[02:23.38]Destroy <02:24.30>my<02:24.52>self <02:25.23>to <02:25.47>keep <02:26.29>a <02:26.50>friend
[02:27.46]Hiding <02:28.10>away <02:29.21>'cause <02:29.41>I <02:29.67>was <02:30.00>afraid <02:30.67>you'd <02:30.96>say <02:31.24>no
[02:34.78]I <02:35.05>wonder <02:35.95>if <02:36.67>I <02:36.91>cross <02:37.62>your <02:37.87>mind
[02:38.84]Half <02:39.42>as <02:39.72>much <02:40.43>as <02:40.70>you <02:41.37>do <02:41.69>mine
[02:42.06]If <02:42.33>I <02:42.62>tell <02:43.02>you <02:43.30>the <02:43.55>truth
[02:44.46]What <02:44.82>will <02:45.12>I <02:45.47>lose? <02:45.83>I <02:46.13>don't <02:46.42>know
[02:47.08]
[02:49.82]I <02:50.25>wish <02:51.18>I'd <02:51.93>sent <02:52.41>you <02:52.71>that <02:52.98>drunk <02:53.29>text <02:53.67>at <02:53.93>mid<02:54.91>night
[02:55.92]I <02:56.21>was <02:56.45>just <02:56.71>scared <02:57.17>it <02:57.44>would <02:57.78>ruin <02:58.41>our <02:58.70>friend<02:58.98>ship
[02:59.52]But <02:59.65>I <03:00.10>really <03:00.58>meant <03:00.98>it
[03:01.46]I <03:01.65>wonder <03:02.20>how <03:02.56>you <03:02.96>would <03:03.23>re<03:03.49>ply
[03:05.37]`
  },
  {
    id: 7,
    title: "Don't Look Back In Anger - Acoustic",
    artist: "-",
    cover: "Don't Look Back In Anger - Acoustic/Don't Look Back In Anger - Acoustic.jpg",
    audio: "Don't Look Back In Anger - Acoustic/Don't Look Back In Anger - Acoustic.mp3",
    lrc: "Don't Look Back In Anger - Acoustic/Don't Look Back In Anger - Acoustic.lrc",
    lrcEmbedded: `[00:00.100] [singing]
[00:03.100] S  lip inside the eye of your mind. Don't
you know you
[00:12.740] might find a better place to play?
[00:18.060] You said that you'd never been. But all
the things that
[00:26.600] you've seen will slowly fade away.
[00:32.220] So I start a revolution from my bed.
[00:38.840] 'Cause you said the brains I have went to
my head.
[00:45.660] Step outside, the summertime's in bloom.
[00:52.780] Stand up beside the fireplace. Take that
look from off your
[01:00.660] face. You ain't never gonna burn my heart
[01:06.120] out. And
[01:11.900] so Sally can wait. She knows it's
[01:18.060] too late as we're walking on by.
[01:23.320] Her soul slides away.
[01:30.540] But don't look back in anger, I heard you
say.
[01:37.160] Take me to the place where you go. Where
[01:44.500] nobody knows if it's night or
[01:49.620] day. Please don't put your life in
[01:55.780] the hands of a rock and roll band
[02:01.080] who'll throw it all away. I'm gonna
[02:07.720] start a revolution from my bed. 'Cause
you
[02:13.660] said the brains I have went to my head.
[02:18.540] Step outside, 'cause summertime's in
bloom.
[02:25.140] Stand up beside the fireplace. Take that
look from off your
[02:33.240] face. 'Cause you ain't never gonna burn
my heart
[02:38.700] out. And
[02:44.480] so Sally can wait. She knows
[02:50.300] it's too late as we're walking on by.
[02:55.780] My soul slides away.
[03:02.700] But don't look back in anger, I heard you
say.
[03:09.320] But don't look back in anger, I
[03:16.380] heard you
[03:17.800] say.`
  },
  {
    id: 8,
    title: "Back To Friends",
    artist: "Sombr",
    cover: "Back To Friends/Back To Friends.png",
    audio: "Back To Friends/Back To Friends.mp3",
    lrc: "Back To Friends/Back To Friends.lrc",
    lrcEmbedded: `[id: th5wk3s]
[ar: sombr]
[al: I Barely Know Her]
[ti: back to friends]
[au: Shane Boose]
[length: 03:19]

[00:23.14]Touch <00:23.83>my <00:24.11>body <00:24.76>tender
[00:27.67]'Cause <00:28.05>the <00:28.03>feeling <00:29.30>makes <00:29.63>me <00:29.91>weak
[00:33.48]Kicking <00:34.52>off <00:34.84>the <00:35.14>covers
[00:37.96]I <00:38.19>see <00:38.75>the <00:38.93>ceiling <00:39.67>while <00:39.97>you're <00:40.27>looking <00:40.96>down <00:41.26>at <00:41.57>me
[00:42.35]
[00:44.13]How <00:44.83>can <00:45.15>we <00:45.45>go <00:46.42>back <00:47.07>to <00:47.40>being <00:48.03>friends
[00:48.91]When <00:49.27>we <00:49.85>just <00:50.42>shared <00:51.27>a <00:51.57>bed?
[00:54.45]How <00:55.11>can <00:55.43>you <00:55.75>look <00:56.73>at <00:57.36>me <00:57.71>and <00:58.03>pretend
[00:59.30]I'm <00:59.51>someone <01:00.63>you've <01:00.88>ne<01:01.40>ver <01:01.93>met?
[01:03.50]
[01:04.50]It <01:05.10>was <01:05.43>last <01:05.78>December
[01:08.99]You <01:09.27>were <01:09.60>laying <01:10.76>on <01:11.08>my <01:11.27>chest
[01:14.81]I <01:15.36>still <01:16.16>remember
[01:19.37]I <01:19.66>was <01:19.88>scared <01:20.65>to <01:20.93>take <01:21.26>a <01:21.56>breath
[01:22.25]Didn't <01:22.88>want <01:23.23>you <01:23.53>to <01:23.81>move <01:24.48>your <01:25.10>head
[01:27.57]
[01:25.47]How <01:26.13>can <01:26.45>we <01:26.75>go <01:27.71>back <01:28.39>to <01:28.66>being <01:29.34>friends
[01:30.30]When <01:30.67>we <01:31.16>just <01:31.72>shared <01:32.58>a <01:32.87>bed?
[01:35.75]How <01:36.47>can <01:36.79>you <01:37.07>look <01:38.04>at <01:38.72>me <01:39.06>and <01:39.34>pretend
[01:40.60]I'm <01:40.89>someone <01:41.90>you've <01:42.19>ne<01:42.70>ver <01:43.22>met?
[01:44.86]
[01:45.80]The <01:46.20>de<01:48.41>vil <01:48.82>in <01:50.07>your <01:51.18>eyes
[01:52.64]Won't <01:53.20>deny <01:54.85>the <01:55.11>lies <01:55.83>you've <01:56.44>sold
[01:58.80]I'm <01:59.09>holding <02:00.36>on <02:00.96>too <02:01.61>tight
[02:02.54]While <02:02.94>you <02:03.54>let <02:04.20>go
[02:04.87]This <02:05.25>is <02:05.50>ca<02:06.18>su<02:06.48>al
[02:09.65]
[02:17.16]How <02:17.81>can <02:18.10>we <02:18.42>go <02:19.37>back <02:20.01>to <02:20.32>being <02:21.02>friends
[02:21.94]When <02:22.35>we <02:22.90>just <02:23.46>shared <02:24.26>a <02:24.55>bed?
[02:27.33]How <02:28.08>can <02:28.38>you <02:28.70>look <02:29.75>at <02:30.39>me <02:30.71>and <02:30.99>pretend
[02:32.29]I'm <02:32.57>someone <02:33.57>you've <02:33.85>ne<02:34.37>ver <02:34.88>met?
[02:36.49]
[02:37.75]How <02:38.44>can <02:38.76>we <02:39.02>go <02:39.96>back <02:40.69>to <02:40.99>being <02:41.66>friends
[02:42.60]When <02:42.94>we <02:43.55>just <02:44.02>shared <02:44.87>a <02:45.20>bed?
[02:48.10]How <02:48.77>can <02:49.07>you <02:49.36>look <02:50.36>at <02:51.01>me <02:51.36>and <02:51.66>pretend
[02:52.97]I'm <02:53.26>someone <02:54.25>you've <02:54.51>ne<02:55.05>ver <02:55.58>met?
[02:57.23]
[03:00.35]I'm <03:00.59>someone <03:02.04>you've <03:02.27>ne<03:02.98>ver <03:03.37>met
[03:07.95]...`
  },
  {
    id: 9,
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    cover: "I Wanna Be Yours/I Wanna Be Yours.jpg",
    audio: "I Wanna Be Yours/I Wanna Be Yours.mp3",
    lrc: "I Wanna Be Yours/I Wanna Be Yours.lrc",
    lrcEmbedded: `[id: ngidjhea]
[ar: Arctic Monkeys]
[al: AM]
[ti: I Wanna Be Yours]
[au: Arctic Monkeys]
[length: 03:04]

[00:18.12]I <00:18.28>wanna <00:18.67>be <00:18.94>your <00:19.19>vacuum <00:19.77>cleaner
[00:21.97]Breathing <00:22.57>in <00:22.80>your <00:23.15>dust
[00:25.09]I <00:25.33>wanna <00:25.79>be <00:25.95>your <00:26.13>Ford <00:26.64>Cor<00:27.11>tina
[00:28.84]I <00:29.63>will <00:29.91>never <00:30.38>rust
[00:32.46]If <00:32.88>you <00:33.10>like <00:33.37>your <00:33.56>coffee <00:34.01>hot
[00:36.13]Let <00:36.52>me <00:36.75>be <00:36.98>your <00:37.20>coffee <00:37.84>pot
[00:39.66]You <00:40.22>call <00:40.62>the <00:40.94>shots, <00:41.44>babe
[00:42.29]I <00:42.48>just <00:42.91>wanna <00:43.41>be <00:43.84>yours
[00:45.25]
[00:46.27]Secrets <00:47.36>I <00:47.81>have <00:48.23>held <00:48.58>in <00:48.77>my <00:49.20>heart
[00:50.00]Are <00:50.48>harder <00:51.33>to <00:51.72>hide <00:52.10>than <00:52.37>I <00:52.73>thought
[00:53.53]Maybe <00:54.50>I <00:54.90>just <00:55.39>wanna <00:55.90>be <00:56.29>yours
[00:56.74]I <00:57.12>wanna <00:57.61>be <00:58.01>yours
[00:58.63]
[00:58.63]I <00:58.94>wanna <00:59.44>be <00:59.88>yours
[01:02.29]Wanna <01:03.07>be <01:03.39>yours
[01:05.83]Wanna <01:06.47>be <01:06.94>yours
[01:09.48]Wanna <01:10.00>be <01:10.46>yours
[01:12.45]
[01:15.11]Let <01:15.42>me <01:15.62>be <01:15.84>your <01:16.07>'leccy <01:16.66>meter
[01:18.64]And <01:18.91>I'll <01:19.34>never <01:19.87>run <01:20.21>out
[01:21.54]Let <01:22.01>me <01:22.42>be <01:22.67>the <01:22.94>portable <01:23.69>heater
[01:25.73]That <01:26.12>you'll <01:26.60>get <01:26.82>cold <01:27.32>without
[01:29.14]I <01:29.34>wanna <01:29.78>be <01:30.08>your <01:30.24>setting <01:30.72>lotion
[01:32.92]Hold <01:33.23>your <01:33.42>hair <01:33.67>in <01:33.89>deep <01:34.14>devotion
[01:36.25]At <01:36.63>least <01:37.12>as <01:37.32>deep <01:37.59>as <01:37.79>the <01:38.02>Pacific <01:38.75>Ocean
[01:39.33]I <01:39.73>wanna <01:40.31>be <01:40.77>yours
[01:41.99]
[01:43.35]Secrets <01:44.18>I <01:44.62>have <01:45.05>held <01:45.38>in <01:45.67>my <01:46.08>heart
[01:46.88]Are <01:47.37>harder <01:48.20>to <01:48.62>hide <01:48.96>than <01:49.19>I <01:49.59>thought
[01:50.41]Maybe <01:51.40>I <01:51.81>just <01:52.26>wanna <01:52.65>be <01:53.11>yours
[01:53.62]I <01:54.14>wanna <01:54.56>be <01:54.96>yours
[01:55.27]
[01:55.38]I <01:55.83>wanna <01:56.34>be <01:56.71>yours
[01:59.28]Wanna <01:59.95>be <02:00.39>yours
[02:02.71]Wanna <02:03.30>be <02:03.83>yours
[02:06.31]Wanna <02:06.96>be <02:07.44>yours
[02:09.86]Wanna <02:10.44>be <02:10.92>yours
[02:13.45]Wanna <02:14.03>be <02:14.57>yours
[02:16.97]Wanna <02:17.56>be <02:17.87>yours
[02:20.52]Wanna <02:21.15>be <02:21.68>yours
[02:24.12]Wanna <02:24.64>be <02:25.12>yours
[02:26.02]
[02:26.17]I <02:26.45>wanna <02:26.71>be <02:26.92>your <02:27.13>vacuum <02:27.78>cleaner
[02:29.94]Breathing <02:30.53>in <02:30.76>your <02:31.15>dust
[02:33.29]I <02:33.39>wanna <02:33.79>be <02:33.98>your <02:34.29>Ford <02:34.70>Cortina
[02:36.88]I <02:37.56>will <02:37.96>never <02:38.26>rust
[02:39.62]I <02:39.85>just <02:40.32>wanna <02:40.69>be <02:41.15>yours
[02:43.26]I <02:43.52>just <02:43.95>wanna <02:44.32>be <02:44.97>yours
[02:46.68]I <02:47.09>just <02:47.41>wanna <02:47.82>be <02:48.22>yours
[02:52.30]...`
  },
  {
    id: 10,
    title: "Cry",
    artist: "Cigarettes After Sex",
    cover: "Cry/Cry.jpg",
    audio: "Cry/Cry.mp3",
    lrc: "Cry/Cry.lrc",
    lrcEmbedded: `[id: ngir1111]
[ar: Cigarettes After Sex]
[al: Cry]
[ti: Cry]
[au: Greg Gonzalez]
[length: 04:16]

[00:54.73]It's <00:55.32>making <00:56.13>you <00:56.38>cry
[00:58.55]Every <00:59.72>time
[01:01.93]You <01:02.50>give <01:02.98>your <01:03.38>love <01:04.21>to <01:05.08>me <01:05.89>this <01:06.78>way
[01:07.69]
[01:08.55]Saying <01:09.79>you'd <01:10.23>wait
[01:11.98]For <01:12.65>me <01:13.06>to <01:13.33>stay
[01:15.38]I <01:15.77>know <01:16.47>it <01:16.84>hurts <01:17.77>you
[01:18.30]
[01:18.34]But <01:19.48>I <01:20.11>need <01:21.79>to <01:23.46>tell <01:25.04>you <01:26.72>something
[01:29.46]My <01:30.04>heart <01:30.89>just <01:31.75>can't <01:32.61>be <01:33.32>faithful <01:36.62>for <01:38.40>long
[01:39.88]I <01:41.60>swear <01:43.03>I'll <01:43.53>only <01:45.11>make <01:45.93>you <01:46.73>cry
[01:47.88]
[01:48.66]Maybe <01:49.67>I'd <01:50.06>change
[01:51.97]For <01:52.67>you <01:53.02>some<01:53.46>day
[01:55.39]But <01:56.05>I <01:56.43>can't <01:56.80>help <01:57.60>the <01:58.58>way <01:59.42>I <02:00.15>feel
[02:00.99]
[02:02.01]Wish <02:02.71>I <02:03.12>was <02:03.52>good
[02:05.52]Wish <02:06.10>that <02:06.60>I <02:06.91>could
[02:08.84]Give <02:09.45>you <02:09.86>my <02:10.30>love <02:11.15>now
[02:11.84]
[02:11.86]But <02:12.91>I <02:13.60>need <02:15.35>to <02:16.92>tell <02:18.75>you <02:20.31>something
[02:23.16]My <02:23.93>heart <02:24.80>just <02:25.43>can't <02:26.30>be <02:27.09>faithful <02:30.54>for <02:32.23>long
[02:33.81]I <02:35.50>swear <02:36.94>I'll <02:37.42>only <02:39.07>make <02:39.96>you <02:40.76>cry
[02:41.92]
[03:07.16]I <03:07.67>need <03:09.29>to <03:10.93>tell <03:12.60>you <03:14.22>something
[03:17.11]My <03:17.72>heart <03:18.59>just <03:19.43>can't <03:20.29>be <03:21.00>faithful <03:24.33>for <03:26.15>long
[03:27.62]I <03:29.28>swear <03:30.73>I'll <03:31.17>only <03:32.86>make <03:33.74>you <03:34.49>cry
[03:35.68]...`
  },
  {
    id: 11,
    title: "Love In The Dark",
    artist: "Adele",
    cover: "Love In The Dark/Love In The Dark.png",
    audio: "Love In The Dark/Love In The Dark.mp3",
    lrc: "Love In The Dark/Love In The Dark.lrc",
    lrcEmbedded: `[id: ngidkpuq]
[ar: Adele]
[al: 25]
[ti: Love in the Dark]
[au: Samuel Dixon & Adele Adkins]
[length: 04:45]

[00:19.56]Take <00:21.00>your <00:22.03>eyes <00:22.92>off <00:23.82>of <00:24.06>me <00:24.85>so <00:25.25>I <00:25.83>can <00:26.24>leave
[00:28.06]I'm <00:28.41>far <00:29.35>too <00:30.48>ashamed <00:31.31>to <00:31.67>do <00:32.61>it <00:32.86>with <00:33.63>you <00:33.98>watching <00:34.93>me
[00:36.98]This <00:38.02>is <00:38.35>never <00:39.26>ending, <00:40.52>we <00:41.28>have <00:41.67>been <00:42.70>here <00:43.38>before
[00:45.59]But <00:46.01>I <00:46.62>can't <00:47.11>stay <00:47.69>this <00:48.08>time <00:48.78>'cause <00:49.31>I <00:50.03>don't <00:50.48>love <00:51.17>you <00:51.64>anymore
[00:53.53]
[00:53.54]Please <00:54.74>stay <00:55.95>where <00:56.42>you <00:56.68>are
[00:57.83]Don't <00:58.37>come <00:58.86>any <01:00.12>closer
[01:02.18]Don't <01:03.26>try <01:04.10>to <01:04.28>change <01:05.09>my <01:05.36>mind
[01:06.49]I'm <01:06.92>being <01:07.76>cruel <01:08.93>to <01:09.30>be <01:09.66>kind
[01:10.74]
[01:11.12]I <01:11.43>can't <01:11.92>love <01:14.18>you <01:15.75>in <01:16.00>the <01:16.24>dark
[01:19.31]It <01:19.63>feels <01:20.11>like <01:20.46>we're <01:20.85>oceans <01:24.46>apart
[01:28.60]There <01:29.04>is <01:29.31>so <01:29.94>much <01:30.31>space <01:31.23>between <01:32.01>us
[01:32.75]Baby, <01:33.38>we're <01:33.67>already <01:35.49>defeated
[01:36.95]Ay, <01:37.78>yeah, <01:38.35>yeah, <01:38.85>yeah, <01:39.37>yeah, <01:39.88>yeah, <01:40.42>yeah, <01:40.92>yeah
[01:41.75]Everything <01:42.81>changed <01:43.24>me
[01:44.52]
[01:46.92]You <01:47.74>have <01:48.14>given <01:48.96>me <01:49.82>something <01:51.26>that <01:51.55>I <01:51.98>can't <01:52.51>live <01:53.17>without
[01:55.35]You <01:55.80>mustn't <01:56.75>underestimate <01:59.73>that <02:00.11>when <02:00.80>you <02:01.25>are <02:01.94>in <02:02.33>doubt
[02:04.07]But <02:04.54>I <02:05.07>don't <02:05.49>want <02:06.28>to <02:06.67>carry <02:07.74>on <02:08.38>like <02:08.95>everything <02:10.81>is <02:11.08>fine
[02:12.78]The <02:13.29>longer <02:14.28>we <02:15.02>ignore <02:16.22>it <02:16.56>all, <02:17.31>the <02:17.65>more <02:18.47>that <02:18.60>we <02:19.49>will <02:19.71>fight
[02:20.73]
[02:20.73]Please <02:22.08>don't <02:22.85>fall <02:23.59>apart
[02:25.22]I <02:25.54>can't <02:25.99>face <02:26.73>your <02:27.43>breaking <02:28.31>heart
[02:29.41]I'm <02:30.60>trying <02:31.82>to <02:32.26>be <02:32.62>brave
[02:33.97]Stop <02:34.65>asking <02:36.01>me <02:36.56>to <02:36.85>stay
[02:37.96]
[02:38.22]I <02:38.55>can't <02:39.17>love <02:41.38>you <02:42.96>in <02:43.24>the <02:43.51>dark
[02:46.58]It <02:46.92>feels <02:47.35>like <02:47.76>we're <02:48.10>oceans <02:51.81>apart
[02:55.92]There <02:56.31>is <02:56.44>so <02:57.29>much <02:57.67>space <02:58.31>between <02:59.28>us
[02:59.99]Baby, <03:00.60>we're <03:00.84>already <03:02.76>defeated
[03:04.21]Ay, <03:04.99>yeah, <03:05.56>yeah, <03:06.11>yeah, <03:06.59>yeah, <03:07.21>yeah, <03:07.76>yeah, <03:08.21>yeah
[03:08.92]Everything <03:09.89>changed <03:10.51>me
[03:12.31]
[03:13.28]We're <03:13.63>not <03:14.08>the <03:14.24>only <03:14.76>ones
[03:15.61]I <03:15.71>don't <03:16.29>regret <03:16.89>a <03:17.15>thing
[03:17.80]Every <03:18.64>word <03:19.24>I've <03:19.49>said
[03:20.00]You <03:20.20>know <03:20.77>I'll <03:21.06>always <03:21.66>mean
[03:22.16]It <03:22.50>is <03:22.79>the <03:23.01>world <03:23.40>to <03:23.63>me <03:24.44>that <03:24.73>you <03:24.99>are <03:25.33>in <03:25.68>my <03:26.10>life
[03:26.60]But <03:26.93>I <03:27.24>want <03:27.85>to <03:28.43>live <03:29.23>and <03:29.36>not <03:29.90>just <03:30.08>survive
[03:33.80]
[03:51.99]That's <03:52.36>why <03:52.61>I <03:52.96>can't <03:53.35>love <03:55.58>you <03:57.21>in <03:57.44>the <03:57.71>dark
[04:00.83]It <04:01.15>feels <04:01.54>like <04:01.95>we're <04:02.35>oceans <04:05.99>apart
[04:10.06]There <04:10.48>is <04:10.58>so <04:11.41>much <04:11.78>space <04:12.69>between <04:13.54>us
[04:14.18]Baby, <04:14.74>we're <04:15.00>already <04:16.87>defeated
[04:19.21]'Cause <04:19.75>ay, <04:20.27>yeah, <04:20.79>yeah, <04:21.29>yeah, <04:21.74>yeah, <04:22.24>yeah
[04:23.20]Everything <04:24.00>changed <04:24.56>me
[04:28.10]And <04:28.44>I, <04:28.98>I, <04:29.51>I, <04:30.01>I, <04:30.62>I <04:31.19>don't <04:31.65>think <04:32.19>you <04:32.49>can <04:32.79>save <04:33.35>me
[04:35.24]...`
  },
  {
    id: 12,
    title: "A Thousand Years",
    artist: "Christina Perri",
    cover: "A Thousand Years/A Thousand Years.png",
    audio: "A Thousand Years/A Thousand Years.mp3",
    lrc: "A Thousand Years/A Thousand Years.lrc",
    lrcEmbedded: `[id: ngidje5q]
[ar: Christina Perri]
[al: Canciones para declararse]
[ti: A Thousand Years]
[au: Christina Perri & David Hodges]
[length: 04:45]

[00:20.89]Heart <00:22.00>beats <00:23.36>fast
[00:24.72]Colors <00:25.64>and <00:25.96>promises, <00:29.93>how <00:30.28>to <00:30.44>be <00:31.12>brave
[00:32.48]How <00:32.91>can <00:33.08>I <00:33.73>love <00:34.59>when <00:34.98>I'm <00:35.90>afraid <00:37.53>to <00:38.79>fall?
[00:40.05]But <00:40.18>watching <00:41.05>you <00:41.38>stand <00:42.73>a<00:44.06>lone
[00:45.29]All <00:45.67>of <00:45.85>my <00:46.44>doubt <00:47.83>suddenly <00:49.16>goes <00:49.89>away <00:51.00>somehow
[00:52.72]
[00:54.34]One <00:55.56>step <00:56.76>clo<00:59.38>ser
[01:00.94]
[01:01.89]I <01:02.43>have <01:02.64>died <01:03.42>every <01:04.08>day <01:04.58>waiting <01:05.82>for <01:06.21>you
[01:07.19]Darling, <01:07.91>don't <01:08.57>be <01:09.00>afraid, <01:09.90>I <01:10.89>have <01:11.10>loved <01:11.54>you
[01:12.02]For <01:12.26>a <01:12.45>thou<01:14.20>sand <01:14.70>years
[01:16.25]I'll <01:16.42>love <01:16.72>you <01:17.03>for <01:17.37>a <01:17.60>thousand <01:20.20>more
[01:22.26]
[01:28.01]Time <01:29.15>stands <01:30.43>still, <01:31.89>beauty <01:32.81>in <01:33.11>all <01:34.45>she <01:35.69>is
[01:37.00]I <01:37.46>will <01:37.71>be <01:38.19>brave, <01:39.62>I <01:40.10>will <01:40.34>not <01:41.01>let <01:41.63>any<01:42.73>thing
[01:43.46]Take <01:44.64>a<01:45.83>way <01:47.09>what's <01:47.31>standing <01:48.20>in <01:48.54>front <01:49.87>of <01:51.12>me
[01:52.62]Every <01:53.63>breath, <01:55.01>every <01:56.34>hour <01:56.88>has <01:57.45>come <01:58.30>to <01:58.88>this
[02:00.37]
[02:01.25]One <02:02.53>step <02:03.78>clo<02:06.45>ser
[02:07.85]
[02:09.08]I <02:09.59>have <02:09.78>died <02:10.47>every <02:11.07>day <02:11.70>waiting <02:12.92>for <02:13.50>you
[02:14.43]Darling, <02:15.04>don't <02:15.71>be <02:16.07>afraid, <02:16.94>I <02:17.92>have <02:18.19>loved <02:18.67>you
[02:19.24]For <02:19.48>a <02:19.68>thou<02:21.43>sand <02:21.92>years
[02:23.35]I'll <02:23.60>love <02:23.93>you <02:24.25>for <02:24.61>a <02:24.88>thousand <02:27.35>more
[02:29.98]And <02:30.17>all <02:30.59>along <02:31.32>I <02:31.74>believed <02:32.61>I <02:33.64>would <02:33.81>find <02:34.44>you
[02:35.26]Time <02:35.63>has <02:35.90>brought <02:36.37>your <02:36.56>heart <02:36.93>to <02:37.10>me
[02:37.81]I <02:38.80>have <02:39.07>loved <02:39.56>you <02:40.04>for <02:40.28>a <02:40.45>thou<02:42.17>sand <02:42.73>years
[02:44.12]I'll <02:44.42>love <02:44.78>you <02:45.13>for <02:45.50>a <02:45.70>thousand <02:48.14>more
[02:56.32]
[03:13.97]One <03:15.19>step <03:16.58>clo<03:19.06>ser
[03:24.30]One <03:25.53>step <03:26.73>clo<03:29.34>ser
[03:30.90]
[03:31.98]I <03:32.49>have <03:32.68>died <03:33.30>every <03:34.05>day <03:34.50>waiting <03:35.76>for <03:36.28>you
[03:37.23]Darling, <03:37.87>don't <03:38.58>be <03:39.07>afraid, <03:39.91>I <03:40.81>have <03:41.02>loved <03:41.53>you
[03:41.99]For <03:42.41>a <03:42.61>thou<03:44.26>sand <03:44.78>years
[03:46.32]I'll <03:46.48>love <03:46.78>you <03:47.11>for <03:47.50>a <03:47.71>thousand <03:50.23>more
[03:52.92]
[03:52.92]And <03:53.14>all <03:53.42>along <03:54.19>I <03:54.61>believed <03:55.49>I <03:56.42>would <03:56.64>find <03:57.16>you
[03:58.18]Time <03:58.64>has <03:58.85>brought <03:59.36>your <03:59.57>heart <03:59.95>to <04:00.22>me
[04:00.78]I <04:01.70>have <04:01.91>loved <04:02.48>you <04:02.90>for <04:03.14>a <04:03.36>thou<04:05.09>sand <04:05.57>years
[04:07.06]I'll <04:07.38>love <04:07.62>you <04:07.96>for <04:08.31>a <04:08.53>thousand <04:11.10>more
[04:13.81]...`
  },
  {
    id: 13,
    title: "Angels Like You",
    artist: "Miley Cyrus",
    cover: "Angels Like You/Angels Like You.png",
    audio: "Angels Like You/Angels Like You.mp3",
    lrc: "Angels Like You/Angels Like You.lrc",
    lrcEmbedded: `[id: ngirh7sa]
[ar: Miley Cyrus]
[al: Plastic Hearts]
[ti: Angels Like You]
[au: Miley Cyrus, Andrew Wotman, Louis Bell, Ali Tamposi & Ryan Tedder]
[length: 03:16]

[00:08.94]Flowers <00:09.56>in <00:10.02>hand, <00:10.96>waiting <00:11.48>for <00:11.98>me
[00:12.91]Eve<00:13.50>ry <00:13.96>word <00:14.70>in <00:14.96>poe<00:15.92>try
[00:16.64]Won't <00:16.93>call <00:17.19>me <00:17.44>by <00:17.94>name, <00:18.86>only <00:19.34>"Ba<00:19.86>by"
[00:20.58]The <00:20.86>more <00:21.13>that <00:21.38>you <00:21.86>give, <00:22.60>the <00:22.83>less <00:23.08>that <00:23.33>I <00:23.80>need
[00:24.26]Everyone <00:25.73>says <00:26.21>I <00:26.73>look <00:27.26>ha<00:27.81>ppy
[00:29.47]When <00:29.75>it <00:30.74>feels <00:31.75>right
[00:33.41]
[00:33.62]I <00:34.55>know <00:35.04>that <00:35.32>you're <00:35.62>wrong <00:36.09>for <00:36.36>me
[00:37.04]Gonna <00:37.06>wish <00:37.84>we <00:38.11>never <00:38.53>met <00:39.04>on <00:39.29>the <00:39.56>day <00:39.82>I <00:40.27>leave
[00:41.49]I <00:42.41>brought <00:42.74>you <00:42.99>down <00:43.44>to <00:43.97>your <00:44.25>knees
[00:44.89]'Cause <00:45.02>they <00:45.46>say <00:45.73>that <00:45.95>misery <00:46.91>loves <00:47.35>com<00:47.09>pany
[00:49.09]It's <00:49.39>not <00:49.66>your <00:49.96>fault <00:50.17>I <00:50.41>ruin <00:50.86>every<00:51.36>thing
[00:52.72]And <00:53.05>it's <00:53.33>not <00:53.62>your <00:53.88>fault <00:54.10>I <00:54.33>can't <00:54.62>be <00:54.82>what <00:55.07>you <00:55.30>need
[00:56.22]Baby, <00:57.21>angels <00:57.71>like <00:58.16>you <00:58.69>can't <00:59.19>fly <00:59.72>down <01:00.19>here <01:00.72>with <01:01.16>me
[01:02.81]I'm <01:03.14>everything <01:03.89>they <01:04.15>said <01:04.47>I <01:04.64>would <01:05.17>be
[01:06.23]
[01:08.00]La, <01:08.62>la, <01:09.06>la
[01:10.70]I'm <01:11.01>every<01:11.47>thing <01:11.76>they <01:12.04>said <01:12.28>I <01:12.53>would <01:13.01>be
[01:13.73]
[01:13.73]I'll <01:14.01>put <01:14.23>you <01:14.48>down <01:14.95>slow, <01:15.90>love <01:16.21>you, <01:16.48>good<01:16.92>bye
[01:17.69]Before <01:18.12>you <01:18.42>let <01:18.87>go, <01:19.69>just <01:19.94>one <01:20.39>more <01:20.82>time
[01:21.82]Take <01:22.09>off <01:22.36>your <01:22.79>clothes, <01:23.56>pretend <01:23.99>that <01:24.29>it's <01:24.74>fine
[01:25.48]A <01:25.77>little <01:26.27>more <01:26.73>hurt <01:27.22>won't <01:27.73>kill <01:28.01>you
[01:28.21]Tonight, <01:29.21>Mama <01:30.17>says <01:30.66>you <01:31.16>don't <01:31.66>look <01:32.14>ha<01:32.69>ppy
[01:34.58]Close <01:35.68>your <01:36.63>eyes
[01:38.35]
[01:38.49]I <01:39.52>know <01:39.97>that <01:40.29>you're <01:40.55>wrong <01:40.99>for <01:41.29>me
[01:41.97]Gonna <01:42.48>wish <01:42.77>we <01:42.97>never <01:43.47>met <01:43.93>on <01:44.22>the <01:44.45>day <01:44.72>I <01:45.13>leave
[01:46.36]I <01:47.38>brought <01:47.65>you <01:47.95>down <01:48.40>to <01:48.86>your <01:49.14>knees
[01:49.80]'Cause <01:50.10>they <01:50.37>say <01:50.64>that <01:50.85>misery <01:51.79>loves <01:52.30>compa<01:53.10>ny
[01:54.02]It's <01:54.32>not <01:54.60>your <01:54.87>fault <01:55.10>I <01:55.33>ruin <01:55.77>every<01:56.31>thing
[01:57.68]And <01:57.99>it's <01:58.26>not <01:58.49>your <01:58.76>fault <01:58.99>I <01:59.24>can't <01:59.49>be <01:59.76>what <01:59.98>you <02:00.23>need
[02:01.18]Baby, <02:02.11>angels <02:02.63>like <02:03.09>you <02:03.61>can't <02:04.11>fly <02:04.61>down <02:05.12>here <02:05.63>with <02:06.10>me
[02:07.70]I'm <02:08.03>every<02:08.50>thing <02:08.77>they <02:09.05>said <02:09.35>I <02:09.57>would <02:10.12>be
[02:11.19]
[02:33.57]I <02:34.59>know <02:35.08>that <02:35.36>you're <02:35.63>wrong <02:36.11>for <02:36.39>me
[02:37.01]Gonna <02:37.53>wish <02:37.83>we <02:38.09>never <02:38.55>met <02:39.05>on <02:39.31>the <02:39.56>day <02:39.83>I <02:40.23>leave
[02:41.44]I <02:42.44>brought <02:42.75>you <02:43.04>down <02:43.49>to <02:43.95>your <02:44.24>knees
[02:44.88]'Cause <02:45.21>they <02:45.48>say <02:45.72>that <02:45.99>misery <02:46.92>loves <02:47.37>compa<02:48.21>ny
[02:49.11]It's <02:49.41>not <02:49.66>your <02:49.89>fault <02:50.16>I <02:50.39>ruin <02:50.78>every<02:51.32>thing
[02:52.78]And <02:53.05>it's <02:53.35>not <02:53.60>your <02:53.86>fault <02:54.11>I <02:54.35>can't <02:54.60>be <02:54.85>what <02:55.08>you <02:55.31>need
[02:56.17]Baby, <02:57.21>angels <02:57.73>like <02:58.19>you <02:58.69>can't <02:59.17>fly <02:59.68>down <03:00.17>here <03:00.72>with <03:01.13>me
[03:02.61]Whoa-<03:03.37>oh
[03:04.49]
[03:05.03]Angels <03:05.63>like <03:06.15>you <03:06.65>can't <03:07.18>fly <03:07.72>down <03:08.32>here <03:08.95>with <03:09.82>me
[03:11.76]...`
  }
];

let currentSongIndex = 0;

// LocalStorage functions untuk menyimpan custom playlist
const STORAGE_KEY = "customPlaylists";

function savePlaylistsToStorage() {
  // Hanya simpan playlist yang custom (id >= 4)
  const customPlaylists = songs.slice(5);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customPlaylists));
}

function loadPlaylistsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const customPlaylists = JSON.parse(stored);
      // Tambah ke array songs
      songs.push(Starboy.mp3);
    }
  } catch (error) {
    console.error("Error loading playlists from storage:", error);
  }
}

// Song: I Don't Love You — My Chemical Romance
const LRC_PATH = "I Dont Love You/I Don't Love You_spotdown.org.mp3.lrc";


// Embedded fallback — fetch() tidak jalan saat dibuka via file://
const EMBEDDED_LRC = `
[ar: My Chemical Romance]
[ti: I Don't Love You]

[00:25.94]Well, when you go
[00:31.21]So ever think I'll make you try to stay
[00:37.67]And maybe when you get back
[00:40.52]I'll be off to find another way
[00:48.12]And after all this time that you still owe
[00:54.04]You're still a good-for-nothing, I don't know
[01:00.16]So take your gloves and get out
[01:03.77]Better get out while you can
[01:13.49]When you go
[01:17.38]And would you even turn to say
[01:23.68]"I don't love you like I did yesterday"?
[01:33.72]Sometimes I cry so hard from pleading
[01:39.82]So sick and tired of all the needless beating
[01:45.68]But baby, when they knock you down and out
[01:50.58]Is where you oughta stay
[01:56.20]And after all the blood that you still owe
[02:01.90]Another dollar's just another blow
[02:08.17]So fix your eyes and get up
[02:11.63]Better get up while you can
[02:16.56]Whoa, whoa, whoa-whoa
[02:21.02]When you go
[02:25.16]And would you even turn to say
[02:31.05]"I don't love you like I did yesterday"?
[02:40.35]Well, come on, come on
[03:06.38]When you go
[03:10.59]Would you have the guts to say
[03:16.97]"I don't love you like I loved you yesterday"?
[03:27.86]I don't love you like I loved you yesterday
[03:39.17]I don't love you like I loved you yesterday
`;

let lyrics = [];
let activeLyricIndex = -1;
let activeWordIndex = -1;
let repeatEnabled = false;
let shuffleEnabled = false;
let lrcOffset = 0;
let rafId = null;
let scrollRafId = null;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function parseTimestamp(minStr, secStr, fracStr) {
  const minutes = Number.parseInt(minStr, 10);
  const seconds = Number.parseInt(secStr, 10);
  let fraction = 0;

  if (fracStr) {
    const digits = fracStr.length;
    fraction = Number.parseInt(fracStr, 10) / Math.pow(10, digits);
  }

  return minutes * 60 + seconds + fraction;
}

function parseLrc(text) {
  const parsed = [];
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    const offsetMatch = line.match(/^\[offset:\s*(-?\d+)\]/i);
    if (offsetMatch) {
      lrcOffset = Number.parseInt(offsetMatch[1], 10) / 1000;
      continue;
    }

    const tagRegex = /\[(\d{2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
    const timestamps = [];
    let match;

    while ((match = tagRegex.exec(line)) !== null) {
      timestamps.push(parseTimestamp(match[1], match[2], match[3]));
    }

    if (!timestamps.length) continue;

    // Hanya buang tag timestamp [mm:ss.xx], tapi pertahankan token advanced LRC seperti <00:19.27>
    // agar parser kata bisa memanfaatkan timestamp per-kata yang sudah ada.
    let lyric = line.replace(/\[\d{2}:\d{2}(?:\.\d{1,3})?\]/g, "").trim();

    if (!lyric) continue;

    for (const time of timestamps) {
      parsed.push({ time: time + lrcOffset, text: lyric });
    }
  }

  parsed.sort((a, b) => a.time - b.time);
  return parsed;
}

function findActiveIndex(currentTime) {
  if (!lyrics.length) return -1;

  let lo = 0;
  let hi = lyrics.length - 1;
  let result = 0;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (lyrics[mid].time <= currentTime) {
      result = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return result;
}

function createWordEntries(lyricText, startTime, endTime) {
  // Support 2 jenis lyric:
  // 1) Normal LRC: teks tanpa token <00:..> => fallback bagi rata per kata.
  // 2) Advanced word LRC: teks berisi token <00:01.33> sebelum kata => pakai timestamp per kata.

  const raw = (lyricText || "").trim();
  if (!raw) return [];

  const tokenRe = /<\s*(\d{2}):(\d{2})(?:\.(\d{1,3}))?\s*>/g;
  const tokenMatches = [...raw.matchAll(tokenRe)];

  if (tokenMatches.length) {
    // Build segments between tokens and assign times more robustly.
    const segments = [];
    // Leading text before first token
    const firstToken = tokenMatches[0];
    if (firstToken && firstToken.index > 0) {
      segments.push({ text: raw.slice(0, firstToken.index), time: startTime, isLeading: true });
    }

    for (let i = 0; i < tokenMatches.length; i += 1) {
      const match = tokenMatches[i];
      const tokenTime = parseTimestamp(match[1], match[2], match[3]);
      const segStart = match.index + match[0].length;
      const segEnd = tokenMatches[i + 1] ? tokenMatches[i + 1].index : raw.length;
      const segText = raw.slice(segStart, segEnd);
      segments.push({ text: segText, time: tokenTime });
    }

    // Turn segments into words with reasonable timing
    const words = [];
    for (let i = 0; i < segments.length; i += 1) {
      const seg = segments[i];
      const segWords = seg.text.split(/(\s+)/).filter(Boolean).map(s => s.trim()).filter(Boolean);
      if (!segWords.length) continue;

      // Determine segment end time: next segment's time or line end
      const segEndTime = i + 1 < segments.length ? segments[i + 1].time : endTime;
      const segStartTime = Math.max(startTime, seg.time || startTime);
      const totalDuration = Math.max(0.05, segEndTime - segStartTime);
      const perWord = totalDuration / Math.max(1, segWords.length);

      segWords.forEach((w, wi) => {
        const cleaned = w.replace(/[.,!?;:()\"'\-]/g, "").trim();
        if (!cleaned) return;
        const wStart = segStartTime + perWord * wi;
        const wEnd = wi === segWords.length - 1 ? segStartTime + perWord * (wi + 1) : wStart + perWord;
        words.push({ text: cleaned, start: wStart, end: Math.max(wStart + 0.001, Math.min(endTime, wEnd)) });
      });
    }

    if (words.length) return words;
  }

  // Fallback: bagi rata per kata (normal LRC)
  const plainWords = raw.split(/(\s+)/).filter(Boolean).map((w) => w.trim()).filter(Boolean);
  if (!plainWords.length) return [];

  const duration = Math.max(0.2, (endTime - startTime) / Math.max(1, plainWords.length));
  return plainWords.map((word, index) => {
    const wordStart = startTime + duration * index;
    const wordEnd = index === plainWords.length - 1 ? endTime : wordStart + duration;
    return {
      text: word.replace(/[.,!?;:()"']/g, ""),
      start: wordStart,
      end: wordEnd
    };
  });
}

function renderLyrics(lyricData) {
  lyricsList.innerHTML = "";

  if (!lyricData.length) {
    const fallback = document.createElement("div");
    fallback.className = "lyric-line is-active";
    fallback.innerHTML = '<div class="lyric-line__words"><span class="lyrics-word is-finished">Lirik belum tersedia.</span></div>';
    lyricsList.appendChild(fallback);
    return;
  }

  const lines = [];
  lyricData.forEach((lyric, index) => {
    const lineElement = document.createElement("div");
    lineElement.className = "lyric-line";
    lineElement.dataset.index = String(index);

    const wordsContainer = document.createElement("div");
    wordsContainer.className = "lyric-line__words";

    const words = createWordEntries(lyric.text, lyric.time, lyricData[index + 1]?.time ?? lyric.time + 3.5);
    const wordElements = [];

    words.forEach((word, wordIndex) => {
      const wordElement = document.createElement("span");
      wordElement.className = "lyrics-word is-future";
      wordElement.textContent = word.text;
      wordElement.dataset.wordIndex = String(wordIndex);
      wordElements.push(wordElement);
      wordsContainer.appendChild(wordElement);
      if (wordIndex < words.length - 1) {
        wordsContainer.appendChild(document.createTextNode(" "));
      }
    });

    lineElement.appendChild(wordsContainer);
    lineElement.addEventListener("click", () => {
      audio.currentTime = lyric.time;
      if (audio.paused) audio.play().catch(() => {});
    });

    lines.push({ ...lyric, words, element: lineElement, wordElements });
    lyricsList.appendChild(lineElement);
  });

  lyrics = lines;
  activeLyricIndex = -1;
  activeWordIndex = -1;
  updateLyrics(audio.currentTime || 0);
}

function updateLineStates(index) {
  const items = lyricsList.children;
  if (!items.length) return;

  const baseOffset = 112;

  for (let i = 0; i < items.length; i += 1) {
    const distance = i - index;
    const isActive = i === index;
    const isNear = Math.abs(distance) === 1;
    const offset = distance * baseOffset;
    const opacity = isActive ? 1 : isNear ? 0.55 : Math.max(0.2, 1 - Math.abs(distance) * 0.18);
    const scale = isActive ? 1 : Math.max(0.88, 1 - Math.abs(distance) * 0.04);
    const blur = isActive ? "0px" : isNear ? "0.15px" : "0.35px";

    items[i].classList.toggle("is-active", isActive);
    items[i].classList.toggle("is-near", isNear);
    items[i].style.opacity = String(opacity);
    items[i].style.setProperty("--line-offset", `${offset}px`);
    items[i].style.transform = `translate(-50%, -50%) translateY(${offset}px) scale(${scale})`;
    items[i].style.filter = `blur(${blur})`;
  }
}

function setWordState(wordElement, state, progress) {
  if (!wordElement) return;
  wordElement.classList.remove("is-current", "is-finished", "is-future");
  wordElement.classList.add(state);
  wordElement.style.setProperty("--word-progress", String(progress));
}

function updateWordStates(lineIndex, wordIndex, currentTime) {
  const line = lyrics[lineIndex];
  if (!line || !line.wordElements?.length) return;

  const words = line.words;
  const wordElements = line.wordElements;

  const indicesToUpdate = new Set();
  if (wordIndex > 0) indicesToUpdate.add(wordIndex - 1);
  if (wordIndex >= 0) indicesToUpdate.add(wordIndex);
  if (wordIndex + 1 < words.length) indicesToUpdate.add(wordIndex + 1);

  indicesToUpdate.forEach((index) => {
    const word = words[index];
    const wordElement = wordElements[index];
    if (!word || !wordElement) return;

    if (index < wordIndex) {
      setWordState(wordElement, "is-finished", 1);
      return;
    }

    if (index === wordIndex) {
      const duration = Math.max(0.001, word.end - word.start);
      const progress = Math.max(0, Math.min(1, (currentTime - word.start) / duration));
      setWordState(wordElement, "is-current", progress);
      return;
    }

    setWordState(wordElement, "is-future", 0);
  });
}

function updateLyricsDot(index, currentTime) {
  const items = lyricsList.children;
  if (!items.length || index < 0 || !lyricsDot) return;

  const activeEl = items[index];
  const viewport = document.querySelector(".lyrics-viewport");
  if (!activeEl || !viewport) return;

  const lineStart = lyrics[index].time;
  const lineEnd = lyrics[index + 1]?.time ?? lineStart + 5;
  const lineProgress = Math.min(1, Math.max(0, (currentTime - lineStart) / (lineEnd - lineStart)));

  const viewportRect = viewport.getBoundingClientRect();
  const lineRect = activeEl.getBoundingClientRect();
  const dotTop = lineRect.top - viewportRect.top + lineRect.height * lineProgress;

  lyricsDot.style.top = `${dotTop}px`;
}

function updateLyrics(currentTime) {
  if (!lyrics.length) return;

  const nextIndex = findActiveIndex(currentTime);
  const line = lyrics[nextIndex];
  const nextWordIndex = line?.words?.length ? line.words.findIndex((word) => currentTime < word.end) : -1;
  const resolvedWordIndex = nextWordIndex >= 0 ? nextWordIndex : Math.max(0, (line?.words?.length || 1) - 1);

  // selaraskan activeLine & word state
  if (nextIndex !== activeLyricIndex) {
    activeLyricIndex = nextIndex;
    updateLineStates(activeLyricIndex);
    updateLyricsDot(activeLyricIndex, currentTime);
  }

  if (resolvedWordIndex !== activeWordIndex || nextIndex !== activeLyricIndex) {
    activeWordIndex = resolvedWordIndex;
    updateWordStates(activeLyricIndex, activeWordIndex, currentTime);
  } else {
    updateWordStates(activeLyricIndex, activeWordIndex, currentTime);
  }

}

function updateVolumeUI(value) {
  const pct = value * 100;
  const gradient = `linear-gradient(90deg, var(--accent) ${pct}%, rgba(255,255,255,0.2) ${pct}%)`;
  volumeSlider.style.background = gradient;
  bottomVolumeSlider.style.background = gradient;
}

function syncPlaybackUI() {
  const current = audio.currentTime;
  const duration = audio.duration || 0;
  const percent = duration ? (current / duration) * 100 : 0;

  progressBar.max = String(duration || 100);
  progressBar.value = String(current);
  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(duration);
  bottomCurrentTime.textContent = formatTime(current);
  bottomDuration.textContent = formatTime(duration);
  bottomProgressFill.style.width = `${percent}%`;

  progressBar.style.background = `linear-gradient(90deg, var(--accent) ${percent}%, rgba(255,255,255,0.2) ${percent}%)`;
  updateLyrics(current);
}

function togglePlayback() {
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

function seekBy(delta) {
  audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + delta));
}

function jumpToRandomTime() {
  if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
  const max = Math.max(10, audio.duration - 15);
  audio.currentTime = Math.min(Math.random() * max + 5, audio.duration - 1);
}

function toggleRepeat() {
  repeatEnabled = !repeatEnabled;
  repeatButtons.forEach((btn) => btn.classList.toggle("active", repeatEnabled));
}

function toggleShuffle() {
  shuffleEnabled = !shuffleEnabled;
  shuffleButtons.forEach((btn) => btn.classList.toggle("active", shuffleEnabled));
}

function setPlayState(isPlaying) {
  playerShell.classList.toggle("is-playing", isPlaying);
  playToggles.forEach((btn) => btn.classList.toggle("is-playing", isPlaying));
}

function startRenderLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  const tick = () => {
    syncPlaybackUI();
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
}

function stopRenderLoop() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

async function loadLyrics(songIndex = currentSongIndex) {
  const song = songs[songIndex];

  let text = song.lrcEmbedded;
  const candidatePaths = [];

  const normalizedLrc = typeof song?.lrc === "string" ? song.lrc.trim() : "";
  if (normalizedLrc && normalizedLrc !== "-" && normalizedLrc !== "- ") {
    candidatePaths.push(normalizedLrc.replace(/\\/g, "/"));
  }

  if (typeof song?.audio === "string" && song.audio.trim()) {
    candidatePaths.push(`${song.audio}.lrc`.replace(/\\/g, "/"));
  }

  if (location.protocol !== "file:") {
    for (const lrcPath of Array.from(new Set(candidatePaths))) {
      try {
        const response = await fetch(encodeURI(lrcPath), { cache: "no-store" });
        if (response.ok) {
          text = await response.text();
          break;
        }
      } catch {
        // coba path berikutnya
      }
    }
  }

  lrcOffset = 0;
  lyrics = parseLrc(text);
  renderLyrics(lyrics);
  syncPlaybackUI();
}

function getRandomSongIndex(excludeIndex) {
  if (!songs.length) return 0;
  if (songs.length === 1) return 0;

  let idx = Math.floor(Math.random() * songs.length);
  if (excludeIndex !== undefined && idx === excludeIndex) {
    idx = (idx + 1) % songs.length;
  }
  return idx;
}

function loadSong(index, options = {}) {
  if (index < 0 || index >= songs.length) return;

  if (index === currentSongIndex && !options.force) return;

  currentSongIndex = index;
  const song = songs[index];

  document.querySelectorAll(".playlist-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  document.querySelector(".track-title").textContent = song.title;
  document.querySelector(".track-artist").textContent = song.artist;
  document.querySelector(".cover-art").src = song.cover;
  document.querySelector(".cover-art").alt = song.title;

  document.querySelector(".bottom-title").textContent = song.title;
  document.querySelector(".bottom-artist").textContent = song.artist;
  document.querySelector(".bottom-thumb").src = song.cover;

  audio.pause();
  audio.currentTime = 0;
  audio.src = song.audio;
  audio.load();
  loadLyrics(index);

  if (options.autoplay) {
    audio.play().catch(() => {});
  }
}

progressBar.addEventListener("input", () => {
  audio.currentTime = Number(progressBar.value);
  syncPlaybackUI();
});

if (bottomProgressBg) {
  bottomProgressBg.addEventListener("click", (e) => {
    const rect = bottomProgressBg.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = ratio * audio.duration;
      syncPlaybackUI();
    }
  });
}

function handleVolumeChange(e) {
  const val = Number(e.target.value);
  audio.volume = val;
  volumeSlider.value = String(val);
  bottomVolumeSlider.value = String(val);
  updateVolumeUI(val);
}

volumeSlider.addEventListener("input", handleVolumeChange);
bottomVolumeSlider.addEventListener("input", handleVolumeChange);

playToggles.forEach((btn) => btn.addEventListener("click", togglePlayback));

function playPrevSong() {
  if (shuffleEnabled) {
    const nextIndex = getRandomSongIndex(currentSongIndex);
    loadSong(nextIndex, { autoplay: true, force: true });
    return;
  }

  const nextIndex = currentSongIndex - 1;
  if (nextIndex < 0) {
    setPlayState(false);
    return;
  }

  loadSong(nextIndex, { autoplay: true, force: true });
}

function playNextSong() {
  if (shuffleEnabled) {
    const nextIndex = getRandomSongIndex(currentSongIndex);
    loadSong(nextIndex, { autoplay: true, force: true });
    return;
  }

  const nextIndex = currentSongIndex + 1;
  if (nextIndex >= songs.length) {
    setPlayState(false);
    return;
  }

  loadSong(nextIndex, { autoplay: true, force: true });
}

prevButtons.forEach((btn) => btn.addEventListener("click", playPrevSong));
nextButtons.forEach((btn) => btn.addEventListener("click", playNextSong));

shuffleButtons.forEach((btn) => btn.addEventListener("click", toggleShuffle));
repeatButtons.forEach((btn) => btn.addEventListener("click", toggleRepeat));

// Function to render custom playlist buttons
function renderCustomPlaylistButtons() {
  // Get custom playlists (id >= 4)
  const customPlaylists = songs.slice(4);
  const playlistContainer = document.querySelector(".sidebar-playlists");

  // Remove existing custom buttons
  const customButtons = playlistContainer.querySelectorAll('[data-song-index]');
  customButtons.forEach((btn, index) => {
    if (index >= 4) btn.remove();
  });

  // Create buttons for each custom playlist
  customPlaylists.forEach((song) => {
    const newButton = document.createElement("button");
    newButton.className = "playlist-item";
    newButton.dataset.songIndex = String(song.id);

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("width", "16");
    icon.setAttribute("height", "16");
    icon.setAttribute("fill", "currentColor");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z");
    icon.appendChild(path);

    const text = document.createTextNode(song.title);
    newButton.appendChild(icon);
    newButton.appendChild(text);

    playlistContainer.appendChild(newButton);

    // Add click handler
    newButton.addEventListener("click", () => {
      const index = parseInt(newButton.dataset.songIndex, 10);
      loadSong(index);
    });
  });
}

// Playlist items click handler
document.querySelectorAll(".playlist-item").forEach((item) => {
  item.addEventListener("click", () => {
    const index = parseInt(item.dataset.songIndex, 10);
    loadSong(index);
  });
});

const favoriteTab = document.querySelector('.favorite-tab');
if (favoriteTab) {
  favoriteTab.addEventListener('click', () => {
    favoriteTab.textContent = "My Favorit? Click after click it Shows (It's You)";
    favoriteTab.classList.add('favorite-clicked');
  });
}

function addPlaylistItem(title, artist = "Unknown") {
  const newId = songs.length;
  const newSong = {
    id: newId,
    title: title,
    artist: artist,
    cover: "coverlagu.jpg",
    audio: `${title}/${title}.mp3`,
    lrc: `${title}/${title}.lrc`,
    lrcEmbedded: `[ar: ${artist}]
[ti: ${title}]
[00:00.00]Lirik belum tersedia`
  };

  songs.push(newSong);

  // Save to localStorage
  savePlaylistsToStorage();

  // Re-render all custom buttons
  renderCustomPlaylistButtons();
}

audio.addEventListener("loadedmetadata", () => {
  syncPlaybackUI();
  startRenderLoop();
});

audio.addEventListener("play", () => setPlayState(true));
audio.addEventListener("pause", () => setPlayState(false));

function playNextSongByEnd() {
  if (repeatEnabled) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
    return;
  }

  if (shuffleEnabled) {
    const nextIndex = getRandomSongIndex(currentSongIndex);
    loadSong(nextIndex, { autoplay: true });
    return;
  }

  const nextIndex = currentSongIndex + 1;
  if (nextIndex >= songs.length) {
    setPlayState(false);
    return;
  }

  loadSong(nextIndex, { autoplay: true });
}

audio.addEventListener("ended", () => {
  playNextSongByEnd();
});

window.addEventListener("load", () => {
  loadPlaylistsFromStorage();
  renderCustomPlaylistButtons();

  const vol = audio.volume || 0.8;
  volumeSlider.value = String(vol);
  bottomVolumeSlider.value = String(vol);
  updateVolumeUI(vol);
  setPlayState(false);
  loadLyrics();

  const mainPanel = document.querySelector('.main-panel');
  const lyricsPanel = document.querySelector('.lyrics-panel');
  const favoritePanel = document.querySelector('.favorite-panel');
  const tabButtons = document.querySelectorAll('.nav-item');
  const favoriteTabButton = document.querySelector('.favorite-tab');

  function showTab(tabName) {
    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.nav === tabName;
      btn.classList.toggle('active', isActive);
    });

    const isFavorite = tabName === 'favorit';
    if (mainPanel) mainPanel.classList.toggle('hidden', isFavorite);
    if (lyricsPanel) lyricsPanel.classList.toggle('hidden', isFavorite);
    if (favoritePanel) favoritePanel.classList.toggle('hidden', !isFavorite);

    if (favoriteTabButton) {
      favoriteTabButton.textContent = isFavorite
        ? "My Favorit? Click after click it Shows (It's You)"
        : 'Favorit';
    }
  }

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const navName = button.dataset.nav;
      if (navName) showTab(navName);
    });
  });

  showTab('now-playing');

  // Handle "Tambah Playlist" button with modal dialog
  const addPlaylistBtn = document.querySelector(".add-playlist-btn");
  const modal = document.getElementById("addPlaylistModal");
  const songNameInput = document.getElementById("songNameInput");
  const artistNameInput = document.getElementById("artistNameInput");
  const submitBtn = document.getElementById("submitBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  if (addPlaylistBtn && modal) {
    addPlaylistBtn.addEventListener("click", () => {
      songNameInput.value = "";
      artistNameInput.value = "";
      modal.classList.remove("hidden");
      setTimeout(() => songNameInput.focus(), 100);
    });

    submitBtn.addEventListener("click", () => {
      const songName = songNameInput.value.trim();
      if (songName) {
        const artistName = artistNameInput.value.trim() || "Unknown";
        addPlaylistItem(songName, artistName);
        modal.classList.add("hidden");
      } else {
        alert("Masukkan nama lagu!");
      }
    });

    cancelBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    // Close modal when clicking on backdrop
    const backdrop = modal.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    }

    // Allow Enter key to submit
    songNameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") submitBtn.click();
    });

    artistNameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") submitBtn.click();
    });
  }
});

window.addEventListener("beforeunload", stopRenderLoop);

