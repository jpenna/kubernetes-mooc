// AI generated code

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
let randomString = '';
for (let i = 0; i < 10; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
}


export function print() {
    const now = new Date();
    const str = `${now.toISOString()}: ${randomString}`;
    console.log(str);
    return str;
}

print();
setInterval(print, 5000);
