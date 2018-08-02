let self = {};

const restler = require("restler");

self.search = (req, res) => {
    const query = req.query["q"];
    restler
        .get(
            "https://api.mercadolibre.com/sites/MLA/search?offset=0&limit=4&q=" +
                query
        )
        .on("complete", data => {
            let resData = {
                author: {
                    name: "Natalia",
                    lastname: "Guida"
                },
                items: [],
                filters: data.filters
            };
            for (var i = 0; i < data.results.length; i++) {
                const obj = {
                    id: data.results[i].id,
                    title: data.results[i].title,
                    price: {
                        currency: data.results[i].currency_id,
                        amount: data.results[i].price.toString().split(".")[0],
                        decimals: data.results[i].price.toString().split(".")[1]
                    },
                    picture: data.results[i].thumbnail,
                    condition: data.results[i].condition,
                    free_shipping: data.results[i].shipping.free_shipping,
                    address: data.results[i].seller_address.city.name
                };
                obj.price.currency =
                    obj.price.currency == "ARS" ? "$" : obj.price.currency;
                resData.items.push(obj);
            }

            return res.json(resData);
        });
};

self.product = (req, res) => {
    const params = req.params.id;
    restler
        .get("https://api.mercadolibre.com/items/" + params)
        .on("complete", data => {
            let resData = {
                author: {
                    name: "Natalia",
                    lastname: "Guida"
                },
                item: {
                    id: data.id,
                    title: data.title,
                    price: {
                        currency: data.currency_id,
                        amount: data.price.toString().split(".")[0],
                        decimals: data.price.toString().split(".")[1]
                    },
                    pictures: data.pictures,
                    condition: data.condition,
                    sold_quantity: data.sold_quantity
                }
            };

            resData.item.price.currency =
                resData.item.price.currency == "ARS"
                    ? "$"
                    : resData.item.price.currency;
            console.log(resData);
            return res.json(resData);
        });
};

self.description = (req, res) => {
    const params = req.params.id;
    restler
        .get("https://api.mercadolibre.com/items/" + params + "/description")
        .on("complete", data => {
            return res.json(data);
        });
};

module.exports = self;
