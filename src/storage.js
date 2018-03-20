const storage = (context) => ({
    fetch() {
        const cache = window.localStorage.getItem('history');
        if (!cache) return [];
        return JSON.parse(cache);
    },
    save(data) {
        window.localStorage.setItem('history', JSON.stringify(data));
    },
    clear() {
        window.localStorage.setItem('history', null);
    },
});


export default storage;