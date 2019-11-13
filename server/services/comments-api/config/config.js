const config = {
    app: {
        title: 'Comments API',
        description: "Microservice to manage comments."
    },
    port: process.env.PORT || 3001,
    host: process.env.HOST || 'localhost',
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/auth',
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }
    },
}

module.exports = config;