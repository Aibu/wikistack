var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    getterMethods: {
        route: function() {
            return '/wiki/' + this.urlTitle;
        }
    },
    hooks: {
        beforeValidate: function(page) {
            if (!page.title) {
                return Math.random().toString(36).substring(2, 7); }

            var result = page.title.replace(/\s+/g, "_");
            var regex = /\W/g;
            result = result.replace(regex, "");

            page.urlTitle = result;
        }
    }
});

var User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
    Page: Page,
    User: User
};
