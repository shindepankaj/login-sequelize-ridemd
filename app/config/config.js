// application configuration

var config = {
    // development evnvironment
    "dev": {
        database: 'test',
        username: 'root',
        password: '',
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false,
        // Alters tables to fit models. Not recommended for production use. Deletes data in columns that were removed or had their type changed in the model.
        alter: true
    },

    // test evnvironment
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },

    // production evnvironment
    "prod": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}

exports.get = function get(env) {
    return config[env] || config.dev;
}