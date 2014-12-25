function ArrayView(ar, start, end) {
  this.length = end - start;  
  for(var i = 0; i < this.length; i++) {
    Object.defineProperty(this, i, {
      enumerable :true,
      get: (function(idx){return function(){return ar[idx];};})(i + start),
      set: (function(idx){return function(val){ar[idx] = val;};})(i + start)
    });  
  } 
}
ArrayView.prototype = Array.prototype;
ArrayView.test = function() {
    var res = [];
    var ar = [5,10,15,20,30,40];
    var viewAr = new ArrayView(ar, 1, 5);
    res.push(eqArray(viewAr, [10,15,20,30]));
    viewAr[0]++;
    viewAr[1]++;
    res.push(eqArray([11,16], [viewAr[0], viewAr[1]]));
    res.push(eqArray([11,16], [ar[1], ar[2]]));
    res.push(eqArray([20,30], viewAr.slice(2)));
    res.push(eqArray([11,16], viewAr.splice(0,2,4,8)));	     
    res.push(eqArray([4,8,20,30], viewAr));
    res.push(eqArray([4,8,20,30], ar.slice(1, 5)));
    return res.every(identity);

    function eqArray(ar1, ar2) {
	if(ar1.length !== ar2.length)
	    return false;
	for(var i = 0; i < ar1.length; i++)
	    if(ar1[i] !== ar2[i])
		return false;
	return true;
    }
    function identity(x){return x;}
}




