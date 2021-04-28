export default function Time(seconds) {
    let h = parseInt(seconds / 3600, 10);
    seconds -= h * 3600;
    let m = parseInt(seconds / 60, 10);
    seconds -= m * 60;
    let s = seconds;
  
    h = Format(h);
    m = Format(m);
    s = Format(s);
    return `${h}:${m}:${s}`;
}
function Format(a) {
    return +a < 10 ? "0" + a : a;
}
  