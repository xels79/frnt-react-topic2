export default function Declension({num, declension}:{
    num:number,
    declension:string[]
}){
    num = Math.abs(num) % 100; 
    const n1 = num % 10;
    if (num > 10 && num < 20) { return declension[2] }
    if (n1 > 1 && n1 < 5) { return declension[1]; }
    if (n1 == 1) { return declension[0]; }
    return declension[2];
}