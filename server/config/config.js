const config = {
    app: {
        title: 'Gerente',
        description: "App to manage every day tasks."
    },
    port: process.env.PORT || 3000,
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