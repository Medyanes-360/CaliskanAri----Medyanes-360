const getTurkeyTime = async ()=>{
    const now = new Date();
    const options = { timeZone: 'Europe/Istanbul', hour12: false };
    const timeString = now.toLocaleTimeString('tr-TR', options);
    const dateString = now.toLocaleDateString('tr-TR');
    return {
        time: timeString,
        date: dateString,
    };
}

export default getTurkeyTime;

