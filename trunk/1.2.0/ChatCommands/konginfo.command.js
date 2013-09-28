        RaidCommand.create( 
            {
                commandName: "konginfo",
                aliases: [],
                doNotEnumerateInHelp: true, // Don't list this in the help
               // No parsing needed
                /*parsingClass: ,*/
                handler: function(deck, parser, params, text, context)
                {
                    // Declare ret object
                    var ret = {success: true};
                    
                    ret.statusMessage = "Kong ID: " + active_user.id() + "\n";
                    ret.statusMessage = "Kong Hash: " + active_user.gameAuthToken();

                    return ret;
                },
                
                getOptions: function()
                {
                    var commandOptions = {
                        initialText: {
                            text: "Get important info about your Kong game."
                        }
                    };
                    
                    return commandOptions;
                },
                
                buildHelpText: function()
                {
                    var helpText = "<b>Raid Command:</b> <code>/konginfo</code>\n";
                    helpText += "Displays important Kong info.\n";
                    
                    return helpText;
                }
            }
        );
        
