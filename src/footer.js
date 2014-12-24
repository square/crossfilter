}
if(typeof define === "function" && define.amd) {
	define(_crossfilter);
}else if (typeof module === "object" && module.exports)
	module.exports = _crossfilter;
}else{
	window.crossfilter=_crossfilter;
}
})();

