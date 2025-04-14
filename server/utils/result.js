function errorResult(error)
{
    const obj = {
                    'status' : 'error',
                    'error' : error
    }

    return obj;
}


function successResult(data)
{
    const obj = {
                    'status' : 'success',
                    'data' : data
    }

    return obj;
}

module.exports = {errorResult,successResult};