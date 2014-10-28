	express = require('express')
	app = express()
	path = require('path')
	fs = require('fs')
	api_key = process.env.APIKEY
	domain = process.env.DOMAIN
	mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
	port = 9999
	projectPath = path.join(__dirname) + '/'
	attachFileName = undefined
	attachFilePath = '/data/'
	allowCrossDomain = function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE')
		res.header("Content-Type", "application/json; charset=utf-8")
    		next();
	}
	mailTemplate  = {
		"from": "Mailgun Sandbox <postmaster@YOURDOMAIN.mailgun.org>",
		"to": "toSomeOne <email>",
		"subject": "test mail!",
		"text": "TEST API for Docker",
		"attachment": 'attachFileName'
	}
	app.use(express.bodyParser())
	app.use(allowCrossDomain)	

	app.post('/sendmail/:file?', function(req, res) {
		var data = req.body || {}
			attachFileName = attachFilePath + req.body.attachment
		data.attachment = (fs.existsSync(attachFileName)) ? attachFileName: undefined
		if (Object.keys(data).length === 1 && data.hasOwnProperty('attachment')) {
			res.send({msg: 'not enough mail content', YouShouldUse: mailTemplate })
			console.log('not enough mail content')
			return
		}
		mailgun.messages().send(data, function (error, body) {
		  	if (error) {
		  		console.log('error when send mail :', error, body)
		  		data.msg = "sendMail! FAILD!"
				res.send(data)
				return
		  	}
		  	data.msg = "sendMail! OK!"
		  	console.log(data)
		  	res.send(data)
		})	
	})
	app.get('/:test?', function(req, res) {
		res.send({
			reqbody: req.body,
			params: req.params.test,
			msg: 'yooo test',
			attachment: req.params.test,
			projectPath: projectPath,
			mailTemplate: mailTemplate
		})
	})
	app.post('/:test?', function(req, res) {
		res.send({
			reqbody: req.body,
			params: req.params.test,
			msg: 'yooo test',
			attachment: req.params.test,
			projectPath: projectPath,
			mailTemplate: mailTemplate
		})
	})

app.listen(port)
console.log('Listening on port ' + port)
