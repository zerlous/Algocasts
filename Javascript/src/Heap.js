function Heap(getValue) {
  this.elements = [];
  this.getValue = getValue || function(x) { return x; }
}

Heap.prototype.insert = function(element) {
  var index = this.elements.length;
  this.elements.push(element);
  this.bubbleUp(index);
}

Heap.prototype.bubbleUp = function(index) {
  while (index > 0) {
    var element = this.elements[index];
    var parentIndex = index & 1 ? (index-1)/2 : (index-2)/2;
    var parentElement = this.elements[parentIndex];

    var a = this.getValue(parentElement);
    var b = this.getValue(element);

    if (b > a) {
      this.elements[index] = parentElement;
      this.elements[parentIndex] = element;
      index = parentIndex;
    } else {
      break;
    }
  }
}

Heap.prototype.bubbleDown = function(index) {
  var len = this.elements.length;
  while (index < len) {
    var element = this.elements[index];
    var v = this.getValue(element);
    var li = index*2+1;
    var ri = index*2+2;

    if (li >= len && ri >= len) {
      return;
    }

    var lc = this.elements[li];
    var rc = this.elements[ri];

    var lv = lc != null ? this.getValue(lc) : -Infinity;
    var rv = rc != null ? this.getValue(rc) : -Infinity;

    if (lv >= rv) {
      if (lv > v) {
        this.elements[index] = lc;
        this.elements[li] = element;
        index = li;
        continue;
      }
      break;
    } else {
      if (rv > v) {
        this.elements[index] = rc;
        this.elements[ri] = element;
        index = ri;
        continue;
      } 
      break;
    }
  }
}

Heap.prototype.remove = function(obj) {
  var index = this.elements.indexOf(obj);
  if (index === -1) { return; }
  if (index === this.elements.length - 1) {
    this.elements.pop();
    return;
  }
  var element = this.elements.pop();
  this.elements[index] = element;
  var v = this.getValue(element);

  // decide to bubbleUp or bubbleDown
  var pi = index & 1 ? (index-1)/2 : (index-2)/2;

  if (pi > 0 && this.getValue(this.elements[pi]) < v) {
    this.bubbleUp(index);
    return;
  }
  
  this.bubbleDown(index);
}

Heap.prototype.peek = function() {
    return this.elements[0];
}

Heap.prototype.extract = function() {
  var res = this.elements[0];
  var element = this.elements.pop();
  if (this.elements.length === 0) {
    return;
  }
  this.elements[0] = element;
  this.bubbleDown(0);
  return res;
}

module.exports = Heap;
