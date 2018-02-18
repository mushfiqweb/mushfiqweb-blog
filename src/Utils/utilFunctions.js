
export const getRandomColor = (currentColor) => {
    let color = 'blue';
    var seconds = 10000 * Math.random();

    seconds = seconds.toFixed(2) * 100 * new Date().getSeconds();
    console.log(seconds);
    if (seconds % 121 === 0 && currentColor != 'orange' && currentColor != 'teal') {
        color = 'orange';
    }
    else if (seconds % 7 === 0 && currentColor != 'teal') {
        color = 'violet';
    }
    else if (seconds % 8 === 0 && currentColor != 'teal') {
        color = 'teal';
    }
    else if (seconds % 9 === 0 && currentColor != 'violet') {
        color = 'brown';
    }
    else if (seconds % 6 === 0 && currentColor != 'green') {
        color = 'green';
    }
    else if (seconds % 4 === 0 && currentColor != 'violet') {
        color = 'red';
    }
    else if (seconds % 3 === 0 && currentColor != 'purple') {
        color = 'purple';
    }
    else if (seconds % 2 === 0 && currentColor != 'orange') {
        color = 'grey';
    }

    return color;
}

