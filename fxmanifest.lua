fx_version 'cerulean'
game 'gta5'

description 'Basic Vue.js (TypeScript) & Lua Game Scripts Boilerplate'
author 'puchunx'
version '1.0.0'
repository 'https://github.com/puchunx/fivem-vuejs-boilerplate-lua'

lua54 'yes'

ui_page 'web/build/index.html'
-- ui_page 'http://localhost:5173'

client_scripts {
  'client.lua',
}

server_scripts {
  'server.lua',
}

files {
	'web/build/index.html',
	'web/build/**/*',
}