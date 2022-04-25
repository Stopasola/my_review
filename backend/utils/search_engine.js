const connection =  require('../src/database/connection')


module.exports = async function search_engine(filters, table){
    filters = await build_sql(filters, table)
    const search_query = (query) => { filter_rules(filters, table, query) }
    return await connection(table).modify(search_query)
}

function filter_rules(filters, table, query){
    for (const col of filters.rules) {
        // Clause AND should not be hardcoded
        if (filters.condition == "AND"){
            query.andWhere(`${table}.${col.field}`, `${col.operator}`, `${col.value}`);
        }else{
            query.orWhere(`${table}.${col.field}`, `${col.operator}`, `${col.value}`);
        }
    }
    for (const col of filters.sort) {
        query.orderBy(`${col.field}`, `${col.operator}`)
    }
    return query
}

async function build_sql(filters, table){

    // This is the ugliest part of my code, i still doesn't know how is the fastest way to build the raw sql query, every time here i need to
    // ask for my db witch is the var type, maybe a lookup table is a better solution, or knex has a out of the box solution. 
    for (const field of filters.rules){
        var column = await connection(table).columnInfo(field.field)
        if(column.type == "character varying"){
            field.operator = 'like'
            field.value = "%" + field.value + "%"
        }
    }
    return filters
}