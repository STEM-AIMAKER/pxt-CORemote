# pxt-mremote ![Build status badge](https://github.com/stem-hanshin/pxt-mremote/workflows/MakeCode/badge.svg)

## Usage

### Basic data type

``Shake``,shake or not.
```
enum Shake{OFF,ON}
```

``mMusic``, we provide some music options in advance, and use the function ``PlayMusic`` to play these musics.
```
enum mMusic{some musics...}
```

``Buttonstate``, indicating the button status.
```
enum Buttonstate{Press,Release}
```

``Button``, some known buttons.
```
enum Button{k1,k2,k3 and k4}
```

### Get button state
Use the getbutton() function to get the status of the specified button with argument num of type Button and value of type ButtonState and return a boolean value.
```
CORemote.GetButton(num,value)
```

### Rocker's Operation
Use the function Rocker() with argument value of type mRocker to operate the rocker
```
CORemote.Rocker(value)
```

### Remote control of shake
Use the function Remote_Shake() with argument value of type Shake to control shake remotely.
```
CORemote.Remote_Shake(value)
```

### Play music
Use the function PlayMusic() with argument index of type mMusic to play music.
```
CORemote.PlayMusic(index)
```

## Link
If some errors occurred, you will need to search for it using the full Github repo URL. eg: https://github.com/stem-hanshin/pxt-CORemote

## License
MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)


