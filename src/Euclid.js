export default class Euclid {
    // euclidean rhythm generator 
    constructor (offset, hits, length) {
        this.count = 0;
        this._offset= offset;
        this._hits = hits;
        this._length = length;
        this.beat = false;
    }
        // update beat attribute to true on a beat, advance current count of module
        bang () {
            let currentCount = this.count;
            this.count++;
            this.count %= this._length
            currentCount += this._offset;
            currentCount *= this._hits;
            currentCount = currentCount % this._length;
            if (currentCount < this._hits){
                this.beat = true;
            } else {
                this.beat = false;
            }
        }
        // set methods to update hits and lenght on the fly 
        set hits(newHits) {
            this._hits = newHits;
        }
        set length(newLength) {
            this._length = newLength;
        }
        set offset(newOffset) {
            this._offset = newOffset;
        }

        get length() {
            return this._length
        }
}