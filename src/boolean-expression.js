
	var cid = require('./cid');

	// 运算符 运算函数
	var cps = {
		'==': function(l, r){
			return l == r;
		},
		'!=': function(l, r){
			return l != r;
		},
		'>': function(l, r){
			return l > r;
		},
		'>=': function(l, r){
			return l >= r;
		},
		'<': function(l, r){
			return l < r;
		},
		'<=': function(l, r){
			return l <= r;
		}
	};

	// 实例缓存
	var incs = cid.incs;

	// 布尔表达式原型
	var BOOLEAN_REG = /\s*(([^\s]+)\s*((?:\=\=)|(?:\!\=)|(?:\>\=)|(?:\>)|(?:\<\=)|(?:\<))\s*([^\s]+))\s*/g;
	function BooleanExpression(expression, not){
		// TODO:
		// 其实这里可能会返回 LogicExpression 的实例（因为共享一套底层逻辑）
		if(cid.isCid(expression)){
			return incs[expression];
		}

		var rst;

		BOOLEAN_REG.lastIndex = 0;
		rst = BOOLEAN_REG.exec(expression);

		if(rst && rst.length == 5){
			this.expression = rst[1];
			this.l = rst[2];
			this.cp = rst[3];
			this.r = rst[4];
			this.fn = cps[rst[3]];
			this.not = !!not;

			// stamp
			this.cid = cid(this);
		} else {
			throw new Error('expression ' + expression + ' is invalit!');
		}
	}

	// 运行结果，支持左值解析
	BooleanExpression.prototype.run = function(fn){
		var rst = this.fn(getRunL(this.l, fn), getRunR(this.r));

		return this.not ? !rst : rst;
	};

	// 获取字符串别名（方便替换）
	BooleanExpression.prototype.getAlias = function(){
		return this.cid;
	};

	// 格式化表达式
	BooleanExpression.prototype.toString = function(){
		return [(this.not ? '!' : '') + this.l, this.cp, this.r].join(' ');
	};

	
	module.exports = BooleanExpression;

	//----------helper
	function isFunction(val) {
		return Object.prototype.toString.call(val) === '[object Function]';
	}

	function getRunL(l, fn){
		var runL;

		// 确定运行时的 left 值
		if(!fn){
			runL = l;
		} else if(isFunction(fn)){
			runL = fn(l);
		} else {
			runL = fn[l];
		}

		return runL;
	}

	var QUOTE_REG = /^(['"])(.+)(\1)$/;
	function getRunR(r){
		var runR = parseInt(r, 10);

		// 确定运行时的 right 值
		// 如果不是数字就是字符串
		if(isNaN(runR)){
			runR = r.replace(QUOTE_REG, function(){
				return arguments[2];
			});
		}

		return runR;
	}
