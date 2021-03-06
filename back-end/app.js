const PORT = 8000;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var conversationsRouter = require('./routes/conversations');
const categoriesRouter = require('./routes/categories');
const searchRouter = require('./routes/search');
const chatsRouter = require('./routes/chats/chat');

const { getUsers, getUserByEmail, addUser } = require('./helpers/dbHelpers')

var app = express();
app.use(cors());

const userSockets = new Map();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', indexRouter());
app.use('/users', usersRouter(db, userSockets));
app.use('/conversations', conversationsRouter(db));
app.use('/login', loginRouter(db));
app.use('/categories', categoriesRouter(db));
app.use('/search', searchRouter(db));
app.use('/chats', chatsRouter(db, userSockets));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});


const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
  },
});

userSockets.set('io', io);

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("a user connected.");
  socket.removeAllListeners();
  const userId = socket.handshake.query.userId

  userSockets.set(String(userId), socket)
  onlineUsers.push(userId);

  io.emit('onlineUsers', onlineUsers);

  socket.on('disconnect', () => {
    console.log('disconnected~~~~~~~~~~~~~~~');
    userSockets.delete(String(userId))
    onlineUsers = onlineUsers.filter(user => user !== userId);
    io.emit('onlineUsers', onlineUsers);
  })
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;

