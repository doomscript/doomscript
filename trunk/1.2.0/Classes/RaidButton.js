		/************************************/
		/********* RaidButton Class *********/
		/************************************/
		
		window.RaidButton = Class.create({
			initialize: function(name, className, callback, title)
			{
				this.name = name || "";
				this.callback = callback;
				this.node = new Element("li", {"class": "DC_LoaTS_button_wrapper " + className + "Wrapper"});
				this.anchor = new Element("a", {"class": "DC_LoaTS_button " + className});
                if (title) {
                    this.anchor.title = title;
                }
				this.anchor.appendChild(document.createTextNode(this.name));
				this.anchor.observe("click", function(clickEvent)
				{
					this.execute(clickEvent);
				}.bindAsEventListener(this));
				
				this.node.insert({bottom: this.anchor});
			},
			
			execute: function(clickEvent)
			{
				this.callback(clickEvent);
			}
			
		});

