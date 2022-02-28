const f = () => new Promise((resolve, reject) => {
    const err = false;
    if (err) {
        reject('Error');
    } else {
        resolve('Value');
    }
});

const p = f();

p.then( v => console.log(v)).catch(e => console.error(e));

