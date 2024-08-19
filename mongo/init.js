let rsStatus = null
try {
	rsStatus = rs.status();
}
catch (err) {}

if (!rsStatus || !rsStatus?.members) {
	rs.initiate({
		_id : 'rs0',
		members: [{
			_id: 0,
			host: `localhost:${process.env.MONGO_PORT}`
		}]
	});
}
else quit();

// Wait for the Replica Set to become available...
sleep(2000);

const adminUsername = process.env.MONGO_ROOT_USERNAME;
const adminPassword = process.env.MONGO_ROOT_PASSWORD;
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

db.createUser({
	user: adminUsername,
	pwd: adminPassword	,
	roles: [ 'dbAdmin', 'userAdmin', 'clusterAdmin' ]
});

db.auth(adminUsername, adminPassword);

db.createUser({
	user: username,
	pwd: password,
	roles: [ 'root', 'readWriteAnyDatabase' ]
});
