@echo OFF
copy /b header.js+Classes\*.js+MenuTabs\*.js+ChatCommands\*.js+Experimental\*.js+Utilities\*.js+footer.js 124753_nightly.user.js
echo "124753_nightly.user.js created at %date% %time%";
copy 124753_nightly.user.js ChromeApp\124753_nightly.user.js