class HashMap{
    constructor(loadFactor = 0.75, capacity= 16){
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.size = 0;

        this.buckets = new Array(capacity).fill(null).map(() => []);
    }

    hash(key) {
        let hashCode = 0;
        const prime = 31;

        for(let i = 0; i < key.length; i++) {
            hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index]

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        for(let pair of bucket) {
            if(pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let pair of bucket) {
            if(pair[0] === key) return pair[1];
        }

        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key){
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    resize() {
        const oldBuckets = this.buckets;

        this.capacity*=2;
        this.buckets = new Array(this.capactiy).fill(null).map(() => []);

        this.size = 0;

        for(let bucket of oldBuckets) {
            for(let [k, v] of bucket) {
                this.set(k, v);
            }
        }
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        return this.entries().map(e => e[0]);
    }

    values() {
        return this.entries().map(e => e[1]);
    }

    entries() {
        const result = [];

        for(let bucket of this.buckets){
            for(let pair of bucket) {
                result.push(pair);
            }
        }
        return result
    }

}