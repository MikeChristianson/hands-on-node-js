var b = new Buffer(100);

for(var i = 0; i < b.length; i++) {
  b[i] = i;
}

console.log(b);

var bs = new Buffer(20);

b.copy(bs, 0, 40, 60);

console.log(bs);

