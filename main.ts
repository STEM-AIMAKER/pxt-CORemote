// % weight=10 color=#1E90FF icon="\uf136"
// block="HANSHIN STEM CORemote"
namespace CORemote {
    let serialInited = 0

    export enum Shake{
        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="ON" block="ON"
        ON = 1
    }
    
    export enum mMusic {
        Dadadum = 0,
        Entertainer,
        Prelude,
        Ode,
        Nyan,
        Ringtone,
        Funk,
        Blues,

        Birthday,
        Wedding,
        Funereal,
        Punchline,
        Baddy,
        Chase,
        Ba_ding,
        Wawawawaa,
        Jump_up,
        Jump_down,
        Power_up,
        Power_down
    }
    export enum ButtonState {
        //% blockId="Press" block="Press"
        Press = 0,
        //% blockId="Release" block="Release"
        Realse = 1
    }
    export enum Button {
        //% blockId="K1" block="K1"
        K1 = 0,
        //% blockId="K2" block="K2"
        K2 = 1,
        //% blockId="K3" block="K3"
        K3 = 2,
        //% blockId="K4" block="K4"
        K4 = 3,
    }
    export enum mRocker {
        //% blockId="NoState" block="NoState"
        NoState = 0,
        //% blockId="Pressed" block="Pressed"
        Pressed = 1,
        //% blockId="Up" block="Up"
        Up = 2,
        //% blockId="Down" block="Down"
        Down = 3,
        //% blockId="Left" block="Left"
        Left = 4,
        //% blockId="Right" block="Right"
        Right = 5
    }

function initSerial(): void {
        if (0 == serialInited) {
            serial.redirect(
                SerialPin.P12,
                SerialPin.P14,
                BaudRate.BaudRate9600
            );
            serialInited = 1;
        }
    }


function i2cwrite(addr: number, reg: number, value: number) {
    let buf = pins.createBuffer(2);
    buf[0] = reg;
    buf[1] = value;
    pins.i2cWriteBuffer(addr, buf);
}

function i2ccmd(addr: number, value: number) {
    let buf2 = pins.createBuffer(1);
    buf2[0] = value;
    pins.i2cWriteBuffer(addr, buf2);
}

function i2cread(addr: number, reg: number) {
    pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
    let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
    return val;
}

// function setFreq(freq: number): void {
//     // Constrain the frequency
//     let prescaleval = 25000000;
//     prescaleval /= 4096;
//     prescaleval /= freq;
//     prescaleval -= 1;
//     let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
//     let oldmode = i2cread(PCA9685_ADD, MODE1);
//     let newmode = (oldmode & 0x7F) | 0x10; // sleep
//     i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
//     i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
//     i2cwrite(PCA9685_ADD, MODE1, oldmode);
//     control.waitMicros(5000);
//     i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
// }

// function setPwm(channel: number, on: number, off: number): void {
//     if (channel < 0 || channel > 15)
//         return;
//     if (!initialized) {
//         initPCA9685();
//     }
//     let buf = pins.createBuffer(5);
//     buf[0] = LED0_ON_L + 4 * channel;
//     buf[1] = on & 0xff;
//     buf[2] = (on >> 8) & 0xff;
//     buf[3] = off & 0xff;
//     buf[4] = (off >> 8) & 0xff;
//     pins.i2cWriteBuffer(PCA9685_ADD, buf);
// }


//% blockId=GetButton block="Button|key %num|value %value"
//% weight=96
//% blockGap=10
//% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
export function GetButton(num: Button, value: ButtonState): boolean {
    let temp = false;
    switch (num) {
        case Button.K1: {
            pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
            if (pins.digitalReadPin(DigitalPin.P13) == value) {
                temp = true;
            }
            else {
                temp = false;
            }
            break;
        }
        case Button.K2: {
            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
            if (pins.digitalReadPin(DigitalPin.P14) == value) {
                temp = true;
            }
            else {
                temp = false;
            }
            break;
        }
        case Button.K3: {
            pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
            if (pins.digitalReadPin(DigitalPin.P15) == value) {
                temp = true;
            }
            else {
                temp = false;
            }
            break;
        }
        case Button.K4: {
            pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
            if (pins.digitalReadPin(DigitalPin.P16) == value) {
                temp = true;
            }
            else {
                temp = false;
            }
            break;
        }
    }
    return temp;
}
    //% blockId="onButtonPressed" block="On remote button pressed  $btn"
    //% weight=96
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function onButtonPressed(btn: Button, handler: () => void) {
}
    //% blockId=Rocker block="Rocker|value %value"
    //% weight=96
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Rocker(value: mRocker): boolean {
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
        let x = pins.analogReadPin(AnalogPin.P1);
        let y = pins.analogReadPin(AnalogPin.P2);
        let z = pins.digitalReadPin(DigitalPin.P8);
        let now_state = mRocker.NoState;

        if (x < 200) // 上
        {

            now_state = mRocker.Up;

        }
        else if (x > 900) //下
        {

            now_state = mRocker.Down;
        }
        else  // 左右
        {
            if (y < 200) //右
            {
                now_state = mRocker.Right;
            }
            else if (y > 900) //左
            {
                now_state = mRocker.Left;
            }
        }
        if (z == 0)
            now_state = mRocker.Pressed;
        if (now_state == value)
            return true;
        else
            return false;

    }

    //% blockId=Remote_Shake block="Remote Shake|value %value"
    //% weight=96
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function Remote_Shake(value: Shake): void {
        switch (value) {
            case Shake.ON: {
                //setPwm(0, 0, 4095);
                break;
            }
            case Shake.OFF: {
                //setPwm(0, 0, 0);
                break;
            }
        }
    }

    //% blockId=PlayMusic block="PlayMusic|%index"
    //% weight=96
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function PlayMusic(index: mMusic): void {
        switch (index) {
            case mMusic.Dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case mMusic.Birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case mMusic.Entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case mMusic.Prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case mMusic.Ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case mMusic.Nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case mMusic.Ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case mMusic.Funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case mMusic.Blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case mMusic.Wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case mMusic.Funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case mMusic.Punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case mMusic.Baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case mMusic.Chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case mMusic.Ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case mMusic.Wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case mMusic.Jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case mMusic.Jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case mMusic.Power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case mMusic.Power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
}
