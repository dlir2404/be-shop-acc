const { Op } = require('sequelize');
const priceToQuery = (price) => {
    if (price === 'tren10tr') {
        return {
            [Op.gt]: 10000000,
        }
    } else if (price === '5den10tr') {
        return {
            [Op.between]: [5000000, 10000000],
        }
    } else if (price === "1den5tr") {
        return {
            [Op.between]: [1000000, 5000000],
        }
    } else if (price === '500den1tr') {
        return {
            [Op.between]: [500000, 1000000],

        }
    } else if (price === '2den5tram') {
        return {
            [Op.between]: [200000, 500000],

        }
    } else if (price === 'duoi200') {
        return {
            [Op.lt]: 200000,
        }
    }
}

const costumes_numToQuery = (costumes_num) => {
    if (costumes_num === 'tren100')
        return {
            [Op.gt]: 100,
        }
    else if (costumes_num === '50den100')
        return {
            [Op.between]: [50, 100],
        }
    else if (costumes_num === 'duoi50')
        return {
            [Op.lt]: 50,
        }
}

const heroes_numToQuery = (costumes_num) => {
    if (costumes_num === 'tren100')
        return {
            [Op.gt]: 100,
        }
    else if (costumes_num === '50den100')
        return {
            [Op.between]: [50, 100],
        }
    else if (costumes_num === 'duoi50')
        return {
            [Op.lt]: 50,
        }
}

const rankToQuery = (rank) => {
    return {
        [Op.like]: rank
    }
}

module.exports = {
    priceToQuery,
    costumes_numToQuery,
    heroes_numToQuery,
    rankToQuery
}