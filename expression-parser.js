
	var LogicExpression = require('./src/logic-expression');
	var BooleanExpression = require('./src/boolean-expression');

	// 解析逻辑表达式
	var LOGIC_REG = /\s*((?:\&\&)|(?:\|\|))\s*/g;
	var parseLogicExpression = function(expression, not){
		// 解析并分割
		var rst = expression.split(LOGIC_REG);

		// 如果是 boolean 表达式，就直接断路
		if(rst.length == 1){
			// TODO: 这里的判断太简单了
			return new BooleanExpression(rst[0], not);
		}

		if(rst.length < 3 || rst.length % 2 == 0){
			throw new Error('expression: ' + expression + ' is invalit!');
		}

		var lexp;
		var l = rst[0];
		for(var i = 1, ln = rst.length; i < ln; i = i + 2){
			lexp = new LogicExpression(l, rst[i+1], rst[i], not);
			l = lexp.getAlias();
		}

		return lexp;
	};

	// 分割带括号的逻辑表达式
	var BRACKETS_REG = /!?\(([^\()]+?)\)/g;
	var parseBrackets = function(expression){
		var prev, val;

		prev = expression;
		while(1){
			val = prev.replace(BRACKETS_REG, function(all, lexp){
				return parseLogicExpression(lexp, all.charAt(0) == '!').getAlias();
			});

			// 没有任何括号了，就打破循环
			if(val == prev){
				break;
			} else {
				prev = val;
			}
		}

		return prev;
	};
	


	// 编译表达式
	var compile = function(expression){
		return parseLogicExpression(parseBrackets(expression));
	};
	
	module.exports = {
		run: function(expression, fn){
			return compile(expression).run(fn);
		},
		compile: compile
	};

	/*var expression = 'namey == "y"';
	var i1 = $('<input name="namey" value="y" />');
	$('body').append(i1);

	compile(expression).run(expression, function(l){
		// <input name="namey" value="y" />

		//return $('[name=' + l + ']').val();
		return 'y';
	});

	i1.remove();*/
