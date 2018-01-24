const sequelize_fixtures = require('sequelize-fixtures');

const models = require('../models');

//apply transform for each model being loaded
sequelize_fixtures.loadFile('./fixtures/groupes.json', models, {
    transformFixtureDataFn: function (data) {
        if(data.createdAt
           && data.createdAt < 0) {
            data.createdAt = new Date((new Date()).getTime() + parseFloat(data.createdAt) * 1000 * 60);
        }
        return data;
    }
}).then(function() {

});



//apply transform for each model being loaded
/*sequelize_fixtures.loadFile('./fixtures/types_events.json', models, {
    transformFixtureDataFn: function (data) {
        if(data.createdAt
           && data.createdAt < 0) {
            data.createdAt = new Date((new Date()).getTime() + parseFloat(data.createdAt) * 1000 * 60);
        }
        return data;
    }
}).then(function() {

});



//apply transform for each model being loaded
sequelize_fixtures.loadFile('./fixtures/countries.json', models, {
    transformFixtureDataFn: function (data) {
        if(data.createdAt
           && data.createdAt < 0) {
            data.createdAt = new Date((new Date()).getTime() + parseFloat(data.createdAt) * 1000 * 60);
        }
        return data;
    }
}).then(function() {
    sequelize_fixtures.loadFile('./fixtures/towns.json', models, {
        transformFixtureDataFn: function (data) {
            if(data.createdAt
               && data.createdAt < 0) {
                data.createdAt = new Date((new Date()).getTime() + parseFloat(data.createdAt) * 1000 * 60);
            }
            return data;
        }
    }).then(function() {
        sequelize_fixtures.loadFile('./fixtures/users.json', models, {
            transformFixtureDataFn: function (data) {
                if(data.createdAt
                   && data.createdAt < 0) {
                    data.createdAt = new Date((new Date()).getTime() + parseFloat(data.createdAt) * 1000 * 60);
                }
                return data;
            }
        }).then(function() {

        });
    });
});*/