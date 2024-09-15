class StorageUtil {
    static save<T>(key: string, data: T): void {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
        } catch (error) {
            console.error('Could not save data', error);
        }
    }

    // Load data from localStorage
    static load<T>(key: string): T | null {
        try {
            const serializedData = localStorage.getItem(key);
            if (serializedData === null) {
                return null;
            }
            return JSON.parse(serializedData) as T;
        } catch (error) {
            console.error('Could not load data', error);
            return null;
        }
    }

    // Remove data from localStorage
    static remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Could not remove data', error);
        }
    }
}

export default StorageUtil;