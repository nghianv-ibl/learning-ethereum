require('./lib/environment').configDotENV({});

const config = require('./lib/config'),
	Sync = require('./module-sync');

const sync = new Sync(config.getLoggerConfig(), config.getDatabaseConfig('CORE_PARSER'), config.getProviderConfig());
sync.startSync();
