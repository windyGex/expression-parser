
	// 前缀处理
	var perfix = '_______whousewhobb';
	var incs = {};
	var cid = (function(){
		var c = 0;

		return function(inc){
			var id = perfix + c++;

			if(inc){
				cid.incs[id] = inc
			}

			return id;
		};
	})();
	cid.isCid = function(cid){
		return cid && cid.indexOf(perfix) != -1;
	};
	cid.incs = incs;

	
	module.exports = cid;
