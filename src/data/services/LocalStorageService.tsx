export default class LocalStorageService {
    static saveToLocalStorage(key: string, data: string): string | null {
        try {
            localStorage.setItem(key, data);
            return data;
        } catch (err) {
            console.log('could not save to local storage');
            return null;
        }
    }

    static loadFromLocalStorage(key: string): string | null {
        try {
            return localStorage.getItem(key);
        } catch (err) {
            console.log('could not read from local storage');
            return null;
        }
    }
}