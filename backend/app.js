const express = require('express')
const errorHandler = require('./src/middlewares/error.middleware')
const cors = require('cors')
const session = require('express-session')
const requireAuth = require('./src/middlewares/auth.middleware')
const app = express()
const path = require('path')

app.set('trust proxy', 1)

app.use(express.json())

app.use(
	cors({
		origin: process.env.CLIENT_URL || 'http://localhost:5173',
		credentials: true
	})
)

app.use(
	session({
		secret: process.env.SESSION_SECRET || 'secret',
		resave: false,
		saveUninitialized: false,
		//proxy: true,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000
			//secure: true,
			//sameSite: 'none'
		}
	})
)

app.use('/api/auth', require('./src/routes/auth.routes'))

//app.use('/api', requireAuth) РАСКОММЕНТИРОВАТЬ

app.use('/api/specialties', require('./src/routes/specialties.routes'))
app.use('/api/qualifications', require('./src/routes/qualifications.routes'))
app.use('/api/groups', require('./src/routes/groups.routes'))
app.use('/api/applicant', require('./src/routes/applicants.routes'))
app.use('/api/documents', require('./src/routes/documents.routes'))
app.use('/api/benefit', require('./src/routes/benefit.routes'))
app.use('/api/education', require('./src/routes/educationInfo.routes'))
app.use('/api/subjectgrade', require('./src/routes/subjectGrade.routes'))
app.use('/api/representative', require('./src/routes/representative.routes'))
app.use('/api/user', require('./src/routes/users.routes'))

app.use(errorHandler)
module.exports = app
