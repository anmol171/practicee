var allowedHosts = ['http://localhost:4200', 'http://localhost'];


var ipsec = {


	CrossOriginHeaders: function (req, res, next) {

		//var date = new Date();
		console.log("**************" + req.path + "*************" + req.connection.remoteAddress);
		console.log(req.headers.origin);



		if (allowedHosts.indexOf(req.headers.origin) > -1) {

			res.header('Access-Control-Allow-Origin', req.headers.origin);
			res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.header("Access-Control-Allow-Credentials", 'true');
			res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,withCredentials, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');

			if (req.method === 'OPTIONS') {
				console.log(req.path, req.headers.origin);
				res.sendStatus(200);
				return;
			}

			console.log('coming inside');
		}
		next();
	}
};


module.exports = ipsec;
