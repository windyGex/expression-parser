
	var BooleanExpression = require('./boolean-expression');
	var cid = require('./cid');

	// 逻辑符 运算函数
	var lps = {
		'&&': function(l, r){
			return l && r;
		},
		'||': function(l, r){
			return l || r;
		}
	};

	var isLE = function(val){
		return val instanceof LogicExpression;
	};

	// 实例缓存
	var incs = cid.incs;

	// 逻辑表达式原型
	// 由上层保证传入的肯定是 LogicExpression 或者 BooleanExpression
	function LogicExpression(l, r, lp){
		if(arguments.length == 3 || arguments.length == 4){
			//this.expression = rst[1];
			this.l = cid.isCid(l) ? incs[l] : new BooleanExpression(l);
			this.r = cid.isCid(r) ? incs[r] : new BooleanExpression(r);
			this.lp = lp;
			this.fn = lps[lp];
			this.not = false;

			// stamp
			this.cid = cid(this);
		} else {
			throw new Error('LogicExpression ' + [l, lp, r].join(' ') + ' input is invalit!');
		}
	}

	// 获取运行结果，支持左值解析
	LogicExpression.prototype.run = function(fn){
		var rst = this.fn(this.l.run(fn), this.r.run(fn));

		return this.not ? !rst : rst;
	};

	// 格式化表达式
	LogicExpression.prototype.toString = function(){
		var strL = this.l.toString();
		var strR = this.r.toString();

		// 右值需要增加括号，左值按优先级不需要
		if(isLE(this.r)){
			strR = '(' + strR + ')';
		}

		return [strL, this.lp, strR].join(' ');
	};

	// 获取 cid
	LogicExpression.prototype.getCid = function(){
		return this.cid;
	};

	// 获取字符串别名（方便替换）
	LogicExpression.prototype.getAlias = function(){
		return this.cid;
	};

	
	module.exports = LogicExpression;
