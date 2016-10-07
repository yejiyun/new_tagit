function Modules(self) {
	var getAttributesArray = function(namedNodeList) {		
		return Array.from(namedNodeList).map(function(obj){
			var temp = {};
			temp[obj.name] = obj.value;
			return temp;
		})
	}
	
	var module = {
			self: self,
			tagName: self[0].tagName,
			attributes: getAttributesArray(self[0].attributes),
			body: self.html(),
			init: function initModules() {
				var tagHead = "<"+this.tagName+">"+"</"+this.tagName+">", tagAttr = {};
				for(var obj in this.attributes)
					$.extend(tagAttr, this.attributes[obj]);
				
				return $(tagHead, tagAttr).append($.parseHTML(this.body));
			}
		};
	
	self.remove();
	return module;
}