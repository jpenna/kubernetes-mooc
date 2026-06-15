// AI generated code

    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }


function print() {
    const now = new Date();
    console.log(`${now.toISOString()}: ${randomString}`);
}

print();
setInterval(print, 5000);
